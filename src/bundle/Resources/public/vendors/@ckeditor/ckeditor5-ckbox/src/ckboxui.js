/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ckbox/ckboxui
 */
import { icons, Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import browseFilesIcon from '../theme/icons/browse-files.svg';
/**
 * The CKBoxUI plugin. It introduces the `'ckbox'` toolbar button.
 */
export default class CKBoxUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'CKBoxUI';
    }
    /**
     * @inheritDoc
     */
    afterInit() {
        const editor = this.editor;
        const command = editor.commands.get('ckbox');
        // Do not register the `ckbox` button if the command does not exist.
        if (!command) {
            return;
        }
        const t = editor.t;
        const componentFactory = editor.ui.componentFactory;
        componentFactory.add('ckbox', locale => {
            const button = new ButtonView(locale);
            button.set({
                label: t('Open file manager'),
                icon: browseFilesIcon,
                tooltip: true
            });
            button.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');
            button.on('execute', () => {
                editor.execute('ckbox');
            });
            return button;
        });
        if (editor.plugins.has('ImageInsertUI')) {
            const imageInsertUI = editor.plugins.get('ImageInsertUI');
            imageInsertUI.registerIntegration({
                name: 'assetManager',
                observable: command,
                buttonViewCreator: () => {
                    const button = this.editor.ui.componentFactory.create('ckbox');
                    button.icon = icons.imageAssetManager;
                    button.bind('label').to(imageInsertUI, 'isImageSelected', isImageSelected => isImageSelected ?
                        t('Replace image with file manager') :
                        t('Insert image with file manager'));
                    return button;
                },
                formViewCreator: () => {
                    const button = this.editor.ui.componentFactory.create('ckbox');
                    button.icon = icons.imageAssetManager;
                    button.withText = true;
                    button.bind('label').to(imageInsertUI, 'isImageSelected', isImageSelected => isImageSelected ?
                        t('Replace with file manager') :
                        t('Insert with file manager'));
                    button.on('execute', () => {
                        imageInsertUI.dropdownView.isOpen = false;
                    });
                    return button;
                }
            });
        }
    }
}
