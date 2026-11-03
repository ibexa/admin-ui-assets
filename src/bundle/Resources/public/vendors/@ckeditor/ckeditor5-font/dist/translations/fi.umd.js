/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fi' ]: translations } = {"fi":{"dictionary":{"Font Size":"Fontin koko","Tiny":"Hyvin pieni","Small":"Pieni","Big":"Suuri","Huge":"Hyvin suuri","Font Family":"Fonttiperhe","Default":"Oletus","Font Color":"Fontin väri","Font Background Color":"Fontin taustaväri","Document colors":"Asiakirjan värit"}}};
e[ 'fi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fi' ].dictionary = Object.assign( e[ 'fi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
