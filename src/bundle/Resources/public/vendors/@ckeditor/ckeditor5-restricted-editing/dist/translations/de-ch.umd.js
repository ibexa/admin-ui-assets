/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'de-ch' ]: translations } = {"de-ch":{"dictionary":{"Disable editing":"","Enable editing":"Bearbeitung zulassen","Disable inline editing":"","Enable inline editing":"","Disable block editing":"","Enable block editing":"","Previous editable region":"Vorheriger bearbeitbarer Bereich","Next editable region":"Nächster bearbeitbarer Bereich","Navigate editable regions":"Durch bearbeitbare Bereiche navigieren"}}};
e[ 'de-ch' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'de-ch' ].dictionary = Object.assign( e[ 'de-ch' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'de-ch' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
