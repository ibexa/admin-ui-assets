/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bg' ]: translations } = {"bg":{"dictionary":{"Open file manager":"Отвори управление на файлове","Cannot determine a category for the uploaded file.":"Не може да бъде определена категория за качения файл.","Cannot access default workspace.":"Нямате достъп до работното пространство по подразбиране.","You have no image editing permissions.":"Нямате разрешения за редактиране на изображения.","Edit image":"Редактиране на изображението","Processing the edited image.":"Обработка на редактираното изображение.","Server failed to process the image.":"Сървърът не успя да обработи изображението.","Failed to determine category of edited image.":"Неуспешно определяне на категорията на редактираното изображение."}}};
e[ 'bg' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bg' ].dictionary = Object.assign( e[ 'bg' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bg' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
