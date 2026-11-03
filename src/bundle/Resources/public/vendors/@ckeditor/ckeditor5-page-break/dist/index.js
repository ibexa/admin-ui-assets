/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { Widget, findOptimalInsertionRange, toWidget } from "@ckeditor/ckeditor5-widget";
import { IconPageBreak } from "@ckeditor/ckeditor5-icons";
import { ButtonView, MenuBarMenuListItemButtonView } from "@ckeditor/ckeditor5-ui";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module page-break/pagebreakcommand
*/
/**
* The page break command.
*
* The command is registered by {@link module:page-break/pagebreakediting~PageBreakEditing} as `'pageBreak'`.
*
* To insert a page break at the current selection, execute the command:
*
*		editor.execute( 'pageBreak' );
*/
var PageBreakCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	refresh() {
		const model = this.editor.model;
		const schema = model.schema;
		const selection = model.document.selection;
		this.isEnabled = isPageBreakAllowedInParent(selection, schema, model);
	}
	/**
	* Executes the command.
	*
	* @fires execute
	*/
	execute() {
		const model = this.editor.model;
		model.change((writer) => {
			const pageBreakElement = writer.createElement("pageBreak");
			model.insertObject(pageBreakElement, null, null, { setSelection: "after" });
		});
	}
};
/**
* Checks if a page break is allowed by the schema in the optimal insertion parent.
*/
function isPageBreakAllowedInParent(selection, schema, model) {
	const parent = getInsertPageBreakParent(selection, model);
	return schema.checkChild(parent, "pageBreak");
}
/**
* Returns a node that will be used to insert a page break with `model.insertContent` to check if the page break can be placed there.
*/
function getInsertPageBreakParent(selection, model) {
	const parent = findOptimalInsertionRange(selection, model).start.parent;
	if (parent.isEmpty && !parent.is("rootElement")) return parent.parent;
	return parent;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module page-break/pagebreakediting
*/
/**
* The page break editing feature.
*/
var PageBreakEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "PageBreakEditing";
	}
	/**
	* @inheritDoc
	* @internal
	*/
	static get licenseFeatureCode() {
		return "PB";
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
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const t = editor.t;
		const conversion = editor.conversion;
		schema.register("pageBreak", { inheritAllFrom: "$blockObject" });
		conversion.for("dataDowncast").elementToStructure({
			model: "pageBreak",
			view: (modelElement, { writer }) => {
				return writer.createContainerElement("div", {
					class: "page-break",
					style: "page-break-after: always"
				}, writer.createContainerElement("span", { style: "display: none" }));
			}
		});
		conversion.for("editingDowncast").elementToStructure({
			model: "pageBreak",
			view: (modelElement, { writer }) => {
				const label = t("Page break");
				const viewWrapper = writer.createContainerElement("div");
				const viewLabelElement = writer.createRawElement("span", { class: "page-break__label" }, function(domElement) {
					domElement.innerText = t("Page break");
				});
				writer.addClass("page-break", viewWrapper);
				writer.insert(writer.createPositionAt(viewWrapper, 0), viewLabelElement);
				return toPageBreakWidget(viewWrapper, writer, label);
			}
		});
		conversion.for("upcast").elementToElement({
			view: (element) => {
				const hasPageBreakBefore = element.getStyle("page-break-before") == "always";
				const hasPageBreakAfter = element.getStyle("page-break-after") == "always";
				if (!hasPageBreakBefore && !hasPageBreakAfter) return null;
				if (element.childCount == 1) {
					const viewSpan = element.getChild(0);
					if (!viewSpan.is("element", "span") || viewSpan.getStyle("display") != "none") return null;
				} else if (element.childCount > 1) return null;
				return {
					name: true,
					styles: [...hasPageBreakBefore ? ["page-break-before"] : [], ...hasPageBreakAfter ? ["page-break-after"] : []],
					...element.hasClass("page-break") && { classes: ["page-break"] }
				};
			},
			model: "pageBreak",
			converterPriority: "high"
		});
		editor.commands.add("pageBreak", new PageBreakCommand(editor));
	}
};
/**
* Converts a given {@link module:engine/view/element~ViewElement} to a page break widget:
* * Adds a {@link module:engine/view/element~ViewElement#_setCustomProperty custom property} allowing to
*   recognize the page break widget element.
* * Calls the {@link module:widget/utils~toWidget} function with the proper element's label creator.
*/
function toPageBreakWidget(viewElement, writer, label) {
	writer.setCustomProperty("pageBreak", true, viewElement);
	return toWidget(viewElement, writer, { label });
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module page-break/pagebreakui
*/
/**
* The page break UI plugin.
*/
var PageBreakUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "PageBreakUI";
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
		editor.ui.componentFactory.add("pageBreak", () => {
			const view = this._createButton(ButtonView);
			view.set({ tooltip: true });
			return view;
		});
		editor.ui.componentFactory.add("menuBar:pageBreak", () => this._createButton(MenuBarMenuListItemButtonView));
	}
	/**
	* Creates a button for page break command to use either in toolbar or in menu bar.
	*/
	_createButton(ButtonClass) {
		const editor = this.editor;
		const locale = editor.locale;
		const command = editor.commands.get("pageBreak");
		const view = new ButtonClass(editor.locale);
		const t = locale.t;
		view.set({
			label: t("Page break"),
			icon: IconPageBreak
		});
		view.bind("isEnabled").to(command, "isEnabled");
		this.listenTo(view, "execute", () => {
			editor.execute("pageBreak");
			editor.editing.view.focus();
		});
		return view;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module page-break/pagebreak
*/
/**
* The page break feature.
*
* It provides the possibility to insert a page break into the rich-text editor.
*
* For a detailed overview, check the {@glink features/page-break Page break feature} documentation.
*/
var PageBreak = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [
			PageBreakEditing,
			PageBreakUI,
			Widget
		];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "PageBreak";
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

export { PageBreak, PageBreakCommand, PageBreakEditing, PageBreakUI };
//# sourceMappingURL=index.js.map