/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/revisionviewer
 */
import { Plugin, Command, type Editor } from 'ckeditor5/src/core.js';
import { ContextualBalloon } from 'ckeditor5/src/ui.js';
import { Users } from 'ckeditor5-collaboration/src/collaboration-core.js';
import ChangeDetailsView from './ui/revisionviewer/changedetailsview.js';
import RevisionsRepository from './revisionsrepository.js';
import RevisionHistoryUtils from './revisionhistoryutils.js';
import ChangeItem from './changeitem.js';
import { default as RevisionDiff } from './revisiondiff.js';
import '../theme/revisionviewer.css';
import type { default as Revision, RevisionJSON } from './revision.js';
export default class RevisionViewer extends Plugin {
    repository: RevisionsRepository;
    /**
     * @observable
     */
    activeChange: ChangeItem | null;
    /**
     * @observable
     */
    activeView: ChangeDetailsView | null;
    /**
     * @observable
     */
    diff: RevisionDiff | null;
    /**
     * @observable
     */
    isReady: boolean;
    /**
     * @observable
     */
    isEnabled: boolean;
    /**
     * @observable
     */
    isNavigationMode: boolean;
    /**
     * @observable
     */
    currentChangeNumber: number;
    /**
     * @observable
     */
    numberOfChanges: number;
    static get pluginName(): "RevisionViewer";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    static get requires(): readonly [typeof Users, typeof ContextualBalloon, typeof RevisionsRepository, typeof RevisionHistoryUtils];
    constructor(editor: Editor);
    init(): void;
    /**
     * Returns document data for given revision.
     *
     * The document data is HTML or a different format, depending on the editor configuration.
     *
     * This method returns a promise which resolves with an object, where keys are root names and values are these roots' data. Most
     * editor setups use just one root, which has the default name `main`. In this case, the promise will resolve with an object
     * similar to this:
     *
     * ```ts
     * { main: "<p>Sample document data.</p>" }
     * ```
     *
     * If the adapter integration is used, this method will automatically load necessary
     * {@link module:revision-history/revision~Revision#diffData `Revision#diffData`} if it is missing.
     *
     * Please note, that the data returned by this method uses
     * {@link module:engine/dataprocessor/dataprocessor~DataProcessor#useFillerType marked fillers mode}. This means that some `&nbsp;`
     * characters in the returned data may be wrapped with `<span data-cke-filler="true">&nbsp;</span>`. Take this difference into
     * consideration if you plan to compare revision data with the data returned by `editor.getData()`.
     *
     * See also {@link module:revision-history/revisionviewer~RevisionViewer#getRevisionRootsAttributes}.
     */
    getRevisionDocumentData(revision: Revision): Promise<Record<string, string>>;
    /**
     * Returns roots attributes for given revision.
     *
     * This method returns a promise which resolves with an object, where keys are root names and values are these roots' attributes.
     * Most editor setups use just one root, which has the default name `main`. In this case, the promise will resolve with an object
     * similar to this:
     *
     * ```ts
     * { main: {} }
     * ```
     *
     * See also {@link module:revision-history/revisionviewer~RevisionViewer#getRevisionDocumentData}.
     */
    getRevisionRootsAttributes(revision: Revision): Promise<Record<string, Record<string, unknown>>>;
    compare(newRevisionOrId: Revision | string, oldRevisionOrId: Revision | string, forceCompare?: boolean): Promise<unknown>;
    addRevisionData(revisionData: RevisionJSON, updateCallback: (updateObj: RevisionJSON, isFromAdapter: boolean, revision: Revision) => void): Revision;
    private _removeMissingPairs;
}
export declare class RestoreRevisionCommand extends Command {
    constructor(editor: Editor);
    execute(): void;
    refresh(): void;
}
export declare class ShowChangeCommand<T extends 'backward' | 'forward'> extends Command {
    constructor(editor: Editor, { direction }: {
        direction: T;
    });
    /**
     * TODO
     */
    execute(): void;
    /**
     * TODO
     *
     * The `showNextChange` command is enabled if the revision viewer is ready and either the navigation
     * mode is off, or there is any "next" change to select within current revision.
     *
     * The `showPreviousChange` command is enabled if the revision viewer is ready and either the navigation
     * mode is off, or there is any "previous" change to select within current revision.
     */
    refresh(): void;
}
/**
function printTape( tape ) {
    const elements = tape.map(
        item => item.item.data ? item.item.data : item.type == 'elementStart' ? '<' + item.item.name + '>' : '</' + item.item.name + '>'
    ).join( '' );

    const signs = tape.map( v => {
        const item = v.item;
        const sign = ( v.isAdded || v.isAddSuggestion ) ? v.isRemoved ? '=' : '+' : v.isRemoved ? '-' : ' ';
        const len = item.data ? item.data.length : v.type == 'elementStart' ? item.name.length + 2 : item.name.length + 3;

        return sign.repeat( len );
    } ).join( '' );

    console.log( elements );
    console.log( signs );
}

window.printTape = printTape;
/**/
