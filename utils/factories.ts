import {
  MapMemoryService,
  FirestoreMemoryService,
  MemoryService,
} from "../services/memory-service";
import { initializeApp } from "firebase/app";
import { LOGGER, ENVIRONMENT, firebaseConfig } from "./config";

export const getMemoryService = ():MemoryService => {
  if (ENVIRONMENT === "prod") {
    LOGGER.info("Using Firebase as storage Service")
    const firebaseApp = initializeApp(firebaseConfig);
    return new FirestoreMemoryService(firebaseApp);
  } else {
    LOGGER.info("Using in-memory map as storage Service")
    return new MapMemoryService();
  }
};

export const getFileLocation = ():string => {
    LOGGER.info("Storing images in root directory")
    return ".";
};

