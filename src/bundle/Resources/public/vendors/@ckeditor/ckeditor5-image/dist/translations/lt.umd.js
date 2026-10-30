/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lt' ]: translations } = {"lt":{"dictionary":{"image widget":"vaizdų valdiklis","In line":"tolygiai","Side image":"Vaizdas šone","Full size image":"Pilno dydžio vaizdas","Left aligned image":"Vaizdas kairėje","Centered image":"Vaizdas centre","Right aligned image":"Vaizdas dešinėje","Change image text alternative":"Pakeisti vaizdo alternatyvųjį tekstą","Text alternative":"Alternatyvusis tekstas","Enter image caption":"Įveskite vaizdo antraštę","Insert image":"Įterpti vaizdą","Replace image":"Pakeisti vaizdą","Upload from computer":"Įkelti iš kompiuterio","Replace from computer":"Pakeisti iš kompiuterio","Upload image from computer":"Įkelti paveiksliuką iš kompiuterio","Image from computer":"Įkelti vaizdą iš kompiuterio","From computer":"Iš kompiuterio","Replace image from computer":"Pakeisti paveiksliuką iš kompiuterio","Upload failed":"Įkelti nepavyko","You have no image upload permissions.":"Jūs neturite leidimo nuotraukoms įkelti.","Image toolbar":"Paveikslėlių įrankių juosta","Resize image":"Pakeisti paveikslėlio dydį","Resize image to %0":"Pakeisti paveikslėlio dydį į %0","Resize image to the original size":"Pakeisti paveikslėlio dydį į originalų","Resize image (in %0)":"Pakeisti vaizdo dydį (%0)","Custom image size":"Tinkinti vaizdo dydį","Image resize list":"Paveikslėlio dydžio keitimo sąrašas","Insert image via URL":"Įkelti paveikslėlį naudojant URL","Insert via URL":"Įterpti naudojant URL","Image via URL":"Vaizdas naudojant URL","Via URL":"Naudojant URL","Update image URL":"Atnaujinti paveikslėlio URL","Caption for the image":"Vaizdo antraštė","Caption for image: %0":"Vaizdo antraštė: %0","Uploading image":"Įkeliamas vaizdas","Image upload complete":"Užbaigtas vaizdo įkėlimas","Error during image upload":"Įkeliant vaizdą, įvyko klaida","Image":"Vaizdas","Image Resize":"Paveikslėlio dydžio keitimas","Text Alternative":"Teksto alternatyva"}}};
e[ 'lt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lt' ].dictionary = Object.assign( e[ 'lt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
