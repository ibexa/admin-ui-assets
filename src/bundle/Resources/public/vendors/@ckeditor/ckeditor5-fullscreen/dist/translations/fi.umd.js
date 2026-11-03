/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fi' ]: translations } = {"fi":{"dictionary":{"Enter fullscreen mode":"Siirry koko näytön tilaan","Leave fullscreen mode":"Poistu koko näytön tilasta","Fullscreen mode":"Koko näytön tila","Toggle fullscreen mode":"Vaihda koko näytön tilaa","Document outline":"Verkkoasiakirja","Connected users":"Liitetyt käyttäjät","Show left sidebar":"Näytä vasen sivupalkki","Hide left sidebar":"Piilota vasen sivupalkki","Toggle sidebar":"Vaihda sivupalkkia"}}};
e[ 'fi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fi' ].dictionary = Object.assign( e[ 'fi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
