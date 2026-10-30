/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'id' ]: translations } = {"id":{"dictionary":{"Insert a soft break (a <code>&lt;br&gt;</code> element)":"Sisipkan soft break (elemen <code>&lt;br&gt;</code> )","Insert a hard break (a new paragraph)":"Sisipkan hard break (paragraf baru)"}}};
e[ 'id' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'id' ].dictionary = Object.assign( e[ 'id' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'id' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
