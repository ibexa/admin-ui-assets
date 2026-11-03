/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { Widget, WidgetResize, WidgetToolbarRepository, calculateResizeHostAncestorWidth, findOptimalInsertionRange, isWidget, toWidget } from "@ckeditor/ckeditor5-widget";
import { CKEditorError, Collection, FocusTracker, KeystrokeHandler, Rect, _tryCastDimensionsToUnit, _tryParseDimensionWithUnit, first, global, logWarning, toArray } from "@ckeditor/ckeditor5-utils";
import { BalloonPanelView, ButtonView, ContextualBalloon, CssTransitionDisablerMixin, Dialog, DropdownButtonView, FocusCycler, FormHeaderView, FormRowView, IconView, LabeledFieldView, MenuBarMenuListItemButtonView, SplitButtonView, Template, UIModel, View, ViewCollection, addListToDropdown, addToolbarToDropdown, clickOutsideHandler, createDropdown, createLabeledInputNumber, createLabeledInputText, submitHandler } from "@ckeditor/ckeditor5-ui";
import { IconMedia, IconMediaPlaceholder, IconObjectCenter, IconObjectInlineLeft, IconObjectInlineRight, IconObjectLeft, IconObjectRight, IconObjectSizeCustom, IconObjectSizeFull, IconObjectSizeLarge, IconObjectSizeMedium, IconObjectSizeSmall, IconPreviousArrow } from "@ckeditor/ckeditor5-icons";
import { ModelLivePosition, ModelLiveRange } from "@ckeditor/ckeditor5-engine";
import { Clipboard } from "@ckeditor/ckeditor5-clipboard";
import { Delete } from "@ckeditor/ckeditor5-typing";
import { Undo } from "@ckeditor/ckeditor5-undo";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Returns a function that converts the model "url" attribute to the view representation.
*
* Depending on the configuration, the view representation can be "semantic" (for the data pipeline):
*
* ```html
* <figure class="media">
* 	<oembed url="foo"></oembed>
* </figure>
* ```
*
* or "non-semantic" (for the editing view pipeline):
*
* ```html
* <figure class="media">
* 	<div data-oembed-url="foo">[ non-semantic media preview for "foo" ]</div>
* </figure>
* ```
*
* **Note:** Changing the model "url" attribute replaces the entire content of the
* `<figure>` in the view.
*
* @param registry The registry providing
* the media and their content.
* @param options options object with following properties:
* - elementName When set, overrides the default element name for semantic media embeds.
* - renderMediaPreview When `true`, the converter will create the view in the non-semantic form.
* - renderForEditingView When `true`, the converter will create a view specific for the
* editing pipeline (e.g. including CSS classes, content placeholders).
*
* @internal
*/
function modelToViewUrlAttributeConverter(registry, options) {
	const converter = (evt, data, conversionApi) => {
		if (!conversionApi.consumable.consume(data.item, evt.name)) return;
		const url = data.attributeNewValue;
		const viewWriter = conversionApi.writer;
		const figure = conversionApi.mapper.toViewElement(data.item);
		const mediaContentElement = [...figure.getChildren()].find((child) => child.getCustomProperty("media-content"));
		viewWriter.remove(mediaContentElement);
		const mediaViewElement = registry.getMediaViewElement(viewWriter, url, options);
		viewWriter.insert(viewWriter.createPositionAt(figure, 0), mediaViewElement);
	};
	return (dispatcher) => {
		dispatcher.on("attribute:url:media", converter);
	};
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Converts a given {@link module:engine/view/element~ViewElement} to a media embed widget:
* * Adds a {@link module:engine/view/element~ViewElement#_setCustomProperty custom property}
* allowing to recognize the media widget element.
* * Calls the {@link module:widget/utils~toWidget} function with the proper element's label creator.
*
* @param writer An instance of the view writer.
* @param label The element's label.
* @internal
*/
function toMediaWidget(viewElement, writer, label) {
	writer.setCustomProperty("media", true, viewElement);
	return toWidget(viewElement, writer, { label });
}
/**
* Returns a media widget editing view element if one is selected.
*
* @internal
*/
function getSelectedMediaViewWidget(selection) {
	const viewElement = selection.getSelectedElement();
	if (viewElement && isMediaWidget(viewElement)) return viewElement;
	return null;
}
/**
* Checks if a given view element is a media widget.
*
* @internal
*/
function isMediaWidget(viewElement) {
	return !!viewElement.getCustomProperty("media") && isWidget(viewElement);
}
/**
* Creates a view element representing the media. Either a "semantic" one for the data pipeline:
*
* ```html
* <figure class="media">
* 	<oembed url="foo"></oembed>
* </figure>
* ```
*
* or a "non-semantic" (for the editing view pipeline):
*
* ```html
* <figure class="media">
* 	<div data-oembed-url="foo">[ non-semantic media preview for "foo" ]</div>
* </figure>
* ```
*
* @internal
*/
function createMediaFigureElement(writer, registry, url, options) {
	return writer.createContainerElement("figure", { class: "media" }, [registry.getMediaViewElement(writer, url, options), writer.createSlot()]);
}
/**
* Returns a selected media element in the model, if any.
*
* @internal
*/
function getSelectedMediaModelWidget(selection) {
	const selectedElement = selection.getSelectedElement();
	if (selectedElement && selectedElement.is("element", "media")) return selectedElement;
	return null;
}
/**
* Creates a media element and inserts it into the model.
*
* **Note**: This method will use {@link module:engine/model/model~Model#insertContent `model.insertContent()`} logic of inserting content
* if no `insertPosition` is passed.
*
* @param url An URL of an embeddable media.
* @param findOptimalPosition If true it will try to find optimal position to insert media without breaking content
* in which a selection is.
* @internal
*/
function insertMedia(model, url, selectable, findOptimalPosition) {
	model.change((writer) => {
		const mediaElement = writer.createElement("media", { url });
		model.insertObject(mediaElement, selectable, null, {
			setSelection: "on",
			findOptimalPosition: findOptimalPosition ? "auto" : void 0
		});
	});
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* The insert media command.
*
* The command is registered by the {@link module:media-embed/mediaembedediting~MediaEmbedEditing} as `'mediaEmbed'`.
*
* To insert media at the current selection, execute the command and specify the URL:
*
* ```ts
* editor.execute( 'mediaEmbed', 'http://url.to.the/media' );
* ```
*/
var MediaEmbedCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedMedia = getSelectedMediaModelWidget(selection);
		this.value = selectedMedia ? selectedMedia.getAttribute("url") : void 0;
		this.isEnabled = isMediaSelected(selection) || isAllowedInParent(selection, model);
	}
	/**
	* Executes the command, which either:
	*
	* * updates the URL of the selected media,
	* * inserts the new media into the editor and puts the selection around it.
	*
	* @fires execute
	* @param url The URL of the media.
	*/
	execute(url) {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedMedia = getSelectedMediaModelWidget(selection);
		if (selectedMedia) model.change((writer) => {
			writer.setAttribute("url", url, selectedMedia);
		});
		else insertMedia(model, url, selection, true);
	}
};
/**
* Checks if the media embed is allowed in the parent.
*/
function isAllowedInParent(selection, model) {
	let parent = findOptimalInsertionRange(selection, model).start.parent;
	if (parent.isEmpty && !model.schema.isLimit(parent)) parent = parent.parent;
	return model.schema.checkChild(parent, "media");
}
/**
* Checks if the media object is selected.
*/
function isMediaSelected(selection) {
	const element = selection.getSelectedElement();
	return !!element && element.name === "media";
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaregistry
*/
const mediaPlaceholderIconViewBox = "0 0 64 42";
/**
* A bridge between the raw media content provider definitions and the editor view content.
*
* It helps translating media URLs to corresponding {@link module:engine/view/element~ViewElement view elements}.
*
* Mostly used by the {@link module:media-embed/mediaembedediting~MediaEmbedEditing} plugin.
*/
var MediaRegistry = class {
	/**
	* The {@link module:utils/locale~Locale} instance.
	*/
	locale;
	/**
	* The media provider definitions available for the registry. Usually corresponding with the
	* {@link module:media-embed/mediaembedconfig~MediaEmbedConfig media configuration}.
	*/
	providerDefinitions;
	/**
	* Creates an instance of the {@link module:media-embed/mediaregistry~MediaRegistry} class.
	*
	* @param locale The localization services instance.
	* @param config The configuration of the media embed feature.
	*/
	constructor(locale, config) {
		const providers = config.providers;
		const extraProviders = config.extraProviders || [];
		const removedProviders = new Set(config.removeProviders);
		const providerDefinitions = providers.concat(extraProviders).filter((provider) => {
			const name = provider.name;
			if (!name) {
				/**
				* One of the providers (or extra providers) specified in the media embed configuration
				* has no name and will not be used by the editor. In order to get this media
				* provider working, double check your editor configuration.
				*
				* @error media-embed-no-provider-name
				*/
				logWarning("media-embed-no-provider-name", { provider });
				return false;
			}
			return !removedProviders.has(name);
		});
		this.locale = locale;
		this.providerDefinitions = providerDefinitions;
	}
	/**
	* Checks whether the passed URL is representing a certain media type allowed in the editor.
	*
	* @param url The URL to be checked
	*/
	hasMedia(url) {
		return !!this._getMedia(url);
	}
	/**
	* For the given media URL string and options, it returns the {@link module:engine/view/element~ViewElement view element}
	* representing that media.
	*
	* **Note:** If no URL is specified, an empty view element is returned.
	*
	* @param writer The view writer used to produce a view element.
	* @param url The URL to be translated into a view element.
	*/
	getMediaViewElement(writer, url, options) {
		return this._getMedia(url).getViewElement(writer, options);
	}
	/**
	* Returns a `Media` instance for the given URL.
	*
	* @param url The URL of the media.
	* @returns The `Media` instance or `null` when there is none.
	*/
	_getMedia(url) {
		if (!url) return new Media(this.locale);
		url = url.trim();
		for (const definition of this.providerDefinitions) {
			const previewRenderer = definition.html;
			const pattern = toArray(definition.url);
			for (const subPattern of pattern) {
				const match = this._getUrlMatches(url, subPattern);
				if (match) return new Media(this.locale, url, match, previewRenderer);
			}
		}
		return null;
	}
	/**
	* Tries to match `url` to `pattern`.
	*
	* @param url The URL of the media.
	* @param pattern The pattern that should accept the media URL.
	*/
	_getUrlMatches(url, pattern) {
		let match = url.match(pattern);
		if (match) return match;
		let rawUrl = url.replace(/^https?:\/\//, "");
		match = rawUrl.match(pattern);
		if (match) return match;
		rawUrl = rawUrl.replace(/^www\./, "");
		match = rawUrl.match(pattern);
		if (match) return match;
		return null;
	}
};
/**
* Represents media defined by the provider configuration.
*
* It can be rendered to the {@link module:engine/view/element~ViewElement view element} and used in the editing or data pipeline.
*/
var Media = class {
	/**
	* The URL this Media instance represents.
	*/
	url;
	/**
	* Shorthand for {@link module:utils/locale~Locale#t}.
	*
	* @see module:utils/locale~Locale#t
	*/
	_locale;
	/**
	* The output of the `RegExp.match` which validated the {@link #url} of this media.
	*/
	_match;
	/**
	* The function returning the HTML string preview of this media.
	*/
	_previewRenderer;
	constructor(locale, url, match, previewRenderer) {
		this.url = this._getValidUrl(url);
		this._locale = locale;
		this._match = match;
		this._previewRenderer = previewRenderer;
	}
	/**
	* Returns the view element representation of the media.
	*
	* @param writer The view writer used to produce a view element.
	*/
	getViewElement(writer, options) {
		const attributes = {};
		let viewElement;
		if (options.renderForEditingView || options.renderMediaPreview && this.url && this._previewRenderer) {
			if (this.url) attributes["data-oembed-url"] = this.url;
			if (options.renderForEditingView) attributes.class = "ck-media__wrapper";
			const mediaHtml = this._getPreviewHtml(options);
			viewElement = writer.createRawElement("div", attributes, (domElement, domConverter) => {
				domConverter.setContentOf(domElement, mediaHtml);
			});
		} else {
			if (this.url) attributes.url = this.url;
			viewElement = writer.createEmptyElement(options.elementName, attributes);
		}
		writer.setCustomProperty("media-content", true, viewElement);
		return viewElement;
	}
	/**
	* Returns the HTML string of the media content preview.
	*/
	_getPreviewHtml(options) {
		if (this._previewRenderer) return this._previewRenderer(this._match);
		else {
			if (this.url && options.renderForEditingView) return this._getPlaceholderHtml();
			return "";
		}
	}
	/**
	* Returns the placeholder HTML when the media has no content preview.
	*/
	_getPlaceholderHtml() {
		const icon = new IconView();
		const t = this._locale.t;
		icon.content = IconMediaPlaceholder;
		icon.viewBox = mediaPlaceholderIconViewBox;
		return new Template({
			tag: "div",
			attributes: { class: "ck ck-reset_all ck-media__placeholder" },
			children: [{
				tag: "div",
				attributes: { class: "ck-media__placeholder__icon" },
				children: [icon]
			}, {
				tag: "a",
				attributes: {
					class: "ck-media__placeholder__url",
					target: "_blank",
					rel: "noopener noreferrer",
					href: this.url,
					"data-cke-tooltip-text": t("Open media in new tab")
				},
				children: [{
					tag: "span",
					attributes: { class: "ck-media__placeholder__url__text" },
					children: [this.url]
				}]
			}]
		}).render().outerHTML;
	}
	/**
	* Returns the full URL to the specified media.
	*
	* @param url The URL of the media.
	*/
	_getValidUrl(url) {
		if (!url) return null;
		if (url.match(/^https?/)) return url;
		return "https://" + url;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedediting
*/
/**
* The media embed editing feature.
*/
var MediaEmbedEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "MediaEmbedEditing";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* The media registry managing the media providers in the editor.
	*/
	registry;
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		editor.config.define("mediaEmbed", {
			elementName: "oembed",
			providers: [
				{
					name: "dailymotion",
					url: [/^dailymotion\.com\/video\/(\w+)/, /^dai.ly\/(\w+)/],
					html: (match) => {
						return `<div><iframe src="https://www.dailymotion.com/embed/video/${match[1]}" width="1280" height="720" style="width: 100%; height: auto; aspect-ratio: 16 / 9; border: 0; display: block;" frameborder="0" allowfullscreen allow="autoplay"></iframe></div>`;
					}
				},
				{
					name: "spotify",
					url: [
						/^open\.spotify\.com\/(artist\/\w+)/,
						/^open\.spotify\.com\/(album\/\w+)/,
						/^open\.spotify\.com\/(track\/\w+)/
					],
					html: (match) => {
						const id = match[1];
						const isTrack = id.startsWith("track/");
						return `<div><iframe src="https://open.spotify.com/embed/${id}" width="300" height="${isTrack ? "80" : "378"}" style="${isTrack ? "width: 100%; height: 80px; border: 0; display: block;" : "width: 100%; height: auto; aspect-ratio: 100 / 126; border: 0; display: block;"}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
					}
				},
				{
					name: "youtube",
					url: [
						/^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)(?:&t=(\d+))?/,
						/^(?:m\.)?youtube\.com\/shorts\/([\w-]+)(?:\?t=(\d+))?/,
						/^(?:m\.)?youtube\.com\/v\/([\w-]+)(?:\?t=(\d+))?/,
						/^youtube\.com\/embed\/([\w-]+)(?:\?start=(\d+))?/,
						/^youtu\.be\/([\w-]+)(?:\?t=(\d+))?/
					],
					html: (match) => {
						const id = match[1];
						const time = match[2];
						return `<div><iframe src="https://www.youtube.com/embed/${id}${time ? `?start=${time}` : ""}" width="1280" height="720" style="width: 100%; height: auto; aspect-ratio: 16 / 9; border: 0; display: block;" frameborder="0" allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
					}
				},
				{
					name: "vimeo",
					url: [
						/^vimeo\.com\/(\d+)/,
						/^vimeo\.com\/[^/]+\/[^/]+\/video\/(\d+)/,
						/^vimeo\.com\/album\/[^/]+\/video\/(\d+)/,
						/^vimeo\.com\/channels\/[^/]+\/(\d+)/,
						/^vimeo\.com\/groups\/[^/]+\/videos\/(\d+)/,
						/^vimeo\.com\/ondemand\/[^/]+\/(\d+)/,
						/^player\.vimeo\.com\/video\/(\d+)/
					],
					html: (match) => {
						return `<div><iframe src="https://player.vimeo.com/video/${match[1]}" width="1280" height="720" style="width: 100%; height: auto; aspect-ratio: 16 / 9; border: 0; display: block;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>`;
					}
				},
				{
					name: "instagram",
					url: [/^instagram\.com\/p\/(\w+)/, /^instagram\.com\/reel\/(\w+)/]
				},
				{
					name: "twitter",
					url: [/^twitter\.com/, /^x\.com/]
				},
				{
					name: "googleMaps",
					url: [
						/^google\.com\/maps/,
						/^goo\.gl\/maps/,
						/^maps\.google\.com/,
						/^maps\.app\.goo\.gl/
					]
				},
				{
					name: "flickr",
					url: /^flickr\.com/
				},
				{
					name: "facebook",
					url: /^facebook\.com/
				}
			]
		});
		this.registry = new MediaRegistry(editor.locale, editor.config.get("mediaEmbed"));
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const t = editor.t;
		const conversion = editor.conversion;
		const renderMediaPreview = editor.config.get("mediaEmbed.previewsInData");
		const elementName = editor.config.get("mediaEmbed.elementName");
		const registry = this.registry;
		editor.commands.add("mediaEmbed", new MediaEmbedCommand(editor));
		schema.register("media", {
			inheritAllFrom: "$blockObject",
			allowAttributes: ["url"]
		});
		conversion.for("dataDowncast").elementToStructure({
			model: "media",
			view: (modelElement, { writer }) => {
				const url = modelElement.getAttribute("url");
				return createMediaFigureElement(writer, registry, url, {
					elementName,
					renderMediaPreview: !!url && renderMediaPreview
				});
			}
		});
		conversion.for("dataDowncast").add(modelToViewUrlAttributeConverter(registry, {
			elementName,
			renderMediaPreview
		}));
		conversion.for("editingDowncast").elementToStructure({
			model: "media",
			view: (modelElement, { writer }) => {
				const url = modelElement.getAttribute("url");
				const figure = createMediaFigureElement(writer, registry, url, {
					elementName,
					renderForEditingView: true
				});
				return toMediaWidget(figure, writer, t("media widget"));
			}
		});
		conversion.for("editingDowncast").add(modelToViewUrlAttributeConverter(registry, {
			elementName,
			renderForEditingView: true
		}));
		conversion.for("upcast").elementToElement({
			view: (element) => ["oembed", elementName].includes(element.name) && element.getAttribute("url") ? { name: true } : null,
			model: (viewMedia, { writer }) => {
				const url = viewMedia.getAttribute("url");
				if (registry.hasMedia(url)) return writer.createElement("media", { url });
				return null;
			}
		}).elementToElement({
			view: {
				name: "div",
				attributes: { "data-oembed-url": true }
			},
			model: (viewMedia, { writer }) => {
				const url = viewMedia.getAttribute("data-oembed-url");
				if (registry.hasMedia(url)) return writer.createElement("media", { url });
				return null;
			}
		}).add((dispatcher) => {
			const converter = (evt, data, conversionApi) => {
				if (!conversionApi.consumable.consume(data.viewItem, {
					name: true,
					classes: "media"
				})) return;
				const { modelRange, modelCursor } = conversionApi.convertChildren(data.viewItem, data.modelCursor);
				data.modelRange = modelRange;
				data.modelCursor = modelCursor;
				if (!first(modelRange.getItems())) conversionApi.consumable.revert(data.viewItem, {
					name: true,
					classes: "media"
				});
			};
			dispatcher.on("element:figure", converter);
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/automediaembed
*/
const URL_REGEXP = /^(?:http(s)?:\/\/)?[\w-]+\.[\w-.~:/?#[\]@!$&'()*+,;=%]+$/;
/**
* The auto-media embed plugin. It recognizes media links in the pasted content and embeds
* them shortly after they are injected into the document.
*/
var AutoMediaEmbed = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [
			Clipboard,
			Delete,
			Undo
		];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "AutoMediaEmbed";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	/**
	* The paste–to–embed `setTimeout` ID. Stored as a property to allow
	* cleaning of the timeout.
	*/
	_timeoutId;
	/**
	* The position where the `<media>` element will be inserted after the timeout,
	* determined each time the new content is pasted into the document.
	*/
	_positionToInsert;
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		this._timeoutId = null;
		this._positionToInsert = null;
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const modelDocument = editor.model.document;
		const clipboardPipeline = editor.plugins.get("ClipboardPipeline");
		this.listenTo(clipboardPipeline, "inputTransformation", () => {
			const firstRange = modelDocument.selection.getFirstRange();
			const leftLivePosition = ModelLivePosition.fromPosition(firstRange.start);
			leftLivePosition.stickiness = "toPrevious";
			const rightLivePosition = ModelLivePosition.fromPosition(firstRange.end);
			rightLivePosition.stickiness = "toNext";
			modelDocument.once("change:data", () => {
				this._embedMediaBetweenPositions(leftLivePosition, rightLivePosition);
				leftLivePosition.detach();
				rightLivePosition.detach();
			}, { priority: "high" });
		});
		editor.commands.get("undo").on("execute", () => {
			if (this._timeoutId) {
				global.window.clearTimeout(this._timeoutId);
				this._positionToInsert.detach();
				this._timeoutId = null;
				this._positionToInsert = null;
			}
		}, { priority: "high" });
	}
	/**
	* Analyzes the part of the document between provided positions in search for a URL representing media.
	* When the URL is found, it is automatically converted into media.
	*
	* @param leftPosition Left position of the selection.
	* @param rightPosition Right position of the selection.
	*/
	_embedMediaBetweenPositions(leftPosition, rightPosition) {
		const editor = this.editor;
		const mediaRegistry = editor.plugins.get(MediaEmbedEditing).registry;
		const urlRange = new ModelLiveRange(leftPosition, rightPosition);
		const walker = urlRange.getWalker({ ignoreElementEnd: true });
		let url = "";
		for (const node of walker) if (node.item.is("$textProxy")) url += node.item.data;
		url = url.trim();
		if (!url.match(URL_REGEXP)) {
			urlRange.detach();
			return;
		}
		if (!mediaRegistry.hasMedia(url)) {
			urlRange.detach();
			return;
		}
		if (!editor.commands.get("mediaEmbed").isEnabled) {
			urlRange.detach();
			return;
		}
		this._positionToInsert = ModelLivePosition.fromPosition(leftPosition);
		this._timeoutId = global.window.setTimeout(() => {
			editor.model.change((writer) => {
				this._timeoutId = null;
				writer.remove(urlRange);
				urlRange.detach();
				let insertionPosition = null;
				if (this._positionToInsert.root.rootName !== "$graveyard") insertionPosition = this._positionToInsert;
				insertMedia(editor.model, url, insertionPosition, false);
				this._positionToInsert.detach();
				this._positionToInsert = null;
			});
			editor.plugins.get(Delete).requestUndoOnBackspace();
		}, 100);
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/ui/mediaformview
*/
/**
* The media form view controller class.
*
* See {@link module:media-embed/ui/mediaformview~MediaFormView}.
*/
var MediaFormView = class extends View {
	/**
	* Tracks information about the DOM focus in the form.
	*/
	focusTracker;
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	keystrokes;
	/**
	* The URL input view.
	*/
	urlInputView;
	/**
	* An array of form validators used by {@link #isValid}.
	*/
	_validators;
	/**
	* The default info text for the {@link #urlInputView}.
	*/
	_urlInputViewInfoDefault;
	/**
	* The info text with an additional tip for the {@link #urlInputView},
	* displayed when the input has some value.
	*/
	_urlInputViewInfoTip;
	/**
	* @param validators Form validators used by {@link #isValid}.
	* @param locale The localization services instance.
	*/
	constructor(validators, locale) {
		super(locale);
		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();
		this.set("mediaURLInputValue", "");
		this.urlInputView = this._createUrlInput();
		this._validators = validators;
		this.setTemplate({
			tag: "form",
			attributes: {
				class: [
					"ck",
					"ck-media-form",
					"ck-responsive-form"
				],
				tabindex: "-1"
			},
			children: [this.urlInputView]
		});
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		submitHandler({ view: this });
		this.focusTracker.add(this.urlInputView.element);
		this.keystrokes.listenTo(this.element);
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		this.focusTracker.destroy();
		this.keystrokes.destroy();
	}
	/**
	* Focuses the {@link #urlInputView}.
	*/
	focus() {
		this.urlInputView.focus();
	}
	/**
	* The native DOM `value` of the {@link #urlInputView} element.
	*
	* **Note**: Do not confuse it with the {@link module:ui/inputtext/inputtextview~InputTextView#value}
	* which works one way only and may not represent the actual state of the component in the DOM.
	*/
	get url() {
		return this.urlInputView.fieldView.element.value.trim();
	}
	set url(url) {
		this.urlInputView.fieldView.value = url.trim();
	}
	/**
	* Validates the form and returns `false` when some fields are invalid.
	*/
	isValid() {
		this.resetFormStatus();
		for (const validator of this._validators) {
			const errorText = validator(this);
			if (errorText) {
				this.urlInputView.errorText = errorText;
				return false;
			}
		}
		return true;
	}
	/**
	* Cleans up the supplementary error and information text of the {@link #urlInputView}
	* bringing them back to the state when the form has been displayed for the first time.
	*
	* See {@link #isValid}.
	*/
	resetFormStatus() {
		this.urlInputView.errorText = null;
		this.urlInputView.infoText = this._urlInputViewInfoDefault;
	}
	/**
	* Creates a labeled input view.
	*
	* @returns Labeled input view instance.
	*/
	_createUrlInput() {
		const t = this.locale.t;
		const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);
		const inputField = labeledInput.fieldView;
		this._urlInputViewInfoDefault = t("Paste the media URL in the input.");
		this._urlInputViewInfoTip = t("Tip: Paste the URL into the content to embed faster.");
		labeledInput.label = t("Media URL");
		labeledInput.infoText = this._urlInputViewInfoDefault;
		inputField.inputMode = "url";
		inputField.on("input", () => {
			labeledInput.infoText = inputField.element.value ? this._urlInputViewInfoTip : this._urlInputViewInfoDefault;
			this.mediaURLInputValue = inputField.element.value.trim();
		});
		return labeledInput;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedui
*/
/**
* The media embed UI plugin.
*/
var MediaEmbedUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [MediaEmbedEditing, Dialog];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "MediaEmbedUI";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	_formView;
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		editor.ui.componentFactory.add("mediaEmbed", () => {
			const t = this.editor.locale.t;
			const button = this._createDialogButton(ButtonView);
			button.tooltip = true;
			button.label = t("Insert media");
			return button;
		});
		editor.ui.componentFactory.add("menuBar:mediaEmbed", () => {
			const t = this.editor.locale.t;
			const button = this._createDialogButton(MenuBarMenuListItemButtonView);
			button.label = t("Media");
			return button;
		});
	}
	/**
	* Creates a button for menu bar that will show media embed dialog.
	*/
	_createDialogButton(ButtonClass) {
		const editor = this.editor;
		const buttonView = new ButtonClass(editor.locale);
		const command = editor.commands.get("mediaEmbed");
		const dialogPlugin = this.editor.plugins.get("Dialog");
		buttonView.icon = IconMedia;
		buttonView.bind("isEnabled").to(command, "isEnabled");
		buttonView.on("execute", () => {
			if (dialogPlugin.id === "mediaEmbed") dialogPlugin.hide();
			else this._showDialog();
		});
		return buttonView;
	}
	_showDialog() {
		const editor = this.editor;
		const dialog = editor.plugins.get("Dialog");
		const command = editor.commands.get("mediaEmbed");
		const t = editor.locale.t;
		const isMediaSelected = command.value !== void 0;
		if (!this._formView) {
			const registry = editor.plugins.get(MediaEmbedEditing).registry;
			this._formView = new (CssTransitionDisablerMixin(MediaFormView))(getFormValidators$1(editor.t, registry), editor.locale);
			this._formView.on("submit", () => this._handleSubmitForm());
		}
		dialog.show({
			id: "mediaEmbed",
			title: t("Media embed"),
			content: this._formView,
			isModal: true,
			onShow: () => {
				this._formView.url = command.value || "";
				this._formView.resetFormStatus();
				this._formView.urlInputView.fieldView.select();
			},
			actionButtons: [{
				label: t("Cancel"),
				withText: true,
				onExecute: () => dialog.hide()
			}, {
				label: isMediaSelected ? t("Save") : t("Insert"),
				class: "ck-button-action",
				withText: true,
				onExecute: () => this._handleSubmitForm()
			}]
		});
	}
	_handleSubmitForm() {
		const editor = this.editor;
		const dialog = editor.plugins.get("Dialog");
		if (this._formView.isValid()) {
			editor.execute("mediaEmbed", this._formView.url);
			dialog.hide();
			editor.editing.view.focus();
		}
	}
};
function getFormValidators$1(t, registry) {
	return [(form) => {
		if (!form.url.length) return t("The URL must not be empty.");
	}, (form) => {
		if (!registry.hasMedia(form.url)) return t("This media URL is not supported.");
	}];
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembed
*/
/**
* The media embed plugin.
*
* For a detailed overview, check the {@glink features/media-embed/media-embed Media Embed feature documentation}.
*
* This is a "glue" plugin which loads the following plugins:
*
* * The {@link module:media-embed/mediaembedediting~MediaEmbedEditing media embed editing feature},
* * The {@link module:media-embed/mediaembedui~MediaEmbedUI media embed UI feature} and
* * The {@link module:media-embed/automediaembed~AutoMediaEmbed auto-media embed feature}.
*/
var MediaEmbed = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [
			MediaEmbedEditing,
			MediaEmbedUI,
			AutoMediaEmbed,
			Widget
		];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "MediaEmbed";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedstyle/constants
*/
/**
* Built-in style options provided by the plugin. Integrators can refer to these by
* name in {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#styles `config.mediaEmbed.styles`}
* to opt out, override individual fields, or coexist with custom styles.
*
* @internal
*/
const DEFAULT_OPTIONS = {
	alignLeft: {
		name: "alignLeft",
		title: "Left aligned media",
		icon: IconObjectInlineLeft,
		className: "media-style-align-left"
	},
	alignBlockLeft: {
		name: "alignBlockLeft",
		title: "Left aligned media",
		icon: IconObjectLeft,
		className: "media-style-block-align-left"
	},
	alignCenter: {
		name: "alignCenter",
		title: "Centered media",
		icon: IconObjectCenter,
		isDefault: true
	},
	alignBlockRight: {
		name: "alignBlockRight",
		title: "Right aligned media",
		icon: IconObjectRight,
		className: "media-style-block-align-right"
	},
	alignRight: {
		name: "alignRight",
		title: "Right aligned media",
		icon: IconObjectInlineRight,
		className: "media-style-align-right"
	}
};
/**
* Short icon-name aliases that can be used as the `icon` value in a media style
* option definition. Matches the alias set exposed by the image styles feature so
* the two APIs feel symmetrical.
*
* @internal
*/
const DEFAULT_ICONS = {
	inlineLeft: IconObjectInlineLeft,
	left: IconObjectLeft,
	center: IconObjectCenter,
	right: IconObjectRight,
	inlineRight: IconObjectInlineRight
};
/**
* Built-in dropdown groupings. Each entry references built-in style component names. If any
* items are filtered out by configuration, the dropdown is rebuilt from the remaining names
* (or skipped entirely if fewer than two remain).
*
* @internal
*/
const DEFAULT_DROPDOWN_DEFINITIONS = [{
	name: "mediaEmbed:wrapText",
	title: "Wrap text",
	items: ["mediaEmbed:alignLeft", "mediaEmbed:alignRight"],
	defaultItem: "mediaEmbed:alignLeft"
}, {
	name: "mediaEmbed:breakText",
	title: "Break text",
	items: [
		"mediaEmbed:alignBlockLeft",
		"mediaEmbed:alignCenter",
		"mediaEmbed:alignBlockRight"
	],
	defaultItem: "mediaEmbed:alignCenter"
}];

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedstyle/utils
*/
/**
* Normalizes the {@link module:media-embed/mediaembedconfig~MediaStyleConfig#options style options}
* provided by the integrator. Each entry is resolved into a full
* {@link module:media-embed/mediaembedconfig~MediaStyleOptionDefinition} and invalid entries
* are filtered out with a console warning.
*
* @internal
*/
function normalizeStyles(configuredStyles) {
	return (configuredStyles.options || []).map((entry) => normalizeDefinition(entry)).filter((entry) => isValidOption(entry));
}
/**
* Resolves a single config entry into a style option definition. A string entry is first
* promoted to its object form (`{ name }`) and then shallow-merged on top of the matching
* built-in default — entries without a matching built-in pass through unchanged and are
* rejected by {@link ~isValidOption} if they lack required fields.
*
* Also resolves icon-name aliases (`'left'`, `'inlineLeft'`, etc.) to the corresponding
* SVG sources from {@link module:media-embed/mediaembedstyle/constants~DEFAULT_ICONS}.
*/
function normalizeDefinition(entry) {
	const override = typeof entry === "string" ? { name: entry } : entry;
	const definition = {
		...DEFAULT_OPTIONS[override.name],
		...override
	};
	if (typeof definition.icon === "string" && DEFAULT_ICONS[definition.icon]) definition.icon = DEFAULT_ICONS[definition.icon];
	return definition;
}
/**
* Validates a normalized style option. `name`, `title`, and `icon` are always required.
* `className` is required unless the entry is the default style (defaults encode as
* attribute-absence and intentionally have no class). Emits a console warning and returns
* `false` when any of these checks fails.
*/
function isValidOption(option) {
	if (!option.name || !option.title || !option.icon || !option.isDefault && !option.className) {
		warnInvalidStyle({ style: option });
		return false;
	}
	return true;
}
function warnInvalidStyle(info) {
	/**
	* The media style configuration provided in the editor config is invalid. The warning is
	* emitted in two situations:
	*
	* * An entry in {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#styles `config.mediaEmbed.styles.options`}
	*   does not reference a built-in style by name (`'alignLeft'`, `'alignBlockLeft'`,
	*   `'alignCenter'`, `'alignBlockRight'`, `'alignRight'`) and does not follow the
	*   {@link module:media-embed/mediaembedconfig~MediaStyleOptionDefinition} shape —
	*   `name`, `title`, `icon`, and (unless `isDefault: true`) `className` are required.
	*   The offending entry is reported under the `style` parameter.
	* * A dropdown entry placed inline in
	*   {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#toolbar `config.mediaEmbed.toolbar`}
	*   does not follow the {@link module:media-embed/mediaembedconfig~MediaStyleDropdownDefinition} shape
	*   (`name` and every `items[]` entry must use the full `mediaEmbed:` prefix, `defaultItem` must
	*   be one of the `items`, `title` must be a non-empty string), or its `items[]` reference styles
	*   that are not in the resolved
	*   {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#styles `config.mediaEmbed.styles`} list.
	*   The offending entry is reported under the `dropdown` parameter.
	*
	* @error media-style-configuration-definition-invalid
	*/
	logWarning("media-style-configuration-definition-invalid", info);
}
/**
* Type guard for toolbar config entries shaped like a media style dropdown definition. The
* discriminator is `defaultItem` — generic toolbar groupings use `items` + `label` and never
* carry a `defaultItem` field.
*
* @internal
*/
function isMediaStyleDropdown(item) {
	return typeof item === "object" && item !== null && typeof item.defaultItem === "string";
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedtoolbar
*/
/**
* The media embed toolbar plugin. It creates a toolbar for media embed that shows up when the media element is selected.
*
* Instances of toolbar components (e.g. buttons) are created based on the
* {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#toolbar `media.toolbar` configuration option}.
*/
var MediaEmbedToolbar = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [WidgetToolbarRepository];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "MediaEmbedToolbar";
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
	afterInit() {
		const editor = this.editor;
		const t = editor.t;
		editor.plugins.get(WidgetToolbarRepository).register("mediaEmbed", {
			ariaLabel: t("Media toolbar"),
			items: normalizeDeclarativeConfig(editor.ui.componentFactory, editor.config.get("mediaEmbed.toolbar") || []),
			getRelatedElement: getSelectedMediaViewWidget
		});
	}
};
/**
* Flattens dropdown definitions to their factory names, dropping any `mediaEmbed:`-prefixed
* name the style UI did not register — otherwise the toolbar crashes with `componentfactory-item-missing`.
* Non-string entries (e.g. generic `{ label, items }` toolbar groupings) pass through unchanged.
*/
function normalizeDeclarativeConfig(factory, config) {
	return config.map((item) => isMediaStyleDropdown(item) ? item.name : item).filter((item) => typeof item !== "string" || !item.startsWith("mediaEmbed:") || factory.has(item));
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedresize/resizemediaembedcommand
*/
/**
* The resize media embed command.
*/
var ResizeMediaEmbedCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	refresh() {
		const element = getSelectedMediaModelWidget(this.editor.model.document.selection);
		this.isEnabled = !!element;
		if (!element || !element.hasAttribute("resizedWidth")) this.value = null;
		else this.value = element.getAttribute("resizedWidth");
	}
	/**
	* Executes the command.
	*
	* ```ts
	* // Sets the width as a percentage of the parent width:
	* editor.execute( 'resizeMediaEmbed', { width: '50%' } );
	*
	* // Removes the resize and restores the default width:
	* editor.execute( 'resizeMediaEmbed', { width: null } );
	* ```
	*
	* @param options
	* @param options.width The new width of the media embed as a CSS `width` value
	* (e.g. `'50%'`), or `null` to remove the resize.
	* @fires execute
	*/
	execute(options) {
		const model = this.editor.model;
		const mediaElement = getSelectedMediaModelWidget(model.document.selection);
		if (mediaElement) model.change((writer) => {
			writer.setAttribute("resizedWidth", options.width, mediaElement);
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedresize/constants
*/
/**
* The view class applied to a resized media embed figure.
*
* Shared between the editing plugin (which toggles it via downcast of `resizedWidth` and consumes
* it on upcast) and the handles plugin (which adds it during drag and strips it on commit), so
* both layers agree on the exact class name.
*
* @internal
*/
const RESIZED_MEDIA_CLASS = "media_resized";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* The media embed resize editing feature.
*
* It adds the ability to resize each media embed using handles.
*/
var MediaEmbedResizeEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [MediaEmbedEditing];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "MediaEmbedResizeEditing";
	}
	/**
	* @inheritDoc
	* @internal
	*/
	static get licenseFeatureCode() {
		return "MER";
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
	static get isPremiumPlugin() {
		return true;
	}
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		editor.config.define("mediaEmbed", {
			resizeUnit: "%",
			resizeOptions: [
				{
					name: "resizeMediaEmbed:original",
					value: null,
					icon: "original"
				},
				{
					name: "resizeMediaEmbed:custom",
					value: "custom",
					icon: "custom"
				},
				{
					name: "resizeMediaEmbed:25",
					value: "25",
					icon: "small"
				},
				{
					name: "resizeMediaEmbed:50",
					value: "50",
					icon: "medium"
				},
				{
					name: "resizeMediaEmbed:75",
					value: "75",
					icon: "large"
				}
			]
		});
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		editor.commands.add("resizeMediaEmbed", new ResizeMediaEmbedCommand(editor));
		this._registerConverters();
	}
	/**
	* @inheritDoc
	*/
	afterInit() {
		this._registerSchema();
	}
	_registerSchema() {
		const schema = this.editor.model.schema;
		schema.extend("media", { allowAttributes: ["resizedWidth"] });
		schema.setAttributeProperties("resizedWidth", { isFormatting: true });
	}
	/**
	* Registers media embed resize converters.
	*/
	_registerConverters() {
		const editor = this.editor;
		editor.conversion.for("downcast").add((dispatcher) => dispatcher.on("attribute:resizedWidth:media", (evt, data, conversionApi) => {
			if (!conversionApi.consumable.consume(data.item, evt.name)) return;
			const viewWriter = conversionApi.writer;
			const figure = conversionApi.mapper.toViewElement(data.item);
			if (data.attributeNewValue !== null) {
				viewWriter.setStyle("width", data.attributeNewValue, figure);
				viewWriter.addClass(RESIZED_MEDIA_CLASS, figure);
			} else {
				viewWriter.removeStyle("width", figure);
				viewWriter.removeClass(RESIZED_MEDIA_CLASS, figure);
			}
		}));
		editor.conversion.for("upcast").attributeToAttribute({
			view: {
				name: "figure",
				styles: { width: /.+/ }
			},
			model: {
				key: "resizedWidth",
				value: (viewElement) => {
					if (!viewElement.hasClass("media")) return null;
					return viewElement.getStyle("width");
				}
			}
		});
		editor.conversion.for("upcast").add((dispatcher) => {
			dispatcher.on("element:figure", (evt, data, conversionApi) => {
				conversionApi.consumable.consume(data.viewItem, { classes: [RESIZED_MEDIA_CLASS] });
			});
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* The media embed resize by handles feature.
*
* It adds the ability to resize each media embed using handles.
*/
var MediaEmbedResizeHandles = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [WidgetResize];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "MediaEmbedResizeHandles";
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
		const command = this.editor.commands.get("resizeMediaEmbed");
		this.bind("isEnabled").to(command);
		this._setupResizerCreator();
	}
	/**
	* Attaches a resizer to every newly inserted media widget. Walks only the ranges
	* reported by the differ — never the whole document — so unrelated inserts (e.g.
	* pressing Enter to create a paragraph) cost only the differ check.
	*
	* Each resizer's `isEnabled` is bound to the plugin in {@link #_attachResizer},
	* so it auto-tracks the resize command's state.
	*/
	_setupResizerCreator() {
		const editor = this.editor;
		const model = editor.model;
		const widgetResize = editor.plugins.get(WidgetResize);
		this.listenTo(model.document, "change:data", () => {
			for (const change of model.document.differ.getChanges()) {
				if (change.type !== "insert" || change.name === "$text") continue;
				const insertedRange = model.createRange(change.position, change.position.getShiftedBy(change.length));
				for (const item of insertedRange.getItems()) {
					if (!item.is("element", "media")) continue;
					const viewElement = editor.editing.mapper.toViewElement(item);
					/* v8 ignore next -- @preserve */
					if (!viewElement) continue;
					/* v8 ignore else -- @preserve */
					if (!widgetResize.getResizerByViewElement(viewElement)) this._attachResizer(item, viewElement);
				}
			}
		}, { priority: "low" });
	}
	/**
	* Attaches a resizer to a single media widget.
	*/
	_attachResizer(modelElement, widgetView) {
		const editor = this.editor;
		const editingView = editor.editing.view;
		const resizer = editor.plugins.get(WidgetResize).attachTo({
			unit: editor.config.get("mediaEmbed.resizeUnit"),
			modelElement,
			viewElement: widgetView,
			editor,
			getHandleHost: (domWidgetElement) => domWidgetElement.querySelector(".ck-media__wrapper"),
			getResizeHost: (domWidgetElement) => domWidgetElement,
			onCommit: (newValue) => {
				editingView.change((writer) => writer.removeClass(RESIZED_MEDIA_CLASS, widgetView));
				editor.execute("resizeMediaEmbed", { width: newValue });
			}
		});
		resizer.bind("isEnabled").to(this);
		resizer.on("updateSize", () => {
			if (!widgetView.hasClass("media_resized")) editingView.change((writer) => writer.addClass(RESIZED_MEDIA_CLASS, widgetView));
		});
		editingView.once("render", () => resizer.redraw());
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedresize/mediaembedresizebuttons
*/
const RESIZE_ICONS = /* #__PURE__ */ (() => ({
	small: IconObjectSizeSmall,
	medium: IconObjectSizeMedium,
	large: IconObjectSizeLarge,
	custom: IconObjectSizeCustom,
	original: IconObjectSizeFull
}))();
/**
* The media embed resize buttons plugin.
*
* It adds a possibility to resize media embeds using the toolbar dropdown or individual buttons,
* depending on the plugin configuration.
*/
var MediaEmbedResizeButtons = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [MediaEmbedResizeEditing];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "MediaEmbedResizeButtons";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
	_resizeUnit;
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		this._resizeUnit = editor.config.get("mediaEmbed.resizeUnit");
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		const options = editor.config.get("mediaEmbed.resizeOptions");
		const command = editor.commands.get("resizeMediaEmbed");
		this.bind("isEnabled").to(command);
		for (const option of options) this._registerMediaEmbedResizeButton(option);
		this._registerMediaEmbedResizeDropdown(options);
	}
	/**
	* Creates a standalone button component for the given resize option.
	*/
	_registerMediaEmbedResizeButton(option) {
		const editor = this.editor;
		const { name, value, icon } = option;
		editor.ui.componentFactory.add(name, (locale) => {
			const button = new ButtonView(locale);
			const command = editor.commands.get("resizeMediaEmbed");
			const labelText = this._getOptionLabelValue(option, true);
			if (!RESIZE_ICONS[icon])
 /**
			* When configuring {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#resizeOptions
			* `config.mediaEmbed.resizeOptions`} for standalone buttons, a valid `icon` token must be set for each option.
			*
			* See all valid options described in the
			* {@link module:media-embed/mediaembedconfig~MediaEmbedResizeOption plugin configuration}.
			*
			* @error mediaembedresizebuttons-missing-icon
			* @param {module:media-embed/mediaembedconfig~MediaEmbedResizeOption} option Invalid media embed resize option.
			*/
			throw new CKEditorError("mediaembedresizebuttons-missing-icon", editor, option);
			button.set({
				label: labelText,
				icon: RESIZE_ICONS[icon],
				tooltip: labelText,
				isToggleable: true
			});
			button.bind("isEnabled").to(this);
			if (editor.plugins.has("MediaEmbedCustomResizeUI") && isCustomMediaEmbedResizeOption(option)) {
				const customResizeUI = editor.plugins.get("MediaEmbedCustomResizeUI");
				this.listenTo(button, "execute", () => {
					customResizeUI._showForm(this._resizeUnit);
				});
			} else {
				const optionValueWithUnit = value ? value + this._resizeUnit : null;
				button.bind("isOn").to(command, "value", command, "isEnabled", getIsOnButtonCallback(optionValueWithUnit));
				this.listenTo(button, "execute", () => {
					editor.execute("resizeMediaEmbed", { width: optionValueWithUnit });
				});
			}
			return button;
		});
	}
	/**
	* Creates the dropdown component containing all resize options.
	*/
	_registerMediaEmbedResizeDropdown(options) {
		const editor = this.editor;
		const t = editor.t;
		const originalSizeOption = options.find((option) => !option.value);
		const componentCreator = (locale) => {
			const command = editor.commands.get("resizeMediaEmbed");
			const dropdownView = createDropdown(locale, DropdownButtonView);
			const dropdownButton = dropdownView.buttonView;
			const accessibleLabel = t("Resize media");
			dropdownButton.set({
				tooltip: accessibleLabel,
				commandValue: originalSizeOption ? originalSizeOption.value : null,
				icon: RESIZE_ICONS.medium,
				isToggleable: true,
				label: originalSizeOption ? this._getOptionLabelValue(originalSizeOption) : "",
				withText: true,
				class: "ck-resize-media-embed-button",
				ariaLabel: accessibleLabel,
				ariaLabelledBy: void 0
			});
			dropdownButton.bind("label").to(command, "value", (commandValue) => {
				if (commandValue) return commandValue;
				return originalSizeOption ? this._getOptionLabelValue(originalSizeOption) : "";
			});
			dropdownView.bind("isEnabled").to(this);
			addListToDropdown(dropdownView, () => this._getResizeDropdownListItemDefinitions(options, command), {
				ariaLabel: t("Media resize list"),
				role: "menu"
			});
			this.listenTo(dropdownView, "execute", (evt) => {
				if ("onClick" in evt.source) evt.source.onClick();
				else {
					editor.execute(evt.source.commandName, { width: evt.source.commandValue });
					editor.editing.view.focus();
				}
			});
			return dropdownView;
		};
		editor.ui.componentFactory.add("resizeMediaEmbed", componentCreator);
	}
	/**
	* Returns a label for the given resize option.
	*/
	_getOptionLabelValue(option, forTooltip = false) {
		const t = this.editor.t;
		if (option.label) return option.label;
		const isCustom = isCustomMediaEmbedResizeOption(option);
		if (forTooltip) {
			if (isCustom) return t("Custom media size");
			return option.value ? t("Resize media to %0", option.value + this._resizeUnit) : t("Resize media to the original size");
		}
		if (isCustom) return t("Custom");
		return option.value ? option.value + this._resizeUnit : t("Original");
	}
	/**
	* Returns list item definitions for the resize dropdown.
	*/
	_getResizeDropdownListItemDefinitions(options, command) {
		const { editor } = this;
		const itemDefinitions = new Collection();
		const optionsWithSerializedValues = options.map((option) => {
			if (isCustomMediaEmbedResizeOption(option)) return {
				...option,
				valueWithUnits: "custom"
			};
			if (!option.value) return {
				...option,
				valueWithUnits: null
			};
			return {
				...option,
				valueWithUnits: `${option.value}${this._resizeUnit}`
			};
		});
		for (const option of optionsWithSerializedValues) {
			let definition;
			if (editor.plugins.has("MediaEmbedCustomResizeUI") && isCustomMediaEmbedResizeOption(option)) {
				const customResizeUI = editor.plugins.get("MediaEmbedCustomResizeUI");
				definition = {
					type: "button",
					model: new UIModel({
						label: this._getOptionLabelValue(option),
						role: "menuitemradio",
						withText: true,
						icon: null,
						onClick: () => {
							customResizeUI._showForm(this._resizeUnit);
						}
					})
				};
				const allDropdownValues = Object.values(optionsWithSerializedValues).map((option) => option.valueWithUnits);
				definition.model.bind("isOn").to(command, "value", command, "isEnabled", getIsOnCustomButtonCallback(allDropdownValues));
			} else {
				definition = {
					type: "button",
					model: new UIModel({
						commandName: "resizeMediaEmbed",
						commandValue: option.valueWithUnits,
						label: this._getOptionLabelValue(option),
						role: "menuitemradio",
						withText: true,
						icon: null
					})
				};
				definition.model.bind("isOn").to(command, "value", command, "isEnabled", getIsOnButtonCallback(option.valueWithUnits));
			}
			definition.model.bind("isEnabled").to(command, "isEnabled");
			itemDefinitions.add(definition);
		}
		return itemDefinitions;
	}
};
function isCustomMediaEmbedResizeOption(option) {
	return option.value === "custom";
}
function getIsOnButtonCallback(value) {
	return (commandValue, isEnabled) => {
		if (commandValue === void 0 || !isEnabled) return false;
		return commandValue === value;
	};
}
function getIsOnCustomButtonCallback(allDropdownValues) {
	return (commandValue, isEnabled) => !allDropdownValues.some((dropdownValue) => getIsOnButtonCallback(dropdownValue)(commandValue, isEnabled));
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Finds model, view and DOM element for selected media embed element.
* Returns `null` if there is no media embed selected.
*
* @param editor Editor instance.
* @internal
*/
function getSelectedMediaEmbedEditorNodes(editor) {
	const { editing } = editor;
	const mediaModelElement = getSelectedMediaModelWidget(editor.model.document.selection);
	if (!mediaModelElement) return null;
	const mediaViewElement = editing.mapper.toViewElement(mediaModelElement);
	return {
		model: mediaModelElement,
		view: mediaViewElement,
		dom: editing.view.domConverter.mapViewToDom(mediaViewElement)
	};
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedresize/utils/getselectedmediaembedwidthinunits
*/
/**
* Returns media embed width in specified units after resize.
*
* 	* If no media embed is selected or command is disabled, `null` will be returned.
*	* If `targetUnit` percentage is passed then it will return width percentage relative to its ancestor.
*
* @param editor Editor instance.
* @param targetUnit Unit in which dimension will be returned.
* @returns Parsed media embed width after resize (with unit).
* @internal
*/
function getSelectedMediaEmbedWidthInUnits(editor, targetUnit) {
	const mediaNodes = getSelectedMediaEmbedEditorNodes(editor);
	if (!mediaNodes) return null;
	const parsedResizedWidth = _tryParseDimensionWithUnit(mediaNodes.model.getAttribute("resizedWidth") || null);
	if (!parsedResizedWidth) return null;
	if (parsedResizedWidth.unit === targetUnit) return parsedResizedWidth;
	const mediaParentWidthPx = calculateResizeHostAncestorWidth(mediaNodes.dom);
	const mediaHolderDimension = {
		unit: "px",
		value: new Rect(mediaNodes.dom).width
	};
	return _tryCastDimensionsToUnit(mediaParentWidthPx, mediaHolderDimension, targetUnit);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* Returns the min and max resize values for the selected media embed in the specified unit.
*
* @param editor Editor instance.
* @param targetUnit Unit in which dimension will be returned.
* @returns Possible resize range in numeric form.
* @internal
*/
function getSelectedMediaEmbedPossibleResizeRange(editor, targetUnit) {
	const mediaNodes = getSelectedMediaEmbedEditorNodes(editor);
	if (!mediaNodes) return null;
	const mediaParentWidthPx = calculateResizeHostAncestorWidth(mediaNodes.dom);
	const minimumMediaWidth = _tryParseDimensionWithUnit(window.getComputedStyle(mediaNodes.dom).minWidth) || {
		value: 1,
		unit: "px"
	};
	return {
		unit: targetUnit,
		lower: Math.max(.1, _tryCastDimensionsToUnit(mediaParentWidthPx, minimumMediaWidth, targetUnit).value),
		upper: targetUnit === "px" ? mediaParentWidthPx : 100
	};
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedresize/ui/mediaembedcustomresizeformview
*/
/**
* The MediaEmbedCustomResizeFormView class.
*
* @internal
*/
var MediaEmbedCustomResizeFormView = class extends View {
	/**
	* Tracks information about the DOM focus in the form.
	*/
	focusTracker;
	/**
	* An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	*/
	keystrokes;
	/**
	* Resize unit shortcut.
	*/
	unit;
	/**
	* The Back button view displayed in the header.
	*/
	backButtonView;
	/**
	* A button used to submit the form.
	*/
	saveButtonView;
	/**
	* An input with a label.
	*/
	labeledInput;
	/**
	* A collection of child views.
	*/
	children;
	/**
	* A collection of views which can be focused in the form.
	*/
	_focusables;
	/**
	* Helps cycling over {@link #_focusables} in the form.
	*/
	_focusCycler;
	/**
	* An array of form validators used by {@link #isValid}.
	*/
	_validators;
	/**
	* @inheritDoc
	*/
	constructor(locale, unit, validators) {
		super(locale);
		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();
		this.unit = unit;
		this.backButtonView = this._createBackButton();
		this.saveButtonView = this._createSaveButton();
		this.labeledInput = this._createLabeledInputView();
		this.children = this.createCollection([this._createHeaderView()]);
		this.children.add(new FormRowView(locale, {
			children: [this.labeledInput, this.saveButtonView],
			class: ["ck-form__row_with-submit", "ck-form__row_large-top-padding"]
		}));
		this._focusables = new ViewCollection();
		this._validators = validators;
		this.keystrokes.set("Esc", (data, cancel) => {
			this.fire("cancel");
			cancel();
		});
		this._focusCycler = new FocusCycler({
			focusables: this._focusables,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				focusPrevious: "shift + tab",
				focusNext: "tab"
			}
		});
		this.setTemplate({
			tag: "form",
			attributes: {
				class: [
					"ck",
					"ck-form",
					"ck-media-embed-custom-resize-form",
					"ck-responsive-form"
				],
				tabindex: "-1"
			},
			children: this.children
		});
	}
	/**
	* @inheritDoc
	*/
	render() {
		super.render();
		submitHandler({ view: this });
		[
			this.backButtonView,
			this.labeledInput,
			this.saveButtonView
		].forEach((v) => {
			this._focusables.add(v);
			this.focusTracker.add(v.element);
		});
		this.keystrokes.listenTo(this.element);
	}
	/**
	* @inheritDoc
	*/
	destroy() {
		super.destroy();
		this.focusTracker.destroy();
		this.keystrokes.destroy();
	}
	_createBackButton() {
		const t = this.locale.t;
		const backButton = new ButtonView(this.locale);
		backButton.set({
			class: "ck-button-back",
			label: t("Back"),
			icon: IconPreviousArrow,
			tooltip: true
		});
		backButton.delegate("execute").to(this, "cancel");
		return backButton;
	}
	_createSaveButton() {
		const t = this.locale.t;
		const saveButton = new ButtonView(this.locale);
		saveButton.set({
			label: t("Save"),
			withText: true,
			type: "submit",
			class: "ck-button-action ck-button-bold"
		});
		return saveButton;
	}
	_createHeaderView() {
		const t = this.locale.t;
		const header = new FormHeaderView(this.locale, { label: t("Media Resize") });
		header.children.add(this.backButtonView, 0);
		return header;
	}
	_createLabeledInputView() {
		const t = this.locale.t;
		const labeledInput = new LabeledFieldView(this.locale, createLabeledInputNumber);
		labeledInput.label = t("Resize media (in %0)", this.unit);
		labeledInput.class = "ck-labeled-field-view_full-width";
		labeledInput.fieldView.set({
			min: .1,
			step: .1
		});
		return labeledInput;
	}
	/**
	* Validates the form and returns `false` when some fields are invalid.
	*/
	isValid() {
		this.resetFormStatus();
		for (const validator of this._validators) {
			const errorText = validator(this);
			if (errorText) {
				this.labeledInput.errorText = errorText;
				return false;
			}
		}
		return true;
	}
	/**
	* Cleans up error and information text of {@link #labeledInput}.
	*/
	resetFormStatus() {
		this.labeledInput.errorText = null;
	}
	/**
	* The native DOM `value` of the input element of {@link #labeledInput}.
	*/
	get rawSize() {
		const { element } = this.labeledInput.fieldView;
		if (!element) return null;
		return element.value;
	}
	/**
	* Get numeric value of size. Returns `null` if value is not a number.
	*/
	get parsedSize() {
		const { rawSize } = this;
		if (rawSize === null) return null;
		const parsed = Number.parseFloat(rawSize);
		if (Number.isNaN(parsed)) return null;
		return parsed;
	}
	/**
	* Returns serialized media embed input size with unit.
	* Returns `null` if value is not a number.
	*/
	get sizeWithUnits() {
		const { parsedSize, unit } = this;
		if (parsedSize === null) return null;
		return `${parsedSize}${unit}`;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedresize/mediaembedcustomresizeui
*/
/**
* The custom resize media embed UI plugin.
*
* The plugin uses the {@link module:ui/panel/balloon/contextualballoon~ContextualBalloon}.
*/
var MediaEmbedCustomResizeUI = class extends Plugin {
	/**
	* The contextual balloon plugin instance.
	*/
	_balloon;
	/**
	* A form used to set the custom resize width.
	*/
	_form;
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [ContextualBalloon];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "MediaEmbedCustomResizeUI";
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
	destroy() {
		super.destroy();
		if (this._form) this._form.destroy();
	}
	/**
	* Creates the {@link module:media-embed/mediaembedresize/ui/mediaembedcustomresizeformview~MediaEmbedCustomResizeFormView} form.
	*/
	_createForm(unit) {
		const editor = this.editor;
		this._balloon = this.editor.plugins.get("ContextualBalloon");
		const FormViewClass = CssTransitionDisablerMixin(MediaEmbedCustomResizeFormView);
		this._form = new FormViewClass(editor.locale, unit, getFormValidators(editor));
		this._form.render();
		this.listenTo(this._form, "submit", () => {
			if (this._form.isValid()) {
				editor.execute("resizeMediaEmbed", { width: this._form.sizeWithUnits });
				this._hideForm(true);
			}
		});
		this.listenTo(this._form.labeledInput, "change:errorText", () => {
			editor.ui.update();
		});
		this.listenTo(this._form, "cancel", () => {
			this._hideForm(true);
		});
		clickOutsideHandler({
			emitter: this._form,
			activator: () => this._isVisible,
			contextElements: () => [this._balloon.view.element],
			callback: () => this._hideForm()
		});
	}
	/**
	* Shows the {@link #_form} in the {@link #_balloon}.
	*
	* @internal
	*/
	_showForm(unit) {
		if (this._isVisible) return;
		if (!this._form) this._createForm(unit);
		const editor = this.editor;
		const labeledInput = this._form.labeledInput;
		this._form.disableCssTransitions();
		this._form.resetFormStatus();
		/* v8 ignore else -- @preserve */
		if (!this._isInBalloon) this._balloon.add({
			view: this._form,
			position: getBalloonPositionData(editor)
		});
		const currentParsedWidth = getSelectedMediaEmbedWidthInUnits(editor, unit);
		const initialInputValue = currentParsedWidth ? currentParsedWidth.value.toFixed(1) : "";
		const possibleRange = getSelectedMediaEmbedPossibleResizeRange(editor, unit);
		labeledInput.fieldView.value = labeledInput.fieldView.element.value = initialInputValue;
		if (possibleRange) Object.assign(labeledInput.fieldView, {
			min: possibleRange.lower.toFixed(1),
			max: Math.ceil(possibleRange.upper).toFixed(1)
		});
		this._form.labeledInput.fieldView.select();
		this._form.enableCssTransitions();
	}
	/**
	* Removes the {@link #_form} from the {@link #_balloon}.
	*
	* @param focusEditable Controls whether the editing view is focused afterwards.
	*/
	_hideForm(focusEditable = false) {
		if (!this._isInBalloon) return;
		if (this._form.focusTracker.isFocused) this._form.saveButtonView.focus();
		this._balloon.remove(this._form);
		if (focusEditable) this.editor.editing.view.focus();
	}
	/**
	* Returns `true` when the {@link #_form} is the visible view in the {@link #_balloon}.
	*/
	get _isVisible() {
		return !!this._balloon && this._balloon.visibleView === this._form;
	}
	/**
	* Returns `true` when the {@link #_form} is in the {@link #_balloon}.
	*/
	get _isInBalloon() {
		return !!this._balloon && this._balloon.hasView(this._form);
	}
};
function getBalloonPositionData(editor) {
	const editingView = editor.editing.view;
	const defaultPositions = BalloonPanelView.defaultPositions;
	return {
		target: editingView.domConverter.mapViewToDom(getSelectedMediaViewWidget(editingView.document.selection)),
		positions: [
			defaultPositions.northArrowSouth,
			defaultPositions.northArrowSouthWest,
			defaultPositions.northArrowSouthEast,
			defaultPositions.southArrowNorth,
			defaultPositions.southArrowNorthWest,
			defaultPositions.southArrowNorthEast,
			defaultPositions.viewportStickyNorth
		]
	};
}
function getFormValidators(editor) {
	const t = editor.t;
	return [(form) => {
		if (form.rawSize.trim() === "") return t("The value must not be empty.");
		if (form.parsedSize === null) return t("The value should be a plain number.");
	}];
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedresize
*/
/**
* The media embed resize plugin.
*
* It adds a possibility to resize each media embed using handles, toolbar buttons,
* or a balloon-hosted custom-width input.
*/
var MediaEmbedResize = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [
			MediaEmbedResizeEditing,
			MediaEmbedResizeHandles,
			MediaEmbedCustomResizeUI,
			MediaEmbedResizeButtons
		];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "MediaEmbedResize";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedstyle/mediaembedstylecommand
*/
/**
* The media embed style command. It is used to apply a style option (e.g. an alignment) to a
* selected media embed.
*
* The set of accepted style values comes from the resolved
* {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#styles `config.mediaEmbed.styles`}
* options. Values not in that set are silently rejected by {@link #execute}.
*/
var MediaEmbedStyleCommand = class extends Command {
	/**
	* Resolved styles indexed by `name`. Used to look up the `isDefault` flag at execute time
	* (any default-marked style clears the attribute) and to validate that a requested style
	* is part of the resolved options list.
	*/
	_styles;
	/**
	* The `name` of the first style with `isDefault: true` in the resolved options, or `null`
	* when the integrator did not designate a default. Exposed via {@link #value} when the
	* selected media has no `mediaStyle` attribute, so the default-state UI button can light up.
	* Does not gate the "clear attribute" branch in {@link #execute} — that uses the per-style
	* `isDefault` flag so multi-default configs behave consistently with the downcast.
	*/
	_defaultStyleName;
	/**
	* Creates an instance of the media embed style command.
	*
	* @param editor The editor instance.
	* @param styles The resolved list of style options that this command will accept.
	*/
	constructor(editor, styles) {
		super(editor);
		this._styles = new Map(styles.map((style) => [style.name, style]));
		const defaultStyle = styles.find((style) => style.isDefault);
		this._defaultStyleName = defaultStyle ? defaultStyle.name : null;
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		const element = getSelectedMediaModelWidget(this.editor.model.document.selection);
		this.isEnabled = !!element;
		if (!element) this.value = false;
		else if (element.hasAttribute("mediaStyle")) {
			const styleName = element.getAttribute("mediaStyle");
			this.value = this._styles.has(styleName) ? styleName : this._defaultStyleName ?? false;
		} else this.value = this._defaultStyleName ?? false;
	}
	/**
	* Executes the command and applies the chosen style to the currently selected media embed.
	*
	* ```ts
	* editor.execute( 'mediaStyle', { value: 'alignLeft' } );
	* editor.execute( 'mediaStyle', { value: 'alignCenter' } ); // removes the attribute — alignCenter is the built-in default
	* editor.execute( 'mediaStyle', { value: null } );          // removes the attribute
	* ```
	*
	* The default style is encoded on the model as the absence of the `mediaStyle` attribute.
	* Passing any `isDefault: true` style name (or `null`) therefore clears the attribute. Values
	* that are neither falsy, an `isDefault` style, nor present in the resolved options list are
	* silently rejected.
	*
	* @param options
	* @param options.value The name of the style to apply, or `null` to clear the alignment.
	* @fires execute
	*/
	execute(options) {
		const model = this.editor.model;
		const element = getSelectedMediaModelWidget(model.document.selection);
		const requestedStyle = options.value;
		if (!requestedStyle || this._styles.get(requestedStyle)?.isDefault) {
			model.change((writer) => {
				writer.removeAttribute("mediaStyle", element);
			});
			return;
		}
		if (!this._styles.has(requestedStyle)) return;
		model.change((writer) => {
			writer.setAttribute("mediaStyle", requestedStyle, element);
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedstyle/mediaembedstyleediting
*/
/**
* The media embed style engine plugin. It extends the schema with the `mediaStyle` attribute,
* registers the {@link module:media-embed/mediaembedstyle/mediaembedstylecommand~MediaEmbedStyleCommand} command,
* and adds the converters that apply alignment CSS classes to the figure.
*/
var MediaEmbedStyleEditing = class extends Plugin {
	/**
	* The resolved list of media style options. Built once from
	* {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#styles `config.mediaEmbed.styles`}
	* during {@link #init} and consumed by both the command and the UI plugin (single source of truth).
	*
	* @internal
	* @readonly
	*/
	normalizedStyles;
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [MediaEmbedEditing];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "MediaEmbedStyleEditing";
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
		const schema = editor.model.schema;
		editor.config.define("mediaEmbed.styles", { options: Object.keys(DEFAULT_OPTIONS) });
		this.normalizedStyles = normalizeStyles(editor.config.get("mediaEmbed.styles"));
		schema.extend("media", { allowAttributes: ["mediaStyle"] });
		schema.setAttributeProperties("mediaStyle", { isFormatting: true });
		editor.commands.add("mediaStyle", new MediaEmbedStyleCommand(editor, this.normalizedStyles));
		this._registerConverters();
	}
	/**
	* Registers the downcast and upcast converters for the `mediaStyle` attribute.
	*/
	_registerConverters() {
		const editor = this.editor;
		const styleClassMap = new Map(this.normalizedStyles.filter((style) => !style.isDefault && style.className).map((style) => [style.name, style.className]));
		editor.conversion.for("downcast").add((dispatcher) => dispatcher.on("attribute:mediaStyle:media", (evt, data, conversionApi) => {
			if (!conversionApi.consumable.consume(data.item, evt.name)) return;
			const figure = conversionApi.mapper.toViewElement(data.item);
			const viewWriter = conversionApi.writer;
			const oldClass = styleClassMap.get(data.attributeOldValue);
			const newClass = styleClassMap.get(data.attributeNewValue);
			if (oldClass) viewWriter.removeClass(oldClass, figure);
			if (newClass) viewWriter.addClass(newClass, figure);
		}));
		editor.conversion.for("upcast").add((dispatcher) => {
			dispatcher.on("element:figure", (_evt, data, conversionApi) => {
				if (!data.modelRange) return;
				const modelElement = first(data.modelRange.getItems());
				if (!modelElement || !modelElement.is("element", "media")) return;
				for (const [styleName, className] of styleClassMap) if (conversionApi.consumable.consume(data.viewItem, { classes: className })) conversionApi.writer.setAttribute("mediaStyle", styleName, modelElement);
			}, { priority: "low" });
		});
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedstyle/mediaembedstyleui
*/
/**
* The media embed style UI plugin.
*
* It registers a button for every style in the resolved
* {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#styles `config.mediaEmbed.styles`}
* list, and the default split-button dropdowns (`mediaEmbed:wrapText`, `mediaEmbed:breakText`)
* — filtered to the styles that survived configuration. The resulting components can be placed
* in the {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#toolbar media embed toolbar}.
*/
var MediaEmbedStyleUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [MediaEmbedStyleEditing];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "MediaEmbedStyleUI";
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
		const titles = this._getLocalizedTitles();
		for (const button of this._getButtonDefinitions(titles)) this._createButton(button);
		for (const dropdown of this._getDropdownDefinitions(titles)) this._createDropdown(dropdown);
	}
	/**
	* Returns the alignment button definitions sourced from the resolved options list.
	*/
	_getButtonDefinitions(titles) {
		return this.editor.plugins.get(MediaEmbedStyleEditing).normalizedStyles.map((option) => ({
			name: option.name,
			label: titles[option.title] || option.title,
			icon: option.icon
		}));
	}
	/**
	* Returns the localized titles of the built-in styles and dropdowns.
	*/
	_getLocalizedTitles() {
		const t = this.editor.t;
		return {
			"Left aligned media": t("Left aligned media"),
			"Centered media": t("Centered media"),
			"Right aligned media": t("Right aligned media"),
			"Wrap text": t("Wrap text"),
			"Break text": t("Break text")
		};
	}
	/**
	* Returns the split-button dropdown definitions, filtered to the styles present in the
	* resolved options list. Combines the {@link module:media-embed/mediaembedstyle/constants~DEFAULT_DROPDOWN_DEFINITIONS
	* built-in dropdowns} with custom dropdowns declared inline in
	* {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#toolbar `config.mediaEmbed.toolbar`}.
	*
	* A dropdown with fewer than two items is skipped — a single-item dropdown carries no value
	* over the flat button. If the configured `defaultItem` was filtered out, the first surviving
	* item becomes the default.
	*
	* When a *custom* dropdown's items reference styles that are not in the resolved options list,
	* a console warning is emitted (the integrator's config was not fully honored). Built-in
	* dropdowns auto-skip silently — they are added by the plugin, not the integrator.
	*/
	_getDropdownDefinitions(titles) {
		const editing = this.editor.plugins.get(MediaEmbedStyleEditing);
		const availableComponentNames = new Set(editing.normalizedStyles.map(({ name }) => `mediaEmbed:${name}`));
		const dropdowns = [];
		const resolveDropdown = (definition, warnOnFilter) => {
			const items = definition.items.filter((itemName) => availableComponentNames.has(itemName));
			if (warnOnFilter && items.length !== definition.items.length) warnInvalidDropdown({ dropdown: definition });
			if (items.length < 2) return;
			const defaultItem = availableComponentNames.has(definition.defaultItem) ? definition.defaultItem : items[0];
			dropdowns.push({
				name: definition.name,
				title: titles[definition.title] || definition.title,
				items,
				defaultItem
			});
		};
		for (const definition of DEFAULT_DROPDOWN_DEFINITIONS) resolveDropdown(definition, false);
		for (const definition of this._collectCustomDropdowns()) resolveDropdown(definition, true);
		return dropdowns;
	}
	/**
	* Scans `config.mediaEmbed.toolbar` for entries shaped like a dropdown definition
	* (objects with both `items` and `defaultItem`) and returns the valid ones. `defaultItem`
	* is the discriminator between our split-button dropdowns and generic toolbar groupings
	* (which use `items` + `label` and have no `defaultItem`).
	*
	* Invalid entries (wrong name prefix, `defaultItem` missing from `items`) are warned and
	* dropped here. Items that reference filtered-out styles are filtered later by
	* {@link #_getDropdownDefinitions}, alongside the same logic that applies to built-in
	* dropdowns.
	*/
	_collectCustomDropdowns() {
		return (this.editor.config.get("mediaEmbed.toolbar") || []).filter((item) => isMediaStyleDropdown(item) && isValidCustomDropdown(item));
	}
	/**
	* Registers a single alignment toggle button in the component factory.
	*/
	_createButton(definition) {
		const editor = this.editor;
		const componentName = `mediaEmbed:${definition.name}`;
		editor.ui.componentFactory.add(componentName, (locale) => {
			const command = editor.commands.get("mediaStyle");
			const view = new ButtonView(locale);
			view.set({
				label: definition.label,
				icon: definition.icon,
				tooltip: true,
				isToggleable: true
			});
			view.bind("isEnabled").to(command, "isEnabled");
			view.bind("isOn").to(command, "value", (value) => value === definition.name);
			view.on("execute", () => {
				editor.execute("mediaStyle", { value: definition.name });
				editor.editing.view.focus();
			});
			return view;
		});
	}
	/**
	* Registers a split-button dropdown grouping a set of alignment buttons. The action button
	* reflects whichever child option is currently `isOn`, falling back to the dropdown's
	* `defaultItem` when nothing is active.
	*/
	_createDropdown(definition) {
		const editor = this.editor;
		const factory = editor.ui.componentFactory;
		factory.add(definition.name, (locale) => {
			const buttonViews = definition.items.map((itemName) => factory.create(itemName));
			const defaultButton = buttonViews[definition.items.indexOf(definition.defaultItem)];
			const activeOrDefault = (...areOn) => {
				const index = areOn.findIndex(Boolean);
				return index < 0 ? defaultButton : buttonViews[index];
			};
			const dropdownView = createDropdown(locale, SplitButtonView);
			const splitButtonView = dropdownView.buttonView;
			addToolbarToDropdown(dropdownView, buttonViews, { enableActiveItemFocusOnDropdownOpen: true });
			splitButtonView.set({
				label: getDropdownButtonTitle(definition.title, defaultButton.label),
				class: null,
				tooltip: true
			});
			splitButtonView.arrowView.unbind("label");
			splitButtonView.arrowView.set({ label: definition.title });
			splitButtonView.bind("icon").toMany(buttonViews, "isOn", (...areOn) => activeOrDefault(...areOn).icon);
			splitButtonView.bind("label").toMany(buttonViews, "isOn", (...areOn) => getDropdownButtonTitle(definition.title, activeOrDefault(...areOn).label));
			splitButtonView.bind("isOn").toMany(buttonViews, "isOn", (...areOn) => areOn.some(Boolean));
			splitButtonView.bind("class").toMany(buttonViews, "isOn", (...areOn) => areOn.some(Boolean) ? "ck-splitbutton_flatten" : void 0);
			this.listenTo(splitButtonView, "execute", () => {
				if (buttonViews.some(({ isOn }) => isOn)) dropdownView.isOpen = !dropdownView.isOpen;
				else defaultButton.fire("execute");
			});
			dropdownView.bind("isEnabled").toMany(buttonViews, "isEnabled", (...areEnabled) => areEnabled.some(Boolean));
			this.listenTo(dropdownView, "execute", () => {
				editor.editing.view.focus();
			});
			return dropdownView;
		});
	}
};
/**
* Combines the dropdown title and the default action item label for the split-button label.
*/
function getDropdownButtonTitle(dropdownTitle, buttonTitle) {
	return `${dropdownTitle}: ${buttonTitle}`;
}
/**
* Validates a user-supplied dropdown definition. Emits a console warning under
* `media-style-configuration-definition-invalid` and returns `false` when any of these rules is
* broken: `name` must start with `mediaEmbed:`, `title` must be a non-empty string, `items` must
* be non-empty and every entry must be a `mediaEmbed:`-prefixed string, and `defaultItem` must be
* one of the `items`.
*
* Item-membership against the resolved styles is checked separately, downstream, alongside the
* same logic that applies to built-in dropdowns.
*/
function isValidCustomDropdown(definition) {
	const valid = definition.name.startsWith("mediaEmbed:") && typeof definition.title === "string" && definition.title.length > 0 && definition.items.length > 0 && definition.items.every((name) => typeof name === "string" && name.startsWith("mediaEmbed:")) && definition.items.includes(definition.defaultItem);
	if (!valid) warnInvalidDropdown({ dropdown: definition });
	return valid;
}
/**
* Emits a console warning under `media-style-configuration-definition-invalid` for an invalid
* or partially-honored dropdown definition. Called from {@link ~isValidCustomDropdown} for
* structural problems and from {@link MediaEmbedStyleUI#_getDropdownDefinitions} when items
* reference styles that are not in the resolved options list.
*/
function warnInvalidDropdown(info) {
	logWarning("media-style-configuration-definition-invalid", info);
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedstyle
*/
/**
* The media embed style plugin.
*
* This is a "glue" plugin which loads the following plugins:
* * {@link module:media-embed/mediaembedstyle/mediaembedstyleediting~MediaEmbedStyleEditing},
* * {@link module:media-embed/mediaembedstyle/mediaembedstyleui~MediaEmbedStyleUI}
*
* For a detailed overview, check the {@glink features/media-embed/media-embed-styles Media embed styles feature documentation}.
*/
var MediaEmbedStyle = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires() {
		return [MediaEmbedStyleEditing, MediaEmbedStyleUI];
	}
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "MediaEmbedStyle";
	}
	/**
	* @inheritDoc
	*/
	static get isOfficialPlugin() {
		return true;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { AutoMediaEmbed, MediaEmbed, MediaEmbedCommand, MediaEmbedCustomResizeUI, MediaEmbedEditing, MediaEmbedResize, MediaEmbedResizeButtons, MediaEmbedResizeEditing, MediaEmbedResizeHandles, MediaEmbedStyle, MediaEmbedStyleCommand, MediaEmbedStyleEditing, MediaEmbedStyleUI, MediaEmbedToolbar, MediaEmbedUI, MediaRegistry, ResizeMediaEmbedCommand, MediaFormView as _MediaFormView, createMediaFigureElement as _createMediaFigureElement, getSelectedMediaModelWidget as _getSelectedMediaModelWidget, getSelectedMediaViewWidget as _getSelectedMediaViewWidget, insertMedia as _insertMedia, isMediaWidget as _isMediaWidget, modelToViewUrlAttributeConverter as _modelToViewUrlAttributeMediaConverter, toMediaWidget as _toMediaWidget };
//# sourceMappingURL=index.js.map