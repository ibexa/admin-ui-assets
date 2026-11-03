/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bg' ]: translations } = {"bg":{"dictionary":{"Enter fullscreen mode":"Вход в режим на цял екран","Leave fullscreen mode":"Изход от режима на цял екран","Fullscreen mode":"Режим на цял екран","Toggle fullscreen mode":"Превключване на режима на цял екран","Document outline":"Вид на документа","Connected users":"Свързани потребители","Show left sidebar":"Покажи лявата странична лента","Hide left sidebar":"Скрий лявата странична лента","Toggle sidebar":"Превключи на странична лента"}}};
e[ 'bg' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bg' ].dictionary = Object.assign( e[ 'bg' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bg' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
