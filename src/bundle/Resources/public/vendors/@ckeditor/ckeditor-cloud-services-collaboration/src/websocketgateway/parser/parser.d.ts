/// <reference types="node" />
/// <reference types="node" />
import { Decoder as IODecoder, Encoder as IOEncoder, Packet, PacketType } from 'socket.io-parser';
import PacketParser from './packetparser.js';
export declare const ENCODED_TYPES: PacketType[];
export declare class Encoder extends IOEncoder {
    private readonly _packetParser;
    constructor(packetParser?: PacketParser);
    encode(packet: Packet): unknown[];
}
export declare class Decoder extends IODecoder {
    private readonly _packetParser;
    constructor(packetParser?: PacketParser);
    add(obj: Buffer | unknown): void;
}
