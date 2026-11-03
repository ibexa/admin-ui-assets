/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ti' ]: translations } = {"ti":{"dictionary":{"Align left":"ንጸጋም ኣመዓራርይ","Align right":"ንየማን ኣመዓራርይ","Align center":"ናብ ማእኸል ኣመዓራርይ","Justify":"ብማዕረ መጠን ናብ ኩሉ ኣንፈት ኣመዓራርይ","Text alignment":"ምዕረያ ጽሑፍ","Text alignment toolbar":"መካወኒ ምዕረያ ጽሑፍ"}}};
e[ 'ti' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ti' ].dictionary = Object.assign( e[ 'ti' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ti' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
