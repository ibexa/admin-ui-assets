/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tr' ]: { dictionary, getPluralForm } } = {"tr":{"dictionary":{"Yellow marker":"Sarı işaretleyici","Green marker":"Yeşil işaretleyici","Pink marker":"Pembe işaretleyici","Blue marker":"Mavi işaretleyici","Red pen":"Kırmızı kalem","Green pen":"Yeşik kalem","Remove highlight":"Vurgulamayı temizle","Highlight":"Vurgu","Text highlight toolbar":"Yazı Vurgulama Araç Çubuğu"},getPluralForm(n){return (n > 1);}}};
e[ 'tr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tr' ].dictionary = Object.assign( e[ 'tr' ].dictionary, dictionary );
e[ 'tr' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
