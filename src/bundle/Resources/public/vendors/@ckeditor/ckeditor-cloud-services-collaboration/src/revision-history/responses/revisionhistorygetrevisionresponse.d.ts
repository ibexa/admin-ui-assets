import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { IRevisionObject } from '../revision.js';
import { IRevisionJSON, IRevision } from '../descriptors/revisiondescriptor.js';
export interface IRevisionHistoryGetRevisionResponseJSON extends IRevisionJSON, IMessage {
}
export default class RevisionHistoryGetRevisionResponse extends Message implements IRevision {
    readonly revisionId: string;
    readonly name?: string | undefined;
    readonly creatorId?: string | undefined;
    readonly authorsIds?: string[] | undefined;
    readonly createdAt?: Date | undefined;
    readonly diffData?: string | undefined;
    readonly attributes?: Record<string, unknown> | undefined;
    readonly fromVersion?: number | undefined;
    readonly toVersion?: number | undefined;
    readonly isEmptyCurrent?: boolean | undefined;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(revisionId: string, name?: string | undefined, creatorId?: string | undefined, authorsIds?: string[] | undefined, createdAt?: Date | undefined, diffData?: string | undefined, attributes?: Record<string, unknown> | undefined, fromVersion?: number | undefined, toVersion?: number | undefined, isEmptyCurrent?: boolean | undefined);
    toJSON(): IRevisionHistoryGetRevisionResponseJSON;
    /**
     * Creates frontend revision model from message sent from the backend.
     *
     * This method is intended to be used on the frontend side after receiving the response from the backend.
     */
    toObject(): IRevisionObject;
    static create(params: IRevision): RevisionHistoryGetRevisionResponse;
    static fromJSON(json: IRevisionHistoryGetRevisionResponseJSON): RevisionHistoryGetRevisionResponse;
}
