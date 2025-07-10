/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'de' ]: { dictionary, getPluralForm } } = {"de":{"dictionary":{"Widget toolbar":"Widget Werkzeugleiste","Insert paragraph before block":"Absatz vor Block einfügen","Insert paragraph after block":"Absatz nach Block einfügen","Press Enter to type after or press Shift + Enter to type before the widget":"Drücken Sie die Eingabetaste, um nach dem Widget zu tippen oder Shift + Eingabetaste, um vor dem Widget zu tippen.","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Tastatureingaben, die verwendet werden können, wenn ein Widget ausgewählt wurde (zum Beispiel: Bilder, Tabellen etc.)","Insert a new paragraph directly after a widget":"Einen neuen Abschnitt direkt nach einem Widget einfügen","Insert a new paragraph directly before a widget":"Einen neuen Abschnitt direkt vor einem Widget einfügen","Move the caret to allow typing directly before a widget":"Verschieben Sie den Textcursor, um die Eingabe direkt nach dem Widget zu erlauben","Move the caret to allow typing directly after a widget":"Verschieben Sie den Textcursor, um die direkte Eingabe nach dem Widget zu erlauben","Move focus from an editable area back to the parent widget":"Bewegen Sie den Fokus von einem bearbeitbaren Bereich zurück zum übergeordneten Widget"},getPluralForm(n){return (n != 1);}}};
e[ 'de' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'de' ].dictionary = Object.assign( e[ 'de' ].dictionary, dictionary );
e[ 'de' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
