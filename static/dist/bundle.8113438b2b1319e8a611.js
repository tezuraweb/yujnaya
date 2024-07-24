"use strict";(self.webpackChunkdepot=self.webpackChunkdepot||[]).push([[735],{4735:function(e,t,a){a.r(t),a.d(t,{default:function(){return _}});var r=a(6540),o=a(1083),n=a(641),l=a(6546),c=()=>r.createElement("div",{className:"hero"},r.createElement("div",{className:"hero__column hero__column--left"},r.createElement("div",{className:"hero__desc"},"База «Южная»"),r.createElement("h1",{className:"hero__title"},"Аренда помещений в Ижевске"),r.createElement(n.default,{modal:!0,modifier:"hero"})),r.createElement("div",{className:"hero__column hero__column--right"},r.createElement("div",{className:"hero__features"},r.createElement("div",{className:"hero__feature"},r.createElement("div",{className:"hero__feature--icon button button--icon"},r.createElement(l.A,{selector:"HandshakeIcon",width:"30",height:"23.333"})),r.createElement("div",{className:"hero__feature--text"},"Без посредников")),r.createElement("div",{className:"hero__feature"},r.createElement("div",{className:"hero__feature--icon button button--icon"},r.createElement(l.A,{selector:"DocsIcon",width:"30",height:"30"})),r.createElement("div",{className:"hero__feature--text"},"Сервис одного окна")),r.createElement("div",{className:"hero__feature"},r.createElement("div",{className:"hero__feature--icon button button--icon"},r.createElement(l.A,{selector:"AreaIcon",width:"30",height:"30"})),r.createElement("div",{className:"hero__feature--text"},"12 корпусов 66 000 м²"))))),m=a(5469),s=({types:e=[],onSubmit:t,formData:a,setFormData:o})=>{const n=(0,m.t)(),[c,s]=(0,r.useState)(a.priceDesc),i=e=>{const{name:t,value:r,type:n,checked:l}=e.target;o({...a,[t]:"checkbox"===n?l:r})};return r.createElement("form",{onSubmit:e=>{e.preventDefault(),t()},className:"form form--main"},r.createElement("div",{className:"form__wrapper"},r.createElement("div",{className:"form__group"},r.createElement("label",{className:"form__label"},"Тип"),r.createElement("select",{name:"type",value:a.type,onChange:i,className:"form__input form__input--select"},r.createElement("option",{value:""},"Не выбрано"),e.map((e=>r.createElement("option",{value:e},e))))),r.createElement("div",{className:"form__group"},r.createElement("label",{className:"form__label"},"Площадь"),r.createElement("select",{name:"area",value:a.area,onChange:e=>{const{value:t}=e.target;let r="",n="";"1"===t?n="100":"2"===t?(r="100",n="200"):"3"===t&&(r="200"),o({...a,areaFrom:r,areaTo:n})},className:"form__input form__input--select"},r.createElement("option",{value:""},"Не выбрано"),r.createElement("option",{value:"1"},"до 100"),r.createElement("option",{value:"2"},"100 - 200"),r.createElement("option",{value:"3"},"более 200"))),r.createElement("div",{className:"form__group"},r.createElement("div",{className:"form__group form__group--inline form__group--marginBottom"},r.createElement("label",{className:"form__label form__label--inline"},"Стоимость"),r.createElement("button",{type:"button",onClick:()=>{o({...a,priceDesc:!c}),s((e=>!e))},className:"form__button--price"},r.createElement("span",{className:"form__button--arrow "+(c?"active":"")},"↓"),r.createElement("span",{className:"form__button--arrow "+(c?"":"active")},"↑"))),r.createElement("div",{className:"form__group form__group--inline"},r.createElement("div",{className:"form__group form__group--inline form__group--marginRight"},r.createElement("label",{className:"form__label form__label--inline"},"От"),r.createElement("input",{type:"number",name:"priceFrom",value:a.priceFrom,onChange:i,className:"form__input form__input--number"})),r.createElement("div",{className:"form__group form__group--inline"},r.createElement("label",{className:"form__label form__label--inline"},"До"),r.createElement("input",{type:"number",name:"priceTo",value:a.priceTo,onChange:i,className:"form__input form__input--number"})))),r.createElement("div",{className:"form__group form__group--hide"},r.createElement("input",{type:"checkbox",name:"promotions",id:"promotionCheckbox",checked:a.promotions,onChange:i,className:"form__checkbox"}),r.createElement("label",{className:"form__label",htmlFor:"promotionCheckbox"},"Акции")),r.createElement("button",{type:"submit",className:"form__button button button--large animate--pulse"},"Показать")),r.createElement("a",{className:"form__link",href:"/search"},r.createElement("span",null,"Расширенный поиск"),"mobile"===n&&r.createElement(l.A,{selector:"SearchIcon",width:"20",height:"20"})))},i=a(6525),_=()=>{const e=(0,m.t)(),[t,a]=(0,r.useState)([]),[n,l]=(0,r.useState)([]),[_,u]=(0,r.useState)(0),[p,f]=(0,r.useState)(1),[h,E]=(0,r.useState)(1),[d,b]=(0,r.useState)(!1),[g,N]=(0,r.useState)({type:"",areaFrom:"",areaTo:"",priceFrom:"",priceTo:"",promotions:!1,priceDesc:!1}),v="desktop"===e?6:"laptop"===e?4:1;(0,r.useEffect)((async()=>{try{const e=await o.A.get("/api/search/types");l(e.data.map((e=>e.type)))}catch(e){console.error("Error fetching types:",e)}}),[]),(0,r.useEffect)((()=>{b(!1),0==t.length&&y(0,v,g)}),[t]),(0,r.useEffect)((()=>{E(Math.ceil(_/v))}),[v,_]),(0,r.useEffect)((()=>{const e=(p-1)*v,a=p*v;t.length>e&&t.length<a&&y(t.length,a,g)}),[e]);const y=async(e,r,n)=>{if(t.length>e)f(Math.floor(e/v)+1);else try{const t={...n,startIdx:e,endIdx:r},l=await o.A.post("/api/search",t);if(u(l.data.total),E(Math.ceil(l.data.total/v)),0===l.data.total)return void b(!0);a((e=>[...e,...l.data.rows])),f(Math.floor(e/v)+1)}catch(e){console.error("Error fetching data:",e)}},k=e=>{N({...g,type:e}),a([])};return r.createElement(r.Fragment,null,r.createElement("section",{className:"section",id:"hero"},r.createElement("div",{className:"container"},r.createElement(c,{showSearchIcon:"mobile"===e}),r.createElement(s,{types:n,onSubmit:async()=>{k(g.type),a([])},formData:g,setFormData:N,showSearchIcon:"mobile"===e}))),r.createElement("section",{className:"section",id:"main-listing"},r.createElement("div",{className:"container"},r.createElement(i.A,{modifier:"main",types:n,cards:t.slice((p-1)*v,p*v),currentPage:p,totalPages:h,onPageChange:e=>{y((e-1)*v,e*v,g)},totalCards:_,activeTab:g.type,setActiveTab:k,noResults:d}))))}}}]);