/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'cs' ]: translations } = {"cs":{"dictionary":{"Enter fullscreen mode":"Přejít do režimu celé obrazovky","Leave fullscreen mode":"Opustit režim celé obrazovky","Fullscreen mode":"Režim celé obrazovky","Toggle fullscreen mode":"Přepnout režim celé obrazovky","Document outline":"Osnova dokumentu","Connected users":"Připojení uživatelé","Show left sidebar":"Zobrazit levý postranní panel","Hide left sidebar":"Skrýt levý postranní panel","Toggle sidebar":"Přepnout postranní panel"}}};
e[ 'cs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'cs' ].dictionary = Object.assign( e[ 'cs' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'cs' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
