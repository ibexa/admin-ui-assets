/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'cs' ]: translations } = {"cs":{"dictionary":{"Yellow marker":"Žlutý fix","Green marker":"Zelený fix","Pink marker":"Růžový fix","Blue marker":"Modrý fix","Red pen":"Červený fix","Green pen":"Zelené pero","Remove highlight":"Odstranit zvýraznění","Highlight":"Zvýraznění","Text highlight toolbar":"Panel nástrojů zvýraznění textu"}}};
e[ 'cs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'cs' ].dictionary = Object.assign( e[ 'cs' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'cs' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
