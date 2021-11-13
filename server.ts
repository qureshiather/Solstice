import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { MemoryService } from "./services/memoryservice"
import { Verify } from 'crypto';
import { allowedNodeEnvironmentFlags } from 'process';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const memoryService = new MemoryService()

app.get('/api/VerifyWalletHasTicket', (req: any, res) => {
  // Check if there are existing tickets on pubkey using connection object
  // then check our DB if the token was not already used
  // updated with metadata OR maybe just use Solana to check metadata?
  res.send({ express: 'Hello From Express' });
});

app.get('/api/ValidateStringUnique', (req: any, res: any) => {
  // Validate that there is no other SolsticePass ticket token that has same CheckStringUniqueness
  const seedString = req.query.seedString
  const isUnique = memoryService.ValidateStringUnique(seedString)
  if (isUnique) {
    res.send({ seedString: "true" });
  } else {
    res.send({ seedString: "false" });
  }
});

app.post('/api/updateMetadata', (req: any, res: { send: (arg0: string) => void; }) => {
  // Given a single token ID, generate the image in 4k, and update metadata of the token
  // mark the string as submitted in db, as well as the token has been updated
  // This can be done async?
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});



if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));