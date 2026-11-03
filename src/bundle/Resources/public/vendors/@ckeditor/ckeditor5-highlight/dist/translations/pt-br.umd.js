/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt-br' ]: translations } = {"pt-br":{"dictionary":{"Yellow marker":"Marcador amarelo","Green marker":"Marcador verde","Pink marker":"Marcador rosa","Blue marker":"Marcador azul","Red pen":"Caneta vermelha","Green pen":"Caneta verde","Remove highlight":"Remover marcação","Highlight":"Marcador","Text highlight toolbar":"Ferramentas de marcação"}}};
e[ 'pt-br' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt-br' ].dictionary = Object.assign( e[ 'pt-br' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pt-br' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
