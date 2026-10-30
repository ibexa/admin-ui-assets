/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pl' ]: translations } = {"pl":{"dictionary":{"Open file manager":"Otwórz menedżer plików","Cannot determine a category for the uploaded file.":"Nie można ustalić kategorii przesłanego pliku.","Cannot access default workspace.":"Nie można uzyskać dostępu do domyślnego obszaru roboczego.","You have no image editing permissions.":"Nie masz uprawnień do edytowania obrazów.","Edit image":"Edytuj obraz","Processing the edited image.":"Trwa przetwarzanie edytowanego obrazu.","Server failed to process the image.":"Serwer nie mógł przetworzyć obrazu.","Failed to determine category of edited image.":"Nie udało się określić kategorii edytowanego obrazu."}}};
e[ 'pl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pl' ].dictionary = Object.assign( e[ 'pl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
