import AddCommentResponse from './responses/addcommentresponse.js';
import { IWebSocketGateway } from './../websocketgateway/websocketgateway.js';
import { IThread } from './descriptors/commentsthreaddescriptor.js';
import SessionCollection from '../sessions/sessioncollection.js';
import { IComment } from './descriptors/commentdescriptor.js';
import AddCommentThreadResponse from './responses/comment-threads/addcommentthreadresponse.js';
import ResolveCommentThreadResponse from './responses/comment-threads/resolvecommentthreadresponse.js';
export declare const _SERVICE: number;
export interface IAddCommentThreadParams {
    commentThreadId: string;
    context?: Record<string, unknown> | null;
    comments?: IComment[];
    resolvedAt?: Date | string | null;
    createdAt?: Date | string | null;
    resolvedBy?: string | null;
    deletedAt?: Date | null | string;
    attributes?: Record<string, unknown> | null;
}
export interface IUpdateCommentThreadParams {
    commentThreadId: string;
    context?: Record<string, unknown> | null;
    attributes?: Record<string, unknown> | null;
    unlinkedAt?: Date | null | string;
}
declare const CommentsService_base: {
    new (): import("ckeditor5/src/utils.js").Emitter;
    prototype: import("ckeditor5/src/utils.js").Emitter;
};
declare class CommentsService extends /* #__PURE__ -- @preserve */ CommentsService_base {
    private readonly _documentId;
    private _isConnected;
    private _wsGateway?;
    private _channel?;
    private _connectedSessions?;
    private static readonly _SERVICE;
    constructor(_documentId: string);
    get isConnected(): boolean;
    /**
     * Connects to WebSocketGateway and starts listening on channel.
     */
    connect(wsGateway: IWebSocketGateway): Promise<IThread[] | void>;
    /**
     * Disconnects CommentsService from CKEditor Cloud Services.
     */
    disconnect(): void;
    addComment(commentThreadId: string, commentId: string, content: string, attributes?: Record<string, unknown>): Promise<AddCommentResponse>;
    updateComment(commentThreadId: string, commentId: string, content: string, attributes?: Record<string, unknown>): Promise<void>;
    removeComment(commentThreadId: string, commentId: string): Promise<void>;
    removeCommentThread(commentThreadId: string): Promise<void>;
    addCommentThread(addCommentThreadParams: IAddCommentThreadParams): Promise<AddCommentThreadResponse>;
    resolveCommentThread(commentThreadId: string): Promise<ResolveCommentThreadResponse>;
    reopenCommentThread(commentThreadId: string): Promise<void>;
    updateCommentThread(params: IUpdateCommentThreadParams): Promise<void>;
    getCommentThread(commentThreadId: string, attempt?: number): Promise<IThread>;
    getDocumentThreads(): Promise<{
        threads: IThread[];
    }>;
    /**
     * Returns read-only observable collection with EndUsers Sessions for comments service.
     */
    getConnectedSessions(): Promise<SessionCollection>;
    /**
     * Starts to listen on a given channel.
     */
    private _connectToChannel;
    /**
     * Processes websocket gateway state changes.
     */
    private _onWsGatewayStateChange;
    private _sendRequest;
}
export default CommentsService;
