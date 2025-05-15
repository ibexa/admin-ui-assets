import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IUpdateSuggestionMessage extends IMessage {
    id: string;
    documentId: string;
    hasComments?: boolean;
    isHasCommentsModified: boolean;
    state?: string;
    attributes: string;
}
export default class UpdateSuggestionMessage extends Message {
    readonly id: string;
    readonly documentId: string;
    readonly hasComments: boolean | undefined;
    readonly isHasCommentsModified: boolean;
    readonly state?: string | undefined;
    readonly attributes: Record<string, unknown> | null;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(id: string, documentId: string, hasComments: boolean | undefined, isHasCommentsModified: boolean, state?: string | undefined, attributes?: Record<string, unknown> | null);
    toJSON(): IUpdateSuggestionMessage;
    static fromJSON(object: IUpdateSuggestionMessage): UpdateSuggestionMessage;
}
