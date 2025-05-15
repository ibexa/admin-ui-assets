import Message, { IMessage, IMessageConstructor } from '../../../message.js';
export interface IPackageDataMessageConstructor extends IMessageConstructor {
    new (...args: unknown[]): PackageDataMessage;
    readonly TYPE: number;
    create(data: unknown, data1: unknown): PackageDataMessage;
}
export interface IPackageDataMessage extends IMessage {
    readonly data?: unknown;
    readonly data1?: unknown;
}
export default abstract class PackageDataMessage extends Message {
    readonly data: unknown;
    readonly data1: unknown;
    ['constructor']: IPackageDataMessageConstructor;
    static create(data: unknown, data1: unknown): PackageDataMessage;
}
