/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hr' ]: { dictionary, getPluralForm } } = {"hr":{"dictionary":{"Cancel":"Poništi","Clear":"Obriši","Remove color":"Ukloni boju","Restore default":"Vrati tvorničke postavke","Save":"Snimi","Show more items":"Prikaži više stavaka","%0 of %1":"%0 od %1","Cannot upload file:":"Datoteku nije moguće poslati:","Rich Text Editor. Editing area: %0":"Uređivač obogaćenog teksta. Područje za uređivanje: %0","Insert with file manager":"","Replace with file manager":"","Insert image with file manager":"","Replace image with file manager":"","File":"","With file manager":"","Toggle caption off":"Isključite natpis","Toggle caption on":"Uključite natpis","Content editing keystrokes":"","These keyboard shortcuts allow for quick access to content editing features.":"","User interface and content navigation keystrokes":"","Use the following keystrokes for more efficient navigation in the CKEditor 5 user interface.":"","Close contextual balloons, dropdowns, and dialogs":"","Open the accessibility help dialog":"","Move focus between form fields (inputs, buttons, etc.)":"","Move focus to the menu bar, navigate between menu bars":"","Move focus to the toolbar, navigate between toolbars":"","Navigate through the toolbar or menu bar":"","Execute the currently focused button. Executing buttons that interact with the editor content moves the focus back to the content.":"","Accept":"Prihvati","Paragraph":"Paragraf","Color picker":"Birač boje","Please try a different phrase or check the spelling.":"Molimo pokušajte drugačiji izraz ili provjerite pravopis.","Source":"","Insert":"","Update":"","Back":""},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'hr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hr' ].dictionary = Object.assign( e[ 'hr' ].dictionary, dictionary );
e[ 'hr' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
