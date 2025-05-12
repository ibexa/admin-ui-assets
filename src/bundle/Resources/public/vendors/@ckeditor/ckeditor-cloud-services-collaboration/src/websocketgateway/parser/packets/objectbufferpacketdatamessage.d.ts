/// <reference types="node" />
/// <reference types="node" />
import { IDescriptorBody } from '../../../descriptor.js';
import PackageDataMessage, { IPackageDataMessage } from './packagedatamessage.js';
export interface IObjectBufferPacketDataMessage extends IPackageDataMessage {
    data?: string;
    data1: Buffer;
}
export default class ObjectBufferPacketDataMessage extends PackageDataMessage {
    readonly data: Record<string, unknown>;
    readonly data1: Buffer;
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(data: Record<string, unknown>, data1: Buffer);
    toJSON(): IObjectBufferPacketDataMessage;
    static fromJSON(data: IObjectBufferPacketDataMessage): ObjectBufferPacketDataMessage;
    static create(data: Record<string, unknown>, data1: Buffer): ObjectBufferPacketDataMessage;
}
