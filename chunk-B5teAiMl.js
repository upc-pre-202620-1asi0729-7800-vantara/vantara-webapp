import{$n as oM,A as FD,B as JS,Bn as lh,Br as zx,Ct as TM,Dn as it,Er as vh,H as K,Ht as ZM,In as lI,Ir as yh,It as Xn,Jn as nC,Jt as a4,Kn as me,Kt as _c,Ln as lM,Mn as kD,Mr as xe,Mt as Wt,Or as wM,Ot as V,Pt as X,Q as OD,Qn as o4,Qt as bM,R as Im,Rr as zc,Rt as Xx,S as Cm,Sn as hh,Tr as vD,Tt as Tp,V as Jn,Vn as li,Vr as l,Wt as _I,Yn as nN,_r as u4,an as cN,b as CD,bn as hN,br as uN,cr as qn,ct as Pr,dn as f4,dr as re,et as OI,fr as sM,ft as Re,g as Be,gr as ts,gt as SD,h as Bc,hr as tT,i as $p,it as P4,jn as jM,jr as wn$1,kt as V4,lr as qz,lt as Qe$1,m as B,mn as fS,nn as bx,nr as p,or as pb,p as At,pn as fN,qn as mh,r as $l,tt as Oe,v as Bx,w as Ct,wn as i4,wr as v,wt as Te,x as CM,yn as hD,yr as uM,zr}from"./chunk-B93OWrUx.js";import{A as ss,C as Ve,D as ds,E as ct$1,M as ud,N as wd,O as et,P as wi,S as Sd,T as ca,_ as Ii,a as Wr,b as Md,c as rt,d as Ac,f as Ai,g as Fc,h as Fa,i as Ue$1,j as tt,k as fd,l as vt,m as Ed,o as _t,p as Bs,r as Ji,s as en$1,u as zr$1,v as K$1,w as ai,x as Nd,y as Le}from"./main-CAXBZWSV.js";var Ue=class{id;animalId;calfId;confirmedOn;expectedCalvingOn;endedOn;outcome;birthWeightKg;dryOffOn;weanedOn;weaningWeightKg;status;notes;constructor(){this.id=``,this.animalId=``,this.calfId=null,this.confirmedOn=``,this.expectedCalvingOn=null,this.endedOn=null,this.outcome=null,this.birthWeightKg=null,this.dryOffOn=null,this.weanedOn=null,this.weaningWeightKg=null,this.status=``,this.notes=null}hasCalvingResult(){return this.outcome!=null&&this.outcome!==``}};var Ge=class o{toEntityFromResource(r){let e=new Ue;return e.id=r.id,e.animalId=r.animalId,e.calfId=r.calfId??null,e.confirmedOn=r.confirmedOn,e.expectedCalvingOn=r.expectedCalvingOn??null,e.endedOn=r.endedOn??null,e.outcome=r.outcome??null,e.birthWeightKg=r.birthWeightKg??null,e.dryOffOn=r.dryOffOn??null,e.weanedOn=r.weanedOn??null,e.weaningWeightKg=r.weaningWeightKg??null,e.status=r.status,e.notes=r.notes??null,e}toEntitiesFromResponse(r){return r.map(e=>this.toEntityFromResource(e))}static ɵfac=function(e){return new(e||o)};static ɵprov=K({token:o,factory:o.ɵfac})};var U=class o{baseUrl=V4.hatariumApiBaseUrl;pregnanciesEndpoint=V4.hatariumPregnanciesEndpointPath;animalsEndpoint=V4.hatariumAnimalsEndpointPath;medicalRecordsEndpoint=V4.hatariumMedicalRecordsEndpointPath;http=p(nC);pregnancyAssembler=p(Ge);getAnimals(){return this.http.get(`${this.baseUrl}${this.animalsEndpoint}`)}getPregnancy(r){return this.http.get(`${this.baseUrl}${this.pregnanciesEndpoint}/${r}`).pipe(B(e=>this.pregnancyAssembler.toEntityFromResource(e)))}getHistory(r){let e=r?{params:{animalId:r}}:{};return this.http.get(`${this.baseUrl}${this.pregnanciesEndpoint}`,e).pipe(B(c=>this.pregnancyAssembler.toEntitiesFromResponse(c)))}getSummary(){return li({animals:this.http.get(`${this.baseUrl}${this.animalsEndpoint}`),pregnancies:this.http.get(`${this.baseUrl}${this.pregnanciesEndpoint}`),medicalRecords:this.http.get(`${this.baseUrl}${this.medicalRecordsEndpoint}`)}).pipe(B(({animals:r,pregnancies:e,medicalRecords:c})=>{let h=r.filter(p=>p.status===`active`),b=h.filter(p=>p.sex.toLocaleLowerCase()===`hembra`&&!Ji(p.birthDate)),s=new Set(b.map(p=>p.id)),v=e.filter(p=>s.has(p.animalId)&&p.endedOn==null&&p.status!==`weaned`),w=[...new Map([...v].sort((p,M)=>p.confirmedOn.localeCompare(M.confirmedOn)).map(p=>[p.animalId,p])).values()],y=new Date;y.setHours(0,0,0,0);let Z=new Date(y);Z.setMonth(Z.getMonth()+2);let x=w.filter(p=>{if(!p.expectedCalvingOn)return!1;let M=new Date(`${p.expectedCalvingOn}T00:00:00`);return M>=y&&M<=Z}).length,Me=new Set(c.filter(p=>p.healthStatus===`follow_up`&&s.has(p.animalId)).map(p=>p.animalId)),Ee=new Set([...Me].filter(p=>!w.some(M=>M.animalId===p))),mt=new Set(w.map(p=>p.animalId)),nn=b.filter(p=>!mt.has(p.id)&&!Ee.has(p.id)).length,st=new Map(b.map(p=>[p.id,p])),an=w.filter(p=>p.expectedCalvingOn?new Date(`${p.expectedCalvingOn}T00:00:00`)>=y:!1).map(p=>{let M=st.get(p.animalId);return{id:`calving-${p.id}`,type:`calving`,animalLabel:M?`${M.name} \xB7 #${M.earTag}`:`#${p.animalId}`,animalBreed:M?.breed??``,scheduledOn:p.expectedCalvingOn}}).sort((p,M)=>p.scheduledOn.localeCompare(M.scheduledOn)),Oe=[];return e.filter(p=>s.has(p.animalId)).forEach(p=>{let M=st.get(p.animalId),Te={animalLabel:M?`${M.name} \xB7 #${M.earTag}`:`#${p.animalId}`,animalBreed:M?.breed??``};p.confirmedOn&&Oe.push(l({id:`pregnancy-${p.id}`,type:`pregnancy`,occurredOn:p.confirmedOn,status:`confirmed`},Te)),p.endedOn&&Oe.push(l({id:`calving-${p.id}`,type:`calving`,occurredOn:p.endedOn,status:`completed`},Te)),p.dryOffOn&&Oe.push(l({id:`dry-off-${p.id}`,type:`dryOff`,occurredOn:p.dryOffOn,status:`registered`},Te)),p.weanedOn&&Oe.push(l({id:`weaning-${p.id}`,type:`weaning`,occurredOn:p.weanedOn,status:`completed`},Te))}),Oe.sort((p,M)=>M.occurredOn.localeCompare(p.occurredOn)),{reproductiveFemales:b.length,calfCount:h.filter(p=>Ji(p.birthDate)).length,reproductiveFemalePercentage:this.percentage(b.length,h.length),pregnantFemales:w.length,pregnantPercentage:this.percentage(w.length,b.length),upcomingCalvings:x,followUpRequired:Me.size,statusDistribution:{pregnant:mt.size,vacant:nn,inHeat:0,issues:Ee.size},upcomingEvents:an,recentEvents:Oe}}))}confirm(r){let e={animalId:r.animalId,calfId:r.calfId??null,confirmedOn:r.confirmedOn,expectedCalvingOn:r.expectedCalvingOn??null,endedOn:null,outcome:null,birthWeightKg:null,dryOffOn:null,weanedOn:null,weaningWeightKg:null,status:`confirmed`,notes:null};return this.http.post(`${this.baseUrl}${this.pregnanciesEndpoint}`,e).pipe(B(c=>this.pregnancyAssembler.toEntityFromResource(c)))}recordCalving(r,e,c,h){return this.http.patch(`${this.baseUrl}${this.pregnanciesEndpoint}/${r}`,l({endedOn:e,outcome:c,status:`ended`},h?{calfId:h.id,birthWeightKg:String(h.weight)}:{})).pipe(B(b=>this.pregnancyAssembler.toEntityFromResource(b)))}recordDryOff(r,e){return this.http.patch(`${this.baseUrl}${this.pregnanciesEndpoint}/${r}`,{dryOffOn:e,status:`dry_off`}).pipe(B(c=>this.pregnancyAssembler.toEntityFromResource(c)))}recordWeaning(r,e,c){return this.http.patch(`${this.baseUrl}${this.pregnanciesEndpoint}/${r}`,{weanedOn:e,weaningWeightKg:c??null,status:`weaned`}).pipe(B(h=>this.pregnancyAssembler.toEntityFromResource(h)))}percentage(r,e){return e===0?0:Math.round(r/e*1e3)/10}static ɵfac=function(e){return new(e||o)};static ɵprov=K({token:o,factory:o.ɵfac})};var Qt={reproductiveFemales:0,calfCount:0,reproductiveFemalePercentage:0,pregnantFemales:0,pregnantPercentage:0,upcomingCalvings:0,followUpRequired:0,statusDistribution:{pregnant:0,vacant:0,inHeat:0,issues:0},upcomingEvents:[],recentEvents:[]};var G=class o{pregnanciesSignal=V([]);selectedAnimalIdSignal=V(null);loadingSignal=V(!1);errorMessageSignal=V(null);summarySignal=V(Qt);summaryLoadingSignal=V(!1);summaryErrorSignal=V(null);reproductiveApi=p(U);pregnancies=Oe(()=>this.pregnanciesSignal());selectedAnimalId=Oe(()=>this.selectedAnimalIdSignal());loading=Oe(()=>this.loadingSignal());errorMessage=Oe(()=>this.errorMessageSignal());summary=Oe(()=>this.summarySignal());summaryLoading=Oe(()=>this.summaryLoadingSignal());summaryError=Oe(()=>this.summaryErrorSignal());loadSummary(){this.summaryLoadingSignal.set(!0),this.summaryErrorSignal.set(null),this.reproductiveApi.getSummary().subscribe({next:r=>{this.summarySignal.set(r),this.summaryLoadingSignal.set(!1)},error:()=>{this.summaryErrorSignal.set(`No se pudo cargar el resumen reproductivo.`),this.summaryLoadingSignal.set(!1)}})}loadHistory(r){this.loadingSignal.set(!0),this.errorMessageSignal.set(null),this.reproductiveApi.getHistory(r).subscribe({next:e=>{this.pregnanciesSignal.set(e),this.loadingSignal.set(!1)},error:()=>{this.errorMessageSignal.set(`No se pudo cargar el historial reproductivo.`),this.loadingSignal.set(!1)}})}confirm(r){this.reproductiveApi.confirm(r).subscribe({next:e=>{this.pregnanciesSignal.update(c=>[...c,e]),this.loadSummary()},error:()=>this.errorMessageSignal.set(`No se pudo confirmar la preñez.`)})}recordCalving(r,e,c){this.reproductiveApi.recordCalving(r,e,c).subscribe({next:h=>this.replacePregnancy(h),error:()=>this.errorMessageSignal.set(`No se pudo registrar el parto.`)})}recordDryOff(r,e){return this.reproductiveApi.recordDryOff(r,e).pipe(Be(c=>this.replacePregnancy(c)))}recordWeaning(r,e,c){this.reproductiveApi.recordWeaning(r,e,c).subscribe({next:h=>this.replacePregnancy(h),error:()=>this.errorMessageSignal.set(`No se pudo registrar el destete.`)})}replacePregnancy(r){this.pregnanciesSignal.update(e=>e.map(c=>c.id===r.id?r:c)),this.loadSummary()}static ɵfac=function(e){return new(e||o)};static ɵprov=K({token:o,factory:o.ɵfac})};var rn=o=>({count:o});var Jt=(o,r)=>r.id;function on(o,r){o&1&&(_c(0,`p`,9),ZM(1),uN(2,`translate`),hh()),o&2&&(fS(),OD(fN(2,1,`dashboard.summary.loadError`)))}function cn(o,r){if(o&1&&(_c(0,`div`,25)(1,`div`,33)(2,`mat-icon`),ZM(3,`pets`),hh()(),_c(4,`div`,34)(5,`strong`),ZM(6),uN(7,`translate`),hh(),_c(8,`span`),ZM(9),hh()(),_c(10,`time`),ZM(11),hh(),_c(12,`span`,35),ZM(13),uN(14,`translate`),hh()()),o&2){let e=r.$implicit,c=CM();fS(6),OD(fN(7,6,`dashboard.upcomingEvents.estimatedCalving`)),fS(3),kD(``,e.animalLabel,` · `,e.animalBreed),fS(),qn(`datetime`,e.scheduledOn),fS(),vh(` `,c.formatEventDate(e.scheduledOn),` `),fS(2),vh(` `,fN(14,8,`dashboard.upcomingEvents.upcoming`),` `)}}function dn(o,r){o&1&&(_c(0,`div`,26)(1,`mat-icon`,36),ZM(2,`event_available`),hh(),_c(3,`p`),ZM(4),uN(5,`translate`),hh()()),o&2&&(fS(4),OD(fN(5,1,`dashboard.upcomingEvents.empty`)))}function ln(o,r){if(o&1&&(_c(0,`tr`)(1,`td`)(2,`time`),ZM(3),hh()(),_c(4,`td`)(5,`div`,37)(6,`mat-icon`,36),ZM(7,`pets`),hh(),_c(8,`span`)(9,`strong`),ZM(10),hh(),_c(11,`small`),ZM(12),hh()()()(),_c(13,`td`),ZM(14),uN(15,`translate`),hh(),_c(16,`td`),ZM(17),uN(18,`translate`),hh(),_c(19,`td`)(20,`span`,38),ZM(21),uN(22,`translate`),hh()(),_c(23,`td`)(24,`button`,39),ZM(25),uN(26,`translate`),_c(27,`mat-icon`,36),ZM(28,`arrow_forward`),hh()()()()),o&2){let e=r.$implicit,c=CM();fS(2),qn(`datetime`,e.occurredOn),fS(),vh(` `,c.formatEventDate(e.occurredOn),` `),fS(7),OD(e.animalLabel),fS(2),OD(e.animalBreed),fS(2),OD(fN(15,8,`dashboard.recentEvents.types.`+e.type)),fS(3),OD(fN(18,10,`dashboard.recentEvents.details.`+e.type)),fS(4),vh(` `,fN(22,12,`dashboard.recentEvents.statuses.`+e.status),` `),fS(4),vh(` `,fN(26,14,`dashboard.recentEvents.view`),` `)}}function mn(o,r){o&1&&(_c(0,`tr`)(1,`td`,40),ZM(2),uN(3,`translate`),hh()()),o&2&&(fS(2),vh(` `,fN(3,1,`dashboard.recentEvents.empty`),` `))}var je=class o{store=p(G);translate=p($p);reproductiveChartBackground=Oe(()=>{let r=this.store.summary(),e=r.reproductiveFemales;if(e===0)return`#c8d8cc`;let c=r.statusDistribution.pregnant/e*100,h=c+r.statusDistribution.vacant/e*100,b=h+r.statusDistribution.inHeat/e*100;return`conic-gradient(
      #168a58 0% ${c}%,
      #83c9a4 ${c}% ${h}%,
      #e3a82f ${h}% ${b}%,
      #d95b64 ${b}% 100%
    )`});ngOnInit(){this.store.loadSummary()}statusPercentage(r){let e=this.store.summary().reproductiveFemales;return e===0?0:Math.round(r/e*1e3)/10}formatEventDate(r){let e=this.translate.currentLang()===`en`?`en-US`:`es-PE`;return new Intl.DateTimeFormat(e,{day:`2-digit`,month:`short`,year:`numeric`}).format(new Date(`${r}T00:00:00`))}static ɵfac=function(e){return new(e||o)};static ɵcmp=lh({type:o,selectors:[[`app-reproduction-dashboard`]],decls:200,vars:141,consts:[[1,`dashboard-header`],[`mat-raised-button`,``,`color`,`primary`,`routerLink`,`/reproductive/new-event-reproductive`],[1,`summary-grid`],[1,`summary-card`,`summary-card--females`],[`aria-hidden`,`true`,1,`summary-card__icon`],[1,`summary-card`,`summary-card--pregnant`],[`aria-hidden`,`true`,1,`summary-progress`],[1,`summary-card`,`summary-card--calvings`],[1,`summary-card`,`summary-card--follow-up`],[`role`,`alert`,1,`summary-error`],[1,`dashboard-insights`],[1,`insight-card`,`insight-card--status`],[1,`insight-card__header`],[1,`status-content`],[1,`donut-chart`],[1,`donut-chart__center`],[1,`status-legend`],[1,`status-legend__row`],[1,`status-legend__label`],[1,`status-dot`,`status-dot--pregnant`],[1,`status-dot`,`status-dot--vacant`],[1,`status-dot`,`status-dot--heat`],[1,`status-dot`,`status-dot--issues`],[1,`insight-card`,`insight-card--events`],[1,`events-preview`],[1,`event-row`],[1,`events-empty`],[`mat-button`,``,`type`,`button`,1,`events-view-all`],[1,`recent-events-card`],[1,`recent-events-card__header`],[1,`recent-events-table-wrap`],[1,`recent-events-table`],[1,`recent-events-card__footer`],[`aria-hidden`,`true`,1,`event-row__icon`],[1,`event-row__description`],[1,`event-row__status`],[`aria-hidden`,`true`],[1,`animal-cell`],[1,`event-status`],[`type`,`button`,1,`history-action`],[`colspan`,`6`,1,`recent-events-empty`]],template:function(e,c){e&1&&(_c(0,`header`,0)(1,`div`)(2,`h1`),ZM(3),uN(4,`translate`),hh(),_c(5,`p`),ZM(6),uN(7,`translate`),hh(),_c(8,`p`),ZM(9),uN(10,`translate`),hh()(),_c(11,`a`,1)(12,`mat-icon`),ZM(13,`add`),hh(),ZM(14),uN(15,`translate`),hh()(),_c(16,`section`,2),uN(17,`translate`),_c(18,`article`,3)(19,`div`,4)(20,`mat-icon`),ZM(21,`female`),hh()(),_c(22,`h2`),ZM(23),uN(24,`translate`),hh(),_c(25,`strong`),ZM(26),hh(),_c(27,`p`),ZM(28),uN(29,`translate`),hh()(),_c(30,`article`,5)(31,`div`,4)(32,`mat-icon`),ZM(33,`favorite`),hh()(),_c(34,`h2`),ZM(35),uN(36,`translate`),hh(),_c(37,`strong`),ZM(38),hh(),_c(39,`p`),ZM(40),uN(41,`translate`),hh(),_c(42,`div`,6),Bc(43,`span`),hh()(),_c(44,`article`,7)(45,`div`,4)(46,`mat-icon`),ZM(47,`calendar_month`),hh()(),_c(48,`h2`),ZM(49),uN(50,`translate`),hh(),_c(51,`strong`),ZM(52),hh(),_c(53,`p`),ZM(54),uN(55,`translate`),hh()(),_c(56,`article`,8)(57,`div`,4)(58,`mat-icon`),ZM(59,`warning_amber`),hh()(),_c(60,`h2`),ZM(61),uN(62,`translate`),hh(),_c(63,`strong`),ZM(64),hh(),_c(65,`p`),ZM(66),uN(67,`translate`),hh()()(),oM(68,on,3,3,`p`,9),_c(69,`section`,10)(70,`article`,11)(71,`header`,12)(72,`div`)(73,`h2`),ZM(74),uN(75,`translate`),hh(),_c(76,`p`),ZM(77),uN(78,`translate`),hh()()(),_c(79,`div`,13)(80,`div`,14)(81,`div`,15)(82,`strong`),ZM(83),hh(),_c(84,`span`),ZM(85),uN(86,`translate`),hh()()(),_c(87,`div`,16)(88,`div`,17)(89,`span`,18),Bc(90,`i`,19),ZM(91),uN(92,`translate`),hh(),_c(93,`strong`),ZM(94),hh(),_c(95,`span`),ZM(96),hh()(),_c(97,`div`,17)(98,`span`,18),Bc(99,`i`,20),ZM(100),uN(101,`translate`),hh(),_c(102,`strong`),ZM(103),hh(),_c(104,`span`),ZM(105),hh()(),_c(106,`div`,17)(107,`span`,18),Bc(108,`i`,21),ZM(109),uN(110,`translate`),hh(),_c(111,`strong`),ZM(112),hh(),_c(113,`span`),ZM(114),hh()(),_c(115,`div`,17)(116,`span`,18),Bc(117,`i`,22),ZM(118),uN(119,`translate`),hh(),_c(120,`strong`),ZM(121),hh(),_c(122,`span`),ZM(123),hh()(),_c(124,`div`,17)(125,`span`),ZM(126),uN(127,`translate`),hh(),_c(128,`strong`),ZM(129),hh(),_c(130,`span`),ZM(131),hh()(),_c(132,`div`,17)(133,`span`),ZM(134),uN(135,`translate`),hh(),_c(136,`strong`),ZM(137),hh(),_c(138,`span`),ZM(139),hh()()()(),_c(140,`p`),ZM(141),uN(142,`translate`),hh()(),_c(143,`article`,23)(144,`header`,12)(145,`div`)(146,`h2`),ZM(147),uN(148,`translate`),hh(),_c(149,`p`),ZM(150),uN(151,`translate`),hh()()(),_c(152,`div`,24),lM(153,cn,15,10,`div`,25,Jt,!1,dn,6,3,`div`,26),hh(),_c(156,`button`,27),ZM(157),uN(158,`translate`),_c(159,`mat-icon`),ZM(160,`arrow_forward`),hh()()()(),_c(161,`section`,28)(162,`header`,29)(163,`div`)(164,`h2`),ZM(165),uN(166,`translate`),hh(),_c(167,`p`),ZM(168),uN(169,`translate`),hh()()(),_c(170,`div`,30)(171,`table`,31)(172,`thead`)(173,`tr`)(174,`th`),ZM(175),uN(176,`translate`),hh(),_c(177,`th`),ZM(178),uN(179,`translate`),hh(),_c(180,`th`),ZM(181),uN(182,`translate`),hh(),_c(183,`th`),ZM(184),uN(185,`translate`),hh(),_c(186,`th`),ZM(187),uN(188,`translate`),hh(),_c(189,`th`),ZM(190),uN(191,`translate`),hh()()(),_c(192,`tbody`),lM(193,ln,29,16,`tr`,null,Jt,!1,mn,4,3,`tr`),hh()()(),_c(196,`footer`,32),ZM(197),uN(198,`translate`),uN(199,`translate`),hh()()),e&2&&(fS(3),OD(fN(4,66,`dashboard.title`)),fS(3),OD(fN(7,68,`dashboard.subtitle`)),fS(3),OD(hN(10,70,`calf.count`,cN(139,rn,c.store.summary().calfCount))),fS(5),vh(` `,fN(15,73,`dashboard.registerEvent`),` `),fS(2),qn(`aria-label`,fN(17,75,`dashboard.summary.ariaLabel`))(`aria-busy`,c.store.summaryLoading()),fS(7),OD(fN(24,77,`dashboard.summary.reproductiveFemales`)),fS(3),OD(c.store.summary().reproductiveFemales),fS(2),kD(` `,c.store.summary().reproductiveFemalePercentage,`% `,fN(29,79,`dashboard.summary.ofTotal`),` `),fS(7),OD(fN(36,81,`dashboard.summary.pregnant`)),fS(3),OD(c.store.summary().pregnantFemales),fS(2),kD(` `,c.store.summary().pregnantPercentage,`% `,fN(41,83,`dashboard.summary.ofFemales`),` `),fS(3),SD(`width`,c.store.summary().pregnantPercentage,`%`),fS(6),OD(fN(50,85,`dashboard.summary.upcomingCalvings`)),fS(3),OD(c.store.summary().upcomingCalvings),fS(2),OD(fN(55,87,`dashboard.summary.nextTwoMonths`)),fS(7),OD(fN(62,89,`dashboard.summary.followUpRequired`)),fS(3),OD(c.store.summary().followUpRequired),fS(2),OD(fN(67,91,`dashboard.summary.veterinaryReview`)),fS(2),sM(c.store.summaryError()?68:-1),fS(6),OD(fN(75,93,`dashboard.reproductiveStatus.title`)),fS(3),kD(` `,fN(78,95,`dashboard.reproductiveStatus.subtitle`),` (`,c.store.summary().reproductiveFemales,`) `),fS(3),SD(`background`,c.reproductiveChartBackground()),fS(3),OD(c.store.summary().reproductiveFemales),fS(2),OD(fN(86,97,`dashboard.reproductiveStatus.females`)),fS(6),vh(` `,fN(92,99,`dashboard.reproductiveStatus.pregnant`),` `),fS(3),OD(c.store.summary().statusDistribution.pregnant),fS(2),vh(``,c.statusPercentage(c.store.summary().statusDistribution.pregnant),`%`),fS(4),vh(` `,fN(101,101,`dashboard.reproductiveStatus.vacant`),` `),fS(3),OD(c.store.summary().statusDistribution.vacant),fS(2),vh(``,c.statusPercentage(c.store.summary().statusDistribution.vacant),`%`),fS(4),vh(` `,fN(110,103,`dashboard.reproductiveStatus.inHeat`),` `),fS(3),OD(c.store.summary().statusDistribution.inHeat),fS(2),vh(``,c.statusPercentage(c.store.summary().statusDistribution.inHeat),`%`),fS(4),vh(` `,fN(119,105,`dashboard.reproductiveStatus.issues`),` `),fS(3),OD(c.store.summary().statusDistribution.issues),fS(2),vh(``,c.statusPercentage(c.store.summary().statusDistribution.issues),`%`),fS(3),OD(fN(127,107,`dashboard.summary.upcomingCalvings`)),fS(3),OD(c.store.summary().upcomingCalvings),fS(2),vh(``,c.statusPercentage(c.store.summary().upcomingCalvings),`%`),fS(3),OD(fN(135,109,`dashboard.summary.followUpRequired`)),fS(3),OD(c.store.summary().followUpRequired),fS(2),vh(``,c.statusPercentage(c.store.summary().followUpRequired),`%`),fS(2),OD(fN(142,111,`dashboard.reproductiveStatus.relatedIndicators`)),fS(6),OD(fN(148,113,`dashboard.upcomingEvents.title`)),fS(3),OD(fN(151,115,`dashboard.upcomingEvents.subtitle`)),fS(3),uM(c.store.summary().upcomingEvents.slice(0,3)),fS(4),vh(` `,fN(158,117,`dashboard.upcomingEvents.viewAll`),` `),fS(8),OD(fN(166,119,`dashboard.recentEvents.title`)),fS(3),OD(fN(169,121,`dashboard.recentEvents.subtitle`)),fS(7),OD(fN(176,123,`dashboard.recentEvents.date`)),fS(3),OD(fN(179,125,`dashboard.recentEvents.animal`)),fS(3),OD(fN(182,127,`dashboard.recentEvents.eventType`)),fS(3),OD(fN(185,129,`dashboard.recentEvents.detail`)),fS(3),OD(fN(188,131,`dashboard.recentEvents.status`)),fS(3),OD(fN(191,133,`dashboard.recentEvents.action`)),fS(3),uM(c.store.summary().recentEvents.slice(0,5)),fS(4),FD(` `,fN(198,135,`dashboard.recentEvents.showing`),` `,c.store.summary().recentEvents.length>5?5:c.store.summary().recentEvents.length,` `,fN(199,137,`dashboard.recentEvents.of`),` `,c.store.summary().recentEvents.length,` `))},dependencies:[$l,fd,ud,ds,ss,P4],styles:[`[_nghost-%COMP%]{display:block;min-height:100%;padding:32px;box-sizing:border-box;background:radial-gradient(circle at 30% 8%,rgba(208,242,220,.45),transparent 28rem),#fbfdf9}.dashboard-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}.dashboard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0 0 8px;font-size:clamp(2rem,3vw,2.5rem);line-height:1.1}.dashboard-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#53605a}.summary-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:28px}.summary-card[_ngcontent-%COMP%]{min-width:0;min-height:176px;padding:20px;box-sizing:border-box;border:1px solid rgba(28,60,50,.12);border-radius:16px;box-shadow:0 8px 24px #1130260f}.summary-card--females[_ngcontent-%COMP%]{background:linear-gradient(135deg,#fff,#f4fbf6 58%,#e1f5e8)}.summary-card--pregnant[_ngcontent-%COMP%]{background:linear-gradient(135deg,#fff,#f2fbf6 58%,#d9f3e5)}.summary-card--calvings[_ngcontent-%COMP%]{background:linear-gradient(135deg,#fff,#fffaf0 58%,#fff0c9)}.summary-card--follow-up[_ngcontent-%COMP%]{background:linear-gradient(135deg,#fff,#fff6f6 58%,#ffe3e5)}.summary-card__icon[_ngcontent-%COMP%]{display:grid;width:40px;height:40px;margin-bottom:16px;border-radius:12px;place-items:center;color:#114636;background:#daf4e4e6}.summary-card--calvings[_ngcontent-%COMP%]   .summary-card__icon[_ngcontent-%COMP%]{color:#b56a00;background:#fff3d8}.summary-card--follow-up[_ngcontent-%COMP%]   .summary-card__icon[_ngcontent-%COMP%]{color:#c43d49;background:#ffeaec}.summary-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0 0 4px;color:#27322d;font-size:.95rem;font-weight:500}.summary-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;color:#123d27;font-size:2rem;line-height:1.15}.summary-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:6px 0 0;color:#65716b;font-size:.875rem}.summary-progress[_ngcontent-%COMP%]{height:6px;margin-top:14px;overflow:hidden;border-radius:999px;background:#0f40311a}.summary-progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;height:100%;border-radius:inherit;background:#114636;transition:width .2s ease}.summary-error[_ngcontent-%COMP%]{margin:16px 0 0;color:#a22c36}.dashboard-insights[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(0,3fr) minmax(320px,2fr);gap:20px;margin-top:24px}.insight-card[_ngcontent-%COMP%]{min-width:0;min-height:390px;padding:24px;box-sizing:border-box;border:1px solid rgba(28,60,50,.14);border-radius:18px;box-shadow:0 8px 24px #1130260f}.insight-card--status[_ngcontent-%COMP%]{background:#dfece1}.insight-card--events[_ngcontent-%COMP%]{display:flex;flex-direction:column;background:#fff}.insight-card__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0 0 4px;color:#1c2b23;font-size:1.15rem}.insight-card__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#65716b;font-size:.875rem}.status-content[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(230px,.9fr) minmax(230px,1.1fr);align-items:center;gap:32px;margin-top:28px}.donut-chart[_ngcontent-%COMP%]{position:relative;width:min(100%,250px);aspect-ratio:1;margin-inline:auto;border-radius:50%;box-shadow:0 10px 30px #0e403124}.donut-chart[_ngcontent-%COMP%]:after{position:absolute;inset:24%;border-radius:50%;background:#f8fbf8;box-shadow:inset 0 0 0 1px #15423414;content:""}.donut-chart__center[_ngcontent-%COMP%]{position:absolute;z-index:1;inset:29%;display:grid;align-content:center;justify-items:center;text-align:center}.donut-chart__center[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#133d27;font-size:2rem;line-height:1}.donut-chart__center[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-top:8px;color:#5f6e66;font-size:.7rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase}.status-legend[_ngcontent-%COMP%]{display:grid;gap:4px}.status-legend__row[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(0,1fr) auto 54px;align-items:center;gap:12px;min-height:46px;padding:0 10px;border-bottom:1px solid rgba(46,70,91,.1)}.status-legend__label[_ngcontent-%COMP%]{display:flex;align-items:center;min-width:0;gap:10px;color:#33433a}.status-legend__row[_ngcontent-%COMP%] > strong[_ngcontent-%COMP%]{color:#21372b}.status-legend__row[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]:last-child{color:#67766e;text-align:right}.status-dot[_ngcontent-%COMP%]{flex:0 0 auto;width:11px;height:11px;border-radius:50%}.status-dot--pregnant[_ngcontent-%COMP%]{background:#145f49}.status-dot--vacant[_ngcontent-%COMP%]{background:#83b5c9}.status-dot--heat[_ngcontent-%COMP%]{background:#e3a82f}.status-dot--issues[_ngcontent-%COMP%]{background:#d95b64}.events-preview[_ngcontent-%COMP%]{margin-top:20px}.event-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:12px;min-height:76px;border-bottom:1px solid rgba(28,60,50,.1)}.event-row__icon[_ngcontent-%COMP%]{display:grid;width:38px;height:38px;border-radius:11px;place-items:center;color:#b56a00;background:#fff3d8}.event-row__description[_ngcontent-%COMP%]{display:grid;min-width:0;gap:3px}.event-row__description[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#243129;font-size:.9rem}.event-row__description[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{overflow:hidden;color:#748078;font-size:.78rem;text-overflow:ellipsis;white-space:nowrap}.event-row[_ngcontent-%COMP%]   time[_ngcontent-%COMP%]{color:#67736c;font-size:.78rem;white-space:nowrap}.event-row__status[_ngcontent-%COMP%]{grid-column:3;justify-self:end;margin-top:-18px;padding:4px 10px;border-radius:999px;color:#95600c;background:#fff4d9;font-size:.7rem}.events-empty[_ngcontent-%COMP%]{display:grid;min-height:190px;place-items:center;align-content:center;color:#708078;text-align:center}.events-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:8px 0 0}.events-view-all[_ngcontent-%COMP%]{align-self:flex-end;margin-top:auto;color:#114233}.recent-events-card[_ngcontent-%COMP%]{margin-top:24px;padding:22px 24px 16px;border:1px solid rgba(35,72,61,.12);border-radius:18px;background:#eef6ef;box-shadow:0 8px 24px #1130260d}.recent-events-card__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0 0 4px;color:#1d2c24;font-size:1.15rem}.recent-events-card__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#68756e;font-size:.85rem}.recent-events-table-wrap[_ngcontent-%COMP%]{margin-top:18px;overflow-x:auto}.recent-events-table[_ngcontent-%COMP%]{width:100%;min-width:760px;border-collapse:collapse;table-layout:fixed}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:10px 12px;color:#748078;font-size:.68rem;font-weight:600;letter-spacing:.04em;text-align:left;text-transform:uppercase}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(1){width:14%}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(2){width:24%}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(3){width:15%}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(4){width:22%}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(5){width:13%}.recent-events-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(6){width:12%}.recent-events-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:12px;border-top:1px solid rgba(35,72,61,.1);color:#536159;font-size:.8rem;vertical-align:middle}.animal-cell[_ngcontent-%COMP%]{display:flex;align-items:center;min-width:0;gap:9px}.animal-cell[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{flex:0 0 auto;color:#51705e;font-variation-settings:"FILL" 0,"wght" 400}.animal-cell[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{display:grid;min-width:0}.animal-cell[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .animal-cell[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.animal-cell[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#294033;font-size:.82rem}.animal-cell[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{margin-top:2px;color:#78847d}.event-status[_ngcontent-%COMP%]{color:#3f5d77;font-weight:600}.history-action[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:3px;padding:4px 0;border:0;color:#0f372b;background:transparent;font:inherit;font-weight:700;cursor:pointer}.history-action[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:17px;height:17px;font-size:17px}.recent-events-empty[_ngcontent-%COMP%]{height:92px;text-align:center}.recent-events-card__footer[_ngcontent-%COMP%]{padding:14px 12px 0;border-top:1px solid rgba(35,72,61,.08);color:#748078;font-size:.75rem}@media(max-width:1100px){.summary-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.dashboard-insights[_ngcontent-%COMP%]{grid-template-columns:1fr}}@media(max-width:760px){.status-content[_ngcontent-%COMP%]{grid-template-columns:1fr}.donut-chart[_ngcontent-%COMP%]{width:min(100%,230px)}}@media(max-width:680px){[_nghost-%COMP%]{padding:20px}.dashboard-header[_ngcontent-%COMP%]{flex-direction:column}.summary-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.insight-card[_ngcontent-%COMP%]{padding:20px}.recent-events-card[_ngcontent-%COMP%]{padding-inline:16px}.event-row[_ngcontent-%COMP%]{grid-template-columns:42px minmax(0,1fr)}.event-row[_ngcontent-%COMP%]   time[_ngcontent-%COMP%]{grid-column:2}.event-row__status[_ngcontent-%COMP%]{display:none}}`],changeDetection:1})};var sn=(o,r)=>r.key;function pn(o,r){if(o&1&&(_c(0,`a`,6)(1,`mat-icon`),ZM(2),hh(),_c(3,`span`,8)(4,`strong`),ZM(5),uN(6,`translate`),hh(),_c(7,`span`),ZM(8),uN(9,`translate`),hh()(),_c(10,`mat-icon`,9),ZM(11,`chevron_right`),hh()()),o&2){let e=r.$implicit;hD(`routerLink`,e.link),fS(),jM(nN(`event-icon event-`,e.key)),fS(),OD(e.icon),fS(3),OD(fN(6,7,`eventSelector.`+e.key)),fS(3),OD(fN(9,9,`eventSelector.`+e.key+`Desc`))}}var He=class o{events=[{key:`pregnancy`,icon:`favorite`,link:`/reproductive/events/pregnancy`},{key:`calving`,icon:`pets`,link:`/reproductive/events/calving`},{key:`dryOff`,icon:`hourglass_empty`,link:`/reproductive/events/dry-off`},{key:`weaning`,icon:`child_care`,link:`/reproductive/events/weaning`}];static ɵfac=function(e){return new(e||o)};static ɵcmp=lh({type:o,selectors:[[`app-event-selector`]],decls:31,vars:18,consts:[[1,`selector-overlay`],[`role`,`dialog`,`aria-modal`,`true`,`cdkTrapFocus`,``,`cdkTrapFocusAutoCapture`,``,1,`selector-dialog`],[`routerLink`,`/reproductive`,1,`selector-close`],[1,`selector-header`],[`aria-hidden`,`true`,1,`selector-header__icon`],[1,`events-grid`],[1,`event-card`,3,`routerLink`],[1,`info-box`],[1,`event-card__content`],[1,`arrow`]],template:function(e,c){e&1&&(_c(0,`div`,0)(1,`section`,1),uN(2,`translate`),_c(3,`a`,2),uN(4,`translate`),_c(5,`mat-icon`),ZM(6,`close`),hh()(),_c(7,`header`,3)(8,`div`,4)(9,`mat-icon`),ZM(10,`event_available`),hh()(),_c(11,`div`)(12,`h1`),ZM(13),uN(14,`translate`),hh(),_c(15,`p`),ZM(16),uN(17,`translate`),hh()()(),_c(18,`div`,5),lM(19,pn,12,11,`a`,6,sn),hh(),_c(21,`div`,7)(22,`mat-icon`),ZM(23,`info`),hh(),_c(24,`div`)(25,`strong`),ZM(26),uN(27,`translate`),hh(),_c(28,`p`),ZM(29),uN(30,`translate`),hh()()()()()),e&2&&(fS(),qn(`aria-label`,fN(2,6,`eventSelector.title`)),fS(2),qn(`aria-label`,fN(4,8,`forms.close`)),fS(10),OD(fN(14,10,`eventSelector.title`)),fS(3),OD(fN(17,12,`eventSelector.subtitle`)),fS(3),uM(c.events),fS(7),OD(fN(27,14,`eventSelector.whatIsEvent`)),fS(3),OD(fN(30,16,`eventSelector.whatIsEventDesc`)))},dependencies:[$l,ds,ss,Ed,ai,P4],styles:[`[_nghost-%COMP%]{display:block}.selector-overlay[_ngcontent-%COMP%]{position:fixed;z-index:1000;inset:0;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:clamp(16px,5vh,48px);box-sizing:border-box;background:#1022199e;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.selector-dialog[_ngcontent-%COMP%]{position:relative;width:min(760px,100%);max-height:calc(100dvh - clamp(32px,10vh,96px));margin:auto;padding:28px;overflow-y:auto;box-sizing:border-box;background:#fff;border-radius:18px;box-shadow:0 22px 60px #081c114d}.selector-close[_ngcontent-%COMP%]{position:absolute;top:18px;right:18px;display:grid;width:40px;height:40px;border-radius:50%;place-items:center;color:#53635a;text-decoration:none}.selector-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:16px;padding-right:42px}.selector-header__icon[_ngcontent-%COMP%]{display:grid;flex:0 0 auto;width:54px;height:54px;border-radius:14px;place-items:center;color:#114636;background:#e4f5e9}.selector-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0 0 4px;font-size:1.4rem}.selector-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#647169}.events-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:24px 0}.event-card[_ngcontent-%COMP%]{display:grid;grid-template-columns:48px minmax(0,1fr) 24px;align-items:center;min-width:0;min-height:116px;gap:14px;padding:16px;border:1px solid #e0e0e0;border-radius:12px;color:inherit;text-decoration:none;transition:border-color .2s,box-shadow .2s}.event-card[_ngcontent-%COMP%]:hover{border-color:#07583f;box-shadow:0 6px 18px #0e3e3014}.event-icon[_ngcontent-%COMP%]{width:28px;height:28px;border-radius:50%;padding:10px;font-size:28px}.event-pregnancy[_ngcontent-%COMP%], .event-calving[_ngcontent-%COMP%]{background:#e4f4e8;color:#07583f}.event-dryOff[_ngcontent-%COMP%]{background:#fff3e0;color:#ef6c00}.event-weaning[_ngcontent-%COMP%]{background:#f3e5f5;color:#7b1fa2}.event-card__content[_ngcontent-%COMP%]{display:grid;min-width:0;gap:5px}.event-card__content[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{color:#66736b;font-size:.84rem;line-height:1.4}.arrow[_ngcontent-%COMP%]{color:#79857e}.info-box[_ngcontent-%COMP%]{display:flex;gap:12px;background:#e4f4e8;border-radius:12px;padding:16px}.info-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:4px 0 0;color:#59675f;line-height:1.45}@media(max-width:680px){.selector-overlay[_ngcontent-%COMP%]{padding:10px}.selector-dialog[_ngcontent-%COMP%]{max-height:calc(100dvh - 20px);padding:20px 16px}.selector-header[_ngcontent-%COMP%]{align-items:flex-start}.selector-header__icon[_ngcontent-%COMP%]{width:46px;height:46px}.selector-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.15rem}.events-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.event-card[_ngcontent-%COMP%]{min-height:96px}}`],changeDetection:1})};function Se(o){let r=p(U),e=p(X),c=V([]),h=V(!0),b=V(null);return li({animals:r.getAnimals(),pregnancies:r.getHistory()}).pipe(Jn(e)).subscribe({next:({animals:s,pregnancies:v})=>{let w=s.filter(y=>y.status===`active`&&y.sex.toLowerCase()===`hembra`&&!Ji(y.birthDate));if(o===`pregnancy`)c.set(w.map(y=>({value:y.id,label:`${y.name} \xB7 #${y.earTag}`})));else{let y=new Map(w.map(x=>[x.id,x])),Z=new Map(s.map(x=>[x.id,x]));c.set(v.filter(x=>y.has(x.animalId)&&(o===`weaning`?!!x.endedOn&&!x.weanedOn&&x.status!==`weaned`&&!!x.calfId&&Z.get(x.calfId)?.motherId===x.animalId&&Z.get(x.calfId)?.status===`active`&&!Z.get(x.calfId)?.weanedOn:!x.endedOn&&x.status!==`weaned`&&(o!==`dry-off`||!x.dryOffOn))).map(x=>{let Me=y.get(x.animalId),Ee=x.calfId?Z.get(x.calfId):void 0;return{value:x.id,label:o===`weaning`&&Ee?`${Me.name} \xB7 Cr\xEDa: ${Ee.name} (#${Ee.earTag})`:`${Me.name} \xB7 #${Me.earTag} \xB7 ${x.confirmedOn}`}}))}h.set(!1)},error:()=>{b.set(`No se pudieron cargar los animales. Comprueba que el servidor esté disponible.`),h.set(!1)}}),{options:c,loading:h,error:b}}var hn=(o,r)=>r.value;function bn(o,r){if(o&1&&(_c(0,`mat-option`,7),ZM(1),hh()),o&2){let e=r.$implicit;hD(`value`,e.value),fS(),OD(e.label)}}function un(o,r){o&1&&(_c(0,`p`,8),ZM(1,`Cargando animales...`),hh())}function gn(o,r){if(o&1&&(_c(0,`p`,9),ZM(1),hh()),o&2){let e=CM();fS(),OD(e.animalSelection.error())}}function xn(o,r){o&1&&(_c(0,`p`,8),ZM(1,`No hay hembras activas disponibles.`),hh())}var Ke=class o{fb=p(u4);store=p(G);router=p(zr);animalSelection=Se(`pregnancy`);form=this.fb.group({animalId:[``,Tp.required],calfId:[``],confirmedOn:[``,Tp.required],expectedCalvingOn:[``]});submit(){if(this.form.invalid){this.form.markAllAsTouched();return}let r=this.form.getRawValue();this.store.confirm({animalId:r.animalId,calfId:r.calfId||null,confirmedOn:r.confirmedOn,expectedCalvingOn:r.expectedCalvingOn||null}),this.router.navigateByUrl(`/reproductive`)}static ɵfac=function(e){return new(e||o)};static ɵcmp=lh({type:o,selectors:[[`app-pregnancy-event-form`]],decls:57,vars:26,consts:[[1,`form-overlay`],[`role`,`dialog`,`aria-modal`,`true`,`cdkTrapFocus`,``,`cdkTrapFocusAutoCapture`,``,1,`event-dialog`],[`mat-icon-button`,``,`routerLink`,`/reproductive`,1,`dialog-close`],[3,`ngSubmit`,`formGroup`],[1,`form-section`],[`appearance`,`outline`],[`formControlName`,`animalId`,`required`,``,`placeholder`,`Selecciona un animal...`],[3,`value`],[`role`,`status`],[`role`,`alert`],[`matInput`,``,`formControlName`,`calfId`],[`matInput`,``,`type`,`date`,`formControlName`,`confirmedOn`,`required`,``],[`matInput`,``,`type`,`date`,`formControlName`,`expectedCalvingOn`],[`matInput`,``,`rows`,`3`,`disabled`,``],[1,`actions`],[`mat-button`,``,`routerLink`,`/reproductive`],[`mat-raised-button`,``,`color`,`primary`,`type`,`submit`]],template:function(e,c){e&1&&(_c(0,`div`,0)(1,`mat-card`,1),uN(2,`translate`),_c(3,`mat-card-header`)(4,`mat-card-title`),ZM(5),uN(6,`translate`),hh(),_c(7,`a`,2),uN(8,`translate`),_c(9,`mat-icon`),ZM(10,`close`),hh()()(),_c(11,`mat-card-content`)(12,`form`,3),it(`ngSubmit`,function(){return c.submit()}),_c(13,`section`,4)(14,`h3`),ZM(15,`Información del animal`),hh(),_c(16,`mat-form-field`,5)(17,`mat-label`),ZM(18,`Animal`),hh(),_c(19,`mat-select`,6),JS(),lM(20,bn,2,2,`mat-option`,7,hn),hh()(),oM(22,un,2,0,`p`,8)(23,gn,2,1,`p`,9)(24,xn,2,0,`p`,8),hh(),_c(25,`section`,4)(26,`h3`),ZM(27,`Detalles de la preñez`),hh(),_c(28,`mat-form-field`,5)(29,`mat-label`),ZM(30),uN(31,`translate`),hh(),_c(32,`input`,10),JS(),hh()(),_c(33,`mat-form-field`,5)(34,`mat-label`),ZM(35),uN(36,`translate`),hh(),_c(37,`input`,11),JS(),hh()(),_c(38,`mat-form-field`,5)(39,`mat-label`),ZM(40),uN(41,`translate`),hh(),_c(42,`input`,12),JS(),hh()()(),_c(43,`section`,4)(44,`h3`),ZM(45,`Información adicional`),hh(),_c(46,`mat-form-field`,5)(47,`mat-label`),ZM(48,`Observaciones`),hh(),Bc(49,`textarea`,13),hh()(),_c(50,`div`,14)(51,`a`,15),ZM(52),uN(53,`translate`),hh(),_c(54,`button`,16),ZM(55),uN(56,`translate`),hh()()()()()()),e&2&&(fS(),qn(`aria-label`,fN(2,10,`forms.pregnancyTitle`)),fS(4),OD(fN(6,12,`forms.pregnancyTitle`)),fS(2),qn(`aria-label`,fN(8,14,`forms.close`)),fS(5),hD(`formGroup`,c.form),fS(7),tT(),fS(),uM(c.animalSelection.options()),fS(2),sM(c.animalSelection.loading()?22:c.animalSelection.error()?23:c.animalSelection.options().length?-1:24),fS(8),OD(fN(31,16,`forms.calfId`)),fS(2),tT(),fS(3),OD(fN(36,18,`forms.confirmedOn`)),fS(2),tT(),fS(3),OD(fN(41,20,`forms.expectedCalvingOn`)),fS(2),tT(),fS(10),OD(fN(53,22,`forms.cancel`)),fS(3),vh(` `,fN(56,24,`forms.submitPregnancy`),` `))},dependencies:[f4,a4,lI,o4,i4,_I,Bx,Xx,$l,Ed,Sd,wd,Md,Nd,Ve,Fa,Le,Ac,Fc,Wr,zr$1,Ue$1,fd,ud,wi,ds,ss,ai,P4],styles:[`[_nghost-%COMP%]{display:block}.form-overlay[_ngcontent-%COMP%]{position:fixed;z-index:1000;inset:0;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:clamp(16px,4vh,36px);box-sizing:border-box;background:#1022199e;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.event-dialog[_ngcontent-%COMP%]{display:flex;width:min(640px,100%);max-height:calc(100dvh - clamp(32px,8vh,72px));margin:auto;overflow:hidden;border-radius:18px;flex-direction:column;box-shadow:0 22px 60px #081c114d}mat-card-header[_ngcontent-%COMP%]{position:relative;flex:0 0 auto;padding:22px 64px 14px 24px}mat-card-title[_ngcontent-%COMP%]{color:#17271f;font-size:1.35rem;font-weight:700}.dialog-close[_ngcontent-%COMP%]{position:absolute;top:14px;right:16px;color:#53635a}mat-card-content[_ngcontent-%COMP%]{min-height:0;padding:0 24px 20px!important;overflow-y:auto}form[_ngcontent-%COMP%]{display:grid;width:100%;gap:12px}.form-section[_ngcontent-%COMP%]{display:grid;gap:10px;padding:14px;border:1px solid #dce5df;border-radius:12px;background:#fbfcfb}.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 2px;color:#134435;font-size:.95rem}mat-form-field[_ngcontent-%COMP%]{width:100%}.actions[_ngcontent-%COMP%]{position:sticky;z-index:2;bottom:0;display:flex;justify-content:flex-end;gap:8px;margin-top:2px;padding:14px 0 4px;border-top:1px solid #e3e9e5;background:#fff}@media(max-width:600px){.form-overlay[_ngcontent-%COMP%]{padding:10px}.event-dialog[_ngcontent-%COMP%]{max-height:calc(100dvh - 20px);border-radius:14px}mat-card-header[_ngcontent-%COMP%]{padding:18px 54px 12px 16px}mat-card-title[_ngcontent-%COMP%]{font-size:1.15rem}mat-card-content[_ngcontent-%COMP%]{padding:0 16px 14px!important}.form-section[_ngcontent-%COMP%]{padding:12px}.actions[_ngcontent-%COMP%]{flex-wrap:wrap}}`],changeDetection:1})};var en=(()=>{class o{labelPosition=`after`;static ɵfac=function(c){return new(c||o)};static ɵcmp=(function(){return lh({type:o,selectors:[[``,`mat-internal-form-field`,``]],hostAttrs:[1,`mdc-form-field`,`mat-internal-form-field`],hostVars:2,hostBindings:function(h,b){h&2&&ts(`mdc-form-field--align-end`,b.labelPosition===`before`)},inputs:{labelPosition:`labelPosition`},ngContentSelectors:[`*`],decls:1,vars:0,template:function(h,b){h&1&&(bM(),wM(0))},styles:[`.mat-internal-form-field {
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
`],encapsulation:2})})()}return o})();var ct={color:`accent`,clickAction:`check-indeterminate`,disabledInteractive:!1};var vn=new v(`mat-checkbox-default-options`,{providedIn:`root`,factory:()=>ct});var N=(function(o){return o[o.Init=0]=`Init`,o[o.Checked=1]=`Checked`,o[o.Unchecked=2]=`Unchecked`,o[o.Indeterminate=3]=`Indeterminate`,o})(N||{});var dt=class{source;checked};var lt=(()=>{class o{_elementRef=p(Re);_changeDetectorRef=p(At);_ngZone=p(Te);_animationsDisabled=ct$1();_options=p(vn,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let c=new dt;return c.source=this,c.checked=e,c}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:`mdc-checkbox--anim-unchecked-checked`,uncheckedToIndeterminate:`mdc-checkbox--anim-unchecked-indeterminate`,checkedToUnchecked:`mdc-checkbox--anim-checked-unchecked`,checkedToIndeterminate:`mdc-checkbox--anim-checked-indeterminate`,indeterminateToChecked:`mdc-checkbox--anim-indeterminate-checked`,indeterminateToUnchecked:`mdc-checkbox--anim-indeterminate-unchecked`};ariaLabel=``;ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition=`after`;name=null;change=new re;indeterminateChange=new re;value;disableRipple=!1;_inputElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass=``;_currentCheckState=N.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){p(tt).load(ca);let e=p(new zc(`tabindex`),{optional:!0});this._options=this._options||ct,this.color=this._options.color||ct.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=p(et).getId(`mat-mdc-checkbox-`),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let c=e!=this._indeterminate();this._indeterminate.set(e),c&&(e?this._transitionCheckState(N.Indeterminate):this._transitionCheckState(this.checked?N.Checked:N.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=V(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let c=this._currentCheckState,h=this._getAnimationTargetElement();if(!(c===e||!h)&&(this._currentAnimationClass&&h.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(c,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){h.classList.add(this._currentAnimationClass);let b=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{h.classList.remove(b)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!==`noop`?(this.indeterminate&&e!==`check`&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?N.Checked:N.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e===`noop`)&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,c){if(this._animationsDisabled)return``;switch(e){case N.Init:if(c===N.Checked)return this._animationClasses.uncheckedToChecked;if(c==N.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case N.Unchecked:return c===N.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case N.Checked:return c===N.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case N.Indeterminate:return c===N.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return``}_syncIndeterminate(e){let c=this._inputElement;c&&(c.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_preventBubblingFromLabel(e){e.target&&this._inputElement&&e.target!==this._inputElement.nativeElement&&e.stopPropagation()}static ɵfac=function(c){return new(c||o)};static ɵcmp=(function(){let e=[`input`];return lh({type:o,selectors:[[`mat-checkbox`]],viewQuery:function(b,s){if(b&1&&CD(e,5),b&2){let v;mh(v=yh())&&(s._inputElement=v.first)}},hostAttrs:[1,`mat-mdc-checkbox`],hostVars:16,hostBindings:function(b,s){b&2&&(vD(`id`,s.id),qn(`tabindex`,null)(`aria-label`,null)(`aria-labelledby`,null),jM(s.color?`mat-`+s.color:`mat-accent`),ts(`_mat-animation-noopable`,s._animationsDisabled)(`mdc-checkbox--disabled`,s.disabled)(`mat-mdc-checkbox-disabled`,s.disabled)(`mat-mdc-checkbox-checked`,s.checked)(`mat-mdc-checkbox-disabled-interactive`,s.disabledInteractive))},inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],ariaExpanded:[2,`aria-expanded`,`ariaExpanded`,Pr],ariaControls:[0,`aria-controls`,`ariaControls`],ariaOwns:[0,`aria-owns`,`ariaOwns`],id:`id`,required:[2,`required`,`required`,Pr],labelPosition:`labelPosition`,name:`name`,value:`value`,disableRipple:[2,`disableRipple`,`disableRipple`,Pr],tabIndex:[2,`tabIndex`,`tabIndex`,h=>h==null?void 0:qz(h)],color:`color`,disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,Pr],checked:[2,`checked`,`checked`,Pr],disabled:[2,`disabled`,`disabled`,Pr],indeterminate:[2,`indeterminate`,`indeterminate`,Pr]},outputs:{change:`change`,indeterminateChange:`indeterminateChange`},exportAs:[`matCheckbox`],features:[xe([{provide:Xn,useExisting:me(()=>o),multi:!0},{provide:wn$1,useExisting:o,multi:!0}]),Qe$1],ngContentSelectors:[`*`],decls:15,vars:23,consts:[[`checkbox`,``],[`input`,``],[`label`,``],[`mat-internal-form-field`,``,3,`click`,`labelPosition`,`for`],[1,`mdc-checkbox`],[`aria-hidden`,`true`,1,`mat-mdc-checkbox-touch-target`],[`type`,`checkbox`,1,`mdc-checkbox__native-control`,3,`blur`,`click`,`change`,`checked`,`indeterminate`,`disabled`,`id`,`required`,`tabIndex`],[`aria-hidden`,`true`,1,`mdc-checkbox__ripple`],[`aria-hidden`,`true`,1,`mdc-checkbox__background`],[`focusable`,`false`,`viewBox`,`0 0 24 24`,1,`mdc-checkbox__checkmark`],[`fill`,`none`,`d`,`M1.73,12.91 8.1,19.28 22.79,4.59`,1,`mdc-checkbox__checkmark-path`],[1,`mdc-checkbox__mixedmark`],[`mat-ripple`,``,`aria-hidden`,`true`,1,`mat-mdc-checkbox-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mat-internal-form-field-label`,`mdc-label`]],template:function(b,s){if(b&1&&(bM(),_c(0,`label`,3),it(`click`,function(w){return s._preventBubblingFromLabel(w)}),_c(1,`span`,4,0),Bc(3,`span`,5),_c(4,`input`,6,1),it(`blur`,function(){return s._onBlur()})(`click`,function(){return s._onInputClick()})(`change`,function(w){return s._onInteractionEvent(w)}),hh(),Bc(6,`span`,7),_c(7,`span`,8),Cm(),_c(8,`svg`,9),Bc(9,`path`,10),hh(),Im(),Bc(10,`span`,11),hh(),Bc(11,`span`,12),hh(),_c(12,`span`,13,2),wM(14),hh()()),b&2){let v=TM(2);hD(`labelPosition`,s.labelPosition)(`for`,s.inputId),fS(4),ts(`mdc-checkbox--selected`,s.checked),hD(`checked`,s.checked)(`indeterminate`,s.indeterminate)(`disabled`,s.disabled&&!s.disabledInteractive)(`id`,s.inputId)(`required`,s.required)(`tabIndex`,s.disabled&&!s.disabledInteractive?-1:s.tabIndex),qn(`aria-label`,s.ariaLabel||null)(`aria-labelledby`,s.ariaLabelledby)(`aria-describedby`,s.ariaDescribedby)(`aria-checked`,s.indeterminate?`mixed`:null)(`aria-controls`,s.ariaControls)(`aria-disabled`,s.disabled&&s.disabledInteractive?!0:null)(`aria-expanded`,s.ariaExpanded)(`aria-owns`,s.ariaOwns)(`name`,s.name)(`value`,s.value),fS(7),hD(`matRippleTrigger`,v)(`matRippleDisabled`,s.disableRipple||s.disabled)(`matRippleCentered`,!0)}},dependencies:[Bs,en],styles:[`.mdc-checkbox {
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
`],encapsulation:2})})()}return o})();var tn=(()=>{class o{static ɵfac=function(c){return new(c||o)};static ɵmod=Wt({type:o});static ɵinj=Ct({imports:[lt,K$1]})}return o})();var Xe=class o{reproductiveApi=p(U);livestockApi=p(_t);livestockStore=p(en$1);reproductiveStore=p(G);notifications=p(vt);async save(r){let e=await pb(this.reproductiveApi.getPregnancy(r.pregnancyId));if(e.endedOn||e.status===`weaned`)throw new Error(`Este parto ya fue registrado.`);let c=new Date(`${r.on}T00:00:00`);if(Number.isNaN(c.getTime())||c>new Date||r.on<e.confirmedOn)throw new Error(`La fecha del parto debe ser posterior a la confirmación y no puede estar en el futuro.`);if(!r.outcome.trim())throw new Error(`Indica el resultado del parto.`);let h=await pb(this.livestockApi.getAnimalById(e.animalId));if(h.status!==`active`||h.sex!==`Hembra`||h.isCalf())throw new Error(`No se encontró una madre activa apta para registrar el parto.`);let b;if(r.calf){let s=r.calf;if(!s.name.trim()||!s.earTag.trim()||![`Hembra`,`Macho`].includes(s.sex)||!Number.isFinite(s.weight)||s.weight<=0)throw new Error(`Completa el nombre, arete, sexo y peso de la cría.`);let v=await pb(this.livestockApi.getAnimals());if(v.some(y=>y.earTag===s.earTag.trim()))throw new Error(`El arete de la cría ya pertenece a otro animal.`);let w=Object.assign(new rt,{id:`anm-birth-${e.id}`,rancherId:h.rancherId,lotId:h.lotId,species:h.species,breed:h.breed,name:s.name.trim(),earTag:s.earTag.trim(),sex:s.sex,weight:s.weight,birthDate:r.on,motherId:h.id,status:`active`,registeredAt:new Date().toISOString().slice(0,10)});if(v.some(y=>y.id===w.id))throw new Error(`Ya existe una cría asociada a esta preñez. Revisa el inventario antes de registrar otro parto.`);b=await pb(this.livestockApi.createAnimal(w))}try{await pb(this.reproductiveApi.recordCalving(e.id,r.on,r.outcome.trim(),b))}catch(s){if(b)try{await pb(this.livestockApi.deleteAnimal(b.id))}catch{throw this.livestockStore.rememberAnimal(b),new Error(`La cría se guardó, pero no se pudo guardar el parto ni revertir la creación. Revisa el inventario antes de volver a intentar.`)}throw s}b&&this.livestockStore.rememberAnimal(b),this.reproductiveStore.loadHistory(),this.reproductiveStore.loadSummary(),await pb(this.notifications.publish({recipientUserId:h.rancherId,type:`CALVING_REGISTERED`,title:`Parto registrado`,description:`Se registr\xF3 el parto de ${h.name} el ${r.on}${b?`. Nueva cr\xEDa: ${b.name} (#${b.earTag})`:``}.`,relatedEntityType:`Pregnancy`,relatedEntityId:e.id})),b&&await pb(this.notifications.publish({recipientUserId:b.rancherId,type:`ANIMAL_REGISTERED`,title:`Nueva cría registrada`,description:`${b.name} (#${b.earTag}) se agreg\xF3 al ganado. Madre: ${h.name}.`,relatedEntityType:`Animal`,relatedEntityId:b.id}))}static ɵfac=function(e){return new(e||o)};static ɵprov=K({token:o,factory:o.ɵfac})};var _n=(o,r)=>r.value;function yn(o,r){if(o&1&&(_c(0,`mat-option`,7),ZM(1),hh()),o&2){let e=r.$implicit;hD(`value`,e.value),fS(),OD(e.label)}}function Cn(o,r){o&1&&(_c(0,`p`,8),ZM(1,`Cargando animales...`),hh())}function Sn(o,r){if(o&1&&(_c(0,`p`,9),ZM(1),hh()),o&2){let e=CM();fS(),OD(e.animalSelection.error())}}function Mn(o,r){o&1&&(_c(0,`p`,8),ZM(1,`No hay animales con una preñez vigente para este evento.`),hh())}function En(o,r){o&1&&(_c(0,`div`,17)(1,`mat-form-field`,5)(2,`mat-label`),ZM(3),uN(4,`translate`),hh(),_c(5,`input`,18),JS(),hh(),_c(6,`mat-error`),ZM(7),uN(8,`translate`),hh()(),_c(9,`mat-form-field`,5)(10,`mat-label`),ZM(11),uN(12,`translate`),hh(),_c(13,`input`,19),JS(),hh(),_c(14,`mat-error`),ZM(15),uN(16,`translate`),hh()(),_c(17,`mat-form-field`,5)(18,`mat-label`),ZM(19),uN(20,`translate`),hh(),_c(21,`mat-select`,20),JS(),_c(22,`mat-option`,21),ZM(23),uN(24,`translate`),hh(),_c(25,`mat-option`,22),ZM(26),uN(27,`translate`),hh()()(),_c(28,`mat-form-field`,5)(29,`mat-label`),ZM(30),uN(31,`translate`),hh(),_c(32,`input`,23),JS(),hh(),_c(33,`span`,24),ZM(34,`kg`),hh(),_c(35,`mat-error`),ZM(36),uN(37,`translate`),hh()()(),_c(38,`p`),ZM(39),uN(40,`translate`),hh()),o&2&&(fS(3),OD(fN(4,10,`animal.name`)),fS(2),tT(),fS(2),OD(fN(8,12,`calf.required`)),fS(4),OD(fN(12,14,`animal.earTag`)),fS(2),tT(),fS(2),OD(fN(16,16,`calf.required`)),fS(4),OD(fN(20,18,`animal.sex`)),fS(2),tT(),fS(2),OD(fN(24,20,`livestock.female`)),fS(3),OD(fN(27,22,`livestock.male`)),fS(4),OD(fN(31,24,`calf.birthWeight`)),fS(2),tT(),fS(4),OD(fN(37,26,`calf.positiveWeight`)),fS(3),OD(fN(40,28,`calf.inheritMother`)))}function On(o,r){o&1&&(_c(0,`p`),ZM(1),uN(2,`translate`),hh()),o&2&&(fS(),OD(fN(2,1,`calf.withoutCalf`)))}function wn(o,r){if(o&1&&(_c(0,`p`,9),ZM(1),hh()),o&2){let e=CM();fS(),OD(e.saveError())}}var Ye=class o{fb=p(u4);registerCalving=p(Xe);router=p(zr);animalSelection=Se(`calving`);saving=V(!1);saveError=V(null);today=new Date().toLocaleDateString(`sv-SE`);form=this.fb.group({pregnancyId:[``,Tp.required],calvingOn:[``,Tp.required],outcome:[``,Tp.required],registerCalf:[!0],calf:this.fb.group({name:[``,[Tp.required,Tp.pattern(/\S/)]],earTag:[``,[Tp.required,Tp.pattern(/\S/)]],sex:[`Hembra`,Tp.required],weight:[null,[Tp.required,Tp.min(.01)]]})});toggleCalf(r){r?this.form.controls.calf.enable():this.form.controls.calf.disable()}async submit(){if(this.saving())return;if(this.form.invalid){this.form.markAllAsTouched();return}let r=this.form.getRawValue();this.saving.set(!0),this.saveError.set(null);try{await this.registerCalving.save({pregnancyId:r.pregnancyId,on:r.calvingOn,outcome:r.outcome,calf:r.registerCalf?{name:r.calf.name,earTag:r.calf.earTag,sex:r.calf.sex,weight:r.calf.weight}:void 0}),await this.router.navigateByUrl(`/reproductive`)}catch(e){this.saveError.set(e instanceof Error&&!e.status?e.message:`No se pudo guardar el parto. Comprueba el servidor y vuelve a intentar.`)}finally{this.saving.set(!1)}}static ɵfac=function(e){return new(e||o)};static ɵcmp=lh({type:o,selectors:[[`app-calving-event-form`]],decls:63,vars:36,consts:[[1,`form-overlay`],[`role`,`dialog`,`aria-modal`,`true`,`cdkTrapFocus`,``,`cdkTrapFocusAutoCapture`,``,1,`event-dialog`],[`mat-icon-button`,``,`routerLink`,`/reproductive`,1,`dialog-close`],[3,`ngSubmit`,`formGroup`],[1,`form-section`],[`appearance`,`outline`],[`formControlName`,`pregnancyId`,`required`,``,`placeholder`,`Selecciona un animal...`],[3,`value`],[`role`,`status`],[`role`,`alert`],[`matInput`,``,`type`,`date`,`formControlName`,`calvingOn`,`required`,``,3,`max`],[`matInput`,``,`formControlName`,`outcome`,`required`,``,3,`placeholder`],[`formControlName`,`registerCalf`,3,`change`],[`matInput`,``,`rows`,`3`,`disabled`,``],[1,`actions`],[`mat-button`,``,`routerLink`,`/reproductive`],[`mat-raised-button`,``,`color`,`primary`,`type`,`submit`,3,`disabled`],[`formGroupName`,`calf`,1,`calf-fields`],[`matInput`,``,`formControlName`,`name`,`required`,``],[`matInput`,``,`formControlName`,`earTag`,`required`,``],[`formControlName`,`sex`,`required`,``],[`value`,`Hembra`],[`value`,`Macho`],[`matInput`,``,`type`,`number`,`min`,`0.01`,`step`,`0.01`,`formControlName`,`weight`,`required`,``],[`matTextSuffix`,``]],template:function(e,c){e&1&&(_c(0,`div`,0)(1,`mat-card`,1),uN(2,`translate`),_c(3,`mat-card-header`)(4,`mat-card-title`),ZM(5),uN(6,`translate`),hh(),_c(7,`a`,2),uN(8,`translate`),_c(9,`mat-icon`),ZM(10,`close`),hh()()(),_c(11,`mat-card-content`)(12,`form`,3),it(`ngSubmit`,function(){return c.submit()}),_c(13,`section`,4)(14,`h3`),ZM(15,`Información del animal`),hh(),_c(16,`mat-form-field`,5)(17,`mat-label`),ZM(18,`Animal`),hh(),_c(19,`mat-select`,6),JS(),lM(20,yn,2,2,`mat-option`,7,_n),hh()(),oM(22,Cn,2,0,`p`,8)(23,Sn,2,1,`p`,9)(24,Mn,2,0,`p`,8),hh(),_c(25,`section`,4)(26,`h3`),ZM(27,`Detalles del parto`),hh(),_c(28,`mat-form-field`,5)(29,`mat-label`),ZM(30),uN(31,`translate`),hh(),_c(32,`input`,10),JS(),hh()(),_c(33,`mat-form-field`,5)(34,`mat-label`),ZM(35),uN(36,`translate`),hh(),_c(37,`input`,11),uN(38,`translate`),JS(),hh()()(),_c(39,`section`,4)(40,`h3`),ZM(41),uN(42,`translate`),hh(),_c(43,`mat-checkbox`,12),JS(),it(`change`,function(b){return c.toggleCalf(b.checked)}),ZM(44),uN(45,`translate`),hh(),oM(46,En,41,30)(47,On,3,3,`p`),hh(),_c(48,`section`,4)(49,`h3`),ZM(50,`Información adicional`),hh(),_c(51,`mat-form-field`,5)(52,`mat-label`),ZM(53,`Observaciones`),hh(),Bc(54,`textarea`,13),hh()(),_c(55,`div`,14),oM(56,wn,2,1,`p`,9),_c(57,`a`,15),ZM(58),uN(59,`translate`),hh(),_c(60,`button`,16),ZM(61),uN(62,`translate`),hh()()()()()()),e&2&&(fS(),qn(`aria-label`,fN(2,16,`forms.calvingTitle`)),fS(4),OD(fN(6,18,`forms.calvingTitle`)),fS(2),qn(`aria-label`,fN(8,20,`forms.close`)),fS(5),hD(`formGroup`,c.form),fS(7),tT(),fS(),uM(c.animalSelection.options()),fS(2),sM(c.animalSelection.loading()?22:c.animalSelection.error()?23:c.animalSelection.options().length?-1:24),fS(8),OD(fN(31,22,`forms.calvingOn`)),fS(2),hD(`max`,c.today),tT(),fS(3),OD(fN(36,24,`forms.outcome`)),fS(2),hD(`placeholder`,fN(38,26,`forms.outcomePlaceholder`)),tT(),fS(4),OD(fN(42,28,`calf.birthRegistration`)),fS(2),tT(),fS(),vh(` `,fN(45,30,`calf.registerNew`),` `),fS(2),sM(c.form.controls.registerCalf.value?46:47),fS(10),sM(c.saveError()?56:-1),fS(2),OD(fN(59,32,`forms.cancel`)),fS(2),hD(`disabled`,c.saving()),fS(),vh(` `,fN(62,34,c.saving()?`calf.saving`:`forms.submitCalving`),` `))},dependencies:[f4,a4,lI,zx,o4,i4,_I,bx,Bx,Xx,OI,$l,Ed,Sd,wd,Md,Nd,Ve,Fa,Le,Ii,Ai,Ac,Fc,Wr,zr$1,Ue$1,fd,ud,wi,ds,ss,tn,lt,ai,P4],styles:[`[_nghost-%COMP%]{display:block}.form-overlay[_ngcontent-%COMP%]{position:fixed;z-index:1000;inset:0;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:clamp(16px,4vh,36px);box-sizing:border-box;background:#1022199e;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.event-dialog[_ngcontent-%COMP%]{display:flex;width:min(640px,100%);max-height:calc(100dvh - clamp(32px,8vh,72px));margin:auto;overflow:hidden;border-radius:18px;flex-direction:column;box-shadow:0 22px 60px #081c114d}mat-card-header[_ngcontent-%COMP%]{position:relative;flex:0 0 auto;padding:22px 64px 14px 24px}mat-card-title[_ngcontent-%COMP%]{color:#17271f;font-size:1.35rem;font-weight:700}.dialog-close[_ngcontent-%COMP%]{position:absolute;top:14px;right:16px;color:#53635a}mat-card-content[_ngcontent-%COMP%]{min-height:0;padding:0 24px 20px!important;overflow-y:auto}form[_ngcontent-%COMP%]{display:grid;width:100%;gap:12px}.form-section[_ngcontent-%COMP%]{display:grid;gap:10px;padding:14px;border:1px solid #dce5df;border-radius:12px;background:#fbfcfb}.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 2px;color:#134435;font-size:.95rem}mat-form-field[_ngcontent-%COMP%]{width:100%}.actions[_ngcontent-%COMP%]{position:sticky;z-index:2;bottom:0;display:flex;justify-content:flex-end;gap:8px;margin-top:2px;padding:14px 0 4px;border-top:1px solid #e3e9e5;background:#fff}@media(max-width:600px){.form-overlay[_ngcontent-%COMP%]{padding:10px}.event-dialog[_ngcontent-%COMP%]{max-height:calc(100dvh - 20px);border-radius:14px}mat-card-header[_ngcontent-%COMP%]{padding:18px 54px 12px 16px}mat-card-title[_ngcontent-%COMP%]{font-size:1.15rem}mat-card-content[_ngcontent-%COMP%]{padding:0 16px 14px!important}.form-section[_ngcontent-%COMP%]{padding:12px}.actions[_ngcontent-%COMP%]{flex-wrap:wrap}}.calf-fields[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}@media(max-width:480px){.calf-fields[_ngcontent-%COMP%]{grid-template-columns:1fr}}`],changeDetection:1})};var In=(o,r)=>r.value;function Pn(o,r){if(o&1&&(_c(0,`mat-option`,7),ZM(1),hh()),o&2){let e=r.$implicit;hD(`value`,e.value),fS(),OD(e.label)}}function Nn(o,r){o&1&&(_c(0,`p`,8),ZM(1,`Cargando animales...`),hh())}function Fn(o,r){if(o&1&&(_c(0,`p`,9),ZM(1),hh()),o&2){let e=CM();fS(),OD(e.animalSelection.error())}}function Dn(o,r){o&1&&(_c(0,`p`,8),ZM(1,`No hay animales con una preñez vigente para este evento.`),hh())}function Tn(o,r){if(o&1&&(_c(0,`p`,9),ZM(1),hh()),o&2){let e=CM();fS(),OD(e.saveError())}}var Ze=class o{fb=p(u4);store=p(G);router=p(zr);api=p(U);animalSelection=Se(`dry-off`);saving=V(!1);saveError=V(null);today=new Date().toLocaleDateString(`sv-SE`);form=this.fb.group({pregnancyId:[``,Tp.required],dryOffOn:[``,Tp.required]});async submit(){if(this.saving())return;if(this.form.invalid){this.form.markAllAsTouched();return}let r=this.form.getRawValue();this.saving.set(!0),this.saveError.set(null);try{let e=await pb(this.api.getPregnancy(r.pregnancyId));if(e.endedOn||e.dryOffOn)throw new Error(`Esta preñez ya tiene un parto o un secado registrado.`);if(r.dryOffOn<e.confirmedOn||r.dryOffOn>this.today)throw new Error(`El secado debe ser posterior a la confirmación y no puede estar en el futuro.`);await pb(this.store.recordDryOff(r.pregnancyId,r.dryOffOn)),await this.router.navigateByUrl(`/reproductive`)}catch(e){this.saveError.set(e instanceof Error&&!e.status?e.message:`No se pudo registrar el secado. Comprueba el servidor.`)}finally{this.saving.set(!1)}}static ɵfac=function(e){return new(e||o)};static ɵcmp=lh({type:o,selectors:[[`app-dry-off-event-form`]],decls:48,vars:23,consts:[[1,`form-overlay`],[`role`,`dialog`,`aria-modal`,`true`,`cdkTrapFocus`,``,`cdkTrapFocusAutoCapture`,``,1,`event-dialog`],[`mat-icon-button`,``,`routerLink`,`/reproductive`,1,`dialog-close`],[3,`ngSubmit`,`formGroup`],[1,`form-section`],[`appearance`,`outline`],[`formControlName`,`pregnancyId`,`required`,``,`placeholder`,`Selecciona un animal...`],[3,`value`],[`role`,`status`],[`role`,`alert`],[`matInput`,``,`type`,`date`,`formControlName`,`dryOffOn`,`required`,``,3,`max`],[`matInput`,``,`rows`,`3`,`disabled`,``],[1,`actions`],[`mat-button`,``,`routerLink`,`/reproductive`],[`mat-raised-button`,``,`color`,`primary`,`type`,`submit`,3,`disabled`]],template:function(e,c){e&1&&(_c(0,`div`,0)(1,`mat-card`,1),uN(2,`translate`),_c(3,`mat-card-header`)(4,`mat-card-title`),ZM(5),uN(6,`translate`),hh(),_c(7,`a`,2),uN(8,`translate`),_c(9,`mat-icon`),ZM(10,`close`),hh()()(),_c(11,`mat-card-content`)(12,`form`,3),it(`ngSubmit`,function(){return c.submit()}),_c(13,`section`,4)(14,`h3`),ZM(15,`Información del animal`),hh(),_c(16,`mat-form-field`,5)(17,`mat-label`),ZM(18,`Animal`),hh(),_c(19,`mat-select`,6),JS(),lM(20,Pn,2,2,`mat-option`,7,In),hh()(),oM(22,Nn,2,0,`p`,8)(23,Fn,2,1,`p`,9)(24,Dn,2,0,`p`,8),hh(),_c(25,`section`,4)(26,`h3`),ZM(27,`Detalles del secado`),hh(),_c(28,`mat-form-field`,5)(29,`mat-label`),ZM(30),uN(31,`translate`),hh(),_c(32,`input`,10),JS(),hh()()(),_c(33,`section`,4)(34,`h3`),ZM(35,`Información adicional`),hh(),_c(36,`mat-form-field`,5)(37,`mat-label`),ZM(38,`Observaciones`),hh(),Bc(39,`textarea`,11),hh()(),_c(40,`div`,12),oM(41,Tn,2,1,`p`,9),_c(42,`a`,13),ZM(43),uN(44,`translate`),hh(),_c(45,`button`,14),ZM(46),uN(47,`translate`),hh()()()()()()),e&2&&(fS(),qn(`aria-label`,fN(2,11,`forms.dryOffTitle`)),fS(4),OD(fN(6,13,`forms.dryOffTitle`)),fS(2),qn(`aria-label`,fN(8,15,`forms.close`)),fS(5),hD(`formGroup`,c.form),fS(7),tT(),fS(),uM(c.animalSelection.options()),fS(2),sM(c.animalSelection.loading()?22:c.animalSelection.error()?23:c.animalSelection.options().length?-1:24),fS(8),OD(fN(31,17,`forms.dryOffOn`)),fS(2),hD(`max`,c.today),tT(),fS(9),sM(c.saveError()?41:-1),fS(2),OD(fN(44,19,`forms.cancel`)),fS(2),hD(`disabled`,c.saving()),fS(),vh(` `,fN(47,21,c.saving()?`calf.saving`:`forms.submitDryOff`),` `))},dependencies:[f4,a4,lI,o4,i4,_I,Bx,Xx,$l,Ed,Sd,wd,Md,Nd,Ve,Fa,Le,Ac,Fc,Wr,zr$1,Ue$1,fd,ud,wi,ds,ss,ai,P4],styles:[`[_nghost-%COMP%]{display:block}.form-overlay[_ngcontent-%COMP%]{position:fixed;z-index:1000;inset:0;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:clamp(16px,4vh,36px);box-sizing:border-box;background:#1022199e;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.event-dialog[_ngcontent-%COMP%]{display:flex;width:min(640px,100%);max-height:calc(100dvh - clamp(32px,8vh,72px));margin:auto;overflow:hidden;border-radius:18px;flex-direction:column;box-shadow:0 22px 60px #081c114d}mat-card-header[_ngcontent-%COMP%]{position:relative;flex:0 0 auto;padding:22px 64px 14px 24px}mat-card-title[_ngcontent-%COMP%]{color:#17271f;font-size:1.35rem;font-weight:700}.dialog-close[_ngcontent-%COMP%]{position:absolute;top:14px;right:16px;color:#53635a}mat-card-content[_ngcontent-%COMP%]{min-height:0;padding:0 24px 20px!important;overflow-y:auto}form[_ngcontent-%COMP%]{display:grid;width:100%;gap:12px}.form-section[_ngcontent-%COMP%]{display:grid;gap:10px;padding:14px;border:1px solid #dce5df;border-radius:12px;background:#fbfcfb}.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 2px;color:#134435;font-size:.95rem}mat-form-field[_ngcontent-%COMP%]{width:100%}.actions[_ngcontent-%COMP%]{position:sticky;z-index:2;bottom:0;display:flex;justify-content:flex-end;gap:8px;margin-top:2px;padding:14px 0 4px;border-top:1px solid #e3e9e5;background:#fff}@media(max-width:600px){.form-overlay[_ngcontent-%COMP%]{padding:10px}.event-dialog[_ngcontent-%COMP%]{max-height:calc(100dvh - 20px);border-radius:14px}mat-card-header[_ngcontent-%COMP%]{padding:18px 54px 12px 16px}mat-card-title[_ngcontent-%COMP%]{font-size:1.15rem}mat-card-content[_ngcontent-%COMP%]{padding:0 16px 14px!important}.form-section[_ngcontent-%COMP%]{padding:12px}.actions[_ngcontent-%COMP%]{flex-wrap:wrap}}`],changeDetection:1})};var Qe=class o{reproductiveApi=p(U);reproductiveStore=p(G);livestockApi=p(_t);livestockStore=p(en$1);async save(r,e,c){let h=await pb(this.reproductiveApi.getPregnancy(r));if(!h.endedOn||h.weanedOn||!h.calfId)throw new Error(`Selecciona un parto con una cría pendiente de destete.`);let b=new Date(`${e}T00:00:00`);if(Number.isNaN(b.getTime())||b>new Date||e<h.endedOn)throw new Error(`El destete debe ser posterior al parto y no puede estar en el futuro.`);let s=c?Number(c):void 0;if(s!==void 0&&(!Number.isFinite(s)||s<=0))throw new Error(`El peso al destete debe ser mayor que cero.`);let v=await pb(this.livestockApi.getAnimalById(h.calfId));if(v.motherId!==h.animalId||v.weanedOn||v.status!==`active`)throw new Error(`La cría no está vinculada a esta madre, ya fue destetada o no está activa.`);let w=await pb(this.livestockApi.updateAnimal(v.id,l({weanedOn:e},s!==void 0?{weight:s}:{})));try{await pb(this.reproductiveApi.recordWeaning(r,e,c))}catch(y){try{await pb(this.livestockApi.updateAnimal(v.id,{weanedOn:v.weanedOn,weight:v.weight}))}catch{throw this.livestockStore.rememberAnimal(w),new Error(`Se actualizó la cría, pero no su historial reproductivo. Revisa ambos registros antes de volver a intentar.`)}throw y}this.livestockStore.rememberAnimal(w),this.reproductiveStore.loadHistory(),this.reproductiveStore.loadSummary()}static ɵfac=function(e){return new(e||o)};static ɵprov=K({token:o,factory:o.ɵfac})};var Rn=(o,r)=>r.value;function Bn(o,r){if(o&1&&(_c(0,`mat-option`,7),ZM(1),hh()),o&2){let e=r.$implicit;hD(`value`,e.value),fS(),OD(e.label)}}function zn(o,r){o&1&&(_c(0,`p`,8),ZM(1,`Cargando animales...`),hh())}function An(o,r){if(o&1&&(_c(0,`p`,9),ZM(1),hh()),o&2){let e=CM();fS(),OD(e.animalSelection.error())}}function Ln(o,r){o&1&&(_c(0,`p`,8),ZM(1,`No hay animales con un parto registrado pendiente de destete.`),hh())}function $n(o,r){if(o&1&&(_c(0,`p`,9),ZM(1),hh()),o&2){let e=CM();fS(),OD(e.saveError())}}var Je=class o{fb=p(u4);registerWeaning=p(Qe);router=p(zr);animalSelection=Se(`weaning`);saving=V(!1);saveError=V(null);today=new Date().toLocaleDateString(`sv-SE`);form=this.fb.group({pregnancyId:[``,Tp.required],weanedOn:[``,Tp.required],weaningWeightKg:[``]});async submit(){if(this.saving())return;if(this.form.invalid){this.form.markAllAsTouched();return}let r=this.form.getRawValue();this.saving.set(!0),this.saveError.set(null);try{await this.registerWeaning.save(r.pregnancyId,r.weanedOn,r.weaningWeightKg||null),await this.router.navigateByUrl(`/reproductive`)}catch(e){this.saveError.set(e instanceof Error&&!e.status?e.message:`No se pudo guardar el destete. Comprueba el servidor y vuelve a intentar.`)}finally{this.saving.set(!1)}}static ɵfac=function(e){return new(e||o)};static ɵcmp=lh({type:o,selectors:[[`app-weaning-event-form`]],decls:53,vars:26,consts:[[1,`form-overlay`],[`role`,`dialog`,`aria-modal`,`true`,`cdkTrapFocus`,``,`cdkTrapFocusAutoCapture`,``,1,`event-dialog`],[`mat-icon-button`,``,`routerLink`,`/reproductive`,1,`dialog-close`],[3,`ngSubmit`,`formGroup`],[1,`form-section`],[`appearance`,`outline`],[`formControlName`,`pregnancyId`,`required`,``,`placeholder`,`Selecciona un animal...`],[3,`value`],[`role`,`status`],[`role`,`alert`],[`matInput`,``,`type`,`date`,`formControlName`,`weanedOn`,`required`,``,3,`max`],[`matInput`,``,`type`,`number`,`min`,`0.01`,`step`,`0.01`,`formControlName`,`weaningWeightKg`],[`matInput`,``,`rows`,`3`,`disabled`,``],[1,`actions`],[`mat-button`,``,`routerLink`,`/reproductive`],[`mat-raised-button`,``,`color`,`primary`,`type`,`submit`,3,`disabled`]],template:function(e,c){e&1&&(_c(0,`div`,0)(1,`mat-card`,1),uN(2,`translate`),_c(3,`mat-card-header`)(4,`mat-card-title`),ZM(5),uN(6,`translate`),hh(),_c(7,`a`,2),uN(8,`translate`),_c(9,`mat-icon`),ZM(10,`close`),hh()()(),_c(11,`mat-card-content`)(12,`form`,3),it(`ngSubmit`,function(){return c.submit()}),_c(13,`section`,4)(14,`h3`),ZM(15,`Información del animal`),hh(),_c(16,`mat-form-field`,5)(17,`mat-label`),ZM(18,`Animal`),hh(),_c(19,`mat-select`,6),JS(),lM(20,Bn,2,2,`mat-option`,7,Rn),hh()(),oM(22,zn,2,0,`p`,8)(23,An,2,1,`p`,9)(24,Ln,2,0,`p`,8),hh(),_c(25,`section`,4)(26,`h3`),ZM(27,`Detalles del destete`),hh(),_c(28,`mat-form-field`,5)(29,`mat-label`),ZM(30),uN(31,`translate`),hh(),_c(32,`input`,10),JS(),hh()(),_c(33,`mat-form-field`,5)(34,`mat-label`),ZM(35),uN(36,`translate`),hh(),_c(37,`input`,11),JS(),hh()()(),_c(38,`section`,4)(39,`h3`),ZM(40,`Información adicional`),hh(),_c(41,`mat-form-field`,5)(42,`mat-label`),ZM(43,`Observaciones`),hh(),Bc(44,`textarea`,12),hh()(),_c(45,`div`,13),oM(46,$n,2,1,`p`,9),_c(47,`a`,14),ZM(48),uN(49,`translate`),hh(),_c(50,`button`,15),ZM(51),uN(52,`translate`),hh()()()()()()),e&2&&(fS(),qn(`aria-label`,fN(2,12,`forms.weaningTitle`)),fS(4),OD(fN(6,14,`forms.weaningTitle`)),fS(2),qn(`aria-label`,fN(8,16,`forms.close`)),fS(5),hD(`formGroup`,c.form),fS(7),tT(),fS(),uM(c.animalSelection.options()),fS(2),sM(c.animalSelection.loading()?22:c.animalSelection.error()?23:c.animalSelection.options().length?-1:24),fS(8),OD(fN(31,18,`forms.weanedOn`)),fS(2),hD(`max`,c.today),tT(),fS(3),OD(fN(36,20,`forms.weaningWeightKg`)),fS(2),tT(),fS(9),sM(c.saveError()?46:-1),fS(2),OD(fN(49,22,`forms.cancel`)),fS(2),hD(`disabled`,c.saving()),fS(),vh(` `,fN(52,24,c.saving()?`calf.saving`:`forms.submitWeaning`),` `))},dependencies:[f4,a4,lI,zx,o4,i4,_I,bx,Bx,Xx,$l,Ed,Sd,wd,Md,Nd,Ve,Fa,Le,Ac,Fc,Wr,zr$1,Ue$1,fd,ud,wi,ds,ss,ai,P4],styles:[`[_nghost-%COMP%]{display:block}.form-overlay[_ngcontent-%COMP%]{position:fixed;z-index:1000;inset:0;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:clamp(16px,4vh,36px);box-sizing:border-box;background:#1022199e;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.event-dialog[_ngcontent-%COMP%]{display:flex;width:min(640px,100%);max-height:calc(100dvh - clamp(32px,8vh,72px));margin:auto;overflow:hidden;border-radius:18px;flex-direction:column;box-shadow:0 22px 60px #081c114d}mat-card-header[_ngcontent-%COMP%]{position:relative;flex:0 0 auto;padding:22px 64px 14px 24px}mat-card-title[_ngcontent-%COMP%]{color:#17271f;font-size:1.35rem;font-weight:700}.dialog-close[_ngcontent-%COMP%]{position:absolute;top:14px;right:16px;color:#53635a}mat-card-content[_ngcontent-%COMP%]{min-height:0;padding:0 24px 20px!important;overflow-y:auto}form[_ngcontent-%COMP%]{display:grid;width:100%;gap:12px}.form-section[_ngcontent-%COMP%]{display:grid;gap:10px;padding:14px;border:1px solid #dce5df;border-radius:12px;background:#fbfcfb}.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 2px;color:#134435;font-size:.95rem}mat-form-field[_ngcontent-%COMP%]{width:100%}.actions[_ngcontent-%COMP%]{position:sticky;z-index:2;bottom:0;display:flex;justify-content:flex-end;gap:8px;margin-top:2px;padding:14px 0 4px;border-top:1px solid #e3e9e5;background:#fff}@media(max-width:600px){.form-overlay[_ngcontent-%COMP%]{padding:10px}.event-dialog[_ngcontent-%COMP%]{max-height:calc(100dvh - 20px);border-radius:14px}mat-card-header[_ngcontent-%COMP%]{padding:18px 54px 12px 16px}mat-card-title[_ngcontent-%COMP%]{font-size:1.15rem}mat-card-content[_ngcontent-%COMP%]{padding:0 16px 14px!important}.form-section[_ngcontent-%COMP%]{padding:12px}.actions[_ngcontent-%COMP%]{flex-wrap:wrap}}`],changeDetection:1})};var Nr=[{path:``,component:je},{path:`new-event-reproductive`,component:He},{path:`events/pregnancy`,component:Ke},{path:`events/calving`,component:Ye},{path:`events/dry-off`,component:Ze},{path:`events/weaning`,component:Je}];export{Nr as reproductiveRoutes};