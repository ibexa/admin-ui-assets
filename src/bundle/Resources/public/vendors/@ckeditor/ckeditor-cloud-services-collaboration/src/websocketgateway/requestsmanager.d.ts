import CKEditorCloudServicesError from '../ckeditorcloudserviceserror.js';
import CKEditorCloudServicesServerError from '../ckeditorcloudservicesservererror.js';
import { IMessage } from '../message.js';
import WebSocketGateway from './websocketgateway.js';
interface IWebSocketRequest<TResponse extends IMessage> {
    response(response: TResponse): void;
    error(error: CKEditorCloudServicesError | CKEditorCloudServicesServerError): void;
}
export default class WebSocketGatewayRequestsManager {
    private readonly _context;
    private readonly _requests;
    constructor(_context: WebSocketGateway);
    send<TResponse extends IMessage>(sendFunction: (req: IWebSocketRequest<TResponse>) => void, timeoutMs?: number): Promise<TResponse>;
    errorAll(error: CKEditorCloudServicesError): void;
    waitForAllRequests(time?: number): Promise<void>;
    private _createRequest;
    private _finishRequest;
    private _waitForRequests;
}
export {};
