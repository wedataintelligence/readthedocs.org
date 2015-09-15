require=function e(t,n,r){function s(i,a){if(!n[i]){if(!t[i]){var l="function"==typeof require&&require;if(!a&&l)return l(i,!0);if(o)return o(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[i]={exports:{}};t[i][0].call(u.exports,function(e){var n=t[i][1][e];return s(n?n:e)},u,u.exports,e,t,n,r)}return n[i].exports}for(var o="function"==typeof require&&require,i=0;i<r.length;i++)s(r[i]);return s}({1:[function(e,t,n){var r=function(e,t,n){this.project=e,this.version=t,this.doc=n,this.url=null,this.sections=[]};r.prototype.section=function(e){return new s(this.project,this.version,this.doc,e)};var s=function(e,t,n,r){this.project=e,this.version=t,this.doc=n,this.section=r,this.url=null,this.content=null,this.wrapped=null};s.prototype.insertContent=function(e){var t=document.createElement("iframe");if(t.style.display="none",window.jQuery&&e instanceof window.jQuery&&(e=e.get(0)),"undefined"!=typeof e){for(;e.children.length>0;)e.firstChild.remove();e.appendChild(t)}var n=t.contentWindow;n.document.open(),n.document.write(this.content),n.document.close();var r=n.document.head,s=(n.document.body,null);if(r){s=n.document.createElement("base"),s.target="_parent",s.href=this.url,r.appendChild(s);for(var o=document.head.getElementsByTagName("link"),i=0;i<o.length;i++){var a=o[i];"stylesheet"==a.rel&&r.appendChild(a.cloneNode())}}return n.onload=function(){t.style.display="inline-block"},t},n.Section=s,n.Page=r},{}],2:[function(e,t,n){var r=e("./doc"),s=r.Section,o=r.Page,i=function(e){this._api_host="https://api.grokthedocs.com","object"==typeof e&&"api_host"in e&&(this._api_host=e.api_host)};i.prototype.section=function(e,t,n,r,o,i){o=o||function(){},i=i||function(){};var a={project:e,version:t,doc:n,section:r};this._getObject(a,function(i){var a=new s(e,t,n,r);a.url=i.url,a.content=i.content,a.wrapped=i.wrapped,o(a)},function(e,t){i(e)})},i.prototype.page=function(e,t,n,r,s){var i={project:e,version:t,doc:n};this._getObject(i,function(s){var i=new o(e,t,n);i.url=s.url,i.sections=s.headers,r(i)},function(e,t){s(e)})},i.prototype._getObject=function(t,n,r){var s=e("./../../reqwest/reqwest.js");return n=n||function(){},r=r||function(){},s({url:this._api_host+"/api/v1/embed/",method:"get",contentType:"application/json",crossDomain:!0,headers:{Accept:"application/json"},data:t,success:n,error:r})},n.Embed=i},{"./../../reqwest/reqwest.js":4,"./doc":1}],3:[function(e,t,n){var r=e("./embed");n.Embed=r.Embed,"undefined"!=typeof window&&(window.Embed=r.Embed)},{"./embed":2}],4:[function(require,module,exports){!function(e,t,n){"undefined"!=typeof module&&module.exports?module.exports=n():"function"==typeof define&&define.amd?define(n):t[e]=n()}("reqwest",this,function(){function succeed(e){var t=protocolRe.exec(e.url);return t=t&&t[1]||window.location.protocol,httpsRe.test(t)?twoHundo.test(e.request.status):!!e.request.response}function handleReadyState(e,t,n){return function(){return e._aborted?n(e.request):e._timedOut?n(e.request,"Request is aborted: timeout"):void(e.request&&4==e.request[readyState]&&(e.request.onreadystatechange=noop,succeed(e)?t(e.request):n(e.request)))}}function setHeaders(e,t){var n,r=t.headers||{};r.Accept=r.Accept||defaultHeaders.accept[t.type]||defaultHeaders.accept["*"];var s="function"==typeof FormData&&t.data instanceof FormData;t.crossOrigin||r[requestedWith]||(r[requestedWith]=defaultHeaders.requestedWith),r[contentType]||s||(r[contentType]=t.contentType||defaultHeaders.contentType);for(n in r)r.hasOwnProperty(n)&&"setRequestHeader"in e&&e.setRequestHeader(n,r[n])}function setCredentials(e,t){"undefined"!=typeof t.withCredentials&&"undefined"!=typeof e.withCredentials&&(e.withCredentials=!!t.withCredentials)}function generalCallback(e){lastValue=e}function urlappend(e,t){return e+(/\?/.test(e)?"&":"?")+t}function handleJsonp(e,t,n,r){var s=uniqid++,o=e.jsonpCallback||"callback",i=e.jsonpCallbackName||reqwest.getcallbackPrefix(s),a=new RegExp("((^|\\?|&)"+o+")=([^&]+)"),l=r.match(a),c=doc.createElement("script"),u=0,p=-1!==navigator.userAgent.indexOf("MSIE 10.0");return l?"?"===l[3]?r=r.replace(a,"$1="+i):i=l[3]:r=urlappend(r,o+"="+i),win[i]=generalCallback,c.type="text/javascript",c.src=r,c.async=!0,"undefined"==typeof c.onreadystatechange||p||(c.htmlFor=c.id="_reqwest_"+s),c.onload=c.onreadystatechange=function(){return c[readyState]&&"complete"!==c[readyState]&&"loaded"!==c[readyState]||u?!1:(c.onload=c.onreadystatechange=null,c.onclick&&c.onclick(),t(lastValue),lastValue=void 0,head.removeChild(c),void(u=1))},head.appendChild(c),{abort:function(){c.onload=c.onreadystatechange=null,n({},"Request is aborted: timeout",{}),lastValue=void 0,head.removeChild(c),u=1}}}function getRequest(e,t){var n,r=this.o,s=(r.method||"GET").toUpperCase(),o="string"==typeof r?r:r.url,i=r.processData!==!1&&r.data&&"string"!=typeof r.data?reqwest.toQueryString(r.data):r.data||null,a=!1;return"jsonp"!=r.type&&"GET"!=s||!i||(o=urlappend(o,i),i=null),"jsonp"==r.type?handleJsonp(r,e,t,o):(n=r.xhr&&r.xhr(r)||xhr(r),n.open(s,o,r.async===!1?!1:!0),setHeaders(n,r),setCredentials(n,r),win[xDomainRequest]&&n instanceof win[xDomainRequest]?(n.onload=e,n.onerror=t,n.onprogress=function(){},a=!0):n.onreadystatechange=handleReadyState(this,e,t),r.before&&r.before(n),a?setTimeout(function(){n.send(i)},200):n.send(i),n)}function Reqwest(e,t){this.o=e,this.fn=t,init.apply(this,arguments)}function setType(e){return e.match("json")?"json":e.match("javascript")?"js":e.match("text")?"html":e.match("xml")?"xml":void 0}function init(o,fn){function complete(e){for(o.timeout&&clearTimeout(self.timeout),self.timeout=null;self._completeHandlers.length>0;)self._completeHandlers.shift()(e)}function success(resp){var type=o.type||resp&&setType(resp.getResponseHeader("Content-Type"));resp="jsonp"!==type?self.request:resp;var filteredResponse=globalSetupOptions.dataFilter(resp.responseText,type),r=filteredResponse;try{resp.responseText=r}catch(e){}if(r)switch(type){case"json":try{resp=win.JSON?win.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r;break;case"xml":resp=resp.responseXML&&resp.responseXML.parseError&&resp.responseXML.parseError.errorCode&&resp.responseXML.parseError.reason?null:resp.responseXML}for(self._responseArgs.resp=resp,self._fulfilled=!0,fn(resp),self._successHandler(resp);self._fulfillmentHandlers.length>0;)resp=self._fulfillmentHandlers.shift()(resp);complete(resp)}function timedOut(){self._timedOut=!0,self.request.abort()}function error(e,t,n){for(e=self.request,self._responseArgs.resp=e,self._responseArgs.msg=t,self._responseArgs.t=n,self._erred=!0;self._errorHandlers.length>0;)self._errorHandlers.shift()(e,t,n);complete(e)}this.url="string"==typeof o?o:o.url,this.timeout=null,this._fulfilled=!1,this._successHandler=function(){},this._fulfillmentHandlers=[],this._errorHandlers=[],this._completeHandlers=[],this._erred=!1,this._responseArgs={};var self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){timedOut()},o.timeout)),o.success&&(this._successHandler=function(){o.success.apply(o,arguments)}),o.error&&this._errorHandlers.push(function(){o.error.apply(o,arguments)}),o.complete&&this._completeHandlers.push(function(){o.complete.apply(o,arguments)}),this.request=getRequest.call(this,success,error)}function reqwest(e,t){return new Reqwest(e,t)}function normalize(e){return e?e.replace(/\r?\n/g,"\r\n"):""}function serial(e,t){var n,r,s,o,i=e.name,a=e.tagName.toLowerCase(),l=function(e){e&&!e.disabled&&t(i,normalize(e.attributes.value&&e.attributes.value.specified?e.value:e.text))};if(!e.disabled&&i)switch(a){case"input":/reset|button|image|file/i.test(e.type)||(n=/checkbox/i.test(e.type),r=/radio/i.test(e.type),s=e.value,(!(n||r)||e.checked)&&t(i,normalize(n&&""===s?"on":s)));break;case"textarea":t(i,normalize(e.value));break;case"select":if("select-one"===e.type.toLowerCase())l(e.selectedIndex>=0?e.options[e.selectedIndex]:null);else for(o=0;e.length&&o<e.length;o++)e.options[o].selected&&l(e.options[o])}}function eachFormElement(){var e,t,n=this,r=function(e,t){var r,s,o;for(r=0;r<t.length;r++)for(o=e[byTag](t[r]),s=0;s<o.length;s++)serial(o[s],n)};for(t=0;t<arguments.length;t++)e=arguments[t],/input|select|textarea/i.test(e.tagName)&&serial(e,n),r(e,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var e={};return eachFormElement.apply(function(t,n){t in e?(e[t]&&!isArray(e[t])&&(e[t]=[e[t]]),e[t].push(n)):e[t]=n},arguments),e}function buildParams(e,t,n,r){var s,o,i,a=/\[\]$/;if(isArray(t))for(o=0;t&&o<t.length;o++)i=t[o],n||a.test(e)?r(e,i):buildParams(e+"["+("object"==typeof i?o:"")+"]",i,n,r);else if(t&&"[object Object]"===t.toString())for(s in t)buildParams(e+"["+s+"]",t[s],n,r);else r(e,t)}var win=window,doc=document,httpsRe=/^http/,protocolRe=/(^\w+):\/\//,twoHundo=/^(20\d|1223)$/,byTag="getElementsByTagName",readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",head=doc[byTag]("head")[0],uniqid=0,callbackPrefix="reqwest_"+ +new Date,lastValue,xmlHttpRequest="XMLHttpRequest",xDomainRequest="XDomainRequest",noop=function(){},isArray="function"==typeof Array.isArray?Array.isArray:function(e){return e instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",requestedWith:xmlHttpRequest,accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"}},xhr=function(e){if(e.crossOrigin===!0){var t=win[xmlHttpRequest]?new XMLHttpRequest:null;if(t&&"withCredentials"in t)return t;if(win[xDomainRequest])return new XDomainRequest;throw new Error("Browser does not support cross-origin requests")}return win[xmlHttpRequest]?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},globalSetupOptions={dataFilter:function(e){return e}};return Reqwest.prototype={abort:function(){this._aborted=!0,this.request.abort()},retry:function(){init.call(this,this.o,this.fn)},then:function(e,t){return e=e||function(){},t=t||function(){},this._fulfilled?this._responseArgs.resp=e(this._responseArgs.resp):this._erred?t(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(e),this._errorHandlers.push(t)),this},always:function(e){return this._fulfilled||this._erred?e(this._responseArgs.resp):this._completeHandlers.push(e),this},fail:function(e){return this._erred?e(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(e),this},"catch":function(e){return this.fail(e)}},reqwest.serializeArray=function(){var e=[];return eachFormElement.apply(function(t,n){e.push({name:t,value:n})},arguments),e},reqwest.serialize=function(){if(0===arguments.length)return"";var e,t,n=Array.prototype.slice.call(arguments,0);return e=n.pop(),e&&e.nodeType&&n.push(e)&&(e=null),e&&(e=e.type),t="map"==e?serializeHash:"array"==e?reqwest.serializeArray:serializeQueryString,t.apply(null,n)},reqwest.toQueryString=function(e,t){var n,r,s=t||!1,o=[],i=encodeURIComponent,a=function(e,t){t="function"==typeof t?t():null==t?"":t,o[o.length]=i(e)+"="+i(t)};if(isArray(e))for(r=0;e&&r<e.length;r++)a(e[r].name,e[r].value);else for(n in e)e.hasOwnProperty(n)&&buildParams(n,e[n],s,a);return o.join("&").replace(/%20/g,"+")},reqwest.getcallbackPrefix=function(){return callbackPrefix},reqwest.compat=function(e,t){return e&&(e.type&&(e.method=e.type)&&delete e.type,e.dataType&&(e.type=e.dataType),e.jsonpCallback&&(e.jsonpCallbackName=e.jsonpCallback)&&delete e.jsonpCallback,e.jsonp&&(e.jsonpCallback=e.jsonp)),new Reqwest(e,t)},reqwest.ajaxSetup=function(e){e=e||{};for(var t in e)globalSetupOptions[t]=e[t]},reqwest})},{}],"projects/tools":[function(e,t,r){function s(e){var t=this;t.config=e||{},"undefined"==typeof t.config.api_host&&(t.config.api_host="https://readthedocs.org"),t.help=l.observable(null),t.error=l.observable(null),t.project=l.observable(t.config.project),t.file=l.observable(null),t.sections=l.observableArray(),l.computed(function(){var e=t.file();if(t.sections.removeAll(),e){t.help("Loading..."),t.error(null),t.section(null);var r=new a.Embed(t.config);r.page(t.project(),"latest",t.file(),function(e){t.sections.removeAll(),t.help(null),t.error(null);var r=[];for(n in e.sections){var s=e.sections[n];u.each(s,function(e,t){r.push({title:e,id:e})})}t.sections(r)},function(e){t.help(null),t.error("There was a problem retrieving data from the API")})}}),t.has_sections=l.computed(function(){return t.sections().length>0}),t.section=l.observable(null),t.has_section=l.computed(function(){return null!=t.section()&&""!=t.section()}),t.response=l.observable(null),l.computed(function(){var e=t.file(),n=t.section();if(null==e||null==n)return t.response(null);t.help("Loading..."),t.error(null),t.response(null),t.api_example(null);var r=new a.Embed(t.config);r.section(t.project(),"latest",t.file(),t.section(),function(e){t.help(null),t.error(null),t.api_example("var embed = Embed();\nembed.section(\n    '"+t.project()+"', 'latest', '"+t.file()+"', '"+t.section()+"',\n    function (section) {\n        section.insertContent($('#help'));\n    }\n);\n"),t.response(e)},function(e){t.help(null),t.error("There was a problem retrieving data from the API")})}),t.has_response=l.computed(function(){return null!=t.response()}),t.api_example=l.observable(null),t.show_help=function(){var e=new a.Embed;e.section("docs","latest","features/embed","Content Embedding",i)},t.show_embed=function(){new a.Embed;i(t.response())}}function o(e){var t=this;t.config=e||{},"undefined"==typeof t.config.api_host&&(t.config.api_host="https://readthedocs.org"),t.show_help=function(){var e=new a.Embed;e.section("docs","latest","business/analytics","Analytics",i)}}function i(e){var t=u("#embed-container");t.length||(t=u('<div id="embed-container" class="modal modal-help" />'),u("body").append(t));var n=e.insertContent(t);u(n).show(),t.show(),u(document).click(function(e){u(e.target).closest("#embed-container").length||(u(n).remove(),t.remove())})}var a=e("./../../../../../bower_components/readthedocs-client/lib/readthedocs.js"),l=e("knockout"),c=e("jquery"),u=c;t.exports.init_embed=function(e){var t=new s(e);l.applyBindings(t,u("#tool-embed")[0])},t.exports.init_analytics=function(e){var t=new o(e);l.applyBindings(t,u("#tool-analytics")[0])}},{"./../../../../../bower_components/readthedocs-client/lib/readthedocs.js":3,jquery:"jquery",knockout:"knockout"}]},{},[]);