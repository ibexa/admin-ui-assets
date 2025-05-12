import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { ISuggestion, ISuggestionJSON } from '../descriptors/suggestiondescriptor.js';
export interface IGetAllSuggestionResponse extends IMessage {
    suggestions?: string[];
    suggestionsV2?: ISuggestionJSON[];
}
export default class GetAllSuggestionResponse extends Message {
    private readonly _suggestions?;
    private readonly _suggestionsV2?;
    readonly suggestions: ISuggestion[];
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(_suggestions?: ISuggestion[] | undefined, _suggestionsV2?: ISuggestion[] | undefined);
    toJSON(): IGetAllSuggestionResponse;
    static fromJSON(data: IGetAllSuggestionResponse): GetAllSuggestionResponse;
}
