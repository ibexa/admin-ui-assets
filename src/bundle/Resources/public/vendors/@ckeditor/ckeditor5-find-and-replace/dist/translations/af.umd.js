/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'af' ]: translations } = {"af":{"dictionary":{"Find and replace":"Soek en vervang","Find in text…":"Soek in teks …","Find":"Soek","Previous result":"Vorige resultaat","Next result":"Volgende resultaat","Replace":"Vervang","Replace all":"Vervang alles","Match case":"Hooflettersensitief","Whole words only":"Slegs hele woorde","Replace with…":"Vervang met ...","Text to find must not be empty.":"Soekteks mag nie leeg wees nie.","Tip: Find some text first in order to replace it.":"Wenk: Soek eers 'n bietjie teks om dit te vervang.","Advanced options":"","Find in the document":""}}};
e[ 'af' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'af' ].dictionary = Object.assign( e[ 'af' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'af' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
