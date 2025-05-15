import Descriptor, { IDescriptorConstructor } from './descriptor.js';
export interface IMessageConstructor extends IDescriptorConstructor {
    new (...args: unknown[]): Message;
    readonly TYPE: string | number;
    readonly READABLE_TYPE_NAME: string;
    fromJSON(object: IMessage): Message;
}
export interface IMessage {
}
export default abstract class Message extends Descriptor {
    ['constructor']: IMessageConstructor;
    static readonly TYPE: string | number;
    static readonly READABLE_TYPE_NAME: string;
    constructor(...args: unknown[]);
    abstract toJSON(): IMessage;
    static fromJSON(object: IMessage): Message;
}
