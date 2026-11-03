/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module media-embed/ui/mediaformview
 */
import { type InputTextView, ButtonView, LabeledFieldView, View } from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler, type Locale } from 'ckeditor5/src/utils';
import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
import '../../theme/mediaform.css';
/**
 * The media form view controller class.
 *
 * See {@link module:media-embed/ui/mediaformview~MediaFormView}.
 */
export default class MediaFormView extends View {
    /**
     * Tracks information about the DOM focus in the form.
     */
    readonly focusTracker: FocusTracker;
    /**
     * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * The value of the URL input.
     */
    mediaURLInputValue: string;
    /**
     * The URL input view.
     */
    urlInputView: LabeledFieldView<InputTextView>;
    /**
     * The Save button view.
     */
    saveButtonView: ButtonView;
    /**
     * The Cancel button view.
     */
    cancelButtonView: ButtonView;
    /**
     * A collection of views that can be focused in the form.
     */
    private readonly _focusables;
    /**
     * Helps cycling over {@link #_focusables} in the form.
     */
    private readonly _focusCycler;
    /**
     * An array of form validators used by {@link #isValid}.
     */
    private readonly _validators;
    /**
     * The default info text for the {@link #urlInputView}.
     */
    private _urlInputViewInfoDefault?;
    /**
     * The info text with an additional tip for the {@link #urlInputView},
     * displayed when the input has some value.
     */
    private _urlInputViewInfoTip?;
    /**
     * @param validators Form validators used by {@link #isValid}.
     * @param locale The localization services instance.
     */
    constructor(validators: Array<(v: MediaFormView) => string | undefined>, locale: Locale);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Focuses the fist {@link #_focusables} in the form.
     */
    focus(): void;
    /**
     * The native DOM `value` of the {@link #urlInputView} element.
     *
     * **Note**: Do not confuse it with the {@link module:ui/inputtext/inputtextview~InputTextView#value}
     * which works one way only and may not represent the actual state of the component in the DOM.
     */
    get url(): string;
    set url(url: string);
    /**
     * Validates the form and returns `false` when some fields are invalid.
     */
    isValid(): boolean;
    /**
     * Cleans up the supplementary error and information text of the {@link #urlInputView}
     * bringing them back to the state when the form has been displayed for the first time.
     *
     * See {@link #isValid}.
     */
    resetFormStatus(): void;
    /**
     * Creates a labeled input view.
     *
     * @returns Labeled input view instance.
     */
    private _createUrlInput;
    /**
     * Creates a button view.
     *
     * @param label The button label.
     * @param icon The button icon.
     * @param className The additional button CSS class name.
     * @param eventName An event name that the `ButtonView#execute` event will be delegated to.
     * @returns The button view instance.
     */
    private _createButton;
}
