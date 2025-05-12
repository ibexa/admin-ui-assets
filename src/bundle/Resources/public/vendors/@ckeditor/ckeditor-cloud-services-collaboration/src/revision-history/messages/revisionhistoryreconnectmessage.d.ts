import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IRevisionHistoryReconnectMessage extends IMessage {
    documentId: string;
    requestId: number;
}
export default class RevisionHistoryReconnectMessage extends Message {
    readonly documentId: string;
    readonly requestId: number;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(documentId: string, requestId: number);
    toJSON(): IRevisionHistoryReconnectMessage;
    static fromJSON(object: IRevisionHistoryReconnectMessage): RevisionHistoryReconnectMessage;
}
