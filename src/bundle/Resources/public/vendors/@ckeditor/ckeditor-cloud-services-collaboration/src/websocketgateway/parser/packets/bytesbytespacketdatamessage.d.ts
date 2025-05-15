/// <reference types="node" />
/// <reference types="node" />
import { IDescriptorBody } from '../../../descriptor.js';
import PackageDataMessage, { IPackageDataMessage } from './packagedatamessage.js';
export interface IBytesBytesPacketDataMessage extends IPackageDataMessage {
    data: Buffer;
    data1: Buffer;
}
export default class BytesBytesPacketDataMessage extends PackageDataMessage {
    readonly data: Buffer;
    readonly data1: Buffer;
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(data: Buffer, data1: Buffer);
    toJSON(): IBytesBytesPacketDataMessage;
    static fromJSON(data: IBytesBytesPacketDataMessage): BytesBytesPacketDataMessage;
    static create(data: Buffer, data1: Buffer): BytesBytesPacketDataMessage;
}
