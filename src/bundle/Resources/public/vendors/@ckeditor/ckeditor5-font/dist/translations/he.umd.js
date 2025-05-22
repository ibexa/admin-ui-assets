/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'he' ]: { dictionary, getPluralForm } } = {"he":{"dictionary":{"Font Size":"גודל טקסט","Tiny":"זעיר","Small":"קטן","Big":"גדול","Huge":"ענק","Font Family":"משפחת גופנים","Default":"ברירת מחדל","Font Color":"צבע גופן","Font Background Color":"צבע הרקע של הגופן","Document colors":"צבעי המסמך"},getPluralForm(n){return (n != 1);}}};
e[ 'he' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'he' ].dictionary = Object.assign( e[ 'he' ].dictionary, dictionary );
e[ 'he' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
