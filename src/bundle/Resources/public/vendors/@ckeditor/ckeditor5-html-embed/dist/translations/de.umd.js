/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'de' ]: translations } = {"de":{"dictionary":{"Insert HTML":"HTML einfügen","HTML snippet":"HTML-Snippet","Paste raw HTML here...":"Rohes HTML hier einfügen …","Edit source":"Quelle bearbeiten","Save changes":"Änderungen speichern","No preview available":"Keine Vorschau verfügbar","Empty snippet content":"Leerer Snippet-Inhalt"}}};
e[ 'de' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'de' ].dictionary = Object.assign( e[ 'de' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'de' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
