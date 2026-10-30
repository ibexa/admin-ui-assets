/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pl' ]: translations } = {"pl":{"dictionary":{"Insert HTML":"Wstaw kod HTML","HTML snippet":"Kod HTML","Paste raw HTML here...":"Wstaw tutaj czysty kod HTML...","Edit source":"Edytuj źródło","Save changes":"Zapisz zmiany","No preview available":"Podgląd nie jest dostępny","Empty snippet content":"Brak kodu"}}};
e[ 'pl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pl' ].dictionary = Object.assign( e[ 'pl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
