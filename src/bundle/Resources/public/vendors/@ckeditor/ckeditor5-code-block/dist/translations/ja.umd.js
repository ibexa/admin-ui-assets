/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ja' ]: translations } = {"ja":{"dictionary":{"Insert code block":"コードブロックの挿入","Plain text":"プレインテキスト","Leaving %0 code snippet":"%0のコードスニペットを残す","Entering %0 code snippet":"%0のコードスニペットを入力","Entering code snippet":"コードスニペットを入力","Leaving code snippet":"コードスニペットを残す","Code block":"コードブロック"}}};
e[ 'ja' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ja' ].dictionary = Object.assign( e[ 'ja' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ja' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
