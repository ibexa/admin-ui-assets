/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'cs' ]: { dictionary, getPluralForm } } = {"cs":{"dictionary":{"Yellow marker":"Žlutý fix","Green marker":"Zelený fix","Pink marker":"Růžový fix","Blue marker":"Modrý fix","Red pen":"Červený fix","Green pen":"Zelené pero","Remove highlight":"Odstranit zvýraznění","Highlight":"Zvýraznění","Text highlight toolbar":"Panel nástrojů zvýraznění textu"},getPluralForm(n){return (n == 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2);}}};
e[ 'cs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'cs' ].dictionary = Object.assign( e[ 'cs' ].dictionary, dictionary );
e[ 'cs' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
