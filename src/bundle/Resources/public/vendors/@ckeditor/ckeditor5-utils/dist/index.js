/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { isObject, isString, isPlainObject, cloneDeepWith, isElement as isElement$1, isFunction, merge } from 'es-toolkit/compat';

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /* globals window, document */ /**
 * @module utils/dom/global
 */ // This interface exists to make our API pages more readable.
/**
 * A helper (module) giving an access to the global DOM objects such as `window` and `document`.
 */ /**
 * A helper (module) giving an access to the global DOM objects such as `window` and
 * `document`. Accessing these objects using this helper allows easy and bulletproof
 * testing, i.e. stubbing native properties:
 *
 * ```ts
 * import { global } from 'ckeditor5/utils';
 *
 * // This stub will work for any code using global module.
 * testUtils.sinon.stub( global, 'window', {
 * 	innerWidth: 10000
 * } );
 *
 * console.log( global.window.innerWidth );
 * ```
 */ let globalVar; // named globalVar instead of global: https://github.com/ckeditor/ckeditor5/issues/12971
// In some environments window and document API might not be available.
try {
    globalVar = {
        window,
        document
    };
} catch (e) {
    // It's not possible to mock a window object to simulate lack of a window object without writing extremely convoluted code.
    /* istanbul ignore next -- @preserve */ // Let's cast it to not change module's API.
    // We only handle this so loading editor in environments without window and document doesn't fail.
    // For better DX we shouldn't introduce mixed types and require developers to check the type manually.
    // This module should not be used on purpose in any environment outside browser.
    globalVar = {
        window: {},
        document: {}
    };
}
var global = globalVar;

/**
 * Safely returns `userAgent` from browser's navigator API in a lower case.
 * If navigator API is not available it will return an empty string.
 */ function getUserAgent() {
    // In some environments navigator API might not be available.
    try {
        return navigator.userAgent.toLowerCase();
    } catch (e) {
        return '';
    }
}
const userAgent = /* #__PURE__ */ getUserAgent();
/**
 * A namespace containing environment and browser information.
 */ const env = {
    isMac: /* #__PURE__ */ isMac(userAgent),
    isWindows: /* #__PURE__ */ isWindows(userAgent),
    isGecko: /* #__PURE__ */ isGecko(userAgent),
    isSafari: /* #__PURE__ */ isSafari(userAgent),
    isiOS: /* #__PURE__ */ isiOS(userAgent),
    isAndroid: /* #__PURE__ */ isAndroid(userAgent),
    isBlink: /* #__PURE__ */ isBlink(userAgent),
    get isMediaForcedColors () {
        return isMediaForcedColors();
    },
    get isMotionReduced () {
        return isMotionReduced();
    },
    features: {
        isRegExpUnicodePropertySupported: /* #__PURE__ */ isRegExpUnicodePropertySupported()
    }
};
/**
 * Checks if User Agent represented by the string is running on Macintosh.
 *
 * @param userAgent **Lowercase** `navigator.userAgent` string.
 * @returns Whether User Agent is running on Macintosh or not.
 */ function isMac(userAgent) {
    return userAgent.indexOf('macintosh') > -1;
}
/**
 * Checks if User Agent represented by the string is running on Windows.
 *
 * @param userAgent **Lowercase** `navigator.userAgent` string.
 * @returns Whether User Agent is running on Windows or not.
 */ function isWindows(userAgent) {
    return userAgent.indexOf('windows') > -1;
}
/**
 * Checks if User Agent represented by the string is Firefox (Gecko).
 *
 * @param userAgent **Lowercase** `navigator.userAgent` string.
 * @returns Whether User Agent is Firefox or not.
 */ function isGecko(userAgent) {
    return !!userAgent.match(/gecko\/\d+/);
}
/**
 * Checks if User Agent represented by the string is Safari.
 *
 * @param userAgent **Lowercase** `navigator.userAgent` string.
 * @returns Whether User Agent is Safari or not.
 */ function isSafari(userAgent) {
    return userAgent.indexOf(' applewebkit/') > -1 && userAgent.indexOf('chrome') === -1;
}
/**
 * Checks if User Agent represented by the string is running in iOS.
 *
 * @param userAgent **Lowercase** `navigator.userAgent` string.
 * @returns Whether User Agent is running in iOS or not.
 */ function isiOS(userAgent) {
    // "Request mobile site" || "Request desktop site".
    return !!userAgent.match(/iphone|ipad/i) || isMac(userAgent) && navigator.maxTouchPoints > 0;
}
/**
 * Checks if User Agent represented by the string is Android mobile device.
 *
 * @param userAgent **Lowercase** `navigator.userAgent` string.
 * @returns Whether User Agent is Safari or not.
 */ function isAndroid(userAgent) {
    return userAgent.indexOf('android') > -1;
}
/**
 * Checks if User Agent represented by the string is Blink engine.
 *
 * @param userAgent **Lowercase** `navigator.userAgent` string.
 * @returns Whether User Agent is Blink engine or not.
 */ function isBlink(userAgent) {
    // The Edge browser before switching to the Blink engine used to report itself as Chrome (and "Edge/")
    // but after switching to the Blink it replaced "Edge/" with "Edg/".
    return userAgent.indexOf('chrome/') > -1 && userAgent.indexOf('edge/') < 0;
}
/**
 * Checks if the current environment supports ES2018 Unicode properties like `\p{P}` or `\p{L}`.
 * More information about unicode properties might be found
 * [in Unicode Standard Annex #44](https://www.unicode.org/reports/tr44/#GC_Values_Table).
 */ function isRegExpUnicodePropertySupported() {
    let isSupported = false;
    // Feature detection for Unicode properties. Added in ES2018. Currently Firefox does not support it.
    // See https://github.com/ckeditor/ckeditor5-mention/issues/44#issuecomment-487002174.
    try {
        // Usage of regular expression literal cause error during build (ckeditor/ckeditor5-dev#534).
        isSupported = 'ć'.search(new RegExp('[\\p{L}]', 'u')) === 0;
    } catch (error) {
    // Firefox throws a SyntaxError when the group is unsupported.
    }
    return isSupported;
}
/**
 * Checks if the user agent has enabled a forced colors mode (e.g. Windows High Contrast mode).
 *
 * Returns `false` in environments where `window` global object is not available.
 */ function isMediaForcedColors() {
    return global.window.matchMedia ? global.window.matchMedia('(forced-colors: active)').matches : false;
}
/**
 * Checks if the user enabled "prefers reduced motion" setting in browser.
 *
 * Returns `false` in environments where `window` global object is not available.
 */ function isMotionReduced() {
    return global.window.matchMedia ? global.window.matchMedia('(prefers-reduced-motion)').matches : false;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/fastdiff
 */ /**
 * Finds positions of the first and last change in the given string/array and generates a set of changes:
 *
 * ```ts
 * fastDiff( '12a', '12xyza' );
 * // [ { index: 2, type: 'insert', values: [ 'x', 'y', 'z' ] } ]
 *
 * fastDiff( '12a', '12aa' );
 * // [ { index: 3, type: 'insert', values: [ 'a' ] } ]
 *
 * fastDiff( '12xyza', '12a' );
 * // [ { index: 2, type: 'delete', howMany: 3 } ]
 *
 * fastDiff( [ '1', '2', 'a', 'a' ], [ '1', '2', 'a' ] );
 * // [ { index: 3, type: 'delete', howMany: 1 } ]
 *
 * fastDiff( [ '1', '2', 'a', 'b', 'c', '3' ], [ '2', 'a', 'b' ] );
 * // [ { index: 0, type: 'insert', values: [ '2', 'a', 'b' ] }, { index: 3, type: 'delete', howMany: 6 } ]
 * ```
 *
 * Passed arrays can contain any type of data, however to compare them correctly custom comparator function
 * should be passed as a third parameter:
 *
 * ```ts
 * fastDiff( [ { value: 1 }, { value: 2 } ], [ { value: 1 }, { value: 3 } ], ( a, b ) => {
 * 	return a.value === b.value;
 * } );
 * // [ { index: 1, type: 'insert', values: [ { value: 3 } ] }, { index: 2, type: 'delete', howMany: 1 } ]
 * ```
 *
 * The resulted set of changes can be applied to the input in order to transform it into the output, for example:
 *
 * ```ts
 * let input = '12abc3';
 * const output = '2ab';
 * const changes = fastDiff( input, output );
 *
 * changes.forEach( change => {
 * 	if ( change.type == 'insert' ) {
 * 		input = input.substring( 0, change.index ) + change.values.join( '' ) + input.substring( change.index );
 * 	} else if ( change.type == 'delete' ) {
 * 		input = input.substring( 0, change.index ) + input.substring( change.index + change.howMany );
 * 	}
 * } );
 *
 * // input equals output now
 * ```
 *
 * or in case of arrays:
 *
 * ```ts
 * let input = [ '1', '2', 'a', 'b', 'c', '3' ];
 * const output = [ '2', 'a', 'b' ];
 * const changes = fastDiff( input, output );
 *
 * changes.forEach( change => {
 * 	if ( change.type == 'insert' ) {
 * 		input = input.slice( 0, change.index ).concat( change.values, input.slice( change.index ) );
 * 	} else if ( change.type == 'delete' ) {
 * 		input = input.slice( 0, change.index ).concat( input.slice( change.index + change.howMany ) );
 * 	}
 * } );
 *
 * // input equals output now
 * ```
 *
 * By passing `true` as the fourth parameter (`atomicChanges`) the output of this function will become compatible with
 * the {@link module:utils/diff~diff `diff()`} function:
 *
 * ```ts
 * fastDiff( '12a', '12xyza', undefined, true );
 * // [ 'equal', 'equal', 'insert', 'insert', 'insert', 'equal' ]
 * ```
 *
 * The default output format of this function is compatible with the output format of
 * {@link module:utils/difftochanges~diffToChanges `diffToChanges()`}. The `diffToChanges()` input format is, in turn,
 * compatible with the output of {@link module:utils/diff~diff `diff()`}:
 *
 * ```ts
 * const a = '1234';
 * const b = '12xyz34';
 *
 * // Both calls will return the same results (grouped changes format).
 * fastDiff( a, b );
 * diffToChanges( diff( a, b ) );
 *
 * // Again, both calls will return the same results (atomic changes format).
 * fastDiff( a, b, undefined, true );
 * diff( a, b );
 * ```
 *
 * @typeParam T The type of array elements.
 * @typeParam AtomicChanges The type of `atomicChanges` parameter (selects the result type).
 * @param a Input array or string.
 * @param b Input array or string.
 * @param cmp Optional function used to compare array values, by default `===` (strict equal operator) is used.
 * @param atomicChanges Whether an array of `inset|delete|equal` operations should
 * be returned instead of changes set. This makes this function compatible with {@link module:utils/diff~diff `diff()`}.
 * Defaults to `false`.
 * @returns Array of changes. The elements are either {@link module:utils/diff~DiffResult} or {@link module:utils/difftochanges~Change},
 * depending on `atomicChanges` parameter.
 */ function fastDiff(a, b, cmp, atomicChanges) {
    // Set the comparator function.
    cmp = cmp || function(a, b) {
        return a === b;
    };
    // Convert the string (or any array-like object - eg. NodeList) to an array by using the slice() method because,
    // unlike Array.from(), it returns array of UTF-16 code units instead of the code points of a string.
    // One code point might be a surrogate pair of two code units. All text offsets are expected to be in code units.
    // See ckeditor/ckeditor5#3147.
    //
    // We need to make sure here that fastDiff() works identical to diff().
    const arrayA = Array.isArray(a) ? a : Array.prototype.slice.call(a);
    const arrayB = Array.isArray(b) ? b : Array.prototype.slice.call(b);
    // Find first and last change.
    const changeIndexes = findChangeBoundaryIndexes(arrayA, arrayB, cmp);
    // Transform into changes array.
    const result = atomicChanges ? changeIndexesToAtomicChanges(changeIndexes, arrayB.length) : changeIndexesToChanges(arrayB, changeIndexes);
    return result;
}
/**
 * Finds position of the first and last change in the given arrays. For example:
 *
 * ```ts
 * const indexes = findChangeBoundaryIndexes( [ '1', '2', '3', '4' ], [ '1', '3', '4', '2', '4' ] );
 * console.log( indexes ); // { firstIndex: 1, lastIndexOld: 3, lastIndexNew: 4 }
 * ```
 *
 * The above indexes means that in the first array the modified part is `1[23]4` and in the second array it is `1[342]4`.
 * Based on such indexes, array with `insert`/`delete` operations which allows transforming first value into the second one
 * can be generated.
 */ function findChangeBoundaryIndexes(arr1, arr2, cmp) {
    // Find the first difference between passed values.
    const firstIndex = findFirstDifferenceIndex(arr1, arr2, cmp);
    // If arrays are equal return -1 indexes object.
    if (firstIndex === -1) {
        return {
            firstIndex: -1,
            lastIndexOld: -1,
            lastIndexNew: -1
        };
    }
    // Remove the common part of each value and reverse them to make it simpler to find the last difference between them.
    const oldArrayReversed = cutAndReverse(arr1, firstIndex);
    const newArrayReversed = cutAndReverse(arr2, firstIndex);
    // Find the first difference between reversed values.
    // It should be treated as "how many elements from the end the last difference occurred".
    //
    // For example:
    //
    // 				initial	->	after cut	-> reversed:
    // oldValue:	'321ba'	->	'21ba'		-> 'ab12'
    // newValue:	'31xba'	->	'1xba'		-> 'abx1'
    // lastIndex:							-> 2
    //
    // So the last change occurred two characters from the end of the arrays.
    const lastIndex = findFirstDifferenceIndex(oldArrayReversed, newArrayReversed, cmp);
    // Use `lastIndex` to calculate proper offset, starting from the beginning (`lastIndex` kind of starts from the end).
    const lastIndexOld = arr1.length - lastIndex;
    const lastIndexNew = arr2.length - lastIndex;
    return {
        firstIndex,
        lastIndexOld,
        lastIndexNew
    };
}
/**
 * Returns a first index on which given arrays differ. If both arrays are the same, -1 is returned.
 */ function findFirstDifferenceIndex(arr1, arr2, cmp) {
    for(let i = 0; i < Math.max(arr1.length, arr2.length); i++){
        if (arr1[i] === undefined || arr2[i] === undefined || !cmp(arr1[i], arr2[i])) {
            return i;
        }
    }
    return -1; // Return -1 if arrays are equal.
}
/**
 * Returns a copy of the given array with `howMany` elements removed starting from the beginning and in reversed order.
 *
 * @param arr Array to be processed.
 * @param howMany How many elements from array beginning to remove.
 * @returns Shortened and reversed array.
 */ function cutAndReverse(arr, howMany) {
    return arr.slice(howMany).reverse();
}
/**
 * Generates changes array based on change indexes from `findChangeBoundaryIndexes` function. This function will
 * generate array with 0 (no changes), 1 (deletion or insertion) or 2 records (insertion and deletion).
 *
 * @param newArray New array for which change indexes were calculated.
 * @param changeIndexes Change indexes object from `findChangeBoundaryIndexes` function.
 * @returns Array of changes compatible with {@link module:utils/difftochanges~diffToChanges} format.
 */ function changeIndexesToChanges(newArray, changeIndexes) {
    const result = [];
    const { firstIndex, lastIndexOld, lastIndexNew } = changeIndexes;
    // Order operations as 'insert', 'delete' array to keep compatibility with {@link module:utils/difftochanges~diffToChanges}
    // in most cases. However, 'diffToChanges' does not stick to any order so in some cases
    // (for example replacing '12345' with 'abcd') it will generate 'delete', 'insert' order.
    if (lastIndexNew - firstIndex > 0) {
        result.push({
            index: firstIndex,
            type: 'insert',
            values: newArray.slice(firstIndex, lastIndexNew)
        });
    }
    if (lastIndexOld - firstIndex > 0) {
        result.push({
            index: firstIndex + (lastIndexNew - firstIndex),
            type: 'delete',
            howMany: lastIndexOld - firstIndex
        });
    }
    return result;
}
/**
 * Generates array with set `equal|insert|delete` operations based on change indexes from `findChangeBoundaryIndexes` function.
 *
 * @param changeIndexes Change indexes object from `findChangeBoundaryIndexes` function.
 * @param newLength Length of the new array on which `findChangeBoundaryIndexes` calculated change indexes.
 * @returns Array of changes compatible with {@link module:utils/diff~diff} format.
 */ function changeIndexesToAtomicChanges(changeIndexes, newLength) {
    const { firstIndex, lastIndexOld, lastIndexNew } = changeIndexes;
    // No changes.
    if (firstIndex === -1) {
        return Array(newLength).fill('equal');
    }
    let result = [];
    if (firstIndex > 0) {
        result = result.concat(Array(firstIndex).fill('equal'));
    }
    if (lastIndexNew - firstIndex > 0) {
        result = result.concat(Array(lastIndexNew - firstIndex).fill('insert'));
    }
    if (lastIndexOld - firstIndex > 0) {
        result = result.concat(Array(lastIndexOld - firstIndex).fill('delete'));
    }
    if (lastIndexNew < newLength) {
        result = result.concat(Array(newLength - lastIndexNew).fill('equal'));
    }
    return result;
}

// The following code is based on the "O(NP) Sequence Comparison Algorithm"
// by Sun Wu, Udi Manber, Gene Myers, Webb Miller.
/**
 * Calculates the difference between two arrays or strings producing an array containing a list of changes
 * necessary to transform input into output.
 *
 * ```ts
 * diff( 'aba', 'acca' ); // [ 'equal', 'insert', 'insert', 'delete', 'equal' ]
 * ```
 *
 * This function is based on the "O(NP) Sequence Comparison Algorithm" by Sun Wu, Udi Manber, Gene Myers, Webb Miller.
 * Unfortunately, while it gives the most precise results, its to complex for longer strings/arrow (above 200 items).
 * Therefore, `diff()` automatically switches to {@link module:utils/fastdiff~fastDiff `fastDiff()`} when detecting
 * such a scenario. The return formats of both functions are identical.
 *
 * @param a Input array or string.
 * @param b Output array or string.
 * @param cmp Optional function used to compare array values, by default === is used.
 * @returns Array of changes.
 */ function diff(a, b, cmp) {
    // Set the comparator function.
    cmp = cmp || function(a, b) {
        return a === b;
    };
    const aLength = a.length;
    const bLength = b.length;
    // Perform `fastDiff` for longer strings/arrays (see #269).
    if (aLength > 200 || bLength > 200 || aLength + bLength > 300) {
        return diff.fastDiff(a, b, cmp, true);
    }
    // Temporary action type statics.
    let _insert, _delete;
    // Swapped the arrays to use the shorter one as the first one.
    if (bLength < aLength) {
        const tmp = a;
        a = b;
        b = tmp;
        // We swap the action types as well.
        _insert = 'delete';
        _delete = 'insert';
    } else {
        _insert = 'insert';
        _delete = 'delete';
    }
    const m = a.length;
    const n = b.length;
    const delta = n - m;
    // Edit scripts, for each diagonal.
    const es = {};
    // Furthest points, the furthest y we can get on each diagonal.
    const fp = {};
    function snake(k) {
        // We use -1 as an alternative below to handle initial values ( instead of filling the fp with -1 first ).
        // Furthest points (y) on the diagonal below k.
        const y1 = (fp[k - 1] !== undefined ? fp[k - 1] : -1) + 1;
        // Furthest points (y) on the diagonal above k.
        const y2 = fp[k + 1] !== undefined ? fp[k + 1] : -1;
        // The way we should go to get further.
        const dir = y1 > y2 ? -1 : 1;
        // Clone previous changes array (if any).
        if (es[k + dir]) {
            es[k] = es[k + dir].slice(0);
        }
        // Create changes array.
        if (!es[k]) {
            es[k] = [];
        }
        // Push the action.
        es[k].push(y1 > y2 ? _insert : _delete);
        // Set the beginning coordinates.
        let y = Math.max(y1, y2);
        let x = y - k;
        // Traverse the diagonal as long as the values match.
        while(x < m && y < n && cmp(a[x], b[y])){
            x++;
            y++;
            // Push no change action.
            es[k].push('equal');
        }
        return y;
    }
    let p = 0;
    let k;
    // Traverse the graph until we reach the end of the longer string.
    do {
        // Updates furthest points and edit scripts for diagonals below delta.
        for(k = -p; k < delta; k++){
            fp[k] = snake(k);
        }
        // Updates furthest points and edit scripts for diagonals above delta.
        for(k = delta + p; k > delta; k--){
            fp[k] = snake(k);
        }
        // Updates furthest point and edit script for the delta diagonal.
        // note that the delta diagonal is the one which goes through the sink (m, n).
        fp[delta] = snake(delta);
        p++;
    }while (fp[delta] !== n)
    // Return the final list of edit changes.
    // We remove the first item that represents the action for the injected nulls.
    return es[delta].slice(1);
}
// Store the API in static property to easily overwrite it in tests.
// Too bad dependency injection does not work in Webpack + ES 6 (const) + Babel.
diff.fastDiff = fastDiff;

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/difftochanges
 */ /**
 * Creates a set of changes which need to be applied to the input in order to transform
 * it into the output. This function can be used with strings or arrays.
 *
 * ```ts
 * const input = Array.from( 'abc' );
 * const output = Array.from( 'xaby' );
 * const changes = diffToChanges( diff( input, output ), output );
 *
 * changes.forEach( change => {
 * 	if ( change.type == 'insert' ) {
 * 		input.splice( change.index, 0, ...change.values );
 * 	} else if ( change.type == 'delete' ) {
 * 		input.splice( change.index, change.howMany );
 * 	}
 * } );
 *
 * input.join( '' ) == output.join( '' ); // -> true
 * ```
 *
 * @typeParam T The type of output array element.
 * @param diff Result of {@link module:utils/diff~diff}.
 * @param output The string or array which was passed as diff's output.
 * @returns Set of changes (insert or delete) which need to be applied to the input
 * in order to transform it into the output.
 */ function diffToChanges(diff, output) {
    const changes = [];
    let index = 0;
    let lastOperation = null;
    diff.forEach((change)=>{
        if (change == 'equal') {
            pushLast();
            index++;
        } else if (change == 'insert') {
            if (lastOperation && lastOperation.type == 'insert') {
                lastOperation.values.push(output[index]);
            } else {
                pushLast();
                lastOperation = {
                    type: 'insert',
                    index,
                    values: [
                        output[index]
                    ]
                };
            }
            index++;
        } else /* if ( change == 'delete' ) */ {
            if (lastOperation && lastOperation.type == 'delete') {
                lastOperation.howMany++;
            } else {
                pushLast();
                lastOperation = {
                    type: 'delete',
                    index,
                    howMany: 1
                };
            }
        }
    });
    pushLast();
    return changes;
    function pushLast() {
        if (lastOperation) {
            changes.push(lastOperation);
            lastOperation = null;
        }
    }
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/mix
 */ /**
 * Copies enumerable properties and symbols from the objects given as 2nd+ parameters to the
 * prototype of first object (a constructor).
 *
 * ```
 * class Editor {
 * 	...
 * }
 *
 * const SomeMixin = {
 * 	a() {
 * 		return 'a';
 * 	}
 * };
 *
 * mix( Editor, SomeMixin, ... );
 *
 * new Editor().a(); // -> 'a'
 * ```
 *
 * Note: Properties which already exist in the base class will not be overriden.
 *
 * @deprecated Use mixin pattern, see: https://www.typescriptlang.org/docs/handbook/mixins.html.
 * @param baseClass Class which prototype will be extended.
 * @param mixins Objects from which to get properties.
 */ function mix(baseClass, ...mixins) {
    mixins.forEach((mixin)=>{
        const propertyNames = Object.getOwnPropertyNames(mixin);
        const propertySymbols = Object.getOwnPropertySymbols(mixin);
        propertyNames.concat(propertySymbols).forEach((key)=>{
            if (key in baseClass.prototype) {
                return;
            }
            if (typeof mixin == 'function' && (key == 'length' || key == 'name' || key == 'prototype')) {
                return;
            }
            const sourceDescriptor = Object.getOwnPropertyDescriptor(mixin, key);
            sourceDescriptor.enumerable = false;
            Object.defineProperty(baseClass.prototype, key, sourceDescriptor);
        });
    });
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/spy
 */ /**
 * Creates a spy function (ala Sinon.js) that can be used to inspect call to it.
 *
 * The following are the present features:
 *
 * * spy.called: property set to `true` if the function has been called at least once.
 *
 * @returns The spy function.
 */ function spy() {
    return function spy() {
        spy.called = true;
    };
}

/**
 * The event object passed to event callbacks. It is used to provide information about the event as well as a tool to
 * manipulate it.
 */ class EventInfo {
    /**
	 * The object that fired the event.
	 */ source;
    /**
	 * The event name.
	 */ name;
    /**
	 * Path this event has followed. See {@link module:utils/emittermixin~Emitter#delegate}.
	 */ path;
    /**
	 * Stops the event emitter to call further callbacks for this event interaction.
	 */ stop;
    /**
	 * Removes the current callback from future interactions of this event.
	 */ off;
    /**
	 * The value which will be returned by {@link module:utils/emittermixin~Emitter#fire}.
	 *
	 * It's `undefined` by default and can be changed by an event listener:
	 *
	 * ```ts
	 * dataController.fire( 'getSelectedContent', ( evt ) => {
	 * 	// This listener will make `dataController.fire( 'getSelectedContent' )`
	 * 	// always return an empty DocumentFragment.
	 * 	evt.return = new DocumentFragment();
	 *
	 * 	// Make sure no other listeners are executed.
	 * 	evt.stop();
	 * } );
	 * ```
	 */ return;
    /**
	 * @param source The emitter.
	 * @param name The event name.
	 */ constructor(source, name){
        this.source = source;
        this.name = name;
        this.path = [];
        // The following methods are defined in the constructor because they must be re-created per instance.
        this.stop = spy();
        this.off = spy();
    }
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/uid
 */ /**
 * A hash table of hex numbers to avoid using toString() in uid() which is costly.
 * [ '00', '01', '02', ..., 'fe', 'ff' ]
 */ const HEX_NUMBERS = new Array(256).fill('').map((_, index)=>('0' + index.toString(16)).slice(-2));
/**
 * Returns a unique id. The id starts with an "e" character and a randomly generated string of
 * 32 alphanumeric characters.
 *
 * **Note**: The characters the unique id is built from correspond to the hex number notation
 * (from "0" to "9", from "a" to "f"). In other words, each id corresponds to an "e" followed
 * by 16 8-bit numbers next to each other.
 *
 * @returns An unique id string.
 */ function uid() {
    // Let's create some positive random 32bit integers first.
    const [r1, r2, r3, r4] = crypto.getRandomValues(new Uint32Array(4));
    // Make sure that id does not start with number.
    return 'e' + HEX_NUMBERS[r1 >> 0 & 0xFF] + HEX_NUMBERS[r1 >> 8 & 0xFF] + HEX_NUMBERS[r1 >> 16 & 0xFF] + HEX_NUMBERS[r1 >> 24 & 0xFF] + HEX_NUMBERS[r2 >> 0 & 0xFF] + HEX_NUMBERS[r2 >> 8 & 0xFF] + HEX_NUMBERS[r2 >> 16 & 0xFF] + HEX_NUMBERS[r2 >> 24 & 0xFF] + HEX_NUMBERS[r3 >> 0 & 0xFF] + HEX_NUMBERS[r3 >> 8 & 0xFF] + HEX_NUMBERS[r3 >> 16 & 0xFF] + HEX_NUMBERS[r3 >> 24 & 0xFF] + HEX_NUMBERS[r4 >> 0 & 0xFF] + HEX_NUMBERS[r4 >> 8 & 0xFF] + HEX_NUMBERS[r4 >> 16 & 0xFF] + HEX_NUMBERS[r4 >> 24 & 0xFF];
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/priorities
 */ /**
 * String representing a priority value.
 */ /**
 * Provides group of constants to use instead of hardcoding numeric priority values.
 */ const priorities = {
    get (priority = 'normal') {
        if (typeof priority != 'number') {
            return this[priority] || this.normal;
        } else {
            return priority;
        }
    },
    highest: 100000,
    high: 1000,
    normal: 0,
    low: -1e3,
    lowest: -1e5
};

/**
 * Inserts any object with priority at correct index by priority so registered objects are always sorted from highest to lowest priority.
 *
 * @param objects Array of objects with priority to insert object to.
 * @param objectToInsert Object with `priority` property.
 */ function insertToPriorityArray(objects, objectToInsert) {
    const priority = priorities.get(objectToInsert.priority);
    // Binary search for better performance in large tables.
    let left = 0;
    let right = objects.length;
    while(left < right){
        const mid = left + right >> 1; // Use bitwise operator for faster floor division by 2.
        const midPriority = priorities.get(objects[mid].priority);
        if (midPriority < priority) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    objects.splice(left, 0, objectToInsert);
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/ckeditorerror
 */ /* globals console */ /**
 * URL to the documentation with error codes.
 */ const DOCUMENTATION_URL = 'https://ckeditor.com/docs/ckeditor5/latest/support/error-codes.html';
/**
 * The CKEditor error class.
 *
 * You should throw `CKEditorError` when:
 *
 * * An unexpected situation occurred and the editor (most probably) will not work properly. Such exception will be handled
 * by the {@link module:watchdog/watchdog~Watchdog watchdog} (if it is integrated),
 * * If the editor is incorrectly integrated or the editor API is used in the wrong way. This way you will give
 * feedback to the developer as soon as possible. Keep in mind that for common integration issues which should not
 * stop editor initialization (like missing upload adapter, wrong name of a toolbar component) we use
 * {@link module:utils/ckeditorerror~logWarning `logWarning()`} and
 * {@link module:utils/ckeditorerror~logError `logError()`}
 * to improve developers experience and let them see the a working editor as soon as possible.
 *
 * ```ts
 * /**
 *  * Error thrown when a plugin cannot be loaded due to JavaScript errors, lack of plugins with a given name, etc.
 *  *
 *  * @error plugin-load
 *  * @param pluginName The name of the plugin that could not be loaded.
 *  * @param moduleName The name of the module which tried to load this plugin.
 *  *\/
 * throw new CKEditorError( 'plugin-load', {
 * 	pluginName: 'foo',
 * 	moduleName: 'bar'
 * } );
 * ```
 */ class CKEditorError extends Error {
    /**
	 * A context of the error by which the Watchdog is able to determine which editor crashed.
	 */ context;
    /**
	 * The additional error data passed to the constructor. Undefined if none was passed.
	 */ data;
    /**
	 * Creates an instance of the CKEditorError class.
	 *
	 * @param errorName The error id in an `error-name` format. A link to this error documentation page will be added
	 * to the thrown error's `message`.
	 * @param context A context of the error by which the {@link module:watchdog/watchdog~Watchdog watchdog}
	 * is able to determine which editor crashed. It should be an editor instance or a property connected to it. It can be also
	 * a `null` value if the editor should not be restarted in case of the error (e.g. during the editor initialization).
	 * The error context should be checked using the `areConnectedThroughProperties( editor, context )` utility
	 * to check if the object works as the context.
	 * @param data Additional data describing the error. A stringified version of this object
	 * will be appended to the error message, so the data are quickly visible in the console. The original
	 * data object will also be later available under the {@link #data} property.
	 */ constructor(errorName, context, data){
        super(getErrorMessage(errorName, data));
        this.name = 'CKEditorError';
        this.context = context;
        this.data = data;
    }
    /**
	 * Checks if the error is of the `CKEditorError` type.
	 */ is(type) {
        return type === 'CKEditorError';
    }
    /**
	 * A utility that ensures that the thrown error is a {@link module:utils/ckeditorerror~CKEditorError} one.
	 * It is useful when combined with the {@link module:watchdog/watchdog~Watchdog} feature, which can restart the editor in case
	 * of a {@link module:utils/ckeditorerror~CKEditorError} error.
	 *
	 * @param err The error to rethrow.
	 * @param context An object connected through properties with the editor instance. This context will be used
	 * by the watchdog to verify which editor should be restarted.
	 */ static rethrowUnexpectedError(err, context) {
        if (err.is && err.is('CKEditorError')) {
            throw err;
        }
        /**
		 * An unexpected error occurred inside the CKEditor 5 codebase. This error will look like the original one
		 * to make the debugging easier.
		 *
		 * This error is only useful when the editor is initialized using the {@link module:watchdog/watchdog~Watchdog} feature.
		 * In case of such error (or any {@link module:utils/ckeditorerror~CKEditorError} error) the watchdog should restart the editor.
		 *
		 * @error unexpected-error
		 */ const error = new CKEditorError(err.message, context);
        // Restore the original stack trace to make the error look like the original one.
        // See https://github.com/ckeditor/ckeditor5/issues/5595 for more details.
        error.stack = err.stack;
        throw error;
    }
}
/**
 * Logs a warning to the console with a properly formatted message and adds a link to the documentation.
 * Use whenever you want to log a warning to the console.
 *
 * ```ts
 * /**
 *  * There was a problem processing the configuration of the toolbar. The item with the given
 *  * name does not exist, so it was omitted when rendering the toolbar.
 *  *
 *  * @error toolbarview-item-unavailable
 *  * @param {String} name The name of the component.
 *  *\/
 * logWarning( 'toolbarview-item-unavailable', { name } );
 * ```
 *
 * See also {@link module:utils/ckeditorerror~CKEditorError} for an explanation when to throw an error and when to log
 * a warning or an error to the console.
 *
 * @param errorName The error name to be logged.
 * @param data Additional data to be logged.
 */ function logWarning(errorName, data) {
    console.warn(...formatConsoleArguments(errorName, data));
}
/**
 * Logs an error to the console with a properly formatted message and adds a link to the documentation.
 * Use whenever you want to log an error to the console.
 *
 * ```ts
 * /**
 *  * There was a problem processing the configuration of the toolbar. The item with the given
 *  * name does not exist, so it was omitted when rendering the toolbar.
 *  *
 *  * @error toolbarview-item-unavailable
 *  * @param {String} name The name of the component.
 *  *\/
 *  logError( 'toolbarview-item-unavailable', { name } );
 * ```
 *
 * **Note**: In most cases logging a warning using {@link module:utils/ckeditorerror~logWarning} is enough.
 *
 * See also {@link module:utils/ckeditorerror~CKEditorError} for an explanation when to use each method.
 *
 * @param errorName The error name to be logged.
 * @param data Additional data to be logged.
 */ function logError(errorName, data) {
    console.error(...formatConsoleArguments(errorName, data));
}
/**
 * Returns formatted link to documentation message.
 */ function getLinkToDocumentationMessage(errorName) {
    return `\nRead more: ${DOCUMENTATION_URL}#error-${errorName}`;
}
/**
 * Returns formatted error message.
 */ function getErrorMessage(errorName, data) {
    const processedObjects = new WeakSet();
    const circularReferencesReplacer = (key, value)=>{
        if (typeof value === 'object' && value !== null) {
            if (processedObjects.has(value)) {
                return `[object ${value.constructor.name}]`;
            }
            processedObjects.add(value);
        }
        return value;
    };
    const stringifiedData = data ? ` ${JSON.stringify(data, circularReferencesReplacer)}` : '';
    const documentationLink = getLinkToDocumentationMessage(errorName);
    return errorName + stringifiedData + documentationLink;
}
/**
 * Returns formatted console error arguments.
 */ function formatConsoleArguments(errorName, data) {
    const documentationMessage = getLinkToDocumentationMessage(errorName);
    return data ? [
        errorName,
        data,
        documentationMessage
    ] : [
        errorName,
        documentationMessage
    ];
}

const version = '45.1.0';
// The second argument is not a month. It is `monthIndex` and starts from `0`.
const releaseDate = new Date(2025, 4, 14);
/* istanbul ignore next -- @preserve */ if (globalThis.CKEDITOR_VERSION) {
    /**
	 * This error is thrown when, due to a mistake in the way CKEditor&nbsp;5 was installed,
	 * imported, or initialized, some of its modules were evaluated and executed twice.
	 * Duplicate modules inevitably lead to runtime errors and increased bundle size.
	 *
	 * # Check dependency versions
	 *
	 * First, make sure that you use the latest version of all CKEditor&nbsp;5 dependencies.
	 * Depending on the installation method, you should check the versions of the `ckeditor5`,
	 * `ckeditor5-premium-features`, or `@ckeditor/ckeditor5-<NAME>` packages. If you cannot update
	 * to the latest version, ensure that all the CKEditor&nbsp;5 packages are
	 * in the same version.
	 *
	 * If you use third-party plugins, make sure to update them, too. If they are incompatible
	 * with the version of CKEditor&nbsp;5 you use, you may need to downgrade the CKEditor&nbsp;5 packages
	 * (which we do not recommend). Ask the plugin's author to upgrade the dependencies,
	 * or fork their project and update it yourself.
	 *
	 * # Check imports
	 *
	 * The next step is to look at how you import CKEditor&nbsp;5 into your project.
	 *
	 * **The {@glink updating/nim-migration/migration-to-new-installation-methods new installation methods}
	 * are designed to prevent module duplication, so if you are not using them yet, you should consider
	 * updating your project**. However, several legacy installation methods are still supported for backward
	 * compatibility, and mixing them may result in module duplication.
	 *
	 * These are the most common import methods of the CKEditor&nbsp;5 packages.
	 *
	 * - **New installation methods (NIM)** &ndash; Imports from the `ckeditor5` and `ckeditor5-premium-features` packages.
	 * - **Optimized build** for the new installation methods &ndash; Imports from the `@ckeditor/ckeditor5-<NAME>/dist/index.js`.
	 * - **Predefined builds** (no longer supported) &ndash; Imports from the `@ckeditor/ckeditor5-build-<NAME>` packages.
	 * - **Default imports** (legacy) &ndash; Imports from the `@ckeditor/ckeditor5-<NAME>` packages (default export).
	 * - **`src`** (legacy) &ndash; Imports from the `@ckeditor/ckeditor5-<NAME>/src/*`.
	 * - **DLL builds** (legacy) &ndash; Imports from the `ckeditor5/build/<NAME>` and `@ckeditor/ckeditor5-<NAME>/build/*`.
	 *
	 * The best way to avoid duplicate modules is to avoid mixing these installation methods. For example, if you use imports
	 * specific to the optimized build, you should use them for all CKEditor&nbsp;5 packages. In addition, since
	 * the DLL builds already include the core of the editor, they cannot be used with other types of imports.
	 *
	 * Here is a matrix showing which installation methods are compatible with each other:
	 *
	 * |                  | NIM | Optimized build | Predefined builds | Default imports | `src` | DLL builds |
	 * |------------------|-----|-----------------|-------------------|-----------------|-------|------------|
	 * | NIM              | ✅  | ✅              | ❌                | ❌              | ❌    | ❌         |
	 * | Optimized builds | ✅  | ✅              | ❌                | ❌              | ❌    | ❌         |
	 * | Predefined build | ❌  | ❌              | ✅                | ❌              | ❌    | ❌         |
	 * | Default imports  | ❌  | ❌              | ❌                | ✅              | ✅    | ❌         |
	 * | `src`            | ❌  | ❌              | ❌                | ✅              | ✅    | ❌         |
	 * | DLL builds       | ❌  | ❌              | ❌                | ❌              | ❌    | ✅         |
	 *
	 * If you use any third-party plugins, make sure the way you import them is compatible with
	 * the way you import CKEditor&nbsp;5.
	 *
	 * <details>
	 * <summary>New installation methods and optimized builds</summary>
	 *
	 * If you use the {@glink updating/nim-migration/migration-to-new-installation-methods new installation methods},
	 * you should only import code from the `ckeditor5` and `ckeditor5-premium-features` packages.
	 * Do not import code from the `@ckeditor/ckeditor5-<NAME>` packages unless you follow
	 * the {@glink getting-started/setup/optimizing-build-size Optimizing build size} guide and the imports from
	 * the `@ckeditor/ckeditor5-<NAME>` packages end with `/dist/index.js`.
	 *
	 * If you use a CDN, ensure that some files are not included twice in your project.
	 *
	 * Examples of valid and invalid import paths:
	 *
	 * ```js
	 * import { ClassicEditor, Highlight } from 'ckeditor5'; // ✅
	 * import { Highlight } from '@ckeditor/ckeditor5-highlight/dist/index.js'; // ✅
	 * import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js'; // ❌
	 * import { Highlight } from '@ckeditor/ckeditor5-highlight'; // ❌
	 * import '@ckeditor/ckeditor5-highlight/build/highlight.js'; // ❌
	 * ```
	 * </details>
	 *
	 * <details>
	 * <summary>(Deprecated) Predefined builds</summary>
	 *
	 * **As of April, 2025 predefined build are no longer supported. Please refer to the
	 * {@glink getting-started/index Quick Start} guide
	 * to choose one of the modern installation and integration methods available**.
	 *
	 * If you use the predefined builds, you cannot import any additional plugins.
	 * These builds already include the editor's core and selected plugins and importing additional
	 * ones will cause some modules to be bundled and loaded twice.
	 *
	 * Examples of valid and invalid import paths:
	 *
	 * ```js
	 * import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // ✅
	 * import { Highlight } from 'ckeditor5'; // ❌
	 * import { Highlight } from '@ckeditor/ckeditor5-highlight/dist/index.js'; // ❌
	 * import { Highlight } from '@ckeditor/ckeditor5-highlight'; // ❌
	 * import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'; // ❌
	 * import '@ckeditor/ckeditor5-highlight/build/highlight'; // ❌
	 * ```
	 *
	 * If you are missing some features from the list of plugins, you should switch to the
	 * {@glink updating/nim-migration/migration-to-new-installation-methods new installation methods}
	 * which do not have this limitation.
	 * </details>
	 *
	 * <details>
	 * <summary>(Legacy) Default imports and `src` imports</summary>
	 *
	 * If you use the {@glink getting-started/legacy/installation-methods/quick-start-other legacy customized installation}
	 * method, you should only import code from the `@ckeditor/ckeditor5-<NAME>` packages. While you can import code from
	 * the `@ckeditor/ckeditor5-<NAME>/src/*` files, it is not recommended as it can make migration to the new installation
	 * methods more difficult.
	 *
	 * If you use this installation method, you should not import code from the `ckeditor5` or `ckeditor5-premium-features` packages.
	 *
	 * Examples of valid and invalid import paths:
	 *
	 * ```js
	 * import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'; // ✅
	 * import { Highlight } from '@ckeditor/ckeditor5-highlight'; // ✅
	 * import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js'; // ✅ (not recommended)
	 * import { Highlight } from 'ckeditor5'; // ❌
	 * import { Highlight } from '@ckeditor/ckeditor5-highlight/dist/index.js'; // ❌
	 * import '@ckeditor/ckeditor5-highlight/build/highlight'; // ❌
	 * ```
	 * </details>
	 *
	 * <details>
	 * <summary>(Legacy) DLL builds</summary>
	 *
	 * If you are using the {@glink getting-started/legacy/advanced/alternative-setups/dll-builds legacy DLL builds},
	 * you should not import any non-DLL modules.
	 *
	 * Examples of valid and invalid import paths:
	 *
	 * ```js
	 * import 'ckeditor5/build/ckeditor5-dll.js';// ✅
	 * import '@ckeditor/ckeditor5-editor-classic/build/editor-classic.js';// ✅
	 * import '@ckeditor/ckeditor5-highlight/build/highlight.js';// ✅
	 * import { Highlight } from 'ckeditor5'; // ❌
	 * import { Highlight } from '@ckeditor/ckeditor5-highlight/dist/index.js'; // ❌
	 * import { Highlight } from '@ckeditor/ckeditor5-highlight'; // ❌
	 * import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js'; // ❌
	 * ```
	 * </details>
	 *
	 * # Reinstall `node_modules`
	 *
	 * Usually, npm and other package managers deduplicate all packages - for example, `ckeditor5` is only installed once
	 * in `node_modules/`. However, it is known to fail to do so occasionally.
	 *
	 * To rule out this possibility, you can try the following:
	 *
	 * 1. Remove the `node_modules` directory.
	 * 2. Remove the `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml` files (depending on the package manager used).
	 * 3. Run `npm install` to reinstall all packages.
	 * 4. Run `npm ls` to check how many times packages like `@ckeditor/ckeditor5-core` are installed.
	 * If they are installed more than once, verify which package causes that.
	 *
	 * @error ckeditor-duplicated-modules
	 */ throw new CKEditorError('ckeditor-duplicated-modules', null);
} else {
    globalThis.CKEDITOR_VERSION = version;
}

const _listeningTo = Symbol('listeningTo');
const _emitterId = Symbol('emitterId');
const _delegations = Symbol('delegations');
const defaultEmitterClass$1 = /* #__PURE__ */ EmitterMixin(Object);
function EmitterMixin(base) {
    if (!base) {
        return defaultEmitterClass$1;
    }
    class Mixin extends base {
        on(event, callback, options) {
            this.listenTo(this, event, callback, options);
        }
        once(event, callback, options) {
            let wasFired = false;
            const onceCallback = (event, ...args)=>{
                // Ensure the callback is called only once even if the callback itself leads to re-firing the event
                // (which would call the callback again).
                if (!wasFired) {
                    wasFired = true;
                    // Go off() at the first call.
                    event.off();
                    // Go with the original callback.
                    callback.call(this, event, ...args);
                }
            };
            // Make a similar on() call, simply replacing the callback.
            this.listenTo(this, event, onceCallback, options);
        }
        off(event, callback) {
            this.stopListening(this, event, callback);
        }
        listenTo(emitter, event, callback, options = {}) {
            let emitterInfo, eventCallbacks;
            // _listeningTo contains a list of emitters that this object is listening to.
            // This list has the following format:
            //
            // _listeningTo: {
            //     emitterId: {
            //         emitter: emitter,
            //         callbacks: {
            //             event1: [ callback1, callback2, ... ]
            //             ....
            //         }
            //     },
            //     ...
            // }
            if (!this[_listeningTo]) {
                this[_listeningTo] = {};
            }
            const emitters = this[_listeningTo];
            if (!_getEmitterId(emitter)) {
                _setEmitterId(emitter);
            }
            const emitterId = _getEmitterId(emitter);
            if (!(emitterInfo = emitters[emitterId])) {
                emitterInfo = emitters[emitterId] = {
                    emitter,
                    callbacks: {}
                };
            }
            if (!(eventCallbacks = emitterInfo.callbacks[event])) {
                eventCallbacks = emitterInfo.callbacks[event] = [];
            }
            eventCallbacks.push(callback);
            // Finally register the callback to the event.
            addEventListener(this, emitter, event, callback, options);
        }
        stopListening(emitter, event, callback) {
            const emitters = this[_listeningTo];
            let emitterId = emitter && _getEmitterId(emitter);
            const emitterInfo = emitters && emitterId ? emitters[emitterId] : undefined;
            const eventCallbacks = emitterInfo && event ? emitterInfo.callbacks[event] : undefined;
            // Stop if nothing has been listened.
            if (!emitters || emitter && !emitterInfo || event && !eventCallbacks) {
                return;
            }
            // All params provided. off() that single callback.
            if (callback) {
                removeEventListener(this, emitter, event, callback);
                // We must remove callbacks as well in order to prevent memory leaks.
                // See https://github.com/ckeditor/ckeditor5/pull/8480
                const index = eventCallbacks.indexOf(callback);
                if (index !== -1) {
                    if (eventCallbacks.length === 1) {
                        delete emitterInfo.callbacks[event];
                    } else {
                        removeEventListener(this, emitter, event, callback);
                    }
                }
            } else if (eventCallbacks) {
                while(callback = eventCallbacks.pop()){
                    removeEventListener(this, emitter, event, callback);
                }
                delete emitterInfo.callbacks[event];
            } else if (emitterInfo) {
                for(event in emitterInfo.callbacks){
                    this.stopListening(emitter, event);
                }
                delete emitters[emitterId];
            } else {
                for(emitterId in emitters){
                    this.stopListening(emitters[emitterId].emitter);
                }
                delete this[_listeningTo];
            }
        }
        fire(eventOrInfo, ...args) {
            try {
                const eventInfo = eventOrInfo instanceof EventInfo ? eventOrInfo : new EventInfo(this, eventOrInfo);
                const event = eventInfo.name;
                let callbacks = getCallbacksForEvent(this, event);
                // Record that the event passed this emitter on its path.
                eventInfo.path.push(this);
                // Handle event listener callbacks first.
                if (callbacks) {
                    // Copying callbacks array is the easiest and most secure way of preventing infinite loops, when event callbacks
                    // are added while processing other callbacks. Previous solution involved adding counters (unique ids) but
                    // failed if callbacks were added to the queue before currently processed callback.
                    // If this proves to be too inefficient, another method is to change `.on()` so callbacks are stored if same
                    // event is currently processed. Then, `.fire()` at the end, would have to add all stored events.
                    callbacks = callbacks.slice();
                    for(let i = 0; i < callbacks.length; i++){
                        const fn = callbacks[i].callback;
                        fn.call(this, eventInfo, ...args);
                        // Remove the callback from future requests if off() has been called.
                        if (eventInfo.off.called) {
                            // Remove the called mark for the next calls.
                            delete eventInfo.off.called;
                            this._removeEventListener(event, fn);
                        }
                        // Do not execute next callbacks if stop() was called.
                        if (eventInfo.stop.called) {
                            break;
                        }
                    }
                }
                // Delegate event to other emitters if needed.
                const delegations = this[_delegations];
                if (delegations) {
                    const destinations = delegations.get(event);
                    const passAllDestinations = delegations.get('*');
                    if (destinations) {
                        fireDelegatedEvents(destinations, eventInfo, args);
                    }
                    if (passAllDestinations) {
                        fireDelegatedEvents(passAllDestinations, eventInfo, args);
                    }
                }
                return eventInfo.return;
            } catch (err) {
                // @if CK_DEBUG // throw err;
                /* istanbul ignore next -- @preserve */ CKEditorError.rethrowUnexpectedError(err, this);
            }
        }
        delegate(...events) {
            return {
                to: (emitter, nameOrFunction)=>{
                    if (!this[_delegations]) {
                        this[_delegations] = new Map();
                    }
                    // Originally there was a for..of loop which unfortunately caused an error in Babel that didn't allow
                    // build an application. See: https://github.com/ckeditor/ckeditor5-react/issues/40.
                    events.forEach((eventName)=>{
                        const destinations = this[_delegations].get(eventName);
                        if (!destinations) {
                            this[_delegations].set(eventName, new Map([
                                [
                                    emitter,
                                    nameOrFunction
                                ]
                            ]));
                        } else {
                            destinations.set(emitter, nameOrFunction);
                        }
                    });
                }
            };
        }
        stopDelegating(event, emitter) {
            if (!this[_delegations]) {
                return;
            }
            if (!event) {
                this[_delegations].clear();
            } else if (!emitter) {
                this[_delegations].delete(event);
            } else {
                const destinations = this[_delegations].get(event);
                if (destinations) {
                    destinations.delete(emitter);
                }
            }
        }
        _addEventListener(event, callback, options) {
            createEventNamespace(this, event);
            const lists = getCallbacksListsForNamespace(this, event);
            const priority = priorities.get(options.priority);
            const callbackDefinition = {
                callback,
                priority
            };
            // Add the callback to all callbacks list.
            for (const callbacks of lists){
                // Add the callback to the list in the right priority position.
                insertToPriorityArray(callbacks, callbackDefinition);
            }
        }
        _removeEventListener(event, callback) {
            const lists = getCallbacksListsForNamespace(this, event);
            for (const callbacks of lists){
                for(let i = 0; i < callbacks.length; i++){
                    if (callbacks[i].callback == callback) {
                        // Remove the callback from the list (fixing the next index).
                        callbacks.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    }
    return Mixin;
}
// Backward compatibility with `mix`
[
    'on',
    'once',
    'off',
    'listenTo',
    'stopListening',
    'fire',
    'delegate',
    'stopDelegating',
    '_addEventListener',
    '_removeEventListener'
].forEach((key)=>{
    EmitterMixin[key] = defaultEmitterClass$1.prototype[key];
});
/**
 * Checks if `listeningEmitter` listens to an emitter with given `listenedToEmitterId` and if so, returns that emitter.
 * If not, returns `null`.
 *
 * @internal
 * @param listeningEmitter An emitter that listens.
 * @param listenedToEmitterId Unique emitter id of emitter listened to.
 */ function _getEmitterListenedTo(listeningEmitter, listenedToEmitterId) {
    const listeningTo = listeningEmitter[_listeningTo];
    if (listeningTo && listeningTo[listenedToEmitterId]) {
        return listeningTo[listenedToEmitterId].emitter;
    }
    return null;
}
/**
 * Sets emitter's unique id.
 *
 * **Note:** `_emitterId` can be set only once.
 *
 * @internal
 * @param emitter An emitter for which id will be set.
 * @param id Unique id to set. If not passed, random unique id will be set.
 */ function _setEmitterId(emitter, id) {
    if (!emitter[_emitterId]) {
        emitter[_emitterId] = id || uid();
    }
}
/**
 * Returns emitter's unique id.
 *
 * @internal
 * @param emitter An emitter which id will be returned.
 */ function _getEmitterId(emitter) {
    return emitter[_emitterId];
}
/**
 * Gets the internal `_events` property of the given object.
 * `_events` property store all lists with callbacks for registered event names.
 * If there were no events registered on the object, empty `_events` object is created.
 */ function getEvents(source) {
    if (!source._events) {
        Object.defineProperty(source, '_events', {
            value: {}
        });
    }
    return source._events;
}
/**
 * Creates event node for generic-specific events relation architecture.
 */ function makeEventNode() {
    return {
        callbacks: [],
        childEvents: []
    };
}
/**
 * Creates an architecture for generic-specific events relation.
 * If needed, creates all events for given eventName, i.e. if the first registered event
 * is foo:bar:abc, it will create foo:bar:abc, foo:bar and foo event and tie them together.
 * It also copies callbacks from more generic events to more specific events when
 * specific events are created.
 */ function createEventNamespace(source, eventName) {
    const events = getEvents(source);
    // First, check if the event we want to add to the structure already exists.
    if (events[eventName]) {
        // If it exists, we don't have to do anything.
        return;
    }
    // In other case, we have to create the structure for the event.
    // Note, that we might need to create intermediate events too.
    // I.e. if foo:bar:abc is being registered and we only have foo in the structure,
    // we need to also register foo:bar.
    // Currently processed event name.
    let name = eventName;
    // Name of the event that is a child event for currently processed event.
    let childEventName = null;
    // Array containing all newly created specific events.
    const newEventNodes = [];
    // While loop can't check for ':' index because we have to handle generic events too.
    // In each loop, we truncate event name, going from the most specific name to the generic one.
    // I.e. foo:bar:abc -> foo:bar -> foo.
    while(name !== ''){
        if (events[name]) {
            break;
        }
        // If this event is not yet registered, create a new object for it.
        events[name] = makeEventNode();
        // Add it to the array with newly created events.
        newEventNodes.push(events[name]);
        // Add previously processed event name as a child of this event.
        if (childEventName) {
            events[name].childEvents.push(childEventName);
        }
        childEventName = name;
        // If `.lastIndexOf()` returns -1, `.substr()` will return '' which will break the loop.
        name = name.substr(0, name.lastIndexOf(':'));
    }
    if (name !== '') {
        // If name is not empty, we found an already registered event that was a parent of the
        // event we wanted to register.
        // Copy that event's callbacks to newly registered events.
        for (const node of newEventNodes){
            node.callbacks = events[name].callbacks.slice();
        }
        // Add last newly created event to the already registered event.
        events[name].childEvents.push(childEventName);
    }
}
/**
 * Gets an array containing callbacks list for a given event and it's more specific events.
 * I.e. if given event is foo:bar and there is also foo:bar:abc event registered, this will
 * return callback list of foo:bar and foo:bar:abc (but not foo).
 */ function getCallbacksListsForNamespace(source, eventName) {
    const eventNode = getEvents(source)[eventName];
    if (!eventNode) {
        return [];
    }
    let callbacksLists = [
        eventNode.callbacks
    ];
    for(let i = 0; i < eventNode.childEvents.length; i++){
        const childCallbacksLists = getCallbacksListsForNamespace(source, eventNode.childEvents[i]);
        callbacksLists = callbacksLists.concat(childCallbacksLists);
    }
    return callbacksLists;
}
/**
 * Get the list of callbacks for a given event, but only if there any callbacks have been registered.
 * If there are no callbacks registered for given event, it checks if this is a specific event and looks
 * for callbacks for it's more generic version.
 */ function getCallbacksForEvent(source, eventName) {
    if (!source._events) {
        return null;
    }
    let currentEventName = eventName;
    do {
        const event = source._events[currentEventName];
        if (event && event.callbacks && event.callbacks.length) {
            return event.callbacks;
        }
        const colonIndex = currentEventName.lastIndexOf(':');
        currentEventName = colonIndex > -1 ? currentEventName.substring(0, colonIndex) : '';
    }while (currentEventName)
    return null;
}
/**
 * Fires delegated events for given map of destinations.
 *
 * @param destinations A map containing `[ {@link module:utils/emittermixin~Emitter}, "event name" ]` pair destinations.
 * @param eventInfo The original event info object.
 * @param fireArgs Arguments the original event was fired with.
 */ function fireDelegatedEvents(destinations, eventInfo, fireArgs) {
    for (let [emitter, name] of destinations){
        if (!name) {
            name = eventInfo.name;
        } else if (typeof name == 'function') {
            name = name(eventInfo.name);
        }
        const delegatedInfo = new EventInfo(eventInfo.source, name);
        delegatedInfo.path = [
            ...eventInfo.path
        ];
        emitter.fire(delegatedInfo, ...fireArgs);
    }
}
/**
 * Helper for registering event callback on the emitter.
 */ function addEventListener(listener, emitter, event, callback, options) {
    if (emitter._addEventListener) {
        emitter._addEventListener(event, callback, options);
    } else {
        // Allow listening on objects that do not implement Emitter interface.
        // This is needed in some tests that are using mocks instead of the real objects with EmitterMixin mixed.
        listener._addEventListener.call(emitter, event, callback, options);
    }
}
/**
 * Helper for removing event callback from the emitter.
 */ function removeEventListener(listener, emitter, event, callback) {
    if (emitter._removeEventListener) {
        emitter._removeEventListener(event, callback);
    } else {
        // Allow listening on objects that do not implement Emitter interface.
        // This is needed in some tests that are using mocks instead of the real objects with EmitterMixin mixed.
        listener._removeEventListener.call(emitter, event, callback);
    }
}

const observablePropertiesSymbol = Symbol('observableProperties');
const boundObservablesSymbol = Symbol('boundObservables');
const boundPropertiesSymbol = Symbol('boundProperties');
const decoratedMethods = Symbol('decoratedMethods');
const decoratedOriginal = Symbol('decoratedOriginal');
const defaultObservableClass = /* #__PURE__ */ ObservableMixin(/* #__PURE__ */ EmitterMixin());
function ObservableMixin(base) {
    if (!base) {
        return defaultObservableClass;
    }
    class Mixin extends base {
        set(name, value) {
            // If the first parameter is an Object, iterate over its properties.
            if (isObject(name)) {
                Object.keys(name).forEach((property)=>{
                    this.set(property, name[property]);
                }, this);
                return;
            }
            initObservable(this);
            const properties = this[observablePropertiesSymbol];
            if (name in this && !properties.has(name)) {
                /**
				 * Cannot override an existing property.
				 *
				 * This error is thrown when trying to {@link module:utils/observablemixin~Observable#set set} a property with
				 * a name of an already existing property. For example:
				 *
				 * ```ts
				 * let observable = new Model();
				 * observable.property = 1;
				 * observable.set( 'property', 2 );			// throws
				 *
				 * observable.set( 'property', 1 );
				 * observable.set( 'property', 2 );			// ok, because this is an existing property.
				 * ```
				 *
				 * @error observable-set-cannot-override
				 */ throw new CKEditorError('observable-set-cannot-override', this);
            }
            Object.defineProperty(this, name, {
                enumerable: true,
                configurable: true,
                get () {
                    return properties.get(name);
                },
                set (value) {
                    const oldValue = properties.get(name);
                    // Fire `set` event before the new value will be set to make it possible
                    // to override observable property without affecting `change` event.
                    // See https://github.com/ckeditor/ckeditor5-utils/issues/171.
                    let newValue = this.fire(`set:${name}`, name, value, oldValue);
                    if (newValue === undefined) {
                        newValue = value;
                    }
                    // Allow undefined as an initial value like A.define( 'x', undefined ) (#132).
                    // Note: When properties map has no such own property, then its value is undefined.
                    if (oldValue !== newValue || !properties.has(name)) {
                        properties.set(name, newValue);
                        this.fire(`change:${name}`, name, newValue, oldValue);
                    }
                }
            });
            this[name] = value;
        }
        bind(...bindProperties) {
            if (!bindProperties.length || !isStringArray(bindProperties)) {
                /**
				 * All properties must be strings.
				 *
				 * @error observable-bind-wrong-properties
				 */ throw new CKEditorError('observable-bind-wrong-properties', this);
            }
            if (new Set(bindProperties).size !== bindProperties.length) {
                /**
				 * Properties must be unique.
				 *
				 * @error observable-bind-duplicate-properties
				 */ throw new CKEditorError('observable-bind-duplicate-properties', this);
            }
            initObservable(this);
            const boundProperties = this[boundPropertiesSymbol];
            bindProperties.forEach((propertyName)=>{
                if (boundProperties.has(propertyName)) {
                    /**
					 * Cannot bind the same property more than once.
					 *
					 * @error observable-bind-rebind
					 */ throw new CKEditorError('observable-bind-rebind', this);
                }
            });
            const bindings = new Map();
            bindProperties.forEach((a)=>{
                const binding = {
                    property: a,
                    to: []
                };
                boundProperties.set(a, binding);
                bindings.set(a, binding);
            });
            return {
                to: bindTo,
                toMany: bindToMany,
                _observable: this,
                _bindProperties: bindProperties,
                _to: [],
                _bindings: bindings
            };
        }
        unbind(...unbindProperties) {
            // Nothing to do here if not inited yet.
            if (!this[observablePropertiesSymbol]) {
                return;
            }
            const boundProperties = this[boundPropertiesSymbol];
            const boundObservables = this[boundObservablesSymbol];
            if (unbindProperties.length) {
                if (!isStringArray(unbindProperties)) {
                    /**
					 * Properties must be strings.
					 *
					 * @error observable-unbind-wrong-properties
					 */ throw new CKEditorError('observable-unbind-wrong-properties', this);
                }
                unbindProperties.forEach((propertyName)=>{
                    const binding = boundProperties.get(propertyName);
                    // Nothing to do if the binding is not defined
                    if (!binding) {
                        return;
                    }
                    binding.to.forEach(([toObservable, toProperty])=>{
                        const toProperties = boundObservables.get(toObservable);
                        const toPropertyBindings = toProperties[toProperty];
                        toPropertyBindings.delete(binding);
                        if (!toPropertyBindings.size) {
                            delete toProperties[toProperty];
                        }
                        if (!Object.keys(toProperties).length) {
                            boundObservables.delete(toObservable);
                            this.stopListening(toObservable, 'change');
                        }
                    });
                    boundProperties.delete(propertyName);
                });
            } else {
                boundObservables.forEach((bindings, boundObservable)=>{
                    this.stopListening(boundObservable, 'change');
                });
                boundObservables.clear();
                boundProperties.clear();
            }
        }
        decorate(methodName) {
            initObservable(this);
            const originalMethod = this[methodName];
            if (!originalMethod) {
                /**
				 * Cannot decorate an undefined method.
				 *
				 * @error observablemixin-cannot-decorate-undefined
				 * @param {object} object The object which method should be decorated.
				 * @param {string} methodName Name of the method which does not exist.
				 */ throw new CKEditorError('observablemixin-cannot-decorate-undefined', this, {
                    object: this,
                    methodName
                });
            }
            this.on(methodName, (evt, args)=>{
                evt.return = originalMethod.apply(this, args);
            });
            this[methodName] = function(...args) {
                return this.fire(methodName, args);
            };
            this[methodName][decoratedOriginal] = originalMethod;
            if (!this[decoratedMethods]) {
                this[decoratedMethods] = [];
            }
            this[decoratedMethods].push(methodName);
        }
        // Override the EmitterMixin stopListening method to be able to clean (and restore) decorated methods.
        // This is needed in case of:
        //  1. Have x.foo() decorated.
        //  2. Call x.stopListening()
        //  3. Call x.foo(). Problem: nothing happens (the original foo() method is not executed)
        stopListening(emitter, event, callback) {
            // Removing all listeners so let's clean the decorated methods to the original state.
            if (!emitter && this[decoratedMethods]) {
                for (const methodName of this[decoratedMethods]){
                    this[methodName] = this[methodName][decoratedOriginal];
                }
                delete this[decoratedMethods];
            }
            super.stopListening(emitter, event, callback);
        }
        [observablePropertiesSymbol];
        [decoratedMethods];
        [boundPropertiesSymbol];
        [boundObservablesSymbol];
    }
    return Mixin;
}
// Backward compatibility with `mix`
[
    'set',
    'bind',
    'unbind',
    'decorate',
    'on',
    'once',
    'off',
    'listenTo',
    'stopListening',
    'fire',
    'delegate',
    'stopDelegating',
    '_addEventListener',
    '_removeEventListener'
].forEach((key)=>{
    ObservableMixin[key] = defaultObservableClass.prototype[key];
});
// Init symbol properties needed for the observable mechanism to work.
function initObservable(observable) {
    // Do nothing if already inited.
    if (observable[observablePropertiesSymbol]) {
        return;
    }
    // The internal hash containing the observable's state.
    Object.defineProperty(observable, observablePropertiesSymbol, {
        value: new Map()
    });
    // Map containing bindings to external observables. It shares the binding objects
    // (`{ observable: A, property: 'a', to: ... }`) with {@link module:utils/observablemixin~Observable#_boundProperties} and
    // it is used to observe external observables to update own properties accordingly.
    // See {@link module:utils/observablemixin~Observable#bind}.
    //
    //		A.bind( 'a', 'b', 'c' ).to( B, 'x', 'y', 'x' );
    //		console.log( A._boundObservables );
    //
    //			Map( {
    //				B: {
    //					x: Set( [
    //						{ observable: A, property: 'a', to: [ [ B, 'x' ] ] },
    //						{ observable: A, property: 'c', to: [ [ B, 'x' ] ] }
    //					] ),
    //					y: Set( [
    //						{ observable: A, property: 'b', to: [ [ B, 'y' ] ] },
    //					] )
    //				}
    //			} )
    //
    //		A.bind( 'd' ).to( B, 'z' ).to( C, 'w' ).as( callback );
    //		console.log( A._boundObservables );
    //
    //			Map( {
    //				B: {
    //					x: Set( [
    //						{ observable: A, property: 'a', to: [ [ B, 'x' ] ] },
    //						{ observable: A, property: 'c', to: [ [ B, 'x' ] ] }
    //					] ),
    //					y: Set( [
    //						{ observable: A, property: 'b', to: [ [ B, 'y' ] ] },
    //					] ),
    //					z: Set( [
    //						{ observable: A, property: 'd', to: [ [ B, 'z' ], [ C, 'w' ] ], callback: callback }
    //					] )
    //				},
    //				C: {
    //					w: Set( [
    //						{ observable: A, property: 'd', to: [ [ B, 'z' ], [ C, 'w' ] ], callback: callback }
    //					] )
    //				}
    //			} )
    //
    Object.defineProperty(observable, boundObservablesSymbol, {
        value: new Map()
    });
    // Object that stores which properties of this observable are bound and how. It shares
    // the binding objects (`{ observable: A, property: 'a', to: ... }`) with
    // {@link module:utils/observablemixin~Observable#_boundObservables}. This data structure is
    // a reverse of {@link module:utils/observablemixin~Observable#_boundObservables} and it is helpful for
    // {@link module:utils/observablemixin~Observable#unbind}.
    //
    // See {@link module:utils/observablemixin~Observable#bind}.
    //
    //		A.bind( 'a', 'b', 'c' ).to( B, 'x', 'y', 'x' );
    //		console.log( A._boundProperties );
    //
    //			Map( {
    //				a: { observable: A, property: 'a', to: [ [ B, 'x' ] ] },
    //				b: { observable: A, property: 'b', to: [ [ B, 'y' ] ] },
    //				c: { observable: A, property: 'c', to: [ [ B, 'x' ] ] }
    //			} )
    //
    //		A.bind( 'd' ).to( B, 'z' ).to( C, 'w' ).as( callback );
    //		console.log( A._boundProperties );
    //
    //			Map( {
    //				a: { observable: A, property: 'a', to: [ [ B, 'x' ] ] },
    //				b: { observable: A, property: 'b', to: [ [ B, 'y' ] ] },
    //				c: { observable: A, property: 'c', to: [ [ B, 'x' ] ] },
    //				d: { observable: A, property: 'd', to: [ [ B, 'z' ], [ C, 'w' ] ], callback: callback }
    //			} )
    Object.defineProperty(observable, boundPropertiesSymbol, {
        value: new Map()
    });
}
/**
 * A chaining for {@link module:utils/observablemixin~Observable#bind} providing `.to()` interface.
 *
 * @param args Arguments of the `.to( args )` binding.
 */ function bindTo(...args) {
    const parsedArgs = parseBindToArgs(...args);
    const bindingsKeys = Array.from(this._bindings.keys());
    const numberOfBindings = bindingsKeys.length;
    // Eliminate A.bind( 'x' ).to( B, C )
    if (!parsedArgs.callback && parsedArgs.to.length > 1) {
        /**
		 * Binding multiple observables only possible with callback.
		 *
		 * @error observable-bind-to-no-callback
		 */ throw new CKEditorError('observable-bind-to-no-callback', this);
    }
    // Eliminate A.bind( 'x', 'y' ).to( B, callback )
    if (numberOfBindings > 1 && parsedArgs.callback) {
        /**
		 * Cannot bind multiple properties and use a callback in one binding.
		 *
		 * @error observable-bind-to-extra-callback
		 */ throw new CKEditorError('observable-bind-to-extra-callback', this);
    }
    parsedArgs.to.forEach((to)=>{
        // Eliminate A.bind( 'x', 'y' ).to( B, 'a' )
        if (to.properties.length && to.properties.length !== numberOfBindings) {
            /**
			 * The number of properties must match.
			 *
			 * @error observable-bind-to-properties-length
			 */ throw new CKEditorError('observable-bind-to-properties-length', this);
        }
        // When no to.properties specified, observing source properties instead i.e.
        // A.bind( 'x', 'y' ).to( B ) -> Observe B.x and B.y
        if (!to.properties.length) {
            to.properties = this._bindProperties;
        }
    });
    this._to = parsedArgs.to;
    // Fill {@link BindChain#_bindings} with callback. When the callback is set there's only one binding.
    if (parsedArgs.callback) {
        this._bindings.get(bindingsKeys[0]).callback = parsedArgs.callback;
    }
    attachBindToListeners(this._observable, this._to);
    // Update observable._boundProperties and observable._boundObservables.
    updateBindToBound(this);
    // Set initial values of bound properties.
    this._bindProperties.forEach((propertyName)=>{
        updateBoundObservableProperty(this._observable, propertyName);
    });
}
/**
 * Binds to an attribute in a set of iterable observables.
 */ function bindToMany(observables, attribute, callback) {
    if (this._bindings.size > 1) {
        /**
		 * Binding one attribute to many observables only possible with one attribute.
		 *
		 * @error observable-bind-to-many-not-one-binding
		 */ throw new CKEditorError('observable-bind-to-many-not-one-binding', this);
    }
    this.to(// Bind to #attribute of each observable...
    ...getBindingTargets(observables, attribute), // ...using given callback to parse attribute values.
    callback);
}
/**
 * Returns an array of binding components for
 * {@link Observable#bind} from a set of iterable observables.
 */ function getBindingTargets(observables, attribute) {
    const observableAndAttributePairs = observables.map((observable)=>[
            observable,
            attribute
        ]);
    // Merge pairs to one-dimension array of observables and attributes.
    return Array.prototype.concat.apply([], observableAndAttributePairs);
}
/**
 * Check if all entries of the array are of `String` type.
 */ function isStringArray(arr) {
    return arr.every((a)=>typeof a == 'string');
}
/**
 * Parses and validates {@link Observable#bind}`.to( args )` arguments and returns
 * an object with a parsed structure. For example
 *
 * ```ts
 * A.bind( 'x' ).to( B, 'a', C, 'b', call );
 * ```
 *
 * becomes
 *
 * ```ts
 * {
 * 	to: [
 * 		{ observable: B, properties: [ 'a' ] },
 * 		{ observable: C, properties: [ 'b' ] },
 * 	],
 * 	callback: call
 * }
 *
 * @param args Arguments of {@link Observable#bind}`.to( args )`.
 */ function parseBindToArgs(...args) {
    // Eliminate A.bind( 'x' ).to()
    if (!args.length) {
        /**
		 * Invalid argument syntax in `to()`.
		 *
		 * @error observable-bind-to-parse-error
		 */ throw new CKEditorError('observable-bind-to-parse-error', null);
    }
    const parsed = {
        to: []
    };
    let lastObservable;
    if (typeof args[args.length - 1] == 'function') {
        parsed.callback = args.pop();
    }
    args.forEach((a)=>{
        if (typeof a == 'string') {
            lastObservable.properties.push(a);
        } else if (typeof a == 'object') {
            lastObservable = {
                observable: a,
                properties: []
            };
            parsed.to.push(lastObservable);
        } else {
            throw new CKEditorError('observable-bind-to-parse-error', null);
        }
    });
    return parsed;
}
/**
 * Synchronizes {@link module:utils/observable#_boundObservables} with {@link Binding}.
 *
 * @param binding A binding to store in {@link Observable#_boundObservables}.
 * @param toObservable A observable, which is a new component of `binding`.
 * @param toPropertyName A name of `toObservable`'s property, a new component of the `binding`.
 */ function updateBoundObservables(observable, binding, toObservable, toPropertyName) {
    const boundObservables = observable[boundObservablesSymbol];
    const bindingsToObservable = boundObservables.get(toObservable);
    const bindings = bindingsToObservable || {};
    if (!bindings[toPropertyName]) {
        bindings[toPropertyName] = new Set();
    }
    // Pass the binding to a corresponding Set in `observable._boundObservables`.
    bindings[toPropertyName].add(binding);
    if (!bindingsToObservable) {
        boundObservables.set(toObservable, bindings);
    }
}
/**
 * Synchronizes {@link Observable#_boundProperties} and {@link Observable#_boundObservables}
 * with {@link BindChain}.
 *
 * Assuming the following binding being created
 *
 * ```ts
 * A.bind( 'a', 'b' ).to( B, 'x', 'y' );
 * ```
 *
 * the following bindings were initialized by {@link Observable#bind} in {@link BindChain#_bindings}:
 *
 * ```ts
 * {
 * 	a: { observable: A, property: 'a', to: [] },
 * 	b: { observable: A, property: 'b', to: [] },
 * }
 * ```
 *
 * Iterate over all bindings in this chain and fill their `to` properties with
 * corresponding to( ... ) arguments (components of the binding), so
 *
 * ```ts
 * {
 * 	a: { observable: A, property: 'a', to: [ B, 'x' ] },
 * 	b: { observable: A, property: 'b', to: [ B, 'y' ] },
 * }
 * ```
 *
 * Then update the structure of {@link Observable#_boundObservables} with updated
 * binding, so it becomes:
 *
 * ```ts
 * Map( {
 * 	B: {
 * 		x: Set( [
 * 			{ observable: A, property: 'a', to: [ [ B, 'x' ] ] }
 * 		] ),
 * 		y: Set( [
 * 			{ observable: A, property: 'b', to: [ [ B, 'y' ] ] },
 * 		] )
 * 	}
 * } )
 * ```
 *
 * @param chain The binding initialized by {@link Observable#bind}.
 */ function updateBindToBound(chain) {
    let toProperty;
    chain._bindings.forEach((binding, propertyName)=>{
        // Note: For a binding without a callback, this will run only once
        // like in A.bind( 'x', 'y' ).to( B, 'a', 'b' )
        // TODO: ES6 destructuring.
        chain._to.forEach((to)=>{
            toProperty = to.properties[binding.callback ? 0 : chain._bindProperties.indexOf(propertyName)];
            binding.to.push([
                to.observable,
                toProperty
            ]);
            updateBoundObservables(chain._observable, binding, to.observable, toProperty);
        });
    });
}
/**
 * Updates an property of a {@link Observable} with a value
 * determined by an entry in {@link Observable#_boundProperties}.
 *
 * @param observable A observable which property is to be updated.
 * @param propertyName An property to be updated.
 */ function updateBoundObservableProperty(observable, propertyName) {
    const boundProperties = observable[boundPropertiesSymbol];
    const binding = boundProperties.get(propertyName);
    let propertyValue;
    // When a binding with callback is created like
    //
    // 		A.bind( 'a' ).to( B, 'b', C, 'c', callback );
    //
    // collect B.b and C.c, then pass them to callback to set A.a.
    if (binding.callback) {
        propertyValue = binding.callback.apply(observable, binding.to.map((to)=>to[0][to[1]]));
    } else {
        propertyValue = binding.to[0];
        propertyValue = propertyValue[0][propertyValue[1]];
    }
    if (Object.prototype.hasOwnProperty.call(observable, propertyName)) {
        observable[propertyName] = propertyValue;
    } else {
        observable.set(propertyName, propertyValue);
    }
}
/**
 * Starts listening to changes in {@link BindChain._to} observables to update
 * {@link BindChain._observable} {@link BindChain._bindProperties}. Also sets the
 * initial state of {@link BindChain._observable}.
 *
 * @param chain The chain initialized by {@link Observable#bind}.
 */ function attachBindToListeners(observable, toBindings) {
    toBindings.forEach((to)=>{
        const boundObservables = observable[boundObservablesSymbol];
        let bindings;
        // If there's already a chain between the observables (`observable` listens to
        // `to.observable`), there's no need to create another `change` event listener.
        if (!boundObservables.get(to.observable)) {
            observable.listenTo(to.observable, 'change', (evt, propertyName)=>{
                bindings = boundObservables.get(to.observable)[propertyName];
                // Note: to.observable will fire for any property change, react
                // to changes of properties which are bound only.
                if (bindings) {
                    bindings.forEach((binding)=>{
                        updateBoundObservableProperty(observable, binding.property);
                    });
                }
            });
        }
    });
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/elementreplacer
 */ /**
 * Utility class allowing to hide existing HTML elements or replace them with given ones in a way that doesn't remove
 * the original elements from the DOM.
 */ class ElementReplacer {
    /**
	 * The elements replaced by {@link #replace} and their replacements.
	 */ _replacedElements;
    constructor(){
        this._replacedElements = [];
    }
    /**
	 * Hides the `element` and, if specified, inserts the the given element next to it.
	 *
	 * The effect of this method can be reverted by {@link #restore}.
	 *
	 * @param element The element to replace.
	 * @param newElement The replacement element. If not passed, then the `element` will just be hidden.
	 */ replace(element, newElement) {
        this._replacedElements.push({
            element,
            newElement
        });
        element.style.display = 'none';
        if (newElement) {
            element.parentNode.insertBefore(newElement, element.nextSibling);
        }
    }
    /**
	 * Restores what {@link #replace} did.
	 */ restore() {
        this._replacedElements.forEach(({ element, newElement })=>{
            element.style.display = '';
            if (newElement) {
                newElement.remove();
            }
        });
        this._replacedElements = [];
    }
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/abortabledebounce
 */ /**
 * Returns a function wrapper that will execute the provided function and abort any previous call that is still in progress.
 *
 * @param func The function to be called. It will be provided with `AbortSignal` as the first parameter.
 */ function abortableDebounce(func) {
    let controller = new AbortController();
    function abortable(...args) {
        controller.abort();
        controller = new AbortController();
        return func(controller.signal, ...args);
    }
    abortable.abort = ()=>controller.abort();
    return abortable;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/count
 */ /**
 * Returns the number of items return by the iterator.
 *
 * ```ts
 * count( [ 1, 2, 3, 4, 5 ] ); // 5;
 * ```
 *
 * @param iterable Any iterable.
 * @returns Number of items returned by that iterable.
 */ function count(iterable) {
    let count = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of iterable){
        count++;
    }
    return count;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/comparearrays
 */ /**
 * Compares how given arrays relate to each other. One array can be: same as another array, prefix of another array
 * or completely different. If arrays are different, first index at which they differ is returned. Otherwise,
 * a flag specifying the relation is returned. Flags are negative numbers, so whenever a number >= 0 is returned
 * it means that arrays differ.
 *
 * ```ts
 * compareArrays( [ 0, 2 ], [ 0, 2 ] );		// 'same'
 * compareArrays( [ 0, 2 ], [ 0, 2, 1 ] );		// 'prefix'
 * compareArrays( [ 0, 2 ], [ 0 ] );			// 'extension'
 * compareArrays( [ 0, 2 ], [ 1, 2 ] );		// 0
 * compareArrays( [ 0, 2 ], [ 0, 1 ] );		// 1
 * ```
 *
 * @param a Array that is compared.
 * @param b Array to compare with.
 * @returns How array `a` is related to `b`.
 */ function compareArrays(a, b) {
    const minLen = Math.min(a.length, b.length);
    for(let i = 0; i < minLen; i++){
        if (a[i] != b[i]) {
            // The arrays are different.
            return i;
        }
    }
    // Both arrays were same at all points.
    if (a.length == b.length) {
        // If their length is also same, they are the same.
        return 'same';
    } else if (a.length < b.length) {
        // Compared array is shorter so it is a prefix of the other array.
        return 'prefix';
    } else {
        // Compared array is longer so it is an extension of the other array.
        return 'extension';
    }
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/isiterable
 */ /**
 * Checks if value implements iterator interface.
 *
 * @param value The value to check.
 * @returns True if value implements iterator interface.
 */ function isIterable(value) {
    return !!(value && value[Symbol.iterator]);
}

/**
 * Creates an HTML or SVG element with attributes and children elements.
 *
 * ```ts
 * createElement( document, 'p' ); // <p>
 * createElement( document, 'mask', { xmlns: 'http://www.w3.org/2000/svg' } ); // <mask>
 * ```
 *
 * @param doc Document used to create the element.
 * @param name Name of the element.
 * @param attributes Object where keys represent attribute keys and values represent attribute values.
 * @param children Child or any iterable of children. Strings will be automatically turned into Text nodes.
 * @returns HTML or SVG element.
 */ function createElement(doc, name, attributes = {}, children = []) {
    const namespace = attributes && attributes.xmlns;
    const element = namespace ? doc.createElementNS(namespace, name) : doc.createElement(name);
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
    if (isString(children) || !isIterable(children)) {
        children = [
            children
        ];
    }
    for (let child of children){
        if (isString(child)) {
            child = doc.createTextNode(child);
        }
        element.appendChild(child);
    }
    return element;
}

/**
 * Handles a configuration dictionary.
 *
 * @typeParam Cfg A type of the configuration dictionary.
 */ class Config {
    /**
	 * Store for the whole configuration.
	 */ _config;
    /**
	 * Creates an instance of the {@link ~Config} class.
	 *
	 * @param configurations The initial configurations to be set. Usually, provided by the user.
	 * @param defaultConfigurations The default configurations. Usually, provided by the system.
	 */ constructor(configurations, defaultConfigurations){
        this._config = Object.create(null);
        // Set default configuration.
        if (defaultConfigurations) {
            // Clone the configuration to make sure that the properties will not be shared
            // between editors and make the watchdog feature work correctly.
            this.define(cloneConfig(defaultConfigurations));
        }
        // Set initial configuration.
        if (configurations) {
            this._setObjectToTarget(this._config, configurations);
        }
    }
    set(name, value) {
        this._setToTarget(this._config, name, value);
    }
    define(name, value) {
        const isDefine = true;
        this._setToTarget(this._config, name, value, isDefine);
    }
    /**
	 * Gets the value for a configuration entry.
	 *
	 * ```ts
	 * config.get( 'name' );
	 * ```
	 *
	 * Deep configurations can be retrieved by separating each part with a dot.
	 *
	 * ```ts
	 * config.get( 'toolbar.collapsed' );
	 * ```
	 *
	 * @param name The configuration name. Configuration names are case-sensitive.
	 * @returns The configuration value or `undefined` if the configuration entry was not found.
	 */ get(name) {
        return this._getFromSource(this._config, name);
    }
    /**
	 * Iterates over all top level configuration names.
	 */ *names() {
        for (const name of Object.keys(this._config)){
            yield name;
        }
    }
    /**
	 * Saves passed configuration to the specified target (nested object).
	 *
	 * @param target Nested config object.
	 * @param name The configuration name or an object from which take properties as
	 * configuration entries. Configuration names are case-sensitive.
	 * @param value The configuration value. Used if a name is passed.
	 * @param isDefine Define if passed configuration should overwrite existing one.
	 */ _setToTarget(target, name, value, isDefine = false) {
        // In case of an object, iterate through it and call `_setToTarget` again for each property.
        if (isPlainObject(name)) {
            this._setObjectToTarget(target, name, isDefine);
            return;
        }
        // The configuration name should be split into parts if it has dots. E.g. `resize.width` -> [`resize`, `width`].
        const parts = name.split('.');
        // Take the name of the configuration out of the parts. E.g. `resize.width` -> `width`.
        name = parts.pop();
        // Iterate over parts to check if currently stored configuration has proper structure.
        for (const part of parts){
            // If there is no object for specified part then create one.
            if (!isPlainObject(target[part])) {
                target[part] = Object.create(null);
            }
            // Nested object becomes a target.
            target = target[part];
        }
        // In case of value is an object.
        if (isPlainObject(value)) {
            // We take care of proper config structure.
            if (!isPlainObject(target[name])) {
                target[name] = Object.create(null);
            }
            target = target[name];
            // And iterate through this object calling `_setToTarget` again for each property.
            this._setObjectToTarget(target, value, isDefine);
            return;
        }
        // Do nothing if we are defining configuration for non empty name.
        if (isDefine && typeof target[name] != 'undefined') {
            return;
        }
        target[name] = value;
    }
    /**
	 * Get specified configuration from specified source (nested object).
	 *
	 * @param source level of nested object.
	 * @param name The configuration name. Configuration names are case-sensitive.
	 * @returns The configuration value or `undefined` if the configuration entry was not found.
	 */ _getFromSource(source, name) {
        // The configuration name should be split into parts if it has dots. E.g. `resize.width` -> [`resize`, `width`].
        const parts = name.split('.');
        // Take the name of the configuration out of the parts. E.g. `resize.width` -> `width`.
        name = parts.pop();
        // Iterate over parts to check if currently stored configuration has proper structure.
        for (const part of parts){
            if (!isPlainObject(source[part])) {
                source = null;
                break;
            }
            // Nested object becomes a source.
            source = source[part];
        }
        // Always returns undefined for non existing configuration.
        return source ? cloneConfig(source[name]) : undefined;
    }
    /**
	 * Iterates through passed object and calls {@link #_setToTarget} method with object key and value for each property.
	 *
	 * @param target Nested config object.
	 * @param configuration Configuration data set
	 * @param isDefine Defines if passed configuration is default configuration or not.
	 */ _setObjectToTarget(target, configuration, isDefine) {
        Object.keys(configuration).forEach((key)=>{
            this._setToTarget(target, key, configuration[key], isDefine);
        });
    }
}
/**
 * Clones configuration object or value.
 */ function cloneConfig(source) {
    return cloneDeepWith(source, leaveItemReferences);
}
/**
 * A customized function for cloneDeepWith.
 * In case if it's a DOM Element it will leave references to DOM Elements instead of cloning them.
 * If it's a function it will leave reference to actuall function.
 */ function leaveItemReferences(value) {
    return isElement$1(value) || typeof value === 'function' ? value : undefined;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/dom/isnode
 */ /**
 * Checks if the object is a native DOM Node.
 */ function isNode(obj) {
    if (obj) {
        if (obj.defaultView) {
            return obj instanceof obj.defaultView.Document;
        } else if (obj.ownerDocument && obj.ownerDocument.defaultView) {
            return obj instanceof obj.ownerDocument.defaultView.Node;
        }
    }
    return false;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/dom/iswindow
 */ /**
 * Checks if the object is a native DOM Window.
 */ function isWindow(obj) {
    const stringifiedObject = Object.prototype.toString.apply(obj);
    // Returns `true` for the `window` object in browser environments.
    if (stringifiedObject == '[object Window]') {
        return true;
    }
    // Returns `true` for the `window` object in the Electron environment.
    if (stringifiedObject == '[object global]') {
        return true;
    }
    return false;
}

const defaultEmitterClass = /* #__PURE__ */ DomEmitterMixin(/* #__PURE__ */ EmitterMixin());
function DomEmitterMixin(base) {
    if (!base) {
        return defaultEmitterClass;
    }
    class Mixin extends base {
        listenTo(emitter, event, callback, options = {}) {
            // Check if emitter is an instance of DOM Node. If so, use corresponding ProxyEmitter (or create one if not existing).
            if (isNode(emitter) || isWindow(emitter) || emitter instanceof global.window.EventTarget) {
                const proxyOptions = {
                    capture: !!options.useCapture,
                    passive: !!options.usePassive
                };
                const proxyEmitter = this._getProxyEmitter(emitter, proxyOptions) || new ProxyEmitter(emitter, proxyOptions);
                this.listenTo(proxyEmitter, event, callback, options);
            } else {
                // Execute parent class method with Emitter (or ProxyEmitter) instance.
                super.listenTo(emitter, event, callback, options);
            }
        }
        stopListening(emitter, event, callback) {
            // Check if the emitter is an instance of DOM Node. If so, forward the call to the corresponding ProxyEmitters.
            if (isNode(emitter) || isWindow(emitter) || emitter instanceof global.window.EventTarget) {
                const proxyEmitters = this._getAllProxyEmitters(emitter);
                for (const proxy of proxyEmitters){
                    this.stopListening(proxy, event, callback);
                }
            } else {
                // Execute parent class method with Emitter (or ProxyEmitter) instance.
                super.stopListening(emitter, event, callback);
            }
        }
        /**
		 * Retrieves ProxyEmitter instance for given DOM Node residing in this Host and given options.
		 *
		 * @param node DOM Node of the ProxyEmitter.
		 * @param options Additional options.
		 * @param options.useCapture Indicates that events of this type will be dispatched to the registered
		 * listener before being dispatched to any EventTarget beneath it in the DOM tree.
		 * @param options.usePassive Indicates that the function specified by listener will never call preventDefault()
		 * and prevents blocking browser's main thread by this event handler.
		 * @returns ProxyEmitter instance bound to the DOM Node.
		 */ _getProxyEmitter(node, options) {
            return _getEmitterListenedTo(this, getProxyEmitterId(node, options));
        }
        /**
		 * Retrieves all the ProxyEmitter instances for given DOM Node residing in this Host.
		 *
		 * @param node DOM Node of the ProxyEmitter.
		 */ _getAllProxyEmitters(node) {
            return [
                {
                    capture: false,
                    passive: false
                },
                {
                    capture: false,
                    passive: true
                },
                {
                    capture: true,
                    passive: false
                },
                {
                    capture: true,
                    passive: true
                }
            ].map((options)=>this._getProxyEmitter(node, options)).filter((proxy)=>!!proxy);
        }
    }
    return Mixin;
}
// Backward compatibility with `mix`
[
    '_getProxyEmitter',
    '_getAllProxyEmitters',
    'on',
    'once',
    'off',
    'listenTo',
    'stopListening',
    'fire',
    'delegate',
    'stopDelegating',
    '_addEventListener',
    '_removeEventListener'
].forEach((key)=>{
    DomEmitterMixin[key] = defaultEmitterClass.prototype[key];
});
/**
 * Creates a ProxyEmitter instance. Such an instance is a bridge between a DOM Node firing events
 * and any Host listening to them. It is backwards compatible with {@link module:utils/emittermixin~Emitter#on}.
 * There is a separate instance for each combination of modes (useCapture & usePassive). The mode is concatenated with
 * UID stored in HTMLElement to give each instance unique identifier.
 *
 *                                  listenTo( click, ... )
 *                    +-----------------------------------------+
 *                    |              stopListening( ... )       |
 *     +----------------------------+                           |             addEventListener( click, ... )
 *     | Host                       |                           |   +---------------------------------------------+
 *     +----------------------------+                           |   |       removeEventListener( click, ... )     |
 *     | _listeningTo: {            |                +----------v-------------+                                   |
 *     |   UID+mode: {              |                | ProxyEmitter           |                                   |
 *     |     emitter: ProxyEmitter, |                +------------------------+                      +------------v----------+
 *     |     callbacks: {           |                | events: {              |                      | Node (HTMLElement)    |
 *     |       click: [ callbacks ] |                |   click: [ callbacks ] |                      +-----------------------+
 *     |     }                      |                | },                     |                      | data-ck-expando: UID  |
 *     |   }                        |                | _domNode: Node,        |                      +-----------------------+
 *     | }                          |                | _domListeners: {},     |                                   |
 *     | +------------------------+ |                | _emitterId: UID+mode   |                                   |
 *     | | DomEmitterMixin        | |                +--------------^---------+                                   |
 *     | +------------------------+ |                           |   |                                             |
 *     +--------------^-------------+                           |   +---------------------------------------------+
 *                    |                                         |                  click (DOM Event)
 *                    +-----------------------------------------+
 *                                fire( click, DOM Event )
 */ class ProxyEmitter extends /* #__PURE__ */ EmitterMixin() {
    _domNode;
    _options;
    /**
	 * @param node DOM Node that fires events.
	 * @param options Additional options.
	 * @param options.useCapture Indicates that events of this type will be dispatched to the registered
	 * listener before being dispatched to any EventTarget beneath it in the DOM tree.
	 * @param options.usePassive Indicates that the function specified by listener will never call preventDefault()
	 * and prevents blocking browser's main thread by this event handler.
	 */ constructor(node, options){
        super();
        // Set emitter ID to match DOM Node "expando" property.
        _setEmitterId(this, getProxyEmitterId(node, options));
        // Remember the DOM Node this ProxyEmitter is bound to.
        this._domNode = node;
        // And given options.
        this._options = options;
    }
    /**
	 * Collection of native DOM listeners.
	 */ _domListeners;
    /**
	 * Registers a callback function to be executed when an event is fired.
	 *
	 * It attaches a native DOM listener to the DOM Node. When fired,
	 * a corresponding Emitter event will also fire with DOM Event object as an argument.
	 *
	 * **Note**: This is automatically called by the
	 * {@link module:utils/emittermixin~Emitter#listenTo `Emitter#listenTo()`}.
	 *
	 * @param event The name of the event.
	 */ attach(event) {
        // If the DOM Listener for given event already exist it is pointless
        // to attach another one.
        if (this._domListeners && this._domListeners[event]) {
            return;
        }
        const domListener = this._createDomListener(event);
        // Attach the native DOM listener to DOM Node.
        this._domNode.addEventListener(event, domListener, this._options);
        if (!this._domListeners) {
            this._domListeners = {};
        }
        // Store the native DOM listener in this ProxyEmitter. It will be helpful
        // when stopping listening to the event.
        this._domListeners[event] = domListener;
    }
    /**
	 * Stops executing the callback on the given event.
	 *
	 * **Note**: This is automatically called by the
	 * {@link module:utils/emittermixin~Emitter#stopListening `Emitter#stopListening()`}.
	 *
	 * @param event The name of the event.
	 */ detach(event) {
        let events;
        // Remove native DOM listeners which are orphans. If no callbacks
        // are awaiting given event, detach native DOM listener from DOM Node.
        // See: {@link attach}.
        if (this._domListeners[event] && (!(events = this._events[event]) || !events.callbacks.length)) {
            this._domListeners[event].removeListener();
        }
    }
    /**
	 * Adds callback to emitter for given event.
	 *
	 * @internal
	 * @param event The name of the event.
	 * @param callback The function to be called on event.
	 * @param options Additional options.
	 */ _addEventListener(event, callback, options) {
        this.attach(event);
        EmitterMixin().prototype._addEventListener.call(this, event, callback, options);
    }
    /**
	 * Removes callback from emitter for given event.
	 *
	 * @internal
	 * @param event The name of the event.
	 * @param callback The function to stop being called.
	 */ _removeEventListener(event, callback) {
        EmitterMixin().prototype._removeEventListener.call(this, event, callback);
        this.detach(event);
    }
    /**
	 * Creates a native DOM listener callback. When the native DOM event
	 * is fired it will fire corresponding event on this ProxyEmitter.
	 * Note: A native DOM Event is passed as an argument.
	 *
	 * @param event The name of the event.
	 * @returns The DOM listener callback.
	 */ _createDomListener(event) {
        const domListener = (domEvt)=>{
            this.fire(event, domEvt);
        };
        // Supply the DOM listener callback with a function that will help
        // detach it from the DOM Node, when it is no longer necessary.
        // See: {@link detach}.
        domListener.removeListener = ()=>{
            this._domNode.removeEventListener(event, domListener, this._options);
            delete this._domListeners[event];
        };
        return domListener;
    }
}
/**
 * Gets an unique DOM Node identifier. The identifier will be set if not defined.
 *
 * @returns UID for given DOM Node.
 */ function getNodeUID(node) {
    return node['data-ck-expando'] || (node['data-ck-expando'] = uid());
}
/**
 * Gets id of the ProxyEmitter for the given node.
 */ function getProxyEmitterId(node, options) {
    let id = getNodeUID(node);
    for (const option of Object.keys(options).sort()){
        if (options[option]) {
            id += '-' + option;
        }
    }
    return id;
}

/**
 * Returns the closest scrollable ancestor of a DOM element.
 *
 * @param domElement DOM element.
 * @returns First ancestor of `domElement` that is scrollable or null if such ancestor doesn't exist.
 */ function findClosestScrollableAncestor(domElement) {
    let element = domElement.parentElement;
    if (!element) {
        return null;
    }
    while(element.tagName != 'BODY'){
        const overflow = element.style.overflowY || global.window.getComputedStyle(element).overflowY;
        if (overflow === 'auto' || overflow === 'scroll') {
            break;
        }
        element = element.parentElement;
        if (!element) {
            return null;
        }
    }
    return element;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /* globals Node */ /**
 * @module utils/dom/getancestors
 */ /**
 * Returns all ancestors of given DOM node, starting from the top-most (root). Includes the given node itself. If the
 * node is a part of `DocumentFragment` that `DocumentFragment` will be returned. In contrary, if the node is
 * appended to a `Document`, that `Document` will not be returned (algorithms operating on DOM tree care for `Document#documentElement`
 * at most, which will be returned).
 *
 * @param node DOM node.
 * @returns Array of given `node` parents.
 */ function getAncestors(node) {
    const nodes = [];
    let currentNode = node;
    // We are interested in `Node`s `DocumentFragment`s only.
    while(currentNode && currentNode.nodeType != Node.DOCUMENT_NODE){
        nodes.unshift(currentNode);
        currentNode = currentNode.parentNode;
    }
    return nodes;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /* globals HTMLTextAreaElement */ /**
 * @module utils/dom/getdatafromelement
 */ /**
 * Gets data from a given source element.
 *
 * @param el The element from which the data will be retrieved.
 * @returns The data string.
 */ function getDataFromElement(el) {
    if (el instanceof HTMLTextAreaElement) {
        return el.value;
    }
    return el.innerHTML;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/dom/getborderwidths
 */ /**
 * Returns an object containing CSS border widths of a specified HTML element.
 *
 * @param element An element which has CSS borders.
 * @returns An object containing `top`, `left`, `right` and `bottom` properties
 * with numerical values of the `border-[top,left,right,bottom]-width` CSS styles.
 */ function getBorderWidths(element) {
    // Call getComputedStyle on the window the element document belongs to.
    const style = element.ownerDocument.defaultView.getComputedStyle(element);
    return {
        top: parseInt(style.borderTopWidth, 10),
        right: parseInt(style.borderRightWidth, 10),
        bottom: parseInt(style.borderBottomWidth, 10),
        left: parseInt(style.borderLeftWidth, 10)
    };
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/dom/getrangefrommouseevent
 */ /**
 * Returns a DOM range from a given point specified by a mouse event.
 *
 * @param domEvent The mouse event.
 * @returns The DOM range.
 */ function getRangeFromMouseEvent(domEvent) {
    if (!domEvent.target) {
        return null;
    }
    const domDoc = domEvent.target.ownerDocument;
    const x = domEvent.clientX;
    const y = domEvent.clientY;
    let domRange = null;
    // Webkit & Blink.
    if (domDoc.caretRangeFromPoint && domDoc.caretRangeFromPoint(x, y)) {
        domRange = domDoc.caretRangeFromPoint(x, y);
    } else if (domEvent.rangeParent) {
        domRange = domDoc.createRange();
        domRange.setStart(domEvent.rangeParent, domEvent.rangeOffset);
        domRange.collapse(true);
    }
    return domRange;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/dom/istext
 */ /**
 * Checks if the object is a native DOM Text node.
 */ function isText(obj) {
    return Object.prototype.toString.call(obj) == '[object Text]';
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/dom/isrange
 */ /**
 * Checks if the object is a native DOM Range.
 */ function isRange(obj) {
    return Object.prototype.toString.apply(obj) == '[object Range]';
}

/**
 * For a given element, returns the nearest ancestor element which CSS position is not "static".
 *
 * @param element The native DOM element to be checked.
 */ function getPositionedAncestor(element) {
    if (!element || !element.parentNode) {
        return null;
    }
    if (element.offsetParent === global.document.body) {
        return null;
    }
    return element.offsetParent;
}

const rectProperties = [
    'top',
    'right',
    'bottom',
    'left',
    'width',
    'height'
];
/**
 * A helper class representing a `ClientRect` object, e.g. value returned by
 * the native `object.getBoundingClientRect()` method. Provides a set of methods
 * to manipulate the rect and compare it against other rect instances.
 */ class Rect {
    /**
	 * The "top" value of the rect.
	 *
	 * @readonly
	 */ top;
    /**
	 * The "right" value of the rect.
	 *
	 * @readonly
	 */ right;
    /**
	 * The "bottom" value of the rect.
	 *
	 * @readonly
	 */ bottom;
    /**
	 * The "left" value of the rect.
	 *
	 * @readonly
	 */ left;
    /**
	 * The "width" value of the rect.
	 *
	 * @readonly
	 */ width;
    /**
	 * The "height" value of the rect.
	 *
	 * @readonly
	 */ height;
    /**
	 * The object this rect is for.
	 *
	 * @readonly
	 */ _source;
    /**
	 * Creates an instance of rect.
	 *
	 * ```ts
	 * // Rect of an HTMLElement.
	 * const rectA = new Rect( document.body );
	 *
	 * // Rect of a DOM Range.
	 * const rectB = new Rect( document.getSelection().getRangeAt( 0 ) );
	 *
	 * // Rect of a window (web browser viewport).
	 * const rectC = new Rect( window );
	 *
	 * // Rect out of an object.
	 * const rectD = new Rect( { top: 0, right: 10, bottom: 10, left: 0, width: 10, height: 10 } );
	 *
	 * // Rect out of another Rect instance.
	 * const rectE = new Rect( rectD );
	 *
	 * // Rect out of a ClientRect.
	 * const rectF = new Rect( document.body.getClientRects().item( 0 ) );
	 * ```
	 *
	 * **Note**: By default a rect of an HTML element includes its CSS borders and scrollbars (if any)
	 * ant the rect of a `window` includes scrollbars too. Use {@link #excludeScrollbarsAndBorders}
	 * to get the inner part of the rect.
	 *
	 * @param source A source object to create the rect.
	 */ constructor(source){
        const isSourceRange = isRange(source);
        Object.defineProperty(this, '_source', {
            // If the source is a Rect instance, copy it's #_source.
            value: source._source || source,
            writable: true,
            enumerable: false
        });
        if (isDomElement(source) || isSourceRange) {
            // The `Rect` class depends on `getBoundingClientRect` and `getClientRects` DOM methods. If the source
            // of a rect in an HTML element or a DOM range but it does not belong to any rendered DOM tree, these methods
            // will fail to obtain the geometry and the rect instance makes little sense to the features using it.
            // To get rid of this warning make sure the source passed to the constructor is a descendant of `window.document.body`.
            // @if CK_DEBUG // const sourceNode = isSourceRange ? source.startContainer : source;
            // @if CK_DEBUG // if ( !sourceNode.ownerDocument || !sourceNode.ownerDocument.body.contains( sourceNode ) ) {
            // @if CK_DEBUG // 	console.warn(
            // @if CK_DEBUG // 		'rect-source-not-in-dom: The source of this rect does not belong to any rendered DOM tree.',
            // @if CK_DEBUG // 		{ source } );
            // @if CK_DEBUG // }
            if (isSourceRange) {
                const rangeRects = Rect.getDomRangeRects(source);
                copyRectProperties(this, Rect.getBoundingRect(rangeRects));
            } else {
                copyRectProperties(this, source.getBoundingClientRect());
            }
        } else if (isWindow(source)) {
            const { innerWidth, innerHeight } = source;
            copyRectProperties(this, {
                top: 0,
                right: innerWidth,
                bottom: innerHeight,
                left: 0,
                width: innerWidth,
                height: innerHeight
            });
        } else {
            copyRectProperties(this, source);
        }
    }
    /**
	 * Returns a clone of the rect.
	 *
	 * @returns A cloned rect.
	 */ clone() {
        return new Rect(this);
    }
    /**
	 * Moves the rect so that its upper–left corner lands in desired `[ x, y ]` location.
	 *
	 * @param x Desired horizontal location.
	 * @param y Desired vertical location.
	 * @returns A rect which has been moved.
	 */ moveTo(x, y) {
        this.top = y;
        this.right = x + this.width;
        this.bottom = y + this.height;
        this.left = x;
        return this;
    }
    /**
	 * Moves the rect in–place by a dedicated offset.
	 *
	 * @param x A horizontal offset.
	 * @param y A vertical offset
	 * @returns A rect which has been moved.
	 */ moveBy(x, y) {
        this.top += y;
        this.right += x;
        this.left += x;
        this.bottom += y;
        return this;
    }
    /**
	 * Returns a new rect a a result of intersection with another rect.
	 */ getIntersection(anotherRect) {
        const rect = {
            top: Math.max(this.top, anotherRect.top),
            right: Math.min(this.right, anotherRect.right),
            bottom: Math.min(this.bottom, anotherRect.bottom),
            left: Math.max(this.left, anotherRect.left),
            width: 0,
            height: 0
        };
        rect.width = rect.right - rect.left;
        rect.height = rect.bottom - rect.top;
        if (rect.width < 0 || rect.height < 0) {
            return null;
        } else {
            const newRect = new Rect(rect);
            newRect._source = this._source;
            return newRect;
        }
    }
    /**
	 * Returns the area of intersection with another rect.
	 *
	 * @returns Area of intersection.
	 */ getIntersectionArea(anotherRect) {
        const rect = this.getIntersection(anotherRect);
        if (rect) {
            return rect.getArea();
        } else {
            return 0;
        }
    }
    /**
	 * Returns the area of the rect.
	 */ getArea() {
        return this.width * this.height;
    }
    /**
	 * Returns a new rect, a part of the original rect, which is actually visible to the user and is relative to the,`body`,
	 * e.g. an original rect cropped by parent element rects which have `overflow` set in CSS
	 * other than `"visible"`.
	 *
	 * If there's no such visible rect, which is when the rect is limited by one or many of
	 * the ancestors, `null` is returned.
	 *
	 * **Note**: This method does not consider the boundaries of the viewport (window).
	 * To get a rect cropped by all ancestors and the viewport, use an intersection such as:
	 *
	 * ```ts
	 * const visibleInViewportRect = new Rect( window ).getIntersection( new Rect( source ).getVisible() );
	 * ```
	 *
	 * @returns A visible rect instance or `null`, if there's none.
	 */ getVisible() {
        const source = this._source;
        let visibleRect = this.clone();
        // There's no ancestor to crop <body> with the overflow.
        if (isBody(source)) {
            return visibleRect;
        }
        let child = source;
        let parent = source.parentNode || source.commonAncestorContainer;
        let absolutelyPositionedChildElement;
        // Check the ancestors all the way up to the <body>.
        while(parent && !isBody(parent)){
            const isParentOverflowVisible = getElementOverflow(parent) === 'visible';
            if (child instanceof HTMLElement && getElementPosition(child) === 'absolute') {
                absolutelyPositionedChildElement = child;
            }
            const parentElementPosition = getElementPosition(parent);
            // The child will be cropped only if it has `position: absolute` and the parent has `position: relative` + some overflow.
            // Otherwise there's no chance of visual clipping and the parent can be skipped
            // https://github.com/ckeditor/ckeditor5/issues/14107.
            //
            // condition: isParentOverflowVisible
            // 		+---------------------------+
            //		| #parent					|
            //		| (overflow: visible)		|
            //		|				+-----------+---------------+
            //		|				| child						|
            //		|				+-----------+---------------+
            //		+---------------------------+
            //
            // condition: absolutelyPositionedChildElement && parentElementPosition === 'relative' && isParentOverflowVisible
            // 		+---------------------------+
            //		| parent					|
            //		| (position: relative;)		|
            //		| (overflow: visible;)		|
            //		|				+-----------+---------------+
            //		|				| child  					|
            //		|				| (position: absolute;)		|
            //		|				+-----------+---------------+
            //		+---------------------------+
            //
            // condition: absolutelyPositionedChildElement && parentElementPosition !== 'relative'
            // 		+---------------------------+
            //		| parent					|
            //		| (position: static;)		|
            //		|				+-----------+---------------+
            //		|				| child  					|
            //		|				| (position: absolute;)		|
            //		|				+-----------+---------------+
            //		+---------------------------+
            if (isParentOverflowVisible || absolutelyPositionedChildElement && (parentElementPosition === 'relative' && isParentOverflowVisible || parentElementPosition !== 'relative')) {
                child = parent;
                parent = parent.parentNode;
                continue;
            }
            const parentRect = new Rect(parent);
            const intersectionRect = visibleRect.getIntersection(parentRect);
            if (intersectionRect) {
                if (intersectionRect.getArea() < visibleRect.getArea()) {
                    // Reduce the visible rect to the intersection.
                    visibleRect = intersectionRect;
                }
            } else {
                // There's no intersection, the rect is completely invisible.
                return null;
            }
            child = parent;
            parent = parent.parentNode;
        }
        return visibleRect;
    }
    /**
	 * Checks if all property values ({@link #top}, {@link #left}, {@link #right},
	 * {@link #bottom}, {@link #width} and {@link #height}) are the equal in both rect
	 * instances.
	 *
	 * @param anotherRect A rect instance to compare with.
	 * @returns `true` when Rects are equal. `false` otherwise.
	 */ isEqual(anotherRect) {
        for (const prop of rectProperties){
            if (this[prop] !== anotherRect[prop]) {
                return false;
            }
        }
        return true;
    }
    /**
	 * Checks whether a rect fully contains another rect instance.
	 *
	 * @param anotherRect
	 * @returns `true` if contains, `false` otherwise.
	 */ contains(anotherRect) {
        const intersectRect = this.getIntersection(anotherRect);
        return !!(intersectRect && intersectRect.isEqual(anotherRect));
    }
    /**
	 * Recalculates screen coordinates to coordinates relative to the positioned ancestor offset.
	 */ toAbsoluteRect() {
        const { scrollX, scrollY } = global.window;
        const absoluteRect = this.clone().moveBy(scrollX, scrollY);
        if (isDomElement(absoluteRect._source)) {
            const positionedAncestor = getPositionedAncestor(absoluteRect._source);
            if (positionedAncestor) {
                shiftRectToCompensatePositionedAncestor(absoluteRect, positionedAncestor);
            }
        }
        return absoluteRect;
    }
    /**
	 * Excludes scrollbars and CSS borders from the rect.
	 *
	 * * Borders are removed when {@link #_source} is an HTML element.
	 * * Scrollbars are excluded from HTML elements and the `window`.
	 *
	 * @returns A rect which has been updated.
	 */ excludeScrollbarsAndBorders() {
        const source = this._source;
        let scrollBarWidth, scrollBarHeight, direction;
        if (isWindow(source)) {
            scrollBarWidth = source.innerWidth - source.document.documentElement.clientWidth;
            scrollBarHeight = source.innerHeight - source.document.documentElement.clientHeight;
            direction = source.getComputedStyle(source.document.documentElement).direction;
        } else {
            const borderWidths = getBorderWidths(source);
            scrollBarWidth = source.offsetWidth - source.clientWidth - borderWidths.left - borderWidths.right;
            scrollBarHeight = source.offsetHeight - source.clientHeight - borderWidths.top - borderWidths.bottom;
            direction = source.ownerDocument.defaultView.getComputedStyle(source).direction;
            this.left += borderWidths.left;
            this.top += borderWidths.top;
            this.right -= borderWidths.right;
            this.bottom -= borderWidths.bottom;
            this.width = this.right - this.left;
            this.height = this.bottom - this.top;
        }
        this.width -= scrollBarWidth;
        if (direction === 'ltr') {
            this.right -= scrollBarWidth;
        } else {
            this.left += scrollBarWidth;
        }
        this.height -= scrollBarHeight;
        this.bottom -= scrollBarHeight;
        return this;
    }
    /**
	 * Returns an array of rects of the given native DOM Range.
	 *
	 * @param range A native DOM range.
	 * @returns DOM Range rects.
	 */ static getDomRangeRects(range) {
        const rects = [];
        // Safari does not iterate over ClientRectList using for...of loop.
        const clientRects = Array.from(range.getClientRects());
        if (clientRects.length) {
            for (const rect of clientRects){
                rects.push(new Rect(rect));
            }
        } else {
            let startContainer = range.startContainer;
            if (isText(startContainer)) {
                startContainer = startContainer.parentNode;
            }
            const rect = new Rect(startContainer.getBoundingClientRect());
            rect.right = rect.left;
            rect.width = 0;
            rects.push(rect);
        }
        return rects;
    }
    /**
	 * Returns a bounding rectangle that contains all the given `rects`.
	 *
	 * @param rects A list of rectangles that should be contained in the result rectangle.
	 * @returns Bounding rectangle or `null` if no `rects` were given.
	 */ static getBoundingRect(rects) {
        const boundingRectData = {
            left: Number.POSITIVE_INFINITY,
            top: Number.POSITIVE_INFINITY,
            right: Number.NEGATIVE_INFINITY,
            bottom: Number.NEGATIVE_INFINITY,
            width: 0,
            height: 0
        };
        let rectangleCount = 0;
        for (const rect of rects){
            rectangleCount++;
            boundingRectData.left = Math.min(boundingRectData.left, rect.left);
            boundingRectData.top = Math.min(boundingRectData.top, rect.top);
            boundingRectData.right = Math.max(boundingRectData.right, rect.right);
            boundingRectData.bottom = Math.max(boundingRectData.bottom, rect.bottom);
        }
        if (rectangleCount == 0) {
            return null;
        }
        boundingRectData.width = boundingRectData.right - boundingRectData.left;
        boundingRectData.height = boundingRectData.bottom - boundingRectData.top;
        return new Rect(boundingRectData);
    }
}
/**
 * Acquires all the rect properties from the passed source.
 */ function copyRectProperties(rect, source) {
    for (const p of rectProperties){
        rect[p] = source[p];
    }
}
/**
 * Checks if provided object is a <body> HTML element.
 */ function isBody(value) {
    if (!isDomElement(value)) {
        return false;
    }
    return value === value.ownerDocument.body;
}
/**
 * Checks if provided object "looks like" a DOM Element and has API required by `Rect` class.
 */ function isDomElement(value) {
    // Note: earlier we used `isElement()` from lodash library, however that function is less performant because
    // it makes complicated checks to make sure that given value is a DOM element.
    return value !== null && typeof value === 'object' && value.nodeType === 1 && typeof value.getBoundingClientRect === 'function';
}
/**
 * Returns the value of the `position` style of an `HTMLElement`.
 */ function getElementPosition(element) {
    return element instanceof HTMLElement ? element.ownerDocument.defaultView.getComputedStyle(element).position : 'static';
}
/**
 * Returns the value of the `overflow` style of an `HTMLElement` or a `Range`.
 */ function getElementOverflow(element) {
    return element instanceof HTMLElement ? element.ownerDocument.defaultView.getComputedStyle(element).overflow : 'visible';
}
/**
 * For a given absolute Rect coordinates object and a positioned element ancestor, it updates its
 * coordinates that make up for the position and the scroll of the ancestor.
 *
 * This is necessary because while Rects (and DOMRects) are relative to the browser's viewport, their coordinates
 * are used in real–life to position elements with `position: absolute`, which are scoped by any positioned
 * (and scrollable) ancestors.
 */ function shiftRectToCompensatePositionedAncestor(rect, positionedElementAncestor) {
    const ancestorPosition = new Rect(positionedElementAncestor);
    const ancestorBorderWidths = getBorderWidths(positionedElementAncestor);
    let moveX = 0;
    let moveY = 0;
    // (https://github.com/ckeditor/ckeditor5-ui-default/issues/126)
    // If there's some positioned ancestor of the panel, then its `Rect` must be taken into
    // consideration. `Rect` is always relative to the viewport while `position: absolute` works
    // with respect to that positioned ancestor.
    moveX -= ancestorPosition.left;
    moveY -= ancestorPosition.top;
    // (https://github.com/ckeditor/ckeditor5-utils/issues/139)
    // If there's some positioned ancestor of the panel, not only its position must be taken into
    // consideration (see above) but also its internal scrolls. Scroll have an impact here because `Rect`
    // is relative to the viewport (it doesn't care about scrolling), while `position: absolute`
    // must compensate that scrolling.
    moveX += positionedElementAncestor.scrollLeft;
    moveY += positionedElementAncestor.scrollTop;
    // (https://github.com/ckeditor/ckeditor5-utils/issues/139)
    // If there's some positioned ancestor of the panel, then its `Rect` includes its CSS `borderWidth`
    // while `position: absolute` positioning does not consider it.
    // E.g. `{ position: absolute, top: 0, left: 0 }` means upper left corner of the element,
    // not upper-left corner of its border.
    moveX -= ancestorBorderWidths.left;
    moveY -= ancestorBorderWidths.top;
    rect.moveBy(moveX, moveY);
}

/**
 * A helper class which instances allow performing custom actions when native DOM elements are resized.
 *
 * ```ts
 * const editableElement = editor.editing.view.getDomRoot();
 *
 * const observer = new ResizeObserver( editableElement, entry => {
 * 	console.log( 'The editable element has been resized in DOM.' );
 * 	console.log( entry.target ); // -> editableElement
 * 	console.log( entry.contentRect.width ); // -> e.g. '423px'
 * } );
 * ```
 *
 * It uses the [native DOM resize observer](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
 * under the hood.
 */ class ResizeObserver {
    /**
	 * The element observed by this observer.
	 */ _element;
    /**
	 * The callback executed each time {@link #_element} is resized.
	 */ _callback;
    /**
	 * The single native observer instance shared across all {@link module:utils/dom/resizeobserver~ResizeObserver} instances.
	 */ static _observerInstance = null;
    /**
	 * A mapping of native DOM elements and their callbacks shared across all
	 * {@link module:utils/dom/resizeobserver~ResizeObserver} instances.
	 */ static _elementCallbacks = null;
    /**
	 * Creates an instance of the `ResizeObserver` class.
	 *
	 * @param element A DOM element that is to be observed for resizing. Note that
	 * the element must be visible (i.e. not detached from DOM) for the observer to work.
	 * @param callback A function called when the observed element was resized. It passes
	 * the [`ResizeObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry)
	 * object with information about the resize event.
	 */ constructor(element, callback){
        // **Note**: For the maximum performance, this class ensures only a single instance of the native
        // observer is used no matter how many instances of this class were created.
        if (!ResizeObserver._observerInstance) {
            ResizeObserver._createObserver();
        }
        this._element = element;
        this._callback = callback;
        ResizeObserver._addElementCallback(element, callback);
        ResizeObserver._observerInstance.observe(element);
    }
    /**
	 * The element observed by this observer.
	 */ get element() {
        return this._element;
    }
    /**
	 * Destroys the observer which disables the `callback` passed to the {@link #constructor}.
	 */ destroy() {
        ResizeObserver._deleteElementCallback(this._element, this._callback);
    }
    /**
	 * Registers a new resize callback for the DOM element.
	 */ static _addElementCallback(element, callback) {
        if (!ResizeObserver._elementCallbacks) {
            ResizeObserver._elementCallbacks = new Map();
        }
        let callbacks = ResizeObserver._elementCallbacks.get(element);
        if (!callbacks) {
            callbacks = new Set();
            ResizeObserver._elementCallbacks.set(element, callbacks);
        }
        callbacks.add(callback);
    }
    /**
	 * Removes a resize callback from the DOM element. If no callbacks are left
	 * for the element, it removes the element from the native observer.
	 */ static _deleteElementCallback(element, callback) {
        const callbacks = ResizeObserver._getElementCallbacks(element);
        // Remove the element callback. Check if exist first in case someone
        // called destroy() twice.
        if (callbacks) {
            callbacks.delete(callback);
            // If no callbacks left for the element, also remove the element.
            if (!callbacks.size) {
                ResizeObserver._elementCallbacks.delete(element);
                ResizeObserver._observerInstance.unobserve(element);
            }
        }
        if (ResizeObserver._elementCallbacks && !ResizeObserver._elementCallbacks.size) {
            ResizeObserver._observerInstance = null;
            ResizeObserver._elementCallbacks = null;
        }
    }
    /**
	 * Returns are registered resize callbacks for the DOM element.
	 */ static _getElementCallbacks(element) {
        if (!ResizeObserver._elementCallbacks) {
            return null;
        }
        return ResizeObserver._elementCallbacks.get(element);
    }
    /**
	 * Creates the single native observer shared across all `ResizeObserver` instances.
	 */ static _createObserver() {
        ResizeObserver._observerInstance = new global.window.ResizeObserver((entries)=>{
            for (const entry of entries){
                const callbacks = ResizeObserver._getElementCallbacks(entry.target);
                if (callbacks) {
                    for (const callback of callbacks){
                        callback(entry);
                    }
                }
            }
        });
    }
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/dom/setdatainelement
 */ /* globals HTMLTextAreaElement */ /**
 * Sets data in a given element.
 *
 * @param el The element in which the data will be set.
 * @param data The data string.
 */ function setDataInElement(el, data) {
    if (el instanceof HTMLTextAreaElement) {
        el.value = data;
    }
    el.innerHTML = data;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/dom/tounit
 */ /**
 * Returns a helper function, which adds a desired trailing
 * `unit` to the passed value.
 *
 * @param unit An unit like "px" or "em".
 */ function toUnit(unit) {
    return (value)=>value + unit;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/dom/indexof
 */ /**
 * Returns index of the node in the parent element.
 *
 * @param node Node which index is tested.
 * @returns Index of the node in the parent element. Returns 0 if node has no parent.
 */ function indexOf(node) {
    let index = 0;
    while(node.previousSibling){
        node = node.previousSibling;
        index++;
    }
    return index;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/dom/insertat
 */ /**
 * Inserts node to the parent at given index.
 *
 * @param parentElement Parent element.
 * @param index Insertions index.
 * @param nodeToInsert Node to insert.
 */ function insertAt(parentElement, index, nodeToInsert) {
    parentElement.insertBefore(nodeToInsert, parentElement.childNodes[index] || null);
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /* globals Node */ /**
 * @module utils/dom/iscomment
 */ /**
 * Checks whether the object is a native DOM Comment node.
 */ function isComment(obj) {
    return obj && obj.nodeType === Node.COMMENT_NODE;
}

/**
 * Checks if the given attribute name is valid in terms of HTML.
 *
 * @param name Attribute name.
 */ function isValidAttributeName(name) {
    try {
        global.document.createAttribute(name);
    } catch (error) {
        return false;
    }
    return true;
}

/**
 * Checks whether the element is visible to the user in DOM:
 *
 * * connected to the root of the document,
 * * has no `display: none`,
 * * has no ancestors with `display: none`.
 *
 * **Note**: This helper does not check whether the element is hidden by cropping, overflow, etc..
 * To check that, use {@link module:utils/dom/rect~Rect} instead.
 */ function isVisible(element) {
    if (!element) {
        return false;
    }
    if (isText(element)) {
        return isVisible(element.parentElement);
    }
    if (element.getClientRects) {
        return !!element.getClientRects().length;
    }
    return false;
}

// @if CK_DEBUG_POSITION // const {
// @if CK_DEBUG_POSITION // 	default: RectDrawer,
// @if CK_DEBUG_POSITION // 	diagonalStylesBlack,
// @if CK_DEBUG_POSITION // 	diagonalStylesGreen,
// @if CK_DEBUG_POSITION // 	diagonalStylesRed
// @if CK_DEBUG_POSITION // } = require( '@ckeditor/ckeditor5-utils/tests/_utils/rectdrawer' );
// @if CK_DEBUG_POSITION // const TARGET_RECT_STYLE = {
// @if CK_DEBUG_POSITION // 	outlineWidth: '2px', outlineStyle: 'dashed', outlineColor: 'blue', outlineOffset: '2px'
// @if CK_DEBUG_POSITION // };
// @if CK_DEBUG_POSITION // const VISIBLE_TARGET_RECT_STYLE = {
// @if CK_DEBUG_POSITION //		...diagonalStylesBlack,
// @if CK_DEBUG_POSITION //		opacity: '1',
// @if CK_DEBUG_POSITION //		backgroundColor: '#00000033',
// @if CK_DEBUG_POSITION //		outlineWidth: '2px'
// @if CK_DEBUG_POSITION // };
// @if CK_DEBUG_POSITION // const VIEWPORT_RECT_STYLE = {
// @if CK_DEBUG_POSITION // 	outlineWidth: '2px',
// @if CK_DEBUG_POSITION // 	outlineOffset: '-2px',
// @if CK_DEBUG_POSITION // 	outlineStyle: 'solid',
// @if CK_DEBUG_POSITION // 	outlineColor: 'red'
// @if CK_DEBUG_POSITION // };
// @if CK_DEBUG_POSITION // const VISIBLE_LIMITER_RECT_STYLE = {
// @if CK_DEBUG_POSITION // 	...diagonalStylesGreen,
// @if CK_DEBUG_POSITION // 	outlineWidth: '2px',
// @if CK_DEBUG_POSITION // 	outlineOffset: '-2px'
// @if CK_DEBUG_POSITION // };
// @if CK_DEBUG_POSITION // const ELEMENT_RECT_STYLE = {
// @if CK_DEBUG_POSITION // 	outlineWidth: '2px', outlineColor: 'orange', outlineOffset: '-2px'
// @if CK_DEBUG_POSITION // };
// @if CK_DEBUG_POSITION // const CHOSEN_POSITION_RECT_STYLE = {
// @if CK_DEBUG_POSITION // 	opacity: .5, outlineColor: 'magenta', backgroundColor: 'magenta'
// @if CK_DEBUG_POSITION // };
/**
 * Calculates the `position: absolute` coordinates of a given element so it can be positioned with respect to the
 * target in the visually most efficient way, taking various restrictions like viewport or limiter geometry
 * into consideration.
 *
 * **Note**: If there are no position coordinates found that meet the requirements (arguments of this helper),
 * `null` is returned.
 *
 * ```ts
 * // The element which is to be positioned.
 * const element = document.body.querySelector( '#toolbar' );
 *
 * // A target to which the element is positioned relatively.
 * const target = document.body.querySelector( '#container' );
 *
 * // Finding the optimal coordinates for the positioning.
 * const { left, top, name } = getOptimalPosition( {
 * 	element: element,
 * 	target: target,
 *
 * 	// The algorithm will chose among these positions to meet the requirements such
 * 	// as "limiter" element or "fitInViewport", set below. The positions are considered
 * 	// in the order of the array.
 * 	positions: [
 * 		//
 * 	 	//	[ Target ]
 * 		//	+-----------------+
 * 		//	|     Element     |
 * 		//	+-----------------+
 * 		//
 * 		targetRect => ( {
 * 			top: targetRect.bottom,
 * 			left: targetRect.left,
 * 			name: 'mySouthEastPosition'
 * 		} ),
 *
 * 		//
 * 		//	+-----------------+
 * 		//	|     Element     |
 * 		//	+-----------------+
 * 		//	[ Target ]
 * 		//
 * 		( targetRect, elementRect ) => ( {
 * 			top: targetRect.top - elementRect.height,
 * 			left: targetRect.left,
 * 			name: 'myNorthEastPosition'
 * 		} )
 * 	],
 *
 * 	// Find a position such guarantees the element remains within visible boundaries of <body>.
 * 	limiter: document.body,
 *
 * 	// Find a position such guarantees the element remains within visible boundaries of the browser viewport.
 * 	fitInViewport: true
 * } );
 *
 * // The best position which fits into document.body and the viewport. May be useful
 * // to set proper class on the `element`.
 * console.log( name ); // -> "myNorthEastPosition"
 *
 * // Using the absolute coordinates which has been found to position the element
 * // as in the diagram depicting the "myNorthEastPosition" position.
 * element.style.top = top;
 * element.style.left = left;
 * ```
 *
 * @param options The input data and configuration of the helper.
 */ function getOptimalPosition({ element, target, positions, limiter, fitInViewport, viewportOffsetConfig }) {
    // If the {@link module:utils/dom/position~Options#target} is a function, use what it returns.
    // https://github.com/ckeditor/ckeditor5-utils/issues/157
    if (isFunction(target)) {
        target = target();
    }
    // If the {@link module:utils/dom/position~Options#limiter} is a function, use what it returns.
    // https://github.com/ckeditor/ckeditor5-ui/issues/260
    if (isFunction(limiter)) {
        limiter = limiter();
    }
    const positionedElementAncestor = getPositionedAncestor(element);
    const constrainedViewportRect = getConstrainedViewportRect(viewportOffsetConfig);
    const elementRect = new Rect(element);
    const visibleTargetRect = getVisibleViewportIntersectionRect(target, constrainedViewportRect);
    let bestPosition;
    // @if CK_DEBUG_POSITION // const targetRect = new Rect( target );
    // @if CK_DEBUG_POSITION // RectDrawer.clear();
    // @if CK_DEBUG_POSITION // RectDrawer.draw( targetRect, TARGET_RECT_STYLE, 'Target' );
    // @if CK_DEBUG_POSITION // if ( constrainedViewportRect ) {
    // @if CK_DEBUG_POSITION //		RectDrawer.draw( constrainedViewportRect, VIEWPORT_RECT_STYLE, 'Viewport' );
    // @if CK_DEBUG_POSITION // }
    // If the target got cropped by ancestors or went off the screen, positioning does not make any sense.
    if (!visibleTargetRect || !constrainedViewportRect.getIntersection(visibleTargetRect)) {
        return null;
    }
    // @if CK_DEBUG_POSITION //	RectDrawer.draw( visibleTargetRect, VISIBLE_TARGET_RECT_STYLE, 'VisTgt' );
    const positionOptions = {
        targetRect: visibleTargetRect,
        elementRect,
        positionedElementAncestor,
        viewportRect: constrainedViewportRect
    };
    // If there are no limits, just grab the very first position and be done with that drama.
    if (!limiter && !fitInViewport) {
        bestPosition = new PositionObject(positions[0], positionOptions);
    } else {
        if (limiter) {
            const visibleLimiterRect = getVisibleViewportIntersectionRect(limiter, constrainedViewportRect);
            if (visibleLimiterRect) {
                positionOptions.limiterRect = visibleLimiterRect;
            // @if CK_DEBUG_POSITION // RectDrawer.draw( visibleLimiterRect, VISIBLE_LIMITER_RECT_STYLE, 'VisLim' );
            }
        }
        // If there's no best position found, i.e. when all intersections have no area because
        // rects have no width or height, then just return `null`
        bestPosition = getBestPosition(positions, positionOptions);
    }
    return bestPosition;
}
/**
 * Returns intersection of visible source `Rect` with Viewport `Rect`. In case when source `Rect` is not visible
 * or there is no intersection between source `Rect` and Viewport `Rect`, `null` will be returned.
 */ function getVisibleViewportIntersectionRect(source, viewportRect) {
    const visibleSourceRect = new Rect(source).getVisible();
    if (!visibleSourceRect) {
        return null;
    }
    return visibleSourceRect.getIntersection(viewportRect);
}
/**
 * Returns a viewport `Rect` shrunk by the viewport offset config from all sides.
 */ function getConstrainedViewportRect(viewportOffsetConfig) {
    viewportOffsetConfig = Object.assign({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }, viewportOffsetConfig);
    const viewportRect = new Rect(global.window);
    viewportRect.top += viewportOffsetConfig.top;
    viewportRect.height -= viewportOffsetConfig.top;
    viewportRect.bottom -= viewportOffsetConfig.bottom;
    viewportRect.height -= viewportOffsetConfig.bottom;
    return viewportRect;
}
/**
 * For a given array of positioning functions, returns such that provides the best
 * fit of the `elementRect` into the `limiterRect` and `viewportRect`.
 */ function getBestPosition(positions, options) {
    const { elementRect } = options;
    // This is when element is fully visible.
    const elementRectArea = elementRect.getArea();
    const positionInstances = positions.map((positioningFunction)=>new PositionObject(positioningFunction, options))// Some positioning functions may return `null` if they don't want to participate.
    .filter((position)=>!!position.name);
    let maxFitFactor = 0;
    let bestPosition = null;
    for (const position of positionInstances){
        const { limiterIntersectionArea, viewportIntersectionArea } = position;
        // If a such position is found that element is fully contained by the limiter then, obviously,
        // there will be no better one, so finishing.
        if (limiterIntersectionArea === elementRectArea) {
            // @if CK_DEBUG_POSITION //	RectDrawer.draw( position._rect, CHOSEN_POSITION_RECT_STYLE, [
            // @if CK_DEBUG_POSITION //		position.name,
            // @if CK_DEBUG_POSITION //		'100% fit',
            // @if CK_DEBUG_POSITION //	].join( '\n' ) );
            return position;
        }
        // To maximize both viewport and limiter intersection areas we use distance on _viewportIntersectionArea
        // and _limiterIntersectionArea plane (without sqrt because we are looking for max value).
        const fitFactor = viewportIntersectionArea ** 2 + limiterIntersectionArea ** 2;
        // @if CK_DEBUG_POSITION //	RectDrawer.draw( position._rect, { opacity: .4 }, [
        // @if CK_DEBUG_POSITION //		position.name,
        // @if CK_DEBUG_POSITION //		'Vi=' +  Math.round( viewportIntersectionArea ),
        // @if CK_DEBUG_POSITION //		'Li=' + Math.round( limiterIntersectionArea )
        // @if CK_DEBUG_POSITION //	].join( '\n' ) );
        if (fitFactor > maxFitFactor) {
            maxFitFactor = fitFactor;
            bestPosition = position;
        }
    }
    // @if CK_DEBUG_POSITION // if ( bestPosition ) {
    // @if CK_DEBUG_POSITION // 	RectDrawer.draw( bestPosition._rect, CHOSEN_POSITION_RECT_STYLE );
    // @if CK_DEBUG_POSITION // }
    return bestPosition;
}
/**
 * A position class which instances are created and used by the {@link module:utils/dom/position~getOptimalPosition} helper.
 *
 * {@link module:utils/dom/position~Position#top} and {@link module:utils/dom/position~Position#left} properties of the position instance
 * translate directly to the `top` and `left` properties in CSS "`position: absolute` coordinate system". If set on the positioned element
 * in DOM, they will make it display it in the right place in the viewport.
 */ class PositionObject {
    name;
    config;
    _positioningFunctionCoordinates;
    _options;
    _cachedRect;
    _cachedAbsoluteRect;
    /**
	 * Creates an instance of the {@link module:utils/dom/position~PositionObject} class.
	 *
	 * @param positioningFunction function The function that defines the expected
	 * coordinates the positioned element should move to.
	 * @param options options object.
	 * @param options.elementRect The positioned element rect.
	 * @param options.targetRect The target element rect.
	 * @param options.viewportRect The viewport rect.
	 * @param options.limiterRect The limiter rect.
	 * @param options.positionedElementAncestor Nearest element ancestor element which CSS position is not "static".
	 */ constructor(positioningFunction, options){
        const positioningFunctionOutput = positioningFunction(options.targetRect, options.elementRect, options.viewportRect, options.limiterRect);
        // Nameless position for a function that didn't participate.
        if (!positioningFunctionOutput) {
            return;
        }
        const { left, top, name, config } = positioningFunctionOutput;
        this.name = name;
        this.config = config;
        this._positioningFunctionCoordinates = {
            left,
            top
        };
        this._options = options;
    }
    /**
	 * The left value in pixels in the CSS `position: absolute` coordinate system.
	 * Set it on the positioned element in DOM to move it to the position.
	 */ get left() {
        return this._absoluteRect.left;
    }
    /**
	 * The top value in pixels in the CSS `position: absolute` coordinate system.
	 * Set it on the positioned element in DOM to move it to the position.
	 */ get top() {
        return this._absoluteRect.top;
    }
    /**
	 * An intersection area between positioned element and limiter within viewport constraints.
	 */ get limiterIntersectionArea() {
        const limiterRect = this._options.limiterRect;
        if (limiterRect) {
            return limiterRect.getIntersectionArea(this._rect);
        }
        return 0;
    }
    /**
	 * An intersection area between positioned element and viewport.
	 */ get viewportIntersectionArea() {
        const viewportRect = this._options.viewportRect;
        return viewportRect.getIntersectionArea(this._rect);
    }
    /**
	 * An already positioned element rect. A clone of the element rect passed to the constructor
	 * but placed in the viewport according to the positioning function.
	 */ get _rect() {
        if (this._cachedRect) {
            return this._cachedRect;
        }
        this._cachedRect = this._options.elementRect.clone().moveTo(this._positioningFunctionCoordinates.left, this._positioningFunctionCoordinates.top);
        return this._cachedRect;
    }
    /**
	 * An already absolutely positioned element rect. See ({@link #_rect}).
	 */ get _absoluteRect() {
        if (this._cachedAbsoluteRect) {
            return this._cachedAbsoluteRect;
        }
        this._cachedAbsoluteRect = this._rect.toAbsoluteRect();
        return this._cachedAbsoluteRect;
    }
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/dom/remove
 */ /**
 * Removes given node from parent.
 *
 * @param node Node to remove.
 */ function remove(node) {
    const parent = node.parentNode;
    if (parent) {
        parent.removeChild(node);
    }
}

/**
 * Returns the visual viewport offsets to adjust elements with `position: fixed` style.
 */ function getVisualViewportOffset() {
    const visualViewport = global.window.visualViewport;
    if (!visualViewport || !(env.isiOS || env.isSafari)) {
        return {
            left: 0,
            top: 0
        };
    }
    const left = Math.max(Math.round(visualViewport.offsetLeft), 0);
    const top = Math.max(Math.round(visualViewport.offsetTop), 0);
    return {
        left,
        top
    };
}

/**
 * Makes any page `HTMLElement` or `Range` (`target`) visible inside the browser viewport.
 * This helper will scroll all `target` ancestors and the web browser viewport to reveal the target to
 * the user. If the `target` is already visible, nothing will happen.
 *
 * @param options Additional configuration of the scrolling behavior.
 * @param options.target A target, which supposed to become visible to the user.
 * @param options.viewportOffset An offset from the edge of the viewport (in pixels)
 * the `target` will be moved by if the viewport is scrolled. It enhances the user experience
 * by keeping the `target` some distance from the edge of the viewport and thus making it easier to
 * read or edit by the user.
 * @param options.ancestorOffset An offset from the boundary of scrollable ancestors (if any)
 * the `target` will be moved by if the viewport is scrolled. It enhances the user experience
 * by keeping the `target` some distance from the edge of the ancestors and thus making it easier to
 * read or edit by the user.
 * @param options.alignToTop When set `true`, the helper will make sure the `target` is scrolled up
 * to the top boundary of the viewport and/or scrollable ancestors if scrolled up. When not set
 * (default), the `target` will be revealed by scrolling as little as possible. This option will
 * not affect `targets` that must be scrolled down because they will appear at the top of the boundary
 * anyway.
 *
 * ```
 *                                             scrollViewportToShowTarget() with            scrollViewportToShowTarget() with
 *          Initial state                        alignToTop unset (default)                        alignToTop = true
 *
 * ┌────────────────────────────────┬─┐       ┌────────────────────────────────┬─┐        ┌────────────────────────────────┬─┐
 * │                                │▲│       │                                │▲│        │   [ Target to be revealed ]    │▲│
 * │                                │ │       │                                │ │        │                                │ │
 * │                                │█│       │                                │ │        │                                │ │
 * │                                │█│       │                                │ │        │                                │ │
 * │                                │ │       │                                │█│        │                                │ │
 * │                                │ │       │                                │█│        │                                │█│
 * │                                │ │       │                                │ │        │                                │█│
 * │                                │▼│       │   [ Target to be revealed ]    │▼│        │                                │▼│
 * └────────────────────────────────┴─┘       └────────────────────────────────┴─┘        └────────────────────────────────┴─┘
 *
 *
 *     [ Target to be revealed ]
 *```
 *
 * @param options.forceScroll When set `true`, the `target` will be aligned to the top of the viewport
 * and scrollable ancestors whether it is already visible or not. This option will only work when `alignToTop`
 * is `true`
 */ function scrollViewportToShowTarget({ target, viewportOffset = 0, ancestorOffset = 0, alignToTop, forceScroll }) {
    const targetWindow = getWindow(target);
    let currentWindow = targetWindow;
    let currentFrame = null;
    viewportOffset = normalizeViewportOffset(viewportOffset);
    // Iterate over all windows, starting from target's parent window up to window#top.
    while(currentWindow){
        let firstAncestorToScroll;
        // Let's scroll target's ancestors first to reveal it. Then, once the ancestor scrolls
        // settled down, the algorithm can eventually scroll the viewport of the current window.
        //
        // Note: If the current window is target's **original** window (e.g. the first one),
        // start scrolling the closest parent of the target. If not, scroll the closest parent
        // of an iframe that resides in the current window.
        if (currentWindow == targetWindow) {
            firstAncestorToScroll = getParentElement(target);
        } else {
            firstAncestorToScroll = getParentElement(currentFrame);
        }
        // Scroll the target's ancestors first. Once done, scrolling the viewport is easy.
        scrollAncestorsToShowRect({
            parent: firstAncestorToScroll,
            getRect: ()=>{
                // Note: If the target does not belong to the current window **directly**,
                // i.e. it resides in an iframe belonging to the window, obtain the target's rect
                // in the coordinates of the current window. By default, a Rect returns geometry
                // relative to the current window's viewport. To make it work in a parent window,
                // it must be shifted.
                return getRectRelativeToWindow(target, currentWindow);
            },
            alignToTop,
            ancestorOffset,
            forceScroll
        });
        // Obtain the rect of the target after it has been scrolled within its ancestors.
        // It's time to scroll the viewport.
        let targetRect = getRectRelativeToWindow(target, currentWindow);
        // Detect situation where the target is higher than the first scrollable ancestor.
        // In such case scrolling the viewport to reveal the target might be malfunctioning because
        // the target `.top` position is lower than the ancestor's `.top` position. If it's large enough it can be negative.
        // It causes the `scrollWindowToShowRect` to scroll the viewport to the negative top position which is not possible
        // and leads to the viewport being scrolled to the absolute top of the document. To prevent this, the target's rect
        // must be shifted to the ancestor's top position. It should not affect the target's visibility because the ancestor
        // is already scrolled to reveal the target.
        // See more: https://github.com/ckeditor/ckeditor5/issues/17079
        const ancestorWindowRelativeRect = getRectRelativeToWindow(firstAncestorToScroll, currentWindow);
        if (targetRect.height > ancestorWindowRelativeRect.height) {
            const ancestorTargetIntersection = targetRect.getIntersection(ancestorWindowRelativeRect);
            if (ancestorTargetIntersection) {
                targetRect = ancestorTargetIntersection;
            }
        }
        scrollWindowToShowRect({
            window: currentWindow,
            rect: targetRect,
            viewportOffset,
            alignToTop,
            forceScroll
        });
        if (currentWindow.parent != currentWindow) {
            // Keep the reference to the <iframe> element the "previous current window" was
            // rendered within. It will be useful to re–calculate the rect of the target
            // in the parent window's relative geometry. The target's rect must be shifted
            // by it's iframe's position.
            currentFrame = currentWindow.frameElement;
            currentWindow = currentWindow.parent;
            // If the current window has some parent but frameElement is inaccessible, then they have
            // different domains/ports and, due to security reasons, accessing and scrolling
            // the parent window won't be possible.
            // See https://github.com/ckeditor/ckeditor5/issues/930.
            if (!currentFrame) {
                return;
            }
        } else {
            currentWindow = null;
        }
    }
}
/**
 * Makes any page `HTMLElement` or `Range` (target) visible within its scrollable ancestors,
 * e.g. if they have `overflow: scroll` CSS style.
 *
 * @param target A target, which supposed to become visible to the user.
 * @param ancestorOffset An offset between the target and the boundary of scrollable ancestors
 * to be maintained while scrolling.
 * @param limiterElement The outermost ancestor that should be scrolled. If specified, it can prevent
 * scrolling the whole page.
 */ function scrollAncestorsToShowTarget(target, ancestorOffset, limiterElement) {
    const targetParent = getParentElement(target);
    scrollAncestorsToShowRect({
        parent: targetParent,
        getRect: ()=>new Rect(target),
        ancestorOffset,
        limiterElement
    });
}
/**
 * Makes a given rect visible within its parent window.
 *
 * Note: Avoid the situation where the caret is still in the viewport, but totally
 * at the edge of it. In such situation, if it moved beyond the viewport in the next
 * action e.g. after paste, the scrolling would move it to the viewportOffset level
 * and it all would look like the caret visually moved up/down:
 *
 * 1.
 * ```
 * | foo[]
 * |                                    <--- N px of space below the caret
 * +---------------------------------...
 * ```
 *
 * 2. *paste*
 * 3.
 * ```
 * |
 * |
 * +-foo-----------------------------...
 *   bar[]                              <--- caret below viewport, scrolling...
 * ```
 *
 * 4. *scrolling*
 * 5.
 * ```
 * |
 * | foo
 * | bar[]                              <--- caret precisely at the edge
 * +---------------------------------...
 * ```
 *
 * To prevent this, this method checks the rects moved by the viewportOffset to cover
 * the upper/lower edge of the viewport. It makes sure if the action repeats, there's
 * no twitching – it's a purely visual improvement:
 *
 * 5. (after fix)
 * ```
 * |
 * | foo
 * | bar[]
 * |                                    <--- N px of space below the caret
 * +---------------------------------...
 * ```
 *
 * @param options Additional configuration of the scrolling behavior.
 * @param options.window A window which is scrolled to reveal the rect.
 * @param options.rect A rect which is to be revealed.
 * @param options.viewportOffset An offset from the edge of the viewport (in pixels) the `rect` will be
 * moved by if the viewport is scrolled.
 * @param options.alignToTop When set `true`, the helper will make sure the `rect` is scrolled up
 * to the top boundary of the viewport if scrolled up. When not set (default), the `rect` will be
 * revealed by scrolling as little as possible. This option will not affect rects that must be scrolled
 * down because they will appear at the top of the boundary anyway.
 * @param options.forceScroll When set `true`, the `rect` will be aligned to the top of the viewport
 * whether it is already visible or not. This option will only work when `alignToTop` is `true`
 */ function scrollWindowToShowRect({ window, rect, alignToTop, forceScroll, viewportOffset }) {
    const targetShiftedDownRect = rect.clone().moveBy(0, viewportOffset.bottom);
    const targetShiftedUpRect = rect.clone().moveBy(0, -viewportOffset.top);
    const viewportRect = new Rect(window).excludeScrollbarsAndBorders();
    const rects = [
        targetShiftedUpRect,
        targetShiftedDownRect
    ];
    const forceScrollToTop = alignToTop && forceScroll;
    const allRectsFitInViewport = rects.every((rect)=>viewportRect.contains(rect));
    let { scrollX, scrollY } = window;
    const initialScrollX = scrollX;
    const initialScrollY = scrollY;
    if (forceScrollToTop) {
        scrollY -= viewportRect.top - rect.top + viewportOffset.top;
    } else if (!allRectsFitInViewport) {
        if (isAbove(targetShiftedUpRect, viewportRect)) {
            scrollY -= viewportRect.top - rect.top + viewportOffset.top;
        } else if (isBelow(targetShiftedDownRect, viewportRect)) {
            if (alignToTop) {
                scrollY += rect.top - viewportRect.top - viewportOffset.top;
            } else {
                scrollY += rect.bottom - viewportRect.bottom + viewportOffset.bottom;
            }
        }
    }
    if (!allRectsFitInViewport) {
        // TODO: Web browsers scroll natively to place the target in the middle
        // of the viewport. It's not a very popular case, though.
        if (isLeftOf(rect, viewportRect)) {
            scrollX -= viewportRect.left - rect.left + viewportOffset.left;
        } else if (isRightOf(rect, viewportRect)) {
            scrollX += rect.right - viewportRect.right + viewportOffset.right;
        }
    }
    if (scrollX != initialScrollX || scrollY !== initialScrollY) {
        window.scrollTo(scrollX, scrollY);
    }
}
/**
 * Recursively scrolls element ancestors to visually reveal a rect.
 *
 * @param options Additional configuration of the scrolling behavior.
 * @param options.parent The first parent ancestor to start scrolling.
 * @param options.getRect A function which returns the Rect, which is to be revealed.
 * @param options.ancestorOffset An offset from the boundary of scrollable ancestors (if any)
 * the `Rect` instance will be moved by if the viewport is scrolled.
 * @param options.alignToTop When set `true`, the helper will make sure the `Rect` instance is scrolled up
 * to the top boundary of the scrollable ancestors if scrolled up. When not set (default), the `rect`
 * will be revealed by scrolling as little as possible. This option will not affect rects that must be
 * scrolled down because they will appear at the top of the boundary
 * anyway.
 * @param options.forceScroll When set `true`, the `rect` will be aligned to the top of scrollable ancestors
 * whether it is already visible or not. This option will only work when `alignToTop` is `true`
 * @param options.limiterElement The outermost ancestor that should be scrolled. Defaults to the `<body>` element.
 */ function scrollAncestorsToShowRect({ parent, getRect, alignToTop, forceScroll, ancestorOffset = 0, limiterElement }) {
    const parentWindow = getWindow(parent);
    const forceScrollToTop = alignToTop && forceScroll;
    let parentRect, targetRect, targetFitsInTarget;
    const limiter = limiterElement || parentWindow.document.body;
    while(parent != limiter){
        targetRect = getRect();
        parentRect = new Rect(parent).excludeScrollbarsAndBorders();
        targetFitsInTarget = parentRect.contains(targetRect);
        if (forceScrollToTop) {
            parent.scrollTop -= parentRect.top - targetRect.top + ancestorOffset;
        } else if (!targetFitsInTarget) {
            if (isAbove(targetRect, parentRect)) {
                parent.scrollTop -= parentRect.top - targetRect.top + ancestorOffset;
            } else if (isBelow(targetRect, parentRect)) {
                if (alignToTop) {
                    parent.scrollTop += targetRect.top - parentRect.top - ancestorOffset;
                } else {
                    parent.scrollTop += targetRect.bottom - parentRect.bottom + ancestorOffset;
                }
            }
        }
        if (!targetFitsInTarget) {
            if (isLeftOf(targetRect, parentRect)) {
                parent.scrollLeft -= parentRect.left - targetRect.left + ancestorOffset;
            } else if (isRightOf(targetRect, parentRect)) {
                parent.scrollLeft += targetRect.right - parentRect.right + ancestorOffset;
            }
        }
        parent = parent.parentNode;
    }
}
/**
 * Determines if a given `Rect` extends beyond the bottom edge of the second `Rect`.
 */ function isBelow(firstRect, secondRect) {
    return firstRect.bottom > secondRect.bottom;
}
/**
 * Determines if a given `Rect` extends beyond the top edge of the second `Rect`.
 */ function isAbove(firstRect, secondRect) {
    return firstRect.top < secondRect.top;
}
/**
 * Determines if a given `Rect` extends beyond the left edge of the second `Rect`.
 */ function isLeftOf(firstRect, secondRect) {
    return firstRect.left < secondRect.left;
}
/**
 * Determines if a given `Rect` extends beyond the right edge of the second `Rect`.
 */ function isRightOf(firstRect, secondRect) {
    return firstRect.right > secondRect.right;
}
/**
 * Returns the closest window of an element or range.
 */ function getWindow(elementOrRange) {
    if (isRange(elementOrRange)) {
        return elementOrRange.startContainer.ownerDocument.defaultView;
    } else {
        return elementOrRange.ownerDocument.defaultView;
    }
}
/**
 * Returns the closest parent of an element or DOM range.
 */ function getParentElement(elementOrRange) {
    if (isRange(elementOrRange)) {
        let parent = elementOrRange.commonAncestorContainer;
        // If a Range is attached to the Text, use the closest element ancestor.
        if (isText(parent)) {
            parent = parent.parentNode;
        }
        return parent;
    } else {
        return elementOrRange.parentNode;
    }
}
/**
 * Returns the rect of an element or range residing in an iframe.
 * The result rect is relative to the geometry of the passed window instance.
 *
 * @param target Element or range which rect should be returned.
 * @param relativeWindow A window the rect should be relative to.
 */ function getRectRelativeToWindow(target, relativeWindow) {
    const targetWindow = getWindow(target);
    const rect = new Rect(target);
    if (targetWindow === relativeWindow) {
        return rect;
    } else {
        let currentWindow = targetWindow;
        while(currentWindow != relativeWindow){
            const frame = currentWindow.frameElement;
            const frameRect = new Rect(frame).excludeScrollbarsAndBorders();
            rect.moveBy(frameRect.left, frameRect.top);
            currentWindow = currentWindow.parent;
        }
    }
    return rect;
}
/**
 * A helper that explodes the `viewportOffset` configuration if defined as a plain number into an object
 * with `top`, `bottom`, `left`, and `right` properties.
 *
 * If an object value is passed, this helper will pass it through.
 *
 * @param viewportOffset Viewport offset to be normalized.
 */ function normalizeViewportOffset(viewportOffset) {
    if (typeof viewportOffset === 'number') {
        return {
            top: viewportOffset,
            bottom: viewportOffset,
            left: viewportOffset,
            right: viewportOffset
        };
    }
    return viewportOffset;
}

const modifiersToGlyphsMac = {
    ctrl: '⌃',
    cmd: '⌘',
    alt: '⌥',
    shift: '⇧'
};
const modifiersToGlyphsNonMac = {
    ctrl: 'Ctrl+',
    alt: 'Alt+',
    shift: 'Shift+'
};
const keyCodesToGlyphs = {
    37: '←',
    38: '↑',
    39: '→',
    40: '↓',
    9: '⇥',
    33: 'Page Up',
    34: 'Page Down'
};
/**
 * An object with `keyName => keyCode` pairs for a set of known keys.
 *
 * Contains:
 *
 * * `a-z`,
 * * `0-9`,
 * * `f1-f12`,
 * * `` ` ``, `-`, `=`, `[`, `]`, `;`, `'`, `,`, `.`, `/`, `\`,
 * * `arrow(left|up|right|bottom)`,
 * * `backspace`, `delete`, `end`, `enter`, `esc`, `home`, `tab`,
 * * `ctrl`, `cmd`, `shift`, `alt`.
 */ const keyCodes = /* #__PURE__ */ generateKnownKeyCodes();
const keyCodeNames = /* #__PURE__ */ Object.fromEntries(/* #__PURE__ */ Object.entries(keyCodes).map(([name, code])=>{
    let prettyKeyName;
    if (code in keyCodesToGlyphs) {
        prettyKeyName = keyCodesToGlyphs[code];
    } else {
        prettyKeyName = name.charAt(0).toUpperCase() + name.slice(1);
    }
    return [
        code,
        prettyKeyName
    ];
}));
/**
 * Converts a key name or {@link module:utils/keyboard~KeystrokeInfo keystroke info} into a key code.
 *
 * Note: Key names are matched with {@link module:utils/keyboard#keyCodes} in a case-insensitive way.
 *
 * @param key A key name (see {@link module:utils/keyboard#keyCodes}) or a keystroke data object.
 * @returns Key or keystroke code.
 */ function getCode(key) {
    let keyCode;
    if (typeof key == 'string') {
        keyCode = keyCodes[key.toLowerCase()];
        if (!keyCode) {
            /**
			 * Unknown key name. Only key names included in the {@link module:utils/keyboard#keyCodes} can be used.
			 *
			 * @error keyboard-unknown-key
			 * @param {string} key Ths specified key name.
			 */ throw new CKEditorError('keyboard-unknown-key', null, {
                key
            });
        }
    } else {
        keyCode = key.keyCode + (key.altKey ? keyCodes.alt : 0) + (key.ctrlKey ? keyCodes.ctrl : 0) + (key.shiftKey ? keyCodes.shift : 0) + (key.metaKey ? keyCodes.cmd : 0);
    }
    return keyCode;
}
/**
 * Parses the keystroke and returns a keystroke code that will match the code returned by
 * {@link module:utils/keyboard~getCode} for the corresponding {@link module:utils/keyboard~KeystrokeInfo keystroke info}.
 *
 * The keystroke can be passed in two formats:
 *
 * * as a single string – e.g. `ctrl + A`,
 * * as an array of {@link module:utils/keyboard~keyCodes known key names} and key codes – e.g.:
 *   * `[ 'ctrl', 32 ]` (ctrl + space),
 *   * `[ 'ctrl', 'a' ]` (ctrl + A).
 *
 * Note: Key names are matched with {@link module:utils/keyboard#keyCodes} in a case-insensitive way.
 *
 * Note: Only keystrokes with a single non-modifier key are supported (e.g. `ctrl+A` is OK, but `ctrl+A+B` is not).
 *
 * Note: On macOS, keystroke handling is translating the `Ctrl` key to the `Cmd` key and handling only that keystroke.
 * For example, a registered keystroke `Ctrl+A` will be translated to `Cmd+A` on macOS. To disable the translation of some keystroke,
 * use the forced modifier: `Ctrl!+A` (note the exclamation mark).
 *
 * @param keystroke The keystroke definition.
 * @returns Keystroke code.
 */ function parseKeystroke(keystroke) {
    if (typeof keystroke == 'string') {
        keystroke = splitKeystrokeText(keystroke);
    }
    return keystroke.map((key)=>typeof key == 'string' ? getEnvKeyCode(key) : key).reduce((key, sum)=>sum + key, 0);
}
/**
 * Translates any keystroke string text like `"Ctrl+A"` to an
 * environment–specific keystroke, i.e. `"⌘A"` on macOS.
 *
 * @param keystroke The keystroke text.
 * @param [forcedEnv] The environment to force the key translation to. If not provided, the current environment is used.
 * @returns The keystroke text specific for the environment.
 */ function getEnvKeystrokeText(keystroke, forcedEnv) {
    let keystrokeCode = parseKeystroke(keystroke);
    const isMac = forcedEnv ? forcedEnv === 'Mac' : env.isMac || env.isiOS;
    const modifiersToGlyphs = Object.entries(isMac ? modifiersToGlyphsMac : modifiersToGlyphsNonMac);
    const modifiers = modifiersToGlyphs.reduce((modifiers, [name, glyph])=>{
        // Modifier keys are stored as a bit mask so extract those from the keystroke code.
        if ((keystrokeCode & keyCodes[name]) != 0) {
            keystrokeCode &= ~keyCodes[name];
            modifiers += glyph;
        }
        return modifiers;
    }, '');
    return modifiers + (keystrokeCode ? keyCodeNames[keystrokeCode] : '');
}
/**
 * Returns `true` if the provided key code represents one of the arrow keys.
 *
 * @param keyCode A key code as in {@link module:utils/keyboard~KeystrokeInfo#keyCode}.
 */ function isArrowKeyCode(keyCode) {
    return keyCode == keyCodes.arrowright || keyCode == keyCodes.arrowleft || keyCode == keyCodes.arrowup || keyCode == keyCodes.arrowdown;
}
/**
 * Returns the direction in which the {@link module:engine/model/documentselection~DocumentSelection selection}
 * will move when the provided arrow key code is pressed considering the language direction of the editor content.
 *
 * For instance, in right–to–left (RTL) content languages, pressing the left arrow means moving the selection right (forward)
 * in the model structure. Similarly, pressing the right arrow moves the selection left (backward).
 *
 * @param keyCode A key code as in {@link module:utils/keyboard~KeystrokeInfo#keyCode}.
 * @param contentLanguageDirection The content language direction, corresponding to
 * {@link module:utils/locale~Locale#contentLanguageDirection}.
 * @returns Localized arrow direction or `undefined` for non-arrow key codes.
 */ function getLocalizedArrowKeyCodeDirection(keyCode, contentLanguageDirection) {
    const isLtrContent = contentLanguageDirection === 'ltr';
    switch(keyCode){
        case keyCodes.arrowleft:
            return isLtrContent ? 'left' : 'right';
        case keyCodes.arrowright:
            return isLtrContent ? 'right' : 'left';
        case keyCodes.arrowup:
            return 'up';
        case keyCodes.arrowdown:
            return 'down';
    }
}
/**
 * Converts a key name to the key code with mapping based on the env.
 *
 * See: {@link module:utils/keyboard~getCode}.
 *
 * @param key The key name (see {@link module:utils/keyboard#keyCodes}).
 * @returns Key code.
 */ function getEnvKeyCode(key) {
    // Don't remap modifier key for forced modifiers.
    if (key.endsWith('!')) {
        return getCode(key.slice(0, -1));
    }
    const code = getCode(key);
    return (env.isMac || env.isiOS) && code == keyCodes.ctrl ? keyCodes.cmd : code;
}
/**
 * Determines if the provided key code moves the {@link module:engine/model/documentselection~DocumentSelection selection}
 * forward or backward considering the language direction of the editor content.
 *
 * For instance, in right–to–left (RTL) languages, pressing the left arrow means moving forward
 * in the model structure. Similarly, pressing the right arrow moves the selection backward.
 *
 * @param keyCode A key code as in {@link module:utils/keyboard~KeystrokeInfo#keyCode}.
 * @param contentLanguageDirection The content language direction, corresponding to
 * {@link module:utils/locale~Locale#contentLanguageDirection}.
 */ function isForwardArrowKeyCode(keyCode, contentLanguageDirection) {
    const localizedKeyCodeDirection = getLocalizedArrowKeyCodeDirection(keyCode, contentLanguageDirection);
    return localizedKeyCodeDirection === 'down' || localizedKeyCodeDirection === 'right';
}
function generateKnownKeyCodes() {
    const keyCodes = {
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        arrowleft: 37,
        arrowup: 38,
        arrowright: 39,
        arrowdown: 40,
        backspace: 8,
        delete: 46,
        enter: 13,
        space: 32,
        esc: 27,
        tab: 9,
        // The idea about these numbers is that they do not collide with any real key codes, so we can use them
        // like bit masks.
        ctrl: 0x110000,
        shift: 0x220000,
        alt: 0x440000,
        cmd: 0x880000
    };
    // a-z
    for(let code = 65; code <= 90; code++){
        const letter = String.fromCharCode(code);
        keyCodes[letter.toLowerCase()] = code;
    }
    // 0-9
    for(let code = 48; code <= 57; code++){
        keyCodes[code - 48] = code;
    }
    // F1-F12
    for(let code = 112; code <= 123; code++){
        keyCodes['f' + (code - 111)] = code;
    }
    // other characters
    Object.assign(keyCodes, {
        '\'': 222,
        ',': 108,
        '-': 109,
        '.': 110,
        '/': 111,
        ';': 186,
        '=': 187,
        '[': 219,
        '\\': 220,
        ']': 221,
        '`': 223
    });
    return keyCodes;
}
function splitKeystrokeText(keystroke) {
    return keystroke.split('+').map((key)=>key.trim());
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/language
 */ /**
 * String representing a language direction.
 */ const RTL_LANGUAGE_CODES = [
    'ar',
    'ara',
    'dv',
    'div',
    'fa',
    'per',
    'fas',
    'he',
    'heb',
    'ku',
    'kur',
    'ug',
    'uig',
    'ur',
    'urd' // Urdu
];
/**
 * Helps determine whether a language text direction is LTR or RTL.
 *
 * @param languageCode The ISO 639-1 or ISO 639-2 language code.
 */ function getLanguageDirection(languageCode) {
    return RTL_LANGUAGE_CODES.includes(languageCode) ? 'rtl' : 'ltr';
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/toarray
 */ /**
 * Transforms any value to an array. If the provided value is already an array, it is returned unchanged.
 *
 * @label MUTABLE
 * @param data The value to transform to an array.
 * @returns An array created from data.
 */ function toArray(data) {
    return Array.isArray(data) ? data : [
        data
    ];
}

/* istanbul ignore else -- @preserve */ if (!global.window.CKEDITOR_TRANSLATIONS) {
    global.window.CKEDITOR_TRANSLATIONS = {};
}
/**
 * Adds translations to existing ones or overrides the existing translations. These translations will later
 * be available for the {@link module:utils/locale~Locale#t `t()`} function.
 *
 * The `translations` is an object which consists of `messageId: translation` pairs. Note that the message ID can be
 * either constructed from the message string or from the message ID if it was passed
 * (this happens rarely and mostly for short messages or messages with placeholders).
 * Since the editor displays only the message string, the message ID can be found either in the source code or in the
 * built translations for another language.
 *
 * ```ts
 * add( 'pl', {
 * 	'Cancel': 'Anuluj',
 * 	'IMAGE': 'obraz', // Note that the `IMAGE` comes from the message ID, while the string can be `image`.
 * } );
 * ```
 *
 * If the message is supposed to support various plural forms, make sure to provide an array with the singular form and all plural forms:
 *
 * ```ts
 * add( 'pl', {
 * 	'Add space': [ 'Dodaj spację', 'Dodaj %0 spacje', 'Dodaj %0 spacji' ]
 * } );
 * ```
 *
 * You should also specify the third argument (the `getPluralForm()` function) that will be used to determine the plural form if no
 * language file was loaded for that language. All language files coming from CKEditor 5 sources will have this option set, so
 * these plural form rules will be reused by other translations added to the registered languages. The `getPluralForm()` function
 * can return either a Boolean or a number.
 *
 * ```ts
 * add( 'en', {
 * 	// ... Translations.
 * }, n => n !== 1 );
 * add( 'pl', {
 * 	// ... Translations.
 * }, n => n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && ( n % 100 < 10 || n % 100 >= 20 ) ? 1 : 2 );
 * ```
 *
 * All translations extend the global `window.CKEDITOR_TRANSLATIONS` object. An example of this object can be found below:
 *
 * ```ts
 * {
 * 	pl: {
 * 		dictionary: {
 * 			'Cancel': 'Anuluj',
 * 			'Add space': [ 'Dodaj spację', 'Dodaj %0 spacje', 'Dodaj %0 spacji' ]
 * 		},
 * 		// A function that returns the plural form index.
 * 		getPluralForm: n => n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && ( n % 100 < 10 || n % 100 >= 20 ) ? 1 : 2 );
 * 	}
 * 	// Other languages.
 * 	}
 * ```
 *
 * If you cannot import this function from this module (e.g. because you use a CKEditor 5 build), you can
 * still add translations by extending the global `window.CKEDITOR_TRANSLATIONS` object by using a function like
 * the one below:
 *
 * ```ts
 * function addTranslations( language, translations, getPluralForm ) {
 * 	if ( !global.window.CKEDITOR_TRANSLATIONS ) {
 * 		global.window.CKEDITOR_TRANSLATIONS = {};
 * 	}

 * 	if ( !global.window.CKEDITOR_TRANSLATIONS[ language ] ) {
 * 		global.window.CKEDITOR_TRANSLATIONS[ language ] = {};
 * 	}
 *
 * 	const languageTranslations = global.window.CKEDITOR_TRANSLATIONS[ language ];
 *
 * 	languageTranslations.dictionary = languageTranslations.dictionary || {};
 * 	languageTranslations.getPluralForm = getPluralForm || languageTranslations.getPluralForm;
 *
 * 	// Extend the dictionary for the given language.
 * 	Object.assign( languageTranslations.dictionary, translations );
 * }
 * ```
 *
 * @param language Target language.
 * @param translations An object with translations which will be added to the dictionary.
 * For each message ID the value should be either a translation or an array of translations if the message
 * should support plural forms.
 * @param getPluralForm A function that returns the plural form index (a number).
 */ function add(language, translations, getPluralForm) {
    if (!global.window.CKEDITOR_TRANSLATIONS[language]) {
        global.window.CKEDITOR_TRANSLATIONS[language] = {};
    }
    const languageTranslations = global.window.CKEDITOR_TRANSLATIONS[language];
    languageTranslations.dictionary = languageTranslations.dictionary || {};
    languageTranslations.getPluralForm = getPluralForm || languageTranslations.getPluralForm;
    Object.assign(languageTranslations.dictionary, translations);
}
/**
 * **Note:** This method is internal, use {@link module:utils/locale~Locale#t the `t()` function} instead to translate
 * the editor UI parts.
 *
 * This function is responsible for translating messages to the specified language. It uses translations added perviously
 * by {@link module:utils/translation-service~add} (a translations dictionary and the `getPluralForm()` function
 * to provide accurate translations of plural forms).
 *
 * When no translation is defined in the dictionary or the dictionary does not exist, this function returns
 * the original message string or the message plural depending on the number of elements.
 *
 * ```ts
 * translate( 'pl', { string: 'Cancel' } ); // 'Cancel'
 * ```
 *
 * The third optional argument is the number of elements, based on which the single form or one of the plural forms
 * should be picked when the message is supposed to support various plural forms.
 *
 * ```ts
 * translate( 'en', { string: 'Add a space', plural: 'Add %0 spaces' }, 1 ); // 'Add a space'
 * translate( 'en', { string: 'Add a space', plural: 'Add %0 spaces' }, 3 ); // 'Add %0 spaces'
 * ```
 *
 * The message should provide an ID using the `id` property when the message strings are not unique and their
 * translations should be different.
 *
 * ```ts
 * translate( 'en', { string: 'image', id: 'ADD_IMAGE' } );
 * translate( 'en', { string: 'image', id: 'AN_IMAGE' } );
 * ```
 *
 * @internal
 * @param language Target language.
 * @param message A message that will be translated.
 * @param quantity The number of elements for which a plural form should be picked from the target language dictionary.
 * @param translations Translations passed in editor config, if not provided use the global `window.CKEDITOR_TRANSLATIONS`.
 * @returns Translated sentence.
 */ function _translate(language, message, quantity = 1, translations) {
    if (typeof quantity !== 'number') {
        /**
		 * An incorrect value was passed to the translation function. This was probably caused
		 * by an incorrect message interpolation of a plural form. Note that for messages supporting plural forms
		 * the second argument of the `t()` function should always be a number or an array with a number as the first element.
		 *
		 * @error translation-service-quantity-not-a-number
		 */ throw new CKEditorError('translation-service-quantity-not-a-number', null, {
            quantity
        });
    }
    const normalizedTranslations = translations || global.window.CKEDITOR_TRANSLATIONS;
    const numberOfLanguages = getNumberOfLanguages(normalizedTranslations);
    if (numberOfLanguages === 1) {
        // Override the language to the only supported one.
        // This can't be done in the `Locale` class, because the translations comes after the `Locale` class initialization.
        language = Object.keys(normalizedTranslations)[0];
    }
    const messageId = message.id || message.string;
    if (numberOfLanguages === 0 || !hasTranslation(language, messageId, normalizedTranslations)) {
        if (quantity !== 1) {
            // Return the default plural form that was passed in the `message.plural` parameter.
            return message.plural;
        }
        return message.string;
    }
    const dictionary = normalizedTranslations[language].dictionary;
    const getPluralForm = normalizedTranslations[language].getPluralForm || ((n)=>n === 1 ? 0 : 1);
    const translation = dictionary[messageId];
    if (typeof translation === 'string') {
        return translation;
    }
    const pluralFormIndex = Number(getPluralForm(quantity));
    // Note: The `translate` function is not responsible for replacing `%0, %1, ...` with values.
    return translation[pluralFormIndex];
}
/**
 * If array then merge objects which are inside otherwise return given object.
 *
 * @internal
 * @param translations Translations passed in editor config.
 */ function _unifyTranslations(translations) {
    return Array.isArray(translations) ? translations.reduce((acc, translation)=>merge(acc, translation)) : translations;
}
/**
 * Checks whether the dictionary exists and translation in that dictionary exists.
 */ function hasTranslation(language, messageId, translations) {
    return !!translations[language] && !!translations[language].dictionary[messageId];
}
function getNumberOfLanguages(translations) {
    return Object.keys(translations).length;
}

/**
 * Represents the localization services.
 */ class Locale {
    /**
	 * The editor UI language code in the [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) format.
	 *
	 * If the {@link #contentLanguage content language} was not specified in the `Locale` constructor,
	 * it also defines the language of the content.
	 */ uiLanguage;
    /**
	 * Text direction of the {@link #uiLanguage editor UI language}. Either `'ltr'` or `'rtl'`.
	 */ uiLanguageDirection;
    /**
	 * The editor content language code in the [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) format.
	 *
	 * Usually the same as the {@link #uiLanguage editor language}, it can be customized by passing an optional
	 * argument to the `Locale` constructor.
	 */ contentLanguage;
    /**
	 * Text direction of the {@link #contentLanguage editor content language}.
	 *
	 * If the content language was passed directly to the `Locale` constructor, this property represents the
	 * direction of that language.
	 *
	 * If the {@link #contentLanguage editor content language} was derived from the {@link #uiLanguage editor language},
	 * the content language direction is the same as the {@link #uiLanguageDirection UI language direction}.
	 *
	 * The value is either `'ltr'` or `'rtl'`.
	 */ contentLanguageDirection;
    /**
	 * Translates the given message to the {@link #uiLanguage}. This method is also available in
	 * {@link module:core/editor/editor~Editor#t `Editor`} and {@link module:ui/view~View#t `View`}.
	 *
	 * This method's context is statically bound to the `Locale` instance and **should always be called as a function**:
	 *
	 * ```ts
	 * const t = locale.t;
	 * t( 'Label' );
	 * ```
	 *
	 * The message can be either a string or an object implementing the {@link module:utils/translation-service~Message} interface.
	 *
	 * The message may contain placeholders (`%<index>`) for value(s) that are passed as a `values` parameter.
	 * For an array of values, the `%<index>` will be changed to an element of that array at the given index.
	 * For a single value passed as the second argument, only the `%0` placeholders will be changed to the provided value.
	 *
	 * ```ts
	 * t( 'Created file "%0" in %1ms.', [ fileName, timeTaken ] );
	 * t( 'Created file "%0", fileName );
	 * ```
	 *
	 * The message supports plural forms. To specify the plural form, use the `plural` property. Singular or plural form
	 * will be chosen depending on the first value from the passed `values`. The value of the `plural` property is used
	 * as a default plural translation when the translation for the target language is missing.
	 *
	 * ```ts
	 * t( { string: 'Add a space', plural: 'Add %0 spaces' }, 1 ); // 'Add a space' for the English language.
	 * t( { string: 'Add a space', plural: 'Add %0 spaces' }, 5 ); // 'Add 5 spaces' for the English language.
	 * t( { string: '%1 a space', plural: '%1 %0 spaces' }, [ 2, 'Add' ] ); // 'Add 2 spaces' for the English language.
	 *
	 * t( { string: 'Add a space', plural: 'Add %0 spaces' }, 1 ); // 'Dodaj spację' for the Polish language.
	 * t( { string: 'Add a space', plural: 'Add %0 spaces' }, 5 ); // 'Dodaj 5 spacji' for the Polish language.
	 * t( { string: '%1 a space', plural: '%1 %0 spaces' }, [ 2, 'Add' ] ); // 'Dodaj 2 spacje' for the Polish language.
	 * ```
	 *
	 *  * The message should provide an ID using the `id` property when the message strings are not unique and their
	 * translations should be different.
	 *
	 * ```ts
	 * translate( 'en', { string: 'image', id: 'ADD_IMAGE' } );
	 * translate( 'en', { string: 'image', id: 'AN_IMAGE' } );
	 * ```
	 */ t;
    /**
	 * Object that contains translations.
	 */ translations;
    /**
	 * Creates a new instance of the locale class. Learn more about
	 * {@glink getting-started/setup/ui-language configuring the language of the editor}.
	 *
	 * @param options Locale configuration.
	 * @param options.uiLanguage The editor UI language code in the
	 * [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) format. See {@link #uiLanguage}.
	 * @param options.contentLanguage The editor content language code in the
	 * [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) format. If not specified, the same as `options.language`.
	 * See {@link #contentLanguage}.
	 * @param options.translations Translations passed as a editor config parameter.
	 */ constructor({ uiLanguage = 'en', contentLanguage, translations } = {}){
        this.uiLanguage = uiLanguage;
        this.contentLanguage = contentLanguage || this.uiLanguage;
        this.uiLanguageDirection = getLanguageDirection(this.uiLanguage);
        this.contentLanguageDirection = getLanguageDirection(this.contentLanguage);
        this.translations = _unifyTranslations(translations);
        this.t = (message, values)=>this._t(message, values);
    }
    /**
	 * The editor UI language code in the [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) format.
	 *
	 * **Note**: This property was deprecated. Please use {@link #uiLanguage} and {@link #contentLanguage}
	 * properties instead.
	 *
	 * @deprecated
	 */ get language() {
        /**
		 * The {@link module:utils/locale~Locale#language `Locale#language`} property was deprecated and will
		 * be removed in the near future. Please use the {@link module:utils/locale~Locale#uiLanguage `Locale#uiLanguage`} and
		 * {@link module:utils/locale~Locale#contentLanguage `Locale#contentLanguage`} properties instead.
		 *
		 * @error locale-deprecated-language-property
		 */ console.warn('locale-deprecated-language-property: ' + 'The Locale#language property has been deprecated and will be removed in the near future. ' + 'Please use #uiLanguage and #contentLanguage properties instead.');
        return this.uiLanguage;
    }
    /**
	 * An unbound version of the {@link #t} method.
	 */ _t(message, values = []) {
        values = toArray(values);
        if (typeof message === 'string') {
            message = {
                string: message
            };
        }
        const hasPluralForm = !!message.plural;
        const quantity = hasPluralForm ? values[0] : 1;
        const translatedString = _translate(this.uiLanguage, message, quantity, this.translations);
        return interpolateString(translatedString, values);
    }
}
/**
 * Fills the `%0, %1, ...` string placeholders with values.
 */ function interpolateString(string, values) {
    return string.replace(/%(\d+)/g, (match, index)=>{
        return index < values.length ? values[index] : match;
    });
}

/**
 * Collections are ordered sets of objects. Items in the collection can be retrieved by their indexes
 * in the collection (like in an array) or by their ids.
 *
 * If an object without an `id` property is being added to the collection, the `id` property will be generated
 * automatically. Note that the automatically generated id is unique only within this single collection instance.
 *
 * By default an item in the collection is identified by its `id` property. The name of the identifier can be
 * configured through the constructor of the collection.
 *
 * @typeParam T The type of the collection element.
 */ class Collection extends /* #__PURE__ */ EmitterMixin() {
    /**
	 * The internal list of items in the collection.
	 */ _items;
    /**
	 * The internal map of items in the collection.
	 */ _itemMap;
    /**
	 * The name of the property which is considered to identify an item.
	 */ _idProperty;
    /**
	 * A collection instance this collection is bound to as a result
	 * of calling {@link #bindTo} method.
	 */ _bindToCollection;
    /**
	 * A helper mapping external items of a bound collection ({@link #bindTo})
	 * and actual items of this collection. It provides information
	 * necessary to properly remove items bound to another collection.
	 *
	 * See {@link #_bindToInternalToExternalMap}.
	 */ _bindToExternalToInternalMap;
    /**
	 * A helper mapping items of this collection to external items of a bound collection
	 * ({@link #bindTo}). It provides information necessary to manage the bindings, e.g.
	 * to avoid loops in two–way bindings.
	 *
	 * See {@link #_bindToExternalToInternalMap}.
	 */ _bindToInternalToExternalMap;
    /**
	 * Stores indexes of skipped items from bound external collection.
	 */ _skippedIndexesFromExternal;
    constructor(initialItemsOrOptions = {}, options = {}){
        super();
        const hasInitialItems = isIterable(initialItemsOrOptions);
        if (!hasInitialItems) {
            options = initialItemsOrOptions;
        }
        this._items = [];
        this._itemMap = new Map();
        this._idProperty = options.idProperty || 'id';
        this._bindToExternalToInternalMap = new WeakMap();
        this._bindToInternalToExternalMap = new WeakMap();
        this._skippedIndexesFromExternal = [];
        // Set the initial content of the collection (if provided in the constructor).
        if (hasInitialItems) {
            for (const item of initialItemsOrOptions){
                this._items.push(item);
                this._itemMap.set(this._getItemIdBeforeAdding(item), item);
            }
        }
    }
    /**
	 * The number of items available in the collection.
	 */ get length() {
        return this._items.length;
    }
    /**
	 * Returns the first item from the collection or null when collection is empty.
	 */ get first() {
        return this._items[0] || null;
    }
    /**
	 * Returns the last item from the collection or null when collection is empty.
	 */ get last() {
        return this._items[this.length - 1] || null;
    }
    /**
	 * Adds an item into the collection.
	 *
	 * If the item does not have an id, then it will be automatically generated and set on the item.
	 *
	 * @param item
	 * @param index The position of the item in the collection. The item
	 * is pushed to the collection when `index` not specified.
	 * @fires add
	 * @fires change
	 */ add(item, index) {
        return this.addMany([
            item
        ], index);
    }
    /**
	 * Adds multiple items into the collection.
	 *
	 * Any item not containing an id will get an automatically generated one.
	 *
	 * @param items
	 * @param index The position of the insertion. Items will be appended if no `index` is specified.
	 * @fires add
	 * @fires change
	 */ addMany(items, index) {
        if (index === undefined) {
            index = this._items.length;
        } else if (index > this._items.length || index < 0) {
            /**
			 * The `index` passed to {@link module:utils/collection~Collection#addMany `Collection#addMany()`}
			 * is invalid. It must be a number between 0 and the collection's length.
			 *
			 * @error collection-add-item-invalid-index
			 */ throw new CKEditorError('collection-add-item-invalid-index', this);
        }
        let offset = 0;
        for (const item of items){
            const itemId = this._getItemIdBeforeAdding(item);
            const currentItemIndex = index + offset;
            this._items.splice(currentItemIndex, 0, item);
            this._itemMap.set(itemId, item);
            this.fire('add', item, currentItemIndex);
            offset++;
        }
        this.fire('change', {
            added: items,
            removed: [],
            index
        });
        return this;
    }
    /**
	 * Gets an item by its ID or index.
	 *
	 * @param idOrIndex The item ID or index in the collection.
	 * @returns The requested item or `null` if such item does not exist.
	 */ get(idOrIndex) {
        let item;
        if (typeof idOrIndex == 'string') {
            item = this._itemMap.get(idOrIndex);
        } else if (typeof idOrIndex == 'number') {
            item = this._items[idOrIndex];
        } else {
            /**
			 * An index or ID must be given.
			 *
			 * @error collection-get-invalid-arg
			 */ throw new CKEditorError('collection-get-invalid-arg', this);
        }
        return item || null;
    }
    /**
	 * Returns a Boolean indicating whether the collection contains an item.
	 *
	 * @param itemOrId The item or its ID in the collection.
	 * @returns `true` if the collection contains the item, `false` otherwise.
	 */ has(itemOrId) {
        if (typeof itemOrId == 'string') {
            return this._itemMap.has(itemOrId);
        } else {
            const idProperty = this._idProperty;
            const id = itemOrId[idProperty];
            return id && this._itemMap.has(id);
        }
    }
    /**
	 * Gets an index of an item in the collection.
	 * When an item is not defined in the collection, the index will equal -1.
	 *
	 * @param itemOrId The item or its ID in the collection.
	 * @returns The index of a given item.
	 */ getIndex(itemOrId) {
        let item;
        if (typeof itemOrId == 'string') {
            item = this._itemMap.get(itemOrId);
        } else {
            item = itemOrId;
        }
        return item ? this._items.indexOf(item) : -1;
    }
    /**
	 * Removes an item from the collection.
	 *
	 * @param subject The item to remove, its ID or index in the collection.
	 * @returns The removed item.
	 * @fires remove
	 * @fires change
	 */ remove(subject) {
        const [item, index] = this._remove(subject);
        this.fire('change', {
            added: [],
            removed: [
                item
            ],
            index
        });
        return item;
    }
    /**
	 * Executes the callback for each item in the collection and composes an array or values returned by this callback.
	 *
	 * @typeParam U The result type of the callback.
	 * @param callback
	 * @param ctx Context in which the `callback` will be called.
	 * @returns The result of mapping.
	 */ map(callback, ctx) {
        return this._items.map(callback, ctx);
    }
    /**
	 * Performs the specified action for each item in the collection.
	 *
	 * @param ctx Context in which the `callback` will be called.
	 */ forEach(callback, ctx) {
        this._items.forEach(callback, ctx);
    }
    /**
	 * Finds the first item in the collection for which the `callback` returns a true value.
	 *
	 * @param callback
	 * @param ctx Context in which the `callback` will be called.
	 * @returns The item for which `callback` returned a true value.
	 */ find(callback, ctx) {
        return this._items.find(callback, ctx);
    }
    /**
	 * Returns an array with items for which the `callback` returned a true value.
	 *
	 * @param callback
	 * @param ctx Context in which the `callback` will be called.
	 * @returns The array with matching items.
	 */ filter(callback, ctx) {
        return this._items.filter(callback, ctx);
    }
    /**
	 * Removes all items from the collection and destroys the binding created using
	 * {@link #bindTo}.
	 *
	 * @fires remove
	 * @fires change
	 */ clear() {
        if (this._bindToCollection) {
            this.stopListening(this._bindToCollection);
            this._bindToCollection = null;
        }
        const removedItems = Array.from(this._items);
        while(this.length){
            this._remove(0);
        }
        this.fire('change', {
            added: [],
            removed: removedItems,
            index: 0
        });
    }
    /**
	 * Binds and synchronizes the collection with another one.
	 *
	 * The binding can be a simple factory:
	 *
	 * ```ts
	 * class FactoryClass {
	 * 	public label: string;
	 *
	 * 	constructor( data: { label: string } ) {
	 * 		this.label = data.label;
	 * 	}
	 * }
	 *
	 * const source = new Collection<{ label: string }>( { idProperty: 'label' } );
	 * const target = new Collection<FactoryClass>();
	 *
	 * target.bindTo( source ).as( FactoryClass );
	 *
	 * source.add( { label: 'foo' } );
	 * source.add( { label: 'bar' } );
	 *
	 * console.log( target.length ); // 2
	 * console.log( target.get( 1 ).label ); // 'bar'
	 *
	 * source.remove( 0 );
	 * console.log( target.length ); // 1
	 * console.log( target.get( 0 ).label ); // 'bar'
	 * ```
	 *
	 * or the factory driven by a custom callback:
	 *
	 * ```ts
	 * class FooClass {
	 * 	public label: string;
	 *
	 * 	constructor( data: { label: string } ) {
	 * 		this.label = data.label;
	 * 	}
	 * }
	 *
	 * class BarClass {
	 * 	public label: string;
	 *
	 * 	constructor( data: { label: string } ) {
	 * 		this.label = data.label;
	 * 	}
	 * }
	 *
	 * const source = new Collection<{ label: string }>( { idProperty: 'label' } );
	 * const target = new Collection<FooClass | BarClass>();
	 *
	 * target.bindTo( source ).using( ( item ) => {
	 * 	if ( item.label == 'foo' ) {
	 * 		return new FooClass( item );
	 * 	} else {
	 * 		return new BarClass( item );
	 * 	}
	 * } );
	 *
	 * source.add( { label: 'foo' } );
	 * source.add( { label: 'bar' } );
	 *
	 * console.log( target.length ); // 2
	 * console.log( target.get( 0 ) instanceof FooClass ); // true
	 * console.log( target.get( 1 ) instanceof BarClass ); // true
	 * ```
	 *
	 * or the factory out of property name:
	 *
	 * ```ts
	 * const source = new Collection<{ nested: { value: string } }>();
	 * const target = new Collection<{ value: string }>();
	 *
	 * target.bindTo( source ).using( 'nested' );
	 *
	 * source.add( { nested: { value: 'foo' } } );
	 * source.add( { nested: { value: 'bar' } } );
	 *
	 * console.log( target.length ); // 2
	 * console.log( target.get( 0 ).value ); // 'foo'
	 * console.log( target.get( 1 ).value ); // 'bar'
	 * ```
	 *
	 * It's possible to skip specified items by returning null value:
	 *
	 * ```ts
	 * const source = new Collection<{ hidden: boolean }>();
	 * const target = new Collection<{ hidden: boolean }>();
	 *
	 * target.bindTo( source ).using( item => {
	 * 	if ( item.hidden ) {
	 * 		return null;
	 * 	}
	 *
	 * 	return item;
	 * } );
	 *
	 * source.add( { hidden: true } );
	 * source.add( { hidden: false } );
	 *
	 * console.log( source.length ); // 2
	 * console.log( target.length ); // 1
	 * ```
	 *
	 * **Note**: {@link #clear} can be used to break the binding.
	 *
	 * @typeParam S The type of `externalCollection` element.
	 * @param externalCollection A collection to be bound.
	 * @returns The binding chain object.
	 */ bindTo(externalCollection) {
        if (this._bindToCollection) {
            /**
			 * The collection cannot be bound more than once.
			 *
			 * @error collection-bind-to-rebind
			 */ throw new CKEditorError('collection-bind-to-rebind', this);
        }
        this._bindToCollection = externalCollection;
        return {
            as: (Class)=>{
                this._setUpBindToBinding((item)=>new Class(item));
            },
            using: (callbackOrProperty)=>{
                if (typeof callbackOrProperty == 'function') {
                    this._setUpBindToBinding(callbackOrProperty);
                } else {
                    this._setUpBindToBinding((item)=>item[callbackOrProperty]);
                }
            }
        };
    }
    /**
	 * Finalizes and activates a binding initiated by {@link #bindTo}.
	 *
	 * @param factory A function which produces collection items.
	 */ _setUpBindToBinding(factory) {
        const externalCollection = this._bindToCollection;
        // Adds the item to the collection once a change has been done to the external collection.
        const addItem = (evt, externalItem, index)=>{
            const isExternalBoundToThis = externalCollection._bindToCollection == this;
            const externalItemBound = externalCollection._bindToInternalToExternalMap.get(externalItem);
            // If an external collection is bound to this collection, which makes it a 2–way binding,
            // and the particular external collection item is already bound, don't add it here.
            // The external item has been created **out of this collection's item** and (re)adding it will
            // cause a loop.
            if (isExternalBoundToThis && externalItemBound) {
                this._bindToExternalToInternalMap.set(externalItem, externalItemBound);
                this._bindToInternalToExternalMap.set(externalItemBound, externalItem);
            } else {
                const item = factory(externalItem);
                // When there is no item we need to remember skipped index first and then we can skip this item.
                if (!item) {
                    this._skippedIndexesFromExternal.push(index);
                    return;
                }
                // Lets try to put item at the same index as index in external collection
                // but when there are a skipped items in one or both collections we need to recalculate this index.
                let finalIndex = index;
                // When we try to insert item after some skipped items from external collection we need
                // to include this skipped items and decrease index.
                //
                // For the following example:
                // external -> [ 'A', 'B - skipped for internal', 'C - skipped for internal' ]
                // internal -> [ A ]
                //
                // Another item is been added at the end of external collection:
                // external.add( 'D' )
                // external -> [ 'A', 'B - skipped for internal', 'C - skipped for internal', 'D' ]
                //
                // We can't just add 'D' to internal at the same index as index in external because
                // this will produce empty indexes what is invalid:
                // internal -> [ 'A', empty, empty, 'D' ]
                //
                // So we need to include skipped items and decrease index
                // internal -> [ 'A', 'D' ]
                for (const skipped of this._skippedIndexesFromExternal){
                    if (index > skipped) {
                        finalIndex--;
                    }
                }
                // We need to take into consideration that external collection could skip some items from
                // internal collection.
                //
                // For the following example:
                // internal -> [ 'A', 'B - skipped for external', 'C - skipped for external' ]
                // external -> [ A ]
                //
                // Another item is been added at the end of external collection:
                // external.add( 'D' )
                // external -> [ 'A', 'D' ]
                //
                // We need to include skipped items and place new item after them:
                // internal -> [ 'A', 'B - skipped for external', 'C - skipped for external', 'D' ]
                for (const skipped of externalCollection._skippedIndexesFromExternal){
                    if (finalIndex >= skipped) {
                        finalIndex++;
                    }
                }
                this._bindToExternalToInternalMap.set(externalItem, item);
                this._bindToInternalToExternalMap.set(item, externalItem);
                this.add(item, finalIndex);
                // After adding new element to internal collection we need update indexes
                // of skipped items in external collection.
                for(let i = 0; i < externalCollection._skippedIndexesFromExternal.length; i++){
                    if (finalIndex <= externalCollection._skippedIndexesFromExternal[i]) {
                        externalCollection._skippedIndexesFromExternal[i]++;
                    }
                }
            }
        };
        // Load the initial content of the collection.
        for (const externalItem of externalCollection){
            addItem(null, externalItem, externalCollection.getIndex(externalItem));
        }
        // Synchronize the with collection as new items are added.
        this.listenTo(externalCollection, 'add', addItem);
        // Synchronize the with collection as new items are removed.
        this.listenTo(externalCollection, 'remove', (evt, externalItem, index)=>{
            const item = this._bindToExternalToInternalMap.get(externalItem);
            if (item) {
                this.remove(item);
            }
            // After removing element from external collection we need update/remove indexes
            // of skipped items in internal collection.
            this._skippedIndexesFromExternal = this._skippedIndexesFromExternal.reduce((result, skipped)=>{
                if (index < skipped) {
                    result.push(skipped - 1);
                }
                if (index > skipped) {
                    result.push(skipped);
                }
                return result;
            }, []);
        });
    }
    /**
	 * Returns an unique id property for a given `item`.
	 *
	 * The method will generate new id and assign it to the `item` if it doesn't have any.
	 *
	 * @param item Item to be added.
	 */ _getItemIdBeforeAdding(item) {
        const idProperty = this._idProperty;
        let itemId;
        if (idProperty in item) {
            itemId = item[idProperty];
            if (typeof itemId != 'string') {
                /**
				 * This item's ID should be a string.
				 *
				 * @error collection-add-invalid-id
				 */ throw new CKEditorError('collection-add-invalid-id', this);
            }
            if (this.get(itemId)) {
                /**
				 * This item already exists in the collection.
				 *
				 * @error collection-add-item-already-exists
				 */ throw new CKEditorError('collection-add-item-already-exists', this);
            }
        } else {
            item[idProperty] = itemId = uid();
        }
        return itemId;
    }
    /**
	 * Core {@link #remove} method implementation shared in other functions.
	 *
	 * In contrast this method **does not** fire the {@link #event:change} event.
	 *
	 * @param subject The item to remove, its id or index in the collection.
	 * @returns Returns an array with the removed item and its index.
	 * @fires remove
	 */ _remove(subject) {
        let index, id, item;
        let itemDoesNotExist = false;
        const idProperty = this._idProperty;
        if (typeof subject == 'string') {
            id = subject;
            item = this._itemMap.get(id);
            itemDoesNotExist = !item;
            if (item) {
                index = this._items.indexOf(item);
            }
        } else if (typeof subject == 'number') {
            index = subject;
            item = this._items[index];
            itemDoesNotExist = !item;
            if (item) {
                id = item[idProperty];
            }
        } else {
            item = subject;
            id = item[idProperty];
            index = this._items.indexOf(item);
            itemDoesNotExist = index == -1 || !this._itemMap.get(id);
        }
        if (itemDoesNotExist) {
            /**
			 * Item not found.
			 *
			 * @error collection-remove-404
			 */ throw new CKEditorError('collection-remove-404', this);
        }
        this._items.splice(index, 1);
        this._itemMap.delete(id);
        const externalItem = this._bindToInternalToExternalMap.get(item);
        this._bindToInternalToExternalMap.delete(item);
        this._bindToExternalToInternalMap.delete(externalItem);
        this.fire('remove', item, index);
        return [
            item,
            index
        ];
    }
    /**
	 * Iterable interface.
	 */ [Symbol.iterator]() {
        return this._items[Symbol.iterator]();
    }
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/first
 */ /**
 * Returns first item of the given `iterator`.
 */ function first(iterator) {
    const iteratorItem = iterator.next();
    if (iteratorItem.done) {
        return null;
    }
    return iteratorItem.value;
}

/**
 * Allows observing a group of DOM `Element`s or {@link module:ui/view~View view instances} whether at least one of them (or their child)
 * is focused.
 *
 * Used by the {@link module:core/editor/editor~Editor} in order to track whether the focus is still within the application,
 * or were used outside of its UI.
 *
 * **Note** `focus` and `blur` listeners use event capturing, so it is only needed to register wrapper `Element`
 * which contain other `focusable` elements. But note that this wrapper element has to be focusable too
 * (have e.g. `tabindex="-1"`).
 *
 * Check out the {@glink framework/deep-dive/ui/focus-tracking "Deep dive into focus tracking"} guide to learn more.
 */ class FocusTracker extends /* #__PURE__ */ DomEmitterMixin(/* #__PURE__ */ ObservableMixin()) {
    /**
	 * List of registered DOM elements.
	 *
	 * @internal
	 */ _elements = new Set();
    /**
	 * List of views with external focus trackers that contribute to the state of this focus tracker.
	 *
	 * @internal
	 */ _externalViews = new Set();
    /**
	 * Asynchronous blur event timeout.
	 */ _blurTimeout = null;
    // @if CK_DEBUG_FOCUSTRACKER // public _label?: string;
    constructor(){
        super();
        this.set('isFocused', false);
        this.set('focusedElement', null);
    // @if CK_DEBUG_FOCUSTRACKER // FocusTracker._instances.push( this );
    }
    /**
	 * List of registered DOM elements.
	 *
	 * **Note**: The list does do not include elements from {@link #externalViews}.
	 */ get elements() {
        return Array.from(this._elements.values());
    }
    /**
	 * List of external focusable views that contribute to the state of this focus tracker. See {@link #add} to learn more.
	 */ get externalViews() {
        return Array.from(this._externalViews.values());
    }
    /**
	 * Starts tracking a specified DOM element or a {@link module:ui/view~View} instance.
	 *
	 * * If a DOM element is passed, the focus tracker listens to the `focus` and `blur` events on this element.
	 * Tracked elements are listed in {@link #elements}.
	 * * If a {@link module:ui/view~View} instance is passed that has a `FocusTracker` instance ({@link ~ViewWithFocusTracker}),
	 * the external focus tracker's state ({@link #isFocused}, {@link #focusedElement}) starts contributing to the current tracker instance.
	 * This allows for increasing the "reach" of a focus tracker instance, by connecting two or more focus trackers together when DOM
	 * elements they track are located in different subtrees in DOM. External focus trackers are listed in {@link #externalViews}.
	 * * If a {@link module:ui/view~View} instance is passed that has no `FocusTracker` (**not** a {@link ~ViewWithFocusTracker}),
	 * its {@link module:ui/view~View#element} is used to track focus like any other DOM element.
	 */ add(elementOrView) {
        if (isElement(elementOrView)) {
            this._addElement(elementOrView);
        } else {
            if (isViewWithFocusTracker(elementOrView)) {
                this._addView(elementOrView);
            } else {
                if (!elementOrView.element) {
                    /**
					 * The {@link module:ui/view~View} added to the {@link module:utils/focustracker~FocusTracker} does not have an
					 * {@link module:ui/view~View#element}. Make sure the view is {@link module:ui/view~View#render} before adding
					 * it to the focus tracker.
					 *
					 * @error focustracker-add-view-missing-element
					 */ throw new CKEditorError('focustracker-add-view-missing-element', {
                        focusTracker: this,
                        view: elementOrView
                    });
                }
                this._addElement(elementOrView.element);
            }
        }
    }
    /**
	 * Stops tracking focus in the specified DOM element or a {@link module:ui/view~View view instance}. See {@link #add} to learn more.
	 */ remove(elementOrView) {
        if (isElement(elementOrView)) {
            this._removeElement(elementOrView);
        } else {
            if (isViewWithFocusTracker(elementOrView)) {
                this._removeView(elementOrView);
            } else {
                // Assuming that if the view was successfully added, it must have come with an existing #element.
                this._removeElement(elementOrView.element);
            }
        }
    }
    /**
	 * Adds a DOM element to the focus tracker and starts listening to the `focus` and `blur` events on it.
	 */ _addElement(element) {
        if (this._elements.has(element)) {
            /**
			 * This element is already tracked by {@link module:utils/focustracker~FocusTracker}.
			 *
			 * @error focustracker-add-element-already-exist
			 */ throw new CKEditorError('focustracker-add-element-already-exist', this);
        }
        this.listenTo(element, 'focus', ()=>{
            // @if CK_DEBUG_FOCUSTRACKER // console.log( `"${ getName( this ) }": Focus with useCapture on DOM element` );
            const externalFocusedViewInSubtree = this.externalViews.find((view)=>isExternalViewSubtreeFocused(element, view));
            if (externalFocusedViewInSubtree) {
                this._focus(externalFocusedViewInSubtree.element);
            } else {
                this._focus(element);
            }
        }, {
            useCapture: true
        });
        this.listenTo(element, 'blur', ()=>{
            // @if CK_DEBUG_FOCUSTRACKER // console.log( `"${ getName( this ) }": Blur with useCapture on DOM element` );
            this._blur();
        }, {
            useCapture: true
        });
        this._elements.add(element);
    }
    /**
	 * Removes a DOM element from the focus tracker.
	 */ _removeElement(element) {
        if (this._elements.has(element)) {
            this.stopListening(element);
            this._elements.delete(element);
        }
        if (element === this.focusedElement) {
            this._blur();
        }
    }
    /**
	 * Adds an external {@link module:ui/view~View view instance} to this focus tracker and makes it contribute to this focus tracker's
	 * state either by its `View#element` or by its `View#focusTracker` instance.
	 */ _addView(view) {
        if (view.element) {
            this._addElement(view.element);
        }
        this.listenTo(view.focusTracker, 'change:focusedElement', ()=>{
            // @if CK_DEBUG_FOCUSTRACKER // console.log(
            // @if CK_DEBUG_FOCUSTRACKER // 	`"${ getName( this ) }": Related "${ getName( view.focusTracker ) }"#focusedElement = `,
            // @if CK_DEBUG_FOCUSTRACKER // 	view.focusTracker.focusedElement
            // @if CK_DEBUG_FOCUSTRACKER // );
            if (view.focusTracker.focusedElement) {
                if (view.element) {
                    this._focus(view.element);
                }
            } else {
                this._blur();
            }
        });
        this._externalViews.add(view);
    }
    /**
	 * Removes an external {@link module:ui/view~View view instance} from this focus tracker.
	 */ _removeView(view) {
        if (view.element) {
            this._removeElement(view.element);
        }
        this.stopListening(view.focusTracker);
        this._externalViews.delete(view);
    }
    /**
	 * Destroys the focus tracker by:
	 * - Disabling all event listeners attached to tracked elements or external views.
	 * - Removing all tracked elements and views that were previously added.
	 */ destroy() {
        this.stopListening();
        this._elements.clear();
        this._externalViews.clear();
        this.isFocused = false;
        this.focusedElement = null;
    }
    /**
	 * Stores currently focused element as {@link #focusedElement} and sets {@link #isFocused} `true`.
	 */ _focus(element) {
        // @if CK_DEBUG_FOCUSTRACKER // console.log( `"${ getName( this ) }": _focus() on element`, element );
        this._clearBlurTimeout();
        this.focusedElement = element;
        this.isFocused = true;
    }
    /**
	 * Clears currently {@link #focusedElement} and sets {@link #isFocused} `false`.
	 *
	 * This method uses `setTimeout()` to change order of `blur` and `focus` events calls, ensuring that moving focus between
	 * two elements within a single focus tracker's scope, will not cause `[ blurA, focusB ]` sequence but just `[ focusB ]`.
	 * The former would cause a momentary change of `#isFocused` to `false` which is not desired because any logic listening to
	 * a focus tracker state would experience UI flashes and glitches as the user focus travels across the UI.
	 */ _blur() {
        const isAnyElementFocused = this.elements.find((element)=>element.contains(document.activeElement));
        // Avoid blurs originating from external FTs when the focus still remains in one of the #elements.
        if (isAnyElementFocused) {
            return;
        }
        const isAnyExternalViewFocused = this.externalViews.find((view)=>{
            // Do not consider external views's focus trackers as focused if there's a blur timeout pending.
            return view.focusTracker.isFocused && !view.focusTracker._blurTimeout;
        });
        // Avoid unnecessary DOM blurs coming from #elements when the focus still remains in one of #externalViews.
        if (isAnyExternalViewFocused) {
            return;
        }
        this._clearBlurTimeout();
        this._blurTimeout = setTimeout(()=>{
            // @if CK_DEBUG_FOCUSTRACKER // console.log( `"${ getName( this ) }": Blur.` );
            this.focusedElement = null;
            this.isFocused = false;
        }, 0);
    }
    /**
	 * Clears the asynchronous blur event timeout on demand. See {@link #_blur} to learn more.
	 */ _clearBlurTimeout() {
        clearTimeout(this._blurTimeout);
        this._blurTimeout = null;
    }
}
/**
 * Checks whether a view is an instance of {@link ~ViewWithFocusTracker}.
 */ function isViewWithFocusTracker(view) {
    return 'focusTracker' in view && view.focusTracker instanceof FocusTracker;
}
function isElement(value) {
    return isElement$1(value);
}
function isExternalViewSubtreeFocused(subTreeRoot, view) {
    if (isFocusedView(subTreeRoot, view)) {
        return true;
    }
    return !!view.focusTracker.externalViews.find((view)=>isFocusedView(subTreeRoot, view));
}
function isFocusedView(subTreeRoot, view) {
    // Note: You cannot depend on externalView.focusTracker.focusedElement because blurs are asynchronous and the value may
    // be outdated when moving focus between two elements. Using document.activeElement instead.
    return !!view.element && view.element.contains(document.activeElement) && subTreeRoot.contains(view.element);
} // @if CK_DEBUG_FOCUSTRACKER // declare global {
 // @if CK_DEBUG_FOCUSTRACKER // 	interface Window {
 // @if CK_DEBUG_FOCUSTRACKER // 		logFocusTrackers: Function;
 // @if CK_DEBUG_FOCUSTRACKER // 	}
 // @if CK_DEBUG_FOCUSTRACKER // }
 // @if CK_DEBUG_FOCUSTRACKER //
 // @if CK_DEBUG_FOCUSTRACKER // function getName( focusTracker: FocusTracker ): string {
 // @if CK_DEBUG_FOCUSTRACKER // 	return focusTracker._label || 'Unknown';
 // @if CK_DEBUG_FOCUSTRACKER // }
 // @if CK_DEBUG_FOCUSTRACKER //
 // @if CK_DEBUG_FOCUSTRACKER // function logState(
 // @if CK_DEBUG_FOCUSTRACKER // 	focusTracker: FocusTracker,
 // @if CK_DEBUG_FOCUSTRACKER // 	keysToLog: Array<string> = [ 'isFocused', 'focusedElement' ]
 // @if CK_DEBUG_FOCUSTRACKER // ): string {
 // @if CK_DEBUG_FOCUSTRACKER // 	keysToLog.forEach( key => { console.log( `${ key }=`, focusTracker[ key ] ) } );
 // @if CK_DEBUG_FOCUSTRACKER // 	console.log( 'elements', focusTracker.elements );
 // @if CK_DEBUG_FOCUSTRACKER // 	console.log( 'externalViews', focusTracker.externalViews );
 // @if CK_DEBUG_FOCUSTRACKER // }
 // @if CK_DEBUG_FOCUSTRACKER //
 // @if CK_DEBUG_FOCUSTRACKER // window.logFocusTrackers = (
 // @if CK_DEBUG_FOCUSTRACKER // 	filter = () => true,
 // @if CK_DEBUG_FOCUSTRACKER // 	keysToLog: Array<string>
 // @if CK_DEBUG_FOCUSTRACKER // ): void => {
 // @if CK_DEBUG_FOCUSTRACKER // 	console.group( 'FocusTrackers' );
 // @if CK_DEBUG_FOCUSTRACKER //
 // @if CK_DEBUG_FOCUSTRACKER // 	for ( const focusTracker of FocusTracker._instances ) {
 // @if CK_DEBUG_FOCUSTRACKER // 		if ( filter( focusTracker ) ) {
 // @if CK_DEBUG_FOCUSTRACKER // 			console.group( `"${ getName( focusTracker ) }"` );
 // @if CK_DEBUG_FOCUSTRACKER // 			logState( focusTracker, keysToLog );
 // @if CK_DEBUG_FOCUSTRACKER // 			console.groupEnd();
 // @if CK_DEBUG_FOCUSTRACKER // 		}
 // @if CK_DEBUG_FOCUSTRACKER // 	}
 // @if CK_DEBUG_FOCUSTRACKER //
 // @if CK_DEBUG_FOCUSTRACKER // 	console.groupEnd();
 // @if CK_DEBUG_FOCUSTRACKER // };
 // @if CK_DEBUG_FOCUSTRACKER //
 // @if CK_DEBUG_FOCUSTRACKER // window.logFocusTrackerTree = (
 // @if CK_DEBUG_FOCUSTRACKER // 	rootFocusTracker: FocusTracker,
 // @if CK_DEBUG_FOCUSTRACKER // 	filter = () => true,
 // @if CK_DEBUG_FOCUSTRACKER // 	keysToLog: Array<string>
 // @if CK_DEBUG_FOCUSTRACKER // ): void => {
 // @if CK_DEBUG_FOCUSTRACKER // 	console.group( 'FocusTrackers tree' );
 // @if CK_DEBUG_FOCUSTRACKER //
 // @if CK_DEBUG_FOCUSTRACKER // 	logBranch( rootFocusTracker, filter );
 // @if CK_DEBUG_FOCUSTRACKER //
 // @if CK_DEBUG_FOCUSTRACKER // 	function logBranch( focusTracker, filter ) {
 // @if CK_DEBUG_FOCUSTRACKER // 		console.group( `"${ getName( focusTracker ) }"` );
 // @if CK_DEBUG_FOCUSTRACKER // 		logState( focusTracker, keysToLog );
 // @if CK_DEBUG_FOCUSTRACKER //
 // @if CK_DEBUG_FOCUSTRACKER // 		for ( const externalView of focusTracker.externalViews ) {
 // @if CK_DEBUG_FOCUSTRACKER // 			if ( filter( externalView.focusTracker ) ) {
 // @if CK_DEBUG_FOCUSTRACKER // 				logBranch( externalView.focusTracker, filter );
 // @if CK_DEBUG_FOCUSTRACKER // 			}
 // @if CK_DEBUG_FOCUSTRACKER // 		}
 // @if CK_DEBUG_FOCUSTRACKER //
 // @if CK_DEBUG_FOCUSTRACKER // 		console.groupEnd();
 // @if CK_DEBUG_FOCUSTRACKER // 	}
 // @if CK_DEBUG_FOCUSTRACKER //
 // @if CK_DEBUG_FOCUSTRACKER // 	console.groupEnd();
 // @if CK_DEBUG_FOCUSTRACKER // };

/**
 * Keystroke handler allows registering callbacks for given keystrokes.
 *
 * The most frequent use of this class is through the {@link module:core/editor/editor~Editor#keystrokes `editor.keystrokes`}
 * property. It allows listening to keystrokes executed in the editing view:
 *
 * ```ts
 * editor.keystrokes.set( 'Ctrl+A', ( keyEvtData, cancel ) => {
 * 	console.log( 'Ctrl+A has been pressed' );
 * 	cancel();
 * } );
 * ```
 *
 * However, this utility class can be used in various part of the UI. For instance, a certain {@link module:ui/view~View}
 * can use it like this:
 *
 * ```ts
 * class MyView extends View {
 * 	constructor() {
 * 		this.keystrokes = new KeystrokeHandler();
 *
 * 		this.keystrokes.set( 'tab', handleTabKey );
 * 	}
 *
 * 	render() {
 * 		super.render();
 *
 * 		this.keystrokes.listenTo( this.element );
 * 	}
 * }
 * ```
 *
 * That keystroke handler will listen to `keydown` events fired in this view's main element.
 *
 */ class KeystrokeHandler {
    /**
	 * Listener used to listen to events for easier keystroke handler destruction.
	 */ _listener;
    /**
	 * Creates an instance of the keystroke handler.
	 */ constructor(){
        this._listener = new (DomEmitterMixin())();
    }
    /**
	 * Starts listening for `keydown` events from a given emitter.
	 */ listenTo(emitter) {
        // The #_listener works here as a kind of dispatcher. It groups the events coming from the same
        // keystroke so the listeners can be attached to them with different priorities.
        //
        // E.g. all the keystrokes with the `keyCode` of 42 coming from the `emitter` are propagated
        // as a `_keydown:42` event by the `_listener`. If there's a callback created by the `set`
        // method for this 42 keystroke, it listens to the `_listener#_keydown:42` event only and interacts
        // only with other listeners of this particular event, thus making it possible to prioritize
        // the listeners and safely cancel execution, when needed. Instead of duplicating the Emitter logic,
        // the KeystrokeHandler re–uses it to do its job.
        this._listener.listenTo(emitter, 'keydown', (evt, keyEvtData)=>{
            this._listener.fire('_keydown:' + getCode(keyEvtData), keyEvtData);
        });
    }
    /**
	 * Registers a handler for the specified keystroke.
	 *
	 * @param keystroke Keystroke defined in a format accepted by
	 * the {@link module:utils/keyboard~parseKeystroke} function.
	 * @param callback A function called with the
	 * {@link module:engine/view/observer/keyobserver~KeyEventData key event data} object and
	 * a helper function to call both `preventDefault()` and `stopPropagation()` on the underlying event.
	 * @param options Additional options.
	 */ set(keystroke, callback, options = {}) {
        const keyCode = parseKeystroke(keystroke);
        const priority = options.priority;
        // Execute the passed callback on KeystrokeHandler#_keydown.
        // TODO: https://github.com/ckeditor/ckeditor5-utils/issues/144
        this._listener.listenTo(this._listener, '_keydown:' + keyCode, (evt, keyEvtData)=>{
            if (options.filter && !options.filter(keyEvtData)) {
                return;
            }
            callback(keyEvtData, ()=>{
                // Stop the event in the DOM: no listener in the web page
                // will be triggered by this event.
                keyEvtData.preventDefault();
                keyEvtData.stopPropagation();
                // Stop the event in the KeystrokeHandler: no more callbacks
                // will be executed for this keystroke.
                evt.stop();
            });
            // Mark this keystroke as handled by the callback. See: #press.
            evt.return = true;
        }, {
            priority
        });
    }
    /**
	 * Triggers a keystroke handler for a specified key combination, if such a keystroke was {@link #set defined}.
	 *
	 * @param keyEvtData Key event data.
	 * @returns Whether the keystroke was handled.
	 */ press(keyEvtData) {
        return !!this._listener.fire('_keydown:' + getCode(keyEvtData), keyEvtData);
    }
    /**
	 * Stops listening to `keydown` events from the given emitter.
	 */ stopListening(emitter) {
        this._listener.stopListening(emitter);
    }
    /**
	 * Destroys the keystroke handler.
	 */ destroy() {
        this.stopListening();
    }
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/objecttomap
 */ /**
 * Transforms object to map.
 *
 * ```ts
 * const map = objectToMap( { 'foo': 1, 'bar': 2 } );
 * map.get( 'foo' ); // 1
 * ```
 *
 * **Note**: For mixed data (`Object` or `Iterable`) there's a dedicated {@link module:utils/tomap~toMap} function.
 *
 * @param obj Object to transform.
 * @returns Map created from object.
 */ function objectToMap(obj) {
    const map = new Map();
    for(const key in obj){
        map.set(key, obj[key]);
    }
    return map;
}

/**
 * Transforms object or iterable to map. Iterable needs to be in the format acceptable by the `Map` constructor.
 *
 * ```ts
 * map = toMap( { 'foo': 1, 'bar': 2 } );
 * map = toMap( [ [ 'foo', 1 ], [ 'bar', 2 ] ] );
 * map = toMap( anotherMap );
 * ```
 *
 * @param data Object or iterable to transform.
 * @returns Map created from data.
 */ function toMap(data) {
    if (isIterable(data)) {
        return new Map(data);
    } else {
        return objectToMap(data);
    }
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/wait
 */ /**
 * Returns a promise that is resolved after the specified time.
 *
 * @param timeout The time in milliseconds to wait.
 * @param options.signal A signal to abort the waiting.
 */ function wait(timeout, options = {}) {
    return new Promise((resolve, reject)=>{
        const signal = options.signal || new AbortController().signal;
        signal.throwIfAborted();
        const timer = setTimeout(timeoutHandler, timeout);
        signal.addEventListener('abort', abortHandler, {
            once: true
        });
        function timeoutHandler() {
            signal.removeEventListener('abort', abortHandler);
            resolve();
        }
        function abortHandler() {
            clearTimeout(timer);
            reject(signal.reason);
        }
    });
}

/**
 * Tries calling the given callback until it sucessfully resolves.
 *
 * If the callback fails `maxAttempts` times, the returned promise is rejected with the last error.
 *
 * @typeParam TResult The result of a successful callback invocation.
 * @param callback The function to call until it succeeds.
 * @param options Configuration options.
 * @param options.maxAttempts Maximum number of attempts.
 * @param options.retryDelay The time in milliseconds between attempts. By default it implements exponential back-off policy.
 * @param options.signal The signal to abort further retries. The callback itself is not aborted automatically.
 */ async function retry(callback, options = {}) {
    const { maxAttempts = 4, retryDelay = exponentialDelay(), signal = new AbortController().signal } = options;
    signal.throwIfAborted();
    for(let attempt = 0;; attempt++){
        try {
            return await callback();
        } catch (err) {
            const isLast = attempt + 1 >= maxAttempts;
            if (isLast) {
                throw err;
            }
        }
        await wait(retryDelay(attempt), {
            signal
        });
    }
}
/**
 * Creates a function that calculates exponential back-off delay. Pass it as `options.retryDelay` to {@link ~retry}.
 *
 * @param options.delay Base delay between invocations. Defaults to 1s.
 * @param options.factor How much to increase the delay. Defaults to 2x.
 * @param options.maxDelay Maximum timeout. Even if higher timeout is calculated, it cannot get higher than this value. Default to 10s.
 * @returns The function calculating the delay.
 */ function exponentialDelay(options = {}) {
    const { delay = 1000, factor = 2, maxDelay = 10000 } = options;
    return (attempt)=>Math.min(factor ** attempt * delay, maxDelay);
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/splicearray
 */ /**
 * Splices one array into another. To be used instead of `Array.prototype.splice` for better
 * performance and because the latter may throw "Maximum call stack size exceeded" error when
 * passing huge number of items to insert.
 *
 * ```ts
 * spliceArray( [ 1, 2 ], [ 3, 4 ], 0 );	// [ 3, 4, 1, 2 ]
 * spliceArray( [ 1, 2 ], [ 3, 4 ], 1 );	// [ 1, 3, 4, 2 ]
 * spliceArray( [ 1, 2 ], [ 3, 4 ], 2 );	// [ 1, 2, 3, 4 ]
 * spliceArray( [ 1, 2 ], [],       0 );	// [ 1, 2 ]
 * ```
 *
 * @param targetArray Array to be spliced.
 * @param insertArray Array of elements to be inserted to target.
 * @param index Index at which nodes should be inserted.
 *
 * @returns New spliced array.
 */ function spliceArray(targetArray, insertArray, index) {
    const originalLength = targetArray.length;
    const insertLength = insertArray.length;
    // Shift elements in the target array to make space for insertArray
    for(let i = originalLength - 1; i >= index; i--){
        targetArray[i + insertLength] = targetArray[i];
    }
    // Copy elements from insertArray into the target array
    for(let i = 0; i < insertLength; i++){
        targetArray[index + i] = insertArray[i];
    }
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/delay
 */ /* globals setTimeout, clearTimeout */ /**
 * Returns a function wrapper that will trigger a function after a specified wait time.
 * The timeout can be canceled by calling the cancel function on the returned wrapped function.
 *
 * @param func The function to wrap.
 * @param wait The timeout in ms.
 */ function delay(func, wait) {
    let timer;
    function delayed(...args) {
        delayed.cancel();
        timer = setTimeout(()=>func(...args), wait);
    }
    delayed.cancel = ()=>{
        clearTimeout(timer);
    };
    return delayed;
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/parsebase64encodedobject
 */ /**
 * Parses a base64-encoded object and returns the decoded object, or null if the decoding was unsuccessful.
 */ function parseBase64EncodedObject(encoded) {
    try {
        if (!encoded.startsWith('ey')) {
            return null;
        }
        const decoded = atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded);
    } catch (e) {
        return null;
    }
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/crc32
 */ /**
 * Generates a CRC lookup table.
 * This function creates and returns a 256-element array of pre-computed CRC values for quick CRC calculation.
 * It uses the polynomial 0xEDB88320 to compute each value in the loop, optimizing future CRC calculations.
 */ function makeCrcTable() {
    const crcTable = [];
    for(let n = 0; n < 256; n++){
        let c = n;
        for(let k = 0; k < 8; k++){
            if (c & 1) {
                c = 0xEDB88320 ^ c >>> 1;
            } else {
                c = c >>> 1;
            }
        }
        crcTable[n] = c;
    }
    return crcTable;
}
/**
 * Calculates CRC-32 checksum for a given inputData to verify the integrity of data.
 *
 * @param inputData Accepts a single value (string, number, boolean), an array of strings, or an array of all of the above types.
 * Non-string values are converted to strings before calculating the checksum.
 * The checksum calculation is based on the concatenated string representation of the input values:
 * * `crc32('foo')` is equivalent to `crc32(['foo'])`
 * * `crc32(123)` is equivalent to `crc32(['123'])`
 * * `crc32(true)` is equivalent to `crc32(['true'])`
 * * `crc32(['foo', 123, true])` produces the same result as `crc32('foo123true')`
 * * Nested arrays of strings are flattened, so `crc32([['foo', 'bar'], 'baz'])` is equivalent to `crc32(['foobar', 'baz'])`
 *
 * @returns The CRC-32 checksum, returned as a hexadecimal string.
 */ function crc32(inputData) {
    const dataArray = Array.isArray(inputData) ? inputData : [
        inputData
    ];
    const crcTable = makeCrcTable();
    let crc = 0 ^ -1;
    // Convert data to a single string.
    const dataString = dataArray.map((item)=>{
        if (Array.isArray(item)) {
            return item.join('');
        }
        return String(item);
    }).join('');
    // Calculate the CRC for the resulting string.
    for(let i = 0; i < dataString.length; i++){
        const byte = dataString.charCodeAt(i);
        crc = crc >>> 8 ^ crcTable[(crc ^ byte) & 0xFF];
    }
    crc = (crc ^ -1) >>> 0; // Force unsigned integer.
    return crc.toString(16).padStart(8, '0');
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * @module utils/collectstylesheets
 */ /**
 * A helper function for getting concatenated CSS rules from external stylesheets.
 *
 * @param stylesheets An array of stylesheet paths delivered by the user through the plugin configuration.
 */ async function collectStylesheets(stylesheets) {
    if (!stylesheets) {
        return '';
    }
    const results = await Promise.all(stylesheets.map(async (stylesheet)=>{
        if (stylesheet === 'EDITOR_STYLES') {
            return getEditorStyles();
        }
        const response = await window.fetch(stylesheet);
        return response.text();
    }));
    return results.join(' ').trim();
}
/**
 * A helper function for getting the basic editor content styles for the `.ck-content` class
 * and all CSS variables defined in the document.
 */ function getEditorStyles() {
    const editorStyles = [];
    const editorCSSVariables = [];
    for (const styleSheet of Array.from(document.styleSheets)){
        const ownerNode = styleSheet.ownerNode;
        if (ownerNode.hasAttribute('data-cke')) {
            for (const rule of Array.from(styleSheet.cssRules)){
                if (rule.cssText.indexOf('.ck-content') !== -1) {
                    editorStyles.push(rule.cssText);
                } else if (rule.cssText.indexOf(':root') !== -1) {
                    editorCSSVariables.push(rule.cssText);
                }
            }
        }
    }
    if (!editorStyles.length) {
        console.warn('The editor stylesheet could not be found in the document. ' + 'Check your webpack config - style-loader should use data-cke=true attribute for the editor stylesheet.');
    }
    // We want to trim the returned value in case of `[ "", "", ... ]`.
    return [
        ...editorCSSVariables,
        ...editorStyles
    ].join(' ').trim();
}

/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */ /**
 * Set of utils to handle unicode characters.
 *
 * @module utils/unicode
 */ /**
 * Checks whether given `character` is a combining mark.
 *
 * @param character Character to check.
 */ function isCombiningMark(character) {
    // eslint-disable-next-line no-misleading-character-class
    return !!character && character.length == 1 && /[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/.test(character);
}
/**
 * Checks whether given `character` is a high half of surrogate pair.
 *
 * Using UTF-16 terminology, a surrogate pair denotes UTF-16 character using two UTF-8 characters. The surrogate pair
 * consist of high surrogate pair character followed by low surrogate pair character.
 *
 * @param character Character to check.
 */ function isHighSurrogateHalf(character) {
    return !!character && character.length == 1 && /[\ud800-\udbff]/.test(character);
}
/**
 * Checks whether given `character` is a low half of surrogate pair.
 *
 * Using UTF-16 terminology, a surrogate pair denotes UTF-16 character using two UTF-8 characters. The surrogate pair
 * consist of high surrogate pair character followed by low surrogate pair character.
 *
 * @param character Character to check.
 */ function isLowSurrogateHalf(character) {
    return !!character && character.length == 1 && /[\udc00-\udfff]/.test(character);
}
/**
 * Checks whether given offset in a string is inside a surrogate pair (between two surrogate halves).
 *
 * @param string String to check.
 * @param offset Offset to check.
 */ function isInsideSurrogatePair(string, offset) {
    return isHighSurrogateHalf(string.charAt(offset - 1)) && isLowSurrogateHalf(string.charAt(offset));
}
/**
 * Checks whether given offset in a string is between base character and combining mark or between two combining marks.
 *
 * @param string String to check.
 * @param offset Offset to check.
 */ function isInsideCombinedSymbol(string, offset) {
    return isCombiningMark(string.charAt(offset));
}
const EMOJI_PATTERN = /* #__PURE__ */ buildEmojiRegexp();
/**
 * Checks whether given offset in a string is inside multi-character emoji sequence.
 *
 * @param string String to check.
 * @param offset Offset to check.
 */ function isInsideEmojiSequence(string, offset) {
    const matches = String(string).matchAll(EMOJI_PATTERN);
    return Array.from(matches).some((match)=>match.index < offset && offset < match.index + match[0].length);
}
function buildEmojiRegexp() {
    const parts = [
        // Emoji Tag Sequence (ETS)
        /\p{Emoji}[\u{E0020}-\u{E007E}]+\u{E007F}/u,
        // Emoji Keycap Sequence
        /\p{Emoji}\u{FE0F}?\u{20E3}/u,
        // Emoji Presentation Sequence
        /\p{Emoji}\u{FE0F}/u,
        // Single-Character Emoji / Emoji Modifier Sequence
        /(?=\p{General_Category=Other_Symbol})\p{Emoji}\p{Emoji_Modifier}*/u
    ];
    const flagSequence = /\p{Regional_Indicator}{2}/u.source;
    const emoji = '(?:' + parts.map((part)=>part.source).join('|') + ')';
    const sequence = `${flagSequence}|${emoji}(?:\u{200D}${emoji})*`;
    return new RegExp(sequence, 'ug');
}

export { CKEditorError, Collection, Config, DomEmitterMixin, ElementReplacer, EmitterMixin, EventInfo, FocusTracker, KeystrokeHandler, Locale, ObservableMixin, Rect, ResizeObserver, abortableDebounce, add, collectStylesheets, compareArrays, count, crc32, createElement, delay, diff, diffToChanges, env, exponentialDelay, fastDiff, findClosestScrollableAncestor, first, getAncestors, getBorderWidths, getCode, getDataFromElement, getEnvKeystrokeText, getLanguageDirection, getLocalizedArrowKeyCodeDirection, getOptimalPosition, getRangeFromMouseEvent, getVisualViewportOffset, global, indexOf, insertAt, insertToPriorityArray, isArrowKeyCode, isCombiningMark, isComment, isForwardArrowKeyCode, isHighSurrogateHalf, isInsideCombinedSymbol, isInsideEmojiSequence, isInsideSurrogatePair, isIterable, isLowSurrogateHalf, isNode, isRange, isText, isValidAttributeName, isViewWithFocusTracker, isVisible, keyCodes, logError, logWarning, mix, parseBase64EncodedObject, parseKeystroke, priorities, releaseDate, remove, retry, scrollAncestorsToShowTarget, scrollViewportToShowTarget, setDataInElement, spliceArray, toArray, toMap, toUnit, uid, version, wait };
//# sourceMappingURL=index.js.map
