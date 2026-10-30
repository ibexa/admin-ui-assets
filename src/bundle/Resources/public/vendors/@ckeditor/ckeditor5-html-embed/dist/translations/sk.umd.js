/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sk' ]: translations } = {"sk":{"dictionary":{"Insert HTML":"Vložiť kód HTML","HTML snippet":"Kód HTML","Paste raw HTML here...":"Sem vložte kód HTML...","Edit source":"Upraviť zdroj","Save changes":"Uložiť zmeny","No preview available":"Náhľad nie je k dispozícii","Empty snippet content":"Prázdny obsah kódu"}}};
e[ 'sk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sk' ].dictionary = Object.assign( e[ 'sk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
