/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { Plugin, type Editor, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { Typing } from "@ckeditor/ckeditor5-typing";
import { Mention } from "@ckeditor/ckeditor5-mention";
import { EmojiRepository } from "./emojirepository.js";
import { type EmojiPicker } from "./emojipicker.js";
/**
* The emoji mention plugin.
*
* Introduces the autocomplete of emojis while typing.
*/
export declare class EmojiMention extends Plugin {
	/**
	* An instance of the {@link module:emoji/emojipicker~EmojiPicker} plugin if it is loaded in the editor.
	*/
	emojiPickerPlugin: EmojiPicker | null;
	/**
	* An instance of the {@link module:emoji/emojirepository~EmojiRepository} plugin.
	*/
	emojiRepositoryPlugin: EmojiRepository;
	/**
	* Defines a number of displayed items in the auto complete dropdown.
	*
	* It includes the "Show all emoji..." option if the `EmojiPicker` plugin is loaded.
	*/
	private readonly _emojiDropdownLimit;
	/**
	* Defines a skin tone that is set in the emoji config.
	*/
	private readonly _skinTone;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[EmojiRepository, Typing, Mention]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "EmojiMention";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	constructor(editor: Editor);
	/**
	* Initializes the configuration for emojis in the mention feature.
	* If the marker used by emoji mention is already registered, it displays a warning.
	* If emoji mention configuration is detected, it does not register it for a second time.
	*/
	private _setupMentionConfiguration;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Returns the `itemRenderer()` callback for mention config.
	*/
	private _customItemRendererFactory;
	/**
	* Overrides the default mention execute listener to insert an emoji as plain text instead.
	*/
	private _overrideMentionExecuteListener;
	/**
	* Returns the `feed()` callback for mention config.
	*/
	private _queryEmojiCallbackFactory;
}
