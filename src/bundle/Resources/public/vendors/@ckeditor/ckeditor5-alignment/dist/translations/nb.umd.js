/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nb' ]: translations } = {"nb":{"dictionary":{"Align left":"Venstrejuster","Align right":"Høyrejuster","Align center":"Midstill","Justify":"Blokkjuster","Text alignment":"Tekstjustering","Text alignment toolbar":""}}};
e[ 'nb' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nb' ].dictionary = Object.assign( e[ 'nb' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'nb' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
