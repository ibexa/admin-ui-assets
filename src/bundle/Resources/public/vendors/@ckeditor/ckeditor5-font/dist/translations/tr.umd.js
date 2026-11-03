/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tr' ]: translations } = {"tr":{"dictionary":{"Font Size":"Yazı Boyutu","Tiny":"Çok Küçük","Small":"Küçük","Big":"Büyük","Huge":"Çok Büyük","Font Family":"Yazı Tipi Ailesi","Default":"Varsayılan","Font Color":"Yazı Tipi Rengi","Font Background Color":"Yazı Tipi Arkaplan Rengi","Document colors":"Belge Rengi"}}};
e[ 'tr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tr' ].dictionary = Object.assign( e[ 'tr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
