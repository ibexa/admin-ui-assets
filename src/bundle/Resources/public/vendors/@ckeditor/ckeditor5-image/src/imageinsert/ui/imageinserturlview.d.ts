/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ButtonView, View, FocusCycler, LabeledFieldView, type InputTextView } from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler, type Locale } from 'ckeditor5/src/utils';
/**
 * The insert an image via URL view.
 *
 * See {@link module:image/imageinsert/imageinsertviaurlui~ImageInsertViaUrlUI}.
 */
export default class ImageInsertUrlView extends View {
    /**
     * The URL input field view.
     */
    urlInputView: LabeledFieldView<InputTextView>;
    /**
     * The "insert/update" button view.
     */
    insertButtonView: ButtonView;
    /**
     * The "cancel" button view.
     */
    cancelButtonView: ButtonView;
    /**
     * The value of the URL input.
     *
     * @observable
     */
    imageURLInputValue: string;
    /**
     * Observable property used to alter labels while some image is selected and when it is not.
     *
     * @observable
     */
    isImageSelected: boolean;
    /**
     * Observable property indicating whether the form interactive elements should be enabled.
     *
     * @observable
     */
    isEnabled: boolean;
    /**
     * Tracks information about DOM focus in the form.
     */
    readonly focusTracker: FocusTracker;
    /**
     * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * Helps cycling over {@link #_focusables} in the form.
     */
    readonly focusCycler: FocusCycler;
    /**
     * A collection of views that can be focused in the form.
     */
    private readonly _focusables;
    /**
     * Creates a view for the dropdown panel of {@link module:image/imageinsert/imageinsertui~ImageInsertUI}.
     *
     * @param locale The localization services instance.
     */
    constructor(locale: Locale);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Creates the {@link #urlInputView}.
     */
    private _createUrlInputView;
    /**
     * Creates the {@link #insertButtonView}.
     */
    private _createInsertButton;
    /**
     * Creates the {@link #cancelButtonView}.
     */
    private _createCancelButton;
    /**
     * Focuses the view.
     */
    focus(direction: 1 | -1): void;
}
/**
 * Fired when the form view is submitted.
 *
 * @eventName ~ImageInsertUrlView#submit
 */
export type ImageInsertUrlViewSubmitEvent = {
    name: 'submit';
    args: [];
};
/**
 * Fired when the form view is canceled.
 *
 * @eventName ~ImageInsertUrlView#cancel
 */
export type ImageInsertUrlViewCancelEvent = {
    name: 'cancel';
    args: [];
};
