/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module core
 */
export { default as Plugin } from './plugin.js';
export { default as Command } from './command.js';
export { default as MultiCommand } from './multicommand.js';
export { default as Context } from './context.js';
export { default as ContextPlugin } from './contextplugin.js';
export { default as Editor } from './editor/editor.js';
export { default as attachToForm } from './editor/utils/attachtoform.js';
export { default as DataApiMixin } from './editor/utils/dataapimixin.js';
export { default as ElementApiMixin } from './editor/utils/elementapimixin.js';
export { default as secureSourceElement } from './editor/utils/securesourceelement.js';
export { default as PendingActions } from './pendingactions.js';
import './augmentation.js';
