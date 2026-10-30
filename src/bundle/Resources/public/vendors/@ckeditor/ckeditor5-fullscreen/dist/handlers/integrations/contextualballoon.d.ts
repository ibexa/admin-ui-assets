/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import type { Editor } from "@ckeditor/ckeditor5-core";
/**
* Registers a `getPositionOptions` correction on the ContextualBalloon plugin so that
* balloons are offset below the fullscreen toolbar and menu bar.
*/
export declare function registerFullscreenBalloonOffsetCorrection(editor: Editor, wrapper: HTMLElement): () => void;
