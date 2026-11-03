/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uk' ]: translations } = {"uk":{"dictionary":{"Open file manager":"Відкрити менеджер файлів","Cannot determine a category for the uploaded file.":"Не вдається визначити категорію для завантаженого файлу.","Cannot access default workspace.":"Немає доступу до робочого простору за замовчуванням.","You have no image editing permissions.":"У вас немає прав на редагування зображень.","Edit image":"Редагувати зображення","Processing the edited image.":"Обробка відредагованого зображення.","Server failed to process the image.":"Серверу не вдалося обробити зображення.","Failed to determine category of edited image.":"Не вдалося визначити категорію відредагованого зображення."}}};
e[ 'uk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uk' ].dictionary = Object.assign( e[ 'uk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
