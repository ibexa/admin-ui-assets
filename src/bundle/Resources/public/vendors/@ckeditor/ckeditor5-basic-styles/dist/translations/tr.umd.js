/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tr' ]: translations } = {"tr":{"dictionary":{"Bold":"Kalın","Italic":"İtalik","Underline":"Altı Çizgili","Code":"Kod","Strikethrough":"Üstü çizili","Subscript":"Alt Simge","Superscript":"Üst Simge","Italic text":"İtalik metin","Move out of an inline code style":"Satır içi kod stilinden çık","Bold text":"Kalın yazı","Underline text":"Metnin altını çiz","Strikethrough text":"Metnin üstünü çiz"}}};
e[ 'tr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tr' ].dictionary = Object.assign( e[ 'tr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
