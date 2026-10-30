/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module heading/title
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
/**
* The Title plugin.
*
* It splits the document into `Title` and `Body` sections.
*/
export declare class Title extends Plugin {
	/**
	* A reference to an empty paragraph in the body
	* created when there is no element in the body for the placeholder purposes.
	*/
	private _bodyPlaceholder;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "Title";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[Paragraph]>;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Logs a single warning when none of the editor's roots can host the title structure. The Title feature
	* only operates on roots whose `modelElement` is the default `$root`; roots configured with a custom
	* `modelElement` are silently skipped at runtime. If no root supports the structure, the plugin is
	* effectively a no-op and the integrator likely wants to know.
	*/
	private _warnIfNoSupportedRoot;
	/**
	* Returns the title of the document. Note that because this plugin does not allow any formatting inside
	* the title element, the output of this method will be a plain text, with no HTML tags.
	*
	* It is not recommended to use this method together with features that insert markers to the
	* data output, like comments or track changes features. If such markers start in the title and end in the
	* body, the result of this method might be incorrect.
	*
	* @param options Additional configuration passed to the conversion process.
	* See {@link module:engine/controller/datacontroller~DataController#get `DataController#get`}.
	* @returns The title of the document.
	*/
	getTitle(options?: Record<string, unknown>): string;
	/**
	* Returns the body of the document.
	*
	* Note that it is not recommended to use this method together with features that insert markers to the
	* data output, like comments or track changes features. If such markers start in the title and end in the
	* body, the result of this method might be incorrect.
	*
	* @param options Additional configuration passed to the conversion process.
	* See {@link module:engine/controller/datacontroller~DataController#get `DataController#get`}.
	* @returns The body of the document.
	*/
	getBody(options?: Record<string, unknown>): string;
	/**
	* Returns the `title` element when it is in the document. Returns `undefined` otherwise.
	*/
	private _getTitleElement;
	/**
	* Model post-fixer callback that ensures that `title` has only one `title-content` child.
	* All additional children should be moved after the `title` element and renamed to a paragraph.
	*/
	private _fixTitleContent;
	/**
	* Model post-fixer callback that creates a title element when it is missing,
	* takes care of the correct position of it and removes additional title elements.
	*/
	private _fixTitleElement;
	/**
	* Model post-fixer callback that adds an empty paragraph at the end of the document
	* when it is needed for the placeholder purposes.
	*/
	private _fixBodyElement;
	/**
	* Model post-fixer callback that removes a paragraph from the end of the document
	* if it was created for the placeholder purposes and is not needed anymore.
	*/
	private _fixExtraParagraph;
	/**
	* Attaches the `Title` and `Body` placeholders to the title and/or content.
	*/
	private _attachPlaceholders;
	/**
	* Creates navigation between the title and body sections using <kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd> keys.
	*/
	private _attachTabPressHandling;
}
/**
* The configuration of the {@link module:heading/title~Title title feature}.
*
* ```ts
* ClassicEditor
*   .create( {
*     attachTo: document.querySelector( '#editor' ),
*     plugins: [ Title, ... ],
*     title: {
*       placeholder: 'My custom placeholder for the title'
*     },
*     root: {
*       placeholder: 'My custom placeholder for the body'
*     }
*   } )
*   .then( ... )
*   .catch( ... );
* ```
*
* See {@link module:core/editor/editorconfig~EditorConfig all editor configuration options}.
*/
export interface HeadingTitleConfig {
	/**
	* Defines a custom value of the placeholder for the title field.
	*
	* Read more in {@link module:heading/title~HeadingTitleConfig}.
	*/
	placeholder?: string;
}
