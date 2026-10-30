/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ug' ]: translations } = {"ug":{"dictionary":{"Font Size":"خەت چوڭلۇقى","Tiny":"ئەڭ كىچىك","Small":"كىچىك","Big":"چوڭ","Huge":"زور","Font Family":"خەت نۇسخىسى","Default":"سۈكۈتتىكى","Font Color":"خەت رەڭگى","Font Background Color":"خەت تەگلىك رەڭگى","Document colors":"پۈتۈك رەڭگى"}}};
e[ 'ug' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ug' ].dictionary = Object.assign( e[ 'ug' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ug' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
