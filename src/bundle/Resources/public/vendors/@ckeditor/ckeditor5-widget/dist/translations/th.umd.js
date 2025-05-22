/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'th' ]: { dictionary, getPluralForm } } = {"th":{"dictionary":{"Widget toolbar":"แถมเครื่องมือวิดเจ็ต","Insert paragraph before block":"แทรกย่อหน้าก่อนบล็อก","Insert paragraph after block":"แทรกย่อหน้าหลังบล็อก","Press Enter to type after or press Shift + Enter to type before the widget":"กด Enter เพื่อพิมพ์หลังจาก หรือกด Shift + Enter เพื่อพิมพ์ก่อนหน้าวิดเจ็ต","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"แป้นพิมพ์ลัดที่สามารถใช้ได้เมื่อเลือกวิดเจ็ต (ยกตัวอย่าง: รูปภาพ, ตาราง, ฯลฯ)","Insert a new paragraph directly after a widget":"แทรกย่อหน้าใหม่หลังวิดเจ็ตโดยตรง","Insert a new paragraph directly before a widget":"แทรกย่อหน้าใหม่หน้าวิดเจ็ตโดยตรง","Move the caret to allow typing directly before a widget":"ย้ายสัญลักษณ์คาเร็ตเพื่อให้สามารถพิมพ์ได้ไปอยู่หน้าวิดเจ็ตโดยตรง","Move the caret to allow typing directly after a widget":"ย้ายสัญลักษณ์คาเร็ตเพื่อให้สามารถพิมพ์ได้ไปอยู่หลังวิดเจ็ตโดยตรง","Move focus from an editable area back to the parent widget":"ย้ายโฟกัสจากบริเวณที่แก้ไขได้กลับไปยังวิดเจ็ตแม่"},getPluralForm(n){return 0;}}};
e[ 'th' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'th' ].dictionary = Object.assign( e[ 'th' ].dictionary, dictionary );
e[ 'th' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
