/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: translations } = {"sr":{"dictionary":{"Unlink":"Отклони линк","Link":"Линк","Link URL":"УРЛ линк","Link URL must not be empty.":"URL linka ne sme biti prazan.","Link image":"Линк слике","Link properties":"Svojstva veze","Edit link":"Исправи линк","Open link in new tab":"Отвори линк у новом прозору","Open in a new tab":"Отвори у новој картици","Downloadable":"Могуће преузимање","Create link":"Napravi vezu","Move out of a link":"Idi sa veze","Displayed text":"Prikazani tekst","No links available":"Nema dostupnih veza","This link has no URL":"Ova veza nema URL"}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
