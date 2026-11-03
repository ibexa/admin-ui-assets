/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'he' ]: translations } = {"he":{"dictionary":{"Insert HTML":"הכנס HTML","HTML snippet":"קטע HTML","Paste raw HTML here...":"הדביקו כאן HTML גולמי...","Edit source":"ערוך מקור","Save changes":"שמור שינויים","No preview available":"אין תצוגה מקדימה זמינה","Empty snippet content":"תוכן קטע ריק"}}};
e[ 'he' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'he' ].dictionary = Object.assign( e[ 'he' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'he' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
