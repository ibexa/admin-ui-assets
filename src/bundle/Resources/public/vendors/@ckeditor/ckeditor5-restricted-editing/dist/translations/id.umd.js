/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'id' ]: translations } = {"id":{"dictionary":{"Disable editing":"Nonaktifkan pengeditan","Enable editing":"Aktifkan penyuntingan","Disable inline editing":"Nonaktifkan penyuntingan langsung","Enable inline editing":"Aktifkan penyuntingan langsung","Disable block editing":"Nonaktifkan penyuntingan blok","Enable block editing":"Aktifkan penyuntingan blok","Previous editable region":"Bagian penyuntingan sebelumnya","Next editable region":"Bagian penyuntingan berikutnya","Navigate editable regions":"Posisikan bagian-bagian penyuntingan"}}};
e[ 'id' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'id' ].dictionary = Object.assign( e[ 'id' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'id' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
