/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ku' ]: translations } = {"ku":{"dictionary":{"Unlink":"لابردنی بەستەر","Link":"بەستەر","Link URL":"ناونیشانی بەستەر","Link URL must not be empty.":"","Link image":"","Link properties":"","Edit link":"دەستکاری بەستەر","Open link in new tab":"کردنەوەی بەستەرەکە لە پەڕەیەکی نوێ","Open in a new tab":"کردنەوەی لە پەنجەرەیەکی نوێ","Downloadable":"Downloadable","Create link":"","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'ku' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ku' ].dictionary = Object.assign( e[ 'ku' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ku' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
