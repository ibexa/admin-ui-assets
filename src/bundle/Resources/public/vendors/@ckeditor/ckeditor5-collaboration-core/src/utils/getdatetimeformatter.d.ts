/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module collaboration-core/utils/getdatetimeformatter
 * @publicApi
 */
import type { LocaleConfig } from '../config.js';
import { type Locale } from 'ckeditor5/src/utils.js';
/**
 * Returns a function that formats the date to the set format.
 *
 * The default formatting can be changed by setting a custom formatting function to `config.locale.dateTimeFormat`.
 *
 * ```ts
 * 	import { DateTime } from 'luxon';
 *
 *		ClassicEditor
 *			.create( document.querySelector( '#editor' ), {
 *				toolbar: {
 *					items: [ 'bold', 'italic', '|', 'comment' ]
 *				},
 *				sidebar: {
 *					container: document.querySelector( '#sidebar' )
 *				},
 *				locale: {
 *					dateTimeFormat: date => DateTime.fromJSDate( date ).toFormat( 'dd/LL/yyyy' )
 *				}
 *			} )
 *			.catch( error => console.error( error ) );
 * ```
 */
export default function getDateTimeFormatter(localeConfig?: LocaleConfig, locale?: Locale): (date: Date | string) => string;
