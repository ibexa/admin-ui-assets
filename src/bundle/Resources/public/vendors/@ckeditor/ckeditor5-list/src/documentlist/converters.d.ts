/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module list/documentlist/converters
 */
import { type DowncastAttributeEvent, type EditingController, type Element, type ElementCreatorFunction, type Mapper, type Model, type UpcastElementEvent, type ViewElement } from 'ckeditor5/src/engine';
import type { GetCallback } from 'ckeditor5/src/utils';
import { type ListElement } from './utils/model';
import type { default as DocumentListEditing, DowncastStrategy } from './documentlistediting';
/**
 * Returns the upcast converter for list items. It's supposed to work after the block converters (content inside list items) are converted.
 *
 * @internal
 */
export declare function listItemUpcastConverter(): GetCallback<UpcastElementEvent>;
/**
 * Returns the upcast converter for the `<ul>` and `<ol>` view elements that cleans the input view of garbage.
 * This is mostly to clean whitespaces from between the `<li>` view elements inside the view list element. However,
 * incorrect data can also be cleared if the view was incorrect.
 *
 * @internal
 */
export declare function listUpcastCleanList(): GetCallback<UpcastElementEvent>;
/**
 * Returns a model document change:data event listener that triggers conversion of related items if needed.
 *
 * @internal
 * @param model The editor model.
 * @param editing The editing controller.
 * @param attributeNames The list of all model list attributes (including registered strategies).
 * @param documentListEditing The document list editing plugin.
 */
export declare function reconvertItemsOnDataChange(model: Model, editing: EditingController, attributeNames: Array<string>, documentListEditing: DocumentListEditing): () => void;
/**
 * Returns the list item downcast converter.
 *
 * @internal
 * @param attributeNames A list of attribute names that should be converted if they are set.
 * @param strategies The strategies.
 * @param model The model.
 */
export declare function listItemDowncastConverter(attributeNames: Array<string>, strategies: Array<DowncastStrategy>, model: Model, { dataPipeline }?: {
    dataPipeline?: boolean;
}): GetCallback<DowncastAttributeEvent<ListElement>>;
/**
 * Returns the bogus paragraph view element creator. A bogus paragraph is used if a list item contains only a single block or nested list.
 *
 * @internal
 * @param attributeNames The list of all model list attributes (including registered strategies).
 */
export declare function bogusParagraphCreator(attributeNames: Array<string>, { dataPipeline }?: {
    dataPipeline?: boolean;
}): ElementCreatorFunction;
/**
 * Helper for mapping mode to view elements. It's using positions mapping instead of mapper.toViewElement( element )
 * to find outermost view element. This is for cases when mapping is using inner view element like in the code blocks (pre > code).
 *
 * @internal
 * @param element The model element.
 * @param mapper The mapper instance.
 * @param model The model.
 */
export declare function findMappedViewElement(element: Element, mapper: Mapper, model: Model): ViewElement | null;
