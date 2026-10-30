/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'cs' ]: translations } = {"cs":{"dictionary":{"Insert image or file":"Vložit obrázek nebo soubor","Could not obtain resized image URL.":"Nelze získat URL obrázku se změněnou velikostí.","Selecting resized image failed":"Výběr obrázku se změněnou velikostí selhal","Could not insert image at the current position.":"Na současnou pozici nelze vložit obrázek.","Inserting image failed":"Vložení obrázku selhalo"}}};
e[ 'cs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'cs' ].dictionary = Object.assign( e[ 'cs' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'cs' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
