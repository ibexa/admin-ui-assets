/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uz' ]: translations } = {"uz":{"dictionary":{"Font Size":"Shrift hajmi","Tiny":"Juda kichik","Small":"Kichik","Big":"Katta","Huge":"Juda katta","Font Family":"Shriftlar oilasi","Default":"Standart","Font Color":"Shrift rangi","Font Background Color":"Fon rangi","Document colors":"Sahifa rangi"}}};
e[ 'uz' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uz' ].dictionary = Object.assign( e[ 'uz' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uz' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
