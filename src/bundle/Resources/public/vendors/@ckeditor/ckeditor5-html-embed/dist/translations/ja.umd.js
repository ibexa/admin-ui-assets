/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ja' ]: translations } = {"ja":{"dictionary":{"Insert HTML":"HTMLを挿入","HTML snippet":"HTMLスニペット","Paste raw HTML here...":"ここにRaw HTMLを貼り付ける...","Edit source":"ソースを編集","Save changes":"変更を保存","No preview available":"プレビューは使用できません","Empty snippet content":"スニペットのコンテンツを空にする"}}};
e[ 'ja' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ja' ].dictionary = Object.assign( e[ 'ja' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ja' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
