/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sq' ]: translations } = {"sq":{"dictionary":{"Align left":"Radhit majtas","Align right":"Radhit djathtas","Align center":"Radhit në mes","Justify":"Plotësim","Text alignment":"Radhitja e tekstit","Text alignment toolbar":"Shiriti i rradhitjes së tekstit"}}};
e[ 'sq' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sq' ].dictionary = Object.assign( e[ 'sq' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sq' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
