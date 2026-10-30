/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'da' ]: translations } = {"da":{"dictionary":{"Insert HTML":"Indsæt HTML","HTML snippet":"HTML-uddrag","Paste raw HTML here...":"Indsæt rå HTML her...","Edit source":"Rediger kilde","Save changes":"Gem ændringer","No preview available":"Ingen forhåndsvisning tilgængelig","Empty snippet content":"Tøm uddragsindhold"}}};
e[ 'da' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'da' ].dictionary = Object.assign( e[ 'da' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'da' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
