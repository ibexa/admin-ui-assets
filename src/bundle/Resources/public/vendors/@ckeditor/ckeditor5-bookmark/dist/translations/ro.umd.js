/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ro' ]: { dictionary, getPluralForm } } = {"ro":{"dictionary":{"Bookmark":"Marcaj","Edit bookmark":"Editează marcajul","Remove bookmark":"Elimină marcajul","Bookmark name":"Numele marcajului","Enter the bookmark name without spaces.":"Introdu numele marcajului fără spații.","Bookmark must not be empty.":"Marcajul nu poate fi gol.","Bookmark name cannot contain space characters.":"Numele marcajului nu poate conține spații.","Bookmark name already exists.":"Numele marcajului există deja.","bookmark widget":"widget marcaj","Bookmark toolbar":"Bara de instrumente Marcaj","Bookmarks":"Marcaje","No bookmarks available.":"Nu sunt disponibile marcaje.","Scroll to bookmark":"Derulați la marcaj"},getPluralForm(n){return (n == 1 ? 0 : (n == 0 || (n % 100 > 0 && n % 100 < 20)) ? 1 : 2);}}};
e[ 'ro' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ro' ].dictionary = Object.assign( e[ 'ro' ].dictionary, dictionary );
e[ 'ro' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
