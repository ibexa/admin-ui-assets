/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Plugin } from 'ckeditor5/src/core.js';
import isEmojiSupported from './utils/isemojisupported.js';
/**
 * @module emoji/emojiutils
 */
const SKIN_TONE_MAP = {
    0: 'default',
    1: 'light',
    2: 'medium-light',
    3: 'medium',
    4: 'medium-dark',
    5: 'dark'
};
/**
 * A map representing an emoji and its release version.
 * It's used to identify a user's minimal supported emoji level.
 * We skip versions with older patches, such as 15.0 instead of 15.1 etc.
 */
const EMOJI_SUPPORT_LEVEL = {
    '🫩': 16,
    '🫨': 15.1,
    '🫠': 14,
    '😶‍🌫️': 13.1,
    '🧑‍💻': 12.1,
    '🥰': 11,
    '🤪': 5,
    '⚕️': 4,
    '🤣': 3,
    '👋🏽': 2,
    '😀': 1,
    '😐': 0.7,
    '😂': 0.6 // Face with Tears of Joy.
};
const BASELINE_EMOJI_WIDTH = 24;
/**
 * The Emoji utilities plugin.
 */
class EmojiUtils extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'EmojiUtils';
    }
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin() {
        return true;
    }
    /**
     * Checks if the emoji is supported by verifying the emoji version supported by the system first.
     * Then checks if emoji contains a zero width joiner (ZWJ), and if yes, then checks if it is supported by the system.
     */
    isEmojiSupported(item, emojiSupportedVersionByOs, container) {
        const isEmojiVersionSupported = item.version <= emojiSupportedVersionByOs;
        if (!isEmojiVersionSupported) {
            return false;
        }
        if (!this.hasZwj(item.emoji)) {
            return true;
        }
        return this.isEmojiZwjSupported(item, container);
    }
    /**
     * Checks the supported emoji version by the OS, by sampling some representatives from different emoji releases.
     */
    getEmojiSupportedVersionByOs() {
        for (const [emoji, emojiVersion] of Object.entries(EMOJI_SUPPORT_LEVEL)) {
            if (EmojiUtils._isEmojiSupported(emoji)) {
                return emojiVersion;
            }
        }
        return 0;
    }
    /**
     * Check for ZWJ (zero width joiner) character.
     */
    hasZwj(emoji) {
        return emoji.includes('\u200d');
    }
    /**
     * Checks whether the emoji is supported in the operating system.
     */
    isEmojiZwjSupported(item, container) {
        const emojiWidth = this.getNodeWidth(container, item.emoji);
        // On Windows, some supported emoji are ~50% bigger than the baseline emoji, but what we really want to guard
        // against are the ones that are 2x the size, because those are truly broken (person with red hair = person with
        // floating red wig, black cat = cat with black square, polar bear = bear with snowflake, etc.)
        // So here we set the threshold at 1.8 times the size of the baseline emoji.
        return emojiWidth < BASELINE_EMOJI_WIDTH * 1.8;
    }
    /**
     * Returns the width of the provided node.
     */
    getNodeWidth(container, node) {
        const span = document.createElement('span');
        span.textContent = node;
        container.appendChild(span);
        const nodeWidth = span.offsetWidth;
        container.removeChild(span);
        return nodeWidth;
    }
    /**
     * Creates a div for emoji width testing purposes.
     */
    createEmojiWidthTestingContainer() {
        const container = document.createElement('div');
        container.setAttribute('aria-hidden', 'true');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.whiteSpace = 'nowrap';
        container.style.fontSize = BASELINE_EMOJI_WIDTH + 'px';
        return container;
    }
    /**
     * Adds default skin tone property to each emoji. If emoji defines other skin tones, they are added as well.
     */
    normalizeEmojiSkinTone(item) {
        const entry = {
            ...item,
            skins: {
                default: item.emoji
            }
        };
        if (item.skins) {
            item.skins.forEach(skin => {
                const skinTone = SKIN_TONE_MAP[skin.tone];
                entry.skins[skinTone] = skin.emoji;
            });
        }
        return entry;
    }
    /**
     * Checks whether the emoji belongs to a group that is allowed.
     */
    isEmojiCategoryAllowed(item) {
        // Category group=2 contains skin tones only, which we do not want to render.
        return item.group !== 2;
    }
    /**
     * A function used to determine if emoji is supported by detecting pixels.
     *
     * Referenced for unit testing purposes. Kept in a separate file because of licensing.
     */
    static _isEmojiSupported = isEmojiSupported;
}
export default EmojiUtils;
