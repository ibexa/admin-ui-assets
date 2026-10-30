/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ku' ]: translations } = {"ku":{"dictionary":{"Open file manager":"","Cannot determine a category for the uploaded file.":"","Cannot access default workspace.":"","You have no image editing permissions.":"","Edit image":"","Processing the edited image.":"","Server failed to process the image.":"","Failed to determine category of edited image.":""}}};
e[ 'ku' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ku' ].dictionary = Object.assign( e[ 'ku' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ku' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
