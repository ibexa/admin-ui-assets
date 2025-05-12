import Message from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IBatchUpdateSuggestionsStateMessage {
    ids: string[];
    documentId: string;
    state: string;
}
export default class BatchUpdateSuggestionsStateMessage extends Message {
    ids: string[];
    documentId: string;
    state: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(ids: string[], documentId: string, state: string);
    toJSON(): IBatchUpdateSuggestionsStateMessage;
    static fromJSON(object: IBatchUpdateSuggestionsStateMessage): BatchUpdateSuggestionsStateMessage;
}
