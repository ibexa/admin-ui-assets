/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bn' ]: { dictionary, getPluralForm } } = {"bn":{"dictionary":{"Find and replace":"অনুসন্ধান ও প্রতিস্থাপন করুন","Find in text…":"টেক্সটে খুঁজুন…","Find":"খুঁজুন ","Previous result":"পূর্ববর্তী ফলাফল","Next result":"পরবর্তী ফলাফল","Replace":"প্রতিস্থাপন করুন","Replace all":"সব প্রতিস্থাপন","Match case":"ম্যাচ কেস","Whole words only":"শুধুমাত্র পুরো শব্দ","Replace with…":"এর সাথে প্রতিস্থাপন...","Text to find must not be empty.":"খুঁজে পেতে টেক্সট খালি হওয়া উচিত নয়।","Tip: Find some text first in order to replace it.":"পরামর্শঃ এটি প্রতিস্থাপন করতে প্রথমে কিছু টেক্সট খুঁজুন।","Advanced options":"উন্নত বিকল্পগুলি","Find in the document":"ডকুমেন্টে খুঁজুন"},getPluralForm(n){return (n != 1);}}};
e[ 'bn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bn' ].dictionary = Object.assign( e[ 'bn' ].dictionary, dictionary );
e[ 'bn' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
