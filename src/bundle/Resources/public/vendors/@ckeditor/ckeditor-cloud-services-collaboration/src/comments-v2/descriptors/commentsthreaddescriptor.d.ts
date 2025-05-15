import Descriptor, { IDescriptorBody } from './../../descriptor.js';
import { IComment, ICommentJSON } from './commentdescriptor.js';
interface ICommonThread {
    commentThreadId: string;
    resolvedBy?: string | null;
}
export interface IThreadJSON extends ICommonThread {
    comments?: ICommentJSON[];
    attributes?: string | null;
    createdAt?: string;
    deletedAt?: string | null;
    resolvedAt?: string | null;
    context?: string | null;
    unlinkedAt?: string | null;
}
export interface IThread extends ICommonThread {
    comments?: IComment[];
    createdAt?: Date;
    deletedAt?: Date | null;
    resolvedAt?: Date | null;
    attributes?: Record<string, unknown> | null;
    context?: Record<string, unknown> | null;
    unlinkedAt?: Date | null;
}
export default class CommentsThreadDescriptor extends Descriptor {
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    static toJSON(thread: IThread): IThreadJSON;
    static fromJSON(thread: IThreadJSON): IThread;
}
export {};
