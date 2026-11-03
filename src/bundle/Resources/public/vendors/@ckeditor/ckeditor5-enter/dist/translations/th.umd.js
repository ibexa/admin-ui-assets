/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'th' ]: translations } = {"th":{"dictionary":{"Insert a soft break (a <code>&lt;br&gt;</code> element)":"แทรกการขึ้นบรรทัดใหม่แบบ Soft Break  (<code>&lt;br&gt;</code> element)","Insert a hard break (a new paragraph)":"แทรกการขึ้นบรรทัดใหม่แบบ Hard Break (ย่อหน้าใหม่)"}}};
e[ 'th' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'th' ].dictionary = Object.assign( e[ 'th' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'th' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
