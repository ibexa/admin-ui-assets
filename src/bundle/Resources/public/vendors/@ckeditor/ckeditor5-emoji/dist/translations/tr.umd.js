/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tr' ]: { dictionary, getPluralForm } } = {"tr":{"dictionary":{"Emoji":"Emoji","Show all emoji...":"Tüm emojileri göster...","Find an emoji (min. 2 characters)":"Bir emoji bulun (min. 2 karakter)","No emojis were found matching \"%0\".":"\"%0\" ile eşleşen emoji bulunamadı.","Keep on typing to see the emoji.":"Emojiyi görmek için yazmaya devam edin.","The query must contain at least two characters.":"Sorgu en az iki karakter içermelidir.","Smileys & Expressions":"Smiley'ler ve İfadeler","Gestures & People":"Jestler ve İnsanlar","Animals & Nature":"Hayvanlar ve Doğa","Food & Drinks":"Yiyecekler ve İçecekler","Travel & Places":"Seyahatler ve Yerler","Activities":"Aktiviteler","Objects":"Nesneler","Symbols":"Semboller","Flags":"Bayraklar","Select skin tone":"Ten tonunu seçin","Default skin tone":"Varsayılan ten tonu","Light skin tone":"Açık ten tonu","Medium Light skin tone":"Orta Açık ten tonu","Medium skin tone":"Orta ten tonu","Medium Dark skin tone":"Orta Koyu ten tonu","Dark skin tone":"Koyu ten tonu","Emoji picker":"Emoji seçici"},getPluralForm(n){return (n > 1);}}};
e[ 'tr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tr' ].dictionary = Object.assign( e[ 'tr' ].dictionary, dictionary );
e[ 'tr' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
