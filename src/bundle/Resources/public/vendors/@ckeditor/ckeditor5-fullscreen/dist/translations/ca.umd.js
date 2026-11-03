/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ca' ]: translations } = {"ca":{"dictionary":{"Enter fullscreen mode":"Mode Entra a la pantalla completa","Leave fullscreen mode":"Surt del mode de pantalla completa","Fullscreen mode":"Mode de pantalla completa","Toggle fullscreen mode":"Activa el mode de pantalla completa","Document outline":"Esquema del document","Connected users":"Usuaris connectats","Show left sidebar":"Mostrar el menú lateral esquerra","Hide left sidebar":"Amagar el menú lateral esquerra","Toggle sidebar":"Alternar al menú lateral"}}};
e[ 'ca' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ca' ].dictionary = Object.assign( e[ 'ca' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ca' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
