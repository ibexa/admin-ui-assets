import Message, { IMessage } from '../../../message.js';
import { IDescriptorBody } from '../../../descriptor.js';
export interface IReopenCommentThreadMessage extends IMessage {
    commentThreadId: string;
    documentId: string;
}
export default class ReopenCommentThreadMessage extends Message {
    readonly commentThreadId: string;
    readonly documentId: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(commentThreadId: string, documentId: string);
    toJSON(): IReopenCommentThreadMessage;
    static fromJSON(object: IReopenCommentThreadMessage): ReopenCommentThreadMessage;
}
