/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Editor, normalizeMultiRootEditorConstructorParams, normalizeRootsConfig, normalizeViewRootElementDefinition, registerAndInitializeRootConfigAttributes, rootAcceptsBlocks, secureSourceElement, verifyRootElements } from "@ckeditor/ckeditor5-core";
import { CKEditorError, decodeLicenseKey, isFeatureBlockedByLicenseKey, logWarning, setDataInElement } from "@ckeditor/ckeditor5-utils";
import { EditorUI, EditorUIView, InlineEditableUIView, MenuBarView, ToolbarView } from "@ckeditor/ckeditor5-ui";
import { enableViewPlaceholder } from "@ckeditor/ckeditor5-engine";
import { isElement } from "es-toolkit/compat";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-multi-root/multirooteditorui
*/
/**
* The multi-root editor UI class.
*/
var MultiRootEditorUI = class extends EditorUI {
	/**
	* The main (top–most) view of the editor UI.
	*/
	view;
	/**
	* The editable element that was focused the last time when any of the editables had focus.
	*/
	_lastFocusedEditableElement;
	/**
	* Creates an instance of the multi-root editor UI class.
	*
	* @param editor The editor instance.
	* @param view The view of the UI.
	*/
	constructor(editor, view) {
		super(editor);
		this.view = view;
		this._lastFocusedEditableElement = null;
	}
	/**
	* Initializes the UI.
	*/
	init() {
		const view = this.view;
		const editor = this.editor;
		for (const editable of Object.values(this.view.editables)) editable.isInlineRoot = !rootAcceptsBlocks(editor, editable.name);
		view.render();
		this.focusTracker.on("change:focusedElement", (evt, name, focusedElement) => {
			for (const editable of Object.values(this.view.editables)) if (focusedElement === editable.element) this._lastFocusedEditableElement = editable.element;
		});
		this.focusTracker.on("change:isFocused", (evt, name, isFocused) => {
			if (!isFocused) this._lastFocusedEditableElement = null;
		});
		for (const editable of Object.values(this.view.editables)) this.addEditable(editable);
		this._initToolbar();
		this.initMenuBar(this.view.menuBarView);
		this.fire("ready");
	}
	/**
	* Adds the editable to the editor UI.
	*
	* After the editable is added to the editor UI it can be considered "active".
	*
	* The editable is attached to the editor editing pipeline, which means that it will be updated as the editor model updates and
	* changing its content will be reflected in the editor model. Keystrokes, focus handling and placeholder are initialized.
	*
	* @param editable The editable instance to add.
	* @param placeholder Placeholder for the editable element. If not set, placeholder value from the
	* {@link module:core/editor/editorconfig~EditorConfig#placeholder editor configuration} will be used (if it was provided).
	*/
	addEditable(editable, placeholder) {
		const editableElement = editable.element;
		this.editor.editing.view.attachDomRoot(editableElement, editable.name);
		this.setEditableElement(editable.name, editableElement);
		editable.bind("isFocused").to(this.focusTracker, "isFocused", this.focusTracker, "focusedElement", (isFocused, focusedElement) => {
			if (!isFocused) return false;
			if (focusedElement === editableElement) return true;
			else return this._lastFocusedEditableElement === editableElement;
		});
		this._initPlaceholder(editable, placeholder);
	}
	/**
	* Removes the editable instance from the editor UI.
	*
	* Removed editable can be considered "deactivated".
	*
	* The editable is detached from the editing pipeline, so model changes are no longer reflected in it. All handling added in
	* {@link #addEditable} is removed.
	*
	* @param editable Editable to remove from the editor UI.
	*/
	removeEditable(editable) {
		const editingView = this.editor.editing.view;
		if (editingView.getDomRoot(editable.name)) editingView.detachDomRoot(editable.name);
		editable.unbind("isFocused");
		this.removeEditableElement(editable.name);
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		for (const editable of Object.values(this.view.editables)) this.removeEditable(editable);
		this.view.destroy();
	}
	/**
	* Initializes the editor main toolbar and its panel.
	*/
	_initToolbar() {
		const editor = this.editor;
		const view = this.view;
		view.toolbar.fillFromConfig(editor.config.get("toolbar"), this.componentFactory);
		this.addToolbar(view.toolbar);
	}
	/**
	* Enables the placeholder text on a given editable.
	*
	* @param editable Editable on which the placeholder should be set.
	* @param placeholder Placeholder for the editable element. If not set, placeholder value from the
	* {@link module:core/editor/editorconfig~EditorConfig#placeholder editor configuration} will be used (if it was provided).
	*/
	_initPlaceholder(editable, placeholder) {
		if (!placeholder) placeholder = this.editor.config.get("roots")[editable.name]?.placeholder;
		const editingView = this.editor.editing.view;
		const editingRoot = editingView.document.getRoot(editable.name);
		if (placeholder) editingRoot.placeholder = placeholder;
		enableViewPlaceholder({
			view: editingView,
			element: editingRoot,
			isDirectHost: editable.isInlineRoot,
			keepOnFocus: true
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-multi-root/multirooteditoruiview
*/
/**
* The multi-root editor UI view. It is a virtual view providing an inline
* {@link module:editor-multi-root/multirooteditoruiview~MultiRootEditorUIView#editable} and a
* {@link module:editor-multi-root/multirooteditoruiview~MultiRootEditorUIView#toolbar}, but without any
* specific arrangement of the components in the DOM.
*
* See {@link module:editor-multi-root/multirooteditor~MultiRootEditor.create `MultiRootEditor.create()`}
* to learn more about this view.
*/
var MultiRootEditorUIView = class extends EditorUIView {
	/**
	* The main toolbar of the multi-root editor UI.
	*/
	toolbar;
	/**
	* Editable elements used by the multi-root editor UI.
	*/
	editables;
	editable;
	/**
	* Menu bar view instance.
	*/
	menuBarView;
	/**
	* The editing view instance this view is related to.
	*/
	_editingView;
	/**
	* Creates an instance of the multi-root editor UI view.
	*
	* @param locale The {@link module:core/editor/editor~Editor#locale} instance.
	* @param editingView The editing view instance this view is related to.
	* @param editableNames Names for all editable views. For each name, one
	* {@link module:ui/editableui/inline/inlineeditableuiview~InlineEditableUIView `InlineEditableUIView`} instance will be initialized.
	* @param options Configuration options for the view instance.
	* @param options.editableElements The editable elements to be used, assigned to their names. If not specified, they will be
	* automatically created by {@link module:ui/editableui/inline/inlineeditableuiview~InlineEditableUIView `InlineEditableUIView`}
	* instances.
	* @param options.shouldToolbarGroupWhenFull When set to `true` enables automatic items grouping
	* in the main {@link module:editor-multi-root/multirooteditoruiview~MultiRootEditorUIView#toolbar toolbar}.
	* See {@link module:ui/toolbar/toolbarview~ToolbarOptions#shouldGroupWhenFull} to learn more.
	* @param options.label When set, this value will be used as an accessible `aria-label` of the
	* {@link module:ui/editableui/editableuiview~EditableUIView editable view} elements.
	*/
	constructor(locale, editingView, editableNames, options = {}) {
		super(locale);
		this._editingView = editingView;
		this.toolbar = new ToolbarView(locale, { shouldGroupWhenFull: options.shouldToolbarGroupWhenFull });
		this.menuBarView = new MenuBarView(locale);
		this.editables = {};
		for (const editableName of editableNames) {
			const editableElement = options.editableElements?.[editableName];
			let { label } = options;
			if (typeof label === "object") label = label[editableName];
			this.createEditable(editableName, editableElement, label);
		}
		this.editable = Object.values(this.editables)[0];
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
	* Creates an editable instance with given name and registers it in the editor UI view.
	*
	* If `editableElement` is provided, the editable instance will be created on top of it. Otherwise, the editor will create a new
	* DOM element and use it instead.
	*
	* @param editableName The name for the editable.
	* @param editableElement DOM element for which the editable should be created.
	* @param label The accessible editable label used by assistive technologies.
	* @returns The created editable instance.
	*/
	createEditable(editableName, editableElement, label) {
		const editable = new InlineEditableUIView(this.locale, this._editingView, editableElement, { label });
		this.editables[editableName] = editable;
		editable.name = editableName;
		if (this.isRendered) this.registerChild(editable);
		return editable;
	}
	/**
	* Destroys and removes the editable from the editor UI view.
	*
	* @param editableName The name of the editable that should be removed.
	*/
	removeEditable(editableName) {
		const editable = this.editables[editableName];
		if (this.isRendered) this.deregisterChild(editable);
		delete this.editables[editableName];
		editable.destroy();
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		this.registerChild(Object.values(this.editables));
		this.registerChild(this.toolbar);
		this.registerChild(this.menuBarView);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-multi-root/multirooteditor
*/
/**
* The multi-root editor implementation.
*
* The multi-root editor provides multiple inline editable elements and a toolbar. All editable areas are controlled by one editor
* instance, which means that they share common configuration, document ID, or undo stack.
*
* This type of editor is dedicated to integrations which require a customized UI with an open structure, featuring multiple editable areas,
* allowing developers to have a control over the exact location of these editable areas.
*
* In order to create a multi-root editor instance, use the static
* {@link module:editor-multi-root/multirooteditor~MultiRootEditor.create `MultiRootEditor.create()`} method.
*
* Note that you will need to attach the editor toolbar to your web page manually, in a desired place, after the editor is initialized.
*/
var MultiRootEditor = class extends Editor {
	/**
	* @inheritDoc
	*/
	static get editorName() {
		return "MultiRootEditor";
	}
	/**
	* @inheritDoc
	*/
	ui;
	/**
	* The elements on which the editor has been initialized.
	*/
	sourceElements;
	/**
	* A set of lock IDs for enabling or disabling particular root.
	*/
	_readOnlyRootLocks = /* @__PURE__ */ new Map();
	constructor(sourceElementsOrDataOrConfig, config = {}) {
		const { sourceElementsOrData, editorConfig } = normalizeMultiRootEditorConstructorParams(sourceElementsOrDataOrConfig, config);
		super(editorConfig);
		normalizeRootsConfig(sourceElementsOrData, this.config, false);
		normalizeRootsAttributesConfig(this.config);
		normalizeRootEditableOptionsConfig(this.config);
		if (this.config.get("lazyRoots"))
 /**
		* Using deprecated `config.lazyRoots` configuration option.
		* Use `config.roots.<rootName>.lazyLoad` instead.
		*
		* @error multi-root-editor-root-deprecated-config-lazy-roots
		*/
		throw new CKEditorError("multi-root-editor-root-deprecated-config-lazy-roots", null);
		const rootsConfig = Object.entries(this.config.get("roots"));
		this.sourceElements = {};
		const editableElements = {};
		for (const [rootName, rootConfig] of rootsConfig) {
			const editableElement = getRootEditableElement(rootConfig);
			if (!editableElement) continue;
			if (isElement$1(editableElement)) {
				this.sourceElements[rootName] = editableElement;
				secureSourceElement(this, editableElement);
			}
			editableElements[rootName] = editableElement;
		}
		this.editing.view.document.roots.on("add", (evt, viewRoot) => {
			viewRoot.unbind("isReadOnly");
			viewRoot.bind("isReadOnly").to(this.editing.view.document, "isReadOnly", (isReadOnly) => {
				return isReadOnly || this._readOnlyRootLocks.has(viewRoot.rootName);
			});
			viewRoot.on("change:isReadOnly", (evt, prop, value) => {
				const viewRange = this.editing.view.createRangeIn(viewRoot);
				for (const viewItem of viewRange.getItems()) if (viewItem.is("editableElement")) {
					viewItem.unbind("isReadOnly");
					viewItem.isReadOnly = value;
				}
			});
		});
		for (const [rootName, rootConfig] of rootsConfig) {
			const root = this.model.document.createRoot(rootConfig.modelElement, rootName);
			if (rootConfig.lazyLoad) root._isLoaded = false;
		}
		this.registerRootAttribute("$rootEditableOptions");
		registerAndInitializeRootConfigAttributes(this);
		const options = {
			shouldToolbarGroupWhenFull: !this.config.get("toolbar.shouldNotGroupWhenFull"),
			editableElements,
			label: extractRootsConfigField(this.config.get("roots"), "label")
		};
		const view = new MultiRootEditorUIView(this.locale, this.editing.view, getNonLazyLoadRootsNames(rootsConfig), options);
		this.ui = new MultiRootEditorUI(this, view);
		this.model.document.on("change:data", () => {
			const changedRoots = this.model.document.differ.getChangedRoots();
			for (const changes of changedRoots) {
				const root = this.model.document.getRoot(changes.name);
				if (changes.state == "detached") this.fire("detachRoot", root);
			}
			for (const changes of changedRoots) {
				const root = this.model.document.getRoot(changes.name);
				if (changes.state == "attached") this.fire("addRoot", root);
			}
		});
		this.listenTo(this.model, "canEditAt", (evt, [selection]) => {
			if (!selection) return;
			let selectionInReadOnlyRoot = false;
			for (const range of selection.getRanges()) {
				const root = range.root;
				if (this._readOnlyRootLocks.has(root.rootName)) {
					selectionInReadOnlyRoot = true;
					break;
				}
			}
			if (selectionInReadOnlyRoot) {
				evt.return = false;
				evt.stop();
			}
		}, { priority: "high" });
		this.decorate("loadRoot");
		this.on("loadRoot", (evt, [rootName]) => {
			const root = this.model.document.getRoot(rootName);
			if (!root)
 /**
			* The root to load does not exist.
			*
			* @error multi-root-editor-load-root-no-root
			*/
			throw new CKEditorError("multi-root-editor-load-root-no-root", this, { rootName });
			if (root._isLoaded) {
				/**
				* The root to load was already loaded before. The `loadRoot()` call has no effect.
				*
				* @error multi-root-editor-load-root-already-loaded
				*/
				logWarning("multi-root-editor-load-root-already-loaded");
				evt.stop();
			}
		}, { priority: "highest" });
		verifyLicenseKey(this);
		function verifyLicenseKey(editor) {
			const licenseKey = editor.config.get("licenseKey");
			const decodedPayload = decodeLicenseKey(licenseKey);
			if (!decodedPayload) return;
			if (isFeatureBlockedByLicenseKey(decodedPayload, "MRE")) {
				editor.enableReadOnlyMode(Symbol("invalidLicense"));
				editor._showLicenseError("featureNotAllowed", "Multi-root editor");
			}
		}
	}
	/**
	* Destroys the editor instance, releasing all resources used by it.
	*
	* Updates the original editor element with the data if the
	* {@link module:core/editor/editorconfig~EditorConfig#updateSourceElementOnDestroy `updateSourceElementOnDestroy`}
	* configuration option is set to `true`.
	*
	* **Note**: The multi-root editor does not remove the toolbar and editable when destroyed. You can
	* do that yourself in the destruction chain, if you need to:
	*
	* ```ts
	* editor.destroy().then( () => {
	* 	// Remove the toolbar from DOM.
	* 	editor.ui.view.toolbar.element.remove();
	*
	* 	// Remove editable elements from DOM.
	* 	for ( const editable of Object.values( editor.ui.view.editables ) ) {
	* 	    editable.element.remove();
	* 	}
	*
	* 	console.log( 'Editor was destroyed' );
	* } );
	* ```
	*/
	async destroy() {
		const shouldUpdateSourceElement = this.config.get("updateSourceElementOnDestroy");
		const data = {};
		for (const rootName of Object.keys(this.sourceElements)) data[rootName] = shouldUpdateSourceElement ? this.getData({ rootName }) : "";
		this.ui.destroy();
		await super.destroy();
		for (const rootName of Object.keys(this.sourceElements)) setDataInElement(this.sourceElements[rootName], data[rootName]);
	}
	addRoot(rootName, options = {}) {
		const initialData = options.initialData || options.data || "";
		const modelAttributes = { ...options.modelAttributes || options.attributes };
		const modelElement = options.modelElement || options.elementName || "$root";
		if (!this.model.schema.isLimit(modelElement))
 /**
		* The model root element must be a {@link module:engine/model/schema~ModelSchemaItemDefinition#isLimit limit element}.
		* The element name specified in
		* {@link module:editor-multi-root/multirooteditor~MultiRootEditor#addRoot:ROOT_CONFIG `addRoot()`}
		* options must be registered in the schema
		* with `isLimit` set to `true`.
		*
		* @error multi-root-editor-add-root-element-is-not-limit
		* @param rootName The name of the root that uses a non-limit element.
		* @param elementName The name of the model element used for the root.
		*/
		throw new CKEditorError("multi-root-editor-add-root-element-is-not-limit", this, {
			rootName,
			elementName: modelElement
		});
		if (isElement$1(options.element))
 /**
		* Passing an existing DOM element as the `element` option of
		* {@link module:editor-multi-root/multirooteditor~MultiRootEditor#addRoot:ROOT_CONFIG `addRoot()`}
		* is not supported and will be ignored. The
		* `addRoot()` method only registers the model root; the DOM editable is created later by
		* {@link module:editor-multi-root/multirooteditor~MultiRootEditor#createEditable `createEditable()`}.
		*
		* Pass a tag name string (e.g. `'h1'`) or a
		* {@link module:engine/view/elementdefinition~ViewElementDefinition view element definition}
		* instead, or omit the option to create a default `<div>`.
		*
		* @error multi-root-editor-add-root-element-option-ignored
		*/
		logWarning("multi-root-editor-add-root-element-option-ignored");
		setRootEditableOptions(modelAttributes, options);
		if (options.description != null && !("$description" in modelAttributes)) modelAttributes.$description = options.description;
		if (options.title != null && !("$title" in modelAttributes)) modelAttributes.$title = options.title;
		const _addRoot = (writer) => {
			const root = writer.addRoot(rootName, modelElement);
			if (initialData) writer.insert(this.data.parse(initialData, root), root, 0);
			for (const key of Object.keys(modelAttributes)) {
				this.registerRootAttribute(key);
				writer.setAttribute(key, modelAttributes[key], root);
			}
		};
		if (options.isUndoable) this.model.change(_addRoot);
		else this.model.enqueueChange({ isUndoable: false }, _addRoot);
	}
	/**
	* Detaches a root from the editor.
	*
	* ```ts
	* editor.detachRoot( 'myRoot' );
	* ```
	*
	* A detached root is not entirely removed from the editor model, however it can be considered removed.
	*
	* After a root is detached all its children are removed, all markers inside it are removed, and whenever something is inserted to it,
	* it is automatically removed as well. Finally, a detached root is not returned by
	* {@link module:engine/model/document~ModelDocument#getRootNames} by default.
	*
	* It is possible to re-add a previously detached root calling {@link #addRoot}.
	*
	* Whenever a root is detached, the editor instance will fire {@link #event:detachRoot `detachRoot` event}. The event is also
	* called when the root is detached indirectly, e.g. by the undo feature or on a remote client during real-time collaboration.
	*
	* Note, that this method only detached a root in the editor model. It **does not** destroy the DOM editable element linked with
	* the root and it **does not** remove the DOM element from the DOM structure of your application.
	*
	* To properly remove a DOM editable element after a root was detached, listen to {@link #event:detachRoot `detachRoot` event}
	* and call {@link #detachEditable}. Then, remove the DOM element from your application.
	*
	* ```ts
	* editor.on( 'detachRoot', ( evt, root ) => {
	* 	const editableElement = editor.detachEditable( root );
	*
	* 	// You may want to do an additional DOM clean-up here.
	*
	* 	editableElement.remove();
	* } );
	*
	* // ...
	*
	* editor.detachRoot( 'myRoot' ); // Will detach the root, and remove the DOM editable element.
	* ```
	*
	* By setting `isUndoable` flag to `true`, you can allow for re-adding the root using the undo feature.
	*
	* Additionally, you can group detaching multiple roots in one undo step. This can be useful if the roots are combined into one,
	* bigger UI element, and you want them all to be re-added together.
	*
	* ```ts
	* editor.model.change( () => {
	* 	editor.detachRoot( 'left-row-3', true );
	* 	editor.detachRoot( 'center-row-3', true );
	* 	editor.detachRoot( 'right-row-3', true );
	* } );
	* ```
	*
	* @param rootName Name of the root to detach.
	* @param isUndoable Whether detaching the root can be undone (using the undo feature) or not.
	*/
	detachRoot(rootName, isUndoable = false) {
		if (isUndoable) this.model.change((writer) => writer.detachRoot(rootName));
		else this.model.enqueueChange({ isUndoable: false }, (writer) => writer.detachRoot(rootName));
	}
	createEditable(root, optionsOrPlaceholder, label) {
		let placeholder;
		let element;
		if (!optionsOrPlaceholder || typeof optionsOrPlaceholder === "string") placeholder = optionsOrPlaceholder;
		else {
			placeholder = optionsOrPlaceholder?.placeholder;
			label = optionsOrPlaceholder?.label;
			element = optionsOrPlaceholder?.element;
		}
		const rootEditableConfig = root.getAttribute("$rootEditableOptions") || {};
		const editableElement = normalizeViewRootElementDefinition(element || rootEditableConfig.element);
		const editable = this.ui.view.createEditable(root.rootName, editableElement, label || rootEditableConfig.label);
		editable.isInlineRoot = !rootAcceptsBlocks(this, root.rootName);
		this.ui.addEditable(editable, placeholder || rootEditableConfig.placeholder);
		this.editing.view.forceRender();
		return editable.element;
	}
	/**
	* Detaches the DOM editable element that was attached to the given root.
	*
	* @param root Root for which the editable element should be detached.
	* @returns The DOM element that was detached. You may want to remove it from your application DOM structure.
	*/
	detachEditable(root) {
		const rootName = root.rootName;
		const editable = this.ui.view.editables[rootName];
		this.ui.removeEditable(editable);
		this.ui.view.removeEditable(rootName);
		return editable.element;
	}
	/**
	* Loads a root that has previously been declared in
	* {@link module:core/editor/editorconfig~EditorConfig#roots `config.roots.<rootName>.lazyLoad`} configuration option.
	*
	* **Important! Lazy roots loading is an experimental feature, and may become deprecated. Be advised of the following
	* known limitations:**
	*
	* * **Real-time collaboration integrations that use
	* [uploaded editor bundles](https://ckeditor.com/docs/cs/latest/guides/collaboration/editor-bundle.html) are not supported. Using
	* lazy roots will lead to unexpected behavior and data loss.**
	* * **Revision history feature will read and process the whole document on editor initialization, possibly defeating the purpose
	* of using the lazy roots loading. Additionally, when the document is loaded for the first time, all roots need to be loaded,
	* to make sure that the initial revision data includes all roots. Otherwise, you may experience data loss.**
	* * **Multiple features, that require full document data to be loaded, will produce incorrect or confusing results if not all
	* roots are loaded. These include: bookmarks, find and replace, word count, pagination, document exports, document outline,
	* and table of contents.**
	*
	* Only roots specified in the editor config can be loaded. A root cannot be loaded multiple times. A root cannot be unloaded and
	* loading a root cannot be reverted using the undo feature.
	*
	* When a root becomes loaded, it will be treated by the editor as though it was just added. This, among others, means that all
	* related events and mechanisms will be fired, including {@link ~MultiRootEditor#event:addRoot `addRoot` event},
	* {@link module:engine/model/document~ModelDocument#event:change `model.Document` `change` event}, model post-fixers and conversion.
	*
	* Until the root becomes loaded, all above mechanisms are suppressed.
	*
	* This method is {@link module:utils/observablemixin~Observable#decorate decorated}.
	*
	* Note that attributes loaded together with a root are automatically registered.
	*
	* See also {@link ~MultiRootEditor#registerRootAttribute `MultiRootEditor#registerRootAttribute()`} and
	* {@link module:core/editor/editorconfig~EditorConfig#roots `config.roots.<rootName>.modelAttributes` configuration option}.
	*
	* When this method is used in real-time collaboration environment, its effects become asynchronous as the editor will first synchronize
	* with the remote editing session, before the root is added to the editor.
	*
	* If the root has been already loaded by any other client, the additional data passed in `loadRoot()` parameters will be ignored.
	*
	* @param rootName Name of the root to load.
	* @param options Additional options for the loaded root.
	* @fires loadRoot
	*/
	loadRoot(rootName, { data = "", attributes = {} } = {}) {
		const root = this.model.document.getRoot(rootName);
		this.model.enqueueChange({ isUndoable: false }, (writer) => {
			if (data) writer.insert(this.data.parse(data, root), root, 0);
			for (const key of Object.keys(attributes)) {
				this.registerRootAttribute(key);
				writer.setAttribute(key, attributes[key], root);
			}
			root._isLoaded = true;
			this.model.document.differ._bufferRootLoad(root);
		});
	}
	/**
	* Returns the document data for all attached roots.
	*
	* @param options Additional configuration for the retrieved data.
	* Editor features may introduce more configuration options that can be set through this parameter.
	* @param options.trim Whether returned data should be trimmed. This option is set to `'empty'` by default,
	* which means that whenever editor content is considered empty, an empty string is returned. To turn off trimming
	* use `'none'`. In such cases exact content will be returned (for example `'<p>&nbsp;</p>'` for an empty editor).
	* @returns The full document data.
	*/
	getFullData(options) {
		const data = {};
		for (const rootName of this.model.document.getRootNames()) data[rootName] = this.data.get({
			...options,
			rootName
		});
		return data;
	}
	/**
	* Returns attributes for all attached roots.
	*
	* Note: all and only {@link ~MultiRootEditor#registerRootAttribute registered} roots attributes will be returned.
	* If a registered root attribute is not set for a given root, `null` will be returned.
	*
	* @returns Object with roots attributes. Keys are roots names, while values are attributes set on given root.
	*/
	getRootsAttributes() {
		const rootsAttributes = {};
		for (const rootName of this.model.document.getRootNames()) rootsAttributes[rootName] = this.getRootAttributes(rootName);
		return rootsAttributes;
	}
	/**
	* Switches given editor root to the read-only mode.
	*
	* In contrary to {@link module:core/editor/editor~Editor#enableReadOnlyMode `enableReadOnlyMode()`}, which switches the whole editor
	* to the read-only mode, this method turns only a particular root to the read-only mode. This can be useful when you want to prevent
	* editing only a part of the editor content.
	*
	* When you switch a root to the read-only mode, you need provide a unique identifier (`lockId`) that will identify this request. You
	* will need to provide the same `lockId` when you will want to
	* {@link module:editor-multi-root/multirooteditor~MultiRootEditor#enableRoot re-enable} the root.
	*
	* ```ts
	* const model = editor.model;
	* const myRoot = model.document.getRoot( 'myRoot' );
	*
	* editor.disableRoot( 'myRoot', 'my-lock' );
	* model.canEditAt( myRoot ); // `false`
	*
	* editor.disableRoot( 'myRoot', 'other-lock' );
	* editor.disableRoot( 'myRoot', 'other-lock' ); // Multiple locks with the same ID have no effect.
	* model.canEditAt( myRoot ); // `false`
	*
	* editor.enableRoot( 'myRoot', 'my-lock' );
	* model.canEditAt( myRoot ); // `false`
	*
	* editor.enableRoot( 'myRoot', 'other-lock' );
	* model.canEditAt( myRoot ); // `true`
	* ```
	*
	* See also {@link module:core/editor/editor~Editor#enableReadOnlyMode `Editor#enableReadOnlyMode()`} and
	* {@link module:editor-multi-root/multirooteditor~MultiRootEditor#enableRoot `MultiRootEditor#enableRoot()`}.
	*
	* @param rootName Name of the root to switch to read-only mode.
	* @param lockId A unique ID for setting the editor to the read-only state.
	*/
	disableRoot(rootName, lockId) {
		if (rootName == "$graveyard")
 /**
		* You cannot disable the `$graveyard` root.
		*
		* @error multi-root-editor-cannot-disable-graveyard-root
		*/
		throw new CKEditorError("multi-root-editor-cannot-disable-graveyard-root", this);
		const locksForGivenRoot = this._readOnlyRootLocks.get(rootName);
		if (locksForGivenRoot) locksForGivenRoot.add(lockId);
		else {
			this._readOnlyRootLocks.set(rootName, /* @__PURE__ */ new Set([lockId]));
			const editableRootElement = this.editing.view.document.getRoot(rootName);
			editableRootElement.isReadOnly = true;
			Array.from(this.commands.commands()).forEach((command) => command.affectsData && command.refresh());
		}
	}
	/**
	* Removes given read-only lock from the given root.
	*
	* See {@link module:editor-multi-root/multirooteditor~MultiRootEditor#disableRoot `disableRoot()`}.
	*
	* @param rootName Name of the root to switch back from the read-only mode.
	* @param lockId A unique ID for setting the editor to the read-only state.
	*/
	enableRoot(rootName, lockId) {
		const locksForGivenRoot = this._readOnlyRootLocks.get(rootName);
		if (!locksForGivenRoot || !locksForGivenRoot.has(lockId)) return;
		if (locksForGivenRoot.size === 1) {
			this._readOnlyRootLocks.delete(rootName);
			const editableRootElement = this.editing.view.document.getRoot(rootName);
			editableRootElement.isReadOnly = this.isReadOnly;
			Array.from(this.commands.commands()).forEach((command) => command.affectsData && command.refresh());
		} else locksForGivenRoot.delete(lockId);
	}
	static async create(sourceElementsOrDataOrConfig, config = {}) {
		const editor = new this(sourceElementsOrDataOrConfig, config);
		await editor.initPlugins();
		verifyRootElements(editor);
		await editor.ui.init();
		const initialData = extractRootsConfigField(editor.config.get("roots"), "initialData");
		editor._verifyRootsWithInitialData(initialData);
		await editor.data.init(initialData);
		editor.fire("ready");
		return editor;
	}
	/**
	* @internal
	*/
	_verifyRootsWithInitialData(initialData) {
		for (const rootName of this.model.document.getRootNames()) if (!(rootName in initialData))
 /**
		* Editor roots do not match the
		* {@link module:core/editor/editorconfig~EditorConfig#initialData `initialData` configuration}.
		*
		* This may happen for one of the two reasons:
		*
		* * Configuration error. The `sourceElementsOrData` parameter in
		* {@link module:editor-multi-root/multirooteditor~MultiRootEditor.create `MultiRootEditor.create()`} contains different
		* roots than {@link module:core/editor/editorconfig~EditorConfig#initialData `initialData` configuration}.
		* * As the editor was initialized, the {@link module:core/editor/editorconfig~EditorConfig#initialData `initialData`}
		* configuration value or the state of the editor roots has been changed.
		*
		* @error multi-root-editor-root-initial-data-mismatch
		*/
		throw new CKEditorError("multi-root-editor-root-initial-data-mismatch", null);
		for (const rootName of Object.keys(initialData)) {
			const root = this.model.document.getRoot(rootName);
			if (!root || !root.isAttached()) throw new CKEditorError("multi-root-editor-root-initial-data-mismatch", null);
		}
	}
};
/**
* Returns names of roots that are not lazy-loaded.
*/
function getNonLazyLoadRootsNames(rootsConfig) {
	return rootsConfig.filter(([, { lazyLoad }]) => !lazyLoad).map(([rootName]) => rootName);
}
/**
* Collects a specific field from the editor configuration for all roots.
* Returns a simple map of root names and values of the specified field.
* If a root does not have the specified field defined, it is not included in the returned object.
*/
function extractRootsConfigField(rootsConfig, key) {
	return Object.fromEntries(Object.entries(rootsConfig).filter(([, config]) => !config.lazyLoad).map(([rootName, config]) => [rootName, config[key]]).filter(([, value]) => value !== void 0));
}
/**
* Normalize legacy `config.rootsAttributes` config option to `config.roots.<rootName>.modelAttributes`.
*/
function normalizeRootsAttributesConfig(config) {
	if (config.get("rootsAttributes")) {
		const rootsAttributes = config.get("rootsAttributes");
		const rootsConfig = config.get("roots");
		for (const [rootName, attributes] of Object.entries(rootsAttributes)) {
			const rootConfig = rootsConfig[rootName];
			if (!rootConfig)
 /**
			* Trying to set attributes on a non-existing root.
			*
			* Roots specified in `config.rootsAttributes` do not match initial editor roots.
			*
			* @error multi-root-editor-root-attributes-no-root
			*/
			throw new CKEditorError("multi-root-editor-root-attributes-no-root", null);
			if (Object.keys(rootConfig.modelAttributes || {}).length)
 /**
			* Trying to set attributes using deprecated `config.rootsAttributes` on a root that has already
			* defined attributes using `config.roots.<rootName>.modelAttributes`.
			*
			* @error multi-root-editor-root-attributes-conflict
			*/
			throw new CKEditorError("multi-root-editor-root-attributes-conflict", null);
			config.set(`roots.${rootName}.modelAttributes`, attributes);
		}
	}
}
/**
* Normalize `placeholder` and `label` from `config.roots.<rootName>` into the `$rootEditableOptions` root model attribute,
* stored under `config.roots.<rootName>.modelAttributes`. This way the attribute is registered, set on initial data load
* and shipped through RTC initial-data path together with the rest of `modelAttributes`.
*
* This is also required by the revision history feature: on editor load, RH compares the latest revision data against
* `initialData` and `modelAttributes` passed to the editor and logs a warning if they do not match. Because `$rootEditableOptions`
* ends up in the revision data, it must also be present in `modelAttributes` (even as an empty object when no options
* are configured), otherwise the comparison reports a spurious mismatch.
*/
function normalizeRootEditableOptionsConfig(config) {
	const rootsConfig = config.get("roots");
	for (const [rootName, rootConfig] of Object.entries(rootsConfig)) {
		if (rootConfig.modelAttributes?.$rootEditableOptions) continue;
		const modelAttributes = { ...rootConfig.modelAttributes };
		setRootEditableOptions(modelAttributes, rootConfig);
		config.set(`roots.${rootName}.modelAttributes`, modelAttributes);
	}
}
/**
* Mutates the given `modelAttributes` map by adding the `$rootEditableOptions` entry derived from `placeholder`, `label`
* and `element`. If `$rootEditableOptions` is already present, the map is left untouched.
*
* The `element` is normalized into canonical form ({@link module:core/editor/editorconfig~ViewRootElementDefinition})
* before being persisted. A raw DOM element is local to this editor instance - it cannot be replicated through
* RTC, so it is silently dropped here. Callers that want to surface a warning (e.g. `addRoot()`) should do so before
* invoking this function.
*/
function setRootEditableOptions(modelAttributes, { placeholder, label, element }) {
	if ("$rootEditableOptions" in modelAttributes) return;
	const storageElement = isElement$1(element) ? void 0 : normalizeViewRootElementDefinition(element);
	modelAttributes.$rootEditableOptions = {
		...placeholder && { placeholder },
		...label && { label },
		...storageElement && { element: storageElement }
	};
}
function isElement$1(value) {
	return isElement(value);
}
/**
* Returns the canonical editable element descriptor for the given root config.
*
* Falls back to `$rootEditableOptions.element` so remote RTC clients - which do not see the originator's
* `config.roots.<name>.element` - can recreate the configured editable shape from the model attributes
* they receive. The result is normalized here in case the attribute was pre-supplied without going
* through `setRootEditableOptions()` (e.g. a caller writing `modelAttributes.$rootEditableOptions` directly).
*/
function getRootEditableElement(rootConfig) {
	const rootEditableOptions = rootConfig.modelAttributes?.$rootEditableOptions;
	return normalizeViewRootElementDefinition(rootConfig.element || rootEditableOptions?.element);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { MultiRootEditor, MultiRootEditorUI, MultiRootEditorUIView };
//# sourceMappingURL=index.js.map