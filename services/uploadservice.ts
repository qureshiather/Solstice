import { ImageService } from "./imageservice";

export class UploadService {
  imageService: ImageService;

  constructor() {
    this.imageService = new ImageService();
  }

  async updateMetadata(seedString: String, artConfig: any, tokenId: String) {
    // 3 should run in order and block, it's running in an asnyc task so it's fine
    const fileName = this.imageService.generateArt(seedString, artConfig);
    // generate art and save to file
    // upload to arweave
    // delete file
    // update metadata of tokenId
  }
}
