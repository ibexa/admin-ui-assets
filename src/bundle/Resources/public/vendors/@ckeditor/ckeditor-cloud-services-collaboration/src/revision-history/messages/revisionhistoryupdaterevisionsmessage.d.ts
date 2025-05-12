import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { IRevisionObject } from '../revision.js';
import { IRevisionJSON, IRevision } from '../descriptors/revisiondescriptor.js';
export interface IRevisionHistoryUpdateRevisions {
    documentId: string;
    requestId: number;
    revisions: IRevisionObject[];
}
export interface IRevisionHistoryUpdateRevisionsMessageJSON extends IMessage {
    documentId: string;
    requestId: number;
    revisions: IRevisionJSON[];
}
export default class RevisionHistoryUpdateRevisionsMessage extends Message {
    readonly documentId: string;
    readonly requestId: number;
    readonly revisions: IRevision[];
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(documentId: string, requestId: number, revisions: IRevision[]);
    toJSON(): IRevisionHistoryUpdateRevisionsMessageJSON;
    /**
     * Creates frontend revision history model array from message sent from the backend.
     *
     * This method is intended to be used on the frontend side after receiving the broadcast message from the backend.
     */
    toObject(): IRevisionHistoryUpdateRevisions;
    /**
     * Creates RevisionHistoryUpdateRevisionsMessage from frontend revision model array.
     *
     * This method is intended to be used on the frontend to create RevisionHistoryUpdateRevisionsMessage.
     *
     * This is optimization to prevent recreating the same revision models on the backend side
     * as we just save these data in the database without need to parse them.
     */
    static create(params: IRevisionHistoryUpdateRevisions): RevisionHistoryUpdateRevisionsMessage;
    static fromJSON(json: IRevisionHistoryUpdateRevisionsMessageJSON): RevisionHistoryUpdateRevisionsMessage;
}
