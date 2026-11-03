/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { Delete } from "@ckeditor/ckeditor5-typing";
/**
* Enables a set of predefined autoformatting actions.
*
* For a detailed overview, check the {@glink features/autoformat Autoformatting} feature guide
* and the {@glink api/autoformat package page}.
*/
export declare class Autoformat extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[Delete]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "Autoformat";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	afterInit(): void;
	/**
	* Adds autoformatting related to the {@link module:list/list~List}.
	*
	* When typed:
	* - `* ` or `- ` &ndash; A paragraph will be changed into a bulleted list.
	* - `<number>. ` or `<number>) ` &ndash; A paragraph will be changed into a numbered list.
	* If the paragraph is adjacent to an existing list, the typed number is ignored and the item joins the list
	* as the next sequential item. Otherwise, a new list is created with the `listStart` attribute set to the typed number
	* (when the {@link module:list/listproperties~ListProperties start index feature} is enabled).
	* - `[] ` or `[ ] ` &ndash; A paragraph will be changed into a to-do list.
	* - `[x] ` or `[ x ] ` &ndash; A paragraph will be changed into a checked to-do list.
	*/
	private _addListAutoformats;
	/**
	* Adds autoformatting related to the {@link module:basic-styles/bold~Bold},
	* {@link module:basic-styles/italic~Italic}, {@link module:basic-styles/code~Code}
	* and {@link module:basic-styles/strikethrough~Strikethrough}
	*
	* When typed:
	* - `**foobar**` &ndash; `**` characters are removed and `foobar` is set to bold,
	* - `__foobar__` &ndash; `__` characters are removed and `foobar` is set to bold,
	* - `*foobar*` &ndash; `*` characters are removed and `foobar` is set to italic,
	* - `_foobar_` &ndash; `_` characters are removed and `foobar` is set to italic,
	* - ``` `foobar` &ndash; ``` ` ``` characters are removed and `foobar` is set to code,
	* - `~~foobar~~` &ndash; `~~` characters are removed and `foobar` is set to strikethrough.
	*/
	private _addBasicStylesAutoformats;
	/**
	* Adds autoformatting related to {@link module:heading/heading~Heading}.
	*
	* It is using a number at the end of the command name to associate it with the proper trigger:
	*
	* * `heading` with a `heading1` value will be executed when typing `#`,
	* * `heading` with a `heading2` value will be executed when typing `##`,
	* * ... up to `heading6` for `######`.
	*/
	private _addHeadingAutoformats;
	/**
	* Adds autoformatting related to {@link module:block-quote/blockquote~BlockQuote}.
	*
	* When typed:
	* * `> ` &ndash; A paragraph will be changed to a block quote.
	*/
	private _addBlockQuoteAutoformats;
	/**
	* Adds autoformatting related to {@link module:code-block/codeblock~CodeBlock}.
	*
	* When typed:
	* - `` ``` `` &ndash; A paragraph will be changed to a code block.
	*/
	private _addCodeBlockAutoformats;
	/**
	* Adds autoformatting related to {@link module:horizontal-line/horizontalline~HorizontalLine}.
	*
	* When typed:
	* - `` --- `` &ndash; Will be replaced with a horizontal line.
	*/
	private _addHorizontalLineAutoformats;
}
