/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ku' ]: translations } = {"ku":{"dictionary":{"Font Size":"قەبارەی فۆنت","Tiny":"گچکە","Small":"بچوک","Big":"گەورە","Huge":"زۆر گەورە","Font Family":"فۆنتی خێزانی","Default":"بنچینە","Font Color":"ڕەنگی فۆنت","Font Background Color":"ڕەنگی پاشبنەمای فۆنت","Document colors":"ڕەنگەکانی دۆکومێنت"}}};
e[ 'ku' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ku' ].dictionary = Object.assign( e[ 'ku' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ku' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
