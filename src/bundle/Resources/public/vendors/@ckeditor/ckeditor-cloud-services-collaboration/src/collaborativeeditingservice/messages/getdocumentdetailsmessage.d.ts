import Message from '../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IGetDocumentDetailsMessage {
    documentId: string;
}
export default class GetDocumentDetailsMessage extends Message {
    readonly documentId: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(documentId: string);
    get data(): IGetDocumentDetailsMessage;
    toJSON(): IGetDocumentDetailsMessage;
    static fromJSON(data: IGetDocumentDetailsMessage): GetDocumentDetailsMessage;
}
