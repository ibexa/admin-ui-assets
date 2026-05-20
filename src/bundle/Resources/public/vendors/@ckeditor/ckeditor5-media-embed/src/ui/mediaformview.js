/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module media-embed/ui/mediaformview
 */
import { ButtonView, FocusCycler, LabeledFieldView, View, ViewCollection, createLabeledInputText, submitHandler } from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';
import { icons } from 'ckeditor5/src/core';
// See: #8833.
// eslint-disable-next-line ckeditor5-rules/ckeditor-imports
import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
import '../../theme/mediaform.css';
/**
 * The media form view controller class.
 *
 * See {@link module:media-embed/ui/mediaformview~MediaFormView}.
 */
export default class MediaFormView extends View {
    /**
     * @param validators Form validators used by {@link #isValid}.
     * @param locale The localization services instance.
     */
    constructor(validators, locale) {
        super(locale);
        const t = locale.t;
        this.focusTracker = new FocusTracker();
        this.keystrokes = new KeystrokeHandler();
        this.set('mediaURLInputValue', '');
        this.urlInputView = this._createUrlInput();
        this.saveButtonView = this._createButton(t('Save'), icons.check, 'ck-button-save');
        this.saveButtonView.type = 'submit';
        this.saveButtonView.bind('isEnabled').to(this, 'mediaURLInputValue', value => !!value);
        this.cancelButtonView = this._createButton(t('Cancel'), icons.cancel, 'ck-button-cancel', 'cancel');
        this._focusables = new ViewCollection();
        this._focusCycler = new FocusCycler({
            focusables: this._focusables,
            focusTracker: this.focusTracker,
            keystrokeHandler: this.keystrokes,
            actions: {
                // Navigate form fields backwards using the <kbd>Shift</kbd> + <kbd>Tab</kbd> keystroke.
                focusPrevious: 'shift + tab',
                // Navigate form fields forwards using the <kbd>Tab</kbd> key.
                focusNext: 'tab'
            }
        });
        this._validators = validators;
        this.setTemplate({
            tag: 'form',
            attributes: {
                class: [
                    'ck',
                    'ck-media-form',
                    'ck-responsive-form'
                ],
                tabindex: '-1'
            },
            children: [
                this.urlInputView,
                this.saveButtonView,
                this.cancelButtonView
            ]
        });
    }
    /**
     * @inheritDoc
     */
    render() {
        super.render();
        submitHandler({
            view: this
        });
        const childViews = [
            this.urlInputView,
            this.saveButtonView,
            this.cancelButtonView
        ];
        childViews.forEach(v => {
            // Register the view as focusable.
            this._focusables.add(v);
            // Register the view in the focus tracker.
            this.focusTracker.add(v.element);
        });
        // Start listening for the keystrokes coming from #element.
        this.keystrokes.listenTo(this.element);
        const stopPropagation = (data) => data.stopPropagation();
        // Since the form is in the dropdown panel which is a child of the toolbar, the toolbar's
        // keystroke handler would take over the key management in the URL input. We need to prevent
        // this ASAP. Otherwise, the basic caret movement using the arrow keys will be impossible.
        this.keystrokes.set('arrowright', stopPropagation);
        this.keystrokes.set('arrowleft', stopPropagation);
        this.keystrokes.set('arrowup', stopPropagation);
        this.keystrokes.set('arrowdown', stopPropagation);
    }
    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        this.focusTracker.destroy();
        this.keystrokes.destroy();
    }
    /**
     * Focuses the fist {@link #_focusables} in the form.
     */
    focus() {
        this._focusCycler.focusFirst();
    }
    /**
     * The native DOM `value` of the {@link #urlInputView} element.
     *
     * **Note**: Do not confuse it with the {@link module:ui/inputtext/inputtextview~InputTextView#value}
     * which works one way only and may not represent the actual state of the component in the DOM.
     */
    get url() {
        return this.urlInputView.fieldView.element.value.trim();
    }
    set url(url) {
        this.urlInputView.fieldView.element.value = url.trim();
    }
    /**
     * Validates the form and returns `false` when some fields are invalid.
     */
    isValid() {
        this.resetFormStatus();
        for (const validator of this._validators) {
            const errorText = validator(this);
            // One error per field is enough.
            if (errorText) {
                // Apply updated error.
                this.urlInputView.errorText = errorText;
                return false;
            }
        }
        return true;
    }
    /**
     * Cleans up the supplementary error and information text of the {@link #urlInputView}
     * bringing them back to the state when the form has been displayed for the first time.
     *
     * See {@link #isValid}.
     */
    resetFormStatus() {
        this.urlInputView.errorText = null;
        this.urlInputView.infoText = this._urlInputViewInfoDefault;
    }
    /**
     * Creates a labeled input view.
     *
     * @returns Labeled input view instance.
     */
    _createUrlInput() {
        const t = this.locale.t;
        const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);
        const inputField = labeledInput.fieldView;
        this._urlInputViewInfoDefault = t('Paste the media URL in the input.');
        this._urlInputViewInfoTip = t('Tip: Paste the URL into the content to embed faster.');
        labeledInput.label = t('Media URL');
        labeledInput.infoText = this._urlInputViewInfoDefault;
        inputField.on('input', () => {
            // Display the tip text only when there is some value. Otherwise fall back to the default info text.
            labeledInput.infoText = inputField.element.value ? this._urlInputViewInfoTip : this._urlInputViewInfoDefault;
            this.mediaURLInputValue = inputField.element.value.trim();
        });
        return labeledInput;
    }
    /**
     * Creates a button view.
     *
     * @param label The button label.
     * @param icon The button icon.
     * @param className The additional button CSS class name.
     * @param eventName An event name that the `ButtonView#execute` event will be delegated to.
     * @returns The button view instance.
     */
    _createButton(label, icon, className, eventName) {
        const button = new ButtonView(this.locale);
        button.set({
            label,
            icon,
            tooltip: true
        });
        button.extendTemplate({
            attributes: {
                class: className
            }
        });
        if (eventName) {
            button.delegate('execute').to(this, eventName);
        }
        return button;
    }
}
