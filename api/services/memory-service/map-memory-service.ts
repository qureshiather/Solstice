import { MemoryService } from "./interfaces/memory-service-interface";

export class MapMemoryService implements MemoryService {

    store: Map<string, string>;

    constructor() {
        this.store = new Map();
        this.store.set("SEED_SOLANA", "19203i20913iflkes");
    }

    async MarkSeedStringAsTaken(seedString: string, TokenPubkey: string): Promise<void> {
      await this.store.set(`SEED_${seedString}`, TokenPubkey);
      await this.store.set(`TOKEN_${TokenPubkey}`, seedString);
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
  }