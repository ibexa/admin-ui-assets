import Descriptor, { IDescriptorBody } from './../../descriptor.js';
import { IRevisionObject } from '../revision.js';
interface IBaseRevision {
    /**
     * As diffData property contains large size document data so this property is stringified and parsed only on the frontend side.
     *
     * Explanation:
     * This is some kind of optimization for the backend. Usually, we did that the properties that was passed into some Message constructor,
     * after serialization and deserialization were in the same format. Currently, as the diffData that goes into the message is large
     * object and we do not need to do any logic operations on that property on the backend side after receiving the Message (we will just
     * push them to the database), there is no need to do JSON.parse() when deserializing the message and again JSON.stringify() before
     * pushing them into the database.
     *
     * That is why JSON.parse() and JSON.stringify() was not used in toJson() and fromJSON() methods.
     */
    diffData?: string;
    revisionId: string;
    name?: string;
    creatorId?: string;
    fromVersion?: number;
    toVersion?: number;
    isEmptyCurrent?: boolean;
}
export interface IRevisionJSON extends IBaseRevision {
    createdAt?: string;
    attributes?: string;
    authorsIds?: string;
}
export interface IRevision extends IBaseRevision {
    createdAt?: Date;
    attributes?: Record<string, unknown>;
    authorsIds?: string[];
}
export default class RevisionDescriptor extends Descriptor {
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    static create(object: IRevisionObject): IRevision;
    static toJSON(revision: IRevision): IRevisionJSON;
    static fromJSON(json: IRevisionJSON): IRevision;
    static toObject(revision: IRevision): IRevisionObject;
}
export {};
