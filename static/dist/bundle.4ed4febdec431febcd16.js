"use strict";(self.webpackChunkdepot=self.webpackChunkdepot||[]).push([[708],{2708:function(e,a,t){t.r(a);var s=t(6540),l=t(1083),n=t(7767);a.default=()=>{const[e,a]=(0,s.useState)(""),[t,r]=(0,s.useState)(""),[o,m]=(0,s.useState)(null),[c,u]=(0,s.useState)(null),{token:i}=(0,n.g)();return s.createElement("section",{className:"section",id:"auth-reset"},s.createElement("div",{className:"container"},s.createElement("div",{className:"page__login"},s.createElement("h1",{className:"page__login--title"},"Задать пароль"),s.createElement("form",{className:"form form--auth",onSubmit:async a=>{if(a.preventDefault(),m(null),u(null),e===t)try{const a=await l.A.post("/api/reset-password",{password:e,confirmPassword:t,token:i},{headers:{"Content-Type":"application/json"}});a.data.success?(u("Пароль успешно обновлен.\n\nПереходим на страницу входа..."),setTimeout((()=>{window.location.href="/auth/login"}),3e3)):m(a.data.message)}catch(e){m("Ошибка обновления пароля.")}else m("Пароли не совпадают!")}},s.createElement("div",{className:"form__group"},s.createElement("label",{className:"form__label"},"Новый пароль"),s.createElement("input",{type:"password",name:"password",className:"form__input",placeholder:"Введите новый пароль",value:e,onChange:e=>a(e.target.value),required:!0})),s.createElement("div",{className:"form__group"},s.createElement("label",{className:"form__label"},"Подтверждение пароля"),s.createElement("input",{type:"password",name:"confirmPassword",className:"form__input",placeholder:"Повторите введенный пароль",value:t,onChange:e=>r(e.target.value),required:!0})),s.createElement("button",{type:"submit",className:"form__button button button--large"},"Подтвердить"),o&&s.createElement("div",{className:"form__message form__message--red"},o),c&&s.createElement("div",{className:"form__message form__message--green"},c)))))}}}]);