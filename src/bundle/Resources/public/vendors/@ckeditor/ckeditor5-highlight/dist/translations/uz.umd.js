/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uz' ]: { dictionary, getPluralForm } } = {"uz":{"dictionary":{"Yellow marker":"Sariq marker bilan ta'kidlash","Green marker":"Yashil marker bilan ta'kidlash","Pink marker":"Pushti rang markeri bilan belgilang","Blue marker":"Moviy rang markeri bilan ajratib ko'rsatish","Red pen":"Matn rangi qizil","Green pen":"Matn rangi yashil","Remove highlight":"Ajratishni olib tashlash","Highlight":"Ajratish","Text highlight toolbar":"Matn tanlash asboblar paneli"},getPluralForm(n){return (n > 1);}}};
e[ 'uz' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uz' ].dictionary = Object.assign( e[ 'uz' ].dictionary, dictionary );
e[ 'uz' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
