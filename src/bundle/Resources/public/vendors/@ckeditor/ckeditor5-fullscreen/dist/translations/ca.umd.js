/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ca' ]: { dictionary, getPluralForm } } = {"ca":{"dictionary":{"Enter fullscreen mode":"Mode Entra a la pantalla completa","Leave fullscreen mode":"Surt del mode de pantalla completa","Fullscreen mode":"Mode de pantalla completa","Toggle fullscreen mode":"Activa el mode de pantalla completa","Document outline":"Esquema del document","Connected users":"Usuaris connectats"},getPluralForm(n){return (n != 1);}}};
e[ 'ca' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ca' ].dictionary = Object.assign( e[ 'ca' ].dictionary, dictionary );
e[ 'ca' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
