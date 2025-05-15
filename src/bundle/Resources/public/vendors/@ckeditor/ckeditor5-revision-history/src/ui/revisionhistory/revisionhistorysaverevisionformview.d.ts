/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revisionhistory/revisionhistorysaverevisionformview
 */
import { LabeledFieldView, View, type InputTextView } from 'ckeditor5/src/ui.js';
import { FocusTracker, KeystrokeHandler, type Locale } from 'ckeditor5/src/utils.js';
import '../../../theme/revisionhistorysaverevisionform.css';
import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
/**
 * The media form view controller class.
 *
 * See {@link module:media-embed/ui/mediaformview~MediaFormView}.
 */
export default class RevisionHistorySaveRevisionFormView extends View {
    /**
     * Tracks information about the DOM focus in the form.
     */
    readonly focusTracker: FocusTracker;
    /**
     * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * The revision name input view.
     */
    revisionNameInputView: LabeledFieldView<InputTextView>;
    /**
     * The value of the revision name input.
     *
     * @observable
     */
    revisionNameInputValue: string;
    constructor(locale: Locale, requireRevisionName: boolean);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * Focuses the {@link #revisionNameInputView}.
     */
    focus(): void;
    /**
     * The native DOM `value` of the {@link #revisionNameInputView} element.
     *
     * **Note**: Do not confuse it with the {@link module:ui/inputtext/inputtextview~InputTextView#value}
     * which works one way only and may not represent the actual state of the component in the DOM.
     */
    get revisionName(): string;
    set revisionName(name: string);
    /**
     * TODO
     */
    reset(): void;
}
