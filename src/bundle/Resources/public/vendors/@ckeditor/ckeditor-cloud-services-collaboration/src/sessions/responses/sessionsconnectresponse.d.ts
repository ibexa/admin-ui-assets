import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { ISocket } from '../sessioncollection.js';
export interface ISessionsConnectResponse extends IMessage {
    channel: string;
    sockets: {
        user?: string;
        session: string;
        role?: string;
        permissions?: string[];
    }[];
}
export default class SessionsConnectResponse extends Message {
    readonly channel: string;
    readonly sockets: ISocket[];
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(channel: string, sockets?: ISocket[]);
    toJSON(): ISessionsConnectResponse;
    static fromJSON(data: ISessionsConnectResponse): SessionsConnectResponse;
}
