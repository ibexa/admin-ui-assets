/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sq' ]: translations } = {"sq":{"dictionary":{"Yellow marker":"Shënuesi verdh","Green marker":"Shënuesi gjelbër","Pink marker":"Shënuesi rozë","Blue marker":"Shënuesi kaltër","Red pen":"Lapsi kuq","Green pen":"Lapsi gjelbër","Remove highlight":"Largo ngjyrimet","Highlight":"Ngjyrimi","Text highlight toolbar":"Shiriti i veglave të nënvizimit të tekstit"}}};
e[ 'sq' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sq' ].dictionary = Object.assign( e[ 'sq' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sq' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
