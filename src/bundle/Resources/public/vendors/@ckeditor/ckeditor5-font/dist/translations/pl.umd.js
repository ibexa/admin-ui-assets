/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pl' ]: translations } = {"pl":{"dictionary":{"Font Size":"Rozmiar czcionki","Tiny":"Bardzo mały","Small":"Mały","Big":"Duży","Huge":"Bardzo duży","Font Family":"Czcionka","Default":"Domyślny","Font Color":"Kolor czcionki","Font Background Color":"Kolor tła czcionki","Document colors":"Kolory dokumentu"}}};
e[ 'pl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pl' ].dictionary = Object.assign( e[ 'pl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
