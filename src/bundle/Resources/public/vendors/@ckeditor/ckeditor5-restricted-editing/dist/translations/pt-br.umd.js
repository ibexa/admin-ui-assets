/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt-br' ]: translations } = {"pt-br":{"dictionary":{"Disable editing":"Desativar edição","Enable editing":"Ativar edição","Disable inline editing":"Desativar edição em linha","Enable inline editing":"Ativar edição em linha","Disable block editing":"Desativar edição em bloco","Enable block editing":"Ativar edição em bloco","Previous editable region":"Região editável anterior","Next editable region":"Próxima região editável","Navigate editable regions":"Navegar entre regiões editáveis"}}};
e[ 'pt-br' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt-br' ].dictionary = Object.assign( e[ 'pt-br' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pt-br' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
