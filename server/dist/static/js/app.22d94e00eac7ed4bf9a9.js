webpackJsonp([1],{"2qHL":function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},"3ZBI":function(e,t,n){"use strict";e.exports=function(e,t,n,o,r){return e.config=t,n&&(e.code=n),e.request=o,e.response=r,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},"Di/a":function(e,t,n){"use strict";var o=n("La2s"),r=n("H2iV"),a=n("x+/8"),s=n("nAs4"),i=n("qw5y"),u=n("wsXG");e.exports=function(e){return new Promise(function(t,c){var l=e.data,f=e.headers;o.isFormData(l)&&delete f["Content-Type"];var d=new XMLHttpRequest;if(e.auth){var p=e.auth.username||"",h=e.auth.password||"";f.Authorization="Basic "+btoa(p+":"+h)}if(d.open(e.method.toUpperCase(),a(e.url,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?s(d.getAllResponseHeaders()):null,o={data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:d.status,statusText:d.statusText,headers:n,config:e,request:d};r(t,c,o),d=null}},d.onabort=function(){d&&(c(u("Request aborted",e,"ECONNABORTED",d)),d=null)},d.onerror=function(){c(u("Network Error",e,null,d)),d=null},d.ontimeout=function(){c(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",d)),d=null},o.isStandardBrowserEnv()){var m=n("k3ra"),v=(e.withCredentials||i(e.url))&&e.xsrfCookieName?m.read(e.xsrfCookieName):void 0;v&&(f[e.xsrfHeaderName]=v)}if("setRequestHeader"in d&&o.forEach(f,function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete f[t]:d.setRequestHeader(t,e)}),e.withCredentials&&(d.withCredentials=!0),e.responseType)try{d.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){d&&(d.abort(),c(e),d=null)}),void 0===l&&(l=null),d.send(l)})}},FYPw:function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},H1pc:function(e,t,n){"use strict";var o=n("MqSD");function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r(function(t){e=t}),cancel:e}},e.exports=r},H2iV:function(e,t,n){"use strict";var o=n("wsXG");e.exports=function(e,t,n){var r=n.config.validateStatus;!r||r(n.status)?e(n):t(o("Request failed with status code "+n.status,n.config,null,n.request,n))}},La2s:function(e,t,n){"use strict";var o=n("NwEK"),r=n("fPF1"),a=Object.prototype.toString;function s(e){return"[object Array]"===a.call(e)}function i(e){return null!==e&&"object"==typeof e}function u(e){return"[object Function]"===a.call(e)}function c(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),s(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.call(null,e[r],r,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===a.call(e)},isBuffer:r,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:i,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===a.call(e)},isFile:function(e){return"[object File]"===a.call(e)},isBlob:function(e){return"[object Blob]"===a.call(e)},isFunction:u,isStream:function(e){return i(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function e(){var t={};function n(n,o){"object"==typeof t[o]&&"object"==typeof n?t[o]=e(t[o],n):t[o]=n}for(var o=0,r=arguments.length;o<r;o++)c(arguments[o],n);return t},deepMerge:function e(){var t={};function n(n,o){"object"==typeof t[o]&&"object"==typeof n?t[o]=e(t[o],n):t[o]="object"==typeof n?e({},n):n}for(var o=0,r=arguments.length;o<r;o++)c(arguments[o],n);return t},extend:function(e,t,n){return c(t,function(t,r){e[r]=n&&"function"==typeof t?o(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},MqSD:function(e,t,n){"use strict";function o(e){this.message=e}o.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},o.prototype.__CANCEL__=!0,e.exports=o},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("7+uW"),r=n("zL8q"),a=n.n(r),s=(n("xHuH"),n("tvR6"),n("gI3o")),i=n.n(s),u={name:"App",data:function(){return{appid:"wx1b73f99b71b71538",appSecret:"8040e17bf84df69ae30e08bfe9721d8e",envid:"cloud-database-5hfz6",tokenUrl:"",queryUrl:"",accessToken:"",result:{data:[{Address:"default",Description:"default",RestaurantName:"default",TelephoneNumber:"default",isReviewed:!0}]},schools:"",loading:!1,activeName:"RestaurantTable",updateSchool:{SchoolName:""}}},mounted:function(){this.tokenUrl="/cgi-bin/token?grant_type=client_credential&appid="+this.appid+"&secret="+this.appSecret;this.load()},methods:{do:function(e,t){var n=this;i.a.get(this.tokenUrl).then(function(o){console.log("do:",o.data),n.accessToken=o.data.access_token,console.log("do:",n.accessToken),t(n.envid,n.accessToken,e)},function(){console.log("Unable to get token.")})},query:function(e,t,n){var o=this;console.log(this.accessToken),this.queryUrl="/api/tcb/databasequery?access_token="+t;var r={env:e,query:n};console.log(r),i.a.post(this.queryUrl,r).then(function(e){for(var t in console.log("query success"),o.result=e.data,o.result.data)o.result.data[t]=JSON.parse(o.result.data[t]);console.log(o.result.data)},function(){console.log("Query Failed")})},update:function(e,t,n){console.log(this.accessToken),this.queryUrl="/api/tcb/databaseupdate?access_token="+t;var o={env:e,query:n};console.log(o),i.a.post(this.queryUrl,o).then(function(e){console.log(e.data)},function(){console.log("update Failed")})},load:function(){var e=this;i.a.get("http://111.231.170.248:8082/restaurants").then(function(t){for(var n in e.result=t.data,e.result.data)e.result.data[n]=JSON.parse(e.result.data[n]);e.loading=!1}),i.a.get("http://111.231.170.248:8082/schools").then(function(t){e.schools=t.data,console.log(e.schools)})},onReviewChange:function(e,t){var n=this;this.loading=!0;var o={reviewed:e,id:t};i.a.post("http://111.231.170.248:8082/updateReview",o).then(function(e){console.log(e.data),n.load()},function(){console.log("update Failed")})},onSchoolSubmit:function(){var e=this,t=this.updateSchool;""!=t.SchoolName?i.a.post("http://111.231.170.248:8082/newSchool",t).then(function(t){console.log(t.data),e.load()},function(){console.log("update Failed")}):this.$message("学校名不能为空")}}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[[n("el-tabs",{attrs:{type:"border-card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"餐厅列表",name:"RestaurantTable"}},[[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.result.data,height:"500"}},[n("el-table-column",{attrs:{fixed:"",prop:"Address",label:"地址",width:"150"}}),e._v(" "),n("el-table-column",{attrs:{prop:"Description",label:"描述",width:"120"}}),e._v(" "),n("el-table-column",{attrs:{prop:"RestaurantName",label:"名称",width:"120"}}),e._v(" "),n("el-table-column",{attrs:{prop:"TelephoneNumber",label:"联系电话",width:"120"}}),e._v(" "),n("el-table-column",{attrs:{width:"150",label:"店内环境图片"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("el-image",{staticStyle:{width:"120px",height:"120px"},attrs:{src:e.row.EnvironmentPhoto}})]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"150",label:"门面图片"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("el-image",{staticStyle:{width:"120px",height:"120px"},attrs:{src:e.row.GatePhoto}})]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"150",label:"身份证背面图"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("el-image",{staticStyle:{width:"120px",height:"120px"},attrs:{src:e.row.IdCardBackPhoto}})]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"150",label:"证件照片"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("el-image",{staticStyle:{width:"120px",height:"120px"},attrs:{src:e.row.ProductionLicence}})]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"150",label:"身份证正面图"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("el-image",{staticStyle:{width:"120px",height:"120px"},attrs:{src:e.row.IdCardFrontPhoto}})]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"已审查",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.isReviewed?n("div",[e._v(" 是 ")]):n("div",[e._v(" 否 ")])]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.isReviewed?n("el-button",{attrs:{size:"small",loading:e.loading},on:{click:function(n){return e.onReviewChange(!1,t.row._id)}}},[e._v(" 取消审查 ")]):n("el-button",{attrs:{size:"small",loading:e.loading},on:{click:function(n){return e.onReviewChange(!0,t.row._id)}}},[e._v(" 确认审查 ")])]}}])})],1)]],2),e._v(" "),n("el-tab-pane",{attrs:{label:"所有学校",name:"SchoolTable"}},[[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.schools.data,height:"500"}},[n("el-table-column",{attrs:{fixed:"",prop:"SchoolId",label:"学校Id",width:"150"}}),e._v(" "),n("el-table-column",{attrs:{prop:"SchoolName",label:"学校名称",width:"150"}})],1)],e._v(" "),n("el-form",{attrs:{model:e.updateSchool}},[n("el-form-item",{attrs:{label:"学校名称"}},[n("el-input",{attrs:{"aria-placeholder":"学校名称"},model:{value:e.updateSchool.SchoolName,callback:function(t){e.$set(e.updateSchool,"SchoolName",t)},expression:"updateSchool.SchoolName"}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.onSchoolSubmit}},[e._v("提交")])],1)],1)],2)],1)]],2)},staticRenderFns:[]};var l=n("VU/8")(u,c,!1,function(e){n("e8he")},null,null).exports;o.default.use(a.a),new o.default({el:"#app",render:function(e){return e(l)}})},NwEK:function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),o=0;o<n.length;o++)n[o]=arguments[o];return e.apply(t,n)}}},U60K:function(e,t,n){"use strict";var o=n("La2s"),r=n("NwEK"),a=n("koPw"),s=n("lxi1");function i(e){var t=new a(e),n=r(a.prototype.request,t);return o.extend(n,a.prototype,t),o.extend(n,t),n}var u=i(n("zBDM"));u.Axios=a,u.create=function(e){return i(s(u.defaults,e))},u.Cancel=n("MqSD"),u.CancelToken=n("H1pc"),u.isCancel=n("oYZ2"),u.all=function(e){return Promise.all(e)},u.spread=n("FYPw"),e.exports=u,e.exports.default=u},VbyR:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},Vq9p:function(e,t,n){"use strict";var o=n("La2s");function r(){this.handlers=[]}r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},e8he:function(e,t){},fPF1:function(e,t){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&null!=e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}},feM3:function(e,t,n){"use strict";var o=n("La2s");e.exports=function(e,t){o.forEach(e,function(n,o){o!==t&&o.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[o])})}},gI3o:function(e,t,n){e.exports=n("U60K")},k3ra:function(e,t,n){"use strict";var o=n("La2s");e.exports=o.isStandardBrowserEnv()?{write:function(e,t,n,r,a,s){var i=[];i.push(e+"="+encodeURIComponent(t)),o.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),o.isString(r)&&i.push("path="+r),o.isString(a)&&i.push("domain="+a),!0===s&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},koPw:function(e,t,n){"use strict";var o=n("La2s"),r=n("x+/8"),a=n("Vq9p"),s=n("vUUJ"),i=n("lxi1");function u(e){this.defaults=e,this.interceptors={request:new a,response:new a}}u.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=i(this.defaults,e)).method=e.method?e.method.toLowerCase():"get";var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},u.prototype.getUri=function(e){return e=i(this.defaults,e),r(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},o.forEach(["delete","get","head","options"],function(e){u.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){u.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=u},lxi1:function(e,t,n){"use strict";var o=n("La2s");e.exports=function(e,t){t=t||{};var n={};return o.forEach(["url","method","params","data"],function(e){void 0!==t[e]&&(n[e]=t[e])}),o.forEach(["headers","auth","proxy"],function(r){o.isObject(t[r])?n[r]=o.deepMerge(e[r],t[r]):void 0!==t[r]?n[r]=t[r]:o.isObject(e[r])?n[r]=o.deepMerge(e[r]):void 0!==e[r]&&(n[r]=e[r])}),o.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],function(o){void 0!==t[o]?n[o]=t[o]:void 0!==e[o]&&(n[o]=e[o])}),n}},nAs4:function(e,t,n){"use strict";var o=n("La2s"),r=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,a,s={};return e?(o.forEach(e.split("\n"),function(e){if(a=e.indexOf(":"),t=o.trim(e.substr(0,a)).toLowerCase(),n=o.trim(e.substr(a+1)),t){if(s[t]&&r.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}}),s):s}},oYZ2:function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},qw5y:function(e,t,n){"use strict";var o=n("La2s");e.exports=o.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function r(e){var o=e;return t&&(n.setAttribute("href",o),o=n.href),n.setAttribute("href",o),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=r(window.location.href),function(t){var n=o.isString(t)?r(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},tLbi:function(e,t,n){"use strict";var o=n("La2s");e.exports=function(e,t,n){return o.forEach(n,function(n){e=n(e,t)}),e}},tvR6:function(e,t){},vUUJ:function(e,t,n){"use strict";var o=n("La2s"),r=n("tLbi"),a=n("oYZ2"),s=n("zBDM"),i=n("VbyR"),u=n("2qHL");function c(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return c(e),e.baseURL&&!i(e.url)&&(e.url=u(e.baseURL,e.url)),e.headers=e.headers||{},e.data=r(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return c(e),t.data=r(t.data,t.headers,e.transformResponse),t},function(t){return a(t)||(c(e),t&&t.response&&(t.response.data=r(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},wsXG:function(e,t,n){"use strict";var o=n("3ZBI");e.exports=function(e,t,n,r,a){var s=new Error(e);return o(s,t,n,r,a)}},"x+/8":function(e,t,n){"use strict";var o=n("La2s");function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var a;if(n)a=n(t);else if(o.isURLSearchParams(t))a=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&void 0!==e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))}))}),a=s.join("&")}if(a){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+a}return e}},xHuH:function(e,t){},zBDM:function(e,t,n){"use strict";(function(t){var o=n("La2s"),r=n("feM3"),a={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var i,u={adapter:(void 0!==t&&"[object process]"===Object.prototype.toString.call(t)?i=n("Di/a"):"undefined"!=typeof XMLHttpRequest&&(i=n("Di/a")),i),transformRequest:[function(e,t){return r(t,"Accept"),r(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(s(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},o.forEach(["delete","get","head"],function(e){u.headers[e]={}}),o.forEach(["post","put","patch"],function(e){u.headers[e]=o.merge(a)}),e.exports=u}).call(t,n("W2nU"))}},["NHnr"]);
//# sourceMappingURL=app.22d94e00eac7ed4bf9a9.js.map