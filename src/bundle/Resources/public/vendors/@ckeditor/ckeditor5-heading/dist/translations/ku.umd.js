/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ku' ]: { dictionary, getPluralForm } } = {"ku":{"dictionary":{"Heading":"سەرنووسە","Choose heading":"سەرنووسە هەڵبژێرە","Heading 1":"سەرنووسەی 1","Heading 2":"سەرنووسەی 2","Heading 3":"سەرنووسەی 3","Heading 4":"سەرنووسەی 4","Heading 5":"سەرنووسەی 5","Heading 6":"سەرنووسەی 6","Type your title":"نوسینی ناونیشان","Type or paste your content here.":"بنووسە یاخوود ناوەڕۆکی کۆپیکراو لیڕە بلکێنە"},getPluralForm(n){return (n != 1);}}};
e[ 'ku' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ku' ].dictionary = Object.assign( e[ 'ku' ].dictionary, dictionary );
e[ 'ku' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
