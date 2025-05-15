import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IGetManyUsersResponse extends IMessage {
    users: Record<string, unknown>[];
}
export default class GetManyUsersResponse extends Message {
    readonly users: Record<string, unknown>[];
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(users: Record<string, unknown>[]);
    toJSON(): IGetManyUsersResponse;
    static fromJSON(data: IGetManyUsersResponse): GetManyUsersResponse;
}
