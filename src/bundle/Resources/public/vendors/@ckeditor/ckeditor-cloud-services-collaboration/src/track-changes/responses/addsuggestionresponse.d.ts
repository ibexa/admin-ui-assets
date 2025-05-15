import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IAddSuggestionResponse extends IMessage {
    id: string;
    authorId: string;
    type: string;
    createdAt?: string;
    data: string;
    hasComments?: boolean;
    state?: string;
    attributes: string | null;
}
export default class AddSuggestionResponse extends Message {
    readonly id: string;
    readonly authorId: string;
    readonly type: string;
    readonly hasComments?: boolean | undefined;
    readonly state?: string | undefined;
    readonly data: Record<string, unknown> | null;
    readonly attributes: Record<string, unknown> | null;
    readonly createdAt?: Date;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(id: string, authorId: string, type: string, createdAt?: string, hasComments?: boolean | undefined, state?: string | undefined, data?: Record<string, unknown> | null, attributes?: Record<string, unknown> | null);
    toJSON(): IAddSuggestionResponse;
    static fromJSON(data: IAddSuggestionResponse): AddSuggestionResponse;
}
