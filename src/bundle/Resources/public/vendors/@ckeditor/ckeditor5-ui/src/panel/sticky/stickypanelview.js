/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module ui/panel/sticky/stickypanelview
 */
import View from '../../view.js';
import Template from '../../template.js';
import { Rect, toUnit, global, env } from '@ckeditor/ckeditor5-utils';
import '../../../theme/components/panel/stickypanel.css';
const toPx = /* #__PURE__ */ toUnit('px');
/**
 * The sticky panel view class.
 */
export default class StickyPanelView extends View {
    /**
     * Collection of the child views which creates balloon panel contents.
     */
    content;
    /**
     * The panel which accepts children into {@link #content} collection.
     * Also an element which is positioned when {@link #isSticky}.
     */
    contentPanelElement;
    /**
     * A dummy element which visually fills the space as long as the
     * actual panel is sticky. It prevents flickering of the UI.
     */
    _contentPanelPlaceholder;
    /**
     * @inheritDoc
     */
    constructor(locale) {
        super(locale);
        const bind = this.bindTemplate;
        this.set('isActive', false);
        this.set('isSticky', false);
        this.set('limiterElement', null);
        this.set('limiterBottomOffset', 50);
        this.set('viewportTopOffset', 0);
        this.set('_marginLeft', null);
        this.set('_isStickyToTheBottomOfLimiter', false);
        this.set('_stickyTopOffset', null);
        this.set('_stickyBottomOffset', null);
        this.content = this.createCollection();
        this._contentPanelPlaceholder = new Template({
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'ck-sticky-panel__placeholder'
                ],
                style: {
                    display: bind.to('isSticky', isSticky => isSticky ? 'block' : 'none'),
                    height: bind.to('isSticky', isSticky => {
                        return isSticky ? toPx(this._contentPanelRect.height) : null;
                    })
                }
            }
        }).render();
        this.contentPanelElement = new Template({
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'ck-sticky-panel__content',
                    // Toggle class of the panel when "sticky" state changes in the view.
                    bind.if('isSticky', 'ck-sticky-panel__content_sticky'),
                    bind.if('_isStickyToTheBottomOfLimiter', 'ck-sticky-panel__content_sticky_bottom-limit')
                ],
                style: {
                    width: bind.to('isSticky', isSticky => {
                        return isSticky ? toPx(this._contentPanelPlaceholder.getBoundingClientRect().width) : null;
                    }),
                    top: bind.to('_stickyTopOffset', value => value ? toPx(value) : value),
                    bottom: bind.to('_stickyBottomOffset', value => value ? toPx(value) : value),
                    marginLeft: bind.to('_marginLeft')
                }
            },
            children: this.content
        }).render();
        this.setTemplate({
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'ck-sticky-panel'
                ]
            },
            children: [
                this._contentPanelPlaceholder,
                this.contentPanelElement
            ]
        });
    }
    /**
     * @inheritDoc
     */
    render() {
        super.render();
        // Check if the panel should go into the sticky state immediately.
        this.checkIfShouldBeSticky();
        // Update sticky state of the panel as the window and ancestors are being scrolled.
        this.listenTo(global.document, 'scroll', () => {
            this.checkIfShouldBeSticky();
        }, { useCapture: true });
        // Synchronize with `model.isActive` because sticking an inactive panel is pointless.
        this.listenTo(this, 'change:isActive', () => {
            this.checkIfShouldBeSticky();
        });
        if ((env.isiOS || env.isSafari) && global.window.visualViewport) {
            this.listenTo(global.window.visualViewport, 'scroll', () => {
                this.checkIfShouldBeSticky();
            });
            this.listenTo(global.window.visualViewport, 'resize', () => {
                this.checkIfShouldBeSticky();
            });
        }
    }
    /**
     * Analyzes the environment to decide whether the panel should be sticky or not.
     * Then handles the positioning of the panel.
     */
    checkIfShouldBeSticky() {
        if (!this.limiterElement || !this.isActive) {
            this._unstick();
            return;
        }
        const { left: visualViewportOffsetLeft, top: visualViewportOffsetTop } = this._getVisualViewportOffset();
        const limiterRect = new Rect(this.limiterElement);
        let visibleLimiterRect = limiterRect.getVisible();
        if (visibleLimiterRect) {
            const windowRect = new Rect(global.window);
            let viewportTopOffset = this.viewportTopOffset;
            if (env.isiOS || env.isSafari) {
                // Adjust the viewport top offset to height visible in the visual viewport.
                viewportTopOffset = visualViewportOffsetTop > this.viewportTopOffset ? 0 : this.viewportTopOffset - visualViewportOffsetTop;
            }
            windowRect.top += viewportTopOffset;
            windowRect.height -= viewportTopOffset;
            visibleLimiterRect = visibleLimiterRect.getIntersection(windowRect);
        }
        limiterRect.moveBy(visualViewportOffsetLeft, visualViewportOffsetTop);
        if (visibleLimiterRect) {
            visibleLimiterRect.moveBy(visualViewportOffsetLeft, visualViewportOffsetTop);
        }
        // Stick the panel only if
        // * the limiter's ancestors are intersecting with each other so that some of their rects are visible,
        // * and the limiter's top edge is above the visible ancestors' top edge.
        if (visibleLimiterRect && limiterRect.top < visibleLimiterRect.top) {
            const visibleLimiterTop = visibleLimiterRect.top;
            // Check if there's a change the panel can be sticky to the bottom of the limiter.
            if (visibleLimiterTop + this._contentPanelRect.height + this.limiterBottomOffset > visibleLimiterRect.bottom) {
                const stickyBottomOffset = Math.max(limiterRect.bottom - visibleLimiterRect.bottom, 0) + this.limiterBottomOffset;
                // Check if sticking the panel to the bottom of the limiter does not cause it to suddenly
                // move upwards if there's not enough space for it.
                // Adding 1 avoids rounding problems and toolbar flickering when offset almost equals the height.
                if (limiterRect.bottom - stickyBottomOffset > limiterRect.top + this._contentPanelRect.height + 1) {
                    this._stickToBottomOfLimiter(stickyBottomOffset);
                }
                else {
                    this._unstick();
                }
            }
            else if (this._contentPanelRect.height + this.limiterBottomOffset < limiterRect.height) {
                this._stickToTopOfAncestors(visibleLimiterTop);
            }
            else {
                this._unstick();
            }
        }
        else {
            this._unstick();
        }
        // @if CK_DEBUG_STICKYPANEL // console.clear();
        // @if CK_DEBUG_STICKYPANEL // console.log( 'isSticky', this.isSticky );
        // @if CK_DEBUG_STICKYPANEL // console.log( '_isStickyToTheBottomOfLimiter', this._isStickyToTheBottomOfLimiter );
        // @if CK_DEBUG_STICKYPANEL // console.log( '_stickyTopOffset', this._stickyTopOffset );
        // @if CK_DEBUG_STICKYPANEL // console.log( '_stickyBottomOffset', this._stickyBottomOffset );
    }
    /**
     * Sticks the panel at the given CSS `top` offset.
     *
     * @private
     * @param topOffset
     */
    _stickToTopOfAncestors(topOffset) {
        this.isSticky = true;
        this._isStickyToTheBottomOfLimiter = false;
        this._stickyTopOffset = topOffset;
        this._stickyBottomOffset = null;
        this._marginLeft = toPx(-global.window.scrollX + this._getVisualViewportOffset().left);
    }
    /**
     * Sticks the panel at the bottom of the limiter with a given CSS `bottom` offset.
     *
     * @private
     * @param stickyBottomOffset
     */
    _stickToBottomOfLimiter(stickyBottomOffset) {
        this.isSticky = true;
        this._isStickyToTheBottomOfLimiter = true;
        this._stickyTopOffset = null;
        this._stickyBottomOffset = stickyBottomOffset;
        this._marginLeft = toPx(-global.window.scrollX + this._getVisualViewportOffset().left);
    }
    /**
     * Unsticks the panel putting it back to its original position.
     *
     * @private
     */
    _unstick() {
        this.isSticky = false;
        this._isStickyToTheBottomOfLimiter = false;
        this._stickyTopOffset = null;
        this._stickyBottomOffset = null;
        this._marginLeft = null;
    }
    /**
     * Returns the bounding rect of the {@link #contentPanelElement}.
     *
     * @private
     */
    get _contentPanelRect() {
        return new Rect(this.contentPanelElement);
    }
    /**
     * Returns normalized visual viewport offsets (only for Safari and iOS).
     */
    _getVisualViewportOffset() {
        const visualViewport = global.window.visualViewport;
        if (!(env.isiOS || env.isSafari) || !visualViewport) {
            return { left: 0, top: 0 };
        }
        const left = Math.max(Math.round(visualViewport.offsetLeft), 0);
        const top = Math.max(Math.round(visualViewport.offsetTop), 0);
        return { left, top };
    }
}
