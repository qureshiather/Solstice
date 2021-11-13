export class MemoryService {
  /*

        String Unique: 
            SEED_<SeedString>: TokenId
        
        VerifyWalletHasTicket:
            Check to see if the TokenId has not been updated yet
            TOKEN_<TokenId> -> Wallet

        */
  store: Map<String, String>;

  constructor() {
    this.store = new Map();

    // Solana is unique
    this.store.set("SEED_SOLANA", "19203i20913iflkes");
    // Token
  }

  MarkSeedStringAsTaken(seedString: String, TokenPubkey: String) {
    this.store.set(`SEED_${seedString}`, TokenPubkey);
    this.store.set(`TOKEN_${TokenPubkey}`, seedString);
  }

  IsTokenUnused(tokenId: String) {
    return this.store.get(`TOKEN_${tokenId}`) === undefined;
  }

  IsStringUnique(seedString: String) {
    return this.store.get(`SEED_${seedString}`) === undefined;
  }
}
