/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module utils/locale
 */
/* globals console */
import toArray from './toarray';
import { _translate } from './translation-service';
import { getLanguageDirection } from './language';
/**
 * Represents the localization services.
 */
export default class Locale {
    /**
     * Creates a new instance of the locale class. Learn more about
     * {@glink features/ui-language configuring the language of the editor}.
     *
     * @param {Object} [options] Locale configuration.
     * @param {String} [options.uiLanguage='en'] The editor UI language code in the
     * [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) format. See {@link #uiLanguage}.
     * @param {String} [options.contentLanguage] The editor content language code in the
     * [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) format. If not specified, the same as `options.language`.
     * See {@link #contentLanguage}.
     */
    constructor(options = {}) {
        this.uiLanguage = options.uiLanguage || 'en';
        this.contentLanguage = options.contentLanguage || this.uiLanguage;
        this.uiLanguageDirection = getLanguageDirection(this.uiLanguage);
        this.contentLanguageDirection = getLanguageDirection(this.contentLanguage);
        this.t = (message, values) => this._t(message, values);
    }
    /**
     * The editor UI language code in the [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) format.
     *
     * **Note**: This property was deprecated. Please use {@link #uiLanguage} and {@link #contentLanguage}
     * properties instead.
     *
     * @deprecated
     * @member {String}
     */
    get language() {
        /**
         * The {@link module:utils/locale~Locale#language `Locale#language`} property was deprecated and will
         * be removed in the near future. Please use the {@link #uiLanguage} and {@link #contentLanguage} properties instead.
         *
         * @error locale-deprecated-language-property
         */
        console.warn('locale-deprecated-language-property: ' +
            'The Locale#language property has been deprecated and will be removed in the near future. ' +
            'Please use #uiLanguage and #contentLanguage properties instead.');
        return this.uiLanguage;
    }
    /**
     * An unbound version of the {@link #t} method.
     *
     * @private
     * @param {String|module:utils/translation-service~Message} message
     * @param {Number|String|Array.<Number|String>} [values]
     * @returns {String}
     */
    _t(message, values = []) {
        values = toArray(values);
        if (typeof message === 'string') {
            message = { string: message };
        }
        const hasPluralForm = !!message.plural;
        const quantity = hasPluralForm ? values[0] : 1;
        const translatedString = _translate(this.uiLanguage, message, quantity);
        return interpolateString(translatedString, values);
    }
}
// Fills the `%0, %1, ...` string placeholders with values.
function interpolateString(string, values) {
    return string.replace(/%(\d+)/g, (match, index) => {
        return (index < values.length) ? values[index] : match;
    });
}
