import Message, { IMessage } from './../../../message.js';
import { IDescriptorBody } from '../../../descriptor.js';
export interface IPacketOptionsMessage extends IMessage {
    flags?: string;
    rooms?: string[];
    except?: string[];
}
export default class PacketOptionsMessage extends Message {
    readonly flags?: Record<string, unknown> | undefined;
    readonly rooms: string[];
    readonly except: string[];
    static readonly TYPE: number;
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(flags?: Record<string, unknown> | undefined, rooms?: string[], except?: string[]);
    toJSON(): IPacketOptionsMessage;
    static fromJSON(data: IPacketOptionsMessage): PacketOptionsMessage;
}
