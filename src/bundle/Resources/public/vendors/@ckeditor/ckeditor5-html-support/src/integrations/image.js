/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module html-support/integrations/image
 */
import { Plugin } from 'ckeditor5/src/core.js';
import DataFilter from '../datafilter.js';
import { setViewAttributes, updateViewAttributes } from '../utils.js';
import { getDescendantElement } from './integrationutils.js';
/**
 * Provides the General HTML Support integration with the {@link module:image/image~Image Image} feature.
 */
export default class ImageElementSupport extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [DataFilter];
    }
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'ImageElementSupport';
    }
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin() {
        return true;
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        // At least one image plugin should be loaded for the integration to work properly.
        if (!editor.plugins.has('ImageInlineEditing') && !editor.plugins.has('ImageBlockEditing')) {
            return;
        }
        const schema = editor.model.schema;
        const conversion = editor.conversion;
        const dataFilter = editor.plugins.get(DataFilter);
        dataFilter.on('register:figure', () => {
            conversion.for('upcast').add(viewToModelFigureAttributeConverter(dataFilter));
        });
        dataFilter.on('register:img', (evt, definition) => {
            if (definition.model !== 'imageBlock' && definition.model !== 'imageInline') {
                return;
            }
            if (schema.isRegistered('imageBlock')) {
                schema.extend('imageBlock', {
                    allowAttributes: [
                        'htmlImgAttributes',
                        // Figure and Link don't have model counterpart.
                        // We will preserve attributes on image model element using these attribute keys.
                        'htmlFigureAttributes',
                        'htmlLinkAttributes'
                    ]
                });
            }
            if (schema.isRegistered('imageInline')) {
                schema.extend('imageInline', {
                    allowAttributes: [
                        // `htmlA` is needed for standard GHS link integration.
                        'htmlA',
                        'htmlImgAttributes'
                    ]
                });
            }
            conversion.for('upcast').add(viewToModelImageAttributeConverter(dataFilter));
            conversion.for('downcast').add(modelToViewImageAttributeConverter());
            if (editor.plugins.has('LinkImage')) {
                conversion.for('upcast').add(viewToModelLinkImageAttributeConverter(dataFilter, editor));
            }
            evt.stop();
        });
    }
}
/**
 * View-to-model conversion helper preserving allowed attributes on the {@link module:image/image~Image Image}
 * feature model element.
 *
 * @returns Returns a conversion callback.
 */
function viewToModelImageAttributeConverter(dataFilter) {
    return (dispatcher) => {
        dispatcher.on('element:img', (evt, data, conversionApi) => {
            if (!data.modelRange) {
                return;
            }
            const viewImageElement = data.viewItem;
            const viewAttributes = dataFilter.processViewAttributes(viewImageElement, conversionApi);
            if (viewAttributes) {
                conversionApi.writer.setAttribute('htmlImgAttributes', viewAttributes, data.modelRange);
            }
        }, { priority: 'low' });
    };
}
/**
 * View-to-model conversion helper preserving allowed attributes on {@link module:image/image~Image Image}
 * feature model element from link view element.
 *
 * @returns Returns a conversion callback.
 */
function viewToModelLinkImageAttributeConverter(dataFilter, editor) {
    const imageUtils = editor.plugins.get('ImageUtils');
    return (dispatcher) => {
        dispatcher.on('element:a', (evt, data, conversionApi) => {
            const viewLink = data.viewItem;
            const viewImage = imageUtils.findViewImgElement(viewLink);
            if (!viewImage) {
                return;
            }
            const modelImage = data.modelCursor.parent;
            if (!modelImage.is('element', 'imageBlock')) {
                return;
            }
            const viewAttributes = dataFilter.processViewAttributes(viewLink, conversionApi);
            if (viewAttributes) {
                conversionApi.writer.setAttribute('htmlLinkAttributes', viewAttributes, modelImage);
            }
        }, { priority: 'low' });
    };
}
/**
 * View-to-model conversion helper preserving allowed attributes on {@link module:image/image~Image Image}
 * feature model element from figure view element.
 *
 * @returns Returns a conversion callback.
 */
function viewToModelFigureAttributeConverter(dataFilter) {
    return (dispatcher) => {
        dispatcher.on('element:figure', (evt, data, conversionApi) => {
            const viewFigureElement = data.viewItem;
            if (!data.modelRange || !viewFigureElement.hasClass('image')) {
                return;
            }
            const viewAttributes = dataFilter.processViewAttributes(viewFigureElement, conversionApi);
            if (viewAttributes) {
                conversionApi.writer.setAttribute('htmlFigureAttributes', viewAttributes, data.modelRange);
            }
        }, { priority: 'low' });
    };
}
/**
 * A model-to-view conversion helper applying attributes from the {@link module:image/image~Image Image}
 * feature.
 * @returns Returns a conversion callback.
 */
function modelToViewImageAttributeConverter() {
    return (dispatcher) => {
        addInlineAttributeConversion('htmlImgAttributes');
        addBlockAttributeConversion('img', 'htmlImgAttributes');
        addBlockAttributeConversion('figure', 'htmlFigureAttributes');
        addBlockAttributeConversion('a', 'htmlLinkAttributes');
        function addInlineAttributeConversion(attributeName) {
            dispatcher.on(`attribute:${attributeName}:imageInline`, (evt, data, conversionApi) => {
                if (!conversionApi.consumable.consume(data.item, evt.name)) {
                    return;
                }
                const { attributeOldValue, attributeNewValue } = data;
                const viewElement = conversionApi.mapper.toViewElement(data.item);
                updateViewAttributes(conversionApi.writer, attributeOldValue, attributeNewValue, viewElement);
            }, { priority: 'low' });
        }
        function addBlockAttributeConversion(elementName, attributeName) {
            dispatcher.on(`attribute:${attributeName}:imageBlock`, (evt, data, conversionApi) => {
                if (!conversionApi.consumable.test(data.item, evt.name)) {
                    return;
                }
                const { attributeOldValue, attributeNewValue } = data;
                const containerElement = conversionApi.mapper.toViewElement(data.item);
                const viewElement = getDescendantElement(conversionApi.writer, containerElement, elementName);
                if (viewElement) {
                    updateViewAttributes(conversionApi.writer, attributeOldValue, attributeNewValue, viewElement);
                    conversionApi.consumable.consume(data.item, evt.name);
                }
            }, { priority: 'low' });
            if (elementName === 'a') {
                // To have a link element in the view, we need to attach a converter to the `linkHref` attribute as well.
                dispatcher.on('attribute:linkHref:imageBlock', (evt, data, conversionApi) => {
                    if (!conversionApi.consumable.consume(data.item, 'attribute:htmlLinkAttributes:imageBlock')) {
                        return;
                    }
                    const containerElement = conversionApi.mapper.toViewElement(data.item);
                    const viewElement = getDescendantElement(conversionApi.writer, containerElement, 'a');
                    setViewAttributes(conversionApi.writer, data.item.getAttribute('htmlLinkAttributes'), viewElement);
                }, { priority: 'low' });
            }
        }
    };
}
