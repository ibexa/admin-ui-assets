/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'de-ch' ]: translations } = {"de-ch":{"dictionary":{"Yellow marker":"Gelber Marker","Green marker":"Grüner Marker","Pink marker":"Pinker Marker","Blue marker":"Blauer Marker","Red pen":"Rote Schriftfarbe","Green pen":"Grüne Schriftfarbe","Remove highlight":"Texthervorhebung entfernen","Highlight":"Texthervorhebung","Text highlight toolbar":"Texthervorhebung Werkzeugleiste"}}};
e[ 'de-ch' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'de-ch' ].dictionary = Object.assign( e[ 'de-ch' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'de-ch' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
