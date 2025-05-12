/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module pagination/ui/pagenavigatorview
 */
import { View, InputNumberView } from 'ckeditor5/src/ui.js';
import { type Locale } from 'ckeditor5/src/utils.js';
import '../../theme/pagenavigator.css';
/**
 * The page navigation UI element.
 */
export default class PageNavigatorView extends View {
    /**
     * The current page number.
     *
     * @observable
     * @default 1
     */
    pageNumber: number;
    /**
     * The total page count.
     *
     * @observable
     * @default 1
     */
    totalPages: number;
    /**
     * Controls whether the component is enabled.
     *
     * @observable
     * @default true
     */
    isEnabled: boolean;
    /**
     * An instance of the input number view to type a new page number.
     */
    pageNumberView: InputNumberView;
    /**
     * @inheritDoc
     */
    constructor(locale: Locale);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * @inheritDoc
     */
    focus(): void;
}
/**
 * An event fired after {@link module:pagination/ui/pagenavigatorview~PageNavigatorView#pageNumberView} value is updated.
 *
 * @eventName ~PageNavigatorView#navigation
 */
export type PaginationNavigationEvent = {
    name: 'navigation';
    args: [pageNumber: number];
};
