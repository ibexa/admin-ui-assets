import CKEditorCloudServicesError from '../ckeditorcloudserviceserror.js';
export default class ServiceNotConnectedError extends CKEditorCloudServicesError {
    constructor(serviceName: string, context?: unknown);
}
