/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pl' ]: translations } = {"pl":{"dictionary":{"Unlink":"Usuń odnośnik","Link":"Wstaw odnośnik","Link URL":"Adres URL","Link URL must not be empty.":"Adres URL linku nie może być pusty","Link image":"Wstaw odnośnik do obrazka","Link properties":"Właściwości linku","Edit link":"Edytuj odnośnik","Open link in new tab":"Otwórz odnośnik w nowej zakładce","Open in a new tab":"Otwórz w nowej zakładce","Downloadable":"Do pobrania","Create link":"Tworzy link","Move out of a link":"Umożliwia wyjście z linku","Displayed text":"Wyświetlany tekst","No links available":"Brak dostępnych linków","This link has no URL":"Ten link nie ma adresu URL"}}};
e[ 'pl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pl' ].dictionary = Object.assign( e[ 'pl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
