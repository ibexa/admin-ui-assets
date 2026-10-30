/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { IconFindReplace, IconPreviousArrow } from "@ckeditor/ckeditor5-icons";
import { ButtonView, CollapsibleView, CssTransitionDisablerMixin, Dialog, DialogViewPosition, DropdownView, FocusCycler, FormHeaderView, LabeledFieldView, MenuBarMenuListItemButtonView, SwitchButtonView, View, ViewCollection, createDropdown, createLabeledInputText, submitHandler } from "@ckeditor/ckeditor5-ui";
import { Collection, FocusTracker, KeystrokeHandler, ObservableMixin, Rect, isVisible, scrollViewportToShowTarget, uid } from "@ckeditor/ckeditor5-utils";
import { debounce, escapeRegExp } from "es-toolkit/compat";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module find-and-replace/ui/findandreplaceformview
*/
/**
* The find and replace form view class.
*
* See {@link module:find-and-replace/ui/findandreplaceformview~FindAndReplaceFormView}.
*/
var FindAndReplaceFormView = class extends View {
	/**
	* A collection of child views.
	*/
	children;
	/**
	* The find in text input view that stores the searched string.
	*
	* @internal
	*/
	_findInputView;
	/**
	* The replace input view.
	*/
	_replaceInputView;
	/**
	* The find button view that initializes the search process.
	*/
	_findButtonView;
	/**
	* The find previous button view.
	*/
	_findPrevButtonView;
	/**
	* The find next button view.
	*/
	_findNextButtonView;
	/**
	* A collapsible view aggregating the advanced search options.
	*/
	_advancedOptionsCollapsibleView;
	/**
	* A switch button view controlling the "Match case" option.
	*/
	_matchCaseSwitchView;
	/**
	* A switch button view controlling the "Whole words only" option.
	*/
	_wholeWordsOnlySwitchView;
	/**
	* The replace button view.
	*/
	_replaceButtonView;
	/**
	* The replace all button view.
	*/
	_replaceAllButtonView;
	/**
	* The `div` aggregating the inputs.
	*/
	_inputsDivView;
	/**
	* The `div` aggregating the action buttons.
	*/
	_actionButtonsDivView;
	/**
	* Tracks information about the DOM focus in the form.
	*/
	_focusTracker;
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	_keystrokes;
	/**
	* A collection of views that can be focused in the form.
	*/
	_focusables;
	/**
	* Helps cycling over {@link #_focusables} in the form.
	*/
	focusCycler;
	/**
	* Creates a view of find and replace form.
	*
	* @param locale The localization services instance.
	*/
	constructor(locale) {
		super(locale);
		const t = locale.t;
		this.children = this.createCollection();
		this.set("matchCount", 0);
		this.set("highlightOffset", 0);
		this.set("isDirty", false);
		this.set("_areCommandsEnabled", {});
		this.set("_resultsCounterText", "");
		this.set("_matchCase", false);
		this.set("_wholeWordsOnly", false);
		this.bind("_searchResultsFound").to(this, "matchCount", this, "isDirty", (matchCount, isDirty) => {
			return matchCount > 0 && !isDirty;
		});
		this._findInputView = this._createInputField(t("Find in text…"));
		this._findPrevButtonView = this._createButton({
			label: t("Previous result"),
			class: "ck-button-prev",
			icon: IconPreviousArrow,
			keystroke: "Shift+F3",
			tooltip: true
		});
		this._findNextButtonView = this._createButton({
			label: t("Next result"),
			class: "ck-button-next",
			icon: IconPreviousArrow,
			keystroke: "F3",
			tooltip: true
		});
		this._replaceInputView = this._createInputField(t("Replace with…"), "ck-labeled-field-replace");
		this._inputsDivView = this._createInputsDiv();
		this._matchCaseSwitchView = this._createMatchCaseSwitch();
		this._wholeWordsOnlySwitchView = this._createWholeWordsOnlySwitch();
		this._advancedOptionsCollapsibleView = this._createAdvancedOptionsCollapsible();
		this._replaceAllButtonView = this._createButton({
			label: t("Replace all"),
			class: "ck-button-replaceall",
			withText: true
		});
		this._replaceButtonView = this._createButton({
			label: t("Replace"),
			class: "ck-button-replace",
			withText: true
		});
		this._findButtonView = this._createButton({
			label: t("Find"),
			class: "ck-button-find ck-button-action",
			withText: true
		});
		this._actionButtonsDivView = this._createActionButtonsDiv();
		this._focusTracker = new FocusTracker();
		this._keystrokes = new KeystrokeHandler();
		this._focusables = new ViewCollection();
		this.focusCycler = new FocusCycler({
			focusables: this._focusables,
			focusTracker: this._focusTracker,
			keystrokeHandler: this._keystrokes,
			actions: {
				focusPrevious: "shift + tab",
				focusNext: "tab"
			}
		});
		this.children.addMany([
			this._inputsDivView,
			this._advancedOptionsCollapsibleView,
			this._actionButtonsDivView
		]);
		this.setTemplate({
			tag: "form",
			attributes: {
				class: ["ck", "ck-find-and-replace-form"],
				tabindex: "-1"
			},
			children: this.children
		});
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		submitHandler({ view: this });
		this._initFocusCycling();
		this._initKeystrokeHandling();
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		this._focusTracker.destroy();
		this._keystrokes.destroy();
	}
	/**
	* @inheritDoc
	*/
	focus(direction) {
		if (direction === -1) this.focusCycler.focusLast();
		else this.focusCycler.focusFirst();
	}
	/**
	* Resets the form before re-appearing.
	*
	* It clears error messages, hides the match counter and disables the replace feature
	* until the next hit of the "Find" button.
	*
	* **Note**: It does not reset inputs and options, though. This way the form works better in editors with
	* disappearing toolbar (e.g. BalloonEditor): hiding the toolbar by accident (together with the find and replace UI)
	* does not require filling the entire form again.
	*/
	reset() {
		this._findInputView.errorText = null;
		this.isDirty = true;
	}
	/**
	* Returns the value of the find input.
	*/
	get _textToFind() {
		return this._findInputView.fieldView.element.value;
	}
	/**
	* Returns the value of the replace input.
	*/
	get _textToReplace() {
		return this._replaceInputView.fieldView.element.value;
	}
	/**
	* Configures and returns the `<div>` aggregating all form inputs.
	*/
	_createInputsDiv() {
		const locale = this.locale;
		const t = locale.t;
		const inputsDivView = new View(locale);
		this._findInputView.fieldView.on("input", () => {
			this.isDirty = true;
		});
		this._findPrevButtonView.delegate("execute").to(this, "findPrevious");
		this._findNextButtonView.delegate("execute").to(this, "findNext");
		this._findPrevButtonView.bind("isEnabled").to(this, "_areCommandsEnabled", ({ findPrevious }) => findPrevious);
		this._findNextButtonView.bind("isEnabled").to(this, "_areCommandsEnabled", ({ findNext }) => findNext);
		this._injectFindResultsCounter();
		this._replaceInputView.bind("isEnabled").to(this, "_areCommandsEnabled", this, "_searchResultsFound", ({ replace }, resultsFound) => replace && resultsFound);
		this._replaceInputView.bind("infoText").to(this._replaceInputView, "isEnabled", this._replaceInputView, "isFocused", (isEnabled, isFocused) => {
			if (isEnabled || !isFocused) return "";
			return t("Tip: Find some text first in order to replace it.");
		});
		inputsDivView.setTemplate({
			tag: "div",
			attributes: { class: ["ck", "ck-find-and-replace-form__inputs"] },
			children: [
				this._findInputView,
				this._findPrevButtonView,
				this._findNextButtonView,
				this._replaceInputView
			]
		});
		return inputsDivView;
	}
	/**
	* The action performed when the {@link #_findButtonView} is pressed.
	*/
	_onFindButtonExecute() {
		if (!this._textToFind) {
			const t = this.t;
			this._findInputView.errorText = t("Text to find must not be empty.");
			return;
		}
		this.isDirty = false;
		this.fire("findNext", {
			searchText: this._textToFind,
			matchCase: this._matchCase,
			wholeWords: this._wholeWordsOnly
		});
	}
	/**
	* Configures an injects the find results counter displaying a "N of M" label of the {@link #_findInputView}.
	*/
	_injectFindResultsCounter() {
		const locale = this.locale;
		const t = locale.t;
		const bind = this.bindTemplate;
		const resultsCounterView = new View(this.locale);
		this.bind("_resultsCounterText").to(this, "highlightOffset", this, "matchCount", (highlightOffset, matchCount) => t("%0 of %1", [highlightOffset, matchCount]));
		resultsCounterView.setTemplate({
			tag: "span",
			attributes: { class: [
				"ck",
				"ck-results-counter",
				bind.if("isDirty", "ck-hidden")
			] },
			children: [{ text: bind.to("_resultsCounterText") }]
		});
		const updateFindInputPadding = () => {
			const inputElement = this._findInputView.fieldView.element;
			if (!inputElement || !isVisible(inputElement)) return;
			const counterWidth = new Rect(resultsCounterView.element).width;
			const paddingPropertyName = locale.uiLanguageDirection === "ltr" ? "paddingRight" : "paddingLeft";
			if (!counterWidth) inputElement.style[paddingPropertyName] = "";
			else inputElement.style[paddingPropertyName] = `calc( 2 * var(--ck-spacing-standard) + ${counterWidth}px )`;
		};
		this.on("change:_resultsCounterText", updateFindInputPadding, { priority: "low" });
		this.on("change:isDirty", updateFindInputPadding, { priority: "low" });
		this._findInputView.template.children[0].children.push(resultsCounterView);
	}
	/**
	* Creates the collapsible view aggregating the advanced search options.
	*/
	_createAdvancedOptionsCollapsible() {
		const t = this.locale.t;
		const collapsible = new CollapsibleView(this.locale, [this._matchCaseSwitchView, this._wholeWordsOnlySwitchView]);
		collapsible.set({
			label: t("Advanced options"),
			isCollapsed: true
		});
		return collapsible;
	}
	/**
	* Configures and returns the `<div>` element aggregating all form action buttons.
	*/
	_createActionButtonsDiv() {
		const actionsDivView = new View(this.locale);
		this._replaceButtonView.bind("isEnabled").to(this, "_areCommandsEnabled", this, "_searchResultsFound", ({ replace }, resultsFound) => replace && resultsFound);
		this._replaceAllButtonView.bind("isEnabled").to(this, "_areCommandsEnabled", this, "_searchResultsFound", ({ replaceAll }, resultsFound) => replaceAll && resultsFound);
		this._replaceButtonView.on("execute", () => {
			this.fire("replace", {
				searchText: this._textToFind,
				replaceText: this._textToReplace
			});
		});
		this._replaceAllButtonView.on("execute", () => {
			this.fire("replaceAll", {
				searchText: this._textToFind,
				replaceText: this._textToReplace
			});
			this.focus();
		});
		this._findButtonView.on("execute", this._onFindButtonExecute.bind(this));
		actionsDivView.setTemplate({
			tag: "div",
			attributes: { class: ["ck", "ck-find-and-replace-form__actions"] },
			children: [
				this._replaceAllButtonView,
				this._replaceButtonView,
				this._findButtonView
			]
		});
		return actionsDivView;
	}
	/**
	* Creates, configures and returns and instance of a dropdown allowing users to narrow
	* the search criteria down. The dropdown has a list with switch buttons for each option.
	*/
	_createMatchCaseSwitch() {
		const t = this.locale.t;
		const matchCaseSwitchButton = new SwitchButtonView(this.locale);
		matchCaseSwitchButton.set({
			label: t("Match case"),
			withText: true
		});
		matchCaseSwitchButton.bind("isOn").to(this, "_matchCase");
		matchCaseSwitchButton.on("execute", () => {
			this._matchCase = !this._matchCase;
			this.isDirty = true;
		});
		return matchCaseSwitchButton;
	}
	/**
	* Creates, configures and returns and instance of a dropdown allowing users to narrow
	* the search criteria down. The dropdown has a list with switch buttons for each option.
	*/
	_createWholeWordsOnlySwitch() {
		const t = this.locale.t;
		const wholeWordsOnlySwitchButton = new SwitchButtonView(this.locale);
		wholeWordsOnlySwitchButton.set({
			label: t("Whole words only"),
			withText: true
		});
		wholeWordsOnlySwitchButton.bind("isOn").to(this, "_wholeWordsOnly");
		wholeWordsOnlySwitchButton.on("execute", () => {
			this._wholeWordsOnly = !this._wholeWordsOnly;
			this.isDirty = true;
		});
		return wholeWordsOnlySwitchButton;
	}
	/**
	* Initializes the {@link #_focusables} and {@link #_focusTracker} to allow navigation
	* using <kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd> keystrokes in the right order.
	*/
	_initFocusCycling() {
		[
			this._findInputView,
			this._findPrevButtonView,
			this._findNextButtonView,
			this._replaceInputView,
			this._advancedOptionsCollapsibleView.buttonView,
			this._matchCaseSwitchView,
			this._wholeWordsOnlySwitchView,
			this._replaceAllButtonView,
			this._replaceButtonView,
			this._findButtonView
		].forEach((v) => {
			this._focusables.add(v);
			this._focusTracker.add(v.element);
		});
	}
	/**
	* Initializes the keystroke handling in the form.
	*/
	_initKeystrokeHandling() {
		const stopPropagation = (data) => data.stopPropagation();
		const stopPropagationAndPreventDefault = (data) => {
			data.stopPropagation();
			data.preventDefault();
		};
		this._keystrokes.listenTo(this.element);
		this._keystrokes.set("f3", (event) => {
			stopPropagationAndPreventDefault(event);
			this._findNextButtonView.fire("execute");
		});
		this._keystrokes.set("shift+f3", (event) => {
			stopPropagationAndPreventDefault(event);
			this._findPrevButtonView.fire("execute");
		});
		this._keystrokes.set("enter", (event) => {
			const target = event.target;
			if (target === this._findInputView.fieldView.element) {
				if (this._areCommandsEnabled.findNext) this._findNextButtonView.fire("execute");
				else this._findButtonView.fire("execute");
				stopPropagationAndPreventDefault(event);
			} else if (target === this._replaceInputView.fieldView.element && !this.isDirty) {
				this._replaceButtonView.fire("execute");
				stopPropagationAndPreventDefault(event);
			}
		});
		this._keystrokes.set("shift+enter", (event) => {
			if (event.target !== this._findInputView.fieldView.element) return;
			if (this._areCommandsEnabled.findPrevious) this._findPrevButtonView.fire("execute");
			else this._findButtonView.fire("execute");
			stopPropagationAndPreventDefault(event);
		});
		this._keystrokes.set("arrowright", stopPropagation);
		this._keystrokes.set("arrowleft", stopPropagation);
		this._keystrokes.set("arrowup", stopPropagation);
		this._keystrokes.set("arrowdown", stopPropagation);
	}
	/**
	* Creates a button view.
	*
	* @param options The properties of the `ButtonView`.
	* @returns The button view instance.
	*/
	_createButton(options) {
		const button = new ButtonView(this.locale);
		button.set(options);
		return button;
	}
	/**
	* Creates a labeled input view.
	*
	* @param label The input label.
	* @returns The labeled input view instance.
	*/
	_createInputField(label, className) {
		const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);
		labeledInput.label = label;
		labeledInput.class = className;
		return labeledInput;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module find-and-replace/findandreplaceui
*/
/**
* The default find and replace UI.
*
* It registers the `'findAndReplace'` UI button in the editor's {@link module:ui/componentfactory~ComponentFactory component factory}.
* that uses the {@link module:find-and-replace/findandreplace~FindAndReplace FindAndReplace} plugin API.
*/
var FindAndReplaceUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [Dialog];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "FindAndReplaceUI";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* A reference to the find and replace form view.
	*/
	formView;
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		editor.config.define("findAndReplace.uiType", "dialog");
		this.formView = null;
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const isUiUsingDropdown = editor.config.get("findAndReplace.uiType") === "dropdown";
		const findCommand = editor.commands.get("find");
		const t = this.editor.t;
		editor.ui.componentFactory.add("findAndReplace", () => {
			let view;
			if (isUiUsingDropdown) {
				view = this._createDropdown();
				view.bind("isEnabled").to(findCommand);
			} else view = this._createDialogButtonForToolbar();
			editor.keystrokes.set("Ctrl+F", (data, cancelEvent) => {
				if (!findCommand.isEnabled) return;
				if (view instanceof DropdownView) {
					const dropdownButtonView = view.buttonView;
					if (!dropdownButtonView.isOn) dropdownButtonView.fire("execute");
				} else if (view.isOn) editor.plugins.get("Dialog").view.focus();
				else view.fire("execute");
				cancelEvent();
			});
			return view;
		});
		if (!isUiUsingDropdown) editor.ui.componentFactory.add("menuBar:findAndReplace", () => {
			return this._createDialogButtonForMenuBar();
		});
		editor.accessibility.addKeystrokeInfos({ keystrokes: [{
			label: t("Find in the document"),
			keystroke: "CTRL+F"
		}] });
	}
	/**
	* Creates a dropdown containing the find and replace form.
	*/
	_createDropdown() {
		const editor = this.editor;
		const t = editor.locale.t;
		const dropdownView = createDropdown(editor.locale);
		dropdownView.once("change:isOpen", () => {
			this.formView = this._createFormView();
			this.formView.children.add(new FormHeaderView(editor.locale, { label: t("Find and replace") }), 0);
			dropdownView.panelView.children.add(this.formView);
		});
		dropdownView.on("change:isOpen", (event, name, isOpen) => {
			if (isOpen) this._setupFormView();
			else this.fire("searchReseted");
		}, { priority: "low" });
		dropdownView.buttonView.set({
			icon: IconFindReplace,
			label: t("Find and replace"),
			keystroke: "CTRL+F",
			tooltip: true
		});
		return dropdownView;
	}
	/**
	* Creates a button that opens a dialog with the find and replace form.
	*/
	_createDialogButtonForToolbar() {
		const editor = this.editor;
		const buttonView = this._createButton(ButtonView);
		const dialog = editor.plugins.get("Dialog");
		buttonView.set({ tooltip: true });
		buttonView.bind("isOn").to(dialog, "id", (id) => id === "findAndReplace");
		buttonView.on("execute", () => {
			if (buttonView.isOn) dialog.hide();
			else this._showDialog();
		});
		return buttonView;
	}
	/**
	* Creates a button for for menu bar that will show find and replace dialog.
	*/
	_createDialogButtonForMenuBar() {
		const buttonView = this._createButton(MenuBarMenuListItemButtonView);
		const dialogPlugin = this.editor.plugins.get("Dialog");
		const dialog = this.editor.plugins.get("Dialog");
		buttonView.set({
			role: "menuitemcheckbox",
			isToggleable: true
		});
		buttonView.bind("isOn").to(dialog, "id", (id) => id === "findAndReplace");
		buttonView.on("execute", () => {
			if (dialogPlugin.id === "findAndReplace") {
				dialogPlugin.hide();
				return;
			}
			this._showDialog();
		});
		return buttonView;
	}
	/**
	* Creates a button for find and replace command to use either in toolbar or in menu bar.
	*/
	_createButton(ButtonClass) {
		const editor = this.editor;
		const findCommand = editor.commands.get("find");
		const buttonView = new ButtonClass(editor.locale);
		const t = editor.locale.t;
		buttonView.bind("isEnabled").to(findCommand);
		buttonView.set({
			icon: IconFindReplace,
			label: t("Find and replace"),
			keystroke: "CTRL+F"
		});
		return buttonView;
	}
	/**
	* Shows the find and replace dialog.
	*/
	_showDialog() {
		const editor = this.editor;
		const dialog = editor.plugins.get("Dialog");
		const t = editor.locale.t;
		if (!this.formView) this.formView = this._createFormView();
		dialog.show({
			id: "findAndReplace",
			title: t("Find and replace"),
			content: this.formView,
			position: DialogViewPosition.EDITOR_TOP_SIDE,
			onShow: () => {
				this._setupFormView();
			},
			onHide: () => {
				this.fire("searchReseted");
			}
		});
	}
	/**
	* Sets up the form view for the findN and replace.
	*/
	_createFormView() {
		const editor = this.editor;
		const formView = new (CssTransitionDisablerMixin(FindAndReplaceFormView))(editor.locale);
		const commands = editor.commands;
		const editingState = this.editor.plugins.get("FindAndReplaceEditing").state;
		formView.bind("highlightOffset").to(editingState, "highlightedOffset");
		formView.listenTo(editingState.results, "change", () => {
			formView.matchCount = editingState.results.length;
		});
		const findNextCommand = commands.get("findNext");
		const findPreviousCommand = commands.get("findPrevious");
		const replaceCommand = commands.get("replace");
		const replaceAllCommand = commands.get("replaceAll");
		formView.bind("_areCommandsEnabled").to(findNextCommand, "isEnabled", findPreviousCommand, "isEnabled", replaceCommand, "isEnabled", replaceAllCommand, "isEnabled", (findNext, findPrevious, replace, replaceAll) => ({
			findNext,
			findPrevious,
			replace,
			replaceAll
		}));
		formView.delegate("findNext", "findPrevious", "replace", "replaceAll").to(this);
		formView.on("change:isDirty", (evt, data, isDirty) => {
			if (isDirty) this.fire("searchReseted");
		});
		return formView;
	}
	/**
	* Clears the find and replace form and focuses the search text field.
	*/
	_setupFormView() {
		this.formView.disableCssTransitions();
		this.formView.reset();
		this.formView._findInputView.fieldView.select();
		this.formView.enableCssTransitions();
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module find-and-replace/findcommand
*/
/**
* The find command. It is used by the {@link module:find-and-replace/findandreplace~FindAndReplace find and replace feature}.
*/
var FindCommand = class extends Command {
	/**
	* The find and replace state object used for command operations.
	*/
	_state;
	/**
	* Creates a new `FindCommand` instance.
	*
	* @param editor The editor on which this command will be used.
	* @param state An object to hold plugin state.
	*/
	constructor(editor, state) {
		super(editor);
		this.isEnabled = true;
		this.affectsData = false;
		this._state = state;
	}
	/**
	* Executes the command.
	*
	* @param callbackOrText
	* @param options Options object.
	* @param options.matchCase If set to `true`, the letter case will be matched.
	* @param options.wholeWords If set to `true`, only whole words that match `callbackOrText` will be matched.
	*
	* @fires execute
	*/
	execute(callbackOrText, { matchCase, wholeWords } = {}) {
		const { editor } = this;
		const { model } = editor;
		const findAndReplaceUtils = editor.plugins.get("FindAndReplaceUtils");
		let findCallback;
		let callbackSearchText = "";
		if (typeof callbackOrText === "string") findCallback = (...args) => ({
			results: findAndReplaceUtils.findByTextCallback(callbackOrText, {
				matchCase,
				wholeWords
			})(...args),
			searchText: callbackOrText
		});
		else findCallback = callbackOrText;
		const oldCallback = findCallback;
		findCallback = (...args) => {
			const result = oldCallback(...args);
			if (result && "searchText" in result) callbackSearchText = result.searchText;
			return result;
		};
		const results = model.document.getRootNames().reduce(((currentResults, rootName) => findAndReplaceUtils.updateFindResultFromRange(model.createRangeIn(model.document.getRoot(rootName)), model, findCallback, currentResults)), null);
		this._state.clear(model);
		this._state.results.addMany(results);
		this._state.highlightedResult = results.get(0);
		this._state.searchText = callbackSearchText;
		/* v8 ignore next -- @preserve */
		if (findCallback) this._state.lastSearchCallback = findCallback;
		this._state.matchCase = !!matchCase;
		this._state.matchWholeWords = !!wholeWords;
		return {
			results,
			findCallback
		};
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
const FindAndReplaceStateBase = /* #__PURE__ */ ObservableMixin();
/**
* The object storing find and replace plugin state for a given editor instance.
*/
var FindAndReplaceState = class extends FindAndReplaceStateBase {
	/**
	* Creates an instance of the state.
	*/
	constructor(model) {
		super();
		this.set("results", new Collection());
		this.set("highlightedResult", null);
		this.set("highlightedOffset", 0);
		this.set("searchText", "");
		this.set("replaceText", "");
		this.set("lastSearchCallback", null);
		this.set("matchCase", false);
		this.set("matchWholeWords", false);
		this.results.on("change", (eventInfo, { removed, index }) => {
			if (Array.from(removed).length) {
				let highlightedResultRemoved = false;
				model.change((writer) => {
					for (const removedResult of removed) {
						if (this.highlightedResult === removedResult) highlightedResultRemoved = true;
						if (model.markers.has(removedResult.marker.name)) writer.removeMarker(removedResult.marker);
					}
				});
				if (highlightedResultRemoved) {
					const nextHighlightedIndex = index >= this.results.length ? 0 : index;
					this.highlightedResult = this.results.get(nextHighlightedIndex);
				}
			}
		});
		this.on("change:highlightedResult", () => {
			this.refreshHighlightOffset(model);
		});
	}
	/**
	* Cleans the state up and removes markers from the model.
	*/
	clear(model) {
		this.searchText = "";
		model.change((writer) => {
			if (this.highlightedResult) {
				const oldMatchId = this.highlightedResult.marker.name.split(":")[1];
				const oldMarker = model.markers.get(`findResultHighlighted:${oldMatchId}`);
				if (oldMarker) writer.removeMarker(oldMarker);
			}
			[...this.results].forEach(({ marker }) => {
				writer.removeMarker(marker);
			});
		});
		this.results.clear();
	}
	/**
	* Refreshes the highlight result offset based on it's index within the result list.
	*/
	refreshHighlightOffset(model) {
		const { highlightedResult, results } = this;
		if (highlightedResult) this.highlightedOffset = sortSearchResultsByMarkerPositions(model, [...results]).indexOf(highlightedResult) + 1;
		else this.highlightedOffset = 0;
	}
};
/**
* Sorts search results by marker positions. Make sure that the results are sorted in the same order as they appear in the document
* to avoid issues with the `find next` command. Apparently, the order of the results in the state might be different than the order
* of the markers in the model.
*
* @internal
*/
function sortSearchResultsByMarkerPositions(model, results) {
	const sortMapping = {
		before: -1,
		same: 0,
		after: 1,
		different: 1
	};
	return model.document.getRootNames().flatMap((rootName) => results.filter((result) => result.marker.getStart().root.rootName === rootName).sort((a, b) => sortMapping[a.marker.getStart().compareWith(b.marker.getStart())]));
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module find-and-replace/replacecommandbase
*/
var FindReplaceCommandBase = class extends Command {
	/**
	* The find and replace state object used for command operations.
	*/
	_state;
	/**
	* Creates a new `ReplaceCommand` instance.
	*
	* @param editor Editor on which this command will be used.
	* @param state An object to hold plugin state.
	*/
	constructor(editor, state) {
		super(editor);
		this.isEnabled = true;
		this._state = state;
		this._isEnabledBasedOnSelection = false;
	}
	/**
	* Common logic for both `replace` commands.
	* Replace a given find result by a string or a callback.
	*
	* @param result A single result from the find command.
	*/
	_replace(replacementText, result) {
		const { model } = this.editor;
		const range = result.marker.getRange();
		if (!model.canEditAt(range)) return;
		model.change((writer) => {
			if (range.root.rootName === "$graveyard") {
				this._state.results.remove(result);
				return;
			}
			let textAttributes = {};
			for (const item of range.getItems()) if (item.is("$text") || item.is("$textProxy")) {
				textAttributes = item.getAttributes();
				break;
			}
			model.insertContent(writer.createText(replacementText, textAttributes), range);
			if (this._state.results.has(result)) this._state.results.remove(result);
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* The replace command. It is used by the {@link module:find-and-replace/findandreplace~FindAndReplace find and replace feature}.
*/
var ReplaceCommand = class extends FindReplaceCommandBase {
	/**
	* Replace a given find result by a string or a callback.
	*
	* @param result A single result from the find command.
	*
	* @fires execute
	*/
	execute(replacementText, result) {
		const oldHighlightOffset = Math.max(this._state.highlightedOffset - 1, 0);
		this._replace(replacementText, result);
		if (this._state.results.length) {
			const sortedResults = sortSearchResultsByMarkerPositions(this.editor.model, [...this._state.results]);
			this._state.highlightedResult = sortedResults[oldHighlightOffset % sortedResults.length];
		}
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module find-and-replace/replaceallcommand
*/
/**
* The replace all command. It is used by the {@link module:find-and-replace/findandreplace~FindAndReplace find and replace feature}.
*/
var ReplaceAllCommand = class extends FindReplaceCommandBase {
	/**
	* Replaces all the occurrences of `textToReplace` with a given `newText` string.
	*
	* ```ts
	*	replaceAllCommand.execute( 'replaceAll', 'new text replacement', 'text to replace' );
	* ```
	*
	* Alternatively you can call it from editor instance:
	*
	* ```ts
	*	editor.execute( 'replaceAll', 'new text', 'old text' );
	* ```
	*
	* @param newText Text that will be inserted to the editor for each match.
	* @param textToReplace Text to be replaced or a collection of matches
	* as returned by the find command.
	*
	* @fires module:core/command~Command#event:execute
	*/
	execute(newText, textToReplace) {
		const { editor } = this;
		const { model } = editor;
		const findAndReplaceUtils = editor.plugins.get("FindAndReplaceUtils");
		const results = textToReplace instanceof Collection ? textToReplace : model.document.getRootNames().reduce(((currentResults, rootName) => findAndReplaceUtils.updateFindResultFromRange(model.createRangeIn(model.document.getRoot(rootName)), model, findAndReplaceUtils.findByTextCallback(textToReplace, this._state), currentResults)), null);
		if (results.length) model.change(() => {
			[...results].forEach((searchResult) => {
				this._replace(newText, searchResult);
			});
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module find-and-replace/findnextcommand
*/
/**
* The find next command. Moves the highlight to the next search result.
*
* It is used by the {@link module:find-and-replace/findandreplace~FindAndReplace find and replace feature}.
*/
var FindNextCommand = class extends Command {
	/**
	* The find and replace state object used for command operations.
	*/
	_state;
	/**
	* Creates a new `FindNextCommand` instance.
	*
	* @param editor The editor on which this command will be used.
	* @param state An object to hold plugin state.
	*/
	constructor(editor, state) {
		super(editor);
		this.affectsData = false;
		this._state = state;
		this.isEnabled = false;
		this.listenTo(this._state.results, "change", () => {
			this.isEnabled = this._state.results.length > 1;
		});
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		this.isEnabled = this._state.results.length > 1;
	}
	/**
	* @inheritDoc
	*/
	execute() {
		const results = this._state.results;
		const currentIndex = results.getIndex(this._state.highlightedResult);
		const nextIndex = currentIndex + 1 >= results.length ? 0 : currentIndex + 1;
		this._state.highlightedResult = this._state.results.get(nextIndex);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module find-and-replace/findpreviouscommand
*/
/**
* The find previous command. Moves the highlight to the previous search result.
*
* It is used by the {@link module:find-and-replace/findandreplace~FindAndReplace find and replace feature}.
*/
var FindPreviousCommand = class extends FindNextCommand {
	/**
	* @inheritDoc
	*/
	execute() {
		const currentIndex = this._state.results.getIndex(this._state.highlightedResult);
		const previousIndex = currentIndex - 1 < 0 ? this._state.results.length - 1 : currentIndex - 1;
		this._state.highlightedResult = this._state.results.get(previousIndex);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* A set of helpers related to find and replace.
*/
var FindAndReplaceUtils = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "FindAndReplaceUtils";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* Executes findCallback and updates search results list.
	*
	* @param range The model range to scan for matches.
	* @param model The model.
	* @param findCallback The callback that should return `true` if provided text matches the search term.
	* @param startResults An optional collection of find matches that the function should
	* start with. This would be a collection returned by a previous `updateFindResultFromRange()` call.
	* @returns A collection of objects describing find match.
	*
	* An example structure:
	*
	* ```js
	* {
	*	id: resultId,
	*	label: foundItem.label,
	*	marker
	*	}
	* ```
	*/
	updateFindResultFromRange(range, model, findCallback, startResults) {
		const results = startResults || new Collection();
		const checkIfResultAlreadyOnList = (marker) => results.find((markerItem) => {
			const { marker: resultsMarker } = markerItem;
			const resultRange = resultsMarker.getRange();
			const markerRange = marker.getRange();
			return resultRange.isEqual(markerRange);
		});
		model.change((writer) => {
			const processTextContainer = (item) => {
				let foundItems = findCallback({
					item,
					text: this.rangeToText(model.createRangeIn(item))
				});
				if (!foundItems) return;
				if ("results" in foundItems) foundItems = foundItems.results;
				foundItems.forEach((foundItem) => {
					const resultId = `findResult:${uid()}`;
					const marker = writer.addMarker(resultId, {
						usingOperation: false,
						affectsData: false,
						range: writer.createRange(writer.createPositionAt(item, foundItem.start), writer.createPositionAt(item, foundItem.end))
					});
					const index = findInsertIndex(results, marker);
					if (!checkIfResultAlreadyOnList(marker)) results.add({
						id: resultId,
						label: foundItem.label,
						marker
					}, index);
				});
			};
			const rangeContainer = range.start.parent;
			if (model.schema.checkChild(rangeContainer, "$text") && model.schema.isLimit(rangeContainer)) processTextContainer(rangeContainer);
			else [...range].forEach(({ type, item }) => {
				if (type === "elementStart" && model.schema.checkChild(item, "$text")) processTextContainer(item);
			});
		});
		return results;
	}
	/**
	* Returns text representation of a range. The returned text length should be the same as range length.
	* In order to achieve this, this function will replace inline elements (text-line) as new line character ("\n").
	*
	* @param range The model range.
	* @returns The text content of the provided range.
	*/
	rangeToText(range) {
		return Array.from(range.getItems({ shallow: true })).reduce((rangeText, node) => {
			if (!(node.is("$text") || node.is("$textProxy"))) return `${rangeText}\n`;
			return rangeText + node.data;
		}, "");
	}
	/**
	* Creates a text matching callback for a specified search term and matching options.
	*
	* @param searchTerm The search term.
	* @param options Matching options.
	* 	- options.matchCase=false If set to `true` letter casing will be ignored.
	* 	- options.wholeWords=false If set to `true` only whole words that match `callbackOrText` will be matched.
	*/
	findByTextCallback(searchTerm, options) {
		let flags = "gu";
		if (!options.matchCase) flags += "i";
		let regExpQuery = `(${escapeRegExp(searchTerm)})`;
		if (options.wholeWords) {
			const nonLetterGroup = "[^a-zA-ZÀ-ɏḀ-ỿ]";
			if (!new RegExp("^" + nonLetterGroup).test(searchTerm)) regExpQuery = `(^|${nonLetterGroup}|_)${regExpQuery}`;
			if (!new RegExp(nonLetterGroup + "$").test(searchTerm)) regExpQuery = `${regExpQuery}(?=_|${nonLetterGroup}|$)`;
		}
		const regExp = new RegExp(regExpQuery, flags);
		function findCallback({ text }) {
			return [...text.matchAll(regExp)].map(regexpMatchToFindResult);
		}
		return findCallback;
	}
};
function findInsertIndex(resultsList, markerToInsert) {
	const result = resultsList.find(({ marker }) => {
		return markerToInsert.getStart().isBefore(marker.getStart());
	});
	return result ? resultsList.getIndex(result) : resultsList.length;
}
/**
*  Maps RegExp match result to find result.
*/
function regexpMatchToFindResult(matchResult) {
	const lastGroupIndex = matchResult.length - 1;
	let startOffset = matchResult.index;
	if (matchResult.length === 3) startOffset += matchResult[1].length;
	return {
		label: matchResult[lastGroupIndex],
		start: startOffset,
		end: startOffset + matchResult[lastGroupIndex].length
	};
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module find-and-replace/findandreplaceediting
*/
const HIGHLIGHT_CLASS = "ck-find-result_selected";
/**
* Implements the editing part for find and replace plugin. For example conversion, commands etc.
*/
var FindAndReplaceEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [FindAndReplaceUtils];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "FindAndReplaceEditing";
	}
	/**
	* @inheritDoc
	* @internal
	*/
	static get licenseFeatureCode() {
		return "FAR";
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
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* An object storing the find and replace state within a given editor instance.
	*/
	state;
	/**
	* @inheritDoc
	*/
	init() {
		this.state = new FindAndReplaceState(this.editor.model);
		this.set("_isSearchActive", false);
		this._defineConverters();
		this._defineCommands();
		this.listenTo(this.state, "change:highlightedResult", (eventInfo, name, newValue, oldValue) => {
			const { model } = this.editor;
			model.change((writer) => {
				if (oldValue) {
					const oldMatchId = oldValue.marker.name.split(":")[1];
					const oldMarker = model.markers.get(`findResultHighlighted:${oldMatchId}`);
					if (oldMarker) writer.removeMarker(oldMarker);
				}
				if (newValue) {
					const newMatchId = newValue.marker.name.split(":")[1];
					writer.addMarker(`findResultHighlighted:${newMatchId}`, {
						usingOperation: false,
						affectsData: false,
						range: newValue.marker.getRange()
					});
				}
			});
		});
		/* v8 ignore next -- @preserve */
		const scrollToHighlightedResult = (eventInfo, name, newValue) => {
			if (newValue) {
				const domConverter = this.editor.editing.view.domConverter;
				const viewRange = this.editor.editing.mapper.toViewRange(newValue.marker.getRange());
				scrollViewportToShowTarget({
					target: domConverter.viewRangeToDom(viewRange),
					viewportOffset: 40
				});
			}
		};
		const debouncedScrollListener = debounce(scrollToHighlightedResult.bind(this), 32);
		this.listenTo(this.state, "change:highlightedResult", debouncedScrollListener, { priority: "low" });
		this.listenTo(this.editor, "destroy", debouncedScrollListener.cancel);
		this.on("change:_isSearchActive", (evt, name, isSearchActive) => {
			if (isSearchActive) this.listenTo(this.editor.model.document, "change:data", this._onDocumentChange);
			else this.stopListening(this.editor.model.document, "change:data", this._onDocumentChange);
		});
	}
	/**
	* Initiate a search.
	*/
	find(callbackOrText, findAttributes) {
		this._isSearchActive = true;
		this.editor.execute("find", callbackOrText, findAttributes);
		return this.state.results;
	}
	/**
	* Stops active results from updating, and clears out the results.
	*/
	stop() {
		this.state.clear(this.editor.model);
		this._isSearchActive = false;
	}
	/**
	* Sets up the commands.
	*/
	_defineCommands() {
		this.editor.commands.add("find", new FindCommand(this.editor, this.state));
		this.editor.commands.add("findNext", new FindNextCommand(this.editor, this.state));
		this.editor.commands.add("findPrevious", new FindPreviousCommand(this.editor, this.state));
		this.editor.commands.add("replace", new ReplaceCommand(this.editor, this.state));
		this.editor.commands.add("replaceAll", new ReplaceAllCommand(this.editor, this.state));
	}
	/**
	* Sets up the marker downcast converters for search results highlighting.
	*/
	_defineConverters() {
		const { editor } = this;
		editor.conversion.for("editingDowncast").markerToHighlight({
			model: "findResult",
			view: ({ markerName }) => {
				const [, id] = markerName.split(":");
				return {
					name: "span",
					classes: ["ck-find-result"],
					attributes: { "data-find-result": id }
				};
			}
		});
		editor.conversion.for("editingDowncast").markerToHighlight({
			model: "findResultHighlighted",
			view: ({ markerName }) => {
				const [, id] = markerName.split(":");
				return {
					name: "span",
					classes: [HIGHLIGHT_CLASS],
					attributes: { "data-find-result": id }
				};
			}
		});
	}
	/**
	* Reacts to document changes in order to update search list.
	*/
	_onDocumentChange = () => {
		const changedNodes = /* @__PURE__ */ new Set();
		const removedMarkers = /* @__PURE__ */ new Set();
		const model = this.editor.model;
		const { results } = this.state;
		const changes = model.document.differ.getChanges();
		const changedMarkers = model.document.differ.getChangedMarkers();
		changes.forEach((change) => {
			if (!change.position) return;
			if (change.name === "$text" || change.position.nodeAfter && model.schema.isInline(change.position.nodeAfter)) {
				changedNodes.add(change.position.parent);
				[...model.markers.getMarkersAtPosition(change.position)].forEach((markerAtChange) => {
					removedMarkers.add(markerAtChange.name);
				});
			} else if (change.type === "insert" && change.position.nodeAfter) changedNodes.add(change.position.nodeAfter);
		});
		changedMarkers.forEach(({ name, data: { newRange } }) => {
			if (newRange && newRange.start.root.rootName === "$graveyard") removedMarkers.add(name);
		});
		changedNodes.forEach((node) => {
			[...model.markers.getMarkersIntersectingRange(model.createRangeIn(node))].forEach((marker) => removedMarkers.add(marker.name));
		});
		removedMarkers.forEach((markerName) => {
			if (!results.has(markerName)) {
				if (markerName.startsWith("findResult:")) {
					const orphanMarker = model.markers.get(markerName);
					/* v8 ignore else -- @preserve */
					if (orphanMarker) model.change((writer) => writer.removeMarker(orphanMarker));
				}
				return;
			}
			if (results.get(markerName) === this.state.highlightedResult) this.state.highlightedResult = null;
			results.remove(markerName);
		});
		const changedSearchResults = [];
		const findAndReplaceUtils = this.editor.plugins.get("FindAndReplaceUtils");
		changedNodes.forEach((nodeToCheck) => {
			const searchRange = nodeToCheck.is("rootElement") ? model.createRangeIn(nodeToCheck) : model.createRangeOn(nodeToCheck);
			const changedNodeSearchResults = findAndReplaceUtils.updateFindResultFromRange(searchRange, model, this.state.lastSearchCallback, results);
			changedSearchResults.push(...changedNodeSearchResults);
		});
		changedMarkers.forEach((markerToCheck) => {
			if (markerToCheck.name.startsWith("findResult")) return;
			/* v8 ignore else -- @preserve */
			if (markerToCheck.data.newRange) {
				const changedNodeSearchResults = findAndReplaceUtils.updateFindResultFromRange(markerToCheck.data.newRange, model, this.state.lastSearchCallback, results);
				changedSearchResults.push(...changedNodeSearchResults);
			}
		});
		if (!this.state.highlightedResult && changedSearchResults.length) this.state.highlightedResult = changedSearchResults[0];
		else this.state.refreshHighlightOffset(model);
	};
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module find-and-replace/findandreplace
*/
/**
* The find and replace plugin.
*
* For a detailed overview, check the {@glink features/find-and-replace Find and replace feature documentation}.
*
* This is a "glue" plugin which loads the following plugins:
*
* * The {@link module:find-and-replace/findandreplaceediting~FindAndReplaceEditing find and replace editing feature},
* * The {@link module:find-and-replace/findandreplaceui~FindAndReplaceUI find and replace UI feature}
*/
var FindAndReplace = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [FindAndReplaceEditing, FindAndReplaceUI];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "FindAndReplace";
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
		const ui = this.editor.plugins.get("FindAndReplaceUI");
		const findAndReplaceEditing = this.editor.plugins.get("FindAndReplaceEditing");
		const state = findAndReplaceEditing.state;
		ui.on("findNext", (event, data) => {
			if (data) {
				state.searchText = data.searchText;
				findAndReplaceEditing.find(data.searchText, data);
			} else this.editor.execute("findNext");
		});
		ui.on("findPrevious", (event, data) => {
			if (data && state.searchText !== data.searchText) findAndReplaceEditing.find(data.searchText);
			else this.editor.execute("findPrevious");
		});
		ui.on("replace", (event, data) => {
			if (state.searchText !== data.searchText) findAndReplaceEditing.find(data.searchText);
			const highlightedResult = state.highlightedResult;
			if (highlightedResult) this.editor.execute("replace", data.replaceText, highlightedResult);
		});
		ui.on("replaceAll", (event, data) => {
			if (state.searchText !== data.searchText) findAndReplaceEditing.find(data.searchText);
			this.editor.execute("replaceAll", data.replaceText, state.results);
		});
		ui.on("searchReseted", () => {
			state.clear(this.editor.model);
			findAndReplaceEditing.stop();
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { FindAndReplace, FindAndReplaceEditing, FindAndReplaceFormView, FindAndReplaceState, FindAndReplaceUI, FindAndReplaceUtils, FindCommand, FindNextCommand, FindPreviousCommand, FindReplaceCommandBase, ReplaceAllCommand, ReplaceCommand, sortSearchResultsByMarkerPositions as _sortFindResultsByMarkerPositions };
//# sourceMappingURL=index.js.map