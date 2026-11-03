/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: translations } = {"be":{"dictionary":{"Yellow marker":"Выдзяленне жоўтым маркерам","Green marker":"Выдзяленне зялёным маркерам","Pink marker":"Выдзяленне ружавым маркерам","Blue marker":"Выдзяленне сінім маркерам","Red pen":"Красны колер тэксту","Green pen":"Зялёны колер тэксту","Remove highlight":"Выдаліць выдзяленне","Highlight":"Выдзяленне","Text highlight toolbar":"Панель інструментаў выдзялення тэксту"}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'be' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
