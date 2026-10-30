/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bs' ]: translations } = {"bs":{"dictionary":{"Open file manager":"","Cannot determine a category for the uploaded file.":"","Cannot access default workspace.":"","You have no image editing permissions.":"","Edit image":"","Processing the edited image.":"","Server failed to process the image.":"","Failed to determine category of edited image.":""}}};
e[ 'bs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bs' ].dictionary = Object.assign( e[ 'bs' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bs' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
