import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IGetSuggestionMessage extends IMessage {
    id: string;
    documentId: string;
}
export default class GetSuggestionMessage extends Message {
    readonly id: string;
    readonly documentId: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(id: string, documentId: string);
    toJSON(): IGetSuggestionMessage;
    static fromJSON(object: IGetSuggestionMessage): GetSuggestionMessage;
}
