var h,aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},m="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function ba(){ba=function(){};m.Symbol||(m.Symbol=ca)}var ca=function(){var a=0;return function(b){return"jscomp_symbol_"+(b||"")+a++}}();
function w(){ba();var a=m.Symbol.iterator;a||(a=m.Symbol.iterator=m.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&aa(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return da(this)}});w=function(){}}function da(a){var b=0;return ea(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})}function ea(a){w();a={next:a};a[m.Symbol.iterator]=function(){return this};return a}function x(a){w();var b=a[Symbol.iterator];return b?b.call(a):da(a)}
for(var y=m,z=["Promise"],A=0;A<z.length-1;A++){var B=z[A];B in y||(y[B]={});y=y[B]}
var fa=z[z.length-1],C=y[fa],ha=function(){function a(a){this.D=0;this.aa=void 0;this.B=[];var b=this.V();try{a(b.resolve,b.reject)}catch(k){b.reject(k)}}function b(){this.g=null}function c(b){return b instanceof a?b:new a(function(a){a(b)})}if(C)return C;b.prototype.ja=function(a){null==this.g&&(this.g=[],this.Ba());this.g.push(a)};b.prototype.Ba=function(){var a=this;this.ka(function(){a.Ga()})};var e=m.setTimeout;b.prototype.ka=function(a){e(a,0)};b.prototype.Ga=function(){for(;this.g&&this.g.length;){var a=
this.g;this.g=[];for(var b=0;b<a.length;++b){var c=a[b];delete a[b];try{c()}catch(l){this.Ca(l)}}}this.g=null};b.prototype.Ca=function(a){this.ka(function(){throw a;})};a.prototype.V=function(){function a(a){return function(f){c||(c=!0,a.call(b,f))}}var b=this,c=!1;return{resolve:a(this.Pa),reject:a(this.$)}};a.prototype.Pa=function(b){if(b===this)this.$(new TypeError("A Promise cannot resolve to itself"));else if(b instanceof a)this.Ra(b);else{a:switch(typeof b){case "object":var c=null!=b;break a;
case "function":c=!0;break a;default:c=!1}c?this.Oa(b):this.na(b)}};a.prototype.Oa=function(a){var b=void 0;try{b=a.then}catch(k){this.$(k);return}"function"==typeof b?this.Sa(b,a):this.na(a)};a.prototype.$=function(a){this.pa(2,a)};a.prototype.na=function(a){this.pa(1,a)};a.prototype.pa=function(a,b){if(0!=this.D)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.D);this.D=a;this.aa=b;this.Ha()};a.prototype.Ha=function(){if(null!=this.B){for(var a=this.B,b=0;b<a.length;++b)a[b].call(),
a[b]=null;this.B=null}};var d=new b;a.prototype.Ra=function(a){var b=this.V();a.G(b.resolve,b.reject)};a.prototype.Sa=function(a,b){var c=this.V();try{a.call(b,c.resolve,c.reject)}catch(l){c.reject(l)}};a.prototype.then=function(b,c){function d(a,b){return"function"==typeof a?function(b){try{e(a(b))}catch(p){f(p)}}:b}var e,f,g=new a(function(a,b){e=a;f=b});this.G(d(b,e),d(c,f));return g};a.prototype.catch=function(a){return this.then(void 0,a)};a.prototype.G=function(a,b){function c(){switch(e.D){case 1:a(e.aa);
break;case 2:b(e.aa);break;default:throw Error("Unexpected state: "+e.D);}}var e=this;null==this.B?d.ja(c):this.B.push(function(){d.ja(c)})};a.resolve=c;a.reject=function(b){return new a(function(a,c){c(b)})};a.race=function(b){return new a(function(a,e){for(var d=x(b),f=d.next();!f.done;f=d.next())c(f.value).G(a,e)})};a.all=function(b){var e=x(b),d=e.next();return d.done?c([]):new a(function(a,b){function f(b){return function(c){g[b]=c;k--;0==k&&a(g)}}var g=[],k=0;do g.push(void 0),k++,c(d.value).G(f(g.length-
1),b),d=e.next();while(!d.done)})};return a}();ha!=C&&null!=ha&&aa(y,fa,{configurable:!0,writable:!0,value:ha});function D(a){return void 0!==a}
function ia(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ja(a,b,c){return a.call.apply(a.bind,arguments)}function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,e);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function la(a,b,c){la=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ja:ka;return la.apply(null,arguments)}var ma=Date.now||function(){return+new Date};function na(a,b){function c(){}c.prototype=b.prototype;a.rb=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.qb=function(a,c,f){for(var e=Array(arguments.length-2),d=2;d<arguments.length;d++)e[d-2]=arguments[d];return b.prototype[c].apply(a,e)}};function E(a,b){this.type=a;this.L=b||null;this.Ta=JSON.stringify(oa(this))}E.prototype.toString=function(){return this.Ta};function oa(a){var b={};b=(b.type=a.type,b);a.L&&(b.nodeId=a.L);return b};function F(a){if(Error.captureStackTrace)Error.captureStackTrace(this,F);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}na(F,Error);F.prototype.name="CustomError";function pa(a,b){for(var c=a.split("%s"),e="",d=Array.prototype.slice.call(arguments,1);d.length&&1<c.length;)e+=c.shift()+d.shift();return e+c.join("%s")}var qa=String.prototype.repeat?function(a,b){return a.repeat(b)}:function(a,b){return Array(b+1).join(a)};function G(a){a=D(void 0)?a.toFixed(void 0):String(a);var b=a.indexOf(".");-1==b&&(b=a.length);return qa("0",Math.max(0,2-b))+a};function H(a,b){b.unshift(a);F.call(this,pa.apply(null,b));b.shift()}na(H,F);H.prototype.name="AssertionError";function ra(a,b,c,e){var d="Assertion failed";if(c){d+=": "+c;var f=e}else a&&(d+=": "+a,f=b);throw new H(""+d,f||[]);}function I(a,b,c){a||ra("",null,b,Array.prototype.slice.call(arguments,2));return a}function J(a,b){throw new H("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));}
function K(a,b,c){"string"==typeof a||ra("Expected string but got %s: %s.",[ia(a),a],b,Array.prototype.slice.call(arguments,2))}function L(a,b,c){"array"==ia(a)||ra("Expected array but got %s: %s.",[ia(a),a],b,Array.prototype.slice.call(arguments,2))};function sa(a){this.color=a};var ta={Za:["BC","AD"],Ya:["Before Christ","Anno Domini"],ab:"JFMAMJJASOND".split(""),ib:"JFMAMJJASOND".split(""),$a:"January February March April May June July August September October November December".split(" "),hb:"January February March April May June July August September October November December".split(" "),eb:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),kb:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),ob:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
mb:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),gb:"Sun Mon Tue Wed Thu Fri Sat".split(" "),lb:"Sun Mon Tue Wed Thu Fri Sat".split(" "),bb:"SMTWTFS".split(""),jb:"SMTWTFS".split(""),fb:["Q1","Q2","Q3","Q4"],cb:["1st quarter","2nd quarter","3rd quarter","4th quarter"],Va:["AM","PM"],Wa:["EEEE, MMMM d, y","MMMM d, y","MMM d, y","M/d/yy"],nb:["h:mm:ss a zzzz","h:mm:ss a z","h:mm:ss a","h:mm a"],Xa:["{1} 'at' {0}","{1} 'at' {0}","{1}, {0}","{1}, {0}"],va:6,pb:[5,6],wa:5},ua=ta;
ua=ta;function M(a,b,c){"number"==typeof a?(this.a=va(a,b||0,c||1),N(this,c||1)):(b=typeof a,"object"==b&&null!=a||"function"==b?(this.a=va(a.getFullYear(),a.getMonth(),a.getDate()),N(this,a.getDate())):(this.a=new Date(ma()),a=this.a.getDate(),this.a.setHours(0),this.a.setMinutes(0),this.a.setSeconds(0),this.a.setMilliseconds(0),N(this,a)))}function va(a,b,c){b=new Date(a,b,c);0<=a&&100>a&&b.setFullYear(b.getFullYear()-1900);return b}h=M.prototype;h.H=ua.va;h.I=ua.wa;
h.clone=function(){var a=new M(this.a);a.H=this.H;a.I=this.I;return a};h.getFullYear=function(){return this.a.getFullYear()};h.getYear=function(){return this.getFullYear()};h.getMonth=function(){return this.a.getMonth()};h.getDate=function(){return this.a.getDate()};h.getTime=function(){return this.a.getTime()};h.getDay=function(){return this.a.getDay()};h.getUTCFullYear=function(){return this.a.getUTCFullYear()};h.getUTCMonth=function(){return this.a.getUTCMonth()};h.getUTCDate=function(){return this.a.getUTCDate()};
h.getUTCDay=function(){return this.a.getDay()};h.getUTCHours=function(){return this.a.getUTCHours()};h.getUTCMinutes=function(){return this.a.getUTCMinutes()};h.getTimezoneOffset=function(){return this.a.getTimezoneOffset()};function wa(a){a=a.getTimezoneOffset();if(0==a)a="Z";else{var b=Math.abs(a)/60,c=Math.floor(b);b=60*(b-c);a=(0<a?"-":"+")+G(c)+":"+G(b)}return a}h.set=function(a){this.a=new Date(a.getFullYear(),a.getMonth(),a.getDate())};h.setFullYear=function(a){this.a.setFullYear(a)};
h.setYear=function(a){this.setFullYear(a)};h.setMonth=function(a){this.a.setMonth(a)};h.setDate=function(a){this.a.setDate(a)};h.setTime=function(a){this.a.setTime(a)};h.setUTCFullYear=function(a){this.a.setUTCFullYear(a)};h.setUTCMonth=function(a){this.a.setUTCMonth(a)};h.setUTCDate=function(a){this.a.setUTCDate(a)};
h.add=function(a){if(a.Ua||a.Ma){var b=this.getMonth()+a.Ma+12*a.Ua,c=this.getYear()+Math.floor(b/12);b%=12;0>b&&(b+=12);a:{switch(b){case 1:var e=0!=c%4||0==c%100&&0!=c%400?28:29;break a;case 5:case 8:case 10:case 3:e=30;break a}e=31}e=Math.min(e,this.getDate());this.setDate(1);this.setFullYear(c);this.setMonth(b);this.setDate(e)}a.Fa&&(a=new Date((new Date(this.getYear(),this.getMonth(),this.getDate(),12)).getTime()+864E5*a.Fa),this.setDate(1),this.setFullYear(a.getFullYear()),this.setMonth(a.getMonth()),
this.setDate(a.getDate()),N(this,a.getDate()))};h.O=function(a,b){return[this.getFullYear(),G(this.getMonth()+1),G(this.getDate())].join(a?"-":"")+(b?wa(this):"")};h.toString=function(){return this.O()};function N(a,b){a.getDate()!=b&&a.a.setUTCHours(a.a.getUTCHours()+(a.getDate()<b?1:-1))}h.valueOf=function(){return this.a.valueOf()};function O(a,b,c,e,d,f,g){this.a="number"==typeof a?new Date(a,b||0,c||1,e||0,d||0,f||0,g||0):new Date(a&&a.getTime?a.getTime():ma())}na(O,M);
function xa(a){var b=new O;b.setTime(a);return b}h=O.prototype;h.getHours=function(){return this.a.getHours()};h.getMinutes=function(){return this.a.getMinutes()};h.getSeconds=function(){return this.a.getSeconds()};h.getMilliseconds=function(){return this.a.getMilliseconds()};h.getUTCDay=function(){return this.a.getUTCDay()};h.getUTCHours=function(){return this.a.getUTCHours()};h.getUTCMinutes=function(){return this.a.getUTCMinutes()};h.getUTCSeconds=function(){return this.a.getUTCSeconds()};
h.getUTCMilliseconds=function(){return this.a.getUTCMilliseconds()};h.setHours=function(a){this.a.setHours(a)};h.setMinutes=function(a){this.a.setMinutes(a)};h.setSeconds=function(a){this.a.setSeconds(a)};h.setMilliseconds=function(a){this.a.setMilliseconds(a)};h.setUTCHours=function(a){this.a.setUTCHours(a)};h.setUTCMinutes=function(a){this.a.setUTCMinutes(a)};h.setUTCSeconds=function(a){this.a.setUTCSeconds(a)};h.setUTCMilliseconds=function(a){this.a.setUTCMilliseconds(a)};
h.add=function(a){M.prototype.add.call(this,a);a.Ka&&this.setUTCHours(this.a.getUTCHours()+a.Ka);a.La&&this.setUTCMinutes(this.a.getUTCMinutes()+a.La);a.Qa&&this.setUTCSeconds(this.a.getUTCSeconds()+a.Qa)};h.O=function(a,b){var c=M.prototype.O.call(this,a);return a?c+" "+G(this.getHours())+":"+G(this.getMinutes())+":"+G(this.getSeconds())+(b?wa(this):""):c+"T"+G(this.getHours())+G(this.getMinutes())+G(this.getSeconds())+(b?wa(this):"")};h.toString=function(){return this.O()};
h.clone=function(){var a=new O(this.a);a.H=this.H;a.I=this.I;return a};var ya=!!(window.chrome&&window.chrome.lockScreen&&window.chrome.lockScreen.data);function za(){var a=this;I(ya,"Lockscreen storage API unavialable in this environment.");this.Na=[];this.Da=[];chrome.lockScreen.data.onDataItemsAvailable.addListener(function(b){return Aa(a,b)})}function Ba(a,b){a=xa(a.creationTime);return xa(b.creationTime).getTime()-a.getTime()}
function Ca(a){Da(function(b){var c=[];b=x(b);for(var e=b.next();!e.done;e=b.next())e=e.value,e=JSON.parse((new TextDecoder).decode(e.buffer)),1==e.type&&c.push(JSON.parse(e.value));c.sort(Ba);a(c)})}
function Da(a){chrome.lockScreen.data.getAll(function(b){if(chrome.runtime.lastError)a([]);else{var c=[],e={};b=x(b);for(var d=b.next();!d.done;e={Y:e.Y},d=b.next())e.Y=d.value,c.push(new Promise(function(a){return function(b){var c=I(a.Y.id);chrome.lockScreen.data.getContent(c,function(a){chrome.runtime.lastError?b(null):b(a?{buffer:a,id:c}:null)})}}(e)));Promise.all(c).then(function(b){a(b.filter(function(a){return!!a}))})}})}
function Ea(a){var b={};a=JSON.stringify((b.type=1,b.value=a,b));return(new TextEncoder).encode(a).buffer}function Aa(a,b){b.wasLocked&&Da(function(b){var c=[],d;b=x(b);for(var f=b.next();!f.done;f=b.next()){f=f.value;var g=JSON.parse((new TextDecoder).decode(f.buffer));f=g.type;g=g.value;1==f?c.push(JSON.parse(g)):0==f&&(d=new sa(JSON.parse(g).color))}c.length&&(c.sort(Ba),a.Na.forEach(function(a){return a(c)}));d&&a.Da.forEach(function(a){return a(d)})})};var Fa={ba:{1E3:{other:"0K"},1E4:{other:"00K"},1E5:{other:"000K"},1E6:{other:"0M"},1E7:{other:"00M"},1E8:{other:"000M"},1E9:{other:"0B"},1E10:{other:"00B"},1E11:{other:"000B"},1E12:{other:"0T"},1E13:{other:"00T"},1E14:{other:"000T"}},ta:{1E3:{other:"0 thousand"},1E4:{other:"00 thousand"},1E5:{other:"000 thousand"},1E6:{other:"0 million"},1E7:{other:"00 million"},1E8:{other:"000 million"},1E9:{other:"0 billion"},1E10:{other:"00 billion"},1E11:{other:"000 billion"},1E12:{other:"0 trillion"},1E13:{other:"00 trillion"},
1E14:{other:"000 trillion"}}},P=Fa;P=Fa;var Q={AED:[2,"dh","\u062f.\u0625.","DH"],ALL:[0,"Lek","Lek"],AUD:[2,"$","AU$"],BDT:[2,"\u09f3","Tk"],BGN:[2,"lev","lev"],BRL:[2,"R$","R$"],CAD:[2,"$","C$"],CDF:[2,"FrCD","CDF"],CHF:[2,"CHF","CHF"],CLP:[0,"$","CL$"],CNY:[2,"\u00a5","RMB\u00a5"],COP:[32,"$","COL$"],CRC:[0,"\u20a1","CR\u20a1"],CZK:[50,"K\u010d","K\u010d"],DKK:[50,"kr.","kr."],DOP:[2,"RD$","RD$"],EGP:[2,"\u00a3","LE"],ETB:[2,"Birr","Birr"],EUR:[2,"\u20ac","\u20ac"],GBP:[2,"\u00a3","GB\u00a3"],HKD:[2,"$","HK$"],HRK:[2,"kn","kn"],HUF:[34,
"Ft","Ft"],IDR:[0,"Rp","Rp"],ILS:[34,"\u20aa","IL\u20aa"],INR:[2,"\u20b9","Rs"],IRR:[0,"Rial","IRR"],ISK:[0,"kr","kr"],JMD:[2,"$","JA$"],JPY:[0,"\u00a5","JP\u00a5"],KRW:[0,"\u20a9","KR\u20a9"],LKR:[2,"Rs","SLRs"],LTL:[2,"Lt","Lt"],MNT:[0,"\u20ae","MN\u20ae"],MVR:[2,"Rf","MVR"],MXN:[2,"$","Mex$"],MYR:[2,"RM","RM"],NOK:[50,"kr","NOkr"],PAB:[2,"B/.","B/."],PEN:[2,"S/.","S/."],PHP:[2,"\u20b1","PHP"],PKR:[0,"Rs","PKRs."],PLN:[50,"z\u0142","z\u0142"],RON:[2,"RON","RON"],RSD:[0,"din","RSD"],RUB:[50,"\u20bd",
"RUB"],SAR:[2,"Rial","Rial"],SEK:[50,"kr","kr"],SGD:[2,"$","S$"],THB:[2,"\u0e3f","THB"],TRY:[2,"\u20ba","TRY"],TWD:[2,"NT$","NT$"],TZS:[0,"TSh","TSh"],UAH:[2,"\u0433\u0440\u043d.","UAH"],USD:[2,"$","US$"],UYU:[2,"$","$U"],VND:[48,"\u20ab","VN\u20ab"],YER:[0,"Rial","Rial"],ZAR:[2,"R","ZAR"]};var Ga={da:".",R:",",ga:"%",T:"0",za:"+",fa:"-",ea:"E",ha:"\u2030",S:"\u221e",xa:"NaN",ca:"#,##0.###",Aa:"#E0",ya:"#,##0%",ua:"\u00a4#,##0.00",v:"USD"},R=Ga;R=Ga;function Ha(a,b,c){this.A=b;this.Ea=c||0;this.J=40;this.c=1;this.o=0;this.h=3;this.K=this.f=0;this.qa=this.sa=!1;this.C=this.m="";this.i=R.fa;this.u="";this.b=1;this.l=!1;this.j=[];this.P=this.ma=!1;this.w=0;this.la=null;if("number"==typeof a)switch(a){case 1:S(this,R.ca);break;case 2:S(this,R.Aa);break;case 3:S(this,R.ya);break;case 4:a=R.ua;b=["0"];c=Q[this.A||R.v][0]&7;if(0<c){b.push(".");for(var e=0;e<c;e++)b.push("0")}a=a.replace(/0.00/g,b.join(""));S(this,a);break;case 5:Ia(this,1);break;case 6:Ia(this,
2);break;default:throw Error("Unsupported pattern type.");}else S(this,a)}
function S(a,b){a.N=b.replace(/ /g,"\u00a0");var c=[0];a.m=T(a,b,c);for(var e=c[0],d=-1,f=0,g=0,k=0,l=-1,r=b.length,q=!0;c[0]<r&&q;c[0]++)switch(b.charAt(c[0])){case "#":0<g?k++:f++;0<=l&&0>d&&l++;break;case "0":if(0<k)throw Error('Unexpected "0" in pattern "'+b+'"');g++;0<=l&&0>d&&l++;break;case ",":0<l&&a.j.push(l);l=0;break;case ".":if(0<=d)throw Error('Multiple decimal separators in pattern "'+b+'"');d=f+g+k;break;case "E":if(a.P)throw Error('Multiple exponential symbols in pattern "'+b+'"');
a.P=!0;a.K=0;c[0]+1<r&&"+"==b.charAt(c[0]+1)&&(c[0]++,a.sa=!0);for(;c[0]+1<r&&"0"==b.charAt(c[0]+1);)c[0]++,a.K++;if(1>f+g||1>a.K)throw Error('Malformed exponential pattern "'+b+'"');q=!1;break;default:c[0]--,q=!1}0==g&&0<f&&0<=d&&(g=d,0==g&&g++,k=f-g,f=g-1,g=1);if(0>d&&0<k||0<=d&&(d<f||d>f+g)||0==l)throw Error('Malformed pattern "'+b+'"');k=f+g+k;a.h=0<=d?k-d:0;0<=d&&(a.f=f+g-d,0>a.f&&(a.f=0));a.c=(0<=d?d:k)-f;a.P&&(a.J=f+a.c,0==a.h&&0==a.c&&(a.c=1));a.j.push(Math.max(0,l));a.ma=0==d||d==k;e=c[0]-
e;a.C=T(a,b,c);c[0]<b.length&&";"==b.charAt(c[0])?(c[0]++,1!=a.b&&(a.l=!0),a.i=T(a,b,c),c[0]+=e,a.u=T(a,b,c)):(a.i+=a.m,a.u+=a.C)}function Ia(a,b){a.w=b;S(a,R.ca);a.f=0;a.h=2;if(0<a.f)throw Error("Can't combine significant digits and minimum fraction digits");a.o=2}
Ha.prototype.parse=function(a,b){b=b||[0];if(0!=this.w)throw Error("Parsing of compact numbers is unimplemented");a=a.replace(/ /g,"\u00a0");var c=a.indexOf(this.m,b[0])==b[0],e=a.indexOf(this.i,b[0])==b[0];c&&e&&(this.m.length>this.i.length?e=!1:this.m.length<this.i.length&&(c=!1));c?b[0]+=this.m.length:e&&(b[0]+=this.i.length);if(a.indexOf(R.S,b[0])==b[0]){b[0]+=R.S.length;var d=Infinity}else{d=a;var f=!1,g=!1,k=!1,l=-1,r=1,q=R.da,n=R.R,t=R.ea;if(0!=this.w)throw Error("Parsing of compact style numbers is not implemented");
for(var u="";b[0]<d.length;b[0]++){var p=d.charAt(b[0]),v=Ja(p);if(0<=v&&9>=v)u+=v,k=!0;else if(p==q.charAt(0)){if(f||g)break;u+=".";f=!0}else if(p==n.charAt(0)&&("\u00a0"!=n.charAt(0)||b[0]+1<d.length&&0<=Ja(d.charAt(b[0]+1)))){if(f||g)break}else if(p==t.charAt(0)){if(g)break;u+="E";g=!0;l=b[0]}else if("+"==p||"-"==p){if(k&&l!=b[0]-1)break;u+=p}else if(1==this.b&&p==R.ga.charAt(0)){if(1!=r)break;r=100;if(k){b[0]++;break}}else if(1==this.b&&p==R.ha.charAt(0)){if(1!=r)break;r=1E3;if(k){b[0]++;break}}else break}1!=
this.b&&(r=this.b);d=parseFloat(u)/r}if(c){if(a.indexOf(this.C,b[0])!=b[0])return NaN;b[0]+=this.C.length}else if(e){if(a.indexOf(this.u,b[0])!=b[0])return NaN;b[0]+=this.u.length}return e?-d:d};
Ha.prototype.format=function(a){if(isNaN(a))return R.xa;var b=[];var c=null===this.la?a:this.la;if(0==this.w)c=U;else{c=Math.abs(c);var e=Ka(this,1>=c?0:V(c)).W;c=Ka(this,e+V(La(this,c/Math.pow(10,e)).oa))}a/=Math.pow(10,c.W);b.push(c.prefix);e=0>a||0==a&&0>1/a;b.push(e?this.i:this.m);if(isFinite(a))if(a=a*(e?-1:1)*this.b,this.P)if(0==a)Ma(this,a,this.c,b),Na(this,0,b);else{var d=Math.log(a)/Math.log(10);I(!D(void 0)||!1);d=Math.floor(d+2E-15);var f=Math.pow(10,d);isFinite(f)&&0!==f?a/=f:(f=Math.pow(10,
Math.floor(d/2)),a=a/f/f,1==d%2&&(a=0<d?a/10:10*a));f=this.c;if(1<this.J&&this.J>this.c){for(;0!=d%this.J;)a*=10,d--;f=1}else 1>this.c?(d++,a/=10):(d-=this.c-1,a*=Math.pow(10,this.c-1));Ma(this,a,f,b);Na(this,d,b)}else Ma(this,a,this.c,b);else b.push(R.S);b.push(e?this.u:this.C);b.push(c.ra);return b.join("")};function La(a,b){var c=Math.pow(10,a.h);a=0>=a.o?Math.round(b*c):Math.round(Oa(b*c,a.o,a.h));isFinite(a)?(b=Math.floor(a/c),c=Math.floor(a-b*c)):c=0;return{oa:b,Ia:c}}
function Ma(a,b,c,e){if(a.f>a.h)throw Error("Min value must be less than max value");e||(e=[]);b=La(a,b);var d=b.oa,f=b.Ia,g=0==d?0:V(d)+1,k=0<a.f||0<f||a.qa&&g<a.o;b=a.f;k&&(b=a.qa&&0<a.o?a.o-g:a.f);var l="";for(g=d;1E20<g;)l="0"+l,g=Math.round(g/10);l=g+l;var r=R.da;g=R.T.charCodeAt(0);var q=l.length,n=0;if(0<d||0<c){for(d=q;d<c;d++)e.push(String.fromCharCode(g));if(2<=a.j.length)for(c=1;c<a.j.length;c++)n+=a.j[c];c=q-n;if(0<c){d=a.j;n=q=0;for(var t,u=R.R,p=l.length,v=0;v<p;v++)if(e.push(String.fromCharCode(g+
1*Number(l.charAt(v)))),1<p-v)if(t=d[n],v<c){var gb=c-v;(1===t||0<t&&1===gb%t)&&e.push(u)}else n<d.length&&(v===c?n+=1:t===v-c-q+1&&(e.push(u),q+=t,n+=1))}else{c=l;l=a.j;d=R.R;t=c.length;u=[];for(q=l.length-1;0<=q&&0<t;q--){n=l[q];for(p=0;p<n&&0<=t-p-1;p++)u.push(String.fromCharCode(g+1*Number(c.charAt(t-p-1))));t-=n;0<t&&u.push(d)}e.push.apply(e,u.reverse())}}else k||e.push(String.fromCharCode(g));(a.ma||k)&&e.push(r);f=String(f);k=f.split("e+");2==k.length&&(f=String(Oa(parseFloat(k[0]),a.o,1)),
f=f.replace(".",""),f+=qa("0",parseInt(k[1],10)-f.length+1));a.h+1>f.length&&(f="1"+qa("0",a.h-f.length)+f);for(a=f.length;"0"==f.charAt(a-1)&&a>b+1;)a--;for(d=1;d<a;d++)e.push(String.fromCharCode(g+1*Number(f.charAt(d))))}function Na(a,b,c){c.push(R.ea);0>b?(b=-b,c.push(R.fa)):a.sa&&c.push(R.za);b=""+b;for(var e=R.T,d=b.length;d<a.K;d++)c.push(e);c.push(b)}function Ja(a){a=a.charCodeAt(0);if(48<=a&&58>a)return a-48;var b=R.T.charCodeAt(0);return b<=a&&a<b+10?a-b:-1}
function T(a,b,c){for(var e="",d=!1,f=b.length;c[0]<f;c[0]++){var g=b.charAt(c[0]);if("'"==g)c[0]+1<f&&"'"==b.charAt(c[0]+1)?(c[0]++,e+="'"):d=!d;else if(d)e+=g;else switch(g){case "#":case "0":case ",":case ".":case ";":return e;case "\u00a4":if(c[0]+1<f&&"\u00a4"==b.charAt(c[0]+1))c[0]++,e+=a.A||R.v;else switch(a.Ea){case 0:e+=Q[a.A||R.v][1];break;case 2:g=a.A||R.v;var k=Q[g];e+=g==k[1]?g:g+" "+k[1];break;case 1:e+=Q[a.A||R.v][2]}break;case "%":if(!a.l&&1!=a.b)throw Error("Too many percent/permill");
if(a.l&&100!=a.b)throw Error("Inconsistent use of percent/permill characters");a.b=100;a.l=!1;e+=R.ga;break;case "\u2030":if(!a.l&&1!=a.b)throw Error("Too many percent/permill");if(a.l&&1E3!=a.b)throw Error("Inconsistent use of percent/permill characters");a.b=1E3;a.l=!1;e+=R.ha;break;default:e+=g}}return e}var U={prefix:"",ra:"",W:0};
function Ka(a,b){a=1==a.w?P.ba:P.ta;null==a&&(a=P.ba);if(3>b)return U;b=Math.min(14,b);var c=a[Math.pow(10,b)];for(--b;!c&&3<=b;)c=a[Math.pow(10,b)],b--;if(!c)return U;a=c.other;return a&&"0"!=a?(a=/([^0]*)(0+)(.*)/.exec(a))?{prefix:a[1],ra:a[3],W:b+1-(a[2].length-1)}:U:U}function V(a){if(!isFinite(a))return 0<a?a:0;for(var b=0;1<=(a/=10);)b++;return b}function Oa(a,b,c){if(!a)return a;b=b-V(a)-1;if(b<-c)return c=Math.pow(10,c),Math.round(a/c)*c;c=Math.pow(10,b);return Math.round(a*c)/c};function Pa(a){return 1==a%10&&11!=a%100?"one":2==a%10&&12!=a%100?"two":3==a%10&&13!=a%100?"few":"other"}var Qa=Pa;Qa=Pa;function Ra(a,b){if(void 0===b){b=a+"";var c=b.indexOf(".");b=Math.min(-1==c?0:b.length-c-1,3)}return 1==(a|0)&&0==b?"one":"other"}var Sa=Ra;Sa=Ra;function W(a){this.N=a;this.M=this.s=this.X=null;a=R;var b=P;if(Ta!==a||Ua!==b)Ta=a,Ua=b,Va=new Ha(1);this.Z=Va}var Ta=null,Ua=null,Va=null,Wa=/'([{}#].*?)'/g,Xa=/''/g;
W.prototype.format=function(a){if(this.N){this.X=[];var b=Ya(this,this.N);this.M=X(this,b);this.N=null}if(this.M&&0!=this.M.length){b=this.X;var c=b.length;if(0<c){for(var e=Array(c),d=0;d<c;d++)e[d]=b[d];b=e}else b=[];this.s=b;b=[];Za(this,this.M,a,!1,b);a=b.join("");for(I(-1==a.search("#"),"Not all # were replaced.");0<this.s.length;)a=a.replace(this.U(this.s),this.s.pop())}else a="";return a};
function Za(a,b,c,e,d){for(var f=0;f<b.length;f++)switch(b[f].type){case 4:d.push(b[f].value);break;case 3:var g=b[f].value,k=a,l=d,r=c[g];D(r)?(k.s.push(r),l.push(k.U(k.s))):l.push("Undefined parameter - "+g);break;case 2:g=b[f].value;k=a;l=c;r=e;var q=d,n=g.F;D(l[n])?(n=g[l[n]],D(n)||(n=g.other,L(n,"Invalid option or missing other option for select block.")),Za(k,n,l,r,q)):q.push("Undefined parameter - "+n);break;case 0:g=b[f].value;$a(a,g,c,Sa,e,d);break;case 1:g=b[f].value;$a(a,g,c,Qa,e,d);break;
default:J("Unrecognized block type: "+b[f].type)}}function $a(a,b,c,e,d,f){var g=b.F,k=b.ia,l=+c[g];isNaN(l)?f.push("Undefined or invalid parameter - "+g):(k=l-k,g=b[c[g]],D(g)||(I(0<=k,"Argument index smaller than offset."),e=a.Z.Ja?e(k,a.Z.Ja()):e(k),K(e,"Invalid plural key."),g=b[e],D(g)||(g=b.other),L(g,"Invalid option or missing other option for plural block.")),b=[],Za(a,g,c,d,b),c=b.join(""),K(c,"Empty block in plural."),d?f.push(c):(a=a.Z.format(k),f.push(c.replace(/#/g,a))))}
function Ya(a,b){var c=a.X,e=la(a.U,a);b=b.replace(Xa,function(){c.push("'");return e(c)});return b=b.replace(Wa,function(a,b){c.push(b);return e(c)})}
function Y(a){var b=0,c=[],e=[],d=/[{}]/g;d.lastIndex=0;for(var f;f=d.exec(a);){var g=f.index;"}"==f[0]?(f=c.pop(),I(D(f)&&"{"==f,"No matching { for }."),0==c.length&&(f={type:1},f.value=a.substring(b,g),e.push(f),b=g+1)):(0==c.length&&(b=a.substring(b,g),""!=b&&e.push({type:0,value:b}),b=g+1),c.push("{"))}I(0==c.length,"There are mismatched { or } in the pattern.");b=a.substring(b);""!=b&&e.push({type:0,value:b});return e}
var ab=/^\s*(\w+)\s*,\s*plural\s*,(?:\s*offset:(\d+))?/,bb=/^\s*(\w+)\s*,\s*selectordinal\s*,/,cb=/^\s*(\w+)\s*,\s*select\s*,/;
function X(a,b){var c=[];b=Y(b);for(var e=0;e<b.length;e++){var d={};if(0==b[e].type)d.type=4,d.value=b[e].value;else if(1==b[e].type){var f=b[e].value;switch(ab.test(f)?0:bb.test(f)?1:cb.test(f)?2:/^\s*\w+\s*/.test(f)?3:5){case 2:d.type=2;d.value=db(a,b[e].value);break;case 0:d.type=0;d.value=eb(a,b[e].value);break;case 1:d.type=1;d.value=fb(a,b[e].value);break;case 3:d.type=3;d.value=b[e].value;break;default:J("Unknown block type for pattern: "+b[e].value)}}else J("Unknown part of the pattern.");
c.push(d)}return c}function db(a,b){var c="";b=b.replace(cb,function(a,b){c=b;return""});var e={};e.F=c;b=Y(b);for(var d=0;d<b.length;){var f=b[d].value;K(f,"Missing select key element.");d++;I(d<b.length,"Missing or invalid select value element.");if(1==b[d].type)var g=X(a,b[d].value);else J("Expected block type.");e[f.replace(/\s/g,"")]=g;d++}L(e.other,"Missing other key in select statement.");return e}
function eb(a,b){var c="",e=0;b=b.replace(ab,function(a,b,d){c=b;d&&(e=parseInt(d,10));return""});var d={};d.F=c;d.ia=e;b=Y(b);for(var f=0;f<b.length;){var g=b[f].value;K(g,"Missing plural key element.");f++;I(f<b.length,"Missing or invalid plural value element.");if(1==b[f].type)var k=X(a,b[f].value);else J("Expected block type.");d[g.replace(/\s*(?:=)?(\w+)\s*/,"$1")]=k;f++}L(d.other,"Missing other key in plural statement.");return d}
function fb(a,b){var c="";b=b.replace(bb,function(a,b){c=b;return""});var e={};e.F=c;e.ia=0;b=Y(b);for(var d=0;d<b.length;){var f=b[d].value;K(f,"Missing ordinal key element.");d++;I(d<b.length,"Missing or invalid ordinal value element.");if(1==b[d].type)var g=X(a,b[d].value);else J("Expected block type.");e[f.replace(/\s*(?:=)?(\w+)\s*/,"$1")]=g;d++}L(e.other,"Missing other key in selectordinal statement.");return e}
W.prototype.U=function(a){I(0<a.length,"Literal array is empty.");return"\ufddf_"+(a.length-1).toString(10)+"_"};var Z;a:{var hb=this.navigator;if(hb){var ib=hb.userAgent;if(ib){Z=ib;break a}}Z=""};var jb=null,kb=null,lb=null;
function mb(a,b){a=void 0===a?{}:a;var c=!1,e,d=a.actionData;if(d&&"new_note"==d.actionType){c=!0;var f=a.items;"image"==a.id&&f&&f.length&&(e=f[0].entry)}if(d&&d.isLockScreenAction){var g=d.restoreLastActionState;chrome.app.window.create("index.html",{lockScreenAction:d.actionType,frame:{type:"none"}},function(a){a.contentWindow._DumpException=function(a){return console.log(a.stack?a.stack:a)};a.contentWindow._keep_lockScreenAction_=!0;a.contentWindow._keep_persistenceEnabled_=g})}else c||b?chrome.app.window.create("index.html",
{id:"google-keep",state:"maximized",frame:{color:-1!=Z.indexOf("CrOS")?"#f99f00":void 0}},function(a){a.contentWindow._DumpException=function(a){return console.log(a.stack?a.stack:a)};c?(a.contentWindow._keep_launchToDrawing_=!0,a.contentWindow._keep_drawingImageEntry_=e):b&&(a.contentWindow._keep_drawingNoteIdToOpen_=b)}):chrome.app.window.create("index.html",{id:"google-keep",innerBounds:{width:960,height:700,minWidth:360,minHeight:540},frame:{color:-1!=Z.indexOf("CrOS")?"#f99f00":void 0}},function(a){a.contentWindow._DumpException=
function(a){return console.log(a.stack?a.stack:a)}})}chrome.app.runtime.onLaunched.addListener(mb);chrome.notifications.onClicked.addListener(function(a){var b=chrome.app.window.getAll();if(b&&0==b.length){chrome.notifications.clear(a);try{var c=JSON.parse(a);var e=new E(c.type,c.nodeId)}catch(d){e=new E("unknown")}a=e;"lockscreenNote"==a.type&&a.L?mb(void 0,a.L):mb()}});
chrome.lockScreen&&chrome.lockScreen.data.onDataItemsAvailable.addListener(function(a){a.wasLocked&&(jb=jb||new za,Ca(function(a){var b=[];a=x(a);for(var e=a.next();!e.done;e=a.next())if(e=e.value,!e.isNotified){b.push(e.nodeId);e.isNotified=!0;var d=e.storageId;d&&chrome.lockScreen.data.setContent(d,Ea(JSON.stringify(e)))}b.length&&(a=(new E("lockscreenNote",1==b.length?b[0]:void 0)).toString(),b=b.length,kb||(kb=new W("{noteCount, plural, =1 {Lock screen note taken}other {# lock screen notes taken}}")),
lb||(lb=new W("{noteCount, plural, =1 {Open Keep to edit or sync note.}other {Open Keep to edit or sync notes.}}")),chrome.notifications.create(a,{iconUrl:"icon_128.png",type:"basic",title:kb.format({noteCount:b}),message:lb.format({noteCount:b}),isClickable:!0}))}))});
