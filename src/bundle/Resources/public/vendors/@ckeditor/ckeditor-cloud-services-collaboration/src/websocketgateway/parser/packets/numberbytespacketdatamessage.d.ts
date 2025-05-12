/// <reference types="node" />
/// <reference types="node" />
import { IDescriptorBody } from '../../../descriptor.js';
import PackageDataMessage, { IPackageDataMessage } from './packagedatamessage.js';
export interface INumberBytesPacketDataMessage extends IPackageDataMessage {
    data: number;
    data1: Buffer;
}
export default class NumberBytesPacketDataMessage extends PackageDataMessage {
    readonly data: number;
    readonly data1: Buffer;
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(data: number, data1: Buffer);
    toJSON(): INumberBytesPacketDataMessage;
    static fromJSON(data: INumberBytesPacketDataMessage): NumberBytesPacketDataMessage;
    static create(data: number, data1: Buffer): NumberBytesPacketDataMessage;
}
