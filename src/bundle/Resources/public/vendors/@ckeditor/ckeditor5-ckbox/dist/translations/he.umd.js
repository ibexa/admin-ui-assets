/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'he' ]: { dictionary, getPluralForm } } = {"he":{"dictionary":{"Open file manager":"פתח את מנהל הקבצים","Cannot determine a category for the uploaded file.":"לא ניתן לקבוע קטגוריה עבור הקובץ שהועלה.","Cannot access default workspace.":"אין גישה למרחב העבודה של ברירת המחדל.","You have no image editing permissions.":"אין לך הרשאות עריכת תמונה.","Edit image":"עריכת תמונה","Processing the edited image.":"מעבד את התמונה הערוכה.","Server failed to process the image.":"השרת לא הצליח לעבד את התמונה.","Failed to determine category of edited image.":"קביעת הקטגוריה של התמונה הערוכה נכשלה."},getPluralForm(n){return (n != 1);}}};
e[ 'he' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'he' ].dictionary = Object.assign( e[ 'he' ].dictionary, dictionary );
e[ 'he' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
