/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'es' ]: translations } = {"es":{"dictionary":{"Align left":"Alinear a la izquierda","Align right":"Alinear a la derecha","Align center":"Centrar","Justify":"Justificar","Text alignment":"Alineación del texto","Text alignment toolbar":"Barra de herramientas de alineación del texto"}}};
e[ 'es' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'es' ].dictionary = Object.assign( e[ 'es' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'es' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
