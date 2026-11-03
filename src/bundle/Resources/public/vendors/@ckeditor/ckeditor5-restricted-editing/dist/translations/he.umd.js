/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'he' ]: translations } = {"he":{"dictionary":{"Disable editing":"הפוך עריכה ללא זמינה","Enable editing":"אפשר עריכה","Disable inline editing":"ביטול אפשרות עריכה בתוך השורה","Enable inline editing":"אפשר עריכה בתוך השורה","Disable block editing":"ביטול אפשרות עריכת בלוקים","Enable block editing":"אפשר עריכת בלוקים","Previous editable region":"האזור הקודם שניתן לעריכה","Next editable region":"האזור הבא שניתן לעריכה","Navigate editable regions":"ניווט באזורים הניתנים לעריכה"}}};
e[ 'he' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'he' ].dictionary = Object.assign( e[ 'he' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'he' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
