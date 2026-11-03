/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sk' ]: translations } = {"sk":{"dictionary":{"Font Size":"Veľkosť písma","Tiny":"Veľmi malé","Small":"Malé","Big":"Veľké","Huge":"Veľmi veľké","Font Family":"Názov písma","Default":"Predvolené","Font Color":"Farba písma","Font Background Color":"Farba zvýraznenia textu","Document colors":"Farby dokumentu"}}};
e[ 'sk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sk' ].dictionary = Object.assign( e[ 'sk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
