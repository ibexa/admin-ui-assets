/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revisionsidebar/revisionsidebar
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import RevisionViewer from '../../revisionviewer.js';
import type { default as RevisionView } from '../revision/revisionview.js';
/**
 * TODO
 */
export default class RevisionsSidebar extends Plugin {
    static defaultRevisionActions: Array<string>;
    static availableRevisionActions: Record<string, RevisionAction>;
    /**
     * @inheritDoc
     */
    static get pluginName(): "RevisionsSidebar";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof RevisionViewer];
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
export interface RevisionAction {
    name: string;
    class?: string;
    action: (editor: Editor, revisionView: RevisionView) => void;
    isVisible?: (editor: Editor, revisionView: RevisionView) => boolean;
    isEnabled?: (editor: Editor, revisionView: RevisionView) => boolean;
}
