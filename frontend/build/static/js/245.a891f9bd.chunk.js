"use strict";(self.webpackChunk_soomy_soomy_electronic_auctions_web_site=self.webpackChunk_soomy_soomy_electronic_auctions_web_site||[]).push([[245],{70245:function(e,i,n){n.r(i);var a=n(42982),l=n(70885),t=n(72791),s=n(8116),o=n(57496),d=n(45484),c=n(59434),r=n(8977),v=n(62591),u=n(80184);i.default=function(){var e=(0,c.I0)(),i=(0,t.useRef)(null);(0,t.useEffect)((function(){null!==i&&void 0!==i&&i.current&&i.current.scrollIntoView({block:"center"})}),[i]),(0,t.useEffect)((function(){e((0,o.l_)())}),[]);var n=(0,t.useState)(!1),p=(0,l.Z)(n,2),g=p[0],f=p[1],x=(0,c.v9)((function(e){return e.user})).userInfo,m=(0,c.v9)((function(e){return e.transaction})).userTransactionList,h=null!==m&&void 0!==m&&m.transactions?(0,a.Z)(m.transactions).sort((function(e,i){return new Date(i.createdAt)-new Date(e.createdAt)})):[];return(0,t.useEffect)((function(){f(!0),e((0,d.zz)({id:x._id,page:1})).then((function(e){console.log(e),f(!1)}))}),[]),(0,u.jsxs)("div",{className:"px-3 py-2 profile-table",ref:i,children:[(0,u.jsx)("h2",{className:"mx-auto",children:"Transactions "}),(0,u.jsxs)(v.Z,{className:"table edge-shadow",responsive:!0,children:[(0,u.jsx)("thead",{children:(0,u.jsxs)("tr",{children:[(0,u.jsx)("th",{scope:"col",className:"text-center align-middle",children:"Type"}),(0,u.jsx)("th",{scope:"col",className:"text-center align-middle",children:"Date"}),(0,u.jsx)("th",{scope:"col",className:"text-center align-middle",children:"Moyen de paiement"}),(0,u.jsx)("th",{scope:"col",className:"text-center align-middle",children:"Montant"})]})}),g?(0,u.jsx)("tbody",{children:(0,u.jsx)("tr",{children:(0,u.jsx)("td",{colSpan:4,className:"text-center",children:(0,u.jsx)("div",{className:"spinner-border",role:"status",children:(0,u.jsx)("span",{className:"sr-only"})})})})}):h&&h.length>0?(0,u.jsx)("tbody",{children:h.map((function(e){return(0,u.jsxs)("tr",{children:[(0,u.jsx)("th",{scope:"row",className:"text-center align-middle",children:e.type}),(0,u.jsx)("td",{className:"text-center align-middle",children:(0,r.Z)(new Date(e.createdAt),"dd/MM/yyyy")}),(0,u.jsx)("td",{className:"text-center align-middle",children:e.service}),(0,u.jsxs)("td",{className:"text-center align-middle",children:[e.montant," DT"]})]},e._id)}))}):(0,u.jsx)("tbody",{children:(0,u.jsx)("tr",{children:(0,u.jsx)("td",{colSpan:4,className:"text-center",children:"Pas de paiments"})})})]}),(0,u.jsxs)(s.Z,{children:[(0,u.jsx)(s.Z.First,{onClick:function(){e((0,d.zz)({id:x._id,page:1}))}}),(0,u.jsx)(s.Z.Prev,{onClick:function(){e((0,d.zz)({id:x._id,page:1===(null===m||void 0===m?void 0:m.page)?null===m||void 0===m?void 0:m.totalPages:(null===m||void 0===m?void 0:m.page)-1}))}}),(0,u.jsx)(s.Z.Item,{onClick:function(){e((0,d.zz)({id:x._id,page:1}))},active:1===(null===m||void 0===m?void 0:m.page),children:1}),(null===m||void 0===m?void 0:m.totalPages)>5&&(null===m||void 0===m?void 0:m.page)>3&&(0,u.jsx)(s.Z.Ellipsis,{}),3===(null===m||void 0===m?void 0:m.totalPages)&&(0,u.jsx)(s.Z.Item,{onClick:function(){e((0,d.zz)({id:x._id,page:2}))},active:2===(null===m||void 0===m?void 0:m.page),children:2}),(null===m||void 0===m?void 0:m.totalPages)>4&&(0,a.Z)(Array(3).keys()).map((function(e){return e+((null===m||void 0===m?void 0:m.page)===(null===m||void 0===m?void 0:m.totalPages)-2?(null===m||void 0===m?void 0:m.page)-2:(null===m||void 0===m?void 0:m.page)===(null===m||void 0===m?void 0:m.totalPages)-1?(null===m||void 0===m?void 0:m.page)-3:(null===m||void 0===m?void 0:m.page)===(null===m||void 0===m?void 0:m.totalPages)?(null===m||void 0===m?void 0:m.page)-4:1===(null===m||void 0===m?void 0:m.page)?null===m||void 0===m?void 0:m.page:2===(null===m||void 0===m?void 0:m.page)||3===(null===m||void 0===m?void 0:m.page)?1:(null===m||void 0===m?void 0:m.page)-2)})).map((function(i){return(0,u.jsx)(s.Z.Item,{onClick:function(){e((0,d.zz)({id:x._id,page:i+1}))},active:(null===m||void 0===m?void 0:m.page)===i+1,children:i+1})})),4===(null===m||void 0===m?void 0:m.totalPages)&&(0,a.Z)(Array(2).keys()).map((function(e){return e+1})).map((function(i){return(0,u.jsx)(s.Z.Item,{onClick:function(){e((0,d.zz)({id:x._id,page:i+1}))},active:(null===m||void 0===m?void 0:m.page)===i+1,children:i+1})})),(null===m||void 0===m?void 0:m.totalPages)>5&&(null===m||void 0===m?void 0:m.totalPages)-2>(null===m||void 0===m?void 0:m.page)&&(0,u.jsx)(s.Z.Ellipsis,{}),(null===m||void 0===m?void 0:m.totalPages)>1&&(0,u.jsx)(s.Z.Item,{onClick:function(){e((0,d.zz)({id:x._id,page:null===m||void 0===m?void 0:m.totalPages}))},active:(null===m||void 0===m?void 0:m.totalPages)===(null===m||void 0===m?void 0:m.page),children:null===m||void 0===m?void 0:m.totalPages}),(0,u.jsx)(s.Z.Next,{onClick:function(){e((0,d.zz)({id:x._id,page:m.page===(null===m||void 0===m?void 0:m.totalPages)?1:(null===m||void 0===m?void 0:m.page)+1}))}}),(0,u.jsx)(s.Z.Last,{onClick:function(){e((0,d.zz)({id:x._id,page:null===m||void 0===m?void 0:m.totalPages}))}})]})]})}},8116:function(e,i,n){n.d(i,{Z:function(){return y}});var a=n(1413),l=n(45987),t=n(81694),s=n.n(t),o=n(72791),d=n(10162),c=n(16445),r=n(80184),v=["active","disabled","className","style","activeLabel","children"],u=["children"],p=o.forwardRef((function(e,i){var n=e.active,t=e.disabled,o=e.className,d=e.style,u=e.activeLabel,p=e.children,g=(0,l.Z)(e,v),f=n||t?"span":c.Z;return(0,r.jsx)("li",{ref:i,style:d,className:s()(o,"page-item",{active:n,disabled:t}),children:(0,r.jsxs)(f,(0,a.Z)((0,a.Z)({className:"page-link",disabled:t},g),{},{children:[p,n&&u&&(0,r.jsx)("span",{className:"visually-hidden",children:u})]}))})}));p.defaultProps={active:!1,disabled:!1,activeLabel:"(current)"},p.displayName="PageItem";var g=p;function f(e,i){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e,t=o.forwardRef((function(e,t){var s=e.children,o=(0,l.Z)(e,u);return(0,r.jsxs)(p,(0,a.Z)((0,a.Z)({},o),{},{ref:t,children:[(0,r.jsx)("span",{"aria-hidden":"true",children:s||i}),(0,r.jsx)("span",{className:"visually-hidden",children:n})]}))}));return t.displayName=e,t}var x=f("First","\xab"),m=f("Prev","\u2039","Previous"),h=f("Ellipsis","\u2026","More"),j=f("Next","\u203a"),N=f("Last","\xbb"),Z=["bsPrefix","className","size"],b=o.forwardRef((function(e,i){var n=e.bsPrefix,t=e.className,o=e.size,c=(0,l.Z)(e,Z),v=(0,d.vE)(n,"pagination");return(0,r.jsx)("ul",(0,a.Z)((0,a.Z)({ref:i},c),{},{className:s()(t,v,o&&"".concat(v,"-").concat(o))}))}));b.displayName="Pagination";var y=Object.assign(b,{First:x,Prev:m,Ellipsis:h,Item:g,Next:j,Last:N})},62591:function(e,i,n){var a=n(1413),l=n(45987),t=n(81694),s=n.n(t),o=n(72791),d=n(10162),c=n(80184),r=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"],v=o.forwardRef((function(e,i){var n=e.bsPrefix,t=e.className,o=e.striped,v=e.bordered,u=e.borderless,p=e.hover,g=e.size,f=e.variant,x=e.responsive,m=(0,l.Z)(e,r),h=(0,d.vE)(n,"table"),j=s()(t,h,f&&"".concat(h,"-").concat(f),g&&"".concat(h,"-").concat(g),o&&"".concat(h,"-").concat("string"===typeof o?"striped-".concat(o):"striped"),v&&"".concat(h,"-bordered"),u&&"".concat(h,"-borderless"),p&&"".concat(h,"-hover")),N=(0,c.jsx)("table",(0,a.Z)((0,a.Z)({},m),{},{className:j,ref:i}));if(x){var Z="".concat(h,"-responsive");return"string"===typeof x&&(Z="".concat(Z,"-").concat(x)),(0,c.jsx)("div",{className:Z,children:N})}return N}));i.Z=v}}]);
//# sourceMappingURL=245.a891f9bd.chunk.js.map