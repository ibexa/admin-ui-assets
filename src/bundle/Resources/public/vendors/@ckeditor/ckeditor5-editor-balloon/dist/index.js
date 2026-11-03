/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Editor, ElementApiMixin, attachToForm, normalizeRootsConfig, normalizeSingleRootEditorConstructorParams, registerAndInitializeRootConfigAttributes, rootAcceptsBlocks, secureSourceElement, verifyRootElements } from "@ckeditor/ckeditor5-core";
import { BalloonToolbar, EditorUI, EditorUIView, InlineEditableUIView, MenuBarView } from "@ckeditor/ckeditor5-ui";
import { enableViewPlaceholder } from "@ckeditor/ckeditor5-engine";
import { isElement } from "es-toolkit/compat";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-balloon/ballooneditorui
*/
/**
* The balloon editor UI class.
*/
var BalloonEditorUI = class extends EditorUI {
	/**
	* The main (top–most) view of the editor UI.
	*/
	view;
	/**
	* Creates an instance of the balloon editor UI class.
	*
	* @param editor The editor instance.
	* @param view The view of the UI.
	*/
	constructor(editor, view) {
		super(editor);
		this.view = view;
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
		this.initMenuBar(this.view.menuBarView);
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
* @module editor-balloon/ballooneditoruiview
*/
/**
* Contextual editor UI view. Uses the {@link module:ui/editableui/inline/inlineeditableuiview~InlineEditableUIView}.
*/
var BalloonEditorUIView = class extends EditorUIView {
	/**
	* Editable UI view.
	*/
	editable;
	/**
	* Menu bar view instance.
	*/
	menuBarView;
	/**
	* Creates an instance of the balloon editor UI view.
	*
	* @param locale The {@link module:core/editor/editor~Editor#locale} instance.
	* @param editingView The editing view instance this view is related to.
	* @param editableElement The editable element. If not specified, it will be automatically created by
	* {@link module:ui/editableui/editableuiview~EditableUIView}. Otherwise, the given element will be used.
	* @param label When set, this value will be used as an accessible `aria-label` of the
	* {@link module:ui/editableui/editableuiview~EditableUIView editable view}.
	*/
	constructor(locale, editingView, editableElement, label) {
		super(locale);
		this.editable = new InlineEditableUIView(locale, editingView, editableElement, { label });
		this.menuBarView = new MenuBarView(locale);
		this.menuBarView.extendTemplate({ attributes: {
			class: ["ck-reset_all", "ck-rounded-corners"],
			dir: locale.uiLanguageDirection
		} });
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		this.registerChild(this.editable);
		this.registerChild(this.menuBarView);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-balloon/ballooneditor
*/
const BalloonEditorBase = /* #__PURE__ */ ElementApiMixin(Editor);
/**
* The balloon editor implementation (Medium-like editor).
* It uses an inline editable and a toolbar based on the {@link module:ui/toolbar/balloon/balloontoolbar~BalloonToolbar}.
* See the {@glink examples/builds/balloon-editor demo}.
*
* In order to create a balloon editor instance, use the static
* {@link module:editor-balloon/ballooneditor~BalloonEditor.create `BalloonEditor.create()`} method.
*/
var BalloonEditor = class extends BalloonEditorBase {
	/**
	* @inheritDoc
	*/
	static get editorName() {
		return "BalloonEditor";
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
		const plugins = this.config.get("plugins");
		plugins.push(BalloonToolbar);
		this.config.set("plugins", plugins);
		this.config.define("balloonToolbar", this.config.get("toolbar"));
		this.model.document.createRoot(this.config.get("roots").main.modelElement);
		registerAndInitializeRootConfigAttributes(this);
		const view = new BalloonEditorUIView(this.locale, this.editing.view, editableElement, this.config.get("roots").main.label);
		this.ui = new BalloonEditorUI(this, view);
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

export { BalloonEditor, BalloonEditorUI, BalloonEditorUIView };
//# sourceMappingURL=index.js.map