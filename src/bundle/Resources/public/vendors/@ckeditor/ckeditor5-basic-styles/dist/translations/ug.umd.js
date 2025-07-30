/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ug' ]: { dictionary, getPluralForm } } = {"ug":{"dictionary":{"Bold":"توم","Italic":"يانتۇ","Underline":"ئاستى سىزىق","Code":"كود","Strikethrough":"ئۆچۈرۈش سىزىقى","Subscript":"ئاستبەلگە","Superscript":"ئۈستبەلگە","Italic text":"يانتۇ تېكىست","Move out of an inline code style":"ئىچكى كود ئۇسلۇبىنى چىقىرىۋەت","Bold text":"توم تېكىست","Underline text":"ئاستى سىزىق تېكىست","Strikethrough text":"ئۆچۈرۈش سىزىقى تېكىست"},getPluralForm(n){return 0;}}};
e[ 'ug' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ug' ].dictionary = Object.assign( e[ 'ug' ].dictionary, dictionary );
e[ 'ug' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
