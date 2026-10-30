/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fi' ]: translations } = {"fi":{"dictionary":{"Bold":"Lihavointi","Italic":"Kursivointi","Underline":"Alleviivaus","Code":"Koodi","Strikethrough":"Yliviivaus","Subscript":"Alaindeksi","Superscript":"Yläindeksi","Italic text":"Kursivoitu teksti","Move out of an inline code style":"Siirry pois rivinsisäisestä koodista","Bold text":"Lihavoitu teksti","Underline text":"Alleviivattu teksti","Strikethrough text":"Yliviivattu teksti"}}};
e[ 'fi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fi' ].dictionary = Object.assign( e[ 'fi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
