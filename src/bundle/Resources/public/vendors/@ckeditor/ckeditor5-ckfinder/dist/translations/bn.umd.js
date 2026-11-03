/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bn' ]: translations } = {"bn":{"dictionary":{"Insert image or file":"ছবি অথবা ফাইল ঢোকান","Could not obtain resized image URL.":"আকার পরিবর্তন করা ছবির URL পাওয়া যাচ্ছে না।","Selecting resized image failed":"আকার পরিবর্তন করা ছবি নির্বাচন করা ব্যর্থ হয়েছে","Could not insert image at the current position.":"বর্তমান অবস্থানে ছবি ঢোকানো যাচ্ছে না।","Inserting image failed":"ছবি ঢোকানো ব্যর্থ হয়েছে।"}}};
e[ 'bn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bn' ].dictionary = Object.assign( e[ 'bn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
