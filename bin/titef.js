#!/usr/bin/env node
(function () {var $=this;var U={};class y{static print(...t){console.log(...t)}static printHelp(){y.print("Usage: titef [OPTIONS] [DIRECTORY]\n    Executes test files written in Titef (https://www.npmjs.com/package/titef) framework.\n\n    Options:\n      -h, --help                shows this help\n      -v, --version             prints version number\n      -e, --extensions [string] comma separated list of file extensions to test\n\n    Example:\n\n      titef -e spec.js,test.js ./src\n    ")}static printVersion(){y.print(VERSION)}}U=y;var n={};class l{constructor(r){this.argv=[...r]}getFlagValue(r,e){return e?!!this.argv.find(t=>t===r||t===e):!!this.argv.find(e=>e===r)}getArgumentValue(r,e){const t=this.argv.findIndex(t=>t.includes(r)||t.includes(e)),a=this.argv[t];return a?(a.includes("=")?a.split("=")[1]:this.argv[t+1]).replace(/"/g,""):""}getParameterValue(){return this.argv[this.argv.length-1]}getCLIOptions(){const r=this.getFlagValue("--help","-h"),e=this.getFlagValue("--version","-v"),t=this.getArgumentValue("--extensions","-e"),a=this.getParameterValue();return{[l.CLI_OPTION.HELP]:r,[l.CLI_OPTION.VERSION]:e,[l.CLI_OPTION.EXTENSIONS]:t,[l.CLI_OPTION.DIRECTORY]:a}}}l.CLI_OPTION={HELP:"help",VERSION:"version",EXTENSIONS:"extensions",DIRECTORY:"directory"},n=l;var aa={};const{readdirSync:Ma,statSync:Ua}=require("fs"),{join:kb}=require("path");class G{constructor(r,e){this.directory=r,this.options=G.parseOptions(e)}static parseOptions(r){return{extensions:r.extensions?r.extensions.split(","):[]}}hasFileAllowedExtension(r){return this.options.extensions.some(e=>r.endsWith(e))}getFiles(r=this.directory){return Ma(r).reduce((e,s)=>{const t=kb(r,s);if(Ua(t).isDirectory()){const r=this.getFiles(t);e.push(...r)}else{this.hasFileAllowedExtension(t)&&e.push(t)}return e},[])}}aa=G;var t,ca,ka,ra,ta=false;function r(){if(ta)return;ta=true;t={};ca=t=>"[object Number]"===Object.prototype.toString.call(t);ka=t=>/\[object (Async)?Function]/.test(Object.prototype.toString.call(t));ra=t=>"[object Object]"===Object.prototype.toString.call(t);t={isNumber:ca,isFunction:ka,isObject:ra}}var K,bb,cb,ib,jb=false;function P(){if(jb)return;jb=true;K={};bb={INTERVAL:"ERR_CLEAR_INTERVAL",TIMEOUT:"ERR_CLEAR_TIMEOUT"};cb=new Map;ib={setTimeout:setTimeout,setInterval:setInterval,clearTimeout:clearTimeout,clearInterval:clearInterval};K={ERROR:bb,rejectMap:cb,oldies:ib}}var Z,R,u,A,da=false;function fa(){if(da)return;da=true;({isNumber:Z}=(r(),t));({ERROR:R,rejectMap:u,oldies:A}=(P(),K));setTimeout=(e,r)=>{if(!Z(r)&&r>=0)throw new TypeError("Timeout should be a positive number!");let $,t;const l=new Promise((l,a)=>{t=a,$=A.setTimeout(()=>{try{e(),l()}catch(r){a(r),A.clearTimeout($)}},r)}).catch(e=>{if(e!==R.TIMEOUT)throw e;A.clearTimeout($)});return u.set(l,t),l},clearTimeout=e=>{const[r,$]=(()=>e?[e,u.get(e)]:[u.entries()])();if(!$)throw new Error("Unable to find timeout");$(R.TIMEOUT),u.delete(r)}}var ia,H,o,x,ua=false;function va(){if(ua)return;ua=true;({isNumber:ia}=(r(),t));({ERROR:H,rejectMap:o,oldies:x}=(P(),K));setInterval=(e,r)=>{if(!ia(r)&&r>=0)throw new TypeError("Timeout should be a positive number!");let $,a;const t=new Promise((t,h)=>{a=h,$=x.setInterval(()=>{try{e()}catch(r){h(r),x.clearInterval($)}},r)}).catch(e=>{if(e!==H.INTERVAL)throw e;x.clearInterval($)});return o.set(t,a),t},clearInterval=e=>{const[r,$]=(()=>e?[e,o.get(e)]:[o.entries()])();if(!$)throw new Error("Unable to find interval promise");$(H.INTERVAL),o.delete(r)}}var za=false;function Ga(){if(za)return;za=true;fa(),va()}var k,Oa,S,Za,$a,ab=false;function j(){if(ab)return;ab=true;k={};Oa={PROCESS:{EXIT:"process:exit",EXIT_CODE:{FAILURE:"process:exit-code:failure"}},DATABASE:{RECORDSET:{CREATE:"database:recordset:create",CLOSED:"database:recordset:closed"},RECORD:{CREATE:"database:record:create",UPDATE:"database:record:update",CLOSE:"database:record:close"},PROCESS:{ENDED:"database:process:ended"}},SUITE:{STARTED:"suite:started",HOOKS:{REGISTER:"suite:hooks:register",UNREGISTER:"suite:hooks:unregister"},ENDED:"suite:ended"},SPEC:{SETUP:{REGISTER:"spec:before-each:register",UNREGISTER:"spec:before-each:unregister"},TEARDOWN:{REGISTER:"spec:after-each:register",UNREGISTER:"spec:after-each:unregister"},STARTED:"spec:started",SUCCESS:"spec:success",IGNORE:"spec:ignore",FAILURE:"spec:failure",ENDED:"spec:ended"},REPORTER:{REPORT:{START:"reporter:report:start",ENDED:"reporter:report:ended"}}};S={PENDING:"PENDING",SUCCESS:"SUCCESS",FAILURE:"FAILURE",IGNORED:"IGNORED"};Za=Object.values(S);$a=Number.parseInt(/(\d+)./.exec(process.version)[1],10);k={EVENT:Oa,NODE_MAJOR_VERSION:$a,RESULT:S,RESULTS:Za}}var F,db,f,a,g,mb=false;async function nb($,r){const e=String($).replace("."," "),i=this.path,S=`${i}.${e}`;a.emit(f.SPEC.STARTED,S),g.before&&g.before[i]&&g.before[i]();try{await r(),a.emit(f.SPEC.SUCCESS,S)}catch(n){a.emit(f.SPEC.FAILURE,S,n)}g.after&&g.after[i]&&g.after[i](),a.emit(f.SPEC.ENDED,S)}async function Y($){const r=String($).replace("."," "),e=`${this.path}.${r}`;a.emit(f.SPEC.STARTED,e),a.emit(f.SPEC.IGNORE,e),a.emit(f.SPEC.ENDED,e)}function N(){if(mb)return;mb=true;F={};db=require("events");({EVENT:f}=(j(),k));a=new db;g={before:{},after:{}};a.on(f.SPEC.SETUP.REGISTER,($,r)=>{g.before[$]=r}),a.on(f.SPEC.TEARDOWN.REGISTER,($,r)=>{g.after[$]=r}),a.on(f.SPEC.SETUP.UNREGISTER,$=>{g.before[$]=null}),a.on(f.SPEC.TEARDOWN.UNREGISTER,$=>{g.after[$]=null}),F={spec:nb,xspec:Y,Spec:a}}var O,_,s,ba,q,p,ea=false;function T(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function ga(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?T(Object(r),!0).forEach(function(t){ha(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):T(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function ha(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function pb(e,t){const r=e[0],n=e[1];switch(e.length){case 1:if(!s(r))throw new TypeError("Second argument must be a function!");return{options:t,callback:r};case 2:if(!ba(r))throw new TypeError("Second argument must be an object!");if(!s(n))throw new TypeError("Third argument must be a function!");return{options:ga({},t,{},r),callback:n};default:throw new TypeError(`Invalid arguments! Expected (title: string, options?: object, callback: function). Actual: ${e.map(String).join()}`);}}function ja(e,...t){const r=String(e).replace("."," "),n=this.path,$=n?`${n}.${r}`:r,a={title:r,setup:Function(),teardown:Function(),eachSetup:Function(),eachTeardown:Function(),silent:!1},{options:i,callback:o}=pb(t,a);if(p.emit(q.SUITE.STARTED,$,i.silent),p.emit(q.SUITE.HOOKS.REGISTER,$,i.eachSetup,i.eachTeardown),!s(i.setup))throw new TypeError("Setup must be a function!");i.setup(),o.call(Object.assign(this,{path:$})),Object.assign(this,{path:n}),p.on(q.SUITE.ENDED,e=>{if(e===$){if(!s(i.teardown))throw new TypeError("Teardown must be a function!");i.teardown(),p.emit(q.SUITE.HOOKS.UNREGISTER),p.removeAllListeners(q.SUITE.ENDED)}})}function W(){if(ea)return;ea=true;O={};_=require("events");({isFunction:s,isObject:ba}=(r(),t));({EVENT:q}=(j(),k));p=new _;O={suite:ja,Suite:p}}var la,ma,na=false;function oa(){if(na)return;na=true;la={};ma={RED:"\x1B[31m",GREEN:"\x1B[32m",YELLOW:"\x1B[33m",RESET:"\x1B[0m",BOLD:"\x1B[1m",GREY:"\x1B[90m"};la={TEXT_FORMAT:ma}}var pa,qa,c,sa,w,d,z,wa,xa,ya,I,Aa,Ba=false;function Ca(){if(Ba)return;Ba=true;pa={};({isFunction:qa}=(r(),t));({TEXT_FORMAT:c}=(oa(),la));({NODE_MAJOR_VERSION:sa,RESULT:w}=(j(),k));d=(...$)=>{const r=[...$,c.RESET,"\n"];return process.stdout.write(r.map(String).join(""))};z=$=>qa($)?$.name:String($);wa=$=>$.message?$.message:$.toString().split(":").slice(-1)[0];xa=$=>"ERR_ASSERTION"===$.code||$.toString().includes("AssertionError");ya=$=>{const r=wa($),t=sa<10;if(xa($)){const a=z($.operator),e=z($.expected),p=z($.actual);t&&d(`ASSERTION FAILURE: ${r}`),"fail"===a?d("\tUnexpected:\t",c.RED,`${p}`):!a&&$.expected&&$.actual&&(d("\tExpected:\t",c.GREEN,e),d("\tActual:\t\t",c.RED,p))}else t&&d(`ERROR: ${r}`);d(c.GREY,$.stack)};I=($,r,t="")=>{const a={};if(!$.meta.silent){const a=$.meta.duration>2e3?[c.RESET,c.YELLOW,` (${Math.ceil($.meta.duration)}ms)`]:[];d(c.BOLD,`${t}${r.toUpperCase()}`,...a)}return Object.entries($).forEach(([e,p])=>{if(!(p.meta&&p.meta.silent||$.meta.silent)){if(p.meta)Object.assign(a,I(p,e,`${t}    `));else{const $=p.duration>500?[c.YELLOW,` (${Math.ceil(p.duration)}ms)`]:[];p.result===w.SUCCESS?d(c.GREEN,`${t} ✔ ${e}`,...$):p.result===w.IGNORED?d(c.YELLOW,`${t} - ${e}`,...$):p.result===w.PENDING?d(c.GREY,`${t} . ${e}`,...$):(d(c.RED,`${t} ✕ ${e}`),a[`${r} > ${e}`]=p.payload)}}}),a};Aa=async $=>{let r={};Object.entries($).forEach(([$,t])=>{r=I(t,$),d("\n  Duration: ",c.YELLOW,`${Math.ceil(t.meta.duration)/1e3}s`)});const t=Object.entries(r);t.length&&(d(c.BOLD,"\nError details:"),t.forEach(($,r)=>{const t=$[0],a=$[1];d(c.BOLD,`\n${r+1}) ${t}`),ya(a)}))};pa={printDatabase:Aa}}var Da,Ea,Fa,J,Ha,Ia=false;function Ja(){if(Ia)return;Ia=true;Da={};Ea=require("events");({printDatabase:Fa}=(Ca(),pa));({EVENT:J}=(j(),k));Ha=class $oguB$var$Reporter extends Ea{constructor(){super(),this.on(J.REPORTER.REPORT.START,async $=>{await Fa($),this.emit(J.REPORTER.REPORT.ENDED)})}};Da=new Ha}var Ka,La,m,Na,L,Pa,Qa=false;function Ra(){if(Qa)return;Qa=true;Ka={};La=require("events");({EVENT:m,RESULT:Na,RESULTS:L}=(j(),k));Pa=class $ftui$var$Database extends La{static create(t,e,r){const[s,a]=e.split(/\.(.*)/);return a?(t[s]=t[s]||{},$ftui$var$Database.create(t[s],a,r)):(t[s]=r,t)}static open(t,e){const[r,s]=e.split(/\.(.*)/);return s?$ftui$var$Database.open(t[r],s):t[r]}static parent(t,e){const[r,s]=e.split(/\.(.*)/);return s?$ftui$var$Database.parent(t[r],s):t}static toMilliseconds([t,e]){return(1e9*t+e)/1e6}constructor(){super(),this._recordsets={},this._processed=0,this._created=0,this.on(m.DATABASE.RECORDSET.CREATE,this.createRecordset),this.on(m.DATABASE.RECORD.CREATE,this.createRecord),this.on(m.DATABASE.RECORD.UPDATE,this.updateRecord),this.on(m.DATABASE.RECORD.CLOSE,this.closeRecord)}createRecordset(t,e){const r={duration:process.hrtime(),processed:0,path:t,silent:e};$ftui$var$Database.create(this._recordsets,t,Object.defineProperty({},"meta",{value:r}))}createRecord(t){if(!t)throw new TypeError("Missing record path!");if(!$ftui$var$Database.parent(this._recordsets,t))throw new TypeError(`Missing or null records list for ${t}`);this._created+=1,$ftui$var$Database.create(this._recordsets,t,{result:Na.PENDING,payload:null,duration:process.hrtime()})}updateRecord(t,e,r){if(!L.includes(e))throw new TypeError(`Result should be one of ${L.join()}. Got ${e}.`);const s=$ftui$var$Database.open(this._recordsets,t);if(!s)throw new TypeError(`Missing or null records list for ${t}`);s.result=e,s.payload=r}closeRecord(t){setImmediate(()=>{this._processed+=1;const e=this._processed===this._created,r=$ftui$var$Database.parent(this._recordsets,t);r.meta.processed+=1;const s=Object.values(r).filter(t=>!t.meta).length,a=r.meta.processed===s;if(e)r.meta.duration=$ftui$var$Database.toMilliseconds(process.hrtime(r.meta.duration)),this.emit(m.DATABASE.PROCESS.ENDED,this._recordsets);else if(a)r.meta.duration=$ftui$var$Database.toMilliseconds(process.hrtime(r.meta.duration)),this.emit(m.DATABASE.RECORDSET.CLOSED,r.meta.path);else{const e=$ftui$var$Database.open(this._recordsets,t);e.duration=$ftui$var$Database.toMilliseconds(process.hrtime(e.duration))}})}};Ka=new Pa}var Sa,Ta,M,Va,Wa=false;function Xa(){if(Wa)return;Wa=true;Sa={};Ta=require("events");({EVENT:M}=(j(),k));Va=class $DVdD$var$ProcessManager extends Ta{constructor(){super(),this._exitCode=0,this.on(M.PROCESS.EXIT,()=>{setImmediate(()=>{process.exit(this._exitCode)})}),this.on(M.PROCESS.EXIT_CODE.FAILURE,()=>{this._exitCode=1})}};Sa=new Va}var Ya,b,D,_a,h,Q,e,v,eb,fb=false;function gb(){if(fb)return;fb=true;Ya={};({EVENT:b,RESULT:D}=(j(),k));_a=(Ja(),Da);h=(Ra(),Ka);Q=(Xa(),Sa);({Spec:e}=(N(),F));({Suite:v}=(W(),O));eb=class $LyAn$var$EventBus{init(){this._reporters=[_a],v.on(b.SUITE.STARTED,($,E)=>{h.emit(b.DATABASE.RECORDSET.CREATE,$,E)}),v.on(b.SUITE.HOOKS.REGISTER,($,E,a)=>{e.emit(b.SPEC.SETUP.REGISTER,$,E),e.emit(b.SPEC.TEARDOWN.REGISTER,$,a)}),v.on(b.SUITE.HOOKS.UNREGISTER,()=>{e.emit(b.SPEC.SETUP.UNREGISTER),e.emit(b.SPEC.TEARDOWN.UNREGISTER)}),e.on(b.SPEC.STARTED,$=>{h.emit(b.DATABASE.RECORD.CREATE,$)}),e.on(b.SPEC.SUCCESS,$=>{h.emit(b.DATABASE.RECORD.UPDATE,$,D.SUCCESS)}),e.on(b.SPEC.IGNORE,$=>{h.emit(b.DATABASE.RECORD.UPDATE,$,D.IGNORED)}),e.on(b.SPEC.FAILURE,($,E)=>{h.emit(b.DATABASE.RECORD.UPDATE,$,D.FAILURE,E),Q.emit(b.PROCESS.EXIT_CODE.FAILURE)}),e.on(b.SPEC.ENDED,$=>{h.emit(b.DATABASE.RECORD.CLOSE,$)}),h.on(b.DATABASE.PROCESS.ENDED,$=>{this._reporters.forEach(E=>{E.emit(b.REPORTER.REPORT.START,$)})}),h.on(b.DATABASE.RECORDSET.CLOSED,$=>{v.emit(b.SUITE.ENDED,$)}),this._reporters.forEach($=>{$.on(b.REPORTER.REPORT.ENDED,()=>{Q.emit(b.PROCESS.EXIT)})})}};Ya=new eb}var qb,B,C,V,lb,i,X,ob=false;function hb(){if(ob)return;ob=true;qb={};({spec:B,xspec:C}=(N(),F));({suite:V}=(W(),O));lb=(gb(),Ya);lb.init();i={};X={suite:V.bind(i),describe:V.bind(i),spec:B.bind(i),it:B.bind(i),test:B.bind(i),xspec:C.bind(i),xit:C.bind(i),xtest:C.bind(i)};Object.assign($,X),qb=X}var E=function(){var exports=this,module={exports:this};const{resolve:resolve}=require("path"),{existsSync:existsSync}=require("fs");return function main(){const argvParser=new n(process.argv),CLIOptions=argvParser.getCLIOptions();CLIOptions[n.CLI_OPTION.HELP]?(U.printHelp(),process.exit(0)):CLIOptions[n.CLI_OPTION.VERSION]&&(U.printVersion(),process.exit(0));const rootDirectoryPath=resolve(CLIOptions[n.CLI_OPTION.DIRECTORY]);if(!rootDirectoryPath)throw new Error("Missing path to test file! Use `titef --help` for further information");if(!existsSync(rootDirectoryPath))throw new Error(`The directory at ${rootDirectoryPath} does not exist! Use \`titef --help\` for further information`);Ga(),hb();const directoryWalkerOptions={extensions:CLIOptions[n.CLI_OPTION.EXTENSIONS]},directoryWalker=new aa(rootDirectoryPath,directoryWalkerOptions),testFiles=directoryWalker.getFiles();testFiles.forEach(testFile=>{eval("require")(testFile)})}(),module.exports}.call({});if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=E}else if(typeof define==="function"&&define.amd){define(function(){return E})}})();