/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tr' ]: { dictionary, getPluralForm } } = {"tr":{"dictionary":{"Widget toolbar":"Bileşen araç çubuğu","Insert paragraph before block":"Bloktan önce paragraf ekle","Insert paragraph after block":"Bloktan sonra paragraf ekle","Press Enter to type after or press Shift + Enter to type before the widget":"Görsel bileşenden sonra yazmak için Enter'a basın ya da görsel bileşenden önce yazmak için Shift + Enter'a basın","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Bir araç takımı seçildiğinde kullanılabilecek tuş vuruşları (örnek: resim, tablo vb.)","Insert a new paragraph directly after a widget":"Araç takımının hemen sonrasına yeni bir paragraf ekle","Insert a new paragraph directly before a widget":"Araç takımının hemen öncesine yeni bir paragraf ekle","Move the caret to allow typing directly before a widget":"Bir araç takımından hemen önce yazmaya izin vermek için ekleme noktasını taşı","Move the caret to allow typing directly after a widget":"Bir araç takımından hemen sonra yazmaya izin vermek için ekleme noktasını taşı","Move focus from an editable area back to the parent widget":"Odağı düzenlenebilir bir alandan üst pencere öğesine geri taşıyın"},getPluralForm(n){return (n > 1);}}};
e[ 'tr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tr' ].dictionary = Object.assign( e[ 'tr' ].dictionary, dictionary );
e[ 'tr' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
