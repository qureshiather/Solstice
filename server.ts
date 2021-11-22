import express from "express";
import path from "path";

import { MemoryService } from "./services/memoryservice";
import { UploadService } from "./services/uploadservice";
import { fetchNFTsOwnedByWallet } from "./utils/queryUtils"
import * as anchor from "@project-serum/anchor";
import { PublicKey, Keypair } from "@solana/web3.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const SOLANA_RPC_HOST = "https://explorer-api.devnet.solana.com";
export const UPDATE_AUTHORITY = "6A4ordc3gBx1UodDNPTqQs8zSYnzYzb7YWFPRnAbKUK3"
export const UPDATE_AUTHORITY_KEYPAIR = Keypair.fromSecretKey(Uint8Array.from([
  32, 219, 242, 155, 200, 41, 117, 93, 171, 185, 95, 71, 115, 136, 230,
  249, 7, 138, 206, 79, 105, 5, 198, 137, 233, 14, 34, 251, 69, 166, 255,
  172, 76, 156, 247, 172, 48, 18, 241, 9, 20, 241, 172, 157, 137, 24, 53,
  245, 174, 97, 164, 166, 1, 172, 229, 248, 91, 209, 58, 214, 32, 29, 223,
  178,
]))
export const IMAGE_FILE_LOCATION = '/tmp'

const memoryService = new MemoryService();
const uploadService = new UploadService();

app.get("/api/GetUnusedTicketCount", (req: any, res) => {
  const walletPublicKey = req.query.walletPublicKey;
  let amountOfUnsuedTickets = 0;
  fetchNFTsOwnedByWallet(new PublicKey(walletPublicKey))
    .then(async (result) => {
      for (let i = 0; i < result.length; i++) {
        const tokenId = result[i].mint;
        if (memoryService.IsTokenUnused(tokenId) === true) {
          amountOfUnsuedTickets = amountOfUnsuedTickets + 1;
        }
      }
    })
    .finally(() => {
      res.send({ walletPublicKey: amountOfUnsuedTickets });
    });
});

app.get("/api/ValidateStringUnique", (req: any, res: any) => {
  const seedString = req.query.seedString;
  const isUnique = memoryService.IsStringUnique(seedString);
  if (isUnique) {
    res.send({ seedString: "true" });
  } else {
    res.send({ seedString: "false" });
  }
});

app.post("/api/updateMetadata", (req: any, res: any) => {
  const params = req.body;
  const walletPublicKey = params.walletPublicKey;
  const seedString = params.seedString;
  let HasValidTicket = false;
  let token_to_use = "";
  fetchNFTsOwnedByWallet(new PublicKey(walletPublicKey))
    .then(async (result) => {
      for (let i = 0; i < result.length; i++) {
        const tokenId = result[i].mint;
        if (memoryService.IsTokenUnused(tokenId) === true) {
          HasValidTicket = true;
          token_to_use = tokenId;
          break;
        }
      }
    })
    .finally(() => {
      if (HasValidTicket === false) {
        res.send({ walletPublicKey: "no valid tickets" });
      } else {
        memoryService.MarkSeedStringAsTaken(seedString, token_to_use);
        uploadService.updateMetadata(
          seedString,
          params.artConfig,
          token_to_use
        );
        res.send({ walletPublicKey: "Processing request!" });
      }
    });
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
