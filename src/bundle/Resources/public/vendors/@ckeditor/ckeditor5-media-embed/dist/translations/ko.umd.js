/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ko' ]: translations } = {"ko":{"dictionary":{"media widget":"미디어 위젯","Media URL":"미디어 URL","Paste the media URL in the input.":"미디어 URL을 입력해주세요.","Tip: Paste the URL into the content to embed faster.":"팁: URL을 붙여넣으면 더 빨리 삽입할 수 있습니다.","The URL must not be empty.":"URL이 비어있을 수 없습니다.","This media URL is not supported.":"이 미디어 URL은 지원되지 않습니다.","Insert media":"미디어 삽입","Media embed":"미디어 삽입","Media":"미디어","Media toolbar":"미디어 툴바","Open media in new tab":"새 탭에서 미디어 열기","Left aligned media":"왼쪽 정렬 미디어","Centered media":"중앙 정렬 미디어","Right aligned media":"오른쪽 정렬 미디어","Resize media":"미디어 크기 조정","Resize media to %0":"미디어 크기를 %0(으)로 조정","Resize media to the original size":"미디어를 원본 크기로 조정","Resize media (in %0)":"미디어 크기 조정(%0)","Custom media size":"사용자 지정 미디어 크기","Media resize list":"미디어 크기 조정 목록","Media Resize":"미디어 크기 조정"}}};
e[ 'ko' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ko' ].dictionary = Object.assign( e[ 'ko' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ko' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
