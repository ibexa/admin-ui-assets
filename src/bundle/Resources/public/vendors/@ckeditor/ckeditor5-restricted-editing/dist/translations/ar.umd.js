/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ar' ]: translations } = {"ar":{"dictionary":{"Disable editing":"تعطيل التحرير","Enable editing":"تمكين التحرير","Disable inline editing":"تعطيل التحرير المضمن","Enable inline editing":"تفعيل التحرير المضمن","Disable block editing":"تعطيل تحرير الكتل","Enable block editing":"تفعيل تحرير الكتل","Previous editable region":"منطقة التحرير السابقة","Next editable region":"منطقة التحرير التالية","Navigate editable regions":"التنقل في مناطق التحرير"}}};
e[ 'ar' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ar' ].dictionary = Object.assign( e[ 'ar' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ar' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
