/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ja' ]: { dictionary, getPluralForm } } = {"ja":{"dictionary":{"Open file manager":"ファイルマネージャーを開く","Cannot determine a category for the uploaded file.":"アップロードされたファイルのカテゴリを特定することができません。","Cannot access default workspace.":"デフォルトワークスペースにアクセスできません。","You have no image editing permissions.":"画像編集のパーミッションがありません。","Edit image":"画像を編集","Processing the edited image.":"編集した画像を処理しています。","Server failed to process the image.":"サーバが画像の処理に失敗しました。","Failed to determine category of edited image.":"編集した画像のカテゴリーを決定できませんでした。"},getPluralForm(n){return 0;}}};
e[ 'ja' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ja' ].dictionary = Object.assign( e[ 'ja' ].dictionary, dictionary );
e[ 'ja' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
