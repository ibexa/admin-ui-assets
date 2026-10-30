/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ja' ]: translations } = {"ja":{"dictionary":{"media widget":"メディアウィジェット","Media URL":"メディアURL","Paste the media URL in the input.":"URLを入力欄にコピー","Tip: Paste the URL into the content to embed faster.":"ヒント：より迅速に埋め込むには、コンテンツへURLを貼り付けてください。","The URL must not be empty.":"空のURLは許可されていません。","This media URL is not supported.":"このメディアのURLはサポートされていません。","Insert media":"メディアの挿入","Media embed":"メディアの埋め込み","Media":"メディア","Media toolbar":"メディア","Open media in new tab":"新しいタブでメディアを開く","Left aligned media":"左揃えメディア","Centered media":"中央揃えメディア","Right aligned media":"右揃えメディア","Resize media":"メディアのサイズを変更する","Resize media to %0":"メディアのサイズを%0に変更する","Resize media to the original size":"メディアのサイズをオリジナルサイズに変更する","Resize media (in %0)":"メディアのサイズを変更する（%0内）","Custom media size":"カスタムのメディアサイズ","Media resize list":"メディアのリサイズリスト","Media Resize":"メディアのリサイズ"}}};
e[ 'ja' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ja' ].dictionary = Object.assign( e[ 'ja' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ja' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
