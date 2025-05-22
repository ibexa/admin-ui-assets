/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bg' ]: { dictionary, getPluralForm } } = {"bg":{"dictionary":{"Bookmark":"Отметка","Edit bookmark":"Редактиране на отметка","Remove bookmark":"Премахване на отметка","Bookmark name":"Име на отметка","Enter the bookmark name without spaces.":"Въведете името на отметката без интервали.","Bookmark must not be empty.":"Отметката не трябва да е празна.","Bookmark name cannot contain space characters.":"Името на отметката не може да съдържа интервали.","Bookmark name already exists.":"Името на отметката вече съществува.","bookmark widget":"изпълним модул за отметки","Bookmark toolbar":"Лента с отметки","Bookmarks":"Отметки","No bookmarks available.":"Няма налични отметки","Scroll to bookmark":"Превъртане до отметка"},getPluralForm(n){return (n != 1);}}};
e[ 'bg' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bg' ].dictionary = Object.assign( e[ 'bg' ].dictionary, dictionary );
e[ 'bg' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
