import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { IThread, IThreadJSON } from '../descriptors/commentsthreaddescriptor.js';
export interface IAddCommentMessage extends IMessage {
    commentThreadId: string;
    content: string;
    documentId: string;
    commentId: string;
    createdAt: string;
    userId: string;
    attributes: string;
    commentThread?: IThreadJSON;
}
export default class AddCommentMessage extends Message {
    readonly documentId: string;
    readonly commentThreadId: string;
    readonly content: string;
    readonly commentId: string;
    readonly userId: string;
    readonly attributes: Record<string, unknown> | null;
    readonly commentThread?: IThread | undefined;
    readonly createdAt: Date | string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(documentId: string, commentThreadId: string, content: string, commentId?: string, createdAt?: string | Date, userId?: string, attributes?: Record<string, unknown> | null, commentThread?: IThread | undefined);
    toJSON(): IAddCommentMessage;
    static fromJSON(object: IAddCommentMessage): AddCommentMessage;
}
