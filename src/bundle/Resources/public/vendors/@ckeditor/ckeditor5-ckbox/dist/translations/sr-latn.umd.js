/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr-latn' ]: translations } = {"sr-latn":{"dictionary":{"Open file manager":"Otvori upravljač datotekama","Cannot determine a category for the uploaded file.":"Nije moguće odrediti kategoriju za otpremljenu datoteku.","Cannot access default workspace.":"Nije moguće pristupiti podrazumevanom radnom prostoru.","You have no image editing permissions.":"","Edit image":"Uredi sliku","Processing the edited image.":"Obrada uređene slike.","Server failed to process the image.":"Server nije uspeo da obradi sliku.","Failed to determine category of edited image.":"Određivanje kategorije uređene slike nije uspelo."}}};
e[ 'sr-latn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr-latn' ].dictionary = Object.assign( e[ 'sr-latn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr-latn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
