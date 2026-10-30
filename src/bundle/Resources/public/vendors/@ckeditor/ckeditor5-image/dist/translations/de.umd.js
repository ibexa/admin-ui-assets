/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'de' ]: translations } = {"de":{"dictionary":{"image widget":"Bild-Steuerelement","In line":"Text in Zeile","Side image":"Seitenbild","Full size image":"Bild in voller Größe","Left aligned image":"Linksbündiges Bild","Centered image":"Zentriertes Bild","Right aligned image":"Rechtsbündiges Bild","Change image text alternative":"Alternativtext ändern","Text alternative":"Alternativtext","Enter image caption":"Bildunterschrift eingeben","Insert image":"Bild einfügen","Replace image":"Bild ersetzen","Upload from computer":"Vom Computer hochladen","Replace from computer":"Vom Computer ersetzen","Upload image from computer":"Bild vom Computer hochladen","Image from computer":"Bild vom Computer","From computer":"Vom Computer","Replace image from computer":"Bild vom Computer ersetzen","Upload failed":"Hochladen fehlgeschlagen","You have no image upload permissions.":"Sie haben keine Berechtigung zum Hochladen von Bildern.","Image toolbar":"Bild Werkzeugleiste","Resize image":"Bildgröße ändern","Resize image to %0":"Bildgröße ändern in %0","Resize image to the original size":"Bild in Originalgröße ändern","Resize image (in %0)":"Bildgröße ändern (in %0)","Custom image size":"Benutzerdefinierte Bildgröße","Image resize list":"Bildgrößen-Liste","Insert image via URL":"Bild von URL einfügen","Insert via URL":"Per URL einfügen","Image via URL":"Bild per URL","Via URL":"Per URL","Update image URL":"Bild-URL aktualisieren","Caption for the image":"Bildunterschrift","Caption for image: %0":"Bildunterschrift: %0","Uploading image":"Bild hochladen","Image upload complete":"Bild erfolgreich hochgeladen","Error during image upload":"Fehler beim Hochladen des Bildes","Image":"Bild","Image Resize":"Bildgrößenänderung","Text Alternative":"Textalternative"}}};
e[ 'de' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'de' ].dictionary = Object.assign( e[ 'de' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'de' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
