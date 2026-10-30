/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sv' ]: translations } = {"sv":{"dictionary":{"Insert HTML":"Infoga HTML","HTML snippet":"HTML-kodsnutt","Paste raw HTML here...":"Klistra in rå HTML här ...","Edit source":"Redigera källa","Save changes":"Spara ändringar","No preview available":"Ingen förhandsvisning tillgänglig","Empty snippet content":"Töm snuttinnehåll"}}};
e[ 'sv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sv' ].dictionary = Object.assign( e[ 'sv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
