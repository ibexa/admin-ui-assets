/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module paste-from-office/normalizers/mswordnormalizer
*/
import type { ClipboardInputTransformationData } from "@ckeditor/ckeditor5-clipboard";
import { type ViewDocument } from "@ckeditor/ckeditor5-engine";
import type { PasteFromOfficeNormalizer } from "../normalizer.js";
/**
* Normalizer for the content pasted from Microsoft Word.
*/
export declare class PasteFromOfficeMSWordNormalizer implements PasteFromOfficeNormalizer {
	readonly document: ViewDocument;
	readonly hasMultiLevelListPlugin: boolean;
	readonly hasTablePropertiesPlugin: boolean;
	readonly enableSkipLevelLists: boolean;
	/**
	* Creates a new `PasteFromOfficeMSWordNormalizer` instance.
	*
	* @param document View document.
	*/
	constructor(document: ViewDocument, hasMultiLevelListPlugin?: boolean, hasTablePropertiesPlugin?: boolean, enableSkipLevelLists?: boolean);
	/**
	* @inheritDoc
	*/
	isActive(htmlString: string): boolean;
	/**
	* @inheritDoc
	*/
	execute(data: ClipboardInputTransformationData): void;
}
