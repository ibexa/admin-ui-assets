import Message, { IMessage } from '../../../message.js';
import { IDescriptorBody } from '../../../descriptor.js';
export interface IResolveCommentThreadMessage extends IMessage {
    commentThreadId: string;
    documentId: string;
    resolvedBy?: string;
    resolvedAt?: string;
}
export default class ResolveCommentThreadMessage extends Message {
    readonly commentThreadId: string;
    readonly documentId: string;
    readonly resolvedBy?: string | undefined;
    readonly resolvedAt?: Date;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(commentThreadId: string, documentId: string, resolvedBy?: string | undefined, resolvedAt?: string);
    toJSON(): IResolveCommentThreadMessage;
    static fromJSON(object: IResolveCommentThreadMessage): ResolveCommentThreadMessage;
}
