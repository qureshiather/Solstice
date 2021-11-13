import express from "express";
import bodyParser from "body-parser";
import path from "path";

import { MemoryService } from "./services/memoryservice";
import { allowedNodeEnvironmentFlags } from "process";
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SOLANA_RPC_HOST = "https://explorer-api.devnet.solana.com";

const memoryService = new MemoryService();
const connection = new anchor.web3.Connection(SOLANA_RPC_HOST);
const TICKET_TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

app.get("/api/VerifyWalletHasTicket", (req: any, res) => {
  const walletPublicKey = req.query.walletPublicKey;
  let doesWalletHaveUnusedTicket = false;
  let amountOfUnsuedTickets = 0;
  connection
    .getTokenAccountsByOwner(new PublicKey(walletPublicKey), {
      programId: new PublicKey(TICKET_TOKEN_PROGRAM_ID),
    })
    .then(async (result) => {
      for (let i = 0; i < result.value.length; i++) {
        const tokenId = result.value[i].pubkey.toBase58();
        if (memoryService.IsTokenUnused(tokenId) === true) {
          amountOfUnsuedTickets = amountOfUnsuedTickets + 1;
          doesWalletHaveUnusedTicket = true;
        }
      }
    })
    .finally(() => {
      res.send({ walletPublicKey: doesWalletHaveUnusedTicket, "TotalUnusedTickets": amountOfUnsuedTickets });
    });
});

app.get("/api/ValidateStringUnique", (req: any, res: any) => {
  // Validate that there is no other SolsticePass ticket token that has same CheckStringUniqueness
  const seedString = req.query.seedString;
  const isUnique = memoryService.IsStringUnique(seedString);
  if (isUnique) {
    res.send({ seedString: "true" });
  } else {
    res.send({ seedString: "false" });
  }
});

app.post(
  "/api/updateMetadata",
  (req: any, res: { send: (arg0: string) => void }) => {
    // Given a wallet, grab an unusued token,
    // generate the image in 4k, and update metadata of the token
    // mark the string as submitted in db, as well as the token has been updated
    // This can be done async?
    res.send(
      `I received your POST request. This is what you sent me: ${req.body.post}`
    );
  }
);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
