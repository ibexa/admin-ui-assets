import type { IType as ProtobufIType } from 'protobufjs';
export type IDescriptorBody = ProtobufIType;
export interface IDescriptorConstructor {
    new (...args: unknown[]): Descriptor;
    readonly DESCRIPTOR_NAME: string;
    readonly DESCRIPTOR: IDescriptorBody;
}
export default abstract class Descriptor {
    ['constructor']: IDescriptorConstructor;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(...args: unknown[]);
}
