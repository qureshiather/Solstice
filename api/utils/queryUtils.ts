// ts-ignore:
import { programs } from "@metaplex/js";
import { PublicKey, Connection } from "@solana/web3.js";
import { web3 } from "@project-serum/anchor";
import { SOLANA_RPC_HOST, UPDATE_AUTHORITY } from "../server";
const {
  metadata: { MetadataData },
  TokenAccount,
} = programs;

export const fetchNFTsOwnedByWallet = async (userWallet: web3.PublicKey) => {
  const connection = new Connection(SOLANA_RPC_HOST);
  const accounts = await TokenAccount.getTokenAccountsByOwner(
    connection,
    userWallet
  );
  const accountsWithAmount = accounts
    .map(({ data }) => data)
    .filter(({ amount }) => amount?.toNumber() > 0);

  const nftMintAddresses = accountsWithAmount.map(({ mint }) => mint);

  const nftMetadataAddresses = [];
  let nftAcInfo;

  for (let i = 0; i < nftMintAddresses.length; i++) {
    nftMetadataAddresses[i] = await fetchMetadataAccountForNFT(
      nftMintAddresses[i]
    );

    nftAcInfo = await connection.getMultipleAccountsInfo(
      nftMetadataAddresses,
      "processed"
    );
  }

  const nftAcInfoDeserialized = nftAcInfo
    ?.map((info) =>
      info?.data !== undefined
        ? MetadataData.deserialize(info?.data)
        : undefined
    )
    .filter( (element) => {
      return element !== undefined;
    });
  return nftAcInfoDeserialized.filter(
      (metadataItem) => metadataItem.updateAuthority === UPDATE_AUTHORITY
  );
};

export async function fetchMetadataAccountForNFT(nftMintKey: PublicKey) {
  const metadataBuffer = Buffer.from("metadata");
  const metadataProgramIdPublicKey = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  const metadataAccount = (
    await PublicKey.findProgramAddress(
      [
        metadataBuffer,
        metadataProgramIdPublicKey.toBuffer(),
        nftMintKey.toBuffer(),
      ],
      metadataProgramIdPublicKey
    )
  )[0];
  return metadataAccount;
}
