/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ro' ]: translations } = {"ro":{"dictionary":{"Find and replace":"Găsire și înlocuire","Find in text…":"Găsire în text...","Find":"Găsire","Previous result":"Rezultatul anterior","Next result":"Rezultatul următor","Replace":"Înlocuire","Replace all":"Înlocuire toate","Match case":"Potrivire litere mari și mici","Whole words only":"Doar cuvinte întregi","Replace with…":"Înlocuire cu...","Text to find must not be empty.":"„Text de găsit” nu poate fi lăsat gol.","Tip: Find some text first in order to replace it.":"Sfat: Mai întâi găsiți textul pentru a-l înlocui.","Advanced options":"Opțiuni avansate","Find in the document":"Căutare în document"}}};
e[ 'ro' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ro' ].dictionary = Object.assign( e[ 'ro' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ro' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
