/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ca' ]: translations } = {"ca":{"dictionary":{"Insert a soft break (a <code>&lt;br&gt;</code> element)":"Insereix un salt de línia tou (un element <code>&lt;br&gt;</code>)","Insert a hard break (a new paragraph)":"Insereix un salt de línia rígid (un paràgraf nou)"}}};
e[ 'ca' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ca' ].dictionary = Object.assign( e[ 'ca' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ca' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
