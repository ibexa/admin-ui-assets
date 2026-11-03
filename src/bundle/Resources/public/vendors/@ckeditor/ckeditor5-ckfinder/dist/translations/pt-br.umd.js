/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt-br' ]: translations } = {"pt-br":{"dictionary":{"Insert image or file":"Inserir imagem ou arquivo","Could not obtain resized image URL.":"Não foi possível obter o endereço da imagem redimensionada","Selecting resized image failed":"Seleção da imagem redimensionada falhou","Could not insert image at the current position.":"Não foi possível inserir a imagem na posição atual","Inserting image failed":"Falha ao inserir imagem"}}};
e[ 'pt-br' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt-br' ].dictionary = Object.assign( e[ 'pt-br' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pt-br' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
