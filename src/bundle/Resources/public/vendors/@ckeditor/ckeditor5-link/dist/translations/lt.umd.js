/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lt' ]: translations } = {"lt":{"dictionary":{"Unlink":"Pašalinti nuorodą","Link":"Pridėti nuorodą","Link URL":"Nuorodos URL","Link URL must not be empty.":"Nuorodos URL negali būti tuščias.","Link image":"Susieti paveikslėlį","Link properties":"Nuorodos savybės","Edit link":"Keisti nuorodą","Open link in new tab":"Atidaryti nuorodą naujame skirtuke","Open in a new tab":"Atverti naujoje kortelėje","Downloadable":"Parsisiunčiamas","Create link":"Sukurti nuorodą","Move out of a link":"Išeiti iš nuorodos","Displayed text":"Rodomas tekstas","No links available":"Nėra jokių nuorodų","This link has no URL":"Ši nuoroda neturi URL"}}};
e[ 'lt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lt' ].dictionary = Object.assign( e[ 'lt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
