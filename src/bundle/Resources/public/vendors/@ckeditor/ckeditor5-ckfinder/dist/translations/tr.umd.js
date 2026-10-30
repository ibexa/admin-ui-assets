/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tr' ]: translations } = {"tr":{"dictionary":{"Insert image or file":"Resim veya dosya ekleyin","Could not obtain resized image URL.":"Yeniden boyutlandırılmış resim URL’si alınamadı","Selecting resized image failed":"Yeniden boyutlandırılan resim seçilemedi","Could not insert image at the current position.":"Resim mevcut konumda eklenemedi.","Inserting image failed":"Resim eklenemedi"}}};
e[ 'tr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tr' ].dictionary = Object.assign( e[ 'tr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
