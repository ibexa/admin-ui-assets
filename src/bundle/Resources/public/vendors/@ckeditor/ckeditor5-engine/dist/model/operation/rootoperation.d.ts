/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module engine/model/operation/rootoperation
*/
import { Operation } from "./operation.js";
import { type ModelDocument } from "../document.js";
import type { ModelSelectable } from "../selection.js";
/**
* Operation that creates (or attaches) or detaches a root element.
*/
export declare class RootOperation extends Operation {
	/**
	* Root name to create or detach.
	*/
	readonly rootName: string;
	/**
	* Root element name.
	*/
	readonly elementName: string;
	/**
	* Specifies whether the operation adds (`true`) or detaches the root (`false`).
	*/
	readonly isAdd: boolean;
	/**
	* Document which owns the root.
	*/
	private readonly _document;
	/**
	* Creates an operation that creates or removes a root element.
	*
	* @param rootName Root name to create or detach.
	* @param elementName Root element name.
	* @param isAdd Specifies whether the operation adds (`true`) or detaches the root (`false`).
	* @param document Document which owns the root.
	* @param baseVersion Document {@link module:engine/model/document~ModelDocument#version} on which operation can be applied.
	*/
	constructor(rootName: string, elementName: string, isAdd: boolean, document: ModelDocument, baseVersion: number);
	/**
	* @inheritDoc
	*/
	override get type(): "addRoot" | "detachRoot";
	/**
	* @inheritDoc
	*/
	get affectedSelectable(): ModelSelectable;
	/**
	* @inheritDoc
	*/
	override clone(): RootOperation;
	/**
	* @inheritDoc
	*/
	override getReversed(): RootOperation;
	/**
	* @inheritDoc
	*/
	override _execute(): void;
	/**
	* @inheritDoc
	*/
	override toJSON(): unknown;
	/**
	* @inheritDoc
	*/
	static override get className(): string;
	/**
	* Creates `RootOperation` object from deserialized object, i.e. from parsed JSON string.
	*
	* @param json Deserialized JSON object.
	* @param document Document on which this operation will be applied.
	*/
	static override fromJSON(json: any, document: ModelDocument): RootOperation;
}
