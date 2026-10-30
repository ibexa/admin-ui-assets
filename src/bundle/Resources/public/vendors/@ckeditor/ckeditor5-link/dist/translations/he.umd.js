/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'he' ]: translations } = {"he":{"dictionary":{"Unlink":"ביטול קישור","Link":"קישור","Link URL":"קישור כתובת אתר","Link URL must not be empty.":"כתובת ה-URL של הקישור לא יכולה להיות ריקה.","Link image":"קישור תמונה","Link properties":"מאפייני קישור","Edit link":"עריכת קישור","Open link in new tab":"פתח קישור בכרטיסייה חדשה","Open in a new tab":"פתח בכרטיסייה חדשה","Downloadable":"ניתן להורדה","Create link":"יצירת קישור","Move out of a link":"יציאה מקישור","Displayed text":"טקסט מוצג","No links available":"אין קישורים זמינים","This link has no URL":"לקישור הזה אין URL"}}};
e[ 'he' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'he' ].dictionary = Object.assign( e[ 'he' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'he' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
