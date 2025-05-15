/// <reference types="node" />
/// <reference types="node" />
export declare const MessageDataTypes: {
    readonly BUFFER: 1;
    readonly STRING: 2;
    readonly NUMBER: 3;
    readonly OBJECT: 4;
};
export type IMessageDataTypes = typeof MessageDataTypes;
export type MessageDataType = IMessageDataTypes[keyof IMessageDataTypes];
export default class ParserUtils {
    /**
     * Generates packet type code (number) from types.
     *
     * Algorithm:
     * 	INPUT: [STRING, OBJECT, BUFFER]
     *  OUTPUT: 241
     *  OUTPUT = INPUT[0] * 100 + INPUT[1] * 10 + INPUT[2] * 1
     */
    static getPacketType(...types: MessageDataType[]): number;
    /**
     * Returns name of type which is supported by Parser.
     */
    static getType(obj: unknown): MessageDataType;
    /**
     * Returns information does object is a Buffer
     */
    static isBuffer(obj: unknown): obj is Buffer;
    private static _isBufferView;
}
