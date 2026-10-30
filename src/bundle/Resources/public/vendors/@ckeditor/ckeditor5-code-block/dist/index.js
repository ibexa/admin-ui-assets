/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { ShiftEnter } from "@ckeditor/ckeditor5-enter";
import { ViewUpcastWriter } from "@ckeditor/ckeditor5-engine";
import { ClipboardPipeline } from "@ckeditor/ckeditor5-clipboard";
import { Collection, first } from "@ckeditor/ckeditor5-utils";
import { MenuBarMenuListItemButtonView, MenuBarMenuListItemView, MenuBarMenuListView, MenuBarMenuView, SplitButtonView, UIModel, addListToDropdown, createDropdown } from "@ckeditor/ckeditor5-ui";
import { IconCodeBlock } from "@ckeditor/ckeditor5-icons";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Returns code block languages as defined in `config.codeBlock.languages` but processed:
*
* * To consider the editor localization, i.e. to display {@link module:code-block/codeblockconfig~CodeBlockLanguageDefinition}
* in the correct language. There is no way to use {@link module:utils/locale~Locale#t} when the user
* configuration is defined because the editor does not exist yet.
* * To make sure each definition has a CSS class associated with it even if not specified
* in the original configuration.
*
* @internal
*/
function getNormalizedAndLocalizedLanguageDefinitions(editor) {
	const t = editor.t;
	const languageDefs = editor.config.get("codeBlock.languages");
	for (const def of languageDefs) {
		if (def.label === "Plain text") def.label = t("Plain text");
		if (def.class === void 0) def.class = `language-${def.language}`;
	}
	return languageDefs;
}
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
*
* @internal
*/
function getPropertyAssociation(languageDefs, key, value) {
	const association = {};
	for (const def of languageDefs) if (key === "class") {
		const newKey = def[key].split(" ").shift();
		association[newKey] = def[value];
	} else association[def[key]] = def[value];
	return association;
}
/**
* For a given model text node, it returns white spaces that precede other characters in that node.
* This corresponds to the indentation part of the code block line.
*
* @internal
*/
function getLeadingWhiteSpaces(textNode) {
	return textNode.data.match(/^(\s*)/)[0];
}
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
* @internal
*/
function rawSnippetTextToViewDocumentFragment(writer, text) {
	const fragment = writer.createDocumentFragment();
	const textLines = text.split("\n");
	const items = textLines.reduce((nodes, line, lineIndex) => {
		nodes.push(line);
		if (lineIndex < textLines.length - 1) nodes.push(writer.createElement("br"));
		return nodes;
	}, []);
	writer.appendChild(items, fragment);
	return fragment;
}
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
*
* @internal
*/
function getIndentOutdentPositions(model) {
	const selection = model.document.selection;
	const positions = [];
	if (selection.isCollapsed) return [selection.anchor];
	const walker = selection.getFirstRange().getWalker({
		ignoreElementEnd: true,
		direction: "backward"
	});
	for (const { item } of walker) {
		let node = item.is("$textProxy") ? item.textNode : item;
		const parent = node.parent;
		if (!parent.is("element", "codeBlock") || node.is("element", "softBreak")) continue;
		while (node.previousSibling && !node.previousSibling.is("element", "softBreak")) node = node.previousSibling;
		const startOffset = !node.is("$text") ? node.startOffset : node.startOffset + getLeadingWhiteSpaces(node).length;
		const position = model.createPositionAt(parent, startOffset);
		if (positions.every((pos) => !pos.isEqual(position))) positions.push(position);
	}
	return positions;
}
/**
* Checks if any of the blocks within the model selection is a code block.
*
* @internal
*/
function isModelSelectionInCodeBlock(selection) {
	const firstBlock = first(selection.getSelectedBlocks());
	return !!firstBlock && firstBlock.is("element", "codeBlock");
}
/**
* Checks if an {@link module:engine/model/element~ModelElement Element} can become a code block.
*
* @param schema Model's schema.
* @param element The element to be checked.
* @returns Check result.
* @internal
*/
function canBeCodeBlock(schema, element) {
	if (element.is("rootElement") || schema.isLimit(element)) return false;
	return schema.checkChild(element.parent, "codeBlock");
}
/**
* Get the translated message read by the screen reader when you enter or exit an element with your cursor.
*
* @internal
*/
function getCodeBlockAriaAnnouncement(t, languageDefs, element, direction) {
	const languagesToLabels = getPropertyAssociation(languageDefs, "language", "label");
	const codeBlockLanguage = element.getAttribute("language");
	if (codeBlockLanguage in languagesToLabels) {
		const language = languagesToLabels[codeBlockLanguage];
		if (direction === "enter") return t("Entering %0 code snippet", language);
		return t("Leaving %0 code snippet", language);
	}
	if (direction === "enter") return t("Entering code snippet");
	return t("Leaving code snippet");
}
/**
* For given position, finds the closest position that is at the beginning of a line of code and returns a text node that is at the
* beginning of the line (or `null` if there's no text node at the beginning of a given line).
*
* Line beings at the start of a code block element and after each `softBreak` element.
*
* Note: even though code block doesn't allow inline elements other than `<softBreak>` by default, some features may overwrite this rule,
* so such inline elements are taken into account.
*
* Some examples of expected results:
*
* ```
* <codeBlock>^</codeBlock>                                ->   null
* <codeBlock>^foobar</codeBlock>                          ->   <codeBlock>[foobar]</codeBlock>
* <codeBlock>foobar^</codeBlock>                          ->   <codeBlock>[foobar]</codeBlock>
* <codeBlock>foo^bar</codeBlock>                          ->   <codeBlock>[foobar]</codeBlock>
* <codeBlock>foo^<softBreak />bar</codeBlock>             ->   <codeBlock>[foo]<softBreak />bar</codeBlock>
* <codeBlock>foo<softBreak />bar^</codeBlock>             ->   <codeBlock>foo<softBreak />[bar]</codeBlock>
* <codeBlock>foo<softBreak />b^ar</codeBlock>             ->   <codeBlock>foo<softBreak />[bar]</codeBlock>
* <codeBlock>foo<softBreak />^bar</codeBlock>             ->   <codeBlock>foo<softBreak />[bar]</codeBlock>
* <codeBlock>^<element /></codeBlock>                     ->   null
* <codeBlock><element />^</codeBlock>                     ->   null
* <codeBlock>foo^<element /></codeBlock>                  ->   <codeBlock>[foo]<element /></codeBlock>
* <codeBlock>foo<element />^</codeBlock>                  ->   <codeBlock>[foo]<element /></codeBlock>
* <codeBlock>foo<element />bar^</codeBlock>               ->   <codeBlock>[foo]<element />bar</codeBlock>
* <codeBlock><element />bar^</codeBlock>                  ->   null
* <codeBlock>foo<softBreak />^<softBreak /></codeBlock>   ->   null
* <codeBlock>foo<softBreak />^<element /></codeBlock>     ->   null
* <codeBlock>foo<softBreak /><element />^</codeBlock>     ->   null
* <codeBlock>foo<softBreak />bar<element />^</codeBlock>  ->   <codeBlock>foo<softBreak />[bar]<element /></codeBlock>
* <codeBlock>foo<softBreak /><element />ba^r</codeBlock>  ->   null
* ```
*
* @internal
*/
function getTextNodeAtLineStart(position, model) {
	if (position.textNode) position = model.createPositionBefore(position.textNode);
	while (position.nodeBefore && !position.nodeBefore.is("element", "softBreak")) position = model.createPositionBefore(position.nodeBefore);
	const nodeAtStart = position.nodeAfter;
	return nodeAtStart && nodeAtStart.is("$text") ? nodeAtStart : null;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* The code block command plugin.
*/
var CodeBlockCommand = class extends Command {
	/**
	* Contains the last used language.
	*/
	_lastLanguage;
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		this._lastLanguage = null;
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.value = this._getValue();
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Executes the command. When the command {@link #value is on}, all topmost code blocks within
	* the selection will be removed. If it is off, all selected blocks will be flattened and
	* wrapped by a code block.
	*
	* @fires execute
	* @param options Command options.
	* @param options.language The code block language.
	* @param options.forceValue If set, it will force the command behavior. If `true`, the command will apply a code block,
	* otherwise the command will remove the code block. If not set, the command will act basing on its current value.
	* @param options.usePreviousLanguageChoice If set on `true` and the `options.language` is not specified, the command
	* will apply the previous language (if the command was already executed) when inserting the `codeBlock` element.
	*/
	execute(options = {}) {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;
		const firstLanguageInConfig = getNormalizedAndLocalizedLanguageDefinitions(editor)[0];
		const blocks = Array.from(selection.getSelectedBlocks());
		const value = options.forceValue == void 0 ? !this.value : options.forceValue;
		const language = getLanguage(options, this._lastLanguage, firstLanguageInConfig.language);
		model.change((writer) => {
			if (value) this._applyCodeBlock(writer, blocks, language);
			else this._removeCodeBlock(writer, blocks);
		});
	}
	/**
	* Checks the command's {@link #value}.
	*
	* @returns The current value.
	*/
	_getValue() {
		const selection = this.editor.model.document.selection;
		const firstBlock = first(selection.getSelectedBlocks());
		return !!firstBlock?.is("element", "codeBlock") ? firstBlock.getAttribute("language") : false;
	}
	/**
	* Checks whether the command can be enabled in the current context.
	*
	* @returns Whether the command should be enabled.
	*/
	_checkEnabled() {
		if (this.value) return true;
		const selection = this.editor.model.document.selection;
		const schema = this.editor.model.schema;
		const firstBlock = first(selection.getSelectedBlocks());
		if (!firstBlock) return false;
		return canBeCodeBlock(schema, firstBlock);
	}
	_applyCodeBlock(writer, blocks, language) {
		this._lastLanguage = language;
		const schema = this.editor.model.schema;
		const allowedBlocks = blocks.filter((block) => canBeCodeBlock(schema, block));
		for (const block of allowedBlocks) {
			writer.rename(block, "codeBlock");
			writer.setAttribute("language", language, block);
			schema.removeDisallowedAttributes([block], writer);
			Array.from(block.getChildren()).filter((child) => !schema.checkChild(block, child)).forEach((child) => writer.remove(child));
		}
		allowedBlocks.reverse().forEach((currentBlock, i) => {
			const nextBlock = allowedBlocks[i + 1];
			if (currentBlock.previousSibling === nextBlock) {
				writer.appendElement("softBreak", nextBlock);
				writer.merge(writer.createPositionBefore(currentBlock));
			}
		});
	}
	_removeCodeBlock(writer, blocks) {
		const codeBlocks = blocks.filter((block) => block.is("element", "codeBlock"));
		for (const block of codeBlocks) {
			const range = writer.createRangeOn(block);
			for (const item of Array.from(range.getItems()).reverse()) if (item.is("element", "softBreak") && item.parent.is("element", "codeBlock")) {
				const { position } = writer.split(writer.createPositionBefore(item));
				const elementAfter = position.nodeAfter;
				writer.rename(elementAfter, "paragraph");
				writer.removeAttribute("language", elementAfter);
				writer.remove(item);
			}
			writer.rename(block, "paragraph");
			writer.removeAttribute("language", block);
		}
	}
};
/**
* Picks the language for the new code block. If any language is passed as an option,
* it will be returned. Else, if option usePreviousLanguageChoice is true and some
* code block was already created (lastLanguage is not null) then previously used
* language will be returned. If not, it will return default language.
*/
function getLanguage(options, lastLanguage, defaultLanguage) {
	if (options.language) return options.language;
	if (options.usePreviousLanguageChoice && lastLanguage) return lastLanguage;
	return defaultLanguage;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module code-block/indentcodeblockcommand
*/
/**
* The code block indentation increase command plugin.
*/
var IndentCodeBlockCommand = class extends Command {
	/**
	* A sequence of characters added to the line when the command is executed.
	*/
	_indentSequence;
	constructor(editor) {
		super(editor);
		this._indentSequence = editor.config.get("codeBlock.indentSequence");
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Executes the command. When the command {@link #isEnabled is enabled}, the indentation of the
	* code lines in the selection will be increased.
	*
	* @fires execute
	*/
	execute() {
		const model = this.editor.model;
		model.change((writer) => {
			const positions = getIndentOutdentPositions(model);
			for (const position of positions) {
				const indentSequenceTextElement = writer.createText(this._indentSequence);
				model.insertContent(indentSequenceTextElement, position);
			}
		});
	}
	/**
	* Checks whether the command can be enabled in the current context.
	*/
	_checkEnabled() {
		if (!this._indentSequence) return false;
		return isModelSelectionInCodeBlock(this.editor.model.document.selection);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* The code block indentation decrease command plugin.
*/
var OutdentCodeBlockCommand = class extends Command {
	/**
	* A sequence of characters removed from the line when the command is executed.
	*/
	_indentSequence;
	constructor(editor) {
		super(editor);
		this._indentSequence = editor.config.get("codeBlock.indentSequence");
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.isEnabled = this._checkEnabled();
	}
	/**
	* Executes the command. When the command {@link #isEnabled is enabled}, the indentation of the
	* code lines in the selection will be decreased.
	*
	* @fires execute
	*/
	execute() {
		const model = this.editor.model;
		model.change(() => {
			const positions = getIndentOutdentPositions(model);
			for (const position of positions) {
				const range = getLastOutdentableSequenceRange(model, position, this._indentSequence);
				if (range) model.deleteContent(model.createSelection(range));
			}
		});
	}
	/**
	* Checks whether the command can be enabled in the current context.
	*
	* @private
	* @returns {Boolean} Whether the command should be enabled.
	*/
	_checkEnabled() {
		if (!this._indentSequence) return false;
		const model = this.editor.model;
		if (!isModelSelectionInCodeBlock(model.document.selection)) return false;
		return getIndentOutdentPositions(model).some((position) => {
			return getLastOutdentableSequenceRange(model, position, this._indentSequence);
		});
	}
};
function getLastOutdentableSequenceRange(model, position, sequence) {
	const nodeAtPosition = getTextNodeAtLineStart(position, model);
	if (!nodeAtPosition) return null;
	const leadingWhiteSpaces = getLeadingWhiteSpaces(nodeAtPosition);
	const lastIndexOfSequence = leadingWhiteSpaces.lastIndexOf(sequence);
	if (lastIndexOfSequence + sequence.length !== leadingWhiteSpaces.length) return null;
	if (lastIndexOfSequence === -1) return null;
	const { parent, startOffset } = nodeAtPosition;
	return model.createRange(model.createPositionAt(parent, startOffset + lastIndexOfSequence), model.createPositionAt(parent, startOffset + lastIndexOfSequence + sequence.length));
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* A model-to-view (both editing and data) converter for the `codeBlock` element.
*
* Sample input:
*
* ```html
* <codeBlock language="javascript">foo();<softBreak></softBreak>bar();</codeBlock>
* ```
*
* Sample output (editing):
*
* ```html
* <pre data-language="JavaScript"><code class="language-javascript">foo();<br />bar();</code></pre>
* ```
*
* Sample output (data, see {@link module:code-block/converters~modelToDataViewSoftBreakInsertion}):
*
* ```html
* <pre><code class="language-javascript">foo();\nbar();</code></pre>
* ```
*
* @param languageDefs The normalized language configuration passed to the feature.
* @param useLabels When `true`, the `<pre>` element will get a `data-language` attribute with a
* human–readable label of the language. Used only in the editing.
* @returns Returns a conversion callback.
* @internal
*/
function modelToViewCodeBlockInsertion(model, languageDefs, useLabels = false) {
	const languagesToClasses = getPropertyAssociation(languageDefs, "language", "class");
	const languagesToLabels = getPropertyAssociation(languageDefs, "language", "label");
	return (evt, data, conversionApi) => {
		const { writer, mapper, consumable } = conversionApi;
		if (!consumable.consume(data.item, "insert")) return;
		const codeBlockLanguage = data.item.getAttribute("language");
		const targetViewPosition = mapper.toViewPosition(model.createPositionBefore(data.item));
		const preAttributes = {};
		if (useLabels) {
			preAttributes["data-language"] = languagesToLabels[codeBlockLanguage];
			preAttributes.spellcheck = "false";
		}
		const codeAttributes = languagesToClasses[codeBlockLanguage] ? { class: languagesToClasses[codeBlockLanguage] } : void 0;
		const code = writer.createContainerElement("code", codeAttributes);
		const pre = writer.createContainerElement("pre", preAttributes, code);
		writer.insert(targetViewPosition, pre);
		mapper.bindElements(data.item, code);
	};
}
/**
* A model-to-data view converter for the new line (`softBreak`) separator.
*
* Sample input:
*
* ```html
* <codeBlock ...>foo();<softBreak></softBreak>bar();</codeBlock>
* ```
*
* Sample output:
*
* ```html
* <pre><code ...>foo();\nbar();</code></pre>
* ```
*
* @returns Returns a conversion callback.
* @internal
*/
function modelToDataViewSoftBreakInsertion(model) {
	return (evt, data, conversionApi) => {
		if (data.item.parent.name !== "codeBlock") return;
		const { writer, mapper, consumable } = conversionApi;
		if (!consumable.consume(data.item, "insert")) return;
		const position = mapper.toViewPosition(model.createPositionBefore(data.item));
		writer.insert(position, writer.createText("\n"));
	};
}
/**
* A view-to-model converter for `<pre>` with the `<code>` HTML.
*
* Sample input:
*
* ```html
* <pre><code class="language-javascript">foo();bar();</code></pre>
* ```
*
* Sample output:
*
* ```html
* <codeBlock language="javascript">foo();bar();</codeBlock>
* ```
*
* @param languageDefs The normalized language configuration passed to the feature.
* @returns Returns a conversion callback.
* @internal
*/
function dataViewToModelCodeBlockInsertion(editingView, languageDefs) {
	const classesToLanguages = getPropertyAssociation(languageDefs, "class", "language");
	const defaultLanguageName = languageDefs[0].language;
	return (evt, data, conversionApi) => {
		const viewCodeElement = data.viewItem;
		const viewPreElement = viewCodeElement.parent;
		if (!viewPreElement || !viewPreElement.is("element", "pre")) return;
		if (data.modelCursor.findAncestor("codeBlock")) return;
		const { consumable, writer } = conversionApi;
		if (!consumable.test(viewCodeElement, { name: true })) return;
		const codeBlock = writer.createElement("codeBlock");
		const viewChildClasses = [...viewCodeElement.getClassNames()];
		if (!viewChildClasses.length) viewChildClasses.push("");
		for (const className of viewChildClasses) {
			const language = classesToLanguages[className];
			if (language) {
				consumable.consume(viewCodeElement, { classes: [className] });
				writer.setAttribute("language", language, codeBlock);
				break;
			}
		}
		if (!codeBlock.hasAttribute("language")) writer.setAttribute("language", defaultLanguageName, codeBlock);
		conversionApi.convertChildren(viewCodeElement, codeBlock);
		if (!conversionApi.safeInsert(codeBlock, data.modelCursor)) return;
		consumable.consume(viewCodeElement, { name: true });
		conversionApi.updateConversionResult(codeBlock, data);
	};
}
/**
* A view-to-model converter for new line characters in `<pre>`.
*
* Sample input:
*
* ```html
* <pre><code class="language-javascript">foo();\nbar();</code></pre>
* ```
*
* Sample output:
*
* ```html
* <codeBlock language="javascript">foo();<softBreak></softBreak>bar();</codeBlock>
* ```
*
* @returns {Function} Returns a conversion callback.
* @internal
*/
function dataViewToModelTextNewlinesInsertion() {
	return (evt, data, { consumable, writer }) => {
		let position = data.modelCursor;
		if (!consumable.test(data.viewItem)) return;
		if (!position.findAncestor("codeBlock")) return;
		consumable.consume(data.viewItem);
		const textLines = data.viewItem.data.split("\n").map((data) => writer.createText(data));
		const lastLine = textLines[textLines.length - 1];
		for (const node of textLines) {
			writer.insert(node, position);
			position = position.getShiftedBy(node.offsetSize);
			if (node !== lastLine) {
				const softBreak = writer.createElement("softBreak");
				writer.insert(softBreak, position);
				position = writer.createPositionAfter(softBreak);
			}
		}
		data.modelRange = writer.createRange(data.modelCursor, position);
		data.modelCursor = position;
	};
}
/**
* A view-to-model converter that handles orphan text nodes (white spaces, new lines, etc.)
* that surround `<code>` inside `<pre>`.
*
* Sample input:
*
* ```html
* // White spaces
* <pre> <code>foo()</code> </pre>
*
* // White spaces
* <pre>      <code>foo()</code>      </pre>
*
* // White spaces
* <pre>			<code>foo()</code>			</pre>
*
* // New lines
* <pre>
* 	<code>foo()</code>
* </pre>
*
* // Redundant text
* <pre>ABC<code>foo()</code>DEF</pre>
* ```
*
* Unified output for each case:
*
* ```html
* <codeBlock language="plaintext">foo()</codeBlock>
* ```
*
* @returns Returns a conversion callback.
* @internal
*/
function dataViewToModelOrphanNodeConsumer() {
	return (evt, data, { consumable }) => {
		const preElement = data.viewItem;
		if (preElement.findAncestor("pre")) return;
		const preChildren = Array.from(preElement.getChildren());
		const childCodeElement = preChildren.find((node) => node.is("element", "code"));
		if (!childCodeElement) return;
		for (const child of preChildren) {
			if (child === childCodeElement || !child.is("$text")) continue;
			consumable.consume(child, { name: true });
		}
	};
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module code-block/codeblockediting
*/
const DEFAULT_ELEMENT = "paragraph";
/**
* The editing part of the code block feature.
*
* Introduces the `'codeBlock'` command and the `'codeBlock'` model element.
*/
var CodeBlockEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "CodeBlockEditing";
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
	static get requires() {
		return [ShiftEnter];
	}
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		editor.config.define("codeBlock", {
			languages: [
				{
					language: "plaintext",
					label: "Plain text"
				},
				{
					language: "c",
					label: "C"
				},
				{
					language: "cs",
					label: "C#"
				},
				{
					language: "cpp",
					label: "C++"
				},
				{
					language: "css",
					label: "CSS"
				},
				{
					language: "diff",
					label: "Diff"
				},
				{
					language: "go",
					label: "Go"
				},
				{
					language: "html",
					label: "HTML"
				},
				{
					language: "java",
					label: "Java"
				},
				{
					language: "javascript",
					label: "JavaScript"
				},
				{
					language: "php",
					label: "PHP"
				},
				{
					language: "python",
					label: "Python"
				},
				{
					language: "ruby",
					label: "Ruby"
				},
				{
					language: "typescript",
					label: "TypeScript"
				},
				{
					language: "xml",
					label: "XML"
				}
			],
			indentSequence: "	"
		});
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const model = editor.model;
		const view = editor.editing.view;
		const normalizedLanguagesDefs = getNormalizedAndLocalizedLanguageDefinitions(editor);
		editor.commands.add("codeBlock", new CodeBlockCommand(editor));
		editor.commands.add("indentCodeBlock", new IndentCodeBlockCommand(editor));
		editor.commands.add("outdentCodeBlock", new OutdentCodeBlockCommand(editor));
		this.listenTo(view.document, "tab", (evt, data) => {
			const commandName = data.shiftKey ? "outdentCodeBlock" : "indentCodeBlock";
			if (!editor.commands.get(commandName).isEnabled) return;
			editor.execute(commandName);
			data.stopPropagation();
			data.preventDefault();
			evt.stop();
		}, { context: "pre" });
		schema.register("codeBlock", {
			allowWhere: "$block",
			allowChildren: "$text",
			disallowChildren: "$inlineObject",
			allowAttributes: ["language"],
			allowAttributesOf: "$listItem",
			isBlock: true
		});
		schema.addAttributeCheck((context, attributeName) => {
			const parent = context.getItem(context.length - 2);
			if (schema.getAttributeProperties(attributeName).isFormatting && parent && parent.name == "codeBlock") return false;
		});
		editor.editing.downcastDispatcher.on("insert:codeBlock", modelToViewCodeBlockInsertion(model, normalizedLanguagesDefs, true));
		editor.data.downcastDispatcher.on("insert:codeBlock", modelToViewCodeBlockInsertion(model, normalizedLanguagesDefs));
		editor.data.downcastDispatcher.on("insert:softBreak", modelToDataViewSoftBreakInsertion(model), { priority: "high" });
		editor.data.upcastDispatcher.on("element:code", dataViewToModelCodeBlockInsertion(view, normalizedLanguagesDefs));
		editor.data.upcastDispatcher.on("text", dataViewToModelTextNewlinesInsertion());
		editor.data.upcastDispatcher.on("element:pre", dataViewToModelOrphanNodeConsumer(), { priority: "high" });
		this.listenTo(editor.editing.view.document, "clipboardInput", (evt, data) => {
			let insertionRange = model.createRange(model.document.selection.anchor);
			if (data.targetRanges) insertionRange = editor.editing.mapper.toModelRange(data.targetRanges[0]);
			if (!insertionRange.start.parent.is("element", "codeBlock")) return;
			const text = data.dataTransfer.getData("text/plain");
			const writer = new ViewUpcastWriter(editor.editing.view.document);
			data.content = rawSnippetTextToViewDocumentFragment(writer, text);
		});
		if (editor.plugins.has("ClipboardPipeline")) editor.plugins.get(ClipboardPipeline).on("contentInsertion", (evt, data) => {
			const model = editor.model;
			const selection = model.document.selection;
			if (!selection.anchor.parent.is("element", "codeBlock")) return;
			model.change((writer) => {
				const contentRange = writer.createRangeIn(data.content);
				for (const item of [...contentRange.getItems()]) if (item.is("node") && !schema.checkChild(selection.anchor, item)) writer.remove(item);
			});
		});
		this.listenTo(model, "getSelectedContent", (evt, [selection]) => {
			const anchor = selection.anchor;
			if (selection.isCollapsed || !anchor.parent.is("element", "codeBlock") || !anchor.hasSameParentAs(selection.focus)) return;
			model.change((writer) => {
				const docFragment = evt.return;
				if (anchor.parent.is("element") && (docFragment.childCount > 1 || selection.containsEntireContent(anchor.parent))) {
					const codeBlock = writer.createElement("codeBlock", anchor.parent.getAttributes());
					writer.append(docFragment, codeBlock);
					const newDocumentFragment = writer.createDocumentFragment();
					writer.append(codeBlock, newDocumentFragment);
					evt.return = newDocumentFragment;
					return;
				}
				const textNode = docFragment.getChild(0);
				if (schema.checkAttribute(textNode, "code")) writer.setAttribute("code", true, textNode);
			});
		});
	}
	/**
	* @inheritDoc
	*/
	afterInit() {
		const editor = this.editor;
		const commands = editor.commands;
		const indent = commands.get("indent");
		const outdent = commands.get("outdent");
		if (indent) indent.registerChildCommand(commands.get("indentCodeBlock"), { priority: "highest" });
		if (outdent) outdent.registerChildCommand(commands.get("outdentCodeBlock"));
		this.listenTo(editor.editing.view.document, "enter", (evt, data) => {
			if (!editor.model.document.selection.getLastPosition().parent.is("element", "codeBlock")) return;
			if (!leaveBlockStartOnEnter(editor, data.isSoft) && !leaveBlockEndOnEnter(editor, data.isSoft)) breakLineOnEnter(editor);
			data.preventDefault();
			evt.stop();
		}, { context: "pre" });
		this._initAriaAnnouncements();
	}
	/**
	* Observe when user enters or leaves code block and set proper aria value in global live announcer.
	* This allows screen readers to indicate when the user has entered and left the specified code block.
	*
	* @internal
	*/
	_initAriaAnnouncements() {
		const { model, ui, t } = this.editor;
		const languageDefs = getNormalizedAndLocalizedLanguageDefinitions(this.editor);
		let lastFocusedCodeBlock = null;
		model.document.selection.on("change:range", () => {
			const focusParent = model.document.selection.focus.parent;
			if (!ui || lastFocusedCodeBlock === focusParent || !focusParent.is("element")) return;
			if (lastFocusedCodeBlock && lastFocusedCodeBlock.is("element", "codeBlock")) ui.ariaLiveAnnouncer.announce(getCodeBlockAriaAnnouncement(t, languageDefs, lastFocusedCodeBlock, "leave"));
			if (focusParent.is("element", "codeBlock")) ui.ariaLiveAnnouncer.announce(getCodeBlockAriaAnnouncement(t, languageDefs, focusParent, "enter"));
			lastFocusedCodeBlock = focusParent;
		});
	}
};
/**
* Normally, when the Enter (or Shift+Enter) key is pressed, a soft line break is to be added to the
* code block. Let's try to follow the indentation of the previous line when possible, for instance:
*
* ```html
* // Before pressing enter (or shift enter)
* <codeBlock>
* "    foo()"[]                   // Indent of 4 spaces.
* </codeBlock>
*
* // After pressing:
* <codeBlock>
* "    foo()"                 // Indent of 4 spaces.
* <softBreak></softBreak>     // A new soft break created by pressing enter.
* "    "[]                    // Retain the indent of 4 spaces.
* </codeBlock>
* ```
*/
function breakLineOnEnter(editor) {
	const model = editor.model;
	const modelDoc = model.document;
	const lastSelectionPosition = modelDoc.selection.getLastPosition();
	let leadingWhiteSpaces;
	const node = getTextNodeAtLineStart(lastSelectionPosition, model);
	if (node && node.is("$text")) leadingWhiteSpaces = getLeadingWhiteSpaces(node);
	editor.model.change((writer) => {
		editor.execute("shiftEnter");
		if (leadingWhiteSpaces) writer.insertText(leadingWhiteSpaces, modelDoc.selection.anchor);
	});
}
/**
* Leave the code block when Enter (but NOT Shift+Enter) has been pressed twice at the beginning
* of the code block:
*
* ```html
* // Before:
* <codeBlock>[]<softBreak></softBreak>foo</codeBlock>
*
* // After pressing:
* <paragraph>[]</paragraph><codeBlock>foo</codeBlock>
* ```
*
* @param isSoftEnter When `true`, enter was pressed along with <kbd>Shift</kbd>.
* @returns `true` when selection left the block. `false` if stayed.
*/
function leaveBlockStartOnEnter(editor, isSoftEnter) {
	const modelDoc = editor.model.document;
	const view = editor.editing.view;
	const lastSelectionPosition = modelDoc.selection.getLastPosition();
	const nodeAfter = lastSelectionPosition.nodeAfter;
	if (isSoftEnter || !modelDoc.selection.isCollapsed || !lastSelectionPosition.isAtStart) return false;
	if (!isSoftBreakNode(nodeAfter)) return false;
	editor.model.change((writer) => {
		editor.execute("enter");
		const newBlock = modelDoc.selection.anchor.parent.previousSibling;
		writer.rename(newBlock, DEFAULT_ELEMENT);
		writer.setSelection(newBlock, "in");
		editor.model.schema.removeDisallowedAttributes([newBlock], writer);
		writer.remove(nodeAfter);
	});
	view.scrollToTheSelection();
	return true;
}
/**
* Leave the code block when Enter (but NOT Shift+Enter) has been pressed twice at the end
* of the code block:
*
* ```html
* // Before:
* <codeBlock>foo[]</codeBlock>
*
* // After first press:
* <codeBlock>foo<softBreak></softBreak>[]</codeBlock>
*
* // After second press:
* <codeBlock>foo</codeBlock><paragraph>[]</paragraph>
* ```
*
* @param isSoftEnter When `true`, enter was pressed along with <kbd>Shift</kbd>.
* @returns `true` when selection left the block. `false` if stayed.
*/
function leaveBlockEndOnEnter(editor, isSoftEnter) {
	const model = editor.model;
	const modelDoc = model.document;
	const view = editor.editing.view;
	const lastSelectionPosition = modelDoc.selection.getLastPosition();
	const nodeBefore = lastSelectionPosition.nodeBefore;
	let emptyLineRangeToRemoveOnEnter;
	if (isSoftEnter || !modelDoc.selection.isCollapsed || !lastSelectionPosition.isAtEnd || !nodeBefore || !nodeBefore.previousSibling) return false;
	if (isSoftBreakNode(nodeBefore) && isSoftBreakNode(nodeBefore.previousSibling)) emptyLineRangeToRemoveOnEnter = model.createRange(model.createPositionBefore(nodeBefore.previousSibling), model.createPositionAfter(nodeBefore));
	else if (isEmptyishTextNode(nodeBefore) && isSoftBreakNode(nodeBefore.previousSibling) && isSoftBreakNode(nodeBefore.previousSibling.previousSibling)) emptyLineRangeToRemoveOnEnter = model.createRange(model.createPositionBefore(nodeBefore.previousSibling.previousSibling), model.createPositionAfter(nodeBefore));
	else if (isEmptyishTextNode(nodeBefore) && isSoftBreakNode(nodeBefore.previousSibling) && isEmptyishTextNode(nodeBefore.previousSibling.previousSibling) && nodeBefore.previousSibling.previousSibling && isSoftBreakNode(nodeBefore.previousSibling.previousSibling.previousSibling)) emptyLineRangeToRemoveOnEnter = model.createRange(model.createPositionBefore(nodeBefore.previousSibling.previousSibling.previousSibling), model.createPositionAfter(nodeBefore));
	else return false;
	editor.model.change((writer) => {
		writer.remove(emptyLineRangeToRemoveOnEnter);
		editor.execute("enter");
		const newBlock = modelDoc.selection.anchor.parent;
		writer.rename(newBlock, DEFAULT_ELEMENT);
		editor.model.schema.removeDisallowedAttributes([newBlock], writer);
	});
	view.scrollToTheSelection();
	return true;
}
function isEmptyishTextNode(node) {
	return node && node.is("$text") && !node.data.match(/\S/);
}
function isSoftBreakNode(node) {
	return node && node.is("element", "softBreak");
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module code-block/codeblockui
*/
/**
* The code block UI plugin.
*
* Introduces the `'codeBlock'` dropdown.
*/
var CodeBlockUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "CodeBlockUI";
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
		const editor = this.editor;
		const t = editor.t;
		const componentFactory = editor.ui.componentFactory;
		const normalizedLanguageDefs = getNormalizedAndLocalizedLanguageDefinitions(editor);
		const itemDefinitions = this._getLanguageListItemDefinitions(normalizedLanguageDefs);
		const command = editor.commands.get("codeBlock");
		componentFactory.add("codeBlock", (locale) => {
			const dropdownView = createDropdown(locale, SplitButtonView);
			const splitButtonView = dropdownView.buttonView;
			const accessibleLabel = t("Insert code block");
			splitButtonView.set({
				label: accessibleLabel,
				tooltip: true,
				icon: IconCodeBlock,
				isToggleable: true
			});
			splitButtonView.bind("isOn").to(command, "value", (value) => !!value);
			splitButtonView.on("execute", () => {
				editor.execute("codeBlock", { usePreviousLanguageChoice: true });
				editor.editing.view.focus();
			});
			dropdownView.on("execute", (evt) => {
				editor.execute("codeBlock", {
					language: evt.source._codeBlockLanguage,
					forceValue: true
				});
				editor.editing.view.focus();
			});
			dropdownView.class = "ck-code-block-dropdown";
			dropdownView.bind("isEnabled").to(command);
			addListToDropdown(dropdownView, itemDefinitions, {
				role: "menu",
				ariaLabel: accessibleLabel
			});
			return dropdownView;
		});
		componentFactory.add("menuBar:codeBlock", (locale) => {
			const menuView = new MenuBarMenuView(locale);
			menuView.buttonView.set({
				role: "menuitem",
				label: t("Code block"),
				icon: IconCodeBlock
			});
			menuView.bind("isEnabled").to(command);
			const listView = new MenuBarMenuListView(locale);
			listView.set({ ariaLabel: t("Insert code block") });
			for (const definition of itemDefinitions) {
				const listItemView = new MenuBarMenuListItemView(locale, menuView);
				const buttonView = new MenuBarMenuListItemButtonView(locale);
				buttonView.bind(...Object.keys(definition.model)).to(definition.model);
				buttonView.set({
					isToggleable: true,
					role: "menuitemcheckbox"
				});
				buttonView.delegate("execute").to(menuView);
				buttonView.on("execute", () => {
					editor.execute("codeBlock", {
						language: definition.model._codeBlockLanguage,
						forceValue: command.value == definition.model._codeBlockLanguage ? false : true
					});
					editor.editing.view.focus();
				});
				listItemView.children.add(buttonView);
				listView.items.add(listItemView);
			}
			menuView.panelView.children.add(listView);
			return menuView;
		});
	}
	/**
	* A helper returning a collection of the `codeBlock` dropdown items representing languages
	* available for the user to choose from.
	*/
	_getLanguageListItemDefinitions(normalizedLanguageDefs) {
		const command = this.editor.commands.get("codeBlock");
		const itemDefinitions = new Collection();
		for (const languageDef of normalizedLanguageDefs) {
			const definition = {
				type: "button",
				model: new UIModel({
					_codeBlockLanguage: languageDef.language,
					label: languageDef.label,
					role: "menuitemradio",
					withText: true
				})
			};
			definition.model.bind("isOn").to(command, "value", (value) => {
				return value === definition.model._codeBlockLanguage;
			});
			itemDefinitions.add(definition);
		}
		return itemDefinitions;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module code-block/codeblock
*/
/**
* The code block plugin.
*
* For more information about this feature check the {@glink api/code-block package page} and the
* {@glink features/code-blocks code block} feature guide.
*
* This is a "glue" plugin that loads the {@link module:code-block/codeblockediting~CodeBlockEditing code block editing feature}
* and the {@link module:code-block/codeblockui~CodeBlockUI code block UI feature}.
*/
var CodeBlock = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [CodeBlockEditing, CodeBlockUI];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "CodeBlock";
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

export { CodeBlock, CodeBlockCommand, CodeBlockEditing, CodeBlockUI, IndentCodeBlockCommand, OutdentCodeBlockCommand, canBeCodeBlock as _canBeCodeBlock, dataViewToModelCodeBlockInsertion as _dataViewToModelCodeBlockInsertion, dataViewToModelOrphanNodeConsumer as _dataViewToModelCodeBlockOrphanNodeConsumer, dataViewToModelTextNewlinesInsertion as _dataViewToModelCodeBlockTextNewlinesInsertion, getCodeBlockAriaAnnouncement as _getCodeBlockAriaAnnouncement, getIndentOutdentPositions as _getCodeBlockIndentOutdentPositions, getLeadingWhiteSpaces as _getCodeBlockLeadingWhiteSpaces, getPropertyAssociation as _getCodeBlockPropertyAssociation, getTextNodeAtLineStart as _getCodeBlockTextNodeAtLineStart, getNormalizedAndLocalizedLanguageDefinitions as _getNormalizedAndLocalizedCodeBlockLanguageDefinitions, isModelSelectionInCodeBlock as _isModelSelectionInCodeBlock, modelToDataViewSoftBreakInsertion as _modelToDataViewCodeBlockSoftBreakInsertion, modelToViewCodeBlockInsertion as _modelToViewCodeBlockInsertion, rawSnippetTextToViewDocumentFragment as _rawCodeBlockSnippetTextToViewDocumentFragment };
//# sourceMappingURL=index.js.map