export interface updateMetadataRequest {
    seedString: String;
    walletPublicKey: String;
    artConfig: ArtConfig
}

export interface ArtConfig {
    BackgroundType: number;
    ShapeType: number;
    borderType: number;
}