/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: translations } = {"sr":{"dictionary":{"Enter fullscreen mode":"Uđite u režim celog ekrana","Leave fullscreen mode":"Napustite režim celog ekrana","Fullscreen mode":"Režim celog ekrana","Toggle fullscreen mode":"Uključite režim celog ekrana","Document outline":"Struktura dokumenta","Connected users":"Povezani korisnici","Show left sidebar":"Prikaži levu bočnu traku","Hide left sidebar":"Sakrij levu bočnu traku","Toggle sidebar":"Prebaci na bočnu traku"}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
