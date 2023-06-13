/*!
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */(()=>{var t={704:(t,e,o)=>{t.exports=o(79)("./src/core.js")},492:(t,e,o)=>{t.exports=o(79)("./src/engine.js")},273:(t,e,o)=>{t.exports=o(79)("./src/ui.js")},209:(t,e,o)=>{t.exports=o(79)("./src/utils.js")},79:t=>{"use strict";t.exports=CKEditor5.dll}},e={};function o(i){var r=e[i];if(void 0!==r)return r.exports;var n=e[i]={exports:{}};return t[i](n,n.exports,o),n.exports}o.d=(t,e)=>{for(var i in e)o.o(e,i)&&!o.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};(()=>{"use strict";o.r(i),o.d(i,{InlineEditor:()=>C});var t=o(704),e=o(209);const r=function(t){return null!=t&&"object"==typeof t};const n="object"==typeof global&&global&&global.Object===Object&&global;var s="object"==typeof self&&self&&self.Object===Object&&self;const l=(n||s||Function("return this")()).Symbol;var a=Object.prototype,c=a.hasOwnProperty,d=a.toString,h=l?l.toStringTag:void 0;const u=function(t){var e=c.call(t,h),o=t[h];try{t[h]=void 0;var i=!0}catch(t){}var r=d.call(t);return i&&(e?t[h]=o:delete t[h]),r};var p=Object.prototype.toString;const b=function(t){return p.call(t)};var f=l?l.toStringTag:void 0;const g=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":f&&f in Object(t)?u(t):b(t)};const w=function(t,e){return function(o){return t(e(o))}}(Object.getPrototypeOf,Object);var v=Function.prototype,m=Object.prototype,y=v.toString,O=m.hasOwnProperty,T=y.call(Object);const j=function(t){if(!r(t)||"[object Object]"!=g(t))return!1;var e=w(t);if(null===e)return!0;var o=O.call(e,"constructor")&&e.constructor;return"function"==typeof o&&o instanceof o&&y.call(o)==T};const E=function(t){return r(t)&&1===t.nodeType&&!j(t)};var P=o(273),x=o(492);class _ extends t.EditorUI{constructor(t,e){super(t),this.view=e,this._toolbarConfig=(0,P.normalizeToolbarConfig)(t.config.get("toolbar"))}get element(){return this.view.editable.element}init(){const t=this.editor,e=this.view,o=t.editing.view,i=e.editable,r=o.document.getRoot();i.name=r.rootName,e.render();const n=i.element;this.setEditableElement(i.name,n),i.bind("isFocused").to(this.focusTracker),o.attachDomRoot(n),this._initPlaceholder(),this._initToolbar(),this.fire("ready")}destroy(){super.destroy();const t=this.view;this.editor.editing.view.detachDomRoot(t.editable.name),t.destroy()}_initToolbar(){const t=this.editor,e=this.view,o=e.editable.element,i=e.toolbar;e.panel.bind("isVisible").to(this.focusTracker,"isFocused"),e.bind("viewportTopOffset").to(this,"viewportOffset",(({top:t})=>t||0)),e.listenTo(t.ui,"update",(()=>{e.panel.isVisible&&e.panel.pin({target:o,positions:e.panelPositions})})),i.fillFromConfig(this._toolbarConfig,this.componentFactory),this.addToolbar(i)}_initPlaceholder(){const t=this.editor,e=t.editing.view,o=e.document.getRoot(),i=t.sourceElement,r=t.config.get("placeholder")||i&&"textarea"===i.tagName.toLowerCase()&&i.getAttribute("placeholder");r&&(0,x.enablePlaceholder)({view:e,element:o,text:r,isDirectHost:!1,keepOnFocus:!0})}}const F=(0,e.toUnit)("px");class S extends P.EditorUIView{constructor(t,e,o,i={}){super(t);const r=t.t;this.toolbar=new P.ToolbarView(t,{shouldGroupWhenFull:i.shouldToolbarGroupWhenFull,isFloating:!0}),this.set("viewportTopOffset",0),this.panel=new P.BalloonPanelView(t),this.panelPositions=this._getPanelPositions(),this.panel.extendTemplate({attributes:{class:"ck-toolbar-container"}}),this.editable=new P.InlineEditableUIView(t,e,o,{label:t=>r("Rich Text Editor. Editing area: %0",t.name)}),this._resizeObserver=null}render(){super.render(),this.body.add(this.panel),this.registerChild(this.editable),this.panel.content.add(this.toolbar);if(this.toolbar.options.shouldGroupWhenFull){const t=this.editable.element;this._resizeObserver=new e.ResizeObserver(t,(()=>{this.toolbar.maxWidth=F(new e.Rect(t).width)}))}}destroy(){super.destroy(),this._resizeObserver&&this._resizeObserver.destroy()}_getPanelPositionTop(t,e){let o;return o=t.top>e.height+this.viewportTopOffset?t.top-e.height:t.bottom>e.height+this.viewportTopOffset+50?this.viewportTopOffset:t.bottom,o}_getPanelPositions(){const t=[(t,e)=>({top:this._getPanelPositionTop(t,e),left:t.left,name:"toolbar_west",config:{withArrow:!1}}),(t,e)=>({top:this._getPanelPositionTop(t,e),left:t.left+t.width-e.width,name:"toolbar_east",config:{withArrow:!1}})];return"ltr"===this.locale.uiLanguageDirection?t:t.reverse()}}class C extends((0,t.DataApiMixin)((0,t.ElementApiMixin)(t.Editor))){constructor(o,i={}){if(!D(o)&&void 0!==i.initialData)throw new e.CKEditorError("editor-create-initial-data",null);super(i),void 0===this.config.get("initialData")&&this.config.set("initialData",function(t){return D(t)?(0,e.getDataFromElement)(t):t}(o)),this.model.document.createRoot(),D(o)&&(this.sourceElement=o,(0,t.secureSourceElement)(this));const r=!this.config.get("toolbar.shouldNotGroupWhenFull"),n=new S(this.locale,this.editing.view,this.sourceElement,{shouldToolbarGroupWhenFull:r});this.ui=new _(this,n),(0,t.attachToForm)(this)}destroy(){const t=this.getData();return this.ui.destroy(),super.destroy().then((()=>{this.sourceElement&&this.updateSourceElement(t)}))}static create(t,o={}){return new Promise((i=>{if(D(t)&&"TEXTAREA"===t.tagName)throw new e.CKEditorError("editor-wrong-element",null);const r=new this(t,o);i(r.initPlugins().then((()=>r.ui.init())).then((()=>r.data.init(r.config.get("initialData")))).then((()=>r.fire("ready"))).then((()=>r)))}))}}function D(t){return E(t)}})(),(window.CKEditor5=window.CKEditor5||{}).editorInline=i})();