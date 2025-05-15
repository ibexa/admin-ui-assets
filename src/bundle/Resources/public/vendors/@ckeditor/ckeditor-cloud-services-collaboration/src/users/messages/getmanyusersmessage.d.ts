import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IGetManyUsersMessage extends IMessage {
    ids: string[];
}
export default class GetManyUsersMessage extends Message {
    readonly ids: string[];
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(ids: string[]);
    toJSON(): IGetManyUsersMessage;
    static fromJSON(data: IGetManyUsersMessage): GetManyUsersMessage;
}
