/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'el' ]: translations } = {"el":{"dictionary":{"Disable editing":"Απενεργοποίηση επεξεργασίας","Enable editing":"Ενεργοποίηση επεξεργασίας","Disable inline editing":"Απενεργοποίηση ενσωματωμένης επεξεργασίας","Enable inline editing":"Ενεργοποίηση ενσωματωμένης επεξεργασίας","Disable block editing":"Απενεργοποίηση επεξεργασίας μπλοκ","Enable block editing":"Ενεργοποίηση επεξεργασίας μπλοκ","Previous editable region":"Προηγούμενη επεξεργάσιμη περιοχή","Next editable region":"Επόμενη επεξεργάσιμη περιοχή","Navigate editable regions":"Πλοήγηση στις επεξεργάσιμες περιοχές"}}};
e[ 'el' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'el' ].dictionary = Object.assign( e[ 'el' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'el' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
