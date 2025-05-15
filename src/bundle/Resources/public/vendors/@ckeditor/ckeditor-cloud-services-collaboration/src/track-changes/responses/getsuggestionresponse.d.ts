import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IGetSuggestionResponse extends IMessage {
    id: string;
    authorId: string;
    type: string;
    createdAt: string;
    data: string;
    hasComments: boolean;
    state: string;
    attributes: string | null;
}
export default class GetSuggestionResponse extends Message {
    readonly id: string;
    readonly authorId: string;
    readonly type: string;
    readonly hasComments: boolean;
    readonly state: string;
    readonly data: Record<string, unknown>;
    readonly attributes: Record<string, unknown> | null;
    readonly createdAt: Date;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(id: string, authorId: string, type: string, createdAt: string, hasComments: boolean, state: string, data?: Record<string, unknown>, attributes?: Record<string, unknown> | null);
    toJSON(): IGetSuggestionResponse;
    static fromJSON(data: IGetSuggestionResponse): GetSuggestionResponse;
}
