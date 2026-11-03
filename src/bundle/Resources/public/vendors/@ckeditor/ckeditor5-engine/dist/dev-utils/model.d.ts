/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { Model } from "../model/model.js";
import { ModelRange } from "../model/range.js";
import { ModelPosition } from "../model/position.js";
import { ModelSelection } from "../model/selection.js";
import { ModelDocumentFragment } from "../model/documentfragment.js";
import { ModelDocumentSelection } from "../model/documentselection.js";
import type { BatchType } from "../model/batch.js";
import { type MarkerCollection } from "../model/markercollection.js";
import type { ModelSchema, ModelSchemaContextDefinition } from "../model/schema.js";
import { type ModelNode } from "../model/node.js";
type GetModelDataOptions = {
	withoutSelection?: boolean;
	rootName?: string;
	convertMarkers?: boolean;
};
type GetModelData = {
	(model: Model, options?: GetModelDataOptions): string;
	_stringify: typeof _stringifyModel;
};
type SetModelDataOptions = {
	rootName?: string;
	selectionAttributes?: Record<string, unknown>;
	lastRangeBackward?: boolean;
	batchType?: BatchType;
	inlineObjectElements?: Array<string>;
};
type SetModelData = {
	(model: Model, data: string, options?: SetModelDataOptions): void;
	_parse: typeof _parseModel;
};
/**
* Writes the content of a model {@link module:engine/model/document~ModelDocument document} to an HTML-like string.
*
* ```ts
* getData( editor.model ); // -> '<paragraph>Foo![]</paragraph>'
* ```
*
* **Note:** A {@link module:engine/model/text~ModelText text} node that contains attributes will be represented as:
*
* ```xml
* <$text attribute="value">Text data</$text>
* ```
*
* **Note:** Using this tool in production-grade code is not recommended. It was designed for development, prototyping,
* debugging and testing.
*
* @param options.withoutSelection Whether to write the selection. When set to `true`, the selection will
* not be included in the returned string.
* @param options.rootName The name of the root from which the data should be stringified. If not provided,
* the default `main` name will be used.
* @param options.convertMarkers Whether to include markers in the returned string.
* @returns The stringified data.
*/
export declare const _getModelData: GetModelData;
/**
* Sets the content of a model {@link module:engine/model/document~ModelDocument document} provided as an HTML-like string.
*
* ```ts
* setData( editor.model, '<paragraph>Foo![]</paragraph>' );
* ```
*
* **Note:** Remember to register elements in the {@link module:engine/model/model~Model#schema model's schema} before
* trying to use them.
*
* **Note:** To create a {@link module:engine/model/text~ModelText text} node that contains attributes use:
*
* ```xml
* <$text attribute="value">Text data</$text>
* ```
*
* **Note:** Using this tool in production-grade code is not recommended. It was designed for development, prototyping,
* debugging and testing.
*
* @param data HTML-like string to write into the document.
* @param options.rootName Root name where parsed data will be stored. If not provided, the default `main`
* name will be used.
* @param options.selectionAttributes A list of attributes which will be passed to the selection.
* @param options.lastRangeBackward If set to `true`, the last range will be added as backward.
* @param options.batchType Batch type used for inserting elements. See {@link module:engine/model/batch~Batch#constructor}.
*/
export declare const _setModelData: SetModelData;
/**
* Converts model nodes to HTML-like string representation.
*
* **Note:** A {@link module:engine/model/text~ModelText text} node that contains attributes will be represented as:
*
* ```xml
* <$text attribute="value">Text data</$text>
* ```
*
* @param node A node to stringify.
* @param selectionOrPositionOrRange A selection instance whose ranges will be included in the returned string data.
* If a range instance is provided, it will be converted to a selection containing this range. If a position instance
* is provided, it will be converted to a selection containing one range collapsed at this position.
* @param markers Markers to include.
* @returns An HTML-like string representing the model.
*/
export declare function _stringifyModel(node: ModelNode | ModelDocumentFragment, selectionOrPositionOrRange?: ModelSelection | ModelDocumentSelection | ModelPosition | ModelRange | null, markers?: MarkerCollection | null): string;
/**
* Parses an HTML-like string and returns the model {@link module:engine/model/rootelement~ModelRootElement rootElement}.
*
* **Note:** To create a {@link module:engine/model/text~ModelText text} node that contains attributes use:
*
* ```xml
* <$text attribute="value">Text data</$text>
* ```
*
* **Note:** The default `options.context` value is `'$root'`, which only matches the generic root. When the editor
* uses a custom root {@link module:core/editor/editorconfig~RootConfig#modelElement `modelElement`}, pass the target
* {@link module:engine/model/rootelement~ModelRootElement root element} (or its configured model element name)
* explicitly, otherwise the conversion result may be wrong.
* See the {@glink framework/deep-dive/schema#custom-root-elements Custom root elements} section of the
* {@glink framework/deep-dive/schema Schema deep-dive} guide for more details.
*
* @param data HTML-like string to be parsed.
* @param schema A schema instance used by converters for element validation.
* @param options Additional configuration.
* @param options.selectionAttributes A list of attributes which will be passed to the selection.
* @param options.lastRangeBackward If set to `true`, the last range will be added as backward.
* @param options.context The conversion context. If not provided, the default `'$root'` will be used.
* @returns Returns the parsed model node or an object with two fields: `model` and `selection`,
* when selection ranges were included in the data to parse.
*/
export declare function _parseModel(data: string, schema: ModelSchema, options?: {
	selectionAttributes?: Record<string, unknown> | Iterable<[string, unknown]>;
	lastRangeBackward?: boolean;
	context?: ModelSchemaContextDefinition;
	inlineObjectElements?: Array<string>;
}): ModelNode | ModelDocumentFragment | {
	model: ModelNode | ModelDocumentFragment;
	selection: ModelSelection;
};
export {};
