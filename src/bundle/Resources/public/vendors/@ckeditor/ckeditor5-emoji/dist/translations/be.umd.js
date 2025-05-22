/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: { dictionary, getPluralForm } } = {"be":{"dictionary":{"Emoji":"Эмодзі","Show all emoji...":"Паказаць усе эмодзі...","Find an emoji (min. 2 characters)":"Знайсці эмодзі (мін. 2 сімвала)","No emojis were found matching \"%0\".":"Не знойдзены эмодзі, якія адпавядаюць \"%0\".","Keep on typing to see the emoji.":"Працягвайце набіраць тэкст, каб убачыць эмодзі.","The query must contain at least two characters.":"Запыт павінен утрымліваць не менш двух сімвалаў.","Smileys & Expressions":"Смайлы і эмоцыі","Gestures & People":"Жэсты і людзі","Animals & Nature":"Жывёлы і прырода","Food & Drinks":"Ежа і напіткі","Travel & Places":"Падарожжа і месцы","Activities":"Актыўнасці","Objects":"Аб'екты","Symbols":"Сімвалы","Flags":"Флагі","Select skin tone":"Выберыце тон скуры","Default skin tone":"Прадвызначаны тон скуры","Light skin tone":"Светлы тон скуры","Medium Light skin tone":"Сярэдні светлы тон скуры","Medium skin tone":"Сярэдні тон скуры","Medium Dark skin tone":"Сярэдні цёмны тон скуры","Dark skin tone":"Цёмны тон скуры","Emoji picker":""},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, dictionary );
e[ 'be' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
