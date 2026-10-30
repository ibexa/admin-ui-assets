/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'th' ]: translations } = {"th":{"dictionary":{"Align left":"จัดชิดซ้าย","Align right":"จัดชิดขวา","Align center":"จัดกึ่งกลาง","Justify":"จัด(ขอบ)","Text alignment":"จัดตำแหน่งข้อความ","Text alignment toolbar":"แถบเครื่องมือจัดตำแหน่งข้อความ"}}};
e[ 'th' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'th' ].dictionary = Object.assign( e[ 'th' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'th' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
