/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hu' ]: translations } = {"hu":{"dictionary":{"Yellow marker":"Sárga kiemelő","Green marker":"Zöld kiemelő","Pink marker":"Rózsaszín kiemelő","Blue marker":"Kék kiemelő","Red pen":"Piros toll","Green pen":"Zöld toll","Remove highlight":"Kiemelés eltávolítása","Highlight":"Kiemelés","Text highlight toolbar":"Szöveg kiemelés eszköztár"}}};
e[ 'hu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hu' ].dictionary = Object.assign( e[ 'hu' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hu' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
