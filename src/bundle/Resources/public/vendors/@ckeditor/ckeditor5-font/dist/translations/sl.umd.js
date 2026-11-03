/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sl' ]: translations } = {"sl":{"dictionary":{"Font Size":"Velikost pisave","Tiny":"Drobna","Small":"Majhna","Big":"Veliko","Huge":"Ogromno","Font Family":"Vrsta oz. tip pisave","Default":"Privzeto","Font Color":"Barva pisave","Font Background Color":"Barva ozadja pisave","Document colors":"Barve dokumenta"}}};
e[ 'sl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sl' ].dictionary = Object.assign( e[ 'sl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
