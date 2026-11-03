/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import type { ModelElement } from "@ckeditor/ckeditor5-engine";
import type { CKBoxConfig } from "../ckboxconfig.js";
/**
* @internal
*/
export declare function createEditabilityChecker(allowExternalImagesEditing: CKBoxConfig["allowExternalImagesEditing"]): (element: ModelElement) => boolean;
