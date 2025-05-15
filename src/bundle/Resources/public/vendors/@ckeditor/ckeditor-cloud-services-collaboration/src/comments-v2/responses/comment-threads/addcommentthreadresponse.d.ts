import Message, { IMessage } from './../../../message.js';
import { IDescriptorBody } from '../../../descriptor.js';
import { ICommentThreadAddedComment } from '../../descriptors/commentthreadaddedcomment.js';
export interface IAddedComment {
    commentId: string;
    createdAt: string;
}
export interface IAddCommentThreadResponse extends IMessage {
    commentThreadId: string;
    createdAt: string;
    comments: IAddedComment[];
}
export default class AddCommentThreadResponse extends Message {
    readonly commentThreadId: string;
    comments: ICommentThreadAddedComment[];
    readonly createdAt: Date;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(commentThreadId: string, createdAt: string, comments?: ICommentThreadAddedComment[]);
    toJSON(): IAddCommentThreadResponse;
    static fromJSON(data: IAddCommentThreadResponse): AddCommentThreadResponse;
}
