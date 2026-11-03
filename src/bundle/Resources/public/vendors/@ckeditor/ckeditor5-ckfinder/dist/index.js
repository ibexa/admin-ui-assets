/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { CKFinderUploadAdapter } from "@ckeditor/ckeditor5-adapter-ckfinder";
import { Link, LinkEditing } from "@ckeditor/ckeditor5-link";
import { ButtonView, MenuBarMenuListItemButtonView, Notification } from "@ckeditor/ckeditor5-ui";
import { IconBrowseFiles, IconImageAssetManager } from "@ckeditor/ckeditor5-icons";
import { CKEditorError } from "@ckeditor/ckeditor5-utils";

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module ckfinder/ckfinderui
*/
/**
* Introduces UI components for `CKFinder` plugin.
*
* The plugin introduces two UI components to the {@link module:ui/componentfactory~ComponentFactory UI component factory}:
*
* * the `'ckfinder'` toolbar button,
* * the `'menuBar:ckfinder'` menu bar component, which is by default added to the `'Insert'` menu.
*
* It also integrates with the `insertImage` toolbar component and `menuBar:insertImage` menu component.
*/
var CKFinderUI = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "CKFinderUI";
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
		editor.ui.componentFactory.add("ckfinder", () => this._createFileToolbarButton());
		editor.ui.componentFactory.add("menuBar:ckfinder", () => this._createFileMenuBarButton());
		/* v8 ignore else -- @preserve */
		if (editor.plugins.has("ImageInsertUI")) editor.plugins.get("ImageInsertUI").registerIntegration({
			name: "assetManager",
			observable: () => editor.commands.get("ckfinder"),
			buttonViewCreator: () => this._createImageToolbarButton(),
			formViewCreator: () => this._createImageDropdownButton(),
			menuBarButtonViewCreator: (isOnly) => this._createImageMenuBarButton(isOnly ? "insertOnly" : "insertNested")
		});
	}
	/**
	* Creates the base for various kinds of the button component provided by this feature.
	*/
	_createButton(ButtonClass) {
		const editor = this.editor;
		const locale = editor.locale;
		const view = new ButtonClass(locale);
		const command = editor.commands.get("ckfinder");
		view.bind("isEnabled").to(command);
		view.on("execute", () => {
			editor.execute("ckfinder");
			editor.editing.view.focus();
		});
		return view;
	}
	/**
	* Creates a simple toolbar button for files management, with an icon and a tooltip.
	*/
	_createFileToolbarButton() {
		const t = this.editor.locale.t;
		const button = this._createButton(ButtonView);
		button.icon = IconBrowseFiles;
		button.label = t("Insert image or file");
		button.tooltip = true;
		return button;
	}
	/**
	* Creates a simple toolbar button for images management, with an icon and a tooltip.
	*/
	_createImageToolbarButton() {
		const t = this.editor.locale.t;
		const imageInsertUI = this.editor.plugins.get("ImageInsertUI");
		const button = this._createButton(ButtonView);
		button.icon = IconImageAssetManager;
		button.bind("label").to(imageInsertUI, "isImageSelected", (isImageSelected) => isImageSelected ? t("Replace image with file manager") : t("Insert image with file manager"));
		button.tooltip = true;
		return button;
	}
	/**
	* Creates a button for images management for the dropdown view, with an icon, text and no tooltip.
	*/
	_createImageDropdownButton() {
		const t = this.editor.locale.t;
		const imageInsertUI = this.editor.plugins.get("ImageInsertUI");
		const button = this._createButton(ButtonView);
		button.icon = IconImageAssetManager;
		button.withText = true;
		button.bind("label").to(imageInsertUI, "isImageSelected", (isImageSelected) => isImageSelected ? t("Replace with file manager") : t("Insert with file manager"));
		button.on("execute", () => {
			imageInsertUI.dropdownView.isOpen = false;
		});
		return button;
	}
	/**
	* Creates a button for files management for the menu bar.
	*/
	_createFileMenuBarButton() {
		const t = this.editor.locale.t;
		const button = this._createButton(MenuBarMenuListItemButtonView);
		button.icon = IconBrowseFiles;
		button.withText = true;
		button.label = t("File");
		return button;
	}
	/**
	* Creates a button for images management for the menu bar.
	*/
	_createImageMenuBarButton(type) {
		const translateVariableKey = this.editor.locale.t;
		const t = this.editor.locale.t;
		const button = this._createButton(MenuBarMenuListItemButtonView);
		button.icon = IconImageAssetManager;
		button.withText = true;
		switch (type) {
			case "insertOnly":
				button.label = translateVariableKey("Image");
				break;
			case "insertNested": button.label = t("With file manager");
		}
		return button;
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module ckfinder/ckfindercommand
*/
/**
* The CKFinder command. It is used by the {@link module:ckfinder/ckfinderediting~CKFinderEditing CKFinder editing feature}
* to open the CKFinder file manager to insert an image or a link to a file into the editor content.
*
* ```ts
* editor.execute( 'ckfinder' );
* ```
*
* **Note:** This command uses other features to perform tasks:
* - To insert images the {@link module:image/image/insertimagecommand~InsertImageCommand 'insertImage'} command
* from the {@link module:image/image~Image Image feature}.
* - To insert links to files the {@link module:link/linkcommand~LinkCommand 'link'} command
* from the {@link module:link/link~Link Link feature}.
*/
var CKFinderCommand = class extends Command {
	/**
	* @inheritDoc
	*/
	constructor(editor) {
		super(editor);
		this.affectsData = false;
		this.stopListening(this.editor.model.document, "change");
		this.listenTo(this.editor.model.document, "change", () => this.refresh(), { priority: "low" });
	}
	/**
	* @inheritDoc
	*/
	refresh() {
		const imageCommand = this.editor.commands.get("insertImage");
		const linkCommand = this.editor.commands.get("link");
		this.isEnabled = imageCommand.isEnabled || linkCommand.isEnabled;
	}
	/**
	* @inheritDoc
	*/
	execute() {
		const editor = this.editor;
		const openerMethod = this.editor.config.get("ckfinder.openerMethod") || "modal";
		if (openerMethod != "popup" && openerMethod != "modal")
 /**
		* The `ckfinder.openerMethod` must be one of: "popup" or "modal".
		*
		* @error ckfinder-unknown-openermethod
		*/
		throw new CKEditorError("ckfinder-unknown-openermethod", editor);
		const options = this.editor.config.get("ckfinder.options") || {};
		options.chooseFiles = true;
		const originalOnInit = options.onInit;
		if (!options.language) options.language = editor.locale.uiLanguage;
		options.onInit = (finder) => {
			if (originalOnInit) originalOnInit(finder);
			finder.on("files:choose", (evt) => {
				const files = evt.data.files.toArray();
				const links = files.filter((file) => !file.isImage());
				const images = files.filter((file) => file.isImage());
				for (const linkFile of links) editor.execute("link", linkFile.getUrl());
				const imagesUrls = [];
				for (const image of images) {
					const url = image.getUrl();
					imagesUrls.push(url ? url : finder.request("file:getProxyUrl", { file: image }));
				}
				if (imagesUrls.length) insertImages(editor, imagesUrls);
			});
			finder.on("file:choose:resizedImage", (evt) => {
				const resizedUrl = evt.data.resizedUrl;
				if (!resizedUrl) {
					const notification = editor.plugins.get("Notification");
					const t = editor.locale.t;
					notification.showWarning(t("Could not obtain resized image URL."), {
						title: t("Selecting resized image failed"),
						namespace: "ckfinder"
					});
					return;
				}
				insertImages(editor, [resizedUrl]);
			});
		};
		window.CKFinder[openerMethod](options);
	}
};
function insertImages(editor, urls) {
	if (!editor.commands.get("insertImage").isEnabled) {
		const notification = editor.plugins.get("Notification");
		const t = editor.locale.t;
		notification.showWarning(t("Could not insert image at the current position."), {
			title: t("Inserting image failed"),
			namespace: "ckfinder"
		});
		return;
	}
	editor.execute("insertImage", { source: urls });
}

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module ckfinder/ckfinderediting
*/
/**
* The CKFinder editing feature. It introduces the {@link module:ckfinder/ckfindercommand~CKFinderCommand CKFinder command}.
*/
var CKFinderEditing = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "CKFinderEditing";
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
	static get requires() {
		return [Notification, LinkEditing];
	}
	/**
	* @inheritDoc
	*/
	init() {
		const editor = this.editor;
		if (!editor.plugins.has("ImageBlockEditing") && !editor.plugins.has("ImageInlineEditing"))
 /**
		* CKFinder requires at least one plugin providing support for images loaded in the editor. Please
		* make sure either:
		*
		* * {@link module:image/image~Image} (which loads both types of images),
		* * or {@link module:image/imageblock~ImageBlock},
		* * or {@link module:image/imageinline~ImageInline}.
		*
		* is loaded in your editor configuration.
		*
		* @error ckfinder-missing-image-plugin
		*/
		throw new CKEditorError("ckfinder-missing-image-plugin", editor);
		editor.commands.add("ckfinder", new CKFinderCommand(editor));
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module ckfinder/ckfinder
*/
/**
* The CKFinder feature, a bridge between the CKEditor 5 WYSIWYG editor and the
* [CKFinder](https://ckeditor.com/ckfinder) file manager and uploader.
*
* This is a "glue" plugin which enables:
*
* * {@link module:ckfinder/ckfinderediting~CKFinderEditing},
* * {@link module:ckfinder/ckfinderui~CKFinderUI},
* * {@link module:adapter-ckfinder/uploadadapter~CKFinderUploadAdapter}.
*
* See the {@glink features/file-management/ckfinder "CKFinder integration" guide} to learn how to configure
* and use this feature.
*
* Check out the {@glink features/images/image-upload/image-upload comprehensive "Image upload" guide} to learn about
* other ways to upload images into CKEditor 5.
*/
var CKFinder = class extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName() {
		return "CKFinder";
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
	static get requires() {
		return [
			Link,
			CKFinderUploadAdapter,
			CKFinderEditing,
			CKFinderUI
		];
	}
};

/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/

export { CKFinder, CKFinderCommand, CKFinderEditing, CKFinderUI };
//# sourceMappingURL=index.js.map