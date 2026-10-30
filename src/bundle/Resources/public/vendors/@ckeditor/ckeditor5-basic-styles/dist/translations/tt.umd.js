/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tt' ]: translations } = {"tt":{"dictionary":{"Bold":"Калын","Italic":"Курсив","Underline":"Ассызыклау","Code":"Код","Strikethrough":"Сызылган","Subscript":"","Superscript":"","Italic text":"Курсив текст","Move out of an inline code style":"","Bold text":"Калын текст","Underline text":"Ассызыклы текст","Strikethrough text":"Сызылган текст"}}};
e[ 'tt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tt' ].dictionary = Object.assign( e[ 'tt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
