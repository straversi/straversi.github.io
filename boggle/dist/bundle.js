!function(t){var e={};function i(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(s,o,function(e){return t[e]}.bind(null,o));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const s="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,o=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},r=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${r}--\x3e`,a=new RegExp(`${r}|${n}`),l="$lit$";class d{constructor(t,e){this.parts=[],this.element=e;const i=[],s=[],o=document.createTreeWalker(e.content,133,null,!1);let n=0,d=-1,h=0;const{strings:f,values:{length:g}}=t;for(;h<g;){const t=o.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let s=0;for(let t=0;t<i;t++)c(e[t].name,l)&&s++;for(;s-- >0;){const e=f[h],i=u.exec(e)[2],s=i.toLowerCase()+l,o=t.getAttribute(s);t.removeAttribute(s);const r=o.split(a);this.parts.push({type:"attribute",index:d,name:i,strings:r}),h+=r.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),o.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(r)>=0){const s=t.parentNode,o=e.split(a),r=o.length-1;for(let e=0;e<r;e++){let i,r=o[e];if(""===r)i=p();else{const t=u.exec(r);null!==t&&c(t[2],l)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-l.length)+t[3]),i=document.createTextNode(r)}s.insertBefore(i,t),this.parts.push({type:"node",index:++d})}""===o[r]?(s.insertBefore(p(),t),i.push(t)):t.data=o[r],h+=r}}else if(8===t.nodeType)if(t.data===r){const e=t.parentNode;null!==t.previousSibling&&d!==n||(d++,e.insertBefore(p(),t)),n=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(i.push(t),d--),h++}else{let e=-1;for(;-1!==(e=t.data.indexOf(r,e+1));)this.parts.push({type:"node",index:-1}),h++}}else o.currentNode=s.pop()}for(const t of i)t.parentNode.removeChild(t)}}const c=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},h=t=>-1!==t.index,p=()=>document.createComment(""),u=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,f=133;function g(t,e){const{element:{content:i},parts:s}=t,o=document.createTreeWalker(i,f,null,!1);let r=b(s),n=s[r],a=-1,l=0;const d=[];let c=null;for(;o.nextNode();){a++;const t=o.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(d.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==n&&n.index===a;)n.index=null!==c?-1:n.index-l,n=s[r=b(s,r)]}d.forEach(t=>t.parentNode.removeChild(t))}const m=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,f,null,!1);for(;i.nextNode();)e++;return e},b=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(h(e))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const v=new WeakMap,x=t=>"function"==typeof t&&v.has(t),_={},y={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class w{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,o=document.createTreeWalker(t,133,null,!1);let r,n=0,a=0,l=o.nextNode();for(;n<i.length;)if(r=i[n],h(r)){for(;a<r.index;)a++,"TEMPLATE"===l.nodeName&&(e.push(l),o.currentNode=l.content),null===(l=o.nextNode())&&(o.currentNode=e.pop(),l=o.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,r.name,r.strings,this.options));n++}else this.__parts.push(void 0),n++;return s&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const S=` ${r} `;class k{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let s=0;s<t;s++){const t=this.strings[s],o=t.lastIndexOf("\x3c!--");i=(o>-1||i)&&-1===t.indexOf("--\x3e",o+1);const a=u.exec(t);e+=null===a?t+(i?S:n):t.substr(0,a.index)+a[1]+a[2]+l+a[3]+r}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const P=t=>null===t||!("object"==typeof t||"function"==typeof t),C=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class E{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new N(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(P(t)||!C(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===_||P(t)&&t===this.value||(this.value=t,x(t)||(this.committer.dirty=!0))}commit(){for(;x(this.value);){const t=this.value;this.value=_,t(this)}this.value!==_&&this.committer.commit()}}class z{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(p()),this.endNode=t.appendChild(p())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=p()),t.__insert(this.endNode=p())}insertAfterPart(t){t.__insert(this.startNode=p()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;x(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}const t=this.__pendingValue;t!==_&&(P(t)?t!==this.value&&this.__commitText(t):t instanceof k?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):C(t)?this.__commitIterable(t):t===y?(this.value=y,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof w&&this.value.template===e)this.value.update(t.values);else{const i=new w(e,t.processor,this.options),s=i._clone();i.update(t.values),this.__commitNode(s),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const o of t)void 0===(i=e[s])&&(i=new z(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(o),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){o(this.startNode.parentNode,t.nextSibling,this.endNode)}}class O{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;x(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=_}}class A extends E{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends N{}let j=!1;(()=>{try{const t={get capture(){return j=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class R{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;x(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=q(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=_}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const q=t=>t&&(j?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function M(t){let e=$.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},$.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(r);return void 0===(i=e.keyString.get(s))&&(i=new d(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const $=new Map,U=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const V=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,e,i,s){const o=e[0];return"."===o?new A(t,e.slice(1),i).parts:"@"===o?[new R(t,e.slice(1),s.eventContext)]:"?"===o?[new O(t,e.slice(1),i)]:new E(t,e,i).parts}handleTextExpression(t){return new z(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const L=(t,...e)=>new k(t,e,"html",V),B=(t,e)=>`${t}--${e}`;let F=!0;void 0===window.ShadyCSS?F=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),F=!1);const Q=t=>e=>{const i=B(e.type,t);let s=$.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},$.set(i,s));let o=s.stringsArray.get(e.strings);if(void 0!==o)return o;const n=e.strings.join(r);if(void 0===(o=s.keyString.get(n))){const i=e.getTemplateElement();F&&window.ShadyCSS.prepareTemplateDom(i,t),o=new d(e,i),s.keyString.set(n,o)}return s.stringsArray.set(e.strings,o),o},W=["html","svg"],D=new Set,I=(t,e,i)=>{D.add(t);const s=i?i.element:document.createElement("template"),o=e.querySelectorAll("style"),{length:r}=o;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(s,t);const n=document.createElement("style");for(let t=0;t<r;t++){const e=o[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}(t=>{W.forEach(e=>{const i=$.get(B(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),g(t,i)})})})(t);const a=s.content;i?function(t,e,i=null){const{element:{content:s},parts:o}=t;if(null==i)return void s.appendChild(e);const r=document.createTreeWalker(s,f,null,!1);let n=b(o),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===i&&(a=m(e),i.parentNode.insertBefore(e,i));-1!==n&&o[n].index===l;){if(a>0){for(;-1!==n;)o[n].index+=a,n=b(o,n);return}n=b(o,n)}}(i,n,a.firstChild):a.insertBefore(n,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(n,a.firstChild);const t=new Set;t.add(n),g(i,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const Z={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},H=(t,e)=>e!==t&&(e==e||t==t),Y={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:H},J=1,X=4,K=8,G=16,tt="finalized";class et extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Y){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(i){const s=this[t];this[e]=i,this._requestUpdate(t,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||Y}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(tt)||t.finalize(),this[tt]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=H){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||Z,o="function"==typeof s?s:s.fromAttribute;return o?o(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||Z.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=Y){const s=this.constructor,o=s._attributeNameForProperty(t,i);if(void 0!==o){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|K,null==t?this.removeAttribute(o):this.setAttribute(o,t),this._updateState=this._updateState&~K}}_attributeToProperty(t,e){if(this._updateState&K)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i.getPropertyOptions(s);this._updateState=this._updateState|G,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~G}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,o=s.getPropertyOptions(t);s._valueHasChanged(this[t],e,o.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==o.reflect||this._updateState&G||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,o))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=this._updateState|X;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&X}get hasUpdated(){return this._updateState&J}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(this._updateState&J||(this._updateState=this._updateState|J,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~X}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}et[tt]=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const it=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),st=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}}:Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}),ot=(t,e,i)=>{e.constructor.createProperty(i,t)};function rt(t){return(e,i)=>void 0!==i?ot(t,e,i):st(t,e)}function nt(t){return(e,i)=>{const s={get(){return this.renderRoot.querySelector(t)},enumerable:!0,configurable:!0};return void 0!==i?at(s,e,i):lt(s,e)}}const at=(t,e,i)=>{Object.defineProperty(e,i,t)},lt=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t});
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const dt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ct=Symbol();class ht{constructor(t,e){if(e!==ct)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(dt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const pt=(t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof ht)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new ht(i,ct)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const ut={};class ft extends et{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(void 0===t)this._styles=[];else if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),s=[];i.forEach(t=>s.unshift(t)),this._styles=s}else this._styles=[t]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?dt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==ut&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return ut}}ft.finalized=!0,ft.render=((t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const s=i.scopeName,r=U.has(e),n=F&&11===e.nodeType&&!!e.host,a=n&&!D.has(s),l=a?document.createDocumentFragment():e;if(((t,e,i)=>{let s=U.get(e);void 0===s&&(o(e,e.firstChild),U.set(e,s=new z(Object.assign({templateFactory:M},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,l,Object.assign({templateFactory:Q(s)},i)),a){const t=U.get(l);U.delete(l);const i=t.value instanceof w?t.value.template:void 0;I(s,l,i),o(e,e.firstChild),e.appendChild(l),U.set(e,t)}!r&&n&&window.ShadyCSS.styleElement(e.host)});
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class gt{constructor(t){this.classes=new Set,this.changed=!1,this.element=t;const e=(t.getAttribute("class")||"").split(/\s+/);for(const t of e)this.classes.add(t)}add(t){this.classes.add(t),this.changed=!0}remove(t){this.classes.delete(t),this.changed=!0}commit(){if(this.changed){let t="";this.classes.forEach(e=>t+=e+" "),this.element.setAttribute("class",t)}}}const mt=new WeakMap,bt=(t=>(...e)=>{const i=t(...e);return v.set(i,!0),i})(t=>e=>{if(!(e instanceof N)||e instanceof T||"class"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:i}=e,{element:s}=i;let o=mt.get(e);void 0===o&&(s.setAttribute("class",i.strings.join(" ")),mt.set(e,o=new Set));const r=s.classList||new gt(s);o.forEach(e=>{e in t||(r.remove(e),o.delete(e))});for(const e in t){const i=t[e];i!=o.has(e)&&(i?(r.add(e),o.add(e)):(r.remove(e),o.delete(e)))}"function"==typeof r.commit&&r.commit()});var vt=function(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};const xt=["left","right","top","bottom","front","back"];let _t=class extends ft{constructor(){super(),this.face="top",this.char="?",this.fauxcused=!1,this.text={left:"A",right:"B",top:"?",bottom:"D",front:"E",back:"F"},this.tabIndex=0,this.addEventListener("keydown",t=>this.enteredChar(t.key)),this.addEventListener("click",()=>{console.log("clicked"),this.input.focus()}),this.addEventListener("focus",()=>{console.log("focused"),this.fauxcused=!0,this.input.focus()}),this.addEventListener("blur",()=>{console.log("blurred"),this.fauxcused=!1})}enteredChar(t){if(console.log("entered ",t),(t=t.toUpperCase()).match(/^([A-Z]|QU)$/)){if(this.char!==t){this.char=t;let e=this._nextFace();this.text[e]=this.char,this.face=e}this.dispatchEvent(new CustomEvent("boggleCharacterEntered",{bubbles:!0,composed:!0}))}}_charWasEntered(){return"?"!==this.char}_nextFace(){let t;do{t=xt[Math.floor(Math.random()*xt.length)]}while(t==this.face);return t}_face(){return L`<svg viewBox="0 0 100 100">
      <path
        d="M0,0 L100,0 100,100 0,100 0,0"
        fill="none"
        stroke="black"
        stroke-width="8"
      />
    </svg>`}_addQuClass(t){return bt({qu:"QU"===t})}render(){return L`
      <input type="text" />
      <div id="scene" class="${bt({fauxcused:!!this.fauxcused})}">
        <div
          class="cube ${this.face} ${this._charWasEntered()?"with-char":""}"
        >
          <div class="cube__face cube__face--front">
            ${this._face()}
            <div class=${this._addQuClass(this.text.front)}>
              ${this.text.front}
            </div>
          </div>
          <div class="cube__face cube__face--back">
            ${this._face()}
            <div class=${this._addQuClass(this.text.back)}>
              ${this.text.back}
            </div>
          </div>
          <div class="cube__face cube__face--right">
            ${this._face()}
            <div class=${this._addQuClass(this.text.right)}>
              ${this.text.right}
            </div>
          </div>
          <div class="cube__face cube__face--left">
            ${this._face()}
            <div class=${this._addQuClass(this.text.left)}>
              ${this.text.left}
            </div>
          </div>
          <div class="cube__face cube__face--top">
            ${this._face()}
            <div class=${this._addQuClass(this.text.top)}>${this.text.top}</div>
          </div>
          <div class="cube__face cube__face--bottom">
            ${this._face()}
            <div class=${this._addQuClass(this.text.bottom)}>
              ${this.text.bottom}
            </div>
          </div>
        </div>
      </div>
    `}};_t.styles=pt`
    :host {
      display: inline-block;
      position: relative;
      --border-color: black;
      --border-width: 0px;
      --z-multiplier: -0.5;
    }

    :host(:hover) {
      cursor: pointer;
    }

    :host(:focus) {
      outline: none;
    }
    .fauxcused path {
      stroke: #42a5f5;
      stroke-width: 12;
    }
    input {
      font-size: 16px;
      position: absolute;
      transform: scale(0);
    }

    #scene {
      width: 100%;
      height: 100%;
      perspective: 1000px;
    }

    .cube {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transform: translateZ(calc(-0.5 * 80px));
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .cube__face {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      /* border: var(--border-width, 0px) solid var(--border-color, red); */
      box-sizing: border-box;
      text-align: center;
    }

    .cube__face > div {
      font-size: var(--cube-font-size, 190px);
      font-family: 'Righteous', sans-serif;
      font-weight: 800;
      color: #9e9e9e;
      display: inline-block;
      line-height: var(--cube-line-height, 82px);
      text-transform: uppercase;
    }
    .cube.with-char > .cube__face > div {
      color: #ff7262;
    }
    .cube__face > div.qu {
      font-size: calc(var(--cube-font-size, 190px) / 1.7);
    }

    .cube__face > svg {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .cube__face--front {
      transform: rotateY(0deg);
    }
    .cube__face--right {
      transform: rotateY(90deg);
    }
    .cube__face--back {
      transform: rotateY(180deg);
    }
    .cube__face--left {
      transform: rotateY(-90deg);
    }
    .cube__face--top {
      transform: rotateX(90deg);
    }
    .cube__face--bottom {
      transform: rotateX(-90deg);
    }
    .cube__face--front {
      transform: rotateY(0deg) translateZ(calc(0.5 * var(--cube-width, 80px)));
    }
    .cube__face--right {
      transform: rotateY(90deg) translateZ(calc(0.5 * var(--cube-width, 80px)));
    }
    .cube__face--back {
      transform: rotateY(180deg) translateZ(calc(0.5 * var(--cube-width, 80px)));
    }
    .cube__face--left {
      transform: rotateY(-90deg) translateZ(calc(0.5 * var(--cube-width, 80px)));
    }
    .cube__face--top {
      transform: rotateX(90deg) translateZ(calc(0.5 * var(--cube-width, 80px)));
    }
    .cube__face--bottom {
      transform: rotateX(-90deg) translateZ(calc(0.5 * var(--cube-width, 80px)));
    }

    .cube.front {
      transform: translateZ(calc(var(--z-multiplier) * var(--cube-width, 80px)))
        rotateY(0deg);
    }
    .cube.right {
      transform: translateZ(calc(var(--z-multiplier) * var(--cube-width, 80px)))
        rotateY(-90deg);
    }
    .cube.back {
      transform: translateZ(calc(var(--z-multiplier) * var(--cube-width, 80px)))
        rotateY(-180deg);
    }
    .cube.left {
      transform: translateZ(calc(var(--z-multiplier) * var(--cube-width, 80px)))
        rotateY(90deg);
    }
    .cube.top {
      transform: translateZ(calc(var(--z-multiplier) * var(--cube-width, 80px)))
        rotateX(-90deg);
    }
    .cube.bottom {
      transform: translateZ(calc(var(--z-multiplier) * var(--cube-width, 80px)))
        rotateX(90deg);
    }
  `,vt([rt()],_t.prototype,"face",void 0),vt([rt()],_t.prototype,"char",void 0),vt([rt({type:Boolean,reflect:!0})],_t.prototype,"fauxcused",void 0),vt([nt("input")],_t.prototype,"input",void 0),_t=vt([it("cube-")],_t);var yt=function(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};console.log("yo");let wt=class extends ft{constructor(){super(),this.addEventListener("boggleCharacterEntered",t=>{const e=Array.from(this.cubes),i=t.composedPath()[0],s=e.indexOf(i);s!==e.length-1?e[s+1].focus():document.activeElement.blur(),this.board().flat().includes("?")||this.dispatchEvent(new CustomEvent("boardFilled",{bubbles:!0,composed:!0}))}),window.addEventListener("resize",()=>this.updateCubeWidth())}firstUpdated(){this.updateCubeWidth()}updateCubeWidth(){let t=this.cube.getBoundingClientRect().width;this.boardEl.style.setProperty("--cube-width",t+"px"),this.boardEl.style.setProperty("--cube-font-size",.9*t+"px"),this.boardEl.style.setProperty("--cube-line-height",t+"px")}board(){const t=this.cubes;let e=[],i=[],s=1;for(let o of t)i.push(o.char),s%4==0&&(e.push(i),i=[]),s+=1;return e}render(){const t=[];for(let e=0;e<16;e++)t.push(L` <cube-></cube-> `);return L`
      <div id="board">
        <svg id="square" viewBox="0 0 100 100" width="100%" height="100%">
          <rect
            fill="white"
            stroke="black"
            stroke-width="2"
            stroke-linejoin="round"
            x="0"
            y="0"
            width="100%"
            height="100%"
          />
        </svg>

        ${t}

        <svg id="cube-thing" viewBox="0 0 500 500" width="500%" height="500%">
          <path
            d="M 400 0 L 500 100 L 100 500 L 0 500 L 0 400 L 400 0"
            fill="white"
          />
          <path
            d="M 400.4 0 L 0 400 M 0 500 L 400.4 99.6 M 500 99.6 L 100 500"
            stroke="black"
            stroke-width="1"
            stroke-linecap="butt"
          />
        </svg>
      </div>
    `}};var St;wt.styles=pt`
    :host {
      display: block;
      position: relative;
    }
    #board {
      --cube-width: 80px;
      --cube-font-size: 67px;

      width: 100%;
      height: 100%;

      box-sizing: border-box;

      position: relative;

      /* Sets #board as the containing block for fixed position svg descendants */
      transform: translate(0px);
      overflow: visible;

      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(4, 1fr);
      grid-gap: 1em;
      padding: 1em;
    }

    CUBE- {
      transition: transform 0.1s ease-out;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    CUBE-[fauxcused] {
      z-index: 3;
      transform: scale(1.3);
    }
    svg#square {
      z-index: 2;
      position: fixed;
      top: 0px;
      left: 0px;
    }
    svg#cube-thing {
      z-index: 1;
      position: fixed;
      top: 0px;
      right: 0px;
    }
  `,yt([nt("#board")],wt.prototype,"boardEl",void 0),yt([nt("cube-")],wt.prototype,"cube",void 0),yt([(St="cube-",(t,e)=>{const i={get(){return this.renderRoot.querySelectorAll(St)},enumerable:!0,configurable:!0};return void 0!==e?at(i,t,e):lt(i,t)})],wt.prototype,"cubes",void 0),wt=yt([it("boggle-board")],wt);var kt=function(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};let Pt=class extends ft{static mount(t=document.body){const e=document.createElement("q-or-qu");return t.prepend(e),e}async useQu(){return new Promise(t=>{this.addEventListener("qu-decision",e=>{this.parentNode.removeChild(this),t(e.detail.useQu)})})}quDecided(t){this.dispatchEvent(new CustomEvent("qu-decision",{detail:{useQu:t}}))}render(){return L`
      <div id="dialog">
        <div id="buttons">
          <button id="q" @click=${()=>this.quDecided(!1)}>Q</button>
          <span id="or">or</span>
          <button id="qu" @click=${()=>this.quDecided(!0)}>Qu</button>
          <span id="question">?</span>
        </div>
        <div id="form">
          <input checked type="checkbox" id="remember" /><label for="remember"
            >Remember for future boards</label
          >
        </div>
      </div>
    `}};Pt.styles=pt`
    :host {
      background: rgba(0, 0, 0, 0.8);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    #dialog {
      display: block;
      border: 3px solid black;
      background: white;
      padding-top: 26px;
      padding-bottom: 12px;
      --button-size: 100px;
      position: absolute;
      width: 349px;
      max-width: calc(100% - 10px);
      box-sizing: border-box;
      top: 81px;
      left: 50%;
      transform: translate(-50%);
    }
    #buttons {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #or {
      font-family: sans-serif;
      font-weight: 700;
      font-size: 30px;
      padding-left: 10px;
      padding-right: 14px;
    }
    button {
      position: relative;
      font-family: 'Righteous';
      font-size: 70px;
      width: var(--button-size);
      height: var(--button-size);
      padding: 0;
      background: #e8f8ff;
      border: 6px solid #1abcfe;
      border-radius: 10px;
      box-shadow: -4px 4px 0px 0px #0e80ae;
      cursor: pointer;
    }
    button:hover {
      box-shadow: -3px 3px 0px 0px #0e80ae;
      left: -1px;
      top: 1px;
    }
    button:active {
      box-shadow: none;
      left: -4px;
      top: 4px;
    }
    #q {
      margin-left: 16px;
    }
    #qu {
      width: calc(var(--button-size) + 20px);
    }
    #question {
      font-family: 'Righteous';
      font-size: 34px;
      padding-left: 10px;
    }
    input {
      transform: scale(1.4) translateY(-1px);
      margin-right: 10px;
    }
    #form {
      font-family: sans-serif;
      left: -10px;
      position: relative;
      margin-top: 30px;
      text-align: center;
    }
  `,Pt=kt([it("q-or-qu")],Pt);var Ct=function(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};let Et=class extends ft{constructor(){super(),this.disabled=!0,this.tabIndex=0}render(){return L`
      <div id="solve-button">
        <div id="left-items">
          <span>solve</span>
        </div>
        <div id="right-items">
          <svg class="arrow" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
              fill="#fff"
            />
          </svg>
        </div>
        <svg class="square" viewBox="-1 -1 102 102">
          <path
            d="M85,0 L0,85 0,90 15,90 100,5 M85,5 L0,90"
            fill="#fff"
            stroke="black"
            stroke-width="0.2"
            stroke-linejoin="miter"
          />
          <path
            d="M85,0 L100,0 100,5 85,5 85,0"
            fill="${this.disabled?"#999":"#FF7262"}"
            stroke="black"
            stroke-width="0.2"
            stroke-linejoin="miter"
          />
        </svg>
      </div>
    `}};Et.styles=pt`
    :host {
      display: block;
      width: 246px;
      height: 84px;
    }
    #solve-button {
      color: white;
      font-family: 'Righteous', sans-serif;
      font-size: 40px;
      position: relative;
      line-height: 84px;
      text-transform: uppercase;
      z-index: 1;
      cursor: pointer;
    }
    #left-items {
      position: absolute;
      top: 0;
      left: 24px;
      right: 0;
      bottom: 0;
      text-align: left;
      z-index: 1;
    }
    #right-items {
      position: absolute;
      top: 0;
      left: 0;
      right: 24px;
      bottom: 0;
      text-align: right;
      z-index: 1;
    }
    .arrow {
      display: inline-block;
      width: 36px;
      height: 36px;
      vertical-align: -3px;
    }

    .square {
      position: absolute;
      top: -16px;
      right: -16px;
      width: calc(418px * 4);
    }
  `,Ct([rt({type:Boolean})],Et.prototype,"disabled",void 0),Et=Ct([it("solve-button")],Et);var Nt=function(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};let zt=class extends ft{constructor(){super(...arguments),this.words=[]}render(){return L`
      <div id="words-container">
        <ul>
          ${this.words.map(t=>L`<li>
                <span class="points">+${t.points}</span
                ><span class="word">${t.word}</span>
              </li>`)}
        </ul>
        <svg id="bottom-quad" viewBox="0 0 100 100">
          <!-- overhang slightly to left so left-quad controls the shared border -->
          <path
            d="M 77 0 l -100 100
               l 23 0 l 100 -100"
            stroke-width="0"
            fill="white"
          ></path>
        </svg>
        <svg id="left-quad" viewBox="0 0 100 100">
          <path
            d="M 100 0 l -100 100
               l 0 20 l 100 -100"
            stroke-width="0"
            fill="white"
          ></path>
        </svg>
        <svg id="line-1" viewBox="0 0 100 100">
          <path
            d="M 100 0 L 0 100"
            fill="none"
            stroke="black"
            stroke-width="0.6"
            stroke-linejoin="miter"
          />
        </svg>
        <svg id="line-2" viewBox="0 0 100 100">
          <path
            d="M 100 0 L 0 100"
            fill="none"
            stroke="black"
            stroke-width="0.6"
            stroke-linejoin="miter"
          />
        </svg>
        <svg id="line-3" viewBox="0 0 100 100">
          <path
            d="M 100 0 L 0 100"
            fill="none"
            stroke="black"
            stroke-width="0.6"
            stroke-linejoin="miter"
          />
        </svg>
      </div>
    `}};zt.styles=pt`
    :host {
      display: block;
    }
    ul {
      font-family: 'Righteous';
      font-size: 36px;
      list-style: none;
      padding: 0px 0px 0px 18px;
      margin: 0;
      height: 100%;
      overflow: scroll;
      position: relative;
      z-index: 3;
      border: 3px solid black;
      /* box-shadow: inset 0px 0px 0px 1px black; */
    }
    li {
      padding-right: 28px;
      display: flex;
      align-items: center;
    }
    li span.word {
      flex: 1;
      text-align: left;
    }
    li span.points {
      font-size: 28px;
      color: #a259ff;
      margin-right: 18px;
    }
    #words-container {
      padding: 0px;
      position: relative;
      width: 100%;
      height: 100%;
      background: white;
      box-sizing: border-box;
    }
    #bottom-quad {
      width: 500%;
      right: 0px;
      top: 100%;
      position: absolute;
    }
    #left-quad {
      height: 500%;
      right: calc(100% - 2px);
      top: 0px;
      position: absolute;
    }
    #line-1,
    #line-2,
    #line-3 {
      position: absolute;
      z-index: 2;
      width: 500px;
    }
    #line-1 {
      right: calc(100% - 3px);
      top: 0;
    }
    #line-2 {
      right: calc(100% - 2px);
      top: calc(100% + 5px);
    }
    #line-3 {
      right: 0;
      top: calc(100% + 5px);
    }
  `,Nt([rt({attribute:!1})],zt.prototype,"words",void 0),zt=Nt([it("word-box")],zt),i.d(e,"BoggleSolver",function(){return At});var Ot=function(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};let At=class extends ft{constructor(){super(),this.state="unsolved",this.qu=void 0,this.addEventListener("keydown",this.handleKeydown,{capture:!0}),this.addEventListener("boardFilled",()=>{this.state="ready",this.solveButton.focus()})}async handleKeydown(t){if("Q"===t.key.toUpperCase()){t.stopPropagation();const e=t.composedPath().find(t=>"CUBE-"===t.tagName);void 0===this.qu&&(this.qu=await Pt.mount().useQu());const i=this.qu?"QU":"Q";e.enteredChar(i)}}async solve(t){console.log("sending board:",t);const e={board:t},i=new Request("https://api.steven.codes/boggle/solve",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}),s=await fetch(i);return await s.json()}displayWords(t){this.wordBox.words=t.map(t=>({word:t[0],points:t[1]}))}async solveButtonClicked(){if("ready"!==this.state)return;this.state="solving";const t=await this.solve(this.boggleBoard.board());this.displayWords(t),this.state="solved",console.log("solved.")}render(){return L`<div id="container">
      <boggle-board></boggle-board>
      <div id="results">
        <solve-button
          class="${this.state}"
          ?disabled=${"unsolved"===this.state}
          @click=${()=>this.solveButtonClicked()}
        ></solve-button>
        <word-box class="${this.state}"></word-box>
      </div>
    </div>`}};At.styles=pt`
    :host {
      --word-box-width: 293px;
      --word-box-height: 380px;
      margin: 0;
    }

    #container {
      overflow-y: hidden; /* hides the overflowing svgs in the components */
      min-height: 100vh; /*                    ...                       */
      /* 😫 can't flex wrap because need to change the z-index when wrapped */
      --container-padding: 12px;
      padding: var(--container-padding);
    }

    boggle-board {
      position: relative;
      z-index: 3;
      line-height: normal; /* reset */
      margin: 0 auto;

      --board-width: 400px;
      width: var(--board-width);
      height: var(--board-width);
      max-width: calc(100vmin - 2 * var(--container-padding));
      max-height: calc(100vmin - 2 * var(--container-padding));
    }

    #results {
      position: relative;
    }

    word-box {
      transform: translate(-500px, 500px);
      position: relative;
      width: 100%;
      max-width: 575px;
      margin: 0 auto;
      height: 200px;
      top: calc(-1 * (84px + 40px)); /* height of solve button + its margin */
      z-index: 4;
      line-height: normal; /* reset */
    }

    solve-button {
      position: relative;
      margin: 40px auto;
      z-index: 4;
      /* transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); */
    }

    /* Mobile */
    @media (max-width: 760px) {
    }

    /* Solved states */

    word-box.solved {
      animation-name: run-away;
      animation-duration: 0.8s;
      animation-iteration-count: 1;
      animation-direction: reverse;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transform: translate(0px, 0px);
      /* vertical-align: middle; */
    }

    solve-button.solving,
    solve-button.solved {
      animation-name: run-away;
      animation-duration: 0.8s;
      animation-iteration-count: 1;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transform: translate(-500px, 500px);
    }

    @keyframes run-away {
      0% {
        transform: translate(0px, 0px);
      }
      20% {
        transform: translate(20px, -20px);
      }
      100% {
        transform: translate(-500px, 500px);
      }
    }
  `,Ot([nt("boggle-board")],At.prototype,"boggleBoard",void 0),Ot([nt("word-box")],At.prototype,"wordBox",void 0),Ot([nt("solve-button")],At.prototype,"solveButton",void 0),Ot([rt()],At.prototype,"state",void 0),At=Ot([it("boggle-solver")],At)}]);