/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { Delete, Input, TextWatcher, TwoStepCaretMovement, findAttributeRange, getLastTextLine, inlineHighlight } from "@ckeditor/ckeditor5-typing";
import { ClipboardPipeline } from "@ckeditor/ckeditor5-clipboard";
import { Collection, FocusTracker, KeystrokeHandler, ObservableMixin, diff, env, first, keyCodes, priorities, toMap } from "@ckeditor/ckeditor5-utils";
import { ClickObserver, Matcher, ModelLivePosition } from "@ckeditor/ckeditor5-engine";
import { upperFirst } from "es-toolkit/compat";
import { IconLink, IconNextArrow, IconPencil, IconPreviousArrow, IconSettings, IconUnlink } from "@ckeditor/ckeditor5-icons";
import { ButtonView, ContextualBalloon, CssTransitionDisablerMixin, FocusCycler, FormHeaderView, FormRowView, IconView, LabeledFieldView, ListItemView, ListView, MenuBarMenuListItemButtonView, SwitchButtonView, ToolbarView, View, ViewCollection, clickOutsideHandler, createLabeledInputText, submitHandler } from "@ckeditor/ckeditor5-ui";
import { isWidget } from "@ckeditor/ckeditor5-widget";
import { ImageBlockEditing, ImageEditing, ImageUtils } from "@ckeditor/ckeditor5-image";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/utils/automaticdecorators
*/
/**
* Helper class that ties together all {@link module:link/linkconfig~LinkDecoratorAutomaticDefinition} and provides
* the {@link module:engine/conversion/downcasthelpers~DowncastHelpers#attributeToElement downcast dispatchers} for them.
*/
var AutomaticLinkDecorators = class {
	/**
	* Stores the definition of {@link module:link/linkconfig~LinkDecoratorAutomaticDefinition automatic decorators}.
	* This data is used as a source for a downcast dispatcher to create a proper conversion to output data.
	*/
	_definitions = /* @__PURE__ */ new Set();
	/**
	* A callback that checks if a decorator can be applied to a given element.
	* Returns `true` if there is a conflict preventing the decorator from being applied.
	*/
	_conflictChecker;
	/**
	* Gives information about the number of decorators stored in the {@link module:link/utils/automaticdecorators~AutomaticLinkDecorators}
	* instance.
	*/
	get length() {
		return this._definitions.size;
	}
	/**
	* Sets a callback that checks if a decorator can be applied to a given element.
	*
	* @param checker A function that returns `true` if there is a conflict preventing the decorator from being applied.
	*/
	setConflictChecker(checker) {
		this._conflictChecker = checker;
	}
	/**
	* Adds automatic decorator objects or an array with them to be used during downcasting.
	*
	* @param item A configuration object of automatic rules for decorating links. It might also be an array of such objects.
	*/
	add(item) {
		if (Array.isArray(item)) item.forEach((item) => this._definitions.add(item));
		else this._definitions.add(item);
	}
	/**
	* Provides the conversion helper used in the {@link module:engine/conversion/downcasthelpers~DowncastHelpers#add} method.
	*
	* @returns A dispatcher function used as conversion helper in {@link module:engine/conversion/downcasthelpers~DowncastHelpers#add}.
	*/
	getDispatcher() {
		return (dispatcher) => {
			const elementCreator = (item, viewWriter) => {
				const viewElement = viewWriter.createAttributeElement("a", item.attributes, { priority: 5 });
				if (item.classes) viewWriter.addClass(item.classes, viewElement);
				for (const key in item.styles) viewWriter.setStyle(key, item.styles[key], viewElement);
				viewWriter.setCustomProperty("link", true, viewElement);
				return viewElement;
			};
			const createConverter = (isApplyingConverter) => {
				return (evt, data, conversionApi) => {
					if (!data.attributeKey.startsWith("link")) return;
					if (data.attributeKey == "linkHref" && !conversionApi.consumable.test(data.item, "attribute:linkHref")) return;
					if (!data.item.is("selection") && !conversionApi.schema.isInline(data.item)) return;
					for (const decorator of this._definitions) if (decorator.callback(data.item.getAttribute("linkHref")) && !this._conflictChecker?.(decorator, data.item) && isApplyingConverter) {
						if (data.item.is("selection")) conversionApi.writer.wrap(conversionApi.writer.document.selection.getFirstRange(), elementCreator(decorator, conversionApi.writer));
						else conversionApi.writer.wrap(conversionApi.mapper.toViewRange(data.range), elementCreator(decorator, conversionApi.writer));
					} else conversionApi.writer.unwrap(conversionApi.mapper.toViewRange(data.range), elementCreator(decorator, conversionApi.writer));
				};
			};
			dispatcher.on("attribute", createConverter(false), { priority: priorities.high - 1 });
			dispatcher.on("attribute", createConverter(true), { priority: priorities.high - 2 });
		};
	}
	/**
	* Provides the conversion helper used in the {@link module:engine/conversion/downcasthelpers~DowncastHelpers#add} method
	* when linking images.
	*
	* @returns A dispatcher function used as conversion helper in {@link module:engine/conversion/downcasthelpers~DowncastHelpers#add}.
	*/
	getDispatcherForLinkedImage() {
		return (dispatcher) => {
			const createConverter = (isApplyingConverter) => {
				return (evt, data, { writer, mapper }) => {
					if (!data.item.is("element", "imageBlock") || !data.attributeKey.startsWith("link")) return;
					const viewFigure = mapper.toViewElement(data.item);
					const linkInImage = Array.from(viewFigure.getChildren()).find((child) => child.is("element", "a"));
					if (!linkInImage) return;
					for (const decorator of this._definitions) {
						const attributes = toMap(decorator.attributes);
						if (decorator.callback(data.item.getAttribute("linkHref")) && !this._conflictChecker?.(decorator, data.item) && isApplyingConverter) {
							for (const [key, val] of attributes) if (key === "class") writer.addClass(val, linkInImage);
							else writer.setAttribute(key, val, false, linkInImage);
							if (decorator.classes) writer.addClass(decorator.classes, linkInImage);
							for (const key in decorator.styles) writer.setStyle(key, decorator.styles[key], linkInImage);
						} else {
							for (const [key, val] of attributes) if (key === "class") writer.removeClass(val, linkInImage);
							else writer.removeAttribute(key, val, linkInImage);
							if (decorator.classes) writer.removeClass(decorator.classes, linkInImage);
							for (const key in decorator.styles) writer.removeStyle(key, linkInImage);
						}
					}
				};
			};
			dispatcher.on("attribute", createConverter(false), { priority: priorities.high - 1 });
			dispatcher.on("attribute", createConverter(true), { priority: priorities.high - 2 });
		};
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
const ATTRIBUTE_WHITESPACES = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g;
const SAFE_URL_TEMPLATE = "^(?:(?:<protocols>):|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))";
const EMAIL_REG_EXP = /^[\S]+@((?![-_])(?:[-\w\u00a1-\uffff]{0,63}[^-_]\.))+(?:[a-z\u00a1-\uffff]{2,})$/i;
const PROTOCOL_REG_EXP = /^((\w+:(\/{2,})?)|(\W))/i;
const DEFAULT_LINK_PROTOCOLS = [
	"https?",
	"ftps?",
	"mailto"
];
/**
* A keystroke used by the {@link module:link/linkui~LinkUI link UI feature}.
*/
const LINK_KEYSTROKE = "Ctrl+K";
/**
* Returns `true` if a given view node is the link element.
*/
function isLinkElement(node) {
	return node.is("attributeElement") && !!node.getCustomProperty("link");
}
/**
* Creates a link {@link module:engine/view/attributeelement~ViewAttributeElement} with the provided `href` attribute.
*/
function createLinkElement(href, { writer }) {
	const linkElement = writer.createAttributeElement("a", { href }, { priority: 5 });
	writer.setCustomProperty("link", true, linkElement);
	return linkElement;
}
/**
* Returns a safe URL based on a given value.
*
* A URL is considered safe if it is safe for the user (does not contain any malicious code).
*
* If a URL is considered unsafe, a simple `"#"` is returned.
*
* @internal
*/
function ensureSafeUrl(url, allowedProtocols = DEFAULT_LINK_PROTOCOLS) {
	const urlString = String(url);
	const protocolsList = allowedProtocols.join("|");
	return isSafeUrl(urlString, new RegExp(`${SAFE_URL_TEMPLATE.replace("<protocols>", protocolsList)}`, "i")) ? urlString : "#";
}
/**
* Checks whether the given URL is safe for the user (does not contain any malicious code).
*/
function isSafeUrl(url, customRegexp) {
	return !!url.replace(ATTRIBUTE_WHITESPACES, "").match(customRegexp);
}
/**
* Returns the {@link module:link/linkconfig~LinkConfig#decorators `config.link.decorators`} configuration processed
* to respect the locale of the editor, i.e. to display the {@link module:link/linkconfig~LinkDecoratorManualDefinition label}
* in the correct language.
*
* **Note**: Only the few most commonly used labels are translated automatically. Other labels should be manually
* translated in the {@link module:link/linkconfig~LinkConfig#decorators `config.link.decorators`} configuration.
*
* @param t Shorthand for {@link module:utils/locale~Locale#t Locale#t}.
* @param decorators The decorator reference where the label values should be localized.
* @internal
*/
function getLocalizedDecorators(t, decorators) {
	const localizedDecoratorsLabels = {
		"Open in a new tab": t("Open in a new tab"),
		"Downloadable": t("Downloadable")
	};
	decorators.forEach((decorator) => {
		if ("label" in decorator && localizedDecoratorsLabels[decorator.label]) decorator.label = localizedDecoratorsLabels[decorator.label];
		return decorator;
	});
	return decorators;
}
/**
* Converts an object with defined decorators to a normalized array of decorators. The `id` key is added for each decorator and
* is used as the attribute's name in the model.
*
* @internal
*/
function normalizeDecorators(decorators) {
	const retArray = [];
	if (decorators) for (const [key, value] of Object.entries(decorators)) {
		const decorator = Object.assign({}, value, { id: `link${upperFirst(key)}` });
		retArray.push(decorator);
	}
	return retArray;
}
/**
* Returns `true` if the specified `element` can be linked (the element allows the `linkHref` attribute).
*/
function isLinkableElement(element, schema) {
	if (!element) return false;
	return schema.checkAttribute(element.name, "linkHref");
}
/**
* Returns `true` if the specified `value` is an email.
*
* @internal
*/
function isEmail(value) {
	return EMAIL_REG_EXP.test(value);
}
/**
* Adds the protocol prefix to the specified `link` when:
*
* * it does not contain it already, and there is a {@link module:link/linkconfig~LinkConfig#defaultProtocol `defaultProtocol` }
* configuration value provided,
* * or the link is an email address.
*/
function addLinkProtocolIfApplicable(link, defaultProtocol) {
	const protocol = isEmail(link) ? "mailto:" : defaultProtocol;
	const isProtocolNeeded = !!protocol && !linkHasProtocol(link);
	return link && isProtocolNeeded ? protocol + link : link;
}
/**
* Checks if protocol is already included in the link.
*
* @internal
*/
function linkHasProtocol(link) {
	return PROTOCOL_REG_EXP.test(link);
}
/**
* Opens the link in a new browser tab.
*/
function openLink(link) {
	window.open(link, "_blank", "noopener");
}
/**
* Returns a text of a link range.
*
* If the returned value is `undefined`, the range contains elements other than text nodes.
*/
function extractTextFromLinkRange(range) {
	let text = "";
	for (const item of range.getItems()) {
		if (!item.is("$text") && !item.is("$textProxy")) return;
		text += item.data;
	}
	return text;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/utils/conflictingdecorators
*/
/**
* Checks if two decorators conflict with each other.
*
* Decorators conflict when they share the same HTML attribute names (excluding mergeable attributes)
* or style properties.
*
* @internal
* @param a The first decorator.
* @param b The second decorator.
*/
function areDecoratorsConflicting(a, b) {
	if (a.attributes && b.attributes) {
		if (Object.keys(a.attributes).some((key) => !isMergeableAttribute(key) && key in b.attributes)) return true;
	}
	if (a.styles && b.styles) {
		if (Object.keys(a.styles).some((key) => key in b.styles)) return true;
	}
	return false;
	function isMergeableAttribute(key) {
		return key === "class" || key === "style" || key === "rel";
	}
}
/**
* Resolves conflicting manual decorators by automatically disabling decorators that share
* the same HTML attributes with newly enabled decorators.
*
* @internal
* @param options Configuration object.
* @param options.decoratorStates Initial decorator states.
* @param options.allDecorators Collection of all manual decorators.
* @returns Updated decorator states with conflicts resolved.
*/
function resolveConflictingDecorators({ decoratorStates, allDecorators }) {
	const resolved = { ...decoratorStates };
	for (const name in decoratorStates) if (decoratorStates[name] && isNewlyAddedDecorator(name)) {
		const conflicts = getConflictingManualDecorators(name, allDecorators);
		for (const conflict of conflicts) resolved[conflict] = false;
	}
	function isNewlyAddedDecorator(name) {
		return allDecorators.some((item) => item.id === name && !item.value);
	}
	return resolved;
}
/**
* Returns array of decorator names that conflict with the given decorator.
* Decorators conflict when they share the same HTML attribute names or style properties.
*
* @param decoratorId The id/name of the manual decorator to check for conflicts.
* @param manualDecorators Collection of all manual decorators.
* @returns Array of conflicting decorator names.
*/
function getConflictingManualDecorators(decoratorId, manualDecorators) {
	const decorator = manualDecorators.find((item) => item.id === decoratorId);
	/* istanbul ignore next -- @preserve */
	if (!decorator) return [];
	return manualDecorators.filter((otherDecorator) => otherDecorator.id !== decoratorId && areDecoratorsConflicting(decorator, otherDecorator)).map((item) => item.id);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/linkcommand
*/
/**
* The link command. It is used by the {@link module:link/link~Link link feature}.
*/
var LinkCommand = class extends Command {
	/**
	* A collection of {@link module:link/utils/manualdecorator~LinkManualDecorator manual decorators}
	* corresponding to the {@link module:link/linkconfig~LinkConfig#decorators decorator configuration}.
	*
	* You can consider it a model with states of manual decorators added to the currently selected link.
	*/
	manualDecorators = new Collection();
	/**
	* An instance of the helper that ties together all {@link module:link/linkconfig~LinkDecoratorAutomaticDefinition}
	* that are used by the {@glink features/link link} and the {@glink features/images/images-linking linking images} features.
	*/
	automaticDecorators = new AutomaticLinkDecorators();
	/**
	* Synchronizes the state of {@link #manualDecorators} with the currently present elements in the model.
	*/
	restoreManualDecoratorStates() {
		for (const manualDecorator of this.manualDecorators) manualDecorator.value = this._getDecoratorStateFromModel(manualDecorator.id);
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedElement = selection.getSelectedElement() || first(selection.getSelectedBlocks());
		if (isLinkableElement(selectedElement, model.schema)) {
			this.value = selectedElement.getAttribute("linkHref");
			this.isEnabled = model.schema.checkAttribute(selectedElement, "linkHref");
		} else {
			this.value = selection.getAttribute("linkHref");
			this.isEnabled = model.schema.checkAttributeInSelection(selection, "linkHref");
		}
		for (const manualDecorator of this.manualDecorators) manualDecorator.value = this._getDecoratorStateFromModel(manualDecorator.id);
	}
	/**
	* Executes the command.
	*
	* When the selection is non-collapsed, the `linkHref` attribute will be applied to nodes inside the selection, but only to
	* those nodes where the `linkHref` attribute is allowed (disallowed nodes will be omitted).
	*
	* When the selection is collapsed and is not inside the text with the `linkHref` attribute, a
	* new {@link module:engine/model/text~ModelText text node} with the `linkHref` attribute will be inserted in place of the caret, but
	* only if such element is allowed in this place. The `_data` of the inserted text will equal the `href` parameter.
	* The selection will be updated to wrap the just inserted text node.
	*
	* When the selection is collapsed and inside the text with the `linkHref` attribute, the attribute value will be updated.
	*
	* # Decorators and model attribute management
	*
	* There is an optional argument to this command that applies or removes model
	* {@glink framework/architecture/editing-engine#text-attributes text attributes} brought by
	* {@link module:link/utils/manualdecorator~LinkManualDecorator manual link decorators}.
	*
	* Text attribute names in the model correspond to the entries in the {@link module:link/linkconfig~LinkConfig#decorators
	* configuration}.
	* For every decorator configured, a model text attribute exists with the "link" prefix. For example, a `'linkMyDecorator'` attribute
	* corresponds to `'myDecorator'` in the configuration.
	*
	* To learn more about link decorators, check out the {@link module:link/linkconfig~LinkConfig#decorators `config.link.decorators`}
	* documentation.
	*
	* Here is how to manage decorator attributes with the link command:
	*
	* ```ts
	* const linkCommand = editor.commands.get( 'link' );
	*
	* // Adding a new decorator attribute.
	* linkCommand.execute( 'http://example.com', {
	* 	linkIsExternal: true
	* } );
	*
	* // Removing a decorator attribute from the selection.
	* linkCommand.execute( 'http://example.com', {
	* 	linkIsExternal: false
	* } );
	*
	* // Adding multiple decorator attributes at the same time.
	* linkCommand.execute( 'http://example.com', {
	* 	linkIsExternal: true,
	* 	linkIsDownloadable: true,
	* } );
	*
	* // Removing and adding decorator attributes at the same time.
	* linkCommand.execute( 'http://example.com', {
	* 	linkIsExternal: false,
	* 	linkFoo: true,
	* 	linkIsDownloadable: false,
	* } );
	* ```
	*
	* **Note**: If the decorator attribute name is not specified, its state remains untouched.
	*
	* **Note**: {@link module:link/unlinkcommand~UnlinkCommand#execute `UnlinkCommand#execute()`} removes all
	* decorator attributes.
	*
	* An optional parameter called `displayedText` is to add or update text of the link that represents the `href`. For example:
	*
	* ```ts
	* const linkCommand = editor.commands.get( 'link' );
	*
	* // Adding a new link with `displayedText` attribute.
	* linkCommand.execute( 'http://example.com', {}, 'Example' );
	* ```
	*
	* The above code will create an anchor like this:
	*
	* ```html
	* <a href="http://example.com">Example</a>
	* ```
	*
	* @fires execute
	* @param href Link destination.
	* @param manualDecoratorIds The information about manual decorator attributes to be applied or removed upon execution.
	* @param displayedText Text of the link.
	*/
	execute(href, manualDecoratorIds = {}, displayedText) {
		const model = this.editor.model;
		const selection = model.document.selection;
		const resolvedDecoratorsIds = resolveConflictingDecorators({
			allDecorators: Array.from(this.manualDecorators),
			decoratorStates: manualDecoratorIds
		});
		const truthyManualDecorators = [];
		const falsyManualDecorators = [];
		for (const name in resolvedDecoratorsIds) if (resolvedDecoratorsIds[name]) truthyManualDecorators.push(name);
		else falsyManualDecorators.push(name);
		model.change((writer) => {
			const updateLinkAttributes = (itemOrRange) => {
				writer.setAttribute("linkHref", href, itemOrRange);
				truthyManualDecorators.forEach((item) => writer.setAttribute(item, true, itemOrRange));
				falsyManualDecorators.forEach((item) => writer.removeAttribute(item, itemOrRange));
			};
			const updateLinkTextIfNeeded = (range, linkHref) => {
				const linkText = extractTextFromLinkRange(range);
				if (!linkText) return range;
				let newText = displayedText;
				if (!newText) newText = linkHref && linkHref == linkText ? href : linkText;
				if (newText != linkText) {
					const fragment = writer.createDocumentFragment();
					for (const item of range.getItems()) {
						const text = item;
						writer.append(writer.createText(text.data, text.getAttributes()), fragment);
					}
					const fragRange = writer.createRangeIn(fragment);
					const changes = findChanges(linkText, newText);
					let insertsLength = 0;
					for (const { offset, actual, expected } of changes) {
						const updatedOffset = offset + insertsLength;
						const subRange = writer.createRange(fragRange.start.getShiftedBy(updatedOffset), fragRange.start.getShiftedBy(updatedOffset + actual.length));
						const attributes = getLinkPartTextNode(subRange, fragRange).getAttributes();
						const formattingAttributes = Array.from(attributes).filter(([key]) => model.schema.getAttributeProperties(key).isFormatting);
						const newTextNode = writer.createText(expected, formattingAttributes);
						updateLinkAttributes(newTextNode);
						writer.remove(subRange);
						writer.insert(newTextNode, subRange.start);
						insertsLength += expected.length;
					}
					model.insertContent(fragment, range);
					return writer.createRange(range.start, range.start.getShiftedBy(newText.length));
				}
			};
			const collapseSelectionAtLinkEnd = (linkRange) => {
				const { plugins } = this.editor;
				writer.setSelection(linkRange.end);
				if (plugins.has("TwoStepCaretMovement")) plugins.get("TwoStepCaretMovement")._handleForwardMovement();
				else for (const key of [
					"linkHref",
					...truthyManualDecorators,
					...falsyManualDecorators
				]) writer.removeSelectionAttribute(key);
			};
			if (selection.isCollapsed) {
				const position = selection.getFirstPosition();
				if (selection.hasAttribute("linkHref")) {
					const linkHref = selection.getAttribute("linkHref");
					const linkRange = findAttributeRange(position, "linkHref", linkHref, model);
					const newLinkRange = updateLinkTextIfNeeded(linkRange, linkHref);
					updateLinkAttributes(newLinkRange || linkRange);
					if (newLinkRange) collapseSelectionAtLinkEnd(newLinkRange);
				} else if (href !== "") {
					const attributes = toMap(selection.getAttributes());
					attributes.set("linkHref", href);
					truthyManualDecorators.forEach((item) => {
						attributes.set(item, true);
					});
					collapseSelectionAtLinkEnd(model.insertContent(writer.createText(displayedText || href, attributes), position));
				}
			} else {
				const selectionRanges = Array.from(selection.getRanges());
				const ranges = model.schema.getValidRanges(selectionRanges, "linkHref");
				const allowedRanges = [];
				for (const element of selection.getSelectedBlocks()) if (model.schema.checkAttribute(element, "linkHref")) allowedRanges.push(writer.createRangeOn(element));
				const rangesToUpdate = allowedRanges.slice();
				for (const range of ranges) if (this._isRangeToUpdate(range, allowedRanges)) rangesToUpdate.push(range);
				const stickyPseudoRanges = selectionRanges.map((range) => ({
					start: ModelLivePosition.fromPosition(range.start, "toPrevious"),
					end: ModelLivePosition.fromPosition(range.end, "toNext")
				}));
				for (let range of rangesToUpdate) {
					const linkHref = (range.start.textNode || range.start.nodeAfter).getAttribute("linkHref");
					range = updateLinkTextIfNeeded(range, linkHref) || range;
					updateLinkAttributes(range);
				}
				writer.setSelection(stickyPseudoRanges.map((pseudoRange) => {
					const start = pseudoRange.start.toPosition();
					const end = pseudoRange.end.toPosition();
					pseudoRange.start.detach();
					pseudoRange.end.detach();
					return model.createRange(start, end);
				}));
			}
		});
		this.restoreManualDecoratorStates();
	}
	/**
	* Provides information whether a decorator with a given name is present in the currently processed selection.
	*
	* @param decoratorName The name of the manual decorator used in the model
	* @returns The information whether a given decorator is currently present in the selection.
	*/
	_getDecoratorStateFromModel(decoratorName) {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedElement = selection.getSelectedElement();
		if (isLinkableElement(selectedElement, model.schema)) return selectedElement.getAttribute(decoratorName);
		return selection.getAttribute(decoratorName);
	}
	/**
	* Checks whether specified `range` is inside an element that accepts the `linkHref` attribute.
	*
	* @param range A range to check.
	* @param allowedRanges An array of ranges created on elements where the attribute is accepted.
	*/
	_isRangeToUpdate(range, allowedRanges) {
		for (const allowedRange of allowedRanges) if (allowedRange.containsRange(range)) return false;
		return true;
	}
};
/**
* Compares two strings and returns an array of changes needed to transform one into another.
* Uses the diff utility to find the differences and groups them into chunks containing information
* about the offset and actual/expected content.
*
* @param oldText The original text to compare.
* @param newText The new text to compare against.
* @returns Array of change objects containing offset and actual/expected content.
*
* @example
* findChanges( 'hello world', 'hi there' );
*
* Returns:
* [
* 	{
* 		"offset": 1,
* 		"actual": "ello",
* 		"expected": "i"
* 	},
* 	{
* 		"offset": 2,
* 		"actual": "wo",
* 		"expected": "the"
* 	},
* 	{
* 		"offset": 3,
* 		"actual": "ld",
* 		"expected": "e"
* 	}
* ]
*/
function findChanges(oldText, newText) {
	const changes = diff(oldText, newText);
	const counter = {
		equal: 0,
		insert: 0,
		delete: 0
	};
	const result = [];
	let actualSlice = "";
	let expectedSlice = "";
	for (const action of [...changes, null]) {
		if (action == "insert") expectedSlice += newText[counter.equal + counter.insert];
		else if (action == "delete") actualSlice += oldText[counter.equal + counter.delete];
		else if (actualSlice.length || expectedSlice.length) {
			result.push({
				offset: counter.equal,
				actual: actualSlice,
				expected: expectedSlice
			});
			actualSlice = "";
			expectedSlice = "";
		}
		if (action) counter[action]++;
	}
	return result;
}
/**
* Returns text node withing the link range that should be updated.
*
* @param range Partial link range.
* @param linkRange Range of the entire link.
* @returns Text node.
*/
function getLinkPartTextNode(range, linkRange) {
	if (!range.isCollapsed) return first(range.getItems());
	const position = range.start;
	if (position.textNode) return position.textNode;
	if (!position.nodeBefore || position.isEqual(linkRange.start)) return position.nodeAfter;
	else return position.nodeBefore;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/unlinkcommand
*/
/**
* The unlink command. It is used by the {@link module:link/link~Link link plugin}.
*/
var UnlinkCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedElement = selection.getSelectedElement();
		if (isLinkableElement(selectedElement, model.schema)) this.isEnabled = model.schema.checkAttribute(selectedElement, "linkHref");
		else this.isEnabled = model.schema.checkAttributeInSelection(selection, "linkHref");
	}
	/**
	* Executes the command.
	*
	* When the selection is collapsed, it removes the `linkHref` attribute from each node with the same `linkHref` attribute value.
	* When the selection is non-collapsed, it removes the `linkHref` attribute from each node in selected ranges.
	*
	* # Decorators
	*
	* If {@link module:link/linkconfig~LinkConfig#decorators `config.link.decorators`} is specified,
	* all configured decorators are removed together with the `linkHref` attribute.
	*
	* @fires execute
	*/
	execute() {
		const editor = this.editor;
		const model = this.editor.model;
		const selection = model.document.selection;
		const linkCommand = editor.commands.get("link");
		model.change((writer) => {
			const rangesToUnlink = selection.isCollapsed ? [findAttributeRange(selection.getFirstPosition(), "linkHref", selection.getAttribute("linkHref"), model)] : model.schema.getValidRanges(selection.getRanges(), "linkHref");
			for (const range of rangesToUnlink) {
				writer.removeAttribute("linkHref", range);
				if (linkCommand) for (const manualDecorator of linkCommand.manualDecorators) writer.removeAttribute(manualDecorator.id, range);
			}
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/utils/manualdecorator
*/
const LinkManualDecoratorBase = /* #__PURE__ */ ObservableMixin();
/**
* Helper class that stores manual decorators with observable {@link module:link/utils/manualdecorator~LinkManualDecorator#value}
* to support integration with the UI state. An instance of this class is a model with the state of individual manual decorators.
* These decorators are kept as collections in {@link module:link/linkcommand~LinkCommand#manualDecorators}.
*/
var LinkManualDecorator = class extends LinkManualDecoratorBase {
	/**
	* An ID of a manual decorator which is the name of the attribute in the model, for example: 'linkManualDecorator0'.
	*/
	id;
	/**
	* The default value of manual decorator.
	*/
	defaultValue;
	/**
	* The label used in the user interface to toggle the manual decorator.
	*/
	label;
	/**
	* A set of attributes added to downcasted data when the decorator is activated for a specific link.
	* Attributes should be added in a form of attributes defined in {@link module:engine/view/elementdefinition~ViewElementDefinition}.
	*/
	attributes;
	/**
	* A set of classes added to downcasted data when the decorator is activated for a specific link.
	* Classes should be added in a form of classes defined in {@link module:engine/view/elementdefinition~ViewElementDefinition}.
	*/
	classes;
	/**
	* A set of styles added to downcasted data when the decorator is activated for a specific link.
	* Styles should be added in a form of styles defined in {@link module:engine/view/elementdefinition~ViewElementDefinition}.
	*/
	styles;
	/**
	* Creates a new instance of {@link module:link/utils/manualdecorator~LinkManualDecorator}.
	*
	* @param options The configuration object.
	*/
	constructor({ id, label, attributes, classes, styles, defaultValue }) {
		super();
		this.id = id;
		this.set("value", void 0);
		this.defaultValue = defaultValue;
		this.label = label;
		this.attributes = attributes;
		this.classes = classes;
		this.styles = styles;
	}
	/**
	* Returns {@link module:engine/view/matcher~MatcherPattern} with decorator attributes.
	*
	* @internal
	*/
	_createPattern() {
		return {
			attributes: this.attributes,
			classes: this.classes,
			styles: this.styles
		};
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/linkediting
*/
const HIGHLIGHT_CLASS = "ck-link_selected";
const DECORATOR_AUTOMATIC = "automatic";
const DECORATOR_MANUAL = "manual";
const EXTERNAL_LINKS_REGEXP = /^(https?:)?\/\//;
/**
* The link engine feature.
*
* It introduces the `linkHref="url"` attribute in the model which renders to the view as a `<a href="url">` element
* as well as `'link'` and `'unlink'` commands.
*/
var LinkEditing = class extends Plugin {
	/**
	* A list of functions that handles opening links. If any of them returns `true`, the link is considered to be opened.
	*/
	_linkOpeners = [];
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "LinkEditing";
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
		return [
			TwoStepCaretMovement,
			Input,
			ClipboardPipeline
		];
	}
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		editor.config.define("link", {
			allowCreatingEmptyLinks: false,
			addTargetToExternalLinks: false,
			toolbar: [
				"linkPreview",
				"|",
				"editLink",
				"linkProperties",
				"unlink"
			]
		});
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const allowedProtocols = this.editor.config.get("link.allowedProtocols");
		editor.model.schema.extend("$text", { allowAttributes: "linkHref" });
		editor.conversion.for("dataDowncast").attributeToElement({
			model: "linkHref",
			view: createLinkElement
		});
		editor.conversion.for("editingDowncast").attributeToElement({
			model: "linkHref",
			view: (href, conversionApi) => {
				return createLinkElement(ensureSafeUrl(href, allowedProtocols), conversionApi);
			}
		});
		editor.conversion.for("upcast").elementToAttribute({
			view: {
				name: "a",
				attributes: { href: true }
			},
			model: {
				key: "linkHref",
				value: (viewElement) => viewElement.getAttribute("href")
			}
		});
		editor.commands.add("link", new LinkCommand(editor));
		editor.commands.add("unlink", new UnlinkCommand(editor));
		const linkDecorators = getLocalizedDecorators(editor.t, normalizeDecorators(editor.config.get("link.decorators")));
		this._enableAutomaticDecorators(linkDecorators.filter((item) => item.mode === DECORATOR_AUTOMATIC));
		this._enableManualDecorators(linkDecorators.filter((item) => item.mode === DECORATOR_MANUAL));
		editor.plugins.get(TwoStepCaretMovement).registerAttribute("linkHref");
		inlineHighlight(editor, "linkHref", "a", HIGHLIGHT_CLASS);
		this._enableLinkOpen();
		this._enableSelectionAttributesFixer();
		this._enableClipboardIntegration();
		this._enableDecoratorConflictPostfixer();
	}
	/**
	* Registers a function that opens links in a new browser tab.
	*
	* @param linkOpener The function that opens a link in a new browser tab.
	* @internal
	*/
	_registerLinkOpener(linkOpener) {
		this._linkOpeners.push(linkOpener);
	}
	/**
	* Processes an array of configured {@link module:link/linkconfig~LinkDecoratorAutomaticDefinition automatic decorators}
	* and registers a {@link module:engine/conversion/downcastdispatcher~DowncastDispatcher downcast dispatcher}
	* for each one of them. Downcast dispatchers are obtained using the
	* {@link module:link/utils/automaticdecorators~AutomaticLinkDecorators#getDispatcher} method.
	*
	* **Note**: This method also activates the automatic external link decorator if enabled with
	* {@link module:link/linkconfig~LinkConfig#addTargetToExternalLinks `config.link.addTargetToExternalLinks`}.
	*/
	_enableAutomaticDecorators(automaticDecoratorDefinitions) {
		const editor = this.editor;
		const command = editor.commands.get("link");
		const automaticDecorators = command.automaticDecorators;
		if (editor.config.get("link.addTargetToExternalLinks")) automaticDecorators.add({
			id: "linkIsExternal",
			mode: DECORATOR_AUTOMATIC,
			callback: (url) => !!url && EXTERNAL_LINKS_REGEXP.test(url),
			attributes: {
				target: "_blank",
				rel: "noopener noreferrer"
			}
		});
		automaticDecorators.add(automaticDecoratorDefinitions);
		automaticDecorators.setConflictChecker((automaticDecorator, modelItem) => {
			for (const manualDecorator of command.manualDecorators) {
				if (!modelItem.hasAttribute(manualDecorator.id)) continue;
				if (areDecoratorsConflicting(automaticDecorator, manualDecorator)) return true;
			}
		});
		if (automaticDecorators.length) editor.conversion.for("downcast").add(automaticDecorators.getDispatcher());
	}
	/**
	* Processes an array of configured {@link module:link/linkconfig~LinkDecoratorManualDefinition manual decorators},
	* transforms them into {@link module:link/utils/manualdecorator~LinkManualDecorator} instances and stores them in the
	* {@link module:link/linkcommand~LinkCommand#manualDecorators} collection (a model for manual decorators state).
	*
	* Also registers an {@link module:engine/conversion/downcasthelpers~DowncastHelpers#attributeToElement attribute-to-element}
	* converter for each manual decorator and extends the {@link module:engine/model/schema~ModelSchema model's schema}
	* with adequate model attributes.
	*/
	_enableManualDecorators(manualDecoratorDefinitions) {
		if (!manualDecoratorDefinitions.length) return;
		const editor = this.editor;
		const manualDecorators = editor.commands.get("link").manualDecorators;
		manualDecoratorDefinitions.forEach((decoratorDefinition) => {
			editor.model.schema.extend("$text", { allowAttributes: decoratorDefinition.id });
			const decorator = new LinkManualDecorator(decoratorDefinition);
			manualDecorators.add(decorator);
			editor.conversion.for("downcast").add((dispatcher) => {
				const elementCreator = (writer) => {
					const element = writer.createAttributeElement("a", decorator.attributes, { priority: 5 });
					if (decorator.classes) writer.addClass(decorator.classes, element);
					for (const key in decorator.styles) writer.setStyle(key, decorator.styles[key], element);
					writer.setCustomProperty("link", true, element);
					return element;
				};
				const createConverter = (isApplyingConverter) => {
					return (evt, data, conversionApi) => {
						if (!data.item.is("selection") && !conversionApi.schema.isInline(data.item)) return;
						if (!isApplyingConverter && data.attributeOldValue) {
							if (!conversionApi.consumable.test(data.item, evt.name)) return;
							conversionApi.writer.unwrap(conversionApi.mapper.toViewRange(data.range), elementCreator(conversionApi.writer));
						}
						if (isApplyingConverter && data.attributeNewValue) {
							if (!conversionApi.consumable.consume(data.item, evt.name)) return;
							if (data.item.is("selection")) conversionApi.writer.wrap(conversionApi.writer.document.selection.getFirstRange(), elementCreator(conversionApi.writer));
							else conversionApi.writer.wrap(conversionApi.mapper.toViewRange(data.range), elementCreator(conversionApi.writer));
						}
					};
				};
				dispatcher.on(`attribute:${decorator.id}`, createConverter(false), { priority: priorities.high - 1 });
				dispatcher.on(`attribute:${decorator.id}`, createConverter(true), { priority: priorities.high - 2 });
			});
			editor.conversion.for("upcast").elementToAttribute({
				view: {
					name: "a",
					...decorator._createPattern()
				},
				model: { key: decorator.id }
			});
		});
	}
	/**
	* Attaches handlers for {@link module:engine/view/document~ViewDocument#event:enter} and
	* {@link module:engine/view/document~ViewDocument#event:click} to enable link following.
	*/
	_enableLinkOpen() {
		const editor = this.editor;
		const viewDocument = editor.editing.view.document;
		const handleLinkOpening = (url) => {
			if (!this._linkOpeners.some((opener) => opener(url))) openLink(url);
		};
		this.listenTo(viewDocument, "click", (evt, data) => {
			if (!(env.isMac ? data.domEvent.metaKey : data.domEvent.ctrlKey)) return;
			let clickedElement = data.domTarget;
			if (clickedElement.tagName.toLowerCase() != "a") clickedElement = clickedElement.closest("a");
			if (!clickedElement) return;
			const url = clickedElement.getAttribute("href");
			if (!url) return;
			evt.stop();
			data.preventDefault();
			handleLinkOpening(url);
		}, { context: "$capture" });
		this.listenTo(viewDocument, "keydown", (evt, data) => {
			const url = editor.commands.get("link").value;
			if (!(!!url && data.keyCode === keyCodes.enter && data.altKey)) return;
			evt.stop();
			handleLinkOpening(url);
		});
	}
	/**
	* Watches the ModelDocumentSelection attribute changes and removes link decorator attributes when the linkHref attribute is removed.
	*
	* This is to ensure that there is no left-over link decorator attributes on the document selection that is no longer in a link.
	*/
	_enableSelectionAttributesFixer() {
		const model = this.editor.model;
		const selection = model.document.selection;
		this.listenTo(selection, "change:attribute", (evt, { attributeKeys }) => {
			if (!attributeKeys.includes("linkHref") || selection.hasAttribute("linkHref")) return;
			model.change((writer) => {
				removeLinkAttributesFromSelection(writer, getLinkAttributesAllowedOnText(model.schema));
			});
		});
	}
	/**
	* Enables URL fixing on pasting.
	*/
	_enableClipboardIntegration() {
		const editor = this.editor;
		const model = editor.model;
		const defaultProtocol = this.editor.config.get("link.defaultProtocol");
		if (!defaultProtocol) return;
		this.listenTo(editor.plugins.get("ClipboardPipeline"), "contentInsertion", (evt, data) => {
			model.change((writer) => {
				const range = writer.createRangeIn(data.content);
				for (const item of range.getItems()) if (item.hasAttribute("linkHref")) {
					const newLink = addLinkProtocolIfApplicable(item.getAttribute("linkHref"), defaultProtocol);
					writer.setAttribute("linkHref", newLink, item);
				}
			});
		});
	}
	/**
	* Registers a postfixer that resolves conflicting decorator attributes on elements.
	*/
	_enableDecoratorConflictPostfixer() {
		const editor = this.editor;
		const model = editor.model;
		const linkCommand = editor.commands.get("link");
		model.document.registerPostFixer((writer) => {
			let hasChanged = false;
			const changes = model.document.differ.getChanges();
			const elementsToCheck = /* @__PURE__ */ new Set();
			const manualDecoratorAttributeKeys = new Set(linkCommand.manualDecorators.map((decorator) => decorator.id));
			for (const change of changes) {
				if (change.type === "attribute") {
					if (change.attributeKey !== "linkHref" && !manualDecoratorAttributeKeys.has(change.attributeKey)) continue;
					for (const item of change.range.getItems()) if (item.hasAttribute("linkHref")) elementsToCheck.add(item);
				}
				if (change.type === "insert" && change.attributes.has("linkHref") && change.position.nodeAfter) elementsToCheck.add(change.position.nodeAfter);
			}
			for (const item of elementsToCheck) {
				const appliedDecorators = [];
				for (const manualDecorator of linkCommand.manualDecorators) {
					if (!item.hasAttribute(manualDecorator.id)) continue;
					for (let i = appliedDecorators.length - 1; i >= 0; i--) {
						const appliedDecorator = appliedDecorators[i];
						if (areDecoratorsConflicting(appliedDecorator, manualDecorator)) {
							writer.removeAttribute(appliedDecorator.id, item);
							appliedDecorators.splice(i, 1);
							hasChanged = true;
						}
					}
					appliedDecorators.push(manualDecorator);
				}
			}
			return hasChanged;
		});
	}
};
/**
* Make the selection free of link-related model attributes.
* All link-related model attributes start with "link". That includes not only "linkHref"
* but also all decorator attributes (they have dynamic names), or even custom plugins.
*/
function removeLinkAttributesFromSelection(writer, linkAttributes) {
	writer.removeSelectionAttribute("linkHref");
	for (const attribute of linkAttributes) writer.removeSelectionAttribute(attribute);
}
/**
* Returns an array containing names of the attributes allowed on `$text` that describes the link item.
*/
function getLinkAttributesAllowedOnText(schema) {
	return schema.getDefinition("$text").allowAttributes.filter((attribute) => attribute.startsWith("link"));
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/ui/linkpreviewbuttonview
*/
/**
* The link button class. Rendered as an `<a>` tag with link opening in a new tab.
*
* Provides a custom `navigate` cancelable event.
*/
var LinkPreviewButtonView = class extends ButtonView {
	/**
	* @inheritDoc
	*/
	constructor(locale) {
		super(locale);
		const bind = this.bindTemplate;
		this.set({
			href: void 0,
			withText: true
		});
		this.extendTemplate({
			attributes: {
				class: ["ck-link-toolbar__preview"],
				href: bind.to("href"),
				target: "_blank",
				rel: "noopener noreferrer"
			},
			on: { click: bind.to((evt) => {
				if (this.href) {
					const cancel = () => evt.preventDefault();
					this.fire("navigate", this.href, cancel);
				}
			}) }
		});
		this.template.tag = "a";
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/ui/linkformview
*/
/**
* The link form view.
*/
var LinkFormView = class extends View {
	/**
	* Tracks information about DOM focus in the form.
	*/
	focusTracker = new FocusTracker();
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	keystrokes = new KeystrokeHandler();
	/**
	* The Back button view displayed in the header.
	*/
	backButtonView;
	/**
	* The Save button view.
	*/
	saveButtonView;
	/**
	* A button that opens the {@link module:link/ui/linkpropertiesview~LinkPropertiesView} allowing the user to
	* configure manual decorators for the link handled by this form.
	*/
	manualDecoratorsButtonView;
	/**
	* The "Displayed text" input view.
	*/
	displayedTextInputView;
	/**
	* The URL input view.
	*/
	urlInputView;
	/**
	* A collection of child views.
	*/
	children;
	/**
	* A collection of child views in the providers list.
	*/
	providersListChildren;
	/**
	* An array of form validators used by {@link #isValid}.
	*/
	_validators;
	/**
	* A collection of views that can be focused in the form.
	*/
	_focusables = new ViewCollection();
	/**
	* Helps cycling over {@link #_focusables} in the form.
	*/
	_focusCycler;
	/**
	* Creates an instance of the {@link module:link/ui/linkformview~LinkFormView} class.
	*
	* Also see {@link #render}.
	*
	* @param locale The localization services instance.
	* @param validators  Form validators used by {@link #isValid}.
	*/
	constructor(locale, validators) {
		super(locale);
		this._validators = validators;
		this.backButtonView = this._createBackButton();
		this.saveButtonView = this._createSaveButton();
		this.manualDecoratorsButtonView = this._createManualDecoratorsButton();
		this.displayedTextInputView = this._createDisplayedTextInput();
		this.urlInputView = this._createUrlInput();
		this.providersListChildren = this.createCollection();
		this.children = this.createCollection([this._createHeaderView()]);
		this._createFormChildren();
		this.listenTo(this.providersListChildren, "add", () => {
			this.stopListening(this.providersListChildren, "add");
			this.children.add(this._createProvidersListView());
		});
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
			tag: "form",
			attributes: {
				class: [
					"ck",
					"ck-form",
					"ck-link-form",
					"ck-responsive-form"
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
		submitHandler({ view: this });
		[
			this.urlInputView,
			this.manualDecoratorsButtonView,
			this.saveButtonView,
			...this.providersListChildren,
			this.backButtonView,
			this.displayedTextInputView
		].forEach((v) => {
			this._focusables.add(v);
			this.focusTracker.add(v.element);
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
	* Validates the form and returns `false` when some fields are invalid.
	*/
	isValid() {
		this.resetFormStatus();
		for (const validator of this._validators) {
			const errorText = validator(this);
			if (errorText) {
				this.urlInputView.errorText = errorText;
				return false;
			}
		}
		return true;
	}
	/**
	* Cleans up the supplementary error and information text of the {@link #urlInputView}
	* bringing them back to the state when the form has been displayed for the first time.
	*
	* See {@link #isValid}.
	*/
	resetFormStatus() {
		this.urlInputView.errorText = null;
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
	* Creates a save button view that inserts the link.
	*/
	_createSaveButton() {
		const t = this.locale.t;
		const saveButton = new ButtonView(this.locale);
		saveButton.set({
			label: t("Insert"),
			tooltip: false,
			withText: true,
			type: "submit",
			class: "ck-button-action ck-button-bold"
		});
		return saveButton;
	}
	/**
	* Creates a button that opens the link properties view.
	*/
	_createManualDecoratorsButton() {
		const t = this.locale.t;
		const button = new ButtonView(this.locale);
		button.set({
			label: t("Link properties"),
			icon: IconSettings,
			tooltip: true,
			isVisible: false
		});
		button.delegate("execute").to(this, "showDecorators");
		return button;
	}
	/**
	* Creates a header view for the form.
	*/
	_createHeaderView() {
		const t = this.locale.t;
		const header = new FormHeaderView(this.locale, { label: t("Link") });
		header.children.add(this.backButtonView, 0);
		return header;
	}
	/**
	* Creates a view for the providers list.
	*/
	_createProvidersListView() {
		const providersListView = new ListView(this.locale);
		providersListView.extendTemplate({ attributes: { class: ["ck-link-form__providers-list"] } });
		providersListView.items.bindTo(this.providersListChildren).using((def) => {
			const listItemView = new ListItemView(this.locale);
			listItemView.children.add(def);
			return listItemView;
		});
		return providersListView;
	}
	/**
	* Creates a labeled input view for the "Displayed text" field.
	*/
	_createDisplayedTextInput() {
		const t = this.locale.t;
		const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);
		labeledInput.label = t("Displayed text");
		labeledInput.class = "ck-labeled-field-view_full-width";
		return labeledInput;
	}
	/**
	* Creates a labeled input view for the URL field.
	*
	* @returns Labeled field view instance.
	*/
	_createUrlInput() {
		const t = this.locale.t;
		const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);
		labeledInput.fieldView.inputMode = "url";
		labeledInput.label = t("Link URL");
		labeledInput.class = "ck-labeled-field-view_full-width";
		return labeledInput;
	}
	/**
	* Populates the {@link #children} collection of the form.
	*/
	_createFormChildren() {
		this.children.add(new FormRowView(this.locale, {
			children: [this.displayedTextInputView],
			class: ["ck-form__row_large-top-padding"]
		}));
		this.children.add(new FormRowView(this.locale, {
			children: [
				this.urlInputView,
				this.manualDecoratorsButtonView,
				this.saveButtonView
			],
			class: [
				"ck-form__row_with-submit",
				"ck-form__row_large-top-padding",
				"ck-form__row_large-bottom-padding"
			]
		}));
	}
	/**
	* The native DOM `value` of the {@link #urlInputView} element.
	*
	* **Note**: Do not confuse it with the {@link module:ui/inputtext/inputtextview~InputTextView#value}
	* which works one way only and may not represent the actual state of the component in the DOM.
	*/
	get url() {
		const { element } = this.urlInputView.fieldView;
		if (!element) return null;
		return element.value.trim();
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/ui/linkprovideritemsview
*/
/**
* The link provider items view.
*/
var LinkProviderItemsView = class extends View {
	/**
	* Tracks information about DOM focus in the form.
	*/
	focusTracker = new FocusTracker();
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	keystrokes = new KeystrokeHandler();
	/**
	* The Back button view displayed in the header.
	*/
	backButtonView;
	/**
	* The List view of links buttons.
	*/
	listView;
	/**
	* The collection of child views, which is bind with the `listView`.
	*/
	listChildren;
	/**
	* The view displayed when the list is empty.
	*/
	emptyListInformation;
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
	* Creates an instance of the {@link module:link/ui/linkprovideritemsview~LinkProviderItemsView} class.
	*
	* Also see {@link #render}.
	*
	* @param locale The localization services instance.
	*/
	constructor(locale) {
		super(locale);
		this.listChildren = this.createCollection();
		this.backButtonView = this._createBackButton();
		this.listView = this._createListView();
		this.emptyListInformation = this._createEmptyLinksListItemView();
		this.children = this.createCollection([this._createHeaderView(), this.emptyListInformation]);
		this.set("title", "");
		this.set("emptyListPlaceholder", "");
		this.set("hasItems", false);
		this.listenTo(this.listChildren, "change", () => {
			this.hasItems = this.listChildren.length > 0;
		});
		this.on("change:hasItems", (evt, propName, hasItems) => {
			if (hasItems) {
				this.children.remove(this.emptyListInformation);
				this.children.add(this.listView);
			} else {
				this.children.remove(this.listView);
				this.children.add(this.emptyListInformation);
			}
		});
		this.keystrokes.set("Esc", (data, cancel) => {
			this.fire("cancel");
			cancel();
		});
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
				class: ["ck", "ck-link-providers"],
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
		[this.listView, this.backButtonView].forEach((v) => {
			this._focusables.add(v);
			this.focusTracker.add(v.element);
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
	* Creates a view for the list at the bottom.
	*/
	_createListView() {
		const listView = new ListView(this.locale);
		listView.extendTemplate({ attributes: { class: ["ck-link-providers__list"] } });
		listView.items.bindTo(this.listChildren).using((button) => {
			const listItemView = new ListItemView(this.locale);
			listItemView.children.add(button);
			return listItemView;
		});
		return listView;
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
		const header = new FormHeaderView(this.locale);
		header.bind("label").to(this, "title");
		header.children.add(this.backButtonView, 0);
		return header;
	}
	/**
	* Creates an info view for an empty list.
	*/
	_createEmptyLinksListItemView() {
		const view = new View(this.locale);
		view.setTemplate({
			tag: "p",
			attributes: { class: ["ck", "ck-link__empty-list-info"] },
			children: [{ text: this.bindTemplate.to("emptyListPlaceholder") }]
		});
		return view;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/ui/linkpropertiesview
*/
/**
* The link properties view controller class.
*
* See {@link module:link/ui/linkpropertiesview~LinkPropertiesView}.
*/
var LinkPropertiesView = class extends View {
	/**
	* Tracks information about DOM focus in the form.
	*/
	focusTracker = new FocusTracker();
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	keystrokes = new KeystrokeHandler();
	/**
	* The Back button view displayed in the header.
	*/
	backButtonView;
	/**
	* A collection of child views.
	*/
	children;
	/**
	* A collection of {@link module:ui/button/switchbuttonview~SwitchButtonView},
	* which corresponds to {@link module:link/linkcommand~LinkCommand#manualDecorators manual decorators}
	* configured in the editor.
	*/
	listChildren;
	/**
	* A collection of views that can be focused in the form.
	*/
	_focusables = new ViewCollection();
	/**
	* Helps cycling over {@link #_focusables} in the form.
	*/
	_focusCycler;
	/**
	* Creates an instance of the {@link module:link/ui/linkpropertiesview~LinkPropertiesView} class.
	*
	* Also see {@link #render}.
	*
	* @param locale The localization services instance.
	*/
	constructor(locale) {
		super(locale);
		this.backButtonView = this._createBackButton();
		this.listChildren = this.createCollection();
		this.children = this.createCollection([this._createHeaderView(), this._createListView()]);
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
				class: ["ck", "ck-link-properties"],
				tabindex: "-1"
			},
			children: this.children
		});
		this.keystrokes.set("Esc", (data, cancel) => {
			this.fire("back");
			cancel();
		});
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		[...this.listChildren, this.backButtonView].forEach((v) => {
			this._focusables.add(v);
			this.focusTracker.add(v.element);
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
	* Creates a back button view.
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
		backButton.delegate("execute").to(this, "back");
		return backButton;
	}
	/**
	* Creates a header view for the form.
	*/
	_createHeaderView() {
		const t = this.locale.t;
		const header = new FormHeaderView(this.locale, { label: t("Link properties") });
		header.children.add(this.backButtonView, 0);
		return header;
	}
	/**
	* Creates a form view that displays the {@link #listChildren} collection.
	*/
	_createListView() {
		const listView = new ListView(this.locale);
		listView.extendTemplate({ attributes: { class: ["ck-link__list"] } });
		listView.items.bindTo(this.listChildren).using((item) => {
			const listItemView = new ListItemView(this.locale);
			listItemView.children.add(item);
			return listItemView;
		});
		return listView;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/ui/linkbuttonview
*/
/**
* Represents a view for a dropdown menu button.
*/
var LinkButtonView = class extends ButtonView {
	/**
	* An icon that displays an arrow to indicate a direction of the menu.
	*/
	arrowView;
	/**
	* Creates an instance of the dropdown menu button view.
	*
	* @param locale The localization services instance.
	*/
	constructor(locale) {
		super(locale);
		this.set({ withText: true });
		this.arrowView = this._createArrowView();
		this.extendTemplate({ attributes: { class: ["ck-link__button"] } });
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		this.children.add(this.arrowView);
	}
	/**
	* Creates the arrow view instance.
	*
	* @private
	*/
	_createArrowView() {
		const arrowView = new IconView();
		arrowView.content = IconNextArrow;
		return arrowView;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/linkui
*/
const VISUAL_SELECTION_MARKER_NAME = "link-ui";
/**
* The link UI plugin. It introduces the `'link'` and `'unlink'` buttons and support for the <kbd>Ctrl+K</kbd> keystroke.
*
* It uses the
* {@link module:ui/panel/balloon/contextualballoon~ContextualBalloon contextual balloon plugin}.
*/
var LinkUI = class extends Plugin {
	/**
	* The toolbar view displayed inside of the balloon.
	*/
	toolbarView = null;
	/**
	* The form view displayed inside the balloon.
	*/
	formView = null;
	/**
	* The view displaying links list.
	*/
	linkProviderItemsView = null;
	/**
	* The form view displaying properties link settings.
	*/
	propertiesView = null;
	/**
	* The contextual balloon plugin instance.
	*/
	_balloon;
	/**
	* The collection of the link providers.
	*/
	_linksProviders = new Collection();
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [ContextualBalloon, LinkEditing];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "LinkUI";
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
		const t = this.editor.t;
		this.set("selectedLinkableText", void 0);
		editor.editing.view.addObserver(ClickObserver);
		this._balloon = editor.plugins.get(ContextualBalloon);
		this._registerComponents();
		this._registerEditingOpeners();
		this._enableBalloonActivators();
		editor.conversion.for("editingDowncast").markerToHighlight({
			model: VISUAL_SELECTION_MARKER_NAME,
			view: { classes: ["ck-fake-link-selection"] }
		});
		editor.conversion.for("editingDowncast").markerToElement({
			model: VISUAL_SELECTION_MARKER_NAME,
			view: (data, { writer }) => {
				if (!data.markerRange.isCollapsed) return null;
				const markerElement = writer.createUIElement("span");
				writer.addClass(["ck-fake-link-selection", "ck-fake-link-selection_collapsed"], markerElement);
				return markerElement;
			}
		});
		editor.accessibility.addKeystrokeInfos({ keystrokes: [{
			label: t("Create link"),
			keystroke: LINK_KEYSTROKE
		}, {
			label: t("Move out of a link"),
			keystroke: [["arrowleft", "arrowleft"], ["arrowright", "arrowright"]]
		}] });
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		if (this.propertiesView) this.propertiesView.destroy();
		if (this.formView) this.formView.destroy();
		if (this.toolbarView) this.toolbarView.destroy();
		if (this.linkProviderItemsView) this.linkProviderItemsView.destroy();
	}
	/**
	* Registers list of buttons below the link form view that
	* open a list of links provided by the clicked provider.
	*/
	registerLinksListProvider(provider) {
		const insertIndex = this._linksProviders.filter((existing) => (existing.order || 0) <= (provider.order || 0)).length;
		this._linksProviders.add(provider, insertIndex);
	}
	/**
	* Creates views.
	*/
	_createViews() {
		const linkCommand = this.editor.commands.get("link");
		this.toolbarView = this._createToolbarView();
		this.formView = this._createFormView();
		if (linkCommand.manualDecorators.length) this.propertiesView = this._createPropertiesView();
		this._enableUserBalloonInteractions();
	}
	/**
	* Creates the ToolbarView instance.
	*/
	_createToolbarView() {
		const editor = this.editor;
		const toolbarView = new ToolbarView(editor.locale);
		const linkCommand = editor.commands.get("link");
		toolbarView.class = "ck-link-toolbar";
		let toolbarItems = editor.config.get("link.toolbar");
		if (!linkCommand.manualDecorators.length) toolbarItems = toolbarItems.filter((item) => item !== "linkProperties");
		toolbarView.fillFromConfig(toolbarItems, editor.ui.componentFactory);
		toolbarView.keystrokes.set("Esc", (data, cancel) => {
			this._hideUI();
			cancel();
		});
		toolbarView.keystrokes.set(LINK_KEYSTROKE, (data, cancel) => {
			this._addFormView();
			cancel();
		});
		editor.ui.addToolbar(toolbarView, {
			isContextual: true,
			beforeFocus: () => {
				if (this._getSelectedLinkElement() && !this._isToolbarVisible) this._showUI(true);
			},
			afterBlur: () => {
				this._hideUI(false);
			}
		});
		return toolbarView;
	}
	/**
	* Creates the {@link module:link/ui/linkformview~LinkFormView} instance.
	*/
	_createFormView() {
		const editor = this.editor;
		const t = editor.locale.t;
		const linkCommand = editor.commands.get("link");
		const defaultProtocol = editor.config.get("link.defaultProtocol");
		const formView = new (CssTransitionDisablerMixin(LinkFormView))(editor.locale, getFormValidators(editor));
		formView.displayedTextInputView.bind("isEnabled").to(this, "selectedLinkableText", (value) => value !== void 0);
		formView.urlInputView.bind("isEnabled").to(linkCommand, "isEnabled");
		formView.saveButtonView.bind("isEnabled").to(linkCommand, "isEnabled");
		formView.saveButtonView.bind("label").to(linkCommand, "value", (value) => value ? t("Update") : t("Insert"));
		this.listenTo(formView, "submit", () => {
			if (formView.isValid()) {
				const url = formView.urlInputView.fieldView.element.value;
				const parsedUrl = addLinkProtocolIfApplicable(url, defaultProtocol);
				const displayedText = formView.displayedTextInputView.fieldView.element.value;
				editor.execute("link", parsedUrl, this._getDecoratorSwitchesState(), displayedText !== this.selectedLinkableText ? displayedText : void 0);
				this._closeFormView();
			}
		});
		this.listenTo(formView.urlInputView, "change:errorText", () => {
			editor.ui.update();
		});
		this.listenTo(formView, "cancel", () => {
			this._closeFormView();
		});
		formView.keystrokes.set("Esc", (data, cancel) => {
			this._closeFormView();
			cancel();
		});
		formView.providersListChildren.bindTo(this._linksProviders).using((provider) => this._createLinksListProviderButton(provider));
		formView.manualDecoratorsButtonView.isVisible = linkCommand.manualDecorators.length > 0;
		this.listenTo(formView, "showDecorators", () => {
			this._addPropertiesView();
		});
		return formView;
	}
	/**
	* Creates a sorted array of buttons with link names.
	*/
	_createLinkProviderListView(provider) {
		return provider.getListItems().map(({ href, label, icon }) => {
			const buttonView = new ButtonView();
			buttonView.set({
				label,
				icon,
				tooltip: false,
				withText: true
			});
			buttonView.on("execute", () => {
				this.formView.resetFormStatus();
				this.formView.urlInputView.fieldView.value = href;
				this.editor.editing.view.focus();
				this._removeLinksProviderView();
				this.formView.focus();
			});
			return buttonView;
		});
	}
	/**
	* Creates a view for links provider.
	*/
	_createLinkProviderItemsView(provider) {
		const editor = this.editor;
		const t = editor.locale.t;
		const view = new LinkProviderItemsView(editor.locale);
		const { emptyListPlaceholder, label } = provider;
		view.emptyListPlaceholder = emptyListPlaceholder || t("No links available");
		view.title = label;
		this.listenTo(view, "cancel", () => {
			editor.editing.view.focus();
			this._removeLinksProviderView();
			this.formView.focus();
		});
		return view;
	}
	/**
	* Creates the {@link module:link/ui/linkpropertiesview~LinkPropertiesView} instance.
	*/
	_createPropertiesView() {
		const editor = this.editor;
		const linkCommand = this.editor.commands.get("link");
		const view = new (CssTransitionDisablerMixin(LinkPropertiesView))(editor.locale);
		this.listenTo(view, "back", () => {
			if (this._isFormInPanel) {
				this._removePropertiesView();
				this.formView.focus();
			} else {
				editor.editing.view.focus();
				this._removePropertiesView();
			}
		});
		view.listChildren.bindTo(linkCommand.manualDecorators).using((manualDecorator) => {
			const button = new SwitchButtonView(editor.locale);
			button.set({
				label: manualDecorator.label,
				withText: true
			});
			button.bind("isOn").toMany([manualDecorator, linkCommand], "value", (decoratorValue, commandValue) => {
				return commandValue === void 0 && decoratorValue === void 0 ? !!manualDecorator.defaultValue : !!decoratorValue;
			});
			button.on("execute", () => {
				const newValue = !button.isOn;
				if (linkCommand.value !== void 0) editor.execute("link", linkCommand.value, {
					...this._getDecoratorSwitchesState(),
					[manualDecorator.id]: newValue
				});
				else this._togglePendingManualDecorator(manualDecorator, newValue);
			});
			return button;
		});
		return view;
	}
	/**
	* Obtains the state of the manual decorators.
	*/
	_getDecoratorSwitchesState() {
		const linkCommand = this.editor.commands.get("link");
		return Array.from(linkCommand.manualDecorators).reduce((accumulator, manualDecorator) => {
			const value = linkCommand.value === void 0 && manualDecorator.value === void 0 ? manualDecorator.defaultValue : manualDecorator.value;
			return {
				...accumulator,
				[manualDecorator.id]: !!value
			};
		}, {});
	}
	/**
	* Toggles the state of a manual decorator while a new link is being created, that is, before it is
	* inserted into the document. Since there is no link (and no command value) to execute the `'link'`
	* command against yet, the new state is kept on the decorator's own observable
	* {@link module:link/utils/manualdecorator~LinkManualDecorator#value} instead of the model.
	*/
	_togglePendingManualDecorator(manualDecorator, newValue) {
		const linkCommand = this.editor.commands.get("link");
		const allDecorators = Array.from(linkCommand.manualDecorators);
		const decoratorStates = this._getDecoratorSwitchesState();
		const previousDecoratorStates = allDecorators.map((decorator) => ({
			id: decorator.id,
			attributes: decorator.attributes,
			styles: decorator.styles,
			value: decoratorStates[decorator.id]
		}));
		decoratorStates[manualDecorator.id] = newValue;
		const resolvedStates = resolveConflictingDecorators({
			decoratorStates,
			allDecorators: previousDecoratorStates
		});
		for (const decorator of allDecorators) decorator.value = resolvedStates[decorator.id];
	}
	/**
	* Clears the state of all manual decorators that may have been toggled while creating a link that,
	* in the end, was never inserted into the document (for example, the user canceled the form).
	*/
	_resetPendingManualDecoratorsState() {
		const linkCommand = this.editor.commands.get("link");
		for (const manualDecorator of linkCommand.manualDecorators) manualDecorator.value = void 0;
	}
	/**
	* Registers listeners used in editing plugin, used to open links.
	*/
	_registerEditingOpeners() {
		this.editor.plugins.get(LinkEditing)._registerLinkOpener((href) => {
			const match = this._getLinkProviderLinkByHref(href);
			if (!match) return false;
			const { item, provider } = match;
			if (provider.navigate) return provider.navigate(item);
			return false;
		});
	}
	/**
	* Registers components in the ComponentFactory.
	*/
	_registerComponents() {
		const editor = this.editor;
		editor.ui.componentFactory.add("link", () => {
			const button = this._createButton(ButtonView);
			button.set({ tooltip: true });
			return button;
		});
		editor.ui.componentFactory.add("menuBar:link", () => {
			const button = this._createButton(MenuBarMenuListItemButtonView);
			button.set({ role: "menuitemcheckbox" });
			return button;
		});
		editor.ui.componentFactory.add("linkPreview", (locale) => {
			const button = new LinkPreviewButtonView(locale);
			const allowedProtocols = editor.config.get("link.allowedProtocols");
			const linkCommand = editor.commands.get("link");
			const t = locale.t;
			button.bind("isEnabled").to(linkCommand, "value", (href) => !!href);
			button.bind("href").to(linkCommand, "value", (href) => {
				return href && ensureSafeUrl(href, allowedProtocols);
			});
			const setHref = (href) => {
				if (href === "") {
					button.label = t("This link has no URL");
					button.icon = void 0;
					button.tooltip = false;
					return;
				}
				if (!href) {
					button.label = void 0;
					button.icon = void 0;
					button.tooltip = t("Open link in new tab");
					return;
				}
				const selectedLinksProviderLink = this._getLinkProviderLinkByHref(href);
				if (selectedLinksProviderLink) {
					const { label, tooltip, icon } = selectedLinksProviderLink.item;
					button.label = label;
					button.tooltip = tooltip || false;
					button.icon = icon;
				} else {
					button.label = href;
					button.icon = void 0;
					button.tooltip = t("Open link in new tab");
				}
			};
			setHref(linkCommand.value);
			this.listenTo(linkCommand, "change:value", (evt, name, href) => {
				setHref(href);
			});
			this.listenTo(button, "navigate", (evt, href, cancel) => {
				const selectedLinksProviderLink = this._getLinkProviderLinkByHref(href);
				if (!selectedLinksProviderLink) return;
				const { provider, item } = selectedLinksProviderLink;
				const { navigate } = provider;
				if (navigate && navigate(item)) {
					evt.stop();
					cancel();
				}
			});
			return button;
		});
		editor.ui.componentFactory.add("unlink", (locale) => {
			const unlinkCommand = editor.commands.get("unlink");
			const button = new ButtonView(locale);
			const t = locale.t;
			button.set({
				label: t("Unlink"),
				icon: IconUnlink,
				tooltip: true
			});
			button.bind("isEnabled").to(unlinkCommand);
			this.listenTo(button, "execute", () => {
				editor.execute("unlink");
				this._hideUI();
			});
			return button;
		});
		editor.ui.componentFactory.add("editLink", (locale) => {
			const linkCommand = editor.commands.get("link");
			const button = new ButtonView(locale);
			const t = locale.t;
			button.set({
				label: t("Edit link"),
				icon: IconPencil,
				tooltip: true
			});
			button.bind("isEnabled").to(linkCommand);
			this.listenTo(button, "execute", () => {
				this._addFormView();
			});
			return button;
		});
		editor.ui.componentFactory.add("linkProperties", (locale) => {
			const linkCommand = editor.commands.get("link");
			const button = new ButtonView(locale);
			const t = locale.t;
			button.set({
				label: t("Link properties"),
				icon: IconSettings,
				tooltip: true
			});
			button.bind("isEnabled").to(linkCommand, "isEnabled", linkCommand, "value", linkCommand, "manualDecorators", (isEnabled, href, manualDecorators) => isEnabled && href !== void 0 && manualDecorators.length > 0);
			this.listenTo(button, "execute", () => {
				this._addPropertiesView();
			});
			return button;
		});
	}
	/**
	* Creates a links button view.
	*/
	_createLinksListProviderButton(linkProvider) {
		const locale = this.editor.locale;
		const linksButton = new LinkButtonView(locale);
		linksButton.set({ label: linkProvider.label });
		this.listenTo(linksButton, "execute", () => {
			this._showLinksProviderView(linkProvider);
		});
		return linksButton;
	}
	/**
	* Creates a button for link command to use either in toolbar or in menu bar.
	*/
	_createButton(ButtonClass) {
		const editor = this.editor;
		const locale = editor.locale;
		const command = editor.commands.get("link");
		const view = new ButtonClass(editor.locale);
		const t = locale.t;
		view.set({
			label: t("Link"),
			icon: IconLink,
			keystroke: LINK_KEYSTROKE,
			isToggleable: true
		});
		view.bind("isEnabled").to(command, "isEnabled");
		view.bind("isOn").to(command, "value", (value) => !!value);
		this.listenTo(view, "execute", () => {
			editor.editing.view.scrollToTheSelection();
			this._showUI(true);
			if (this._getSelectedLinkElement()) this._addFormView();
		});
		return view;
	}
	/**
	* Attaches actions that control whether the balloon panel containing the
	* {@link #formView} should be displayed.
	*/
	_enableBalloonActivators() {
		const editor = this.editor;
		const viewDocument = editor.editing.view.document;
		this.listenTo(viewDocument, "click", () => {
			if (this._getSelectedLinkElement()) this._showUI();
		});
		editor.keystrokes.set(LINK_KEYSTROKE, (keyEvtData, cancel) => {
			cancel();
			if (editor.commands.get("link").isEnabled) {
				editor.editing.view.scrollToTheSelection();
				this._showUI(true);
			}
		});
	}
	/**
	* Attaches actions that control whether the balloon panel containing the
	* {@link #formView} is visible or not.
	*/
	_enableUserBalloonInteractions() {
		this.editor.keystrokes.set("Tab", (data, cancel) => {
			if (this._isToolbarVisible && !this.toolbarView.focusTracker.isFocused) {
				this.toolbarView.focus();
				cancel();
			}
		}, { priority: "high" });
		this.editor.keystrokes.set("Esc", (data, cancel) => {
			if (this._isUIVisible) {
				this._hideUI();
				cancel();
			}
		});
		clickOutsideHandler({
			emitter: this.formView,
			activator: () => this._isUIInPanel,
			contextElements: () => [this._balloon.view.element],
			callback: () => {
				this._hideUI(false);
			}
		});
	}
	/**
	* Adds the {@link #toolbarView} to the {@link #_balloon}.
	*
	* @internal
	*/
	_addToolbarView() {
		if (!this.toolbarView) this._createViews();
		if (this._isToolbarInPanel) return;
		this._balloon.add({
			view: this.toolbarView,
			position: this._getBalloonPositionData(),
			balloonClassName: "ck-toolbar-container"
		});
	}
	/**
	* Adds the {@link #formView} to the {@link #_balloon}.
	*/
	_addFormView() {
		if (!this.formView) this._createViews();
		if (this._isFormInPanel) return;
		const linkCommand = this.editor.commands.get("link");
		this.formView.disableCssTransitions();
		this.formView.resetFormStatus();
		this.formView.backButtonView.isVisible = linkCommand.isEnabled && linkCommand.value !== void 0;
		this._balloon.add({
			view: this.formView,
			position: this._getBalloonPositionData()
		});
		this.selectedLinkableText = this._getSelectedLinkableText();
		this.formView.displayedTextInputView.fieldView.value = this.selectedLinkableText || "";
		this.formView.urlInputView.fieldView.value = linkCommand.value || "";
		if (this._balloon.visibleView === this.formView) this.formView.urlInputView.fieldView.select();
		this.formView.enableCssTransitions();
	}
	/**
	* Adds the {@link #propertiesView} to the {@link #_balloon}.
	*/
	_addPropertiesView() {
		if (!this.propertiesView) this._createViews();
		if (this._arePropertiesInPanel) return;
		this.propertiesView.disableCssTransitions();
		this._balloon.add({
			view: this.propertiesView,
			position: this._getBalloonPositionData()
		});
		this.propertiesView.enableCssTransitions();
		this.propertiesView.focus();
	}
	/**
	* Shows the view with links provided by the given provider.
	*/
	_showLinksProviderView(provider) {
		if (this.linkProviderItemsView) this._removeLinksProviderView();
		this.linkProviderItemsView = this._createLinkProviderItemsView(provider);
		this._addLinkProviderItemsView(provider);
	}
	/**
	* Adds the {@link #linkProviderItemsView} to the {@link #_balloon}.
	*/
	_addLinkProviderItemsView(provider) {
		this.linkProviderItemsView.listChildren.clear();
		this.linkProviderItemsView.listChildren.addMany(this._createLinkProviderListView(provider));
		this._balloon.add({
			view: this.linkProviderItemsView,
			position: this._getBalloonPositionData()
		});
		this.linkProviderItemsView.focus();
	}
	/**
	* Closes the form view. Decides whether the balloon should be hidden completely or if the action view should be shown. This is
	* decided upon the link command value (which has a value if the document selection is in the link).
	*/
	_closeFormView() {
		const linkCommand = this.editor.commands.get("link");
		this.selectedLinkableText = void 0;
		if (linkCommand.value !== void 0) this._removeFormView();
		else this._hideUI();
	}
	/**
	* Removes the {@link #propertiesView} from the {@link #_balloon}.
	*/
	_removePropertiesView() {
		if (this._arePropertiesInPanel) this._balloon.remove(this.propertiesView);
	}
	/**
	* Removes the {@link #linkProviderItemsView} from the {@link #_balloon}.
	*/
	_removeLinksProviderView() {
		if (this._isLinksListInPanel) this._balloon.remove(this.linkProviderItemsView);
	}
	/**
	* Removes the {@link #formView} from the {@link #_balloon}.
	*/
	_removeFormView(updateFocus = true) {
		if (this._isFormInPanel) {
			const linkCommand = this.editor.commands.get("link");
			this.formView.saveButtonView.focus();
			this.formView.displayedTextInputView.fieldView.reset();
			this.formView.urlInputView.fieldView.reset();
			if (linkCommand.value === void 0) this._resetPendingManualDecoratorsState();
			this._balloon.remove(this.formView);
			if (updateFocus) this.editor.editing.view.focus();
			this._hideFakeVisualSelection();
		}
	}
	/**
	* Shows the correct UI type. It is either {@link #formView} or {@link #toolbarView}.
	*
	* @internal
	*/
	_showUI(forceVisible = false) {
		if (!this.formView) this._createViews();
		if (!this._getSelectedLinkElement()) {
			this._showFakeVisualSelection();
			this._addToolbarView();
			if (forceVisible) this._balloon.showStack("main");
			this._addFormView();
		} else {
			if (this._isToolbarVisible) this._addFormView();
			else this._addToolbarView();
			if (forceVisible) this._balloon.showStack("main");
		}
		this._startUpdatingUI();
	}
	/**
	* Removes the {@link #formView} from the {@link #_balloon}.
	*
	* See {@link #_addFormView}, {@link #_addToolbarView}.
	*/
	_hideUI(updateFocus = true) {
		const editor = this.editor;
		if (!this._isUIInPanel) return;
		this.stopListening(editor.ui, "update");
		this.stopListening(this._balloon, "change:visibleView");
		if (updateFocus) editor.editing.view.focus();
		this._removeLinksProviderView();
		this._removePropertiesView();
		this._removeFormView(updateFocus);
		if (this._isToolbarInPanel) this._balloon.remove(this.toolbarView);
		this._hideFakeVisualSelection();
	}
	/**
	* Makes the UI react to the {@link module:ui/editorui/editorui~EditorUI#event:update} event to
	* reposition itself when the editor UI should be refreshed.
	*
	* See: {@link #_hideUI} to learn when the UI stops reacting to the `update` event.
	*/
	_startUpdatingUI() {
		const editor = this.editor;
		const viewDocument = editor.editing.view.document;
		let prevSelectedLink = this._getSelectedLinkElement();
		let prevSelectionParent = getSelectionParent();
		const update = () => {
			const selectedLink = this._getSelectedLinkElement();
			const selectionParent = getSelectionParent();
			if (prevSelectedLink && !selectedLink || !prevSelectedLink && selectionParent !== prevSelectionParent) this._hideUI();
			else if (this._isUIVisible) this._balloon.updatePosition(this._getBalloonPositionData());
			prevSelectedLink = selectedLink;
			prevSelectionParent = selectionParent;
		};
		function getSelectionParent() {
			return viewDocument.selection.focus.getAncestors().reverse().find((node) => node.is("element"));
		}
		this.listenTo(editor.ui, "update", update);
		this.listenTo(this._balloon, "change:visibleView", update);
	}
	/**
	* Returns `true` when {@link #propertiesView} is in the {@link #_balloon}.
	*/
	get _arePropertiesInPanel() {
		return !!this.propertiesView && this._balloon.hasView(this.propertiesView);
	}
	/**
	* Returns `true` when {@link #linkProviderItemsView} is in the {@link #_balloon}.
	*/
	get _isLinksListInPanel() {
		return !!this.linkProviderItemsView && this._balloon.hasView(this.linkProviderItemsView);
	}
	/**
	* Returns `true` when {@link #formView} is in the {@link #_balloon}.
	*/
	get _isFormInPanel() {
		return !!this.formView && this._balloon.hasView(this.formView);
	}
	/**
	* Returns `true` when {@link #toolbarView} is in the {@link #_balloon}.
	*/
	get _isToolbarInPanel() {
		return !!this.toolbarView && this._balloon.hasView(this.toolbarView);
	}
	/**
	* Returns `true` when {@link #propertiesView} is in the {@link #_balloon} and it is
	* currently visible.
	*/
	get _isPropertiesVisible() {
		return !!this.propertiesView && this._balloon.visibleView === this.propertiesView;
	}
	/**
	* Returns `true` when {@link #formView} is in the {@link #_balloon} and it is
	* currently visible.
	*/
	get _isFormVisible() {
		return !!this.formView && this._balloon.visibleView == this.formView;
	}
	/**
	* Returns `true` when {@link #toolbarView} is in the {@link #_balloon} and it is
	* currently visible.
	*/
	get _isToolbarVisible() {
		return !!this.toolbarView && this._balloon.visibleView === this.toolbarView;
	}
	/**
	* Returns `true` when {@link #propertiesView}, {@link #toolbarView}, {@link #linkProviderItemsView}
	* or {@link #formView} is in the {@link #_balloon}.
	*/
	get _isUIInPanel() {
		return this._arePropertiesInPanel || this._isLinksListInPanel || this._isFormInPanel || this._isToolbarInPanel;
	}
	/**
	* Returns `true` when {@link #propertiesView}, {@link #linkProviderItemsView}, {@link #toolbarView}
	* or {@link #formView} is in the {@link #_balloon} and it is currently visible.
	*/
	get _isUIVisible() {
		return this._isPropertiesVisible || this._isLinksListInPanel || this._isFormVisible || this._isToolbarVisible;
	}
	/**
	* Returns positioning options for the {@link #_balloon}. They control the way the balloon is attached
	* to the target element or selection.
	*
	* If the selection is collapsed and inside a link element, the panel will be attached to the
	* entire link element. Otherwise, it will be attached to the selection.
	*/
	_getBalloonPositionData() {
		const view = this.editor.editing.view;
		const viewDocument = view.document;
		if (this.editor.model.markers.has(VISUAL_SELECTION_MARKER_NAME)) {
			const markerViewElements = this.editor.editing.mapper.markerNameToElements(VISUAL_SELECTION_MARKER_NAME);
			if (markerViewElements) {
				const markerViewElementsArray = Array.from(markerViewElements);
				const newRange = view.createRange(view.createPositionBefore(markerViewElementsArray[0]), view.createPositionAfter(markerViewElementsArray[markerViewElementsArray.length - 1]));
				return { target: view.domConverter.viewRangeToDom(newRange) };
			}
		}
		return { target: () => {
			const targetLink = this._getSelectedLinkElement();
			return targetLink ? view.domConverter.mapViewToDom(targetLink) : view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());
		} };
	}
	/**
	* Returns the link {@link module:engine/view/attributeelement~ViewAttributeElement} under
	* the {@link module:engine/view/document~ViewDocument editing view's} selection or `null`
	* if there is none.
	*
	* **Note**: For a non–collapsed selection, the link element is returned when **fully**
	* selected and the **only** element within the selection boundaries, or when
	* a linked widget is selected.
	*/
	_getSelectedLinkElement() {
		const view = this.editor.editing.view;
		const selection = view.document.selection;
		const selectedElement = selection.getSelectedElement();
		if (selection.isCollapsed || selectedElement && isWidget(selectedElement)) return findLinkElementAncestor(selection.getFirstPosition());
		else {
			const range = selection.getFirstRange().getTrimmed();
			const startLink = findLinkElementAncestor(range.start);
			const endLink = findLinkElementAncestor(range.end);
			if (!startLink || startLink != endLink) return null;
			if (view.createRangeIn(startLink).getTrimmed().isEqual(range)) return startLink;
			else return null;
		}
	}
	/**
	* Returns selected link text content.
	* If link is not selected it returns the selected text.
	* If selection or link includes non text node (inline object or block) then returns undefined.
	*/
	_getSelectedLinkableText() {
		const model = this.editor.model;
		const editing = this.editor.editing;
		const selectedLink = this._getSelectedLinkElement();
		if (!selectedLink) return extractTextFromLinkRange(model.document.selection.getFirstRange());
		const viewLinkRange = editing.view.createRangeOn(selectedLink);
		const linkRange = editing.mapper.toModelRange(viewLinkRange);
		return extractTextFromLinkRange(linkRange);
	}
	/**
	* Returns a provider by its URL.
	*
	* @param href URL of the link.
	* @returns Link provider and item or `null` if not found.
	*/
	_getLinkProviderLinkByHref(href) {
		if (!href) return null;
		for (const provider of this._linksProviders) {
			const item = provider.getItem ? provider.getItem(href) : provider.getListItems().find((item) => item.href === href);
			if (item) return {
				provider,
				item
			};
		}
		return null;
	}
	/**
	* Displays a fake visual selection when the contextual balloon is displayed.
	*
	* This adds a 'link-ui' marker into the document that is rendered as a highlight on selected text fragment.
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
	* Hides the fake visual selection created in {@link #_showFakeVisualSelection}.
	*/
	_hideFakeVisualSelection() {
		const model = this.editor.model;
		if (model.markers.has(VISUAL_SELECTION_MARKER_NAME)) model.change((writer) => {
			writer.removeMarker(VISUAL_SELECTION_MARKER_NAME);
		});
	}
};
/**
* Returns a link element if there's one among the ancestors of the provided `Position`.
*
* @param View position to analyze.
* @returns Link element at the position or null.
*/
function findLinkElementAncestor(position) {
	return position.getAncestors().find((ancestor) => isLinkElement(ancestor)) || null;
}
/**
* Returns link form validation callbacks.
*
* @param editor Editor instance.
*/
function getFormValidators(editor) {
	const t = editor.t;
	const allowCreatingEmptyLinks = editor.config.get("link.allowCreatingEmptyLinks");
	return [(form) => {
		if (!allowCreatingEmptyLinks && !form.url.length) return t("Link URL must not be empty.");
	}];
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/autolink
*/
const MIN_LINK_LENGTH_WITH_SPACE_AT_END = 4;
const URL_REG_EXP = /* @__PURE__ */ new RegExp("(^|\\s)(((?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(((?!www\\.)|(www\\.))(?![-_])(?:[-_a-z0-9\\u00a1-\\uffff]{1,63}\\.)+(?:[a-z\\u00a1-\\uffff]{2,63}))|localhost)(?::\\d{2,5})?(?:[/?#]\\S*)?)|((www.|(\\S+@))((?![-_])(?:[-_a-z0-9\\u00a1-\\uffff]{1,63}\\.))+(?:[a-z\\u00a1-\\uffff]{2,63})))$", "i");
const URL_GROUP_IN_MATCH = 2;
/**
* The autolink plugin.
*/
var AutoLink = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [Delete, LinkEditing];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "AutoLink";
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
		const selection = this.editor.model.document.selection;
		selection.on("change:range", () => {
			this.isEnabled = !selection.anchor.parent.is("element", "codeBlock");
		});
		this._enableTypingHandling();
	}
	/**
	* @inheritDoc
	*/
	afterInit() {
		this._enableEnterHandling();
		this._enableShiftEnterHandling();
		this._enablePasteLinking();
	}
	/**
	* For given position, returns a range that includes the whole link that contains the position.
	*
	* If position is not inside a link, returns `null`.
	*/
	_expandLinkRange(model, position) {
		if (position.textNode && position.textNode.hasAttribute("linkHref")) return findAttributeRange(position, "linkHref", position.textNode.getAttribute("linkHref"), model);
		else return null;
	}
	/**
	* Extends the document selection to includes all links that intersects with given `selectedRange`.
	*/
	_selectEntireLinks(writer, selectedRange) {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selStart = selection.getFirstPosition();
		const selEnd = selection.getLastPosition();
		let updatedSelection = selectedRange.getJoined(this._expandLinkRange(model, selStart) || selectedRange);
		if (updatedSelection) updatedSelection = updatedSelection.getJoined(this._expandLinkRange(model, selEnd) || selectedRange);
		if (updatedSelection && (updatedSelection.start.isBefore(selStart) || updatedSelection.end.isAfter(selEnd))) writer.setSelection(updatedSelection);
	}
	/**
	* Enables autolinking on pasting a URL when some content is selected.
	*/
	_enablePasteLinking() {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;
		const clipboardPipeline = editor.plugins.get("ClipboardPipeline");
		const linkCommand = editor.commands.get("link");
		clipboardPipeline.on("inputTransformation", (evt, data) => {
			if (!this.isEnabled || !linkCommand.isEnabled || selection.isCollapsed || data.method !== "paste") return;
			if (selection.rangeCount > 1) return;
			const selectedRange = selection.getFirstRange();
			const newLink = data.dataTransfer.getData("text/plain");
			if (!newLink) return;
			const matches = newLink.match(URL_REG_EXP);
			if (matches && matches[2] === newLink) {
				model.change((writer) => {
					this._selectEntireLinks(writer, selectedRange);
					linkCommand.execute(newLink);
				});
				evt.stop();
			}
		}, { priority: "high" });
	}
	/**
	* Enables autolinking on typing.
	*/
	_enableTypingHandling() {
		const editor = this.editor;
		const watcher = new TextWatcher(editor.model, (text) => {
			let mappedText = text;
			if (!isSingleSpaceAtTheEnd(mappedText)) return;
			mappedText = mappedText.slice(0, -1);
			if ("!.:,;?".includes(mappedText[mappedText.length - 1])) mappedText = mappedText.slice(0, -1);
			const url = getUrlAtTextEnd(mappedText);
			if (url) return {
				url,
				removedTrailingCharacters: text.length - mappedText.length
			};
		});
		watcher.on("matched:data", (evt, data) => {
			const { batch, range, url, removedTrailingCharacters } = data;
			if (!batch.isTyping) return;
			const linkEnd = range.end.getShiftedBy(-removedTrailingCharacters);
			const linkStart = linkEnd.getShiftedBy(-url.length);
			const linkRange = editor.model.createRange(linkStart, linkEnd);
			this._applyAutoLink(url, linkRange);
		});
		watcher.bind("isEnabled").to(this);
	}
	/**
	* Enables autolinking on the <kbd>Enter</kbd> key.
	*/
	_enableEnterHandling() {
		const editor = this.editor;
		const model = editor.model;
		const enterCommand = editor.commands.get("enter");
		if (!enterCommand) return;
		enterCommand.on("execute", () => {
			const position = model.document.selection.getFirstPosition();
			let rangeToCheck;
			if (position.parent.previousSibling?.is("element")) rangeToCheck = model.createRangeIn(position.parent.previousSibling);
			else rangeToCheck = model.createRange(model.createPositionAt(position.parent, 0), position);
			this._checkAndApplyAutoLinkOnRange(rangeToCheck);
		});
	}
	/**
	* Enables autolinking on the <kbd>Shift</kbd>+<kbd>Enter</kbd> keyboard shortcut.
	*/
	_enableShiftEnterHandling() {
		const editor = this.editor;
		const model = editor.model;
		const shiftEnterCommand = editor.commands.get("shiftEnter");
		if (!shiftEnterCommand) return;
		shiftEnterCommand.on("execute", () => {
			const position = model.document.selection.getFirstPosition();
			const rangeToCheck = model.createRange(model.createPositionAt(position.parent, 0), position.getShiftedBy(-1));
			this._checkAndApplyAutoLinkOnRange(rangeToCheck);
		});
	}
	/**
	* Checks if the passed range contains a linkable text.
	*/
	_checkAndApplyAutoLinkOnRange(rangeToCheck) {
		const model = this.editor.model;
		const { text, range } = getLastTextLine(rangeToCheck, model);
		const url = getUrlAtTextEnd(text);
		if (url) {
			const linkRange = model.createRange(range.end.getShiftedBy(-url.length), range.end);
			this._applyAutoLink(url, linkRange);
		}
	}
	/**
	* Applies a link on a given range if the link should be applied.
	*
	* @param url The URL to link.
	* @param range The text range to apply the link attribute to.
	*/
	_applyAutoLink(url, range) {
		const model = this.editor.model;
		const defaultProtocol = this.editor.config.get("link.defaultProtocol");
		const fullUrl = addLinkProtocolIfApplicable(url, defaultProtocol);
		if (!this.isEnabled || !isLinkAllowedOnRange(range, model) || !linkHasProtocol(fullUrl) || linkIsAlreadySet(range)) return;
		this._persistAutoLink(fullUrl, range);
	}
	/**
	* Enqueues autolink changes in the model.
	*
	* @param url The URL to link.
	* @param range The text range to apply the link attribute to.
	*/
	_persistAutoLink(url, range) {
		const model = this.editor.model;
		const deletePlugin = this.editor.plugins.get("Delete");
		model.enqueueChange((writer) => {
			writer.setAttribute("linkHref", url, range);
			model.enqueueChange(() => {
				deletePlugin.requestUndoOnBackspace();
			});
		});
	}
};
function isSingleSpaceAtTheEnd(text) {
	return text.length > MIN_LINK_LENGTH_WITH_SPACE_AT_END && text[text.length - 1] === " " && text[text.length - 2] !== " ";
}
function getUrlAtTextEnd(text) {
	const match = URL_REG_EXP.exec(text);
	return match ? match[URL_GROUP_IN_MATCH] : null;
}
function isLinkAllowedOnRange(range, model) {
	return model.schema.checkAttributeInSelection(model.createSelection(range), "linkHref");
}
function linkIsAlreadySet(range) {
	const item = range.start.nodeAfter;
	return !!item && item.hasAttribute("linkHref");
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/link
*/
/**
* The link plugin.
*
* This is a "glue" plugin that loads the {@link module:link/linkediting~LinkEditing link editing feature}
* and {@link module:link/linkui~LinkUI link UI feature}.
*/
var Link = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [
			LinkEditing,
			LinkUI,
			AutoLink
		];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "Link";
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
/**
* @module link/linkimageediting
*/
/**
* The link image engine feature.
*
* It accepts the `linkHref="url"` attribute in the model for the {@link module:image/image~Image `<imageBlock>`} element
* which allows linking images.
*/
var LinkImageEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [
			ImageEditing,
			ImageUtils,
			LinkEditing
		];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "LinkImageEditing";
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
	afterInit() {
		const editor = this.editor;
		const schema = editor.model.schema;
		if (editor.plugins.has("ImageBlockEditing")) schema.extend("imageBlock", { allowAttributes: ["linkHref"] });
		editor.conversion.for("upcast").add(upcastLink(editor));
		editor.conversion.for("downcast").add(downcastImageLink(editor));
		this._enableAutomaticDecorators();
		this._enableManualDecorators();
	}
	/**
	* Processes {@link module:link/linkconfig~LinkDecoratorAutomaticDefinition automatic decorators} definitions and
	* attaches proper converters that will work when linking an image.`
	*/
	_enableAutomaticDecorators() {
		const editor = this.editor;
		const automaticDecorators = editor.commands.get("link").automaticDecorators;
		if (automaticDecorators.length) editor.conversion.for("downcast").add(automaticDecorators.getDispatcherForLinkedImage());
	}
	/**
	* Processes transformed {@link module:link/utils/manualdecorator~LinkManualDecorator} instances and attaches proper converters
	* that will work when linking an image.
	*/
	_enableManualDecorators() {
		const editor = this.editor;
		const command = editor.commands.get("link");
		for (const decorator of command.manualDecorators) {
			if (editor.plugins.has("ImageBlockEditing")) editor.model.schema.extend("imageBlock", { allowAttributes: decorator.id });
			if (editor.plugins.has("ImageInlineEditing")) editor.model.schema.extend("imageInline", { allowAttributes: decorator.id });
			editor.conversion.for("downcast").add(downcastImageLinkManualDecorator(decorator));
			editor.conversion.for("upcast").add(upcastImageLinkManualDecorator(editor, decorator));
		}
	}
};
/**
* Returns a converter for linked block images that consumes the "href" attribute
* if a link contains an image.
*
* @param editor The editor instance.
*/
function upcastLink(editor) {
	const isImageInlinePluginLoaded = editor.plugins.has("ImageInlineEditing");
	const imageUtils = editor.plugins.get("ImageUtils");
	return (dispatcher) => {
		dispatcher.on("element:a", (evt, data, conversionApi) => {
			const viewLink = data.viewItem;
			const imageInLink = imageUtils.findViewImgElement(viewLink);
			if (!imageInLink) return;
			const blockImageView = imageInLink.findAncestor((element) => imageUtils.isBlockImageView(element));
			if (isImageInlinePluginLoaded && !blockImageView) return;
			const consumableAttributes = { attributes: ["href"] };
			if (!conversionApi.consumable.test(viewLink, consumableAttributes)) return;
			const linkHref = viewLink.getAttribute("href");
			const modelElement = data.modelCursor.parent;
			if (modelElement.is("element", "imageBlock")) {
				conversionApi.writer.setAttribute("linkHref", linkHref, modelElement);
				conversionApi.consumable.consume(viewLink, consumableAttributes);
			}
		}, { priority: "high" });
	};
}
/**
* Creates a converter that adds `<a>` to linked block image view elements.
*/
function downcastImageLink(editor) {
	const imageUtils = editor.plugins.get("ImageUtils");
	return (dispatcher) => {
		dispatcher.on("attribute:linkHref:imageBlock", (evt, data, conversionApi) => {
			if (!conversionApi.consumable.consume(data.item, evt.name)) return;
			const viewFigure = conversionApi.mapper.toViewElement(data.item);
			const writer = conversionApi.writer;
			const linkInImage = Array.from(viewFigure.getChildren()).find((child) => child.is("element", "a"));
			const viewImage = imageUtils.findViewImgElement(viewFigure);
			const viewImgOrPicture = viewImage.parent.is("element", "picture") ? viewImage.parent : viewImage;
			if (linkInImage) {
				if (data.attributeNewValue) writer.setAttribute("href", data.attributeNewValue, linkInImage);
				else {
					writer.move(writer.createRangeOn(viewImgOrPicture), writer.createPositionAt(viewFigure, 0));
					writer.remove(linkInImage);
				}
			} else {
				const linkElement = writer.createContainerElement("a", { href: data.attributeNewValue });
				writer.insert(writer.createPositionAt(viewFigure, 0), linkElement);
				writer.move(writer.createRangeOn(viewImgOrPicture), writer.createPositionAt(linkElement, 0));
			}
		}, { priority: "high" });
	};
}
/**
* Returns a converter that decorates the `<a>` element when the image is the link label.
*/
function downcastImageLinkManualDecorator(decorator) {
	return (dispatcher) => {
		const createConverter = (isApplyingConverter) => {
			return (evt, data, conversionApi) => {
				const viewFigure = conversionApi.mapper.toViewElement(data.item);
				const linkInImage = Array.from(viewFigure.getChildren()).find((child) => child.is("element", "a"));
				if (!linkInImage) return;
				if (!isApplyingConverter && data.attributeOldValue) {
					for (const [key, val] of toMap(decorator.attributes)) conversionApi.writer.removeAttribute(key, val, linkInImage);
					if (decorator.classes) conversionApi.writer.removeClass(decorator.classes, linkInImage);
					for (const key in decorator.styles) conversionApi.writer.removeStyle(key, linkInImage);
				}
				if (isApplyingConverter && data.attributeNewValue) {
					for (const [key, val] of toMap(decorator.attributes)) conversionApi.writer.setAttribute(key, val, false, linkInImage);
					if (decorator.classes) conversionApi.writer.addClass(decorator.classes, linkInImage);
					for (const key in decorator.styles) conversionApi.writer.setStyle(key, decorator.styles[key], linkInImage);
				}
			};
		};
		dispatcher.on(`attribute:${decorator.id}:imageBlock`, createConverter(false), { priority: priorities.high - 1 });
		dispatcher.on(`attribute:${decorator.id}:imageBlock`, createConverter(true), { priority: priorities.high - 2 });
	};
}
/**
* Returns a converter that checks whether manual decorators should be applied to the link.
*/
function upcastImageLinkManualDecorator(editor, decorator) {
	const isImageInlinePluginLoaded = editor.plugins.has("ImageInlineEditing");
	const imageUtils = editor.plugins.get("ImageUtils");
	return (dispatcher) => {
		dispatcher.on("element:a", (evt, data, conversionApi) => {
			const viewLink = data.viewItem;
			const imageInLink = imageUtils.findViewImgElement(viewLink);
			if (!imageInLink) return;
			const blockImageView = imageInLink.findAncestor((element) => imageUtils.isBlockImageView(element));
			if (isImageInlinePluginLoaded && !blockImageView) return;
			const result = new Matcher(decorator._createPattern()).match(viewLink);
			if (!result) return;
			if (!conversionApi.consumable.test(viewLink, result.match)) return;
			const modelElement = data.modelCursor.parent;
			if (modelElement?.is("element", "imageBlock")) {
				conversionApi.writer.setAttribute(decorator.id, true, modelElement);
				conversionApi.consumable.consume(viewLink, result.match);
			}
		}, { priority: "high" });
	};
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/linkimageui
*/
/**
* The link image UI plugin.
*
* This plugin provides the `'linkImage'` button that can be displayed in the {@link module:image/imagetoolbar~ImageToolbar}.
* It can be used to wrap images in links.
*/
var LinkImageUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [
			LinkEditing,
			LinkUI,
			ImageBlockEditing
		];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "LinkImageUI";
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
		const viewDocument = editor.editing.view.document;
		this.listenTo(viewDocument, "click", (evt, data) => {
			if (this._isSelectedLinkedImage(editor.model.document.selection)) {
				data.preventDefault();
				evt.stop();
			}
		}, { priority: "high" });
		this._createToolbarLinkImageButton();
	}
	/**
	* Creates a `LinkImageUI` button view.
	*
	* Clicking this button shows a {@link module:link/linkui~LinkUI#_balloon} attached to the selection.
	* When an image is already linked, the view shows {@link module:link/linkui~LinkUI#toolbarView} or
	* {@link module:link/linkui~LinkUI#formView} if it is not.
	*/
	_createToolbarLinkImageButton() {
		const editor = this.editor;
		const t = editor.t;
		editor.ui.componentFactory.add("linkImage", (locale) => {
			const button = new ButtonView(locale);
			const plugin = editor.plugins.get("LinkUI");
			const linkCommand = editor.commands.get("link");
			button.set({
				isEnabled: true,
				label: t("Link image"),
				icon: IconLink,
				keystroke: LINK_KEYSTROKE,
				tooltip: true,
				isToggleable: true
			});
			button.bind("isEnabled").to(linkCommand, "isEnabled");
			button.bind("isOn").to(linkCommand, "value", (value) => !!value);
			this.listenTo(button, "execute", () => {
				if (this._isSelectedLinkedImage(editor.model.document.selection)) plugin._addToolbarView();
				else plugin._showUI(true);
			});
			return button;
		});
	}
	/**
	* Returns true if a linked image (either block or inline) is the only selected element
	* in the model document.
	*/
	_isSelectedLinkedImage(selection) {
		const selectedModelElement = selection.getSelectedElement();
		return this.editor.plugins.get("ImageUtils").isImage(selectedModelElement) && selectedModelElement.hasAttribute("linkHref");
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/linkimage
*/
/**
* The `LinkImage` plugin.
*
* This is a "glue" plugin that loads the {@link module:link/linkimageediting~LinkImageEditing link image editing feature}
* and {@link module:link/linkimageui~LinkImageUI link image UI feature}.
*/
var LinkImage = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [LinkImageEditing, LinkImageUI];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "LinkImage";
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

export { AutoLink, AutomaticLinkDecorators, Link, LinkCommand, LinkEditing, LinkFormView, LinkImage, LinkImageEditing, LinkImageUI, LinkManualDecorator, LinkPropertiesView, LinkProviderItemsView, LinkUI, UnlinkCommand, LINK_KEYSTROKE as _LINK_KEYSTROKE, LinkButtonView as _LinkButtonView, LinkPreviewButtonView as _LinkPreviewButtonView, createLinkElement as _createLinkElement, ensureSafeUrl as _ensureSafeLinkUrl, extractTextFromLinkRange as _extractTextFromLinkRange, getLocalizedDecorators as _getLocalizedLinkDecorators, linkHasProtocol as _hasLinkProtocol, isEmail as _isEmailLink, normalizeDecorators as _normalizeLinkDecorators, openLink as _openLink, addLinkProtocolIfApplicable, isLinkElement, isLinkableElement };
//# sourceMappingURL=index.js.map