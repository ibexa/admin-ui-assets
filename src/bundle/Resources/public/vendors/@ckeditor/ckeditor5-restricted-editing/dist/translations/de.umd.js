/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'de' ]: translations } = {"de":{"dictionary":{"Disable editing":"Bearbeitung deaktivieren","Enable editing":"Bearbeitung zulassen","Disable inline editing":"Inline-Bearbeitung deaktivieren","Enable inline editing":"Inline-Bearbeitung aktivieren","Disable block editing":"Blockbearbeitung deaktivieren","Enable block editing":"Blockbearbeitung aktivieren","Previous editable region":"Vorheriger bearbeitbarer Bereich","Next editable region":"Nächster bearbeitbarer Bereich","Navigate editable regions":"Durch bearbeitbare Bereiche navigieren"}}};
e[ 'de' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'de' ].dictionary = Object.assign( e[ 'de' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'de' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
