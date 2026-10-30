/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fr' ]: translations } = {"fr":{"dictionary":{"Insert a soft break (a <code>&lt;br&gt;</code> element)":"Insérer un saut progressif (un élément <code> <br> </code> )","Insert a hard break (a new paragraph)":"Insérer une pause (un nouveau paragraphe)"}}};
e[ 'fr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fr' ].dictionary = Object.assign( e[ 'fr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
