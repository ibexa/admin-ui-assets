/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Editor, ElementApiMixin, normalizeRootsConfig, normalizeSingleRootEditorConstructorParams, registerAndInitializeRootConfigAttributes, rootAcceptsBlocks, secureSourceElement, verifyRootElements } from "@ckeditor/ckeditor5-core";
import { EditorUI, EditorUIView, InlineEditableUIView, MenuBarView, ToolbarView } from "@ckeditor/ckeditor5-ui";
import { enableViewPlaceholder } from "@ckeditor/ckeditor5-engine";
import { isElement } from "es-toolkit/compat";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-decoupled/decouplededitorui
*/
/**
* The decoupled editor UI class.
*/
var DecoupledEditorUI = class extends EditorUI {
	/**
	* The main (top–most) view of the editor UI.
	*/
	view;
	/**
	* Creates an instance of the decoupled editor UI class.
	*
	* @param editor The editor instance.
	* @param view The view of the UI.
	*/
	constructor(editor, view) {
		super(editor);
		this.view = view;
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
		view.editable.bind("isFocused").to(this.focusTracker);
		editingView.attachDomRoot(editableElement);
		this._initPlaceholder();
		this._initToolbar();
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
	* Initializes the inline editor toolbar and its panel.
	*/
	_initToolbar() {
		const editor = this.editor;
		const view = this.view;
		view.toolbar.fillFromConfig(editor.config.get("toolbar"), this.componentFactory);
		this.addToolbar(view.toolbar);
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
* @module editor-decoupled/decouplededitoruiview
*/
/**
* The decoupled editor UI view. It is a virtual view providing an inline
* {@link module:editor-decoupled/decouplededitoruiview~DecoupledEditorUIView#editable},
* {@link module:editor-decoupled/decouplededitoruiview~DecoupledEditorUIView#toolbar}, and a
* {@link module:editor-decoupled/decouplededitoruiview~DecoupledEditorUIView#menuBarView} but without any
* specific arrangement of the components in the DOM.
*
* See {@link module:editor-decoupled/decouplededitor~DecoupledEditor.create `DecoupledEditor.create()`}
* to learn more about this view.
*/
var DecoupledEditorUIView = class extends EditorUIView {
	/**
	* The main toolbar of the decoupled editor UI.
	*/
	toolbar;
	/**
	* The editable of the decoupled editor UI.
	*/
	editable;
	/**
	* Menu bar view instance.
	*/
	menuBarView;
	/**
	* Creates an instance of the decoupled editor UI view.
	*
	* @param locale The {@link module:core/editor/editor~Editor#locale} instance.
	* @param editingView The editing view instance this view is related to.
	* @param options Configuration options for the view instance.
	* @param options.editableElement The editable element. If not specified, it will be automatically created by
	* {@link module:ui/editableui/editableuiview~EditableUIView}. Otherwise, the given element will be used.
	* @param options.shouldToolbarGroupWhenFull When set `true` enables automatic items grouping
	* in the main {@link module:editor-decoupled/decouplededitoruiview~DecoupledEditorUIView#toolbar toolbar}.
	* See {@link module:ui/toolbar/toolbarview~ToolbarOptions#shouldGroupWhenFull} to learn more.
	* @param options.label When set, this value will be used as an accessible `aria-label` of the
	* {@link module:ui/editableui/editableuiview~EditableUIView editable view}.
	*/
	constructor(locale, editingView, options = {}) {
		super(locale);
		this.toolbar = new ToolbarView(locale, { shouldGroupWhenFull: options.shouldToolbarGroupWhenFull });
		this.menuBarView = new MenuBarView(locale);
		this.editable = new InlineEditableUIView(locale, editingView, options.editableElement, { label: options.label });
		this.toolbar.extendTemplate({ attributes: {
			class: ["ck-reset_all", "ck-rounded-corners"],
			dir: locale.uiLanguageDirection
		} });
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
		this.registerChild([
			this.menuBarView,
			this.toolbar,
			this.editable
		]);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-decoupled/decouplededitor
*/
const DecoupledEditorBase = /* #__PURE__ */ ElementApiMixin(Editor);
/**
* The decoupled editor implementation. It provides an inline editable and a toolbar. However, unlike other editors,
* it does not render these components anywhere in the DOM unless configured.
*
* This type of an editor is dedicated to integrations which require a customized UI with an open
* structure, allowing developers to specify the exact location of the interface.
*
* See the document editor {@glink examples/builds/document-editor demo} to learn about possible use cases
* for the decoupled editor.
*
* In order to create a decoupled editor instance, use the static
* {@link module:editor-decoupled/decouplededitor~DecoupledEditor.create `DecoupledEditor.create()`} method.
*
* Note that you will need to attach the editor toolbar and menu bar to your web page manually, in a desired place,
* after the editor is initialized.
*/
var DecoupledEditor = class extends DecoupledEditorBase {
	/**
	* @inheritDoc
	*/
	static get editorName() {
		return "DecoupledEditor";
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
		this.model.document.createRoot(this.config.get("roots").main.modelElement);
		registerAndInitializeRootConfigAttributes(this);
		const shouldToolbarGroupWhenFull = !this.config.get("toolbar.shouldNotGroupWhenFull");
		const view = new DecoupledEditorUIView(this.locale, this.editing.view, {
			editableElement,
			shouldToolbarGroupWhenFull,
			label: this.config.get("roots").main.label
		});
		this.ui = new DecoupledEditorUI(this, view);
	}
	/**
	* Destroys the editor instance, releasing all resources used by it.
	*
	* Updates the original editor element with the data if the
	* {@link module:core/editor/editorconfig~EditorConfig#updateSourceElementOnDestroy `updateSourceElementOnDestroy`}
	* configuration option is set to `true`.
	*
	* **Note**: The decoupled editor does not remove the toolbar and editable when destroyed. You can
	* do that yourself in the destruction chain:
	*
	* ```ts
	* editor.destroy()
	* 	.then( () => {
	* 		// Remove the toolbar from DOM.
	* 		editor.ui.view.toolbar.element.remove();
	*
	* 		// Remove the editable from DOM.
	* 		editor.ui.view.editable.element.remove();
	*
	* 		console.log( 'Editor was destroyed' );
	* 	} );
	* ```
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

export { DecoupledEditor, DecoupledEditorUI, DecoupledEditorUIView };
//# sourceMappingURL=index.js.map