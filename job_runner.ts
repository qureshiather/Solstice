//@ts-ignore
const cron = require('node-cron');
import { runUpdateMetadataJob } from "./jobs/updateMetadataJob";
import { LOGGER } from "./utils/config";
import { getMemoryService } from "./utils/factories";

cron.schedule("* * * * *", () => {
  LOGGER.info("Running Cron Job to update metadata!");
  runUpdateMetadataJob(getMemoryService());
});
