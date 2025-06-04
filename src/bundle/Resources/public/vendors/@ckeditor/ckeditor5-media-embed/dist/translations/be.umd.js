/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: { dictionary, getPluralForm } } = {"be":{"dictionary":{"media widget":"медыя-віджэт","Media URL":"URL медыя","Paste the media URL in the input.":"Уставіць URL медыя ў поле ўводу.","Tip: Paste the URL into the content to embed faster.":"Падказка: Уставіць URL у кантэнт для ўключэння хутчэй.","The URL must not be empty.":"URL не павінен быць пустым.","This media URL is not supported.":"Гэты медыя URL не падтрымліваецца.","Insert media":"Уставіць медыя","Media":"Медыя","Media toolbar":"Панель інструментаў медыя","Open media in new tab":"Адкрыць медыя ў новай картцы","Media embed":""},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, dictionary );
e[ 'be' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
