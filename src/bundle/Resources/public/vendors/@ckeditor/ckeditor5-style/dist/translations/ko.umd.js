/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ko' ]: translations } = {"ko":{"dictionary":{"Styles":"스타일","Multiple styles":"다중 스타일","Block styles":"블록 스타일","Text styles":"텍스트 스타일"}}};
e[ 'ko' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ko' ].dictionary = Object.assign( e[ 'ko' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ko' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
