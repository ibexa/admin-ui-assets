/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ja' ]: translations } = {"ja":{"dictionary":{"Copy selected content":"選択したコンテンツをコピーする","Paste content":"コンテンツを貼り付ける","Paste content as plain text":"コンテンツをプレーンテキストとして貼り付ける"}}};
e[ 'ja' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ja' ].dictionary = Object.assign( e[ 'ja' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ja' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
