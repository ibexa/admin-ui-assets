/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bn' ]: translations } = {"bn":{"dictionary":{"media widget":"মিডিয়া উইজেট","Media URL":"মিডিয়া URL","Paste the media URL in the input.":"ইনপুটে মিডিয়া URL পেস্ট করুন।","Tip: Paste the URL into the content to embed faster.":"টিপ: দ্রুত এম্বেড করতে কন্টেন্টে URL পেস্ট করুন।","The URL must not be empty.":"URLটি খালি হওয়া উচিত নয়৷","This media URL is not supported.":"এই মিডিয়া URL সমর্থিত নয়।","Insert media":"মিডিয়া ঢোকান","Media embed":"মিডিয়া এম্বেড","Media":"মিডিয়া","Media toolbar":"মিডিয়া টুলবার","Open media in new tab":"নতুন ট্যাবে মিডিয়া খুলুন","Left aligned media":"বামদিকে সারিবদ্ধ মিডিয়া","Centered media":"মাঝখানে সারিবদ্ধ মিডিয়া","Right aligned media":"ডানদিকে সারিবদ্ধ মিডিয়া","Resize media":"মিডিয়ার সাইজ পরিবর্তন করুন","Resize media to %0":"মিডিয়ার সাইজ %0-এ পরিবর্তন করুন","Resize media to the original size":"মিডিয়ার সাইজ মূল অবস্থায় ফিরিয়ে আনুন","Resize media (in %0)":"মিডিয়ার সাইজ পরিবর্তন করুন (%0-এ)","Custom media size":"কাস্টম মিডিয়া সাইজ","Media resize list":"মিডিয়ার সাইজ পরিবর্তনের তালিকা","Media Resize":"মিডিয়ার সাইজ পরিবর্তন"}}};
e[ 'bn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bn' ].dictionary = Object.assign( e[ 'bn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
