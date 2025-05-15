import { IDescriptorBody } from '../../descriptor.js';
import Message, { IMessage } from './../../message.js';
export interface IGetDocumentDetailsResponse extends IMessage {
    lastDocumentSessionId?: string;
    lastDocumentSessionOperationId?: string;
    currentDocumentSessionId?: string;
    currentDocumentSessionVersion?: number;
    currentDocumentSessionOperationId?: string;
}
export interface ICurrentDocumentSession {
    lastOperationId?: string;
    version?: number;
    id?: string;
}
export interface ILastDocumentSession {
    id?: string;
    lastOperationId?: string;
}
export default class GetDocumentDetailsResponse extends Message {
    readonly lastDocumentSession?: ILastDocumentSession | undefined;
    readonly currentDocumentSession?: ICurrentDocumentSession | undefined;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(lastDocumentSession?: ILastDocumentSession | undefined, currentDocumentSession?: ICurrentDocumentSession | undefined);
    get data(): IGetDocumentDetailsResponse;
    toJSON(): IGetDocumentDetailsResponse;
    static fromJSON(data: IGetDocumentDetailsResponse): GetDocumentDetailsResponse;
}
