/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hi' ]: { dictionary, getPluralForm } } = {"hi":{"dictionary":{"Widget toolbar":"Widget toolbar","Insert paragraph before block":"Insert paragraph before block","Insert paragraph after block":"Insert paragraph after block","Press Enter to type after or press Shift + Enter to type before the widget":"विजेट के बाद टाइप करने के लिए एंटर  दबाएं या पहले टाइप करने के लिए शिफ्ट+एंटर दबाएं","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"वे कीस्ट्रोक्स जिनका इस्तेमाल किसी विजेट के सेलेक्ट किए जाने पर किया जा सकता है (जैसे: इमेज, टेबल, आदि)","Insert a new paragraph directly after a widget":"किसी विजेट के ठीक आगे एक नया पैराग्राफ़ इंसर्ट करें","Insert a new paragraph directly before a widget":"किसी विजेट के ठीक पीछे एक नया पैराग्राफ़ इंसर्ट करें","Move the caret to allow typing directly before a widget":"किसी विजेट के ठीक पीछे टाइप करने के लिए कैरेट को मूव करें","Move the caret to allow typing directly after a widget":"किसी विजेट के ठीक आगे टाइप करने के लिए कैरेट को मूव करें","Move focus from an editable area back to the parent widget":"एक एडिटेबल एरिया से पेरेंट विजेट पर फ़ोकस वापिस लाएँ"},getPluralForm(n){return (n != 1);}}};
e[ 'hi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hi' ].dictionary = Object.assign( e[ 'hi' ].dictionary, dictionary );
e[ 'hi' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
