/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ar' ]: { dictionary, getPluralForm } } = {"ar":{"dictionary":{"Emoji":"الرموز التعبيرية","Show all emoji...":"إظهار جميع الرموز التعبيرية...","Find an emoji (min. 2 characters)":"ابحث عن رمز تعبيري (حد أدنى حرفين)","No emojis were found matching \"%0\".":"لم نعثر على أي رموز تعبيرية مطابقة لـ \"%0\".","Keep on typing to see the emoji.":"استمر في الكتابة لرؤية الرمز التعبيري.","The query must contain at least two characters.":"يجب أن يحتوي الاستعلام على حرفين على الأقل.","Smileys & Expressions":"الابتسامات والتعبيرات","Gestures & People":"الإيماءات والأشخاص","Animals & Nature":"الحيوانات والطبيعة","Food & Drinks":"الأطعمة والمشروبات","Travel & Places":"السفر والأماكن","Activities":"الأنشطة","Objects":"الأشياء","Symbols":"الرموز","Flags":"الأعلام","Select skin tone":"حدد لون البشرة","Default skin tone":"لون البشرة الافتراضي","Light skin tone":"لون البشرة الفاتح","Medium Light skin tone":"لون بشرة فاتح متوسط","Medium skin tone":"لون البشرة متوسط","Medium Dark skin tone":"لون البشرة ​​داكن متوسط","Dark skin tone":"لون بشرة داكن","Emoji picker":"أداة اختيار الرموز التعبيرية"},getPluralForm(n){return (n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);}}};
e[ 'ar' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ar' ].dictionary = Object.assign( e[ 'ar' ].dictionary, dictionary );
e[ 'ar' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
