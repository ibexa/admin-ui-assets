/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'et' ]: translations } = {"et":{"dictionary":{"Unlink":"Eemalda link","Link":"Link","Link URL":"Lingi URL","Link URL must not be empty.":"Lingi URL peab olema sisestatud.","Link image":"Lingi pilt","Link properties":"Lingi omadused","Edit link":"Muuda linki","Open link in new tab":"Ava link uuel vahekaardil","Open in a new tab":"Ava uuel kaardil","Downloadable":"Allalaaditav","Create link":"Loo link","Move out of a link":"Välju lingist","Displayed text":"Kuvatud tekst","No links available":"Ühtegi linki pole saadaval","This link has no URL":"Sellel lingil puudub URL"}}};
e[ 'et' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'et' ].dictionary = Object.assign( e[ 'et' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'et' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
