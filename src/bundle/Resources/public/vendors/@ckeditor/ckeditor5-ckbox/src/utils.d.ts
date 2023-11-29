/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ckbox/utils
 */
import type { InitializedToken } from '@ckeditor/ckeditor5-cloud-services';
import type { CKBoxImageUrls } from './ckboxconfig';
/**
 * Converts image source set provided by the CKBox into an object containing:
 * - responsive URLs for the "webp" image format,
 * - one fallback URL for browsers that do not support the "webp" format.
 */
export declare function getImageUrls(imageUrls: CKBoxImageUrls): {
    imageFallbackUrl: string;
    imageSources: Array<{
        srcset: string;
        sizes: string;
        type: string;
    }>;
};
/**
 * Returns a workspace id to use for communication with the CKBox service.
 *
 * @param defaultWorkspaceId The default workspace to use taken from editor config.
 */
export declare function getWorkspaceId(token: InitializedToken, defaultWorkspaceId?: string): string | null;
/**
 * Generates an image data URL from its `blurhash` representation.
 */
export declare function blurHashToDataUrl(hash?: string): string | undefined;
