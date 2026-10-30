/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { CKEditorError, ElementReplacer, Rect } from "@ckeditor/ckeditor5-utils";
import { Editor, ElementApiMixin, attachToForm, normalizeRootsConfig, normalizeSingleRootEditorConstructorParams, registerAndInitializeRootConfigAttributes, rootAcceptsBlocks, verifyRootElements } from "@ckeditor/ckeditor5-core";
import { BoxedEditorUIView, DialogView, EditorUI, InlineEditableUIView, MenuBarView, StickyPanelView, ToolbarView, normalizeToolbarConfig } from "@ckeditor/ckeditor5-ui";
import { enableViewPlaceholder } from "@ckeditor/ckeditor5-engine";
import { isElement } from "es-toolkit/compat";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-classic/classiceditorui
*/
/**
* The classic editor UI class.
*/
var ClassicEditorUI = class extends EditorUI {
	/**
	* The main (top–most) view of the editor UI.
	*/
	view;
	/**
	* A normalized `config.toolbar` object.
	*/
	_toolbarConfig;
	/**
	* The element replacer instance used to hide the editor's source element.
	*/
	_elementReplacer;
	/**
	* Creates an instance of the classic editor UI class.
	*
	* @param editor The editor instance.
	* @param view The view of the UI.
	*/
	constructor(editor, view) {
		super(editor);
		this.view = view;
		this._toolbarConfig = normalizeToolbarConfig(editor.config.get("toolbar"));
		this._elementReplacer = new ElementReplacer();
		this.listenTo(editor.editing.view, "scrollToTheSelection", this._handleScrollToTheSelectionWithStickyPanel.bind(this));
	}
	/**
	* @inheritDoc
	*/
	get element() {
		return this.view.element;
	}
	/**
	* Initializes the UI.
	*
	* @param replacementElement The DOM element that will be the source for the created editor.
	*/
	init(replacementElement) {
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
		if (replacementElement) this._elementReplacer.replace(replacementElement, this.element);
		this._initPlaceholder();
		this._initToolbar();
		if (view.menuBarView) this.initMenuBar(view.menuBarView);
		this._initDialogPluginIntegration();
		this._initContextualBalloonIntegration();
		this.fire("ready");
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		const view = this.view;
		const editingView = this.editor.editing.view;
		this._elementReplacer.restore();
		if (editingView.getDomRoot(view.editable.name)) editingView.detachDomRoot(view.editable.name);
		view.destroy();
	}
	/**
	* Initializes the editor toolbar.
	*/
	_initToolbar() {
		const view = this.view;
		view.stickyPanel.bind("isActive").to(this.focusTracker, "isFocused");
		view.stickyPanel.limiterElement = view.element;
		view.stickyPanel.bind("viewportTopOffset").to(this, "viewportOffset", ({ visualTop }) => visualTop || 0);
		view.toolbar.fillFromConfig(this._toolbarConfig, this.componentFactory);
		this.addToolbar(view.toolbar);
	}
	/**
	* Enable the placeholder text on the editing root.
	*/
	_initPlaceholder() {
		const editor = this.editor;
		const editingView = editor.editing.view;
		const editingRoot = editingView.document.getRoot();
		const sourceElement = editor.sourceElement;
		let placeholderText;
		const placeholder = editor.config.get("roots")[this.view.editable.name].placeholder;
		if (placeholder) placeholderText = placeholder;
		if (!placeholderText && sourceElement && sourceElement.tagName.toLowerCase() === "textarea") placeholderText = sourceElement.getAttribute("placeholder");
		if (placeholderText) editingRoot.placeholder = placeholderText;
		enableViewPlaceholder({
			view: editingView,
			element: editingRoot,
			isDirectHost: this.view.editable.isInlineRoot,
			keepOnFocus: true
		});
	}
	/**
	* Provides an integration between the sticky toolbar and {@link module:ui/panel/balloon/contextualballoon contextual balloon plugin}.
	* It allows the contextual balloon to consider the height of the
	* {@link module:editor-classic/classiceditoruiview~ClassicEditorUIView#stickyPanel}. It prevents the balloon from overlapping
	* the sticky toolbar by adjusting the balloon's position using viewport offset configuration.
	*/
	_initContextualBalloonIntegration() {
		if (!this.editor.plugins.has("ContextualBalloon")) return;
		const { stickyPanel } = this.view;
		const contextualBalloon = this.editor.plugins.get("ContextualBalloon");
		contextualBalloon.on("getPositionOptions", (evt) => {
			const position = evt.return;
			if (!position || !stickyPanel.isSticky || !stickyPanel.element) return;
			const stickyPanelHeight = new Rect(stickyPanel.element).height;
			const target = typeof position.target === "function" ? position.target() : position.target;
			const limiter = typeof position.limiter === "function" ? position.limiter() : position.limiter;
			if (target && limiter && new Rect(target).height >= new Rect(limiter).height - stickyPanelHeight) return;
			const viewportOffsetConfig = { ...position.viewportOffsetConfig };
			const newTopViewportOffset = (viewportOffsetConfig.top || 0) + stickyPanelHeight;
			evt.return = {
				...position,
				viewportOffsetConfig: {
					...viewportOffsetConfig,
					top: newTopViewportOffset
				}
			};
		}, { priority: "low" });
		const updateBalloonPosition = () => {
			if (contextualBalloon.visibleView) contextualBalloon.updatePosition();
		};
		this.listenTo(stickyPanel, "change:isSticky", updateBalloonPosition);
		this.listenTo(this.editor.ui, "change:viewportOffset", updateBalloonPosition);
	}
	/**
	* Provides an integration between the sticky toolbar and {@link module:utils/dom/scroll~scrollViewportToShowTarget}.
	* It allows the UI-agnostic engine method to consider the geometry of the
	* {@link module:editor-classic/classiceditoruiview~ClassicEditorUIView#stickyPanel} that pins to the
	* edge of the viewport and can obscure the user caret after scrolling the window.
	*
	* @param evt The `scrollToTheSelection` event info.
	* @param data The payload carried by the `scrollToTheSelection` event.
	* @param originalArgs The original arguments passed to `scrollViewportToShowTarget()` method (see implementation to learn more).
	*/
	_handleScrollToTheSelectionWithStickyPanel(evt, data, originalArgs) {
		const stickyPanel = this.view.stickyPanel;
		if (stickyPanel.isSticky) {
			const stickyPanelHeight = new Rect(stickyPanel.element).height;
			data.viewportOffset.top += stickyPanelHeight;
		} else {
			const scrollViewportOnPanelGettingSticky = () => {
				this.editor.editing.view.scrollToTheSelection(originalArgs);
			};
			this.listenTo(stickyPanel, "change:isSticky", scrollViewportOnPanelGettingSticky);
			setTimeout(() => {
				this.stopListening(stickyPanel, "change:isSticky", scrollViewportOnPanelGettingSticky);
			}, 20);
		}
	}
	/**
	* Provides an integration between the sticky toolbar and {@link module:ui/dialog/dialog the Dialog plugin}.
	*
	* It moves the dialog down to ensure that the
	* {@link module:editor-classic/classiceditoruiview~ClassicEditorUIView#stickyPanel sticky panel}
	* used by the editor UI will not get obscured by the dialog when the dialog uses one of its automatic positions.
	*/
	_initDialogPluginIntegration() {
		if (!this.editor.plugins.has("Dialog")) return;
		const stickyPanel = this.view.stickyPanel;
		const dialogPlugin = this.editor.plugins.get("Dialog");
		dialogPlugin.on("show", () => {
			const dialogView = dialogPlugin.view;
			dialogView.on("moveTo", (evt, data) => {
				if (!stickyPanel.isSticky || dialogView.wasMoved || dialogView.isModal) return;
				const stickyPanelContentRect = new Rect(stickyPanel.contentPanelElement);
				if (data[1] < stickyPanelContentRect.bottom + DialogView.defaultOffset) data[1] = stickyPanelContentRect.bottom + DialogView.defaultOffset;
			}, { priority: "high" });
		}, { priority: "low" });
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-classic/classiceditoruiview
*/
/**
* Classic editor UI view. Uses an inline editable and a sticky toolbar, all
* enclosed in a boxed UI view.
*/
var ClassicEditorUIView = class extends BoxedEditorUIView {
	/**
	* Sticky panel view instance. This is a parent view of a {@link #toolbar}
	* that makes toolbar sticky.
	*/
	stickyPanel;
	/**
	* Toolbar view instance.
	*/
	toolbar;
	/**
	* Editable UI view.
	*/
	editable;
	/**
	* Creates an instance of the classic editor UI view.
	*
	* @param locale The {@link module:core/editor/editor~Editor#locale} instance.
	* @param editingView The editing view instance this view is related to.
	* @param options Configuration options for the view instance.
	* @param options.shouldToolbarGroupWhenFull When set `true` enables automatic items grouping
	* in the main {@link module:editor-classic/classiceditoruiview~ClassicEditorUIView#toolbar toolbar}.
	* See {@link module:ui/toolbar/toolbarview~ToolbarOptions#shouldGroupWhenFull} to learn more.
	* @param options.editableElement A {@link module:core/editor/editorconfig~ViewRootElementDefinition}
	* describing the editable element to create inside the UI box. When omitted, a default `<div>` is used.
	* @param options.label When set, this value will be used as an accessible `aria-label` of the
	* {@link module:ui/editableui/editableuiview~EditableUIView editable view}.
	*/
	constructor(locale, editingView, options = {}) {
		super(locale);
		this.stickyPanel = new StickyPanelView(locale);
		this.toolbar = new ToolbarView(locale, { shouldGroupWhenFull: options.shouldToolbarGroupWhenFull });
		if (options.useMenuBar) this.menuBarView = new MenuBarView(locale);
		this.editable = new InlineEditableUIView(locale, editingView, options.editableElement, { label: options.label });
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		if (this.menuBarView) this.stickyPanel.content.addMany([this.menuBarView, this.toolbar]);
		else this.stickyPanel.content.add(this.toolbar);
		this.top.add(this.stickyPanel);
		this.main.add(this.editable);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-classic/classiceditor
*/
const ClassicEditorBase = /* #__PURE__ */ ElementApiMixin(Editor);
/**
* The classic editor implementation. It uses an inline editable and a sticky toolbar, all enclosed in a boxed UI.
* See the {@glink examples/builds/classic-editor demo}.
*
* In order to create a classic editor instance, use the static
* {@link module:editor-classic/classiceditor~ClassicEditor.create `ClassicEditor.create()`} method.
*/
var ClassicEditor = class extends ClassicEditorBase {
	/**
	* @inheritDoc
	*/
	static get editorName() {
		return "ClassicEditor";
	}
	/**
	* @inheritDoc
	*/
	ui;
	constructor(sourceElementOrDataOrConfig, config = {}) {
		const { sourceElementOrData, editorConfig } = normalizeSingleRootEditorConstructorParams(sourceElementOrDataOrConfig, config);
		super(editorConfig);
		normalizeRootsConfig(sourceElementOrData, this.config, "main", true);
		const sourceElement = this.config.get("attachTo");
		this.config.define("menuBar.isVisible", false);
		if (isElement$1(sourceElement)) {
			if (!sourceElement.isConnected)
 /**
			* Cannot initialize the editor because the provided source element is not attached to the DOM and cannot be replaced.
			*
			* @error editor-source-element-not-attached
			*/
			throw new CKEditorError("editor-source-element-not-attached", null);
			this.sourceElement = sourceElement;
		}
		this.model.document.createRoot(this.config.get("roots").main.modelElement);
		registerAndInitializeRootConfigAttributes(this);
		const shouldToolbarGroupWhenFull = !this.config.get("toolbar.shouldNotGroupWhenFull");
		const menuBarConfig = this.config.get("menuBar");
		const editableElement = this.config.get("roots").main.element;
		const view = new ClassicEditorUIView(this.locale, this.editing.view, {
			shouldToolbarGroupWhenFull,
			useMenuBar: menuBarConfig.isVisible,
			label: this.config.get("roots").main.label,
			editableElement
		});
		this.ui = new ClassicEditorUI(this, view);
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
		if (this.sourceElement) this.updateSourceElement();
		this.ui.destroy();
		await super.destroy();
	}
	static async create(sourceElementOrDataOrConfig, config = {}) {
		const editor = new this(sourceElementOrDataOrConfig, config);
		await editor.initPlugins();
		verifyRootElements(editor);
		await editor.ui.init(editor.config.get("attachTo") || null);
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

export { ClassicEditor, ClassicEditorUI, ClassicEditorUIView };
//# sourceMappingURL=index.js.map