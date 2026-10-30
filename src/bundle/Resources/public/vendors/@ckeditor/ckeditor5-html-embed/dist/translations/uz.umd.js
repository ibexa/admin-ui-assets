/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uz' ]: translations } = {"uz":{"dictionary":{"Insert HTML":"HTML kiritish","HTML snippet":"HTML snippet","Paste raw HTML here...":"HTML kodini shu yerga joylashtiring...","Edit source":"Kodni o'zgartirish","Save changes":"O'zgarishlarni saqlash","No preview available":"","Empty snippet content":""}}};
e[ 'uz' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uz' ].dictionary = Object.assign( e[ 'uz' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uz' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
