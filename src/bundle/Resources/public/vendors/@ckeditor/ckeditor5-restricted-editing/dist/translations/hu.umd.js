/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hu' ]: translations } = {"hu":{"dictionary":{"Disable editing":"Szerkesztés letiltása","Enable editing":"Szerkesztés engedélyezése","Disable inline editing":"Közvetlen szerkesztés letiltása","Enable inline editing":"Közvetlen szerkesztés engedélyezése","Disable block editing":"Blokk szerkesztésének letiltása","Enable block editing":"Blokk szerkesztésének engedélyezése","Previous editable region":"Előző szerkeszthető terület","Next editable region":"Következő szerkeszthető terület","Navigate editable regions":"Szerkeszthető területek navigálása"}}};
e[ 'hu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hu' ].dictionary = Object.assign( e[ 'hu' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hu' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
