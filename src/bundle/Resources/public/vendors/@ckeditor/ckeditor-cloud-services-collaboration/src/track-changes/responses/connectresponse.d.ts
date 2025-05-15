import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { ISuggestion, ISuggestionJSON } from '../descriptors/suggestiondescriptor.js';
export interface IConnectResponse extends IMessage {
    channel: string;
    suggestions?: string[];
    suggestionsV2?: ISuggestionJSON[];
}
export default class ConnectResponse extends Message {
    readonly channel: string;
    private readonly _suggestions?;
    private readonly _suggestionsV2?;
    readonly suggestions: ISuggestion[];
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(channel: string, _suggestions?: ISuggestion[] | undefined, _suggestionsV2?: ISuggestion[] | undefined);
    toJSON(): IConnectResponse;
    static fromJSON(object: IConnectResponse): ConnectResponse;
}
