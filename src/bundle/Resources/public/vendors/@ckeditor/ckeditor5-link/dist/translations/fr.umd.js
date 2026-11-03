/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fr' ]: translations } = {"fr":{"dictionary":{"Unlink":"Supprimer le lien","Link":"Lien","Link URL":"URL du lien","Link URL must not be empty.":"L'URL du lien ne doit pas être vide.","Link image":"Lien d'image","Link properties":"Propriétés du lien","Edit link":"Modifier le lien","Open link in new tab":"Ouvrir le lien dans un nouvel onglet","Open in a new tab":"Ouvrir dans un nouvel onglet","Downloadable":"Fichier téléchargeable","Create link":"Créer un lien","Move out of a link":"Sortir d'un lien","Displayed text":"Texte affiché","No links available":"Aucun lien disponible","This link has no URL":"Ce lien ne possède aucune URL"}}};
e[ 'fr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fr' ].dictionary = Object.assign( e[ 'fr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
