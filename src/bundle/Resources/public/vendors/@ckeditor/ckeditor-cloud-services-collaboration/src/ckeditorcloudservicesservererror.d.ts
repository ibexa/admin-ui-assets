export interface IPublicError {
    message: string;
    traceId?: string;
    data?: Record<string, unknown>;
    code?: string;
    explanation?: string;
    action?: string;
}
export default class CKEditorCloudServicesServerError extends Error {
    readonly code?: string;
    readonly traceId?: string;
    readonly data?: Record<string, unknown>;
    private constructor();
    static fromPublicError(publicError: IPublicError): CKEditorCloudServicesServerError;
}
