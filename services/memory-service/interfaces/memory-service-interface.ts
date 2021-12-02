export interface MemoryService {
    MarkSeedStringAsTaken(seedString: string, TokenPubKey: string, artConfig: any): Promise<void>
    IsTokenUnused(tokenId: string): Promise<string|undefined>
    IsStringUnique(seedString: string): Promise<boolean>
}