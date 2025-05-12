/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revision/revisionauthorview
 */
import { View } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';
import type { User } from 'ckeditor5-collaboration/src/collaboration-core.js';
import '../../../theme/revision/revisionauthor.css';
export default class RevisionAuthorView extends View {
    constructor(locale: Locale, author: User, isCreator: boolean);
}
