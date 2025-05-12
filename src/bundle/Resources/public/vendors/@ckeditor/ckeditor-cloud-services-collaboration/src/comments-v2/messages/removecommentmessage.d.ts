import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IRemoveCommentMessage extends IMessage {
    commentThreadId: string;
    commentId: string;
    documentId: string;
}
export default class RemoveCommentMessage extends Message {
    readonly documentId: string;
    readonly commentThreadId: string;
    readonly commentId: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(documentId: string, commentThreadId: string, commentId: string);
    toJSON(): IRemoveCommentMessage;
    static fromJSON(object: IRemoveCommentMessage): RemoveCommentMessage;
}
