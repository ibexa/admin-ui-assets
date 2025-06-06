/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'id' ]: { dictionary, getPluralForm } } = {"id":{"dictionary":{"Emoji":"Emoji","Show all emoji...":"Tampilkan semua emoji…","Find an emoji (min. 2 characters)":"Temukan emoji (min. 2 karakter)","No emojis were found matching \"%0\".":"Tidak ditemukan emoji yang cocok dengan \"%0\".","Keep on typing to see the emoji.":"Teruskan mengetik untuk melihat emoji.","The query must contain at least two characters.":"Kueri harus berisi setidaknya dua karakter.","Smileys & Expressions":"Smiley & Ekspresi","Gestures & People":"Gerakan & Orang","Animals & Nature":"Hewan & Alam","Food & Drinks":"Makanan & Minuman","Travel & Places":"Perjalanan & Tempat","Activities":"Aktifitas","Objects":"Objek","Symbols":"Simbol","Flags":"Bendera","Select skin tone":"Pilih warna kulit","Default skin tone":"Warna kulit standar","Light skin tone":"Warna kulit cerah","Medium Light skin tone":"Warna kulit cerah sedang","Medium skin tone":"Warna kulit sedang","Medium Dark skin tone":"Warna kulit gelap sedang","Dark skin tone":"Warna kulit gelap","Emoji picker":"Pemilih emoji"},getPluralForm(n){return 0;}}};
e[ 'id' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'id' ].dictionary = Object.assign( e[ 'id' ].dictionary, dictionary );
e[ 'id' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
