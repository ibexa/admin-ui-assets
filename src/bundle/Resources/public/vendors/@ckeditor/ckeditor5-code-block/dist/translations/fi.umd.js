/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fi' ]: translations } = {"fi":{"dictionary":{"Insert code block":"Liitä koodilohko","Plain text":"Pelkkä teksti","Leaving %0 code snippet":"Jätetään koodinpätkä %0","Entering %0 code snippet":"Syötetään koodinpätkä %0","Entering code snippet":"Syötetään koodinpätkä","Leaving code snippet":"Jätetään koodinpätkä","Code block":"Koodilohko"}}};
e[ 'fi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fi' ].dictionary = Object.assign( e[ 'fi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
