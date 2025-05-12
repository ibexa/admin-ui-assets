import { IWebSocketGateway } from '../websocketgateway/websocketgateway.js';
export declare const _SERVICE: number;
declare const EditorService_base: {
    new (): import("ckeditor5/src/utils.js").Emitter;
    prototype: import("ckeditor5/src/utils.js").Emitter;
};
declare class EditorService extends /* #__PURE__ -- @preserve */ EditorService_base {
    private static readonly _SERVICE;
    static isBundleUploaded(wsGateway: IWebSocketGateway, bundleVersion: string): Promise<boolean>;
}
export default EditorService;
