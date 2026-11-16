import{$ as Nw,$n as q$2,$t as bu,An as jn,Ar as zl,At as Xt$2,B as KC,Bn as m$1,C as Fy,Cn as ga,Cr as ya,Ct as Uw,D as Gy,Dn as iS,Dt as Wj,En as iC,Er as yr,F as Io$1,Fn as lC,Fr as l$1,G as LH,Gt as aC,H as Kr,Hn as ma,I as JC,Ir as m$2,Jn as ob,Jt as am,Kn as ne$2,Kt as ae$3,Ln as le$4,Lr as n,Lt as ZE,M as Ig,Mr as zv,N as Ii,Nr as zw,Or as ze$3,Ot as Ww,Pr as zy,Pt as Yr,Q as Ng,Qn as pl,Qt as br,R as Jr,Rn as lf,Rr as o,Rt as Ze$2,Sr as xg,St as Uv,Tt as Vn$1,U as Kt$2,V as Kj,Vt as Zw,W as Ky,X as ME,Xn as pe$2,Y as Ly,Yn as pC,Yt as bC,Zn as pg,_ as Eg,_n as ev,_r as w$1,a as An$1,ar as sS,b as Et$2,bn as fl,br as wo$1,cn as dC,dn as dl,dr as uB,dt as R$2,en as bw,er as qC,et as Of,f as Cg,ft as RT,g as Dr,gn as ee$2,gr as va,hr as ut$2,ht as Sn,i as $y,ir as qw,it as Py,j as Id,jt as Xy,k as Hy,kn as jg,kr as zi,l as By,lr as te$2,lt as Qr,m as Dg,mn as eC,nt as Os,on as co$1,p as Cn$1,pn as dy,pt as Rg,q as Lg,qn as oS,qt as ah,rn as ci,rr as qn,rt as Pp,sn as cs,st as Qj,tn as cC,u as Ce$4,un as df,v as Eo,vr as wa,vt as Tb,w as Gg,wt as Uy,x as FC,xn as g,xr as x$2,y as Es,yr as wg,z as Jy,zn as ll}from"./chunk-BiFATNB0.js";import{a as dr,i as _o,n as To,o as le$5,t as Nt$2}from"./chunk-C7E0xfVd.js";import{a as ie$3,i as gt$1,n as at$1,o as lt$2,r as bt$2,s as oe$2,t as Nt$3}from"./chunk-DNonDsop.js";var l=class{_id;_email;_status;_roles;constructor(t){this._id=t.id,this._email=t.email,this._status=t.status,this._roles=[...t.roles]}get id(){return this._id}get email(){return this._email}get status(){return this._status}get roles(){return[...this._roles]}get emailVerified(){return this._status===`ACTIVE`}get roleCode(){return(this._roles[0]??``).replace(/^ROLE_/,``)}};var f$1=class r{toEntityFromUserResource(t){return new l({id:t.id,email:t.email,status:t.status,roles:t.roles??[]})}toEntityFromAuthenticatedResource(t){return new l({id:t.id,email:t.email,status:`ACTIVE`,roles:t.roles??[]})}static ɵfac=function(e){return new(e||r)};static ɵprov=ze$3({token:r,factory:r.ɵfac})};var m=class extends Error{constructor(e,i,n){super(n);this.status=e;this.code=i}status;code};var v$1=class r{http=m$1(dy);assembler=m$1(f$1);authenticationUrl=`${LH.vantaraBackendBaseUrl}/authentication`;signUp(t,e,i){return this.http.post(`${this.authenticationUrl}/sign-up`,{email:t.trim().toLowerCase(),password:e,role:i}).pipe(le$4(n=>this.assembler.toEntityFromUserResource(n)),ma(n=>this.toIamError(n)))}verifyEmail(t,e){return this.http.post(`${this.authenticationUrl}/verify-email`,{email:t.trim().toLowerCase(),code:e.trim()}).pipe(le$4(i=>this.assembler.toEntityFromUserResource(i)),ma(i=>this.toIamError(i)))}sendVerificationCode(t){return this.http.post(`${this.authenticationUrl}/send-verification-code`,{email:t.trim().toLowerCase()}).pipe(le$4(()=>{}),ma(e=>this.toIamError(e)))}signIn(t,e){return this.http.post(`${this.authenticationUrl}/sign-in`,{email:t.trim().toLowerCase(),password:e}).pipe(le$4(i=>({account:this.assembler.toEntityFromAuthenticatedResource(i),token:i.token})),ma(i=>this.toIamError(i)))}toIamError(t){let e=t.error,i=typeof e?.message==`string`?e.message:``;return Py(()=>new m(t.status,e?.code??``,i))}static ɵfac=function(e){return new(e||r)};static ɵprov=ze$3({token:r,factory:r.ɵfac})};var S$4=class r{authenticationEndpoint=m$1(v$1);signUp(t,e,i){return this.authenticationEndpoint.signUp(t,e,i)}verifyEmail(t,e){return this.authenticationEndpoint.verifyEmail(t,e)}sendVerificationCode(t){return this.authenticationEndpoint.sendVerificationCode(t)}signIn(t,e){return this.authenticationEndpoint.signIn(t,e)}static ɵfac=function(e){return new(e||r)};static ɵprov=ze$3({token:r,factory:r.ɵfac})};var p$1=`hatarium.token`;var nt$2=(r,t)=>{if(!r.url.startsWith(LH.vantaraBackendBaseUrl))return t(r);let e=m$1(pe$2),i=r.url.startsWith(`${LH.vantaraBackendBaseUrl}/authentication/`),n=null;try{n=sessionStorage.getItem(p$1)}catch{n=null}return t(n&&!i?r.clone({setHeaders:{Authorization:`Bearer ${n}`}}):r).pipe(ma(s=>(s instanceof An$1&&s.status===401&&n&&!i&&(e.get(y$1).signOut(),e.get(le$5).navigate([`/iam/sign-in`])),Py(()=>s))))};var N=`hatarium.session`;var A=`hatarium.pendingProfile`;var y$1=class r{iamApi=m$1(S$4);currentAccountSignal=zi(null);pendingAccountSignal=zi(null);loadingSignal=zi(!1);errorSignal=zi(null);infoSignal=zi(null);currentAccount=this.currentAccountSignal.asReadonly();pendingAccount=this.pendingAccountSignal.asReadonly();loading=this.loadingSignal.asReadonly();error=this.errorSignal.asReadonly();info=this.infoSignal.asReadonly();isAuthenticated=ob(()=>this.currentAccountSignal()!==null);currentUserId=ob(()=>this.currentAccountSignal()?.id??null);ready;constructor(){this.restoreSession(),this.ready=Promise.resolve()}registerAccount(t,e,i,n,E){this.startRequest(),this.iamApi.signUp(t,e,i).subscribe({next:s=>{U$2(A,JSON.stringify({email:s.email,fullName:n,organizationName:E})),this.pendingAccountSignal.set(s),this.loadingSignal.set(!1)},error:s=>{this.pendingAccountSignal.set(null),this.fail(s,`No se pudo registrar la cuenta.`,{409:`Ya existe una cuenta con ese correo.`})}})}verifyEmail(t,e){this.startRequest(),this.iamApi.verifyEmail(t,e).subscribe({next:i=>{this.pendingAccountSignal.set(i),this.loadingSignal.set(!1)},error:i=>this.fail(i,`No se pudo verificar el correo.`,{400:`El código no es correcto.`,404:`No existe una cuenta con ese correo.`,422:`El código expiró, ya se usó o superaste los intentos. Solicita uno nuevo.`})})}resendVerificationCode(t){this.startRequest(),this.iamApi.sendVerificationCode(t).subscribe({next:()=>{this.infoSignal.set(`Te enviamos un nuevo código de verificación.`),this.loadingSignal.set(!1)},error:e=>this.fail(e,`No se pudo reenviar el código.`,{422:`La cuenta ya está verificada o debes esperar un minuto antes de pedir otro código.`})})}signIn(t,e){this.startRequest(),this.iamApi.signIn(t,e).subscribe({next:({account:i,token:n})=>{U$2(p$1,n),U$2(N,JSON.stringify({id:i.id,email:i.email,roles:i.roles})),this.currentAccountSignal.set(i),this.loadingSignal.set(!1)},error:i=>{this.clearSession(),this.fail(i,`No se pudo iniciar sesión.`,{401:`El correo o la contraseña no son correctos.`,422:`Debes verificar tu correo antes de iniciar sesión.`})}})}signOut(){this.clearSession(),this.errorSignal.set(null),this.infoSignal.set(null)}getPendingProfile(t){let e=O$2(A);if(!e)return null;try{let i=JSON.parse(e);return i.email?.toLowerCase()===t.toLowerCase()?i:null}catch{return b$2(A),null}}clearPendingProfile(t){this.getPendingProfile(t)&&b$2(A)}restoreSession(){let t=O$2(p$1),e=O$2(N);if(!t||!e||C$1(t)){this.clearSession();return}try{let i=JSON.parse(e);if(typeof i.id!=`number`||!i.email)throw new Error(`Invalid session`);this.currentAccountSignal.set(new l({id:i.id,email:i.email,status:`ACTIVE`,roles:i.roles??[]}))}catch{this.clearSession()}}clearSession(){b$2(p$1),b$2(N),this.currentAccountSignal.set(null)}startRequest(){this.loadingSignal.set(!0),this.errorSignal.set(null),this.infoSignal.set(null)}fail(t,e,i){let n=e;t instanceof m&&(t.status===0?n=`No se pudo conectar con el servidor.`:n=i[t.status]??(t.status===400&&t.message?t.message:e)),this.errorSignal.set(n),this.loadingSignal.set(!1)}static ɵfac=function(e){return new(e||r)};static ɵprov=ze$3({token:r,factory:r.ɵfac})};function C$1(r){try{let t=r.split(`.`)[1].replace(/-/g,`+`).replace(/_/g,`/`),e=JSON.parse(atob(t.padEnd(Math.ceil(t.length/4)*4,`=`)));return typeof e.exp==`number`&&e.exp*1e3<=Date.now()}catch{return!0}}function O$2(r){try{return sessionStorage.getItem(r)}catch{return null}}function U$2(r,t){try{sessionStorage.setItem(r,t)}catch{}}function b$2(r){try{sessionStorage.removeItem(r)}catch{}}var a=class{id;accountId;fullName;organizationName=``;email=``;phone;photoUrl;theme;locale;constructor(){this.id=``,this.accountId=``,this.fullName=``,this.phone=``,this.photoUrl=``,this.theme=``,this.locale=``}displayName(){return this.fullName}hasPhoto(){return!!this.photoUrl}};var S$3=class o{static ROLE_NAMES={RANCHER:`Ganadero`,VETERINARIAN:`Veterinario`,FINAL_USER:`Usuario final`,ADMIN:`Administrador`};http=m$1(dy);iamStore=m$1(y$1);profileUrl=`${LH.vantaraBackendBaseUrl}/profile-management/profiles/me`;roleReady=Promise.resolve();profile=zi(null);profileStatus=zi(`signed-out`);retryVersion=zi(0);roleCode=ob(()=>this.iamStore.currentAccount()?.roleCode??``);isVeterinarian=ob(()=>this.roleCode()===`VETERINARIAN`);landingRoute=ob(()=>this.isVeterinarian()?`/veterinary/dashboard`:`/home`);user=ob(()=>{let e=this.iamStore.currentAccount();if(!e)return null;let t=this.profile(),r=String(e.id);return{id:r,accountId:r,fullName:t?.fullName??``,photoUrl:t?.photoUrl??``}});fullName=ob(()=>this.user()?.fullName||this.iamStore.currentAccount()?.email||``);roleName=ob(()=>o.ROLE_NAMES[this.roleCode()]??``);photoUrl=ob(()=>this.user()?.photoUrl??``);iamUserId=ob(()=>this.iamStore.currentUserId());userId=ob(()=>{let e=this.iamUserId();return e===null?``:String(e)});updateProfile(e){let t=this.iamStore.currentAccount();!t||String(t.id)!==String(e.accountId)||(this.profile.set(e),this.profileStatus.set(`ready`))}retryProfileLoad(){this.retryVersion.update(e=>e+1)}initials=ob(()=>{let e=this.fullName().trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].charAt(0).toUpperCase():(e[0].charAt(0)+e[1].charAt(0)).toUpperCase():``});constructor(){Of(e=>{let t=this.iamStore.currentAccount();if(this.retryVersion(),!t){this.profile.set(null),this.profileStatus.set(`signed-out`);return}let r=String(t.id);this.profile.set(null),this.profileStatus.set(`loading`);let s=this.iamStore.getPendingProfile(t.email),v=this.loadProfile(t.email,s).subscribe({next:u=>{if(String(this.iamStore.currentAccount()?.id)!==r)return;if(!u){this.profile.set(null),this.profileStatus.set(`missing`);return}let U=this.toUser(u,t.email);this.profile.set(U),this.profileStatus.set(`ready`),s&&this.iamStore.clearPendingProfile(t.email)},error:()=>{String(this.iamStore.currentAccount()?.id)===r&&this.profileStatus.set(`error`)}});e(()=>v.unsubscribe())})}loadProfile(e,t){return t?this.http.put(this.profileUrl,{fullName:t.fullName,organizationName:t.organizationName}):this.http.get(this.profileUrl).pipe(ma(r=>r instanceof An$1&&r.status===404?ga(null):Py(()=>r)))}toUser(e,t){let r=new a;return r.id=String(e.id),r.accountId=String(e.userId),r.email=t,r.fullName=e.fullName??``,r.organizationName=e.organizationName??``,r.photoUrl=e.photoUrl??``,r.phone=e.phone??``,r.theme=e.theme??`light`,r.locale=e.locale??`es`,r}static ɵfac=function(t){return new(t||o)};static ɵprov=R$2({token:o,factory:o.ɵfac,providedIn:`root`})};function H$2(e){return e.buttons===0||e.detail===0}function W$1(e){let a=e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0];return!!a&&a.identifier===-1&&(a.radiusX==null||a.radiusX===1)&&(a.radiusY==null||a.radiusY===1)}var _t$1;function de$3(){if(_t$1==null){let e=typeof document<`u`?document.head:null;_t$1=!!(e&&(e.createShadowRoot||e.attachShadow))}return _t$1}function xt$1(e){if(de$3()){let a=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<`u`&&ShadowRoot&&a instanceof ShadowRoot)return a}return null}function Nt$1(){let e=typeof document<`u`&&document?document.activeElement:null;for(;e&&e.shadowRoot;){let a=e.shadowRoot.activeElement;if(a===e)break;e=a}return e}function y(e){if(e.composedPath)try{return e.composedPath()[0]}catch{}return e.target}var St$1;try{St$1=typeof Intl<`u`&&Intl.v8BreakIterator}catch{St$1=!1}var b$1=(()=>{class e{_platformId=m$1(Qr);isBrowser=this._platformId?uB(this._platformId):typeof document==`object`&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||St$1)&&typeof CSS<`u`&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!(`MSStream`in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static ɵfac=function(n){return new(n||e)};static ɵprov=ze$3({token:e,factory:e.ɵfac})}return e})();var Z;function le$3(){if(Z==null&&typeof window<`u`)try{window.addEventListener(`test`,null,Object.defineProperty({},"passive",{get:()=>Z=!0}))}finally{Z=Z||!1}return Z}function B$1(e){return le$3()?e:!!e.capture}function wt$1(e,a=0){return ue$2(e)?Number(e):arguments.length===2?a:0}function ue$2(e){return!isNaN(parseFloat(e))&&!isNaN(Number(e))}function S$2(e){return e instanceof Sn?e.nativeElement:e}var be$2=new w$1(`cdk-input-modality-detector-options`);var pe$1={ignoreKeys:[18,17,224,91,16]};var fe=650;var Et$1={passive:!0,capture:!0};var he$1=(()=>{class e{_platform=m$1(b$1);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new br(null);_options;_lastTouchMs=0;_onKeydown=t=>{this._options?.ignoreKeys?.some(n=>n===t.keyCode)||(this._modality.next(`keyboard`),this._mostRecentTarget=y(t))};_onMousedown=t=>{Date.now()-this._lastTouchMs<fe||(this._modality.next(H$2(t)?`keyboard`:`mouse`),this._mostRecentTarget=y(t))};_onTouchstart=t=>{if(W$1(t)){this._modality.next(`keyboard`);return}this._lastTouchMs=Date.now(),this._modality.next(`touch`),this._mostRecentTarget=y(t)};constructor(){let t=m$1(ae$3),n=m$1(q$2),o=m$1(be$2,{optional:!0});if(this._options=l$1(l$1({},pe$1),o),this.modalityDetected=this._modality.pipe(Xy(1)),this.modalityChanged=this.modalityDetected.pipe(Gy()),this._platform.isBrowser){let i=m$1(Cn$1).createRenderer(null,null);this._listenerCleanups=t.runOutsideAngular(()=>[i.listen(n,`keydown`,this._onKeydown,Et$1),i.listen(n,`mousedown`,this._onMousedown,Et$1),i.listen(n,`touchstart`,this._onTouchstart,Et$1)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(t=>t())}static ɵfac=function(n){return new(n||e)};static ɵprov=ze$3({token:e,factory:e.ɵfac})}return e})();var G$1=(function(e){return e[e.IMMEDIATE=0]=`IMMEDIATE`,e[e.EVENTUAL=1]=`EVENTUAL`,e})(G$1||{});var ve$2=new w$1(`cdk-focus-monitor-default-options`);var mt$1=B$1({passive:!0,capture:!0});var dt$1=(()=>{class e{_ngZone=m$1(ae$3);_platform=m$1(b$1);_inputModalityDetector=m$1(he$1);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=m$1(q$2);_stopInputModalityDetector=new ee$2;constructor(){let t=m$1(ve$2,{optional:!0});this._detectionMode=t?.detectionMode||G$1.IMMEDIATE}_rootNodeFocusAndBlurListener=t=>{let n=y(t);for(let o=n;o;o=o.parentElement)t.type===`focus`?this._onFocus(t,o):this._onBlur(t,o)};monitor(t,n=!1){let o=S$2(t);if(!this._platform.isBrowser||o.nodeType!==1)return ga();let i=xt$1(o)||this._document,s=this._elementInfo.get(o);if(s)return n&&(s.checkChildren=!0),s.subject;let c={checkChildren:n,subject:new ee$2,rootNode:i};return this._elementInfo.set(o,c),this._registerGlobalListeners(c),c.subject}stopMonitoring(t){let n=S$2(t),o=this._elementInfo.get(n);o&&(o.subject.complete(),this._setClasses(n),this._elementInfo.delete(n),this._removeGlobalListeners(o))}focusVia(t,n,o){let i=S$2(t);i===this._document.activeElement?this._getClosestElementsInfo(i).forEach(([c,w])=>this._originChanged(c,n,w)):(this._setOrigin(n),typeof i.focus==`function`&&i.focus(o))}ngOnDestroy(){this._elementInfo.forEach((t,n)=>this.stopMonitoring(n))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(t){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(t)?`touch`:`program`:this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:t&&this._isLastInteractionFromInputLabel(t)?`mouse`:`program`}_shouldBeAttributedToTouch(t){return this._detectionMode===G$1.EVENTUAL||!!t?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(t,n){t.classList.toggle(`cdk-focused`,!!n),t.classList.toggle(`cdk-touch-focused`,n===`touch`),t.classList.toggle(`cdk-keyboard-focused`,n===`keyboard`),t.classList.toggle(`cdk-mouse-focused`,n===`mouse`),t.classList.toggle(`cdk-program-focused`,n===`program`)}_setOrigin(t,n=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=t,this._originFromTouchInteraction=t===`touch`&&n,this._detectionMode===G$1.IMMEDIATE){clearTimeout(this._originTimeoutId);let o=this._originFromTouchInteraction?fe:1;this._originTimeoutId=setTimeout(()=>this._origin=null,o)}})}_onFocus(t,n){let o=this._elementInfo.get(n),i=y(t);!o||!o.checkChildren&&n!==i||this._originChanged(n,this._getFocusOrigin(i),o)}_onBlur(t,n){let o=this._elementInfo.get(n);!o||o.checkChildren&&t.relatedTarget instanceof Node&&n.contains(t.relatedTarget)||(this._setClasses(n),this._emitOrigin(o,null))}_emitOrigin(t,n){t.subject.observers.length&&this._ngZone.run(()=>t.subject.next(n))}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;let n=t.rootNode,o=this._rootNodeFocusListenerCount.get(n)||0;o||this._ngZone.runOutsideAngular(()=>{n.addEventListener(`focus`,this._rootNodeFocusAndBlurListener,mt$1),n.addEventListener(`blur`,this._rootNodeFocusAndBlurListener,mt$1)}),this._rootNodeFocusListenerCount.set(n,o+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener(`focus`,this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(ev(this._stopInputModalityDetector)).subscribe(i=>{this._setOrigin(i,!0)}))}_removeGlobalListeners(t){let n=t.rootNode;if(this._rootNodeFocusListenerCount.has(n)){let o=this._rootNodeFocusListenerCount.get(n);o>1?this._rootNodeFocusListenerCount.set(n,o-1):(n.removeEventListener(`focus`,this._rootNodeFocusAndBlurListener,mt$1),n.removeEventListener(`blur`,this._rootNodeFocusAndBlurListener,mt$1),this._rootNodeFocusListenerCount.delete(n))}--this._monitoredElementCount||(this._getWindow().removeEventListener(`focus`,this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(t,n,o){this._setClasses(t,n),this._emitOrigin(o,n),this._lastFocusOrigin=n}_getClosestElementsInfo(t){let n=[];return this._elementInfo.forEach((o,i)=>{(i===t||o.checkChildren&&i.contains(t))&&n.push([i,o])}),n}_isLastInteractionFromInputLabel(t){let{_mostRecentTarget:n,mostRecentModality:o}=this._inputModalityDetector;if(o!==`mouse`||!n||n===t||t.nodeName!==`INPUT`&&t.nodeName!==`TEXTAREA`||t.disabled)return!1;let i=t.labels;if(i){for(let s=0;s<i.length;s++)if(i[s].contains(n))return!0}return!1}static ɵfac=function(n){return new(n||e)};static ɵprov=ze$3({token:e,factory:e.ɵfac})}return e})();var je=(()=>{class e{_elementRef=m$1(Sn);_focusMonitor=m$1(dt$1);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new ut$2;get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){let t=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(t,t.nodeType===1&&t.hasAttribute(`cdkMonitorSubtreeFocus`)).subscribe(n=>{this._focusOrigin=n,this.cdkFocusChange.emit(n)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription?.unsubscribe()}static ɵfac=function(n){return new(n||e)};static ɵdir=yr({type:e,selectors:[[``,`cdkMonitorElementFocus`,``],[``,`cdkMonitorSubtreeFocus`,``]],outputs:{cdkFocusChange:`cdkFocusChange`},exportAs:[`cdkMonitorFocus`]})}return e})();function Hn(e){return Array.isArray(e)?e:[e]}var ge$1=new Set;var D$2;var It$2=(()=>{class e{_platform=m$1(b$1);_nonce=m$1(Kr,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):Ve$1}matchMedia(t){return(this._platform.WEBKIT||this._platform.BLINK)&&Ke$1(t,this._nonce),this._matchMedia(t)}static ɵfac=function(n){return new(n||e)};static ɵprov=ze$3({token:e,factory:e.ɵfac})}return e})();function Ke$1(e,a){if(!ge$1.has(e))try{D$2||(D$2=document.createElement(`style`),a&&D$2.setAttribute(`nonce`,a),D$2.setAttribute(`type`,`text/css`),document.head.appendChild(D$2)),D$2.sheet&&(D$2.sheet.insertRule(`@media ${e.replace(/[{}]/g,``)} {body{ }}`,0),ge$1.add(e))}catch(t){console.error(t)}}function Ve$1(e){return{matches:e===`all`||e===``,media:e,addListener:()=>{},removeListener:()=>{}}}function He$1(e){if(e.type===`characterData`&&e.target instanceof Comment)return!0;if(e.type===`childList`){for(let a=0;a<e.addedNodes.length;a++)if(!(e.addedNodes[a]instanceof Comment))return!1;for(let a=0;a<e.removedNodes.length;a++)if(!(e.removedNodes[a]instanceof Comment))return!1;return!0}return!1}var ye$3=(()=>{class e{create(t){return typeof MutationObserver>`u`?null:new MutationObserver(t)}static ɵfac=function(n){return new(n||e)};static ɵprov=ze$3({token:e,factory:e.ɵfac})}return e})();var We$2=(()=>{class e{_mutationObserverFactory=m$1(ye$3);_observedElements=new Map;_ngZone=m$1(ae$3);ngOnDestroy(){this._observedElements.forEach((t,n)=>this._cleanupObserver(n))}observe(t){let n=S$2(t);return new x$2(o=>{let s=this._observeElement(n).pipe(le$4(c=>c.filter(w=>!He$1(w))),Xt$2(c=>!!c.length)).subscribe(c=>{this._ngZone.run(()=>{o.next(c)})});return()=>{s.unsubscribe(),this._unobserveElement(n)}})}_observeElement(t){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(t))this._observedElements.get(t).count++;else{let n=new ee$2,o=this._mutationObserverFactory.create(i=>n.next(i));o&&o.observe(t,{characterData:!0,childList:!0,subtree:!0}),this._observedElements.set(t,{observer:o,stream:n,count:1})}return this._observedElements.get(t).stream})}_unobserveElement(t){this._observedElements.has(t)&&(this._observedElements.get(t).count--,this._observedElements.get(t).count||this._cleanupObserver(t))}_cleanupObserver(t){if(this._observedElements.has(t)){let{observer:n,stream:o}=this._observedElements.get(t);n&&n.disconnect(),o.complete(),this._observedElements.delete(t)}}static ɵfac=function(n){return new(n||e)};static ɵprov=ze$3({token:e,factory:e.ɵfac})}return e})();var ia=(()=>{class e{_contentObserver=m$1(We$2);_elementRef=m$1(Sn);event=new ut$2;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._disabled?this._unsubscribe():this._subscribe()}_disabled=!1;get debounce(){return this._debounce}set debounce(t){this._debounce=wt$1(t),this._subscribe()}_debounce;_currentSubscription=null;ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe()}ngOnDestroy(){this._unsubscribe()}_subscribe(){this._unsubscribe();let t=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?t.pipe($y(this.debounce)):t).subscribe(this.event)}_unsubscribe(){this._currentSubscription?.unsubscribe()}static ɵfac=function(n){return new(n||e)};static ɵdir=yr({type:e,selectors:[[``,`cdkObserveContent`,``]],inputs:{disabled:[2,`cdkObserveContentDisabled`,`disabled`,Qj],debounce:`debounce`},outputs:{event:`cdkObserveContent`},exportAs:[`cdkObserveContent`]})}return e})();var ra=(()=>{class e{static ɵfac=function(n){return new(n||e)};static ɵmod=Eo({type:e});static ɵinj=qn({providers:[ye$3]})}return e})();var xe=(()=>{class e{_platform=m$1(b$1);isDisabled(t){return t.hasAttribute(`disabled`)}isVisible(t){return Ge(t)&&getComputedStyle(t).visibility===`visible`}isTabbable(t){if(!this._platform.isBrowser)return!1;let n=Ze$1(en$1(t));if(n&&(_e$1(n)===-1||!this.isVisible(n)))return!1;let o=t.nodeName.toLowerCase(),i=_e$1(t);return t.hasAttribute(`contenteditable`)?i!==-1:o===`iframe`||o===`object`||this._platform.WEBKIT&&this._platform.IOS&&!Je$1(t)?!1:o===`audio`?t.hasAttribute(`controls`)?i!==-1:!1:o===`video`?i===-1?!1:i!==null?!0:this._platform.FIREFOX||t.hasAttribute(`controls`):t.tabIndex>=0}isFocusable(t,n){return tn$1(t)&&!this.isDisabled(t)&&(n?.ignoreVisibility||this.isVisible(t))}static ɵfac=function(n){return new(n||e)};static ɵprov=ze$3({token:e,factory:e.ɵfac})}return e})();function Ze$1(e){try{return e.frameElement}catch{return null}}function Ge(e){return!!(e.offsetWidth||e.offsetHeight||typeof e.getClientRects==`function`&&e.getClientRects().length)}function $e$2(e){let a=e.nodeName.toLowerCase();return a===`input`||a===`select`||a===`button`||a===`textarea`}function Ye$1(e){return Xe$1(e)&&e.type==`hidden`}function Qe$1(e){return qe$1(e)&&e.hasAttribute(`href`)}function Xe$1(e){return e.nodeName.toLowerCase()==`input`}function qe$1(e){return e.nodeName.toLowerCase()==`a`}function Ne$2(e){if(!e.hasAttribute(`tabindex`)||e.tabIndex===void 0)return!1;let a=e.getAttribute(`tabindex`);return!!(a&&!isNaN(parseInt(a,10)))}function _e$1(e){if(!Ne$2(e))return null;let a=parseInt(e.getAttribute(`tabindex`)||``,10);return isNaN(a)?-1:a}function Je$1(e){let a=e.nodeName.toLowerCase(),t=a===`input`&&e.type;return t===`text`||t===`password`||a===`select`||a===`textarea`}function tn$1(e){return Ye$1(e)?!1:$e$2(e)||Qe$1(e)||e.hasAttribute(`contenteditable`)||Ne$2(e)}function en$1(e){return e.ownerDocument&&e.ownerDocument.defaultView||window}var lt$1=class{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=!1;startAnchorListener=()=>{!this.focusLastTabbableElement()&&this._checker.isFocusable(this._element)&&this._element.focus()};endAnchorListener=()=>{!this.focusFirstTabbableElement()&&this._checker.isFocusable(this._element)&&this._element.focus()};get enabled(){return this._enabled}set enabled(a){this._enabled=a,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(a,this._startAnchor),this._toggleAnchorTabIndex(a,this._endAnchor))}_enabled=!0;constructor(a,t,n,o,i=!1,s){this._element=a,this._checker=t,this._ngZone=n,this._document=o,this._injector=s,i||this.attachAnchors()}destroy(){let a=this._startAnchor,t=this._endAnchor;a&&(a.removeEventListener(`focus`,this.startAnchorListener),a.remove()),t&&(t.removeEventListener(`focus`,this.endAnchorListener),t.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return this._hasAttached?!0:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener(`focus`,this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener(`focus`,this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(a){return new Promise(t=>{this._executeOnStable(()=>t(this.focusInitialElement(a)))})}focusFirstTabbableElementWhenReady(a){return new Promise(t=>{this._executeOnStable(()=>t(this.focusFirstTabbableElement(a)))})}focusLastTabbableElementWhenReady(a){return new Promise(t=>{this._executeOnStable(()=>t(this.focusLastTabbableElement(a)))})}_getRegionBoundary(a){let t=this._element.querySelectorAll(`[cdk-focus-region-${a}], [cdkFocusRegion${a}], [cdk-focus-${a}]`);return a==`start`?t.length?t[0]:this._getFirstTabbableElement(this._element):t.length?t[t.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(a){let t=this._element.querySelector(`[cdk-focus-initial], [cdkFocusInitial]`);if(t){if(!this._checker.isFocusable(t)){let n=this._getFirstTabbableElement(t);return n?.focus(a),!!n}return t.focus(a),!0}return this.focusFirstTabbableElement(a)}focusFirstTabbableElement(a){let t=this._getRegionBoundary(`start`);return t&&t.focus(a),!!t}focusLastTabbableElement(a){let t=this._getRegionBoundary(`end`);return t&&t.focus(a),!!t}hasAttached(){return this._hasAttached}_getFirstTabbableElement(a){if(this._checker.isFocusable(a)&&this._checker.isTabbable(a))return a;let t=a.children;for(let n=0;n<t.length;n++){let o=t[n].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(t[n]):null;if(o)return o}return null}_getLastTabbableElement(a){if(this._checker.isFocusable(a)&&this._checker.isTabbable(a))return a;let t=a.children;for(let n=t.length-1;n>=0;n--){let o=t[n].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(t[n]):null;if(o)return o}return null}_createAnchor(){let a=this._document.createElement(`div`);return this._toggleAnchorTabIndex(this._enabled,a),a.classList.add(`cdk-visually-hidden`),a.classList.add(`cdk-focus-trap-anchor`),a.setAttribute(`aria-hidden`,`true`),a}_toggleAnchorTabIndex(a,t){a?t.setAttribute(`tabindex`,`0`):t.removeAttribute(`tabindex`)}toggleAnchors(a){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(a,this._startAnchor),this._toggleAnchorTabIndex(a,this._endAnchor))}_executeOnStable(a){ME(a,{injector:this._injector})}};var Se$2=(()=>{class e{_checker=m$1(xe);_ngZone=m$1(ae$3);_document=m$1(q$2);_injector=m$1(pe$2);constructor(){m$1(lt$2).load(bt$2)}create(t,n=!1){return new lt$1(t,this._checker,this._ngZone,this._document,n,this._injector)}static ɵfac=function(n){return new(n||e)};static ɵprov=ze$3({token:e,factory:e.ɵfac})}return e})();var nn$1=(()=>{class e{_elementRef=m$1(Sn);_focusTrapFactory=m$1(Se$2);focusTrap=void 0;_previouslyFocusedElement=null;get enabled(){return this.focusTrap?.enabled||!1}set enabled(t){this.focusTrap&&(this.focusTrap.enabled=t)}autoCapture=!1;constructor(){m$1(b$1).isBrowser&&(this.focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement,!0))}ngOnDestroy(){this.focusTrap?.destroy(),this._previouslyFocusedElement&&(this._previouslyFocusedElement.focus(),this._previouslyFocusedElement=null)}ngAfterContentInit(){this.focusTrap?.attachAnchors(),this.autoCapture&&this._captureFocus()}ngDoCheck(){this.focusTrap&&!this.focusTrap.hasAttached()&&this.focusTrap.attachAnchors()}ngOnChanges(t){let n=t.autoCapture;n&&!n.firstChange&&this.autoCapture&&this.focusTrap?.hasAttached()&&this._captureFocus()}_captureFocus(){this._previouslyFocusedElement=Nt$1(),this.focusTrap?.focusInitialElementWhenReady()}static ɵfac=function(n){return new(n||e)};static ɵdir=yr({type:e,selectors:[[``,`cdkTrapFocus`,``]],inputs:{enabled:[2,`cdkTrapFocus`,`enabled`,Qj],autoCapture:[2,`cdkTrapFocusAutoCapture`,`autoCapture`,Qj]},exportAs:[`cdkTrapFocus`],features:[bu]})}return e})();var we$1=new w$1(`liveAnnouncerElement`,{providedIn:`root`,factory:()=>null});var Ee$2=new w$1(`LIVE_ANNOUNCER_DEFAULT_OPTIONS`);var an$1=0;var on$1=(()=>{class e{_ngZone=m$1(ae$3);_defaultOptions=m$1(Ee$2,{optional:!0});_liveElement;_document=m$1(q$2);_sanitizer=m$1(sS);_previousTimeout;_currentPromise;_currentResolve;constructor(){let t=m$1(we$1,{optional:!0});this._liveElement=t||this._createLiveElement()}announce(t,...n){let o=this._defaultOptions,i,s;return n.length===1&&typeof n[0]==`number`?s=n[0]:[i,s]=n,this.clear(),clearTimeout(this._previousTimeout),i||(i=o&&o.politeness?o.politeness:`polite`),s==null&&o&&(s=o.duration),this._liveElement.setAttribute(`aria-live`,i),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(c=>this._currentResolve=c)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!t||typeof t==`string`?this._liveElement.textContent=t:Nt$3(this._liveElement,t,this._sanitizer),typeof s==`number`&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent=``)}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let t=`cdk-live-announcer-element`,n=this._document.getElementsByClassName(t),o=this._document.createElement(`div`);for(let i=0;i<n.length;i++)n[i].remove();return o.classList.add(t),o.classList.add(`cdk-visually-hidden`),o.setAttribute(`aria-atomic`,`true`),o.setAttribute(`aria-live`,`polite`),o.id=`cdk-live-announcer-${an$1++}`,this._document.body.appendChild(o),o}_exposeAnnouncerToModals(t){let n=this._document.querySelectorAll(`body > .cdk-overlay-container [aria-modal="true"]`);for(let o=0;o<n.length;o++){let i=n[o],s=i.getAttribute(`aria-owns`);s?s.indexOf(t)===-1&&i.setAttribute(`aria-owns`,s+` `+t):i.setAttribute(`aria-owns`,t)}}static ɵfac=function(n){return new(n||e)};static ɵprov=ze$3({token:e,factory:e.ɵfac})}return e})();var rn$1=200;var ut$1=class{_letterKeyStream=new ee$2;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new ee$2;selectedItem=this._selectedItem;constructor(a,t){let n=typeof t?.debounceInterval==`number`?t.debounceInterval:rn$1;t?.skipPredicate&&(this._skipPredicateFn=t.skipPredicate),this.setItems(a),this._setupKeyHandler(n)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(a){this._selectedItemIndex=a}setItems(a){this._items=a}handleKey(a){let t=a.keyCode;a.key&&a.key.length===1?this._letterKeyStream.next(a.key.toLocaleUpperCase()):(t>=65&&t<=90||t>=48&&t<=57)&&this._letterKeyStream.next(String.fromCharCode(t))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(a){this._letterKeyStream.pipe(Id(t=>this._pressedLetters.push(t)),$y(a),Xt$2(()=>this._pressedLetters.length>0),le$4(()=>this._pressedLetters.join(``).toLocaleUpperCase())).subscribe(t=>{for(let n=1;n<this._items.length+1;n++){let o=(this._selectedItemIndex+n)%this._items.length,i=this._items[o];if(!this._skipPredicateFn?.(i)&&i.getLabel?.().toLocaleUpperCase().trim().indexOf(t)===0){this._selectedItem.next(i);break}}this._pressedLetters=[]})}};function Ie$2(e,...a){return a.length?a.some(t=>e[t]):e.altKey||e.shiftKey||e.ctrlKey||e.metaKey}var z$1=class{_items;_activeItemIndex=zi(-1);_activeItem=zi(null);_wrap=!1;_typeaheadSubscription=ne$2.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=a=>a.disabled;constructor(a,t){this._items=a,a instanceof cs?this._itemChangesSubscription=a.changes.subscribe(n=>this._itemsChanged(n.toArray())):Jr(a)&&(this._effectRef=Of(()=>this._itemsChanged(a()),{injector:t}))}tabOut=new ee$2;change=new ee$2;skipPredicate(a){return this._skipPredicateFn=a,this}withWrap(a=!0){return this._wrap=a,this}withVerticalOrientation(a=!0){return this._vertical=a,this}withHorizontalOrientation(a){return this._horizontal=a,this}withAllowedModifierKeys(a){return this._allowedModifierKeys=a,this}withTypeAhead(a=200){this._typeaheadSubscription.unsubscribe();let t=this._getItemsArray();return this._typeahead=new ut$1(t,{debounceInterval:typeof a==`number`?a:void 0,skipPredicate:n=>this._skipPredicateFn(n)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(n=>{this.setActiveItem(n)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(a=!0){return this._homeAndEnd=a,this}withPageUpDown(a=!0,t=10){return this._pageUpAndDown={enabled:a,delta:t},this}setActiveItem(a){let t=this._activeItem();this.updateActiveItem(a),this._activeItem()!==t&&this.change.next(this._activeItemIndex())}onKeydown(a){let t=a.keyCode,o=[`altKey`,`ctrlKey`,`metaKey`,`shiftKey`].every(i=>!a[i]||this._allowedModifierKeys.indexOf(i)>-1);switch(t){case 9:this.tabOut.next();return;case 40:if(this._vertical&&o){this.setNextItemActive();break}else return;case 38:if(this._vertical&&o){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&o){this._horizontal===`rtl`?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&o){this._horizontal===`rtl`?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&o){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&o){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&o){let i=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(i>0?i:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&o){let i=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(i<s?i:s-1,-1);break}else return;default:(o||Ie$2(a,`shiftKey`))&&this._typeahead?.handleKey(a);return}this._typeahead?.reset(),a.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(a){let t=this._getItemsArray(),n=typeof a==`number`?a:t.indexOf(a),o=t[n];this._activeItem.set(o??null),this._activeItemIndex.set(n),this._typeahead?.setCurrentSelectedItemIndex(n)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(a){this._wrap?this._setActiveInWrapMode(a):this._setActiveInDefaultMode(a)}_setActiveInWrapMode(a){let t=this._getItemsArray();for(let n=1;n<=t.length;n++){let o=(this._activeItemIndex()+a*n+t.length)%t.length,i=t[o];if(!this._skipPredicateFn(i)){this.setActiveItem(o);return}}}_setActiveInDefaultMode(a){this._setActiveItemByIndex(this._activeItemIndex()+a,a)}_setActiveItemByIndex(a,t){let n=this._getItemsArray();if(n[a]){for(;this._skipPredicateFn(n[a]);)if(a+=t,!n[a])return;this.setActiveItem(a)}}_getItemsArray(){return Jr(this._items)?this._items():this._items instanceof cs?this._items.toArray():this._items}_itemsChanged(a){this._typeahead?.setItems(a);let t=this._activeItem();if(t){let n=a.indexOf(t);n>-1&&n!==this._activeItemIndex()&&(this._activeItemIndex.set(n),this._typeahead?.setCurrentSelectedItemIndex(n))}}};var At$1=class extends z$1{setActiveItem(a){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(a),this.activeItem&&this.activeItem.setActiveStyles()}};var kt$1=class extends z$1{_origin=`program`;setFocusOrigin(a){return this._origin=a,this}setActiveItem(a){super.setActiveItem(a),this.activeItem&&this.activeItem.focus(this._origin)}};var Ae$3=new Map;var Mt$2=class e{_appId=m$1(Yr);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(a,t=!1){this._appId!==`ng`&&(a+=this._appId);let n=Ae$3.get(a);return n===void 0?n=0:n++,Ae$3.set(a,n),`${a}${t?e._infix+`-`:``}${n}`}static ɵfac=function(t){return new(t||e)};static ɵprov=ze$3({token:e,factory:e.ɵfac})};var $$1=(function(e){return e[e.NORMAL=0]=`NORMAL`,e[e.NEGATED=1]=`NEGATED`,e[e.INVERTED=2]=`INVERTED`,e})($$1||{});var bt$1;var F$2;function so(){if(F$2==null){if(typeof document!=`object`||!document||typeof Element!=`function`||!Element)return F$2=!1,F$2;if(document.documentElement?.style&&`scrollBehavior`in document.documentElement.style)F$2=!0;else{let e=Element.prototype.scrollTo;e?F$2=!/\{\s*\[native code\]\s*\}/.test(e.toString()):F$2=!1}}return F$2}function co(){if(typeof document!=`object`||!document)return $$1.NORMAL;if(bt$1==null){let e=document.createElement(`div`),a=e.style;e.dir=`rtl`,a.width=`1px`,a.overflow=`auto`,a.visibility=`hidden`,a.pointerEvents=`none`,a.position=`absolute`;let t=document.createElement(`div`),n=t.style;n.width=`2px`,n.height=`1px`,e.appendChild(t),document.body.appendChild(e),bt$1=$$1.NORMAL,e.scrollLeft===0&&(e.scrollLeft=1,bt$1=e.scrollLeft===0?$$1.NEGATED:$$1.INVERTED),e.remove()}return bt$1}function lo(){return typeof __karma__<`u`&&!!__karma__||typeof jasmine<`u`&&!!jasmine||typeof jest<`u`&&!!jest||typeof Mocha<`u`&&!!Mocha}var U$1;var ke=[`color`,`button`,`checkbox`,`date`,`datetime-local`,`email`,`file`,`hidden`,`image`,`month`,`number`,`password`,`radio`,`range`,`reset`,`search`,`submit`,`tel`,`text`,`time`,`url`,`week`];function bo(){if(U$1)return U$1;if(typeof document!=`object`||!document)return U$1=new Set(ke),U$1;let e=document.createElement(`input`);return U$1=new Set(ke.filter(a=>(e.setAttribute(`type`,a),e.type===a))),U$1}var sn$1=new w$1(`MATERIAL_ANIMATIONS`);var Me$2=null;function cn$1(){return m$1(sn$1,{optional:!0})?.animationsDisabled||m$1(zv,{optional:!0})===`NoopAnimations`?`di-disabled`:(Me$2??=m$1(It$2).matchMedia(`(prefers-reduced-motion)`).matches,Me$2?`reduced-motion`:`enabled`)}function j$2(){return cn$1()!==`enabled`}function wo(e){return e==null?``:typeof e==`string`?e:`${e}px`}function Io(e){return e!=null&&`${e}`!=`false`}var h$1=(function(e){return e[e.FADING_IN=0]=`FADING_IN`,e[e.VISIBLE=1]=`VISIBLE`,e[e.FADING_OUT=2]=`FADING_OUT`,e[e.HIDDEN=3]=`HIDDEN`,e})(h$1||{});var Tt$2=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=h$1.HIDDEN;constructor(a,t,n,o=!1){this._renderer=a,this.element=t,this.config=n,this._animationForciblyDisabledThroughCss=o}fadeOut(){this._renderer.fadeOutRipple(this)}};var Te$2=B$1({passive:!0,capture:!0});var Ct$2=class{_events=new Map;addHandler(a,t,n,o){let i=this._events.get(t);if(i){let s=i.get(n);s?s.add(o):i.set(n,new Set([o]))}else this._events.set(t,new Map([[n,new Set([o])]])),a.runOutsideAngular(()=>{document.addEventListener(t,this._delegateEventHandler,Te$2)})}removeHandler(a,t,n){let o=this._events.get(a);if(!o)return;let i=o.get(t);i&&(i.delete(n),i.size===0&&o.delete(t),o.size===0&&(this._events.delete(a),document.removeEventListener(a,this._delegateEventHandler,Te$2)))}_delegateEventHandler=a=>{let t=y(a);t&&this._events.get(a.type)?.forEach((n,o)=>{(o===t||o.contains(t))&&n.forEach(i=>i.handleEvent(a))})}};var Y$1={enterDuration:225,exitDuration:150};var mn$1=800;var Ce$3=B$1({passive:!0,capture:!0});var De$3=[`mousedown`,`touchstart`];var Fe$1=[`mouseup`,`mouseleave`,`touchend`,`touchcancel`];var dn$1=(()=>{class e{static ɵfac=function(n){return new(n||e)};static ɵcmp=bw({type:e,selectors:[[`ng-component`]],hostAttrs:[`mat-ripple-style-loader`,``],decls:0,vars:0,template:function(n,o){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--%NS%mat-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2})}return e})();var Q=class e{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Ct$2;constructor(a,t,n,o,i){this._target=a,this._ngZone=t,this._platform=o,o.isBrowser&&(this._containerElement=S$2(n)),i&&i.get(lt$2).load(dn$1)}fadeInRipple(a,t,n={}){let o=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),i=l$1(l$1({},Y$1),n.animation);n.centered&&(a=o.left+o.width/2,t=o.top+o.height/2);let s=n.radius||ln$1(a,t,o),c=a-o.left,w=t-o.top,k=i.enterDuration,u=document.createElement(`div`);u.classList.add(`mat-ripple-element`),u.style.left=`${c-s}px`,u.style.top=`${w-s}px`,u.style.height=`${s*2}px`,u.style.width=`${s*2}px`,n.color!=null&&(u.style.backgroundColor=n.color),u.style.transitionDuration=`${k}ms`,this._containerElement.appendChild(u);let Pt=window.getComputedStyle(u),Ue=Pt.transitionProperty,Lt=Pt.transitionDuration,ft=Ue===`none`||Lt===`0s`||Lt===`0s, 0s`||o.width===0&&o.height===0,M=new Tt$2(this,u,n,ft);u.style.transform=`scale3d(1, 1, 1)`,M.state=h$1.FADING_IN,n.persistent||(this._mostRecentTransientRipple=M);let X=null;return!ft&&(k||i.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let Bt=()=>{X&&(X.fallbackTimer=null),clearTimeout(zt),this._finishRippleTransition(M)},ht=()=>this._destroyRipple(M),zt=setTimeout(ht,k+100);u.addEventListener(`transitionend`,Bt),u.addEventListener(`transitioncancel`,ht),X={onTransitionEnd:Bt,onTransitionCancel:ht,fallbackTimer:zt}}),this._activeRipples.set(M,X),(ft||!k)&&this._finishRippleTransition(M),M}fadeOutRipple(a){if(a.state===h$1.FADING_OUT||a.state===h$1.HIDDEN)return;let t=a.element,n=l$1(l$1({},Y$1),a.config.animation);t.style.transitionDuration=`${n.exitDuration}ms`,t.style.opacity=`0`,a.state=h$1.FADING_OUT,(a._animationForciblyDisabledThroughCss||!n.exitDuration)&&this._finishRippleTransition(a)}fadeOutAll(){this._getActiveRipples().forEach(a=>a.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(a=>{a.config.persistent||a.fadeOut()})}setupTriggerEvents(a){let t=S$2(a);!this._platform.isBrowser||!t||t===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=t,De$3.forEach(n=>{e._eventManager.addHandler(this._ngZone,n,t,this)}))}handleEvent(a){a.type===`mousedown`?this._onMousedown(a):a.type===`touchstart`?this._onTouchStart(a):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{Fe$1.forEach(t=>{this._triggerElement.addEventListener(t,this,Ce$3)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(a){a.state===h$1.FADING_IN?this._startFadeOutTransition(a):a.state===h$1.FADING_OUT&&this._destroyRipple(a)}_startFadeOutTransition(a){let t=a===this._mostRecentTransientRipple,{persistent:n}=a.config;a.state=h$1.VISIBLE,!n&&(!t||!this._isPointerDown)&&a.fadeOut()}_destroyRipple(a){let t=this._activeRipples.get(a)??null;this._activeRipples.delete(a),this._activeRipples.size||(this._containerRect=null),a===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),a.state=h$1.HIDDEN,t!==null&&(a.element.removeEventListener(`transitionend`,t.onTransitionEnd),a.element.removeEventListener(`transitioncancel`,t.onTransitionCancel),t.fallbackTimer!==null&&clearTimeout(t.fallbackTimer)),a.element.remove()}_onMousedown(a){let t=H$2(a),n=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+mn$1;!this._target.rippleDisabled&&!t&&!n&&(this._isPointerDown=!0,this.fadeInRipple(a.clientX,a.clientY,this._target.rippleConfig))}_onTouchStart(a){if(!this._target.rippleDisabled&&!W$1(a)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let t=a.changedTouches;if(t)for(let n=0;n<t.length;n++)this.fadeInRipple(t[n].clientX,t[n].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(a=>{let t=a.state===h$1.VISIBLE||a.config.terminateOnPointerUp&&a.state===h$1.FADING_IN;!a.config.persistent&&t&&a.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let a=this._triggerElement;a&&(De$3.forEach(t=>e._eventManager.removeHandler(t,a,this)),this._pointerUpEventsRegistered&&(Fe$1.forEach(t=>a.removeEventListener(t,this,Ce$3)),this._pointerUpEventsRegistered=!1))}};function ln$1(e,a,t){let n=Math.max(Math.abs(e-t.left),Math.abs(e-t.right)),o=Math.max(Math.abs(a-t.top),Math.abs(a-t.bottom));return Math.sqrt(n*n+o*o)}var Dt$1=new w$1(`mat-ripple-global-options`);var zo=(()=>{class e{_elementRef=m$1(Sn);_animationsDisabled=j$2();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(t){t&&this.fadeOutAllNonPersistent(),this._disabled=t,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(t){this._trigger=t,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let t=m$1(ae$3),n=m$1(b$1),o=m$1(Dt$1,{optional:!0}),i=m$1(pe$2);this._globalOptions=o||{},this._rippleRenderer=new Q(this,t,this._elementRef,n,i)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:l$1(l$1(l$1({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(t,n=0,o){return typeof t==`number`?this._rippleRenderer.fadeInRipple(t,n,l$1(l$1({},this.rippleConfig),o)):this._rippleRenderer.fadeInRipple(0,0,l$1(l$1({},this.rippleConfig),t))}static ɵfac=function(n){return new(n||e)};static ɵdir=yr({type:e,selectors:[[``,`mat-ripple`,``],[``,`matRipple`,``]],hostAttrs:[1,`mat-ripple`],hostVars:2,hostBindings:function(n,o){n&2&&jg(`mat-ripple-unbounded`,o.unbounded)},inputs:{color:[0,`matRippleColor`,`color`],unbounded:[0,`matRippleUnbounded`,`unbounded`],centered:[0,`matRippleCentered`,`centered`],radius:[0,`matRippleRadius`,`radius`],animation:[0,`matRippleAnimation`,`animation`],disabled:[0,`matRippleDisabled`,`disabled`],trigger:[0,`matRippleTrigger`,`trigger`]},exportAs:[`matRipple`]})}return e})();var un$1={capture:!0};var bn$1=[`focus`,`mousedown`,`mouseenter`,`touchstart`];var Ft$1=`mat-ripple-loader-uninitialized`;var Ot$1=`mat-ripple-loader-class-name`;var Oe$1=`mat-ripple-loader-centered`;var pt$1=`mat-ripple-loader-disabled`;var Re=(()=>{class e{_document=m$1(q$2);_animationsDisabled=j$2();_globalRippleOptions=m$1(Dt$1,{optional:!0});_platform=m$1(b$1);_ngZone=m$1(ae$3);_injector=m$1(pe$2);_eventCleanups;_hosts=new Map;constructor(){let t=m$1(Cn$1).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>bn$1.map(n=>t.listen(this._document,n,this._onInteraction,un$1)))}ngOnDestroy(){let t=this._hosts.keys();for(let n of t)this.destroyRipple(n);this._eventCleanups.forEach(n=>n())}configureRipple(t,n){t.setAttribute(Ft$1,this._globalRippleOptions?.namespace??``),(n.className||!t.hasAttribute(Ot$1))&&t.setAttribute(Ot$1,n.className||``),n.centered&&t.setAttribute(Oe$1,``),n.disabled&&t.setAttribute(pt$1,``)}setDisabled(t,n){let o=this._hosts.get(t);o?(o.target.rippleDisabled=n,!n&&!o.hasSetUpEvents&&(o.hasSetUpEvents=!0,o.renderer.setupTriggerEvents(t))):n?t.setAttribute(pt$1,``):t.removeAttribute(pt$1)}_onInteraction=t=>{let n=y(t);if(n instanceof HTMLElement){let o=n.closest(`[${Ft$1}="${this._globalRippleOptions?.namespace??``}"]`);o&&this._createRipple(o)}};_createRipple(t){if(!this._document||this._hosts.has(t))return;t.querySelector(`.mat-ripple`)?.remove();let n=this._document.createElement(`span`);n.classList.add(`mat-ripple`,t.getAttribute(Ot$1)),t.append(n);let o=this._globalRippleOptions,i=this._animationsDisabled?0:o?.animation?.enterDuration??Y$1.enterDuration,s=this._animationsDisabled?0:o?.animation?.exitDuration??Y$1.exitDuration,c={rippleDisabled:this._animationsDisabled||o?.disabled||t.hasAttribute(pt$1),rippleConfig:{centered:t.hasAttribute(Oe$1),terminateOnPointerUp:o?.terminateOnPointerUp,animation:{enterDuration:i,exitDuration:s}}},w=new Q(c,this._ngZone,n,this._platform,this._injector),k=!c.rippleDisabled;k&&w.setupTriggerEvents(t),this._hosts.set(t,{target:c,renderer:w,hasSetUpEvents:k}),t.removeAttribute(Ft$1)}destroyRipple(t){let n=this._hosts.get(t);n&&(n.renderer._removeTriggerEvents(),this._hosts.delete(t))}static ɵfac=function(n){return new(n||e)};static ɵprov=ze$3({token:e,factory:e.ɵfac})}return e})();var Pe$1=(()=>{class e{static ɵfac=function(n){return new(n||e)};static ɵcmp=bw({type:e,selectors:[[`structural-styles`]],decls:0,vars:0,template:function(n,o){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--%NS%mat-focus-indicator-display, none);
  border-width: var(--%NS%mat-focus-indicator-border-width, 3px);
  border-style: var(--%NS%mat-focus-indicator-border-style, solid);
  border-color: var(--%NS%mat-focus-indicator-border-color, transparent);
  border-radius: var(--%NS%mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --%NS%mat-focus-indicator-display: block;
    --%NS%mat-focus-indicator-fallback-border-style: none;
  }
}
`],encapsulation:2})}return e})();var pn$1=new w$1(`MAT_BUTTON_CONFIG`);function Le$3(e){return e==null?void 0:Kj(e)}var Rt$1=(()=>{class e{_elementRef=m$1(Sn);_ngZone=m$1(ae$3);_animationsDisabled=j$2();_config=m$1(pn$1,{optional:!0});_focusMonitor=m$1(dt$1);_cleanupClick;_renderer=m$1(co$1);_rippleLoader=m$1(Re);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=t,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(t){this.tabIndex=t}showProgress=Wj(!1,{transform:Qj});constructor(){m$1(lt$2).load(Pe$1);let t=this._elementRef.nativeElement;this._isAnchor=t.tagName===`A`,this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(t,{className:`mat-mdc-button-ripple`})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(t=`program`,n){t?this._focusMonitor.focusVia(this._elementRef.nativeElement,t,n):this._elementRef.nativeElement.focus(n)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,`click`,t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}))}static ɵfac=function(n){return new(n||e)};static ɵdir=yr({type:e,hostAttrs:[1,`mat-mdc-button-base`],hostVars:15,hostBindings:function(n,o){n&2&&(Eg(`disabled`,o._getDisabledAttribute())(`aria-disabled`,o._getAriaDisabled())(`tabindex`,o._getTabIndex()),bC(o.color?`mat-`+o.color:``),jg(`mat-mdc-button-progress-indicator-shown`,o.showProgress())(`mat-mdc-button-disabled`,o.disabled)(`mat-mdc-button-disabled-interactive`,o.disabledInteractive)(`mat-unthemed`,!o.color)(`_mat-animation-noopable`,o._animationsDisabled))},inputs:{color:`color`,disableRipple:[2,`disableRipple`,`disableRipple`,Qj],disabled:[2,`disabled`,`disabled`,Qj],ariaDisabled:[2,`aria-disabled`,`ariaDisabled`,Qj],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,Qj],tabIndex:[2,`tabIndex`,`tabIndex`,Le$3],_tabindex:[2,`tabindex`,`_tabindex`,Le$3],showProgress:[1,`showProgress`]}})}return e})();var fn$1=(()=>{class e extends Rt$1{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static ɵfac=function(n){return new(n||e)};static ɵcmp=(function(){let t=[`*`,[[``,`progressIndicator`,``]]],n=[`*`,`[progressIndicator]`];function o(i,s){i&1&&(dl(0,`div`,1),cC(1,1),fl())}return bw({type:e,selectors:[[`button`,`mat-icon-button`,``],[`a`,`mat-icon-button`,``],[`button`,`matIconButton`,``],[`a`,`matIconButton`,``]],hostAttrs:[1,`mdc-icon-button`,`mat-mdc-icon-button`],exportAs:[`matButton`,`matAnchor`],features:[pg],ngContentSelectors:n,decls:5,vars:1,consts:[[1,`mat-mdc-button-persistent-ripple`,`mdc-icon-button__ripple`],[1,`mat-mdc-button-progress-indicator-container`],[1,`mat-focus-indicator`],[1,`mat-mdc-button-touch-target`]],template:function(s,c){s&1&&(aC(t),Cg(0,`span`,0),cC(1),Uw(2,o,2,0,`div`,1),Cg(3,`span`,2)(4,`span`,3)),s&2&&(ZE(2),zw(c.showProgress()?2:-1))},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--%NS%mat-icon-button-state-layer-size, 40px);
  height: var(--%NS%mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--%NS%mat-icon-button-state-layer-size, 40px) - var(--%NS%mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--%NS%mat-icon-button-icon-size, 24px);
  color: var(--%NS%mat-icon-button-icon-color, var(--%NS%mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--%NS%mat-icon-button-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface-variant) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-icon-button-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-icon-button-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-icon-button-touch-target-size, 48px);
  display: var(--%NS%mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--%NS%mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--%NS%mat-icon-button-icon-size, 24px);
  height: var(--%NS%mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {
  width: inherit;
  height: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {
  height: 100%;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})})()}return e})();var Be$1=(()=>{class e{static ɵfac=function(n){return new(n||e)};static ɵmod=Eo({type:e});static ɵinj=qn({imports:[at$1]})}return e})();var ze$2=new Map([[`text`,[`mat-mdc-button`]],[`filled`,[`mdc-button--unelevated`,`mat-mdc-unelevated-button`]],[`elevated`,[`mdc-button--raised`,`mat-mdc-raised-button`]],[`outlined`,[`mdc-button--outlined`,`mat-mdc-outlined-button`]],[`tonal`,[`mat-tonal-button`]]]);var ui=(()=>{class e extends Rt$1{get appearance(){return this._appearance}set appearance(t){this.setAppearance(t||this._config?.defaultAppearance||`text`)}_appearance=null;constructor(){super();let t=hn$1(this._elementRef.nativeElement);t&&this.setAppearance(t)}setAppearance(t){if(t===this._appearance)return;let n=this._elementRef.nativeElement.classList,o=this._appearance?ze$2.get(this._appearance):null,i=ze$2.get(t);o&&n.remove(...o),n.add(...i),this._appearance=t}static ɵfac=function(n){return new(n||e)};static ɵcmp=(function(){let t=[[[``,8,`material-icons`,3,`iconPositionEnd`,``],[`mat-icon`,3,`iconPositionEnd`,``],[``,`matButtonIcon`,``,3,`iconPositionEnd`,``],[``,8,`material-symbols-outlined`,3,`iconPositionEnd`,``],[``,8,`material-symbols-rounded`,3,`iconPositionEnd`,``],[``,8,`material-symbols-sharp`,3,`iconPositionEnd`,``]],`*`,[[``,`iconPositionEnd`,``,8,`material-icons`],[`mat-icon`,`iconPositionEnd`,``],[``,`matButtonIcon`,``,`iconPositionEnd`,``],[``,`iconPositionEnd`,``,8,`material-symbols-outlined`],[``,`iconPositionEnd`,``,8,`material-symbols-rounded`],[``,`iconPositionEnd`,``,8,`material-symbols-sharp`]],[[``,`progressIndicator`,``]]],n=[`.material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])`,`*`,`.material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]`,`[progressIndicator]`];function o(i,s){i&1&&(dl(0,`div`,2),cC(1,3),fl())}return bw({type:e,selectors:[[`button`,`matButton`,``],[`a`,`matButton`,``],[`button`,`mat-button`,``],[`button`,`mat-raised-button`,``],[`button`,`mat-flat-button`,``],[`button`,`mat-stroked-button`,``],[`a`,`mat-button`,``],[`a`,`mat-raised-button`,``],[`a`,`mat-flat-button`,``],[`a`,`mat-stroked-button`,``]],hostAttrs:[1,`mdc-button`],inputs:{appearance:[0,`matButton`,`appearance`]},exportAs:[`matButton`,`matAnchor`],features:[pg],ngContentSelectors:n,decls:8,vars:5,consts:[[1,`mat-mdc-button-persistent-ripple`],[1,`mdc-button__label`],[1,`mat-mdc-button-progress-indicator-container`],[1,`mat-focus-indicator`],[1,`mat-mdc-button-touch-target`]],template:function(s,c){s&1&&(aC(t),Cg(0,`span`,0),cC(1),dl(2,`span`,1),cC(3,1),fl(),cC(4,2),Uw(5,o,2,0,`div`,2),Cg(6,`span`,3)(7,`span`,4)),s&2&&(jg(`mdc-button__ripple`,!c._isFab)(`mdc-fab__ripple`,c._isFab),ZE(5),zw(c.showProgress()?5:-1))},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--%NS%mat-button-text-horizontal-padding, 12px);
  height: var(--%NS%mat-button-text-container-height, 40px);
  font-family: var(--%NS%mat-button-text-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-text-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-text-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-text-label-text-transform);
  font-weight: var(--%NS%mat-button-text-label-text-weight, var(--%NS%mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-text-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--%NS%mat-button-text-label-text-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, .material-symbols-outlined, .material-symbols-rounded,
.material-symbols-sharp, mat-icon, [matButtonIcon]) {
  padding: 0 var(--%NS%mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-offset, -4px);
  margin-left: var(--%NS%mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-offset, -4px);
  margin-left: var(--%NS%mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-text-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-text-state-layer-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-text-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-text-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-text-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-text-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-text-touch-target-size, 48px);
  display: var(--%NS%mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--%NS%mat-button-filled-container-height, 40px);
  font-family: var(--%NS%mat-button-filled-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-filled-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-filled-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-filled-label-text-transform);
  font-weight: var(--%NS%mat-button-filled-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  padding: 0 var(--%NS%mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-filled-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-filled-state-layer-color, var(--%NS%mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-filled-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-filled-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-filled-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-filled-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-filled-touch-target-size, 48px);
  display: var(--%NS%mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--%NS%mat-button-filled-label-text-color, var(--%NS%mat-sys-on-primary));
  background-color: var(--%NS%mat-button-filled-container-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-filled-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {
  --%NS%mat-progress-spinner-active-indicator-color: var(--%NS%mat-button-filled-progress-active-indicator-color, var(--%NS%mat-sys-on-primary));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--%NS%mat-button-protected-container-elevation-shadow, var(--%NS%mat-sys-level1));
  height: var(--%NS%mat-button-protected-container-height, 40px);
  font-family: var(--%NS%mat-button-protected-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-protected-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-protected-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-protected-label-text-transform);
  font-weight: var(--%NS%mat-button-protected-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  padding: 0 var(--%NS%mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-protected-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-protected-state-layer-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-protected-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-protected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-protected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-protected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-protected-touch-target-size, 48px);
  display: var(--%NS%mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--%NS%mat-button-protected-label-text-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-button-protected-container-color, var(--%NS%mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-protected-container-shape, var(--%NS%mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--%NS%mat-button-protected-hover-container-elevation-shadow, var(--%NS%mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--%NS%mat-button-protected-focus-container-elevation-shadow, var(--%NS%mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--%NS%mat-button-protected-pressed-container-elevation-shadow, var(--%NS%mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-protected-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--%NS%mat-button-protected-disabled-container-elevation-shadow, var(--%NS%mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--%NS%mat-button-outlined-container-height, 40px);
  font-family: var(--%NS%mat-button-outlined-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-outlined-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-outlined-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-outlined-label-text-transform);
  font-weight: var(--%NS%mat-button-outlined-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  border-radius: var(--%NS%mat-button-outlined-container-shape, var(--%NS%mat-sys-corner-full));
  border-width: var(--%NS%mat-button-outlined-outline-width, 1px);
  padding: 0 var(--%NS%mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-outlined-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-outlined-state-layer-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-outlined-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-outlined-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-outlined-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-outlined-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-outlined-touch-target-size, 48px);
  display: var(--%NS%mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--%NS%mat-button-outlined-label-text-color, var(--%NS%mat-sys-primary));
  border-color: var(--%NS%mat-button-outlined-outline-color, var(--%NS%mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  border-color: var(--%NS%mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--%NS%mat-button-tonal-container-height, 40px);
  font-family: var(--%NS%mat-button-tonal-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-tonal-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-tonal-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-tonal-label-text-transform);
  font-weight: var(--%NS%mat-button-tonal-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  padding: 0 var(--%NS%mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--%NS%mat-button-tonal-label-text-color, var(--%NS%mat-sys-on-secondary-container));
  background-color: var(--%NS%mat-button-tonal-container-color, var(--%NS%mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-tonal-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-tonal-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-secondary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-tonal-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-tonal-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-tonal-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-tonal-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-tonal-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-tonal-touch-target-size, 48px);
  display: var(--%NS%mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 3px) * -1);
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon,
.mat-mdc-button-progress-indicator-shown [matButtonIcon],
.mat-mdc-button-progress-indicator-shown .mdc-button__label {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})})()}return e})();function hn$1(e){return e.hasAttribute(`mat-raised-button`)?`elevated`:e.hasAttribute(`mat-stroked-button`)?`outlined`:e.hasAttribute(`mat-flat-button`)?`filled`:e.hasAttribute(`mat-button`)?`text`:null}var bi=(()=>{class e{static ɵfac=function(n){return new(n||e)};static ɵmod=Eo({type:e});static ɵinj=qn({imports:[Be$1,at$1]})}return e})();var u=(()=>{class e{_animationsDisabled=j$2();state=`unchecked`;disabled=!1;appearance=`full`;static ɵfac=function(a){return new(a||e)};static ɵcmp=bw({type:e,selectors:[[`mat-pseudo-checkbox`]],hostAttrs:[1,`mat-pseudo-checkbox`],hostVars:12,hostBindings:function(a,o){a&2&&jg(`mat-pseudo-checkbox-indeterminate`,o.state===`indeterminate`)(`mat-pseudo-checkbox-checked`,o.state===`checked`)(`mat-pseudo-checkbox-disabled`,o.disabled)(`mat-pseudo-checkbox-minimal`,o.appearance===`minimal`)(`mat-pseudo-checkbox-full`,o.appearance===`full`)(`_mat-animation-noopable`,o._animationsDisabled)},inputs:{state:`state`,disabled:`disabled`,appearance:`appearance`},decls:0,vars:0,template:function(a,o){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--%NS%mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--%NS%mat-pseudo-checkbox-full-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--%NS%mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--%NS%mat-pseudo-checkbox-full-selected-icon-color, var(--%NS%mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-full-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2})}return e})();var x$1=(()=>{class e{static ɵfac=function(a){return new(a||e)};static ɵmod=Eo({type:e});static ɵinj=qn({imports:[at$1]})}return e})();var r=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new ee$2;bulk={select:e=>this._select(e),deselect:e=>this._deselect(e),setSelection:e=>this._setSelection(e)};constructor(e=!1,t,s=!0,h){this._multiple=e,this._emitChanges=s,this.compareWith=h,t&&t.length&&(e?t.forEach(i=>this._markSelected(i)):this._markSelected(t[0]),this._selectedToEmit.length=0)}select(...e){return this._select(e)}deselect(...e){return this._deselect(e)}setSelection(...e){return this._setSelection(e)}toggle(e){return this.isSelected(e)?this.deselect(e):this.select(e)}clear(e=!0){this._unmarkAll();let t=this._hasQueuedChanges();return e&&this._emitChangeEvent(),t}isSelected(e){return this._selection.has(this._getConcreteValue(e))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(e){this._multiple&&this.selected&&this._selected.sort(e)}isMultipleSelection(){return this._multiple}_select(e){this._verifyValueAssignment(e),e.forEach(s=>this._markSelected(s));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}_deselect(e){this._verifyValueAssignment(e),e.forEach(s=>this._unmarkSelected(s));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}_setSelection(e){this._verifyValueAssignment(e);let t=this.selected,s=new Set(e.map(i=>this._getConcreteValue(i)));e.forEach(i=>this._markSelected(i)),t.filter(i=>!s.has(this._getConcreteValue(i,s))).forEach(i=>this._unmarkSelected(i));let h=this._hasQueuedChanges();return this._emitChangeEvent(),h}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(e){e=this._getConcreteValue(e),this.isSelected(e)||(this._multiple||this._unmarkAll(),this.isSelected(e)||this._selection.add(e),this._emitChanges&&this._selectedToEmit.push(e))}_unmarkSelected(e){e=this._getConcreteValue(e),this.isSelected(e)&&(this._selection.delete(e),this._emitChanges&&this._deselectedToEmit.push(e))}_unmarkAll(){this.isEmpty()||this._selection.forEach(e=>this._unmarkSelected(e))}_verifyValueAssignment(e){e.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(e,t){if(this.compareWith){t=t??this._selection;for(let s of t)if(this.compareWith(e,s))return s;return e}else return e}};var O$1=20;var E=(()=>{class n{_ngZone=m$1(ae$3);_platform=m$1(b$1);_renderer=m$1(Cn$1).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new ee$2;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=O$1){return this._platform.isBrowser?new x$2(t=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen(`document`,`scroll`,()=>this._scrolled.next())));let i=e>0?this._scrolled.pipe(Uy(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{i.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):ga()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){let i=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe(Xt$2(r=>!r||i.indexOf(r)>-1))}getAncestorScrollContainers(e){let t=[];return this.scrollContainers.forEach((i,r)=>{this._targetContainsElement(r,e)&&t.push(r)}),t}_targetContainsElement(e,t){let i=S$2(t),r=e.getElementRef().nativeElement;do if(i==r)return!0;while(i=i.parentElement);return!1}static ɵfac=function(t){return new(t||n)};static ɵprov=ze$3({token:n,factory:n.ɵfac})}return n})();var Pe=(()=>{class n{elementRef=m$1(Sn);scrollDispatcher=m$1(E);ngZone=m$1(ae$3);dir=m$1(gt$1,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new ee$2;_renderer=m$1(co$1);_cleanupScroll;_elementScrolled=new ee$2;ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,`scroll`,e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let t=this.elementRef.nativeElement,i=this.dir&&this.dir.value==`rtl`;e.left??=i?e.end:e.start,e.right??=i?e.start:e.end,e.bottom!=null&&(e.top=t.scrollHeight-t.clientHeight-e.bottom),i&&co()!=$$1.NORMAL?(e.left!=null&&(e.right=t.scrollWidth-t.clientWidth-e.left),co()==$$1.INVERTED?e.left=e.right:co()==$$1.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=t.scrollWidth-t.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let t=this.elementRef.nativeElement;so()?t.scrollTo(e):(e.top!=null&&(t.scrollTop=e.top),e.left!=null&&(t.scrollLeft=e.left))}measureScrollOffset(e){let t=`left`,i=`right`,r=this.elementRef.nativeElement;if(e==`top`)return r.scrollTop;if(e==`bottom`)return r.scrollHeight-r.clientHeight-r.scrollTop;let l=this.dir&&this.dir.value==`rtl`;return e==`start`?e=l?i:t:e==`end`&&(e=l?t:i),l&&co()==$$1.INVERTED?e==t?r.scrollWidth-r.clientWidth-r.scrollLeft:r.scrollLeft:l&&co()==$$1.NEGATED?e==t?r.scrollLeft+r.scrollWidth-r.clientWidth:-r.scrollLeft:e==t?r.scrollLeft:r.scrollWidth-r.clientWidth-r.scrollLeft}static ɵfac=function(t){return new(t||n)};static ɵdir=yr({type:n,selectors:[[``,`cdk-scrollable`,``],[``,`cdkScrollable`,``]]})}return n})();var F$1=20;var Ae$2=(()=>{class n{_platform=m$1(b$1);_listeners;_viewportSize=null;_change=new ee$2;_document=m$1(q$2);constructor(){let e=m$1(ae$3),t=m$1(Cn$1).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let i=r=>this._change.next(r);this._listeners=[t.listen(`window`,`resize`,i),t.listen(`window`,`orientationchange`,i)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:t,height:i}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+i,right:e.left+t,height:i,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,t=this._getWindow(),i=e.documentElement,r=i.getBoundingClientRect();return{top:-r.top||e.body?.scrollTop||t.scrollY||i.scrollTop||0,left:-r.left||e.body?.scrollLeft||t.scrollX||i.scrollLeft||0}}change(e=F$1){return e>0?this._change.pipe(Uy(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static ɵfac=function(t){return new(t||n)};static ɵprov=ze$3({token:n,factory:n.ɵfac})}return n})();var D$1=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Eo({type:n});static ɵinj=qn({})}return n})();var We$1=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Eo({type:n});static ɵinj=qn({imports:[at$1,D$1,at$1,D$1]})}return n})();var Xe=(()=>{class n{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,r){this._renderer=e,this._elementRef=r}setProperty(e,r){this._renderer.setProperty(this._elementRef.nativeElement,e,r)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty(`disabled`,e)}static ɵfac=function(r){return new(r||n)(te$2(co$1),te$2(Sn))};static ɵdir=yr({type:n})}return n})();var j$1=(()=>{class n extends Xe{static ɵfac=(()=>{let e;return function(i){return(e||(e=Pp(n)))(i||n)}})();static ɵdir=yr({type:n,features:[pg]})}return n})();var M=new w$1(``);var Nt={provide:M,useExisting:Ii(()=>It$1),multi:!0};var It$1=(()=>{class n extends j$1{writeValue(e){this.setProperty(`checked`,e)}static ɵfac=(()=>{let e;return function(i){return(e||(e=Pp(n)))(i||n)}})();static ɵdir=yr({type:n,selectors:[[`input`,`type`,`checkbox`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`type`,`checkbox`,`formControl`,``,3,`ngNoCva`,``],[`input`,`type`,`checkbox`,`ngModel`,``,3,`ngNoCva`,``]],hostBindings:function(r,i){r&1&&Ng(`change`,function(a){return i.onChange(a.target.checked)})(`blur`,function(){return i.onTouched()})},standalone:!1,features:[qC([Nt]),pg]})}return n})();var St={provide:M,useExisting:Ii(()=>Ze),multi:!0};function Ft(){let n=Et$2()?Et$2().getUserAgent():``;return/android (\d+)/.test(n.toLowerCase())}var Ot=new w$1(``);var Ze=(()=>{class n extends Xe{_compositionMode;_composing=!1;constructor(e,r,i){super(e,r),this._compositionMode=i,this._compositionMode??=!Ft()}writeValue(e){let r=e??``;this.setProperty(`value`,r)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static ɵfac=function(r){return new(r||n)(te$2(co$1),te$2(Sn),te$2(Ot,8))};static ɵdir=yr({type:n,selectors:[[`input`,`formControlName`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`formControl`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControl`,``,3,`ngNoCva`,``],[`input`,`ngModel`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`ngModel`,``,3,`ngNoCva`,``],[``,`ngDefaultControl`,``]],hostBindings:function(r,i){r&1&&Ng(`input`,function(a){return i._handleInput(a.target.value)})(`blur`,function(){return i.onTouched()})(`compositionstart`,function(){return i._compositionStart()})(`compositionend`,function(a){return i._compositionEnd(a.target.value)})},standalone:!1,features:[qC([St]),pg]})}return n})();function Ae$1(n){return n==null||be$1(n)===0}function be$1(n){return n==null?null:Array.isArray(n)||typeof n==`string`?n.length:n instanceof Set?n.size:null}var C=new w$1(``);var G=new w$1(``);var wt=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;var ye$2=class{static min(t){return Ke(t)}static max(t){return Rt(t)}static required(t){return Qe(t)}static requiredTrue(t){return xt(t)}static email(t){return Tt$1(t)}static minLength(t){return Pt(t)}static maxLength(t){return Je(t)}static pattern(t){return jt(t)}static nullValidator(t){return te$1()}static compose(t){return ot(t)}static composeAsync(t){return st(t)}};function Ke(n){return t=>{if(t.value==null||n==null)return null;let e=parseFloat(t.value);return!isNaN(e)&&e<n?{min:{min:n,actual:t.value}}:null}}function Rt(n){return t=>{if(t.value==null||n==null)return null;let e=parseFloat(t.value);return!isNaN(e)&&e>n?{max:{max:n,actual:t.value}}:null}}function Qe(n){return Ae$1(n.value)?{required:!0}:null}function xt(n){return n.value===!0?null:{required:!0}}function Tt$1(n){return Ae$1(n.value)||wt.test(n.value)?null:{email:!0}}function Pt(n){return t=>{let e=t.value?.length??be$1(t.value);return e===null||e===0?null:e<n?{minlength:{requiredLength:n,actualLength:e}}:null}}function Je(n){return t=>{let e=t.value?.length??be$1(t.value);return e!==null&&e>n?{maxlength:{requiredLength:n,actualLength:e}}:null}}function jt(n){if(!n)return te$1;let t,e;return typeof n==`string`?(e=``,n.charAt(0)!==`^`&&(e+=`^`),e+=n,n.charAt(n.length-1)!==`$`&&(e+=`$`),t=new RegExp(e)):(e=n.toString(),t=n),r=>{if(Ae$1(r.value))return null;let i=r.value;return t.test(i)?null:{pattern:{requiredPattern:e,actualValue:i}}}}function te$1(n){return null}function et(n){return n!=null}function tt$1(n){return Os(n)?Ze$2(n):n}function nt$1(n){let t={};return n.forEach(e=>{t=e!=null?l$1(l$1({},t),e):t}),Object.keys(t).length===0?null:t}function rt(n,t){return t.map(e=>e(n))}function Gt(n){return!n.validate}function it(n){return n.map(t=>Gt(t)?t:e=>t.validate(e))}function ot(n){if(!n)return null;let t=n.filter(et);return t.length==0?null:function(e){return nt$1(rt(e,t))}}function Me$1(n){return n!=null?ot(it(n)):null}function st(n){if(!n)return null;let t=n.filter(et);return t.length==0?null:function(e){let r=rt(e,t).map(tt$1);return Fy(r).pipe(le$4(nt$1))}}function Ee$1(n){return n!=null?st(it(n)):null}function Le$2(n,t){return n===null?[t]:Array.isArray(n)?[...n,t]:[n,t]}function at(n){return n._rawValidators}function lt(n){return n._rawAsyncValidators}function ve$1(n){return n?Array.isArray(n)?n:[n]:[]}function ne$1(n,t){return Array.isArray(n)?n.includes(t):n===t}function Be(n,t){let e=ve$1(t);return ve$1(n).forEach(i=>{ne$1(e,i)||e.push(i)}),e}function Ue(n,t){return ve$1(t).filter(e=>!ne$1(n,e))}var re$1=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=Me$1(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=Ee$1(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t=void 0){this.control?.reset(t)}hasError(t,e){return this.control?this.control.hasError(t,e):!1}getError(t,e){return this.control?this.control.getError(t,e):null}};var h=class extends re$1{name;get formDirective(){return null}get path(){return null}};var U=`VALID`;var ee$1=`INVALID`;var R$1=`PENDING`;var H$1=`DISABLED`;var b=class{};var ie$2=class extends b{value;source;constructor(t,e){super(),this.value=t,this.source=e}};var q$1=class extends b{pristine;source;constructor(t,e){super(),this.pristine=t,this.source=e}};var W=class extends b{touched;source;constructor(t,e){super(),this.touched=t,this.source=e}};var x=class extends b{status;source;constructor(t,e){super(),this.status=t,this.source=e}};var oe$1=class extends b{source;constructor(t){super(),this.source=t}};var S$1=class extends b{source;constructor(t){super(),this.source=t}};function Ne$1(n){return(ue$1(n)?n.validators:n)||null}function kt(n){return Array.isArray(n)?Me$1(n):n||null}function Ie$1(n,t){return(ue$1(t)?t.asyncValidators:n)||null}function Lt$1(n){return Array.isArray(n)?Ee$1(n):n||null}function ue$1(n){return n!=null&&!Array.isArray(n)&&typeof n==`object`}function ut(n,t,e){let r=n.controls;if(!(t?Object.keys(r):r).length)throw new g(1e3,``);if(!ct(r,e))throw new g(1001,``)}function dt(n,t,e){n._forEachChild((r,i)=>{if(e[i]===void 0)throw new g(-1002,``)})}var T=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_hasRequired=zi(!1);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(t,e){this._assignValidators(t),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t,this._updateHasRequiredValidator()}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get status(){return Dr(this.statusReactive)}set status(t){Dr(()=>this.statusReactive.set(t))}_status=ob(()=>this.statusReactive());statusReactive=zi(void 0);get valid(){return this.status===U}get invalid(){return this.status===ee$1}get pending(){return this.status===R$1}get disabled(){return this.status===H$1}get enabled(){return this.status!==H$1}errors;get pristine(){return Dr(this.pristineReactive)}set pristine(t){Dr(()=>this.pristineReactive.set(t))}_pristine=ob(()=>this.pristineReactive());pristineReactive=zi(!0);get dirty(){return!this.pristine}get touched(){return Dr(this.touchedReactive)}set touched(t){Dr(()=>this.touchedReactive.set(t))}_touched=ob(()=>this.touchedReactive());touchedReactive=zi(!1);get untouched(){return!this.touched}_events=new ee$2;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:`change`}setValidators(t){this._assignValidators(t)}setAsyncValidators(t){this._assignAsyncValidators(t)}addValidators(t){this.setValidators(Be(t,this._rawValidators))}addAsyncValidators(t){this.setAsyncValidators(Be(t,this._rawAsyncValidators))}removeValidators(t){this.setValidators(Ue(t,this._rawValidators))}removeAsyncValidators(t){this.setAsyncValidators(Ue(t,this._rawAsyncValidators))}hasValidator(t){return ne$1(this._rawValidators,t)}hasAsyncValidator(t){return ne$1(this._rawAsyncValidators,t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){let e=this.touched===!1;this.touched=!0;let r=t.sourceControl??this;t.onlySelf||this._parent?.markAsTouched(m$2(l$1({},t),{sourceControl:r})),e&&t.emitEvent!==!1&&this._events.next(new W(!0,r))}markAllAsDirty(t={}){this.markAsDirty({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(t))}markAllAsTouched(t={}){this.markAsTouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(t))}markAsUntouched(t={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let r=t.sourceControl??this;this._forEachChild(i=>{i.markAsUntouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:r})}),t.onlySelf||this._parent?._updateTouched(t,r),e&&t.emitEvent!==!1&&this._events.next(new W(!1,r))}markAsDirty(t={}){let e=this.pristine===!0;this.pristine=!1;let r=t.sourceControl??this;t.onlySelf||this._parent?.markAsDirty(m$2(l$1({},t),{sourceControl:r})),e&&t.emitEvent!==!1&&this._events.next(new q$1(!1,r))}markAsPristine(t={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let r=t.sourceControl??this;this._forEachChild(i=>{i.markAsPristine({onlySelf:!0,emitEvent:t.emitEvent})}),t.onlySelf||this._parent?._updatePristine(t,r),e&&t.emitEvent!==!1&&this._events.next(new q$1(!0,r))}markAsPending(t={}){this.status=R$1;let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new x(this.status,e)),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.markAsPending(m$2(l$1({},t),{sourceControl:e}))}disable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=H$1,this.errors=null,this._forEachChild(i=>{i.disable(m$2(l$1({},t),{onlySelf:!0}))}),this._updateValue();let r=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new ie$2(this.value,r)),this._events.next(new x(this.status,r)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(m$2(l$1({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!0))}enable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=U,this._forEachChild(r=>{r.enable(m$2(l$1({},t),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors(m$2(l$1({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!1))}_updateAncestors(t,e){t.onlySelf||(this._parent?.updateValueAndValidity(t),t.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(t){this._parent=t}getRawValue(){return this.value}updateValueAndValidity(t={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let r=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===U||this.status===R$1)&&this._runAsyncValidator(r,t.emitEvent)}let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new ie$2(this.value,e)),this._events.next(new x(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.updateValueAndValidity(m$2(l$1({},t),{sourceControl:e}))}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?H$1:U}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t,e){if(this.asyncValidator){this.status=R$1,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:t!==!1};let r=tt$1(this.asyncValidator(this));this._asyncValidationSubscription=r.subscribe(i=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(i,{emitEvent:e,shouldHaveEmitted:t})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let t=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,t}return!1}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(t){let e=t;return e==null||(Array.isArray(e)||(e=e.split(`.`)),e.length===0)?null:e.reduce((r,i)=>r&&r._find(i),this)}getError(t,e){let r=e?this.get(e):this;return r?.errors?r.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t,e,r){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),(t||r)&&this._events.next(new x(this.status,e)),this._parent&&this._parent._updateControlsErrors(t,e,r)}_initObservables(){this.valueChanges=new ut$2,this.statusChanges=new ut$2}_calculateStatus(){return this._allControlsDisabled()?H$1:this.errors?ee$1:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(R$1)?R$1:this._anyControlsHaveStatus(ee$1)?ee$1:U}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t,e){let r=!this._anyControlsDirty(),i=this.pristine!==r;this.pristine=r,t.onlySelf||this._parent?._updatePristine(t,e),i&&this._events.next(new q$1(this.pristine,e))}_updateTouched(t={},e){this.touched=this._anyControlsTouched(),this._events.next(new W(this.touched,e)),t.onlySelf||this._parent?._updateTouched(t,e)}_onDisabledChange=[];_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){ue$1(t)&&t.updateOn!=null&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=kt(this._rawValidators),this._updateHasRequiredValidator()}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=Lt$1(this._rawAsyncValidators)}_updateHasRequiredValidator(){Dr(()=>this._hasRequired.set(this.hasValidator(ye$2.required)))}};function ct(n,t){return Object.hasOwn(n,t)}function Bt(n){return n.tagName===`INPUT`||n.tagName===`SELECT`||n.tagName===`TEXTAREA`}function Ut(n,t,e,r){switch(e){case`name`:n.setAttribute(t,e,r);break;case`disabled`:case`readonly`:case`required`:r?n.setAttribute(t,e,``):n.removeAttribute(t,e);break;case`max`:case`min`:case`minLength`:case`maxLength`:r!==void 0?n.setAttribute(t,e,r.toString()):n.removeAttribute(t,e)}}var _e=class{kind;context;control;message;constructor({kind:t,context:e,control:r}){this.kind=t,this.context=e,this.control=r}};function Ht(n){return typeof n==`number`?n:parseInt(n,10)}function $t$1(n){return typeof n==`number`?n:parseFloat(n)}var Se$1=(()=>{class n{_validator=te$1;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let r=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(r),this._validator=this._enabled?this.createValidator(r):te$1,this._onChange?.()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return e!=null}static ɵfac=function(r){return new(r||n)};static ɵdir=yr({type:n,features:[bu]})}return n})();var qt$1={provide:C,useExisting:Ii(()=>Wt$1),multi:!0};var Wt$1=(()=>{class n extends Se$1{min;inputName=`min`;normalizeInput=e=>$t$1(e);createValidator=e=>Ke(e);static ɵfac=(()=>{let e;return function(i){return(e||(e=Pp(n)))(i||n)}})();static ɵdir=yr({type:n,selectors:[[`input`,`type`,`number`,`min`,``,`formControlName`,``],[`input`,`type`,`number`,`min`,``,`formControl`,``],[`input`,`type`,`number`,`min`,``,`ngModel`,``]],hostVars:1,hostBindings:function(r,i){r&2&&Eg(`min`,i._enabled?i.min:null)},inputs:{min:`min`},standalone:!1,features:[qC([qt$1]),pg]})}return n})();var zt$1={provide:C,useExisting:Ii(()=>ht$1),multi:!0};var ht$1=(()=>{class n extends Se$1{required;inputName=`required`;normalizeInput=Qj;createValidator=e=>Qe;enabled(e){return e}static ɵfac=(()=>{let e;return function(i){return(e||(e=Pp(n)))(i||n)}})();static ɵdir=yr({type:n,selectors:[[``,`required`,``,`formControlName`,``,3,`type`,`checkbox`],[``,`required`,``,`formControl`,``,3,`type`,`checkbox`],[``,`required`,``,`ngModel`,``,3,`type`,`checkbox`]],hostVars:1,hostBindings:function(r,i){r&2&&Eg(`required`,i._enabled?``:null)},inputs:{required:`required`},standalone:!1,features:[qC([zt$1]),pg]})}return n})();var Yt$1={provide:C,useExisting:Ii(()=>Xt$1),multi:!0};var Xt$1=(()=>{class n extends Se$1{maxlength;inputName=`maxlength`;normalizeInput=e=>Ht(e);createValidator=e=>Je(e);static ɵfac=(()=>{let e;return function(i){return(e||(e=Pp(n)))(i||n)}})();static ɵdir=yr({type:n,selectors:[[``,`maxlength`,``,`formControlName`,``],[``,`maxlength`,``,`formControl`,``],[``,`maxlength`,``,`ngModel`,``]],hostVars:1,hostBindings:function(r,i){r&2&&Eg(`maxlength`,i._enabled?i.maxlength:null)},inputs:{maxlength:`maxlength`},standalone:!1,features:[qC([Yt$1]),pg]})}return n})();var Zt$1=new w$1(``);var k$1=new w$1(``,{factory:()=>Y});var Y=`always`;function de$2(n,t){return[...t.path,n]}function Ce$2(n,t,e=Y){Fe(n,t),t.valueAccessor.writeValue(n.value),(n.disabled||e===`always`)&&t.valueAccessor.setDisabledState?.(n.disabled),Qt(n,t),en(n,t),Jt$1(n,t),Kt$1(n,t)}function He(n,t,e=!0){let r=()=>{};t?.valueAccessor?.registerOnChange(r),t?.valueAccessor?.registerOnTouched(r),ae$2(n,t),n&&(t._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}))}function se(n,t){n.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t)})}function Kt$1(n,t){if(t.valueAccessor.setDisabledState){let e=r=>{t.valueAccessor.setDisabledState(r)};n.registerOnDisabledChange(e),t._registerOnDestroy(()=>{n._unregisterOnDisabledChange(e)})}}function Fe(n,t){let e=at(n);t.validator!==null?n.setValidators(Le$2(e,t.validator)):typeof e==`function`&&n.setValidators([e]);let r=lt(n);t.asyncValidator!==null?n.setAsyncValidators(Le$2(r,t.asyncValidator)):typeof r==`function`&&n.setAsyncValidators([r]);let i=()=>n.updateValueAndValidity();se(t._rawValidators,i),se(t._rawAsyncValidators,i)}function ae$2(n,t){let e=!1;if(n!==null){if(t.validator!==null){let i=at(n);if(Array.isArray(i)&&i.length>0){let o=i.filter(a=>a!==t.validator);o.length!==i.length&&(e=!0,n.setValidators(o))}}if(t.asyncValidator!==null){let i=lt(n);if(Array.isArray(i)&&i.length>0){let o=i.filter(a=>a!==t.asyncValidator);o.length!==i.length&&(e=!0,n.setAsyncValidators(o))}}}let r=()=>{};return se(t._rawValidators,r),se(t._rawAsyncValidators,r),e}function Qt(n,t){t.valueAccessor.registerOnChange(e=>{n._pendingValue=e,n._pendingChange=!0,n._pendingDirty=!0,n.updateOn===`change`&&pt(n,t)})}function Jt$1(n,t){t.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,n.updateOn===`blur`&&n._pendingChange&&pt(n,t),n.updateOn!==`submit`&&n.markAsTouched()})}function pt(n,t){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),t.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function en(n,t){let e=(r,i)=>{t.valueAccessor.writeValue(r),i&&t.viewToModelUpdate(r)};n.registerOnChange(e),t._registerOnDestroy(()=>{n._unregisterOnChange(e)})}function ft(n,t){Fe(n,t)}function tn(n,t){return ae$2(n,t)}function gt(n,t){if(!Object.hasOwn(n,`model`))return!1;let e=n.model;return e.isFirstChange()?!0:!Object.is(t,e.currentValue)}function nn(n){return Object.getPrototypeOf(n.constructor)===j$1}function mt(n,t){n._syncPendingControls(),t.forEach(e=>{let r=e.control;r.updateOn===`submit`&&r._pendingChange&&(e.viewToModelUpdate(r._pendingValue),r._pendingChange=!1)})}function rn(n,t){if(!t)return null;let e,r,i;return t.forEach(o=>{o.constructor===Ze?e=o:nn(o)?r=o:i=o}),i||r||e||null}function on(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}var yt={provide:Zt$1,useFactory:()=>{let n=m$1(_$1,{self:!0});return{setParseErrors:t=>{n.setParseErrorSource(t)},set onReset(t){n.onReset=t}}}};var _$1=class extends re$1{_parent=null;name=null;valueAccessor=null;isCustomControlBased=!1;userOnReset;resetSubscription;set onReset(t){this.userOnReset=t,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof S$1&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription?.add(this.resetSubscription))}isNativeFormElement=!1;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=rn(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(t,e,r){super(),this.injector=t,this.renderer=e,this.rawValueAccessors=r,this.injector?.get(Ce$4)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe()})}setupCustomControl(){this.subscription?.unsubscribe();let t=this.injector?.get(Tb);if(!this.control||!t)return;let e=t.markForCheck.bind(t);this.subscription=new ne$2,this.subscription.add(this.control.valueChanges.subscribe(e)),this.subscription.add(this.control.statusChanges.subscribe(e)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(r=>{r instanceof S$1&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator)}ngControlCreate(t){!t.nativeElement.hasAttribute?.(`ngNoCva`)&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!t.customControl||(this.isCustomControlBased=!0,t.listenToCustomControlModel(i=>{this.control?.markAsDirty(),this.control?.setValue(i,{emitModelToViewChange:!1}),this.viewToModelUpdate(i)}),t.listenToCustomControlOutput(`touch`,()=>{this.control?.markAsTouched()}),this.customControlBindings={},this.isNativeFormElement=Bt(t.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(i=>i instanceof ht$1))}ngControlUpdate(t,e){if(!this.isCustomControlBased)return;let r=this.control,i=this.customControlBindings;Object.is(i.value,r.value)||(i.value=r.value,t.setCustomControlModelInput(r.value)),this.bindControlProperty(t,i,`touched`,r.touched),this.bindControlProperty(t,i,`dirty`,r.dirty),this.bindControlProperty(t,i,`valid`,r.valid),this.bindControlProperty(t,i,`invalid`,r.invalid),this.bindControlProperty(t,i,`pending`,r.pending),this.bindControlProperty(t,i,`disabled`,r.disabled),this.shouldBindRequired&&this.bindControlProperty(t,i,`required`,this.isRequired);let o=r.errors;if(i.errors!==o){i.errors=o;let a=this._convertErrors(o);t.setInputOnDirectives(`errors`,a)}}get isRequired(){return(this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??!1}get shouldBindRequired(){return!0}bindControlProperty(t,e,r,i){if(e[r]===i)return;e[r]=i;let o=t.setInputOnDirectives(r,i);this.isNativeFormElement&&!o&&(r===`disabled`||r===`required`)&&this.renderer&&Ut(this.renderer,t.nativeElement,r,i)}_convertErrors(t){if(t===null)return[];let e=this.control;return Object.entries(t).map(([r,i])=>new _e({context:i,kind:r,control:e}))}setParseErrorSource(t){if(t===void 0)return;let e=null,r=ob(()=>{let i=t();return i.length===0?null:i.reduce((o,a)=>(o[a.kind]=a,o),{})});this.parseErrorsValidator=(()=>e).bind(this),Of(()=>{e=r(),this.control?.updateValueAndValidity({emitEvent:!1})},{injector:this.injector})}removeParseErrorsValidator(t){this.parseErrorsValidator&&(t?.removeValidators(this.parseErrorsValidator),t?.updateValueAndValidity({emitEvent:!1}))}};var le$2=class{_cd;constructor(t){this._cd=t}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Wn=(()=>{class n extends le$2{constructor(e){super(e)}static ɵfac=function(r){return new(r||n)(te$2(_$1,2))};static ɵdir=yr({type:n,selectors:[[``,`formControlName`,``],[``,`ngModel`,``],[``,`formControl`,``]],hostVars:14,hostBindings:function(r,i){r&2&&jg(`ng-untouched`,i.isUntouched)(`ng-touched`,i.isTouched)(`ng-pristine`,i.isPristine)(`ng-dirty`,i.isDirty)(`ng-valid`,i.isValid)(`ng-invalid`,i.isInvalid)(`ng-pending`,i.isPending)},standalone:!1,features:[pg]})}return n})();var zn=(()=>{class n extends le$2{constructor(e){super(e)}static ɵfac=function(r){return new(r||n)(te$2(h,10))};static ɵdir=yr({type:n,selectors:[[``,`formGroupName`,``],[``,`formArrayName`,``],[``,`ngModelGroup`,``],[``,`formGroup`,``],[``,`formArray`,``],[`form`,3,`ngNoForm`,``],[``,`ngForm`,``]],hostVars:16,hostBindings:function(r,i){r&2&&jg(`ng-untouched`,i.isUntouched)(`ng-touched`,i.isTouched)(`ng-pristine`,i.isPristine)(`ng-dirty`,i.isDirty)(`ng-valid`,i.isValid)(`ng-invalid`,i.isInvalid)(`ng-pending`,i.isPending)(`ng-submitted`,i.isSubmitted)},standalone:!1,features:[pg]})}return n})();var P=class extends T{constructor(t,e,r){super(Ne$1(e),Ie$1(r,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(t,e){return this._find(t)||(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,r={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:r.emitEvent}),this._onCollectionChange()}removeControl(t,e={}){let r=this._find(t);r&&r._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(t,e,r={}){let i=this._find(t);i&&i._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:r.emitEvent}),this._onCollectionChange()}contains(t){return this._find(t)?.enabled===!0}setValue(t,e={}){Dr(()=>{dt(this,!0,t),Object.keys(t).forEach(r=>{ut(this,!0,r),this.controls[r].setValue(t[r],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)})}patchValue(t,e={}){t!=null&&(Object.keys(t).forEach(r=>{let i=this._find(r);i&&i.patchValue(t[r],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t={},e={}){this._forEachChild((r,i)=>{r.reset(t?t[i]:null,m$2(l$1({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new S$1(this))}getRawValue(){return this._reduceChildren({},(t,e,r)=>(t[r]=e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(!1,(e,r)=>r._syncPendingControls()?!0:e);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_forEachChild(t){Object.keys(this.controls).forEach(e=>{let r=this.controls[e];r&&t(r,e)})}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(t){for(let[e,r]of Object.entries(this.controls))if(this.contains(e)&&t(r))return!0;return!1}_reduceValue(){return this._reduceChildren({},(e,r,i)=>((r.enabled||this.disabled)&&(e[i]=r.value),e))}_reduceChildren(t,e){let r=t;return this._forEachChild((i,o)=>{r=e(r,i,o)}),r}_allControlsDisabled(){for(let t of Object.keys(this.controls))if(this.controls[t].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(t){return ct(this.controls,t)?this.controls[t]:null}};var Ve=class extends P{};var sn={provide:h,useExisting:Ii(()=>an)};var $=Promise.resolve();var an=(()=>{class n extends h{callSetDisabledState;get submitted(){return Dr(this.submittedReactive)}_submitted=ob(()=>this.submittedReactive());submittedReactive=zi(!1);_directives=new Set;form;ngSubmit=new ut$2;options;constructor(e,r,i){super(),this.callSetDisabledState=i,this.form=new P({},Me$1(e),Ee$1(r))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){$.then(()=>{e.control=this._findContainer(e.path).registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){$.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){$.then(()=>{let r=this._findContainer(e.path),i=new P({});ft(i,e),r.registerControl(e.name,i),i.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){$.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,r){$.then(()=>{this.form.get(e.path).setValue(r)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),mt(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new oe$1(this.control)),e?.target?.method===`dialog`}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static ɵfac=function(r){return new(r||n)(te$2(C,10),te$2(G,10),te$2(k$1,8))};static ɵdir=yr({type:n,selectors:[[`form`,3,`ngNoForm`,``,3,`formGroup`,``,3,`formArray`,``],[`ng-form`],[``,`ngForm`,``]],hostBindings:function(r,i){r&1&&Ng(`submit`,function(a){return i.onSubmit(a)})(`reset`,function(){return i.onReset()})},inputs:{options:[0,`ngFormOptions`,`options`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[qC([sn]),pg]})}return n})();function $e$1(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function qe(n){return typeof n==`object`&&n!==null&&Object.keys(n).length===2&&`value`in n&&`disabled`in n}var z=class extends T{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(t=null,e,r){super(Ne$1(e),Ie$1(r,e)),this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),ue$1(e)&&(e.nonNullable||e.initialValueIsDefault)&&(qe(t)?this.defaultValue=t.value:this.defaultValue=t)}setValue(t,e={}){Dr(()=>{this.value=this._pendingValue=t,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(r=>r(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)})}patchValue(t,e={}){this.setValue(t,e)}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new S$1(this))}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){$e$1(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){$e$1(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return this.updateOn===`submit`&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(t){qe(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}};var ln=n=>n instanceof z;var un=(()=>{class n extends h{_parent;ngOnInit(){this._checkParentType(),this.formDirective.addFormGroup(this)}ngOnDestroy(){this.formDirective?.removeFormGroup(this)}get control(){return this.formDirective.getFormGroup(this)}get path(){return de$2(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_checkParentType(){}static ɵfac=(()=>{let e;return function(i){return(e||(e=Pp(n)))(i||n)}})();static ɵdir=yr({type:n,standalone:!1,features:[pg]})}return n})();var vt=(()=>{class n extends h{callSetDisabledState;get submitted(){return Dr(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=ob(()=>this._submittedReactive());_submittedReactive=zi(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,r,i){super(),this.callSetDisabledState=i,this._setValidators(e),this._setAsyncValidators(r)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),Object.hasOwn(e,`form`)&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(ae$2(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let r=this.form.get(e.path);return e._setupWithForm(r,this.callSetDisabledState),r.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),r}getControl(e){return this.form.get(e.path)}removeControl(e){He(e.control||null,e,!1),on(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,r){this.form.get(e.path).setValue(r)}onReset(){this.resetForm()}resetForm(e=void 0,r={}){this.form.reset(e,r),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,mt(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new oe$1(this.control)),e?.target?.method===`dialog`}_updateDomValue(){this.directives.forEach(e=>{let r=e.control,i=this.form.get(e.path);r!==i&&(He(r||null,e),ln(i)&&e._setupWithForm(i,this.callSetDisabledState))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let r=this.form.get(e.path);ft(r,e),r.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let r=this.form?.get(e.path);r&&tn(r,e)&&r.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){Fe(this.form,this),this._oldForm&&ae$2(this._oldForm,this)}_checkFormPresent(){this.form}static ɵfac=function(r){return new(r||n)(te$2(C,10),te$2(G,10),te$2(k$1,8))};static ɵdir=yr({type:n,features:[pg,bu]})}return n})();var dn={provide:h,useExisting:Ii(()=>cn)};var cn=(()=>{class n extends vt{form=null;ngSubmit=new ut$2;get control(){return this.form}static ɵfac=(()=>{let e;return function(i){return(e||(e=Pp(n)))(i||n)}})();static ɵdir=yr({type:n,selectors:[[``,`formGroup`,``]],hostBindings:function(r,i){r&1&&Ng(`submit`,function(a){return i.onSubmit(a)})(`reset`,function(){return i.onReset()})},inputs:{form:[0,`formGroup`,`form`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[qC([dn]),pg]})}return n})();var hn={provide:_$1,useExisting:Ii(()=>pn)};var We=Promise.resolve();var pn=(()=>{class n extends _$1{_changeDetectorRef;callSetDisabledState;control=new z;static ngAcceptInputType_isDisabled;_registered=!1;_ngModelInjector;viewModel;name=``;isDisabled;model;options;update=new ut$2;constructor(e,r,i,o,a,m,V,L){super(V,L,o),this._changeDetectorRef=a,this.callSetDisabledState=m,this._parent=e,this._setValidators(r),this._setAsyncValidators(i)}ngOnChanges(e){if(this._registered,this._checkForErrors(),!this._registered||`name`in e){if(this._registered&&(this._checkName(),this.formDirective)){let r=e.name.previousValue;this.formDirective.removeControl({name:r,path:this._getPath(r)})}this._setUpControl()}`isDisabled`in e&&this._updateDisabled(e),gt(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}ɵngControlCreate(e){super.ngControlCreate(e)}ɵngControlUpdate(e){super.ngControlUpdate(e,!1)}get shouldBindRequired(){return!1}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Ce$2(this.control,this,this.callSetDisabledState)),this.control.updateValueAndValidity({emitEvent:!1})}_setupWithForm(e){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Ce$2(this.control,this,e))}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){We.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let r=e.isDisabled.currentValue,i=r!==0&&Qj(r);We.then(()=>{i&&!this.control.disabled?this.control.disable():!i&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?de$2(e,this._parent):[e]}static ɵfac=function(r){return new(r||n)(te$2(h,9),te$2(C,10),te$2(G,10),te$2(M,10),te$2(Tb,8),te$2(k$1,8),te$2(pe$2,8),te$2(co$1,8))};static ɵdir=yr({type:n,selectors:[[``,`ngModel`,``,3,`formControlName`,``,3,`formControl`,``]],inputs:{name:`name`,isDisabled:[0,`disabled`,`isDisabled`],model:[0,`ngModel`,`model`],options:[0,`ngModelOptions`,`options`]},outputs:{update:`ngModelChange`},exportAs:[`ngModel`],standalone:!1,features:[qC([hn,yt]),pg,bu,Nw(null)]})}return n})();var Xn=(()=>{class n{static ɵfac=function(r){return new(r||n)};static ɵdir=yr({type:n,selectors:[[`form`,3,`ngNoForm`,``,3,`ngNativeValidate`,``]],hostAttrs:[`novalidate`,``],standalone:!1})}return n})();var fn={provide:M,useExisting:Ii(()=>gn),multi:!0};var gn=(()=>{class n extends j$1{writeValue(e){let r=e??``;this.setProperty(`value`,r)}registerOnChange(e){this.onChange=r=>{e(r==``?null:parseFloat(r))}}static ɵfac=(()=>{let e;return function(i){return(e||(e=Pp(n)))(i||n)}})();static ɵdir=yr({type:n,selectors:[[`input`,`type`,`number`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`type`,`number`,`formControl`,``,3,`ngNoCva`,``],[`input`,`type`,`number`,`ngModel`,``,3,`ngNoCva`,``]],hostBindings:function(r,i){r&1&&Ng(`input`,function(a){return i.onChange(a.target.value)})(`blur`,function(){return i.onTouched()})},standalone:!1,features:[qC([fn]),pg]})}return n})();var mn={provide:M,useExisting:Ii(()=>vn),multi:!0};var yn=(()=>{class n{_accessors=[];add(e,r){this._accessors.push([e,r])}remove(e){for(let r=this._accessors.length-1;r>=0;--r)if(this._accessors[r][1]===e){this._accessors.splice(r,1);return}}select(e){this._accessors.forEach(r=>{this._isSameGroup(r,e)&&r[1]!==e&&r[1].fireUncheck(e.value)})}_isSameGroup(e,r){return e[0].control?e[0]._parent===r._control._parent&&e[1].name===r.name:!1}static ɵfac=function(r){return new(r||n)};static ɵprov=ze$3({token:n,factory:n.ɵfac})}return n})();var vn=(()=>{class n extends j$1{_registry;_injector;_state;_control;_fn;setDisabledStateFired=!1;onChange=()=>{};name;formControlName;value;callSetDisabledState=m$1(k$1,{optional:!0})??Y;constructor(e,r,i,o){super(e,r),this._registry=i,this._injector=o}ngOnChanges(e){let r=this._control?.control;e.value&&r&&this.writeValue(r.value)}ngOnInit(){this._control=this._injector.get(_$1),this._checkName(),this._registry.add(this._control,this)}ngOnDestroy(){this._registry.remove(this)}writeValue(e){this._state=e===this.value,this.setProperty(`checked`,this._state)}registerOnChange(e){this._fn=e,this.onChange=()=>{e(this.value),this._registry.select(this)}}setDisabledState(e){(this.setDisabledStateFired||e||this.callSetDisabledState===`whenDisabledForLegacyCode`)&&this.setProperty(`disabled`,e),this.setDisabledStateFired=!0}fireUncheck(e){this.writeValue(e)}_checkName(){this.name&&this.formControlName&&(this.name,this.formControlName),!this.name&&this.formControlName&&(this.name=this.formControlName)}static ɵfac=function(r){return new(r||n)(te$2(co$1),te$2(Sn),te$2(yn),te$2(pe$2))};static ɵdir=yr({type:n,selectors:[[`input`,`type`,`radio`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`type`,`radio`,`formControl`,``,3,`ngNoCva`,``],[`input`,`type`,`radio`,`ngModel`,``,3,`ngNoCva`,``]],hostBindings:function(r,i){r&1&&Ng(`change`,function(){return i.onChange()})(`blur`,function(){return i.onTouched()})},inputs:{name:`name`,formControlName:`formControlName`,value:`value`},standalone:!1,features:[qC([mn]),pg,bu]})}return n})();var De$2=class extends T{constructor(t,e,r){super(Ne$1(e),Ie$1(r,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;at(t){return this.controls[this._adjustIndex(t)]}push(t,e={}){Array.isArray(t)?t.forEach(r=>{this.controls.push(r),this._registerControl(r)}):(this.controls.push(t),this._registerControl(t)),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}insert(t,e,r={}){this.controls.splice(t,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:r.emitEvent})}removeAt(t,e={}){let r=this._adjustIndex(t);r<0&&(r=0),this.controls[r]&&this.controls[r]._registerOnCollectionChange(()=>{}),this.controls.splice(r,1),this.updateValueAndValidity({emitEvent:e.emitEvent})}setControl(t,e,r={}){let i=this._adjustIndex(t);i<0&&(i=0),this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),this.controls.splice(i,1),e&&(this.controls.splice(i,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:r.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(t,e={}){Dr(()=>{dt(this,!1,t),t.forEach((r,i)=>{ut(this,!1,i),this.at(i).setValue(r,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)})}patchValue(t,e={}){t!=null&&(t.forEach((r,i)=>{this.at(i)&&this.at(i).patchValue(r,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t=[],e={}){this._forEachChild((r,i)=>{r.reset(t[i],m$2(l$1({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new S$1(this))}getRawValue(){return this.controls.map(t=>t.getRawValue())}clear(t={}){this.controls.length<1||(this._forEachChild(e=>e._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:t.emitEvent}))}_adjustIndex(t){return t<0?t+this.length:t}_syncPendingControls(){let t=this.controls.reduce((e,r)=>r._syncPendingControls()?!0:e,!1);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_forEachChild(t){this.controls.forEach((e,r)=>{t(e,r)})}_updateValue(){this.value=this.controls.filter(t=>t.enabled||this.disabled).map(t=>t.value)}_anyControls(t){return this.controls.some(e=>e.enabled&&t(e))}_setUpControls(){this._forEachChild(t=>this._registerControl(t))}_allControlsDisabled(){for(let t of this.controls)if(t.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(t){t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)}_find(t){return this.at(t)??null}};var _t=new w$1(``);var _n={provide:h,useExisting:Ii(()=>Ct$1)};var Ct$1=(()=>{class n extends un{name=null;constructor(e,r,i){super(),this._parent=e,this._setValidators(r),this._setAsyncValidators(i)}_checkParentType(){Dt(this._parent)}static ɵfac=function(r){return new(r||n)(te$2(h,13),te$2(C,10),te$2(G,10))};static ɵdir=yr({type:n,selectors:[[``,`formGroupName`,``]],inputs:{name:[0,`formGroupName`,`name`]},standalone:!1,features:[qC([_n]),pg]})}return n})();var Cn={provide:h,useExisting:Ii(()=>Vt)};var Vt=(()=>{class n extends h{_parent;name=null;constructor(e,r,i){super(),this._parent=e,this._setValidators(r),this._setAsyncValidators(i)}ngOnInit(){Dt(this._parent),this.formDirective.addFormArray(this)}ngOnDestroy(){this.formDirective?.removeFormArray(this)}get control(){return this.formDirective.getFormArray(this)}get formDirective(){return this._parent?this._parent.formDirective:null}get path(){return de$2(this.name==null?this.name:this.name.toString(),this._parent)}static ɵfac=function(r){return new(r||n)(te$2(h,13),te$2(C,10),te$2(G,10))};static ɵdir=yr({type:n,selectors:[[``,`formArrayName`,``]],inputs:{name:[0,`formArrayName`,`name`]},standalone:!1,features:[qC([Cn]),pg]})}return n})();function Dt(n){return!(n instanceof Ct$1)&&!(n instanceof vt)&&!(n instanceof Vt)}var Vn={provide:_$1,useExisting:Ii(()=>Dn)};var Dn=(()=>{class n extends _$1{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(e){}model;update=new ut$2;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(e,r,i,o,a,m,V){super(V,m,o),this._ngModelWarningConfig=a,this._parent=e,this._setValidators(r),this._setAsyncValidators(i)}_setupWithForm(e,r){this.control=e,this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Ce$2(e,this,r))}ngOnChanges(e){this._added||this._setUpControl(),gt(e,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective?.removeControl(this)}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}get path(){return de$2(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}ɵngControlCreate(e){super.ngControlCreate(e)}ɵngControlUpdate(e){this.isCustomControlBased&&(this._added||this._setUpControl(),super.ngControlUpdate(e,!0))}static ɵfac=function(r){return new(r||n)(te$2(h,13),te$2(C,10),te$2(G,10),te$2(M,10),te$2(_t,8),te$2(co$1,8),te$2(pe$2,8))};static ɵdir=yr({type:n,selectors:[[``,`formControlName`,``]],inputs:{name:[0,`formControlName`,`name`],isDisabled:[0,`disabled`,`isDisabled`],model:[0,`ngModel`,`model`]},outputs:{update:`ngModelChange`},standalone:!1,features:[qC([Vn,yt]),pg,bu,Nw(null)]})}return n})();var An={provide:M,useExisting:Ii(()=>bt),multi:!0};function At(n,t){return n==null?`${t}`:(t&&typeof t==`object`&&(t=`Object`),`${n}: ${t}`.slice(0,50))}function bn(n){return n.split(`:`)[0]}var bt=(()=>{class n extends j$1{value;_optionMap=new Map;_idCounter=0;set compareWith(e){this._compareWith=e}_compareWith=Object.is;appRefInjector=m$1(wo$1).injector;destroyRef=m$1(Ce$4);cdr=m$1(Tb);_queuedWrite=!1;_writeValueAfterRender(){this._queuedWrite||this.appRefInjector.destroyed||(this._queuedWrite=!0,ME({write:()=>{this.destroyRef.destroyed||(this._queuedWrite=!1,this.writeValue(this.value))}},{injector:this.appRefInjector}))}writeValue(e){this.cdr.markForCheck(),this.value=e;let i=At(this._getOptionId(e),e);this.setProperty(`value`,i)}registerOnChange(e){this.onChange=r=>{this.value=this._getOptionValue(r),e(this.value)}}_registerOption(){return(this._idCounter++).toString()}_getOptionId(e){for(let r of this._optionMap.keys())if(this._compareWith(this._optionMap.get(r),e))return r;return null}_getOptionValue(e){let r=bn(e);return this._optionMap.has(r)?this._optionMap.get(r):e}static ɵfac=(()=>{let e;return function(i){return(e||(e=Pp(n)))(i||n)}})();static ɵdir=yr({type:n,selectors:[[`select`,`formControlName`,``,3,`multiple`,``,3,`ngNoCva`,``],[`select`,`formControl`,``,3,`multiple`,``,3,`ngNoCva`,``],[`select`,`ngModel`,``,3,`multiple`,``,3,`ngNoCva`,``]],hostBindings:function(r,i){r&1&&Ng(`change`,function(a){return i.onChange(a.target.value)})(`blur`,function(){return i.onTouched()})},inputs:{compareWith:`compareWith`},standalone:!1,features:[qC([An]),pg]})}return n})();var Zn=(()=>{class n{_element;_renderer;_select;id;constructor(e,r,i){this._element=e,this._renderer=r,this._select=i,this._select&&(this.id=this._select._registerOption())}set ngValue(e){this._select!=null&&(this._select._optionMap.set(this.id,e),this._setElementValue(At(this.id,e)),this._select._writeValueAfterRender())}set value(e){this._setElementValue(e),this._select?._writeValueAfterRender()}_setElementValue(e){this._renderer.setProperty(this._element.nativeElement,`value`,e)}ngOnDestroy(){this._select?._optionMap.delete(this.id),this._select?._writeValueAfterRender()}static ɵfac=function(r){return new(r||n)(te$2(Sn),te$2(co$1),te$2(bt,9))};static ɵdir=yr({type:n,selectors:[[`option`]],inputs:{ngValue:`ngValue`,value:`value`},standalone:!1})}return n})();var Mn={provide:M,useExisting:Ii(()=>Mt$1),multi:!0};function ze$1(n,t){return n==null?`${t}`:(typeof t==`string`&&(t=`'${t}'`),t&&typeof t==`object`&&(t=`Object`),`${n}: ${t}`.slice(0,50))}function En(n){return n.split(`:`)[0]}var Mt$1=(()=>{class n extends j$1{value;_optionMap=new Map;_idCounter=0;set compareWith(e){this._compareWith=e}_compareWith=Object.is;writeValue(e){this.value=e;let r;if(Array.isArray(e)){let i=e.map(o=>this._getOptionId(o));r=(o,a)=>{o._setSelected(i.indexOf(a)>-1)}}else r=i=>{i._setSelected(!1)};this._optionMap.forEach(r)}registerOnChange(e){this.onChange=r=>{let i=[],o=r.selectedOptions;if(o!==void 0){let a=o;for(let m=0;m<a.length;m++){let V=a[m],L=this._getOptionValue(V.value);i.push(L)}}else{let a=r.options;for(let m=0;m<a.length;m++){let V=a[m];if(V.selected){let L=this._getOptionValue(V.value);i.push(L)}}}this.value=i,e(i)}}_registerOption(e){let r=(this._idCounter++).toString();return this._optionMap.set(r,e),r}_getOptionId(e){for(let r of this._optionMap.keys())if(this._compareWith(this._optionMap.get(r)._value,e))return r;return null}_getOptionValue(e){let r=En(e);return this._optionMap.has(r)?this._optionMap.get(r)._value:e}static ɵfac=(()=>{let e;return function(i){return(e||(e=Pp(n)))(i||n)}})();static ɵdir=yr({type:n,selectors:[[`select`,`multiple`,``,`formControlName`,``,3,`ngNoCva`,``],[`select`,`multiple`,``,`formControl`,``,3,`ngNoCva`,``],[`select`,`multiple`,``,`ngModel`,``,3,`ngNoCva`,``]],hostBindings:function(r,i){r&1&&Ng(`change`,function(a){return i.onChange(a.target)})(`blur`,function(){return i.onTouched()})},inputs:{compareWith:`compareWith`},standalone:!1,features:[qC([Mn]),pg]})}return n})();var Kn=(()=>{class n{_element;_renderer;_select;id;_value;constructor(e,r,i){this._element=e,this._renderer=r,this._select=i,this._select&&(this.id=this._select._registerOption(this))}set ngValue(e){this._select!=null&&(this._value=e,this._setElementValue(ze$1(this.id,e)),this._select.writeValue(this._select.value))}set value(e){this._select?(this._value=e,this._setElementValue(ze$1(this.id,e)),this._select.writeValue(this._select.value)):this._setElementValue(e)}_setElementValue(e){this._renderer.setProperty(this._element.nativeElement,`value`,e)}_setSelected(e){this._renderer.setProperty(this._element.nativeElement,`selected`,e)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}static ɵfac=function(r){return new(r||n)(te$2(Sn),te$2(co$1),te$2(Mt$1,9))};static ɵdir=yr({type:n,selectors:[[`option`]],inputs:{ngValue:`ngValue`,value:`value`},standalone:!1})}return n})();var Et=(()=>{class n{static ɵfac=function(r){return new(r||n)};static ɵmod=Eo({type:n});static ɵinj=qn({})}return n})();function Ye(n){return!!n&&(n.asyncValidators!==void 0||n.validators!==void 0||n.updateOn!==void 0)}var Qn=(()=>{class n{useNonNullable=!1;get nonNullable(){let e=new n;return e.useNonNullable=!0,e}group(e,r=null){let i=this._reduceControls(e),o={};return Ye(r)?o=r:r!==null&&(o.validators=r.validator,o.asyncValidators=r.asyncValidator),new P(i,o)}record(e,r=null){return new Ve(this._reduceControls(e),r)}control(e,r,i){let o={};return this.useNonNullable?(Ye(r)?o=r:(o.validators=r,o.asyncValidators=i),new z(e,m$2(l$1({},o),{nonNullable:!0}))):new z(e,r,i)}array(e,r,i){return new De$2(e.map(a=>this._createControl(a)),r,i)}_reduceControls(e){let r={};return Object.keys(e).forEach(i=>{r[i]=this._createControl(e[i])}),r}_createControl(e){if(e instanceof z)return e;if(e instanceof T)return e;if(Array.isArray(e)){let r=e[0],i=e.length>1?e[1]:null,o=e.length>2?e[2]:null;return this.control(r,i,o)}else return this.control(e)}static ɵfac=function(r){return new(r||n)};static ɵprov=ze$3({token:n,factory:n.ɵfac})}return n})();var Jn=(()=>{class n{static withConfig(e){return{ngModule:n,providers:[{provide:k$1,useValue:e.callSetDisabledState??Y}]}}static ɵfac=function(r){return new(r||n)};static ɵmod=Eo({type:n});static ɵinj=qn({imports:[Et]})}return n})();var er=(()=>{class n{static withConfig(e){return{ngModule:n,providers:[{provide:_t,useValue:e.warnOnNgModelWithFormControl??`always`},{provide:k$1,useValue:e.callSetDisabledState??Y}]}}static ɵfac=function(r){return new(r||n)};static ɵmod=Eo({type:n});static ɵinj=qn({imports:[Et]})}return n})();function p(n){n||(n=m$1(Ce$4));let s=new x$2(e=>{if(n.destroyed){e.next();return}return n.onDestroy(e.next.bind(e))});return e=>e.pipe(ev(s))}function $e(n,s){let t=!s?.manualCleanup?s?.injector?.get(Ce$4)??m$1(Ce$4):null,r=be(s?.equal),a;s?.requireSync?a=zi({kind:0},{equal:r}):a=zi({kind:1,value:s?.initialValue},{equal:r});let i,u=n.subscribe({next:o=>a.set({kind:1,value:o}),error:o=>{a.set({kind:2,error:o}),i?.()},complete:()=>{i?.()}});if(s?.requireSync&&a().kind===0)throw new g(601,!1);return i=t?.onDestroy(u.unsubscribe.bind(u)),ob(()=>{let o=a();switch(o.kind){case 1:return o.value;case 2:throw o.error;case 0:throw new g(601,!1)}},{equal:s?.equal})}function be(n=Object.is){return(s,e)=>s.kind===1&&e.kind===1&&n(s.value,e.value)}function ae$1(n,s){let e={};for(let t of Object.keys(n))t!==s&&(e[t]=n[t]);return e}var H=class{state=zi({});hasAny=ob(()=>Object.keys(this.state()).length>0);isLoading(s){return this.state()[s]!==void 0}get(s){return this.state()[s]}set(s,e){this.state.update(t=>m$2(l$1({},t),{[s]:e}))}clear(s){this.state.update(e=>ae$1(e,s))}clearIfOwner(s,e){this.state.update(t=>t[s]===e?ae$1(t,s):t)}};var F=class{};var me$1=(()=>{class n{handle(e){return e.key}static ɵfac=function(t){return new(t||n)};static ɵprov=R$2({token:n,factory:n.ɵfac})}return n})();var R=class{};var ve=(()=>{class n extends R{compile(e,t){return e}compileTranslations(e,t){return e}static ɵfac=(()=>{let e;return function(r){return(e||(e=Pp(n)))(r||n)}})();static ɵprov=R$2({token:n,factory:n.ɵfac})}return n})();var S=class{};var Le$1=(()=>{class n extends S{getTranslation(e){return ga({})}static ɵfac=(()=>{let e;return function(r){return(e||(e=Pp(n)))(r||n)}})();static ɵprov=R$2({token:n,factory:n.ɵfac})}return n})();function B(n,s){if(n===s)return!0;if(n===null||s===null)return!1;if(n!==n&&s!==s)return!0;let e=typeof n,t=typeof s,r;if(e==t&&e==`object`)if(Array.isArray(n)){if(!Array.isArray(s))return!1;if((r=n.length)==s.length){for(let a=0;a<r;a++)if(!B(n[a],s[a]))return!1;return!0}}else{if(Array.isArray(s))return!1;if(f(n)&&f(s)){let a=Object.create(null);for(let i in n){if(!B(n[i],s[i]))return!1;a[i]=!0}for(let i in s)if(!(i in a)&&typeof s[i]<`u`)return!1;return!0}}return!1}function d(n){return typeof n<`u`&&n!==null}function ie$1(n){return n!==void 0}function f(n){return D(n)&&!v(n)&&n!==null}function D(n){return typeof n==`object`&&n!==null}function v(n){return Array.isArray(n)}function k(n){return typeof n==`string`}function ye$1(n){return typeof n==`function`}function _(n){if(v(n))return n.map(s=>_(s));if(f(n)){let s={};return Object.keys(n).forEach(e=>{s[e]=_(n[e])}),s}else return n}function J(n,s){if(!D(n))return _(s);let e=_(n);return D(e)&&D(s)&&Object.keys(s).forEach(t=>{f(s[t])?t in n?e[t]=J(n[t],s[t]):Object.assign(e,{[t]:s[t]}):Object.assign(e,{[t]:s[t]})}),e}function le$1(n,s){let e=s.split(`.`);s=``;do{s+=e.shift();let t=!e.length;if(d(n)){if(f(n)&&ie$1(n[s])&&(f(n[s])||v(n[s])||t)){n=n[s],s=``;continue}if(v(n)){if(s===`length`&&t){n=n.length,s=``;continue}if(/^\d+$/.test(s)){let r=parseInt(s,10);if(ie$1(n[r])&&(f(n[r])||v(n[r])||t)){n=n[r],s=``;continue}}}}if(t){n=void 0;continue}s+=`.`}while(e.length);return n}function Ce$1(n,s,e){return J(n,Te$1(s,e))}function Te$1(n,s){return n.split(`.`).reduceRight((e,t)=>({[t]:e}),s)}var I=class{};var we=(()=>{class n extends I{templateMatcher=/{{\s?([^{}\s]*)\s?}}/g;interpolate(e,t){if(k(e))return this.interpolateString(e,t);if(ye$1(e))return this.interpolateFunction(e,t)}interpolateFunction(e,t){return e(t)}interpolateString(e,t){return t?e.replace(this.templateMatcher,(r,a)=>{let i=this.getInterpolationReplacement(t,a);return i!==void 0?i:r}):e}getInterpolationReplacement(e,t){return this.formatValue(le$1(e,t))}formatValue(e){if(k(e))return e;if(typeof e==`number`||typeof e==`boolean`)return e.toString();if(e===null)return`null`;if(v(e))return e.join(`, `);if(D(e))return typeof e.toString==`function`&&e.toString!==Object.prototype.toString?e.toString():JSON.stringify(e)}static ɵfac=(()=>{let e;return function(r){return(e||(e=Pp(n)))(r||n)}})();static ɵprov=R$2({token:n,factory:n.ɵfac})}return n})();var ue=(()=>{class n$1{_translations=zi({});translations=this._translations.asReadonly();_languages=zi([]);languages=this._languages.asReadonly();_lastTranslationChange=zi(null);lastTranslationChange=this._lastTranslationChange.asReadonly();_translationChange$=new ee$2;translationChange$=this._translationChange$.asObservable();constructor(){m$1(Ce$4).onDestroy(()=>{this._translationChange$.complete()})}getTranslations(e){return this.translations()[e]}setTranslations(e,t,r){this._translations.update(i=>m$2(l$1({},i),{[e]:r&&this.hasTranslationFor(e)?J(i[e],t):t})),this.addLanguages([e]);let a={lang:e,translations:this.getTranslations(e)};this._lastTranslationChange.set(a),this._translationChange$.next(a)}getLanguages(){return this.languages()}addLanguages(e){this._languages.update(t=>Array.from(new Set([...t,...e])))}hasTranslationFor(e){return typeof this.translations()[e]<`u`}deleteTranslations(e){this._translations.update(t=>{let i=t,{[e]:r}=i;return o(i,[n(e)])})}getTranslationValue(e,t){return le$1(this.getTranslations(e),t)}static ɵfac=function(t){return new(t||n$1)};static ɵprov=R$2({token:n$1,factory:n$1.ɵfac})}return n$1})();var ce$1=new w$1(`TRANSLATE_CONFIG`);var w=n=>Ly(n)?n:ga(n);var q=(()=>{class n{loadingTranslations=new H;lastUseLanguage=null;currentLoader=m$1(S);compiler=m$1(R);parser=m$1(I);missingTranslationHandler=m$1(F);store=m$1(ue);destroyRef=m$1(Ce$4);parent;get isRoot(){return this.parent===null}_onLangChange=new ee$2;_onFallbackLangChange=new ee$2;_currentLang=zi(null);_fallbackLang=zi(null);_onTranslationRefresh=null;_isLoading=ob(()=>this.loadingTranslations.hasAny()||(this.parent?.isLoading()??!1));getRoot(){let e=this;for(;e.parent;)e=e.parent;return e}getParent(){return this.parent}getActiveRequestedLang(){return this.getRoot().lastUseLanguage}hasTranslationInChain(e){for(let t=this;t;t=t.parent)if(t.store.hasTranslationFor(e))return!0;return!1}chainTranslationChange$(){let e=[];for(let t=this;t;t=t.parent)e.push(t.store.translationChange$);return e.length===1?e[0]:Hy(...e)}get onTranslationChange(){return this.store.translationChange$}get onLangChange(){return this.isRoot?this._onLangChange.asObservable():this.parent?this.parent.onLangChange:Kt$2}get onFallbackLangChange(){return this.isRoot?this._onFallbackLangChange.asObservable():this.parent?this.parent.onFallbackLangChange:Kt$2}get onTranslationRefresh(){if(!this._onTranslationRefresh){let e=Hy(this.onTranslationChange.pipe(Xt$2(t=>t.lang===this.getCurrentLang()||t.lang===this.getFallbackLang())),this.onLangChange,this.onFallbackLangChange).pipe(le$4(()=>{}));this.isRoot?this._onTranslationRefresh=e:this._onTranslationRefresh=this.parent?Hy(e,this.parent.onTranslationRefresh):e}return this._onTranslationRefresh}constructor(){let e=l$1({isRoot:!0,fallbackLang:null},m$1(ce$1,{optional:!0}));this.parent=e.isRoot?null:m$1(n,{optional:!0,skipSelf:!0});let t=m$1(Ce$4);if(this.isRoot)e.lang&&this.use(e.lang),e.fallbackLang&&this.setFallbackLang(e.fallbackLang);else{let r=this.getCurrentLang();r&&this.loadOrExtendLanguage(r)?.pipe(p(t)).subscribe({error:i=>{console.warn(`@ngx-translate/core: child failed to load "${r}". Cause:`,i)}});let a=this.getFallbackLang();a&&a!==r&&this.loadOrExtendLanguage(a)?.pipe(p(t)).subscribe({error:i=>{console.warn(`@ngx-translate/core: child failed to load "${a}". Cause:`,i)}})}this.onLangChange.pipe(p(t)).subscribe(r=>{this.isRoot||this.loadOrExtendLanguage(r.lang)?.pipe(p(t)).subscribe({error:a=>{console.warn(`@ngx-translate/core: child failed to load "${r.lang}". Cause:`,a)}})}),this.onFallbackLangChange.pipe(p(t)).subscribe(r=>{this.isRoot||this.loadOrExtendLanguage(r.lang)?.pipe(p(t)).subscribe({error:a=>{console.warn(`@ngx-translate/core: child failed to load "${r.lang}". Cause:`,a)}})}),t.onDestroy(()=>{this._onLangChange.complete(),this._onFallbackLangChange.complete()})}setFallbackLang(e){if(!this.isRoot)return this.parent.setFallbackLang(e);this._fallbackLang()||this._fallbackLang.set(e);let t=this.loadOrExtendLanguage(e);return Ly(t)?(t.pipe(Vn$1(1)).subscribe({next:()=>{this._fallbackLang.set(e),this._onFallbackLangChange.next({lang:e,translations:this.store.getTranslations(e)})},error:r=>{console.warn(`@ngx-translate/core: failed to load fallback "${e}". Cause:`,r)}}),t):(this._fallbackLang.set(e),this._onFallbackLangChange.next({lang:e,translations:this.store.getTranslations(e)}),ga(this.store.getTranslations(e)))}get isLoading(){return this._isLoading}use(e){if(!this.isRoot)return this.parent.use(e);let t=this._currentLang(),r=this.lastUseLanguage;this.lastUseLanguage=e,this._currentLang()||this._currentLang.set(e);let a=this.loadOrExtendLanguage(e);return Ly(a)?(a.pipe(Vn$1(1)).subscribe({next:()=>{this.changeLang(e)},error:i=>{this.lastUseLanguage===e&&(this._currentLang.set(t),this.lastUseLanguage=r),console.warn(`@ngx-translate/core: failed to load "${e}". currentLang was NOT changed; remains "${t??`null`}". Cause:`,i)}}),a):(this.changeLang(e),ga(this.store.getTranslations(e)))}loadOrExtendLanguage(e){return this.store.hasTranslationFor(e)?ga(this.store.getTranslations(e)):this.loadAndCompileTranslations(e)}getTranslations(e){return this.store.getTranslations(e)}changeLang(e){e===this.lastUseLanguage&&(this._currentLang.set(e),this._onLangChange.next({lang:e,translations:this.store.getTranslations(e)}))}getCurrentLang(){return this.isRoot?this._currentLang():this.parent?.getCurrentLang()??null}loadAndCompileTranslations(e){let t=this.loadingTranslations.get(e);if(t)return t;let r=this.currentLoader.getTranslation(e).pipe(le$4(a=>this.compiler.compileTranslations(a,e)),Id(a=>{this.store.setTranslations(e,a,!1),this.loadingTranslations.clearIfOwner(e,r)}),ci(()=>this.loadingTranslations.clearIfOwner(e,r)),Ky({bufferSize:1,refCount:!0}));return this.loadingTranslations.set(e,r),r.pipe(p(this.destroyRef)).subscribe({error:()=>{}}),r}setTranslation(e,t,r=!1){let a=this.compiler.compileTranslations(t,e);this.store.setTranslations(e,a,r)}setCompiledTranslation(e,t,r=!1){this.store.setTranslations(e,t,r)}getLangs(){return this.store.getLanguages()}addLangs(e){this.store.addLanguages(e)}getParsedResultForKey(e,t,r){let a=this.getTextToInterpolate(e,r);if(d(a))return this.runInterpolation(a,t);let u=this.getMissingTranslationHandler().handle(l$1({key:e,translateService:this},t!==void 0&&{interpolateParams:t}));return u!==void 0?u:e}getMissingTranslationHandler(){return this.missingTranslationHandler}getFallbackLang(){return this.isRoot?this._fallbackLang():this.parent?.getFallbackLang()??null}getTextToInterpolate(e,t){if(t){let u=this.store.getTranslationValue(t,e);return u!==void 0?u:this.parent?.getTextToInterpolate(e,t)}let r=this.getCurrentLang(),a=this.getFallbackLang(),i;return r&&(i=this.store.getTranslationValue(r,e)),!d(i)&&a&&a!==r&&(i=this.store.getTranslationValue(a,e)),i!==void 0?i:this.parent?.getTextToInterpolate(e)}runInterpolation(e,t){if(d(e))return v(e)?this.runInterpolationOnArray(e,t):f(e)?this.runInterpolationOnDict(e,t):this.parser.interpolate(e,t)}runInterpolationOnArray(e,t){return e.map(r=>this.runInterpolation(r,t))}runInterpolationOnDict(e,t){let r={};for(let a in e){let i=this.runInterpolation(e[a],t);i!==void 0&&(r[a]=i)}return r}getParsedResult(e,t,r){return e instanceof Array?this.getParsedResultForArray(e,t,r):this.getParsedResultForKey(e,t,r)}getParsedResultForArray(e,t,r){let a={},i=!1;for(let o of e)a[o]=this.getParsedResultForKey(o,t,r),i=i||Ly(a[o]);if(!i)return a;let u=e.map(o=>w(a[o]));return Fy(u).pipe(le$4(o=>{let z={};return o.forEach((fe,ge)=>{z[e[ge]]=fe}),z}))}get(e,t,r){if(!d(e)||!e.length)return ga(``);let a=r??this.getActiveRequestedLang()??this.getCurrentLang(),i=a?this.loadingTranslations.get(a):void 0;return i?i.pipe(ya(()=>w(this.getParsedResult(e,t,r)))):w(this.getParsedResult(e,t,r))}getStreamOnTranslationChange(e,t,r){if(!d(e)||!e.length)throw new Error(`Parameter "key" is required and cannot be empty`);return jn(By(()=>this.get(e,t,r)),this.onTranslationChange.pipe(wa(()=>{return w(this.getParsedResult(e,t,r))})))}stream(e,t,r){if(!d(e)||!e.length)throw new Error(`Parameter "key" required`);let a=r?Hy(this.onLangChange,this.chainTranslationChange$().pipe(Xt$2(i=>i.lang===r))):this.onLangChange;return jn(By(()=>this.get(e,t,r)),a.pipe(wa(()=>{return w(this.getParsedResult(e,t,r))})))}instant(e,t,r){if(!d(e)||e.length===0)return``;r&&!this.hasTranslationInChain(r)&&this.warnUnloadedInstantLang(r);let a=this.getParsedResult(e,t,r);return Ly(a)?this.keyToObject(e):a}warnedUnloadedInstantLangs=new Set;warnUnloadedInstantLang(e){let t=this.getRoot();if(t!==this){t.warnUnloadedInstantLang(e);return}this.warnedUnloadedInstantLangs.has(e)||Dr(()=>{this.warnedUnloadedInstantLangs.add(e),console.warn(`@ngx-translate/core: instant() called with lang="${e}" but no translations are loaded for that language. Returning the key as fallback. Load with use("${e}") or setTranslation("${e}", ...) first.`)})}translate(e,t,r){return ob(()=>{let a=typeof e==`function`?e():e,i=typeof t==`function`?t():t,u=typeof r==`function`?r():r;return this.instant(a,i,u)})}keyToObject(e){return Array.isArray(e)?e.reduce((t,r)=>(t[r]=r,t),{}):e}set(e,t,r=this.getCurrentLang()){this.store.setTranslations(r,Ce$1(this.store.getTranslations(r),e,k(t)?this.compiler.compile(t,r):this.compiler.compileTranslations(t,r)),!1)}reloadLang(e){return this.resetLang(e),this.loadAndCompileTranslations(e)}resetLang(e){this.loadingTranslations.clear(e),this.store.deleteTranslations(e)}static getBrowserLang(){if(typeof window>`u`||!window.navigator)return;let e=this.getBrowserCultureLang();return e?e.split(/[-_]/)[0]:void 0}static getBrowserCultureLang(){if(!(typeof window>`u`||typeof window.navigator>`u`))return window.navigator.languages?window.navigator.languages[0]:window.navigator.language||window.navigator.browserLanguage||window.navigator.userLanguage}getBrowserLang(){return n.getBrowserLang()}getBrowserCultureLang(){return n.getBrowserCultureLang()}get currentLang(){return this.isRoot?this._currentLang.asReadonly():this.parent.currentLang}get fallbackLang(){return this.isRoot?this._fallbackLang.asReadonly():this.parent.fallbackLang}static ɵfac=function(t){return new(t||n)};static ɵprov=R$2({token:n,factory:n.ɵfac})}return n})();var tt=(()=>{class n{translateService=m$1(q);cachedSignal=null;lastKey=null;lastParams;transform(e,...t){if(!e||!e.length)return e;let r=this.parseArgs(t);return(e!==this.lastKey||!B(r,this.lastParams))&&(this.cachedSignal=this.translateService.translate(e,r),this.lastKey=e,this.lastParams=r),this.cachedSignal()}parseArgs(e){if(!(!d(e[0])||!e.length)){if(k(e[0])&&e[0].length){let t=e[0].replace(/(')?([a-zA-Z0-9_]+)(')?(\s)?:/g,`"$2":`).replace(/:(\s)?(')(.*?)(')/g,`:"$3"`);try{return JSON.parse(t)}catch(r){throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${e[0]}`)}}if(f(e[0]))return e[0]}}static ɵfac=function(t){return new(t||n)};static ɵpipe=Io$1({name:`translate`,type:n,pure:!1});static ɵprov=R$2({token:n,factory:n.ɵfac})}return n})();function de$1(n){return/^class\s/.test(Function.prototype.toString.call(n))}function oe(n,s){return de$1(s)?{provide:n,useClass:s}:{provide:n,useFactory:s}}function nt(n={}){return De$1(m$2(l$1({},n),{isRoot:!0}))}function j(n,s,e,t,r){if(s===void 0)return oe(n,e);if(typeof s==`function`){if(de$1(s)){let a=s.name||`YourClass`;console.warn(`@ngx-translate/core: "${t}" received a bare class (${a}); auto-wrapping with ${r}(). For clarity, prefer ${t}: ${r}(${a}).`)}return oe(n,s)}return s}function De$1(n){let s=[],e=j(S,n.loader,Le$1,`loader`,`provideTranslateLoader`),t=j(R,n.compiler,ve,`compiler`,`provideTranslateCompiler`),r=j(I,n.parser,we,`parser`,`provideTranslateParser`),a=j(F,n.missingTranslationHandler,me$1,`missingTranslationHandler`,`provideMissingTranslationHandler`);s.push(e,t,r,a),s.push(ue);let i={fallbackLang:n.fallbackLang??null,lang:n.lang,isRoot:n.isRoot};return s.push({provide:ce$1,useValue:i}),s.push({provide:q,useClass:q}),s}var le=new w$1(`MAT_DRAWER_DEFAULT_AUTOSIZE`,{providedIn:`root`,factory:()=>!1});var qt=new w$1(`MAT_DRAWER_CONTAINER`);var ht=(()=>{class i extends Pe{_platform=m$1(b$1);_changeDetectorRef=m$1(Tb);_element=m$1(Sn);_ngZone=m$1(ae$3);_isInert=!1;_container=m$1(Kt);ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>this._changeDetectorRef.markForCheck())}_drawerToggled(t){t.opened?this._ngZone.runOutsideAngular(()=>{t._animationEnd.pipe(zy(50),Vn$1(1)).subscribe(()=>this._updateInert())}):this._updateInert()}_drawerModeChanged(){this._updateInert()}_updateInert(){let t=this._container._isShowingBackdrop();if(t!==this._isInert){let e=this._element.nativeElement;this._isInert=t,t?e.setAttribute(`inert`,`true`):e.removeAttribute(`inert`)}}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:t,end:e}=this._container;return t!=null&&t.mode!==`over`&&t.opened||e!=null&&e.mode!==`over`&&e.opened}static ɵfac=(()=>{let t;return function(n){return(t||(t=Pp(i)))(n||i)}})();static ɵcmp=(function(){return bw({type:i,selectors:[[`mat-drawer-content`]],hostAttrs:[1,`mat-drawer-content`],hostVars:6,hostBindings:function(n,r){n&2&&(Lg(`margin-left`,r._container._contentMargins.left,`px`)(`margin-right`,r._container._contentMargins.right,`px`),jg(`mat-drawer-content-hidden`,r._shouldBeHidden()))},features:[qC([{provide:Pe,useExisting:i}]),pg],ngContentSelectors:[`*`],decls:1,vars:0,template:function(n,r){n&1&&(aC(),cC(0))},encapsulation:2})})()}return i})();var Wt=(()=>{class i{_elementRef=m$1(Sn);_focusTrapFactory=m$1(Se$2);_focusMonitor=m$1(dt$1);_platform=m$1(b$1);_ngZone=m$1(ae$3);_renderer=m$1(co$1);_interactivityChecker=m$1(xe);_doc=m$1(q$2);_isAnimating=!1;_container=m$1(qt,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(t){t=t===`end`?`end`:`start`,t!==this._position&&(this._isAttached&&this._updatePositionInParent(t),this._position=t,this.onPositionChanged.emit())}_position=`start`;get mode(){return this._mode}set mode(t){this._mode=t,this._updateFocusTrapState(),this._modeChanged.next(),this._getContent()?._drawerModeChanged()}_mode=`over`;get disableClose(){return this._disableClose}set disableClose(t){this._disableClose=Io(t)}_disableClose=!1;get autoFocus(){return this._autoFocus??(this.mode===`side`?`dialog`:`first-tabbable`)}set autoFocus(t){(t===`true`||t===`false`||t==null)&&(t=Io(t)),this._autoFocus=t}_autoFocus;get opened(){return this._opened()}set opened(t){this.toggle(Io(t))}_opened=zi(!1);_openedVia=null;_animationStarted=new ee$2;_animationEnd=new ee$2;openedChange=new ut$2(!0);_openedStream=this.openedChange.pipe(Xt$2(t=>t),le$4(()=>{}));openedStart=this._animationStarted.pipe(Xt$2(()=>this.opened),va(void 0));_closedStream=this.openedChange.pipe(Xt$2(t=>!t),le$4(()=>{}));closedStart=this._animationStarted.pipe(Xt$2(()=>!this.opened),va(void 0));_destroyed=new ee$2;onPositionChanged=new ut$2;_content;_modeChanged=new ee$2;_injector=m$1(pe$2);_changeDetectorRef=m$1(Tb);constructor(){this.openedChange.pipe(ev(this._destroyed)).subscribe(t=>{t?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||`program`)}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let t=this._renderer,e=this._elementRef.nativeElement;return[t.listen(e,`keydown`,n=>{n.keyCode===27&&!this.disableClose&&!Ie$2(n)&&this._ngZone.run(()=>{this.close(),n.stopPropagation(),n.preventDefault()})}),t.listen(e,`transitionend`,this._handleTransitionEvent),t.listen(e,`transitioncancel`,this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_focusByCssSelector(t,e){let n=this._elementRef.nativeElement.querySelector(t);n&&(this._interactivityChecker.isFocusable(n)||(n.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let r=()=>{o(),a(),n.removeAttribute(`tabindex`)},o=this._renderer.listen(n,`blur`,r),a=this._renderer.listen(n,`mousedown`,r)})),n.focus(e))}_takeFocus(){if(!this._focusTrap)return;let t=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case`dialog`:return;case!0:case`first-tabbable`:ME(()=>{let e=this._isAnimating?{preventScroll:!0}:void 0;!this._focusTrap.focusInitialElement(e)&&typeof t.focus==`function`&&t.focus(e)},{injector:this._injector});break;case`first-heading`:this._focusByCssSelector(`h1, h2, h3, h4, h5, h6, [role="heading"]`);break;default:this._focusByCssSelector(this.autoFocus)}}_restoreFocus(t){this.autoFocus!==`dialog`&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,t):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let t=this._doc.activeElement;return!!t&&this._elementRef.nativeElement.contains(t)}ngAfterViewInit(){this._isAttached=!0,this._position===`end`&&this._updatePositionInParent(`end`),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(t=>t()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(t){return this.toggle(!0,t)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,`mouse`)}toggle(t=!this.opened,e){t&&e&&(this._openedVia=e);let n=this._setOpen(t,!t&&this._isFocusWithinDrawer(),this._openedVia||`program`);return t||(this._openedVia=null),n}_setOpen(t,e,n){return t===this.opened?Promise.resolve(t?`open`:`close`):(this._opened.set(t),this._getContent()?._drawerToggled(this),this._container?._transitionsEnabled?this._isAnimating?(this._setIsAnimating(!1),this._simulateAnimation()):(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):this._simulateAnimation(),this._elementRef.nativeElement.classList.toggle(`mat-drawer-opened`,t),!t&&e&&this._restoreFocus(n),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(r=>{this.openedChange.pipe(Vn$1(1)).subscribe(o=>r(o?`open`:`close`))}))}_getContent(){return this._container?._content||this._container?._userContent}_setIsAnimating(t){t!==this._isAnimating&&(this._isAnimating=t,this._elementRef.nativeElement.classList.toggle(`mat-drawer-animating`,t))}_simulateAnimation(){setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()})}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(t){if(!this._platform.isBrowser)return;let e=this._elementRef.nativeElement,n=e.parentNode;t===`end`?(this._anchor||(this._anchor=this._doc.createComment(`mat-drawer-anchor`),n.insertBefore(this._anchor,e)),n.appendChild(e)):this._anchor&&this._anchor.parentNode.insertBefore(e,this._anchor)}_handleTransitionEvent=t=>{let e=this._elementRef.nativeElement;t.target===e&&this._ngZone.run(()=>{t.type===`transitionend`&&this._setIsAnimating(!1),this._animationEnd.next(t)})};static ɵfac=function(e){return new(e||i)};static ɵcmp=(function(){let t=[`content`];return bw({type:i,selectors:[[`mat-drawer`]],viewQuery:function(r,o){if(r&1&&Rg(t,5),r&2){let a;lC(a=dC())&&(o._content=a.first)}},hostAttrs:[1,`mat-drawer`],hostVars:12,hostBindings:function(r,o){r&2&&(Eg(`align`,null)(`tabIndex`,o.mode!==`side`?`-1`:null),Lg(`visibility`,!o._container&&!o.opened?`hidden`:null),jg(`mat-drawer-end`,o.position===`end`)(`mat-drawer-over`,o.mode===`over`)(`mat-drawer-push`,o.mode===`push`)(`mat-drawer-side`,o.mode===`side`))},inputs:{position:`position`,mode:`mode`,disableClose:`disableClose`,autoFocus:`autoFocus`,opened:`opened`},outputs:{openedChange:`openedChange`,_openedStream:`opened`,openedStart:`openedStart`,_closedStream:`closed`,closedStart:`closedStart`,onPositionChanged:`positionChanged`},exportAs:[`matDrawer`],ngContentSelectors:[`*`],decls:3,vars:0,consts:[[`content`,``],[`cdkScrollable`,``,1,`mat-drawer-inner-container`]],template:function(r,o){r&1&&(aC(),Es(0,`div`,1,0),cC(2),ll())},dependencies:[Pe],encapsulation:2})})()}return i})();var Kt=(()=>{class i{_dir=m$1(gt$1,{optional:!0});_element=m$1(Sn);_ngZone=m$1(ae$3);_changeDetectorRef=m$1(Tb);_animationDisabled=j$2();_transitionsEnabled=!1;_allDrawers;_drawers=new cs;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(t){this._autosize=Io(t)}_autosize=m$1(le);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(t){this._backdropOverride=t==null?null:Io(t)}_backdropOverride=null;backdropClick=new ut$2;_start=null;_end=null;_left=null;_right=null;_destroyed=new ee$2;_doCheckSubject=new ee$2;_contentMargins={left:null,right:null};_contentMarginChanges=new ee$2;get scrollable(){return this._userContent||this._content}_injector=m$1(pe$2);constructor(){let t=m$1(b$1),e=m$1(Ae$2);this._dir?.change.pipe(ev(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),e.change().pipe(ev(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&t.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add(`mat-drawer-transition`),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(Jy(this._allDrawers),ev(this._destroyed)).subscribe(t=>{this._drawers.reset(t.filter(e=>!e._container||e._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(Jy(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(t=>{this._watchDrawerToggle(t),this._watchDrawerPosition(t),this._watchDrawerMode(t)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe($y(10),ev(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(t=>t.open())}close(){this._drawers.forEach(t=>t.close())}updateContentMargins(){let t=0,e=0;if(this._left&&this._left.opened){if(this._left.mode==`side`)t+=this._left._getWidth();else if(this._left.mode==`push`){let n=this._left._getWidth();t+=n,e-=n}}if(this._right&&this._right.opened){if(this._right.mode==`side`)e+=this._right._getWidth();else if(this._right.mode==`push`){let n=this._right._getWidth();e+=n,t-=n}}t=t||null,e=e||null,(t!==this._contentMargins.left||e!==this._contentMargins.right)&&(this._contentMargins={left:t,right:e},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(t){t._animationStarted.pipe(ev(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),t.mode!==`side`&&t.openedChange.pipe(ev(this._drawers.changes)).subscribe(()=>this._setContainerClass(t.opened))}_watchDrawerPosition(t){t.onPositionChanged.pipe(ev(this._drawers.changes)).subscribe(()=>{ME({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(t){t._modeChanged.pipe(ev(Hy(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(t){let e=this._element.nativeElement.classList,n=`mat-drawer-container-has-open`;t?e.add(n):e.remove(n)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(t=>{t.position==`end`?(this._end,this._end=t):(this._start,this._start=t)}),this._right=this._left=null,this._dir&&this._dir.value===`rtl`?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!=`over`||this._isDrawerOpen(this._end)&&this._end.mode!=`over`}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(t=>t&&!t.disableClose&&this._drawerHasBackdrop(t)).forEach(t=>t._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(t){return t!=null&&t.opened}_drawerHasBackdrop(t){return this._backdropOverride==null?!!t&&t.mode!==`side`:this._backdropOverride}static ɵfac=function(e){return new(e||i)};static ɵcmp=(function(){let t=[[[`mat-drawer`],[`mat-sidenav`]],[[`mat-drawer-content`],[`mat-sidenav-content`]],`*`],e=[`mat-drawer, mat-sidenav`,`mat-drawer-content, mat-sidenav-content`,`*`];function n(o,a){if(o&1){let s=eC();Es(0,`div`,1),Ng(`click`,function(){lf(s);let u=iC();return df(u._onBackdropClicked())}),ll()}if(o&2){let s=iC();jg(`mat-drawer-shown`,s._isShowingBackdrop())}}function r(o,a){o&1&&(Es(0,`mat-drawer-content`),cC(1,2),ll())}return bw({type:i,selectors:[[`mat-drawer-container`]],contentQueries:function(a,s,b){if(a&1&&xg(b,ht,5)(b,Wt,5),a&2){let u;lC(u=dC())&&(s._content=u.first),lC(u=dC())&&(s._allDrawers=u)}},viewQuery:function(a,s){if(a&1&&Rg(ht,5),a&2){let b;lC(b=dC())&&(s._userContent=b.first)}},hostAttrs:[1,`mat-drawer-container`],hostVars:2,hostBindings:function(a,s){a&2&&jg(`mat-drawer-container-explicit-backdrop`,s._backdropOverride)},inputs:{autosize:`autosize`,hasBackdrop:`hasBackdrop`},outputs:{backdropClick:`backdropClick`},exportAs:[`matDrawerContainer`],features:[qC([{provide:qt,useExisting:i}])],ngContentSelectors:e,decls:4,vars:2,consts:[[1,`mat-drawer-backdrop`,3,`mat-drawer-shown`],[1,`mat-drawer-backdrop`,3,`click`]],template:function(a,s){a&1&&(aC(t),Uw(0,n,1,2,`div`,0),cC(1),cC(2,1),Uw(3,r,2,0,`mat-drawer-content`)),a&2&&(zw(s.hasBackdrop?0:-1),ZE(3),zw(s._content?-1:3))},dependencies:[ht],styles:[`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--%NS%mat-sidenav-content-text-color, var(--%NS%mat-sys-on-background));
  background-color: var(--%NS%mat-sidenav-content-background-color, var(--%NS%mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--%NS%mat-sidenav-scrim-color, color-mix(in srgb, var(--%NS%mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--%NS%mat-sidenav-container-text-color, var(--%NS%mat-sys-on-surface-variant));
  box-shadow: var(--%NS%mat-sidenav-container-elevation-shadow, none);
  background-color: var(--%NS%mat-sidenav-container-background-color, var(--%NS%mat-sys-surface));
  border-top-right-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-bottom-right-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  width: var(--%NS%mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-bottom-left-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-bottom-left-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-bottom-right-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--%NS%mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--%NS%mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--%NS%mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--%NS%mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`],encapsulation:2})})()}return i})();var Ct=(()=>{class i extends ht{static ɵfac=(()=>{let t;return function(n){return(t||(t=Pp(i)))(n||i)}})();static ɵcmp=(function(){return bw({type:i,selectors:[[`mat-sidenav-content`]],hostAttrs:[1,`mat-drawer-content`,`mat-sidenav-content`],features:[qC([{provide:Pe,useExisting:i},{provide:ht,useExisting:i}]),pg],ngContentSelectors:[`*`],decls:1,vars:0,template:function(n,r){n&1&&(aC(),cC(0))},encapsulation:2})})()}return i})();var Zt=(()=>{class i extends Wt{get fixedInViewport(){return this._fixedInViewport}set fixedInViewport(t){this._fixedInViewport=Io(t)}_fixedInViewport=!1;get fixedTopGap(){return this._fixedTopGap}set fixedTopGap(t){this._fixedTopGap=wt$1(t)}_fixedTopGap=0;get fixedBottomGap(){return this._fixedBottomGap}set fixedBottomGap(t){this._fixedBottomGap=wt$1(t)}_fixedBottomGap=0;static ɵfac=(()=>{let t;return function(n){return(t||(t=Pp(i)))(n||i)}})();static ɵcmp=(function(){return bw({type:i,selectors:[[`mat-sidenav`]],hostAttrs:[1,`mat-drawer`,`mat-sidenav`],hostVars:16,hostBindings:function(n,r){n&2&&(Eg(`tabIndex`,r.mode!==`side`?`-1`:null)(`align`,null),Lg(`top`,r.fixedInViewport?r.fixedTopGap:null,`px`)(`bottom`,r.fixedInViewport?r.fixedBottomGap:null,`px`),jg(`mat-drawer-end`,r.position===`end`)(`mat-drawer-over`,r.mode===`over`)(`mat-drawer-push`,r.mode===`push`)(`mat-drawer-side`,r.mode===`side`)(`mat-sidenav-fixed`,r.fixedInViewport))},inputs:{fixedInViewport:`fixedInViewport`,fixedTopGap:`fixedTopGap`,fixedBottomGap:`fixedBottomGap`},exportAs:[`matSidenav`],features:[qC([{provide:Wt,useExisting:i}]),pg],ngContentSelectors:[`*`],decls:3,vars:0,consts:[[`content`,``],[`cdkScrollable`,``,1,`mat-drawer-inner-container`]],template:function(n,r){n&1&&(aC(),Es(0,`div`,1,0),cC(2),ll())},dependencies:[Pe],encapsulation:2})})()}return i})();var Gi=(()=>{class i extends Kt{_allDrawers=void 0;_content=void 0;static ɵfac=(()=>{let t;return function(n){return(t||(t=Pp(i)))(n||i)}})();static ɵcmp=(function(){let t=[[[`mat-drawer`],[`mat-sidenav`]],[[`mat-drawer-content`],[`mat-sidenav-content`]],`*`],e=[`mat-drawer, mat-sidenav`,`mat-drawer-content, mat-sidenav-content`,`*`];function n(o,a){if(o&1){let s=eC();Es(0,`div`,1),Ng(`click`,function(){lf(s);let u=iC();return df(u._onBackdropClicked())}),ll()}if(o&2){let s=iC();jg(`mat-drawer-shown`,s._isShowingBackdrop())}}function r(o,a){o&1&&(Es(0,`mat-sidenav-content`),cC(1,2),ll())}return bw({type:i,selectors:[[`mat-sidenav-container`]],contentQueries:function(a,s,b){if(a&1&&xg(b,Ct,5)(b,Zt,5),a&2){let u;lC(u=dC())&&(s._content=u.first),lC(u=dC())&&(s._allDrawers=u)}},hostAttrs:[1,`mat-drawer-container`,`mat-sidenav-container`],hostVars:2,hostBindings:function(a,s){a&2&&jg(`mat-drawer-container-explicit-backdrop`,s._backdropOverride)},exportAs:[`matSidenavContainer`],features:[qC([{provide:qt,useExisting:i},{provide:Kt,useExisting:i}]),pg],ngContentSelectors:e,decls:4,vars:2,consts:[[1,`mat-drawer-backdrop`,3,`mat-drawer-shown`],[1,`mat-drawer-backdrop`,3,`click`]],template:function(a,s){a&1&&(aC(t),Uw(0,n,1,2,`div`,0),cC(1),cC(2,1),Uw(3,r,2,0,`mat-sidenav-content`)),a&2&&(zw(s.hasBackdrop?0:-1),ZE(3),zw(s._content?-1:3))},dependencies:[Ct],styles:[`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--%NS%mat-sidenav-content-text-color, var(--%NS%mat-sys-on-background));
  background-color: var(--%NS%mat-sidenav-content-background-color, var(--%NS%mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--%NS%mat-sidenav-scrim-color, color-mix(in srgb, var(--%NS%mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--%NS%mat-sidenav-container-text-color, var(--%NS%mat-sys-on-surface-variant));
  box-shadow: var(--%NS%mat-sidenav-container-elevation-shadow, none);
  background-color: var(--%NS%mat-sidenav-container-background-color, var(--%NS%mat-sys-surface));
  border-top-right-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-bottom-right-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  width: var(--%NS%mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-bottom-left-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-bottom-left-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-bottom-right-radius: var(--%NS%mat-sidenav-container-shape, var(--%NS%mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--%NS%mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--%NS%mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--%NS%mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--%NS%mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`],encapsulation:2})})()}return i})();var Qi=(()=>{class i{static ɵfac=function(e){return new(e||i)};static ɵmod=Eo({type:i});static ɵinj=qn({imports:[D$1,at$1,D$1]})}return i})();var Hi=(()=>{class i{static ɵfac=function(e){return new(e||i)};static ɵmod=Eo({type:i});static ɵinj=qn({imports:[at$1]})}return i})();var Ui=(()=>{class i{static ɵfac=function(e){return new(e||i)};static ɵmod=Eo({type:i});static ɵinj=qn({imports:[at$1]})}return i})();var me=new w$1(`ListOption`);var Xt=(()=>{class i{_elementRef=m$1(Sn);static ɵfac=function(e){return new(e||i)};static ɵdir=yr({type:i,selectors:[[``,`matListItemTitle`,``]],hostAttrs:[1,`mat-mdc-list-item-title`,`mdc-list-item__primary-text`]})}return i})();var ce=(()=>{class i{_elementRef=m$1(Sn);static ɵfac=function(e){return new(e||i)};static ɵdir=yr({type:i,selectors:[[``,`matListItemLine`,``]],hostAttrs:[1,`mat-mdc-list-item-line`,`mdc-list-item__secondary-text`]})}return i})();var de=(()=>{class i{static ɵfac=function(e){return new(e||i)};static ɵdir=yr({type:i,selectors:[[``,`matListItemMeta`,``]],hostAttrs:[1,`mat-mdc-list-item-meta`,`mdc-list-item__end`]})}return i})();var Wi=(()=>{class i{_listOption=m$1(me,{optional:!0});_isAlignedAtStart(){return!this._listOption||this._listOption?._getTogglePosition()===`after`}static ɵfac=function(e){return new(e||i)};static ɵdir=yr({type:i,hostVars:4,hostBindings:function(e,n){e&2&&jg(`mdc-list-item__start`,n._isAlignedAtStart())(`mdc-list-item__end`,!n._isAlignedAtStart())}})}return i})();var he=(()=>{class i extends Wi{static ɵfac=(()=>{let t;return function(n){return(t||(t=Pp(i)))(n||i)}})();static ɵdir=yr({type:i,selectors:[[``,`matListItemAvatar`,``]],hostAttrs:[1,`mat-mdc-list-item-avatar`],features:[pg]})}return i})();var Yt=(()=>{class i extends Wi{static ɵfac=(()=>{let t;return function(n){return(t||(t=Pp(i)))(n||i)}})();static ɵdir=yr({type:i,selectors:[[``,`matListItemIcon`,``]],hostAttrs:[1,`mat-mdc-list-item-icon`],features:[pg]})}return i})();var pe=new w$1(`MAT_LIST_CONFIG`);var $t=(()=>{class i{_isNonInteractive=!0;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=Io(t)}_disableRipple=!1;get disabled(){return this._disabled()}set disabled(t){this._disabled.set(Io(t))}_disabled=zi(!1);_defaultOptions=m$1(pe,{optional:!0});static ɵfac=function(e){return new(e||i)};static ɵdir=yr({type:i,hostVars:1,hostBindings:function(e,n){e&2&&Eg(`aria-disabled`,n.disabled)},inputs:{disableRipple:`disableRipple`,disabled:`disabled`}})}return i})();var ge=(()=>{class i{_elementRef=m$1(Sn);_ngZone=m$1(ae$3);_listBase=m$1($t,{optional:!0});_platform=m$1(b$1);_hostElement;_isButtonElement;_noopAnimations=j$2();_avatars;_icons;set lines(t){this._explicitLines=wt$1(t,null),this._updateItemLines(!1)}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(t){this._disableRipple=Io(t)}_disableRipple=!1;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(t){this._disabled.set(Io(t))}_disabled=zi(!1);_subscriptions=new ne$2;_rippleRenderer=null;_hasUnscopedTextContent=!1;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){m$1(lt$2).load(Pe$1);let t=m$1(Dt$1,{optional:!0});this.rippleConfig=t||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()===`button`,this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute(`type`)&&this._hostElement.setAttribute(`type`,`button`)}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(!0)}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents()}_hasIconOrAvatar(){return!!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add(`mat-mdc-list-item-interactive`),this._rippleRenderer=new Q(this,this._ngZone,this._hostElement,this._platform,m$1(pe$2)),this._rippleRenderer.setupTriggerEvents(this._hostElement)}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(Hy(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(!1)))})}_updateItemLines(t){if(!this._lines||!this._titles||!this._unscopedContent)return;t&&this._checkDomForUnscopedTextContent();let e=this._explicitLines??this._inferLinesFromContent(),n=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle(`mat-mdc-list-item-single-line`,e<=1),this._hostElement.classList.toggle(`mdc-list-item--with-one-line`,e<=1),this._hostElement.classList.toggle(`mdc-list-item--with-two-lines`,e===2),this._hostElement.classList.toggle(`mdc-list-item--with-three-lines`,e===3),this._hasUnscopedTextContent){let r=this._titles.length===0&&e===1;n.classList.toggle(`mdc-list-item__primary-text`,r),n.classList.toggle(`mdc-list-item__secondary-text`,!r)}else n.classList.remove(`mdc-list-item__primary-text`),n.classList.remove(`mdc-list-item__secondary-text`)}_inferLinesFromContent(){let t=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(t+=1),t}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(t=>t.nodeType!==t.COMMENT_NODE).some(t=>!!(t.textContent&&t.textContent.trim()))}static ɵfac=function(e){return new(e||i)};static ɵdir=yr({type:i,contentQueries:function(e,n,r){if(e&1&&xg(r,he,4)(r,Yt,4),e&2){let o;lC(o=dC())&&(n._avatars=o),lC(o=dC())&&(n._icons=o)}},hostVars:4,hostBindings:function(e,n){e&2&&(Eg(`aria-disabled`,n.disabled)(`disabled`,n._isButtonElement&&n.disabled||null),jg(`mdc-list-item--disabled`,n.disabled))},inputs:{lines:`lines`,disableRipple:`disableRipple`,disabled:`disabled`}})}return i})();var Ki=(()=>{class i extends ge{_lines;_titles;_meta;_unscopedContent;_itemText;get activated(){return this._activated}set activated(t){this._activated=Io(t)}_activated=!1;_getAriaCurrent(){return this._hostElement.nodeName===`A`&&this._activated?`page`:null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}static ɵfac=(()=>{let t;return function(n){return(t||(t=Pp(i)))(n||i)}})();static ɵcmp=(function(){let t=[`unscopedContent`],e=[`text`],n=[[[``,`matListItemAvatar`,``],[``,`matListItemIcon`,``]],[[``,`matListItemTitle`,``]],[[``,`matListItemLine`,``]],`*`,[[``,`matListItemMeta`,``]],[[`mat-divider`]]];return bw({type:i,selectors:[[`mat-list-item`],[`a`,`mat-list-item`,``],[`button`,`mat-list-item`,``]],contentQueries:function(a,s,b){if(a&1&&xg(b,ce,5)(b,Xt,5)(b,de,5),a&2){let u;lC(u=dC())&&(s._lines=u),lC(u=dC())&&(s._titles=u),lC(u=dC())&&(s._meta=u)}},viewQuery:function(a,s){if(a&1&&Rg(t,5)(e,5),a&2){let b;lC(b=dC())&&(s._unscopedContent=b.first),lC(b=dC())&&(s._itemText=b.first)}},hostAttrs:[1,`mat-mdc-list-item`,`mdc-list-item`],hostVars:13,hostBindings:function(a,s){a&2&&(Eg(`aria-current`,s._getAriaCurrent()),jg(`mdc-list-item--activated`,s.activated)(`mdc-list-item--with-leading-avatar`,s._avatars.length!==0)(`mdc-list-item--with-leading-icon`,s._icons.length!==0)(`mdc-list-item--with-trailing-meta`,s._meta.length!==0)(`mat-mdc-list-item-both-leading-and-trailing`,s._hasBothLeadingAndTrailing())(`_mat-animation-noopable`,s._noopAnimations))},inputs:{activated:`activated`},exportAs:[`matListItem`],features:[pg],ngContentSelectors:[`[matListItemAvatar],[matListItemIcon]`,`[matListItemTitle]`,`[matListItemLine]`,`*`,`[matListItemMeta]`,`mat-divider`],decls:10,vars:0,consts:[[`unscopedContent`,``],[1,`mdc-list-item__content`],[1,`mat-mdc-list-item-unscoped-content`,3,`cdkObserveContent`],[1,`mat-focus-indicator`]],template:function(a,s){a&1&&(aC(n),cC(0),Es(1,`span`,1),cC(2,1),cC(3,2),Es(4,`span`,2,0),Ng(`cdkObserveContent`,function(){return s._updateItemLines(!0)}),cC(6,3),ll()(),cC(7,4),cC(8,5),wg(9,`div`,3))},dependencies:[ia],encapsulation:2})})()}return i})();var qi=(()=>{class i extends $t{_isNonInteractive=!1;static ɵfac=(()=>{let t;return function(n){return(t||(t=Pp(i)))(n||i)}})();static ɵcmp=(function(){return bw({type:i,selectors:[[`mat-nav-list`]],hostAttrs:[`role`,`navigation`,1,`mat-mdc-nav-list`,`mat-mdc-list-base`,`mdc-list`],exportAs:[`matNavList`],features:[qC([{provide:$t,useExisting:i}]),pg],ngContentSelectors:[`*`],decls:1,vars:0,template:function(n,r){n&1&&(aC(),cC(0))},styles:[`.mdc-list {
  margin: 0;
  padding: 8px 0;
  list-style-type: none;
}
.mdc-list:focus {
  outline: none;
}

.mdc-list-item {
  display: flex;
  position: relative;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  align-items: stretch;
  cursor: pointer;
  padding-left: 16px;
  padding-right: 16px;
  background-color: var(--%NS%mat-list-list-item-container-color, transparent);
  border-radius: var(--%NS%mat-list-list-item-container-shape, var(--%NS%mat-sys-corner-none));
}
.mdc-list-item.mdc-list-item--selected {
  background-color: var(--%NS%mat-list-list-item-selected-container-color);
}
.mdc-list-item:focus {
  outline: 0;
}
.mdc-list-item.mdc-list-item--disabled {
  cursor: auto;
}
.mdc-list-item.mdc-list-item--with-one-line {
  height: var(--%NS%mat-list-list-item-one-line-container-height, 48px);
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-two-lines {
  height: var(--%NS%mat-list-list-item-two-line-container-height, 64px);
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-three-lines {
  height: var(--%NS%mat-list-list-item-three-line-container-height, 88px);
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--%NS%selected::before, .mdc-list-item.mdc-list-item--%NS%selected:focus::before, .mdc-list-item:not(.mdc-list-item--selected):focus::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  content: "";
  pointer-events: none;
}

a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}

.mdc-list-item__start {
  fill: currentColor;
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--%NS%mat-list-list-item-leading-icon-color, var(--%NS%mat-sys-on-surface-variant));
  width: var(--%NS%mat-list-list-item-leading-icon-size, 24px);
  height: var(--%NS%mat-list-list-item-leading-icon-size, 24px);
  margin-left: 16px;
  margin-right: 32px;
}
[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-left: 32px;
  margin-right: 16px;
}
.mdc-list-item--%NS%with-leading-icon:hover .mdc-list-item__start {
  color: var(--%NS%mat-list-list-item-hover-leading-icon-color);
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start {
  width: var(--%NS%mat-list-list-item-leading-avatar-size, 40px);
  height: var(--%NS%mat-list-list-item-leading-avatar-size, 40px);
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start, [dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start {
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}

.mdc-list-item__end {
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  font-family: var(--%NS%mat-list-list-item-trailing-supporting-text-font, var(--%NS%mat-sys-label-small-font));
  line-height: var(--%NS%mat-list-list-item-trailing-supporting-text-line-height, var(--%NS%mat-sys-label-small-line-height));
  font-size: var(--%NS%mat-list-list-item-trailing-supporting-text-size, var(--%NS%mat-sys-label-small-size));
  font-weight: var(--%NS%mat-list-list-item-trailing-supporting-text-weight, var(--%NS%mat-sys-label-small-weight));
  letter-spacing: var(--%NS%mat-list-list-item-trailing-supporting-text-tracking, var(--%NS%mat-sys-label-small-tracking));
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
  width: var(--%NS%mat-list-list-item-trailing-icon-size, 24px);
  height: var(--%NS%mat-list-list-item-trailing-icon-size, 24px);
}
.mdc-list-item--%NS%with-trailing-icon:hover .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-hover-trailing-icon-color);
}
.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-trailing-supporting-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-selected-trailing-icon-color, var(--%NS%mat-sys-primary));
}

.mdc-list-item__content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  align-self: center;
  flex: 1;
  pointer-events: none;
}
.mdc-list-item--with-two-lines .mdc-list-item__content, .mdc-list-item--with-three-lines .mdc-list-item__content {
  align-self: stretch;
}

.mdc-list-item__primary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: var(--%NS%mat-list-list-item-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-list-list-item-label-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-list-list-item-label-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-list-list-item-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-list-list-item-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-list-list-item-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}
.mdc-list-item:hover .mdc-list-item__primary-text {
  color: var(--%NS%mat-list-list-item-hover-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mdc-list-item:focus .mdc-list-item__primary-text {
  color: var(--%NS%mat-list-list-item-focus-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text, .mdc-list-item--with-three-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}

.mdc-list-item__secondary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 0;
  color: var(--%NS%mat-list-list-item-supporting-text-color, var(--%NS%mat-sys-on-surface-variant));
  font-family: var(--%NS%mat-list-list-item-supporting-text-font, var(--%NS%mat-sys-body-medium-font));
  line-height: var(--%NS%mat-list-list-item-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-list-list-item-supporting-text-size, var(--%NS%mat-sys-body-medium-size));
  font-weight: var(--%NS%mat-list-list-item-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight));
  letter-spacing: var(--%NS%mat-list-list-item-supporting-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
}
.mdc-list-item__secondary-text::before {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-three-lines .mdc-list-item__secondary-text {
  white-space: normal;
  line-height: 20px;
}
.mdc-list-item--with-overline .mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: auto;
}

.mdc-list-item--with-leading-radio.mdc-list-item,
.mdc-list-item--with-leading-checkbox.mdc-list-item,
.mdc-list-item--with-leading-icon.mdc-list-item,
.mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  display: block;
  margin-top: 0;
  line-height: normal;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-trailing-icon.mdc-list-item, [dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item {
  padding-left: 0;
  padding-right: 0;
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 16px;
}

.mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  -webkit-user-select: none;
  user-select: none;
  margin-left: 28px;
  margin-right: 16px;
}
[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 28px;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end {
  display: block;
  line-height: normal;
  align-self: flex-start;
  margin-top: 0;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-leading-radio .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 8px;
  margin-right: 24px;
}
[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,
[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 24px;
  margin-right: 8px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-item--with-trailing-radio.mdc-list-item,
.mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-left: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, [dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-right: 0;
}
.mdc-list-item--with-trailing-radio .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 24px;
  margin-right: 8px;
}
[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,
[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 8px;
  margin-right: 24px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-group__subheader {
  margin: 0.75rem 16px;
}

.mdc-list-item--disabled .mdc-list-item__start,
.mdc-list-item--disabled .mdc-list-item__content,
.mdc-list-item--disabled .mdc-list-item__end {
  opacity: 1;
}
.mdc-list-item--disabled .mdc-list-item__primary-text,
.mdc-list-item--disabled .mdc-list-item__secondary-text {
  opacity: var(--%NS%mat-list-list-item-disabled-label-text-opacity, 0.3);
}
.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--%NS%mat-list-list-item-disabled-leading-icon-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-disabled-leading-icon-opacity, 0.38);
}
.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-disabled-trailing-icon-opacity, 0.38);
}

.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing, [dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing {
  padding-left: 0;
  padding-right: 0;
}

.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text {
  color: var(--%NS%mat-list-list-item-disabled-label-text-color, var(--%NS%mat-sys-on-surface));
}

.mdc-list-item:hover::before {
  background-color: var(--%NS%mat-list-list-item-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}

.mdc-list-item.mdc-list-item--%NS%disabled::before {
  background-color: var(--%NS%mat-list-list-item-disabled-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-disabled-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}

.mdc-list-item:focus::before {
  background-color: var(--%NS%mat-list-list-item-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}

.mdc-list-item--disabled .mdc-radio,
.mdc-list-item--disabled .mdc-checkbox {
  opacity: var(--%NS%mat-list-list-item-disabled-label-text-opacity, 0.3);
}

.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar {
  border-radius: var(--%NS%mat-list-list-item-leading-avatar-shape, var(--%NS%mat-sys-corner-full));
  background-color: var(--%NS%mat-list-list-item-leading-avatar-color, var(--%NS%mat-sys-primary-container));
}

.mat-mdc-list-item-icon {
  font-size: var(--%NS%mat-list-list-item-leading-icon-size, 24px);
}

@media (forced-colors: active) {
  a.mdc-list-item--%NS%activated::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  a.mdc-list-item--activated [dir=rtl]::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-list-base {
  display: block;
}
.mat-mdc-list-base .mdc-list-item__start,
.mat-mdc-list-base .mdc-list-item__end,
.mat-mdc-list-base .mdc-list-item__content {
  pointer-events: auto;
}

.mat-mdc-list-item,
.mat-mdc-list-option {
  width: 100%;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),
.mat-mdc-list-option:not(.mat-mdc-list-item-interactive) {
  cursor: default;
}
.mat-mdc-list-item .mat-divider-inset,
.mat-mdc-list-option .mat-divider-inset {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
.mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-left: 72px;
}
[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-right: 72px;
}

.mat-mdc-list-item-interactive::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  content: "";
  opacity: 0;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-list-item > .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-list-item:focus-visible > .mat-focus-indicator::before {
  content: "";
}

.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: normal;
}
.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

mat-action-list button {
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  -webkit-tap-highlight-color: transparent;
  text-align: start;
}
mat-action-list button::-moz-focus-inner {
  border: 0;
}

.mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-inline-start: var(--%NS%mat-list-list-item-leading-icon-start-space, 16px);
  margin-inline-end: var(--%NS%mat-list-list-item-leading-icon-end-space, 16px);
}

.mat-mdc-nav-list .mat-mdc-list-item {
  border-radius: var(--%NS%mat-list-active-indicator-shape, var(--%NS%mat-sys-corner-full));
  --%NS%mat-focus-indicator-border-radius: var(--%NS%mat-list-active-indicator-shape, var(--%NS%mat-sys-corner-full));
}
.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated {
  background-color: var(--%NS%mat-list-active-indicator-color, var(--%NS%mat-sys-secondary-container));
}
`],encapsulation:2})})()}return i})();var Zi=(()=>{class i{static ɵfac=function(e){return new(e||i)};static ɵmod=Eo({type:i});static ɵinj=qn({imports:[ra,Be$1,x$1,at$1,Ui]})}return i})();var $i=new w$1(`MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS`,{providedIn:`root`,factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})});var Xi=new w$1(`MatButtonToggleGroup`);var ye={provide:M,useExisting:Ii(()=>Jt),multi:!0};var Mt=class{source;value;constructor(d,t){this.source=d,this.value=t}};var Jt=(()=>{class i{_changeDetector=m$1(Tb);_dir=m$1(gt$1,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(t){this._name=t,this._markButtonsForCheck()}_name=m$1(Mt$2).getId(`mat-button-toggle-group-`);vertical=!1;get value(){let t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t.map(e=>e.value):t[0]?t[0].value:void 0}set value(t){this._setSelectionByValue(t),this.valueChange.emit(this.value)}valueChange=new ut$2;get selected(){let t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t:t[0]||null}get multiple(){return this._multiple}set multiple(t){this._multiple=t,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(t){this._disabledInteractive=t,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value===`rtl`?`rtl`:`ltr`}change=new ut$2;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(t){this._hideSingleSelectionIndicator=t,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(t){this._hideMultipleSelectionIndicator=t,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let t=m$1($i,{optional:!0});this.appearance=t&&t.appearance?t.appearance:`standard`,this._hideSingleSelectionIndicator=t?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=t?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new r(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(t=>t.checked)),this.multiple||this._initializeTabIndex()}writeValue(t){this.value=t,this._changeDetector.markForCheck()}registerOnChange(t){this._controlValueAccessorChangeFn=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.disabled=t}_keydown(t){if(this.multiple||this.disabled||Ie$2(t))return;let n=t.target.id,r=this._buttonToggles.toArray().findIndex(a=>a.buttonId===n),o=null;switch(t.keyCode){case 32:case 13:o=this._buttonToggles.get(r)||null;break;case 38:o=this._getNextButton(r,-1);break;case 37:o=this._getNextButton(r,this.dir===`ltr`?-1:1);break;case 40:o=this._getNextButton(r,1);break;case 39:o=this._getNextButton(r,this.dir===`ltr`?1:-1);break;default:return}o&&(t.preventDefault(),o._onButtonClick(),o.focus())}_emitChangeEvent(t){let e=new Mt(t,this.value);this._rawValue=e.value,this._controlValueAccessorChangeFn(e.value),this.change.emit(e)}_syncButtonToggle(t,e,n=!1,r=!1){!this.multiple&&this.selected&&!t.checked&&(this.selected.checked=!1),this._selectionModel?e?this._selectionModel.select(t):this._selectionModel.deselect(t):r=!0,r?Promise.resolve().then(()=>this._updateModelValue(t,n)):this._updateModelValue(t,n)}_isSelected(t){return this._selectionModel&&this._selectionModel.isSelected(t)}_isPrechecked(t){return typeof this._rawValue>`u`?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(e=>t.value!=null&&e===t.value):t.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(t=>{t.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let t=0;t<this._buttonToggles.length;t++){let e=this._buttonToggles.get(t);if(!e.disabled){e.tabIndex=0;break}}}_getNextButton(t,e){let n=this._buttonToggles;for(let r=1;r<=n.length;r++){let o=(t+e*r+n.length)%n.length,a=n.get(o);if(a&&!a.disabled)return a}return null}_setSelectionByValue(t){if(this._rawValue=t,!this._buttonToggles)return;let e=this._buttonToggles.toArray();if(this.multiple&&t?(this._clearSelection(),t.forEach(n=>this._selectValue(n,e))):(this._clearSelection(),this._selectValue(t,e)),!this.multiple&&e.every(n=>n.tabIndex===-1)){for(let n of e)if(!n.disabled){n.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(t=>{t.checked=!1,this.multiple||(t.tabIndex=-1)})}_selectValue(t,e){for(let n of e)if(n.value===t){n.checked=!0,this._selectionModel.select(n),this.multiple||(n.tabIndex=0);break}}_updateModelValue(t,e){e&&this._emitChangeEvent(t),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(t=>t._markForCheck())}static ɵfac=function(e){return new(e||i)};static ɵdir=yr({type:i,selectors:[[`mat-button-toggle-group`]],contentQueries:function(e,n,r){if(e&1&&xg(r,It,5),e&2){let o;lC(o=dC())&&(n._buttonToggles=o)}},hostAttrs:[1,`mat-button-toggle-group`],hostVars:6,hostBindings:function(e,n){e&1&&Ng(`keydown`,function(o){return n._keydown(o)}),e&2&&(Eg(`role`,n.multiple?`group`:`radiogroup`)(`aria-disabled`,n.disabled),jg(`mat-button-toggle-vertical`,n.vertical)(`mat-button-toggle-group-appearance-standard`,n.appearance===`standard`))},inputs:{appearance:`appearance`,name:`name`,vertical:[2,`vertical`,`vertical`,Qj],value:`value`,multiple:[2,`multiple`,`multiple`,Qj],disabled:[2,`disabled`,`disabled`,Qj],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,Qj],hideSingleSelectionIndicator:[2,`hideSingleSelectionIndicator`,`hideSingleSelectionIndicator`,Qj],hideMultipleSelectionIndicator:[2,`hideMultipleSelectionIndicator`,`hideMultipleSelectionIndicator`,Qj]},outputs:{valueChange:`valueChange`,change:`change`},exportAs:[`matButtonToggleGroup`],features:[qC([ye,{provide:Xi,useExisting:i}])]})}return i})();var It=(()=>{class i{_changeDetectorRef=m$1(Tb);_elementRef=m$1(Sn);_focusMonitor=m$1(dt$1);_idGenerator=m$1(Mt$2);_animationDisabled=j$2();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(t){this._tabIndex.set(t)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(t){this._appearance=t}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(t){t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(t){this._disabled=t}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(t){this._disabledInteractive=t}_disabledInteractive;change=new ut$2;constructor(){m$1(lt$2).load(Pe$1);let t=m$1(Xi,{optional:!0}),e=m$1(new am(`tabindex`),{optional:!0})||``,n=m$1($i,{optional:!0});this._tabIndex=zi(parseInt(e)||0),this.buttonToggleGroup=t,this._appearance=n&&n.appearance?n.appearance:`standard`,this._disabledInteractive=n?.disabledInteractive??!1}ngOnInit(){let t=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId(`mat-button-toggle-`),t&&(t._isPrechecked(this)?this.checked=!0:t._isSelected(this)!==this._checked&&t._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add(`mat-button-toggle-animations-enabled`),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let t=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),t&&t._isSelected(this)&&t._syncButtonToggle(this,!1,!1,!0)}focus(t){this._buttonElement.nativeElement.focus(t)}_onButtonClick(){if(this.disabled)return;let t=this.isSingleSelector()?!0:!this._checked;if(t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let e=this.buttonToggleGroup._buttonToggles.find(n=>n.tabIndex===0);e&&(e.tabIndex=-1),this.tabIndex=0}this.change.emit(new Mt(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static ɵfac=function(e){return new(e||i)};static ɵcmp=(function(){let t=[`button`],e=[`*`];function n(r,o){if(r&1&&(Es(0,`div`,2),wg(1,`mat-pseudo-checkbox`,6),ll()),r&2){let a=iC();ZE(),Ig(`disabled`,a.disabled)}}return bw({type:i,selectors:[[`mat-button-toggle`]],viewQuery:function(o,a){if(o&1&&Rg(t,5),o&2){let s;lC(s=dC())&&(a._buttonElement=s.first)}},hostAttrs:[`role`,`presentation`,1,`mat-button-toggle`],hostVars:14,hostBindings:function(o,a){o&1&&Ng(`focus`,function(){return a.focus()}),o&2&&(Eg(`aria-label`,null)(`aria-labelledby`,null)(`id`,a.id)(`name`,null),jg(`mat-button-toggle-standalone`,!a.buttonToggleGroup)(`mat-button-toggle-checked`,a.checked)(`mat-button-toggle-disabled`,a.disabled)(`mat-button-toggle-disabled-interactive`,a.disabledInteractive)(`mat-button-toggle-appearance-standard`,a.appearance===`standard`))},inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],id:`id`,name:`name`,value:`value`,tabIndex:`tabIndex`,disableRipple:[2,`disableRipple`,`disableRipple`,Qj],appearance:`appearance`,checked:[2,`checked`,`checked`,Qj],disabled:[2,`disabled`,`disabled`,Qj],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,Qj]},outputs:{change:`change`},exportAs:[`matButtonToggle`],ngContentSelectors:e,decls:7,vars:13,consts:[[`button`,``],[`type`,`button`,1,`mat-button-toggle-button`,`mat-focus-indicator`,3,`click`,`id`,`disabled`],[1,`mat-button-toggle-checkbox-wrapper`],[1,`mat-button-toggle-label-content`],[1,`mat-button-toggle-focus-overlay`],[`matRipple`,``,1,`mat-button-toggle-ripple`,3,`matRippleTrigger`,`matRippleDisabled`],[`state`,`checked`,`aria-hidden`,`true`,`appearance`,`minimal`,3,`disabled`]],template:function(o,a){if(o&1&&(aC(),Es(0,`button`,1,0),Ng(`click`,function(){return a._onButtonClick()}),Uw(2,n,2,1,`div`,2),Es(3,`span`,3),cC(4),ll()(),wg(5,`span`,4)(6,`span`,5)),o&2){let s=pC(1);Ig(`id`,a.buttonId)(`disabled`,a.disabled&&!a.disabledInteractive||null),Eg(`role`,a.isSingleSelector()?`radio`:`button`)(`tabindex`,a.disabled&&!a.disabledInteractive?-1:a.tabIndex)(`aria-pressed`,a.isSingleSelector()?null:a.checked)(`aria-checked`,a.isSingleSelector()?a.checked:null)(`name`,a._getButtonName())(`aria-label`,a.ariaLabel)(`aria-labelledby`,a.ariaLabelledby)(`aria-disabled`,a.disabled&&a.disabledInteractive?`true`:null),ZE(2),zw(a.buttonToggleGroup&&(!a.buttonToggleGroup.multiple&&!a.buttonToggleGroup.hideSingleSelectionIndicator||a.buttonToggleGroup.multiple&&!a.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),ZE(4),Ig(`matRippleTrigger`,s)(`matRippleDisabled`,a.disableRipple||a.disabled)}},dependencies:[zo,u],styles:[`.mat-button-toggle-standalone,
.mat-button-toggle-group {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--%NS%mat-button-toggle-legacy-shape);
  transform: translateZ(0);
}
.mat-button-toggle-standalone:not([class*=mat-elevation-z]),
.mat-button-toggle-group:not([class*=mat-elevation-z]) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone,
  .mat-button-toggle-group {
    outline: solid 1px;
  }
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
.mat-button-toggle-group-appearance-standard {
  border-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border: solid 1px var(--%NS%mat-button-toggle-divider-color, var(--%NS%mat-sys-outline));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,
.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox {
  --%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--%NS%mat-button-toggle-selected-state-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),
.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {
  box-shadow: none;
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
  .mat-button-toggle-group-appearance-standard {
    outline: 0;
  }
}

.mat-button-toggle-vertical {
  flex-direction: column;
}
.mat-button-toggle-vertical .mat-button-toggle-label-content {
  display: block;
}

.mat-button-toggle {
  white-space: nowrap;
  position: relative;
  color: var(--%NS%mat-button-toggle-legacy-text-color);
  font-family: var(--%NS%mat-button-toggle-legacy-label-text-font);
  font-size: var(--%NS%mat-button-toggle-legacy-label-text-size);
  line-height: var(--%NS%mat-button-toggle-legacy-label-text-line-height);
  font-weight: var(--%NS%mat-button-toggle-legacy-label-text-weight);
  letter-spacing: var(--%NS%mat-button-toggle-legacy-label-text-tracking);
  --%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--%NS%mat-button-toggle-legacy-selected-state-text-color);
}
.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--%NS%mat-button-toggle-legacy-focus-state-layer-opacity);
}
.mat-button-toggle .mat-icon svg {
  vertical-align: top;
}

.mat-button-toggle-checkbox-wrapper {
  display: inline-block;
  justify-content: flex-start;
  align-items: center;
  width: 0;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate3d(0, -50%, 0);
}
[dir=rtl] .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 16px;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: 12px;
}
[dir=rtl] .mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 12px;
}
.mat-button-toggle-checked .mat-button-toggle-checkbox-wrapper {
  width: 18px;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-checkbox-wrapper {
  transition: width 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-checkbox-wrapper {
  transition: none;
}

.mat-button-toggle-checked {
  color: var(--%NS%mat-button-toggle-legacy-selected-state-text-color);
  background-color: var(--%NS%mat-button-toggle-legacy-selected-state-background-color);
}

.mat-button-toggle-disabled {
  pointer-events: none;
  color: var(--%NS%mat-button-toggle-legacy-disabled-state-text-color);
  background-color: var(--%NS%mat-button-toggle-legacy-disabled-state-background-color);
  --%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--%NS%mat-button-toggle-legacy-disabled-state-text-color);
}
.mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: var(--%NS%mat-button-toggle-legacy-disabled-selected-state-background-color);
}

.mat-button-toggle-disabled-interactive {
  pointer-events: auto;
}

.mat-button-toggle-appearance-standard {
  color: var(--%NS%mat-button-toggle-text-color, var(--%NS%mat-sys-on-surface));
  background-color: var(--%NS%mat-button-toggle-background-color, transparent);
  font-family: var(--%NS%mat-button-toggle-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-toggle-label-text-size, var(--%NS%mat-sys-label-large-size));
  line-height: var(--%NS%mat-button-toggle-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-weight: var(--%NS%mat-button-toggle-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  letter-spacing: var(--%NS%mat-button-toggle-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
}
.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: solid 1px var(--%NS%mat-button-toggle-divider-color, var(--%NS%mat-sys-outline));
}
[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: solid 1px var(--%NS%mat-button-toggle-divider-color, var(--%NS%mat-sys-outline));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: none;
  border-top: solid 1px var(--%NS%mat-button-toggle-divider-color, var(--%NS%mat-sys-outline));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-checked {
  color: var(--%NS%mat-button-toggle-selected-state-text-color, var(--%NS%mat-sys-on-secondary-container));
  background-color: var(--%NS%mat-button-toggle-selected-state-background-color, var(--%NS%mat-sys-secondary-container));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled {
  color: var(--%NS%mat-button-toggle-disabled-state-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-toggle-disabled-state-background-color, transparent);
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox {
  --%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--%NS%mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked {
  color: var(--%NS%mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-toggle-disabled-selected-state-background-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: var(--%NS%mat-button-toggle-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
  opacity: var(--%NS%mat-button-toggle-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--%NS%mat-button-toggle-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
@media (hover: none) {
  .mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
    display: none;
  }
}

.mat-button-toggle-label-content {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  padding: 0 16px;
  line-height: var(--%NS%mat-button-toggle-legacy-height);
  position: relative;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
  padding: 0 12px;
  line-height: var(--%NS%mat-button-toggle-height, 40px);
}

.mat-button-toggle-label-content > * {
  vertical-align: middle;
}

.mat-button-toggle-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background-color: var(--%NS%mat-button-toggle-legacy-state-layer-color);
}

@media (forced-colors: active) {
  .mat-button-toggle-checked .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
    opacity: 0.5;
    height: 0;
  }
  .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay {
    opacity: 0.6;
  }
  .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
  }
}
.mat-button-toggle .mat-button-toggle-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-button-toggle-button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  margin: 0;
  font: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-button {
  transition: padding 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-button {
  transition: none;
}
.mat-button-toggle-disabled .mat-button-toggle-button {
  cursor: default;
}
.mat-button-toggle-button::-moz-focus-inner {
  border: 0;
}
.mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 30px;
}
[dir=rtl] .mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 0;
  padding-right: 30px;
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  --%NS%mat-focus-indicator-border-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border-bottom-right-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-left-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-bottom-right-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border-top-left-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}
`],encapsulation:2})})()}return i})();var Yi=(()=>{class i{static ɵfac=function(e){return new(e||i)};static ɵmod=Eo({type:i});static ɵinj=qn({imports:[Be$1,It,at$1]})}return i})();function Se(i,d){if(i&1){let t=eC();Es(0,`mat-button-toggle`,2),Ng(`click`,function(){let n=lf(t).$implicit,r=iC();return df(r.useLanguage(n))}),FC(1),ll()}if(i&2){let t=d.$implicit;Ig(`value`,t),Dg(`aria-label`,t),ZE(),pl(` `,t.toUpperCase(),` `)}}var Tt=class i{currentLang=`es`;languages=[`es`,`en`];translate=m$1(q);useLanguage(d){this.translate.use(d),this.currentLang=d}static ɵfac=function(t){return new(t||i)};static ɵcmp=bw({type:i,selectors:[[`app-language-switcher`]],decls:3,vars:1,consts:[[`appearance`,`standard`,`aria-label`,`Idioma preferido`,`name`,`language`,3,`value`],[3,`value`,`aria-label`],[3,`click`,`value`,`aria-label`]],template:function(t,e){t&1&&(Es(0,`mat-button-toggle-group`,0),qw(1,Se,2,3,`mat-button-toggle`,1,Ww),ll()),t&2&&(Ig(`value`,e.currentLang),ZE(),Zw(e.languages))},dependencies:[Yi,Jt,It],encapsulation:2})};var Ne=(i,d)=>d.labelKey;function Ce(i,d){if(i&1&&(Es(0,`a`,16)(1,`mat-icon`,18),FC(2),ll(),Es(3,`span`,19),FC(4),KC(5,`translate`),ll()()),i&2){let t=iC().$implicit;Ig(`routerLink`,t.link),ZE(2),Gg(t.icon),ZE(2),Gg(JC(5,3,t.labelKey))}}function Me(i,d){if(i&1&&(Es(0,`mat-list-item`,17)(1,`mat-icon`,18),FC(2),ll(),Es(3,`span`,19),FC(4),KC(5,`translate`),ll()()),i&2){let t=iC().$implicit;ZE(2),Gg(t.icon),ZE(2),Gg(JC(5,2,t.labelKey))}}function Ie(i,d){if(i&1&&Uw(0,Ce,6,5,`a`,16)(1,Me,6,4,`mat-list-item`,17),i&2){let t=d.$implicit;zw(t.link?0:1)}}function Te(i,d){i&1&&(Es(0,`mat-nav-list`,4)(1,`a`,20)(2,`mat-icon`,18),FC(3,`settings`),ll(),Es(4,`span`,19),FC(5),KC(6,`translate`),ll()()()),i&2&&(ZE(5),Gg(JC(6,1,`sidebar.payments`)))}function ze(i,d){if(i&1&&wg(0,`img`,7),i&2){let t=iC();Ig(`src`,t.photoUrl(),ah)}}function Le(i,d){if(i&1&&FC(0),i&2){let t=iC();pl(` `,t.initials()||`?`,` `)}}function Ae(i,d){if(i&1&&wg(0,`img`,7),i&2){let t=iC();Ig(`src`,t.photoUrl(),ah)}}function De(i,d){if(i&1&&FC(0),i&2){let t=iC();pl(` `,t.initials()||`?`,` `)}}var zt=class i{static RANCHER_OPTIONS=[{labelKey:`sidebar.home`,icon:`home`,link:`/home`},{labelKey:`sidebar.myCattle`,icon:`pets`,link:`/livestock/animals`},{labelKey:`sidebar.lots`,icon:`inventory_2`,link:`/livestock/lots`},{labelKey:`sidebar.myAppointmentsHealth`,icon:`health_and_safety`,link:`/rancher/appointments`},{labelKey:`sidebar.feeding`,icon:`restaurant`,link:`/livestock/feeding`},{labelKey:`sidebar.reproductive`,icon:`favorite`,link:`/reproductive`},{labelKey:`sidebar.myPayments`,icon:`payments`,link:`/config/payments`},{labelKey:`sidebar.reports`,icon:`bar_chart`,link:`/reports`},{labelKey:`sidebar.alerts`,icon:`notifications`,link:`/notifications`}];static VETERINARIAN_OPTIONS=[{labelKey:`sidebar.vetDashboard`,icon:`home`,link:`/veterinary/dashboard`},{labelKey:`sidebar.vetAppointments`,icon:`event`,link:`/veterinary/appointments`},{labelKey:`sidebar.vetRecords`,icon:`assignment`,link:`/veterinary/records`},{labelKey:`sidebar.vetVaccines`,icon:`vaccines`,link:`/veterinary/vaccines`},{labelKey:`sidebar.vetReports`,icon:`bar_chart`,link:`/veterinary/reports`}];iamStore=m$1(y$1);router=m$1(le$5);session=m$1(S$3);userName=this.session.fullName;userRole=this.session.roleName;initials=this.session.initials;photoUrl=this.session.photoUrl;isVeterinarian=this.session.isVeterinarian;taglineKey=ob(()=>this.isVeterinarian()?`sidebar.vetTagline`:`sidebar.tagline`);options=ob(()=>this.isVeterinarian()?i.VETERINARIAN_OPTIONS:i.RANCHER_OPTIONS);signOut(){this.iamStore.signOut(),this.router.navigateByUrl(`/iam/sign-in`)}static ɵfac=function(t){return new(t||i)};static ɵcmp=bw({type:i,selectors:[[`app-layout`]],decls:56,vars:23,consts:[[1,`sidenav-container`],[`mode`,`side`,`opened`,``,1,`sidenav`],[1,`brand`],[1,`switcher`],[1,`bottom-nav`],[`routerLink`,`/profile`,1,`profile-card`],[1,`avatar`],[`alt`,``,3,`src`],[1,`profile-info`],[1,`topbar`],[1,`topbar-title`],[1,`spacer`],[`routerLink`,`/profile`,1,`topbar-profile`],[`mat-icon-button`,``,`routerLink`,`/notifications`,1,`bell-btn`],[1,`badge-dot`],[`mat-stroked-button`,``,`color`,`primary`,1,`signout-btn`,3,`click`],[`mat-list-item`,``,`routerLinkActive`,`active`,3,`routerLink`],[`aria-disabled`,`true`,1,`disabled`],[`matListItemIcon`,``],[`matListItemTitle`,``],[`mat-list-item`,``,`routerLink`,`/config/payments`,`routerLinkActive`,`active`]],template:function(t,e){t&1&&(Es(0,`mat-sidenav-container`,0)(1,`mat-sidenav`,1)(2,`div`,2)(3,`mat-icon`),FC(4,`agriculture`),ll(),Es(5,`div`)(6,`strong`),FC(7,`Hatarium`),ll(),Es(8,`small`),FC(9),KC(10,`translate`),ll()()(),Es(11,`mat-nav-list`),qw(12,Ie,2,1,null,null,Ne),ll(),Es(14,`div`,3),wg(15,`app-language-switcher`),ll(),Uw(16,Te,7,3,`mat-nav-list`,4),Es(17,`a`,5)(18,`div`,6),Uw(19,ze,1,1,`img`,7)(20,Le,1,1),ll(),Es(21,`div`,8)(22,`strong`),FC(23),ll(),Es(24,`small`),FC(25),ll()()()(),Es(26,`mat-sidenav-content`)(27,`header`,9)(28,`span`,10),FC(29,`Hatarium`),ll(),wg(30,`span`,11),Es(31,`a`,12),KC(32,`translate`),Es(33,`span`,6),Uw(34,Ae,1,1,`img`,7)(35,De,1,1),ll(),Es(36,`span`,8)(37,`strong`),FC(38),KC(39,`translate`),ll(),Es(40,`small`),FC(41),KC(42,`translate`),ll()(),Es(43,`mat-icon`),FC(44,`expand_more`),ll()(),Es(45,`a`,13),KC(46,`translate`),Es(47,`mat-icon`),FC(48,`notifications`),ll(),wg(49,`span`,14),ll(),Es(50,`button`,15),Ng(`click`,function(){return e.signOut()}),Es(51,`mat-icon`),FC(52,`logout`),ll(),FC(53),KC(54,`translate`),ll()(),wg(55,`router-outlet`),ll()()),t&2&&(ZE(9),Gg(JC(10,11,e.taglineKey())),ZE(3),Zw(e.options()),ZE(4),zw(e.isVeterinarian()?-1:16),ZE(3),zw(e.photoUrl()?19:20),ZE(4),Gg(e.userName()),ZE(2),Gg(e.userRole()),ZE(6),Eg(`aria-label`,JC(32,13,`profile.title`)+`: `+e.userName()),ZE(3),zw(e.photoUrl()?34:35),ZE(4),Gg(e.userName()||JC(39,15,`profile.title`)),ZE(3),Gg(e.userRole()||JC(42,17,`profile.account`)),ZE(4),Eg(`aria-label`,JC(46,19,`notifications.title`)),ZE(8),pl(` `,JC(54,21,`auth.signOut`),` `))},dependencies:[Qi,Zt,Gi,Ct,Hi,ie$3,oe$2,Zi,qi,Ki,Yt,Xt,bi,ui,fn$1,dr,Nt$2,To,Tt,tt],styles:[`[_nghost-%COMP%]{display:block;height:100vh;height:100dvh;overflow:hidden}.sidenav-container[_ngcontent-%COMP%]{height:100vh;height:100dvh;width:100%}.sidenav[_ngcontent-%COMP%]{width:250px;height:100vh;height:100dvh;overflow-y:auto;padding:16px 10px;box-sizing:border-box;background:#f1f8f3;border-right:1px solid #d7e8dc}mat-sidenav-content[_ngcontent-%COMP%]{height:100vh;height:100dvh;overflow-y:auto;display:flex;flex-direction:column}.brand[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:0 8px 16px}.brand[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:flex;align-items:baseline;gap:4px;min-width:0;white-space:nowrap}.sidenav[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%], .sidenav[_ngcontent-%COMP%]   [mat-list-item][_ngcontent-%COMP%]{width:100%;margin-bottom:4px;box-sizing:border-box}.active[_ngcontent-%COMP%]{background:#e4f4e8;border-radius:8px;color:#123d2a}.switcher[_ngcontent-%COMP%]{margin-top:24px;padding:0 8px}.disabled[_ngcontent-%COMP%]{opacity:.5;pointer-events:none}.bottom-nav[_ngcontent-%COMP%]{margin-top:16px}.profile-card[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;padding:10px 8px;margin-top:8px;border-radius:10px;text-decoration:none;color:inherit;cursor:pointer}.profile-card[_ngcontent-%COMP%]:hover{background:#0000000a}.avatar[_ngcontent-%COMP%]{width:36px;height:36px;border-radius:50%;background:#07583f;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem}.profile-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;line-height:1.2}.profile-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#666}.topbar[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 20px;background:#fff;border-bottom:1px solid #e0e0e0;position:sticky;top:0;z-index:100}.topbar-title[_ngcontent-%COMP%]{font-weight:600;color:#123d2a}.spacer[_ngcontent-%COMP%]{flex:1 1 auto}.bell-btn[_ngcontent-%COMP%]{position:relative}.badge-dot[_ngcontent-%COMP%]{position:absolute;top:8px;right:8px;width:8px;height:8px;background:#d32f2f;border-radius:50%}.signout-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px}.avatar[_ngcontent-%COMP%]{flex-shrink:0;overflow:hidden}.avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}.profile-info[_ngcontent-%COMP%]{min-width:0;gap:4px}.profile-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.profile-card[_ngcontent-%COMP%]{border:1px solid #d7e8dc;background:#fff}.topbar-profile[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;max-width:290px;padding:7px 12px;border:1px solid #deebe2;border-radius:12px;text-decoration:none;color:#214632;background:#f6faf7}.topbar-profile[_ngcontent-%COMP%]:hover{background:#eaf5ee}.topbar-profile[_ngcontent-%COMP%]:focus-visible{outline:2px solid #168a58;outline-offset:3px}.topbar-profile[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:13px}.topbar-profile[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:11px;color:#73917d}.topbar-profile[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:#799884;flex-shrink:0}@media(max-width:640px){.topbar-title[_ngcontent-%COMP%]{display:none}.topbar-profile[_ngcontent-%COMP%]{max-width:170px;gap:7px;padding:5px 8px}.topbar-profile[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{display:none}}`],changeDetection:1})};var te=async()=>{let i=m$1(y$1),d=m$1(le$5);return await i.ready,i.isAuthenticated()?!0:d.createUrlTree([`/iam/sign-in`])};function Oe(i){return async()=>{let d=m$1(y$1),t=m$1(S$3),e=m$1(le$5);if(await d.ready,await t.roleReady,!d.isAuthenticated())return e.createUrlTree([`/iam/sign-in`]);let n=t.roleCode();return n&&i.includes(n)?!0:e.createUrlTree([`/home`])}}var O=Oe([`VETERINARIAN`,`ADMIN`]);var ie=[{path:``,pathMatch:`full`,redirectTo:`iam/sign-in`},{path:`iam`,loadChildren:()=>import(`./chunk-CRbJ_YxT.js`).then(i=>i.iamRoutes)},{path:`suscripcion`,loadComponent:()=>import(`./chunk-BDSWuX2_.js`).then(i=>i.SubscriptionPaymentView)},{path:``,component:zt,canActivate:[te],children:[{path:`home`,loadComponent:()=>import(`./chunk-CRDJQew9.js`).then(i=>i.Home)},{path:`reproductive`,loadChildren:()=>import(`./chunk-CCJqmB_V.js`).then(i=>i.reproductiveRoutes)},{path:`livestock/animals`,loadComponent:()=>import(`./chunk-BdewvsZZ.js`).then(i=>i.AnimalList)},{path:`livestock/lots`,loadComponent:()=>import(`./chunk-uCt1N4Ia.js`).then(i=>i.LotList)},{path:`livestock/animals/add`,loadComponent:()=>import(`./chunk-xIlpDa0c.js`).then(i=>i.AnimalAdd)},{path:`livestock/animals/:id`,loadComponent:()=>import(`./chunk-D3fr_WL8.js`).then(i=>i.AnimalDetail)},{path:`livestock/feeding`,loadComponent:()=>import(`./chunk-D1gpbw68.js`).then(i=>i.FeedingDashboard)},{path:`livestock/feeding/add`,loadComponent:()=>import(`./chunk-DRR9YfdD.js`).then(i=>i.FeedingPlanCreate)},{path:`livestock/feeding/:id`,loadComponent:()=>import(`./chunk-DtecgduQ.js`).then(i=>i.FeedingPlanDetail)},{path:`rancher/appointments`,loadComponent:()=>import(`./chunk-CmGB-guQ.js`).then(i=>i.RancherAppointmentsComponent)},{path:`rancher/appointments/new`,loadComponent:()=>import(`./chunk-CLmidLA8.js`).then(i=>i.RancherAppointmentFormComponent)},{path:`profile`,loadComponent:()=>import(`./chunk-C8EBXBs6.js`).then(i=>i.ProfileView)},{path:`notifications`,loadComponent:()=>import(`./chunk-Ci93aL7n.js`).then(i=>i.NotificationCenterView)},{path:`veterinary/dashboard`,loadComponent:()=>import(`./chunk-BJnJWmPo.js`).then(i=>i.VeterinaryDashboardComponent),canActivate:[O]},{path:`veterinary/appointments`,loadComponent:()=>import(`./chunk-BNKrE3To.js`).then(i=>i.AppointmentCalendarComponent),canActivate:[O]},{path:`veterinary/appointments/new`,loadComponent:()=>import(`./chunk-DckSul8H.js`).then(i=>i.AppointmentFormComponent),canActivate:[O]},{path:`veterinary/appointments/:id`,loadComponent:()=>import(`./chunk-BChmcacc.js`).then(i=>i.AppointmentDetailComponent),canActivate:[O]},{path:`veterinary/history/new`,loadComponent:()=>import(`./chunk-CXTBDMH5.js`).then(i=>i.ClinicalHistoryComponent),canActivate:[O]},{path:`veterinary/treatments/new`,loadComponent:()=>import(`./chunk-ipHL18fC.js`).then(i=>i.TreatmentListComponent),canActivate:[O]},{path:`veterinary/vaccines`,loadComponent:()=>import(`./chunk-BllAwOxu.js`).then(i=>i.VaccineCenterComponent),canActivate:[O]},{path:`veterinary/vaccines/new`,loadComponent:()=>import(`./chunk-BRTw6yzA.js`).then(i=>i.VaccineRecordComponent),canActivate:[O]},{path:`veterinary/records`,loadComponent:()=>import(`./chunk-BLfCCL6j.js`).then(i=>i.SanitaryHistoryComponent),canActivate:[O]},{path:`veterinary/reports`,loadComponent:()=>import(`./chunk-DMNiysKb.js`).then(i=>i.VeterinaryReportsComponent),canActivate:[O]},{path:`reports`,loadComponent:()=>import(`./chunk-K9l04xGt.js`).then(i=>i.ReportsDashboard)},{path:`reports/results`,loadComponent:()=>import(`./chunk-BMLgjkvg.js`).then(i=>i.ReportsResults)},{path:`config/payments`,loadChildren:()=>import(`./chunk-CjjORJSv.js`).then(i=>i.paymentsRoutes)},{path:``,redirectTo:`home`,pathMatch:`full`}]},{path:`**`,redirectTo:`iam/sign-in`}];var ne=new w$1(`TRANSLATE_HTTP_LOADER_CONFIG`);var Ee=(()=>{class i{http;config;constructor(){this.config=l$1({resources:[],enforceLoading:!1,useHttpBackend:!1},m$1(ne)),this.http=this.config.useHttpBackend?new dy(m$1(zl)):m$1(dy)}getTranslation(t){let e=this.config.enforceLoading?`?enforceLoading=${Date.now()}`:``,n=this.config.resources.map(r=>{let o=typeof r==`string`?`${r}${t}.json`:`${r.prefix}${t}${r.suffix??`.json`}`,a=this.http.get(`${o}${e}`);return this.config.failOnError?a:a.pipe(ma(s=>(console.warn(`@ngx-translate/http-loader: error loading translation for ${t}:`,s),ga({}))))});return n.length===0?ga({}):Fy(n).pipe(le$4(r=>r.reduce((o,a)=>J(o,a),{})))}static ɵfac=function(e){return new(e||i)};static ɵprov=R$2({token:i,factory:i.ɵfac})}return i})();function ae(i={}){if(`resources`in i&&i.resources)return ee(i);let d=i;return ee({enforceLoading:d.enforceLoading??!1,useHttpBackend:d.useHttpBackend??!1,failOnError:d.failOnError??!1,resources:[{prefix:d.prefix??`/assets/i18n/`,suffix:d.suffix??`.json`}]})}function ee(i={}){return[{provide:ne,useValue:l$1({resources:[`/assets/i18n/`]},i)},{provide:S,useClass:Ee}]}var re={providers:[Uv(),_o(ie),oS(iS([nt$2])),nt({loader:ae({prefix:`./i18n/`,suffix:`.json`}),fallbackLang:`es`})]};var Lt=class i{static ɵfac=function(t){return new(t||i)};static ɵcmp=bw({type:i,selectors:[[`app-root`]],decls:1,vars:0,template:function(t,e){t&1&&wg(0,`router-outlet`)},dependencies:[dr],styles:[`[_nghost-%COMP%]{display:block;min-height:100dvh}`]})};RT(Lt,re).catch(i=>console.error(i));export{j$2 as $,z as A,At$1 as B,cn as C,pn as D,ht$1 as E,Pe as F,Mt$2 as G,Hn as H,We$1 as I,b$1 as J,Pe$1 as K,r as L,Ae$2 as M,D$1 as N,vn as O,E as P,ia as Q,u as R,bt as S,gn as T,Ie$2 as U,Be$1 as V,Io as W,bo as X,bi as Y,fn$1 as Z,Xt$1 as _,C as a,ra as at,_$1 as b,It$1 as c,wo as ct,M as d,S$3 as dt,je as et,P as f,a as ft,Xn as g,Wt$1 as h,tt as i,on$1 as it,zn as j,ye$2 as k,Jn as l,y as lt,Wn as m,y$1 as mt,p as n,lo as nt,Ct$1 as o,so as ot,Qn as p,p$1 as pt,S$2 as q,q as r,nn$1 as rt,Dn as s,ui as st,$e as t,kt$1 as tt,Kn as u,zo as ut,Ze as v,er as w,an as x,Zn as y,x$1 as z};