/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ca' ]: { dictionary, getPluralForm } } = {"ca":{"dictionary":{"Insert image or file":"Introduir una imatge o un fitxer","Could not obtain resized image URL.":"No s'ha pogut obtenir l'URL de la imatge redimensionada.","Selecting resized image failed":"S'ha produït un error en seleccionar la imatge redimensionada","Could not insert image at the current position.":"No s'ha pogut inserir la imatge a la posició actual.","Inserting image failed":"No s'ha pogut inserir la imatge"},getPluralForm(n){return (n != 1);}}};
e[ 'ca' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ca' ].dictionary = Object.assign( e[ 'ca' ].dictionary, dictionary );
e[ 'ca' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
