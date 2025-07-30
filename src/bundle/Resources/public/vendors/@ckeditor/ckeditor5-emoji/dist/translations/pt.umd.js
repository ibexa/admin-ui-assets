/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt' ]: { dictionary, getPluralForm } } = {"pt":{"dictionary":{"Emoji":"Emoji","Show all emoji...":"Mostrar todos os emojis...","Find an emoji (min. 2 characters)":"Encontrar um emoji (mín. 2 carateres)","No emojis were found matching \"%0\".":"Não foi encontrado nenhum emoji que corresponda a \"%0\".","Keep on typing to see the emoji.":"Continue a escrever para ver o emoji.","The query must contain at least two characters.":"A consulta deve conter, pelo menos, dois carateres.","Smileys & Expressions":"Smiley e expressões","Gestures & People":"Gestos e pessoas","Animals & Nature":"Animais e natureza","Food & Drinks":"Comida e bebidas","Travel & Places":"Viagens e lugares","Activities":"Atividades","Objects":"Objetos","Symbols":"Símbolos","Flags":"Bandeiras","Select skin tone":"Selecionar tom de pele","Default skin tone":"Tom de pele padrão","Light skin tone":"Tom de pele claro","Medium Light skin tone":"Tom de pele médio claro","Medium skin tone":"Tom de pele médio","Medium Dark skin tone":"Tom de pele médio escuro","Dark skin tone":"Tom de pele escuro","Emoji picker":"Seletor de emojis"},getPluralForm(n){return (n != 1);}}};
e[ 'pt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt' ].dictionary = Object.assign( e[ 'pt' ].dictionary, dictionary );
e[ 'pt' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
