!function(e){const t=e.en=e.en||{};t.dictionary=Object.assign(t.dictionary||{},{"Page break":"Page break"})}(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={})),
/*!
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */(()=>{var e={835:(e,t,n)=>{"use strict";n.d(t,{A:()=>s});var r=n(758),a=n.n(r),o=n(935),i=n.n(o)()(a());i.push([e.id,'.ck-content .page-break{align-items:center;clear:both;display:flex;justify-content:center;padding:5px 0;position:relative}.ck-content .page-break:after{border-bottom:2px dashed #c4c4c4;content:"";position:absolute;width:100%}.ck-content .page-break__label{background:#fff;border:1px solid #c4c4c4;border-radius:2px;box-shadow:2px 2px 1px rgba(0,0,0,.15);color:#333;display:block;font-family:Helvetica,Arial,Tahoma,Verdana,Sans-Serif;font-size:.75em;font-weight:700;padding:.3em .6em;position:relative;text-transform:uppercase;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1}@media print{.ck-content .page-break{padding:0}.ck-content .page-break:after{display:none}.ck-content :has(+.page-break){margin-bottom:0}}',""]);const s=i},935:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,a,o){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var l=0;l<e.length;l++){var u=[].concat(e[l]);r&&i[u[0]]||(void 0!==o&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=o),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),a&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=a):u[4]="".concat(a)),t.push(u))}},t}},758:e=>{"use strict";e.exports=function(e){return e[1]}},591:e=>{"use strict";var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var o={},i=[],s=0;s<e.length;s++){var c=e[s],l=r.base?c[0]+r.base:c[0],u=o[l]||0,d="".concat(l," ").concat(u);o[l]=u+1;var p=n(d),g={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)t[p].references++,t[p].updater(g);else{var f=a(g,r);r.byIndex=s,t.splice(s,0,{identifier:d,updater:f,references:1})}i.push(d)}return i}function a(e,t){var n=t.domAPI(t);n.update(e);return function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,a){var o=r(e=e||[],a=a||{});return function(e){e=e||[];for(var i=0;i<o.length;i++){var s=n(o[i]);t[s].references--}for(var c=r(e,a),l=0;l<o.length;l++){var u=n(o[l]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}o=c}}},128:e=>{"use strict";var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},51:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},21:e=>{"use strict";e.exports=function(e,t){Object.keys(t).forEach((function(n){e.setAttribute(n,t[n])}))}},639:e=>{"use strict";var t,n=(t=[],function(e,n){return t[e]=n,t.filter(Boolean).join("\n")});function r(e,t,r,a){var o;if(r)o="";else{o="",a.supports&&(o+="@supports (".concat(a.supports,") {")),a.media&&(o+="@media ".concat(a.media," {"));var i=void 0!==a.layer;i&&(o+="@layer".concat(a.layer.length>0?" ".concat(a.layer):""," {")),o+=a.css,i&&(o+="}"),a.media&&(o+="}"),a.supports&&(o+="}")}if(e.styleSheet)e.styleSheet.cssText=n(t,o);else{var s=document.createTextNode(o),c=e.childNodes;c[t]&&e.removeChild(c[t]),c.length?e.insertBefore(s,c[t]):e.appendChild(s)}}var a={singleton:null,singletonCounter:0};e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=a.singletonCounter++,n=a.singleton||(a.singleton=e.insertStyleElement(e));return{update:function(e){r(n,t,!1,e)},remove:function(e){r(n,t,!0,e)}}}},782:(e,t,n)=>{e.exports=n(237)("./src/core.js")},311:(e,t,n)=>{e.exports=n(237)("./src/ui.js")},901:(e,t,n)=>{e.exports=n(237)("./src/widget.js")},237:e=>{"use strict";e.exports=CKEditor5.dll}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var o=t[r]={id:r,exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{"use strict";n.r(r),n.d(r,{PageBreak:()=>k,PageBreakEditing:()=>h,PageBreakUI:()=>y});var e=n(782),t=n(901);class a extends e.Command{refresh(){const e=this.editor.model,n=e.schema,r=e.document.selection;this.isEnabled=function(e,n,r){const a=function(e,n){const r=(0,t.findOptimalInsertionRange)(e,n),a=r.start.parent;if(a.isEmpty&&!a.is("element","$root"))return a.parent;return a}(e,r);return n.checkChild(a,"pageBreak")}(r,n,e)}execute(){const e=this.editor.model;e.change((t=>{const n=t.createElement("pageBreak");e.insertObject(n,null,null,{setSelection:"after"})}))}}var o=n(591),i=n.n(o),s=n(639),c=n.n(s),l=n(128),u=n.n(l),d=n(21),p=n.n(d),g=n(51),f=n.n(g),m=n(835),v={attributes:{"data-cke":!0}};v.setAttributes=p(),v.insert=u().bind(null,"head"),v.domAPI=c(),v.insertStyleElement=f();i()(m.A,v);m.A&&m.A.locals&&m.A.locals;class h extends e.Plugin{static get pluginName(){return"PageBreakEditing"}static get isOfficialPlugin(){return!0}init(){const e=this.editor,n=e.model.schema,r=e.t,o=e.conversion;n.register("pageBreak",{inheritAllFrom:"$blockObject"}),o.for("dataDowncast").elementToStructure({model:"pageBreak",view:(e,{writer:t})=>t.createContainerElement("div",{class:"page-break",style:"page-break-after: always"},t.createContainerElement("span",{style:"display: none"}))}),o.for("editingDowncast").elementToStructure({model:"pageBreak",view:(e,{writer:n})=>{const a=r("Page break"),o=n.createContainerElement("div"),i=n.createRawElement("span",{class:"page-break__label"},(function(e){e.innerText=r("Page break")}));return n.addClass("page-break",o),n.insert(n.createPositionAt(o,0),i),function(e,n,r){return n.setCustomProperty("pageBreak",!0,e),(0,t.toWidget)(e,n,{label:r})}(o,n,a)}}),o.for("upcast").elementToElement({view:e=>{const t="always"==e.getStyle("page-break-before"),n="always"==e.getStyle("page-break-after");if(!t&&!n)return null;if(1==e.childCount){const t=e.getChild(0);if(!t.is("element","span")||"none"!=t.getStyle("display"))return null}else if(e.childCount>1)return null;return{name:!0}},model:"pageBreak",converterPriority:"high"}),e.commands.add("pageBreak",new a(e))}}var b=n(311);class y extends e.Plugin{static get pluginName(){return"PageBreakUI"}static get isOfficialPlugin(){return!0}init(){const e=this.editor;e.ui.componentFactory.add("pageBreak",(()=>{const e=this._createButton(b.ButtonView);return e.set({tooltip:!0}),e})),e.ui.componentFactory.add("menuBar:pageBreak",(()=>this._createButton(b.MenuBarMenuListItemButtonView)))}_createButton(e){const t=this.editor,n=t.locale,r=t.commands.get("pageBreak"),a=new e(t.locale),o=n.t;return a.set({label:o("Page break"),icon:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3.598.687h1.5v5h-1.5zm14.5 0h1.5v5h-1.5z"/><path d="M19.598 4.187v1.5h-16v-1.5zm-16 14.569h1.5v-5h-1.5zm14.5 0h1.5v-5h-1.5z"/><path d="M19.598 15.256v-1.5h-16v1.5zM5.081 9h6v2h-6zm8 0h6v2h-6zm-9.483 1L0 12.5v-5z"/></svg>'}),a.bind("isEnabled").to(r,"isEnabled"),this.listenTo(a,"execute",(()=>{t.execute("pageBreak"),t.editing.view.focus()})),a}}class k extends e.Plugin{static get requires(){return[h,y,t.Widget]}static get pluginName(){return"PageBreak"}static get isOfficialPlugin(){return!0}}})(),(window.CKEditor5=window.CKEditor5||{}).pageBreak=r})();