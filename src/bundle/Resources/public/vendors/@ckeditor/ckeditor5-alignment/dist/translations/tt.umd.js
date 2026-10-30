/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tt' ]: translations } = {"tt":{"dictionary":{"Align left":"Сулга тигезлә","Align right":"Уңга тигезлә","Align center":"Үзәккә тигезлә","Justify":"Tигезлә","Text alignment":"Текстны тигезләү","Text alignment toolbar":"Текстны тигезләү кораллары панеле"}}};
e[ 'tt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tt' ].dictionary = Object.assign( e[ 'tt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
