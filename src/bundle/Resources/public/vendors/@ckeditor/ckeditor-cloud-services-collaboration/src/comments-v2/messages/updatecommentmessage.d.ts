import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { IThread, IThreadJSON } from '../descriptors/commentsthreaddescriptor.js';
export interface IUpdateCommentMessage extends IMessage {
    commentThreadId: string;
    content: string | undefined;
    documentId: string;
    commentId: string;
    attributes: string | null;
    isAttributesUpdated: boolean;
    commentThread?: IThreadJSON;
}
export default class UpdateCommentMessage extends Message {
    readonly documentId: string;
    readonly commentThreadId: string;
    readonly commentId: string;
    readonly content?: string | undefined;
    readonly attributes: Record<string, unknown> | null;
    readonly isAttributesUpdated: boolean;
    readonly commentThread?: IThread | undefined;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(documentId: string, commentThreadId: string, commentId: string, content?: string | undefined, attributes?: Record<string, unknown> | null, isAttributesUpdated?: boolean, commentThread?: IThread | undefined);
    toJSON(): IUpdateCommentMessage;
    static fromJSON(object: IUpdateCommentMessage): UpdateCommentMessage;
}
