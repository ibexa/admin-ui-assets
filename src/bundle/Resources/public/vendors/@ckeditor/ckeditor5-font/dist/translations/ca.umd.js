/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ca' ]: translations } = {"ca":{"dictionary":{"Font Size":"Mida de la font","Tiny":"Molt petita","Small":"Peita","Big":"Gran","Huge":"Molt gran","Font Family":"Font","Default":"Predeterminada","Font Color":"Color del tipus de lletra","Font Background Color":"Color de fons del tipus de lletra","Document colors":"Colors del document"}}};
e[ 'ca' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ca' ].dictionary = Object.assign( e[ 'ca' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ca' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
