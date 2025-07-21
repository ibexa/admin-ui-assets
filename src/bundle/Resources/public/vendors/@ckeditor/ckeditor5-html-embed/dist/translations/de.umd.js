/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'de' ]: { dictionary, getPluralForm } } = {"de":{"dictionary":{"Insert HTML":"HTML einfügen","HTML snippet":"HTML-Snippet","Paste raw HTML here...":"Rohes HTML hier einfügen …","Edit source":"Quelle bearbeiten","Save changes":"Änderungen speichern","No preview available":"Keine Vorschau verfügbar","Empty snippet content":"Leerer Snippet-Inhalt"},getPluralForm(n){return (n != 1);}}};
e[ 'de' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'de' ].dictionary = Object.assign( e[ 'de' ].dictionary, dictionary );
e[ 'de' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
