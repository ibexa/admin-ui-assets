import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IConnectMessage extends IMessage {
    documentId: string;
}
export default class ConnectMessage extends Message {
    readonly documentId: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(documentId: string);
    toJSON(): IConnectMessage;
    static fromJSON(object: IConnectMessage): ConnectMessage;
}
