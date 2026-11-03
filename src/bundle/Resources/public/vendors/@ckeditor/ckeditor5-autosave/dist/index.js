/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { PendingActions, Plugin } from "@ckeditor/ckeditor5-core";
import { DomEmitterMixin } from "@ckeditor/ckeditor5-utils";
import { debounce } from "es-toolkit/compat";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module autosave/autosave
*/
/**
* The {@link module:autosave/autosave~Autosave} plugin allows you to automatically save the data (e.g. send it to the server)
* when needed (when the user changed the content).
*
* It listens to the {@link module:engine/model/document~ModelDocument#event:change:data `editor.model.document#change:data`}
* and `window#beforeunload` events and calls the
* {@link module:autosave/autosave~AutosaveAdapter#save `config.autosave.save()`} function.
*
* ```ts
* ClassicEditor
* 	.create( {
* 		attachTo: document.querySelector( '#editor' ),
* 		plugins: [ ArticlePluginSet, Autosave ],
* 		toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo' ],
* 		image: {
* 			toolbar: [ 'imageStyle:block', 'imageStyle:side', '|', 'toggleImageCaption', 'imageTextAlternative' ],
* 		},
* 		autosave: {
* 			save( editor: Editor ) {
* 				// The saveData() function must return a promise
* 				// which should be resolved when the data is successfully saved.
* 				return saveData( editor.getData() );
* 			}
* 		}
* 	} );
* ```
*
* Read more about this feature in the {@glink features/autosave Autosave} feature guide.
*/
var Autosave = class extends Plugin {
	/**
	* The adapter is an object with a `save()` method. That method will be called whenever
	* the data changes. It might be called some time after the change,
	* since the event is throttled for performance reasons.
	*/
	adapter;
	/**
	* Debounced save method. The `save()` method is called the specified `waitingTime` after `debouncedSave()` is called,
	* unless a new action happens in the meantime.
	*/
	_debouncedSave;
	/**
	* The last saved document version.
	*/
	_lastDocumentVersion;
	/**
	* Promise used for asynchronous save calls.
	*
	* Created to handle the autosave call to an external data source. It resolves when that call is finished. It is re-used if
	* save is called before the promise has been resolved. It is set to `null` if there is no call in progress.
	*/
	_savePromise;
	/**
	* DOM emitter.
	*/
	_domEmitter;
	/**
	* The configuration of this plugins.
	*/
	_config;
	/**
	* Editor's pending actions manager.
	*/
	_pendingActions;
	/**
	* Informs whether there should be another autosave callback performed, immediately after current autosave callback finishes.
	*
	* This is set to `true` when there is a save request while autosave callback is already being processed
	* and the model has changed since the last save.
	*/
	_makeImmediateSave;
	/**
	* An action that will be added to the pending action manager for actions happening in that plugin.
	*/
	_action = null;
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "Autosave";
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
		return [PendingActions];
	}
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		const config = editor.config.get("autosave") || {};
		const waitingTime = config.waitingTime || 1e3;
		this.set("state", "synchronized");
		this._debouncedSave = debounce(this._save.bind(this), waitingTime);
		this._lastDocumentVersion = editor.model.document.version;
		this._savePromise = null;
		this._domEmitter = new (DomEmitterMixin())();
		this._config = config;
		this._pendingActions = editor.plugins.get(PendingActions);
		this._makeImmediateSave = false;
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const doc = editor.model.document;
		this.listenTo(editor, "ready", () => {
			this.listenTo(doc, "change:data", (evt, batch) => {
				if (!this._saveCallbacks.length) return;
				if (!batch.isLocal) return;
				if (this.state === "synchronized") {
					this.state = "waiting";
					this._setPendingAction();
				}
				if (this.state === "waiting") this._debouncedSave();
			});
		});
		this.listenTo(editor, "destroy", () => this._flush(), { priority: "highest" });
		/* v8 ignore next -- @preserve */
		this._domEmitter.listenTo(window, "beforeunload", (evtInfo, domEvt) => {
			if (this._pendingActions.hasAny) domEvt.returnValue = this._pendingActions.first.message;
		});
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		this._domEmitter.stopListening();
		super.destroy();
	}
	/**
	* Immediately calls autosave callback. All previously queued (debounced) callbacks are cleared. If there is already an autosave
	* callback in progress, then the requested save will be performed immediately after the current callback finishes.
	*
	* @returns A promise that will be resolved when the autosave callback is finished.
	*/
	save() {
		this._debouncedSave.cancel();
		return this._save();
	}
	/**
	* Invokes the remaining `_save()` method call.
	*/
	_flush() {
		this._debouncedSave.flush();
	}
	/**
	* If the adapter is set and a new document version exists,
	* the `_save()` method creates a pending action and calls the `adapter.save()` method.
	* It waits for the result and then removes the created pending action.
	*
	* @returns A promise that will be resolved when the autosave callback is finished.
	*/
	_save() {
		if (this._savePromise) {
			this._makeImmediateSave = this.editor.model.document.version > this._lastDocumentVersion;
			return this._savePromise;
		}
		this._setPendingAction();
		this.state = "saving";
		this._lastDocumentVersion = this.editor.model.document.version;
		this._savePromise = Promise.resolve().then(() => Promise.all(this._saveCallbacks.map((cb) => cb(this.editor)))).finally(() => {
			this._savePromise = null;
		}).then(() => {
			if (this._makeImmediateSave) {
				this._makeImmediateSave = false;
				return this._save();
			} else if (this.editor.model.document.version > this._lastDocumentVersion) {
				this.state = "waiting";
				this._debouncedSave();
			} else {
				this.state = "synchronized";
				this._pendingActions.remove(this._action);
				this._action = null;
			}
		}).catch((err) => {
			this.state = "error";
			this.state = "saving";
			this._debouncedSave();
			throw err;
		});
		return this._savePromise;
	}
	/**
	* Creates a pending action if it is not set already.
	*/
	_setPendingAction() {
		const t = this.editor.t;
		if (!this._action) this._action = this._pendingActions.add(t("Saving changes"));
	}
	/**
	* Saves callbacks.
	*/
	get _saveCallbacks() {
		const saveCallbacks = [];
		if (this.adapter && this.adapter.save) saveCallbacks.push(this.adapter.save);
		if (this._config.save) saveCallbacks.push(this._config.save);
		return saveCallbacks;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { Autosave };
//# sourceMappingURL=index.js.map