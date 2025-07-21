/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ca' ]: { dictionary, getPluralForm } } = {"ca":{"dictionary":{"Open file manager":"Obrir el gestor de fitxers","Cannot determine a category for the uploaded file.":"No es pot determinar una categoria per al fitxer penjat.","Cannot access default workspace.":"No es pot accedir a l'espai de treball predeterminat.","You have no image editing permissions.":"No tens permisos d'edició d'imatges.","Edit image":"Edita la imatge","Processing the edited image.":"Tractant la imatge editada.","Server failed to process the image.":"El servidor no ha pogut processar la imatge.","Failed to determine category of edited image.":"No s'ha pogut determinar la categoria de la imatge editada."},getPluralForm(n){return (n != 1);}}};
e[ 'ca' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ca' ].dictionary = Object.assign( e[ 'ca' ].dictionary, dictionary );
e[ 'ca' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
