/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ti' ]: { dictionary, getPluralForm } } = {"ti":{"dictionary":{"Heading":"ርእሲ","Choose heading":"ርእሲ ምረጽ","Heading 1":"ርእሲ 1","Heading 2":"ርእሲ 2","Heading 3":"ርእሲ 3","Heading 4":"ርእሲ 4","Heading 5":"ርእሲ 5","Heading 6":"ርእሲ 6","Type your title":"ርእሲ ጽሑፍካ ጸሓፍ","Type or paste your content here.":"ኣብዚ ቦታ ጽሑፍካ ጸሓፍ ወይ ጠቅዕ"},getPluralForm(n){return (n > 1);}}};
e[ 'ti' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ti' ].dictionary = Object.assign( e[ 'ti' ].dictionary, dictionary );
e[ 'ti' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
