/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ca' ]: translations } = {"ca":{"dictionary":{"Copy selected content":"Copia el contingut seleccionat","Paste content":"Enganxa el contingut","Paste content as plain text":"Enganxa el contingut com a text pla"}}};
e[ 'ca' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ca' ].dictionary = Object.assign( e[ 'ca' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ca' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
