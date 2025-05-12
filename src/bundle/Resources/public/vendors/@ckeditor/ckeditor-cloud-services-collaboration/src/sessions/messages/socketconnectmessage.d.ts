import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface ISocketConnectMessage extends IMessage {
    id: string;
    userId?: string;
    role?: string;
    permissions?: string[];
}
export default class SocketConnectMessage extends Message {
    readonly id: string;
    readonly userId?: string | undefined;
    readonly role?: string | undefined;
    readonly permissions?: string[] | undefined;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(id: string, userId?: string | undefined, role?: string | undefined, permissions?: string[] | undefined);
    toJSON(): ISocketConnectMessage;
    static fromJSON(data: ISocketConnectMessage): SocketConnectMessage;
}
