export class MemoryService {
  /*

        String Unique: 
            SeedString: TokenId
        
        VerifyWalletHasTicket:
            Check to see if the TokenId has not been updated yet
            TokenId -> Wallet

        */
  store: Map<String, String>;

  constructor() {
    this.store = new Map();
  }

  MarkStringAsTaken(seedString: String, TokenPubkey: String) {
    this.store.set(seedString, TokenPubkey);
  }

  ValidateStringUnique(seedString: String) {
    return this.store.get(seedString) == undefined;
  }
}
