/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: translations } = {"be":{"dictionary":{"Unlink":"Выдаліць спасылку","Link":"Спасылка","Link URL":"Спасылка URL","Link URL must not be empty.":"URL-адрас спасылкі не павінен быць пустым.","Link image":"Спасылка на відарыс","Link properties":"","Edit link":"Рэдагаваць спасылку","Open link in new tab":"Адкрыць спасылку ў новай укладцы","Open in a new tab":"Адкрыць ў новай укладцы","Downloadable":"Даступны для спампоўкі","Create link":"Стварыць спасылку","Move out of a link":"Выйсці з спасылкі","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'be' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
