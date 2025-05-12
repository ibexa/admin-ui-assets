import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IGetUserMessage extends IMessage {
    id: string;
}
export default class GetUserMessage extends Message {
    readonly id: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(id: string);
    toJSON(): IGetUserMessage;
    static fromJSON(data: IGetUserMessage): GetUserMessage;
}
