/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ti' ]: translations } = {"ti":{"dictionary":{"Unlink":"መራኽቦ ኣወግድ","Link":"መራኽቦ","Link URL":"","Link URL must not be empty.":"","Link image":"","Link properties":"","Edit link":"መራኽቦ ኣርም","Open link in new tab":"ንመራኽቦ ኣብ ሓዱሽ ታብ ክፈት","Open in a new tab":"","Downloadable":"ዝረግፍ","Create link":"መራኽቦ ፍጠር","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'ti' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ti' ].dictionary = Object.assign( e[ 'ti' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ti' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
