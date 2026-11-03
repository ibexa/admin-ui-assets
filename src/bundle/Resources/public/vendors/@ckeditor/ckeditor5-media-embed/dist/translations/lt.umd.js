/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lt' ]: translations } = {"lt":{"dictionary":{"media widget":"media valdiklis","Media URL":"Media URL","Paste the media URL in the input.":"Įklijuokite media URL adresą į įvedimo lauką.","Tip: Paste the URL into the content to embed faster.":"Patarimas: norėdami greičiau įterpti media tiesiog įklijuokite URL į turinį.","The URL must not be empty.":"URL negali būti tuščias.","This media URL is not supported.":"Šis media URL yra nepalaikomas.","Insert media":"Įterpkite media","Media embed":"Medijos įterpimas","Media":"Medija","Media toolbar":"Medijų įrankių juosta","Open media in new tab":"Atidaryti mediją naujame skirtuke","Left aligned media":"Kairėje pusėje lygiuota medija","Centered media":"Centrinė medijos lygiuotė","Right aligned media":"Dešinėje pusėje lygiuota medija","Resize media":"Pakeisti medijos dydį","Resize media to %0":"Pakeisti medijos dydį į %0","Resize media to the original size":"Pakeisti medijos dydį į pradinį","Resize media (in %0)":"Pakeisti medijos dydį (į %0)","Custom media size":"Pasirinktinis medijos dydis","Media resize list":"Medijos dydžio keitimo sąrašas","Media Resize":"Medijos dydžio keitimas"}}};
e[ 'lt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lt' ].dictionary = Object.assign( e[ 'lt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
