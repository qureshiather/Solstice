import { TokenInfo } from "type";
import { MemoryService } from "./interfaces/memory-service-interface";

export class MapMemoryService implements MemoryService {

    store: Map<string, string>;

    constructor() {
        this.store = new Map();
        this.store.set("SEED_SOLANA", "19203i20913iflkes");
    }

    async MarkSeedStringAsTaken(seedString: string, TokenPubkey: string, artConfig: any): Promise<void> {
      await this.store.set(`SEED_${seedString}`, TokenPubkey);
      const tokenObject: TokenInfo = {
        "seedString": seedString,
        "artConfig": artConfig,
        "processed": false,
        "tokenPubKey": TokenPubkey
      }
      await this.store.set(`TOKEN_${TokenPubkey}`, JSON.stringify(tokenObject));
      return
    }

    async IsTokenUnused(tokenId: string): Promise<string|null> {
      const result = await this.store.get(`TOKEN_${tokenId}`)
      if(result === undefined) {
        return tokenId;
      } else {
        return null;
      }
    }

    async IsStringUnique(seedString: string): Promise<boolean> {
      const result = await this.store.get(`SEED_${seedString}`)
      return result === undefined;
    }

    async grabNextUnprocessedTicket(): Promise<TokenInfo|null> {
      const keysIterator = await this.store.keys()
      for (const key in keysIterator) {
        if (key.match("TOKEN_")) {
          const data = JSON.parse(this.store.get(key))
          if(data.processed === false) {
            return data as TokenInfo
          }
        }
      }
      return null;
    }

    async setTokenAsProcessed(tokenId: string): Promise<void> {
      const data = await this.store.get(`TOKEN_${tokenId}`)
      const obj = JSON.parse(data) as TokenInfo;
      obj.processed = true;
      this.store.set(`TOKEN_${tokenId}`, JSON.stringify(obj))
    }
  }