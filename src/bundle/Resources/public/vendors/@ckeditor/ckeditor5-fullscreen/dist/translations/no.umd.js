/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'no' ]: translations } = {"no":{"dictionary":{"Enter fullscreen mode":"Gå til fullskjermmodus","Leave fullscreen mode":"Forlat fullskjermmodus","Fullscreen mode":"Fullskjermmodus","Toggle fullscreen mode":"Bytt fullskjermmodus","Document outline":"Dokumentoversikt","Connected users":"Tilkoblede brukere","Show left sidebar":"Vis venstre sidestolpe","Hide left sidebar":"Skjul venstre sidestolpe","Toggle sidebar":"Vis/skjul sidemeny"}}};
e[ 'no' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'no' ].dictionary = Object.assign( e[ 'no' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'no' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
