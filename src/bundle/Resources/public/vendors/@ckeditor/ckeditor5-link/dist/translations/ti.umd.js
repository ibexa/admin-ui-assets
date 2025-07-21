/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ti' ]: { dictionary, getPluralForm } } = {"ti":{"dictionary":{"Unlink":"መራኽቦ ኣወግድ","Link":"መራኽቦ","Link URL":"","Link URL must not be empty.":"","Link image":"","Edit link":"መራኽቦ ኣርም","Open link in new tab":"ንመራኽቦ ኣብ ሓዱሽ ታብ ክፈት","Open in a new tab":"","Downloadable":"ዝረግፍ","Create link":"መራኽቦ ፍጠር","Move out of a link":"","Link properties":"","Displayed text":"","No links available":""},getPluralForm(n){return (n > 1);}}};
e[ 'ti' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ti' ].dictionary = Object.assign( e[ 'ti' ].dictionary, dictionary );
e[ 'ti' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
