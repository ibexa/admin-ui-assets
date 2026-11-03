/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'es' ]: translations } = {"es":{"dictionary":{"media widget":"Widget de contenido multimedia","Media URL":"URL del contenido multimedia","Paste the media URL in the input.":"Pega la URL del contenido multimedia","Tip: Paste the URL into the content to embed faster.":"Tip: pega la URL dentro del contenido para embeber más rápido","The URL must not be empty.":"La URL no debe estar vacía","This media URL is not supported.":"La URL de este contenido multimedia no está soportada","Insert media":"Insertar contenido multimedia","Media embed":"Inserción de medios","Media":"Multimedia","Media toolbar":"Barra de herramientas de contenido multimedia","Open media in new tab":"Abrir medio en una pestaña nueva","Left aligned media":"Medios alineados a la izquierda","Centered media":"Medios centrados","Right aligned media":"Medios alineados a la derecha","Resize media":"Ajustar el tamaño de los elementos multimedia","Resize media to %0":"Redimensionar el tamaño del elemento multimedia en %0","Resize media to the original size":"Redimensionar el contenido multimedia al tamaño original","Resize media (in %0)":"Redimensionar el tamaño del elemento multimedia (en %0)","Custom media size":"Tamaño de personalizado del elemento multimedia","Media resize list":"Lista de redimensionamiento del contenido multimedia","Media Resize":"Redimensionar elementos multimedia"}}};
e[ 'es' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'es' ].dictionary = Object.assign( e[ 'es' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'es' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
