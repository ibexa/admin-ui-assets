/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'th' ]: { dictionary, getPluralForm } } = {"th":{"dictionary":{"Emoji":"อิโมจิ","Show all emoji...":"แสดงอิโมจิทั้งหมด...","Find an emoji (min. 2 characters)":"ค้นหาอิโมจิ (อักขระอย่างน้อย 2 ตัว)","No emojis were found matching \"%0\".":"ไม่พบอิโมจิที่ตรงกับ \"%0\"","Keep on typing to see the emoji.":"พิมพ์ต่อไปเพื่อดูอิโมจิ","The query must contain at least two characters.":"คำค้นหาต้องมีอักขระอย่างน้อยสองตัว","Smileys & Expressions":"รอยยิ้มและสีหน้า","Gestures & People":"ท่าทางและผู้คน","Animals & Nature":"สัตว์และธรรมชาติ","Food & Drinks":"อาหารและเครื่องดื่ม","Travel & Places":"การเดินทางและสถานที่","Activities":"กิจกรรม","Objects":"วัตถุ","Symbols":"สัญลักษณ์","Flags":"ธง","Select skin tone":"เลือกโทนสีผิว","Default skin tone":"สีผิวเริ่มต้น","Light skin tone":"สีผิวอ่อน","Medium Light skin tone":"สีผิวอ่อนปานกลาง","Medium skin tone":"สีผิวปานกลาง","Medium Dark skin tone":"สีผิวเข้มปานกลาง","Dark skin tone":"สีผิวเข้ม","Emoji picker":"ตัวเลือกอีโมจิ"},getPluralForm(n){return 0;}}};
e[ 'th' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'th' ].dictionary = Object.assign( e[ 'th' ].dictionary, dictionary );
e[ 'th' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
