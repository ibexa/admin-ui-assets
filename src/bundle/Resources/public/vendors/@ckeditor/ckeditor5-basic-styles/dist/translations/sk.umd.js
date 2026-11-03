/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sk' ]: translations } = {"sk":{"dictionary":{"Bold":"Tučné","Italic":"Kurzíva","Underline":"Podčiarknuté","Code":"Kód","Strikethrough":"Preškrtnuté","Subscript":"Dolný index","Superscript":"Horný index","Italic text":"Kurzíva","Move out of an inline code style":"Presunúť mimo vloženého kódu","Bold text":"Tučný text","Underline text":"Podčiarknutý text","Strikethrough text":"Prečiarknutý text"}}};
e[ 'sk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sk' ].dictionary = Object.assign( e[ 'sk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
