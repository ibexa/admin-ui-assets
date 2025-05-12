import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IGetUserResponse extends IMessage {
    attributes: Record<string, string>[];
}
export default class GetUserResponse extends Message {
    readonly attributes: Record<string, unknown>;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(attributes: Record<string, unknown>);
    toJSON(): IGetUserResponse;
    static fromJSON(data: IGetUserResponse): GetUserResponse;
}
