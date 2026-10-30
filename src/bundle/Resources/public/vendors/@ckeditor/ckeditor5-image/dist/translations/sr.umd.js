/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: translations } = {"sr":{"dictionary":{"image widget":"модул са сликом","In line":"У реду","Side image":"Бочна слика","Full size image":"Слика у пуној величини","Left aligned image":"Лева слика","Centered image":"Слика у средини","Right aligned image":"Десна слика","Change image text alternative":"Измена алтернативног текста","Text alternative":"Алтернативни текст","Enter image caption":"Одреди текст испод слике","Insert image":"Додај слику","Replace image":"Zameni sliku","Upload from computer":"Otpremi sa računara","Replace from computer":"Zameni sa računara","Upload image from computer":"Otpremi sliku sa računara","Image from computer":"Slika sa računara","From computer":"Sa računara","Replace image from computer":"Zameni sliku sa računara","Upload failed":"Постављање неуспешно","You have no image upload permissions.":"Nemate dozvole za otpremanje slike.","Image toolbar":"Слика трака са алтакама","Resize image":"Промените величину слике","Resize image to %0":"Промените величину слике на %0","Resize image to the original size":"Промените величину слике до оригиналне величине","Resize image (in %0)":"Promenite veličinu slike (u %0)","Custom image size":"Prilagođena veličina slike","Image resize list":"Листа величине слике","Insert image via URL":"Убаци слику преко УРЛ-а","Insert via URL":"Umetni putem URL adrese","Image via URL":"Slika putem URL adrese","Via URL":"Putem URL adrese","Update image URL":"Ажурирај УРЛ слике","Caption for the image":"Натпис за слику","Caption for image: %0":"Натпис за слику: %0","Uploading image":"Otpremanje slike","Image upload complete":"Otpremanje slike je završeno","Error during image upload":"Greška tokom otpremanja slike","Image":"Slika","Image Resize":"Promeni veličinu slike","Text Alternative":"Alternativni tekst"}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
