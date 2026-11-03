/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { ModelDocumentSelection, type ViewDomConverter, type ModelElement, type ModelSchema, type ModelSelection, type ViewElement } from "@ckeditor/ckeditor5-engine";
/**
* The name of the type around model selection attribute responsible for
* displaying a fake caret next to a selected widget.
*
* @internal
*/
export declare const TYPE_AROUND_SELECTION_ATTRIBUTE = "widget-type-around";
/**
* Checks if an element is a widget that qualifies to get the widget type around UI.
*/
export declare function isTypeAroundWidget(viewElement: ViewElement | undefined, modelElement: ModelElement, schema: ModelSchema): boolean;
/**
* For the passed HTML element, this helper finds the closest widget type around button ancestor.
*
* @internal
*/
export declare function getClosestTypeAroundDomButton(domElement: HTMLElement): HTMLElement | null;
/**
* For the passed widget type around button element, this helper determines at which position
* the paragraph would be inserted into the content if, for instance, the button was
* clicked by the user.
*
* @internal
* @returns The position of the button.
*/
export declare function getTypeAroundButtonPosition(domElement: HTMLElement): "before" | "after";
/**
* For the passed HTML element, this helper returns the closest view widget ancestor.
*
* @internal
*/
export declare function getClosestWidgetViewElement(domElement: HTMLElement, domConverter: ViewDomConverter): ViewElement;
/**
* For the passed selection instance, it returns the position of the fake caret displayed next to a widget.
*
* **Note**: If the fake caret is not currently displayed, `null` is returned.
*
* @internal
* @returns The position of the fake caret or `null` when none is present.
*/
export declare function getTypeAroundFakeCaretPosition(selection: ModelSelection | ModelDocumentSelection): "before" | "after" | null;
/**
* Looks for the `copyOnEnter` text formatting attributes (e.g. bold, font color) carried by the last piece
* of inline content on the sibling that directly precedes a run of one or more consecutive block widgets.
*
* Used when the user inserts a new paragraph next to a widget (e.g. an image or a table) via the type-around
* UI: the new, empty paragraph should continue whatever formatting was active right before the widget,
* instead of starting unformatted:
*
* ```
* <paragraph><$text bold="true">Bar</$text></paragraph><imageBlock></imageBlock>
* ```
*
* Only the attributes carried by the *last* inline child of that sibling are considered - whatever precedes
* it doesn't matter, because it's the last piece of content that reflects what the user was typing right
* before reaching the widget:
*
* ```
* // "bold" IS recovered here: "Bar", the last child, is bold. "Foo" not being bold is irrelevant.
* <paragraph>Foo<$text bold="true">Bar</$text></paragraph><imageBlock></imageBlock>
* ```
*
* If there is more than one widget in a row, the search continues past all of them until a sibling with
* actual content (or the boundary of the parent) is found:
*
* ```
* <paragraph><$text bold="true">Bar</$text></paragraph><imageBlock></imageBlock><imageBlock></imageBlock>
* ```
*
* @param schema Model's schema.
* @param widgetElement The widget model element.
* @internal
*/
export declare function getCopyOnEnterTextAttributesBeforeWidgets(schema: ModelSchema, widgetElement: ModelElement): Array<[string, unknown]>;
