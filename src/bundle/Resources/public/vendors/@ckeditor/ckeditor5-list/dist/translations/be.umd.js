/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: translations } = {"be":{"dictionary":{"Numbered List":"Нумарыроўваны спіс","Bulleted List":"Маркіраваны спіс","To-do List":"Спіс задач","Bulleted list styles toolbar":"Стылі маркіраваных спісаў","Numbered list styles toolbar":"Стылі нумарыроўваных спісаў","Toggle the disc list style":"Пераключыць на стыль маркіраваных спісаў з дыскам","Toggle the circle list style":"Пераключыць на стыль маркіраваных спісаў з кругам","Toggle the square list style":"Пераключыць на стыль маркіраваных спісаў з квадратам","Toggle the decimal list style":"Пераключыць на стыль маркіраваных спісаў з лікамі","Toggle the decimal with leading zero list style":"Пераключыць стыль спісу з дзесятковым лікам, які пачынаецца з нуля","Toggle the lower–roman list style":"Пераключыць на стыль маркіраваных спісаў з малымі рымскімі лікамі","Toggle the upper–roman list style":"Пераключыць на стыль маркіраваных спісаў з вялікімі рымскімі лікамі","Toggle the lower–latin list style":"Пераключыць на стыль маркіраваных спісаў з малымі лацінскімі лікамі","Toggle the upper–latin list style":"Пераключыць на стыль маркіраваных спісаў з вялікімі лацінскімі лікамі","Toggle the arabic-indic list style":"","Arabic-indic":"","Disc":"Дыск","Circle":"Круг","Square":"Квадрат","Decimal":"Дзесятковы","Decimal with leading zero":"Дзесятковы з нулямі ў пачатку","Lower–roman":"Малыя рымскія","Upper-roman":"Вялікія рымскія","Lower-latin":"Малыя лацінскія","Upper-latin":"Вялікія лацінскія","List properties":"Уласцівасці спіса","Start at":"Пачаць з","Invalid start index value.":"Памылковае значэнне пачатковага індэкса.","Start index must be greater than 0.":"Пачатковы індэкс павінен быць большым за 0.","Reversed order":"Адваротны парадак","Keystrokes that can be used in a list":"Спалучэнні клавіш, якія можна выкарыстоўваць у спісе","Increase list item indent":"Павялічыць адступ элемента спісу","Decrease list item indent":"Паменшыць адступ элемента спісу","Entering a to-do list":"Увод спісу задач","Leaving a to-do list":"Выхад з спісу задач"}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'be' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
