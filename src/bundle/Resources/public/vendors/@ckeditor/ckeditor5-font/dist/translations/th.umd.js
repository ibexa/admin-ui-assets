/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'th' ]: translations } = {"th":{"dictionary":{"Font Size":"ขนาดข้อความ","Tiny":"เล็กมาก","Small":"เล็ก","Big":"ใหญ่","Huge":"ใหญ่มาก","Font Family":"แบบอักษร","Default":"ค่าเริ่มต้น","Font Color":"สีข้อความ","Font Background Color":"สีพื้นหลังข้อความ","Document colors":"สีเอกสาร"}}};
e[ 'th' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'th' ].dictionary = Object.assign( e[ 'th' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'th' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
