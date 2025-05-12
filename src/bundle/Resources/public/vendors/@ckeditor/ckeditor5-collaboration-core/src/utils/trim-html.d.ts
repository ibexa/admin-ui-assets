/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module collaboration-core/utils/trim-html
 */
/**
 * Trims text inside a html tags and takes care of all closing tags.
 *
 * @param html
 * @param options
 * @param limit Limit of the characters.
 * @param suffix
 */
export default function trimHtml(html: string, { limit, suffix }: {
    limit: number;
    suffix?: string;
}): string;
