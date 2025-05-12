import Message, { IMessage } from '../../../message.js';
import { IDescriptorBody } from '../../../descriptor.js';
export interface IUpdateCommentThreadMessage extends IMessage {
    commentThreadId: string;
    documentId: string;
    context: string | null | undefined;
    attributes: string | null;
    unlinkedAt: string | null;
}
export default class UpdateCommentThreadMessage extends Message {
    readonly commentThreadId: string;
    readonly documentId: string;
    readonly context?: Record<string, unknown> | null | undefined;
    readonly attributes: Record<string, unknown> | null;
    readonly unlinkedAt: Date | string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(commentThreadId: string, documentId: string, context?: Record<string, unknown> | null | undefined, attributes?: Record<string, unknown> | null, unlinkedAt?: string | Date | null);
    toJSON(): IUpdateCommentThreadMessage;
    static fromJSON(object: IUpdateCommentThreadMessage): UpdateCommentThreadMessage;
}
