import { TokenInfo } from "type";

export interface MemoryService {
    MarkSeedStringAsTaken(seedString: string, TokenPubKey: string, artConfig: any): Promise<void>
    IsTokenUnused(tokenId: string): Promise<string|undefined>
    IsStringUnique(seedString: string): Promise<boolean>
    grabNextUnprocessedTicket(): Promise<TokenInfo|null>
    setTokenAsProcessed(tokenId: string): Promise<void>
}