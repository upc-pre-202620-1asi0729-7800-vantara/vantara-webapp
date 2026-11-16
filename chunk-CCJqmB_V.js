import{$t as bu,B as KC,Bn as m,C as Fy,Ct as Uw,En as iC,Et as Wg,Fn as lC,Fr as l,G as LH,Gt as aC,I as JC,Jn as ob,Jt as am,K as LI,Kt as ae,Ln as le,Lt as ZE,M as Ig,Mt as YC,N as Ii,Nr as zw,Or as ze,Q as Ng,Qn as pl,S as FI,Ut as _g,V as Kj,Vt as Zw,Wn as my,Xt as bf,Yn as pC,Yt as bC,_ as Eg,_r as w,bt as UC,cn as dC,d as Cf,en as bw,er as qC,hn as eb,hr as ut,ht as Sn$1,ir as qw,j as Id,kn as jg,kr as zi,pn as dy,pt as Rg,q as Lg,rr as qn,st as Qj,tn as cC,u as Ce$1,v as Eo,vt as Tb,w as Gg,x as FC,y as Es,yr as wg,zn as ll,zt as Zg}from"./chunk-BiFATNB0.js";import{o as le$1,t as Nt}from"./chunk-C7E0xfVd.js";import{a as ie,n as at,o as lt,s as oe}from"./chunk-DNonDsop.js";import{$ as j,C as cn$1,E as ht,G as Mt,K as Pe,T as gn$1,Y as bi,Z as fn$1,a as C,d as M,g as Xn,h as Wt,i as tt,j as zn$1,k as ye,m as Wn,n as p,o as Ct,p as Qn,r as q,rt as nn,s as Dn$1,st as ui,ut as zo,v as Ze$1,w as er}from"./main-ZNCIW5UP.js";import{a as w$1,n as P,r as S,t as N}from"./chunk-wNgMbRN1.js";import"./chunk-CN23X-sO.js";import"./chunk-BprH2XFg.js";import{c as ie$1,n as Xe$1,s as ht$1,t as Vn,u as mt}from"./chunk-CgV2JB35.js";import{n as lo,r as ro,t as Ce$2}from"./chunk-DG_n5Neo.js";import{n as Pe$1,t as Be}from"./chunk-DzSqf84A.js";import{a as z,i as k,n as T,r as _,t as A}from"./chunk-ClPaVJBQ.js";var qe=class{id;animalId;calfId;confirmedOn;expectedCalvingOn;endedOn;outcome;birthWeightKg;dryOffOn;weanedOn;weaningWeightKg;status;notes;constructor(){this.id=``,this.animalId=``,this.calfId=null,this.confirmedOn=``,this.expectedCalvingOn=null,this.endedOn=null,this.outcome=null,this.birthWeightKg=null,this.dryOffOn=null,this.weanedOn=null,this.weaningWeightKg=null,this.status=``,this.notes=null}hasCalvingResult(){return this.outcome!=null&&this.outcome!==``}};var Ve=class o{toEntityFromResource(i){let e=new qe;return e.id=String(i.id),e.animalId=i.animalId,e.calfId=i.calfId??null,e.confirmedOn=i.confirmedOn,e.expectedCalvingOn=i.expectedCalvingOn??null,e.endedOn=i.calvedOn??null,e.outcome=i.outcome??null,e.birthWeightKg=i.birthWeightKg==null?null:String(i.birthWeightKg),e.dryOffOn=i.dryOffOn??null,e.weanedOn=i.weanedOn??null,e.weaningWeightKg=i.weaningWeightKg==null?null:String(i.weaningWeightKg),e.status=i.status,e.notes=null,e}toEntitiesFromResponse(i){return i.map(e=>this.toEntityFromResource(e))}static ɵfac=function(e){return new(e||o)};static ɵprov=ze({token:o,factory:o.ɵfac})};var U=class o{baseUrl=LH.vantaraBackendBaseUrl;pregnanciesEndpoint=`/reproductive-records`;animalsEndpoint=`/animals`;medicalRecordsEndpoint=`/medicalRecords`;http=m(dy);pregnancyAssembler=m(Ve);getAnimals(){return this.http.get(`${this.baseUrl}${this.animalsEndpoint}`)}getPregnancy(i){return this.http.get(`${this.baseUrl}${this.pregnanciesEndpoint}/${Number(i)}`).pipe(le(e=>this.pregnancyAssembler.toEntityFromResource(e)))}getHistory(i){let e=i?{params:{animalId:i}}:{};return this.http.get(`${this.baseUrl}${this.pregnanciesEndpoint}`,e).pipe(le(c=>this.pregnancyAssembler.toEntitiesFromResponse(c)))}getSummary(){return Fy({animals:this.http.get(`${this.baseUrl}${this.animalsEndpoint}`),pregnancies:this.http.get(`${this.baseUrl}${this.pregnanciesEndpoint}`),medicalRecords:this.http.get(`${this.baseUrl}${this.medicalRecordsEndpoint}`)}).pipe(le(({animals:i,pregnancies:e,medicalRecords:c})=>{let b=i.filter(s=>s.status===`active`),u=b.filter(s=>s.sex.toLocaleLowerCase()===`hembra`&&!N(s.birthDate)),p=new Set(u.map(s=>s.id)),E=e.filter(s=>p.has(s.animalId)&&s.calvedOn==null&&s.status!==`weaned`),O=[...new Map([...E].sort((s,C)=>s.confirmedOn.localeCompare(C.confirmedOn)).map(s=>[s.animalId,s])).values()],P=new Date;P.setHours(0,0,0,0);let Q=new Date(P);Q.setMonth(Q.getMonth()+2);let g=O.filter(s=>{if(!s.expectedCalvingOn)return!1;let C=new Date(`${s.expectedCalvingOn}T00:00:00`);return C>=P&&C<=Q}).length,Se=new Set(c.filter(s=>s.healthStatus===`follow_up`&&p.has(s.animalId)).map(s=>s.animalId)),Me=new Set([...Se].filter(s=>!O.some(C=>C.animalId===s))),dt=new Set(O.map(s=>s.animalId)),tn=u.filter(s=>!dt.has(s.id)&&!Me.has(s.id)).length,lt=new Map(u.map(s=>[s.id,s])),nn=O.filter(s=>s.expectedCalvingOn?new Date(`${s.expectedCalvingOn}T00:00:00`)>=P:!1).map(s=>{let C=lt.get(s.animalId);return{id:`calving-${s.id}`,type:`calving`,animalLabel:C?`${C.name} \xB7 #${C.earTag}`:`#${s.animalId}`,animalBreed:C?.breed??``,scheduledOn:s.expectedCalvingOn}}).sort((s,C)=>s.scheduledOn.localeCompare(C.scheduledOn)),Ee=[];return e.filter(s=>p.has(s.animalId)).forEach(s=>{let C=lt.get(s.animalId),De={animalLabel:C?`${C.name} \xB7 #${C.earTag}`:`#${s.animalId}`,animalBreed:C?.breed??``};s.confirmedOn&&Ee.push(l({id:`pregnancy-${s.id}`,type:`pregnancy`,occurredOn:s.confirmedOn,status:`confirmed`},De)),s.calvedOn&&Ee.push(l({id:`calving-${s.id}`,type:`calving`,occurredOn:s.calvedOn,status:`completed`},De)),s.dryOffOn&&Ee.push(l({id:`dry-off-${s.id}`,type:`dryOff`,occurredOn:s.dryOffOn,status:`registered`},De)),s.weanedOn&&Ee.push(l({id:`weaning-${s.id}`,type:`weaning`,occurredOn:s.weanedOn,status:`completed`},De))}),Ee.sort((s,C)=>C.occurredOn.localeCompare(s.occurredOn)),{reproductiveFemales:u.length,calfCount:b.filter(s=>N(s.birthDate)).length,reproductiveFemalePercentage:this.percentage(u.length,b.length),pregnantFemales:O.length,pregnantPercentage:this.percentage(O.length,u.length),upcomingCalvings:g,followUpRequired:Se.size,statusDistribution:{pregnant:dt.size,vacant:tn,inHeat:0,issues:Me.size},upcomingEvents:nn,recentEvents:Ee}}))}confirm(i){let e={animalId:i.animalId,confirmedOn:i.confirmedOn,expectedCalvingOn:i.expectedCalvingOn??null};return this.http.post(`${this.baseUrl}${this.pregnanciesEndpoint}`,e).pipe(le(c=>this.pregnancyAssembler.toEntityFromResource(c)))}recordCalving(i,e,c,b){return this.http.post(`${this.baseUrl}${this.pregnanciesEndpoint}/${Number(i)}/calvings`,l({calvedOn:e,outcome:c},b?{calf:{name:b.name,earTag:b.earTag,sex:b.sex,weightKg:b.weight}}:{})).pipe(le(u=>this.pregnancyAssembler.toEntityFromResource(u)))}recordDryOff(i,e){return this.http.post(`${this.baseUrl}${this.pregnanciesEndpoint}/${Number(i)}/dry-offs`,{dryOffOn:e}).pipe(le(c=>this.pregnancyAssembler.toEntityFromResource(c)))}recordWeaning(i,e,c){return this.http.post(`${this.baseUrl}${this.pregnanciesEndpoint}/${Number(i)}/weanings`,{weanedOn:e,weaningWeightKg:c?Number(c):null}).pipe(le(b=>this.pregnancyAssembler.toEntityFromResource(b)))}percentage(i,e){return e===0?0:Math.round(i/e*1e3)/10}static ɵfac=function(e){return new(e||o)};static ɵprov=ze({token:o,factory:o.ɵfac})};var Qt={reproductiveFemales:0,calfCount:0,reproductiveFemalePercentage:0,pregnantFemales:0,pregnantPercentage:0,upcomingCalvings:0,followUpRequired:0,statusDistribution:{pregnant:0,vacant:0,inHeat:0,issues:0},upcomingEvents:[],recentEvents:[]};var G=class o{pregnanciesSignal=zi([]);selectedAnimalIdSignal=zi(null);loadingSignal=zi(!1);errorMessageSignal=zi(null);summarySignal=zi(Qt);summaryLoadingSignal=zi(!1);summaryErrorSignal=zi(null);reproductiveApi=m(U);pregnancies=ob(()=>this.pregnanciesSignal());selectedAnimalId=ob(()=>this.selectedAnimalIdSignal());loading=ob(()=>this.loadingSignal());errorMessage=ob(()=>this.errorMessageSignal());summary=ob(()=>this.summarySignal());summaryLoading=ob(()=>this.summaryLoadingSignal());summaryError=ob(()=>this.summaryErrorSignal());loadSummary(){this.summaryLoadingSignal.set(!0),this.summaryErrorSignal.set(null),this.reproductiveApi.getSummary().subscribe({next:i=>{this.summarySignal.set(i),this.summaryLoadingSignal.set(!1)},error:()=>{this.summaryErrorSignal.set(`No se pudo cargar el resumen reproductivo.`),this.summaryLoadingSignal.set(!1)}})}loadHistory(i){this.loadingSignal.set(!0),this.errorMessageSignal.set(null),this.reproductiveApi.getHistory(i).subscribe({next:e=>{this.pregnanciesSignal.set(e),this.loadingSignal.set(!1)},error:()=>{this.errorMessageSignal.set(`No se pudo cargar el historial reproductivo.`),this.loadingSignal.set(!1)}})}confirm(i){this.reproductiveApi.confirm(i).subscribe({next:e=>{this.pregnanciesSignal.update(c=>[...c,e]),this.loadSummary()},error:()=>this.errorMessageSignal.set(`No se pudo confirmar la preñez.`)})}recordCalving(i,e,c){this.reproductiveApi.recordCalving(i,e,c).subscribe({next:b=>this.replacePregnancy(b),error:()=>this.errorMessageSignal.set(`No se pudo registrar el parto.`)})}recordDryOff(i,e){return this.reproductiveApi.recordDryOff(i,e).pipe(Id(c=>this.replacePregnancy(c)))}recordWeaning(i,e,c){this.reproductiveApi.recordWeaning(i,e,c).subscribe({next:b=>this.replacePregnancy(b),error:()=>this.errorMessageSignal.set(`No se pudo registrar el destete.`)})}replacePregnancy(i){this.pregnanciesSignal.update(e=>e.map(c=>c.id===i.id?i:c)),this.loadSummary()}static ɵfac=function(e){return new(e||o)};static ɵprov=ze({token:o,factory:o.ɵfac})};var an=o=>({count:o});var Yt=(o,i)=>i.id;function rn(o,i){o&1&&(Es(0,`p`,9),FC(1),KC(2,`translate`),ll()),o&2&&(ZE(),Gg(JC(2,1,`dashboard.summary.loadError`)))}function on(o,i){if(o&1&&(Es(0,`div`,25)(1,`div`,32)(2,`mat-icon`),FC(3,`pets`),ll()(),Es(4,`div`,33)(5,`strong`),FC(6),KC(7,`translate`),ll(),Es(8,`span`),FC(9),ll()(),Es(10,`time`),FC(11),ll(),Es(12,`span`,34),FC(13),KC(14,`translate`),ll()()),o&2){let e=i.$implicit,c=iC();ZE(6),Gg(JC(7,6,`dashboard.upcomingEvents.estimatedCalving`)),ZE(3),Wg(``,e.animalLabel,` · `,e.animalBreed),ZE(),Eg(`datetime`,e.scheduledOn),ZE(),pl(` `,c.formatEventDate(e.scheduledOn),` `),ZE(2),pl(` `,JC(14,8,`dashboard.upcomingEvents.upcoming`),` `)}}function cn(o,i){o&1&&(Es(0,`div`,26)(1,`mat-icon`,35),FC(2,`event_available`),ll(),Es(3,`p`),FC(4),KC(5,`translate`),ll()()),o&2&&(ZE(4),Gg(JC(5,1,`dashboard.upcomingEvents.empty`)))}function dn(o,i){if(o&1&&(Es(0,`tr`)(1,`td`)(2,`time`),FC(3),ll()(),Es(4,`td`)(5,`div`,36)(6,`mat-icon`,35),FC(7,`pets`),ll(),Es(8,`span`)(9,`strong`),FC(10),ll(),Es(11,`small`),FC(12),ll()()()(),Es(13,`td`),FC(14),KC(15,`translate`),ll(),Es(16,`td`),FC(17),KC(18,`translate`),ll(),Es(19,`td`)(20,`span`,37),FC(21),KC(22,`translate`),ll()()()),o&2){let e=i.$implicit,c=iC();ZE(2),Eg(`datetime`,e.occurredOn),ZE(),pl(` `,c.formatEventDate(e.occurredOn),` `),ZE(7),Gg(e.animalLabel),ZE(2),Gg(e.animalBreed),ZE(2),Gg(JC(15,7,`dashboard.recentEvents.types.`+e.type)),ZE(3),Gg(JC(18,9,`dashboard.recentEvents.details.`+e.type)),ZE(4),pl(` `,JC(22,11,`dashboard.recentEvents.statuses.`+e.status),` `)}}function ln(o,i){o&1&&(Es(0,`tr`)(1,`td`,38),FC(2),KC(3,`translate`),ll()()),o&2&&(ZE(2),pl(` `,JC(3,1,`dashboard.recentEvents.empty`),` `))}var Ue=class o{store=m(G);translate=m(q);reproductiveChartBackground=ob(()=>{let i=this.store.summary(),e=i.reproductiveFemales;if(e===0)return`#c8d8cc`;let c=i.statusDistribution.pregnant/e*100,b=c+i.statusDistribution.vacant/e*100,u=b+i.statusDistribution.inHeat/e*100;return`conic-gradient(
      #168a58 0% ${c}%,
      #83c9a4 ${c}% ${b}%,
      #e3a82f ${b}% ${u}%,
      #d95b64 ${u}% 100%
    )`});ngOnInit(){this.store.loadSummary()}statusPercentage(i){let e=this.store.summary().reproductiveFemales;return e===0?0:Math.round(i/e*1e3)/10}formatEventDate(i){let e=this.translate.currentLang()===`en`?`en-US`:`es-PE`;return new Intl.DateTimeFormat(e,{day:`2-digit`,month:`short`,year:`numeric`}).format(new Date(`${i}T00:00:00`))}static ɵfac=function(e){return new(e||o)};static ɵcmp=bw({type:o,selectors:[[`app-reproduction-dashboard`]],decls:192,vars:135,consts:[[1,`dashboard-header`],[`mat-raised-button`,``,`color`,`primary`,`routerLink`,`/reproductive/new-event-reproductive`],[1,`summary-grid`],[1,`summary-card`,`summary-card--females`],[`aria-hidden`,`true`,1,`summary-card__icon`],[1,`summary-card`,`summary-card--pregnant`],[`aria-hidden`,`true`,1,`summary-progress`],[1,`summary-card`,`summary-card--calvings`],[1,`summary-card`,`summary-card--follow-up`],[`role`,`alert`,1,`summary-error`],[1,`dashboard-insights`],[1,`insight-card`,`insight-card--status`],[1,`insight-card__header`],[1,`status-content`],[1,`donut-chart`],[1,`donut-chart__center`],[1,`status-legend`],[1,`status-legend__row`],[1,`status-legend__label`],[1,`status-dot`,`status-dot--pregnant`],[1,`status-dot`,`status-dot--vacant`],[1,`status-dot`,`status-dot--heat`],[1,`status-dot`,`status-dot--issues`],[1,`insight-card`,`insight-card--events`],[1,`events-preview`],[1,`event-row`],[1,`events-empty`],[1,`recent-events-card`],[1,`recent-events-card__header`],[1,`recent-events-table-wrap`],[1,`recent-events-table`],[1,`recent-events-card__footer`],[`aria-hidden`,`true`,1,`event-row__icon`],[1,`event-row__description`],[1,`event-row__status`],[`aria-hidden`,`true`],[1,`animal-cell`],[1,`event-status`],[`colspan`,`5`,1,`recent-events-empty`]],template:function(e,c){e&1&&(Es(0,`header`,0)(1,`div`)(2,`h1`),FC(3),KC(4,`translate`),ll(),Es(5,`p`),FC(6),KC(7,`translate`),ll(),Es(8,`p`),FC(9),KC(10,`translate`),ll()(),Es(11,`a`,1)(12,`mat-icon`),FC(13,`add`),ll(),FC(14),KC(15,`translate`),ll()(),Es(16,`section`,2),KC(17,`translate`),Es(18,`article`,3)(19,`div`,4)(20,`mat-icon`),FC(21,`female`),ll()(),Es(22,`h2`),FC(23),KC(24,`translate`),ll(),Es(25,`strong`),FC(26),ll(),Es(27,`p`),FC(28),KC(29,`translate`),ll()(),Es(30,`article`,5)(31,`div`,4)(32,`mat-icon`),FC(33,`favorite`),ll()(),Es(34,`h2`),FC(35),KC(36,`translate`),ll(),Es(37,`strong`),FC(38),ll(),Es(39,`p`),FC(40),KC(41,`translate`),ll(),Es(42,`div`,6),wg(43,`span`),ll()(),Es(44,`article`,7)(45,`div`,4)(46,`mat-icon`),FC(47,`calendar_month`),ll()(),Es(48,`h2`),FC(49),KC(50,`translate`),ll(),Es(51,`strong`),FC(52),ll(),Es(53,`p`),FC(54),KC(55,`translate`),ll()(),Es(56,`article`,8)(57,`div`,4)(58,`mat-icon`),FC(59,`warning_amber`),ll()(),Es(60,`h2`),FC(61),KC(62,`translate`),ll(),Es(63,`strong`),FC(64),ll(),Es(65,`p`),FC(66),KC(67,`translate`),ll()()(),Uw(68,rn,3,3,`p`,9),Es(69,`section`,10)(70,`article`,11)(71,`header`,12)(72,`div`)(73,`h2`),FC(74),KC(75,`translate`),ll(),Es(76,`p`),FC(77),KC(78,`translate`),ll()()(),Es(79,`div`,13)(80,`div`,14)(81,`div`,15)(82,`strong`),FC(83),ll(),Es(84,`span`),FC(85),KC(86,`translate`),ll()()(),Es(87,`div`,16)(88,`div`,17)(89,`span`,18),wg(90,`i`,19),FC(91),KC(92,`translate`),ll(),Es(93,`strong`),FC(94),ll(),Es(95,`span`),FC(96),ll()(),Es(97,`div`,17)(98,`span`,18),wg(99,`i`,20),FC(100),KC(101,`translate`),ll(),Es(102,`strong`),FC(103),ll(),Es(104,`span`),FC(105),ll()(),Es(106,`div`,17)(107,`span`,18),wg(108,`i`,21),FC(109),KC(110,`translate`),ll(),Es(111,`strong`),FC(112),ll(),Es(113,`span`),FC(114),ll()(),Es(115,`div`,17)(116,`span`,18),wg(117,`i`,22),FC(118),KC(119,`translate`),ll(),Es(120,`strong`),FC(121),ll(),Es(122,`span`),FC(123),ll()(),Es(124,`div`,17)(125,`span`),FC(126),KC(127,`translate`),ll(),Es(128,`strong`),FC(129),ll(),Es(130,`span`),FC(131),ll()(),Es(132,`div`,17)(133,`span`),FC(134),KC(135,`translate`),ll(),Es(136,`strong`),FC(137),ll(),Es(138,`span`),FC(139),ll()()()(),Es(140,`p`),FC(141),KC(142,`translate`),ll()(),Es(143,`article`,23)(144,`header`,12)(145,`div`)(146,`h2`),FC(147),KC(148,`translate`),ll(),Es(149,`p`),FC(150),KC(151,`translate`),ll()()(),Es(152,`div`,24),qw(153,on,15,10,`div`,25,Yt,!1,cn,6,3,`div`,26),ll()()(),Es(156,`section`,27)(157,`header`,28)(158,`div`)(159,`h2`),FC(160),KC(161,`translate`),ll(),Es(162,`p`),FC(163),KC(164,`translate`),ll()()(),Es(165,`div`,29)(166,`table`,30)(167,`thead`)(168,`tr`)(169,`th`),FC(170),KC(171,`translate`),ll(),Es(172,`th`),FC(173),KC(174,`translate`),ll(),Es(175,`th`),FC(176),KC(177,`translate`),ll(),Es(178,`th`),FC(179),KC(180,`translate`),ll(),Es(181,`th`),FC(182),KC(183,`translate`),ll()()(),Es(184,`tbody`),qw(185,dn,23,13,`tr`,null,Yt,!1,ln,4,3,`tr`),ll()()(),Es(188,`footer`,31),FC(189),KC(190,`translate`),KC(191,`translate`),ll()()),e&2&&(ZE(3),Gg(JC(4,64,`dashboard.title`)),ZE(3),Gg(JC(7,66,`dashboard.subtitle`)),ZE(3),Gg(eb(10,68,`calf.count`,YC(133,an,c.store.summary().calfCount))),ZE(5),pl(` `,JC(15,71,`dashboard.registerEvent`),` `),ZE(2),Eg(`aria-label`,JC(17,73,`dashboard.summary.ariaLabel`))(`aria-busy`,c.store.summaryLoading()),ZE(7),Gg(JC(24,75,`dashboard.summary.reproductiveFemales`)),ZE(3),Gg(c.store.summary().reproductiveFemales),ZE(2),Wg(` `,c.store.summary().reproductiveFemalePercentage,`% `,JC(29,77,`dashboard.summary.ofTotal`),` `),ZE(7),Gg(JC(36,79,`dashboard.summary.pregnant`)),ZE(3),Gg(c.store.summary().pregnantFemales),ZE(2),Wg(` `,c.store.summary().pregnantPercentage,`% `,JC(41,81,`dashboard.summary.ofFemales`),` `),ZE(3),Lg(`width`,c.store.summary().pregnantPercentage,`%`),ZE(6),Gg(JC(50,83,`dashboard.summary.upcomingCalvings`)),ZE(3),Gg(c.store.summary().upcomingCalvings),ZE(2),Gg(JC(55,85,`dashboard.summary.nextTwoMonths`)),ZE(7),Gg(JC(62,87,`dashboard.summary.followUpRequired`)),ZE(3),Gg(c.store.summary().followUpRequired),ZE(2),Gg(JC(67,89,`dashboard.summary.veterinaryReview`)),ZE(2),zw(c.store.summaryError()?68:-1),ZE(6),Gg(JC(75,91,`dashboard.reproductiveStatus.title`)),ZE(3),Wg(` `,JC(78,93,`dashboard.reproductiveStatus.subtitle`),` (`,c.store.summary().reproductiveFemales,`) `),ZE(3),Lg(`background`,c.reproductiveChartBackground()),ZE(3),Gg(c.store.summary().reproductiveFemales),ZE(2),Gg(JC(86,95,`dashboard.reproductiveStatus.females`)),ZE(6),pl(` `,JC(92,97,`dashboard.reproductiveStatus.pregnant`),` `),ZE(3),Gg(c.store.summary().statusDistribution.pregnant),ZE(2),pl(``,c.statusPercentage(c.store.summary().statusDistribution.pregnant),`%`),ZE(4),pl(` `,JC(101,99,`dashboard.reproductiveStatus.vacant`),` `),ZE(3),Gg(c.store.summary().statusDistribution.vacant),ZE(2),pl(``,c.statusPercentage(c.store.summary().statusDistribution.vacant),`%`),ZE(4),pl(` `,JC(110,101,`dashboard.reproductiveStatus.inHeat`),` `),ZE(3),Gg(c.store.summary().statusDistribution.inHeat),ZE(2),pl(``,c.statusPercentage(c.store.summary().statusDistribution.inHeat),`%`),ZE(4),pl(` `,JC(119,103,`dashboard.reproductiveStatus.issues`),` `),ZE(3),Gg(c.store.summary().statusDistribution.issues),ZE(2),pl(``,c.statusPercentage(c.store.summary().statusDistribution.issues),`%`),ZE(3),Gg(JC(127,105,`dashboard.summary.upcomingCalvings`)),ZE(3),Gg(c.store.summary().upcomingCalvings),ZE(2),pl(``,c.statusPercentage(c.store.summary().upcomingCalvings),`%`),ZE(3),Gg(JC(135,107,`dashboard.summary.followUpRequired`)),ZE(3),Gg(c.store.summary().followUpRequired),ZE(2),pl(``,c.statusPercentage(c.store.summary().followUpRequired),`%`),ZE(2),Gg(JC(142,109,`dashboard.reproductiveStatus.relatedIndicators`)),ZE(6),Gg(JC(148,111,`dashboard.upcomingEvents.title`)),ZE(3),Gg(JC(151,113,`dashboard.upcomingEvents.subtitle`)),ZE(3),Zw(c.store.summary().upcomingEvents.slice(0,3)),ZE(7),Gg(JC(161,115,`dashboard.recentEvents.title`)),ZE(3),Gg(JC(164,117,`dashboard.recentEvents.subtitle`)),ZE(7),Gg(JC(171,119,`dashboard.recentEvents.date`)),ZE(3),Gg(JC(174,121,`dashboard.recentEvents.animal`)),ZE(3),Gg(JC(177,123,`dashboard.recentEvents.eventType`)),ZE(3),Gg(JC(180,125,`dashboard.recentEvents.detail`)),ZE(3),Gg(JC(183,127,`dashboard.recentEvents.status`)),ZE(3),Zw(c.store.summary().recentEvents.slice(0,5)),ZE(4),Zg(` `,JC(190,129,`dashboard.recentEvents.showing`),` `,c.store.summary().recentEvents.length>5?5:c.store.summary().recentEvents.length,` `,JC(191,131,`dashboard.recentEvents.of`),` `,c.store.summary().recentEvents.length,` `))},dependencies:[Nt,bi,ui,ie,oe,tt],styles:[`[_nghost-%COMP%]{display:block;min-height:100%;padding:32px;box-sizing:border-box;background:radial-gradient(circle at 30% 8%,rgba(208,242,220,.45),transparent 28rem),#fbfdf9}.dashboard-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}.dashboard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0 0 8px;font-size:clamp(2rem,3vw,2.5rem);line-height:1.1}.dashboard-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#53605a}.summary-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:28px}.summary-card[_ngcontent-%COMP%]{min-width:0;min-height:176px;padding:20px;box-sizing:border-box;border:1px solid rgba(28,60,50,.12);border-radius:16px;box-shadow:0 8px 24px #1130260f}.summary-card--females[_ngcontent-%COMP%]{background:linear-gradient(135deg,#fff,#f4fbf6 58%,#e1f5e8)}.summary-card--pregnant[_ngcontent-%COMP%]{background:linear-gradient(135deg,#fff,#f2fbf6 58%,#d9f3e5)}.summary-card--calvings[_ngcontent-%COMP%]{background:linear-gradient(135deg,#fff,#fffaf0 58%,#fff0c9)}.summary-card--follow-up[_ngcontent-%COMP%]{background:linear-gradient(135deg,#fff,#fff6f6 58%,#ffe3e5)}.summary-card__icon[_ngcontent-%COMP%]{display:grid;width:40px;height:40px;margin-bottom:16px;border-radius:12px;place-items:center;color:#114636;background:#daf4e4e6}.summary-card--calvings[_ngcontent-%COMP%]   .summary-card__icon[_ngcontent-%COMP%]{color:#b56a00;background:#fff3d8}.summary-card--follow-up[_ngcontent-%COMP%]   .summary-card__icon[_ngcontent-%COMP%]{color:#c43d49;background:#ffeaec}.summary-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0 0 4px;color:#27322d;font-size:.95rem;font-weight:500}.summary-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;color:#123d27;font-size:2rem;line-height:1.15}.summary-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:6px 0 0;color:#65716b;font-size:.875rem}.summary-progress[_ngcontent-%COMP%]{height:6px;margin-top:14px;overflow:hidden;border-radius:999px;background:#0f40311a}.summary-progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;height:100%;border-radius:inherit;background:#114636;transition:width .2s ease}.summary-error[_ngcontent-%COMP%]{margin:16px 0 0;color:#a22c36}.dashboard-insights[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(0,3fr) minmax(320px,2fr);gap:20px;margin-top:24px}.insight-card[_ngcontent-%COMP%]{min-width:0;min-height:390px;padding:24px;box-sizing:border-box;border:1px solid rgba(28,60,50,.14);border-radius:18px;box-shadow:0 8px 24px #1130260f}.insight-card--status[_ngcontent-%COMP%]{background:#dfece1}.insight-card--events[_ngcontent-%COMP%]{display:flex;flex-direction:column;background:#fff}.insight-card__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0 0 4px;color:#1c2b23;font-size:1.15rem}.insight-card__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#65716b;font-size:.875rem}.status-content[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(230px,.9fr) minmax(230px,1.1fr);align-items:center;gap:32px;margin-top:28px}.donut-chart[_ngcontent-%COMP%]{position:relative;width:min(100%,250px);aspect-ratio:1;margin-inline:auto;border-radius:50%;box-shadow:0 10px 30px #0e403124}.donut-chart[_ngcontent-%COMP%]:after{position:absolute;inset:24%;border-radius:50%;background:#f8fbf8;box-shadow:inset 0 0 0 1px #15423414;content:""}.donut-chart__center[_ngcontent-%COMP%]{position:absolute;z-index:1;inset:29%;display:grid;align-content:center;justify-items:center;text-align:center}.donut-chart__center[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#133d27;font-size:2rem;line-height:1}.donut-chart__center[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-top:8px;color:#5f6e66;font-size:.7rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase}.status-legend[_ngcontent-%COMP%]{display:grid;gap:4px}.status-legend__row[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(0,1fr) auto 54px;align-items:center;gap:12px;min-height:46px;padding:0 10px;border-bottom:1px solid rgba(46,70,91,.1)}.status-legend__label[_ngcontent-%COMP%]{display:flex;align-items:center;min-width:0;gap:10px;color:#33433a}.status-legend__row[_ngcontent-%COMP%] > strong[_ngcontent-%COMP%]{color:#21372b}.status-legend__row[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]:last-child{color:#67766e;text-align:right}.status-dot[_ngcontent-%COMP%]{flex:0 0 auto;width:11px;height:11px;border-radius:50%}.status-dot--pregnant[_ngcontent-%COMP%]{background:#145f49}.status-dot--vacant[_ngcontent-%COMP%]{background:#83b5c9}.status-dot--heat[_ngcontent-%COMP%]{background:#e3a82f}.status-dot--issues[_ngcontent-%COMP%]{background:#d95b64}.events-preview[_ngcontent-%COMP%]{margin-top:20px}.event-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:12px;min-height:76px;border-bottom:1px solid rgba(28,60,50,.1)}.event-row__icon[_ngcontent-%COMP%]{display:grid;width:38px;height:38px;border-radius:11px;place-items:center;color:#b56a00;background:#fff3d8}.event-row__description[_ngcontent-%COMP%]{display:grid;min-width:0;gap:3px}.event-row__description[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#243129;font-size:.9rem}.event-row__description[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{overflow:hidden;color:#748078;font-size:.78rem;text-overflow:ellipsis;white-space:nowrap}.event-row[_ngcontent-%COMP%]   time[_ngcontent-%COMP%]{color:#67736c;font-size:.78rem;white-space:nowrap}.event-row__status[_ngcontent-%COMP%]{grid-column:3;justify-self:end;margin-top:-18px;padding:4px 10px;border-radius:999px;color:#95600c;background:#fff4d9;font-size:.7rem}.events-empty[_ngcontent-%COMP%]{display:grid;min-height:190px;place-items:center;align-content:center;color:#708078;text-align:center}.events-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:8px 0 0}.events-view-all[_ngcontent-%COMP%]{align-self:flex-end;margin-top:auto;color:#114233}.recent-events-card[_ngcontent-%COMP%]{margin-top:24px;padding:22px 24px 16px;border:1px solid rgba(35,72,61,.12);border-radius:18px;background:#eef6ef;box-shadow:0 8px 24px #1130260d}.recent-events-card__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0 0 4px;color:#1d2c24;font-size:1.15rem}.recent-events-card__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#68756e;font-size:.85rem}.recent-events-table-wrap[_ngcontent-%COMP%]{margin-top:18px;overflow-x:auto}.recent-events-table[_ngcontent-%COMP%]{width:100%;min-width:760px;border-collapse:collapse;table-layout:fixed}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:10px 12px;color:#748078;font-size:.68rem;font-weight:600;letter-spacing:.04em;text-align:left;text-transform:uppercase}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(1){width:14%}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(2){width:24%}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(3){width:15%}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(4){width:22%}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(5){width:13%}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(6){width:12%}.recent-events-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:12px;border-top:1px solid rgba(35,72,61,.1);color:#536159;font-size:.8rem;vertical-align:middle}.animal-cell[_ngcontent-%COMP%]{display:flex;align-items:center;min-width:0;gap:9px}.animal-cell[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{flex:0 0 auto;color:#51705e;font-variation-settings:"FILL" 0,"wght" 400}.animal-cell[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{display:grid;min-width:0}.animal-cell[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .animal-cell[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.animal-cell[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#294033;font-size:.82rem}.animal-cell[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{margin-top:2px;color:#78847d}.event-status[_ngcontent-%COMP%]{color:#3f5d77;font-weight:600}.history-action[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:3px;padding:4px 0;border:0;color:#0f372b;background:transparent;font:inherit;font-weight:700;cursor:pointer}.history-action[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:17px;height:17px;font-size:17px}.recent-events-empty[_ngcontent-%COMP%]{height:92px;text-align:center}.recent-events-card__footer[_ngcontent-%COMP%]{padding:14px 12px 0;border-top:1px solid rgba(35,72,61,.08);color:#748078;font-size:.75rem}@media(max-width:1100px){.summary-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.dashboard-insights[_ngcontent-%COMP%]{grid-template-columns:1fr}}@media(max-width:760px){.status-content[_ngcontent-%COMP%]{grid-template-columns:1fr}.donut-chart[_ngcontent-%COMP%]{width:min(100%,230px)}}@media(max-width:680px){[_nghost-%COMP%]{padding:20px}.dashboard-header[_ngcontent-%COMP%]{flex-direction:column}.summary-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.insight-card[_ngcontent-%COMP%]{padding:20px}.recent-events-card[_ngcontent-%COMP%]{padding-inline:16px}.event-row[_ngcontent-%COMP%]{grid-template-columns:42px minmax(0,1fr)}.event-row[_ngcontent-%COMP%]   time[_ngcontent-%COMP%]{grid-column:2}.event-row__status[_ngcontent-%COMP%]{display:none}}`],changeDetection:1})};var mn=(o,i)=>i.key;function sn(o,i){if(o&1&&(Es(0,`a`,6)(1,`mat-icon`),FC(2),ll(),Es(3,`span`,8)(4,`strong`),FC(5),KC(6,`translate`),ll(),Es(7,`span`),FC(8),KC(9,`translate`),ll()(),Es(10,`mat-icon`,9),FC(11,`chevron_right`),ll()()),o&2){let e=i.$implicit;Ig(`routerLink`,e.link),ZE(),bC(UC(`event-icon event-`,e.key)),ZE(),Gg(e.icon),ZE(3),Gg(JC(6,7,`eventSelector.`+e.key)),ZE(3),Gg(JC(9,9,`eventSelector.`+e.key+`Desc`))}}var je=class o{events=[{key:`pregnancy`,icon:`favorite`,link:`/reproductive/events/pregnancy`},{key:`calving`,icon:`pets`,link:`/reproductive/events/calving`},{key:`dryOff`,icon:`hourglass_empty`,link:`/reproductive/events/dry-off`},{key:`weaning`,icon:`child_care`,link:`/reproductive/events/weaning`}];static ɵfac=function(e){return new(e||o)};static ɵcmp=bw({type:o,selectors:[[`app-event-selector`]],decls:31,vars:18,consts:[[1,`selector-overlay`],[`role`,`dialog`,`aria-modal`,`true`,`cdkTrapFocus`,``,`cdkTrapFocusAutoCapture`,``,1,`selector-dialog`],[`routerLink`,`/reproductive`,1,`selector-close`],[1,`selector-header`],[`aria-hidden`,`true`,1,`selector-header__icon`],[1,`events-grid`],[1,`event-card`,3,`routerLink`],[1,`info-box`],[1,`event-card__content`],[1,`arrow`]],template:function(e,c){e&1&&(Es(0,`div`,0)(1,`section`,1),KC(2,`translate`),Es(3,`a`,2),KC(4,`translate`),Es(5,`mat-icon`),FC(6,`close`),ll()(),Es(7,`header`,3)(8,`div`,4)(9,`mat-icon`),FC(10,`event_available`),ll()(),Es(11,`div`)(12,`h1`),FC(13),KC(14,`translate`),ll(),Es(15,`p`),FC(16),KC(17,`translate`),ll()()(),Es(18,`div`,5),qw(19,sn,12,11,`a`,6,mn),ll(),Es(21,`div`,7)(22,`mat-icon`),FC(23,`info`),ll(),Es(24,`div`)(25,`strong`),FC(26),KC(27,`translate`),ll(),Es(28,`p`),FC(29),KC(30,`translate`),ll()()()()()),e&2&&(ZE(),Eg(`aria-label`,JC(2,6,`eventSelector.title`)),ZE(2),Eg(`aria-label`,JC(4,8,`forms.close`)),ZE(10),Gg(JC(14,10,`eventSelector.title`)),ZE(3),Gg(JC(17,12,`eventSelector.subtitle`)),ZE(3),Zw(c.events),ZE(7),Gg(JC(27,14,`eventSelector.whatIsEvent`)),ZE(3),Gg(JC(30,16,`eventSelector.whatIsEventDesc`)))},dependencies:[Nt,ie,oe,T,nn,tt],styles:[`[_nghost-%COMP%]{display:block}.selector-overlay[_ngcontent-%COMP%]{position:fixed;z-index:1000;inset:0;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:clamp(16px,5vh,48px);box-sizing:border-box;background:#1022199e;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.selector-dialog[_ngcontent-%COMP%]{position:relative;width:min(760px,100%);max-height:calc(100dvh - clamp(32px,10vh,96px));margin:auto;padding:28px;overflow-y:auto;box-sizing:border-box;background:#fff;border-radius:18px;box-shadow:0 22px 60px #081c114d}.selector-close[_ngcontent-%COMP%]{position:absolute;top:18px;right:18px;display:grid;width:40px;height:40px;border-radius:50%;place-items:center;color:#53635a;text-decoration:none}.selector-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:16px;padding-right:42px}.selector-header__icon[_ngcontent-%COMP%]{display:grid;flex:0 0 auto;width:54px;height:54px;border-radius:14px;place-items:center;color:#114636;background:#e4f5e9}.selector-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0 0 4px;font-size:1.4rem}.selector-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#647169}.events-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:24px 0}.event-card[_ngcontent-%COMP%]{display:grid;grid-template-columns:48px minmax(0,1fr) 24px;align-items:center;min-width:0;min-height:116px;gap:14px;padding:16px;border:1px solid #e0e0e0;border-radius:12px;color:inherit;text-decoration:none;transition:border-color .2s,box-shadow .2s}.event-card[_ngcontent-%COMP%]:hover{border-color:#07583f;box-shadow:0 6px 18px #0e3e3014}.event-icon[_ngcontent-%COMP%]{width:28px;height:28px;border-radius:50%;padding:10px;font-size:28px}.event-pregnancy[_ngcontent-%COMP%], .event-calving[_ngcontent-%COMP%]{background:#e4f4e8;color:#07583f}.event-dryOff[_ngcontent-%COMP%]{background:#fff3e0;color:#ef6c00}.event-weaning[_ngcontent-%COMP%]{background:#f3e5f5;color:#7b1fa2}.event-card__content[_ngcontent-%COMP%]{display:grid;min-width:0;gap:5px}.event-card__content[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{color:#66736b;font-size:.84rem;line-height:1.4}.arrow[_ngcontent-%COMP%]{color:#79857e}.info-box[_ngcontent-%COMP%]{display:flex;gap:12px;background:#e4f4e8;border-radius:12px;padding:16px}.info-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:4px 0 0;color:#59675f;line-height:1.45}@media(max-width:680px){.selector-overlay[_ngcontent-%COMP%]{padding:10px}.selector-dialog[_ngcontent-%COMP%]{max-height:calc(100dvh - 20px);padding:20px 16px}.selector-header[_ngcontent-%COMP%]{align-items:flex-start}.selector-header__icon[_ngcontent-%COMP%]{width:46px;height:46px}.selector-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.15rem}.events-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.event-card[_ngcontent-%COMP%]{min-height:96px}}`],changeDetection:1})};function Ce(o){let i=m(U),e=m(Ce$1),c=zi([]),b=zi(!0),u=zi(null);return Fy({animals:i.getAnimals(),pregnancies:i.getHistory()}).pipe(p(e)).subscribe({next:({animals:p,pregnancies:E})=>{let O=p.filter(P=>P.status===`active`&&P.sex.toLowerCase()===`hembra`&&!N(P.birthDate));if(o===`pregnancy`)c.set(O.map(P=>({value:P.id,label:`${P.name} \xB7 #${P.earTag}`})));else{let P=new Map(O.map(g=>[g.id,g])),Q=new Map(p.map(g=>[g.id,g]));c.set(E.filter(g=>P.has(g.animalId)&&(o===`weaning`?!!g.endedOn&&!g.weanedOn&&g.status!==`weaned`&&!!g.calfId&&Q.get(g.calfId)?.motherId===g.animalId&&Q.get(g.calfId)?.status===`active`&&!Q.get(g.calfId)?.weanedOn:!g.endedOn&&g.status!==`weaned`&&(o!==`dry-off`||!g.dryOffOn))).map(g=>{let Se=P.get(g.animalId),Me=g.calfId?Q.get(g.calfId):void 0;return{value:g.id,label:o===`weaning`&&Me?`${Se.name} \xB7 Cr\xEDa: ${Me.name} (#${Me.earTag})`:`${Se.name} \xB7 #${Se.earTag} \xB7 ${g.confirmedOn}`}}))}b.set(!1)},error:()=>{u.set(`No se pudieron cargar los animales. Comprueba que el servidor esté disponible.`),b.set(!1)}}),{options:c,loading:b,error:u}}var pn=(o,i)=>i.value;function bn(o,i){if(o&1&&(Es(0,`mat-option`,7),FC(1),ll()),o&2){let e=i.$implicit;Ig(`value`,e.value),ZE(),Gg(e.label)}}function hn(o,i){o&1&&(Es(0,`p`,8),FC(1,`Cargando animales...`),ll())}function un(o,i){if(o&1&&(Es(0,`p`,9),FC(1),ll()),o&2){let e=iC();ZE(),Gg(e.animalSelection.error())}}function gn(o,i){o&1&&(Es(0,`p`,8),FC(1,`No hay hembras activas disponibles.`),ll())}var We=class o{fb=m(Qn);store=m(G);router=m(le$1);animalSelection=Ce(`pregnancy`);form=this.fb.group({animalId:[``,ye.required],calfId:[``],confirmedOn:[``,ye.required],expectedCalvingOn:[``]});submit(){if(this.form.invalid){this.form.markAllAsTouched();return}let i=this.form.getRawValue();this.store.confirm({animalId:i.animalId,calfId:i.calfId||null,confirmedOn:i.confirmedOn,expectedCalvingOn:i.expectedCalvingOn||null}),this.router.navigateByUrl(`/reproductive`)}static ɵfac=function(e){return new(e||o)};static ɵcmp=bw({type:o,selectors:[[`app-pregnancy-event-form`]],decls:57,vars:26,consts:[[1,`form-overlay`],[`role`,`dialog`,`aria-modal`,`true`,`cdkTrapFocus`,``,`cdkTrapFocusAutoCapture`,``,1,`event-dialog`],[`mat-icon-button`,``,`routerLink`,`/reproductive`,1,`dialog-close`],[3,`ngSubmit`,`formGroup`],[1,`form-section`],[`appearance`,`outline`],[`formControlName`,`animalId`,`required`,``,`placeholder`,`Selecciona un animal...`],[3,`value`],[`role`,`status`],[`role`,`alert`],[`matInput`,``,`formControlName`,`calfId`],[`matInput`,``,`type`,`date`,`formControlName`,`confirmedOn`,`required`,``],[`matInput`,``,`type`,`date`,`formControlName`,`expectedCalvingOn`],[`matInput`,``,`rows`,`3`,`disabled`,``],[1,`actions`],[`mat-button`,``,`routerLink`,`/reproductive`],[`mat-raised-button`,``,`color`,`primary`,`type`,`submit`]],template:function(e,c){e&1&&(Es(0,`div`,0)(1,`mat-card`,1),KC(2,`translate`),Es(3,`mat-card-header`)(4,`mat-card-title`),FC(5),KC(6,`translate`),ll(),Es(7,`a`,2),KC(8,`translate`),Es(9,`mat-icon`),FC(10,`close`),ll()()(),Es(11,`mat-card-content`)(12,`form`,3),Ng(`ngSubmit`,function(){return c.submit()}),Es(13,`section`,4)(14,`h3`),FC(15,`Información del animal`),ll(),Es(16,`mat-form-field`,5)(17,`mat-label`),FC(18,`Animal`),ll(),Es(19,`mat-select`,6),FI(),qw(20,bn,2,2,`mat-option`,7,pn),ll()(),Uw(22,hn,2,0,`p`,8)(23,un,2,1,`p`,9)(24,gn,2,0,`p`,8),ll(),Es(25,`section`,4)(26,`h3`),FC(27,`Detalles de la preñez`),ll(),Es(28,`mat-form-field`,5)(29,`mat-label`),FC(30),KC(31,`translate`),ll(),Es(32,`input`,10),FI(),ll()(),Es(33,`mat-form-field`,5)(34,`mat-label`),FC(35),KC(36,`translate`),ll(),Es(37,`input`,11),FI(),ll()(),Es(38,`mat-form-field`,5)(39,`mat-label`),FC(40),KC(41,`translate`),ll(),Es(42,`input`,12),FI(),ll()()(),Es(43,`section`,4)(44,`h3`),FC(45,`Información adicional`),ll(),Es(46,`mat-form-field`,5)(47,`mat-label`),FC(48,`Observaciones`),ll(),wg(49,`textarea`,13),ll()(),Es(50,`div`,14)(51,`a`,15),FC(52),KC(53,`translate`),ll(),Es(54,`button`,16),FC(55),KC(56,`translate`),ll()()()()()()),e&2&&(ZE(),Eg(`aria-label`,JC(2,10,`forms.pregnancyTitle`)),ZE(4),Gg(JC(6,12,`forms.pregnancyTitle`)),ZE(2),Eg(`aria-label`,JC(8,14,`forms.close`)),ZE(5),Ig(`formGroup`,c.form),ZE(7),LI(),ZE(),Zw(c.animalSelection.options()),ZE(2),zw(c.animalSelection.loading()?22:c.animalSelection.error()?23:c.animalSelection.options().length?-1:24),ZE(8),Gg(JC(31,16,`forms.calfId`)),ZE(2),LI(),ZE(3),Gg(JC(36,18,`forms.confirmedOn`)),ZE(2),LI(),ZE(3),Gg(JC(41,20,`forms.expectedCalvingOn`)),ZE(2),LI(),ZE(10),Gg(JC(53,22,`forms.cancel`)),ZE(3),pl(` `,JC(56,24,`forms.submitPregnancy`),` `))},dependencies:[er,Xn,Ze$1,Wn,zn$1,ht,cn$1,Dn$1,Nt,T,_,k,z,A,Vn,Xe$1,ie$1,Pe$1,Be,lo,ro,Ce$2,bi,ui,fn$1,ie,oe,nn,tt],styles:[`[_nghost-%COMP%]{display:block}.form-overlay[_ngcontent-%COMP%]{position:fixed;z-index:1000;inset:0;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:clamp(16px,4vh,36px);box-sizing:border-box;background:#1022199e;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.event-dialog[_ngcontent-%COMP%]{display:flex;width:min(640px,100%);max-height:calc(100dvh - clamp(32px,8vh,72px));margin:auto;overflow:hidden;border-radius:18px;flex-direction:column;box-shadow:0 22px 60px #081c114d}mat-card-header[_ngcontent-%COMP%]{position:relative;flex:0 0 auto;padding:22px 64px 14px 24px}mat-card-title[_ngcontent-%COMP%]{color:#17271f;font-size:1.35rem;font-weight:700}.dialog-close[_ngcontent-%COMP%]{position:absolute;top:14px;right:16px;color:#53635a}mat-card-content[_ngcontent-%COMP%]{min-height:0;padding:0 24px 20px!important;overflow-y:auto}form[_ngcontent-%COMP%]{display:grid;width:100%;gap:12px}.form-section[_ngcontent-%COMP%]{display:grid;gap:10px;padding:14px;border:1px solid #dce5df;border-radius:12px;background:#fbfcfb}.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 2px;color:#134435;font-size:.95rem}mat-form-field[_ngcontent-%COMP%]{width:100%}.actions[_ngcontent-%COMP%]{position:sticky;z-index:2;bottom:0;display:flex;justify-content:flex-end;gap:8px;margin-top:2px;padding:14px 0 4px;border-top:1px solid #e3e9e5;background:#fff}@media(max-width:600px){.form-overlay[_ngcontent-%COMP%]{padding:10px}.event-dialog[_ngcontent-%COMP%]{max-height:calc(100dvh - 20px);border-radius:14px}mat-card-header[_ngcontent-%COMP%]{padding:18px 54px 12px 16px}mat-card-title[_ngcontent-%COMP%]{font-size:1.15rem}mat-card-content[_ngcontent-%COMP%]{padding:0 16px 14px!important}.form-section[_ngcontent-%COMP%]{padding:12px}.actions[_ngcontent-%COMP%]{flex-wrap:wrap}}`],changeDetection:1})};var Jt=(()=>{class o{labelPosition=`after`;static ɵfac=function(c){return new(c||o)};static ɵcmp=(function(){return bw({type:o,selectors:[[``,`mat-internal-form-field`,``]],hostAttrs:[1,`mdc-form-field`,`mat-internal-form-field`],hostVars:2,hostBindings:function(b,u){b&2&&jg(`mdc-form-field--align-end`,u.labelPosition===`before`)},inputs:{labelPosition:`labelPosition`},ngContentSelectors:[`*`],decls:1,vars:0,template:function(b,u){b&1&&(aC(),cC(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label, .mat-internal-form-field > .mat-internal-form-field-label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label, [dir=rtl] .mat-internal-form-field > .mat-internal-form-field-label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label, .mdc-form-field--align-end > .mat-internal-form-field-label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label, [dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end .mat-internal-form-field-label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2})})()}return o})();var rt={color:`accent`,clickAction:`check-indeterminate`,disabledInteractive:!1};var fn=new w(`mat-checkbox-default-options`,{providedIn:`root`,factory:()=>rt});var I=(function(o){return o[o.Init=0]=`Init`,o[o.Checked=1]=`Checked`,o[o.Unchecked=2]=`Unchecked`,o[o.Indeterminate=3]=`Indeterminate`,o})(I||{});var ot=class{source;checked};var ct=(()=>{class o{_elementRef=m(Sn$1);_changeDetectorRef=m(Tb);_ngZone=m(ae);_animationsDisabled=j();_options=m(fn,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let c=new ot;return c.source=this,c.checked=e,c}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:`mdc-checkbox--anim-unchecked-checked`,uncheckedToIndeterminate:`mdc-checkbox--anim-unchecked-indeterminate`,checkedToUnchecked:`mdc-checkbox--anim-checked-unchecked`,checkedToIndeterminate:`mdc-checkbox--anim-checked-indeterminate`,indeterminateToChecked:`mdc-checkbox--anim-indeterminate-checked`,indeterminateToUnchecked:`mdc-checkbox--anim-indeterminate-unchecked`};ariaLabel=``;ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition=`after`;name=null;change=new ut;indeterminateChange=new ut;value;disableRipple=!1;_inputElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass=``;_currentCheckState=I.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){m(lt).load(Pe);let e=m(new am(`tabindex`),{optional:!0});this._options=this._options||rt,this.color=this._options.color||rt.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=m(Mt).getId(`mat-mdc-checkbox-`),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let c=e!=this._indeterminate();this._indeterminate.set(e),c&&(e?this._transitionCheckState(I.Indeterminate):this._transitionCheckState(this.checked?I.Checked:I.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=zi(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let c=this._currentCheckState,b=this._getAnimationTargetElement();if(!(c===e||!b)&&(this._currentAnimationClass&&b.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(c,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){b.classList.add(this._currentAnimationClass);let u=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{b.classList.remove(u)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!==`noop`?(this.indeterminate&&e!==`check`&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?I.Checked:I.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e===`noop`)&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,c){if(this._animationsDisabled)return``;switch(e){case I.Init:if(c===I.Checked)return this._animationClasses.uncheckedToChecked;if(c==I.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case I.Unchecked:return c===I.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case I.Checked:return c===I.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case I.Indeterminate:return c===I.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return``}_syncIndeterminate(e){let c=this._inputElement;c&&(c.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_preventBubblingFromLabel(e){e.target&&this._inputElement&&e.target!==this._inputElement.nativeElement&&e.stopPropagation()}static ɵfac=function(c){return new(c||o)};static ɵcmp=(function(){let e=[`input`];return bw({type:o,selectors:[[`mat-checkbox`]],viewQuery:function(u,p){if(u&1&&Rg(e,5),u&2){let E;lC(E=dC())&&(p._inputElement=E.first)}},hostAttrs:[1,`mat-mdc-checkbox`],hostVars:16,hostBindings:function(u,p){u&2&&(_g(`id`,p.id),Eg(`tabindex`,null)(`aria-label`,null)(`aria-labelledby`,null),bC(p.color?`mat-`+p.color:`mat-accent`),jg(`_mat-animation-noopable`,p._animationsDisabled)(`mdc-checkbox--disabled`,p.disabled)(`mat-mdc-checkbox-disabled`,p.disabled)(`mat-mdc-checkbox-checked`,p.checked)(`mat-mdc-checkbox-disabled-interactive`,p.disabledInteractive))},inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],ariaExpanded:[2,`aria-expanded`,`ariaExpanded`,Qj],ariaControls:[0,`aria-controls`,`ariaControls`],ariaOwns:[0,`aria-owns`,`ariaOwns`],id:`id`,required:[2,`required`,`required`,Qj],labelPosition:`labelPosition`,name:`name`,value:`value`,disableRipple:[2,`disableRipple`,`disableRipple`,Qj],tabIndex:[2,`tabIndex`,`tabIndex`,b=>b==null?void 0:Kj(b)],color:`color`,disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,Qj],checked:[2,`checked`,`checked`,Qj],disabled:[2,`disabled`,`disabled`,Qj],indeterminate:[2,`indeterminate`,`indeterminate`,Qj]},outputs:{change:`change`,indeterminateChange:`indeterminateChange`},exportAs:[`matCheckbox`],features:[qC([{provide:M,useExisting:Ii(()=>o),multi:!0},{provide:C,useExisting:o,multi:!0}]),bu],ngContentSelectors:[`*`],decls:15,vars:23,consts:[[`checkbox`,``],[`input`,``],[`label`,``],[`mat-internal-form-field`,``,3,`click`,`labelPosition`,`for`],[1,`mdc-checkbox`],[`aria-hidden`,`true`,1,`mat-mdc-checkbox-touch-target`],[`type`,`checkbox`,1,`mdc-checkbox__native-control`,3,`blur`,`click`,`change`,`checked`,`indeterminate`,`disabled`,`id`,`required`,`tabIndex`],[`aria-hidden`,`true`,1,`mdc-checkbox__ripple`],[`aria-hidden`,`true`,1,`mdc-checkbox__background`],[`focusable`,`false`,`viewBox`,`0 0 24 24`,1,`mdc-checkbox__checkmark`],[`fill`,`none`,`d`,`M1.73,12.91 8.1,19.28 22.79,4.59`,1,`mdc-checkbox__checkmark-path`],[1,`mdc-checkbox__mixedmark`],[`mat-ripple`,``,`aria-hidden`,`true`,1,`mat-mdc-checkbox-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mat-internal-form-field-label`,`mdc-label`]],template:function(u,p){if(u&1&&(aC(),Es(0,`label`,3),Ng(`click`,function(O){return p._preventBubblingFromLabel(O)}),Es(1,`span`,4,0),wg(3,`span`,5),Es(4,`input`,6,1),Ng(`blur`,function(){return p._onBlur()})(`click`,function(){return p._onInputClick()})(`change`,function(O){return p._onInteractionEvent(O)}),ll(),wg(6,`span`,7),Es(7,`span`,8),Cf(),Es(8,`svg`,9),wg(9,`path`,10),ll(),bf(),wg(10,`span`,11),ll(),wg(11,`span`,12),ll(),Es(12,`span`,13,2),cC(14),ll()()),u&2){let E=pC(2);Ig(`labelPosition`,p.labelPosition)(`for`,p.inputId),ZE(4),jg(`mdc-checkbox--selected`,p.checked),Ig(`checked`,p.checked)(`indeterminate`,p.indeterminate)(`disabled`,p.disabled&&!p.disabledInteractive)(`id`,p.inputId)(`required`,p.required)(`tabIndex`,p.disabled&&!p.disabledInteractive?-1:p.tabIndex),Eg(`aria-label`,p.ariaLabel||null)(`aria-labelledby`,p.ariaLabelledby)(`aria-describedby`,p.ariaDescribedby)(`aria-checked`,p.indeterminate?`mixed`:null)(`aria-controls`,p.ariaControls)(`aria-disabled`,p.disabled&&p.disabledInteractive?!0:null)(`aria-expanded`,p.ariaExpanded)(`aria-owns`,p.ariaOwns)(`name`,p.name)(`value`,p.value),ZE(7),Ig(`matRippleTrigger`,E)(`matRippleDisabled`,p.disableRipple||p.disabled)(`matRippleCentered`,!0)}},dependencies:[zo,Jt],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - var(--%NS%mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-unselected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-unselected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-unselected-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-unselected-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-unselected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-unselected-pressed-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-unselected-pressed-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-selected-hover-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-selected-hover-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-selected-focus-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-selected-focus-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-selected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-selected-pressed-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-selected-pressed-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--%NS%mat-checkbox-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--%NS%mat-checkbox-state-layer-size, 40px);
  height: var(--%NS%mat-checkbox-state-layer-size, 40px);
  top: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - var(--%NS%mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - var(--%NS%mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - var(--%NS%mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--%NS%mat-checkbox-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
  top: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-selected-icon-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-checkbox-selected-icon-color, var(--%NS%mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--%NS%mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-unselected-hover-icon-color, var(--%NS%mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-selected-hover-icon-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-checkbox-selected-hover-icon-color, var(--%NS%mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-unselected-focus-icon-color, var(--%NS%mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-selected-focus-icon-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-checkbox-selected-focus-icon-color, var(--%NS%mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--%NS%mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--%NS%mat-checkbox-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--%NS%mat-checkbox-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--%NS%mat-checkbox-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--%NS%mat-checkbox-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--%NS%mat-checkbox-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-checkbox-label-text-font, var(--%NS%mat-sys-body-medium-font));
  line-height: var(--%NS%mat-checkbox-label-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-checkbox-label-text-size, var(--%NS%mat-sys-body-medium-size));
  letter-spacing: var(--%NS%mat-checkbox-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
  font-weight: var(--%NS%mat-checkbox-label-text-weight, var(--%NS%mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled .mat-internal-form-field-label {
  color: var(--%NS%mat-checkbox-disabled-label-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled .mat-internal-form-field-label {
    color: GrayText;
  }
}
.mat-mdc-checkbox .mat-internal-form-field-label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--%NS%mat-checkbox-touch-target-size, 48px);
  width: var(--%NS%mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--%NS%mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})})()}return o})();var en=(()=>{class o{static ɵfac=function(c){return new(c||o)};static ɵmod=Eo({type:o});static ɵinj=qn({imports:[ct,at]})}return o})();var He=class o{reproductiveApi=m(U);livestockApi=m(P);reproductiveStore=m(G);notifications=m(S);async save(i){let e=await my(this.reproductiveApi.getPregnancy(i.pregnancyId));if(e.endedOn||e.status===`weaned`)throw new Error(`Este parto ya fue registrado.`);let c=new Date(`${i.on}T00:00:00`);if(Number.isNaN(c.getTime())||c>new Date||i.on<e.confirmedOn)throw new Error(`La fecha del parto debe ser posterior a la confirmación y no puede estar en el futuro.`);if(!i.outcome.trim())throw new Error(`Indica el resultado del parto.`);let b=await my(this.livestockApi.getAnimalById(e.animalId));if(b.status!==`active`||b.sex!==`Hembra`||b.isCalf())throw new Error(`No se encontró una madre activa apta para registrar el parto.`);if(i.calf){let p=i.calf;if(!p.name.trim()||!p.earTag.trim()||![`Hembra`,`Macho`].includes(p.sex)||!Number.isFinite(p.weight)||p.weight<=0)throw new Error(`Completa el nombre, arete, sexo y peso de la cría.`);if((await my(this.livestockApi.getAnimals())).some(O=>O.earTag===p.earTag.trim()))throw new Error(`El arete de la cría ya pertenece a otro animal.`)}let u=await my(this.reproductiveApi.recordCalving(e.id,i.on,i.outcome.trim(),i.calf));u.calfId&&await my(this.livestockApi.getAnimalById(u.calfId)),this.reproductiveStore.loadHistory(),this.reproductiveStore.loadSummary(),await my(this.notifications.publish({recipientUserId:b.rancherId,type:`CALVING_REGISTERED`,title:`Parto registrado`,description:`Se registr\xF3 el parto de ${b.name} el ${i.on}${i.calf?`. Nueva cr\xEDa: ${i.calf.name} (#${i.calf.earTag})`:``}.`,relatedEntityType:`Pregnancy`,relatedEntityId:e.id}))}static ɵfac=function(e){return new(e||o)};static ɵprov=ze({token:o,factory:o.ɵfac})};var kn=(o,i)=>i.value;function _n(o,i){if(o&1&&(Es(0,`mat-option`,7),FC(1),ll()),o&2){let e=i.$implicit;Ig(`value`,e.value),ZE(),Gg(e.label)}}function yn(o,i){o&1&&(Es(0,`p`,8),FC(1,`Cargando animales...`),ll())}function Cn(o,i){if(o&1&&(Es(0,`p`,9),FC(1),ll()),o&2){let e=iC();ZE(),Gg(e.animalSelection.error())}}function Sn(o,i){o&1&&(Es(0,`p`,8),FC(1,`No hay animales con una preñez vigente para este evento.`),ll())}function Mn(o,i){o&1&&(Es(0,`div`,17)(1,`mat-form-field`,5)(2,`mat-label`),FC(3),KC(4,`translate`),ll(),Es(5,`input`,18),FI(),ll(),Es(6,`mat-error`),FC(7),KC(8,`translate`),ll()(),Es(9,`mat-form-field`,5)(10,`mat-label`),FC(11),KC(12,`translate`),ll(),Es(13,`input`,19),FI(),ll(),Es(14,`mat-error`),FC(15),KC(16,`translate`),ll()(),Es(17,`mat-form-field`,5)(18,`mat-label`),FC(19),KC(20,`translate`),ll(),Es(21,`mat-select`,20),FI(),Es(22,`mat-option`,21),FC(23),KC(24,`translate`),ll(),Es(25,`mat-option`,22),FC(26),KC(27,`translate`),ll()()(),Es(28,`mat-form-field`,5)(29,`mat-label`),FC(30),KC(31,`translate`),ll(),Es(32,`input`,23),FI(),ll(),Es(33,`span`,24),FC(34,`kg`),ll(),Es(35,`mat-error`),FC(36),KC(37,`translate`),ll()()(),Es(38,`p`),FC(39),KC(40,`translate`),ll()),o&2&&(ZE(3),Gg(JC(4,10,`animal.name`)),ZE(2),LI(),ZE(2),Gg(JC(8,12,`calf.required`)),ZE(4),Gg(JC(12,14,`animal.earTag`)),ZE(2),LI(),ZE(2),Gg(JC(16,16,`calf.required`)),ZE(4),Gg(JC(20,18,`animal.sex`)),ZE(2),LI(),ZE(2),Gg(JC(24,20,`livestock.female`)),ZE(3),Gg(JC(27,22,`livestock.male`)),ZE(4),Gg(JC(31,24,`calf.birthWeight`)),ZE(2),LI(),ZE(4),Gg(JC(37,26,`calf.positiveWeight`)),ZE(3),Gg(JC(40,28,`calf.inheritMother`)))}function En(o,i){o&1&&(Es(0,`p`),FC(1),KC(2,`translate`),ll()),o&2&&(ZE(),Gg(JC(2,1,`calf.withoutCalf`)))}function On(o,i){if(o&1&&(Es(0,`p`,9),FC(1),ll()),o&2){let e=iC();ZE(),Gg(e.saveError())}}var Ke=class o{fb=m(Qn);registerCalving=m(He);router=m(le$1);animalSelection=Ce(`calving`);saving=zi(!1);saveError=zi(null);today=new Date().toLocaleDateString(`sv-SE`);form=this.fb.group({pregnancyId:[``,ye.required],calvingOn:[``,ye.required],outcome:[``,ye.required],registerCalf:[!0],calf:this.fb.group({name:[``,[ye.required,ye.pattern(/\S/)]],earTag:[``,[ye.required,ye.pattern(/\S/)]],sex:[`Hembra`,ye.required],weight:[null,[ye.required,ye.min(.01)]]})});toggleCalf(i){i?this.form.controls.calf.enable():this.form.controls.calf.disable()}async submit(){if(this.saving())return;if(this.form.invalid){this.form.markAllAsTouched();return}let i=this.form.getRawValue();this.saving.set(!0),this.saveError.set(null);try{await this.registerCalving.save({pregnancyId:i.pregnancyId,on:i.calvingOn,outcome:i.outcome,calf:i.registerCalf?{name:i.calf.name,earTag:i.calf.earTag,sex:i.calf.sex,weight:i.calf.weight}:void 0}),await this.router.navigateByUrl(`/reproductive`)}catch(e){this.saveError.set(e instanceof Error&&!e.status?e.message:`No se pudo guardar el parto. Comprueba el servidor y vuelve a intentar.`)}finally{this.saving.set(!1)}}static ɵfac=function(e){return new(e||o)};static ɵcmp=bw({type:o,selectors:[[`app-calving-event-form`]],decls:63,vars:36,consts:[[1,`form-overlay`],[`role`,`dialog`,`aria-modal`,`true`,`cdkTrapFocus`,``,`cdkTrapFocusAutoCapture`,``,1,`event-dialog`],[`mat-icon-button`,``,`routerLink`,`/reproductive`,1,`dialog-close`],[3,`ngSubmit`,`formGroup`],[1,`form-section`],[`appearance`,`outline`],[`formControlName`,`pregnancyId`,`required`,``,`placeholder`,`Selecciona un animal...`],[3,`value`],[`role`,`status`],[`role`,`alert`],[`matInput`,``,`type`,`date`,`formControlName`,`calvingOn`,`required`,``,3,`max`],[`matInput`,``,`formControlName`,`outcome`,`required`,``,3,`placeholder`],[`formControlName`,`registerCalf`,3,`change`],[`matInput`,``,`rows`,`3`,`disabled`,``],[1,`actions`],[`mat-button`,``,`routerLink`,`/reproductive`],[`mat-raised-button`,``,`color`,`primary`,`type`,`submit`,3,`disabled`],[`formGroupName`,`calf`,1,`calf-fields`],[`matInput`,``,`formControlName`,`name`,`required`,``],[`matInput`,``,`formControlName`,`earTag`,`required`,``],[`formControlName`,`sex`,`required`,``],[`value`,`Hembra`],[`value`,`Macho`],[`matInput`,``,`type`,`number`,`min`,`0.01`,`step`,`0.01`,`formControlName`,`weight`,`required`,``],[`matTextSuffix`,``]],template:function(e,c){e&1&&(Es(0,`div`,0)(1,`mat-card`,1),KC(2,`translate`),Es(3,`mat-card-header`)(4,`mat-card-title`),FC(5),KC(6,`translate`),ll(),Es(7,`a`,2),KC(8,`translate`),Es(9,`mat-icon`),FC(10,`close`),ll()()(),Es(11,`mat-card-content`)(12,`form`,3),Ng(`ngSubmit`,function(){return c.submit()}),Es(13,`section`,4)(14,`h3`),FC(15,`Información del animal`),ll(),Es(16,`mat-form-field`,5)(17,`mat-label`),FC(18,`Animal`),ll(),Es(19,`mat-select`,6),FI(),qw(20,_n,2,2,`mat-option`,7,kn),ll()(),Uw(22,yn,2,0,`p`,8)(23,Cn,2,1,`p`,9)(24,Sn,2,0,`p`,8),ll(),Es(25,`section`,4)(26,`h3`),FC(27,`Detalles del parto`),ll(),Es(28,`mat-form-field`,5)(29,`mat-label`),FC(30),KC(31,`translate`),ll(),Es(32,`input`,10),FI(),ll()(),Es(33,`mat-form-field`,5)(34,`mat-label`),FC(35),KC(36,`translate`),ll(),Es(37,`input`,11),KC(38,`translate`),FI(),ll()()(),Es(39,`section`,4)(40,`h3`),FC(41),KC(42,`translate`),ll(),Es(43,`mat-checkbox`,12),FI(),Ng(`change`,function(u){return c.toggleCalf(u.checked)}),FC(44),KC(45,`translate`),ll(),Uw(46,Mn,41,30)(47,En,3,3,`p`),ll(),Es(48,`section`,4)(49,`h3`),FC(50,`Información adicional`),ll(),Es(51,`mat-form-field`,5)(52,`mat-label`),FC(53,`Observaciones`),ll(),wg(54,`textarea`,13),ll()(),Es(55,`div`,14),Uw(56,On,2,1,`p`,9),Es(57,`a`,15),FC(58),KC(59,`translate`),ll(),Es(60,`button`,16),FC(61),KC(62,`translate`),ll()()()()()()),e&2&&(ZE(),Eg(`aria-label`,JC(2,16,`forms.calvingTitle`)),ZE(4),Gg(JC(6,18,`forms.calvingTitle`)),ZE(2),Eg(`aria-label`,JC(8,20,`forms.close`)),ZE(5),Ig(`formGroup`,c.form),ZE(7),LI(),ZE(),Zw(c.animalSelection.options()),ZE(2),zw(c.animalSelection.loading()?22:c.animalSelection.error()?23:c.animalSelection.options().length?-1:24),ZE(8),Gg(JC(31,22,`forms.calvingOn`)),ZE(2),Ig(`max`,c.today),LI(),ZE(3),Gg(JC(36,24,`forms.outcome`)),ZE(2),Ig(`placeholder`,JC(38,26,`forms.outcomePlaceholder`)),LI(),ZE(4),Gg(JC(42,28,`calf.birthRegistration`)),ZE(2),LI(),ZE(),pl(` `,JC(45,30,`calf.registerNew`),` `),ZE(2),zw(c.form.controls.registerCalf.value?46:47),ZE(10),zw(c.saveError()?56:-1),ZE(2),Gg(JC(59,32,`forms.cancel`)),ZE(2),Ig(`disabled`,c.saving()),ZE(),pl(` `,JC(62,34,c.saving()?`calf.saving`:`forms.submitCalving`),` `))},dependencies:[er,Xn,Ze$1,gn$1,Wn,zn$1,ht,Wt,cn$1,Dn$1,Ct,Nt,T,_,k,z,A,Vn,Xe$1,ie$1,mt,ht$1,Pe$1,Be,lo,ro,Ce$2,bi,ui,fn$1,ie,oe,en,ct,nn,tt],styles:[`[_nghost-%COMP%]{display:block}.form-overlay[_ngcontent-%COMP%]{position:fixed;z-index:1000;inset:0;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:clamp(16px,4vh,36px);box-sizing:border-box;background:#1022199e;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.event-dialog[_ngcontent-%COMP%]{display:flex;width:min(640px,100%);max-height:calc(100dvh - clamp(32px,8vh,72px));margin:auto;overflow:hidden;border-radius:18px;flex-direction:column;box-shadow:0 22px 60px #081c114d}mat-card-header[_ngcontent-%COMP%]{position:relative;flex:0 0 auto;padding:22px 64px 14px 24px}mat-card-title[_ngcontent-%COMP%]{color:#17271f;font-size:1.35rem;font-weight:700}.dialog-close[_ngcontent-%COMP%]{position:absolute;top:14px;right:16px;color:#53635a}mat-card-content[_ngcontent-%COMP%]{min-height:0;padding:0 24px 20px!important;overflow-y:auto}form[_ngcontent-%COMP%]{display:grid;width:100%;gap:12px}.form-section[_ngcontent-%COMP%]{display:grid;gap:10px;padding:14px;border:1px solid #dce5df;border-radius:12px;background:#fbfcfb}.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 2px;color:#134435;font-size:.95rem}mat-form-field[_ngcontent-%COMP%]{width:100%}.actions[_ngcontent-%COMP%]{position:sticky;z-index:2;bottom:0;display:flex;justify-content:flex-end;gap:8px;margin-top:2px;padding:14px 0 4px;border-top:1px solid #e3e9e5;background:#fff}@media(max-width:600px){.form-overlay[_ngcontent-%COMP%]{padding:10px}.event-dialog[_ngcontent-%COMP%]{max-height:calc(100dvh - 20px);border-radius:14px}mat-card-header[_ngcontent-%COMP%]{padding:18px 54px 12px 16px}mat-card-title[_ngcontent-%COMP%]{font-size:1.15rem}mat-card-content[_ngcontent-%COMP%]{padding:0 16px 14px!important}.form-section[_ngcontent-%COMP%]{padding:12px}.actions[_ngcontent-%COMP%]{flex-wrap:wrap}}.calf-fields[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}@media(max-width:480px){.calf-fields[_ngcontent-%COMP%]{grid-template-columns:1fr}}`],changeDetection:1})};var wn=(o,i)=>i.value;function In(o,i){if(o&1&&(Es(0,`mat-option`,7),FC(1),ll()),o&2){let e=i.$implicit;Ig(`value`,e.value),ZE(),Gg(e.label)}}function Pn(o,i){o&1&&(Es(0,`p`,8),FC(1,`Cargando animales...`),ll())}function Nn(o,i){if(o&1&&(Es(0,`p`,9),FC(1),ll()),o&2){let e=iC();ZE(),Gg(e.animalSelection.error())}}function Fn(o,i){o&1&&(Es(0,`p`,8),FC(1,`No hay animales con una preñez vigente para este evento.`),ll())}function Dn(o,i){if(o&1&&(Es(0,`p`,9),FC(1),ll()),o&2){let e=iC();ZE(),Gg(e.saveError())}}var Xe=class o{fb=m(Qn);store=m(G);router=m(le$1);api=m(U);animalSelection=Ce(`dry-off`);saving=zi(!1);saveError=zi(null);today=new Date().toLocaleDateString(`sv-SE`);form=this.fb.group({pregnancyId:[``,ye.required],dryOffOn:[``,ye.required]});async submit(){if(this.saving())return;if(this.form.invalid){this.form.markAllAsTouched();return}let i=this.form.getRawValue();this.saving.set(!0),this.saveError.set(null);try{let e=await my(this.api.getPregnancy(i.pregnancyId));if(e.endedOn||e.dryOffOn)throw new Error(`Esta preñez ya tiene un parto o un secado registrado.`);if(i.dryOffOn<e.confirmedOn||i.dryOffOn>this.today)throw new Error(`El secado debe ser posterior a la confirmación y no puede estar en el futuro.`);await my(this.store.recordDryOff(i.pregnancyId,i.dryOffOn)),await this.router.navigateByUrl(`/reproductive`)}catch(e){this.saveError.set(e instanceof Error&&!e.status?e.message:`No se pudo registrar el secado. Comprueba el servidor.`)}finally{this.saving.set(!1)}}static ɵfac=function(e){return new(e||o)};static ɵcmp=bw({type:o,selectors:[[`app-dry-off-event-form`]],decls:48,vars:23,consts:[[1,`form-overlay`],[`role`,`dialog`,`aria-modal`,`true`,`cdkTrapFocus`,``,`cdkTrapFocusAutoCapture`,``,1,`event-dialog`],[`mat-icon-button`,``,`routerLink`,`/reproductive`,1,`dialog-close`],[3,`ngSubmit`,`formGroup`],[1,`form-section`],[`appearance`,`outline`],[`formControlName`,`pregnancyId`,`required`,``,`placeholder`,`Selecciona un animal...`],[3,`value`],[`role`,`status`],[`role`,`alert`],[`matInput`,``,`type`,`date`,`formControlName`,`dryOffOn`,`required`,``,3,`max`],[`matInput`,``,`rows`,`3`,`disabled`,``],[1,`actions`],[`mat-button`,``,`routerLink`,`/reproductive`],[`mat-raised-button`,``,`color`,`primary`,`type`,`submit`,3,`disabled`]],template:function(e,c){e&1&&(Es(0,`div`,0)(1,`mat-card`,1),KC(2,`translate`),Es(3,`mat-card-header`)(4,`mat-card-title`),FC(5),KC(6,`translate`),ll(),Es(7,`a`,2),KC(8,`translate`),Es(9,`mat-icon`),FC(10,`close`),ll()()(),Es(11,`mat-card-content`)(12,`form`,3),Ng(`ngSubmit`,function(){return c.submit()}),Es(13,`section`,4)(14,`h3`),FC(15,`Información del animal`),ll(),Es(16,`mat-form-field`,5)(17,`mat-label`),FC(18,`Animal`),ll(),Es(19,`mat-select`,6),FI(),qw(20,In,2,2,`mat-option`,7,wn),ll()(),Uw(22,Pn,2,0,`p`,8)(23,Nn,2,1,`p`,9)(24,Fn,2,0,`p`,8),ll(),Es(25,`section`,4)(26,`h3`),FC(27,`Detalles del secado`),ll(),Es(28,`mat-form-field`,5)(29,`mat-label`),FC(30),KC(31,`translate`),ll(),Es(32,`input`,10),FI(),ll()()(),Es(33,`section`,4)(34,`h3`),FC(35,`Información adicional`),ll(),Es(36,`mat-form-field`,5)(37,`mat-label`),FC(38,`Observaciones`),ll(),wg(39,`textarea`,11),ll()(),Es(40,`div`,12),Uw(41,Dn,2,1,`p`,9),Es(42,`a`,13),FC(43),KC(44,`translate`),ll(),Es(45,`button`,14),FC(46),KC(47,`translate`),ll()()()()()()),e&2&&(ZE(),Eg(`aria-label`,JC(2,11,`forms.dryOffTitle`)),ZE(4),Gg(JC(6,13,`forms.dryOffTitle`)),ZE(2),Eg(`aria-label`,JC(8,15,`forms.close`)),ZE(5),Ig(`formGroup`,c.form),ZE(7),LI(),ZE(),Zw(c.animalSelection.options()),ZE(2),zw(c.animalSelection.loading()?22:c.animalSelection.error()?23:c.animalSelection.options().length?-1:24),ZE(8),Gg(JC(31,17,`forms.dryOffOn`)),ZE(2),Ig(`max`,c.today),LI(),ZE(9),zw(c.saveError()?41:-1),ZE(2),Gg(JC(44,19,`forms.cancel`)),ZE(2),Ig(`disabled`,c.saving()),ZE(),pl(` `,JC(47,21,c.saving()?`calf.saving`:`forms.submitDryOff`),` `))},dependencies:[er,Xn,Ze$1,Wn,zn$1,ht,cn$1,Dn$1,Nt,T,_,k,z,A,Vn,Xe$1,ie$1,Pe$1,Be,lo,ro,Ce$2,bi,ui,fn$1,ie,oe,nn,tt],styles:[`[_nghost-%COMP%]{display:block}.form-overlay[_ngcontent-%COMP%]{position:fixed;z-index:1000;inset:0;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:clamp(16px,4vh,36px);box-sizing:border-box;background:#1022199e;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.event-dialog[_ngcontent-%COMP%]{display:flex;width:min(640px,100%);max-height:calc(100dvh - clamp(32px,8vh,72px));margin:auto;overflow:hidden;border-radius:18px;flex-direction:column;box-shadow:0 22px 60px #081c114d}mat-card-header[_ngcontent-%COMP%]{position:relative;flex:0 0 auto;padding:22px 64px 14px 24px}mat-card-title[_ngcontent-%COMP%]{color:#17271f;font-size:1.35rem;font-weight:700}.dialog-close[_ngcontent-%COMP%]{position:absolute;top:14px;right:16px;color:#53635a}mat-card-content[_ngcontent-%COMP%]{min-height:0;padding:0 24px 20px!important;overflow-y:auto}form[_ngcontent-%COMP%]{display:grid;width:100%;gap:12px}.form-section[_ngcontent-%COMP%]{display:grid;gap:10px;padding:14px;border:1px solid #dce5df;border-radius:12px;background:#fbfcfb}.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 2px;color:#134435;font-size:.95rem}mat-form-field[_ngcontent-%COMP%]{width:100%}.actions[_ngcontent-%COMP%]{position:sticky;z-index:2;bottom:0;display:flex;justify-content:flex-end;gap:8px;margin-top:2px;padding:14px 0 4px;border-top:1px solid #e3e9e5;background:#fff}@media(max-width:600px){.form-overlay[_ngcontent-%COMP%]{padding:10px}.event-dialog[_ngcontent-%COMP%]{max-height:calc(100dvh - 20px);border-radius:14px}mat-card-header[_ngcontent-%COMP%]{padding:18px 54px 12px 16px}mat-card-title[_ngcontent-%COMP%]{font-size:1.15rem}mat-card-content[_ngcontent-%COMP%]{padding:0 16px 14px!important}.form-section[_ngcontent-%COMP%]{padding:12px}.actions[_ngcontent-%COMP%]{flex-wrap:wrap}}`],changeDetection:1})};var Ze=class o{reproductiveApi=m(U);reproductiveStore=m(G);livestockApi=m(P);livestockStore=m(w$1);async save(i,e,c){let b=await my(this.reproductiveApi.getPregnancy(i));if(!b.endedOn||b.weanedOn||!b.calfId)throw new Error(`Selecciona un parto con una cría pendiente de destete.`);let u=new Date(`${e}T00:00:00`);if(Number.isNaN(u.getTime())||u>new Date||e<b.endedOn)throw new Error(`El destete debe ser posterior al parto y no puede estar en el futuro.`);let p=c?Number(c):void 0;if(p!==void 0&&(!Number.isFinite(p)||p<=0))throw new Error(`El peso al destete debe ser mayor que cero.`);let E=await my(this.livestockApi.getAnimalById(b.calfId));if(E.motherId!==b.animalId||E.weanedOn||E.status!==`active`)throw new Error(`La cría no está vinculada a esta madre, ya fue destetada o no está activa.`);await my(this.reproductiveApi.recordWeaning(i,e,c));let O=await my(this.livestockApi.getAnimalById(E.id));this.livestockStore.rememberAnimal(O),this.reproductiveStore.loadHistory(),this.reproductiveStore.loadSummary()}static ɵfac=function(e){return new(e||o)};static ɵprov=ze({token:o,factory:o.ɵfac})};var Tn=(o,i)=>i.value;function Rn(o,i){if(o&1&&(Es(0,`mat-option`,7),FC(1),ll()),o&2){let e=i.$implicit;Ig(`value`,e.value),ZE(),Gg(e.label)}}function Bn(o,i){o&1&&(Es(0,`p`,8),FC(1,`Cargando animales...`),ll())}function zn(o,i){if(o&1&&(Es(0,`p`,9),FC(1),ll()),o&2){let e=iC();ZE(),Gg(e.animalSelection.error())}}function An(o,i){o&1&&(Es(0,`p`,8),FC(1,`No hay animales con un parto registrado pendiente de destete.`),ll())}function Ln(o,i){if(o&1&&(Es(0,`p`,9),FC(1),ll()),o&2){let e=iC();ZE(),Gg(e.saveError())}}var Qe=class o{fb=m(Qn);registerWeaning=m(Ze);router=m(le$1);animalSelection=Ce(`weaning`);saving=zi(!1);saveError=zi(null);today=new Date().toLocaleDateString(`sv-SE`);form=this.fb.group({pregnancyId:[``,ye.required],weanedOn:[``,ye.required],weaningWeightKg:[``]});async submit(){if(this.saving())return;if(this.form.invalid){this.form.markAllAsTouched();return}let i=this.form.getRawValue();this.saving.set(!0),this.saveError.set(null);try{await this.registerWeaning.save(i.pregnancyId,i.weanedOn,i.weaningWeightKg||null),await this.router.navigateByUrl(`/reproductive`)}catch(e){this.saveError.set(e instanceof Error&&!e.status?e.message:`No se pudo guardar el destete. Comprueba el servidor y vuelve a intentar.`)}finally{this.saving.set(!1)}}static ɵfac=function(e){return new(e||o)};static ɵcmp=bw({type:o,selectors:[[`app-weaning-event-form`]],decls:53,vars:26,consts:[[1,`form-overlay`],[`role`,`dialog`,`aria-modal`,`true`,`cdkTrapFocus`,``,`cdkTrapFocusAutoCapture`,``,1,`event-dialog`],[`mat-icon-button`,``,`routerLink`,`/reproductive`,1,`dialog-close`],[3,`ngSubmit`,`formGroup`],[1,`form-section`],[`appearance`,`outline`],[`formControlName`,`pregnancyId`,`required`,``,`placeholder`,`Selecciona un animal...`],[3,`value`],[`role`,`status`],[`role`,`alert`],[`matInput`,``,`type`,`date`,`formControlName`,`weanedOn`,`required`,``,3,`max`],[`matInput`,``,`type`,`number`,`min`,`0.01`,`step`,`0.01`,`formControlName`,`weaningWeightKg`],[`matInput`,``,`rows`,`3`,`disabled`,``],[1,`actions`],[`mat-button`,``,`routerLink`,`/reproductive`],[`mat-raised-button`,``,`color`,`primary`,`type`,`submit`,3,`disabled`]],template:function(e,c){e&1&&(Es(0,`div`,0)(1,`mat-card`,1),KC(2,`translate`),Es(3,`mat-card-header`)(4,`mat-card-title`),FC(5),KC(6,`translate`),ll(),Es(7,`a`,2),KC(8,`translate`),Es(9,`mat-icon`),FC(10,`close`),ll()()(),Es(11,`mat-card-content`)(12,`form`,3),Ng(`ngSubmit`,function(){return c.submit()}),Es(13,`section`,4)(14,`h3`),FC(15,`Información del animal`),ll(),Es(16,`mat-form-field`,5)(17,`mat-label`),FC(18,`Animal`),ll(),Es(19,`mat-select`,6),FI(),qw(20,Rn,2,2,`mat-option`,7,Tn),ll()(),Uw(22,Bn,2,0,`p`,8)(23,zn,2,1,`p`,9)(24,An,2,0,`p`,8),ll(),Es(25,`section`,4)(26,`h3`),FC(27,`Detalles del destete`),ll(),Es(28,`mat-form-field`,5)(29,`mat-label`),FC(30),KC(31,`translate`),ll(),Es(32,`input`,10),FI(),ll()(),Es(33,`mat-form-field`,5)(34,`mat-label`),FC(35),KC(36,`translate`),ll(),Es(37,`input`,11),FI(),ll()()(),Es(38,`section`,4)(39,`h3`),FC(40,`Información adicional`),ll(),Es(41,`mat-form-field`,5)(42,`mat-label`),FC(43,`Observaciones`),ll(),wg(44,`textarea`,12),ll()(),Es(45,`div`,13),Uw(46,Ln,2,1,`p`,9),Es(47,`a`,14),FC(48),KC(49,`translate`),ll(),Es(50,`button`,15),FC(51),KC(52,`translate`),ll()()()()()()),e&2&&(ZE(),Eg(`aria-label`,JC(2,12,`forms.weaningTitle`)),ZE(4),Gg(JC(6,14,`forms.weaningTitle`)),ZE(2),Eg(`aria-label`,JC(8,16,`forms.close`)),ZE(5),Ig(`formGroup`,c.form),ZE(7),LI(),ZE(),Zw(c.animalSelection.options()),ZE(2),zw(c.animalSelection.loading()?22:c.animalSelection.error()?23:c.animalSelection.options().length?-1:24),ZE(8),Gg(JC(31,18,`forms.weanedOn`)),ZE(2),Ig(`max`,c.today),LI(),ZE(3),Gg(JC(36,20,`forms.weaningWeightKg`)),ZE(2),LI(),ZE(9),zw(c.saveError()?46:-1),ZE(2),Gg(JC(49,22,`forms.cancel`)),ZE(2),Ig(`disabled`,c.saving()),ZE(),pl(` `,JC(52,24,c.saving()?`calf.saving`:`forms.submitWeaning`),` `))},dependencies:[er,Xn,Ze$1,gn$1,Wn,zn$1,ht,Wt,cn$1,Dn$1,Nt,T,_,k,z,A,Vn,Xe$1,ie$1,Pe$1,Be,lo,ro,Ce$2,bi,ui,fn$1,ie,oe,nn,tt],styles:[`[_nghost-%COMP%]{display:block}.form-overlay[_ngcontent-%COMP%]{position:fixed;z-index:1000;inset:0;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:clamp(16px,4vh,36px);box-sizing:border-box;background:#1022199e;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.event-dialog[_ngcontent-%COMP%]{display:flex;width:min(640px,100%);max-height:calc(100dvh - clamp(32px,8vh,72px));margin:auto;overflow:hidden;border-radius:18px;flex-direction:column;box-shadow:0 22px 60px #081c114d}mat-card-header[_ngcontent-%COMP%]{position:relative;flex:0 0 auto;padding:22px 64px 14px 24px}mat-card-title[_ngcontent-%COMP%]{color:#17271f;font-size:1.35rem;font-weight:700}.dialog-close[_ngcontent-%COMP%]{position:absolute;top:14px;right:16px;color:#53635a}mat-card-content[_ngcontent-%COMP%]{min-height:0;padding:0 24px 20px!important;overflow-y:auto}form[_ngcontent-%COMP%]{display:grid;width:100%;gap:12px}.form-section[_ngcontent-%COMP%]{display:grid;gap:10px;padding:14px;border:1px solid #dce5df;border-radius:12px;background:#fbfcfb}.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 2px;color:#134435;font-size:.95rem}mat-form-field[_ngcontent-%COMP%]{width:100%}.actions[_ngcontent-%COMP%]{position:sticky;z-index:2;bottom:0;display:flex;justify-content:flex-end;gap:8px;margin-top:2px;padding:14px 0 4px;border-top:1px solid #e3e9e5;background:#fff}@media(max-width:600px){.form-overlay[_ngcontent-%COMP%]{padding:10px}.event-dialog[_ngcontent-%COMP%]{max-height:calc(100dvh - 20px);border-radius:14px}mat-card-header[_ngcontent-%COMP%]{padding:18px 54px 12px 16px}mat-card-title[_ngcontent-%COMP%]{font-size:1.15rem}mat-card-content[_ngcontent-%COMP%]{padding:0 16px 14px!important}.form-section[_ngcontent-%COMP%]{padding:12px}.actions[_ngcontent-%COMP%]{flex-wrap:wrap}}`],changeDetection:1})};var Or=[{path:``,component:Ue},{path:`new-event-reproductive`,component:je},{path:`events/pregnancy`,component:We},{path:`events/calving`,component:Ke},{path:`events/dry-off`,component:Xe},{path:`events/weaning`,component:Qe}];export{Or as reproductiveRoutes};