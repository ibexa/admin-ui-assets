/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'es' ]: translations } = {"es":{"dictionary":{"Disable editing":"Deshabilitar la edición","Enable editing":"Habilitar edición","Disable inline editing":"Deshabilitar la edición en línea","Enable inline editing":"Habilitar la edición en línea","Disable block editing":"Deshabilitar la edición de bloques","Enable block editing":"Habilitar la edición de bloques","Previous editable region":"Anterior zona editable","Next editable region":"Siguiente zona editable","Navigate editable regions":"Navegar por las zonas editables"}}};
e[ 'es' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'es' ].dictionary = Object.assign( e[ 'es' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'es' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
