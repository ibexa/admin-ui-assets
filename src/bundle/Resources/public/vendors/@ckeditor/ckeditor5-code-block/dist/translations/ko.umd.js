/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ko' ]: { dictionary, getPluralForm } } = {"ko":{"dictionary":{"Insert code block":"코드 블럭 삽입","Plain text":"평문","Leaving %0 code snippet":"%0 코드 스니펫 남기는 중","Entering %0 code snippet":"%0 코드 스니펫 입력하는 중","Entering code snippet":"코드 스니펫 입력하는 중","Leaving code snippet":"코드 스니펫 남기는 중","Code block":"코드 블록"},getPluralForm(n){return 0;}}};
e[ 'ko' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ko' ].dictionary = Object.assign( e[ 'ko' ].dictionary, dictionary );
e[ 'ko' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
