/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/view/sidebaritemview
 * @publicApi
 */
import { View, type ViewCollection, type FocusableView } from 'ckeditor5/src/ui.js';
import { type Locale } from 'ckeditor5/src/utils.js';
/**
 * A wrapper view that wraps given {@link module:ui/view~View} to display it as a {@link module:comments/annotations/sidebar~Sidebar} item.
 */
export default class SidebarItemView extends View implements FocusableView {
    element: HTMLElement;
    /**
     * The item top offset.
     * Setting `0` as the initial value makes new items falling from heaven.
     *
     * @observable
     */
    top: number;
    /**
     * @observable
     */
    bottom: number;
    /**
     * @observable
     */
    height: number;
    /**
     * @observable
     */
    isAnimationDisabled: boolean;
    /**
     * A collection of content views.
     */
    content: ViewCollection<FocusableView>;
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
    /**
     * Updates {@link #height the height property} according to the element's DOM height.
     */
    updateHeight(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
