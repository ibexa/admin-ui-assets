/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ja' ]: { dictionary, getPluralForm } } = {"ja":{"dictionary":{"media widget":"メディアウィジェット","Media URL":"メディアURL","Paste the media URL in the input.":"URLを入力欄にコピー","Tip: Paste the URL into the content to embed faster.":"ヒント：より迅速に埋め込むには、コンテンツへURLを貼り付けてください。","The URL must not be empty.":"空のURLは許可されていません。","This media URL is not supported.":"このメディアのURLはサポートされていません。","Insert media":"メディアの挿入","Media":"メディア","Media toolbar":"メディア","Open media in new tab":"新しいタブでメディアを開く","Media embed":"メディアの埋め込み"},getPluralForm(n){return 0;}}};
e[ 'ja' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ja' ].dictionary = Object.assign( e[ 'ja' ].dictionary, dictionary );
e[ 'ja' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
