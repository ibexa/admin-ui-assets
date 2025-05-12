import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IAddSuggestionMessage extends IMessage {
    id: string;
    documentId: string;
    type: string;
    data: string;
    originalSuggestionId: string | null;
    attributes: string | null;
}
export default class AddSuggestionMessage extends Message {
    readonly id: string;
    readonly documentId: string;
    readonly type: string;
    readonly data: Record<string, unknown>;
    readonly originalSuggestionId: string | null;
    readonly attributes: Record<string, unknown> | null;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(id: string, documentId: string, type: string, data?: Record<string, unknown>, originalSuggestionId?: string | null, attributes?: Record<string, unknown> | null);
    toJSON(): IAddSuggestionMessage;
    static fromJSON(object: IAddSuggestionMessage): AddSuggestionMessage;
}
