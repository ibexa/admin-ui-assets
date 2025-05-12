import { IDescriptorBody } from '../../../descriptor.js';
import PackageDataMessage, { IPackageDataMessage } from './packagedatamessage.js';
export interface INumberNumberPacketDataMessage extends IPackageDataMessage {
    data: number;
    data1: number;
}
export default class NumberNumberPacketDataMessage extends PackageDataMessage {
    readonly data: number;
    readonly data1: number;
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(data: number, data1: number);
    toJSON(): INumberNumberPacketDataMessage;
    static fromJSON(data: INumberNumberPacketDataMessage): NumberNumberPacketDataMessage;
    static create(data: number, data1: number): NumberNumberPacketDataMessage;
}
