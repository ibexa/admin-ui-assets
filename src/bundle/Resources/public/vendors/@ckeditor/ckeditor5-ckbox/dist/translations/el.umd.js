/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'el' ]: { dictionary, getPluralForm } } = {"el":{"dictionary":{"Open file manager":"Άνοιγμα διαχειριστή αρχείων","Cannot determine a category for the uploaded file.":"Δεν μπορεί να οριστεί κατηγορία για το αρχείο που μεταφορτώθηκε.","Cannot access default workspace.":"Δεν είναι δυνατή η πρόσβαση στον προεπιλεγμένο χώρο εργασίας","You have no image editing permissions.":"Δεν έχεις άδειες επεξεργασίας εικόνας.","Edit image":"Επεξεργασία εικόνας","Processing the edited image.":"Επεξεργασία της επεξεργασμένης εικόνας","Server failed to process the image.":"Ο διακομιστής απέτυχε να επεξεργαστεί την εικόνα.","Failed to determine category of edited image.":"Απέτυχε ο προσδιορισμός της κατηγορίας της επεξεργασμένης εικόνας."},getPluralForm(n){return (n != 1);}}};
e[ 'el' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'el' ].dictionary = Object.assign( e[ 'el' ].dictionary, dictionary );
e[ 'el' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
