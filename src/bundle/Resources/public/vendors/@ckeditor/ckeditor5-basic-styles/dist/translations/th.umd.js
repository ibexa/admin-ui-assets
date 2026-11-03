/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'th' ]: translations } = {"th":{"dictionary":{"Bold":"ตัวหนา","Italic":"ตัวเอียง","Underline":"ขีดเส้นใต้","Code":"โค้ด","Strikethrough":"ขีดทับ","Subscript":"ตัวห้อย","Superscript":"ตัวยก","Italic text":"ข้อความเอียง","Move out of an inline code style":"ย้ายออกจากสไตล์โค้ดแบบอินไลน์","Bold text":"ทำข้อความเป็นตัวหนา","Underline text":"ขีดเส้นใต้ข้อความ","Strikethrough text":"ขีดทับข้อความ"}}};
e[ 'th' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'th' ].dictionary = Object.assign( e[ 'th' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'th' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
