/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sk' ]: { dictionary, getPluralForm } } = {"sk":{"dictionary":{"Find and replace":"Vyhľadať a nahradiť","Find in text…":"Vyhľadať v texte...","Find":"Vyhľadať","Previous result":"Predchádzajúci výsledok","Next result":"Nasledujúci výsledok","Replace":"Nahradiť","Replace all":"Nahradiť všetko","Match case":"Presná zhoda","Whole words only":"Iba celé slová","Replace with…":"Nahradiť za...","Text to find must not be empty.":"Text vyhľadávania nemôže byť prázdny.","Tip: Find some text first in order to replace it.":"Tip: Najskôr vyhľadajte text, ktorý následne môžete nahradiť.","Advanced options":"Pokročilé nastavenia","Find in the document":"Nájsť v dokumente"},getPluralForm(n){return (n == 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2);}}};
e[ 'sk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sk' ].dictionary = Object.assign( e[ 'sk' ].dictionary, dictionary );
e[ 'sk' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
