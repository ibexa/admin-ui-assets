/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fa' ]: { dictionary, getPluralForm } } = {"fa":{"dictionary":{"Disable editing":"غیرفعال کردن ویرایش","Enable editing":"فعال کردن ویرایش","Previous editable region":"","Next editable region":"","Navigate editable regions":""},getPluralForm(n){return 0;}}};
e[ 'fa' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fa' ].dictionary = Object.assign( e[ 'fa' ].dictionary, dictionary );
e[ 'fa' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
