import { IOperationMetadata, IOperationMetadataJSON } from '../descriptors/operationmetadatadescriptor.js';
export default class OperationMetadataHelpers {
    /**
     * Prepares metadata data for all operations. Adds metadata to operations with type 0.
     */
    static prepareMetadataForOperations(types: number[], metadata: IOperationMetadataJSON[]): IOperationMetadataJSON[];
    /**
     * Removes unnecessary metadata for operations with type 0.
     */
    static removeUnnecessaryMetadata(types: number[], metadata: IOperationMetadata[]): IOperationMetadata[];
}
