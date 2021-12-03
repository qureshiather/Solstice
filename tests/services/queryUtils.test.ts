import { fetchNFTsOwnedByWallet } from "../../utils/queryUtils";
import { PublicKey, Connection } from "@solana/web3.js";


test('fetchNFTsOwnedByWallet gets correct token count', async () => {
    const results = await fetchNFTsOwnedByWallet(
        new PublicKey("92XHhMKt2ukLCZcxkBbzjRfCL3iRMAzAEQLHNsP3QHSt")
    )
    console.log(results)
  }, 120000
);