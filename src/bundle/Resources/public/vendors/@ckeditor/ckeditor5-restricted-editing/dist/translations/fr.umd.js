/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fr' ]: translations } = {"fr":{"dictionary":{"Disable editing":"Désactiver la modification","Enable editing":"Activer l'édition","Disable inline editing":"Désactiver la modification en ligne","Enable inline editing":"Activer la modification en ligne","Disable block editing":"Désactiver la modification par blocs","Enable block editing":"Activer la modification par blocs","Previous editable region":"Région éditable précédente","Next editable region":"Région éditable suivante","Navigate editable regions":"Naviguer vers"}}};
e[ 'fr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fr' ].dictionary = Object.assign( e[ 'fr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
