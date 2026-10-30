/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ar' ]: translations } = {"ar":{"dictionary":{"Font Size":"حجم الخط","Tiny":"ضئيل","Small":"صغير","Big":"كبير","Huge":"ضخم","Font Family":"نوع الخط","Default":"افتراضي","Font Color":"لون الخط","Font Background Color":"لون خلفية الخط","Document colors":"ألوان المستند"}}};
e[ 'ar' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ar' ].dictionary = Object.assign( e[ 'ar' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ar' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
