"use strict";(self.webpackChunkdepot=self.webpackChunkdepot||[]).push([[702],{5702:function(e,a,t){t.r(a);var l=t(6540),r=t(1083);a.default=({mode:e="signup"})=>{const[a,t]=(0,l.useState)(1),[s,m]=(0,l.useState)(""),[n,i]=(0,l.useState)(""),[c,u]=(0,l.useState)(null),[o,p]=(0,l.useState)(null),_=async()=>{try{"signup"===e?await r.A.post("/api/signup/verify-email",{tin:s.trim(),email:n.trim()}):await r.A.post("/api/password-reset/initiate",{tin:s.trim(),email:n.trim()}),t(3),u("На указанный адрес отправлено письмо с проверочной ссылкой.")}catch(e){p("Ошибка при отправке проверочного письма.")}};return l.createElement("div",{className:"page__login"},l.createElement("h1",{className:"page__login--title"},"signup"===e?"Регистрация":"Сброс пароля"),l.createElement("form",{className:"form form--auth",onSubmit:async l=>{l.preventDefault(),p(null),"signup"===e?1===a?(async()=>{try{const e=await r.A.post("/api/signup/check",{tin:s});e.data.exists?e.data.signedUp?p("Пользователь уже зарегистрирован!"):t(2):p("tin_error")}catch(e){p("tin_error")}})():2===a&&_():_()}},"signup"===e&&1===a&&l.createElement("div",{className:"form__group"},l.createElement("label",{className:"form__label"},"ИНН"),l.createElement("input",{type:"text",name:"tin",className:"form__input",placeholder:"ИНН",value:s,onChange:e=>m(e.target.value),required:!0})),(2===a||"password-reset"===e)&&l.createElement(l.Fragment,null,"password-reset"===e&&l.createElement("div",{className:"form__group"},l.createElement("label",{className:"form__label"},"ИНН"),l.createElement("input",{type:"text",name:"tin",className:"form__input",placeholder:"ИНН",value:s,onChange:e=>m(e.target.value),required:!0})),l.createElement("div",{className:"form__group"},l.createElement("label",{className:"form__label"},"Email"),l.createElement("input",{type:"email",name:"email",className:"form__input",placeholder:"Email",value:n,onChange:e=>i(e.target.value),required:!0}))),3!==a&&l.createElement("button",{type:"submit",className:"form__button button button--large"},1===a?"Дальше":"Подтвердить"),o&&("tin_error"===o?l.createElement("div",{className:"form__message form__message--red"},"Ваш ИНН не зарегистрирован в нашей базе данных.",l.createElement("br",null),l.createElement("br",null),"Пожалуйста, свяжитесь со своим менеджером или позвоните на горячую линию по телефону.",l.createElement("br",null),l.createElement("br",null),l.createElement("a",{href:"tel:+79120557755",className:"form__message--large"},"+7 (912) 055-77-55")):l.createElement("div",{className:"form__message form__message--red"},o)),c&&l.createElement("div",{className:"form__message form__message--green"},c)))}}}]);