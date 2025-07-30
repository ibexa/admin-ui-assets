/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fi' ]: { dictionary, getPluralForm } } = {"fi":{"dictionary":{"Yellow marker":"Keltainen tussi","Green marker":"Vihreä tussi","Pink marker":"Pinkki tussi","Blue marker":"Sininen tussi","Red pen":"Punainen tussi","Green pen":"Vihreä kynä","Remove highlight":"Poista korostus","Highlight":"Korosta","Text highlight toolbar":"Tekstinkorostuksen työkalupalkki"},getPluralForm(n){return (n != 1);}}};
e[ 'fi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fi' ].dictionary = Object.assign( e[ 'fi' ].dictionary, dictionary );
e[ 'fi' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
