/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'et' ]: translations } = {"et":{"dictionary":{"Disable editing":"Keela muutmine","Enable editing":"Luba muutmine","Disable inline editing":"Keela teksti muutmine","Enable inline editing":"Luba valitud teksti muutmine","Disable block editing":"Keela ploki muutmine","Enable block editing":"Luba valitud ploki muutmine","Previous editable region":"Eelmine muudetav piirkond","Next editable region":"Järgmine muudetav piirkond","Navigate editable regions":"Muudetavate piirkondade vahel liikumine"}}};
e[ 'et' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'et' ].dictionary = Object.assign( e[ 'et' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'et' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
