import PackageDataMessage, { IPackageDataMessage } from './packagedatamessage.js';
import { IDescriptorBody } from '../../../descriptor.js';
export interface IStringNumberPacketDataMessage extends IPackageDataMessage {
    data: string;
    data1: number;
}
export default class StringNumberPacketDataMessage extends PackageDataMessage {
    readonly data: string;
    readonly data1: number;
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(data: string, data1: number);
    toJSON(): IStringNumberPacketDataMessage;
    static fromJSON(data: IStringNumberPacketDataMessage): StringNumberPacketDataMessage;
    static create(data: string, data1: number): StringNumberPacketDataMessage;
}
