/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tr' ]: translations } = {"tr":{"dictionary":{"Copy selected content":"Seçilen içeriği kopyala","Paste content":"İçeriği yapıştır","Paste content as plain text":"İçeriği düz metin olarak yapıştır"}}};
e[ 'tr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tr' ].dictionary = Object.assign( e[ 'tr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
