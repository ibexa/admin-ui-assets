/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revisionviewer/changenaviagationview
 */
import { View } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';
import '../../../theme/changesnavigation.css';
/**
 * TODO
 */
export default class ChangesNavigationView extends View {
    /**
     * @observable
     */
    isNavigationMode: boolean;
    /**
     * @observable
     */
    isReady: boolean;
    /**
     * @observable
     */
    currentChangeNumber: number;
    /**
     * @observable
     */
    numberOfChanges: number;
    /**
     * @observable
     */
    isForwardNavigationEnabled: boolean;
    /**
     * @observable
     */
    isBackwardNavigationEnabled: boolean;
    constructor(locale: Locale);
}
