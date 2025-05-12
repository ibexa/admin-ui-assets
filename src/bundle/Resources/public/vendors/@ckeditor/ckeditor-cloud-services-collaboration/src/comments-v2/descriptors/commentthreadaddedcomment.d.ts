import Descriptor, { IDescriptorBody } from '../../descriptor.js';
export interface ICommentThreadAddedCommentJSON {
    commentId: string;
    createdAt: string;
}
export interface ICommentThreadAddedComment {
    commentId: string;
    createdAt: Date;
}
export default class CommentThreadAddedCommentDescriptor extends Descriptor {
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    static toJSON(comment: ICommentThreadAddedComment): ICommentThreadAddedCommentJSON;
    static fromJSON(comment: ICommentThreadAddedCommentJSON): ICommentThreadAddedComment;
}
