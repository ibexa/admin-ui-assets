/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'gl' ]: translations } = {"gl":{"dictionary":{"Yellow marker":"Marcador marelo","Green marker":"Marcador verde","Pink marker":"Marcador rosa","Blue marker":"Marcador azul","Red pen":"Pluma vermella","Green pen":"Pluma verde","Remove highlight":"Retirar o resaltado","Highlight":"Resaltado","Text highlight toolbar":"Barra de ferramentas para resaltar texto"}}};
e[ 'gl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'gl' ].dictionary = Object.assign( e[ 'gl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'gl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
