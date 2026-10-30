/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tr' ]: translations } = {"tr":{"dictionary":{"Disable editing":"Düzenlemeyi devre dışı bırak","Enable editing":"Düzenlemeyi etkinleştir","Disable inline editing":"Satır içi düzenlemeyi devre dışı bırak","Enable inline editing":"Satır içi düzenlemeyi etkinleştir","Disable block editing":"Blok düzenlemeyi devre dışı bırak","Enable block editing":"Blok düzenlemeyi etkinleştir","Previous editable region":"Önceki düzenlenebilir alan","Next editable region":"Sonraki düzenlenebilir alan","Navigate editable regions":"Düzenlenebilir alanlara git"}}};
e[ 'tr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tr' ].dictionary = Object.assign( e[ 'tr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
