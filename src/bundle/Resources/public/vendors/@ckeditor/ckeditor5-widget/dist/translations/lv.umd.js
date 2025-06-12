/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lv' ]: { dictionary, getPluralForm } } = {"lv":{"dictionary":{"Widget toolbar":"Sīkrīku rīkjosla","Insert paragraph before block":"Ievietot paragrāfu pirms bloka","Insert paragraph after block":"Ievietot paragrāfu aiz bloka","Press Enter to type after or press Shift + Enter to type before the widget":"Nospiediet taustiņu Enter, lai rakstītu aiz logrīka, vai nospiediet taustiņu Shift + Enter, lai rakstītu pirms logrīka","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Taustiņsitieni, kurus var izmantot, kad ir atlasīts logrīks (piemēram, attēls, tabula utt.)","Insert a new paragraph directly after a widget":"Ievietot jaunu rindkopu tieši aiz logrīka","Insert a new paragraph directly before a widget":"Ievietot jaunu rindkopu tieši pirms logrīka","Move the caret to allow typing directly before a widget":"Pārvietot kursoru, lai rakstītu tieši pirms logrīka","Move the caret to allow typing directly after a widget":"Pārvietot kursoru, lai rakstītu tieši aiz logrīka","Move focus from an editable area back to the parent widget":"Mainiet fokusu no rediģējamā apgabala uz  pamatrīku"},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n != 0 ? 1 : 2);}}};
e[ 'lv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lv' ].dictionary = Object.assign( e[ 'lv' ].dictionary, dictionary );
e[ 'lv' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
