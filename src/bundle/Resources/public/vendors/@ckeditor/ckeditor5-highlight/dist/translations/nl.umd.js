/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nl' ]: translations } = {"nl":{"dictionary":{"Yellow marker":"Gele marker","Green marker":"Groene marker","Pink marker":"Roze marker","Blue marker":"Blauwe marker","Red pen":"Rode pen","Green pen":"Groene pen","Remove highlight":"Verwijder markering","Highlight":"Markeren","Text highlight toolbar":"Tekst markering werkbalk"}}};
e[ 'nl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nl' ].dictionary = Object.assign( e[ 'nl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'nl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
