/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: translations } = {"be":{"dictionary":{"Insert HTML":"Уставіць HTML","HTML snippet":"HTML сніппет","Paste raw HTML here...":"Устаўце HTML код сюды...","Edit source":"Змяніць код","Save changes":"Захаваць змены","No preview available":"Папярэдні прагляд недаступны","Empty snippet content":"Няма змесціва"}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'be' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
