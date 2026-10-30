/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { Collection, FocusTracker, KeystrokeHandler, global, logWarning, version } from "@ckeditor/ckeditor5-utils";
import { Typing } from "@ckeditor/ckeditor5-typing";
import { Mention } from "@ckeditor/ckeditor5-mention";
import fuzzysort from "fuzzysort";
import { escapeRegExp, groupBy } from "es-toolkit/compat";
import { ButtonView, ContextualBalloon, Dialog, FocusCycler, FormHeaderView, MenuBarMenuListItemButtonView, SearchInfoView, SearchTextView, UIModel, View, ViewCollection, addKeyboardHandlingForGrid, addListToDropdown, clickOutsideHandler, createDropdown, createLabeledInputText, isFocusable, isViewWithFocusCycler } from "@ckeditor/ckeditor5-ui";
import { IconEmoji, IconPreviousArrow } from "@ckeditor/ckeditor5-icons";

/**
* @license Copyright (c) 2023, Koala Interactive SAS
* For licensing, see https://github.com/koala-interactive/is-emoji-supported/blob/master/LICENSE.md
*/
/**
* @module emoji/utils/isemojisupported
*/
/**
* Checks if the two pixels parts are the same using canvas.
*
* @internal
*/
function isEmojiSupported(unicode) {
	const ctx = getCanvas();
	/* v8 ignore next -- @preserve */
	if (!ctx) return false;
	const CANVAS_HEIGHT = 25;
	const CANVAS_WIDTH = 20;
	ctx.font = "12px Arial, Sans-Serif";
	ctx.textBaseline = "top";
	ctx.canvas.width = 40;
	ctx.canvas.height = CANVAS_HEIGHT;
	ctx.clearRect(0, 0, 40, CANVAS_HEIGHT);
	ctx.fillStyle = "#FF0000";
	ctx.fillText(unicode, 0, 22);
	ctx.fillStyle = "#0000FF";
	ctx.fillText(unicode, CANVAS_WIDTH, 22);
	const a = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;
	const count = a.length;
	let i = 0;
	for (; i < count && !a[i + 3]; i += 4);
	/* v8 ignore next -- @preserve */
	if (i >= count) return false;
	const x = CANVAS_WIDTH + i / 4 % CANVAS_WIDTH;
	const y = Math.floor(i / 4 / CANVAS_WIDTH);
	const b = ctx.getImageData(x, y, 1, 1).data;
	/* v8 ignore next -- @preserve */
	if (a[i] !== b[0] || a[i + 2] !== b[2]) return false;
	/* v8 ignore next -- @preserve */
	if (ctx.measureText(unicode).width >= CANVAS_WIDTH) return false;
	return true;
}
function getCanvas() {
	try {
		return document.createElement("canvas").getContext("2d", { willReadFrequently: true });
	} catch {
		/* v8 ignore next -- @preserve */
		return null;
	}
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/emojiutils
*/
const SKIN_TONE_MAP = {
	0: "default",
	1: "light",
	2: "medium-light",
	3: "medium",
	4: "medium-dark",
	5: "dark"
};
/**
* A map representing an emoji and its release version.
* It's used to identify a user's minimal supported emoji level.
* We skip versions with older patches, such as 15.0 instead of 15.1 etc.
*/
const EMOJI_SUPPORT_LEVEL = {
	"🪎": 17,
	"🫩": 16,
	"🫨": 15.1,
	"🫠": 14,
	"😶‍🌫️": 13.1,
	"🧑‍💻": 12.1,
	"🥰": 11,
	"🤪": 5,
	"⚕️": 4,
	"🤣": 3,
	"👋🏽": 2,
	"😀": 1,
	"😐": .7,
	"😂": .6
};
const BASELINE_EMOJI_WIDTH = 24;
/**
* The Emoji utilities plugin.
*/
var EmojiUtils = class EmojiUtils extends Plugin {
	/**
	* Used for testing whether the environment supports the given emoji.
	*/
	_emojiCanvas = null;
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "EmojiUtils";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	init() {
		this._emojiCanvas = document.createElement("canvas").getContext("2d");
	}
	/**
	* Checks if the emoji is supported by verifying the emoji version supported by the system first.
	* Then checks if emoji contains a zero width joiner (ZWJ), and if yes, then checks if it is supported by the system.
	*/
	isEmojiSupported(item, emojiSupportedVersionByOs, container) {
		if (!(item.version <= emojiSupportedVersionByOs)) return false;
		if (!this.hasZwj(item.emoji)) return true;
		return this.isEmojiZwjSupported(item, container);
	}
	/**
	* Checks the supported emoji version by the OS, by sampling some representatives from different emoji releases.
	*/
	getEmojiSupportedVersionByOs() {
		for (const [emoji, emojiVersion] of Object.entries(EMOJI_SUPPORT_LEVEL)) if (EmojiUtils._isEmojiSupported(emoji)) return emojiVersion;
		return 0;
	}
	/**
	* Check for ZWJ (zero width joiner) character.
	*/
	hasZwj(emoji) {
		return emoji.includes("‍");
	}
	/**
	* Checks whether the emoji is supported in the operating system.
	*/
	isEmojiZwjSupported(item, container) {
		if (this.getNodeWidthUsingCanvas(container, item.emoji) < BASELINE_EMOJI_WIDTH * 1.8) return true;
		return this.getNodeWidth(container, item.emoji) < BASELINE_EMOJI_WIDTH * 1.8;
	}
	/**
	* Returns the width of the provided node.
	*/
	getNodeWidth(container, node) {
		const span = document.createElement("span");
		span.textContent = node;
		container.appendChild(span);
		const nodeWidth = span.offsetWidth;
		container.removeChild(span);
		return nodeWidth;
	}
	/**
	* Returns the width of the provided node.
	*
	* This is a faster alternative to `getNodeWidth` method, which works for great majority of emojis.
	*/
	getNodeWidthUsingCanvas(container, node) {
		const style = getComputedStyle(container);
		this._emojiCanvas.font = [
			style.fontStyle,
			style.fontVariant,
			style.fontWeight,
			`${BASELINE_EMOJI_WIDTH}px`,
			`"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", ${style.fontFamily}`
		].join(" ");
		return Math.ceil(this._emojiCanvas.measureText(node).width);
	}
	/**
	* Creates a div for emoji width testing purposes.
	*/
	createEmojiWidthTestingContainer() {
		const container = document.createElement("div");
		container.setAttribute("aria-hidden", "true");
		container.style.position = "absolute";
		container.style.left = "-9999px";
		container.style.whiteSpace = "nowrap";
		container.style.fontSize = "24px";
		return container;
	}
	/**
	* Adds default skin tone property to each emoji. If emoji defines other skin tones, they are added as well.
	*/
	normalizeEmojiSkinTone(item) {
		const entry = {
			...item,
			skins: { default: item.emoji }
		};
		if (item.skins) item.skins.forEach((skin) => {
			const skinTone = SKIN_TONE_MAP[skin.tone];
			entry.skins[skinTone] = skin.emoji;
		});
		return entry;
	}
	/**
	* Checks whether the emoji belongs to a group that is allowed.
	*/
	isEmojiCategoryAllowed(item) {
		return item.group !== 2;
	}
	/**
	* A function used to determine if emoji is supported by detecting pixels.
	*
	* Referenced for unit testing purposes. Kept in a separate file because of licensing.
	*/
	static _isEmojiSupported = isEmojiSupported;
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Cache for emoji repository data.
*
* @internal
*/
var EmojiRepositoryCache = class {
	/**
	* Fetch-and-transform promises, keyed by composite key.
	*/
	_cache = /* @__PURE__ */ new Map();
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
	async fetch({ url, cacheKeys, transform }) {
		const key = compositeKey(url, cacheKeys);
		if (this._cache.has(key)) return this._cache.get(key).promise;
		const promise = fetch(url, { cache: "force-cache" }).then((response) => response.ok ? response.json() : Promise.resolve([])).then((raw) => transform(raw)).catch(() => {
			this._cache.delete(key);
			return [];
		});
		this._cache.set(key, createInspectablePromise(promise));
		return promise;
	}
	/**
	* Synchronously returns the already-transformed array for the given `url` + `cacheKeys`,
	* or `null` if the result is not yet available.
	*/
	getSync({ url, cacheKeys }) {
		const entry = this._cache.get(compositeKey(url, cacheKeys));
		if (!entry || entry.status !== "fulfilled") return null;
		return entry.value;
	}
	/**
	* Clears the cache.
	*/
	clear() {
		this._cache.clear();
	}
};
/**
* Creates a composite cache key from a URL and additional key segments.
*/
function compositeKey(url, cacheKeys) {
	return [url, ...cacheKeys].join("|");
}
/**
* Wraps a `Promise` so its settled value is readable synchronously via `status` and `value`.
*/
function createInspectablePromise(promise) {
	const state = {
		promise,
		status: "pending",
		value: void 0
	};
	promise.then((resolved) => {
		Object.assign(state, {
			status: "fulfilled",
			value: resolved
		});
	});
	return state;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/emojirepository
*/
const DEFAULT_EMOJI_DATABASE_URL = "https://cdn.ckeditor.com/ckeditor5/data/emoji/{version}/en.json";
const DEFAULT_EMOJI_VERSION = 16;
/**
* The emoji repository plugin.
*
* Loads the emoji repository from URL during plugin initialization and provides utility methods to search it.
*/
var EmojiRepository = class EmojiRepository extends Plugin {
	/**
	* The resolved URL from which the emoji repository is downloaded.
	*/
	_url;
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [EmojiUtils];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "EmojiRepository";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		editor.config.define("emoji", {
			version: void 0,
			skinTone: "default",
			definitionsUrl: void 0,
			useCustomFont: false
		});
		this.set("isRepositoryReady", null);
		this._url = this._getUrl();
	}
	/**
	* @inheritDoc
	*/
	init() {
		this._warnAboutCdnUse();
		EmojiRepository._cache.fetch({
			url: this._url.toString(),
			cacheKeys: this._cacheKeys,
			transform: (raw) => this._normalizeEmoji(raw)
		}).then(() => {
			if (this.editor.state === "destroyed") return;
			const ready = !!this._getItems();
			if (!ready)
 /**
			* Unable to identify the available emoji to display.
			*
			* See the {@glink features/emoji#troubleshooting troubleshooting} section in
			* the {@glink features/emoji Emoji feature} guide for more details.
			*
			* @error emoji-repository-empty
			*/
			logWarning("emoji-repository-empty");
			this.isRepositoryReady = ready;
		});
	}
	/**
	* Calls `callback` once the repository finishes loading, passing the result as the argument.
	*
	* @param callback Receives `true` when the repository loaded successfully, `false` on failure.
	* Note: if the editor is destroyed before loading completes, the callback may never be called.
	* Use {@link #isReady} instead if you need a guaranteed resolution in all cases.
	*/
	onReady(callback) {
		if (this.editor.state === "destroyed") return;
		if (this.isRepositoryReady !== null) {
			callback(this.isRepositoryReady);
			return;
		}
		this.once("change:isRepositoryReady", (evt, name, isReady) => {
			callback(!!isReady);
		});
	}
	/**
	* Returns an array of emoji entries that match the search query.
	* If the emoji repository is not loaded this method returns an empty array.
	*
	* @param searchQuery A search query to match emoji.
	* @returns An array of emoji entries that match the search query.
	*/
	getEmojiByQuery(searchQuery) {
		const items = this._getItems();
		if (!items) return [];
		if (!searchQuery.split(/\s/).filter(Boolean).some((token) => token.length >= 2)) return [];
		return fuzzysort.go(searchQuery, items, {
			threshold: .6,
			keys: [
				"emoticon",
				"annotation",
				(emojiEntry) => {
					return searchQuery.split(/\s/).filter(Boolean).flatMap((tok) => {
						return emojiEntry.tags?.filter((t) => t.startsWith(tok));
					}).join();
				}
			]
		}).map((result) => result.obj);
	}
	/**
	* Groups all emojis by categories.
	* If the emoji repository is not loaded, it returns an empty array.
	*
	* @returns An array of emoji entries grouped by categories.
	*/
	getEmojiCategories() {
		const repository = this._getItems();
		if (!repository) return [];
		const { t } = this.editor.locale;
		const categories = [
			{
				title: t("Smileys & Expressions"),
				icon: "😄",
				groupId: 0
			},
			{
				title: t("Gestures & People"),
				icon: "👋",
				groupId: 1
			},
			{
				title: t("Animals & Nature"),
				icon: "🐻",
				groupId: 3
			},
			{
				title: t("Food & Drinks"),
				icon: "🍎",
				groupId: 4
			},
			{
				title: t("Travel & Places"),
				icon: "🚘",
				groupId: 5
			},
			{
				title: t("Activities"),
				icon: "🏀",
				groupId: 6
			},
			{
				title: t("Objects"),
				icon: "💡",
				groupId: 7
			},
			{
				title: t("Symbols"),
				icon: "🔵",
				groupId: 8
			},
			{
				title: t("Flags"),
				icon: "🏁",
				groupId: 9
			}
		];
		const groups = groupBy(repository, (item) => item.group);
		return categories.map((category) => {
			return {
				...category,
				items: groups[category.groupId]
			};
		});
	}
	/**
	* Returns an array of available skin tones.
	*/
	getSkinTones() {
		const { t } = this.editor.locale;
		return [
			{
				id: "default",
				icon: "👋",
				tooltip: t("Default skin tone")
			},
			{
				id: "light",
				icon: "👋🏻",
				tooltip: t("Light skin tone")
			},
			{
				id: "medium-light",
				icon: "👋🏼",
				tooltip: t("Medium Light skin tone")
			},
			{
				id: "medium",
				icon: "👋🏽",
				tooltip: t("Medium skin tone")
			},
			{
				id: "medium-dark",
				icon: "👋🏾",
				tooltip: t("Medium Dark skin tone")
			},
			{
				id: "dark",
				icon: "👋🏿",
				tooltip: t("Dark skin tone")
			}
		];
	}
	/**
	* Returns a promise that resolves once the repository finishes loading.
	*
	* Resolves with `true` if the repository loaded successfully, or `false` if loading failed.
	* Rejects if the editor was destroyed before loading completed.
	*/
	isReady() {
		return new Promise((resolve, reject) => {
			const fail = () => reject(/* @__PURE__ */ new Error("The editor was destroyed before the emoji repository finished loading."));
			if (this.editor.state === "destroyed") fail();
			else {
				this.onReady(resolve);
				this.editor.once("destroy", fail);
			}
		});
	}
	/**
	* Returns the URL from which the emoji repository is downloaded. If the URL is not provided
	* in the configuration, the default URL is used with the version from the configuration.
	*
	* If both the URL and version are provided, a warning is logged.
	*/
	_getUrl() {
		const { definitionsUrl, version: version$1 } = this.editor.config.get("emoji");
		if (!definitionsUrl || definitionsUrl === "cdn") {
			const urlVersion = version$1 || DEFAULT_EMOJI_VERSION;
			const url = new URL(DEFAULT_EMOJI_DATABASE_URL.replace("{version}", urlVersion.toString()));
			url.searchParams.set("editorVersion", version);
			return url;
		}
		if (version$1)
 /**
		* Both {@link module:emoji/emojiconfig~EmojiConfig#definitionsUrl `emoji.definitionsUrl`} and
		* {@link module:emoji/emojiconfig~EmojiConfig#version `emoji.version`} configuration options
		* are set. Only the `emoji.definitionsUrl` option will be used.
		*
		* The `emoji.version` option will be ignored and should be removed from the configuration.
		*
		* @error emoji-repository-redundant-version
		*/
		logWarning("emoji-repository-redundant-version");
		return new URL(definitionsUrl);
	}
	/**
	* Warn users on self-hosted installations that this plugin uses a CDN to fetch the emoji repository.
	*/
	_warnAboutCdnUse() {
		const editor = this.editor;
		const config = editor.config.get("emoji");
		const licenseKey = editor.config.get("licenseKey");
		const distributionChannel = window[Symbol.for("cke distribution")];
		if (licenseKey === "GPL") return;
		if (distributionChannel === "cloud") return;
		if (config && config.definitionsUrl) return;
		/**
		* It was detected that your installation uses a commercial license key,
		* and the default {@glink features/emoji#emoji-source CKEditor CDN for Emoji plugin data}.
		*
		* To avoid this, you can use the {@link module:emoji/emojiconfig~EmojiConfig#definitionsUrl `emoji.definitionsUrl`}
		* configuration option to provide a URL to your own emoji repository.
		*
		* If you want to suppress this warning, while using the default CDN, set this configuration option to `cdn`.
		*
		* @error emoji-repository-cdn-use
		*/
		logWarning("emoji-repository-cdn-use");
	}
	/**
	* Returns the normalised emoji repository for this editor instance if it is
	* a non-empty array, or `null` otherwise.
	*/
	_getItems() {
		const repository = EmojiRepository._cache.getSync({
			url: this._url.toString(),
			cacheKeys: this._cacheKeys
		});
		return repository && repository.length ? repository : null;
	}
	/**
	* Normalizes the raw data fetched from CDN. By normalization, we meant:
	*
	*  * Filter out unsupported emoji (these that will not render correctly),
	*  * Prepare skin tone variants if an emoji defines them.
	*/
	_normalizeEmoji(data) {
		const editor = this.editor;
		const useCustomFont = editor.config.get("emoji.useCustomFont");
		const emojiUtils = editor.plugins.get("EmojiUtils");
		const insertableEmoji = data.filter((item) => emojiUtils.isEmojiCategoryAllowed(item));
		if (useCustomFont) return insertableEmoji.map((item) => emojiUtils.normalizeEmojiSkinTone(item));
		const emojiSupportedVersionByOs = emojiUtils.getEmojiSupportedVersionByOs();
		const container = emojiUtils.createEmojiWidthTestingContainer();
		document.body.appendChild(container);
		const results = insertableEmoji.filter((item) => emojiUtils.isEmojiSupported(item, emojiSupportedVersionByOs, container)).map((item) => emojiUtils.normalizeEmojiSkinTone(item));
		container.remove();
		return results;
	}
	/**
	* Cache key segments that distinguish the transformation result for this editor instance.
	*/
	get _cacheKeys() {
		return [`useCustomFont:${!!this.editor.config.get("emoji.useCustomFont")}`];
	}
	/**
	* Process-global cache that stores fetched emojis.
	*/
	static _cache = new EmojiRepositoryCache();
};
/**
* Unable to load the emoji repository from the URL.
*
* If the URL works properly and there is no disruption of communication, please check your
* {@glink getting-started/setup/csp Content Security Policy (CSP)} setting and make sure
* the URL connection is allowed by the editor.
*
* @error emoji-repository-load-failed
*/

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/emojimention
*/
const EMOJI_MENTION_MARKER = ":";
const EMOJI_SHOW_ALL_OPTION_ID = ":__EMOJI_SHOW_ALL:";
const EMOJI_HINT_OPTION_ID = ":__EMOJI_HINT:";
/**
* The emoji mention plugin.
*
* Introduces the autocomplete of emojis while typing.
*/
var EmojiMention = class extends Plugin {
	/**
	* Defines a number of displayed items in the auto complete dropdown.
	*
	* It includes the "Show all emoji..." option if the `EmojiPicker` plugin is loaded.
	*/
	_emojiDropdownLimit;
	/**
	* Defines a skin tone that is set in the emoji config.
	*/
	_skinTone;
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [
			EmojiRepository,
			Typing,
			Mention
		];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "EmojiMention";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		this.editor.config.define("emoji", { dropdownLimit: 6 });
		this._emojiDropdownLimit = editor.config.get("emoji.dropdownLimit");
		this._skinTone = editor.config.get("emoji.skinTone");
		this._setupMentionConfiguration(editor);
	}
	/**
	* Initializes the configuration for emojis in the mention feature.
	* If the marker used by emoji mention is already registered, it displays a warning.
	* If emoji mention configuration is detected, it does not register it for a second time.
	*/
	_setupMentionConfiguration(editor) {
		const mergeFieldsPrefix = editor.config.get("mergeFields.prefix");
		const mentionFeedsConfigs = editor.config.get("mention.feeds");
		const isEmojiMarkerUsedByMergeFields = mergeFieldsPrefix ? mergeFieldsPrefix[0] === EMOJI_MENTION_MARKER : false;
		if (mentionFeedsConfigs.filter((config) => !config._isEmojiMarker).some((config) => config.marker === EMOJI_MENTION_MARKER) || isEmojiMarkerUsedByMergeFields) {
			/**
			* The `marker` in the `emoji` config is already used by other plugin configuration.
			*
			* @error emoji-config-marker-already-used
			* @param {string} marker Used marker.
			*/
			logWarning("emoji-config-marker-already-used", { marker: EMOJI_MENTION_MARKER });
			return;
		}
		if (mentionFeedsConfigs.some((config) => config._isEmojiMarker)) return;
		const emojiMentionFeedConfig = {
			_isEmojiMarker: true,
			marker: EMOJI_MENTION_MARKER,
			dropdownLimit: this._emojiDropdownLimit,
			itemRenderer: this._customItemRendererFactory(this.editor.t),
			feed: this._queryEmojiCallbackFactory()
		};
		this.editor.config.set("mention.feeds", [...mentionFeedsConfigs, emojiMentionFeedConfig]);
	}
	/**
	* @inheritDoc
	*/
	init() {
		const { editor } = this;
		this.emojiPickerPlugin = editor.plugins.has("EmojiPicker") ? editor.plugins.get("EmojiPicker") : null;
		this.emojiRepositoryPlugin = editor.plugins.get("EmojiRepository");
		this._overrideMentionExecuteListener();
	}
	/**
	* Returns the `itemRenderer()` callback for mention config.
	*/
	_customItemRendererFactory(t) {
		return (item) => {
			const itemElement = document.createElement("button");
			itemElement.classList.add("ck");
			itemElement.classList.add("ck-button");
			itemElement.classList.add("ck-button_with-text");
			itemElement.id = `mention-list-item-id${item.id.slice(0, -1)}`;
			itemElement.type = "button";
			itemElement.tabIndex = -1;
			const labelElement = document.createElement("span");
			labelElement.classList.add("ck");
			labelElement.classList.add("ck-button__label");
			itemElement.appendChild(labelElement);
			if (item.id === EMOJI_HINT_OPTION_ID) {
				itemElement.classList.add("ck-list-item-button");
				itemElement.classList.add("ck-disabled");
				labelElement.textContent = t("Keep on typing to see the emoji.");
			} else if (item.id === EMOJI_SHOW_ALL_OPTION_ID) labelElement.textContent = t("Show all emoji...");
			else labelElement.textContent = `${item.text} ${item.id}`;
			return itemElement;
		};
	}
	/**
	* Overrides the default mention execute listener to insert an emoji as plain text instead.
	*/
	_overrideMentionExecuteListener() {
		const { editor } = this;
		editor.commands.get("mention").on("execute", (event, data) => {
			if (!this.emojiRepositoryPlugin.isRepositoryReady) return;
			const eventData = data[0];
			if (eventData.marker !== EMOJI_MENTION_MARKER) return;
			event.stop();
			if (eventData.mention.id === EMOJI_HINT_OPTION_ID) return;
			if (eventData.mention.id === EMOJI_SHOW_ALL_OPTION_ID) {
				const text = [...eventData.range.getItems()].filter((item) => item.is("$textProxy")).map((item) => item.data).reduce((result, text) => result + text, "");
				editor.model.change((writer) => {
					editor.model.deleteContent(writer.createSelection(eventData.range));
				});
				const emojiPickerPlugin = this.emojiPickerPlugin;
				emojiPickerPlugin.showUI(text.slice(1));
				setTimeout(() => {
					emojiPickerPlugin.emojiPickerView.focus();
				});
			} else editor.execute("insertText", {
				text: eventData.mention.text,
				range: eventData.range
			});
		}, { priority: "high" });
	}
	/**
	* Returns the `feed()` callback for mention config.
	*/
	_queryEmojiCallbackFactory() {
		return (searchQuery) => {
			if (searchQuery.startsWith(" ")) return [];
			if (searchQuery.startsWith(EMOJI_MENTION_MARKER)) return [];
			if (!this.emojiRepositoryPlugin.isRepositoryReady) return [];
			const emojis = this.emojiRepositoryPlugin.getEmojiByQuery(searchQuery).map((emoji) => {
				let text = emoji.skins[this._skinTone] || emoji.skins.default;
				if (this.emojiPickerPlugin) text = emoji.skins[this.emojiPickerPlugin.skinTone] || emoji.skins.default;
				return {
					id: `:${emoji.annotation}:`,
					text
				};
			});
			if (!this.emojiPickerPlugin) return emojis.slice(0, this._emojiDropdownLimit);
			const actionItem = { id: searchQuery.length > 1 ? EMOJI_SHOW_ALL_OPTION_ID : EMOJI_HINT_OPTION_ID };
			return [...emojis.slice(0, this._emojiDropdownLimit - 1), actionItem];
		};
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/emojicommand
*/
/**
* Command that shows the emoji user interface.
*/
var EmojiCommand = class extends Command {
	constructor(editor) {
		super(editor);
		const repository = editor.plugins.get("EmojiRepository");
		this.listenTo(repository, "change:isRepositoryReady", () => this.refresh());
	}
	/**
	* Updates the command's {@link #isEnabled} based on the current selection
	* and whether the emoji repository has been loaded.
	*/
	refresh() {
		const editor = this.editor;
		const repository = editor.plugins.get("EmojiRepository");
		const model = editor.model;
		const schema = model.schema;
		const selection = model.document.selection;
		this.isEnabled = !!repository.isRepositoryReady && schema.checkChild(selection.getFirstPosition(), "$text");
	}
	/**
	* Opens emoji user interface for the current document selection.
	*
	* @fires execute
	* @param [searchValue=''] A default query used to filer the grid when opening the UI.
	*/
	execute(searchValue = "") {
		this.editor.plugins.get("EmojiPicker").showUI(searchValue);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/ui/emojigridview
*/
/**
* A grid of emoji tiles. It allows browsing emojis and selecting them to be inserted into the content.
*/
var EmojiGridView = class extends View {
	/**
	* A collection of the child tile views. Each tile represents a particular emoji.
	*/
	tiles;
	/**
	* Tracks information about the DOM focus in the grid.
	*/
	focusTracker;
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	keystrokes;
	/**
	* An array containing all emojis grouped by their categories.
	*/
	emojiCategories;
	/**
	* A collection of all already created tile views. Each tile represents a particular emoji.
	* The cached tiles collection is used for efficiency purposes to avoid re-creating a particular
	* tile again when the grid view has changed.
	*/
	cachedTiles;
	/**
	* A callback used to filter grid items by a specified query.
	*/
	_getEmojiByQuery;
	/**
	* @inheritDoc
	*/
	constructor(locale, { categoryName, emojiCategories, getEmojiByQuery, skinTone }) {
		super(locale);
		this.set("isEmpty", true);
		this.set("categoryName", categoryName);
		this.set("skinTone", skinTone);
		this.tiles = this.createCollection();
		this.cachedTiles = this.createCollection();
		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();
		this._getEmojiByQuery = getEmojiByQuery;
		this.emojiCategories = emojiCategories;
		const bind = this.bindTemplate;
		this.setTemplate({
			tag: "div",
			children: [{
				tag: "div",
				attributes: {
					role: "grid",
					class: ["ck", "ck-emoji__grid"]
				},
				children: this.tiles
			}],
			attributes: {
				role: "tabpanel",
				class: [
					"ck",
					"ck-emoji__tiles",
					bind.if("isEmpty", "ck-hidden", (value) => value)
				]
			}
		});
		addKeyboardHandlingForGrid({
			keystrokeHandler: this.keystrokes,
			focusTracker: this.focusTracker,
			gridItems: this.tiles,
			numberOfColumns: () => global.window.getComputedStyle(this.element.firstChild).getPropertyValue("grid-template-columns").split(" ").length,
			uiLanguageDirection: this.locale && this.locale.uiLanguageDirection
		});
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		this.keystrokes.listenTo(this.element);
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		this.keystrokes.destroy();
		this.focusTracker.destroy();
	}
	/**
	* Focuses the first focusable in {@link ~EmojiGridView#tiles} if available.
	*/
	focus() {
		const firstTile = this.tiles.first;
		if (firstTile) firstTile.focus();
	}
	/**
	* Filters the grid view by the given regular expression.
	*
	* It filters either by the pattern or an emoji category, but never both.
	*
	* @param pattern Expression to search or `null` when filter by category name.
	*/
	filter(pattern) {
		const { matchingItems, allItems } = pattern ? this._getItemsByQuery(pattern.source) : this._getItemsByCategory();
		this._updateGrid(matchingItems);
		this.set("isEmpty", matchingItems.length === 0);
		return {
			resultsCount: matchingItems.length,
			totalItemsCount: allItems.length
		};
	}
	/**
	* Filters emojis to show based on the specified query phrase.
	*
	* @param query A query used to filter the grid.
	*/
	_getItemsByQuery(query) {
		return {
			matchingItems: this._getEmojiByQuery(query),
			allItems: this.emojiCategories.flatMap((group) => group.items)
		};
	}
	/**
	* Returns emojis that belong to the specified category.
	*/
	_getItemsByCategory() {
		const emojiCategory = this.emojiCategories.find((item) => item.title === this.categoryName);
		if (!emojiCategory) return {
			matchingItems: [],
			allItems: []
		};
		const { items } = emojiCategory;
		return {
			matchingItems: items,
			allItems: items
		};
	}
	/**
	* Updates the grid by removing the existing items and insert the new ones.
	*
	* @param items An array of items to insert.
	*/
	_updateGrid(items) {
		[...this.tiles].forEach((item) => {
			this.focusTracker.remove(item);
			this.tiles.remove(item);
		});
		items.map((item) => {
			const emoji = item.skins[this.skinTone] || item.skins.default;
			return this.cachedTiles.get(emoji) || this._createTile(emoji, item.annotation);
		}).forEach((item) => {
			this.tiles.add(item);
			this.focusTracker.add(item);
		});
	}
	/**
	* Creates a new tile for the grid. Created tile is added to the {@link #cachedTiles} collection for further usage, if needed.
	*
	* @param emoji The emoji itself.
	* @param name The name of the emoji (e.g. "Smiling Face with Smiling Eyes").
	*/
	_createTile(emoji, name) {
		const tile = new ButtonView(this.locale);
		tile.viewUid = emoji;
		tile.extendTemplate({ attributes: { class: ["ck-emoji__tile"] } });
		tile.set({
			label: emoji,
			tooltip: name,
			withText: true,
			ariaLabel: name,
			ariaLabelledBy: void 0
		});
		tile.on("execute", () => {
			this.fire("execute", {
				name,
				emoji
			});
		});
		this.cachedTiles.add(tile);
		return tile;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/ui/emojicategoriesview
*/
/**
* A class representing the navigation part of the emoji UI.
* It is responsible allowing the user to select a particular emoji category.
*/
var EmojiCategoriesView = class extends View {
	/**
	* Tracks information about the DOM focus in the grid.
	*/
	focusTracker;
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	keystrokes;
	/**
	* Helps cycling over focusable children in the input view.
	*/
	focusCycler;
	/**
	* A collection of the categories buttons.
	*/
	buttonViews;
	/**
	* @inheritDoc
	*/
	constructor(locale, { emojiCategories, categoryName }) {
		super(locale);
		this.buttonViews = this.createCollection(emojiCategories.map((emojiCategory) => this._createCategoryButton(emojiCategory)));
		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();
		this.focusCycler = new FocusCycler({
			focusables: this.buttonViews,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				focusPrevious: "arrowleft",
				focusNext: "arrowright"
			}
		});
		this.setTemplate({
			tag: "div",
			attributes: {
				class: ["ck", "ck-emoji__categories-list"],
				role: "tablist"
			},
			children: this.buttonViews
		});
		this.on("change:categoryName", (event, name, newValue, oldValue) => {
			const oldCategoryButton = this.buttonViews.find((button) => button.tooltip === oldValue);
			if (oldCategoryButton) oldCategoryButton.isOn = false;
			const newCategoryButton = this.buttonViews.find((button) => button.tooltip === newValue);
			if (newCategoryButton) newCategoryButton.isOn = true;
		});
		this.set("categoryName", categoryName);
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		this.buttonViews.forEach((buttonView) => {
			this.focusTracker.add(buttonView);
		});
		this.keystrokes.listenTo(this.element);
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		this.focusTracker.destroy();
		this.keystrokes.destroy();
		this.buttonViews.destroy();
	}
	/**
	* @inheritDoc
	*/
	focus() {
		this.buttonViews.first.focus();
	}
	/**
	* Sets category buttons for the provided emoji categories.
	*/
	setCategories(emojiCategories) {
		for (const button of this.buttonViews) {
			this.focusTracker.remove(button);
			button.destroy();
		}
		this.buttonViews.clear();
		for (const emojiCategory of emojiCategories) {
			const buttonView = this._createCategoryButton(emojiCategory);
			this.buttonViews.add(buttonView);
			if (this.isRendered) this.focusTracker.add(buttonView);
		}
	}
	/**
	* Marks all categories buttons as enabled (clickable).
	*/
	enableCategories() {
		this.buttonViews.forEach((buttonView) => {
			buttonView.isEnabled = true;
		});
	}
	/**
	* Marks all categories buttons as disabled (non-clickable).
	*/
	disableCategories() {
		this.buttonViews.forEach((buttonView) => {
			buttonView.set({
				class: "",
				isEnabled: false,
				isOn: false
			});
		});
	}
	/**
	* Creates a button representing a category item.
	*/
	_createCategoryButton(emojiCategory) {
		const buttonView = new ButtonView();
		const bind = buttonView.bindTemplate;
		buttonView.extendTemplate({ attributes: {
			"aria-selected": bind.to("isOn", (value) => value.toString()),
			class: ["ck-emoji__category-item"]
		} });
		buttonView.set({
			ariaLabel: emojiCategory.title,
			label: emojiCategory.icon,
			role: "tab",
			tooltip: emojiCategory.title,
			withText: true,
			ariaLabelledBy: void 0
		});
		buttonView.on("execute", () => {
			this.categoryName = emojiCategory.title;
		});
		buttonView.on("change:isEnabled", () => {
			if (buttonView.isEnabled && buttonView.tooltip === this.categoryName) buttonView.isOn = true;
		});
		return buttonView;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/ui/emojisearchview
*/
/**
* A view responsible for providing an input element that allows filtering emoji by the provided query.
*/
var EmojiSearchView = class extends View {
	/**
	* The find in text input view that stores the searched string.
	*/
	inputView;
	/**
	* An instance of the `EmojiGridView`.
	*/
	gridView;
	/**
	* @inheritDoc
	*/
	constructor(locale, { gridView, resultsView }) {
		super(locale);
		this.gridView = gridView;
		const t = locale.t;
		this.inputView = new SearchTextView(this.locale, {
			queryView: {
				label: t("Find an emoji (min. 2 characters)"),
				creator: createLabeledInputText
			},
			filteredView: this.gridView,
			infoView: { instance: resultsView }
		});
		this.setTemplate({
			tag: "div",
			attributes: {
				class: ["ck", "ck-search"],
				tabindex: "-1"
			},
			children: [this.inputView.queryView]
		});
		this.inputView.delegate("search").to(this);
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		this.inputView.destroy();
	}
	/**
	* Searches the {@link #gridView} for the given query.
	*
	* @param query The search query string.
	*/
	search(query) {
		const regExp = query ? new RegExp(escapeRegExp(query), "ig") : null;
		const filteringResults = this.gridView.filter(regExp);
		this.inputView.fire("search", {
			query,
			...filteringResults
		});
	}
	/**
	* Allows defining the default value in the search text field.
	*
	* @param value The new value.
	*/
	setInputValue(value) {
		if (!value) this.inputView.queryView.fieldView.reset();
		else this.inputView.queryView.fieldView.value = value;
	}
	/**
	* Returns an input provided by a user in the search text field.
	*/
	getInputValue() {
		return this.inputView.queryView.fieldView.element.value;
	}
	/**
	* @inheritDoc
	*/
	focus() {
		this.inputView.focus();
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/ui/emojitoneview
*/
/**
* A view responsible for selecting a skin tone for an emoji.
*/
var EmojiToneView = class extends View {
	/**
	* A dropdown element for selecting an active skin tone.
	*/
	dropdownView;
	/**
	* An array of available skin tones.
	*/
	_skinTones;
	/**
	* @inheritDoc
	*/
	constructor(locale, { skinTone, skinTones }) {
		super(locale);
		this.set("skinTone", skinTone);
		this._skinTones = skinTones;
		const t = locale.t;
		const accessibleLabel = t("Select skin tone");
		const dropdownView = createDropdown(locale);
		const itemDefinitions = new Collection();
		for (const { id, icon, tooltip } of this._skinTones) {
			const def = {
				type: "button",
				model: new UIModel({
					value: id,
					label: icon,
					ariaLabel: tooltip,
					tooltip,
					tooltipPosition: "e",
					role: "menuitemradio",
					withText: true,
					ariaLabelledBy: void 0
				})
			};
			def.model.bind("isOn").to(this, "skinTone", (value) => value === id);
			itemDefinitions.add(def);
		}
		addListToDropdown(dropdownView, itemDefinitions, {
			ariaLabel: accessibleLabel,
			role: "menu"
		});
		dropdownView.buttonView.set({
			label: this._getSkinTone().icon,
			ariaLabel: accessibleLabel,
			ariaLabelledBy: void 0,
			isOn: false,
			withText: true,
			tooltip: accessibleLabel
		});
		this.dropdownView = dropdownView;
		this.listenTo(dropdownView, "execute", (evt) => {
			this.skinTone = evt.source.value;
		});
		dropdownView.buttonView.bind("label").to(this, "skinTone", () => {
			return this._getSkinTone().icon;
		});
		dropdownView.buttonView.bind("ariaLabel").to(this, "skinTone", () => {
			return `${this._getSkinTone().tooltip}, ${accessibleLabel}`;
		});
		this.setTemplate({
			tag: "div",
			attributes: { class: ["ck", "ck-emoji__skin-tone"] },
			children: [dropdownView]
		});
	}
	/**
	* @inheritDoc
	*/
	focus() {
		this.dropdownView.buttonView.focus();
	}
	/**
	* Helper method for receiving an object describing the active skin tone.
	*/
	_getSkinTone() {
		return this._skinTones.find((tone) => tone.id === this.skinTone);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/ui/emojipickerview
*/
/**
* A view that glues pieces of the emoji panel together.
*/
var EmojiPickerView = class extends View {
	/**
	* A collection of the focusable children of the view.
	*/
	items;
	/**
	* Tracks information about the DOM focus in the view.
	*/
	focusTracker;
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	keystrokes;
	/**
	* Helps cycling over focusable {@link #items} in the view.
	*/
	focusCycler;
	/**
	* An instance of the `EmojiSearchView`.
	*/
	searchView;
	/**
	* An instance of the `EmojiToneView`.
	*/
	toneView;
	/**
	* An instance of the `EmojiCategoriesView`.
	*/
	categoriesView;
	/**
	* An instance of the `EmojiGridView`.
	*/
	gridView;
	/**
	* An instance of the `EmojiGridView`.
	*/
	infoView;
	/**
	* @inheritDoc
	*/
	constructor(locale, { emojiCategories, getEmojiByQuery, skinTone, skinTones }) {
		super(locale);
		const categoryName = emojiCategories[0]?.title ?? "";
		this.gridView = new EmojiGridView(locale, {
			categoryName,
			emojiCategories,
			getEmojiByQuery,
			skinTone
		});
		this.infoView = new SearchInfoView();
		this.searchView = new EmojiSearchView(locale, {
			gridView: this.gridView,
			resultsView: this.infoView
		});
		this.categoriesView = new EmojiCategoriesView(locale, {
			emojiCategories,
			categoryName
		});
		this.toneView = new EmojiToneView(locale, {
			skinTone,
			skinTones
		});
		this.items = this.createCollection([
			this.searchView,
			this.toneView,
			this.categoriesView,
			this.gridView,
			this.infoView
		]);
		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();
		this.focusCycler = new FocusCycler({
			focusables: this.items,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				focusPrevious: "shift + tab",
				focusNext: "tab"
			}
		});
		this.setTemplate({
			tag: "div",
			children: [
				{
					tag: "div",
					children: [this.searchView, this.toneView],
					attributes: { class: ["ck", "ck-emoji__search"] }
				},
				this.categoriesView,
				this.gridView,
				{
					tag: "div",
					children: [this.infoView],
					attributes: { class: ["ck", "ck-search__results"] }
				}
			],
			attributes: {
				tabindex: "-1",
				class: [
					"ck",
					"ck-emoji",
					"ck-search"
				]
			}
		});
		this._setupEventListeners();
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		this.focusTracker.add(this.searchView.element);
		this.focusTracker.add(this.toneView.element);
		this.focusTracker.add(this.categoriesView.element);
		this.focusTracker.add(this.gridView.element);
		this.focusTracker.add(this.infoView.element);
		this.keystrokes.listenTo(this.element);
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		this.focusTracker.destroy();
		this.keystrokes.destroy();
	}
	/**
	* Focuses the search input.
	*/
	focus() {
		this.searchView.focus();
	}
	/**
	* Sets certain list of categories in categories view and performs search.
	*/
	setCategories(categories) {
		const { emojiCategories } = this.gridView;
		const categoryName = categories[0].title;
		emojiCategories.splice(0, emojiCategories.length, ...categories);
		this.categoriesView.setCategories(categories);
		this.categoriesView.categoryName = categoryName;
		this.gridView.categoryName = categoryName;
		this.searchView.search(this.searchView.getInputValue());
	}
	/**
	* Initializes interactions between sub-views.
	*/
	_setupEventListeners() {
		const t = this.locale.t;
		this.searchView.on("search", (evt, data) => {
			if (data.query) this.categoriesView.disableCategories();
			else this.categoriesView.enableCategories();
		});
		this.searchView.on("search", (evt, data) => {
			if (!this.categoriesView.buttonViews.length) return;
			if (data.query.length === 1) this.infoView.set({
				primaryText: t("Keep on typing to see the emoji."),
				secondaryText: t("The query must contain at least two characters."),
				isVisible: true
			});
			else if (!data.resultsCount) this.infoView.set({
				primaryText: t("No emojis were found matching \"%0\".", data.query),
				secondaryText: t("Please try a different phrase or check the spelling."),
				isVisible: true
			});
			else this.infoView.set({ isVisible: false });
		});
		this.searchView.on("search", () => {
			this.fire("update");
			this.gridView.element.scrollTo(0, 0);
		});
		this.categoriesView.on("change:categoryName", (ev, args, categoryName) => {
			this.gridView.categoryName = categoryName;
			this.searchView.search("");
		});
		this.toneView.on("change:skinTone", (evt, propertyName, newValue) => {
			this.gridView.skinTone = newValue;
			this.searchView.search(this.searchView.getInputValue());
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/ui/emojipickerformview
*/
/**
* The emoji picker form view.
*/
var EmojiPickerFormView = class extends View {
	/**
	* The Back button view displayed in the header.
	*/
	backButtonView;
	/**
	* Tracks information about DOM focus in the form.
	*/
	focusTracker = new FocusTracker();
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	keystrokes = new KeystrokeHandler();
	/**
	* A collection of child views.
	*/
	children;
	/**
	* A collection of views that can be focused in the form.
	*/
	_focusables = new ViewCollection();
	/**
	* Helps cycling over {@link #_focusables} in the form.
	*/
	_focusCycler;
	/**
	* Creates an instance of the {@link module:emoji/ui/emojipickerformview~EmojiPickerFormView} class.
	*
	* Also see {@link #render}.
	*
	* @param locale The localization services instance.
	*/
	constructor(locale) {
		super(locale);
		this.backButtonView = this._createBackButton();
		this.children = this.createCollection([this._createHeaderView()]);
		this._focusCycler = new FocusCycler({
			focusables: this._focusables,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				focusPrevious: "shift + tab",
				focusNext: "tab"
			}
		});
		this.setTemplate({
			tag: "div",
			attributes: {
				class: [
					"ck",
					"ck-form",
					"ck-emoji-picker-form"
				],
				tabindex: "-1"
			},
			children: this.children
		});
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		[...this.children.filter(isFocusable), this.backButtonView].forEach((v) => {
			this._focusables.add(v);
			this.focusTracker.add(v.element);
			if (isViewWithFocusCycler(v)) this._focusCycler.chain(v.focusCycler);
		});
		this.keystrokes.listenTo(this.element);
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		this.focusTracker.destroy();
		this.keystrokes.destroy();
	}
	/**
	* Focuses the fist {@link #_focusables} in the form.
	*/
	focus() {
		this._focusCycler.focusFirst();
	}
	/**
	* Creates a back button view that cancels the form.
	*/
	_createBackButton() {
		const t = this.locale.t;
		const backButton = new ButtonView(this.locale);
		backButton.set({
			class: "ck-button-back",
			label: t("Back"),
			icon: IconPreviousArrow,
			tooltip: true
		});
		backButton.delegate("execute").to(this, "cancel");
		return backButton;
	}
	/**
	* Creates a header view for the form.
	*/
	_createHeaderView() {
		const t = this.locale.t;
		const header = new FormHeaderView(this.locale, { label: t("Emoji picker") });
		header.children.add(this.backButtonView, 0);
		return header;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/emojipicker
*/
const VISUAL_SELECTION_MARKER_NAME = "emoji-picker";
/**
* The emoji picker plugin.
*
* Introduces the `'emoji'` dropdown.
*/
var EmojiPicker = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [
			EmojiRepository,
			ContextualBalloon,
			Dialog,
			Typing
		];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "EmojiPicker";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	init() {
		const { editor } = this;
		this.balloonPlugin = editor.plugins.get("ContextualBalloon");
		this.emojiRepositoryPlugin = editor.plugins.get("EmojiRepository");
		const command = new EmojiCommand(editor);
		editor.commands.add("emoji", command);
		editor.ui.componentFactory.add("emoji", () => {
			const button = this._createButton(ButtonView, command);
			button.set({ tooltip: true });
			return button;
		});
		editor.ui.componentFactory.add("menuBar:emoji", () => {
			return this._createButton(MenuBarMenuListItemButtonView, command);
		});
		this._setupConversion();
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		if (this.emojiPickerView) this.emojiPickerView.destroy();
	}
	/**
	* Represents an active skin tone. Its value depends on the emoji UI plugin.
	*
	* Before opening the UI for the first time, the returned value is read from the editor configuration.
	* Otherwise, it reflects the user's intention.
	*/
	get skinTone() {
		if (!this.emojiPickerView) return this.editor.config.get("emoji.skinTone");
		return this.emojiPickerView.gridView.skinTone;
	}
	/**
	* Displays the balloon with the emoji picker.
	*
	* @param [searchValue=''] A default query used to filer the grid when opening the UI.
	*/
	showUI(searchValue = "") {
		this._showFakeVisualSelection();
		if (!this.emojiPickerView) this.emojiPickerView = this._createEmojiPickerView();
		if (searchValue) this.emojiPickerView.searchView.setInputValue(searchValue);
		this.emojiPickerView.searchView.search(searchValue);
		if (!this.emojiPickerFormView) this.emojiPickerFormView = this._createEmojiPickerFormView();
		if (!this.balloonPlugin.hasView(this.emojiPickerFormView)) {
			this.emojiPickerFormView.backButtonView.isVisible = !!this.balloonPlugin.visibleView;
			this.balloonPlugin.add({
				view: this.emojiPickerFormView,
				position: this._getBalloonPositionData(),
				balloonClassName: "ck-emoji-picker-balloon"
			});
		}
		this.emojiPickerView.focus();
	}
	/**
	* Creates a button for toolbar and menu bar that will show the emoji dialog.
	*/
	_createButton(ViewClass, command) {
		const buttonView = new ViewClass(this.editor.locale);
		const t = this.editor.locale.t;
		buttonView.bind("isEnabled").to(command, "isEnabled");
		buttonView.set({
			label: t("Emoji"),
			icon: IconEmoji,
			isToggleable: true
		});
		buttonView.on("execute", () => {
			this.editor.editing.view.scrollToTheSelection();
			this.showUI();
		});
		return buttonView;
	}
	/**
	* Creates an instance of the `EmojiPickerView` class that represents an emoji balloon.
	*/
	_createEmojiPickerView() {
		const emojiCategories = [...this.emojiRepositoryPlugin.getEmojiCategories()];
		const emojiPickerView = new EmojiPickerView(this.editor.locale, {
			emojiCategories,
			skinTone: this.editor.config.get("emoji.skinTone"),
			skinTones: this.emojiRepositoryPlugin.getSkinTones(),
			getEmojiByQuery: (query) => {
				return this.emojiRepositoryPlugin.getEmojiByQuery(query);
			}
		});
		if (!this.emojiRepositoryPlugin.isRepositoryReady) this.emojiRepositoryPlugin.onReady((isReady) => {
			if (!isReady) return;
			const categories = this.emojiRepositoryPlugin.getEmojiCategories();
			if (categories.length) emojiPickerView.setCategories(categories);
		});
		this.listenTo(emojiPickerView.gridView, "execute", (evt, data) => {
			const editor = this.editor;
			const textToInsert = data.emoji;
			this._hideUI();
			editor.execute("insertText", { text: textToInsert });
		});
		return emojiPickerView;
	}
	/**
	* Creates an instance of the `EmojiPickerFormView` class that represents a balloon with the emoji picker.
	*/
	_createEmojiPickerFormView() {
		const emojiPickerFormView = new EmojiPickerFormView(this.editor.locale);
		emojiPickerFormView.children.add(this.emojiPickerView);
		this.listenTo(this.emojiPickerView, "update", () => {
			if (this.balloonPlugin.visibleView === emojiPickerFormView) this.balloonPlugin.updatePosition();
		});
		this.listenTo(emojiPickerFormView, "cancel", () => {
			this._hideUI();
		});
		emojiPickerFormView.keystrokes.set("Esc", (data, cancel) => {
			this._hideUI();
			cancel();
		});
		clickOutsideHandler({
			emitter: emojiPickerFormView,
			contextElements: [this.balloonPlugin.view.element],
			callback: () => {
				this._hideUI(false);
			},
			activator: () => this.balloonPlugin.visibleView === emojiPickerFormView
		});
		return emojiPickerFormView;
	}
	/**
	* Hides the balloon with the emoji picker.
	*
	* @param updateFocus Whether to focus the editor after closing the emoji picker.
	*/
	_hideUI(updateFocus = true) {
		this.balloonPlugin.remove(this.emojiPickerFormView);
		this.emojiPickerView.searchView.setInputValue("");
		if (updateFocus) this.editor.editing.view.focus();
		this._hideFakeVisualSelection();
	}
	/**
	* Registers converters.
	*/
	_setupConversion() {
		const editor = this.editor;
		editor.conversion.for("editingDowncast").markerToHighlight({
			model: VISUAL_SELECTION_MARKER_NAME,
			view: { classes: ["ck-fake-emoji-selection"] }
		});
		editor.conversion.for("editingDowncast").markerToElement({
			model: VISUAL_SELECTION_MARKER_NAME,
			view: (data, { writer }) => {
				if (!data.markerRange.isCollapsed) return null;
				const markerElement = writer.createUIElement("span");
				writer.addClass(["ck-fake-emoji-selection", "ck-fake-emoji-selection_collapsed"], markerElement);
				return markerElement;
			}
		});
	}
	/**
	* Returns positioning options for the balloon plugin. They control the way the balloon is attached
	* to the target element or selection.
	*/
	_getBalloonPositionData() {
		const view = this.editor.editing.view;
		const viewDocument = view.document;
		const target = () => view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());
		return { target };
	}
	/**
	* Displays a fake visual selection when the contextual balloon is displayed.
	*
	* This adds an 'emoji-picker' marker into the document that is rendered as a highlight on selected text fragment.
	*/
	_showFakeVisualSelection() {
		const model = this.editor.model;
		model.change((writer) => {
			const range = model.document.selection.getFirstRange();
			if (model.markers.has(VISUAL_SELECTION_MARKER_NAME)) writer.updateMarker(VISUAL_SELECTION_MARKER_NAME, { range });
			else if (range.start.isAtEnd) {
				const startPosition = range.start.getLastMatchingPosition(({ item }) => !model.schema.isContent(item), { boundaries: range });
				writer.addMarker(VISUAL_SELECTION_MARKER_NAME, {
					usingOperation: false,
					affectsData: false,
					range: writer.createRange(startPosition, range.end)
				});
			} else writer.addMarker(VISUAL_SELECTION_MARKER_NAME, {
				usingOperation: false,
				affectsData: false,
				range
			});
		});
	}
	/**
	* Hides the fake visual selection.
	*/
	_hideFakeVisualSelection() {
		const model = this.editor.model;
		if (model.markers.has(VISUAL_SELECTION_MARKER_NAME)) model.change((writer) => {
			writer.removeMarker(VISUAL_SELECTION_MARKER_NAME);
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/emoji
*/
/**
* The emoji plugin.
*
* This is a "glue" plugin which loads the following plugins:
*
* * {@link module:emoji/emojimention~EmojiMention},
* * {@link module:emoji/emojipicker~EmojiPicker},
*/
var Emoji = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [EmojiMention, EmojiPicker];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "Emoji";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { Emoji, EmojiCategoriesView, EmojiCommand, EmojiGridView, EmojiMention, EmojiPicker, EmojiPickerFormView, EmojiPickerView, EmojiRepository, EmojiSearchView, EmojiToneView, EmojiUtils, isEmojiSupported as _isEmojiSupported };
//# sourceMappingURL=index.js.map