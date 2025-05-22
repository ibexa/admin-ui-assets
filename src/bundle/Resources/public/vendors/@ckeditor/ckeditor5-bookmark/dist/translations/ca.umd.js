/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ca' ]: { dictionary, getPluralForm } } = {"ca":{"dictionary":{"Bookmark":"Marcador","Edit bookmark":"Edita el marcador","Remove bookmark":"Elimina el marcador","Bookmark name":"Nom del marcador","Enter the bookmark name without spaces.":"Introdueix el nom del marcador sense espais.","Bookmark must not be empty.":"El marcador no pot estar buit.","Bookmark name cannot contain space characters.":"El nom del marcador no pot contenir espais.","Bookmark name already exists.":"El nom del marcador ja existeix.","bookmark widget":"giny de marcador","Bookmark toolbar":"Barra d'eines d'adreces d'interès","Bookmarks":"Adreces d'interès","No bookmarks available.":"No hi ha cap adreça d'interès disponible.","Scroll to bookmark":"Desplaça't fins a les adreces d'interès"},getPluralForm(n){return (n != 1);}}};
e[ 'ca' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ca' ].dictionary = Object.assign( e[ 'ca' ].dictionary, dictionary );
e[ 'ca' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
