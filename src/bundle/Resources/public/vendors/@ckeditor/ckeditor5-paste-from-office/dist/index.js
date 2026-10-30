/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Plugin } from "@ckeditor/ckeditor5-core";
import { insertToPriorityArray, priorities } from "@ckeditor/ckeditor5-utils";
import { ClipboardPipeline } from "@ckeditor/ckeditor5-clipboard";
import { Matcher, ViewDocument, ViewDomConverter, ViewUpcastWriter } from "@ckeditor/ckeditor5-engine";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Transforms `<a>` elements which are bookmarks by moving their children after the element.
*
* @internal
*/
function transformBookmarks(documentFragment, writer) {
	const elementsToChange = [];
	for (const value of writer.createRangeIn(documentFragment)) {
		const element = value.item;
		if (element.is("element", "a") && !element.hasAttribute("href") && (element.hasAttribute("id") || element.hasAttribute("name"))) elementsToChange.push(element);
	}
	for (const element of elementsToChange) {
		const index = element.parent.getChildIndex(element) + 1;
		const children = element.getChildren();
		writer.insertChild(index, children, element.parent);
		if (isHiddenBookmarkAnchor(element)) writer.remove(element);
	}
}
/**
* Checks whether the given element is a hidden or auto-generated bookmark anchor.
*
* Editors like MS Word and Google Docs use the `name` attribute (rather than `id`)
* for bookmarks. Furthermore, they reserve `_`-prefixed bookmark names for
* auto-generated anchors (e.g., Table of Contents or internal hyperlinks) and
* do not allow users to manually create custom bookmarks starting with an underscore.
*
* @param element The element to check.
* @returns True if the element is a hidden bookmark anchor, false otherwise.
*/
function isHiddenBookmarkAnchor(element) {
	const name = element.getAttribute("name");
	return !!name && name.startsWith("_");
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module paste-from-office/filters/utils
*/
/**
* Normalizes CSS length value to 'px'.
*
* @internal
*/
function convertCssLengthToPx(value) {
	const numericValue = parseFloat(value);
	if (value.endsWith("pt")) return toPx(numericValue * 96 / 72);
	else if (value.endsWith("pc")) return toPx(numericValue * 12 * 96 / 72);
	else if (value.endsWith("in")) return toPx(numericValue * 96);
	else if (value.endsWith("cm")) return toPx(numericValue * 96 / 2.54);
	else if (value.endsWith("mm")) return toPx(numericValue / 10 * 96 / 2.54);
	return value;
}
/**
* Returns true for value with 'px' unit.
*
* @internal
*/
function isPx(value) {
	return value !== void 0 && value.endsWith("px");
}
/**
* Returns a rounded 'px' value.
*
* @internal
*/
function toPx(value) {
	return Math.round(value) + "px";
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module paste-from-office/filters/list
*/
/**
* Transforms Word specific list-like elements to the semantic HTML lists.
*
* Lists in Word are represented by block elements with special attributes like:
*
* ```xml
* <p class=MsoListParagraphCxSpFirst style='mso-list:l1 level1 lfo1'>...</p> // Paragraph based list.
* <h1 style='mso-list:l0 level1 lfo1'>...</h1> // Heading 1 based list.
* ```
*
* @param documentFragment The view structure to be transformed.
* @param stylesString Styles from which list-like elements styling will be extracted.
* @param hasMultiLevelListPlugin Whether the editor has the multi-level list plugin enabled.
* @param enableSkipLevelLists Whether to enable skip-level lists.
* @internal
*/
function transformListItemLikeElementsIntoLists(documentFragment, stylesString, hasMultiLevelListPlugin, enableSkipLevelLists = false) {
	if (!documentFragment.childCount) return;
	const writer = new ViewUpcastWriter(documentFragment.document);
	const itemLikeElements = findAllItemLikeElements(documentFragment, writer);
	if (!itemLikeElements.length) return;
	const encounteredLists = [];
	const stack = [];
	let topLevelListInfo = createTopLevelListInfo();
	for (const itemLikeElement of itemLikeElements) if (itemLikeElement.indent !== void 0) {
		if (!isListContinuation(itemLikeElement)) {
			applyIndentationToTopLevelList(writer, stack, topLevelListInfo);
			topLevelListInfo = createTopLevelListInfo();
			encounteredLists.length = 1;
			stack.length = 0;
		}
		const originalListId = `${itemLikeElement.id}:${itemLikeElement.indent}`;
		const indent = enableSkipLevelLists ? itemLikeElement.indent - 1 : Math.min(itemLikeElement.indent - 1, stack.length);
		if (indent < stack.length && stack[indent].id !== itemLikeElement.id) {
			if (indent == 0 && topLevelListInfo.canApplyMarginOnList && topLevelListInfo.topLevelListItemElements.length > 0) {
				applyIndentationToTopLevelList(writer, stack, topLevelListInfo);
				topLevelListInfo = createTopLevelListInfo();
			}
			encounteredLists.length = indent;
			stack.length = indent;
		}
		if (indent < stack.length - 1) {
			encounteredLists.length = indent + 1;
			stack.length = indent + 1;
		}
		const listStyle = detectListStyle(itemLikeElement, stylesString);
		while (stack.length < indent) {
			const intermediateList = writer.createElement(listStyle.type);
			const intermediateListItem = writer.createElement("li");
			writer.setStyle("list-style-type", "none", intermediateListItem);
			if (stack.length == 0) {
				const parent = itemLikeElement.element.parent;
				const index = parent.getChildIndex(itemLikeElement.element) + 1;
				writer.insertChild(index, intermediateList, parent);
			} else {
				const parentListItems = stack[stack.length - 1].listItemElements;
				writer.appendChild(intermediateList, parentListItems[parentListItems.length - 1]);
			}
			writer.appendChild(intermediateListItem, intermediateList);
			stack.push({
				...itemLikeElement,
				listElement: intermediateList,
				listItemElements: [intermediateListItem],
				isIntermediate: true,
				marginLeft: void 0
			});
		}
		if (indent > stack.length - 1 || stack[indent].listElement.name != listStyle.type) {
			if (listStyle.type == "ol" && itemLikeElement.id !== void 0 && encounteredLists[indent] && encounteredLists[indent][originalListId]) listStyle.startIndex = encounteredLists[indent][originalListId];
			const listElement = createNewEmptyList(listStyle, writer, hasMultiLevelListPlugin);
			if (stack.length == 0) {
				const parent = itemLikeElement.element.parent;
				const index = parent.getChildIndex(itemLikeElement.element) + 1;
				writer.insertChild(index, listElement, parent);
			} else if (indent == 0) {
				const existingList = stack[0].listElement;
				const listParent = existingList.parent;
				const insertIndex = listParent.getChildIndex(existingList) + 1;
				writer.insertChild(insertIndex, listElement, listParent);
			} else {
				const parentListItems = stack[indent - 1].listItemElements;
				writer.appendChild(listElement, parentListItems[parentListItems.length - 1]);
			}
			stack[indent] = {
				...itemLikeElement,
				listElement,
				listItemElements: []
			};
			if (itemLikeElement.id !== void 0) {
				if (!encounteredLists[indent]) encounteredLists[indent] = {};
				encounteredLists[indent][originalListId] = listStyle.startIndex || 1;
			}
		} else if (stack[indent].isIntermediate) {
			applyListStyleToElement(stack[indent].listElement, listStyle, writer, hasMultiLevelListPlugin);
			stack[indent] = {
				...itemLikeElement,
				listElement: stack[indent].listElement,
				listItemElements: stack[indent].listItemElements
			};
			/* v8 ignore else -- @preserve */
			if (itemLikeElement.id !== void 0) {
				/* v8 ignore else -- @preserve */
				if (!encounteredLists[indent]) encounteredLists[indent] = {};
				encounteredLists[indent][originalListId] = listStyle.startIndex || 1;
			}
		}
		const listItem = itemLikeElement.element.name == "li" ? itemLikeElement.element : writer.createElement("li");
		applyListItemMarginLeftAndUpdateTopLevelInfo(writer, stack, topLevelListInfo, itemLikeElement, listItem, indent);
		writer.appendChild(listItem, stack[indent].listElement);
		stack[indent].listItemElements.push(listItem);
		if (itemLikeElement.id !== void 0 && encounteredLists[indent]) encounteredLists[indent][originalListId]++;
		if (itemLikeElement.element != listItem) writer.appendChild(itemLikeElement.element, listItem);
		removeBulletElement(itemLikeElement.element, writer);
		writer.removeStyle("text-indent", itemLikeElement.element);
		writer.removeStyle("margin-left", itemLikeElement.element);
	} else {
		const stackItem = stack.find((stackItem) => stackItem.marginLeft == itemLikeElement.marginLeft);
		if (stackItem) {
			const listItems = stackItem.listItemElements;
			writer.appendChild(itemLikeElement.element, listItems[listItems.length - 1]);
			writer.removeStyle("margin-left", itemLikeElement.element);
			stack.length = stack.indexOf(stackItem) + 1;
			encounteredLists.length = stack.length + 1;
		} else {
			applyIndentationToTopLevelList(writer, stack, topLevelListInfo);
			topLevelListInfo = createTopLevelListInfo();
			stack.length = 0;
		}
	}
	applyIndentationToTopLevelList(writer, stack, topLevelListInfo);
}
function applyListItemMarginLeftAndUpdateTopLevelInfo(writer, stack, topLevelListInfo, itemLikeElement, listItem, indent) {
	if (itemLikeElement.marginLeft === void 0) {
		if (indent == 0) topLevelListInfo.canApplyMarginOnList = false;
		return;
	}
	const listItemBlockMarginLeft = parseFloat(itemLikeElement.marginLeft);
	let currentListBlockIndent = 0;
	for (let ancestorIndex = 0; ancestorIndex < stack.length - 1; ancestorIndex++) {
		const ancestorListItems = stack[ancestorIndex].listItemElements;
		const ancestorMargin = ancestorListItems[ancestorListItems.length - 1].getStyle("margin-left");
		if (ancestorMargin !== void 0) currentListBlockIndent += parseFloat(ancestorMargin);
	}
	currentListBlockIndent += stack.length * 40;
	const adjustedListItemIndent = listItemBlockMarginLeft - currentListBlockIndent;
	const listItemBlockMarginLeftPx = adjustedListItemIndent !== 0 ? toPx(adjustedListItemIndent) : void 0;
	if (listItemBlockMarginLeftPx) {
		writer.setStyle("margin-left", listItemBlockMarginLeftPx, listItem);
		if (indent == 0 && topLevelListInfo.canApplyMarginOnList) {
			if (topLevelListInfo.marginLeft === void 0) topLevelListInfo.marginLeft = listItemBlockMarginLeftPx;
			if (listItemBlockMarginLeftPx !== topLevelListInfo.marginLeft) topLevelListInfo.canApplyMarginOnList = false;
			topLevelListInfo.topLevelListItemElements.push(listItem);
		}
	}
}
function createTopLevelListInfo() {
	return {
		marginLeft: void 0,
		canApplyMarginOnList: true,
		topLevelListItemElements: []
	};
}
/**
* Sets margin-left style to the top-level list if all its items have the same margin-left.
* If margin-left is set on the list, it is removed from all its items to avoid doubling of margins.
*/
function applyIndentationToTopLevelList(writer, stack, topLevelListInfo) {
	if (topLevelListInfo.canApplyMarginOnList && topLevelListInfo.marginLeft && topLevelListInfo.topLevelListItemElements.length > 0) {
		writer.setStyle("margin-left", topLevelListInfo.marginLeft, stack[0].listElement);
		for (const topLevelListItem of topLevelListInfo.topLevelListItemElements) writer.removeStyle("margin-left", topLevelListItem);
	}
}
/**
* Removes paragraph wrapping content inside a list item.
*
* @internal
*/
function unwrapParagraphInListItem(documentFragment, writer) {
	for (const value of writer.createRangeIn(documentFragment)) {
		const element = value.item;
		if (element.is("element", "li")) {
			const firstChild = element.getChild(0);
			if (firstChild && firstChild.is("element", "p")) writer.unwrapElement(firstChild);
		}
	}
}
/**
* Finds all list-like elements in a given document fragment.
*
* @param documentFragment Document fragment in which to look for list-like nodes.
* @returns Array of found list-like items. Each item is an object containing
* @internal
*/
function findAllItemLikeElements(documentFragment, writer) {
	const range = writer.createRangeIn(documentFragment);
	const itemLikeElements = [];
	const foundMargins = /* @__PURE__ */ new Set();
	for (const item of range.getItems()) {
		if (!item.is("element") || !item.name.match(/^(p|h\d+|li|div)$/)) continue;
		let marginLeft = getMarginLeftNormalized(item);
		if (marginLeft !== void 0 && parseFloat(marginLeft) == 0 && !Array.from(item.getClassNames()).find((className) => className.startsWith("MsoList"))) marginLeft = void 0;
		if (item.hasStyle("mso-list") && item.getStyle("mso-list") !== "none" || marginLeft !== void 0 && foundMargins.has(marginLeft)) {
			const itemData = getListItemData(item);
			itemLikeElements.push({
				element: item,
				id: itemData.id,
				order: itemData.order,
				indent: itemData.indent,
				marginLeft
			});
			if (marginLeft !== void 0) foundMargins.add(marginLeft);
		} else foundMargins.clear();
	}
	return itemLikeElements;
}
/**
* Whether the given element is possibly a list continuation. Previous element was wrapped into a list
* or the current element already is inside a list.
*/
function isListContinuation(currentItem) {
	let previousSibling = currentItem.element.previousSibling;
	while (previousSibling && isStrayInlineMarker(previousSibling)) previousSibling = previousSibling.previousSibling;
	if (!previousSibling) {
		const parent = currentItem.element.parent;
		return isList(parent) && (!parent.previousSibling || isList(parent.previousSibling));
	}
	return isList(previousSibling);
}
/**
* True for empty inline elements Word emits as residue between paragraphs (`<span>`, `<a>`, `<o:p>`).
* Used by `isListContinuation` to look past these when checking whether the prior block is a list —
* they're layout artefacts, not real content.
*/
function isStrayInlineMarker(node) {
	return node.is("element") && node.childCount === 0 && /^(?:span|a|o:p)$/.test(node.name);
}
function isList(element) {
	return element.is("element", "ol") || element.is("element", "ul");
}
/**
* Extracts list item style from the provided CSS.
*
* List item style is extracted from the CSS stylesheet. Each list with its specific style attribute
* value (`mso-list:l1 level1 lfo1`) has its dedicated properties in a CSS stylesheet defined with a selector like:
*
* ```css
* @list l1:level1 { ... }
* ```
*
* It contains `mso-level-number-format` property which defines list numbering/bullet style. If this property
* is not defined it means default `decimal` numbering.
*
* Here CSS string representation is used as `mso-level-number-format` property is an invalid CSS property
* and will be removed during CSS parsing.
*
* @param listLikeItem List-like item for which list style will be searched for. Usually
* a result of `findAllItemLikeElements()` function.
* @param stylesString CSS stylesheet.
* @returns An object with properties:
*
* * type - List type, could be `ul` or `ol`.
* * startIndex - List start index, valid only for ordered lists.
* * style - List style, for example: `decimal`, `lower-roman`, etc. It is extracted
*     directly from Word stylesheet and adjusted to represent proper values for the CSS `list-style-type` property.
*     If it cannot be adjusted, the `null` value is returned.
*/
function detectListStyle(listLikeItem, stylesString) {
	const listStyleRegexp = new RegExp(`@list l${listLikeItem.id}:level${listLikeItem.indent}\\s*({[^}]*)`, "gi");
	const listStyleTypeRegex = /mso-level-number-format:([^;]{0,100});/gi;
	const listStartIndexRegex = /mso-level-start-at:\s{0,100}([0-9]{0,10})\s{0,100};/gi;
	const legalStyleListRegex = new RegExp(`@list\\s+l${listLikeItem.id}:level\\d\\s*{[^{]*mso-level-text:"%\\d\\\\.`, "gi");
	const multiLevelNumberFormatTypeRegex = new RegExp(`@list l${listLikeItem.id}:level\\d\\s*{[^{]*mso-level-number-format:`, "gi");
	const legalStyleListMatch = legalStyleListRegex.exec(stylesString);
	const multiLevelNumberFormatMatch = multiLevelNumberFormatTypeRegex.exec(stylesString);
	const islegalStyleList = legalStyleListMatch && !multiLevelNumberFormatMatch;
	const listStyleMatch = listStyleRegexp.exec(stylesString);
	let listStyleType = "decimal";
	let type = "ol";
	let startIndex = null;
	if (listStyleMatch && listStyleMatch[1]) {
		const listStyleTypeMatch = listStyleTypeRegex.exec(listStyleMatch[1]);
		if (listStyleTypeMatch && listStyleTypeMatch[1]) {
			listStyleType = listStyleTypeMatch[1].trim();
			type = listStyleType !== "bullet" && listStyleType !== "image" ? "ol" : "ul";
		}
		if (listStyleType === "bullet") {
			const bulletedStyle = findBulletedListStyle(listLikeItem.element);
			if (bulletedStyle) listStyleType = bulletedStyle;
		} else {
			const listStartIndexMatch = listStartIndexRegex.exec(listStyleMatch[1]);
			if (listStartIndexMatch && listStartIndexMatch[1]) startIndex = parseInt(listStartIndexMatch[1]);
		}
		if (islegalStyleList) type = "ol";
	}
	return {
		type,
		startIndex,
		style: mapListStyleDefinition(listStyleType),
		isLegalStyleList: islegalStyleList
	};
}
/**
* Tries to extract the `list-style-type` value based on the marker element for bulleted list.
*/
function findBulletedListStyle(element) {
	if (element.name == "li" && element.parent.name == "ul" && element.parent.hasAttribute("type")) return element.parent.getAttribute("type");
	const listMarkerElement = findListMarkerNode(element);
	if (!listMarkerElement) return null;
	const listMarker = listMarkerElement._data;
	if (listMarker === "o") return "circle";
	else if (listMarker === "·") return "disc";
	else if (listMarker === "§") return "square";
	return null;
}
/**
* Tries to find a text node that represents the marker element (list-style-type).
*/
function findListMarkerNode(element) {
	if (element.getChild(0).is("$text")) return null;
	for (const childNode of element.getChildren()) {
		if (!childNode.is("element", "span")) continue;
		const textNodeOrElement = childNode.getChild(0);
		if (!textNodeOrElement) continue;
		if (textNodeOrElement.is("$text")) return textNodeOrElement;
		return textNodeOrElement.getChild(0);
	}
	/* v8 ignore next -- @preserve */
	return null;
}
/**
* Parses the `list-style-type` value extracted directly from the Word CSS stylesheet and returns proper CSS definition.
*/
function mapListStyleDefinition(value) {
	if (value.startsWith("arabic-leading-zero")) return "decimal-leading-zero";
	switch (value) {
		case "alpha-upper": return "upper-alpha";
		case "alpha-lower": return "lower-alpha";
		case "roman-upper": return "upper-roman";
		case "roman-lower": return "lower-roman";
		case "circle":
		case "disc":
		case "square": return value;
		default: return null;
	}
}
/**
* Creates a new list OL/UL element.
*/
function createNewEmptyList(listStyle, writer, hasMultiLevelListPlugin) {
	const list = writer.createElement(listStyle.type);
	applyListStyleToElement(list, listStyle, writer, hasMultiLevelListPlugin);
	return list;
}
/**
* Applies `list-style-type`, `start`, and the `legal-list` class to a list element based on the detected
* list style. Used both when creating a fresh list and when a real item claims a previously-intermediate
* wrapper (which was created without any of these).
*/
function applyListStyleToElement(list, listStyle, writer, hasMultiLevelListPlugin) {
	if (listStyle.style) writer.setStyle("list-style-type", listStyle.style, list);
	if (listStyle.startIndex && listStyle.startIndex > 1) writer.setAttribute("start", listStyle.startIndex, list);
	if (listStyle.isLegalStyleList && hasMultiLevelListPlugin) writer.addClass("legal-list", list);
}
/**
* Extracts list item information from Word specific list-like element style:
*
* ```
* `style="mso-list:l1 level1 lfo1"`
* ```
*
* where:
*
* ```
* * `l1` is a list id (however it does not mean this is a continuous list - see https://github.com/ckeditor/ckeditor5/issues/43),
* * `level1` is a list item indentation level,
* * `lfo1` is a list insertion order in a document.
* ```
*
* @param element Element from which style data is extracted.
*/
function getListItemData(element) {
	const listStyle = element.getStyle("mso-list");
	if (listStyle === void 0) return {};
	const idMatch = listStyle.match(/(^|\s{1,100})l(\d+)/i);
	const orderMatch = listStyle.match(/\s{0,100}lfo(\d+)/i);
	const indentMatch = listStyle.match(/\s{0,100}level(\d+)/i);
	if (idMatch && orderMatch && indentMatch) return {
		id: idMatch[2],
		order: orderMatch[1],
		indent: parseInt(indentMatch[1])
	};
	return { indent: 1 };
}
/**
* Removes span with a numbering/bullet from a given element.
*/
function removeBulletElement(element, writer) {
	const bulletMatcher = new Matcher({
		name: "span",
		styles: { "mso-list": "Ignore" }
	});
	const range = writer.createRangeIn(element);
	for (const value of range) if (value.type === "elementStart" && bulletMatcher.match(value.item)) writer.remove(value.item);
}
/**
* Returns element left margin normalized to 'px' if possible.
*/
function getMarginLeftNormalized(element) {
	const value = element.getStyle("margin-left");
	if (value === void 0 || value.endsWith("px")) return value;
	return convertCssLengthToPx(value);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module paste-from-office/filters/image
*/
/**
* Replaces source attribute of all `<img>` elements representing regular
* images (not the Word shapes) with inlined base64 image representation extracted from RTF or Blob data.
*
* @param documentFragment Document fragment on which transform images.
* @param rtfData The RTF data from which images representation will be used.
* @internal
*/
function replaceImagesSourceWithBase64(documentFragment, rtfData) {
	if (!documentFragment.childCount) return;
	const upcastWriter = new ViewUpcastWriter(documentFragment.document);
	const shapesIds = findAllShapesIds(documentFragment, upcastWriter);
	removeAllImgElementsRepresentingShapes(shapesIds, documentFragment, upcastWriter);
	insertMissingImgs(shapesIds, documentFragment, upcastWriter);
	removeAllShapeElements(documentFragment, upcastWriter);
	const images = findAllImageElementsWithLocalSource(documentFragment, upcastWriter);
	if (images.length) replaceImagesFileSourceWithInlineRepresentation(images, extractImageDataFromRtf(rtfData), upcastWriter);
}
/**
* Converts given HEX string to base64 representation.
*
* @internal
* @param hexString The HEX string to be converted.
* @returns Base64 representation of a given HEX string.
*/
function _convertHexToBase64(hexString) {
	return btoa(hexString.match(/\w{2}/g).map((char) => {
		return String.fromCharCode(parseInt(char, 16));
	}).join(""));
}
/**
* Finds all shapes (`<v:*>...</v:*>`) ids. Shapes can represent images (canvas)
* or Word shapes (which does not have RTF or Blob representation).
*
* @param documentFragment Document fragment from which to extract shape ids.
* @returns Array of shape ids.
*/
function findAllShapesIds(documentFragment, writer) {
	const range = writer.createRangeIn(documentFragment);
	const shapeElementsMatcher = new Matcher({ name: /v:(.+)/ });
	const shapesIds = [];
	for (const value of range) {
		if (value.type != "elementStart") continue;
		const el = value.item;
		const previousSibling = el.previousSibling;
		const prevSiblingName = previousSibling && previousSibling.is("element") ? previousSibling.name : null;
		const exceptionIds = ["Chart"];
		const isElementAShape = shapeElementsMatcher.match(el);
		const hasElementGfxdataAttribute = el.getAttribute("o:gfxdata");
		const isPreviousSiblingAShapeType = prevSiblingName === "v:shapetype";
		const isElementIdInExceptionsArray = hasElementGfxdataAttribute && exceptionIds.some((item) => el.getAttribute("id").includes(item));
		if (isElementAShape && hasElementGfxdataAttribute && !isPreviousSiblingAShapeType && !isElementIdInExceptionsArray) shapesIds.push(value.item.getAttribute("id"));
	}
	return shapesIds;
}
/**
* Removes all `<img>` elements which represents Word shapes and not regular images.
*
* @param shapesIds Shape ids which will be checked against `<img>` elements.
* @param documentFragment Document fragment from which to remove `<img>` elements.
*/
function removeAllImgElementsRepresentingShapes(shapesIds, documentFragment, writer) {
	const range = writer.createRangeIn(documentFragment);
	const imageElementsMatcher = new Matcher({ name: "img" });
	const imgs = [];
	for (const value of range) if (value.item.is("element") && imageElementsMatcher.match(value.item)) {
		const el = value.item;
		const shapes = el.getAttribute("v:shapes") ? el.getAttribute("v:shapes").split(" ") : [];
		if (shapes.length && shapes.every((shape) => shapesIds.indexOf(shape) > -1)) imgs.push(el);
		else if (!el.getAttribute("src")) imgs.push(el);
	}
	for (const img of imgs) writer.remove(img);
}
/**
* Removes all shape elements (`<v:*>...</v:*>`) so they do not pollute the output structure.
*
* @param documentFragment Document fragment from which to remove shape elements.
*/
function removeAllShapeElements(documentFragment, writer) {
	const range = writer.createRangeIn(documentFragment);
	const shapeElementsMatcher = new Matcher({ name: /v:(.+)/ });
	const shapes = [];
	for (const value of range) if (value.type == "elementStart" && shapeElementsMatcher.match(value.item)) shapes.push(value.item);
	for (const shape of shapes) writer.remove(shape);
}
/**
* Inserts `img` tags if there is none after a shape.
*/
function insertMissingImgs(shapeIds, documentFragment, writer) {
	const range = writer.createRangeIn(documentFragment);
	const shapes = [];
	for (const value of range) if (value.type == "elementStart" && value.item.is("element", "v:shape")) {
		const id = value.item.getAttribute("id");
		if (shapeIds.includes(id)) continue;
		if (!containsMatchingImg(value.item.parent.getChildren(), id)) shapes.push(value.item);
	}
	for (const shape of shapes) {
		const attrs = { src: findSrc(shape) };
		if (shape.hasAttribute("alt")) attrs.alt = shape.getAttribute("alt");
		const img = writer.createElement("img", attrs);
		writer.insertChild(shape.index + 1, img, shape.parent);
	}
	function containsMatchingImg(nodes, id) {
		for (const node of nodes)
 /* v8 ignore else -- @preserve */
		if (node.is("element")) {
			if (node.name == "img" && node.getAttribute("v:shapes") == id) return true;
			if (containsMatchingImg(node.getChildren(), id)) return true;
		}
		return false;
	}
	function findSrc(shape) {
		for (const child of shape.getChildren())
 /* v8 ignore else -- @preserve */
		if (child.is("element") && child.getAttribute("src")) return child.getAttribute("src");
	}
}
/**
* Finds all `<img>` elements in a given document fragment which have source pointing to local `file://` resource.
* This function also tracks the index position of each image in the document, which is essential for
* precise matching with hexadecimal representations in RTF data.
*
* @param documentFragment Document fragment in which to look for `<img>` elements.
* @returns Array of found images along with their position index in the document.
*/
function findAllImageElementsWithLocalSource(documentFragment, writer) {
	const range = writer.createRangeIn(documentFragment);
	const imageElementsMatcher = new Matcher({ name: "img" });
	const imgs = [];
	let currentImageIndex = 0;
	for (const value of range) if (value.item.is("element") && imageElementsMatcher.match(value.item)) {
		if (value.item.getAttribute("src").startsWith("file://")) imgs.push({
			element: value.item,
			imageIndex: currentImageIndex
		});
		currentImageIndex++;
	}
	return imgs;
}
/**
* Extracts all images HEX representations from a given RTF data.
*
* @param rtfData The RTF data from which to extract images HEX representation.
* @returns Array of found HEX representations. Each array item is an object containing:
*
* * hex Image representation in HEX format.
* * type Type of image, `image/png` or `image/jpeg`.
*/
function extractImageDataFromRtf(rtfData) {
	if (!rtfData) return [];
	const regexPictureHeader = /{\\pict[\s\S]+?\\bliptag-?\d+(\\blipupi-?\d+)?({\\\*\\blipuid\s?[\da-fA-F]+)?[\s}]*?/;
	const regexPicture = new RegExp("(?:(" + regexPictureHeader.source + "))([\\da-fA-F\\s]+)\\}", "g");
	const images = rtfData.match(regexPicture);
	const result = [];
	if (images) for (const image of images) {
		let imageType = false;
		if (image.includes("\\pngblip")) imageType = "image/png";
		else if (image.includes("\\jpegblip")) imageType = "image/jpeg";
		if (imageType) result.push({
			hex: image.replace(regexPictureHeader, "").replace(/[^\da-fA-F]/g, ""),
			type: imageType
		});
	}
	return result;
}
/**
* Replaces `src` attribute value of all given images with the corresponding base64 image representation.
* Uses the image index to precisely match with the correct hexadecimal representation from RTF data.
*
* @param imageElements Array of image elements along with their indices which will have their sources replaced.
* @param imagesHexSources Array of images hex sources (usually the result of `extractImageDataFromRtf()` function).
* Contains hexadecimal representations of ALL images in the document, not just those with `file://` URLs.
* In XML documents, the same image might be defined both as base64 in HTML and as hexadecimal in RTF data.
*/
function replaceImagesFileSourceWithInlineRepresentation(imageElements, imagesHexSources, writer) {
	for (let i = 0; i < imageElements.length; i++) {
		const { element, imageIndex } = imageElements[i];
		const rtfHexSource = imagesHexSources[imageIndex];
		if (rtfHexSource) {
			const newSrc = `data:${rtfHexSource.type};base64,${_convertHexToBase64(rtfHexSource.hex)}`;
			writer.setAttribute("src", newSrc, element);
		}
	}
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module paste-from-office/filters/removemsattributes
*/
/**
* Cleanup MS attributes like styles, attributes and elements.
*
* @param documentFragment element `data.content` obtained from clipboard.
* @internal
*/
function removeMSAttributes(documentFragment) {
	const elementsToUnwrap = [];
	const writer = new ViewUpcastWriter(documentFragment.document);
	for (const { item } of writer.createRangeIn(documentFragment)) {
		if (!item.is("element")) continue;
		for (const className of item.getClassNames()) if (/\bmso/gi.exec(className)) writer.removeClass(className, item);
		for (const styleName of item.getStyleNames()) if (/\bmso/gi.exec(styleName)) writer.removeStyle(styleName, item);
		if (item.is("element", "w:sdt") || item.is("element", "w:sdtpr") && item.isEmpty || item.is("element", "o:p") && item.isEmpty) elementsToUnwrap.push(item);
	}
	for (const item of elementsToUnwrap) {
		const itemParent = item.parent;
		const childIndex = itemParent.getChildIndex(item);
		writer.insertChild(childIndex, item.getChildren(), itemParent);
		writer.remove(item);
	}
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Applies border none for table and cells without a border specified.
* Normalizes style length units to px.
* Handles left block table alignment.
*
* @internal
*/
function transformTables(documentFragment, writer, hasTablePropertiesPlugin = false) {
	for (const item of writer.createRangeIn(documentFragment).getItems()) {
		if (!item.is("element", "table") && !item.is("element", "td") && !item.is("element", "th")) continue;
		if (hasTablePropertiesPlugin && item.is("element", "table")) {
			const directParent = item.parent?.is("element", "div") ? item.parent : null;
			const grandParent = item.parent?.parent?.is("element", "div") ? item.parent.parent : null;
			const divParent = directParent ?? grandParent;
			if (divParent && divParent.getAttribute("align") === "center" && !item.getAttribute("align")) {
				writer.setStyle("margin-left", "auto", item);
				writer.setStyle("margin-right", "auto", item);
			} else if (divParent && divParent.getAttribute("align") === "right" && !item.getAttribute("align")) {
				writer.setStyle("margin-left", "auto", item);
				writer.setStyle("margin-right", "0", item);
			} else if (!divParent && !item.getAttribute("align")) {
				writer.setStyle("margin-left", "0", item);
				writer.setStyle("margin-right", "auto", item);
			}
		}
		const sides = [
			"left",
			"top",
			"right",
			"bottom"
		];
		if (sides.every((side) => !item.hasStyle(`border-${side}-style`))) writer.setStyle("border-style", "none", item);
		else for (const side of sides) if (!item.hasStyle(`border-${side}-style`)) writer.setStyle(`border-${side}-style`, "none", item);
		const props = [
			"width",
			"height",
			...sides.map((side) => `border-${side}-width`),
			...sides.map((side) => `padding-${side}`)
		];
		for (const prop of props) if (item.hasStyle(prop)) writer.setStyle(prop, convertCssLengthToPx(item.getStyle(prop)), item);
	}
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Removes the `width:0px` style from table pasted from Google Sheets and `width="0"` attribute from Word tables.
*
* @param documentFragment element `data.content` obtained from clipboard
* @internal
*/
function removeInvalidTableWidth(documentFragment, writer) {
	for (const child of writer.createRangeIn(documentFragment).getItems()) if (child.is("element", "table")) {
		if (child.getStyle("width") === "0px") writer.removeStyle("width", child);
		if (child.getAttribute("width") === "0") writer.removeAttribute("width", child);
	}
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Replaces MS Word specific footnotes references and definitions with proper elements.
*
* Things to know about MS Word footnotes:
*
* * Footnote references in Word are marked with `mso-footnote-id` style.
* * Word does not support nested footnotes, so references within definitions are ignored.
* * Word appends extra spaces after footnote references within definitions, which are trimmed.
* * Footnote definitions list is marked with `mso-element: footnote-list` style it contain `mso-element: footnote` elements.
* * Footnote definition might contain tables, lists and other elements, not only text. They are placed directly within `li` element,
* without any wrapper (in opposition to text content of the definition, which is placed within `MsoFootnoteText` element).
*
* Example pseudo document showing MS Word footnote structure:
*
* ```html
* <p>Text with footnote<a style='mso-footnote-id:ftn1'>[1]</a> reference.</p>
*
* <div style='mso-element:footnote-list'>
* 	<div style='mso-element:footnote' id=ftn1>
* 		<p class=MsoFootnoteText><a style='mso-footnote-id:ftn1'>[1]</a> Footnote content</p>
* 		<table class="MsoTableGrid">...</table>
* 	</div>
* </div>
* ```
*
* Will be transformed into:
*
* ```html
* <p>Text with footnote<sup class="footnote"><a id="ref-footnote-ftn1" href="#footnote-ftn1">1</a></sup> reference.</p>
*
* <div class="footnotes">
* 	<hr class="footnotes-divider">
* 	<ol class="footnotes-list">
* 		<li class="footnote-definition" id="footnote-ftn1">
* 			<a href="#ref-footnote-ftn1" class="footnote-backlink">^</a>
* 			<div class="footnote-content">
* 				<p>Footnote content</p>
* 				<table>...</table>
* 			</div>
* 		</li>
* 	</ol>
* </div>
* ```
*
* @param documentFragment `data.content` obtained from clipboard.
* @param writer The view writer instance.
* @internal
*/
function replaceMSFootnotes(documentFragment, writer) {
	const msFootnotesRefs = /* @__PURE__ */ new Map();
	const msFootnotesDefs = /* @__PURE__ */ new Map();
	let msFootnotesDefinitionsList = null;
	for (const { item } of writer.createRangeIn(documentFragment)) {
		if (!item.is("element")) continue;
		if (item.getStyle("mso-element") === "footnote-list") {
			msFootnotesDefinitionsList = item;
			continue;
		}
		if (item.hasStyle("mso-footnote-id")) {
			const msFootnoteDef = item.findAncestor("element", (el) => el.getStyle("mso-element") === "footnote");
			if (msFootnoteDef) {
				const msFootnoteDefId = msFootnoteDef.getAttribute("id");
				msFootnotesDefs.set(msFootnoteDefId, msFootnoteDef);
			} else {
				const msFootnoteRefId = item.getStyle("mso-footnote-id");
				msFootnotesRefs.set(msFootnoteRefId, item);
			}
			continue;
		}
	}
	if (!msFootnotesRefs.size || !msFootnotesDefinitionsList) return;
	const footnotesList = createFootnotesListContainerElement(writer);
	writer.replace(msFootnotesDefinitionsList, footnotesList.wrapper);
	for (const [footnoteId, msFootnoteRef] of msFootnotesRefs) {
		const msFootnoteDef = msFootnotesDefs.get(footnoteId);
		if (!msFootnoteDef) continue;
		writer.replace(msFootnoteRef, createFootnoteRefViewElement(writer, footnoteId));
		const defElements = createFootnoteDefViewElement(writer, footnoteId);
		removeMSReferences(writer, msFootnoteDef);
		for (const child of msFootnoteDef.getChildren()) {
			let clonedChild = child;
			/* v8 ignore else -- @preserve */
			if (child.is("element")) clonedChild = writer.clone(child, true);
			writer.appendChild(clonedChild, defElements.content);
		}
		writer.appendChild(defElements.listItem, footnotesList.list);
	}
}
/**
* Removes all MS Office specific references from the given element.
*
* It also removes leading space from text nodes following the references, as MS Word adds
* them to separate the reference from the rest of the text.
*
* @param writer The view writer.
* @param element The element to trim.
* @returns The trimmed element.
*/
function removeMSReferences(writer, element) {
	const elementsToRemove = [];
	const textNodesToTrim = [];
	for (const { item } of writer.createRangeIn(element)) if (item.is("element") && item.getStyle("mso-footnote-id")) {
		elementsToRemove.unshift(item);
		const { nextSibling } = item;
		if (nextSibling?.is("$text") && nextSibling.data.startsWith(" ")) textNodesToTrim.unshift(nextSibling);
	}
	for (const element of elementsToRemove) writer.remove(element);
	for (const textNode of textNodesToTrim) {
		const trimmedData = textNode.data.substring(1);
		if (trimmedData.length > 0) {
			const parent = textNode.parent;
			const index = parent.getChildIndex(textNode);
			const newTextNode = writer.createText(trimmedData);
			writer.remove(textNode);
			writer.insertChild(index, newTextNode, parent);
		} else writer.remove(textNode);
	}
	return element;
}
/**
* Creates a footnotes list container element.
*
* @param writer The view writer instance.
* @returns The footnotes list container element and list itself.
*/
function createFootnotesListContainerElement(writer) {
	const divider = writer.createElement("hr", { class: "footnotes-divider" });
	const list = writer.createElement("ol", { class: "footnotes-list" });
	return {
		list,
		wrapper: writer.createElement("div", { class: "footnotes" }, [divider, list])
	};
}
/**
* Creates a footnote reference view element.
*
* @param writer The view writer instance.
* @param footnoteId The footnote ID.
* @returns The footnote reference view element.
*/
function createFootnoteRefViewElement(writer, footnoteId) {
	const sup = writer.createElement("sup", { class: "footnote" });
	const link = writer.createElement("a", {
		id: `ref-${footnoteId}`,
		href: `#${footnoteId}`
	});
	writer.appendChild(link, sup);
	return sup;
}
/**
* Creates a footnote definition view element with a backlink and a content container.
*
* @param writer The view writer instance.
* @param footnoteId The footnote ID.
* @returns An object containing the list item element, backlink and content container.
*/
function createFootnoteDefViewElement(writer, footnoteId) {
	const listItem = writer.createElement("li", {
		id: footnoteId,
		class: "footnote-definition"
	});
	const backLink = writer.createElement("a", {
		href: `#ref-${footnoteId}`,
		class: "footnote-backlink"
	});
	const content = writer.createElement("div", { class: "footnote-content" });
	writer.appendChild(writer.createText("^"), backLink);
	writer.appendChild(backLink, listItem);
	writer.appendChild(content, listItem);
	return {
		listItem,
		content
	};
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
const msWordMatch1 = /<meta\s*name="?generator"?\s*content="?microsoft\s*word\s*\d+"?\/?>/i;
const msWordMatch2 = /xmlns:o="urn:schemas-microsoft-com/i;
const msExcelMatch = /<meta\s*name="?generator"?\s*content="?microsoft\s*excel\s*\d+"?\/?>/i;
/**
* Normalizer for the content pasted from Microsoft Word.
*/
var PasteFromOfficeMSWordNormalizer = class {
	document;
	hasMultiLevelListPlugin;
	hasTablePropertiesPlugin;
	enableSkipLevelLists;
	/**
	* Creates a new `PasteFromOfficeMSWordNormalizer` instance.
	*
	* @param document View document.
	*/
	constructor(document, hasMultiLevelListPlugin = false, hasTablePropertiesPlugin = false, enableSkipLevelLists = false) {
		this.document = document;
		this.hasMultiLevelListPlugin = hasMultiLevelListPlugin;
		this.hasTablePropertiesPlugin = hasTablePropertiesPlugin;
		this.enableSkipLevelLists = enableSkipLevelLists;
	}
	/**
	* @inheritDoc
	*/
	isActive(htmlString) {
		return msWordMatch1.test(htmlString) || msWordMatch2.test(htmlString) || msExcelMatch.test(htmlString);
	}
	/**
	* @inheritDoc
	*/
	execute(data) {
		const writer = new ViewUpcastWriter(this.document);
		const stylesString = data.extraContent.stylesString;
		transformBookmarks(data.content, writer);
		transformListItemLikeElementsIntoLists(data.content, stylesString, this.hasMultiLevelListPlugin, this.enableSkipLevelLists);
		replaceImagesSourceWithBase64(data.content, data.dataTransfer.getData("text/rtf"));
		transformTables(data.content, writer, this.hasTablePropertiesPlugin);
		removeInvalidTableWidth(data.content, writer);
		replaceMSFootnotes(data.content, writer);
		removeMSAttributes(data.content);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Removes the `<b>` tag wrapper added by Google Docs to a copied content.
*
* @param documentFragment element `data.content` obtained from clipboard
* @internal
*/
function removeBoldWrapper(documentFragment, writer) {
	for (const child of documentFragment.getChildren()) if (child.is("element", "b") && child.getStyle("font-weight") === "normal") {
		const childIndex = documentFragment.getChildIndex(child);
		writer.remove(child);
		writer.insertChild(childIndex, child.getChildren(), documentFragment);
	}
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module paste-from-office/filters/br
*/
/**
* Transforms `<br>` elements that are siblings to some block element into a paragraphs.
*
* @param documentFragment The view structure to be transformed.
* @internal
*/
function transformBlockBrsToParagraphs(documentFragment, writer) {
	const viewDocument = new ViewDocument(writer.document.stylesProcessor);
	const domConverter = new ViewDomConverter(viewDocument, { renderingMode: "data" });
	const blockElements = domConverter.blockElements;
	const inlineObjectElements = domConverter.inlineObjectElements;
	const elementsToReplace = [];
	for (const value of writer.createRangeIn(documentFragment)) {
		const element = value.item;
		if (element.is("element", "br")) {
			const nextSibling = findSibling(element, "forward", writer, {
				blockElements,
				inlineObjectElements
			});
			const previousSibling = findSibling(element, "backward", writer, {
				blockElements,
				inlineObjectElements
			});
			const nextSiblingIsBlock = isBlockViewElement(nextSibling, blockElements);
			if (isBlockViewElement(previousSibling, blockElements) || nextSiblingIsBlock) elementsToReplace.push(element);
		}
	}
	for (const element of elementsToReplace) if (element.hasClass("Apple-interchange-newline")) writer.remove(element);
	else writer.replace(element, writer.createElement("p"));
}
/**
* Returns sibling node, threats inline elements as transparent (but should stop on an inline objects).
*/
function findSibling(viewElement, direction, writer, { blockElements, inlineObjectElements }) {
	let position = writer.createPositionAt(viewElement, direction == "forward" ? "after" : "before");
	position = position.getLastMatchingPosition(({ item }) => item.is("element") && !blockElements.includes(item.name) && !inlineObjectElements.includes(item.name), { direction });
	return direction == "forward" ? position.nodeAfter : position.nodeBefore;
}
/**
* Returns true for view elements that are listed as block view elements.
*/
function isBlockViewElement(node, blockElements) {
	return !!node && node.is("element") && blockElements.includes(node.name);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Replaces tab characters with spaces in text nodes that are inside elements styled with `white-space: pre-wrap`.
*
* This is a workaround for incorrect detection of pre-like formatting in the DOM converter for pasted Google Docs documents.
* When an element uses `white-space: pre-wrap`, the editor reduces tab characters to a single space, causing
* inconsistent spacing in pasted content. This function replaces tabs with spaces to ensure visual consistency.
* This is intended as a temporary solution.
*
* See: https://github.com/ckeditor/ckeditor5/issues/18995
*
* @param documentFragment The `data.content` element obtained from the clipboard.
* @param writer The upcast writer used to manipulate the view structure.
* @param tabWidth The number of spaces to replace each tab with. Defaults to 8.
* @internal
*/
function replaceTabsWithinPreWithSpaces(documentFragment, writer, tabWidth) {
	const textNodesToReplace = /* @__PURE__ */ new Set();
	for (const child of writer.createRangeIn(documentFragment).getItems()) {
		if (!child.is("view:$textProxy") || !child.data.includes("	")) continue;
		if (hasPreWrapParent(child.parent)) textNodesToReplace.add(child.textNode);
	}
	for (const textNode of textNodesToReplace) replaceTabsInTextNode(textNode, writer, tabWidth);
}
/**
* Checks if element or any of its parents has `white-space: pre-wrap` style.
*/
function hasPreWrapParent(element) {
	let parent = element;
	while (parent) {
		if (parent.is("element")) {
			if (parent.getStyle?.("white-space") === "pre-wrap") return true;
		}
		parent = parent.parent;
	}
	return false;
}
/**
* Replaces all tabs with spaces in the given text node.
*/
function replaceTabsInTextNode(textNode, writer, tabWidth) {
	const { parent, data } = textNode;
	const replacedData = data.replaceAll("	", " ".repeat(tabWidth));
	const index = parent.getChildIndex(textNode);
	writer.remove(textNode);
	writer.insertChild(index, writer.createText(replacedData), parent);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module paste-from-office/normalizers/googledocsnormalizer
*/
const googleDocsMatch = /id=("|')docs-internal-guid-[-0-9a-f]+("|')/i;
/**
* Normalizer for the content pasted from Google Docs.
*
* @internal
*/
var GoogleDocsNormalizer = class {
	document;
	/**
	* Creates a new `GoogleDocsNormalizer` instance.
	*
	* @param document View document.
	*/
	constructor(document) {
		this.document = document;
	}
	/**
	* @inheritDoc
	*/
	isActive(htmlString) {
		return googleDocsMatch.test(htmlString);
	}
	/**
	* @inheritDoc
	*/
	execute(data) {
		const writer = new ViewUpcastWriter(this.document);
		removeBoldWrapper(data.content, writer);
		unwrapParagraphInListItem(data.content, writer);
		transformBlockBrsToParagraphs(data.content, writer);
		replaceTabsWithinPreWithSpaces(data.content, writer, 8);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Removes the `xmlns` attribute from table pasted from Google Sheets.
*
* @param documentFragment element `data.content` obtained from clipboard
* @internal
*/
function removeXmlns(documentFragment, writer) {
	for (const child of documentFragment.getChildren()) if (child.is("element", "table") && child.hasAttribute("xmlns")) writer.removeAttribute("xmlns", child);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Removes the `<google-sheets-html-origin>` tag wrapper added by Google Sheets to a copied content.
*
* @param documentFragment element `data.content` obtained from clipboard
* @internal
*/
function removeGoogleSheetsTag(documentFragment, writer) {
	for (const child of documentFragment.getChildren())
 /* v8 ignore else -- @preserve */
	if (child.is("element", "google-sheets-html-origin")) {
		const childIndex = documentFragment.getChildIndex(child);
		writer.remove(child);
		writer.insertChild(childIndex, child.getChildren(), documentFragment);
	}
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Removes `<style>` block added by Google Sheets to a copied content.
*
* @param documentFragment element `data.content` obtained from clipboard
* @internal
*/
function removeStyleBlock(documentFragment, writer) {
	for (const child of Array.from(documentFragment.getChildren())) if (child.is("element", "style")) writer.remove(child);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module paste-from-office/normalizers/googlesheetsnormalizer
*/
const googleSheetsMatch = /<google-sheets-html-origin/i;
/**
* Normalizer for the content pasted from Google Sheets.
*
* @internal
*/
var GoogleSheetsNormalizer = class {
	document;
	/**
	* Creates a new `GoogleSheetsNormalizer` instance.
	*
	* @param document View document.
	*/
	constructor(document) {
		this.document = document;
	}
	/**
	* @inheritDoc
	*/
	isActive(htmlString) {
		return googleSheetsMatch.test(htmlString);
	}
	/**
	* @inheritDoc
	*/
	execute(data) {
		const writer = new ViewUpcastWriter(this.document);
		removeGoogleSheetsTag(data.content, writer);
		removeXmlns(data.content, writer);
		removeInvalidTableWidth(data.content, writer);
		removeStyleBlock(data.content, writer);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module paste-from-office/filters/space
*/
/**
* Replaces last space preceding elements closing tag with `&nbsp;`. Such operation prevents spaces from being removed
* during further DOM/View processing (see especially {@link module:engine/view/domconverter~ViewDomConverter#_processDomInlineNodes}).
* This method also takes into account Word specific `<o:p></o:p>` empty tags.
* Additionally multiline sequences of spaces and new lines between tags are removed (see
* https://github.com/ckeditor/ckeditor5-paste-from-office/issues/39
* and https://github.com/ckeditor/ckeditor5-paste-from-office/issues/40).
*
* @param htmlString HTML string in which spacing should be normalized.
* @returns Input HTML with spaces normalized.
* @internal
*/
function normalizeSpacing(htmlString) {
	return normalizeSafariSpaceSpans(normalizeSafariSpaceSpans(htmlString)).replace(/(<span\s+style=['"]mso-spacerun:yes['"]>[^\S\r\n]*?)[\r\n]+([^\S\r\n]*<\/span>)/g, "$1$2").replace(/<span\s+style=['"]mso-spacerun:yes['"]><\/span>/g, "").replace(/(<span\s+style=['"]letter-spacing:[^'"]+?['"]>)[\r\n]+(<\/span>)/g, "$1 $2").replace(/ <\//g, "\xA0</").replace(/ <o:p><\/o:p>/g, "\xA0<o:p></o:p>").replace(/<o:p>(&nbsp;|\u00A0)<\/o:p>/g, "").replace(/>([^\S\r\n]*[\r\n]\s*)</g, "><");
}
/**
* Normalizes spacing in special Word `spacerun spans` (`<span style='mso-spacerun:yes'>\s+</span>`) by replacing
* all spaces with `&nbsp; ` pairs. This prevents spaces from being removed during further DOM/View processing
* (see especially {@link module:engine/view/domconverter~ViewDomConverter#_processDomInlineNodes}).
*
* @param htmlDocument Native `Document` object in which spacing should be normalized.
* @internal
*/
function normalizeSpacerunSpans(htmlDocument) {
	htmlDocument.querySelectorAll("span[style*=spacerun]").forEach((el) => {
		const htmlElement = el;
		const innerTextLength = htmlElement.innerText.length || 0;
		htmlElement.innerText = Array(innerTextLength + 1).join("\xA0 ").substr(0, innerTextLength);
	});
}
/**
* Normalizes specific spacing generated by Safari when content pasted from Word (`<span class="Apple-converted-space"> </span>`)
* by replacing all spaces sequences longer than 1 space with `&nbsp; ` pairs. This prevents spaces from being removed during
* further DOM/View processing (see especially {@link module:engine/view/domconverter~ViewDomConverter#_processDataFromDomText}).
*
* This function is similar to {@link module:clipboard/utils/normalizeclipboarddata normalizeClipboardData util} but uses
* regular spaces / &nbsp; sequence for replacement.
*
* @param htmlString HTML string in which spacing should be normalized
* @returns Input HTML with spaces normalized.
* @internal
*/
function normalizeSafariSpaceSpans(htmlString) {
	return htmlString.replace(/<span(?: class="Apple-converted-space"|)>(\s+)<\/span>/g, (fullMatch, spaces) => {
		return spaces.length === 1 ? " " : Array(spaces.length + 1).join("\xA0 ").substr(0, spaces.length);
	});
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module paste-from-office/filters/parse
*/
/**
* Parses the provided HTML extracting contents of `<body>` and `<style>` tags.
*
* @param htmlString HTML string to be parsed.
*/
function parsePasteOfficeHtml(htmlString, stylesProcessor) {
	const domParser = new DOMParser();
	htmlString = htmlString.replace(/<!--\[if gte vml 1]>/g, "");
	htmlString = htmlString.replace(/<o:SmartTagType(?:\s+[^\s>=]+(?:="[^"]*")?)*\s*\/?>/gi, "");
	const normalizedHtml = normalizeSpacing(cleanContentAfterBody(htmlString));
	const htmlDocument = domParser.parseFromString(normalizedHtml, "text/html");
	normalizeSpacerunSpans(htmlDocument);
	removeInBodyStyleBlocks(htmlDocument);
	const bodyString = htmlDocument.body.innerHTML;
	const bodyView = documentToView(htmlDocument, stylesProcessor);
	const stylesObject = extractStyles(htmlDocument);
	return {
		body: bodyView,
		bodyString,
		styles: stylesObject.styles,
		stylesString: stylesObject.stylesString
	};
}
/**
* Transforms native `Document` object into {@link module:engine/view/documentfragment~ViewDocumentFragment}. Comments are skipped.
*
* @param htmlDocument Native `Document` object to be transformed.
*/
function documentToView(htmlDocument, stylesProcessor) {
	const viewDocument = new ViewDocument(stylesProcessor);
	const domConverter = new ViewDomConverter(viewDocument, { renderingMode: "data" });
	const fragment = htmlDocument.createDocumentFragment();
	const nodes = htmlDocument.body.childNodes;
	while (nodes.length > 0) fragment.appendChild(nodes[0]);
	return domConverter.domToView(fragment, { skipComments: true });
}
/**
* Removes all `<style>` elements found inside the `<body>` of the provided `htmlDocument`.
*
* This guards against sources that place (or flatten) a `<style>` block into the body, where its CSS text
* would otherwise be converted to visible text. Styles located in the `<head>` are not affected.
*
* @param htmlDocument Native `Document` object to be cleaned.
*/
function removeInBodyStyleBlocks(htmlDocument) {
	for (const style of Array.from(htmlDocument.body.querySelectorAll("style"))) style.remove();
}
/**
* Extracts both `CSSStyleSheet` and string representation from all `style` elements available in a provided `htmlDocument`.
*
* @param htmlDocument Native `Document` object from which styles will be extracted.
*/
function extractStyles(htmlDocument) {
	const styles = [];
	const stylesString = [];
	const styleTags = Array.from(htmlDocument.getElementsByTagName("style"));
	for (const style of styleTags) if (style.sheet && style.sheet.cssRules && style.sheet.cssRules.length) {
		styles.push(style.sheet);
		stylesString.push(style.innerHTML);
	}
	return {
		styles,
		stylesString: stylesString.join(" ")
	};
}
/**
* Removes leftover content from between closing </body> and closing </html> tag:
*
* ```html
* <html><body><p>Foo Bar</p></body><span>Fo</span></html> -> <html><body><p>Foo Bar</p></body></html>
* ```
*
* This function is used as specific browsers (Edge) add some random content after `body` tag when pasting from Word.
* @param htmlString The HTML string to be cleaned.
* @returns The HTML string with leftover content removed.
*/
function cleanContentAfterBody(htmlString) {
	const bodyCloseTag = "</body>";
	const htmlCloseTag = "</html>";
	const bodyCloseIndex = htmlString.indexOf(bodyCloseTag);
	if (bodyCloseIndex < 0) return htmlString;
	const htmlCloseIndex = htmlString.indexOf(htmlCloseTag, bodyCloseIndex + 7);
	return htmlString.substring(0, bodyCloseIndex + 7) + (htmlCloseIndex >= 0 ? htmlString.substring(htmlCloseIndex) : "");
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module paste-from-office/pastefromoffice
*/
/**
* The Paste from Office plugin.
*
* This plugin handles content pasted from Office apps and transforms it (if necessary)
* to a valid structure which can then be understood by the editor features.
*
* Transformation is made by a set of predefined {@link module:paste-from-office/normalizer~PasteFromOfficeNormalizer normalizers}.
* This plugin includes following normalizers:
* * {@link module:paste-from-office/normalizers/mswordnormalizer~PasteFromOfficeMSWordNormalizer Microsoft Word normalizer}
* * {@link module:paste-from-office/normalizers/googledocsnormalizer~GoogleDocsNormalizer Google Docs normalizer}
*
* For more information about this feature check the {@glink api/paste-from-office package page}.
*/
var PasteFromOffice = class extends Plugin {
	/**
	* The priority array of registered normalizers.
	*/
	_normalizers = [];
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "PasteFromOffice";
	}
	/**
	* @inheritDoc
	* @internal
	*/
	static get licenseFeatureCode() {
		return "PFO";
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
	static get isPremiumPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [ClipboardPipeline];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const clipboardPipeline = editor.plugins.get("ClipboardPipeline");
		const viewDocument = editor.editing.view.document;
		const hasMultiLevelListPlugin = this.editor.plugins.has("MultiLevelListEditing");
		const hasTablePropertiesPlugin = this.editor.plugins.has("TablePropertiesEditing");
		const enableSkipLevelLists = !!this.editor.config.get("list.enableSkipLevelLists");
		this.registerNormalizer(new PasteFromOfficeMSWordNormalizer(viewDocument, hasMultiLevelListPlugin, hasTablePropertiesPlugin, enableSkipLevelLists));
		this.registerNormalizer(new GoogleDocsNormalizer(viewDocument));
		this.registerNormalizer(new GoogleSheetsNormalizer(viewDocument));
		viewDocument.on("clipboardInput", (evt, data) => {
			if (typeof data.content != "string") return;
			const htmlString = data.dataTransfer.getData("text/html");
			if (this._normalizers.find(({ normalizer }) => normalizer.isActive(htmlString))) {
				const parsedData = parsePasteOfficeHtml(data.content, viewDocument.stylesProcessor);
				data.content = parsedData.body;
				data.extraContent = {
					...parsedData,
					isTransformedWithPasteFromOffice: true
				};
			}
		}, { priority: priorities.low + 10 });
		clipboardPipeline.on("inputTransformation", (evt, data) => {
			if (!data.extraContent || !data.extraContent.isTransformedWithPasteFromOffice) return;
			const htmlString = data.dataTransfer.getData("text/html");
			const normalizers = this._normalizers.filter(({ normalizer }) => normalizer.isActive(htmlString));
			for (const { normalizer } of normalizers) normalizer.execute(data);
		}, { priority: "high" });
	}
	/**
	* Registers a normalizer with the given priority.
	*/
	registerNormalizer(normalizer, priority) {
		insertToPriorityArray(this._normalizers, {
			normalizer,
			priority: priorities.get(priority)
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { PasteFromOffice, GoogleDocsNormalizer as PasteFromOfficeGoogleDocsNormalizer, GoogleSheetsNormalizer as PasteFromOfficeGoogleSheetsNormalizer, PasteFromOfficeMSWordNormalizer, _convertHexToBase64, convertCssLengthToPx as _convertPasteOfficeCssLengthToPx, isPx as _isPasteOfficePxValue, normalizeSpacerunSpans as _normalizePasteOfficeSpaceRunSpans, normalizeSpacing as _normalizePasteOfficeSpacing, removeGoogleSheetsTag as _removePasteGoogleOfficeSheetsTag, removeMSAttributes as _removePasteMSOfficeAttributes, removeBoldWrapper as _removePasteOfficeBoldWrapper, removeInvalidTableWidth as _removePasteOfficeInvalidTableWidths, removeStyleBlock as _removePasteOfficeStyleBlock, removeXmlns as _removePasteOfficeXmlnsAttributes, replaceImagesSourceWithBase64 as _replacePasteOfficeImagesSourceWithBase64, toPx as _toPasteOfficePxValue, transformBlockBrsToParagraphs as _transformPasteOfficeBlockBrsToParagraphs, transformBookmarks as _transformPasteOfficeBookmarks, transformListItemLikeElementsIntoLists as _transformPasteOfficeListItemLikeElementsIntoLists, transformTables as _transformPasteOfficeTables, unwrapParagraphInListItem as _unwrapPasteOfficeParagraphInListItem, parsePasteOfficeHtml };
//# sourceMappingURL=index.js.map