/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { type Editor, Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { EmojiUtils } from "./emojiutils.js";
import type { EmojiSkinToneId } from "./emojiconfig.js";
/**
* The emoji repository plugin.
*
* Loads the emoji repository from URL during plugin initialization and provides utility methods to search it.
*/
export declare class EmojiRepository extends Plugin {
	/**
	* Whether the emoji repository has been successfully loaded.
	*
	* - `null` – the repository is still being loaded (initial state).
	* - `true` – the repository has been loaded successfully.
	* - `false` – the repository failed to load (e.g. network error or empty response).
	*/
	isRepositoryReady: boolean | null;
	/**
	* The resolved URL from which the emoji repository is downloaded.
	*/
	private readonly _url;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[EmojiUtils]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "EmojiRepository";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	constructor(editor: Editor);
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Calls `callback` once the repository finishes loading, passing the result as the argument.
	*
	* @param callback Receives `true` when the repository loaded successfully, `false` on failure.
	* Note: if the editor is destroyed before loading completes, the callback may never be called.
	* Use {@link #isReady} instead if you need a guaranteed resolution in all cases.
	*/
	onReady(callback: (isReady: boolean) => void): void;
	/**
	* Returns an array of emoji entries that match the search query.
	* If the emoji repository is not loaded this method returns an empty array.
	*
	* @param searchQuery A search query to match emoji.
	* @returns An array of emoji entries that match the search query.
	*/
	getEmojiByQuery(searchQuery: string): Array<EmojiEntry>;
	/**
	* Groups all emojis by categories.
	* If the emoji repository is not loaded, it returns an empty array.
	*
	* @returns An array of emoji entries grouped by categories.
	*/
	getEmojiCategories(): Array<EmojiCategory>;
	/**
	* Returns an array of available skin tones.
	*/
	getSkinTones(): Array<EmojiSkinTone>;
	/**
	* Returns a promise that resolves once the repository finishes loading.
	*
	* Resolves with `true` if the repository loaded successfully, or `false` if loading failed.
	* Rejects if the editor was destroyed before loading completed.
	*/
	isReady(): Promise<boolean>;
	/**
	* Returns the URL from which the emoji repository is downloaded. If the URL is not provided
	* in the configuration, the default URL is used with the version from the configuration.
	*
	* If both the URL and version are provided, a warning is logged.
	*/
	private _getUrl;
	/**
	* Warn users on self-hosted installations that this plugin uses a CDN to fetch the emoji repository.
	*/
	private _warnAboutCdnUse;
	/**
	* Returns the normalised emoji repository for this editor instance if it is
	* a non-empty array, or `null` otherwise.
	*/
	private _getItems;
	/**
	* Normalizes the raw data fetched from CDN. By normalization, we meant:
	*
	*  * Filter out unsupported emoji (these that will not render correctly),
	*  * Prepare skin tone variants if an emoji defines them.
	*/
	private _normalizeEmoji;
	/**
	* Cache key segments that distinguish the transformation result for this editor instance.
	*/
	private get _cacheKeys();
	/**
	* Process-global cache that stores fetched emojis.
	*/
	private static _cache;
}
/**
* Represents a single group of the emoji category, e.g., "Smileys & Expressions".
*/
export type EmojiCategory = {
	/**
	* A name of the category.
	*/
	title: string;
	/**
	* An example emoji representing items belonging to the category.
	*/
	icon: string;
	/**
	* Group id used to assign {@link #items}.
	*/
	groupId: number;
	/**
	* An array of emojis.
	*/
	items: Array<EmojiEntry>;
};
/**
* Represents a single item fetched from the CDN.
*/
export type EmojiCdnResource = {
	annotation: string;
	emoji: string;
	group: number;
	order: number;
	version: number;
	emoticon?: string;
	shortcodes?: Array<string>;
	skins?: Array<{
		emoji: string;
		tone: number;
		version: number;
	}>;
	tags?: Array<string>;
};
/**
* Represents a single emoji item used by the Emoji feature.
*/
export type EmojiEntry = Omit<EmojiCdnResource, "skins"> & {
	skins: EmojiMap;
};
/**
* Represents mapping between a skin tone and its corresponding emoji.
*
* The `default` key is always present. Additional values are assigned only if an emoji supports skin tones.
*/
export type EmojiMap = { [K in Exclude<EmojiSkinToneId, "default">]?: string } & {
	default: string;
};
/**
* Represents an emoji skin tone variant.
*/
export type EmojiSkinTone = {
	id: EmojiSkinToneId;
	icon: string;
	tooltip: string;
};
