import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface ISessionsConnectMessage extends IMessage {
    id: string;
    sessionType: number | string;
}
export default class SessionsConnectMessage extends Message {
    readonly id: string;
    readonly sessionType: string | number;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(id: string, sessionType: string | number);
    toJSON(): ISessionsConnectMessage;
    static fromJSON(data: ISessionsConnectMessage): SessionsConnectMessage;
}
