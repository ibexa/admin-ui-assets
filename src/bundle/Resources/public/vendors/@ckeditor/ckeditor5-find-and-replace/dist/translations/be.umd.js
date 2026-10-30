/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: translations } = {"be":{"dictionary":{"Find and replace":"Знайсці і замяніць","Find in text…":"Знайсці ў тэксце…","Find":"Знайсці","Previous result":"Папярэдні вынік","Next result":"Наступны вынік","Replace":"Замяніць","Replace all":"Замяніць усё","Match case":"З улікам рэгістру","Whole words only":"Толькі слова цалкам","Replace with…":"Замяніць на…","Text to find must not be empty.":"Тэкст для пошуку не павінен быць пустым.","Tip: Find some text first in order to replace it.":"Падказка: спачатку знайдзіце тэкст, каб замяніць яго.","Advanced options":"Дадатковыя параметры","Find in the document":"Знайсці ў дакуменце"}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'be' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
