import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { IThread, IThreadJSON } from '../descriptors/commentsthreaddescriptor.js';
export interface IConnectResponse extends IMessage {
    channel: string;
    threads?: string[];
    threadsV2?: IThreadJSON[];
}
export default class ConnectResponse extends Message {
    readonly channel: string;
    private readonly _threads?;
    private readonly _threadsV2?;
    readonly threads: IThread[];
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(channel: string, _threads?: IThread[] | undefined, _threadsV2?: IThread[] | undefined);
    toJSON(): IConnectResponse;
    static fromJSON(object: IConnectResponse): ConnectResponse;
}
