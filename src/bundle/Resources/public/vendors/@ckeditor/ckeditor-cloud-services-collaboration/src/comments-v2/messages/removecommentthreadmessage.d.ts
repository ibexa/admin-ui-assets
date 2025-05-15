import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IRemoveCommentThreadMessage extends IMessage {
    commentThreadId: string;
    documentId: string;
}
export default class RemoveCommentThreadMessage extends Message {
    readonly documentId: string;
    readonly commentThreadId: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(documentId: string, commentThreadId: string);
    toJSON(): IRemoveCommentThreadMessage;
    static fromJSON(object: IRemoveCommentThreadMessage): RemoveCommentThreadMessage;
}
