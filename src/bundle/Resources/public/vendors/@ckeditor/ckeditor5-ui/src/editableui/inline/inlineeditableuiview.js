/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module ui/editableui/inline/inlineeditableuiview
 */
import EditableUIView from '../editableuiview.js';
/**
 * The inline editable UI class implementing an inline {@link module:ui/editableui/editableuiview~EditableUIView}.
 */
export default class InlineEditableUIView extends EditableUIView {
    /**
     * The cached options object passed to the constructor.
     */
    _options;
    /**
     * Creates an instance of the InlineEditableUIView class.
     *
     * @param locale The locale instance.
     * @param editingView The editing view instance the editable is related to.
     * @param editableElement The editable element. If not specified, the
     * {@link module:ui/editableui/editableuiview~EditableUIView}
     * will create it. Otherwise, the existing element will be used.
     * @param options Additional configuration of the view.
     * @param options.label The label of the editable for assistive technologies. If not provided, a default label is used or,
     * the existing `aria-label` attribute value from the specified `editableElement` is preserved.
     */
    constructor(locale, editingView, editableElement, options = {}) {
        super(locale, editingView, editableElement);
        this._options = options;
        this.extendTemplate({
            attributes: {
                role: 'textbox',
                class: 'ck-editor__editable_inline'
            }
        });
    }
    /**
     * @inheritDoc
     */
    render() {
        super.render();
        const editingView = this._editingView;
        editingView.change(writer => {
            const viewRoot = editingView.document.getRoot(this.name);
            writer.setAttribute('aria-label', this.getEditableAriaLabel(), viewRoot);
        });
    }
    /**
     * Returns a normalized label for the editable view based on the environment.
     */
    getEditableAriaLabel() {
        const t = this.locale.t;
        const label = this._options.label;
        const editableElement = this._editableElement;
        const editableName = this.name;
        if (typeof label == 'string') {
            return label;
        }
        else if (typeof label === 'object') {
            return label[editableName];
        }
        else if (typeof label === 'function') {
            return label(this);
        }
        else if (editableElement) {
            const existingLabel = editableElement.getAttribute('aria-label');
            if (existingLabel) {
                return existingLabel;
            }
        }
        return t('Rich Text Editor. Editing area: %0', editableName);
    }
}
