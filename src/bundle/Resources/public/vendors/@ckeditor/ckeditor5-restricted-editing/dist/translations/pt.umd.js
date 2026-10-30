/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt' ]: translations } = {"pt":{"dictionary":{"Disable editing":"Desativar a edição","Enable editing":"Ativar edição","Disable inline editing":"Desativar a edição em linha","Enable inline editing":"Ativar a edição em linha","Disable block editing":"Desativar a edição do bloco","Enable block editing":"Ativar a edição do bloco","Previous editable region":"Região editável anterior","Next editable region":"Região editável seguinte","Navigate editable regions":"Navegar regiões editáveis"}}};
e[ 'pt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt' ].dictionary = Object.assign( e[ 'pt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
