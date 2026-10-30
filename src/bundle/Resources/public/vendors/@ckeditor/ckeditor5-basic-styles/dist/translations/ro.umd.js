/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ro' ]: translations } = {"ro":{"dictionary":{"Bold":"Îngroșat","Italic":"Cursiv","Underline":"Subliniat","Code":"Cod","Strikethrough":"Tăiere text cu o linie","Subscript":"Indice","Superscript":"Exponent","Italic text":"Text cursiv","Move out of an inline code style":"Ieșirea dintr-un stil de cod inline","Bold text":"Text bold","Underline text":"Text subliniat","Strikethrough text":"Text barat"}}};
e[ 'ro' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ro' ].dictionary = Object.assign( e[ 'ro' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ro' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
