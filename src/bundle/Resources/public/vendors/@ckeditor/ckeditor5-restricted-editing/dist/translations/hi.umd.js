/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hi' ]: translations } = {"hi":{"dictionary":{"Disable editing":"एडिटिंग अक्षम करें","Enable editing":"Enable editing","Disable inline editing":"इनलाइन संपादन अक्षम करें","Enable inline editing":"इनलाइन संपादन सक्षम करें","Disable block editing":"ब्लॉक संपादन अक्षम करें","Enable block editing":"ब्लॉक संपादन सक्षम करें","Previous editable region":"Previous editable region","Next editable region":"Next editable region","Navigate editable regions":"Navigate editable regions"}}};
e[ 'hi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hi' ].dictionary = Object.assign( e[ 'hi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
