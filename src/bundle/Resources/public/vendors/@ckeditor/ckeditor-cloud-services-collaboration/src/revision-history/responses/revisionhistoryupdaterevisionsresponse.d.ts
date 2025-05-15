import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IRevisionHistoryUpdateRevisionsResponse extends IMessage {
    requestId: number;
}
export default class RevisionHistoryUpdateRevisionsResponse extends Message {
    readonly requestId: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(requestId: number);
    toJSON(): IRevisionHistoryUpdateRevisionsResponse;
    static fromJSON(json: IRevisionHistoryUpdateRevisionsResponse): RevisionHistoryUpdateRevisionsResponse;
}
