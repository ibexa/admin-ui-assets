import { IPublicError } from './ckeditorcloudservicesservererror.js';
export default class CKEditorCloudServicesError extends Error {
    readonly context?: unknown;
    readonly code: string | null;
    readonly data: Record<string, unknown>;
    constructor(message: string, context?: unknown, code?: string | null, data?: Record<string, unknown>);
    static fromPublicError(publicError: IPublicError): CKEditorCloudServicesError;
}
