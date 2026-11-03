/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module easy-image/cloudservicesuploadadapter
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { FileRepository } from "@ckeditor/ckeditor5-upload";
import { CloudServices } from "@ckeditor/ckeditor5-cloud-services";
/**
* A plugin that enables upload to [CKEditor Cloud Services](https://ckeditor.com/ckeditor-cloud-services/).
*
* It is mainly used by the {@link module:easy-image/easyimage~EasyImage} feature.
*
* After enabling this adapter you need to configure the CKEditor Cloud Services integration through
* {@link module:cloud-services/cloudservicesconfig~CloudServicesConfig `config.cloudServices`}.
*/
export declare class CloudServicesUploadAdapter extends Plugin {
	private _uploadGateway?;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "CloudServicesUploadAdapter";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[CloudServices, FileRepository]>;
	/**
	* @inheritDoc
	*/
	init(): void;
}
