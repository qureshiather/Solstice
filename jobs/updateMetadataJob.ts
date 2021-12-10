import { MemoryService } from "../services/memory-service";
import { UploadService } from "../services/uploadservice";
import { LOGGER } from "../utils/config";


export const runUpdateMetadataJob = (memoryService: MemoryService) => {
    const result = memoryService.grabNextUnprocessedTicket()
    result.then(
        (data) => {
            if (data === null) {
                LOGGER.info("No Data found to process");
            } else {
                LOGGER.info(`Processing Data for ${data.seedString} and token ${data.tokenPubKey}`);
                const updateService = new UploadService()
                updateService.updateMetadata(
                    data.seedString, data.artConfig, data.tokenPubKey
                ).then(
                    () => {
                        LOGGER.info(`Marking Token ${data.tokenPubKey} as processed`);
                        memoryService.setTokenAsProcessed(data.tokenPubKey);
                    }
                )
            }
        }
    )
}