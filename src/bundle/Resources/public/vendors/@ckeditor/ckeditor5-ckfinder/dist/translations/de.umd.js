/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'de' ]: { dictionary, getPluralForm } } = {"de":{"dictionary":{"Insert image or file":"Bild oder Datei einfügen","Could not obtain resized image URL.":"Die URL des angepassten Bildes konnte nicht abgerufen werden.","Selecting resized image failed":"Das angepasste Bild konnte nicht ausgewählt werden.","Could not insert image at the current position.":"Das Bild konnte an der aktuellen Position nicht eingefügt werden.","Inserting image failed":"Einfügen des Bildes fehlgeschlagen"},getPluralForm(n){return (n != 1);}}};
e[ 'de' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'de' ].dictionary = Object.assign( e[ 'de' ].dictionary, dictionary );
e[ 'de' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
