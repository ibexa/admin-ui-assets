/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module ui/dropdown/button/splitbuttonview
 */
import { IconDropdownArrow } from '@ckeditor/ckeditor5-icons';
import { KeystrokeHandler, FocusTracker } from '@ckeditor/ckeditor5-utils';
import View from '../../view.js';
import ButtonView from '../../button/buttonview.js';
import '../../../theme/components/dropdown/splitbutton.css';
/**
 * The split button view class.
 *
 * ```ts
 * const view = new SplitButtonView();
 *
 * view.set( {
 * 	label: 'A button',
 * 	keystroke: 'Ctrl+B',
 * 	tooltip: true
 * } );
 *
 * view.render();
 *
 * document.body.append( view.element );
 * ```
 *
 * Also see the {@link module:ui/dropdown/utils~createDropdown `createDropdown()` util}.
 */
export default class SplitButtonView extends View {
    /**
     * Collection of the child views inside of the split button {@link #element}.
     */
    children;
    /**
     * A main button of split button.
     */
    actionView;
    /**
     * A secondary button of split button that opens dropdown.
     */
    arrowView;
    /**
     * Instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}. It manages
     * keystrokes of the split button:
     *
     * * <kbd>▶</kbd> moves focus to arrow view when action view is focused,
     * * <kbd>◀</kbd> moves focus to action view when arrow view is focused.
     */
    keystrokes;
    /**
     * Tracks information about DOM focus in the dropdown.
     */
    focusTracker;
    /**
     * @inheritDoc
     */
    constructor(locale, actionButton) {
        super(locale);
        const bind = this.bindTemplate;
        // Implement the Button interface.
        this.set('class', undefined);
        this.set('labelStyle', undefined);
        this.set('icon', undefined);
        this.set('isEnabled', true);
        this.set('isOn', false);
        this.set('isToggleable', false);
        this.set('isVisible', true);
        this.set('keystroke', undefined);
        this.set('withKeystroke', false);
        this.set('label', undefined);
        this.set('tabindex', -1);
        this.set('tooltip', false);
        this.set('tooltipPosition', 's');
        this.set('type', 'button');
        this.set('withText', false);
        this.children = this.createCollection();
        this.actionView = this._createActionView(actionButton);
        this.arrowView = this._createArrowView();
        this.keystrokes = new KeystrokeHandler();
        this.focusTracker = new FocusTracker();
        this.setTemplate({
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'ck-splitbutton',
                    bind.to('class'),
                    bind.if('isVisible', 'ck-hidden', value => !value),
                    this.arrowView.bindTemplate.if('isOn', 'ck-splitbutton_open')
                ]
            },
            children: this.children
        });
    }
    /**
     * @inheritDoc
     */
    render() {
        super.render();
        this.children.add(this.actionView);
        this.children.add(this.arrowView);
        this.focusTracker.add(this.actionView.element);
        this.focusTracker.add(this.arrowView.element);
        this.keystrokes.listenTo(this.element);
        // Overrides toolbar focus cycling behavior.
        this.keystrokes.set('arrowright', (evt, cancel) => {
            if (this.focusTracker.focusedElement === this.actionView.element) {
                this.arrowView.focus();
                cancel();
            }
        });
        // Overrides toolbar focus cycling behavior.
        this.keystrokes.set('arrowleft', (evt, cancel) => {
            if (this.focusTracker.focusedElement === this.arrowView.element) {
                this.actionView.focus();
                cancel();
            }
        });
    }
    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        this.focusTracker.destroy();
        this.keystrokes.destroy();
    }
    /**
     * Focuses the {@link module:ui/button/buttonview~ButtonView#element} of the action part of split button.
     */
    focus() {
        this.actionView.focus();
    }
    /**
     * Creates a {@link module:ui/button/buttonview~ButtonView} instance as {@link #actionView} and binds it with main split button
     * attributes.
     */
    _createActionView(actionButton) {
        const actionView = actionButton || new ButtonView();
        if (!actionButton) {
            actionView.bind('icon', 'isEnabled', 'isOn', 'isToggleable', 'keystroke', 'label', 'tabindex', 'tooltip', 'tooltipPosition', 'type', 'withText').to(this);
        }
        actionView.extendTemplate({
            attributes: {
                class: 'ck-splitbutton__action'
            }
        });
        actionView.delegate('execute').to(this);
        return actionView;
    }
    /**
     * Creates a {@link module:ui/button/buttonview~ButtonView} instance as {@link #arrowView} and binds it with main split button
     * attributes.
     */
    _createArrowView() {
        const arrowView = new ButtonView();
        const bind = arrowView.bindTemplate;
        arrowView.icon = IconDropdownArrow;
        arrowView.extendTemplate({
            attributes: {
                class: [
                    'ck-splitbutton__arrow'
                ],
                'data-cke-tooltip-disabled': bind.to('isOn'),
                'aria-haspopup': true,
                'aria-expanded': bind.to('isOn', value => String(value))
            }
        });
        arrowView.bind('isEnabled').to(this);
        arrowView.bind('label').to(this);
        arrowView.bind('tooltip').to(this);
        arrowView.delegate('execute').to(this, 'open');
        return arrowView;
    }
}
