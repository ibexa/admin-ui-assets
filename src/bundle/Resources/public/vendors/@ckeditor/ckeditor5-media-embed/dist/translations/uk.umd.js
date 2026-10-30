/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uk' ]: translations } = {"uk":{"dictionary":{"media widget":"медіа віджет","Media URL":"Медіа URL","Paste the media URL in the input.":"Вставте URL на медіа в інпут.","Tip: Paste the URL into the content to embed faster.":"Вставте URL у вміст для швидкого перекладу.","The URL must not be empty.":"URL не повинен бути порожнім.","This media URL is not supported.":"Даний медіа URL не підтримується.","Insert media":"Вставити медіа","Media embed":"Вбудувати медіа","Media":"Медіа","Media toolbar":"Панель інструментів медіа","Open media in new tab":"Відкрити медіа у новій вкладці","Left aligned media":"Медіа, вирівняне ліворуч","Centered media":"Медіа, вирівняне по центру","Right aligned media":"Медіа, вирівняне праворуч","Resize media":"Змінити розмір медіа","Resize media to %0":"Змінити розмір медіа до %0","Resize media to the original size":"Відновити початковий розмір медіа","Resize media (in %0)":"Змінити розмір медіа (у %0)","Custom media size":"Користувацький розмір медіа","Media resize list":"Список розмірів медіа","Media Resize":"Зміна розміру медіа"}}};
e[ 'uk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uk' ].dictionary = Object.assign( e[ 'uk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
