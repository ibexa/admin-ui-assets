/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ne' ]: translations } = {"ne":{"dictionary":{"Yellow marker":"पहेंलो मार्कर","Green marker":"हरियो मार्कर","Pink marker":"गुलाबी मार्कर","Blue marker":"नीलो मार्कर","Red pen":"रातो कलम","Green pen":"हरियो कलम","Remove highlight":"हाइलाइट हटाउनुहोस्","Highlight":"हाइलाइट","Text highlight toolbar":""}}};
e[ 'ne' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ne' ].dictionary = Object.assign( e[ 'ne' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ne' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
