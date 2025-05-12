/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module collaboration-core/suggestions/view/latefocusbuttonview
 * @publicApi
 */
import { ButtonView, DropdownButtonView } from 'ckeditor5/src/ui.js';
/**
 * The view class representing a button that becomes focused on `mouseup` rather than on `mousedown`.
 *
 * This is to delay any "on focus" actions (like e.g. activating annotation) until the user released mouse down,
 * so that button related actions happen before focus related actions.
 *
 * Also, see {@link module:collaboration-core/suggestions/view/latefocusbuttonview~LateFocusDropdownButtonView}.
 */
export declare class LateFocusButtonView extends ButtonView {
    /**
     * @inheritDoc
     */
    render(): void;
}
/**
 * The view class representing a dropdown button that becomes focused on `mouseup` rather than on `mousedown`.
 *
 * This is to delay any "on focus" actions (like e.g. activating annotation) until the user released mouse key,
 * so that button related actions happen before focus related actions.
 *
 * Also, see {@link module:collaboration-core/suggestions/view/latefocusbuttonview~LateFocusButtonView}.
 */
export declare class LateFocusDropdownButtonView extends DropdownButtonView {
    /**
     * @inheritDoc
     */
    render(): void;
}
