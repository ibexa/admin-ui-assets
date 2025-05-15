/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module pagination/ui/linesrepository
 */
import type { Editor } from 'ckeditor5/src/core.js';
import type { BodyCollection } from 'ckeditor5/src/ui.js';
/**
 * Helper class for managing the page break lines.
 */
export default class LinesRepository {
    /**
     * Creates a new lines repository instance.
     */
    constructor(editor: Editor);
    /**
     * Destroys the lines repository instance.
     */
    destroy(): void;
    /**
     * Hides all lines.
     */
    cleanLines(): void;
    /**
     * Shows a line at specified page coordinates.
     *
     * @param left
     * @param top
     * @param width
     * @param pageNumber The page number (line label).
     */
    showLine(left: number, top: number, width: number, pageNumber: number): void;
    /**
     * Changes the view collection where the lines are added.
     */
    setViewCollection(newViewCollection: BodyCollection): void;
}
