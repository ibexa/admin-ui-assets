/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'he' ]: translations } = {"he":{"dictionary":{"Bold":"מודגש","Italic":"נטוי","Underline":"קו תחתון","Code":"קוד","Strikethrough":"קו חוצה","Subscript":"כתב תחתי","Superscript":"כתב עילי","Italic text":"טקסט נטוי","Move out of an inline code style":"יציאה מסגנון קוד מוטבע","Bold text":"טקסט מודגש","Underline text":"הוספת קו תחתון לטקסט","Strikethrough text":"הוספת קו חוצה לטקסט"}}};
e[ 'he' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'he' ].dictionary = Object.assign( e[ 'he' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'he' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
