/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { BubblingEventInfo, Observer, ViewDocumentDomEventData } from "@ckeditor/ckeditor5-engine";
import { env } from "@ckeditor/ckeditor5-utils";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Returns attributes that should be preserved on the enter keystroke.
*
* Filtering is realized based on `copyOnEnter` attribute property. Read more about attribute properties
* {@link module:engine/model/schema~ModelSchema#setAttributeProperties here}.
*
* @param schema Model's schema.
* @param allAttributes Attributes to filter.
* @internal
*/
function* getCopyOnEnterAttributes(schema, allAttributes) {
	for (const attribute of allAttributes) if (attribute && schema.getAttributeProperties(attribute[0]).copyOnEnter) yield attribute;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module enter/entercommand
*/
/**
* Enter command used by the {@link module:enter/enter~Enter Enter feature} to handle the <kbd>Enter</kbd> keystroke.
*/
var EnterCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	execute() {
		this.editor.model.change((writer) => {
			this.enterBlock(writer);
			this.fire("afterExecute", { writer });
		});
	}
	/**
	* Splits a block where the document selection is placed, in the way how the <kbd>Enter</kbd> key is expected to work:
	*
	* ```
	* <p>Foo[]bar</p>   ->   <p>Foo</p><p>[]bar</p>
	* <p>Foobar[]</p>   ->   <p>Foobar</p><p>[]</p>
	* <p>Fo[ob]ar</p>   ->   <p>Fo</p><p>[]ar</p>
	* ```
	*
	* In some cases, the split will not happen:
	*
	* ```
	* // The selection parent is a limit element:
	* <figcaption>A[bc]d</figcaption>   ->   <figcaption>A[]d</figcaption>
	*
	* // The selection spans over multiple elements:
	* <h>x[x</h><p>y]y<p>   ->   <h>x</h><p>[]y</p>
	* ```
	*
	* @param writer Writer to use when performing the enter action.
	* @returns Boolean indicating if the block was split.
	*/
	enterBlock(writer) {
		const model = this.editor.model;
		const selection = model.document.selection;
		const schema = model.schema;
		const isSelectionEmpty = selection.isCollapsed;
		const range = selection.getFirstRange();
		const startElement = range.start.parent;
		const endElement = range.end.parent;
		if (schema.isLimit(startElement) || schema.isLimit(endElement)) {
			if (!isSelectionEmpty && startElement == endElement) model.deleteContent(selection);
			return false;
		}
		if (isSelectionEmpty) {
			const attributesToCopy = getCopyOnEnterAttributes(writer.model.schema, selection.getAttributes());
			splitBlock(writer, range.start);
			writer.setSelectionAttribute(attributesToCopy);
			return true;
		} else {
			const leaveUnmerged = !(range.start.isAtStart && range.end.isAtEnd);
			const isContainedWithinOneElement = startElement == endElement;
			model.deleteContent(selection, { leaveUnmerged });
			if (leaveUnmerged) {
				if (isContainedWithinOneElement) {
					splitBlock(writer, selection.focus);
					return true;
				} else writer.setSelection(endElement, 0);
			}
		}
		return false;
	}
};
function splitBlock(writer, splitPos) {
	writer.split(splitPos);
	writer.setSelection(splitPos.parent.nextSibling, 0);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module enter/enterobserver
*/
const ENTER_EVENT_TYPES = {
	insertParagraph: { isSoft: false },
	insertLineBreak: { isSoft: true }
};
/**
* Enter observer introduces the {@link module:engine/view/document~ViewDocument#event:enter `Document#enter`} event.
*/
var EnterObserver = class extends Observer {
	/**
	* @inheritDoc
	*/
	constructor(view) {
		super(view);
		const doc = this.document;
		let shiftPressed = false;
		doc.on("keydown", (evt, data) => {
			shiftPressed = data.shiftKey;
		});
		doc.on("beforeinput", (evt, data) => {
			if (!this.isEnabled) return;
			let inputType = data.inputType;
			if (env.isSafari && shiftPressed && inputType == "insertParagraph") inputType = "insertLineBreak";
			const domEvent = data.domEvent;
			const enterEventSpec = ENTER_EVENT_TYPES[inputType];
			if (!enterEventSpec) return;
			const event = new BubblingEventInfo(doc, "enter", data.targetRanges[0]);
			doc.fire(event, new ViewDocumentDomEventData(view, domEvent, { isSoft: enterEventSpec.isSoft }));
			if (event.stop.called) evt.stop();
		});
	}
	/**
	* @inheritDoc
	*/
	observe() {}
	/**
	* @inheritDoc
	*/
	stopObserving() {}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module enter/enter
*/
/**
* This plugin handles the <kbd>Enter</kbd> keystroke (hard line break) in the editor.
*
* See also the {@link module:enter/shiftenter~ShiftEnter} plugin.
*
* For more information about this feature see the {@glink api/enter package page}.
*/
var Enter = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "Enter";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	init() {
		const editor = this.editor;
		const view = editor.editing.view;
		const viewDocument = view.document;
		const t = this.editor.t;
		view.addObserver(EnterObserver);
		editor.commands.add("enter", new EnterCommand(editor));
		this.listenTo(viewDocument, "enter", (evt, data) => {
			if (!viewDocument.isComposing) data.preventDefault();
			if (data.isSoft) return;
			editor.execute("enter");
			view.scrollToTheSelection();
		}, { priority: "low" });
		editor.accessibility.addKeystrokeInfos({ keystrokes: [{
			label: t("Insert a hard break (a new paragraph)"),
			keystroke: "Enter"
		}] });
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module enter/shiftentercommand
*/
/**
* ShiftEnter command. It is used by the {@link module:enter/shiftenter~ShiftEnter ShiftEnter feature} to handle
* the <kbd>Shift</kbd>+<kbd>Enter</kbd> keystroke.
*/
var ShiftEnterCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	execute() {
		const model = this.editor.model;
		const doc = model.document;
		model.change((writer) => {
			softBreakAction(model, writer, doc.selection);
			this.fire("afterExecute", { writer });
		});
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		const model = this.editor.model;
		const doc = model.document;
		this.isEnabled = isEnabled(model.schema, doc.selection);
	}
};
/**
* Checks whether the ShiftEnter command should be enabled in the specified selection.
*/
function isEnabled(schema, selection) {
	if (selection.rangeCount > 1) return false;
	const anchorPos = selection.anchor;
	if (!anchorPos || !schema.checkChild(anchorPos, "softBreak")) return false;
	const range = selection.getFirstRange();
	const startElement = range.start.parent;
	const endElement = range.end.parent;
	if ((isInsideLimitElement(startElement, schema) || isInsideLimitElement(endElement, schema)) && startElement !== endElement) return false;
	return true;
}
/**
* Creates a break in the way that the <kbd>Shift</kbd>+<kbd>Enter</kbd> keystroke is expected to work.
*/
function softBreakAction(model, writer, selection) {
	const isSelectionEmpty = selection.isCollapsed;
	const range = selection.getFirstRange();
	const startElement = range.start.parent;
	const endElement = range.end.parent;
	const isContainedWithinOneElement = startElement == endElement;
	if (isSelectionEmpty) insertBreak(model, writer, range.end, selection.getAttributes());
	else {
		const leaveUnmerged = !(range.start.isAtStart && range.end.isAtEnd);
		model.deleteContent(selection, { leaveUnmerged });
		if (isContainedWithinOneElement) insertBreak(model, writer, selection.focus, selection.getAttributes());
		else if (leaveUnmerged) writer.setSelection(endElement, 0);
	}
}
/**
* Inserts a softBreak with applicable attributes.
*/
function insertBreak(model, writer, position, selectionAttributes) {
	const attributes = Array.from(getCopyOnEnterAttributes(model.schema, selectionAttributes));
	const breakLineElement = writer.createElement("softBreak", attributes);
	model.insertContent(breakLineElement, position);
	writer.setSelection(breakLineElement, "after");
}
/**
* Checks whether the specified `element` is a child of the limit element.
*
* Checking whether the `<p>` element is inside a limit element:
*   - `<$root><p>Text.</p></$root> => false`
*   - `<$root><limitElement><p>Text</p></limitElement></$root> => true`
*/
function isInsideLimitElement(element, schema) {
	if (element.is("rootElement")) return false;
	return schema.isLimit(element) || isInsideLimitElement(element.parent, schema);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module enter/shiftenter
*/
/**
* This plugin handles the <kbd>Shift</kbd>+<kbd>Enter</kbd> keystroke (soft line break) in the editor.
*
* See also the {@link module:enter/enter~Enter} plugin.
*
* For more information about this feature see the {@glink api/enter package page}.
*/
var ShiftEnter = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ShiftEnter";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const conversion = editor.conversion;
		const view = editor.editing.view;
		const viewDocument = view.document;
		const t = this.editor.t;
		schema.register("softBreak", {
			allowWhere: "$text",
			allowAttributesOf: "$text",
			isInline: true
		});
		conversion.for("upcast").elementToElement({
			model: "softBreak",
			view: "br"
		});
		conversion.for("downcast").elementToElement({
			model: "softBreak",
			view: (modelElement, { writer }) => writer.createEmptyElement("br")
		});
		view.addObserver(EnterObserver);
		editor.commands.add("shiftEnter", new ShiftEnterCommand(editor));
		editor.model.document.registerPostFixer((writer) => removeStaleSoftBreakAttributes(writer));
		this.listenTo(viewDocument, "enter", (evt, data) => {
			if (!viewDocument.isComposing) data.preventDefault();
			if (!data.isSoft) return;
			editor.execute("shiftEnter");
			view.scrollToTheSelection();
		}, { priority: "low" });
		editor.accessibility.addKeystrokeInfos({ keystrokes: [{
			label: t("Insert a soft break (a <code>&lt;br&gt;</code> element)"),
			keystroke: "Shift+Enter"
		}] });
	}
};
/**
* The post-fixer that removes attributes from stale soft-break elements.
*/
function removeStaleSoftBreakAttributes(writer) {
	const parentsToCheck = /* @__PURE__ */ new Set();
	for (const change of writer.model.document.differ.getChanges()) if (change.type == "insert" || change.type == "remove") {
		/* v8 ignore else -- @preserve */
		if (change.position.parent.is("element")) parentsToCheck.add(change.position.parent);
	} else if (change.type == "attribute") {
		/* v8 ignore else -- @preserve */
		if (change.range.start.parent.is("element")) parentsToCheck.add(change.range.start.parent);
	}
	let wasChanged = false;
	for (const parent of parentsToCheck) for (const child of parent.getChildren()) {
		if (!child.is("element", "softBreak")) continue;
		const nextSibling = child.nextSibling;
		if (!nextSibling || nextSibling.is("element")) continue;
		const attributesToRemove = Array.from(child.getAttributes()).filter(([key, value]) => !hasSameAttribute(nextSibling, key, value));
		for (const [key] of attributesToRemove) {
			writer.removeAttribute(key, child);
			wasChanged = true;
		}
	}
	return wasChanged;
}
/**
* Returns `true` if the given node has the same attribute as the one provided in the parameters.
*/
function hasSameAttribute(node, key, value) {
	return node?.getAttribute(key) === value;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { Enter, EnterCommand, EnterObserver, ShiftEnter, ShiftEnterCommand, getCopyOnEnterAttributes as _getCopyOnEnterAttributes };
//# sourceMappingURL=index.js.map