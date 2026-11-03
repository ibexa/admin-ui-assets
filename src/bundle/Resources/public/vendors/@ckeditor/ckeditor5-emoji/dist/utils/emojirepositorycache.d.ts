/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/utils/emojirepositorycache
*/
import type { EmojiCdnResource, EmojiEntry } from "../emojirepository.js";
/**
* Cache for emoji repository data.
*
* @internal
*/
export declare class EmojiRepositoryCache {
	/**
	* Fetch-and-transform promises, keyed by composite key.
	*/
	private _cache;
	/**
	* Fetches emoji data for `url`, runs it through `transform`, and caches the result.
	* At most one HTTP request is issued per unique `[url, ...cacheKeys]` combination.
	* Returns `[]` on network or HTTP failure.
	*
	* @param params Fetch parameters.
	* @param params.url URL of the emoji repository JSON file.
	* @param params.cacheKeys Extra segments that differentiate results for the same URL.
	*   The URL itself is always the first segment of the composite key.
	* @param params.transform Converts raw CDN resources into `EmojiEntry` objects.
	*/
	fetch({ url, cacheKeys, transform }: FetchParams): Promise<Array<EmojiEntry>>;
	/**
	* Synchronously returns the already-transformed array for the given `url` + `cacheKeys`,
	* or `null` if the result is not yet available.
	*/
	getSync({ url, cacheKeys }: CacheKeyParams): Array<EmojiEntry> | null;
	/**
	* Clears the cache.
	*/
	clear(): void;
}
type CacheKeyParams = {
	url: string;
	cacheKeys: Array<string>;
};
type FetchParams = CacheKeyParams & {
	transform: (raw: Array<EmojiCdnResource>) => Array<EmojiEntry>;
};
export {};
