/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ku' ]: translations } = {"ku":{"dictionary":{"Yellow marker":"نیشانەکەری  زەرد","Green marker":"نیشانەکەری  سەوز","Pink marker":"نیشانەکەری پەمەیی","Blue marker":"نیشانەکەری  شین","Red pen":"پێنووسی سۆر","Green pen":"پێنووسی سەوز","Remove highlight":"لابردنی بەرچاوکەر","Highlight":"بەرچاوکردن","Text highlight toolbar":"تووڵامرازی نیشانکردنی تێکست"}}};
e[ 'ku' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ku' ].dictionary = Object.assign( e[ 'ku' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ku' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
