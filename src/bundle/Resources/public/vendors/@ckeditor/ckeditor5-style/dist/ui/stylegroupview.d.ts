/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module style/ui/stylegroupview
*/
import { LabelView, View } from "@ckeditor/ckeditor5-ui";
import type { Locale } from "@ckeditor/ckeditor5-utils";
import { StyleGridView } from "./stylegridview.js";
import type { NormalizedStyleDefinition } from "../styleutils.js";
/**
* A class representing a group of styles (e.g. "block" or "inline").
*
* Renders a {@link module:style/ui/stylegridview~StyleGridView style grid} and a label.
*
* @internal
*/
export declare class StyleGroupView extends View<HTMLDivElement> {
	/**
	* The styles grid of the group.
	*/
	readonly gridView: StyleGridView;
	/**
	* The label of the group.
	*/
	readonly labelView: LabelView;
	/**
	* Creates an instance of the {@link module:style/ui/stylegroupview~StyleGroupView} class.
	*
	* @param locale The localization services instance.
	* @param label The localized label of the group.
	* @param styleDefinitions Definitions of the styles in the group.
	*/
	constructor(locale: Locale, label: string, styleDefinitions: Array<NormalizedStyleDefinition>);
}
