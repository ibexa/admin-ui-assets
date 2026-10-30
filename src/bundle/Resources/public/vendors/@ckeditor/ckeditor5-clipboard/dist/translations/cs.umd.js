/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'cs' ]: translations } = {"cs":{"dictionary":{"Copy selected content":"Zkopírovat vybraný obsah","Paste content":"Vložit obsah","Paste content as plain text":"Vyložit obsah jako prostý text"}}};
e[ 'cs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'cs' ].dictionary = Object.assign( e[ 'cs' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'cs' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
