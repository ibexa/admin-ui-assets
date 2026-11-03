/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'no' ]: translations } = {"no":{"dictionary":{"Bold":"Fet","Italic":"Kursiv","Underline":"Understreket","Code":"Kode","Strikethrough":"Gjennomstreket","Subscript":"Senket skrift","Superscript":"Hevet skrift","Italic text":"Kursiv tekst","Move out of an inline code style":"Gå ut av en intern kodestil","Bold text":"Uthevet tekst","Underline text":"Understreket tekst","Strikethrough text":"Gjennomstreket tekst"}}};
e[ 'no' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'no' ].dictionary = Object.assign( e[ 'no' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'no' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
