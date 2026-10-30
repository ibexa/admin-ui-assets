/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'no' ]: translations } = {"no":{"dictionary":{"Yellow marker":"Gul utheving","Green marker":"Grønn utheving","Pink marker":"Rosa utheving","Blue marker":"Blå utheving","Red pen":"Rød penn","Green pen":"Grønn penn","Remove highlight":"Fjern utheving","Highlight":"Utheving","Text highlight toolbar":"Verktøylinje for tekstutheving"}}};
e[ 'no' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'no' ].dictionary = Object.assign( e[ 'no' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'no' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
