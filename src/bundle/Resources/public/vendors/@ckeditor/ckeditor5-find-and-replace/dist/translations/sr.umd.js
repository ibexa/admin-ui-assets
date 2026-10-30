/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: translations } = {"sr":{"dictionary":{"Find and replace":"Нађи и замени","Find in text…":"Пронађи у тексту… ","Find":"Пронаћи","Previous result":"Претходни резултат ","Next result":"Следећи резултат ","Replace":"Замени","Replace all":"Замени све","Match case":"Подударање случај ","Whole words only":"Само целе речи ","Replace with…":"Замени са…","Text to find must not be empty.":"Текст за проналажење не сме бити празан.","Tip: Find some text first in order to replace it.":"Савет: Прво пронађите неки текст да бисте га заменили. ","Advanced options":"Napredne opcije","Find in the document":"Nađi u dokumentu"}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
