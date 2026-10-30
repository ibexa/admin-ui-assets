/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lv' ]: translations } = {"lv":{"dictionary":{"Unlink":"Noņemt Saiti","Link":"Saite","Link URL":"Saites URL","Link URL must not be empty.":"Saites URL lauks nedrīkst būt tukšs.","Link image":"Ievietot saiti uz attēla","Link properties":"Saites raksturojošie elementi","Edit link":"Labot Saiti","Open link in new tab":"Atvērt saiti jaunā cilnē","Open in a new tab":"Atvērt jaunā cilnē","Downloadable":"Lejupielādējams","Create link":"Izveidot saiti","Move out of a link":"Iziet no saites","Displayed text":"Attēlotais teksts","No links available":"Nav pieejama neviena saite","This link has no URL":"Šai saitei nav URL"}}};
e[ 'lv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lv' ].dictionary = Object.assign( e[ 'lv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
