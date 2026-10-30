/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module engine/model/liveposition
*/
import { ModelPosition, type ModelPositionOffset, type ModelPositionStickiness } from "./position.js";
import type { Model } from "./model.js";
import { type ModelDocumentFragment } from "./documentfragment.js";
import { type ModelItem } from "./item.js";
import { type ModelRootElement } from "./rootelement.js";
import { type EmitterMixinConstructor } from "@ckeditor/ckeditor5-utils";
declare const ModelLivePositionBase: EmitterMixinConstructor<typeof ModelPosition>;
/**
* `ModelLivePosition` is a type of {@link module:engine/model/position~ModelPosition Position}
* that updates itself as {@link module:engine/model/document~ModelDocument document}
* is changed through operations. It may be used as a bookmark.
*
* **Note:** Contrary to {@link module:engine/model/position~ModelPosition}, `ModelLivePosition` works only in roots that are
* {@link module:engine/model/rootelement~ModelRootElement}.
* If {@link module:engine/model/documentfragment~ModelDocumentFragment} is passed, error will be thrown.
*
* **Note:** Be very careful when dealing with `ModelLivePosition`. Each `ModelLivePosition` instance bind events that might
* have to be unbound.
* Use {@link module:engine/model/liveposition~ModelLivePosition#detach} whenever you don't need `ModelLivePosition` anymore.
*/
export declare class ModelLivePosition extends ModelLivePositionBase {
	/**
	* Root of the position path.
	*/
	readonly root: ModelRootElement;
	/**
	* Creates a live position.
	*
	* @see module:engine/model/position~ModelPosition
	*/
	constructor(root: ModelRootElement, path: Array<number>, stickiness?: ModelPositionStickiness, model?: Model);
	/**
	* Unbinds all events previously bound by `ModelLivePosition`. Use it whenever you don't need `ModelLivePosition` instance
	* anymore (i.e. when leaving scope in which it was declared or before re-assigning variable that was
	* referring to it).
	*/
	detach(): void;
	/**
	* Creates a {@link module:engine/model/position~ModelPosition position instance}, which is equal to this live position.
	*/
	toPosition(): ModelPosition;
	/**
	* Creates a `ModelLivePosition` instance that is equal to position.
	*/
	static fromPosition(position: ModelPosition, stickiness?: ModelPositionStickiness): ModelLivePosition;
	/**
	* Creates a `ModelLivePosition` for a position rooted in
	* a {@link module:engine/model/documentfragment~ModelDocumentFragment document fragment}.
	*
	* Document fragment does not belong to a document, so the live position is bound to the provided `model` and keeps
	* itself in sync with every operation applied to that fragment (e.g. while editing clipboard content).
	*
	* @internal
	*/
	static _fromPositionInDocumentFragment(position: ModelPosition, model: Model, stickiness?: ModelPositionStickiness): ModelLivePosition;
	/**
	* @internal
	* @see module:engine/model/position~ModelPosition._createAfter
	*/
	static readonly _createAfter: (item: ModelItem | ModelDocumentFragment, stickiness?: ModelPositionStickiness) => ModelLivePosition;
	/**
	* @internal
	* @see module:engine/model/position~ModelPosition._createBefore
	*/
	static readonly _createBefore: (item: ModelItem | ModelDocumentFragment, stickiness?: ModelPositionStickiness) => ModelLivePosition;
	/**
	* @internal
	* @see module:engine/model/position~ModelPosition._createAt
	*/
	static readonly _createAt: (itemOrPosition: ModelItem | ModelPosition | ModelDocumentFragment, offset?: ModelPositionOffset, stickiness?: ModelPositionStickiness) => ModelLivePosition;
}
/**
* Fired when `ModelLivePosition` instance is changed due to changes on {@link module:engine/model/document~ModelDocument}.
*
* @eventName ~ModelLivePosition#change
* @param oldPosition Position equal to this live position before it got changed.
*/
export type ModelLivePositionChangeEvent = {
	name: "change";
	args: [oldPosition: ModelPosition];
};
export {};
