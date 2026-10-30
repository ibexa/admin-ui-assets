/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'el' ]: translations } = {"el":{"dictionary":{"Align left":"Στοίχιση αριστερά","Align right":"Στοίχιση δεξιά","Align center":"Στοίχιση στο κέντρο","Justify":"Πλήρης στοίχηση","Text alignment":"Στοίχιση κειμένου","Text alignment toolbar":"Γραμμή εργαλείων στοίχισης κειμένου"}}};
e[ 'el' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'el' ].dictionary = Object.assign( e[ 'el' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'el' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
