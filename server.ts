import express from "express";
import cors from "cors";
import path from "path";

// @ts-ignore
import Ddos from "ddos";
import * as dotenv from "dotenv";

import { UploadService } from "./services/uploadservice";
import { fetchNFTsOwnedByWallet } from "./utils/queryUtils";
import { PublicKey } from "@solana/web3.js";
import { getMemoryService } from "./utils/factories";
import { LOGGER } from "./utils/config";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
const frontEndBuildPath = path.join(__dirname, "../client/build")
LOGGER.info(`Serving front end assets from: ${frontEndBuildPath}`);
app.use(express.static(path.join(__dirname, "../client/build")));

if (process.env.NODE_ENV !== "test") {
  app.use(new Ddos({ burst: 10, limit: 15 }).express);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const memoryService = getMemoryService();

app.get("/api/GetUnusedTicketCount", (req: any, res) => {
  const walletPublicKey = req.query.walletPublicKey;
  let amountOfUnsuedTickets = 0;
  fetchNFTsOwnedByWallet(new PublicKey(walletPublicKey))
    .then((results) => {
      const promises = [];
      for (const result of results) {
        const tokenId = result.mint;
        const name = result.data.name;
        if (name.includes("Solstice Ticket")) {
          promises.push(memoryService.IsTokenUnused(tokenId));
        }
      }
      return Promise.all(promises);
    })
    .then((results) => {
      // counts number of non-null objects in array
      for (const result of results) {
        if (result !== null) {
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
          .then(async (results) => {
            const promises = [];
            for (const result of results) {
              const tokenId = result.mint;
              const name = result.data.name;
              if (name.includes("Solstice Ticket")) {
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
              memoryService.MarkSeedStringAsTaken(seedString, tokenToUse, params.artConfig);
              res.send({ walletPublicKey: "Processing request!" });
            }
          });
      }
    });
});

app.get("/api/hello", (req, res) => {
  res.status(200).send("Hello World!");
});


// Handles any requests that don't match the ones above
app.get('*', (req,res) => {
  if (req.url === "/generator") {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  } else {
    res.status(404).send('Page not found');
  }
});

app.listen(port, () => LOGGER.info(`Listening on port ${port}`));
