/// <reference types="node" />
/// <reference types="node" />
import Message, { IMessageConstructor } from './message.js';
/**
 * Compresses and decompresses given message to/from the binary format using `Protocol Buffers`.
 */
export default class MessagesCompressor {
    /**
     * Creates an instance of a specific class from encoded buffer.
     */
    static decode<T extends IMessageConstructor>(buffer: Buffer, messageClass: T): unknown | InstanceType<T>;
    /**
     * Compress given message to buffer.
     */
    static encode(message: Message): Buffer;
}
