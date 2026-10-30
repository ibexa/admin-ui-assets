/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lt' ]: translations } = {"lt":{"dictionary":{"Enter fullscreen mode":"Eiti į viso ekrano režimą","Leave fullscreen mode":"Išeiti iš viso ekrano režimo","Fullscreen mode":"Viso ekrano režimas","Toggle fullscreen mode":"Perjungti viso ekrano režimą","Document outline":"Dokumento metmenys","Connected users":"Prisijungę naudotojai","Show left sidebar":"Rodyti kairę šoninę juostą","Hide left sidebar":"Slėpti kairę šoninę juostą","Toggle sidebar":"Perjungti šoninę juostą"}}};
e[ 'lt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lt' ].dictionary = Object.assign( e[ 'lt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
