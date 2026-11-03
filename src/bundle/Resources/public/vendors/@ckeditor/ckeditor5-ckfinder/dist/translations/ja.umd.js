/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ja' ]: translations } = {"ja":{"dictionary":{"Insert image or file":"画像やファイルの挿入","Could not obtain resized image URL.":"リサイズした画像のURLの取得に失敗しました。","Selecting resized image failed":"リサイズした画像の選択ができませんでした。","Could not insert image at the current position.":"現在のカーソルの場所への画像の挿入に失敗しました。","Inserting image failed":"画像の挿入に失敗しました。"}}};
e[ 'ja' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ja' ].dictionary = Object.assign( e[ 'ja' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ja' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
