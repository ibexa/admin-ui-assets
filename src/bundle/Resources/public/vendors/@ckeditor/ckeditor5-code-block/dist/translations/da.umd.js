/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'da' ]: translations } = {"da":{"dictionary":{"Insert code block":"Indsæt kodeblok","Plain text":"Plain tekst","Leaving %0 code snippet":"Forlader %0 kodestykke","Entering %0 code snippet":"Indtastning af %0 kodestykke","Entering code snippet":"Indtastning af kodestykke","Leaving code snippet":"Forlader kodestykket","Code block":"Kodeblok"}}};
e[ 'da' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'da' ].dictionary = Object.assign( e[ 'da' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'da' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
