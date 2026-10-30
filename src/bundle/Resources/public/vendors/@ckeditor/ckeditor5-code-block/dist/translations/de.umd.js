/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'de' ]: translations } = {"de":{"dictionary":{"Insert code block":"Code-Block einfügen","Plain text":"Nur Text","Leaving %0 code snippet":"%0 Code-Ausschnitt verlassen","Entering %0 code snippet":"%0 Code-Ausschnitt eingeben","Entering code snippet":"Code-Ausschnit eingeben","Leaving code snippet":"Code-Ausschnit verlassen","Code block":"Codeblock"}}};
e[ 'de' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'de' ].dictionary = Object.assign( e[ 'de' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'de' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
