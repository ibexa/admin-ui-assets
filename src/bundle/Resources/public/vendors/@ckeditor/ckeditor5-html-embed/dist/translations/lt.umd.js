/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lt' ]: translations } = {"lt":{"dictionary":{"Insert HTML":"Įkelti HTML","HTML snippet":"HTML iškarpa","Paste raw HTML here...":"Įklijuokite neapdorotą HTML čia...","Edit source":"Redaguoti šaltinį","Save changes":"Išsaugoti pakeitimus","No preview available":"Nėra galimų peržiūrų","Empty snippet content":"Tuščias iškarpos turinys"}}};
e[ 'lt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lt' ].dictionary = Object.assign( e[ 'lt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
