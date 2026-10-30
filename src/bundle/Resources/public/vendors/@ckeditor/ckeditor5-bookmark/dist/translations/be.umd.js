/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: translations } = {"be":{"dictionary":{"Bookmark":"Закладка","Edit bookmark":"Змяніць закладку","Remove bookmark":"Выдаліць закладку","Bookmark name":"Імя закладкі","Enter the bookmark name without spaces.":"Увядзіце імя закладкі без прабелаў.","Bookmark must not be empty.":"Закладка не можа быць пустой.","Bookmark name cannot contain space characters.":"Імя закладкі не можа ўтрымліваць прабелы.","Bookmark name already exists.":"Імя закладкі ўжо існуе.","bookmark widget":"віджэт закладкаў","Bookmark toolbar":"","Bookmarks":"","No bookmarks available.":"","Scroll to bookmark":""}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'be' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
