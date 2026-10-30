/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'az' ]: translations } = {"az":{"dictionary":{"Unlink":"Linki sil","Link":"Əlaqələndir","Link URL":"Linkin URL","Link URL must not be empty.":"","Link image":"","Link properties":"","Edit link":"Linki redaktə et","Open link in new tab":"Linki yeni pəncərədə aç","Open in a new tab":"Yeni pəncərədə aç","Downloadable":"Yüklənə bilər","Create link":"","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'az' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'az' ].dictionary = Object.assign( e[ 'az' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'az' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
