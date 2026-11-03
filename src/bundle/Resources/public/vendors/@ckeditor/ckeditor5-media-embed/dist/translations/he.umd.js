/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'he' ]: translations } = {"he":{"dictionary":{"media widget":"יישומון מדיה","Media URL":"כתובת URL של מדיה","Paste the media URL in the input.":"הדביקו את כתובת ה-URL של המדיה בקלט.","Tip: Paste the URL into the content to embed faster.":"טיפ: הדביקו את כתובת ה-URL לתוך התוכן כדי להטמיע מהר יותר.","The URL must not be empty.":"כתובת URL לא יכולה להיות ריקה.","This media URL is not supported.":"כתובת ה-URL של מדיה זו אינה נתמכת.","Insert media":"הכנס מדיה","Media embed":"הטמעת מדיה","Media":"מדיה","Media toolbar":"סרגל כלים של מדיה","Open media in new tab":"פתח מדיה בכרטיסיה חדשה","Left aligned media":"יישור מדיה לשמאל","Centered media":"מדיה במרכז","Right aligned media":"יישור מדיה לימין","Resize media":"שינוי גודל המדיה","Resize media to %0":"שינוי גודל המדיה ל-%0","Resize media to the original size":"שינוי גודל המדיה לגודל המקורי","Resize media (in %0)":"שינוי גודל המדיה (ב-%0)","Custom media size":"גודל מדיה בהתאמה אישית","Media resize list":"רשימת שינויי גודל המדיה","Media Resize":"שינוי גודל מדיה"}}};
e[ 'he' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'he' ].dictionary = Object.assign( e[ 'he' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'he' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
