import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { IRevision, IRevisionJSON } from '../descriptors/revisiondescriptor.js';
import { IRevisionObject } from '../revision.js';
export interface IRevisionHistoryConnectResponseJSON extends IMessage {
    channel: string;
    requestId: number;
    revisions: IRevisionJSON[];
}
export interface IRevisionHistoryConnectResponseObject {
    channel: string;
    requestId: number;
    revisions: IRevisionObject[];
}
export default class RevisionHistoryConnectResponse extends Message {
    readonly channel: string;
    readonly requestId: number;
    readonly revisions: IRevision[];
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(channel: string, requestId: number, revisions: IRevision[]);
    toJSON(): IRevisionHistoryConnectResponseJSON;
    /**
     * Creates frontend revision history model from message sent from the backend.
     *
     * This method is intended to be used on the frontend side after receiving the response from the backend.
     */
    toObject(): IRevisionHistoryConnectResponseObject;
    static fromJSON(json: IRevisionHistoryConnectResponseJSON): RevisionHistoryConnectResponse;
}
