/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ne' ]: { dictionary, getPluralForm } } = {"ne":{"dictionary":{"Undo":"पूर्ववत","Redo":"रिडु"},getPluralForm(n){return (n != 1);}}};
e[ 'ne' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ne' ].dictionary = Object.assign( e[ 'ne' ].dictionary, dictionary );
e[ 'ne' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
