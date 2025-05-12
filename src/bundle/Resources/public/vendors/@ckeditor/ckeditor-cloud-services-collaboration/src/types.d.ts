export type TokenChangeValueEventCallback = (event: Record<string, unknown>, name: string, value: ArrayBuffer) => void | Promise<void>;
export interface IToken {
    value: string | ArrayBuffer;
    refreshToken(): Promise<void> | void;
    on(event: string, handler: TokenChangeValueEventCallback): void;
    off(event: string, handler: TokenChangeValueEventCallback): void;
}
