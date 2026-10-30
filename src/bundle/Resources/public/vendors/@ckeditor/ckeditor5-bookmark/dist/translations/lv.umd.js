/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lv' ]: translations } = {"lv":{"dictionary":{"Bookmark":"Grāmatzīme","Edit bookmark":"Rediģēt grāmatzīmi","Remove bookmark":"Aizvākt grāmatzīmi","Bookmark name":"Grāmatzīmes nosaukums","Enter the bookmark name without spaces.":"Ievadiet grāmatzīmes nosaukumu bez atstarpēm.","Bookmark must not be empty.":"Grāmatzīmes lauks nedrīkst būt tukšs.","Bookmark name cannot contain space characters.":"Grāmatzīmes nosaukumā nedrīkst būt atstarpes.","Bookmark name already exists.":"Šāds grāmatzīmes nosaukums jau pastāv.","bookmark widget":"grāmatzīmju ikona","Bookmark toolbar":"Grāmatzīmju rīkjosla","Bookmarks":"Grāmatzīmes","No bookmarks available.":"Grāmatzīmes nav pieejamas.","Scroll to bookmark":"Pārvieto līdz grāmatzīmei"}}};
e[ 'lv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lv' ].dictionary = Object.assign( e[ 'lv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
