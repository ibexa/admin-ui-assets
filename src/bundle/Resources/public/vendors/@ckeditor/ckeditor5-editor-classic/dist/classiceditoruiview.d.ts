/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module editor-classic/classiceditoruiview
*/
import { BoxedEditorUIView, InlineEditableUIView, StickyPanelView, ToolbarView } from "@ckeditor/ckeditor5-ui";
import type { Locale } from "@ckeditor/ckeditor5-utils";
import type { EditingView } from "@ckeditor/ckeditor5-engine";
import type { ViewRootElementDefinition } from "@ckeditor/ckeditor5-core";
/**
* Classic editor UI view. Uses an inline editable and a sticky toolbar, all
* enclosed in a boxed UI view.
*/
export declare class ClassicEditorUIView extends BoxedEditorUIView {
	/**
	* Sticky panel view instance. This is a parent view of a {@link #toolbar}
	* that makes toolbar sticky.
	*/
	readonly stickyPanel: StickyPanelView;
	/**
	* Toolbar view instance.
	*/
	override readonly toolbar: ToolbarView;
	/**
	* Editable UI view.
	*/
	readonly editable: InlineEditableUIView;
	/**
	* Creates an instance of the classic editor UI view.
	*
	* @param locale The {@link module:core/editor/editor~Editor#locale} instance.
	* @param editingView The editing view instance this view is related to.
	* @param options Configuration options for the view instance.
	* @param options.shouldToolbarGroupWhenFull When set `true` enables automatic items grouping
	* in the main {@link module:editor-classic/classiceditoruiview~ClassicEditorUIView#toolbar toolbar}.
	* See {@link module:ui/toolbar/toolbarview~ToolbarOptions#shouldGroupWhenFull} to learn more.
	* @param options.editableElement A {@link module:core/editor/editorconfig~ViewRootElementDefinition}
	* describing the editable element to create inside the UI box. When omitted, a default `<div>` is used.
	* @param options.label When set, this value will be used as an accessible `aria-label` of the
	* {@link module:ui/editableui/editableuiview~EditableUIView editable view}.
	*/
	constructor(locale: Locale, editingView: EditingView, options?: {
		shouldToolbarGroupWhenFull?: boolean;
		useMenuBar?: boolean;
		editableElement?: ViewRootElementDefinition;
		label?: string | Record<string, string>;
	});
	/**
	* @inheritDoc
	*/
	override render(): void;
}
