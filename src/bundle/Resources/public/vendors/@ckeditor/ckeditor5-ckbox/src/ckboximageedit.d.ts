/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ckbox/ckboximageedit
 */
import { Plugin } from 'ckeditor5/src/core';
import CKBoxImageEditEditing from './ckboximageedit/ckboximageeditediting';
import CKBoxImageEditUI from './ckboximageedit/ckboximageeditui';
import '../theme/ckboximageedit.css';
/**
 * The CKBox image edit feature.
 */
export default class CKBoxImageEdit extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "CKBoxImageEdit";
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof CKBoxImageEditEditing, typeof CKBoxImageEditUI];
}
