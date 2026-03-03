/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'th' ]: { dictionary, getPluralForm } } = {"th":{"dictionary":{"Enter fullscreen mode":"เข้าสู่โหมดเต็มหน้าจอ","Leave fullscreen mode":"ออกจากโหมดเต็มหน้าจอ","Fullscreen mode":"โหมดเต็มหน้าจอ","Toggle fullscreen mode":"สลับโหมดเต็มหน้าจอ","Document outline":"โครงร่างของเอกสาร","Connected users":"ผู้ใช้ที่เชื่อมต่ออยู่"},getPluralForm(n){return 0;}}};
e[ 'th' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'th' ].dictionary = Object.assign( e[ 'th' ].dictionary, dictionary );
e[ 'th' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
