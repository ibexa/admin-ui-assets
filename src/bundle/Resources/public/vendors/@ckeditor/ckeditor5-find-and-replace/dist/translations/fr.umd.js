/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fr' ]: translations } = {"fr":{"dictionary":{"Find and replace":"Rechercher et remplacer","Find in text…":"Rechercher dans le texte...","Find":"Rechercher","Previous result":"Résultat précédent","Next result":"Résultat suivant","Replace":"Remplacer","Replace all":"Remplacer tout","Match case":"Sensible à la casse","Whole words only":"Mots entiers uniquement","Replace with…":"Remplacer par ...","Text to find must not be empty.":"L'expression à rechercher ne doit pas être vide","Tip: Find some text first in order to replace it.":"Astuce : rechercher une expression afin de la remplacer","Advanced options":"Options avancées","Find in the document":"Rechercher dans le document"}}};
e[ 'fr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fr' ].dictionary = Object.assign( e[ 'fr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
