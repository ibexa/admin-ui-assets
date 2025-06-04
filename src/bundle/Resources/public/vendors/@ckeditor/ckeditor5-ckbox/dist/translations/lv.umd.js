/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lv' ]: { dictionary, getPluralForm } } = {"lv":{"dictionary":{"Open file manager":"Atvērt failu pārvaldnieku","Cannot determine a category for the uploaded file.":"Nav iespējams noteikt augšupielādētā faila kategoriju","Cannot access default workspace.":"Nevar piekļūt noklusējuma darbvietai.","You have no image editing permissions.":"Jums nav attēlu rediģēšanas atļaujas.","Edit image":"Rediģēt attēlu","Processing the edited image.":"Rediģētā attēla apstrāde.","Server failed to process the image.":"Serverim neizdevās apstrādāt attēlu.","Failed to determine category of edited image.":"Neizdevās noteikt rediģētā attēla kategoriju."},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n != 0 ? 1 : 2);}}};
e[ 'lv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lv' ].dictionary = Object.assign( e[ 'lv' ].dictionary, dictionary );
e[ 'lv' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
