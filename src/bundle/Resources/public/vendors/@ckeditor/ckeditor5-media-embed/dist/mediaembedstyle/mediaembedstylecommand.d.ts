/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedstyle/mediaembedstylecommand
*/
import { Command, type Editor } from "@ckeditor/ckeditor5-core";
import type { NormalizedMediaStyleOption } from "../mediaembedconfig.js";
/**
* The media embed style command. It is used to apply a style option (e.g. an alignment) to a
* selected media embed.
*
* The set of accepted style values comes from the resolved
* {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#styles `config.mediaEmbed.styles`}
* options. Values not in that set are silently rejected by {@link #execute}.
*/
export declare class MediaEmbedStyleCommand extends Command {
	/**
	* The currently-applied style name. `false` when no style applies — either no media is
	* selected, or the selected media has no `mediaStyle` attribute and no style in
	* {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#styles `config.mediaEmbed.styles`}
	* is marked `isDefault: true`.
	*/
	value: string | false;
	/**
	* Resolved styles indexed by `name`. Used to look up the `isDefault` flag at execute time
	* (any default-marked style clears the attribute) and to validate that a requested style
	* is part of the resolved options list.
	*/
	private readonly _styles;
	/**
	* The `name` of the first style with `isDefault: true` in the resolved options, or `null`
	* when the integrator did not designate a default. Exposed via {@link #value} when the
	* selected media has no `mediaStyle` attribute, so the default-state UI button can light up.
	* Does not gate the "clear attribute" branch in {@link #execute} — that uses the per-style
	* `isDefault` flag so multi-default configs behave consistently with the downcast.
	*/
	private readonly _defaultStyleName;
	/**
	* Creates an instance of the media embed style command.
	*
	* @param editor The editor instance.
	* @param styles The resolved list of style options that this command will accept.
	*/
	constructor(editor: Editor, styles: Array<NormalizedMediaStyleOption>);
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* Executes the command and applies the chosen style to the currently selected media embed.
	*
	* ```ts
	* editor.execute( 'mediaStyle', { value: 'alignLeft' } );
	* editor.execute( 'mediaStyle', { value: 'alignCenter' } ); // removes the attribute — alignCenter is the built-in default
	* editor.execute( 'mediaStyle', { value: null } );          // removes the attribute
	* ```
	*
	* The default style is encoded on the model as the absence of the `mediaStyle` attribute.
	* Passing any `isDefault: true` style name (or `null`) therefore clears the attribute. Values
	* that are neither falsy, an `isDefault` style, nor present in the resolved options list are
	* silently rejected.
	*
	* @param options
	* @param options.value The name of the style to apply, or `null` to clear the alignment.
	* @fires execute
	*/
	override execute(options: {
		value: string | null;
	}): void;
}
