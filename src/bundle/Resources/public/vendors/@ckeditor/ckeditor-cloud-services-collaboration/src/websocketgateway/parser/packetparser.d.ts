/// <reference types="node" />
/// <reference types="node" />
import { Packet as IOPacket } from 'socket.io-parser';
export interface IPacketParserOptions {
    flags?: Record<string, unknown>;
    rooms?: string[];
    except?: string[];
}
export type Packet = IOPacket;
export default class PacketParser {
    encode(type: number, data: unknown[], id?: number, nsp?: string, options?: IPacketParserOptions): Buffer;
    decode(buffer: Buffer): {
        packet: Packet;
        options: IPacketParserOptions;
    };
}
