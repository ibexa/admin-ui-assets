/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ca' ]: translations } = {"ca":{"dictionary":{"Unlink":"Desenllaçar","Link":"Enllaç","Link URL":"Enllaçar URL","Link URL must not be empty.":"L'URL de l'enllaç no pot estar buit.","Link image":"Enllaçar imatge","Link properties":"Propietats de l'enllaç","Edit link":"Editar enllaç","Open link in new tab":"Obrir l'enllaç en una pestanya nova","Open in a new tab":"Obrir en una pestanya nova","Downloadable":"Es pot descarregar","Create link":"Crea un enllaç","Move out of a link":"Surt d'un enllaç","Displayed text":"Text que es mostra","No links available":"No hi ha cap enllaç disponible","This link has no URL":"Aquest enllaç no té cap URL"}}};
e[ 'ca' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ca' ].dictionary = Object.assign( e[ 'ca' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ca' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
