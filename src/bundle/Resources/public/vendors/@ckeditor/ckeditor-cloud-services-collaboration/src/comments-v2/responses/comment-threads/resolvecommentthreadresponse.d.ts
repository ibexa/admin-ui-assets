import Message, { IMessage } from './../../../message.js';
import { IDescriptorBody } from '../../../descriptor.js';
export interface IResolveCommentThreadResponse extends IMessage {
    commentThreadId: string;
    documentId: string;
    resolvedBy: string;
    resolvedAt: string;
}
export default class ResolveCommentThreadResponse extends Message {
    readonly commentThreadId: string;
    readonly documentId: string;
    readonly resolvedBy: string;
    readonly resolvedAt: Date;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(commentThreadId: string, documentId: string, resolvedBy: string, resolvedAt: string);
    toJSON(): IResolveCommentThreadResponse;
    static fromJSON(data: IResolveCommentThreadResponse): ResolveCommentThreadResponse;
}
