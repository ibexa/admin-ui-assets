/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module code-block/utils
 */
import type { Editor } from 'ckeditor5/src/core';
import type { CodeBlockLanguageDefinition } from './codeblockconfig';
import type { DocumentSelection, Element, Model, Position, Schema, Text, UpcastWriter, ViewDocumentFragment } from 'ckeditor5/src/engine';
/**
 * Returns code block languages as defined in `config.codeBlock.languages` but processed:
 *
 * * To consider the editor localization, i.e. to display {@link module:code-block/codeblockconfig~CodeBlockLanguageDefinition}
 * in the correct language. There is no way to use {@link module:utils/locale~Locale#t} when the user
 * configuration is defined because the editor does not exist yet.
 * * To make sure each definition has a CSS class associated with it even if not specified
 * in the original configuration.
 */
export declare function getNormalizedAndLocalizedLanguageDefinitions(editor: Editor): Array<CodeBlockLanguageDefinition>;
/**
 * Returns an object associating certain language definition properties with others. For instance:
 *
 * For:
 *
 * ```ts
 * const definitions = {
 * 	{ language: 'php', class: 'language-php', label: 'PHP' },
 * 	{ language: 'javascript', class: 'js', label: 'JavaScript' },
 * };
 *
 * getPropertyAssociation( definitions, 'class', 'language' );
 * ```
 *
 * returns:
 *
 * ```ts
 * {
 * 	'language-php': 'php',
 * 	'js': 'javascript'
 * }
 * ```
 *
 * and
 *
 * ```ts
 * getPropertyAssociation( definitions, 'language', 'label' );
 * ```
 *
 * returns:
 *
 * ```ts
 * {
 * 	'php': 'PHP',
 * 	'javascript': 'JavaScript'
 * }
 * ```
 */
export declare function getPropertyAssociation(languageDefs: Array<CodeBlockLanguageDefinition>, key: keyof CodeBlockLanguageDefinition, value: keyof CodeBlockLanguageDefinition): Record<string, string>;
/**
 * For a given model text node, it returns white spaces that precede other characters in that node.
 * This corresponds to the indentation part of the code block line.
 */
export declare function getLeadingWhiteSpaces(textNode: Text): string;
/**
 * For plain text containing the code (a snippet), it returns a document fragment containing
 * view text nodes separated by `<br>` elements (in place of new line characters "\n"), for instance:
 *
 * Input:
 *
 * ```ts
 * "foo()\n
 * bar()"
 * ```
 *
 * Output:
 *
 * ```html
 * <DocumentFragment>
 * 	"foo()"
 * 	<br/>
 * 	"bar()"
 * </DocumentFragment>
 * ```
 *
 * @param text The raw code text to be converted.
 */
export declare function rawSnippetTextToViewDocumentFragment(writer: UpcastWriter, text: string): ViewDocumentFragment;
/**
 * Returns an array of all model positions within the selection that represent code block lines.
 *
 * If the selection is collapsed, it returns the exact selection anchor position:
 *
 * ```html
 * <codeBlock>[]foo</codeBlock>        ->     <codeBlock>^foo</codeBlock>
 * <codeBlock>foo[]bar</codeBlock>     ->     <codeBlock>foo^bar</codeBlock>
 * ```
 *
 * Otherwise, it returns positions **before** each text node belonging to all code blocks contained by the selection:
 *
 * ```html
 * <codeBlock>                                <codeBlock>
 *     foo[bar                                   ^foobar
 *     <softBreak></softBreak>         ->        <softBreak></softBreak>
 *     baz]qux                                   ^bazqux
 * </codeBlock>                               </codeBlock>
 * ```
 *
 * It also works across other non–code blocks:
 *
 * ```html
 * <codeBlock>                                <codeBlock>
 *     foo[bar                                   ^foobar
 * </codeBlock>                               </codeBlock>
 * <paragraph>text</paragraph>         ->     <paragraph>text</paragraph>
 * <codeBlock>                                <codeBlock>
 *     baz]qux                                   ^bazqux
 * </codeBlock>                               </codeBlock>
 * ```
 *
 * **Note:** The positions are in reverse order so they do not get outdated when iterating over them and
 * the writer inserts or removes elements at the same time.
 *
 * **Note:** The position is located after the leading white spaces in the text node.
 */
export declare function getIndentOutdentPositions(model: Model): Array<Position>;
/**
 * Checks if any of the blocks within the model selection is a code block.
 */
export declare function isModelSelectionInCodeBlock(selection: DocumentSelection): boolean;
/**
 * Checks if an {@link module:engine/model/element~Element Element} can become a code block.
 *
 * @param schema Model's schema.
 * @param element The element to be checked.
 * @returns Check result.
 */
export declare function canBeCodeBlock(schema: Schema, element: Element): boolean;
