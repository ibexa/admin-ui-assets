/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module find-and-replace/replacecommandbase
*/
import { Command } from 'ckeditor5/src/core.js';
export class ReplaceCommandBase extends Command {
    /**
     * The find and replace state object used for command operations.
     */
    _state;
    /**
     * Creates a new `ReplaceCommand` instance.
     *
     * @param editor Editor on which this command will be used.
     * @param state An object to hold plugin state.
     */
    constructor(editor, state) {
        super(editor);
        // The replace command is always enabled.
        this.isEnabled = true;
        this._state = state;
        // Since this command executes on particular result independent of selection, it should be checked directly in execute block.
        this._isEnabledBasedOnSelection = false;
    }
    /**
     * Common logic for both `replace` commands.
     * Replace a given find result by a string or a callback.
     *
     * @param result A single result from the find command.
     */
    _replace(replacementText, result) {
        const { model } = this.editor;
        const range = result.marker.getRange();
        // Don't replace a result that is in non-editable place.
        if (!model.canEditAt(range)) {
            return;
        }
        model.change(writer => {
            // Don't replace a result (marker) that found its way into the $graveyard (e.g. removed by collaborators).
            if (range.root.rootName === '$graveyard') {
                this._state.results.remove(result);
                return;
            }
            let textAttributes = {};
            for (const item of range.getItems()) {
                if (item.is('$text') || item.is('$textProxy')) {
                    textAttributes = item.getAttributes();
                    break;
                }
            }
            model.insertContent(writer.createText(replacementText, textAttributes), range);
            if (this._state.results.has(result)) {
                this._state.results.remove(result);
            }
        });
    }
}
