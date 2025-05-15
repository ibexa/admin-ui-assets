import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IAddCommentResponse extends IMessage {
    commentThreadId: string;
    commentId: string;
    createdAt: string;
}
export default class AddCommentResponse extends Message {
    readonly commentThreadId: string;
    readonly commentId: string;
    readonly createdAt: Date;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(commentThreadId: string, commentId: string, createdAt: string);
    toJSON(): IAddCommentResponse;
    static fromJSON(data: IAddCommentResponse): AddCommentResponse;
}
