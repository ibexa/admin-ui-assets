import AddSuggestionResponse from './responses/addsuggestionresponse.js';
import GetSuggestionResponse from './responses/getsuggestionresponse.js';
import { IWebSocketGateway } from '../websocketgateway/websocketgateway.js';
import { ISuggestion } from './descriptors/suggestiondescriptor.js';
export declare const _SERVICE: number;
interface ISuggestionUpdateProps {
    hasComments?: boolean;
    state?: string;
    attributes?: Record<string, unknown>;
}
export interface IBatchUpdateSuggestionsStateParams {
    ids: string[];
    state: string;
}
declare const TrackChangesService_base: {
    new (): import("ckeditor5/src/utils.js").Emitter;
    prototype: import("ckeditor5/src/utils.js").Emitter;
};
declare class TrackChangesService extends /* #__PURE__ -- @preserve */ TrackChangesService_base {
    private readonly _documentId;
    private _isConnected;
    private _wsGateway?;
    private _channel?;
    private static readonly _SERVICE;
    constructor(_documentId: string);
    get isConnected(): boolean;
    /**
     * Connects to WebSocketGateway and starts listening on channel.
     */
    connect(wsGateway: IWebSocketGateway): Promise<ISuggestion[] | void>;
    /**
     * Disconnects TrackChangesService from CKEditor Cloud Services.
     */
    disconnect(): void;
    /**
     * Adds suggestion and returns AddSuggestionResponse.
     */
    add(id: string, type: string, data: Record<string, unknown>, originalSuggestionId?: string | null, attributes?: Record<string, unknown>): Promise<AddSuggestionResponse>;
    /**
     * Returns suggestion with given id.
     */
    get(id: string, attempt?: number): Promise<GetSuggestionResponse>;
    /**
     * Returns suggestions from given documentId.
     */
    getAll(): Promise<ISuggestion[]>;
    /**
     * Updates suggestion.
     */
    update(id: string, props?: ISuggestionUpdateProps): Promise<void>;
    batchUpdateState(params: IBatchUpdateSuggestionsStateParams): Promise<void>;
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
export default TrackChangesService;
