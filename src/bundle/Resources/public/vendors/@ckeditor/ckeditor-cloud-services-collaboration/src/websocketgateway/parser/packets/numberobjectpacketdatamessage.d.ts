import { IDescriptorBody } from '../../../descriptor.js';
import PackageDataMessage, { IPackageDataMessage } from './packagedatamessage.js';
export interface INumberObjectPacketDataMessage extends IPackageDataMessage {
    data: number;
    data1?: string;
}
export default class NumberObjectPacketDataMessage extends PackageDataMessage {
    readonly data: number;
    readonly data1: Record<string, unknown>;
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(data: number, data1: Record<string, unknown>);
    toJSON(): INumberObjectPacketDataMessage;
    static fromJSON(data: INumberObjectPacketDataMessage): NumberObjectPacketDataMessage;
    static create(data: number, data1: Record<string, unknown>): NumberObjectPacketDataMessage;
}
