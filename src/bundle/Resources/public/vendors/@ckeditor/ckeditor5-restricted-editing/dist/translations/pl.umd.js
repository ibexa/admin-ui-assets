/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pl' ]: translations } = {"pl":{"dictionary":{"Disable editing":"Zablokuj edycję","Enable editing":"Odblokuj edycję","Disable inline editing":"Zablokuj edycję w tekście","Enable inline editing":"Odblokuj edycję w tekście","Disable block editing":"Zablokuj edycję bloku","Enable block editing":"Odblokuj edycję bloku","Previous editable region":"Poprzednie pole do edycji","Next editable region":"Następne pole do edycji","Navigate editable regions":"Przejdź między polami do edycji"}}};
e[ 'pl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pl' ].dictionary = Object.assign( e[ 'pl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
