/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { EditingController, Marker } from 'ckeditor5/src/engine.js';
/**
 * Returns a first DOM element mapped with the marker.
 *
 * @param editing Editing controller instance.
 * @param marker Marker instance.
 */
export default function getMarkerDomElement(editing: EditingController, marker: Marker): HTMLElement | null;
/**
 * Returns all DOM elements mapped with all given markers. DOM elements are sorted by their client rects in top-most, left-most order.
 * Returns `null` if `markers` is empty or there are no DOM elements bound with the markers.
 *
 * Note, that markers should not intersect.
 *
 * @param editing Editing controller instance.
 * @param markers Markers instances.
 */
export declare function getAllMarkersDomElementsSorted(editing: EditingController, markers: Array<Marker>): Array<HTMLElement> | null;
