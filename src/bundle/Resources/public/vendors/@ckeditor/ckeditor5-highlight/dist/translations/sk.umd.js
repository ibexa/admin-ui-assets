/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sk' ]: translations } = {"sk":{"dictionary":{"Yellow marker":"Žltý zvýrazňovač","Green marker":"Zelený zvýrazňovač","Pink marker":"Ružový zvýrazňovač","Blue marker":"Modrý zvýrazňovač","Red pen":"Červené pero","Green pen":"Zelené pero","Remove highlight":"Odstrániť zvýraznenie","Highlight":"Zvýraznenie","Text highlight toolbar":"Panel nástrojov zvýraznenia textu"}}};
e[ 'sk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sk' ].dictionary = Object.assign( e[ 'sk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
