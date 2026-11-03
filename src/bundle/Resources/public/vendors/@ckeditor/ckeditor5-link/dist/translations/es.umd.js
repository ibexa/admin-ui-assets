/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'es' ]: translations } = {"es":{"dictionary":{"Unlink":"Quitar enlace","Link":"Enlace","Link URL":"URL del enlace","Link URL must not be empty.":"La URL del enlace no puede estar vacía.","Link image":"URL de la imagen","Link properties":"Propiedades del enlace","Edit link":"Editar enlace","Open link in new tab":"Abrir enlace en una pestaña nueva","Open in a new tab":"Abrir en una pestaña nueva ","Downloadable":"Descargable","Create link":"Crea un enlace","Move out of a link":"Sale de un enlace","Displayed text":"Texto mostrado","No links available":"No hay enlaces disponibles","This link has no URL":"Este enlace no tiene URL"}}};
e[ 'es' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'es' ].dictionary = Object.assign( e[ 'es' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'es' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
