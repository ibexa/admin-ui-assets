/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'cs' ]: { dictionary, getPluralForm } } = {"cs":{"dictionary":{"Open file manager":"Otevřít správce souborů","Cannot determine a category for the uploaded file.":"Nelze určit kategorii pro nahraný soubor.","Cannot access default workspace.":"Nelze získat přístup k výchozímu pracovišti.","You have no image editing permissions.":"Nemáte oprávnění k úpravám obrázků.","Edit image":"Upravit obrázek","Processing the edited image.":"Zpracování upraveného obrázku.","Server failed to process the image.":"Serveru se nepodařilo zpracovat obrázek.","Failed to determine category of edited image.":"Nepodařilo se určit kategorii upraveného obrázku."},getPluralForm(n){return (n == 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2);}}};
e[ 'cs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'cs' ].dictionary = Object.assign( e[ 'cs' ].dictionary, dictionary );
e[ 'cs' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
