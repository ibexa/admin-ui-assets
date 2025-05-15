import Message, { IMessage } from '../../../message.js';
import { IDescriptorBody } from '../../../descriptor.js';
import { IComment, ICommentJSON } from '../../descriptors/commentdescriptor.js';
export interface IAddCommentThreadMessage extends IMessage {
    commentThreadId: string;
    documentId: string;
    context: string | null | undefined;
    resolvedAt: string;
    createdAt: string;
    resolvedBy: string | null;
    deletedAt: string;
    attributes: string | null;
    comments: ICommentJSON[];
}
export default class AddCommentThreadMessage extends Message {
    readonly documentId: string;
    readonly commentThreadId: string;
    readonly comments: IComment[];
    readonly context?: Record<string, unknown> | null | undefined;
    readonly resolvedBy: string | null;
    readonly attributes: Record<string, unknown> | null;
    readonly createdAt: Date | string;
    readonly resolvedAt: Date | string;
    readonly deletedAt: Date | string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(documentId: string, commentThreadId: string, comments?: IComment[], context?: Record<string, unknown> | null | undefined, resolvedBy?: string | null, createdAt?: string | Date | null, resolvedAt?: string | Date | null, deletedAt?: string | Date | null, attributes?: Record<string, unknown> | null);
    toJSON(): IAddCommentThreadMessage;
    static fromJSON(object: IAddCommentThreadMessage): AddCommentThreadMessage;
}
