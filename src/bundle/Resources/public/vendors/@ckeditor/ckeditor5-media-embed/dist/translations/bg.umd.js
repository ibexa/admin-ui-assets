/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bg' ]: translations } = {"bg":{"dictionary":{"media widget":"Медиен компонент","Media URL":"Медиен уеб адрес","Paste the media URL in the input.":"Постави медииния уеб адрес във входа.","Tip: Paste the URL into the content to embed faster.":"Полезен съвет: Постави уеб адреса в съдържанието, за да вградите по-бързо.","The URL must not be empty.":"Уеб адресът не трябва да бъде празен.","This media URL is not supported.":"Този медиен уеб адрес не се поддържа.","Insert media":"Вмъкни медия","Media embed":"Вмъкване на мултимедия","Media":"Медия","Media toolbar":"Лента със задачи за медия","Open media in new tab":"Отворете мултимедията в нов раздел","Left aligned media":"Медия, подравнена вляво","Centered media":"Центрирана медия","Right aligned media":"Медия, подравнена вдясно","Resize media":"Преоразмери медийния файл","Resize media to %0":"Преоразмери медийния файл до %0","Resize media to the original size":"Преоразмери медийния файл до оригиналния му размер","Resize media (in %0)":"Преоразмери медийния файл (в %0)","Custom media size":"Персонализиран размер на медийния файл","Media resize list":"Списък с медийни файлове за преоразмеряване","Media Resize":"Преоразмеряване на медийни файлове"}}};
e[ 'bg' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bg' ].dictionary = Object.assign( e[ 'bg' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bg' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
