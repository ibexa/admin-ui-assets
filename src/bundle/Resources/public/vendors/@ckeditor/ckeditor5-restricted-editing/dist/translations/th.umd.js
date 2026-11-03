/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'th' ]: translations } = {"th":{"dictionary":{"Disable editing":"ปิดใช้งานการแก้ไข","Enable editing":"เปิดใช้งานการแก้ไข","Disable inline editing":"ปิดใช้งานการแก้ไขแบบอินไลน์","Enable inline editing":"เปิดใช้งานการแก้ไขแบบอินไลน์","Disable block editing":"ปิดใช้งานการแก้ไขแบบบล็อก","Enable block editing":"เปิดใช้งานการแก้ไขแบบบล็อก","Previous editable region":"พื้นที่ซึ่งสามารถแก้ไขได้ก่อนหน้านี้","Next editable region":"พื้นที่ซึ่งสามารถแก้ไขได้ถัดไป","Navigate editable regions":"นำทางไปยังพื้นที่ซึ่งสามารถแก้ไขได้"}}};
e[ 'th' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'th' ].dictionary = Object.assign( e[ 'th' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'th' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
