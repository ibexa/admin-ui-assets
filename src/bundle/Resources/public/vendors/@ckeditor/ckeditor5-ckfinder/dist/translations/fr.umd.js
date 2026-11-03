/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fr' ]: translations } = {"fr":{"dictionary":{"Insert image or file":"Insérer une image ou un fichier","Could not obtain resized image URL.":"Impossible d'obtenir l'image redimensionnée","Selecting resized image failed":"La sélection de l'image redimensionnée a échoué.","Could not insert image at the current position.":"Impossible d'insérer l'image à la position courante.","Inserting image failed":"L'insertion d'image a échoué."}}};
e[ 'fr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fr' ].dictionary = Object.assign( e[ 'fr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
