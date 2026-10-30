/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ti' ]: translations } = {"ti":{"dictionary":{"Bookmark":"","Edit bookmark":"","Remove bookmark":"","Bookmark name":"","Enter the bookmark name without spaces.":"","Bookmark must not be empty.":"","Bookmark name cannot contain space characters.":"","Bookmark name already exists.":"","bookmark widget":"","Bookmark toolbar":"","Bookmarks":"","No bookmarks available.":"","Scroll to bookmark":""}}};
e[ 'ti' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ti' ].dictionary = Object.assign( e[ 'ti' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ti' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
