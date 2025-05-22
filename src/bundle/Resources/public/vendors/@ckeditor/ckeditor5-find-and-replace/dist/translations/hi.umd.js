/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hi' ]: { dictionary, getPluralForm } } = {"hi":{"dictionary":{"Find and replace":"ढूँढें और बदलें","Find in text…":"टेक्स्ट में ढूंढें…","Find":"ढूँढें","Previous result":"पिछला रेज़ल्ट","Next result":"अगला रेज़ल्ट","Replace":"बदलें","Replace all":"सब बदल दें","Match case":"केस मैच करें","Whole words only":"केवल पूरे शब्द","Replace with…":"...के साथ बदलें","Text to find must not be empty.":"खोजने के लिए टेक्स्ट खाली नहीं होना चाहिए.","Tip: Find some text first in order to replace it.":"टिप:उसे बदलने के लिए पहले कुछ वह टेक्स्ट खोजें.","Advanced options":"एडवांस्ड विकल्प","Find in the document":"डॉक्युमेंट में खोजें"},getPluralForm(n){return (n != 1);}}};
e[ 'hi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hi' ].dictionary = Object.assign( e[ 'hi' ].dictionary, dictionary );
e[ 'hi' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
