import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IIsEditorBundleUploadedMessage extends IMessage {
    bundleVersion: string;
}
export default class IsEditorBundleUploadedMessage extends Message {
    readonly bundleVersion: string;
    static readonly TYPE: string;
    static readonly READABLE_TYPE_NAME: string;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(bundleVersion: string);
    toJSON(): IIsEditorBundleUploadedMessage;
    static fromJSON(object: IIsEditorBundleUploadedMessage): IsEditorBundleUploadedMessage;
}
