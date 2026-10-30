/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fi' ]: translations } = {"fi":{"dictionary":{"Yellow marker":"Keltainen tussi","Green marker":"Vihreä tussi","Pink marker":"Pinkki tussi","Blue marker":"Sininen tussi","Red pen":"Punainen tussi","Green pen":"Vihreä kynä","Remove highlight":"Poista korostus","Highlight":"Korosta","Text highlight toolbar":"Tekstinkorostuksen työkalupalkki"}}};
e[ 'fi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fi' ].dictionary = Object.assign( e[ 'fi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
