/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revision/revisionnameview
 */
import { LabeledFieldView, type InputTextView } from 'ckeditor5/src/ui.js';
import { type Locale } from 'ckeditor5/src/utils.js';
import '../../../theme/revision/revisionname.css';
export default class RevisionNameView extends LabeledFieldView<InputTextView> {
    /**
     * @inheritDoc
     */
    constructor(locale: Locale, viewCreator: (labeledFieldView: LabeledFieldView, viewUid: string, statusUid: string) => InputTextView);
    /**
     * Renders the view and creates binding for tooltip. It's only displayed if the revision name is longer
     * than the container. There are two different scenarios this may happen:
     *
     * * while resizing the container,
     * * while changing the revision name.
     *
     * Hence, two different bindings are created: one using the `ResizeObserver` and the other using the input `value` property.
     */
    render(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
