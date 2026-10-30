/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'eo' ]: translations } = {"eo":{"dictionary":{"Heading":"Ĉapo","Choose heading":"Elektu ĉapon","Heading 1":"Ĉapo 1","Heading 2":"Ĉapo 2","Heading 3":"Ĉapo 3","Heading 4":"","Heading 5":"","Heading 6":"","Type your title":"","Type or paste your content here.":""}}};
e[ 'eo' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'eo' ].dictionary = Object.assign( e[ 'eo' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'eo' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
