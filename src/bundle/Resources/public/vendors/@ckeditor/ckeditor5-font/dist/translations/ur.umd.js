/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ur' ]: translations } = {"ur":{"dictionary":{"Font Size":"فانٹ کا حجم","Tiny":"ننھا","Small":"چھوٹا","Big":"بڑا","Huge":"جسيم","Font Family":"فانٹ خاندان","Default":"طے شدہ","Font Color":"فانٹ کا رنگ","Font Background Color":"فانٹ کے پس منظر کا رنگ","Document colors":"دستاویز کے رنگ"}}};
e[ 'ur' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ur' ].dictionary = Object.assign( e[ 'ur' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ur' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
