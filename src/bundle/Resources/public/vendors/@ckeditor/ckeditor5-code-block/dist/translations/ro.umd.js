/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ro' ]: { dictionary, getPluralForm } } = {"ro":{"dictionary":{"Insert code block":"Inserează un bloc code","Plain text":"Text simplu","Leaving %0 code snippet":"Ieșire din fragmentul de cod %0","Entering %0 code snippet":"Intrare în fragmentul de cod %0","Entering code snippet":"Intrare în fragmentul de cod","Leaving code snippet":"Ieșire din fragmentul de cod","Code block":"Bloc de cod"},getPluralForm(n){return (n == 1 ? 0 : (n == 0 || (n % 100 > 0 && n % 100 < 20)) ? 1 : 2);}}};
e[ 'ro' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ro' ].dictionary = Object.assign( e[ 'ro' ].dictionary, dictionary );
e[ 'ro' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
