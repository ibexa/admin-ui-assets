/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module engine/conversion/mapper
 */
import ModelPosition from '../model/position.js';
import ModelRange from '../model/range.js';
import ViewPosition from '../view/position.js';
import ViewRange from '../view/range.js';
import { CKEditorError, EmitterMixin } from '@ckeditor/ckeditor5-utils';
/**
 * Maps elements, positions and markers between the {@link module:engine/view/document~Document view} and
 * the {@link module:engine/model/model model}.
 *
 * The instance of the Mapper used for the editing pipeline is available in
 * {@link module:engine/controller/editingcontroller~EditingController#mapper `editor.editing.mapper`}.
 *
 * Mapper uses bound elements to find corresponding elements and positions, so, to get proper results,
 * all model elements should be {@link module:engine/conversion/mapper~Mapper#bindElements bound}.
 *
 * To map the complex model to/from view relations, you may provide custom callbacks for the
 * {@link module:engine/conversion/mapper~Mapper#event:modelToViewPosition modelToViewPosition event} and
 * {@link module:engine/conversion/mapper~Mapper#event:viewToModelPosition viewToModelPosition event} that are fired whenever
 * a position mapping request occurs.
 * Those events are fired by the {@link module:engine/conversion/mapper~Mapper#toViewPosition toViewPosition}
 * and {@link module:engine/conversion/mapper~Mapper#toModelPosition toModelPosition} methods. `Mapper` adds its own default callbacks
 * with `'lowest'` priority. To override default `Mapper` mapping, add custom callback with higher priority and
 * stop the event.
 */
export default class Mapper extends /* #__PURE__ */ EmitterMixin() {
    /**
     * Model element to view element mapping.
     */
    _modelToViewMapping = new WeakMap();
    /**
     * View element to model element mapping.
     */
    _viewToModelMapping = new WeakMap();
    /**
     * A map containing callbacks between view element names and functions evaluating length of view elements
     * in model.
     */
    _viewToModelLengthCallbacks = new Map();
    /**
     * Model marker name to view elements mapping.
     *
     * Keys are `String`s while values are `Set`s with {@link module:engine/view/element~Element view elements}.
     * One marker (name) can be mapped to multiple elements.
     */
    _markerNameToElements = new Map();
    /**
     * View element to model marker names mapping.
     *
     * This is reverse to {@link ~Mapper#_markerNameToElements} map.
     */
    _elementToMarkerNames = new Map();
    /**
     * The map of removed view elements with their current root (used for deferred unbinding).
     */
    _deferredBindingRemovals = new Map();
    /**
     * Stores marker names of markers which have changed due to unbinding a view element (so it is assumed that the view element
     * has been removed, moved or renamed).
     */
    _unboundMarkerNames = new Set();
    /**
     * Manages dynamic cache for the `Mapper` to improve the performance.
     */
    _cache = new MapperCache();
    /**
     * Creates an instance of the mapper.
     */
    constructor() {
        super();
        // Default mapper algorithm for mapping model position to view position.
        this.on('modelToViewPosition', (evt, data) => {
            if (data.viewPosition) {
                return;
            }
            const viewContainer = this._modelToViewMapping.get(data.modelPosition.parent);
            if (!viewContainer) {
                /**
                 * A model position could not be mapped to the view because the parent of the model position
                 * does not have a mapped view element (might have not been converted yet or it has no converter).
                 *
                 * Make sure that the model element is correctly converted to the view.
                 *
                 * @error mapping-model-position-view-parent-not-found
                 */
                throw new CKEditorError('mapping-model-position-view-parent-not-found', this, { modelPosition: data.modelPosition });
            }
            data.viewPosition = this.findPositionIn(viewContainer, data.modelPosition.offset);
        }, { priority: 'low' });
        // Default mapper algorithm for mapping view position to model position.
        this.on('viewToModelPosition', (evt, data) => {
            if (data.modelPosition) {
                return;
            }
            const viewBlock = this.findMappedViewAncestor(data.viewPosition);
            const modelParent = this._viewToModelMapping.get(viewBlock);
            const modelOffset = this._toModelOffset(data.viewPosition.parent, data.viewPosition.offset, viewBlock);
            data.modelPosition = ModelPosition._createAt(modelParent, modelOffset);
        }, { priority: 'low' });
    }
    /**
     * Marks model and view elements as corresponding. Corresponding elements can be retrieved by using
     * the {@link module:engine/conversion/mapper~Mapper#toModelElement toModelElement} and
     * {@link module:engine/conversion/mapper~Mapper#toViewElement toViewElement} methods.
     * The information that elements are bound is also used to translate positions.
     *
     * @param modelElement Model element.
     * @param viewElement View element.
     */
    bindElements(modelElement, viewElement) {
        this._modelToViewMapping.set(modelElement, viewElement);
        this._viewToModelMapping.set(viewElement, modelElement);
    }
    /**
     * Unbinds the given {@link module:engine/view/element~Element view element} from the map.
     *
     * **Note:** view-to-model binding will be removed, if it existed. However, corresponding model-to-view binding
     * will be removed only if model element is still bound to the passed `viewElement`.
     *
     * This behavior allows for re-binding model element to another view element without fear of losing the new binding
     * when the previously bound view element is unbound.
     *
     * @param viewElement View element to unbind.
     * @param options The options object.
     * @param options.defer Controls whether the binding should be removed immediately or deferred until a
     * {@link #flushDeferredBindings `flushDeferredBindings()`} call.
     */
    unbindViewElement(viewElement, options = {}) {
        const modelElement = this.toModelElement(viewElement);
        if (this._elementToMarkerNames.has(viewElement)) {
            for (const markerName of this._elementToMarkerNames.get(viewElement)) {
                this._unboundMarkerNames.add(markerName);
            }
        }
        if (options.defer) {
            this._deferredBindingRemovals.set(viewElement, viewElement.root);
        }
        else {
            const wasFound = this._viewToModelMapping.delete(viewElement);
            if (wasFound) {
                // Stop tracking after the element is no longer mapped. We want to track all mapped elements and only mapped elements.
                this._cache.stopTracking(viewElement);
            }
            if (this._modelToViewMapping.get(modelElement) == viewElement) {
                this._modelToViewMapping.delete(modelElement);
            }
        }
    }
    /**
     * Unbinds the given {@link module:engine/model/element~Element model element} from the map.
     *
     * **Note:** the model-to-view binding will be removed, if it existed. However, the corresponding view-to-model binding
     * will be removed only if the view element is still bound to the passed `modelElement`.
     *
     * This behavior lets for re-binding view element to another model element without fear of losing the new binding
     * when the previously bound model element is unbound.
     *
     * @param modelElement Model element to unbind.
     */
    unbindModelElement(modelElement) {
        const viewElement = this.toViewElement(modelElement);
        this._modelToViewMapping.delete(modelElement);
        if (this._viewToModelMapping.get(viewElement) == modelElement) {
            const wasFound = this._viewToModelMapping.delete(viewElement);
            if (wasFound) {
                // Stop tracking after the element is no longer mapped. We want to track all mapped elements and only mapped elements.
                this._cache.stopTracking(viewElement);
            }
        }
    }
    /**
     * Binds the given marker name with the given {@link module:engine/view/element~Element view element}. The element
     * will be added to the current set of elements bound with the given marker name.
     *
     * @param element Element to bind.
     * @param name Marker name.
     */
    bindElementToMarker(element, name) {
        const elements = this._markerNameToElements.get(name) || new Set();
        elements.add(element);
        const names = this._elementToMarkerNames.get(element) || new Set();
        names.add(name);
        this._markerNameToElements.set(name, elements);
        this._elementToMarkerNames.set(element, names);
    }
    /**
     * Unbinds an element from given marker name.
     *
     * @param element Element to unbind.
     * @param name Marker name.
     */
    unbindElementFromMarkerName(element, name) {
        const nameToElements = this._markerNameToElements.get(name);
        if (nameToElements) {
            nameToElements.delete(element);
            if (nameToElements.size == 0) {
                this._markerNameToElements.delete(name);
            }
        }
        const elementToNames = this._elementToMarkerNames.get(element);
        if (elementToNames) {
            elementToNames.delete(name);
            if (elementToNames.size == 0) {
                this._elementToMarkerNames.delete(element);
            }
        }
    }
    /**
     * Returns all marker names of markers which have changed due to unbinding a view element (so it is assumed that the view element
     * has been removed, moved or renamed) since the last flush. After returning, the marker names list is cleared.
     */
    flushUnboundMarkerNames() {
        const markerNames = Array.from(this._unboundMarkerNames);
        this._unboundMarkerNames.clear();
        return markerNames;
    }
    /**
     * Unbinds all deferred binding removals of view elements that in the meantime were not re-attached to some root or document fragment.
     *
     * See: {@link #unbindViewElement `unbindViewElement()`}.
     */
    flushDeferredBindings() {
        for (const [viewElement, root] of this._deferredBindingRemovals) {
            // Unbind it only if it wasn't re-attached to some root or document fragment.
            if (viewElement.root == root) {
                this.unbindViewElement(viewElement);
            }
        }
        this._deferredBindingRemovals = new Map();
    }
    /**
     * Removes all model to view and view to model bindings.
     */
    clearBindings() {
        this._modelToViewMapping = new WeakMap();
        this._viewToModelMapping = new WeakMap();
        this._markerNameToElements = new Map();
        this._elementToMarkerNames = new Map();
        this._unboundMarkerNames = new Set();
        this._deferredBindingRemovals = new Map();
    }
    toModelElement(viewElement) {
        return this._viewToModelMapping.get(viewElement);
    }
    toViewElement(modelElement) {
        return this._modelToViewMapping.get(modelElement);
    }
    /**
     * Gets the corresponding model range.
     *
     * @param viewRange View range.
     * @returns Corresponding model range.
     */
    toModelRange(viewRange) {
        return new ModelRange(this.toModelPosition(viewRange.start), this.toModelPosition(viewRange.end));
    }
    /**
     * Gets the corresponding view range.
     *
     * @param modelRange Model range.
     * @returns Corresponding view range.
     */
    toViewRange(modelRange) {
        return new ViewRange(this.toViewPosition(modelRange.start), this.toViewPosition(modelRange.end));
    }
    /**
     * Gets the corresponding model position.
     *
     * @fires viewToModelPosition
     * @param viewPosition View position.
     * @returns Corresponding model position.
     */
    toModelPosition(viewPosition) {
        const data = {
            viewPosition,
            mapper: this
        };
        this.fire('viewToModelPosition', data);
        return data.modelPosition;
    }
    /**
     * Gets the corresponding view position.
     *
     * @fires modelToViewPosition
     * @param modelPosition Model position.
     * @param options Additional options for position mapping process.
     * @param options.isPhantom Should be set to `true` if the model position to map is pointing to a place
     * in model tree which no longer exists. For example, it could be an end of a removed model range.
     * @returns Corresponding view position.
     */
    toViewPosition(modelPosition, options = {}) {
        const data = {
            modelPosition,
            mapper: this,
            isPhantom: options.isPhantom
        };
        this.fire('modelToViewPosition', data);
        return data.viewPosition;
    }
    /**
     * Gets all view elements bound to the given marker name.
     *
     * @param name Marker name.
     * @returns View elements bound with the given marker name or `null`
     * if no elements are bound to the given marker name.
     */
    markerNameToElements(name) {
        const boundElements = this._markerNameToElements.get(name);
        if (!boundElements) {
            return null;
        }
        const elements = new Set();
        for (const element of boundElements) {
            if (element.is('attributeElement')) {
                for (const clone of element.getElementsWithSameId()) {
                    elements.add(clone);
                }
            }
            else {
                elements.add(element);
            }
        }
        return elements;
    }
    /**
     * **This method is deprecated and will be removed in one of the future CKEditor 5 releases.**
     *
     * **Using this method will turn off `Mapper` caching system and may degrade performance when operating on bigger documents.**
     *
     * Registers a callback that evaluates the length in the model of a view element with the given name.
     *
     * The callback is fired with one argument, which is a view element instance. The callback is expected to return
     * a number representing the length of the view element in the model.
     *
     * ```ts
     * // List item in view may contain nested list, which have other list items. In model though,
     * // the lists are represented by flat structure. Because of those differences, length of list view element
     * // may be greater than one. In the callback it's checked how many nested list items are in evaluated list item.
     *
     * function getViewListItemLength( element ) {
     * 	let length = 1;
     *
     * 	for ( let child of element.getChildren() ) {
     * 		if ( child.name == 'ul' || child.name == 'ol' ) {
     * 			for ( let item of child.getChildren() ) {
     * 				length += getViewListItemLength( item );
     * 			}
     * 		}
     * 	}
     *
     * 	return length;
     * }
     *
     * mapper.registerViewToModelLength( 'li', getViewListItemLength );
     * ```
     *
     * @param viewElementName Name of view element for which callback is registered.
     * @param lengthCallback Function return a length of view element instance in model.
     * @deprecated
     */
    registerViewToModelLength(viewElementName, lengthCallback) {
        this._viewToModelLengthCallbacks.set(viewElementName, lengthCallback);
    }
    /**
     * For the given `viewPosition`, finds and returns the closest ancestor of this position that has a mapping to
     * the model.
     *
     * @param viewPosition Position for which a mapped ancestor should be found.
     */
    findMappedViewAncestor(viewPosition) {
        let parent = viewPosition.parent;
        while (!this._viewToModelMapping.has(parent)) {
            parent = parent.parent;
        }
        return parent;
    }
    /**
     * Calculates model offset based on the view position and the block element.
     *
     * Example:
     *
     * ```html
     * <p>foo<b>ba|r</b></p> // _toModelOffset( b, 2, p ) -> 5
     * ```
     *
     * Is a sum of:
     *
     * ```html
     * <p>foo|<b>bar</b></p> // _toModelOffset( p, 3, p ) -> 3
     * <p>foo<b>ba|r</b></p> // _toModelOffset( b, 2, b ) -> 2
     * ```
     *
     * @param viewParent Position parent.
     * @param viewOffset Position offset.
     * @param viewBlock Block used as a base to calculate offset.
     * @returns Offset in the model.
     */
    _toModelOffset(viewParent, viewOffset, viewBlock) {
        if (viewBlock != viewParent) {
            // See example.
            const offsetToParentStart = this._toModelOffset(viewParent.parent, viewParent.index, viewBlock);
            const offsetInParent = this._toModelOffset(viewParent, viewOffset, viewParent);
            return offsetToParentStart + offsetInParent;
        }
        // viewBlock == viewParent, so we need to calculate the offset in the parent element.
        // If the position is a text it is simple ("ba|r" -> 2).
        if (viewParent.is('$text')) {
            return viewOffset;
        }
        // If the position is in an element we need to sum lengths of siblings ( <b> bar </b> foo | -> 3 + 3 = 6 ).
        let modelOffset = 0;
        for (let i = 0; i < viewOffset; i++) {
            modelOffset += this.getModelLength(viewParent.getChild(i));
        }
        return modelOffset;
    }
    /**
     * Gets the length of the view element in the model.
     *
     * The length is calculated as follows:
     * * if a {@link #registerViewToModelLength length mapping callback} is provided for the given `viewNode`, it is used to
     * evaluate the model length (`viewNode` is used as first and only parameter passed to the callback),
     * * length of a {@link module:engine/view/text~Text text node} is equal to the length of its
     * {@link module:engine/view/text~Text#data data},
     * * length of a {@link module:engine/view/uielement~UIElement ui element} is equal to 0,
     * * length of a mapped {@link module:engine/view/element~Element element} is equal to 1,
     * * length of a non-mapped {@link module:engine/view/element~Element element} is equal to the length of its children.
     *
     * Examples:
     *
     * ```
     * foo                          -> 3 // Text length is equal to its data length.
     * <p>foo</p>                   -> 1 // Length of an element which is mapped is by default equal to 1.
     * <b>foo</b>                   -> 3 // Length of an element which is not mapped is a length of its children.
     * <div><p>x</p><p>y</p></div>  -> 2 // Assuming that <div> is not mapped and <p> are mapped.
     * ```
     *
     * @param viewNode View node.
     * @returns Length of the node in the tree model.
     */
    getModelLength(viewNode) {
        const stack = [viewNode];
        let len = 0;
        while (stack.length > 0) {
            const node = stack.pop();
            const callback = node.name &&
                this._viewToModelLengthCallbacks.size > 0 &&
                this._viewToModelLengthCallbacks.get(node.name);
            if (callback) {
                len += callback(node);
            }
            else if (this._viewToModelMapping.has(node)) {
                len += 1;
            }
            else if (node.is('$text')) {
                len += node.data.length;
            }
            else if (node.is('uiElement')) {
                continue;
            }
            else {
                for (const child of node.getChildren()) {
                    stack.push(child);
                }
            }
        }
        return len;
    }
    /**
     * Finds the position in a view element or view document fragment node (or in its children) with the expected model offset.
     *
     * If the passed `viewContainer` is bound to model, `Mapper` will use caching mechanism to improve performance.
     *
     * @param viewContainer Tree view element in which we are looking for the position.
     * @param modelOffset Expected offset.
     * @returns Found position.
     */
    findPositionIn(viewContainer, modelOffset) {
        if (modelOffset === 0) {
            // Quickly return if asked for a position at the beginning of the container. No need to fire complex mechanisms to find it.
            return this._moveViewPositionToTextNode(new ViewPosition(viewContainer, 0));
        }
        // Use cache only if there are no custom view-to-model length callbacks and only for bound elements.
        // View-to-model length callbacks are deprecated and should be removed in one of the following releases.
        // Then it will be possible to simplify some logic inside `Mapper`.
        // Note: we could consider requiring `viewContainer` to be a mapped item.
        const useCache = this._viewToModelLengthCallbacks.size == 0 && this._viewToModelMapping.has(viewContainer);
        if (useCache) {
            const cacheItem = this._cache.getClosest(viewContainer, modelOffset);
            return this._findPositionStartingFrom(cacheItem.viewPosition, cacheItem.modelOffset, modelOffset, viewContainer, true);
        }
        else {
            return this._findPositionStartingFrom(new ViewPosition(viewContainer, 0), 0, modelOffset, viewContainer, false);
        }
    }
    /**
     * Performs most of the logic for `Mapper#findPositionIn()`.
     *
     * It allows to start looking for the requested model offset from a given starting position, to enable caching. Using the cache,
     * you can set the starting point and skip all the calculations that were already previously done.
     *
     * This method uses recursion to find positions inside deep structures. Example:
     *
     * ```
     * <p>fo<b>bar</b>bom</p>  -> target offset: 4
     * <p>|fo<b>bar</b>bom</p> -> target offset: 4, traversed offset: 0
     * <p>fo|<b>bar</b>bom</p> -> target offset: 4, traversed offset: 2
     * <p>fo<b>bar</b>|bom</p> -> target offset: 4, traversed offset: 5 -> we are too far, look recursively in <b>.
     *
     * <p>fo<b>|bar</b>bom</p> -> target offset: 4, traversed offset: 2
     * <p>fo<b>bar|</b>bom</p> -> target offset: 4, traversed offset: 5 -> we are too far, look inside "bar".
     *
     * <p>fo<b>ba|r</b>bom</p> -> target offset: 4, traversed offset: 2 -> position is inside text node at offset 4-2 = 2.
     * ```
     *
     * @param startViewPosition View position to start looking from.
     * @param startModelOffset Model offset related to `startViewPosition`.
     * @param targetModelOffset Target model offset to find.
     * @param viewContainer Mapped ancestor of `startViewPosition`. `startModelOffset` is the offset inside a model element or model
     * document fragment mapped to `viewContainer`.
     * @param useCache Whether `Mapper` should cache positions while traversing the view tree looking for `expectedModelOffset`.
     * @returns View position mapped to `targetModelOffset`.
     */
    _findPositionStartingFrom(startViewPosition, startModelOffset, targetModelOffset, viewContainer, useCache) {
        let viewParent = startViewPosition.parent;
        let viewOffset = startViewPosition.offset;
        // In the text node it is simple: the offset in the model equals the offset in the text.
        if (viewParent.is('$text')) {
            return new ViewPosition(viewParent, targetModelOffset - startModelOffset);
        }
        // Last scanned view node.
        let viewNode;
        // Total model offset of the view nodes that were visited so far.
        let traversedModelOffset = startModelOffset;
        // Model length of the last traversed view node.
        let lastLength = 0;
        while (traversedModelOffset < targetModelOffset) {
            viewNode = viewParent.getChild(viewOffset);
            if (!viewNode) {
                // If we still haven't reached the model offset, but we reached end of this `viewParent`, then we need to "leave" this
                // element and "go up", looking further for the target model offset. This can happen when cached model offset is "deeper"
                // but target model offset is "higher" in the view tree.
                //
                // Example: `<p>Foo<strong><em>Bar</em>^Baz</strong>Xyz</p>`
                //
                // Consider `^` is last cached position, when the `targetModelOffset` is `12`. In such case, we need to "go up" from
                // `<strong>` and continue traversing in `<p>`.
                //
                if (viewParent == viewContainer) {
                    /**
                     * A model position could not be mapped to the view because specified model offset was too big and could not be
                     * found inside the mapped view element or view document fragment.
                     *
                     * @error mapping-model-offset-not-found
                     */
                    throw new CKEditorError('mapping-model-offset-not-found', this, { modelOffset: targetModelOffset, viewContainer });
                }
                else {
                    viewOffset = viewParent.parent.getChildIndex(viewParent) + 1;
                    viewParent = viewParent.parent;
                    continue;
                }
            }
            lastLength = this.getModelLength(viewNode);
            traversedModelOffset += lastLength;
            viewOffset++;
            if (useCache) {
                // Note, that we cache the view position before and after a visited element here, so before we (possibly) "enter" it
                // (see `else` below).
                //
                // Since `MapperCache#save` does not overwrite already cached model offsets, this way the cached position is set to
                // a correct location, that is the closest to the mapped `viewContainer`.
                //
                // However, in some cases, we still need to "hoist" the cached position (see `MapperCache#_hoistViewPosition()`).
                this._cache.save(viewParent, viewOffset, viewContainer, traversedModelOffset);
            }
        }
        if (traversedModelOffset == targetModelOffset) {
            // If it equals we found the position.
            return this._moveViewPositionToTextNode(new ViewPosition(viewParent, viewOffset));
        }
        else {
            // If it is higher we overstepped with the last traversed view node.
            // We need to "enter" it, and look for the view position / model offset inside the last visited view node.
            return this._findPositionStartingFrom(new ViewPosition(viewNode, 0), traversedModelOffset - lastLength, targetModelOffset, viewContainer, useCache);
        }
    }
    /**
     * Because we prefer positions in the text nodes over positions next to text nodes, if the view position was next to a text node,
     * it moves it into the text node instead.
     *
     * ```
     * <p>[]<b>foo</b></p> -> <p>[]<b>foo</b></p> // do not touch if position is not directly next to text
     * <p>foo[]<b>foo</b></p> -> <p>foo{}<b>foo</b></p> // move to text node
     * <p><b>[]foo</b></p> -> <p><b>{}foo</b></p> // move to text node
     * ```
     *
     * @param viewPosition Position potentially next to the text node.
     * @returns Position in the text node if possible.
     */
    _moveViewPositionToTextNode(viewPosition) {
        // If the position is just after a text node, put it at the end of that text node.
        // If the position is just before a text node, put it at the beginning of that text node.
        const nodeBefore = viewPosition.nodeBefore;
        const nodeAfter = viewPosition.nodeAfter;
        if (nodeBefore && nodeBefore.is('view:$text')) {
            return new ViewPosition(nodeBefore, nodeBefore.data.length);
        }
        else if (nodeAfter && nodeAfter.is('view:$text')) {
            return new ViewPosition(nodeAfter, 0);
        }
        // Otherwise, just return the given position.
        return viewPosition;
    }
}
/**
 * Cache mechanism for {@link module:engine/conversion/mapper~Mapper Mapper}.
 *
 * `MapperCache` improves performance for model-to-view position mapping, which is the main `Mapper` task. Asking for a mapping is much
 * more frequent than actually performing changes, and even if the change happens, we can still partially keep the cache. This makes
 * caching a useful strategy for `Mapper`.
 *
 * `MapperCache` will store some data for view elements or view document fragments that are mapped by the `Mapper`. These view items
 * are "tracked" by the `MapperCache`. For such view items, we will keep entries of model offsets inside their mapped counterpart. For
 * the cached model offsets, we will keep a view position that is inside the tracked item. This allows us to either get the mapping
 * instantly, or at least in less steps than when calculating it from the beginning.
 *
 * Important problem related to caching is invalidating the cache. The cache must be invalidated each time the tracked view item changes.
 * Additionally, we should invalidate as small part of the cache as possible. Since all the logic is encapsulated inside `MapperCache`,
 * the `MapperCache` listens to view items {@link module:engine/view/node~ViewNodeChangeEvent `change` event} and reacts to it.
 * Then, it invalidates just the part of the cache that is "after" the changed part of the view.
 *
 * As mentioned, `MapperCache` currently is used only for model-to-view position mapping as it was much bigger problem than view-to-model
 * mapping. However, it should be possible to use it also for view-to-model.
 *
 * The main assumptions regarding `MapperCache` are:
 *
 * * it is an internal tool, used by `Mapper`, transparent to the outside (no additional effort when developing a plugin or a converter),
 * * it stores all the necessary data internally, which makes it easier to disable or debug,
 * * it is optimized for initial downcast process (long insertions), which is crucial for editor init and data save,
 * * it does not save all possible positions for memory considerations, although it is a possible improvement, which may have increase
 *   performance, as well as simplify some parts of the `MapperCache` logic.
 *
 * @internal
 */
export class MapperCache extends /* #__PURE__ */ EmitterMixin() {
    /**
     * For every view element or document fragment tracked by `MapperCache`, it holds currently cached data, or more precisely,
     * model offset to view position mappings. See also `MappingCache` and `CacheItem`.
     *
     * If an item is tracked by `MapperCache` it has an entry in this structure, so this structure can be used to check which items
     * are tracked by `MapperCache`. When an item is no longer tracked, it is removed from this structure.
     *
     * Although `MappingCache` and `CacheItem` structures allows for caching any model offsets and view positions, we only cache
     * values for model offsets that are after a view node. So, in essence, positions inside text nodes are not cached. However, it takes
     * from one to at most a few steps, to get from a cached position to a position that is inside a view text node.
     *
     * Additionally, only one item per `modelOffset` is cached. There can be several view nodes that "end" at the same `modelOffset`.
     * In this case, we favour positions that are closer to the mapped item. For example
     *
     * * for model: `<paragraph>Some <$text bold=true italic=true>formatted</$text> text.</paragraph>`,
     * * and view: `<p>Some <em><strong>formatted</strong></em> text.</p>`,
     *
     * for model offset `14` (after "d"), we store view position after `<em>` element (i.e. view position: at `<p>`, offset `2`).
     */
    _cachedMapping = new WeakMap();
    /**
     * When `MapperCache` {@link ~MapperCache#save saves} view position -> model offset mapping, a `CacheItem` is inserted into certain
     * `MappingCache#cacheList` at some index. Additionally, we store that index with the view node that is before the cached view position.
     *
     * This allows to quickly get a cache list item related to certain view node, and hence, for fast cache invalidation.
     *
     * For example, consider view: `<p>Some <strong>bold</strong> text.</p>`, where `<p>` is a view element tracked by `MapperCache`.
     * If all `<p>` children were visited by `MapperCache`, then `<p>` cache list would have four items, related to following model offsets:
     * `0`, `5`, `9`, `15`. Then, view node `"Some "` would have index `1`, `<strong>` index `2`, and `" text." index `3`.
     *
     * Note that the index related with a node is always greater than `0`. The first item in cache list is always for model offset `0`
     * (and view offset `0`), and it is not related to any node.
     */
    _nodeToCacheListIndex = new WeakMap();
    /**
     * Callback fired whenever there is a direct or indirect children change in tracked view element or tracked view document fragment.
     *
     * This is specified as a property to make it easier to set as an event callback and to later turn off that event.
     */
    _invalidateOnChildrenChangeCallback = (evt, viewNode, data) => {
        // View element or document fragment changed its children at `data.index`. Clear all cache starting from before that index.
        this._clearCacheInsideParent(viewNode, data.index);
    };
    /**
     * Callback fired whenever a view text node directly or indirectly inside a tracked view element or tracked view document fragment
     * changes its text data.
     *
     * This is specified as a property to make it easier to set as an event callback and to later turn off that event.
     */
    _invalidateOnTextChangeCallback = (evt, viewNode) => {
        // Text node has changed. Clear all the cache starting from before this text node.
        this._clearCacheStartingBefore(viewNode);
    };
    /**
     * Saves cache for given view position mapping <-> model offset mapping. The view position should be after a node (i.e. it cannot
     * be the first position inside its parent, or in other words, `viewOffset` must be greater than `0`).
     *
     * @param viewParent View position parent.
     * @param viewOffset View position offset. Must be greater than `0`.
     * @param viewContainer Tracked view position ascendant (it may be the direct parent of the view position).
     * @param modelOffset Model offset in the model element or document fragment which is mapped to `viewContainer`.
     */
    save(viewParent, viewOffset, viewContainer, modelOffset) {
        // Get current cache for the tracked ancestor.
        const cache = this._cachedMapping.get(viewContainer);
        // See if there is already a cache defined for `modelOffset`.
        const cacheItem = cache.cacheMap.get(modelOffset);
        if (cacheItem) {
            // We already cached this offset. Don't overwrite the cache.
            //
            // This assumes that `Mapper` works in a way that we first cache the parent and only then cache children, as we prefer position
            // after the parent ("closer" to the tracked ancestor). It might be safer to check which position is preferred (newly saved or
            // the one currently in cache) but it would require additional processing. For now, `Mapper#_findPositionIn()` and
            // `Mapper#getModelLength()` are implemented so that parents are cached before their children.
            //
            // So, don't create new cache if one already exists. Instead, only save `_nodeToCacheListIndex` value for the related view node.
            const viewChild = viewParent.getChild(viewOffset - 1);
            // Figure out what index to save with `viewChild`.
            // We have a `cacheItem` for the `modelOffset`, so we can get a `viewPosition` from there. Before that view position, there
            // must be a node. That node must have an index set. This will be the index we will want to use.
            // Since we expect `viewOffset` to be greater than 0, then in almost all cases `modelOffset` will be greater than 0 as well.
            // As a result, we can expect `cacheItem.viewPosition.nodeBefore` to be set.
            //
            // However, in an edge case, were the tracked element contains a 0-model-length view element as the first child (UI element or
            // an empty attribute element), then `modelOffset` will be 0, and `cacheItem` will be the first cache item, which is before any
            // view node. In such edge case, `cacheItem.viewPosition.nodeBefore` is undefined, and we manually set to `0`.
            const index = cacheItem.viewPosition.nodeBefore ? this._nodeToCacheListIndex.get(cacheItem.viewPosition.nodeBefore) : 0;
            this._nodeToCacheListIndex.set(viewChild, index);
            return;
        }
        const viewPosition = new ViewPosition(viewParent, viewOffset);
        const newCacheItem = { viewPosition, modelOffset };
        // Extend the valid cache range.
        cache.maxModelOffset = modelOffset > cache.maxModelOffset ? modelOffset : cache.maxModelOffset;
        // Save the new cache item to the `cacheMap`.
        cache.cacheMap.set(modelOffset, newCacheItem);
        // Save the new cache item to the `cacheList`.
        let i = cache.cacheList.length - 1;
        // Mostly, we cache elements at the end of `cacheList` and the loop does not execute even once. But when we recursively visit nodes
        // in `Mapper#_findPositionIn()`, then we will first cache the parent, and then it's children, and they will not be added at the
        // end of `cacheList`. This is why we need to find correct index to insert them.
        while (i >= 0 && cache.cacheList[i].modelOffset > modelOffset) {
            i--;
        }
        cache.cacheList.splice(i + 1, 0, newCacheItem);
        if (viewOffset > 0) {
            const viewChild = viewParent.getChild(viewOffset - 1);
            // There was an idea to also cache `viewContainer` here but, it could lead to wrong results. If we wanted to cache
            // `viewContainer`, we probably would need to clear `this._nodeToCacheListIndex` when cache is cleared.
            // Also, there was no gain from caching this value, the results were almost the same (statistical error).
            this._nodeToCacheListIndex.set(viewChild, i + 1);
        }
    }
    /**
     * For given `modelOffset` inside a model element mapped to given `viewContainer`, it returns the closest saved cache item
     * (view position and related model offset) to the requested one.
     *
     * It can be exactly the requested mapping, or it can be mapping that is the closest starting point to look for the requested mapping.
     *
     * `viewContainer` must be a view element or document fragment that is mapped by the {@link ~Mapper Mapper}.
     *
     * If `viewContainer` is not yet tracked by the `MapperCache`, it will be automatically tracked after calling this method.
     *
     * Note: this method will automatically "hoist" cached positions, i.e. it will return a position that is closest to the tracked element.
     *
     * For example, if `<p>` is tracked element, and `^` is cached position:
     *
     * ```
     * <p>This is <strong>some <em>heavily <u>formatted</u>^</em></strong> text.</p>
     * ```
     *
     * If this position would be returned, instead, a position directly in `<p>` would be returned:
     *
     * ```
     * <p>This is <strong>some <em>heavily <u>formatted</u></em></strong>^ text.</p>
     * ```
     *
     * Note, that `modelOffset` for both positions is the same.
     *
     * @param viewContainer Tracked view element or document fragment, which cache will be used.
     * @param modelOffset Model offset in a model element or document fragment, which is mapped to `viewContainer`.
     */
    getClosest(viewContainer, modelOffset) {
        const cache = this._cachedMapping.get(viewContainer);
        let result;
        if (cache) {
            if (modelOffset > cache.maxModelOffset) {
                result = cache.cacheList[cache.cacheList.length - 1];
            }
            else {
                const cacheItem = cache.cacheMap.get(modelOffset);
                if (cacheItem) {
                    result = cacheItem;
                }
                else {
                    result = this._findInCacheList(cache.cacheList, modelOffset);
                }
            }
        }
        else {
            result = this.startTracking(viewContainer);
        }
        const viewPosition = this._hoistViewPosition(result.viewPosition);
        return {
            modelOffset: result.modelOffset,
            viewPosition
        };
    }
    /**
     * Moves a view position to a preferred location.
     *
     * The view position is moved up from a non-tracked view element as long as it remains at the end of its current parent.
     *
     * See example below to understand when it is important:
     *
     * Starting state:
     *
     * ```
     * <p>This is <strong>some <em>heavily <u>formatted</u>^ piece of</em></strong> text.</p>
     * ```
     *
     * Then we remove " piece of " and invalidate some cache:
     *
     * ```
     * <p>This is <strong>some <em>heavily <u>formatted</u>^</em></strong> text.</p>
     * ```
     *
     * Now, if we ask for model offset after letter "d" in "formatted", we should get a position in " text", but we will get in `<em>`.
     * For this scenario, we need to hoist the position.
     *
     * ```
     * <p>This is <strong>some <em>heavily <u>formatted</u></em></strong>^ text.</p>
     * ```
     */
    _hoistViewPosition(viewPosition) {
        while (viewPosition.parent.parent && !this._cachedMapping.has(viewPosition.parent) && viewPosition.isAtEnd) {
            const parent = viewPosition.parent.parent;
            const offset = parent.getChildIndex(viewPosition.parent) + 1;
            viewPosition = new ViewPosition(parent, offset);
        }
        return viewPosition;
    }
    /**
     * Starts tracking given `viewContainer`, which must be mapped to a model element or model document fragment.
     *
     * Note, that this method is automatically called by
     * {@link module:engine/conversion/mapper~MapperCache#getClosest `MapperCache#getClosest()`} and there is no need to call it manually.
     *
     * This method initializes the cache for `viewContainer` and adds callbacks for
     * {@link module:engine/view/node~ViewNodeChangeEvent `change` event} fired by `viewContainer`. `MapperCache` listens to `change` event
     * on the tracked elements to invalidate the stored cache.
     */
    startTracking(viewContainer) {
        const viewPosition = new ViewPosition(viewContainer, 0);
        const initialCacheItem = { viewPosition, modelOffset: 0 };
        const initialCache = {
            maxModelOffset: 0,
            cacheList: [initialCacheItem],
            cacheMap: new Map([[0, initialCacheItem]])
        };
        this._cachedMapping.set(viewContainer, initialCache);
        // Listen to changes in tracked view containers in order to invalidate the cache.
        //
        // Possible performance improvement. This event bubbles, so if there are multiple tracked (mapped) elements that are ancestors
        // then this will be unnecessarily fired for each ancestor. This could be rewritten to listen only to roots and document fragments.
        viewContainer.on('change:children', this._invalidateOnChildrenChangeCallback);
        viewContainer.on('change:text', this._invalidateOnTextChangeCallback);
        return initialCacheItem;
    }
    /**
     * Stops tracking given `viewContainer`.
     *
     * It removes the cached data and stops listening to {@link module:engine/view/node~ViewNodeChangeEvent `change` event} on the
     * `viewContainer`.
     */
    stopTracking(viewContainer) {
        viewContainer.off('change:children', this._invalidateOnChildrenChangeCallback);
        viewContainer.off('change:text', this._invalidateOnTextChangeCallback);
        this._cachedMapping.delete(viewContainer);
    }
    /**
     * Invalidates cache inside `viewParent`, starting from given `index` in that parent.
     */
    _clearCacheInsideParent(viewParent, index) {
        if (index == 0) {
            // Change at the beginning of the parent.
            if (this._cachedMapping.has(viewParent)) {
                // If this is a tracked element, clear all cache.
                this._clearCacheAll(viewParent);
            }
            else {
                // If this is not a tracked element, remove cache starting from before this element.
                this._clearCacheStartingBefore(viewParent);
            }
        }
        else {
            // Change in the middle of the parent. Get a view node that's before the change.
            const lastValidNode = viewParent.getChild(index - 1);
            // Then, clear all cache starting from before this view node.
            //
            // Possible performance improvement. We could have had `_clearCacheAfter( lastValidNode )` instead.
            // If the `lastValidNode` is the last unchanged node, then we could clear everything AFTER it, not before.
            // However, with the current setup, it didn't work properly and the actual gain wasn't that big on the tested data.
            // The problem was with following example: <p>Foo<em><strong>Xyz</strong></em>Bar</p>.
            // In this example we cache position after <em>, i.e. view position `<p>` 2 is saved with model offset 6.
            // Now, if we add some text in `<em>`, we won't validate this cached item even though it gets outdated.
            // So, if there's a need to have `_clearCacheAfter()`, we need to solve the above case first.
            //
            this._clearCacheStartingBefore(lastValidNode);
        }
    }
    /**
     * Clears all the cache for given tracked `viewContainer`.
     */
    _clearCacheAll(viewContainer) {
        const cache = this._cachedMapping.get(viewContainer);
        if (cache.maxModelOffset > 0) {
            cache.maxModelOffset = 0;
            cache.cacheList.length = 1;
            cache.cacheMap.clear();
            cache.cacheMap.set(0, cache.cacheList[0]);
        }
    }
    /**
     * Clears all the stored cache starting before given `viewNode`. The `viewNode` can be any node that is inside a tracked view element
     * or view document fragment.
     */
    _clearCacheStartingBefore(viewNode) {
        // To quickly invalidate the cache, we base on the cache list index stored with the node. See docs for `this._nodeToCacheListIndex`.
        const cacheListIndex = this._nodeToCacheListIndex.get(viewNode);
        // If there is no index stored, it means that this `viewNode` has not been cached yet.
        if (cacheListIndex === undefined) {
            // If the node is not cached, maybe it's parent is. We will try to invalidate the cache starting from before the parent.
            // Note, that there always must be a parent if we got here.
            const viewParent = viewNode.parent;
            // If the parent is a non-tracked element, try clearing the cache starting before it.
            //
            // This situation may happen e.g. if structure like `<p><strong><em>Foo</em></strong>...` was stepped over in
            // `Mapper#_findPositionIn()` and the children are not cached yet, but the `<strong>` element is. If something changes
            // inside this structure, make sure to invalidate all the cache after `<strong>`.
            //
            // If the parent is a tracked element, then it means there's no cache to clear (nothing after the element is cached).
            // In this case, there's nothing to do.
            //
            if (!this._cachedMapping.has(viewParent)) {
                this._clearCacheStartingBefore(viewParent);
            }
            return;
        }
        // Note: there was a consideration to save the `viewContainer` value together with `cacheListIndex` value.
        // However, it is like it is on purpose. We want to find *current* mapped ancestor for the `viewNode`.
        // This is an essential step to verify if the cache is still up-to-date.
        // Actually, we could save `viewContainer` and compare it to current tracked ancestor to quickly invalidate.
        // But this kinda happens with our flow and other assumptions around caching list index anyway.
        let viewContainer = viewNode.parent;
        while (!this._cachedMapping.has(viewContainer)) {
            viewContainer = viewContainer.parent;
        }
        this._clearCacheFromIndex(viewContainer, cacheListIndex);
    }
    /**
     * Clears all the cache in the cache list related to given `viewContainer`, starting from `index` (inclusive).
     */
    _clearCacheFromIndex(viewContainer, index) {
        if (index === 0) {
            // Don't remove the first entry in the cache (this entry is always a mapping between view offset 0 <-> model offset 0,
            // and it is a default value that is always expected to be in the cache list).
            //
            // The cache mechanism may ask to clear from index `0` in a case where a 0-model-length view element (UI element or empty
            // attribute element) was at the beginning of tracked element. In such scenario, the view element is mapped through
            // `nodeToCacheListIndex` to index `0`.
            index = 1;
        }
        // Cache is always available here because we initialize it just before adding a listener that fires `_clearCacheFromIndex()`.
        const cache = this._cachedMapping.get(viewContainer);
        const cacheItem = cache.cacheList[index - 1];
        if (!cacheItem) {
            return;
        }
        cache.maxModelOffset = cacheItem.modelOffset;
        // Remove from cache all `CacheItem`s that are "after" the index to clear from.
        const clearedItems = cache.cacheList.splice(index);
        // For each removed item, make sure to also remove it from `cacheMap` and clear related entry in `_nodeToCacheListIndex`.
        for (const item of clearedItems) {
            cache.cacheMap.delete(item.modelOffset);
            const viewNode = item.viewPosition.nodeBefore;
            this._nodeToCacheListIndex.delete(viewNode);
        }
    }
    /**
     * Finds a cache item in the given cache list, which `modelOffset` is closest (but smaller or equal) to given `offset`.
     *
     * Since `cacheList` is a sorted array, this uses binary search to retrieve the item quickly.
     */
    _findInCacheList(cacheList, offset) {
        let start = 0;
        let end = cacheList.length - 1;
        let index = (end - start) >> 1;
        let item = cacheList[index];
        while (start < end) {
            if (item.modelOffset < offset) {
                start = index + 1;
            }
            else {
                end = index - 1;
            }
            index = start + ((end - start) >> 1);
            item = cacheList[index];
        }
        return item.modelOffset <= offset ? item : cacheList[index - 1];
    }
}
