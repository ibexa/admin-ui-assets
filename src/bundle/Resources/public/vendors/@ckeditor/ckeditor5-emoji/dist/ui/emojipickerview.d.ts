/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module emoji/ui/emojipickerview
*/
import { FocusCycler, SearchInfoView, View, type FocusableView, type ViewCollection } from "@ckeditor/ckeditor5-ui";
import { FocusTracker, KeystrokeHandler, type Locale } from "@ckeditor/ckeditor5-utils";
import { EmojiGridView, type EmojiSearchQueryCallback } from "./emojigridview.js";
import { EmojiCategoriesView } from "./emojicategoriesview.js";
import { EmojiSearchView } from "./emojisearchview.js";
import { EmojiToneView } from "./emojitoneview.js";
import type { EmojiSkinToneId } from "../emojiconfig.js";
import type { EmojiCategory, EmojiSkinTone } from "../emojirepository.js";
/**
* A view that glues pieces of the emoji panel together.
*/
export declare class EmojiPickerView extends View<HTMLDivElement> {
	/**
	* A collection of the focusable children of the view.
	*/
	readonly items: ViewCollection<FocusableView>;
	/**
	* Tracks information about the DOM focus in the view.
	*/
	readonly focusTracker: FocusTracker;
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	readonly keystrokes: KeystrokeHandler;
	/**
	* Helps cycling over focusable {@link #items} in the view.
	*/
	readonly focusCycler: FocusCycler;
	/**
	* An instance of the `EmojiSearchView`.
	*/
	readonly searchView: EmojiSearchView;
	/**
	* An instance of the `EmojiToneView`.
	*/
	readonly toneView: EmojiToneView;
	/**
	* An instance of the `EmojiCategoriesView`.
	*/
	readonly categoriesView: EmojiCategoriesView;
	/**
	* An instance of the `EmojiGridView`.
	*/
	readonly gridView: EmojiGridView;
	/**
	* An instance of the `EmojiGridView`.
	*/
	readonly infoView: SearchInfoView;
	/**
	* @inheritDoc
	*/
	constructor(locale: Locale, { emojiCategories, getEmojiByQuery, skinTone, skinTones }: {
		emojiCategories: Array<EmojiCategory>;
		getEmojiByQuery: EmojiSearchQueryCallback;
		skinTone: EmojiSkinToneId;
		skinTones: Array<EmojiSkinTone>;
	});
	/**
	* @inheritDoc
	*/
	override render(): void;
	/**
	* @inheritDoc
	*/
	override destroy(): void;
	/**
	* Focuses the search input.
	*/
	focus(): void;
	/**
	* Sets certain list of categories in categories view and performs search.
	*/
	setCategories(categories: Array<EmojiCategory>): void;
	/**
	* Initializes interactions between sub-views.
	*/
	private _setupEventListeners;
}
/**
* Fired when the  {@link module:emoji/ui/emojipickerview~EmojiPickerView} layout is changed, either by filtering emoji tiles or
* showing a hint to a user regarding the provided query.
*
* @eventName ~EmojiPickerView#update
*/
export type EmojiPickerViewUpdateEvent = {
	name: "update";
	args: [];
};
