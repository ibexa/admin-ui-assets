/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sv' ]: translations } = {"sv":{"dictionary":{"Yellow marker":"Gul markering","Green marker":"Grön markering","Pink marker":"Rosa markering","Blue marker":"Blå markering","Red pen":"Röd penna","Green pen":"Grön penna","Remove highlight":"Ta bort markering","Highlight":"Markera","Text highlight toolbar":"Verktygsfält för textmarkering"}}};
e[ 'sv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sv' ].dictionary = Object.assign( e[ 'sv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
