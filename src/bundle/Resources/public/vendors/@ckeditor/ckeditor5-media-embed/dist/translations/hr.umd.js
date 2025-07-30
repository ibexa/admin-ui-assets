/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hr' ]: { dictionary, getPluralForm } } = {"hr":{"dictionary":{"media widget":"dodatak za medije","Media URL":"URL medija","Paste the media URL in the input.":"Zalijepi URL medija u ulaz.","Tip: Paste the URL into the content to embed faster.":"Natuknica: Za brže ugrađivanje zalijepite URL u sadržaj.","The URL must not be empty.":"URL ne smije biti prazan.","This media URL is not supported.":"URL nije podržan.","Insert media":"Ubaci medij","Media":"","Media toolbar":"Traka za medije","Open media in new tab":"Otvori medije u novoj kartici","Media embed":""},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'hr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hr' ].dictionary = Object.assign( e[ 'hr' ].dictionary, dictionary );
e[ 'hr' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
