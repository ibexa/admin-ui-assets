/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fr' ]: translations } = {"fr":{"dictionary":{"Enter fullscreen mode":"Accéder au mode plein écran","Leave fullscreen mode":"Quitter le mode plein écran","Fullscreen mode":"Mode plein écran","Toggle fullscreen mode":"Activer/désactiver le mode plein écran","Document outline":"Plan du document","Connected users":"Utilisateurs connectés","Show left sidebar":"Afficher la barre latérale gauche","Hide left sidebar":"Masquer la barre latérale gauche","Toggle sidebar":"Basculer vers la barre latérale"}}};
e[ 'fr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fr' ].dictionary = Object.assign( e[ 'fr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
