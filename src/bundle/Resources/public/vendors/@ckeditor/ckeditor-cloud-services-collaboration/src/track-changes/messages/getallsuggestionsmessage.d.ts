import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IGetAllSuggestionsMessage extends IMessage {
    documentId: string;
}
export default class GetAllSuggestionsMessage extends Message {
    readonly documentId: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(documentId: string);
    toJSON(): IGetAllSuggestionsMessage;
    static fromJSON(object: IGetAllSuggestionsMessage): GetAllSuggestionsMessage;
}
