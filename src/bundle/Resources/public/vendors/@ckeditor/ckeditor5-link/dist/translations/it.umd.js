/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'it' ]: translations } = {"it":{"dictionary":{"Unlink":"Elimina collegamento","Link":"Collegamento","Link URL":"URL del collegamento","Link URL must not be empty.":"L'URL del link non può essere lasciato in bianco.","Link image":"Collega immagine","Link properties":"Proprietà del link","Edit link":"Modifica collegamento","Open link in new tab":"Apri collegamento in nuova scheda","Open in a new tab":"Apri in una nuova scheda","Downloadable":"Scaricabile","Create link":"Crea un link","Move out of a link":"Esce da un link","Displayed text":"Testo visualizzato","No links available":"Nessun link disponibile","This link has no URL":"Questo link non include un URL"}}};
e[ 'it' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'it' ].dictionary = Object.assign( e[ 'it' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'it' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
