/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'he' ]: translations } = {"he":{"dictionary":{"Enter fullscreen mode":"היכנס למצב מסך מלא","Leave fullscreen mode":"צא ממצב מסך מלא","Fullscreen mode":"מצב מסך מלא","Toggle fullscreen mode":"החלף מצב מסך מלא","Document outline":"מפת מסמך","Connected users":"משתמשים מחוברים","Show left sidebar":"הצג סרגל צד שמאלי","Hide left sidebar":"הסתר סרגל צד שמאלי","Toggle sidebar":"פתיחת/סגירת סרגל הצד"}}};
e[ 'he' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'he' ].dictionary = Object.assign( e[ 'he' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'he' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
