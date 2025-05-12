/// <reference types="node" />
/// <reference types="node" />
import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { IOperationMetadata, IOperationMetadataJSON } from '../descriptors/operationmetadatadescriptor.js';
export interface ICollaborativeEditingConnectResponse extends IMessage {
    channel: string;
    offset: number;
    version: number;
    sessionId: string;
    buffers: Buffer[] | Uint8Array[];
    types: number[];
    metadata: IOperationMetadataJSON[];
    initData: string;
    isInitialized: boolean;
    lastOperationId?: string;
    sessionCreatedAt: string | null;
}
interface ICollaborativeEditingConnectResponseParams {
    channel: string;
    version: number;
    sessionId?: string;
    buffers?: Buffer[] | Uint8Array[];
    types?: number[];
    offset?: number;
    metadata?: IOperationMetadata[];
    initData?: string | null;
    lastOperationId?: string;
    sessionCreatedAt: Date | null;
}
interface ICollaborativeEditingConnectResponseData {
    buffers: Buffer[] | Uint8Array[];
    types: number[];
    baseVersion: number;
    lastOperationId?: string;
    sessionCreatedAt: Date | null;
}
export default class CollaborativeEditingConnectResponse extends Message {
    readonly channel: string;
    readonly version: number;
    readonly buffers: Buffer[] | Uint8Array[];
    readonly types: number[];
    readonly offset: number;
    readonly metadata: IOperationMetadata[];
    readonly initData: string | null;
    readonly sessionId: string;
    readonly lastOperationId: string;
    readonly sessionCreatedAt: Date | null;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    /**
     * @deprecated - Use CollaborativeEditingConnectResponse.create factory method instead.
     *
     * @param channel - Name of channel on which messages will be published.
     * @param version - Version of the document.
     * @param buffers - List of operations compressed to the binary format.
     * @param types - List of compressor identifiers.
     * @param offset - Number of changes in previous editing sessions.
     * @param metadata - Metadata of changes.
     * @param initData - Initialization data of the document.
     */
    constructor(channel: string, version: number, buffers?: Buffer[] | Uint8Array[], types?: number[], offset?: number, metadata?: IOperationMetadata[], initData?: string | null, sessionId?: string, lastOperationId?: string, sessionCreatedAt?: Date | null);
    get data(): ICollaborativeEditingConnectResponseData;
    get wereChangesApplied(): boolean;
    toJSON(): ICollaborativeEditingConnectResponse;
    static create(params: ICollaborativeEditingConnectResponseParams): CollaborativeEditingConnectResponse;
    static fromJSON(data: ICollaborativeEditingConnectResponse): CollaborativeEditingConnectResponse;
}
export {};
