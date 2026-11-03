/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'th' ]: translations } = {"th":{"dictionary":{"Insert code block":"เพิ่มโค้ดบล็อก","Plain text":"ข้อความธรรมดา","Leaving %0 code snippet":"รหัสคำสั่งสั้นการออกจาก %0","Entering %0 code snippet":"รหัสคำสั่งสั้นการเข้าสู่ %0","Entering code snippet":"รหัสคำสั่งสั้นการเข้า","Leaving code snippet":"รหัสคำสั่งสั้นการออก","Code block":"บล็อกรหัส"}}};
e[ 'th' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'th' ].dictionary = Object.assign( e[ 'th' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'th' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
