"use strict";(self.webpackChunkdepot=self.webpackChunkdepot||[]).push([[571],{1571:function(e,t,a){a.r(t);var n=a(6540),i=a(6546);const r=[{id:1,image:"/img/pics/presentation1.webp",text:"Блоки в LIGHT INDUSTRIAL небольшие и начинаются от 100 м², а в среднем составляют 300-1000 м²."},{id:2,image:"/img/pics/presentation2.webp",text:"LIGHT INDUSTRIAL – это качественные производственно-складские помещения для малого и среднего бизнеса с отдельным входом, воротами, выделенной складской зоной и небольшим административным блоком. Высота потолка достигает 6-10 метров."},{id:3,image:"/img/pics/presentation3.webp",text:"Вам предоставляются площади с отдельным боксом и возможностью организовать офисное пространство."},{id:4,image:"/img/pics/presentation4.webp",text:"Light industrial – Это формат недвижимости, который отличается высоким качеством, функциональностью и удобством использования."}];t.default=()=>{const[e,t]=(0,n.useState)(0),[a,s]=(0,n.useState)("forward");return n.createElement("div",{className:"presentation__container"},n.createElement("div",{className:"presentation__block flex",style:{backgroundImage:`url(${r[e].image})`}},n.createElement("div",{className:"presentation__info flex flex--sb flex--center"},n.createElement("div",{className:"presentation__text"},r[e].text),n.createElement("div",{className:"presentation__controls"},n.createElement("button",{onClick:()=>{"forward"===a?e<r.length-1?t(e+1):(s("backward"),t(e-1)):e>0?t(e-1):(s("forward"),t(e+1))},className:"backward"===a?"reversed":""},n.createElement(i.A,{selector:"NextIcon",width:"40",height:"40",fill:"#F9BC07"}))))))}},6546:function(e,t,a){var n=a(6540);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)({}).hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},i.apply(null,arguments)}t.A=({selector:e="",width:t=12,height:a=12,fill:r="none",classNames:s="",...c})=>n.createElement("svg",i({className:`icon icon-${e} ${s}`,fill:r,width:t,height:a},c),n.createElement("use",{xlinkHref:`#${e}`}))}}]);