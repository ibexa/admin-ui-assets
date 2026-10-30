/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { IconShowBlocks } from "@ckeditor/ckeditor5-icons";
import { ButtonView, MenuBarMenuListItemButtonView } from "@ckeditor/ckeditor5-ui";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module show-blocks/showblockscommand
*/
const CLASS_NAME = "ck-show-blocks";
const TEXT_PLACEHOLDER = "__TEXT__";
const SHOW_BLOCKS_LABELS = /* #__PURE__ */ (() => [
	["address", "ADDRESS"],
	["aside", "ASIDE"],
	["blockquote", "BLOCKQUOTE"],
	["details", "DETAILS"],
	["div", "DIV"],
	["footer", "FOOTER"],
	["h1", "H1"],
	["h2", "H2"],
	["h3", "H3"],
	["h4", "H4"],
	["h5", "H5"],
	["h6", "H6"],
	["header", "HEADER"],
	["main", "MAIN"],
	["nav", "NAV"],
	["pre", "PRE"],
	["ol", "OL"],
	["ul", "UL"],
	["p", "P"],
	["section", "SECTION"],
	["figcaption", "FIGCAPTION"]
])();
const SHOW_BLOCKS_LABEL_SVG_TEMPLATE = /* #__PURE__ */ (() => ({
	ltr: `<svg width='120' height='12' xmlns='http://www.w3.org/2000/svg' ><text style='paint-order:stroke fill; clip-path: inset(-3px)' stroke='%23EAEAEA' stroke-width='13' dominant-baseline='middle' fill='black' x='3' y='7' font-size='9px' font-family='Consolas, %22Lucida Console%22, %22Lucida Sans Typewriter%22, %22DejaVu Sans Mono%22, %22Bitstream Vera Sans Mono%22, %22Liberation Mono%22, Monaco, %22Courier New%22, Courier, monospace'>${TEXT_PLACEHOLDER}</text></svg>`,
	rtl: `<svg width='120' height='12' xmlns='http://www.w3.org/2000/svg' ><text style='paint-order:stroke fill; clip-path: inset(-3px); transform:translate(-2px, 0)' stroke='%23EAEAEA' stroke-width='13' dominant-baseline='middle' fill='black' x='100%' text-anchor='end' y='7' font-size='9px' font-family='Consolas, %22Lucida Console%22, %22Lucida Sans Typewriter%22, %22DejaVu Sans Mono%22, %22Bitstream Vera Sans Mono%22, %22Liberation Mono%22, Monaco, %22Courier New%22, Courier, monospace'>${TEXT_PLACEHOLDER}</text></svg>`
}))();
/**
* The show blocks command.
*
* Displays the HTML element names for content blocks.
*/
var ShowBlocksCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		this.affectsData = false;
		this.value = false;
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		const view = this.editor.editing.view;
		this.isEnabled = Array.from(view.document.roots).some((root) => isBlockRoot(this.editor, root));
	}
	/**
	* Toggles the visibility of content blocks.
	* Only roots that accept block-level content are affected.
	*/
	execute() {
		const view = this.editor.editing.view;
		view.change((writer) => {
			for (const root of view.document.roots) {
				if (!isBlockRoot(this.editor, root)) continue;
				if (!root.hasClass(CLASS_NAME)) {
					setBlockLabelStyles(writer, root);
					writer.addClass(CLASS_NAME, root);
					this.value = true;
				} else {
					writer.removeClass(CLASS_NAME, root);
					this.value = false;
				}
			}
		});
	}
};
/**
* Checks whether the given view root corresponds to a model root that accepts block-level content.
* Inline roots (e.g. roots restricted to `$inlineObject` content) are excluded.
*/
function isBlockRoot(editor, root) {
	const modelRoot = editor.model.document.getRoot(root.rootName);
	return editor.model.schema.checkChild(modelRoot, "$block");
}
/**
* Sets the CSS variables with the block labels as background images on the root element.
*/
function setBlockLabelStyles(writer, root) {
	if (root.getStyle("--ck-show-blocks-label-address-ltr")) return;
	for (const [key, label] of SHOW_BLOCKS_LABELS) {
		writer.setStyle(`--ck-show-blocks-label-${key}-ltr`, getLabelUrl(label, "ltr"), root);
		writer.setStyle(`--ck-show-blocks-label-${key}-rtl`, getLabelUrl(label, "rtl"), root);
	}
}
/**
* Generates a data URL with an SVG image containing the label text.
*/
function getLabelUrl(label, direction) {
	return `url("data:image/svg+xml;utf8,${SHOW_BLOCKS_LABEL_SVG_TEMPLATE[direction].replace(TEXT_PLACEHOLDER, label)}")`;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module show-blocks/showblocksediting
*/
/**
* The show blocks editing plugin.
*/
var ShowBlocksEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ShowBlocksEditing";
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
		const { editor } = this;
		editor.commands.add("showBlocks", new ShowBlocksCommand(editor));
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module show-blocks/showblocksui
*/
/**
* The UI plugin of the show blocks feature.
*
* It registers the `'showBlocks'` UI button in the editor's {@link module:ui/componentfactory~ComponentFactory component factory}
* that toggles the visibility of the HTML element names of content blocks.
*/
var ShowBlocksUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ShowBlocksUI";
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
		editor.ui.componentFactory.add("showBlocks", () => {
			const buttonView = this._createButton(ButtonView);
			buttonView.set({
				tooltip: true,
				icon: IconShowBlocks
			});
			return buttonView;
		});
		editor.ui.componentFactory.add("menuBar:showBlocks", () => {
			return this._createButton(MenuBarMenuListItemButtonView);
		});
	}
	/**
	* Creates a button for show blocks command to use either in toolbar or in menu bar.
	*/
	_createButton(ButtonClass) {
		const editor = this.editor;
		const locale = editor.locale;
		const command = editor.commands.get("showBlocks");
		const view = new ButtonClass(locale);
		const t = locale.t;
		view.set({
			label: t("Show blocks"),
			isToggleable: true,
			role: "menuitemcheckbox"
		});
		view.bind("isEnabled").to(command);
		view.bind("isOn").to(command, "value", command, "isEnabled", (value, isEnabled) => value && isEnabled);
		this.listenTo(view, "execute", () => {
			editor.execute("showBlocks");
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
* @module show-blocks/showblocks
*/
/**
* The show blocks feature.
*
* For a detailed overview, check the {@glink features/show-blocks Show blocks} feature guide.
*/
var ShowBlocks = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ShowBlocks";
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
		return [ShowBlocksEditing, ShowBlocksUI];
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { ShowBlocks, ShowBlocksCommand, ShowBlocksEditing, ShowBlocksUI };
//# sourceMappingURL=index.js.map