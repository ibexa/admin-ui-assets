/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sv' ]: { dictionary, getPluralForm } } = {"sv":{"dictionary":{"Bookmark":"Bokmärke","Edit bookmark":"Redigera bokmärke","Remove bookmark":"Ta bort bokmärke","Bookmark name":"Bokmärkets namn","Enter the bookmark name without spaces.":"Ange bokmärkets namn utan mellanslag.","Bookmark must not be empty.":"Bokmärkets namn kan inte vara tomt.","Bookmark name cannot contain space characters.":"Bokmärkets namn kan inte innehålla mellanslag.","Bookmark name already exists.":"Bokmärkets namn finns redan.","bookmark widget":"widget för bokmärken","Bookmark toolbar":"Bokmärk verktygsfältet","Bookmarks":"Bokmärken","No bookmarks available.":"Inga bokmärken tillgängliga.","Scroll to bookmark":"Skrolla till bokmärket"},getPluralForm(n){return (n != 1);}}};
e[ 'sv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sv' ].dictionary = Object.assign( e[ 'sv' ].dictionary, dictionary );
e[ 'sv' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
