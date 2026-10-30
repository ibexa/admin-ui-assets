/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lv' ]: translations } = {"lv":{"dictionary":{"Enter fullscreen mode":"Ieiet pilnekrāna režīmā","Leave fullscreen mode":"Iziet no pilnekrāna režīma","Fullscreen mode":"Pilnekrāna režīms","Toggle fullscreen mode":"Pārslēgt uz pilnekrāna režīmu","Document outline":"Dokumenta izklāsts","Connected users":"Pievienotie lietotāji","Show left sidebar":"Rādīt kreiso sānu joslu","Hide left sidebar":"Slēpt kreiso sānu joslu","Toggle sidebar":"Pārslēgt sānu joslu"}}};
e[ 'lv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lv' ].dictionary = Object.assign( e[ 'lv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
