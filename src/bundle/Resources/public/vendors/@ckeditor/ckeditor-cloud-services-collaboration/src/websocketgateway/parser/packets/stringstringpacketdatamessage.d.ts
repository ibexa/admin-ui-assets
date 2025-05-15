import PackageDataMessage, { IPackageDataMessage } from './packagedatamessage.js';
import { IDescriptorBody } from '../../../descriptor.js';
export interface IStringStringPacketDataMessage extends IPackageDataMessage {
    data: string;
    data1: string;
}
export default class StringStringPacketDataMessage extends PackageDataMessage {
    readonly data: string;
    readonly data1: string;
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(data: string, data1: string);
    toJSON(): IStringStringPacketDataMessage;
    static fromJSON(data: IStringStringPacketDataMessage): StringStringPacketDataMessage;
    static create(data: string, data1: string): StringStringPacketDataMessage;
}
