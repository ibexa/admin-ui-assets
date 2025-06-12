/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module restricted-editing/restrictededitingmode/utils
 */
/**
 * Returns a single "restricted-editing-exception" marker at a given position. Contrary to
 * {@link module:engine/model/markercollection~MarkerCollection#getMarkersAtPosition}, it returnd a marker also when the postion is
 * equal to one of the marker's start or end positions.
 */
export function getMarkerAtPosition(editor, position) {
    for (const marker of editor.model.markers) {
        const markerRange = marker.getRange();
        if (isPositionInRangeBoundaries(markerRange, position)) {
            if (marker.name.startsWith('restrictedEditingException:')) {
                return marker;
            }
        }
    }
}
/**
 * Checks if the position is fully contained in the range. Positions equal to range start or end are considered "in".
 */
export function isPositionInRangeBoundaries(range, position) {
    return (range.containsPosition(position) ||
        range.end.isEqual(position) ||
        range.start.isEqual(position));
}
/**
 * Checks if the selection is fully contained in the marker. Positions on marker boundaries are considered "in".
 *
 * ```xml
 * <marker>[]foo</marker> -> true
 * <marker>f[oo]</marker> -> true
 * <marker>f[oo</marker> ba]r -> false
 * <marker>foo</marker> []bar -> false
 * ```
 */
export function isSelectionInMarker(selection, marker) {
    if (!marker) {
        return false;
    }
    const markerRange = marker.getRange();
    if (selection.isCollapsed) {
        return isPositionInRangeBoundaries(markerRange, selection.focus);
    }
    return markerRange.containsRange(selection.getFirstRange(), true);
}
