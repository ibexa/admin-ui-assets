/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: translations } = {"be":{"dictionary":{"Open file manager":"Адкрыць менеджэр файлаў","Cannot determine a category for the uploaded file.":"Немагчыма вызначыць катэгорыю для запампаванага файла.","Cannot access default workspace.":"Немагчыма атрымаць доступ да прадвызначанай працоўнай прасторы.","You have no image editing permissions.":"У вас няма дозволу на рэдагаванне відарыса.","Edit image":"Рэдагаваць відарыс","Processing the edited image.":"Апрацоўка адрэдагаванага відарыса.","Server failed to process the image.":"Сервер не здольны апрацаваць відарыс.","Failed to determine category of edited image.":"Не здольны вызначыць катэгорыю адрэдагаванага відарыса."}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'be' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
