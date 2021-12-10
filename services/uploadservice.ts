import { generateArt } from "./imageservice";
import { programs } from "@metaplex/js";
import retry from 'async-await-retry';

import Arweave from "arweave";

import fs from "fs";
import {
  PublicKey,
  Connection,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import fetch from 'cross-fetch';
import { arweaveJWK, LOGGER, SOLANA_RPC_HOST, UPDATE_AUTHORITY_KEYPAIR } from "../utils/config";

export class UploadService {

  async updateMetadata(seedString: string, artConfig: any, tokenId: string) {
    const uploadFile = async (fileName: string) => {
      LOGGER.info(`Updating Metadata for token: ${tokenId}, seedString: ${seedString}, with artConfig: ${JSON.stringify(artConfig)}`);
      const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
      });
      await arweave.wallets.jwkToAddress(arweaveJWK);
      const key = await arweave.wallets.generate();
      const data = await fs.readFileSync(fileName);
      const transaction = await arweave.createTransaction(
        { data },
        key
      );
      transaction.addTag("Content-Type", "image/png");
      LOGGER.info(`Uploading image to arweave: token ${tokenId}`);
      await arweave.transactions.sign(transaction, key);
      await arweave.transactions.post(transaction);
      fs.unlinkSync(fileName); // deletes file
      const permURLToImage = `https://www.arweave.net/${transaction.id}?ext=png`;

      const connection = new Connection(SOLANA_RPC_HOST);

      const {
        metadata: { Metadata, UpdateMetadata, MetadataDataData },
      } = programs;
      const metadataAccount = await Metadata.getPDA(new PublicKey(tokenId));
      const metadat = await Metadata.load(connection, metadataAccount);
      const metadataName = metadat.data.data.name;
      const mintNumber = metadataName.split('#')[1]
      const newTokenname = `Solstice #${mintNumber}`

      const originalJSONURI = metadat.data.data.uri;
      const response = await fetch(originalJSONURI);
      const originalJsonData = await response.json();

      const newJSONData = JSON.parse(JSON.stringify(originalJsonData))
      newJSONData.name = newTokenname;
      newJSONData.description = `Solstice NFT, Uniquely generated with seed: ${seedString}`;
      newJSONData.image = permURLToImage;
      newJSONData.properties.files[0].uri = permURLToImage;
      newJSONData.properties.files[0].type = "image/png";
      newJSONData.attributes[0] = {"trait_type": "type", "value": "art"}
      LOGGER.info(`Uploading Metadata to Arweave: ${JSON.stringify(newJSONData)}, token ${tokenId}`);
      const jsonTransaction = await arweave.createTransaction({
        data: JSON.stringify(newJSONData)
      }, key);
      jsonTransaction.addTag("Content-Type", "application/json");
      await arweave.transactions.sign(jsonTransaction, key);
      await arweave.transactions.post(jsonTransaction);
      const permURLToJSON = `https://www.arweave.net/${jsonTransaction.id}`;

      const newMetadataData = new MetadataDataData({
        name: newTokenname,
        symbol: metadat.data.data.symbol,
        uri: permURLToJSON,
        creators: metadat.data.data.creators,
        sellerFeeBasisPoints: metadat.data.data.sellerFeeBasisPoints,
      });
      const updateTx = new UpdateMetadata(
        { feePayer: UPDATE_AUTHORITY_KEYPAIR.publicKey },
        {
          metadata: metadataAccount,
          updateAuthority: UPDATE_AUTHORITY_KEYPAIR.publicKey,
          metadataData: newMetadataData,
          newUpdateAuthority: UPDATE_AUTHORITY_KEYPAIR.publicKey,
          primarySaleHappened: metadat.data.primarySaleHappened,
        }
      );
      LOGGER.info(`Updating Metadata in Solana BlockChain: ${updateTx}, token ${tokenId}`);
      const confirmationFunc = () => sendAndConfirmTransaction(connection, updateTx, [
        UPDATE_AUTHORITY_KEYPAIR,
      ]);
      try {
        const result = await retry(confirmationFunc, null, {
          retriesMax: 3, interval: 100, exponential: true, factor: 2, jitter: 100
        })
        LOGGER.info(`Updating Solana metadata had response: ${result}`);
      } catch (err) {
        LOGGER.error(`Unable to Update metadata for ${tokenId}, seedString: ${seedString}, with artConfig: ${JSON.stringify(artConfig)}`)
      }

    };
    LOGGER.info(`Generating art for seed: ${seedString} and token: ${tokenId}`);
    generateArt(seedString, artConfig, uploadFile)
  }
}
