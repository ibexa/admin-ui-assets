import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IRevisionHistoryGetRevisionMessage extends IMessage {
    documentId: string;
    revisionId: string;
}
export default class RevisionHistoryGetRevisionMessage extends Message {
    readonly documentId: string;
    readonly revisionId: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(documentId: string, revisionId: string);
    toJSON(): IRevisionHistoryGetRevisionMessage;
    static fromJSON(object: IRevisionHistoryGetRevisionMessage): RevisionHistoryGetRevisionMessage;
}
