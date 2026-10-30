/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ne' ]: translations } = {"ne":{"dictionary":{"Align left":"बायाँ पङ्क्तिबद्ध गर्नुहोस्","Align right":"दायाँ पङ्क्तिबद्ध गर्नुहोस्","Align center":"केन्द्र पङ्क्तिबद्ध गर्नुहोस्","Justify":"जस्टिफाइ गर्नुहोस्","Text alignment":"पाठ संरेखण","Text alignment toolbar":""}}};
e[ 'ne' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ne' ].dictionary = Object.assign( e[ 'ne' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ne' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
