/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Editor, ElementApiMixin, attachToForm, normalizeRootsConfig, normalizeSingleRootEditorConstructorParams, registerAndInitializeRootConfigAttributes, rootAcceptsBlocks, secureSourceElement, verifyRootElements } from "@ckeditor/ckeditor5-core";
import { BalloonPanelView, EditorUI, EditorUIView, InlineEditableUIView, MenuBarView, ToolbarView, normalizeToolbarConfig } from "@ckeditor/ckeditor5-ui";
import { enableViewPlaceholder } from "@ckeditor/ckeditor5-engine";
import { Rect, ResizeObserver, toUnit } from "@ckeditor/ckeditor5-utils";
import { isElement } from "es-toolkit/compat";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-inline/inlineeditorui
*/
/**
* The inline editor UI class.
*
* @extends module:ui/editorui/editorui~EditorUI
*/
var InlineEditorUI = class extends EditorUI {
	/**
	* The main (top–most) view of the editor UI.
	*/
	view;
	/**
	* A normalized `config.toolbar` object.
	*/
	_toolbarConfig;
	/**
	* Creates an instance of the inline editor UI class.
	*
	* @param editor The editor instance.
	* @param view The view of the UI.
	*/
	constructor(editor, view) {
		super(editor);
		this.view = view;
		this._toolbarConfig = normalizeToolbarConfig(editor.config.get("toolbar"));
	}
	/**
	* @inheritDoc
	*/
	get element() {
		return this.view.editable.element;
	}
	/**
	* Initializes the UI.
	*/
	init() {
		const editor = this.editor;
		const view = this.view;
		const editingView = editor.editing.view;
		const editable = view.editable;
		const editingRoot = editingView.document.getRoot();
		editable.name = editingRoot.rootName;
		editable.isInlineRoot = !rootAcceptsBlocks(editor, editingRoot.rootName);
		view.render();
		const editableElement = editable.element;
		this.setEditableElement(editable.name, editableElement);
		editable.bind("isFocused").to(this.focusTracker);
		editingView.attachDomRoot(editableElement);
		this._initPlaceholder();
		this._initToolbar();
		if (view.menuBarView) this.initMenuBar(view.menuBarView);
		this.fire("ready");
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		const view = this.view;
		const editingView = this.editor.editing.view;
		if (editingView.getDomRoot(view.editable.name)) editingView.detachDomRoot(view.editable.name);
		view.destroy();
	}
	/**
	* Initializes the inline editor toolbar and its panel.
	*/
	_initToolbar() {
		const editor = this.editor;
		const view = this.view;
		const editableElement = view.editable.element;
		const toolbar = view.toolbar;
		view.panel.bind("isVisible").to(this.focusTracker, "isFocused");
		view.bind("viewportTopOffset").to(this, "viewportOffset", ({ visualTop }) => visualTop || 0);
		view.listenTo(editor.ui, "update", () => {
			if (view.panel.isVisible) view.panel.pin({
				target: editableElement,
				positions: view.panelPositions
			});
		});
		toolbar.fillFromConfig(this._toolbarConfig, this.componentFactory);
		this.addToolbar(toolbar);
	}
	/**
	* Enable the placeholder text on the editing root.
	*/
	_initPlaceholder() {
		const editor = this.editor;
		const editingView = editor.editing.view;
		const editingRoot = editingView.document.getRoot();
		const placeholder = editor.config.get("roots")[editingRoot.rootName].placeholder;
		if (placeholder) editingRoot.placeholder = placeholder;
		enableViewPlaceholder({
			view: editingView,
			element: editingRoot,
			isDirectHost: this.view.editable.isInlineRoot,
			keepOnFocus: true
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-inline/inlineeditoruiview
*/
const toPx = /* #__PURE__ */ toUnit("px");
/**
* Inline editor UI view. Uses an nline editable and a floating toolbar.
*/
var InlineEditorUIView = class extends EditorUIView {
	/**
	* A floating toolbar view instance.
	*/
	toolbar;
	/**
	* A balloon panel view instance.
	*/
	panel;
	/**
	* A set of positioning functions used by the {@link #panel} to float around
	* {@link #element editableElement}.
	*
	* The positioning functions are as follows:
	*
	* * West:
	*
	* ```
	* [ Panel ]
	* +------------------+
	* | #editableElement |
	* +------------------+
	*
	* +------------------+
	* | #editableElement |
	* |[ Panel ]         |
	* |                  |
	* +------------------+
	*
	* +------------------+
	* | #editableElement |
	* +------------------+
	* [ Panel ]
	* ```
	*
	* * East:
	*
	* ```
	*            [ Panel ]
	* +------------------+
	* | #editableElement |
	* +------------------+
	*
	* +------------------+
	* | #editableElement |
	* |         [ Panel ]|
	* |                  |
	* +------------------+
	*
	* +------------------+
	* | #editableElement |
	* +------------------+
	*            [ Panel ]
	* ```
	*
	* See: {@link module:utils/dom/position~DomOptimalPositionOptions#positions}.
	*/
	panelPositions;
	/**
	* Editable UI view.
	*/
	editable;
	/**
	* An instance of the resize observer that helps dynamically determine the geometry of the toolbar
	* and manage items that do not fit into a single row.
	*
	* **Note:** Created in {@link #render}.
	*/
	_resizeObserver;
	/**
	* Creates an instance of the inline editor UI view.
	*
	* @param locale The {@link module:core/editor/editor~Editor#locale} instance.
	* @param editingView The editing view instance this view is related to.
	* @param editableElement The editable element. If not specified, it will be automatically created by
	* {@link module:ui/editableui/editableuiview~EditableUIView}. Otherwise, the given element will be used.
	* @param options Configuration options for the view instance.
	* @param options.shouldToolbarGroupWhenFull When set `true` enables automatic items grouping
	* in the main {@link module:editor-inline/inlineeditoruiview~InlineEditorUIView#toolbar toolbar}.
	* See {@link module:ui/toolbar/toolbarview~ToolbarOptions#shouldGroupWhenFull} to learn more.
	* @param options.label When set, this value will be used as an accessible `aria-label` of the
	* {@link module:ui/editableui/editableuiview~EditableUIView editable view}.
	*/
	constructor(locale, editingView, editableElement, options = {}) {
		super(locale);
		this.toolbar = new ToolbarView(locale, {
			shouldGroupWhenFull: options.shouldToolbarGroupWhenFull,
			isFloating: true
		});
		if (options.useMenuBar) this.menuBarView = new MenuBarView(locale);
		this.set("viewportTopOffset", 0);
		this.panel = new BalloonPanelView(locale);
		this.panelPositions = this._getPanelPositions();
		this.panel.extendTemplate({ attributes: { class: "ck-toolbar-container" } });
		this.editable = new InlineEditableUIView(locale, editingView, editableElement, { label: options.label });
		this._resizeObserver = null;
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		this.body.add(this.panel);
		this.registerChild(this.editable);
		if (this.menuBarView) this.panel.content.addMany([this.menuBarView, this.toolbar]);
		else this.panel.content.add(this.toolbar);
		if (this.toolbar.options.shouldGroupWhenFull) {
			const editableElement = this.editable.element;
			this._resizeObserver = new ResizeObserver(editableElement, () => {
				this.toolbar.maxWidth = toPx(new Rect(editableElement).width);
			});
		}
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		if (this._resizeObserver) this._resizeObserver.destroy();
	}
	/**
	* Determines the panel top position of the {@link #panel} in {@link #panelPositions}.
	*
	* @param editableRect Rect of the {@link #element}.
	* @param panelRect Rect of the {@link #panel}.
	*/
	_getPanelPositionTop(editableRect, panelRect) {
		let top;
		if (editableRect.top > panelRect.height + this.viewportTopOffset) top = editableRect.top - panelRect.height;
		else if (editableRect.bottom > panelRect.height + this.viewportTopOffset + 50) top = this.viewportTopOffset;
		else top = editableRect.bottom;
		return top;
	}
	/**
	* Returns the positions for {@link #panelPositions}.
	*
	* See: {@link module:utils/dom/position~DomOptimalPositionOptions#positions}.
	*/
	_getPanelPositions() {
		const positions = [(editableRect, panelRect) => {
			return {
				top: this._getPanelPositionTop(editableRect, panelRect),
				left: editableRect.left,
				name: "toolbar_west",
				config: { withArrow: false }
			};
		}, (editableRect, panelRect) => {
			return {
				top: this._getPanelPositionTop(editableRect, panelRect),
				left: editableRect.left + editableRect.width - panelRect.width,
				name: "toolbar_east",
				config: { withArrow: false }
			};
		}];
		if (this.locale.uiLanguageDirection === "ltr") return positions;
		else return positions.reverse();
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-inline/inlineeditor
*/
const InlineEditorBase = /* #__PURE__ */ ElementApiMixin(Editor);
/**
* The inline editor implementation. It uses an inline editable and a floating toolbar.
* See the {@glink examples/builds/inline-editor demo}.
*
* In order to create a inline editor instance, use the static
* {@link module:editor-inline/inlineeditor~InlineEditor.create `InlineEditor.create()`} method.
*/
var InlineEditor = class extends InlineEditorBase {
	/**
	* @inheritDoc
	*/
	static get editorName() {
		return "InlineEditor";
	}
	/**
	* @inheritDoc
	*/
	ui;
	constructor(sourceElementOrDataOrConfig, config = {}) {
		const { sourceElementOrData, editorConfig } = normalizeSingleRootEditorConstructorParams(sourceElementOrDataOrConfig, config);
		super(editorConfig);
		normalizeRootsConfig(sourceElementOrData, this.config);
		const editableElement = this.config.get("roots").main.element;
		if (isElement$1(editableElement)) {
			this.sourceElement = editableElement;
			secureSourceElement(this, editableElement);
		}
		this.config.define("menuBar.isVisible", false);
		this.model.document.createRoot(this.config.get("roots").main.modelElement);
		registerAndInitializeRootConfigAttributes(this);
		const shouldToolbarGroupWhenFull = !this.config.get("toolbar.shouldNotGroupWhenFull");
		const menuBarConfig = this.config.get("menuBar");
		const view = new InlineEditorUIView(this.locale, this.editing.view, editableElement, {
			shouldToolbarGroupWhenFull,
			useMenuBar: menuBarConfig.isVisible,
			label: this.config.get("roots").main.label
		});
		this.ui = new InlineEditorUI(this, view);
		attachToForm(this);
	}
	/**
	* Destroys the editor instance, releasing all resources used by it.
	*
	* Updates the original editor element with the data if the
	* {@link module:core/editor/editorconfig~EditorConfig#updateSourceElementOnDestroy `updateSourceElementOnDestroy`}
	* configuration option is set to `true`.
	*/
	async destroy() {
		const data = this.getData();
		this.ui.destroy();
		await super.destroy();
		if (this.sourceElement) this.updateSourceElement(data);
	}
	static async create(sourceElementOrDataOrConfig, config = {}) {
		const editor = new this(sourceElementOrDataOrConfig, config);
		await editor.initPlugins();
		verifyRootElements(editor);
		await editor.ui.init();
		await editor.data.init(editor.config.get("roots").main.initialData);
		editor.fire("ready");
		return editor;
	}
};
function isElement$1(value) {
	return isElement(value);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { InlineEditor, InlineEditorUI, InlineEditorUIView };
//# sourceMappingURL=index.js.map