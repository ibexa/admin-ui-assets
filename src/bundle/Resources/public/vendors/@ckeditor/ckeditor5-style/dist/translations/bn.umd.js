/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bn' ]: translations } = {"bn":{"dictionary":{"Styles":"স্টাইলস","Multiple styles":"একাধিক স্টাইল","Block styles":"ব্লক স্টাইল","Text styles":"টেস্কট স্টাইল"}}};
e[ 'bn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bn' ].dictionary = Object.assign( e[ 'bn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
