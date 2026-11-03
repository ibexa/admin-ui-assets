/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fi' ]: translations } = {"fi":{"dictionary":{"media widget":"mediawidget","Media URL":"Media-URL","Paste the media URL in the input.":"Liitä media-URL syötteeseen.","Tip: Paste the URL into the content to embed faster.":"Vinkki: liitä URL sisältöön upottaaksesi sen nopeammin.","The URL must not be empty.":"URL-osoite ei voi olla tyhjä.","This media URL is not supported.":"Tätä media-URLia ei tueta.","Insert media":"Liitä media","Media embed":"Median upotus","Media":"Media","Media toolbar":"Median työkalupalkki","Open media in new tab":"Avaa media uudessa välilehdessä","Left aligned media":"Vasemmalle tasattu media","Centered media":"Keskitetty media","Right aligned media":"Oikealle tasattu media","Resize media":"Muuta median kokoa","Resize media to %0":"Muuta median kooksi %0","Resize media to the original size":"Muuta median koko alkuperäiseksi","Resize media (in %0)":"Muuta median kokoa (koossa %0)","Custom media size":"Mukautettu median koko","Media resize list":"Median koon muuttamisluettelo","Media Resize":"Median koon muuttaminen"}}};
e[ 'fi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fi' ].dictionary = Object.assign( e[ 'fi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
