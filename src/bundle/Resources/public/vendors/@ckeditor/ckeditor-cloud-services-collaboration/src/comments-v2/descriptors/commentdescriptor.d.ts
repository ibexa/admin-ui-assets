import Descriptor, { IDescriptorBody } from './../../descriptor.js';
interface ICommonComment {
    commentId: string;
    commentThreadId: string;
    userId: string;
    content: string;
    documentId: string;
}
export interface ICommentJSON extends ICommonComment {
    createdAt: string;
    attributes: string | null;
}
export interface IComment extends ICommonComment {
    createdAt: Date;
    attributes: Record<string, unknown> | null;
}
export default class CommentDescriptor extends Descriptor {
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    static toJSON(comment: IComment): ICommentJSON;
    static fromJSON(comment: ICommentJSON): IComment;
}
export {};
