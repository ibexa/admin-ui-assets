import { IDescriptorBody } from '../../../descriptor.js';
import PackageDataMessage, { IPackageDataMessage } from './packagedatamessage.js';
export interface INumberStringPacketDataMessage extends IPackageDataMessage {
    data: number;
    data1: string;
}
export default class NumberStringPacketDataMessage extends PackageDataMessage {
    readonly data: number;
    readonly data1: string;
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(data: number, data1: string);
    toJSON(): INumberStringPacketDataMessage;
    static fromJSON(data: INumberStringPacketDataMessage): NumberStringPacketDataMessage;
    static create(data: number, data1: string): NumberStringPacketDataMessage;
}
