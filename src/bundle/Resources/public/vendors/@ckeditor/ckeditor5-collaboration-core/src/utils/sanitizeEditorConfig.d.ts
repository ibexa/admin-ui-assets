/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module collaboration-core/utils/sanitizeditorconfig
 */
import type { Editor, EditorConfig } from 'ckeditor5/src/core.js';
/**
 * A function that prepares config for internal editors removing all unnecessary plugins like RTC.
 *
 * @param editor The instance of the source editor.
 * @param extraBlackListedPlugins Additional list of plugins that should not be added to the config.
 */
export default function sanitizeEditorConfig(editor: Editor, extraBlackListedPlugins?: Array<string>): EditorConfig;
