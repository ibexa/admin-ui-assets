/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'kk' ]: translations } = {"kk":{"dictionary":{"Align left":"Солға туралау","Align right":"Оңға туралау","Align center":"Ортадан туралау","Justify":"","Text alignment":"Мәтінді туралау","Text alignment toolbar":"Мәтінді туралау құралдар тақтасы"}}};
e[ 'kk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'kk' ].dictionary = Object.assign( e[ 'kk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'kk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
