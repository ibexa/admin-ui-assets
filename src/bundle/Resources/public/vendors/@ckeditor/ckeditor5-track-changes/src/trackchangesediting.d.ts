/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/trackchangesediting
 * @publicApi
 */
import { Plugin, PendingActions, type Editor } from 'ckeditor5/src/core.js';
import { type Element, type Range } from 'ckeditor5/src/engine.js';
import { Users } from 'ckeditor5-collaboration/src/collaboration-core.js';
import TrackChangesCommand from './commands/trackchangescommand.js';
import Suggestion, { type SuggestionJSON } from './suggestion.js';
import SuggestionDescriptionFactory from './suggestiondescriptionfactory.js';
import TrackChangesAIAssistant from './integrations/aiassistant.js';
import TrackChangesAlignment from './integrations/alignment.js';
import TrackChangesBasicStyles from './integrations/basicstyles.js';
import TrackChangesBlockQuote from './integrations/blockquote.js';
import TrackChangesBookmark from './integrations/bookmark.js';
import TrackChangesCaseChange from './integrations/casechange.js';
import TrackChangesCKBox from './integrations/ckbox.js';
import TrackChangesCodeBlock from './integrations/codeblock.js';
import TrackChangesComments from './integrations/comments.js';
import TrackChangesDeleteCommand from './integrations/deletecommand.js';
import TrackChangesList from './integrations/list.js';
import TrackChangesListProperties from './integrations/listproperties.js';
import TrackChangesEmoji from './integrations/emoji.js';
import TrackChangesEnterCommand from './integrations/entercommand.js';
import TrackChangesFindAndReplace from './integrations/findandreplace.js';
import TrackChangesFont from './integrations/font.js';
import TrackChangesFormatPainter from './integrations/formatpainter.js';
import TrackChangesHeading from './integrations/heading.js';
import TrackChangesHighlight from './integrations/highlight.js';
import TrackChangesHorizontalLine from './integrations/horizontalline.js';
import TrackChangesHtmlEmbed from './integrations/htmlembed.js';
import TrackChangesImage from './integrations/image.js';
import TrackChangesImageReplace from './integrations/imagereplace.js';
import TrackChangesImageStyle from './integrations/imagestyle.js';
import TrackChangesImportWord from './integrations/importword.js';
import TrackChangesIndent from './integrations/indent.js';
import TrackChangesInputCommand from './integrations/inputcommand.js';
import TrackChangesLink from './integrations/link.js';
import TrackChangesLegacyList from './integrations/legacylist.js';
import TrackChangesLegacyListProperties from './integrations/legacylistproperties.js';
import TrackChangesMediaEmbed from './integrations/mediaembed.js';
import TrackChangesMention from './integrations/mention.js';
import TrackChangesMergeFields from './integrations/mergefields.js';
import TrackChangesMultiLevelList from './integrations/multilevellist.js';
import TrackChangesPageBreak from './integrations/pagebreak.js';
import TrackChangesParagraph from './integrations/paragraph.js';
import TrackChangesReplaceSourceCommand from './integrations/replacesourcecommand.js';
import TrackChangesRemoveFormat from './integrations/removeformat.js';
import TrackChangesRestrictedEditingMode from './integrations/restrictededitingmode.js';
import TrackChangesShiftEnterCommand from './integrations/shiftentercommand.js';
import TrackChangesStandardEditingMode from './integrations/standardeditingmode.js';
import TrackChangesStylesDropdown from './integrations/style.js';
import TrackChangesTable from './integrations/table.js';
import TrackChangesTableMergeSplit from './integrations/tablemergesplit.js';
import TrackChangesTableHeadings from './integrations/tableheadings.js';
import TrackChangesTableLayout from './integrations/tablelayout.js';
import TrackChangesTableClipboard from './integrations/tableclipboard.js';
import TrackChangesTableColumnResize from './integrations/tablecolumnresize.js';
import TrackChangesTemplate from './integrations/template.js';
import TrackChangesTableOfContents from './integrations/tableofcontents.js';
import TrackChangesTitle from './integrations/title.js';
import TrackChangesUploadcare from './integrations/uploadcare.js';
import TrackChangesUndo from './integrations/undo.js';
import TrackChangesTableCaption from './integrations/tablecaption.js';
import TrackChangesTableProperties from './integrations/tableproperties.js';
import type { SuggestionData, TrackChangesAdapter } from './trackchanges.js';
export declare const renameAttributeKey = "$elementName";
/**
 * Provides editing part of the {@link module:track-changes/trackchanges~TrackChanges track changes plugin}.
 */
export default class TrackChangesEditing extends Plugin {
    /**
     * List of names of active (highlighted) markers.
     *
     * @observable
     */
    activeMarkers: Array<string>;
    /**
     * Descriptions factory which generates descriptions for the suggestions created by the track changes plugin.
     */
    descriptionFactory: SuggestionDescriptionFactory;
    /**
     * Reference to command that turns the track changes mode on and off.
     */
    trackChangesCommand: TrackChangesCommand;
    static get requires(): readonly ["CommentsRepository", typeof Users, typeof PendingActions, typeof TrackChangesAIAssistant, typeof TrackChangesAlignment, typeof TrackChangesBasicStyles, typeof TrackChangesBlockQuote, typeof TrackChangesBookmark, typeof TrackChangesCKBox, typeof TrackChangesCaseChange, typeof TrackChangesCodeBlock, typeof TrackChangesComments, typeof TrackChangesDeleteCommand, typeof TrackChangesEmoji, typeof TrackChangesEnterCommand, typeof TrackChangesFindAndReplace, typeof TrackChangesFont, typeof TrackChangesFormatPainter, typeof TrackChangesHeading, typeof TrackChangesHighlight, typeof TrackChangesHorizontalLine, typeof TrackChangesHtmlEmbed, typeof TrackChangesImage, typeof TrackChangesImageStyle, typeof TrackChangesImageReplace, typeof TrackChangesImportWord, typeof TrackChangesIndent, typeof TrackChangesInputCommand, typeof TrackChangesLegacyList, typeof TrackChangesLegacyListProperties, typeof TrackChangesMultiLevelList, typeof TrackChangesLink, typeof TrackChangesList, typeof TrackChangesListProperties, typeof TrackChangesMediaEmbed, typeof TrackChangesMention, typeof TrackChangesMergeFields, typeof TrackChangesPageBreak, typeof TrackChangesParagraph, typeof TrackChangesReplaceSourceCommand, typeof TrackChangesRemoveFormat, typeof TrackChangesRestrictedEditingMode, typeof TrackChangesShiftEnterCommand, typeof TrackChangesStandardEditingMode, typeof TrackChangesStylesDropdown, typeof TrackChangesTable, typeof TrackChangesTableMergeSplit, typeof TrackChangesTableHeadings, typeof TrackChangesTableLayout, typeof TrackChangesTableCaption, typeof TrackChangesTableClipboard, typeof TrackChangesTableColumnResize, typeof TrackChangesTableOfContents, typeof TrackChangesTableProperties, typeof TrackChangesTemplate, typeof TrackChangesTitle, typeof TrackChangesUploadcare, typeof TrackChangesUndo];
    static get pluginName(): "TrackChangesEditing";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * @inheritDoc
     */
    afterInit(): void;
    /**
     * An adapter object that should communicate with the data source to fetch or save the suggestion data.
     */
    set adapter(adapter: TrackChangesAdapter | null);
    get adapter(): TrackChangesAdapter | null;
    getSuggestions(options?: {
        skipNotAttached?: boolean;
        toJSON?: false;
    }): Array<Suggestion>;
    getSuggestions(options: {
        skipNotAttached?: boolean;
        toJSON: true;
    }): Array<SuggestionJSON>;
    getSuggestions(options: {
        skipNotAttached?: boolean;
        toJSON: boolean;
    }): Array<Suggestion> | Array<SuggestionJSON>;
    /**
     * Returns {@link module:track-changes/suggestion~Suggestion suggestion} for given `id`.
     */
    getSuggestion(id: string): Suggestion;
    /**
     * Checks if {@link module:track-changes/suggestion~Suggestion suggestion} of given `id` exist.
     */
    hasSuggestion(id: string): boolean;
    /**
     * Adds suggestion data.
     */
    addSuggestionData(data: SuggestionData): Suggestion;
    /**
     * Accept all adjacent suggestions.
     */
    acceptSuggestion(suggestion: Suggestion): void;
    /**
     * Discard all adjacent suggestions.
     */
    discardSuggestion(suggestion: Suggestion): void;
    /**
     * Enables command with given `commandName` in track changes mode.
     *
     * When a command gets enabled in track changes mode, its original `execute()` method is overwritten by provided `callback()`
     * function. The `callback()` should provide alternative logic to be executed instead.
     *
     * The `callback()` function is passed one or more parameters:
     *
     * * the first parameter is `executeCommand()`, a function that upon calling will fire the original `execute()` method,
     * * then, all the parameters passed to original `execute()` call are passed.
     *
     * Using those parameters it is possible to call the original command in the `callback()` (or skip it) and also do
     * something before and/or after that call.
     *
     * If `callback` is not set then the command will work the same both when track changes is on and off.
     *
     * See the {@glink features/collaboration/track-changes/track-changes-custom-features Integrating track changes with custom
     * features} guide to learn more about enabling your feature in the suggestion mode.
     */
    enableCommand(commandName: string, callback?: Function): void;
    /**
     * Temporarily disable track changes to accept or discard a suggestion without intercepting original calls.
     */
    forceDefaultExecution(callback: Function): unknown;
    /**
     * Marks a single-range insertion suggestion on the given `range`.
     *
     * It is expected that given `range` is a range on just-created content and does not intersect with any other suggestion ranges.
     *
     * ```ts
     * trackChangesPlugin.markInsertion( insertionRange );
     * trackChangesPlugin.markInsertion( insertionRange, 'customInsertion' );
     * ```
     *
     * This method should be used in `callback()` in
     * {@link module:track-changes/trackchangesediting~TrackChangesEditing#enableCommand `TrackChangesEditing#enableCommand`}
     * to inform the track changes plugin about a suggestion that happened.
     *
     * Always call this method inside `model.change()` or `model.enqueueChange()` block to ensure that all operations performed by
     * this method are bound with one undo step.
     *
     * If possible, the new suggestion will be joined with an existing suggestion (of the same type). This happens only if
     * the suggestions are created by the same user and have similar attributes (i.e. passed `attributes` do not conflict with
     * the existing suggestion).
     *
     * See {@glink features/collaboration/track-changes/track-changes-custom-features Integrating track changes with custom
     * features guide} to learn more about enabling your feature in the suggestion mode.
     *
     * @param range Range on content which got inserted.
     * @param subType Suggestion {@link module:track-changes/suggestion~Suggestion#subType} to set. If not set,
     * suggestion will be a generic insertion suggestion. Only suggestions with the same sub type will be joined.
     * @param attributes Custom suggestion attributes.
     * @returns Suggestion created or expanded as a result of execution of this
     * method. Returns `null` if given `range` was collapsed (so no suggestion was created or expanded).
     */
    markInsertion(range: Range, subType?: string | null, attributes?: Record<string, unknown>): Suggestion | null;
    /**
     * Marks a multi-range insertion suggestion spanning over given `ranges`.
     *
     * It is expected that given `ranges` are ranges on just-created content and do not intersect with any other suggestion ranges.
     *
     * Each range of a multi-range insertion suggestion should contain exactly one element and should not be created on a text content.
     *
     * ```ts
     * trackChangesPlugin.markMultiRangeInsertion( insertionRanges );
     * trackChangesPlugin.markMultiRangeInsertion( insertionRanges, 'customInsertion' );
     * ```
     *
     * This method should be used in `callback()` in
     * {@link module:track-changes/trackchangesediting~TrackChangesEditing#enableCommand `TrackChangesEditing#enableCommand`}
     * to inform the track changes plugin about a suggestion that happened.
     *
     * Always call this method inside `model.change()` or `model.enqueueChange()` block to ensure that all operations performed by
     * this method are bound with one undo step.
     *
     * If possible, the new suggestion will be joined with an existing suggestion (of the same type). This happens only if
     * the suggestions are created by the same user and have similar attributes (i.e. passed `attributes` do not conflict with
     * the existing suggestion).
     *
     * See the {@glink features/collaboration/track-changes/track-changes-custom-features Integrating track changes with custom
     * features} guide to learn more about enabling your feature in the suggestion mode.
     *
     * @param ranges Ranges which got inserted.
     * @param subType Suggestion {@link module:track-changes/suggestion~Suggestion#subType} to set. Only suggestions
     * with the same subtype will be joined.
     * @param attributes Custom suggestion attributes.
     * @returns {module:track-changes/suggestion~Suggestion} Suggestion created or expanded as a result of execution of this method.
     */
    markMultiRangeInsertion(ranges: Array<Range>, subType?: string, attributes?: Record<string, unknown>): Suggestion;
    /**
     * Marks an inline format suggestion on the given `range`.
     *
     * This type of format suggestion is suitable for formatting (attribute) changes on inline elements and text.
     * Changes like adding bold or setting a link use this type of format suggestion.
     *
     * Inline format suggestions are directly coupled with editor commands and represent a command execution on given `range`.
     *
     * ```ts
     * trackChangesPlugin.markInlineFormat( formattedRange, {
     *		commandName: 'bold',
     *		commandParams: [ { forceValue: true } ]
     * } );
     *
     * trackChangesPlugin.markInlineFormat( formattedRange, formatData, 'customSubType' );
     * ```
     *
     * This method should be used in `callback()` in
     * {@link module:track-changes/trackchangesediting~TrackChangesEditing#enableCommand `TrackChangesEditing#enableCommand`}
     * to inform the track changes plugin about a suggestion that happened.
     *
     * Always call this method inside `model.change()` or `model.enqueueChange()` block to ensure that all operations performed by
     * this method are bound with one undo step.
     *
     * When a format suggestion is accepted the command is executed based on parameters passed in `formatData`.
     *
     * If an inline format suggestion is marked inside the local user's insertion suggestion, the change is applied directly
     * and no suggestion is created. This supports partial intersections with insertion suggestions.
     *
     * If possible, the new suggestion will be joined with an existing suggestion (of the same type). This happens only if
     * the suggestions are created by the same user and have similar attributes (i.e. passed `attributes` do not conflict with
     * the existing suggestion).
     *
     * See the {@glink features/collaboration/track-changes/track-changes-custom-features Integrating track changes with custom
     * features} guide to learn more about enabling your feature in the suggestion mode.
     *
     * @param range Range on which the change happened.
     * @param formatData Command parameters.
     * @param subType Suggestion {@link module:track-changes/suggestion~Suggestion#subType} to set. If not set
     * (which is the default and recommended use) the sub type value is a string hash generated from `formatData`. This guarantees that
     * all inline format suggestions that perform the same changes have the same sub type (and can be properly handled).
     * @param attributes Custom suggestion attributes.
     */
    markInlineFormat(range: Range, formatData: FormatData, subType?: string | null, attributes?: Record<string, unknown>): null;
    /**
     * Marks a block format suggestion on the given `range`.
     *
     * Block format suggestions are directly coupled with editor commands and represent a command execution on the given range or element.
     *
     * This type of format suggestion is suitable for formatting (attribute) changes on block elements.
     * Changes like resizing image, applying block quote or changing header type use this type of format suggestion.
     *
     * Pass element if the suggestion should be marked exactly on that element. This is suitable if the command modifies exactly given
     * element (for example, changes an attribute of that element). If such element is split, an additional suggestion is
     * created for the new element:
     *
     * 		[<paragraph>Foobar]</paragraph>  -->  [<paragraph>Foo]</paragraph>[<paragraph>bar]</paragraph>
     *
     * Pass range for suggestions representing commands that can be executed on multiple blocks at once. This is suitable for commands
     * which modifies all the block elements found in given range (those commands usually operate on selection ranges). This creates
     * only one suggestion for the whole range and do not create additional suggestions if blocks in the range are split:
     *
     *		[<paragraph>Foobar]</paragraph>  -->  [<paragraph>Foo</paragraph><paragraph>Bar]</paragraph>
     *
     * Example of marking block format suggestion on an element:
     *
     * ```ts
     * trackChangesPlugin.markBlockFormat( paragraphElement, {
     *		commandName: 'heading',
     *		commandParams: [ { value: 'heading1' } ],
     *		formatGroupId: 'blockName'
     *	} );
     * ```
     *
     * Example of marking block format suggestion on a range:
     *
     * ```ts
     * plugin.markBlockFormat( selectionRange, {
     *		commandName: 'blockQuote',
     *		commandParams: [ { forceValue: true } ]
     * } );
     * ```
     *
     * If you pass a range, it should start before the first element to change and end:
     *
     * * for blocks (like paragraph, list item, heading, etc.): at the end of the last element to change,
     * * for objects (like image, table, media embed, etc.): after the last element to change.
     *
     * ```xml
     * [<paragraph>Foo</paragraph><paragraph>Bar]</paragraph><paragraph>Xyz</paragraph>
     * [<paragraph>Foo</paragraph><imageBlock src="foo.jpg"></imageBlock>]<paragraph>Xyz</paragraph>
     * ```
     *
     * This method should be used in `callback()` in
     * {@link module:track-changes/trackchangesediting~TrackChangesEditing#enableCommand `TrackChangesEditing#enableCommand`}
     * to inform the track changes plugin about a suggestion that happened.
     *
     * Always call this method inside `model.change()` or `model.enqueueChange()` block to ensure that all operations performed by
     * this method are bound with one undo step.
     *
     * When a format suggestion is accepted the command is executed based on parameters passed in `formatData`.
     *
     * If a block format suggestion is marked inside the local user's insertion suggestion, the change is applied directly
     * and no suggestion is created. Note that this does not support partial intersections with insertion suggestions
     * (as opposed to inline format suggestions).
     *
     * If possible, the new suggestion will be joined with an existing suggestion (of the same type). This happens only if
     * the suggestions are created by the same user and have similar attributes (i.e. passed `attributes` do not conflict with
     * the existing suggestion).
     *
     * See the {@glink features/collaboration/track-changes/track-changes-custom-features Integrating track changes with custom
     * features} guide to learn more about enabling your feature in the suggestion mode.
     *
     * @param elementOrRange Element or range on which the change happened.
     * @param formatData Command parameters and additional suggestion parameters.
     * @param affectedElements Elements (other than `elementOrRange`) that are
     * also affected by the command execution. This parameter is used when the effect of the command execution is larger than
     * `elementOrRange`. It is used when determining whether the change should be applied directly or if the suggestion should be created.
     * @param subType Suggestion {@link module:track-changes/suggestion~Suggestion#subType} to set. If not set
     * (which is the default and recommended use) the sub type value is a string hash generated from `formatData`. This guarantees that
     * all block format suggestions that perform the same changes have the same sub types (and can be properly handled).
     * @param attributes Custom suggestion attributes.
     */
    markBlockFormat(elementOrRange: Element | Range, formatData: FormatData, affectedElements?: Array<Element>, subType?: string | null, attributes?: Record<string, unknown>): Suggestion | null;
    /**
     * Marks a multi-range block format suggestion on given `elements`.
     *
     * See {@link module:track-changes/trackchangesediting~TrackChangesEditing#markBlockFormat `TrackChangesEditing#markBlockFormat()`}
     * to learn more about block format suggestions. Note that this method can be used only on elements (not on ranges).
     *
     * This method is useful for creating a format suggestion on multiple elements which are not siblings, so one range cannot be used.
     *
     * This method should be used in `callback()` in
     * {@link module:track-changes/trackchangesediting~TrackChangesEditing#enableCommand `TrackChangesEditing#enableCommand`}
     * to inform the track changes plugin about a suggestion that happened.
     *
     * Always call this method inside `model.change()` or `model.enqueueChange()` block to ensure that all operations performed by
     * this method are bound with one undo step.
     *
     * When a format suggestion is accepted the command is executed based on parameters passed in `formatData`.
     *
     * If a block format suggestion is marked inside the local user's insertion suggestion, the change is applied directly
     * and no suggestion is created. Note that this does not support partial intersections with insertion suggestions
     * (as opposed to inline format suggestions).
     *
     * If possible, the new suggestion will be joined with an existing suggestion (of the same type). This happens only if
     * the suggestions are created by the same user and have similar attributes (i.e. passed `attributes` do not conflict with
     * the existing suggestion).
     *
     * See the {@glink features/collaboration/track-changes/track-changes-custom-features Integrating track changes with custom
     * features} guide to learn more about enabling your feature in the suggestion mode.
     *
     * @param elementsOrRanges Elements or ranges
     * on which the change happened.
     * @param formatData Command parameters and additional suggestion parameters.
     * @param affectedElements Elements (other than `elementOrRange`) that are
     * also affected by the command execution. This parameter is used when the effect of the command execution is larger than
     * `elementOrRange`. It is used when determining whether the change should be applied directly or if the suggestion should be created.
     * @param subType Suggestion {@link module:track-changes/suggestion~Suggestion#subType} to set. If not set
     * (which is the default and recommended use) the sub type value is a string hash generated from `formatData`. This guarantees that
     * all block format suggestions that perform the same changes have the same sub types (and can be properly handled).
     * @param attributes Custom suggestion attributes.
     */
    markMultiRangeBlockFormat(elementsOrRanges: Array<Element> | Array<Range>, formatData: FormatData, affectedElements?: Array<Element>, subType?: string | null, attributes?: Record<string, unknown>): Suggestion | null;
    /**
     * Marks a single-range deletion suggestion on given `range`.
     *
     * If the `range` to mark intersects with or contains insertion suggestions created by the local user,
     * those suggestions may be removed in a part or in the whole together with their content.
     *
     * ```ts
     * trackChangesPlugin.markDeletion( deletedRange );
     * trackChangesPlugin.markDeletion( deletedRange, 'customDeletion' );
     * ```
     *
     * This method should be used in `callback()` in
     * {@link module:track-changes/trackchangesediting~TrackChangesEditing#enableCommand `TrackChangesEditing#enableCommand`}
     * to inform the track changes plugin about a suggestion that happened.
     *
     * Always call this method inside `model.change()` or `model.enqueueChange()` block to ensure that all operations performed by
     * this method are bound with one undo step.
     *
     * If possible, the new suggestion will be joined with an existing suggestion (of the same type). This happens only if
     * the suggestions are created by the same user and have similar attributes (i.e. passed `attributes` do not conflict with
     * the existing suggestion).
     *
     * See {@glink features/collaboration/track-changes/track-changes-custom-features Integrating track changes with custom
     * features guide} to learn more about enabling your feature in the suggestion mode.
     *
     * @param range Range which should be marked as deletion suggestion.
     * @param subType Suggestion {@link module:track-changes/suggestion~Suggestion#subType} to set. If not set,
     * suggestion will be a generic insertion suggestion. Only suggestions with the same sub type will be joined.
     * @param attributes Custom suggestion attributes.
     * @returns Suggestion created or expanded as a result of execution of this
     * method. Returns `null` if given `range` was collapsed or the deletion was in insertion (so no suggestion was created or expanded).
     */
    markDeletion(range: Range, subType?: string | null, attributes?: Record<string, unknown>): Suggestion | null;
    /**
     * Marks a multi-range deletion suggestion spanning over given `ranges`.
     *
     * Each range of a multi-range deletion suggestion should contain exactly one element and should not be created on a text content.
     *
     * If the `ranges` to mark contain or are contained in insertion suggestions created by the local user, those
     * insertion suggestions may be removed together with their content.
     *
     * ```ts
     * trackChangesPlugin.markMultiRangeDeletion( deletedRanges );
     * trackChangesPlugin.markMultiRangeDeletion( deletedRanges, 'customDeletion' );
     * ```
     *
     * This method should be used in `callback()` in
     * {@link module:track-changes/trackchangesediting~TrackChangesEditing#enableCommand `TrackChangesEditing#enableCommand`}
     * to inform the track changes plugin about a suggestion that happened.
     *
     * Always call this method inside `model.change()` or `model.enqueueChange()` block to ensure that all operations performed by
     * this method are bound with one undo step.
     *
     * If possible, the new suggestion will be joined with an existing suggestion (of the same type). This happens only if
     * the suggestions are created by the same user and have similar attributes (i.e. passed `attributes` do not conflict with
     * the existing suggestion).
     *
     * See the {@glink features/collaboration/track-changes/track-changes-custom-features Integrating track changes with custom
     * features} guide to learn more about enabling your feature in the suggestion mode.
     *
     * @param ranges Ranges which should be marked as deletion suggestion.
     * @param subType Suggestion {@link module:track-changes/suggestion~Suggestion#subType} to set.
     * Only suggestions with the same sub type will be joined.
     * @param attributes Custom suggestion attributes.
     * @returns Suggestion created or expanded as a result of execution of this method.
     */
    markMultiRangeDeletion(ranges: Array<Range>, subType?: string, attributes?: Record<string, unknown>): Suggestion | null;
    /**
     * Marks a single-range attribute suggestion on the given `range`.
     *
     * Note: all nodes in the given `range` must have the same current value of `key` attribute.
     *
     * Note: if a block attribute is marked, `range` should include only a single model element.
     *
     * `attributes` is a required value and must include `groupId: string` property. The group id is used to group attribute suggestions
     * together. All suggestions with the same `groupId` will be put into one suggestion chain. By default, all attribute suggestions
     * created during the same batch have the same `groupId`.
     *
     * It's possible that more than one suggestion will be created by this method if there are already suggestions with the same
     * `key` but a different `oldValue` intersecting with the given `range`.
     *
     * It is guaranteed that there will be no "conflicting" suggestions, that is, there will be no two intersecting suggestions for
     * the same attribute `key`. If there is a conflicting suggestion, it will be partially or fully replaced by a new suggestion.
     *
     * This method should be used in `callback()` in
     * {@link module:track-changes/trackchangesediting~TrackChangesEditing#enableCommand `TrackChangesEditing#enableCommand`}
     * to inform the track changes plugin about a suggestion that happened.
     *
     * Always call this method inside `model.change()` or `model.enqueueChange()` block to ensure that all operations performed by
     * this method are bound with one undo step.
     *
     * See {@glink features/collaboration/track-changes/track-changes-custom-features Integrating track changes with custom
     * features guide} to learn more about enabling your feature in the suggestion mode.
     *
     * @param range Range for which the attribute has changed.
     * @param key Key of the attribute that changed.
     * @param oldValue Previous value of the attribute.
     * @param newValue New value of the attribute.
     * @param attributes Suggestion attributes. Must include `groupId`.
     */
    markAttributeChange(range: Range, key: string, oldValue: unknown, newValue: unknown, attributes: {
        groupId: string;
        [key: string]: any;
    }): Array<Suggestion>;
    /**
     * Enables default attributes suggestions integration for given command.
     *
     * @param commandName Name of the command to integrate.
     */
    enableDefaultAttributesIntegration(commandName: string): void;
    /**
     * Registers given attribute key for tracking as a block attribute (i.e. an attribute made on a block element).
     */
    registerBlockAttribute(attributeKey: string): void;
    /**
     * Registers given attribute key for tracking as an inline attribute (i.e. an attribute made on an inline element).
     */
    registerInlineAttribute(attributeKey: string): void;
}
/**
 * Command parameters and additional suggestion parameters. Passed value is also saved in
 * {@link module:track-changes/suggestion~Suggestion#data `Suggestion#data`} property.
 */
export type FormatData = {
    /**
     * Name of the command to execute when the suggestion is accepted.
     */
    commandName: string;
    /**
     * Parameters with which the command should be executed.
     */
    commandParams: Array<any>;
    /**
     * Additional grouping parameter for suggestions. If a suggestion
     * would be set on an element which already has a different suggestion with the same `formatGroupId`, the new suggestion will overwrite
     * the old one (the old one will be removed). Defaults to `commandName` parameter, so different suggestions of the same command
     * overwrite each other. Using this parameter you might expand this behavior so that multiple commands overwrite each other.
     */
    formatGroupId?: string;
    /**
     * True when format suggestion uses ranges.
     */
    multipleBlocks?: boolean;
    [i: string]: unknown;
};
/**
 * Attribute suggestion parameters.
 */
export type AttributeData = {
    /**
     * Attribute key.
     */
    key: string;
    /**
     * Attribute's original value before the change happened.
     */
    oldValue: unknown;
    /**
     * Attribute's value after the change happened.
     */
    newValue: unknown;
};
