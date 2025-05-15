import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface ICollaborativeEditingReconnectMessage extends IMessage {
    id: string;
    lastKnowVersion: number;
    bundleVersion: string;
}
export default class CollaborativeEditingReconnectMessage extends Message {
    readonly id: string;
    readonly lastKnowVersion: number;
    readonly bundleVersion: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(id: string, lastKnowVersion: number, bundleVersion: string);
    toJSON(): ICollaborativeEditingReconnectMessage;
    static fromJSON(data: ICollaborativeEditingReconnectMessage): CollaborativeEditingReconnectMessage;
}
