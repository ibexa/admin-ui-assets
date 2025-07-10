/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hi' ]: { dictionary, getPluralForm } } = {"hi":{"dictionary":{"Enter fullscreen mode":"फ़ुलस्क्रीन मोड में प्रवेश करें","Leave fullscreen mode":"फ़ुलस्क्रीन मोड छोड़ें","Fullscreen mode":"फ़ुलस्क्रीन मोड","Toggle fullscreen mode":"फ़ुलस्क्रीन मोड स्विच करें","Document outline":"डॉक्युमेंट की पूरी तस्वीर","Connected users":"जुड़े हुए यूज़र"},getPluralForm(n){return (n != 1);}}};
e[ 'hi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hi' ].dictionary = Object.assign( e[ 'hi' ].dictionary, dictionary );
e[ 'hi' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
