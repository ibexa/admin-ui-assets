/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ro' ]: { dictionary, getPluralForm } } = {"ro":{"dictionary":{"Open file manager":"Deschidere manager fișiere","Cannot determine a category for the uploaded file.":"Categoria fișierului încărcat nu poate fi stabilită.","Cannot access default workspace.":"Nu poți accesa spațiul de lucru implicit.","You have no image editing permissions.":"Nu aveți permisiuni de editare a imaginilor.","Edit image":"Editare imagine","Processing the edited image.":"Se procesează imaginea editată.","Server failed to process the image.":"Serverul nu a putut procesa imaginea.","Failed to determine category of edited image.":"Nu s-a putut determina categoria imaginii editate."},getPluralForm(n){return (n == 1 ? 0 : (n == 0 || (n % 100 > 0 && n % 100 < 20)) ? 1 : 2);}}};
e[ 'ro' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ro' ].dictionary = Object.assign( e[ 'ro' ].dictionary, dictionary );
e[ 'ro' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
