/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module collaboration-core/users/view/userview
 */
import { View, type TemplateDefinition } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';
import type { User } from '../../users.js';
import '../../../theme/users.css';
export default class UserView extends View {
    name: string;
    notificationView: TemplateDefinition | null;
    constructor(locale: Locale, user: User, notificationText?: null | string);
}
