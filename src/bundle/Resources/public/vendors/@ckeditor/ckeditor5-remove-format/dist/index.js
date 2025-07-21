/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Plugin, Command } from '@ckeditor/ckeditor5-core/dist/index.js';
import { IconRemoveFormat } from '@ckeditor/ckeditor5-icons/dist/index.js';
import { ButtonView, MenuBarMenuListItemButtonView } from '@ckeditor/ckeditor5-ui/dist/index.js';
import { first } from '@ckeditor/ckeditor5-utils/dist/index.js';

const REMOVE_FORMAT = 'removeFormat';
/**
 * The remove format UI plugin. It registers the `'removeFormat'` button which can be
 * used in the toolbar.
 */ class RemoveFormatUI extends Plugin {
    /**
	 * @inheritDoc
	 */ static get pluginName() {
        return 'RemoveFormatUI';
    }
    /**
	 * @inheritDoc
	 */ static get isOfficialPlugin() {
        return true;
    }
    /**
	 * @inheritDoc
	 */ init() {
        const editor = this.editor;
        editor.ui.componentFactory.add(REMOVE_FORMAT, ()=>{
            const view = this._createButton(ButtonView);
            view.set({
                tooltip: true
            });
            return view;
        });
        editor.ui.componentFactory.add(`menuBar:${REMOVE_FORMAT}`, ()=>this._createButton(MenuBarMenuListItemButtonView));
    }
    /**
	 * Creates a button for remove format command to use either in toolbar or in menu bar.
	 */ _createButton(ButtonClass) {
        const editor = this.editor;
        const locale = editor.locale;
        const command = editor.commands.get(REMOVE_FORMAT);
        const view = new ButtonClass(editor.locale);
        const t = locale.t;
        view.set({
            label: t('Remove Format'),
            icon: IconRemoveFormat
        });
        view.bind('isEnabled').to(command, 'isEnabled');
        // Execute the command.
        this.listenTo(view, 'execute', ()=>{
            editor.execute(REMOVE_FORMAT);
            editor.editing.view.focus();
        });
        return view;
    }
}

/**
 * The remove format command.
 *
 * It is used by the {@link module:remove-format/removeformat~RemoveFormat remove format feature}
 * to clear the formatting in the selection.
 *
 * ```ts
 * editor.execute( 'removeFormat' );
 * ```
 */ class RemoveFormatCommand extends Command {
    /**
	 * @inheritDoc
	 */ refresh() {
        const model = this.editor.model;
        this.isEnabled = !!first(this._getFormattingItems(model.document.selection, model.schema));
    }
    /**
	 * @inheritDoc
	 */ execute() {
        const model = this.editor.model;
        const schema = model.schema;
        model.change((writer)=>{
            for (const item of this._getFormattingItems(model.document.selection, schema)){
                if (item.is('selection')) {
                    for (const attributeName of this._getFormattingAttributes(item, schema)){
                        writer.removeSelectionAttribute(attributeName);
                    }
                } else {
                    // Workaround for items with multiple removable attributes. See
                    // https://github.com/ckeditor/ckeditor5-remove-format/pull/1#pullrequestreview-220515609
                    const itemRange = writer.createRangeOn(item);
                    for (const attributeName of this._getFormattingAttributes(item, schema)){
                        writer.removeAttribute(attributeName, itemRange);
                    }
                }
            }
        });
    }
    /**
	 * Returns an iterable of items in a selection (including the selection itself) that have formatting model
	 * attributes to be removed by the feature.
	 *
	 * @param schema The schema describing the item.
	 */ *_getFormattingItems(selection, schema) {
        const itemHasRemovableFormatting = (item)=>{
            return !!first(this._getFormattingAttributes(item, schema));
        };
        // Check formatting on selected items that are not blocks.
        for (const curRange of selection.getRanges()){
            for (const item of curRange.getItems()){
                if (!schema.isBlock(item) && itemHasRemovableFormatting(item)) {
                    yield item;
                }
            }
        }
        // Check formatting from selected blocks.
        for (const block of selection.getSelectedBlocks()){
            if (itemHasRemovableFormatting(block)) {
                yield block;
            }
        }
        // Finally the selection might be formatted as well, so make sure to check it.
        if (itemHasRemovableFormatting(selection)) {
            yield selection;
        }
    }
    /**
	 * Returns an iterable of formatting attributes of a given model item.
	 *
	 * **Note:** Formatting items have the `isFormatting` property set to `true`.
	 *
	 * @param schema The schema describing the item.
	 * @returns The names of formatting attributes found in a given item.
	 */ *_getFormattingAttributes(item, schema) {
        for (const [attributeName] of item.getAttributes()){
            const attributeProperties = schema.getAttributeProperties(attributeName);
            if (attributeProperties && attributeProperties.isFormatting) {
                yield attributeName;
            }
        }
    }
}

/**
 * The remove format editing plugin.
 *
 * It registers the {@link module:remove-format/removeformatcommand~RemoveFormatCommand removeFormat} command.
 */ class RemoveFormatEditing extends Plugin {
    /**
	 * @inheritDoc
	 */ static get pluginName() {
        return 'RemoveFormatEditing';
    }
    /**
	 * @inheritDoc
	 */ static get isOfficialPlugin() {
        return true;
    }
    /**
	 * @inheritDoc
	 */ init() {
        const editor = this.editor;
        editor.commands.add('removeFormat', new RemoveFormatCommand(editor));
    }
}

/**
 * The remove format plugin.
 *
 * This is a "glue" plugin which loads the {@link module:remove-format/removeformatediting~RemoveFormatEditing}
 * and {@link module:remove-format/removeformatui~RemoveFormatUI} plugins.
 *
 * For a detailed overview, check out the {@glink features/remove-format remove format} feature documentation.
 */ class RemoveFormat extends Plugin {
    /**
	 * @inheritDoc
	 */ static get requires() {
        return [
            RemoveFormatEditing,
            RemoveFormatUI
        ];
    }
    /**
	 * @inheritDoc
	 */ static get pluginName() {
        return 'RemoveFormat';
    }
    /**
	 * @inheritDoc
	 */ static get isOfficialPlugin() {
        return true;
    }
}

export { RemoveFormat, RemoveFormatEditing, RemoveFormatUI };
//# sourceMappingURL=index.js.map
