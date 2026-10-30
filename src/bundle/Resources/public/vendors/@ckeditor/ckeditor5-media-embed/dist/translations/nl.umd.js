/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nl' ]: translations } = {"nl":{"dictionary":{"media widget":"media widget","Media URL":"Media URL","Paste the media URL in the input.":"Plak de media URL in het invoerveld.","Tip: Paste the URL into the content to embed faster.":"Tip: plak de URL in de inhoud om deze sneller in te laten sluiten.","The URL must not be empty.":"De URL mag niet leeg zijn.","This media URL is not supported.":"Deze media URL wordt niet ondersteund.","Insert media":"Voer media in","Media embed":"Media insluiten","Media":"Media","Media toolbar":"Media werkbalk","Open media in new tab":"Open media in nieuw tabblad","Left aligned media":"Links uitgelijnde media","Centered media":"Gecentreerde media","Right aligned media":"Rechts uitgelijnde media","Resize media":"Mediaformaat wijzigen","Resize media to %0":"Mediaformaat wijzigen naar %0","Resize media to the original size":"Mediaformaat wijzigen naar het originele formaat","Resize media (in %0)":"Mediaformaat wijzigen (in %0)","Custom media size":"Aangepast mediaformaat","Media resize list":"Lijst mediaformaat wijzigen","Media Resize":"Mediaformaat wijzigen"}}};
e[ 'nl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nl' ].dictionary = Object.assign( e[ 'nl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'nl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
