/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tk' ]: translations } = {"tk":{"dictionary":{"Align left":"Çepe deňleşdiriň","Align right":"Saga deňleşdiriň","Align center":"Merkeze deňleşdir","Justify":"Akla","Text alignment":"Tekstiň deňleşdirilmegi","Text alignment toolbar":"Teksti deňleşdirmek gurallar paneli"}}};
e[ 'tk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tk' ].dictionary = Object.assign( e[ 'tk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
