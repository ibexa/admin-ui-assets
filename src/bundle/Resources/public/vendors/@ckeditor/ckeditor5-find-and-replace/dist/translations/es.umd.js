/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'es' ]: { dictionary, getPluralForm } } = {"es":{"dictionary":{"Find and replace":"Buscar y reemplazar","Find in text…":"Buscar en el texto...","Find":"Buscar","Previous result":"Resultado anterior","Next result":"Siguiente resultado","Replace":"Reemplazar","Replace all":"Reemplazar todo","Match case":"Respetar mayúsculas y minúsculas","Whole words only":"Solo palabras completas","Replace with…":"Reemplazar con...","Text to find must not be empty.":"El texto a buscar no debe estar vacío.","Tip: Find some text first in order to replace it.":"Consejo: Primero busque algún texto para reemplazar.","Advanced options":"Opciones avanzadas","Find in the document":"Busca en el documento"},getPluralForm(n){return (n != 1);}}};
e[ 'es' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'es' ].dictionary = Object.assign( e[ 'es' ].dictionary, dictionary );
e[ 'es' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
