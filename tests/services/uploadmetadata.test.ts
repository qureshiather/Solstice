import { UploadService } from "../../services/uploadservice";


test('update metadata for ticket', () => {
    const uploadSevice = new UploadService()
    uploadSevice.updateMetadata(
        "Solana",
        {
            BackgroundType: 1,
            ShapeType: 1, 
            borderType: 1
        },
        "6MTwb9Sn1FJuARUjYvKvnGuN9PyLPGrR12Rvq74Qs7j3"
    )
  }, 120000
);