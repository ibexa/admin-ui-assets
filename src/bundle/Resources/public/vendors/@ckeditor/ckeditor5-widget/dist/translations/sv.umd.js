/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sv' ]: { dictionary, getPluralForm } } = {"sv":{"dictionary":{"Widget toolbar":"Widgetverktygsfält","Insert paragraph before block":"Infoga stycke före block","Insert paragraph after block":"Infoga stycke efter block","Press Enter to type after or press Shift + Enter to type before the widget":"Tryck på retur för att skriva efter eller på skift + retur för att skriva före widgeten.","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Tangenter som kan användas när en widget är vald (till exempel: bild, tabell m.m.)","Insert a new paragraph directly after a widget":"Påbörja nytt stycke direkt efter en widget","Insert a new paragraph directly before a widget":"Påbörja nytt stycke direkt före en widget","Move the caret to allow typing directly before a widget":"Flytta textmarkören för att kunna skriva direkt före en widget","Move the caret to allow typing directly after a widget":"Flytta textmarkören för att kunna skriva direkt efter en widget","Move focus from an editable area back to the parent widget":"Flytta fokus från ett redigerbart område tillbaka till moderswidgeten"},getPluralForm(n){return (n != 1);}}};
e[ 'sv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sv' ].dictionary = Object.assign( e[ 'sv' ].dictionary, dictionary );
e[ 'sv' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
