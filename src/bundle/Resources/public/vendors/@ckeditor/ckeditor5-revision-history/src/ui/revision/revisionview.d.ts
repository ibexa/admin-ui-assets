/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revision/revisionview
 */
import type { BaseEvent, Locale } from 'ckeditor5/src/utils.js';
import { View, type DropdownView } from 'ckeditor5/src/ui.js';
import RevisionNameView from './revisionnameview.js';
import '../../../theme/revision/revision.css';
import type Revision from '../../revision.js';
import type { RevisionAction } from '../revisionssidebar/revisionssidebar.js';
declare const RevisionView_base: import("ckeditor5/src/utils.js").Mixed<typeof View, import("@ckeditor/ckeditor5-collaboration-core/src/utils/confirmmixin.js").ConfirmApi>;
/**
 * TODO
 */
export default class RevisionView extends /* #__PURE__ -- @preserve */ RevisionView_base {
    id: string;
    revisionNameView: RevisionNameView;
    /**
     * It holds the revision actions drop-down view if actions are provided,
     * or just empty text otherwise.
     */
    revisionActionsView: DropdownView | '';
    /**
     * @observable
     */
    name: string;
    /**
     * @observable
     */
    createdAt: Date;
    /**
     * @observable
     */
    isSelected: boolean;
    /**
     * @observable
     */
    isHighlighted: boolean;
    /**
     * @observable
     */
    isActionsDropdownOpen: boolean;
    /**
     * @observable
     */
    isReady: boolean;
    /**
     * @observable
     */
    isEnabled: boolean;
    constructor(locale: Locale, revision: Revision, revisionActions: Array<RevisionAction>, requireRevisionName: boolean);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * TODO
     */
    select(): void;
    /**
     * TODO
     */
    deselect(): void;
    /**
     * TODO
     */
    highlight(): void;
    /**
     * TODO
     */
    unhighlight(): void;
}
/**
 * @eventName setName | revisionSetName
 */
export interface RevisionSetNameEvent extends BaseEvent {
    name: 'setName' | 'revisionSetName';
    args: [{
        id: string;
        name: string;
    }];
}
/**
 * @eventName select | revisionSelected
 */
export interface RevisionSelectedEvent extends BaseEvent {
    name: 'select' | 'revisionSelected';
    args: [{
        id: string;
    }];
}
export {};
