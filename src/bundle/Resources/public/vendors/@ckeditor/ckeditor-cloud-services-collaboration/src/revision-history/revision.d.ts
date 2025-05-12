/**
 * Revision History model used on the frontend side.
 */
export interface IRevisionObject {
    id: string;
    name?: string;
    creatorId?: string;
    authorsIds?: string[];
    fromVersion?: number;
    toVersion?: number;
    createdAt?: Date;
    isEmptyCurrent?: boolean;
    diffData?: Record<string, unknown>;
    attributes?: Record<string, unknown>;
}
