!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.cm=t():e.cm=t()}(self,(()=>(()=>{"use strict";var e={482:(e,t,s)=>{function i(e){const t={};for(let s=0;s<e.attributes.length;s++){const i=e.attributes[s];i.name.startsWith("data-")&&(t[i.name.slice(5)]=i.value)}return t}function n(e,t){const s=Object.keys(e);for(let i=0;i<s.length;i++){const n=s[i],o=e[n];t[n]!==o&&t.setAttribute("data-"+n,o)}}s.d(t,{RT:()=>i,X7:()=>n})}},t={};function s(i){var n=t[i];if(void 0!==n)return n.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,s),o.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};function n(){const e=document.cookie.split(";"),t=[],s=new RegExp("^\\s*([^=]+)\\s*=\\s*(.*?)$");for(let i=0;i<e.length;i++){const n=e[i],o=s.exec(n);null!==o&&t.push({name:o[1],value:o[2]})}return t}function o(e,t,s){let i=e+"=; Max-Age=-99999999;";document.cookie=i,i+=" path="+(t||"/")+";",document.cookie=i,void 0!==s&&(i+=" domain="+s+";",document.cookie=i)}s.r(i),s.d(i,{default:()=>f});var r=s(482);class a{constructor(e,t){this.key=e.storageName,this.handle=t}get(){return this.handle.getItem(this.key)}getWithKey(e){return this.handle.getItem(e)}set(e){return this.handle.setItem(this.key,e)}setWithKey(e,t){return this.handle.setItem(e,t)}delete(){return this.handle.removeItem(this.key)}deleteWithKey(e){return this.handle.removeItem(e)}}class c extends a{constructor(e){super(e,sessionStorage)}}const l={cookie:class{constructor(e){this.cookieName=e.storageName,this.cookieDomain=e.cookieDomain,this.cookiePath=e.cookiePath,this.cookieExpiresAfterDays=e.cookieExpiresAfterDays}get(){const e=function(e){const t=n();for(let s=0;s<t.length;s++)if(t[s].name===e)return t[s];return null}(this.cookieName);return e?e.value:null}set(e){return function(e,t,s,i,n){let o="";if(s){const e=new Date;e.setTime(e.getTime()+24*s*60*60*1e3),o="; expires="+e.toUTCString()}void 0!==i&&(o+="; domain="+i),o+=void 0!==n?"; path="+n:"; path=/",document.cookie=e+"="+(t||"")+o+"; SameSite=Lax"}(this.cookieName,e,this.cookieExpiresAfterDays,this.cookieDomain,this.cookiePath)}delete(){return o(this.cookieName)}},test:class{constructor(){this.value=null}get(){return this.value}set(e){this.value=e}delete(){this.value=null}},localStorage:class extends a{constructor(e){super(e,localStorage)}},sessionStorage:c};function h(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,i)}return s}function d(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?h(Object(s),!0).forEach((function(t){var i,n,o,r;i=e,n=t,o=s[t],(n="symbol"==typeof(r=function(e,t){if("object"!=typeof e||!e)return e;var s=e[Symbol.toPrimitive];if(void 0!==s){var i=s.call(e,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n))?r:String(r))in i?Object.defineProperty(i,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):i[n]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):h(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}class f{constructor(e,t,s){this.config=e,this.store=void 0!==t?t:new l[this.storageMethod](this),void 0===this.store&&(this.store=l.cookie),this.auxiliaryStore=void 0!==s?s:new c(this),this.consents=this.defaultConsents,this.confirmed=!1,this.changed=!1,this.states={},this.initialized={},this.executedOnce={},this.watchers=new Set([]),this.loadConsents(),this.applyConsents(),this.savedConsents=d({},this.consents)}get storageMethod(){return this.config.storageMethod||"cookie"}get storageName(){return this.config.storageName||this.config.cookieName||"klaro"}get cookieDomain(){return this.config.cookieDomain||void 0}get cookiePath(){return this.config.cookiePath||void 0}get cookieExpiresAfterDays(){return this.config.cookieExpiresAfterDays||120}get defaultConsents(){const e={};for(let t=0;t<this.config.services.length;t++){const s=this.config.services[t];e[s.name]=this.getDefaultConsent(s)}return e}watch(e){this.watchers.has(e)||this.watchers.add(e)}unwatch(e){this.watchers.has(e)&&this.watchers.delete(e)}notify(e,t){this.watchers.forEach((s=>{s.update(this,e,t)}))}getService(e){const t=this.config.services.filter((t=>t.name===e));if(t.length>0)return t[0]}getDefaultConsent(e){let t=e.default||e.required;return void 0===t&&(t=this.config.default),void 0===t&&(t=!1),t}changeAll(e){let t=0;return this.config.services.filter((e=>!e.contextualConsentOnly)).map((s=>{s.required||this.config.required||e?this.updateConsent(s.name,!0)&&t++:this.updateConsent(s.name,!1)&&t++})),t}updateConsent(e,t){const s=(this.consents[e]||!1)!==t;return this.consents[e]=t,this.notify("consents",this.consents),s}resetConsents(){this.consents=this.defaultConsents,this.states={},this.confirmed=!1,this.applyConsents(),this.savedConsents=d({},this.consents),this.store.delete(),this.notify("consents",this.consents)}getConsent(e){return this.consents[e]||!1}loadConsents(){const e=this.store.get();return null!==e&&(this.consents=JSON.parse(decodeURIComponent(e)),this._checkConsents(),this.notify("consents",this.consents)),this.consents}saveAndApplyConsents(e){this.saveConsents(e),this.applyConsents()}changedConsents(){const e={};for(const[t,s]of Object.entries(this.consents))this.savedConsents[t]!==s&&(e[t]=s);return e}saveConsents(e){const t=encodeURIComponent(JSON.stringify(this.consents));this.store.set(t),this.confirmed=!0,this.changed=!1;const s=this.changedConsents();this.savedConsents=d({},this.consents),this.notify("saveConsents",{changes:s,consents:this.consents,type:e||"script"})}applyConsents(e,t,s){function i(e,t){if(void 0===e)return;let s;return s="function"==typeof e?e:new Function("opts",e),s(t)}let n=0;for(let e=0;e<this.config.services.length;e++){const t=this.config.services[e];if(void 0!==s&&s!==t.name)continue;const n=t.vars||{},o={service:t,config:this.config,vars:n};this.initialized[t.name]||(this.initialized[t.name]=!0,i(t.onInit,o))}for(let o=0;o<this.config.services.length;o++){const r=this.config.services[o];if(void 0!==s&&s!==r.name)continue;const a=this.states[r.name],c=r.vars||{},l=void 0!==r.optOut?r.optOut:this.config.optOut||!1,h=void 0!==r.required?r.required:this.config.required||!1,d=this.confirmed||l||e||t,f=this.getConsent(r.name)&&d||h,u={service:r,config:this.config,vars:c,consents:this.consents,confirmed:this.confirmed};a!==f&&n++,e||(i(f?r.onAccept:r.onDecline,u),this.updateServiceElements(r,f),this.updateServiceStorage(r,f),void 0!==r.callback&&r.callback(f,r),void 0!==this.config.callback&&this.config.callback(f,r),this.states[r.name]=f)}return this.notify("applyConsents",n,s),n}updateServiceElements(e,t){if(t){if(e.onlyOnce&&this.executedOnce[e.name])return;this.executedOnce[e.name]=!0}const s=document.querySelectorAll("[data-name='"+e.name+"']");for(let i=0;i<s.length;i++){const n=s[i],o=n.parentElement,a=(0,r.RT)(n),{type:c,src:l,href:h}=a,d=["href","src","type"];if("placeholder"!==c)if("IFRAME"===n.tagName){if(t&&n.src===l){console.debug(`Skipping ${n.tagName} for service ${e.name}, as it already has the correct type...`);continue}const s=document.createElement(n.tagName);for(const e of n.attributes)s.setAttribute(e.name,e.value);s.innerText=n.innerText,s.text=n.text,t?(void 0!==a["original-display"]&&(s.style.display=a["original-display"]),void 0!==a.src&&(s.src=a.src)):(s.src="",void 0!==a["modified-by-klaro"]&&void 0!==a["original-display"]?s.setAttribute("data-original-display",a["original-display"]):(void 0!==n.style.display&&s.setAttribute("data-original-display",n.style.display),s.setAttribute("data-modified-by-klaro","yes")),s.style.display="none"),o.insertBefore(s,n),o.removeChild(n)}else if("SCRIPT"===n.tagName||"LINK"===n.tagName){if(t&&n.type===(c||"")&&n.src===l){console.debug(`Skipping ${n.tagName} for service ${e.name}, as it already has the correct type or src...`);continue}const s=document.createElement(n.tagName);for(const e of n.attributes)s.setAttribute(e.name,e.value);s.innerText=n.innerText,s.text=n.text,t?(s.type=c||"",void 0!==l&&(s.src=l),void 0!==h&&(s.href=h)):s.type="text/plain",o.insertBefore(s,n),o.removeChild(n)}else{if(t){for(const e of d){const t=a[e];void 0!==t&&(void 0===a["original-"+e]&&(a["original-"+e]=n[e]),n[e]=t)}void 0!==a.title&&(n.title=a.title),void 0!==a["original-display"]?n.style.display=a["original-display"]:n.style.removeProperty("display")}else{void 0!==a.title&&n.removeAttribute("title"),void 0===a["original-display"]&&void 0!==n.style.display&&(a["original-display"]=n.style.display),n.style.display="none";for(const e of d)void 0!==a[e]&&(void 0!==a["original-"+e]?n[e]=a["original-"+e]:n.removeAttribute(e))}(0,r.X7)(a,n)}else t?(n.style.display="none",a["original-display"]=n.style.display):n.style.display=a["original-display"]||"block"}}updateServiceStorage(e,t){if(!t&&void 0!==e.cookies&&e.cookies.length>0){const t=n();for(let s=0;s<e.cookies.length;s++){let i,n,r=e.cookies[s];if(r instanceof Array)[r,i,n]=r;else if(r instanceof Object&&!(r instanceof RegExp)){const e=r;r=e.pattern,i=e.path,n=e.domain}if(void 0!==r){r instanceof RegExp||(r=r.startsWith("^")?new RegExp(r):new RegExp("^"+r.replace(/[-[\]/{}()*+?.\\^$|]/g,"\\$&")+"$"));for(let e=0;e<t.length;e++){const s=t[e];null!==r.exec(s.name)&&(console.debug("Deleting cookie:",s.name,"Matched pattern:",r,"Path:",i,"Domain:",n),o(s.name,i,n),void 0===n&&o(s.name,i,"."+window.location.hostname))}}}}}_checkConsents(){let e=!0;const t=new Set(this.config.services.map((e=>e.name))),s=new Set(Object.keys(this.consents));for(const e of Object.keys(this.consents))t.has(e)||delete this.consents[e];for(const t of this.config.services)s.has(t.name)||(this.consents[t.name]=this.getDefaultConsent(t),e=!1);this.confirmed=e,e||(this.changed=!0)}}return i})()));