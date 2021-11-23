import { FirebaseApp } from '@firebase/app';
import { getFirestore, Firestore, doc, getDoc, setDoc } from 'firebase/firestore/lite';


export interface MemoryService {
  MarkSeedStringAsTaken(seedString: String, TokenPubKey: String): Promise<void>
  IsTokenUnused(tokenId: String): Promise<string|undefined>
  IsStringUnique(seedString: String): Promise<boolean>
}


export class MapMemoryService implements MemoryService {

  store: Map<String, String>;

  constructor() {
      this.store = new Map();
      this.store.set("SEED_SOLANA", "19203i20913iflkes");
  }

  async MarkSeedStringAsTaken(seedString: String, TokenPubkey: String): Promise<void> {
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

  async IsStringUnique(seedString: String): Promise<boolean> {
    const result = await this.store.get(`SEED_${seedString}`)
    return result === undefined;
  }
}

export class FirestoreMemoryService implements MemoryService {

  db: Firestore

  constructor(firebase: FirebaseApp) {
    this.db = getFirestore(firebase);
  }

  async MarkSeedStringAsTaken(seedString: string, TokenPubKey: string): Promise<void> {
    await setDoc(doc(this.db, "seedStrings", seedString), {
      "tokenPubKey":  TokenPubKey
    });
    await setDoc(doc(this.db, "tokensUsed", TokenPubKey), {
      "seedString":  seedString
    });
  }

  async IsTokenUnused(tokenId: string): Promise<string|undefined> {
    const docRef = doc(this.db, "tokensUsed", tokenId);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return undefined;
    } else {
      return tokenId;
    }
  }

  async IsStringUnique(seedString: string): Promise<boolean> {
    const docRef = doc(this.db, "seedStrings", seedString);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return false;
    } else {
      return true;
    }
  }
}
