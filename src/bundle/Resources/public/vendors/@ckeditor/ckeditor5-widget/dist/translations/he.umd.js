/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'he' ]: { dictionary, getPluralForm } } = {"he":{"dictionary":{"Widget toolbar":"סרגל יישומון","Insert paragraph before block":"הוספת פסקה מעל","Insert paragraph after block":"הוספת פסקה מתחת","Press Enter to type after or press Shift + Enter to type before the widget":"לחץ Enter כדי להקליד לפני היישומון או Shift + Enter כדי להקליד אחריו","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"מקשים בהם ניתן להשתמש כאשר נבחר ווידג'ט (לדוגמה: תמונה, טבלה וכו')","Insert a new paragraph directly after a widget":"הוספת פסקה חדשה ישירות אחרי ווידג'ט","Insert a new paragraph directly before a widget":"הוספת פסקה חדשה ישירות לפני ווידג'ט","Move the caret to allow typing directly before a widget":"הזזת הסמן כדי לאפשר הקלדה ישירות לפני ווידג'ט","Move the caret to allow typing directly after a widget":"הזזת הסמן כדי לאפשר הקלדה ישירות אחרי ווידג'ט","Move focus from an editable area back to the parent widget":"החזרת המיקוד מאזור בר-עריכה לחפיץ האב"},getPluralForm(n){return (n != 1);}}};
e[ 'he' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'he' ].dictionary = Object.assign( e[ 'he' ].dictionary, dictionary );
e[ 'he' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
