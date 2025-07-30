/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'zh' ]: { dictionary, getPluralForm } } = {"zh":{"dictionary":{"Numbered List":"有序清單","Bulleted List":"符號清單","To-do List":"代辦清單","Bulleted list styles toolbar":"無序清單工具列","Numbered list styles toolbar":"有序清單工具列","Toggle the disc list style":"切換為實心圓點標示","Toggle the circle list style":"切換為空心圓點標示","Toggle the square list style":"切換為方形標示","Toggle the decimal list style":"切換為數字標示","Toggle the decimal with leading zero list style":"切換為0開頭的數字標示","Toggle the lower–roman list style":"切換為小寫羅馬數字標示","Toggle the upper–roman list style":"切換為大寫羅馬數字標示","Toggle the lower–latin list style":"切換為小寫拉丁文字標示","Toggle the upper–latin list style":"切換為大寫拉丁文字標示","Disc":"實心圓點","Circle":"空心圓點","Square":"方形","Decimal":"數字","Decimal with leading zero":"0開頭的數字","Lower–roman":"小寫羅馬數字","Upper-roman":"大寫羅馬數字","Lower-latin":"小寫拉丁字母","Upper-latin":"大寫拉丁字母","List properties":"清單屬性","Start at":"起始於","Invalid start index value.":"無效的起始索引值。","Start index must be greater than 0.":"起始索引須大於 0。","Reversed order":"反轉順序","Keystrokes that can be used in a list":"可在列表中使用的按鍵","Increase list item indent":"增加列表項目縮排","Decrease list item indent":"減少列表項目縮排","Entering a to-do list":"進入待辦事項清單","Leaving a to-do list":"離開待辦事項清單"},getPluralForm(n){return 0;}}};
e[ 'zh' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'zh' ].dictionary = Object.assign( e[ 'zh' ].dictionary, dictionary );
e[ 'zh' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
