/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nl' ]: { dictionary, getPluralForm } } = {"nl":{"dictionary":{"Insert code block":"Codeblok invoegen","Plain text":"Platte tekst","Leaving %0 code snippet":"Codesnippet %0 verlaten","Entering %0 code snippet":"Codesnippet %0 invoeren","Entering code snippet":"Codesnippet invoeren","Leaving code snippet":"Codesnippet verlaten","Code block":"Codeblok"},getPluralForm(n){return (n != 1);}}};
e[ 'nl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nl' ].dictionary = Object.assign( e[ 'nl' ].dictionary, dictionary );
e[ 'nl' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
