/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ckbox/ckboximageedit/ckboximageeditediting
 */
import { PendingActions, Plugin } from 'ckeditor5/src/core';
import { Notification } from 'ckeditor5/src/ui';
import CKBoxImageEditCommand from './ckboximageeditcommand';
import CKBoxEditing from '../ckboxediting';
import CKBoxUtils from '../ckboxutils';
/**
 * The CKBox image edit editing plugin.
 */
export default class CKBoxImageEditEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'CKBoxImageEditEditing';
    }
    /**
     * @inheritDoc
     */
    static get requires() {
        return [CKBoxEditing, CKBoxUtils, PendingActions, Notification, 'ImageUtils', 'ImageEditing'];
    }
    /**
     * @inheritDoc
     */
    init() {
        const { editor } = this;
        editor.commands.add('ckboxImageEdit', new CKBoxImageEditCommand(editor));
    }
}
