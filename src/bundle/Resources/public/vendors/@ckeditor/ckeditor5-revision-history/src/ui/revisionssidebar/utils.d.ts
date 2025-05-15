/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
export declare function getDateTimePeriodInfo(jsDate: Date, locale: string): DateTimePeriod;
export interface DateTimePeriod {
    startDate: Date;
    localizedPeriodName: string;
}
