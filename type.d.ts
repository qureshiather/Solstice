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

export interface TokenInfo {
    artConfig: ArtConfig;
    processed: boolean;
    seedString: string;
    tokenPubKey: string;  
}