"use strict";(self.webpackChunk_soomy_soomy_electronic_auctions_web_site=self.webpackChunk_soomy_soomy_electronic_auctions_web_site||[]).push([[781],{5346:function(e,n,t){t.d(n,{d:function(){return i},p:function(){return r}});var i=function(e){switch(null===e||void 0===e?void 0:e.getMonth()){case 0:return"JAN";case 1:return"FEV";case 2:return"MAR";case 3:return"AVR";case 4:return"MAI";case 5:return"JUI";case 6:return"JUL";case 7:return"AOU";case 8:return"SEP";case 9:return"OCT";case 10:return"NOV";case 11:return"DEC";default:return"NAN"}},r=function(e){switch(null===e||void 0===e?void 0:e.getMonth()){case 0:return"Janvier";case 1:return"F\xe9vrier";case 2:return"Mars";case 3:return"Avril";case 4:return"Mai";case 5:return"Juin";case 6:return"Juillet";case 7:return"Aout";case 8:return"Septembre";case 9:return"Octobre";case 10:return"Novembre";case 11:return"D\xe9cembre";default:return"NAN"}}},35781:function(e,n,t){t.r(n),t.d(n,{default:function(){return j}});var i=t(42982),r=t(70885),l=t(72791),a=t(82056),c=t(43504),o=t(5346),s=t(59434),d=t(8977),u=t(74569),A=t.n(u),v=t(80184),m=function(e){var n,t,i,a,u,m,p,f,h,g,x,j,b,N,y,J,R,w,D,Z,Q,E,M,k=(0,l.useState)(0),C=(0,r.Z)(k,2),T=(C[0],C[1]);(0,l.useEffect)((function(){var n;A().get("/participations/getNumberOfParticipations/".concat(null===(n=e.product)||void 0===n?void 0:n._id)).then((function(e){return T(e.data)}))}),[e]);(0,s.v9)((function(e){return e.participation})).userParticipationList;return(0,v.jsx)("div",{class:"card card-class ".concat("home"===e.variant?"home-card":"auction-card"),children:(0,v.jsxs)(c.rU,{to:"".concat("premium"===(null===(n=e.product)||void 0===n?void 0:n.roomCategory)?"/premiumProduct/"+(null===(t=e.product)||void 0===t?void 0:t._id.toString()):"/product/"+(null===e||void 0===e||null===(i=e.product)||void 0===i?void 0:i._id.toString())),children:[(0,v.jsxs)("div",{className:"img-container mt-3",children:[(0,v.jsx)("img",{className:"brand-img",src:null===e||void 0===e||null===(a=e.product)||void 0===a||null===(u=a.product)||void 0===u||null===(m=u.brand)||void 0===m||null===(p=m.logo)||void 0===p?void 0:p.imageURL}),(0,v.jsx)("img",{src:null===e||void 0===e||null===(f=e.product)||void 0===f||null===(h=f.product)||void 0===h||null===(g=h.image)||void 0===g?void 0:g.imageURL,className:"img-produit",alt:"product"}),(0,v.jsx)("h3",{children:null===e||void 0===e||null===(x=e.product)||void 0===x||null===(j=x.product)||void 0===j?void 0:j.title})]}),(0,v.jsxs)("div",{class:"text-container pb-2",children:[(0,v.jsxs)("p",{children:[(0,v.jsx)("span",{className:"bold-price",children:null===e||void 0===e||null===(b=e.product)||void 0===b||null===(N=b.product)||void 0===N?void 0:N.prix}),"DT",null!==e&&void 0!==e&&null!==(y=e.product)&&void 0!==y&&null!==(J=y.product)&&void 0!==J&&J.partner?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("span",{className:"bold-price",children:"chez"}),(0,v.jsx)("img",{src:null===e||void 0===e||null===(R=e.product)||void 0===R||null===(w=R.product)||void 0===w||null===(D=w.partner)||void 0===D||null===(Z=D.image)||void 0===Z?void 0:Z.imageURL,alt:"partner",className:"partner-logo"})]}):null]}),(0,v.jsxs)("div",{className:"d-flex align-items-end justify-content-evenly w-100 px-4 pb-2",children:[(0,v.jsxs)("div",{className:"date-finished w-25",children:[(0,v.jsx)("h3",{children:(0,d.Z)(new Date(null===e||void 0===e||null===(Q=e.product)||void 0===Q?void 0:Q.endDate),"dd")}),(0,v.jsxs)("p",{children:[(0,o.d)(new Date(null===e||void 0===e||null===(E=e.product)||void 0===E?void 0:E.endDate))," "]}),(0,v.jsxs)("p",{children:[" ",(0,d.Z)(new Date(null===e||void 0===e||null===(M=e.product)||void 0===M?void 0:M.endDate),"HH:mm")]})]}),(0,v.jsx)("button",{children:(0,v.jsx)("p",{children:"Voir D\xe9tails"})})]})]})]})})},p=t(32318),f=t(47022),h=t(24849),g=t(57496),x=t(35054),j=function(){var e,n,t,c,o=(0,l.useState)(),d=(0,r.Z)(o,2),u=d[0],j=d[1],b=(0,l.useState)(!1),N=(0,r.Z)(b,2),y=N[0],J=N[1],R=(0,l.useState)(!1),w=(0,r.Z)(R,2),D=w[0],Z=w[1],Q=(0,l.useState)("all"),E=(0,r.Z)(Q,2),M=E[0],k=E[1],C=(0,s.I0)();(0,l.useEffect)((function(){C((0,g.PR)())}),[]),(0,l.useEffect)((function(){J(!0),A().get("/rooms/getFinishedAuctions/".concat(30)).then((function(e){J(!1),j(e.data),Z(0===e.data.length)})).catch((function(e){return J(!1)}))}),[]);(0,l.useEffect)((function(){C((0,p.Ni)())}),[C]);var T=(0,s.v9)((function(e){return e.category})).totalCategoryList,U=window.innerWidth>=1382,S=[];if(Array.isArray(u)&&(S=(0,i.Z)(u),U))for(var L=4-S.length%4,B=0;B<L;B++)S.push(null);var W="".concat(25,"%"),F=U&&S.length>=6,G=4-S.length%4,I=window.innerWidth<=583;return(0,v.jsxs)("div",{children:[(0,v.jsxs)("main",{className:"container pt-2 px-lg-0 pb-1",children:[(0,v.jsxs)("section",{className:"page-title page-title-auction mb-4",children:[(0,v.jsx)("h1",{children:"Ench\xe8res Termin\xe9s"}),(0,v.jsx)("h3",{children:"D\xe9couvrez les derni\xe8res ench\xe8res remport\xe9es."})]}),(0,v.jsxs)("section",{className:"d-flex justify-content-between my-3 px-3 auction-filter",children:[(0,v.jsxs)("div",{className:"d-flex justify-content-between filter-container",children:[(0,v.jsx)("label",{for:"filter",className:"mt-1 d-none d-lg-block me-2 ",children:"Filtrer par :"}),(0,v.jsxs)("select",{className:"form-select mb-2","aria-label":"Default select example",id:"filter",onChange:function(e){!function(e){J(!0),A().get("/rooms/getFinishedAuctions/".concat(e.target.value)).then((function(e){J(!1),j(e.data),Z(0===e.data.length)})).catch((function(e){return J(!1)}))}(e)},children:[(0,v.jsx)("option",{value:"30",children:"dernier 30 Jours"}),(0,v.jsx)("option",{value:"7",children:"dernier 7 Jours"}),(0,v.jsx)("option",{value:"3",children:"dernier 3 Jours"})]})]}),(0,v.jsxs)("div",{className:"d-flex justify-content-between filter-container",children:[(0,v.jsx)("label",{for:"category",className:"mt-1 d-none d-lg-block me-2",children:"Cat\xe9gorie"}),(0,v.jsxs)("select",{className:"form-select mb-2 me-1 border-none","aria-label":"Default select example",id:"filter",name:"category",onChange:function(e){return k(e.target.value)},children:[(0,v.jsx)("option",{value:"all",children:"Choisir Categorie"}),T?null===T||void 0===T||null===(e=T.categories)||void 0===e?void 0:e.map((function(e){return(0,v.jsx)("option",{value:e._id,children:e.name})})):null]})]})]}),y?(0,v.jsx)(f.Z,{fluid:!0,className:"d-flex justify-content-center align-items-center",children:(0,v.jsx)(h.Z,{animation:"border",className:"mx-auto color-pink my-6"})}):D?(0,v.jsxs)("div",{className:"card-etapes w-75 my-5",children:[(0,v.jsx)("img",{src:x}),(0,v.jsx)("h2",{className:"my-2",children:"Pas d'ench\xe8res disponibles !"})]}):(0,v.jsxs)("section",{className:"mt-3 d-flex ".concat(U?"justify-content-between":"justify-content-start"," flex-wrap align-items-start px-lg-1 w-100 mx-auto ").concat(F?"second-line-two-cards":""),style:{flexWrap:U?"wrap":"nowrap"},children:[null===(n=S)||void 0===n||null===(t=n.filter((function(e){return"all"===filter||("rentable"===filter?"rentable"===e.privilege:"selected"===filter?"selected"===e.privilege:"populaire"!==filter||"populaire"===e.privilege)})))||void 0===t||null===(c=t.filter((function(e){var n,t;return"all"===M||(null===e||void 0===e||null===(n=e.product)||void 0===n||null===(t=n.category)||void 0===t?void 0:t._id)===M})))||void 0===c?void 0:c.map((function(e,n){return e?(0,v.jsx)(m,{product:e,variant:"auction"},null===e||void 0===e?void 0:e._id):(0,v.jsx)("div",{className:"card card-class auction-card",style:{width:W,flexBasis:W,visibility:"hidden",display:"none"}},"empty-".concat(n))})),G>0&&Array.from({length:G}).map((function(e,n){return(0,v.jsx)("div",{className:"card card-class auction-card",style:{width:W,flexBasis:W,visibility:"hidden",display:I?"none":"block"}},"remaining-empty-".concat(n))}))]})]}),(0,v.jsx)(a.Z,{})]})}},24849:function(e,n,t){var i=t(1413),r=t(45987),l=t(81694),a=t.n(l),c=t(72791),o=t(10162),s=t(80184),d=["bsPrefix","variant","animation","size","as","className"],u=c.forwardRef((function(e,n){var t=e.bsPrefix,l=e.variant,c=e.animation,u=e.size,A=e.as,v=void 0===A?"div":A,m=e.className,p=(0,r.Z)(e,d);t=(0,o.vE)(t,"spinner");var f="".concat(t,"-").concat(c);return(0,s.jsx)(v,(0,i.Z)((0,i.Z)({ref:n},p),{},{className:a()(m,f,u&&"".concat(f,"-").concat(u),l&&"text-".concat(l))}))}));u.displayName="Spinner",n.Z=u},35054:function(e){e.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=781.4dcc88fb.chunk.js.map