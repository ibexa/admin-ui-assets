import Message, { IMessage } from './../../message.js';
import { IDescriptorBody } from '../../descriptor.js';
import { IThread, IThreadJSON } from '../descriptors/commentsthreaddescriptor.js';
export interface IGetDocumentThreadsResponse extends IMessage {
    threads?: string[];
    threadsV2?: IThreadJSON[];
}
export default class GetDocumentThreadsResponse extends Message {
    private readonly _threads?;
    private readonly _threadsV2?;
    readonly threads: IThread[];
    static readonly DESCRIPTOR_NAME: string;
    static readonly DESCRIPTOR: IDescriptorBody;
    constructor(_threads?: IThread[] | undefined, _threadsV2?: IThread[] | undefined);
    toJSON(): IGetDocumentThreadsResponse;
    static fromJSON(object: IGetDocumentThreadsResponse): GetDocumentThreadsResponse;
}
