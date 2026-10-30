/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: translations } = {"be":{"dictionary":{"Align left":"Выраўнаваць па левым краі","Align right":"Выраўнаваць па правым краі","Align center":"Выраўнаваць па цэнтры","Justify":"Выраўнаваць па шырыні","Text alignment":"Выраўнаваць тэкст","Text alignment toolbar":"Выраўноўванне"}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'be' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
