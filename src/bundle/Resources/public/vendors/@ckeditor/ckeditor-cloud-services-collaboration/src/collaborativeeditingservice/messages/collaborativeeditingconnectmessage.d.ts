/// <reference types="node" />
/// <reference types="node" />
import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface ICollaborativeEditingConnectMessage extends IMessage {
    id: string;
    bundleVersion: string;
    buffers: Buffer[];
    types: number[];
    lastOperationId?: string;
}
export default class CollaborativeEditingConnectMessage extends Message {
    readonly id: string;
    readonly buffers: Buffer[];
    readonly types: number[];
    readonly bundleVersion: string;
    readonly lastOperationId: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(id: string, buffers: Buffer[], types: number[], bundleVersion: string, lastOperationId?: string);
    toJSON(): ICollaborativeEditingConnectMessage;
    static fromJSON(data: ICollaborativeEditingConnectMessage): CollaborativeEditingConnectMessage;
}
