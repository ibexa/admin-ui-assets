/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'da' ]: translations } = {"da":{"dictionary":{"Align left":"Justér venstre","Align right":"Justér højre","Align center":"Justér center","Justify":"Justér","Text alignment":"Tekstjustering","Text alignment toolbar":"Tekstjustering værktøjslinje"}}};
e[ 'da' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'da' ].dictionary = Object.assign( e[ 'da' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'da' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
