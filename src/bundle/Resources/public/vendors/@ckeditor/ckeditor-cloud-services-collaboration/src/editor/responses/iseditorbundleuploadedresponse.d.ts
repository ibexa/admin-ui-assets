import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
export interface IIsEditorBundleUploadedResponse extends IMessage {
    isUploaded: boolean;
}
export default class IsEditorBundleUploadedResponse extends Message {
    readonly isUploaded: boolean;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(isUploaded: boolean);
    toJSON(): IIsEditorBundleUploadedResponse;
    static fromJSON(json: IIsEditorBundleUploadedResponse): IsEditorBundleUploadedResponse;
}
