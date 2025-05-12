/// <reference types="node" />
/// <reference types="node" />
import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { IOperationMetadata, IOperationMetadataJSON } from '../descriptors/operationmetadatadescriptor.js';
export interface ICollaborativeEditingUpdateMessage extends IMessage {
    id: string;
    buffers: Buffer[] | Uint8Array[];
    types: number[];
    baseVersion: number;
    metadata: IOperationMetadataJSON[];
    lastOperationId?: string;
}
interface ICollaborativeEditingUpdateData {
    buffers: Buffer[] | Uint8Array[];
    types: number[];
    baseVersion: number;
    lastOperationId?: string;
}
export default class CollaborativeEditingUpdateMessage extends Message {
    readonly id: string;
    readonly buffers: Buffer[] | Uint8Array[];
    readonly types: number[];
    readonly baseVersion: number;
    readonly metadata: IOperationMetadata[];
    readonly lastOperationId: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(id: string, buffers: Buffer[] | Uint8Array[], types: number[], baseVersion: number, metadata?: IOperationMetadata[], lastOperationId?: string);
    /**
     * Returns compressed data of the operations.
     */
    get data(): ICollaborativeEditingUpdateData;
    toJSON(): ICollaborativeEditingUpdateMessage;
    static fromJSON(data: ICollaborativeEditingUpdateMessage): CollaborativeEditingUpdateMessage;
}
export {};
