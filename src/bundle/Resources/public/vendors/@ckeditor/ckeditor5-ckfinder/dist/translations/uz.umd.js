/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uz' ]: translations } = {"uz":{"dictionary":{"Insert image or file":"Rasm yoki faylni kiriting","Could not obtain resized image URL.":"Rasm hajmi o‘zgartirilgan URL manzilini olib bo‘lmadi.","Selecting resized image failed":"Tasdiqlangan o'lchamdagi rasmni tanlash muvaffaqiyatsiz tugadi","Could not insert image at the current position.":"Siz joriy joyga rasm qo'sha olmaysiz.","Inserting image failed":"Rasm qo'shish muvaffaqiyatsiz tugadi"}}};
e[ 'uz' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uz' ].dictionary = Object.assign( e[ 'uz' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uz' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
