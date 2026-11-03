/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { cloneDeepWith, isElement, isPlainObject, throttle } from "es-toolkit/compat";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* An abstract watchdog class that handles most of the error handling process and the state of the underlying component.
*
* See the {@glink features/watchdog Watchdog feature guide} to learn the rationale behind it and how to use it.
*
* @internal
*/
var Watchdog = class {
	/**
	* An array of crashes saved as an object with the following properties:
	*
	* * `message`: `String`,
	* * `stack`: `String`,
	* * `date`: `Number`,
	* * `filename`: `String | undefined`,
	* * `lineno`: `Number | undefined`,
	* * `colno`: `Number | undefined`,
	*/
	crashes = [];
	/**
	* Specifies the state of the item watched by the watchdog. The state can be one of the following values:
	*
	* * `initializing` &ndash; Before the first initialization, and after crashes, before the item is ready.
	* * `ready` &ndash; A state when the user can interact with the item.
	* * `crashed` &ndash; A state when an error occurs. It quickly changes to `initializing` or `crashedPermanently`
	* depending on how many and how frequent errors have been caught recently.
	* * `crashedPermanently` &ndash; A state when the watchdog stops reacting to errors and keeps the item it is watching crashed,
	* * `destroyed` &ndash; A state when the item is manually destroyed by the user after calling `watchdog.destroy()`.
	*/
	state = "initializing";
	/**
	* @see module:watchdog/watchdog~WatchdogConfig
	*/
	_crashNumberLimit;
	/**
	* Returns the result of the `Date.now()` call. It can be overridden in tests to mock time as some popular
	* approaches like `sinon.useFakeTimers()` do not work well with error handling.
	*/
	_now = Date.now;
	/**
	* @see module:watchdog/watchdog~WatchdogConfig
	*/
	_minimumNonErrorTimePeriod;
	/**
	* Checks if the event error comes from the underlying item and restarts the item.
	*/
	_boundErrorHandler;
	/**
	* A dictionary of event emitter listeners.
	*/
	_listeners;
	/**
	* @param {module:watchdog/watchdog~WatchdogConfig} config The watchdog plugin configuration.
	*/
	constructor(config) {
		this.crashes = [];
		this._crashNumberLimit = typeof config.crashNumberLimit === "number" ? config.crashNumberLimit : 3;
		this._minimumNonErrorTimePeriod = typeof config.minimumNonErrorTimePeriod === "number" ? config.minimumNonErrorTimePeriod : 5e3;
		this._boundErrorHandler = (evt) => {
			const error = "error" in evt ? evt.error : evt.reason;
			if (error instanceof Error) this._handleError(error, evt);
		};
		this._listeners = {};
		if (!this._restart) throw new Error("The Watchdog class was split into the abstract `Watchdog` class and the `EditorWatchdog` class. Please, use `EditorWatchdog` if you have used the `Watchdog` class previously.");
	}
	/**
	* Destroys the watchdog and releases the resources.
	*/
	destroy() {
		this._stopErrorHandling();
		this._listeners = {};
	}
	/**
	* Starts listening to a specific event name by registering a callback that will be executed
	* whenever an event with a given name fires.
	*
	* Note that this method differs from the CKEditor 5's default `EventEmitterMixin` implementation.
	*
	* @param eventName The event name.
	* @param callback A callback which will be added to event listeners.
	*/
	on(eventName, callback) {
		if (!this._listeners[eventName]) this._listeners[eventName] = [];
		this._listeners[eventName].push(callback);
	}
	/**
	* Stops listening to the specified event name by removing the callback from event listeners.
	*
	* Note that this method differs from the CKEditor 5's default `EventEmitterMixin` implementation.
	*
	* @param eventName The event name.
	* @param callback A callback which will be removed from event listeners.
	*/
	off(eventName, callback) {
		this._listeners[eventName] = this._listeners[eventName].filter((cb) => cb !== callback);
	}
	/**
	* Fires an event with a given event name and arguments.
	*
	* Note that this method differs from the CKEditor 5's default `EventEmitterMixin` implementation.
	*/
	_fire(eventName, ...args) {
		const callbacks = this._listeners[eventName] || [];
		for (const callback of callbacks) callback.apply(this, [null, ...args]);
	}
	/**
	* Starts error handling by attaching global error handlers.
	*/
	_startErrorHandling() {
		window.addEventListener("error", this._boundErrorHandler);
		window.addEventListener("unhandledrejection", this._boundErrorHandler);
	}
	/**
	* Stops error handling by detaching global error handlers.
	*/
	_stopErrorHandling() {
		window.removeEventListener("error", this._boundErrorHandler);
		window.removeEventListener("unhandledrejection", this._boundErrorHandler);
	}
	/**
	* Checks if an error comes from the watched item and restarts it.
	* It reacts to {@link module:utils/ckeditorerror~CKEditorError `CKEditorError` errors} only.
	*
	* @fires error
	* @param error Error.
	* @param evt An error event.
	*/
	_handleError(error, evt) {
		if (this._shouldReactToError(error)) {
			this.crashes.push({
				message: error.message,
				stack: error.stack,
				filename: evt instanceof ErrorEvent ? evt.filename : void 0,
				lineno: evt instanceof ErrorEvent ? evt.lineno : void 0,
				colno: evt instanceof ErrorEvent ? evt.colno : void 0,
				date: this._now()
			});
			const causesRestart = this._shouldRestart();
			this.state = "crashed";
			this._fire("stateChange");
			this._fire("error", {
				error,
				causesRestart
			});
			if (causesRestart) this._restart();
			else {
				this.state = "crashedPermanently";
				this._fire("stateChange");
			}
		}
	}
	/**
	* Checks whether an error should be handled by the watchdog.
	*
	* @param error An error that was caught by the error handling process.
	*/
	_shouldReactToError(error) {
		return error.is && error.is("CKEditorError") && error.context !== void 0 && error.context !== null && this.state === "ready" && this._isErrorComingFromThisItem(error);
	}
	/**
	* Checks if the watchdog should restart the underlying item.
	*/
	_shouldRestart() {
		if (this.crashes.length <= this._crashNumberLimit) return true;
		return (this.crashes[this.crashes.length - 1].date - this.crashes[this.crashes.length - 1 - this._crashNumberLimit].date) / this._crashNumberLimit > this._minimumNonErrorTimePeriod;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module watchdog/utils/getsubnodes
*/
/**
* @internal
*/
function getSubNodes(head, excludedProperties = /* @__PURE__ */ new Set()) {
	const nodes = [head];
	const subNodes = /* @__PURE__ */ new Set();
	let nodeIndex = 0;
	while (nodes.length > nodeIndex) {
		const node = nodes[nodeIndex++];
		if (subNodes.has(node) || !shouldNodeBeIncluded(node) || excludedProperties.has(node)) continue;
		subNodes.add(node);
		if (Symbol.iterator in node) try {
			for (const n of node) nodes.push(n);
		} catch {}
		else for (const key in node) {
			if (key === "defaultValue") continue;
			nodes.push(node[key]);
		}
	}
	return subNodes;
}
function shouldNodeBeIncluded(node) {
	const type = Object.prototype.toString.call(node);
	const typeOfNode = typeof node;
	return !(typeOfNode === "number" || typeOfNode === "boolean" || typeOfNode === "string" || typeOfNode === "symbol" || typeOfNode === "function" || type === "[object Date]" || type === "[object RegExp]" || type === "[object Module]" || node === void 0 || node === null || node._watchdogExcluded || node instanceof EventTarget || node instanceof Event);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module watchdog/utils/areconnectedthroughproperties
*/
/**
* Traverses both structures to find out whether there is a reference that is shared between both structures.
*
* @internal
*/
function areConnectedThroughProperties(target1, target2, excludedNodes = /* @__PURE__ */ new Set()) {
	if (target1 === target2 && isObject(target1)) return true;
	const subNodes1 = getSubNodes(target1, excludedNodes);
	const subNodes2 = getSubNodes(target2, excludedNodes);
	for (const node of subNodes1) if (subNodes2.has(node)) return true;
	return false;
}
/* v8 ignore stop -- @preserve */
function isObject(structure) {
	return typeof structure === "object" && structure !== null;
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module watchdog/utils/normalizerootsconfig
*/
/**
* Normalizes the editor roots configuration. It ensures that all root configurations are defined in `config.roots`
* and that they have `initialData` defined.
*
* It normalizes a single-root configuration (where `config.root` is used) to a multi-root configuration
* (where all roots are defined in `config.roots`). This is considered a standard configuration format,
* so the editor features can always expect roots to be defined in `config.roots`.
*
* It also handles legacy configuration options, such as `config.initialData`, `config.placeholder`, and `config.label`.
*
* @internal
*/
function normalizeRootsConfig(sourceElementsOrData, config, defaultRootName) {
	const mainRootConfig = config.root;
	const rootsConfig = config.roots || Object.create(null);
	if (defaultRootName && !rootsConfig[defaultRootName]) rootsConfig[defaultRootName] = mainRootConfig || Object.create(null);
	const sourceElementIsPlainObject = isPlainObject$1(sourceElementsOrData);
	const legacyInitialData = getLegacyInitialData(config, sourceElementIsPlainObject, defaultRootName);
	const rootNames = Array.from(/* @__PURE__ */ new Set([
		...sourceElementIsPlainObject ? Object.keys(sourceElementsOrData) : [],
		...Object.keys(rootsConfig),
		...Object.keys(legacyInitialData)
	]));
	for (const rootName of rootNames) {
		const rootConfig = rootsConfig[rootName] || Object.create(null);
		rootConfig.initialData = "";
		rootConfig.placeholder ??= getLegacyPlainConfigValue(config, "placeholder", rootName);
		rootConfig.label ??= getLegacyPlainConfigValue(config, "label", rootName);
		rootsConfig[rootName] = rootConfig;
	}
	config.roots = rootsConfig;
}
/**
* Type guard to check if the provided value is a plain object.
*/
function isPlainObject$1(sourceElementsOrData) {
	return !!sourceElementsOrData && typeof sourceElementsOrData == "object" && !Array.isArray(sourceElementsOrData) && !isElement$2(sourceElementsOrData);
}
/**
* Retrieve legacy configuration value for `initialData` from the config.
* Normalize single-root config so returned value is always an object with root names as keys.
*/
function getLegacyInitialData(config, sourceElementIsObject, defaultRootName) {
	return sourceElementIsObject || !defaultRootName ? config.initialData || Object.create(null) : { [defaultRootName]: config.initialData };
}
/**
* Retrieve legacy configuration value for `placeholder` or `label` from the config for a specific root.
*/
function getLegacyPlainConfigValue(config, key, rootName) {
	const legacyValue = config[key];
	if (legacyValue) return typeof legacyValue == "string" ? legacyValue : legacyValue[rootName];
}
/**
* An alias for `isElement` from `es-toolkit/compat` with additional type guard.
*/
function isElement$2(value) {
	return isElement(value);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module watchdog/editorwatchdog
*/
/**
* A watchdog for CKEditor 5 editors.
*
* See the {@glink features/watchdog Watchdog feature guide} to learn the rationale behind it and
* how to use it.
*/
var EditorWatchdog = class extends Watchdog {
	/**
	* The current editor instance.
	*/
	_editor = null;
	/**
	* A promise associated with the life cycle of the editor (creation or destruction processes).
	*
	* It is used to prevent the initialization of the editor if the previous instance has not been destroyed yet,
	* and conversely, to prevent the destruction of the editor if it has not been initialized.
	*/
	_lifecyclePromise = null;
	/**
	* Throttled save method. The `save()` method is called the specified `saveInterval` after `throttledSave()` is called,
	* unless a new action happens in the meantime.
	*/
	_throttledSave;
	/**
	* The latest saved editor data represented as a root name -> root data object.
	*/
	_data;
	/**
	* The last document version.
	*/
	_lastDocumentVersion;
	/**
	* The editor source element or data.
	*/
	_elementOrData;
	/**
	* Stores the original DOM element for single-root editors.
	*/
	_editorAttachTo = null;
	/**
	* Specifies whether the editor is a single-root editor (e.g. ClassicEditor) or a multi-root editor (e.g. MultiRootEditor).
	*/
	_isSingleRootEditor = true;
	/**
	* Specifies whether the editor was created using config-based creator mode (without a source element or data as the first argument).
	*
	* @internal
	*/
	_isUsingConfigBasedCreator = false;
	/**
	* The latest record of the editor editable elements. Used to restart the editor.
	*/
	_editables = {};
	/**
	* The editor configuration.
	*/
	_config;
	_excludedProps;
	/**
	* @param Editor The editor class.
	* @param watchdogConfig The watchdog plugin configuration.
	*/
	constructor(Editor, watchdogConfig = {}) {
		super(watchdogConfig);
		this._throttledSave = throttle(this._save.bind(this), typeof watchdogConfig.saveInterval === "number" ? watchdogConfig.saveInterval : 5e3);
		if (Editor) this._creator = ((elementOrDataOrConfig, config) => {
			if (config === void 0) return Editor.create(elementOrDataOrConfig);
			return Editor.create(elementOrDataOrConfig, config);
		});
		this._destructor = (editor) => editor.destroy();
	}
	/**
	* The current editor instance.
	*/
	get editor() {
		return this._editor;
	}
	/**
	* @internal
	*/
	get _item() {
		return this._editor;
	}
	/**
	* Sets the function that is responsible for the editor creation.
	* It expects a function that should return a promise.
	*
	* For config-based editor creation:
	*
	* ```ts
	* watchdog.setCreator( config => ClassicEditor.create( config ) );
	* ```
	*
	* For legacy editor creation (with element or data as the first argument):
	*
	* ```ts
	* watchdog.setCreator( ( element, config ) => ClassicEditor.create( element, config ) );
	* ```
	*/
	setCreator(creator) {
		this._creator = creator;
	}
	/**
	* Sets the function that is responsible for the editor destruction.
	* Overrides the default destruction function, which destroys only the editor instance.
	* It expects a function that should return a promise or `undefined`.
	*
	* ```ts
	* watchdog.setDestructor( editor => {
	* 	// Do something before the editor is destroyed.
	*
	* 	return editor
	* 		.destroy()
	* 		.then( () => {
	* 			// Do something after the editor is destroyed.
	* 		} );
	* } );
	* ```
	*/
	setDestructor(destructor) {
		this._destructor = destructor;
	}
	/**
	* Restarts the editor instance. This method is called whenever an editor error occurs. It fires the `restart` event and changes
	* the state to `initializing`.
	*
	* @fires restart
	*/
	_restart() {
		return Promise.resolve().then(() => {
			this.state = "initializing";
			this._fire("stateChange");
			return this._destroy();
		}).catch((err) => {
			console.error("An error happened during the editor destroying.", err);
		}).then(() => {
			if (this._isUsingConfigBasedCreator) normalizeRootsConfig(this._isSingleRootEditor ? "" : {}, this._config, this._isSingleRootEditor ? "main" : false);
			else normalizeRootsConfig(this._isSingleRootEditor ? this._editorAttachTo || "" : this._editables, this._config, this._isSingleRootEditor ? "main" : false);
			const updatedConfig = {
				...this._config,
				extraPlugins: this._config.extraPlugins || [],
				_watchdogInitialData: this._data
			};
			updatedConfig.extraPlugins.push(EditorWatchdogInitPlugin);
			const updatedRootsConfig = {};
			for (const [rootName, rootData] of Object.entries(this._data.roots)) {
				const rootConfig = updatedConfig.roots[rootName] || Object.create(null);
				rootConfig.initialData = "";
				rootConfig.modelElement = rootData.modelElement;
				if (this._isUsingConfigBasedCreator) {
					if (this._editables[rootName]?.isConnected) rootConfig.element = this._editables[rootName];
					else if (rootData.isLoaded && !rootConfig.element) Object.assign(rootConfig, getSavedRootEditableOptions(rootData.attributes));
				}
				if (rootData.isLoaded) rootConfig.lazyLoad = false;
				else delete rootConfig.modelAttributes;
				updatedRootsConfig[rootName] = rootConfig;
			}
			updatedConfig.roots = updatedRootsConfig;
			delete updatedConfig.initialData;
			delete updatedConfig.root;
			if (this._isUsingConfigBasedCreator) return this.create(updatedConfig, updatedConfig.context);
			const elementOrData = this._isSingleRootEditor ? this._editorAttachTo || "" : this._editables;
			return this.create(elementOrData, updatedConfig, updatedConfig.context);
		}).then(() => {
			this._fire("restart");
		});
	}
	create(elementOrDataOrConfig = this._isUsingConfigBasedCreator ? this._config : this._elementOrData, configOrContext = this._isUsingConfigBasedCreator ? void 0 : this._config, context) {
		const isUsingConfigBasedCreator = this._detectConfigBasedCreator(elementOrDataOrConfig, configOrContext);
		const elementOrData = isUsingConfigBasedCreator ? void 0 : elementOrDataOrConfig;
		const config = isUsingConfigBasedCreator ? elementOrDataOrConfig : configOrContext;
		const resolvedContext = isUsingConfigBasedCreator ? configOrContext : context;
		this._lifecyclePromise = Promise.resolve(this._lifecyclePromise).then(() => {
			super._startErrorHandling();
			this._isUsingConfigBasedCreator = isUsingConfigBasedCreator;
			this._elementOrData = elementOrData;
			this._config = this._cloneEditorConfiguration(config || {});
			this._config.context = resolvedContext;
			if (isUsingConfigBasedCreator) {
				this._editorAttachTo = null;
				const rootsCount = this._config.roots ? Object.keys(this._config.roots).length : 0;
				const legacyInitialData = this._config.initialData;
				const isMultiRootFromLegacy = legacyInitialData && typeof legacyInitialData === "object";
				this._isSingleRootEditor = !isMultiRootFromLegacy && rootsCount <= 1;
			} else {
				this._editorAttachTo = isElement$1(elementOrData) ? elementOrData : null;
				this._isSingleRootEditor = isElement$1(elementOrData) || typeof elementOrData == "string";
			}
			if (isUsingConfigBasedCreator) return this._creator(this._config);
			return this._creator(elementOrData, this._config);
		}).then((editor) => {
			this._editor = editor;
			editor.model.document.on("change:data", this._throttledSave);
			this._lastDocumentVersion = editor.model.document.version;
			this._data = this._getData();
			if (!this._editorAttachTo) this._editables = this._getEditables();
			this.state = "ready";
			this._fire("stateChange");
		}).finally(() => {
			this._lifecyclePromise = null;
		});
		return this._lifecyclePromise;
	}
	/**
	* Destroys the watchdog and the current editor instance. It fires the callback
	* registered in {@link #setDestructor `setDestructor()`} and uses it to destroy the editor instance.
	* It also sets the state to `destroyed`.
	*/
	destroy() {
		this._lifecyclePromise = Promise.resolve(this._lifecyclePromise).then(() => {
			this.state = "destroyed";
			this._fire("stateChange");
			super.destroy();
			return this._destroy();
		}).finally(() => {
			this._lifecyclePromise = null;
		});
		return this._lifecyclePromise;
	}
	_destroy() {
		return Promise.resolve().then(() => {
			this._stopErrorHandling();
			this._throttledSave.cancel();
			const editor = this._editor;
			this._editor = null;
			editor.model.document.off("change:data", this._throttledSave);
			return this._destructor(editor);
		});
	}
	/**
	* Saves the editor data, so it can be restored after the crash even if the data cannot be fetched at
	* the moment of the crash.
	*/
	_save() {
		const version = this._editor.model.document.version;
		try {
			this._data = this._getData();
			if (!this._editorAttachTo) this._editables = this._getEditables();
			this._lastDocumentVersion = version;
		} catch (err) {
			console.error(err, "An error happened during restoring editor data. Editor will be restored from the previously saved data.");
		}
	}
	/**
	* @internal
	*/
	_setExcludedProperties(props) {
		this._excludedProps = props;
	}
	/**
	* Gets all data that is required to reinitialize editor instance.
	*/
	_getData() {
		const editor = this._editor;
		const roots = editor.model.document.roots.filter((root) => root.isAttached() && root.rootName != "$graveyard");
		const { plugins } = editor;
		const commentsRepository = plugins.has("CommentsRepository") && plugins.get("CommentsRepository");
		const trackChanges = plugins.has("TrackChanges") && plugins.get("TrackChanges");
		const data = {
			roots: {},
			markers: {},
			commentThreads: JSON.stringify([]),
			suggestions: JSON.stringify([])
		};
		roots.forEach((root) => {
			data.roots[root.rootName] = {
				content: JSON.stringify(Array.from(root.getChildren())),
				attributes: JSON.stringify(Array.from(root.getAttributes())),
				modelElement: root.name,
				isLoaded: root._isLoaded
			};
		});
		for (const marker of editor.model.markers) {
			if (!marker._affectsData) continue;
			data.markers[marker.name] = {
				rangeJSON: marker.getRange().toJSON(),
				usingOperation: marker._managedUsingOperations,
				affectsData: marker._affectsData
			};
		}
		if (commentsRepository) data.commentThreads = JSON.stringify(commentsRepository.getCommentThreads({
			toJSON: true,
			skipNotAttached: true
		}));
		if (trackChanges) data.suggestions = JSON.stringify(trackChanges.getSuggestions({
			toJSON: true,
			skipNotAttached: true
		}));
		return data;
	}
	/**
	* For each attached model root, returns its HTML editable element (if available).
	*/
	_getEditables() {
		const editables = {};
		for (const rootName of this.editor.model.document.getRootNames()) {
			const editable = this.editor.ui.getEditableElement(rootName);
			if (editable) editables[rootName] = editable;
		}
		return editables;
	}
	/**
	* Traverses the error context and the current editor to find out whether these structures are connected
	* to each other via properties.
	*
	* @internal
	*/
	_isErrorComingFromThisItem(error) {
		return areConnectedThroughProperties(this._editor, error.context, this._excludedProps);
	}
	/**
	* Detects whether the `create()` call was made in config-based creator mode
	* (i.e., the first argument is a config object rather than a source element or data).
	*/
	_detectConfigBasedCreator(elementOrDataOrConfig, configOrContext) {
		if (typeof elementOrDataOrConfig === "string" || isElement$1(elementOrDataOrConfig)) return false;
		if (configOrContext && typeof configOrContext === "object" && !("destroy" in configOrContext) && Object.keys(configOrContext).length > 0) return false;
		if (elementOrDataOrConfig && typeof elementOrDataOrConfig === "object") {
			const values = Object.values(elementOrDataOrConfig);
			if (values.length > 0 && values.every((v) => typeof v === "string" || isElement$1(v))) return false;
		}
		return true;
	}
	/**
	* Clones the editor configuration.
	*/
	_cloneEditorConfiguration(config) {
		return cloneDeepWith(config, (value, key) => {
			if (isElement$1(value)) return value;
			if (key === "context") return value;
		});
	}
};
/**
* Internal plugin that is used to stop the default editor initialization and restoring the editor state
* based on the `editor.config._watchdogInitialData` data.
*/
var EditorWatchdogInitPlugin = class {
	editor;
	_data;
	constructor(editor) {
		this.editor = editor;
		this._data = editor.config.get("_watchdogInitialData");
	}
	/**
	* @inheritDoc
	*/
	init() {
		this.editor.data.on("init", (evt) => {
			evt.stop();
			this.editor.model.enqueueChange({ isUndoable: false }, (writer) => {
				this._restoreCollaborationData();
				this._restoreEditorData(writer);
			});
			this.editor.data.fire("ready");
		}, { priority: 999 });
	}
	/**
	* Creates a model node (element or text) based on provided JSON.
	*/
	_createNode(writer, jsonNode) {
		if ("name" in jsonNode) {
			const element = writer.createElement(jsonNode.name, jsonNode.attributes);
			if (jsonNode.children) for (const child of jsonNode.children) element._appendChild(this._createNode(writer, child));
			return element;
		} else return writer.createText(jsonNode.data, jsonNode.attributes);
	}
	/**
	* Restores the editor by setting the document data, roots attributes and markers.
	*/
	_restoreEditorData(writer) {
		const editor = this.editor;
		Object.entries(this._data.roots).forEach(([rootName, { content, attributes }]) => {
			const parsedNodes = JSON.parse(content);
			const parsedAttributes = JSON.parse(attributes);
			const rootElement = editor.model.document.getRoot(rootName);
			for (const [key, value] of parsedAttributes) writer.setAttribute(key, value, rootElement);
			for (const child of parsedNodes) {
				const node = this._createNode(writer, child);
				writer.insert(node, rootElement, "end");
			}
		});
		Object.entries(this._data.markers).forEach(([markerName, markerOptions]) => {
			const { document } = editor.model;
			const { rangeJSON: { start, end }, ...options } = markerOptions;
			const root = document.getRoot(start.root);
			const startPosition = writer.createPositionFromPath(root, start.path, start.stickiness);
			const endPosition = writer.createPositionFromPath(root, end.path, end.stickiness);
			const range = writer.createRange(startPosition, endPosition);
			writer.addMarker(markerName, {
				range,
				...options
			});
		});
	}
	/**
	* Restores the editor collaboration data - comment threads and suggestions.
	*/
	_restoreCollaborationData() {
		const parsedCommentThreads = JSON.parse(this._data.commentThreads);
		const parsedSuggestions = JSON.parse(this._data.suggestions);
		if (this.editor.plugins.has("CommentsRepository")) {
			const commentsRepository = this.editor.plugins.get("CommentsRepository");
			for (const commentThread of commentsRepository.getCommentThreads()) commentsRepository._removeCommentThread({ threadId: commentThread.id });
			parsedCommentThreads.forEach((commentThreadData) => {
				const channelId = this.editor.config.get("collaboration.channelId");
				this.editor.plugins.get("CommentsRepository").addCommentThread({
					channelId,
					...commentThreadData
				});
			});
		}
		if (this.editor.plugins.has("TrackChangesEditing")) {
			const trackChangesEditing = this.editor.plugins.get("TrackChangesEditing");
			for (const suggestion of trackChangesEditing.getSuggestions()) trackChangesEditing._removeSuggestion(suggestion);
			parsedSuggestions.forEach((suggestionData) => {
				trackChangesEditing.addSuggestionData(suggestionData);
			});
		}
	}
};
/**
* An alias for `isElement` from `es-toolkit/compat` with additional type guard.
*/
function isElement$1(value) {
	return isElement(value);
}
/**
* Reads the editable options persisted in the root's `$rootEditableOptions` model attribute and returns them as a
* {@link module:core/editor/editorconfig~RootConfig} partial. It is used to recreate a detached editable when the
* editor is restarted in the config-based creator mode.
*
* Only the known `placeholder`, `label` and `element` fields with a value are copied; their values are validated and
* normalized later by the editor constructor. Fields are returned only when set, so merging the result does not
* overwrite the existing restart config with `undefined`. A missing or tampered (non-object) value is dropped so it
* cannot break the restart.
*
* @param serializedAttributes The root attributes serialized as a JSON string of `[ key, value ]` entries.
*/
function getSavedRootEditableOptions(serializedAttributes) {
	const { $rootEditableOptions: options } = Object.fromEntries(JSON.parse(serializedAttributes));
	if (!options || typeof options != "object") return {};
	return {
		...options.placeholder && { placeholder: options.placeholder },
		...options.label && { label: options.label },
		...options.element && { element: options.element }
	};
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module watchdog/contextwatchdog
*/
const mainQueueId = Symbol("MainQueueId");
/**
* A watchdog for the {@link module:core/context~Context} class.
*
* See the {@glink features/watchdog Watchdog feature guide} to learn the rationale behind it and
* how to use it.
*/
var ContextWatchdog = class extends Watchdog {
	/**
	* A map of internal watchdogs for added items.
	*/
	_watchdogs = /* @__PURE__ */ new Map();
	/**
	* The watchdog configuration.
	*/
	_watchdogConfig;
	/**
	* The current context instance.
	*/
	_context = null;
	/**
	* Context properties (nodes/references) that are gathered during the initial context creation
	* and are used to distinguish the origin of an error.
	*/
	_contextProps = /* @__PURE__ */ new Set();
	/**
	* An action queue, which is used to handle async functions queuing.
	*/
	_actionQueues = new ActionQueues();
	/**
	* The configuration for the {@link module:core/context~Context}.
	*/
	_contextConfig;
	/**
	* The watched item.
	*/
	_item;
	/**
	* The context watchdog class constructor.
	*
	* ```ts
	* const watchdog = new ContextWatchdog( Context );
	*
	* await watchdog.create( contextConfiguration );
	*
	* await watchdog.add( item );
	* ```
	*
	* See the {@glink features/watchdog Watchdog feature guide} to learn more how to use this feature.
	*
	* @param Context The {@link module:core/context~Context} class.
	* @param watchdogConfig The watchdog configuration.
	*/
	constructor(Context, watchdogConfig = {}) {
		super(watchdogConfig);
		this._watchdogConfig = watchdogConfig;
		this._creator = (contextConfig) => Context.create(contextConfig);
		this._destructor = (context) => context.destroy();
		this._actionQueues.onEmpty(() => {
			if (this.state === "initializing") {
				this.state = "ready";
				this._fire("stateChange");
			}
		});
	}
	/**
	* Sets the function that is responsible for the context creation.
	* It expects a function that should return a promise (or `undefined`).
	*
	* ```ts
	* watchdog.setCreator( config => Context.create( config ) );
	* ```
	*/
	setCreator(creator) {
		this._creator = creator;
	}
	/**
	* Sets the function that is responsible for the context destruction.
	* Overrides the default destruction function, which destroys only the context instance.
	* It expects a function that should return a promise (or `undefined`).
	*
	* ```ts
	* watchdog.setDestructor( context => {
	* 	// Do something before the context is destroyed.
	*
	* 	return context
	* 		.destroy()
	* 		.then( () => {
	* 			// Do something after the context is destroyed.
	* 		} );
	* } );
	* ```
	*/
	setDestructor(destructor) {
		this._destructor = destructor;
	}
	/**
	* The context instance. Keep in mind that this property might be changed when the context watchdog restarts,
	* so do not keep this instance internally. Always operate on the `ContextWatchdog#context` property.
	*/
	get context() {
		return this._context;
	}
	/**
	* Initializes the context watchdog. Once it is created, the watchdog takes care about
	* recreating the context and the provided items, and starts the error handling mechanism.
	*
	* ```ts
	* await watchdog.create( {
	* 	plugins: []
	* } );
	* ```
	*
	* @param contextConfig The context configuration. See {@link module:core/context~Context}.
	*/
	create(contextConfig = {}) {
		return this._actionQueues.enqueue(mainQueueId, () => {
			this._contextConfig = contextConfig;
			return this._create();
		});
	}
	/**
	* Returns an item instance with the given `itemId`.
	*
	* ```ts
	* const editor1 = watchdog.getItem( 'editor1' );
	* ```
	*
	* @param itemId The item ID.
	* @returns The item instance or `undefined` if an item with a given ID has not been found.
	*/
	getItem(itemId) {
		return this._getWatchdog(itemId)._item;
	}
	/**
	* Gets the state of the given item. See {@link #state} for a list of available states.
	*
	* ```ts
	* const editor1State = watchdog.getItemState( 'editor1' );
	* ```
	*
	* @param itemId Item ID.
	* @returns The state of the item.
	*/
	getItemState(itemId) {
		return this._getWatchdog(itemId).state;
	}
	/**
	* Adds items to the watchdog. Once created, instances of these items will be available using the {@link #getItem} method.
	*
	* Items can be passed together as an array of objects:
	*
	* ```ts
	* await watchdog.add( [ {
	* 	id: 'editor1',
	* 	type: 'editor',
	* 	config: {
	* 		attachTo: document.querySelector( '#editor' ),
	* 		plugins: [ Essentials, Paragraph, Bold, Italic ],
	* 		toolbar: [ 'bold', 'italic', 'alignment' ]
	* 	},
	* 	creator: config => ClassicEditor.create( config )
	* } ] );
	* ```
	*
	* Or one by one as objects:
	*
	* ```ts
	* await watchdog.add( {
	* 	id: 'editor1',
	* 	type: 'editor',
	* 	config: {
	* 		attachTo: document.querySelector( '#editor' ),
	* 		plugins: [ Essentials, Paragraph, Bold, Italic ],
	* 		toolbar: [ 'bold', 'italic', 'alignment' ]
	* 	},
	* 	creator: config => ClassicEditor.create( config )
	* } );
	* ```
	*
	* Then an instance can be retrieved using the {@link #getItem} method:
	*
	* ```ts
	* const editor1 = watchdog.getItem( 'editor1' );
	* ```
	*
	* Note that this method can be called multiple times, but for performance reasons it is better
	* to pass all items together.
	*
	* @param itemConfigurationOrItemConfigurations An item configuration object or an array of item configurations.
	*/
	add(itemConfigurationOrItemConfigurations) {
		const itemConfigurations = toArray(itemConfigurationOrItemConfigurations);
		return Promise.all(itemConfigurations.map((item) => {
			return this._actionQueues.enqueue(item.id, () => {
				if (this.state === "destroyed") throw new Error("Cannot add items to destroyed watchdog.");
				if (!this._context) throw new Error("Context was not created yet. You should call the `ContextWatchdog#create()` method first.");
				let watchdog;
				if (this._watchdogs.has(item.id)) throw new Error(`Item with the given id is already added: '${item.id}'.`);
				if (item.type === "editor") {
					watchdog = new EditorWatchdog(null, this._watchdogConfig);
					watchdog.setCreator(item.creator);
					watchdog._setExcludedProperties(this._contextProps);
					if (item.destructor) watchdog.setDestructor(item.destructor);
					this._watchdogs.set(item.id, watchdog);
					watchdog.on("error", (evt, { error, causesRestart }) => {
						this._fire("itemError", {
							itemId: item.id,
							error
						});
						if (!causesRestart) return;
						this._actionQueues.enqueue(item.id, () => new Promise((res) => {
							const rethrowRestartEventOnce = () => {
								watchdog.off("restart", rethrowRestartEventOnce);
								this._fire("itemRestart", { itemId: item.id });
								res();
							};
							watchdog.on("restart", rethrowRestartEventOnce);
						}));
					});
					if (item.sourceElementOrData !== void 0) return watchdog.create(item.sourceElementOrData, item.config, this._context);
					return watchdog.create(item.config, this._context);
				} else throw new Error(`Not supported item type: '${item.type}'.`);
			});
		}));
	}
	/**
	* Removes and destroys item(s) with given ID(s).
	*
	* ```ts
	* await watchdog.remove( 'editor1' );
	* ```
	*
	* Or
	*
	* ```ts
	* await watchdog.remove( [ 'editor1', 'editor2' ] );
	* ```
	*
	* @param itemIdOrItemIds Item ID or an array of item IDs.
	*/
	remove(itemIdOrItemIds) {
		const itemIds = toArray(itemIdOrItemIds);
		return Promise.all(itemIds.map((itemId) => {
			return this._actionQueues.enqueue(itemId, () => {
				const watchdog = this._getWatchdog(itemId);
				this._watchdogs.delete(itemId);
				return watchdog.destroy();
			});
		}));
	}
	/**
	* Destroys the context watchdog and all added items.
	* Once the context watchdog is destroyed, new items cannot be added.
	*
	* ```ts
	* await watchdog.destroy();
	* ```
	*/
	destroy() {
		return this._actionQueues.enqueue(mainQueueId, () => {
			this.state = "destroyed";
			this._fire("stateChange");
			super.destroy();
			return this._destroy();
		});
	}
	/**
	* Restarts the context watchdog.
	*/
	_restart() {
		return this._actionQueues.enqueue(mainQueueId, () => {
			this.state = "initializing";
			this._fire("stateChange");
			return this._destroy().catch((err) => {
				console.error("An error happened during destroying the context or items.", err);
			}).then(() => this._create()).then(() => this._fire("restart"));
		});
	}
	/**
	* Initializes the context watchdog.
	*/
	_create() {
		return Promise.resolve().then(() => {
			this._startErrorHandling();
			return this._creator(this._contextConfig);
		}).then((context) => {
			this._context = context;
			this._contextProps = getSubNodes(this._context);
			return Promise.all(Array.from(this._watchdogs.values()).map((watchdog) => {
				watchdog._setExcludedProperties(this._contextProps);
				if (watchdog._isUsingConfigBasedCreator) return watchdog.create(void 0, this._context);
				return watchdog.create(void 0, void 0, this._context);
			}));
		});
	}
	/**
	* Destroys the context instance and all added items.
	*/
	_destroy() {
		return Promise.resolve().then(() => {
			this._stopErrorHandling();
			const context = this._context;
			this._context = null;
			this._contextProps = /* @__PURE__ */ new Set();
			return Promise.all(Array.from(this._watchdogs.values()).map((watchdog) => watchdog.destroy())).then(() => this._destructor(context));
		});
	}
	/**
	* Returns the watchdog for a given item ID.
	*
	* @param itemId Item ID.
	*/
	_getWatchdog(itemId) {
		const watchdog = this._watchdogs.get(itemId);
		if (!watchdog) throw new Error(`Item with the given id was not registered: ${itemId}.`);
		return watchdog;
	}
	/**
	* Checks whether an error comes from the context instance and not from the item instances.
	*
	* @internal
	*/
	_isErrorComingFromThisItem(error) {
		for (const watchdog of this._watchdogs.values()) if (watchdog._isErrorComingFromThisItem(error)) return false;
		return areConnectedThroughProperties(this._context, error.context);
	}
};
/**
* Manager of action queues that allows queuing async functions.
*/
var ActionQueues = class {
	_onEmptyCallbacks = [];
	_queues = /* @__PURE__ */ new Map();
	_activeActions = 0;
	/**
	* Used to register callbacks that will be run when the queue becomes empty.
	*
	* @param onEmptyCallback A callback that will be run whenever the queue becomes empty.
	*/
	onEmpty(onEmptyCallback) {
		this._onEmptyCallbacks.push(onEmptyCallback);
	}
	/**
	* It adds asynchronous actions (functions) to the proper queue and runs them one by one.
	*
	* @param queueId The action queue ID.
	* @param action A function that should be enqueued.
	*/
	enqueue(queueId, action) {
		const isMainAction = queueId === mainQueueId;
		this._activeActions++;
		if (!this._queues.get(queueId)) this._queues.set(queueId, Promise.resolve());
		const queueWithAction = (isMainAction ? Promise.all(this._queues.values()) : Promise.all([this._queues.get(mainQueueId), this._queues.get(queueId)])).then(action);
		const nonErrorQueue = queueWithAction.catch(() => {});
		this._queues.set(queueId, nonErrorQueue);
		return queueWithAction.finally(() => {
			this._activeActions--;
			if (this._queues.get(queueId) === nonErrorQueue && this._activeActions === 0) this._onEmptyCallbacks.forEach((cb) => cb());
		});
	}
};
/**
* Transforms any value to an array. If the provided value is already an array, it is returned unchanged.
*
* @param elementOrArray The value to transform to an array.
* @returns An array created from data.
*/
function toArray(elementOrArray) {
	return Array.isArray(elementOrArray) ? elementOrArray : [elementOrArray];
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* A plugin that records user actions and editor state changes for debugging purposes. It tracks commands execution, model operations,
* UI interactions, and document events. It just collects data locally, and does not send it anywhere, integrator is responsible
* for gathering data from this plugin for further processing.
*
* **Important! `ActionsRecorder` is an experimental feature, and may become deprecated.**
*
* By default, plugin stores latest 1000 action entries. Integrator can register an `onError` callback to collect those entries
* in case of exception. Integrator should augment this data with application specific data such as page-id or session-id,
* depending on the application. Augmented data should be processed by the integrator, for example integrator should send it
* to some data collecting endpoint for later analysis.
*
* Example:
*
* ```ts
* 	ClassicEditor
* 		.create( {
* 			plugins: [ ActionsRecorder, ... ],
* 			actionsRecorder: {
* 				maxEntries: 1000, // This is the default value and could be adjusted.
*
* 				onError( error, entries ) {
* 					console.error( 'ActionsRecorder - Error detected:', error );
* 					console.warn( 'Actions recorded before error:', entries );
*
* 					this.flushEntries();
*
* 					// Integrator should send and store the entries. The error is already in the last entry in serializable form.
* 				}
* 			}
* 		} )
* 		.then( ... )
* 		.catch( ... );
* ```
*
* Alternatively integrator could continuously collect actions in batches and send them to theirs endpoint for later analysis:
*
* ```ts
* 	ClassicEditor
* 		.create( {
* 			plugins: [ ActionsRecorder, ... ],
* 			actionsRecorder: {
* 				maxEntries: 50, // This is the batch size.
*
* 				onMaxEntries() {
* 					const entries = this.getEntries();
*
* 					this.flushEntries();
*
* 					console.log( 'ActionsRecorder - Batch of entries:', entries );
*
* 					// Integrator should send and store the entries.
* 				},
*
* 				onError( error, entries ) {
* 					console.error( 'ActionsRecorder - Error detected:', error );
* 					console.warn( 'Actions recorded before error:', entries );
*
* 					this.flushEntries();
*
* 					// Integrator should send and store the entries. The error is already in the last entry in serializable form.
* 				}
* 			}
* 		} )
* 		.then( ... )
* 		.catch( ... );
* ```
*
* See {@link module:watchdog/actionsrecorderconfig~ActionsRecorderConfig plugin configuration} for more details.
*
*/
var ActionsRecorder = class {
	/**
	* The editor instance.
	*/
	editor;
	/**
	* Array storing all recorded action entries with their context and state snapshots.
	*/
	_entries = [];
	/**
	* Stack tracking nested action frames to maintain call hierarchy.
	*/
	_frameStack = [];
	/**
	* Set of already reported errors used to notify only once for each error (not on every try-catch nested block).
	*/
	_errors = /* @__PURE__ */ new Set();
	/**
	* Maximum number of action entries to keep in memory.
	*/
	_maxEntries;
	/**
	* Error callback.
	*/
	_errorCallback;
	/**
	* Filter function to determine which entries should be stored.
	*/
	_filterCallback;
	/**
	* Callback triggered every time count of recorded entries reaches maxEntries.
	*/
	_maxEntriesCallback;
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "ActionsRecorder";
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
	constructor(editor) {
		this.editor = editor;
		editor.config.define("actionsRecorder.maxEntries", 1e3);
		const config = editor.config.get("actionsRecorder");
		this._maxEntries = config.maxEntries;
		this._filterCallback = config.onFilter;
		this._errorCallback = config.onError;
		this._maxEntriesCallback = config.onMaxEntries || this._maxEntriesDefaultHandler;
		this._tapCommands();
		this._tapOperationApply();
		this._tapModelMethods();
		this._tapModelSelection();
		this._tapComponentFactory();
		this._tapViewDocumentEvents();
	}
	/**
	* Returns all recorded action entries.
	*/
	getEntries() {
		return this._entries.slice();
	}
	/**
	* Flushes all recorded entries.
	*/
	flushEntries() {
		this._entries = [];
	}
	/**
	* Creates a new action frame and adds it to the recording stack.
	*
	* @param action The name/type of the action being recorded.
	* @param params Optional parameters associated with the event.
	* @returns The created call frame object.
	*/
	_enterFrame(action, params) {
		const callFrame = {
			timeStamp: (/* @__PURE__ */ new Date()).toISOString(),
			...this._frameStack.length && { parentEntry: this._frameStack.at(-1) },
			action,
			params: params?.map((param) => serializeValue(param)),
			before: this._buildStateSnapshot()
		};
		if (!this._filterCallback || this._filterCallback(callFrame, this._entries)) this._entries.push(callFrame);
		this._frameStack.push(callFrame);
		return callFrame;
	}
	/**
	* Closes an action frame and records its final state and results.
	*
	* @param callFrame The call frame to close.
	* @param result Optional result value from the action.
	* @param error Optional error that occurred during the action.
	*/
	_leaveFrame(callFrame, result, error) {
		const topFrame = this._frameStack.pop();
		if (!topFrame || topFrame !== callFrame) return;
		if (result !== void 0) topFrame.result = serializeValue(result);
		if (error) topFrame.error = serializeValue(error);
		topFrame.after = this._buildStateSnapshot();
		if (error) this._callErrorCallback(error);
		if (this._frameStack.length == 0) this._errors.clear();
		if (this._entries.length >= this._maxEntries) this._maxEntriesCallback();
	}
	/**
	* Builds a snapshot of the current editor state including document version,
	* read-only status, focus state, and model selection.
	*
	* @returns An object containing the current editor state snapshot.
	*/
	_buildStateSnapshot() {
		const { model, isReadOnly, editing } = this.editor;
		return {
			documentVersion: model.document.version,
			editorReadOnly: isReadOnly,
			editorFocused: editing.view.document.isFocused,
			modelSelection: serializeValue(model.document.selection)
		};
	}
	/**
	* Sets up recording for all editor commands, both existing and future ones.
	* Taps into the command execution to track when commands are run.
	*/
	_tapCommands() {
		for (const [commandName, command] of this.editor.commands) this._tapCommand(commandName, command);
		tapObjectMethod(this.editor.commands, "add", { before: (callContext, [commandName, command]) => {
			this._tapCommand(commandName, command);
			return false;
		} });
	}
	/**
	* Sets up recording for model operation applications.
	* Tracks when operations are applied to the model document.
	*/
	_tapOperationApply() {
		tapObjectMethod(this.editor.model, "applyOperation", {
			before: (callContext, [operation]) => {
				if (operation.baseVersion === null) return false;
				callContext.callFrame = this._enterFrame("model.applyOperation", [operation]);
				return true;
			},
			after: (callContext) => {
				this._leaveFrame(callContext.callFrame);
			},
			error: (callContext, error) => {
				this._leaveFrame(callContext.callFrame, void 0, error);
			}
		});
	}
	/**
	* Sets up recording for key model methods like insertContent, insertObject, and deleteContent.
	* These methods represent high-level model manipulation operations.
	*/
	_tapModelMethods() {
		for (const methodName of [
			"insertContent",
			"insertObject",
			"deleteContent"
		]) tapObjectMethod(this.editor.model, methodName, {
			before: (callContext, ...params) => {
				callContext.callFrame = this._enterFrame(`model.${methodName}`, params);
				return true;
			},
			after: (callContext, result) => {
				this._leaveFrame(callContext.callFrame, result);
			},
			error: (callContext, error) => {
				this._leaveFrame(callContext.callFrame, void 0, error);
			}
		});
	}
	/**
	* Sets up recording for model selection changes.
	* Tracks when the selection range, attributes, or markers change.
	*/
	_tapModelSelection() {
		this._tapFireMethod(this.editor.model.document.selection, [
			"change:range",
			"change:attribute",
			"change:marker"
		], { eventSource: "model-selection" });
	}
	/**
	* Sets up recording for a specific command execution.
	*
	* @param commandName The name of the command to record.
	* @param command The command instance to tap into.
	*/
	_tapCommand(commandName, command) {
		tapObjectMethod(command, "execute", {
			before: (callContext, params) => {
				callContext.callFrame = this._enterFrame(`commands.${commandName}:execute`, params);
				return true;
			},
			after: (callContext, result) => {
				this._leaveFrame(callContext.callFrame, result);
			},
			error: (callContext, error) => {
				this._leaveFrame(callContext.callFrame, void 0, error);
			}
		});
	}
	/**
	* Sets up recording for UI component factory creation and component interactions.
	* Tracks when components are created and their execute events.
	*/
	_tapComponentFactory() {
		tapObjectMethod(this.editor.ui.componentFactory, "create", {
			before: (callContext, [componentName]) => {
				callContext.componentName = componentName;
				callContext.callFrame = this._enterFrame(`component-factory.create:${componentName}`);
				return true;
			},
			after: (callContext, componentInstance) => {
				const executeContext = {
					...callContext,
					eventSource: `component.${callContext.componentName}`
				};
				if (typeof componentInstance.fire == "function") this._tapFireMethod(componentInstance, ["execute"], executeContext);
				if (typeof componentInstance.panelView?.fire == "function") this._tapFireMethod(componentInstance.panelView, ["execute"], executeContext);
				if (typeof componentInstance.buttonView?.actionView?.fire == "function") this._tapFireMethod(componentInstance.buttonView.actionView, ["execute"], executeContext);
				this._leaveFrame(callContext.callFrame);
			},
			error: (callContext, error) => {
				this._leaveFrame(callContext.callFrame, void 0, error);
			}
		});
	}
	/**
	* Sets up recording for view document events like clicks, keyboard input,
	* selection changes, and other user interactions.
	*/
	_tapViewDocumentEvents() {
		this._tapFireMethod(this.editor.editing.view.document, [
			"click",
			"mousedown",
			"mouseup",
			"pointerdown",
			"pointerup",
			"focus",
			"blur",
			"keydown",
			"keyup",
			"selectionChange",
			"compositionstart",
			"compositionend",
			"beforeinput",
			"mutations",
			"enter",
			"delete",
			"insertText",
			"paste",
			"copy",
			"cut",
			"dragstart",
			"drop"
		], { eventSource: "observers" });
	}
	/**
	* Sets up recording for specific events fired by an emitter object.
	*
	* @param emitter The object that fires events to be recorded.
	* @param eventNames Array of event names to record.
	* @param context Additional context to include with recorded events.
	*/
	_tapFireMethod(emitter, eventNames, context = {}) {
		tapObjectMethod(emitter, "fire", {
			before: (callContext, [eventInfoOrName, ...params]) => {
				const eventName = typeof eventInfoOrName == "string" ? eventInfoOrName : eventInfoOrName.name;
				if (!eventNames.includes(eventName)) return false;
				callContext.callFrame = this._enterFrame(`${callContext.eventSource}:${eventName}`, params);
				return true;
			},
			after: (callContext, result) => {
				this._leaveFrame(callContext.callFrame, result);
			},
			error: (callContext, error) => {
				this._leaveFrame(callContext.callFrame, void 0, error);
			}
		}, context);
	}
	/**
	* Triggers error callback.
	*/
	_callErrorCallback(error) {
		if (!this._errorCallback || this._errors.has(error)) return;
		this._errors.add(error);
		try {
			this._errorCallback(error, this.getEntries());
		} catch (observerError) {
			console.error("ActionsRecorder onError callback error:", observerError);
		}
	}
	/**
	* The default handler for maxEntries callback.
	*/
	_maxEntriesDefaultHandler() {
		this._entries.shift();
	}
};
/**
* Creates a wrapper around a method to record its calls, results, and errors.
*
* @internal
*
* @param object The object containing the method to tap.
* @param methodName The name of the method to tap.
* @param tap The tap configuration with before/after/error hooks.
* @param context Additional context to include with the method calls.
*/
function tapObjectMethod(object, methodName, tap, context = {}) {
	const originalMethod = object[methodName];
	if (originalMethod[Symbol.for("Tapped method")]) return;
	object[methodName] = (...args) => {
		const callContext = Object.assign({}, context);
		let shouldHandle;
		try {
			shouldHandle = tap.before?.(callContext, args);
			const result = originalMethod.apply(object, args);
			if (shouldHandle) tap.after?.(callContext, result);
			return result;
		} catch (error) {
			if (shouldHandle) tap.error?.(callContext, error);
			throw error;
		}
	};
	object[methodName][Symbol.for("Tapped method")] = originalMethod;
}
/**
* Serializes a value into a JSON-serializable format.
*
* @internal
*
* @param value The value to serialize.
* @param visited Set of already serialized objects to avoid circular references.
* @returns A JSON-serializable representation of the value.
*/
function serializeValue(value, visited = /* @__PURE__ */ new WeakSet()) {
	if (!value || [
		"boolean",
		"number",
		"string"
	].includes(typeof value)) return value;
	if (typeof value.toJSON == "function") {
		const jsonData = value.toJSON();
		if (isPlainObject(jsonData) || Array.isArray(jsonData) || [
			"string",
			"number",
			"boolean"
		].includes(typeof jsonData)) return serializeValue(jsonData, visited);
	}
	if (value instanceof Error) return {
		name: value.name,
		message: value.message,
		stack: value.stack
	};
	if (isTypeCheckable(value) || typeof value != "object") return {
		type: typeof value,
		constructor: value.constructor?.name || "unknown",
		string: String(value)
	};
	if (value instanceof File || value instanceof Blob || value instanceof FormData || value instanceof DataTransfer) return String(value);
	if (visited.has(value)) return;
	visited.add(value);
	if (Array.isArray(value)) return value.length ? value.map((item) => serializeValue(item, visited)) : void 0;
	const result = {};
	const ignoreFields = [];
	if (value.domEvent) {
		ignoreFields.push("domEvent", "domTarget", "view", "document");
		result.domEvent = serializeDomEvent(value.domEvent);
		result.target = serializeValue(value.target);
		if (value.dataTransfer) result.dataTransfer = {
			types: value.dataTransfer.types,
			htmlData: value.dataTransfer.getData("text/html"),
			files: serializeValue(value.dataTransfer.files)
		};
	}
	for (const [key, val] of Object.entries(value)) {
		if (key.startsWith("_") || ignoreFields.includes(key) || typeof val == "function") continue;
		const serializedValue = serializeValue(val, visited);
		if (serializedValue !== void 0) result[key] = serializedValue;
	}
	if (Symbol.iterator in value) {
		const items = Array.from(value[Symbol.iterator]()).map((item) => serializeValue(item, visited));
		if (items.length) result._items = items;
	}
	return Object.keys(result).length ? result : void 0;
}
/**
* Serializes a DOM event into a plain object representation.
*
* Extracts common properties from DOM events such as type, target information,
* coordinates, key codes, and other relevant event data for debugging purposes.
*
* @param event The DOM event to serialize.
* @returns A serialized object containing the event's key properties.
*/
function serializeDomEvent(event) {
	let serialized = {
		type: event.type,
		target: serializeDOMTarget(event.target)
	};
	if (event instanceof MouseEvent) serialized = {
		...serialized,
		button: event.button,
		buttons: event.buttons,
		ctrlKey: event.ctrlKey,
		shiftKey: event.shiftKey,
		altKey: event.altKey,
		metaKey: event.metaKey
	};
	if (event instanceof KeyboardEvent) serialized = {
		...serialized,
		key: event.key,
		code: event.code,
		keyCode: event.keyCode,
		ctrlKey: event.ctrlKey,
		shiftKey: event.shiftKey,
		altKey: event.altKey,
		metaKey: event.metaKey,
		repeat: event.repeat
	};
	if (event instanceof InputEvent) serialized = {
		...serialized,
		data: event.data,
		inputType: event.inputType,
		isComposing: event.isComposing
	};
	if (event instanceof PointerEvent) serialized = {
		...serialized,
		isPrimary: event.isPrimary
	};
	/**
	* Serializes a DOM event target into a plain object representation.
	*
	* @param target The DOM event target to serialize.
	* @returns A serialized object containing the target's information.
	*/
	function serializeDOMTarget(target) {
		if (!target) return null;
		if (target instanceof Element) return {
			tagName: target.tagName,
			className: target.className,
			id: target.id
		};
		if (target instanceof Window || target instanceof Document) return { type: target.constructor.name };
		return {};
	}
	return serialized;
}
/**
* Checks if a value is type-checkable, meaning it has an `is` method.
*/
function isTypeCheckable(value) {
	return value && typeof value.is === "function";
}
/* v8 ignore stop -- @preserve */

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { ActionsRecorder, ContextWatchdog, EditorWatchdog, Watchdog };
//# sourceMappingURL=index.js.map