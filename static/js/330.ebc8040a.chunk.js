"use strict";(self.webpackChunkkeycloak=self.webpackChunkkeycloak||[]).push([[330],{5330:function(e,t,a){a.r(t),a.d(t,{default:function(){return o}});var s=a(2791),c=a(2228),l=a(6196),n=a(7604),r=function(e,t){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(s=Object.getOwnPropertySymbols(e);c<s.length;c++)t.indexOf(s[c])<0&&Object.prototype.propertyIsEnumerable.call(e,s[c])&&(a[s[c]]=e[s[c]])}return a};function o(e){var t=e.kcContext,a=e.i18n,o=e.doFetchDefaultThemeResources,i=void 0===o||o,m=e.Template,u=r(e,["kcContext","i18n","doFetchDefaultThemeResources","Template"]),p=t.otpLogin,d=t.url,k=a.msg,f=a.msgStr;return(0,s.useEffect)((function(){var e=!1;return(0,c.t)({type:"javascript",src:(0,l.pathJoin)(t.url.resourcesCommonPath,"node_modules/jquery/dist/jquery.min.js")}).then((function(){e||$(document).ready((function(){$(".card-pf-view-single-select").click((function(){$(this).hasClass("active")?($(this).removeClass("active"),$(this).children().removeAttr("name")):($(".card-pf-view-single-select").removeClass("active"),$(".card-pf-view-single-select").children().removeAttr("name"),$(this).addClass("active"),$(this).children().attr("name","selectedCredentialId"))}));var e=$(".card-pf-view-single-select")[0];e&&e.click()}))})),function(){e=!0}}),[]),s.createElement(m,Object.assign({},Object.assign({kcContext:t,i18n:a,doFetchDefaultThemeResources:i},u),{headerNode:k("doLogIn"),formNode:s.createElement("form",{id:"kc-otp-login-form",className:(0,n.W)(u.kcFormClass),action:d.loginAction,method:"post"},p.userOtpCredentials.length>1&&s.createElement("div",{className:(0,n.W)(u.kcFormGroupClass)},s.createElement("div",{className:(0,n.W)(u.kcInputWrapperClass)},p.userOtpCredentials.map((function(e){return s.createElement("div",{key:e.id,className:(0,n.W)(u.kcSelectOTPListClass)},s.createElement("input",{type:"hidden",value:"${otpCredential.id}"}),s.createElement("div",{className:(0,n.W)(u.kcSelectOTPListItemClass)},s.createElement("span",{className:(0,n.W)(u.kcAuthenticatorOtpCircleClass)}),s.createElement("h2",{className:(0,n.W)(u.kcSelectOTPItemHeadingClass)},e.userLabel)))})))),s.createElement("div",{className:(0,n.W)(u.kcFormGroupClass)},s.createElement("div",{className:(0,n.W)(u.kcLabelWrapperClass)},s.createElement("label",{htmlFor:"otp",className:(0,n.W)(u.kcLabelClass)},k("loginOtpOneTime"))),s.createElement("div",{className:(0,n.W)(u.kcInputWrapperClass)},s.createElement("input",{id:"otp",name:"otp",autoComplete:"off",type:"text",className:(0,n.W)(u.kcInputClass),autoFocus:!0}))),s.createElement("div",{className:(0,n.W)(u.kcFormGroupClass)},s.createElement("div",{id:"kc-form-options",className:(0,n.W)(u.kcFormOptionsClass)},s.createElement("div",{className:(0,n.W)(u.kcFormOptionsWrapperClass)})),s.createElement("div",{id:"kc-form-buttons",className:(0,n.W)(u.kcFormButtonsClass)},s.createElement("input",{className:(0,n.W)(u.kcButtonClass,u.kcButtonPrimaryClass,u.kcButtonBlockClass,u.kcButtonLargeClass),name:"login",id:"kc-login",type:"submit",value:f("doLogIn")}))))}))}}}]);
//# sourceMappingURL=330.ebc8040a.chunk.js.map