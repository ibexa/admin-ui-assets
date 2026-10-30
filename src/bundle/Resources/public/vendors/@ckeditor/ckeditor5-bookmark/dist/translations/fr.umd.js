/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fr' ]: translations } = {"fr":{"dictionary":{"Bookmark":"Favori","Edit bookmark":"Modifier le favori","Remove bookmark":"Supprimer le favori","Bookmark name":"Nom du favori","Enter the bookmark name without spaces.":"Saisir un nom de favori sans espaces.","Bookmark must not be empty.":"Le favori ne doit pas être vide.","Bookmark name cannot contain space characters.":"Le nom d'un favori ne peut pas contenir d'espaces.","Bookmark name already exists.":"Le nom du favori existe déjà.","bookmark widget":"widget pour favori","Bookmark toolbar":"Barre d'outils des signets","Bookmarks":"Signets","No bookmarks available.":"Aucun signet disponible.","Scroll to bookmark":"Faire défiler jusqu'au signet"}}};
e[ 'fr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fr' ].dictionary = Object.assign( e[ 'fr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
