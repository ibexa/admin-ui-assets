/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'de-ch' ]: translations } = {"de-ch":{"dictionary":{"Insert image or file":"Bild oder Datei einfügen","Could not obtain resized image URL.":"Die URL des angepassten Bildes konnte nicht abgerufen werden.","Selecting resized image failed":"Das angepasste Bild konnte nicht ausgewählt werden.","Could not insert image at the current position.":"Das Bild konnte an der aktuellen Position nicht eingefügt werden.","Inserting image failed":"Einfügen des Bildes fehlgeschlagen"}}};
e[ 'de-ch' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'de-ch' ].dictionary = Object.assign( e[ 'de-ch' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'de-ch' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
