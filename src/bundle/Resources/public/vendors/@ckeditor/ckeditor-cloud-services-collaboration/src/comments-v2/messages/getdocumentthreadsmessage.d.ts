import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IGetDocumentThreadsMessage extends IMessage {
    documentId: string;
}
export default class GetDocumentThreadsMessage extends Message {
    readonly documentId: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(documentId: string);
    toJSON(): IGetDocumentThreadsMessage;
    static fromJSON(object: IGetDocumentThreadsMessage): GetDocumentThreadsMessage;
}
