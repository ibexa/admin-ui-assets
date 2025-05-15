/// <reference types="node" />
/// <reference types="node" />
import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { IOperationMetadata, IOperationMetadataJSON } from '../descriptors/operationmetadatadescriptor.js';
export interface ICollaborativeEditingResponse extends IMessage {
    version: number;
    buffers: Buffer[];
    types: number[];
    metadata: IOperationMetadataJSON[];
    lastOperationId: string;
    lastOperationAcceptedAt: string | null;
}
interface ICollaborativeEditingResponseParams {
    version: number;
    buffers?: Buffer[];
    types?: number[];
    metadata?: IOperationMetadata[];
    lastOperationId?: string;
    lastOperationAcceptedAt?: string | null;
}
interface ICollaborativeEditingResponseData {
    buffers: Buffer[];
    types: number[];
    baseVersion: number;
    lastOperationId: string;
    lastOperationAcceptedAt: Date | null;
}
export default class CollaborativeEditingResponse extends Message {
    readonly version: number;
    readonly buffers: Buffer[];
    readonly types: number[];
    readonly metadata: IOperationMetadata[];
    readonly lastOperationId: string;
    readonly lastOperationAcceptedAt: Date | null;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    /**
     * @deprecated - Use CollaborativeEditingResponse.create factory method instead.
     * @param version - Version of the document.
     * @param buffers - List of operations compressed to the binary format.
     * @param types - List of compressor identifiers.
     * @param metadata - Metadata of changes.
     */
    constructor(version: number, buffers?: Buffer[], types?: number[], metadata?: IOperationMetadata[], lastOperationId?: string, lastOperationAcceptedAt?: Date | null);
    get data(): ICollaborativeEditingResponseData;
    get wereChangesApplied(): boolean;
    toJSON(): ICollaborativeEditingResponse;
    static fromJSON(data: ICollaborativeEditingResponse): CollaborativeEditingResponse;
    static create(data: ICollaborativeEditingResponseParams): CollaborativeEditingResponse;
}
export {};
