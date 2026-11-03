/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ru' ]: translations } = {"ru":{"dictionary":{"Open file manager":"Открыть менеджер файлов","Cannot determine a category for the uploaded file.":"Не удаётся определить категорию для загруженного файла.","Cannot access default workspace.":"Не удается получить доступ к рабочему пространству по умолчанию.","You have no image editing permissions.":"У вас нет разрешений на редактирование изображений.","Edit image":"Редактировать изображение","Processing the edited image.":"Обработка отредактированного изображения.","Server failed to process the image.":"Серверу не удалось обработать изображение.","Failed to determine category of edited image.":"Не удалось определить категорию отредактированного изображения."}}};
e[ 'ru' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ru' ].dictionary = Object.assign( e[ 'ru' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ru' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
