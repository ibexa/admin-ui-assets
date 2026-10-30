/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ku' ]: translations } = {"ku":{"dictionary":{"Align left":"بەهێڵکردنی چەپ","Align right":"بەهێڵکردنی ڕاست","Align center":"بەهێڵکردنی ناورەڕاست","Justify":"هاوستوونی","Text alignment":"ڕیززکردنی تێکست","Text alignment toolbar":"تووڵامرازی ڕیززکردنی تێکست"}}};
e[ 'ku' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ku' ].dictionary = Object.assign( e[ 'ku' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ku' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
