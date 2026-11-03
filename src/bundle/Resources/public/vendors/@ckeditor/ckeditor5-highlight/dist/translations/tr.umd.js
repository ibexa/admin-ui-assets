/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tr' ]: translations } = {"tr":{"dictionary":{"Yellow marker":"Sarı işaretleyici","Green marker":"Yeşil işaretleyici","Pink marker":"Pembe işaretleyici","Blue marker":"Mavi işaretleyici","Red pen":"Kırmızı kalem","Green pen":"Yeşik kalem","Remove highlight":"Vurgulamayı temizle","Highlight":"Vurgu","Text highlight toolbar":"Yazı Vurgulama Araç Çubuğu"}}};
e[ 'tr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tr' ].dictionary = Object.assign( e[ 'tr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
