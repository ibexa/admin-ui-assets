/// <reference types="node" />
/// <reference types="node" />
import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IChannelMessage extends IMessage {
    type: number;
    socketId: string;
    data: Buffer | ArrayBuffer;
}
/**
 * Default class for wrapping messages broadcasted by WebSocket Gateway on channels.
 */
export default class ChannelMessage extends Message {
    readonly type: number;
    readonly socketId: string;
    readonly data: Buffer | ArrayBuffer;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(type: number, socketId: string, data: Buffer | ArrayBuffer);
    toJSON(): IChannelMessage;
    static fromJSON(data: IChannelMessage): ChannelMessage;
}
