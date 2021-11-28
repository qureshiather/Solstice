import express from "express";
import path from "path";

import { UploadService } from "./services/uploadservice";
import { fetchNFTsOwnedByWallet } from "./utils/queryUtils";
import * as anchor from "@project-serum/anchor";
import { PublicKey, Keypair } from "@solana/web3.js";
import { Factories } from "./utils/factories";
var Ddos = require('ddos')

// used to read .env files
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

export const ENVIRONMENT = process.env.ENVIRONMENT || "dev";

if (process.env.NODE_ENV !== "test") {
  app.use(new Ddos({burst:10, limit:15}).express);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const SOLANA_RPC_HOST = "https://explorer-api.devnet.solana.com";
export const UPDATE_AUTHORITY = "6A4ordc3gBx1UodDNPTqQs8zSYnzYzb7YWFPRnAbKUK3";
export const UPDATE_AUTHORITY_KEYPAIR = Keypair.fromSecretKey(
  Uint8Array.from([
    32, 219, 242, 155, 200, 41, 117, 93, 171, 185, 95, 71, 115, 136, 230, 249,
    7, 138, 206, 79, 105, 5, 198, 137, 233, 14, 34, 251, 69, 166, 255, 172, 76,
    156, 247, 172, 48, 18, 241, 9, 20, 241, 172, 157, 137, 24, 53, 245, 174, 97,
    164, 166, 1, 172, 229, 248, 91, 209, 58, 214, 32, 29, 223, 178,
  ])
);

export const IMAGE_FILE_LOCATION = Factories.getFileLocation();
const memoryService = Factories.getMemoryService();
const uploadService = new UploadService();

app.get("/api/GetUnusedTicketCount", (req: any, res) => {
  const walletPublicKey = req.query.walletPublicKey;
  let amountOfUnsuedTickets = 0;
  fetchNFTsOwnedByWallet(new PublicKey(walletPublicKey))
    .then((result) => {
      let promises = [];
      for (let i = 0; i < result.length; i++) {
        const tokenId = result[i].mint;
        const name = result[i].data.name;
        if (name.includes('Solstice Ticket')) {
          promises.push(memoryService.IsTokenUnused(tokenId));
        }
      }
      return Promise.all(promises);
    })
    .then((result) => {
      // counts number of non-null objects in array
      for (let i = 0; i < result.length; i++) {
        if (result[i] !== null) {
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
  let isUnique = false;
  memoryService
    .IsStringUnique(seedString)
    .then((result) => {
      isUnique = result;
    })
    .finally(() => {
      if (isUnique) {
        res.send({ seedString: "true" });
      } else {
        res.send({ seedString: "false" });
      }
    });
});

app.post("/api/updateMetadata", (req: any, res: any) => {
  const params = req.body;
  const walletPublicKey = params.walletPublicKey;
  const seedString = params.seedString;

  let isUnique = false;
  memoryService
    .IsStringUnique(seedString)
    .then((result) => {
      isUnique = result;
    })
    .finally(() => {
      if (isUnique === false) {
        res.send({
          walletPublicKey: `seedString ${seedString} has already been used`,
        });
      } else {
        let tokenToUse: string | null = null;
        fetchNFTsOwnedByWallet(new PublicKey(walletPublicKey))
          .then(async (result) => {
            let promises = [];
            for (let i = 0; i < result.length; i++) {
              const tokenId = result[i].mint;
              const name = result[i].data.name;
              if (name.includes('Solstice Ticket')) {
                promises.push(memoryService.IsTokenUnused(tokenId));
              }
            }
            return Promise.all(promises);
          })
          .then((result) => {
            tokenToUse = result.find((item) => item !== null);
          })
          .finally(() => {
            if (tokenToUse === null) {
              res.send({ walletPublicKey: "no valid tickets" });
            } else {
              memoryService.MarkSeedStringAsTaken(seedString, tokenToUse);
              uploadService.updateMetadata(
                seedString,
                params.artConfig,
                tokenToUse
              );
              res.send({ walletPublicKey: "Processing request!" });
            }
          });
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

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}


