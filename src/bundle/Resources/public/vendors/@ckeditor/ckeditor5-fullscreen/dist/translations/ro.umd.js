/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ro' ]: translations } = {"ro":{"dictionary":{"Enter fullscreen mode":"Intrați în modul ecran complet","Leave fullscreen mode":"Părăsiți modul ecran complet","Fullscreen mode":"Mod ecran complet","Toggle fullscreen mode":"Comutare mod ecran complet","Document outline":"Schița documentului","Connected users":"Utilizatori conectați","Show left sidebar":"Afișați bara laterală stângă","Hide left sidebar":"Ascundeți bara laterală stângă","Toggle sidebar":"Comutați bara laterală"}}};
e[ 'ro' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ro' ].dictionary = Object.assign( e[ 'ro' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ro' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
