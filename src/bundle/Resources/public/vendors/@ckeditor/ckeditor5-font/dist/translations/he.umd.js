/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'he' ]: translations } = {"he":{"dictionary":{"Font Size":"גודל טקסט","Tiny":"זעיר","Small":"קטן","Big":"גדול","Huge":"ענק","Font Family":"משפחת גופנים","Default":"ברירת מחדל","Font Color":"צבע גופן","Font Background Color":"צבע הרקע של הגופן","Document colors":"צבעי המסמך"}}};
e[ 'he' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'he' ].dictionary = Object.assign( e[ 'he' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'he' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
