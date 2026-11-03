/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'th' ]: translations } = {"th":{"dictionary":{"Insert image or file":"แทรกรูปภาพหรือไฟล์","Could not obtain resized image URL.":"ไม่สามารถรับ URL ของภาพที่ปรับขนาด","Selecting resized image failed":"การเลือกภาพที่ปรับขนาดล้มเหลว","Could not insert image at the current position.":"ไม่สามารถแทรกภาพที่ตำแหน่งปัจจุบัน","Inserting image failed":"การแทรกภาพล้มเหลว"}}};
e[ 'th' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'th' ].dictionary = Object.assign( e[ 'th' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'th' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
