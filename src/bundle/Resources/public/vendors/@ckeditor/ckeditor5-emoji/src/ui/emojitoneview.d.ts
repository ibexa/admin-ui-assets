/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module emoji/ui/emojitoneview
 */
import { View, type DropdownView } from 'ckeditor5/src/ui.js';
import { type Locale } from 'ckeditor5/src/utils.js';
import type { SkinToneId } from '../emojiconfig.js';
import type { SkinTone } from '../emojirepository.js';
import '../../theme/emojitone.css';
/**
 * A view responsible for selecting a skin tone for an emoji.
 */
export default class EmojiToneView extends View {
    /**
     * Active skin tone.
     *
     * @observable
     */
    skinTone: SkinToneId;
    /**
     * A dropdown element for selecting an active skin tone.
     */
    readonly dropdownView: DropdownView;
    /**
     * An array of available skin tones.
     */
    private readonly _skinTones;
    /**
     * @inheritDoc
     */
    constructor(locale: Locale, { skinTone, skinTones }: {
        skinTone: SkinToneId;
        skinTones: Array<SkinTone>;
    });
    /**
     * @inheritDoc
     */
    focus(): void;
    /**
     * Helper method for receiving an object describing the active skin tone.
     */
    private _getSkinTone;
}
