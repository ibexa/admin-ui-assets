/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ckfinder/ckfinderediting
 */
import { Plugin } from 'ckeditor5/src/core';
import { Notification } from 'ckeditor5/src/ui';
/**
 * The CKFinder editing feature. It introduces the {@link module:ckfinder/ckfindercommand~CKFinderCommand CKFinder command}.
 */
export default class CKFinderEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "CKFinderEditing";
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof Notification, "LinkEditing"];
    /**
     * @inheritDoc
     */
    init(): void;
}
