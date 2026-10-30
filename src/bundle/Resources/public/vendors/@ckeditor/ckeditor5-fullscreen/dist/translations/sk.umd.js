/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sk' ]: translations } = {"sk":{"dictionary":{"Enter fullscreen mode":"Otvoriť režim celej obrazovky","Leave fullscreen mode":"Opustiť režim celej obrazovky","Fullscreen mode":"Režim celej obrazovky","Toggle fullscreen mode":"Prepnúť režim celej obrazovky","Document outline":"Náčrt dokumentu","Connected users":"Pripojení používatelia","Show left sidebar":"Zobraziť ľavý bočný panel","Hide left sidebar":"Skryť ľavý bočný panel","Toggle sidebar":"Prepnúť bočný panel"}}};
e[ 'sk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sk' ].dictionary = Object.assign( e[ 'sk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
