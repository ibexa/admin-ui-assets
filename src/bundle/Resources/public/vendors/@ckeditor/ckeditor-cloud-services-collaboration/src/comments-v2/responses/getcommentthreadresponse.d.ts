import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { ICommentJSON, IComment } from '../descriptors/commentdescriptor.js';
export interface IGetCommentThreadResponse extends IMessage {
    commentThreadId: string;
    comments?: string[];
    commentsV2?: ICommentJSON[];
    attributes?: string | null;
    resolvedBy?: string | null;
    context?: string | null;
    createdAt?: string;
    deletedAt?: string | null;
    resolvedAt?: string | null;
    unlinkedAt?: string | null;
}
export default class GetCommentThreadResponse extends Message {
    readonly commentThreadId: string;
    private readonly _comments?;
    private readonly _commentsV2?;
    readonly resolvedBy?: string | null | undefined;
    readonly comments: IComment[];
    readonly createdAt?: Date;
    readonly deletedAt?: Date | null;
    readonly resolvedAt?: Date | null;
    readonly attributes?: Record<string, unknown> | null;
    readonly context?: Record<string, unknown> | null;
    readonly unlinkedAt?: Date | null;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(commentThreadId: string, _comments?: IComment[] | undefined, _commentsV2?: IComment[] | undefined, attributes?: string | null, resolvedBy?: string | null | undefined, context?: string | null, createdAt?: string, deletedAt?: string | null, resolvedAt?: string | null, unlinkedAt?: string | null);
    toJSON(): IGetCommentThreadResponse;
    static fromJSON(object: IGetCommentThreadResponse): GetCommentThreadResponse;
}
