/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'da' ]: translations } = {"da":{"dictionary":{"Yellow marker":"Gul markør","Green marker":"Grøn markør","Pink marker":"Lyserød markør","Blue marker":"Blå markør","Red pen":"Rød pen","Green pen":"Grøn pen","Remove highlight":"Fjern fremhævning","Highlight":"Fremhæv","Text highlight toolbar":"Tekstfremhævning værktøjslinje"}}};
e[ 'da' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'da' ].dictionary = Object.assign( e[ 'da' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'da' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
