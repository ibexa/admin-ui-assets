import Descriptor, { IDescriptorBody } from './../../descriptor.js';
interface IBaseOperationMetadata {
    userId: string;
    type?: string;
}
export interface IOperationMetadata extends IBaseOperationMetadata {
    createdAt?: Date;
}
export interface IOperationMetadataJSON extends IBaseOperationMetadata {
    createdAt?: string;
}
export default class OperationMetadataDescriptor extends Descriptor {
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    static toJSON({ createdAt, ...metadata }: IOperationMetadata): IOperationMetadataJSON;
    static fromJSON({ createdAt, ...metadata }: IOperationMetadataJSON): IOperationMetadata;
}
export {};
