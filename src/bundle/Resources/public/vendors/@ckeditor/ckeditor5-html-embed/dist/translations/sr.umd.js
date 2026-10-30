/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: translations } = {"sr":{"dictionary":{"Insert HTML":"Уметни ХТМЛ","HTML snippet":"ХТМЛ део","Paste raw HTML here...":"Овде налепите ХТМЛ","Edit source":"Уреди извор","Save changes":"Сачувај измене","No preview available":"Приказ није доступан","Empty snippet content":"Садрћај празног исечка"}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
