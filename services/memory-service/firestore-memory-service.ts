import { FirebaseApp } from '@firebase/app';
import { getFirestore, Firestore, doc, getDoc, setDoc, collection, query, where, limit, getDocs } from 'firebase/firestore/lite';
import { TokenInfo } from 'type';
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
        "artConfig": artConfig,
        "processed": false,
        "tokenPubKey": TokenPubKey
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

    async grabNextUnprocessedTicket(): Promise<TokenInfo|null> {
      const tokenCollectionRef = collection(this.db, "tokensUsed");
      const q = query(tokenCollectionRef, where("processed", "==", false), limit(1))
      const qSnapshot = await getDocs(q)
      let tokenInfoData = null;
      qSnapshot.forEach((doc) => {
        tokenInfoData = doc.data() as TokenInfo
      })
      return tokenInfoData;
    }

    async setTokenAsProcessed(tokenId: string): Promise<void> {
      const docRef = doc(this.db, "tokensUsed", tokenId);
      const docSnap = await getDoc(docRef);
      const obj = docSnap.data() as TokenInfo
      await setDoc(doc(this.db, "tokensUsed", tokenId), {
        "seedString":  obj.seedString,
        "artConfig": obj.artConfig,
        "processed": true,
        "tokenPubKey": obj.tokenPubKey
      });
    }
  }