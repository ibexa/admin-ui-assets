/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module ui/button/filedialogbuttonview
*/
import { View } from "../view.js";
import { ButtonView } from "./buttonview.js";
import type { Constructor, Mixed } from "@ckeditor/ckeditor5-utils";
import { ListItemButtonView } from "./listitembuttonview.js";
/**
* Constructor returned by {@link ~FileDialogViewMixin}. Use it to name a mixin base class before extending it.
*
* ```ts
* const MyFileDialogViewBase: FileDialogViewMixinConstructor<typeof BaseClass> = FileDialogViewMixin( BaseClass );
*
* class MyFileDialogView extends MyFileDialogViewBase {}
* ```
*/
export type FileDialogViewMixinConstructor<Base extends Constructor<ButtonView>> = Mixed<Base, FileDialogButtonViewBase>;
declare const FileDialogButtonViewMixinBase: FileDialogViewMixinConstructor<typeof ButtonView>;
declare const FileDialogListItemButtonViewMixinBase: FileDialogViewMixinConstructor<typeof ListItemButtonView>;
/**
* The file dialog button view.
*
* This component provides a button that opens the native file selection dialog.
* It can be used to implement the UI of a file upload feature.
*
* ```ts
* const view = new FileDialogButtonView( locale );
*
* view.set( {
* 	acceptedType: 'image/*',
* 	allowMultipleFiles: true
* 	label: t( 'Insert image' ),
* 	icon: imageIcon,
* 	tooltip: true
* } );
*
* view.on( 'done', ( evt, files ) => {
* 	for ( const file of Array.from( files ) ) {
* 		console.log( 'Selected file', file );
* 	}
* } );
* ```
*/
export declare class FileDialogButtonView extends FileDialogButtonViewMixinBase {}
/**
* The file dialog button view used in a lists.
*
* This component provides a button that opens the native file selection dialog.
* It can be used to implement the UI of a file upload feature.
*
* ```ts
* const view = new FileDialogListItemButtonView( locale );
*
* view.set( {
* 	acceptedType: 'image/*',
* 	allowMultipleFiles: true
* 	label: t( 'Insert image' ),
* 	icon: imageIcon,
* 	tooltip: true
* } );
*
* view.on( 'done', ( evt, files ) => {
* 	for ( const file of Array.from( files ) ) {
* 		console.log( 'Selected file', file );
* 	}
* } );
* ```
*/
export declare class FileDialogListItemButtonView extends FileDialogListItemButtonViewMixinBase {}
/**
* Mixin function that enhances a base button view class with file dialog functionality. It is used
* to create a button view class that opens the native select file dialog when clicked.
*
* The enhanced view includes a button and a hidden file input. When the button is clicked, the file dialog is opened.
* The mixin adds properties and methods to the base class to handle the file selection.
*
* @param view The base class to be enhanced with file dialog functionality.
* @returns A new class that extends the base class and includes the file dialog functionality.
*/
export declare function FileDialogViewMixin<Base extends Constructor<ButtonView>>(view: Base): FileDialogViewMixinConstructor<Base>;
/**
* Represents the base view for a file dialog button component.
*/
export type FileDialogButtonViewBase = View & {
	/**
	* Accepted file types. Can be provided in form of file extensions, media type or one of:
	* * `audio/*`,
	* * `video/*`,
	* * `image/*`.
	*
	* @observable
	*/
	acceptedType: string;
	/**
	* Indicates if multiple files can be selected. Defaults to `true`.
	*
	* @observable
	*/
	allowMultipleFiles: boolean;
};
/**
* Fired when file dialog is closed with file selected.
*
* ```ts
* view.on( 'done', ( evt, files ) => {
* 	for ( const file of files ) {
* 		console.log( 'Selected file', file );
* 	}
* }
* ```
*/
export type FileInputViewDoneEvent = {
	name: "done";
	args: [files: FileList];
};
export {};
