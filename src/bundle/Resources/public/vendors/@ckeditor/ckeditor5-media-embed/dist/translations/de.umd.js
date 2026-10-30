/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'de' ]: translations } = {"de":{"dictionary":{"media widget":"Medien-Widget","Media URL":"Medien-URL","Paste the media URL in the input.":"Medien-URL in das Eingabefeld einfügen.","Tip: Paste the URL into the content to embed faster.":"Tipp: Zum schnelleren Einbetten können Sie die Medien-URL in den Inhalt einfügen.","The URL must not be empty.":"Die URL darf nicht leer sein.","This media URL is not supported.":"Diese Medien-URL wird nicht unterstützt.","Insert media":"Medium einfügen","Media embed":"Medieneinbettung","Media":"Medien","Media toolbar":"Medien Werkzeugleiste","Open media in new tab":"Medien in neuem Tab öffnen","Left aligned media":"Links ausgerichtete Medien","Centered media":"Zentrierte Medien","Right aligned media":"Rechts ausgerichtete Medien","Resize media":"Mediengröße ändern","Resize media to %0":"Mediengröße auf %0 ändern","Resize media to the original size":"Mediengröße auf Originalgröße zurücksetzen","Resize media (in %0)":"Mediengröße ändern (auf %0)","Custom media size":"Benutzerdefinierte Mediengröße","Media resize list":"Liste zur Änderung der Mediengröße","Media Resize":"Mediengröße ändern"}}};
e[ 'de' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'de' ].dictionary = Object.assign( e[ 'de' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'de' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
