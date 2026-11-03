/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ru' ]: translations } = {"ru":{"dictionary":{"Find and replace":"Найти и заменить","Find in text…":"Найти в тексте","Find":"Найти","Previous result":"Предыдущий результат","Next result":"Следующий результат","Replace":"Заменить","Replace all":"Заменить всё","Match case":"С учетом регистра","Whole words only":"Только слова целиком","Replace with…":"Заменить на...","Text to find must not be empty.":"Искомый текст не должен быть пустым.","Tip: Find some text first in order to replace it.":"Совет: сначала найдите текст, чтобы заменить его.","Advanced options":"Дополнительные параметры","Find in the document":"Найти в документе"}}};
e[ 'ru' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ru' ].dictionary = Object.assign( e[ 'ru' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ru' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
