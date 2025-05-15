import PackageDataMessage, { IPackageDataMessage } from './packagedatamessage.js';
import { IDescriptorBody } from '../../../descriptor.js';
export interface IStringObjectPacketDataMessage extends IPackageDataMessage {
    data: string;
    data1?: string;
}
export default class StringObjectPacketDataMessage extends PackageDataMessage {
    readonly data: string;
    readonly data1: Record<string, unknown>;
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(data: string, data1: Record<string, unknown>);
    toJSON(): IStringObjectPacketDataMessage;
    static fromJSON(data: IStringObjectPacketDataMessage): StringObjectPacketDataMessage;
    static create(data: string, data1: Record<string, unknown>): StringObjectPacketDataMessage;
}
