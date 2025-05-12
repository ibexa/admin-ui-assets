/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module collaboration-core/utils/surroundingmarkersdetector
 */
import type { Marker, Model } from 'ckeditor5/src/engine.js';
/**
 * A utility that responds to range changes in the document selection and detects which markers' ranges
 * touch or contain (surround) the document selection's focus.
 */
export default function surroundingMarkersDetector(model: Model, onMarkersChange: (changedMarkers: {
    left: Array<Marker>;
    entered: Array<Marker>;
}) => void): void;
