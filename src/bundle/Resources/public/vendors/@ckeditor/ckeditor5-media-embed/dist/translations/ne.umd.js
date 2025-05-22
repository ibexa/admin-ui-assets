/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ne' ]: { dictionary, getPluralForm } } = {"ne":{"dictionary":{"media widget":"मिडिया विजेट","Media URL":"मिडिया यूआरएल","Paste the media URL in the input.":"इनपुटमा मिडिया यूआरएल पेस्ट गर्नुहोस्।","Tip: Paste the URL into the content to embed faster.":"सुझाव:छिटो इम्बेड गर्न यूआरएल सामग्रीमा पेस्ट गर्नुहोस्।","The URL must not be empty.":"यूआरएल खाली हुनु हुँदैन।","This media URL is not supported.":"यो मिडिया यूआरएल समर्थित छैन।","Insert media":"मिडिया सम्मिलित गर्नुहोस्।","Media":"","Media toolbar":"","Open media in new tab":"","Media embed":""},getPluralForm(n){return (n != 1);}}};
e[ 'ne' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ne' ].dictionary = Object.assign( e[ 'ne' ].dictionary, dictionary );
e[ 'ne' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
