import { IDescriptorBody } from '../../../descriptor.js';
import PackageDataMessage, { IPackageDataMessage } from './packagedatamessage.js';
export interface IObjectObjectPacketDataMessage extends IPackageDataMessage {
    data?: string;
    data1?: string;
}
export default class ObjectObjectPacketDataMessage extends PackageDataMessage {
    readonly data: Record<string, unknown>;
    readonly data1: Record<string, unknown>;
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(data: Record<string, unknown>, data1: Record<string, unknown>);
    toJSON(): IObjectObjectPacketDataMessage;
    static fromJSON(data: IObjectObjectPacketDataMessage): ObjectObjectPacketDataMessage;
    static create(data: Record<string, unknown>, data1: Record<string, unknown>): ObjectObjectPacketDataMessage;
}
