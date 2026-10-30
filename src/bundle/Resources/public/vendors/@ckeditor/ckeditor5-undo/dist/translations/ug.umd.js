/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ug' ]: translations } = {"ug":{"dictionary":{"Undo":"يېنىۋېلىش","Redo":"تەكرارلاش"}}};
e[ 'ug' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ug' ].dictionary = Object.assign( e[ 'ug' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ug' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
