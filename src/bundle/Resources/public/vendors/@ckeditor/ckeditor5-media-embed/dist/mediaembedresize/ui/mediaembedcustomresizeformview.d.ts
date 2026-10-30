/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedresize/ui/mediaembedcustomresizeformview
*/
import { ButtonView, FocusCycler, LabeledFieldView, View, ViewCollection, type FocusableView, type InputNumberView } from "@ckeditor/ckeditor5-ui";
import { FocusTracker, KeystrokeHandler, type Locale } from "@ckeditor/ckeditor5-utils";
/**
* The MediaEmbedCustomResizeFormView class.
*
* @internal
*/
export declare class MediaEmbedCustomResizeFormView extends View {
	/**
	* Tracks information about the DOM focus in the form.
	*/
	readonly focusTracker: FocusTracker;
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	readonly keystrokes: KeystrokeHandler;
	/**
	* Resize unit shortcut.
	*/
	readonly unit: string;
	/**
	* The Back button view displayed in the header.
	*/
	backButtonView: ButtonView;
	/**
	* A button used to submit the form.
	*/
	saveButtonView: ButtonView;
	/**
	* An input with a label.
	*/
	labeledInput: LabeledFieldView<InputNumberView>;
	/**
	* A collection of child views.
	*/
	readonly children: ViewCollection;
	/**
	* A collection of views which can be focused in the form.
	*/
	protected readonly _focusables: ViewCollection<FocusableView>;
	/**
	* Helps cycling over {@link #_focusables} in the form.
	*/
	protected readonly _focusCycler: FocusCycler;
	/**
	* An array of form validators used by {@link #isValid}.
	*/
	private readonly _validators;
	/**
	* @inheritDoc
	*/
	constructor(locale: Locale, unit: string, validators: Array<MediaEmbedCustomResizeFormValidatorCallback>);
	/**
	* @inheritDoc
	*/
	override render(): void;
	/**
	* @inheritDoc
	*/
	override destroy(): void;
	private _createBackButton;
	private _createSaveButton;
	private _createHeaderView;
	private _createLabeledInputView;
	/**
	* Validates the form and returns `false` when some fields are invalid.
	*/
	isValid(): boolean;
	/**
	* Cleans up error and information text of {@link #labeledInput}.
	*/
	resetFormStatus(): void;
	/**
	* The native DOM `value` of the input element of {@link #labeledInput}.
	*/
	get rawSize(): string | null;
	/**
	* Get numeric value of size. Returns `null` if value is not a number.
	*/
	get parsedSize(): number | null;
	/**
	* Returns serialized media embed input size with unit.
	* Returns `null` if value is not a number.
	*/
	get sizeWithUnits(): string | null;
}
/**
* Callback used by {@link ~MediaEmbedCustomResizeFormView} to check if passed form value is valid.
*
* @internal
*/
export type MediaEmbedCustomResizeFormValidatorCallback = (form: MediaEmbedCustomResizeFormView) => string | undefined;
/**
* Fired when the form view is submitted.
*
* @eventName ~MediaEmbedCustomResizeFormView#submit
*/
export type MediaEmbedCustomResizeFormViewSubmitEvent = {
	name: "submit";
	args: [];
};
/**
* Fired when the form view is canceled.
*
* @eventName ~MediaEmbedCustomResizeFormView#cancel
*/
export type MediaEmbedCustomResizeFormViewCancelEvent = {
	name: "cancel";
	args: [];
};
