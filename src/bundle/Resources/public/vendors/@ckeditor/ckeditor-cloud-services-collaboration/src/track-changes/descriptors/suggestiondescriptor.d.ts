import Descriptor, { IDescriptorBody } from './../../descriptor.js';
interface ICommonSuggestion {
    id: string;
    authorId: string;
    type: string;
    hasComments?: boolean;
    state?: string;
}
export interface ISuggestion extends ICommonSuggestion {
    createdAt?: Date;
    data?: Record<string, unknown> | null;
    attributes?: Record<string, unknown> | null;
}
export interface ISuggestionJSON extends ICommonSuggestion {
    createdAt?: string;
    data?: string | null;
    attributes?: string | null;
}
export default class SuggestionDescriptor extends Descriptor {
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    static toJSON(suggestion: ISuggestion): ISuggestionJSON;
    static fromJSON(suggestion: ISuggestionJSON): ISuggestion;
}
export {};
