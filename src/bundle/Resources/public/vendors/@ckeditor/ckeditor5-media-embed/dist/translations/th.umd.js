/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'th' ]: translations } = {"th":{"dictionary":{"media widget":"วิดเจ็ตสื่อ","Media URL":"URL สื่อ","Paste the media URL in the input.":"วาง URL สื่อในอินพุต","Tip: Paste the URL into the content to embed faster.":"เคล็ดลับ: การวาง URL ลงในเนื้อหาจะช่วยให้ฝังได้เร็วขึ้น","The URL must not be empty.":"URL ต้องไม่ว่างเปล่า","This media URL is not supported.":"ไม่รองรับ URL ของสื่อนี้","Insert media":"แทรกสื่อ","Media embed":"สื่อที่ฝัง","Media":"สื่อ","Media toolbar":"แถบเครื่องมือสื่อ","Open media in new tab":"เปิดสื่อในแท็บใหม่","Left aligned media":"สื่อที่จัดชิดซ้าย","Centered media":"สื่อจัดวางกึ่งกลาง","Right aligned media":"สื่อที่จัดชิดขวา","Resize media":"ปรับขนาดสื่อ","Resize media to %0":"ปรับขนาดสื่อเป็น %0","Resize media to the original size":"ปรับขนาดสื่อเป็นขนาดเริ่มต้น","Resize media (in %0)":"ปรับขนาดสื่อ (ใน %0)","Custom media size":"ขนาดสื่อแบบกำหนดเอง","Media resize list":"รายการปรับขนาดสื่อ","Media Resize":"ปรับขนาดสื่อ"}}};
e[ 'th' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'th' ].dictionary = Object.assign( e[ 'th' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'th' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
