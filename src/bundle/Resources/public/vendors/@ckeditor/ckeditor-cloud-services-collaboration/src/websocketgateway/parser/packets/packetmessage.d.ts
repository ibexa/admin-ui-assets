/// <reference types="node" />
/// <reference types="node" />
import Message, { IMessage } from './../../../message.js';
import PacketOptionsMessage from './packetoptionsmessage.js';
import { IPacketParserOptions, Packet } from '../packetparser.js';
import PackageDataMessage from './packagedatamessage.js';
import { IDescriptorBody } from '../../../descriptor.js';
export interface IPacketMessage extends IMessage {
    type: number;
    id?: number;
    nsp?: string;
    data: Buffer;
    options?: Buffer;
}
export default class PacketMessage extends Message {
    readonly type: number;
    readonly data: PackageDataMessage;
    readonly id?: number | undefined;
    readonly nsp: string;
    readonly options: PacketOptionsMessage;
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(type: number, data: PackageDataMessage, id?: number | undefined, nsp?: string, options?: PacketOptionsMessage);
    get packetData(): unknown[];
    toJSON(): IPacketMessage;
    static fromJSON(data: IPacketMessage): PacketMessage;
    /**
     * Creates a PacketMessage.
     */
    static create(packet: Packet, options?: IPacketParserOptions): PacketMessage;
}
