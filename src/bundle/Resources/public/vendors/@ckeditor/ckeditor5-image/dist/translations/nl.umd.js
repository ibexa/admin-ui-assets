/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nl' ]: translations } = {"nl":{"dictionary":{"image widget":"afbeeldingswidget","In line":"In lijn","Side image":"Afbeelding naast tekst","Full size image":"Afbeelding op volledige grootte","Left aligned image":"Links uitgelijnde afbeelding","Centered image":"Gecentreerde afbeelding","Right aligned image":"Rechts uitgelijnde afbeelding","Change image text alternative":"Verander alt-tekst van de afbeelding","Text alternative":"Alt-tekst","Enter image caption":"Typ een afbeeldingsbijschrift","Insert image":"Afbeelding toevoegen","Replace image":"Afbeelding vervangen","Upload from computer":"Uploaden vanaf computer","Replace from computer":"Vervangen vanaf de computer","Upload image from computer":"Afbeelding uploaden vanaf de computer","Image from computer":"Afbeelding van computer","From computer":"Van computer","Replace image from computer":"Afbeelding vervangen vanaf computer","Upload failed":"Uploaden afbeelding mislukt","You have no image upload permissions.":"U heeft geen toestemming om afbeeldingen te uploaden.","Image toolbar":"Afbeeldingswerkbalk","Resize image":"Afbeeldingsformaat wijzigen","Resize image to %0":"Afbeeldingsformaat wijzigen naar %0","Resize image to the original size":"Afbeeldingsformaat wijzigen naar originele grootte","Resize image (in %0)":"Formaat afbeelding wijzigen (in %0)","Custom image size":"Aangepaste afbeeldingsgrootte","Image resize list":"Lijst voor wijzigen van afbeeldingsformaat","Insert image via URL":"Afbeelding toevoegen via URL","Insert via URL":"Via URL invoegen","Image via URL":"Afbeelding via URL","Via URL":"Via URL","Update image URL":"URL van afbeelding bijwerken","Caption for the image":"Bijschrift voor afbeelding","Caption for image: %0":"Bijschrift voor afbeelding: %0","Uploading image":"Afbeelding uploaden","Image upload complete":"Uploaden van afbeelding voltooid","Error during image upload":"Fout tijdens het uploaden van afbeeldingen","Image":"Afbeelding","Image Resize":"Afbeeldingformaat wijzigen","Text Alternative":"Tekstalternatief"}}};
e[ 'nl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nl' ].dictionary = Object.assign( e[ 'nl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'nl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
