/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'es-co' ]: translations } = {"es-co":{"dictionary":{"Yellow marker":"Marcador amarillo","Green marker":"Marcador verde","Pink marker":"Marcador rosa","Blue marker":"Marcador azul","Red pen":"Pincel rojo","Green pen":"Pincel verde","Remove highlight":"Quitar resaltado","Highlight":"Resaltar","Text highlight toolbar":"Herramientas de resaltado de texto"}}};
e[ 'es-co' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'es-co' ].dictionary = Object.assign( e[ 'es-co' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'es-co' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
