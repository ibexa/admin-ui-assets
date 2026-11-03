/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tk' ]: translations } = {"tk":{"dictionary":{"Yellow marker":"Sary marker","Green marker":"Ýaşyl marker","Pink marker":"Gülgüne marker","Blue marker":"Gök marker","Red pen":"Gyzyl galam","Green pen":"Ýaşyl galam","Remove highlight":"Belligi aýyryň","Highlight":"Bellik","Text highlight toolbar":"Tekst bellik gurallar paneli"}}};
e[ 'tk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tk' ].dictionary = Object.assign( e[ 'tk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
