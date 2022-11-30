/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * Provides group of constants to use instead of hardcoding numeric priority values.
 *
 * @namespace
 */
const priorities = {
    /**
     * Converts a string with priority name to it's numeric value. If `Number` is given, it just returns it.
     *
     * @static
     * @param {module:utils/priorities~PriorityString} [priority] Priority to convert.
     * @returns {Number} Converted priority.
     */
    get(priority = 'normal') {
        if (typeof priority != 'number') {
            return this[priority] || this.normal;
        }
        else {
            return priority;
        }
    },
    highest: 100000,
    high: 1000,
    normal: 0,
    low: -1000,
    lowest: -100000
};
export default priorities;
