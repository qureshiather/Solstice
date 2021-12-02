import { FirebaseApp } from '@firebase/app';
import { getFirestore, Firestore, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { MemoryService } from './interfaces/memory-service-interface';

export class FirestoreMemoryService implements MemoryService {

    db: Firestore

    constructor(firebase: FirebaseApp) {
      this.db = getFirestore(firebase);
    }

    async MarkSeedStringAsTaken(seedString: string, TokenPubKey: string, artConfig: any): Promise<void> {
      await setDoc(doc(this.db, "seedStrings", seedString), {
        "tokenPubKey":  TokenPubKey
      });
      await setDoc(doc(this.db, "tokensUsed", TokenPubKey), {
        "seedString":  seedString,
        "artConfig": artConfig
      });
    }

    async IsTokenUnused(tokenId: string): Promise<string|null> {
      const docRef = doc(this.db, "tokensUsed", tokenId);
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return null;
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