import { ENVIRONMENT } from "../server";
import {
  MapMemoryService,
  FirestoreMemoryService,
  MemoryService,
} from "../services/memoryservice";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBbPnG1_ZkqAPqW1v_uZj_2fvtKr0KFB8c",
  authDomain: "solstice-be65f.firebaseapp.com",
  databaseURL: "https://solstice-be65f-default-rtdb.firebaseio.com",
  projectId: "solstice-be65f",
  storageBucket: "solstice-be65f.appspot.com",
  messagingSenderId: "1088712809891",
  appId: "1:1088712809891:web:79672c17b59124a6bcce16",
};

export module Factories {
  export const getMemoryService = ():MemoryService => {
    if (ENVIRONMENT === "prod") {
      console.log("Using Firebase as storage Service");
      const firebaseApp = initializeApp(firebaseConfig);
      return new FirestoreMemoryService(firebaseApp);
    } else {
      console.log("Using in-memory map as storage Service");
      return new MapMemoryService();
    }
  };

  export const getFileLocation = ():string => {
    if (ENVIRONMENT === "prod") {
      console.log("Storing images temporary in /tmp");
      return "/tmp";
    } else {
      console.log("Storing images in root directory");
      return ".";
    }
  };
}
