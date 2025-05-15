/// <reference types="node" />
/// <reference types="node" />
import PackageDataMessage, { IPackageDataMessage } from './packagedatamessage.js';
import { IDescriptorBody } from '../../../descriptor.js';
export interface IStringBytesPacketDataMessage extends IPackageDataMessage {
    data: string;
    data1: Buffer;
}
export default class StringBytesPacketDataMessage extends PackageDataMessage {
    readonly data: string;
    readonly data1: Buffer;
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(data: string, data1: Buffer);
    toJSON(): IStringBytesPacketDataMessage;
    static fromJSON(data: IStringBytesPacketDataMessage): StringBytesPacketDataMessage;
    static create(data: string, data1: Buffer): StringBytesPacketDataMessage;
}
