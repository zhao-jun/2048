webpackJsonp([0],[,function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2),i=(r.n(n),r(0)),o=r.n(i),a=r(3);!function(){function e(){t(),i(),localStorage.getItem("state33")||(v(),v())}function t(){var e=localStorage.getItem("score")||0;o()("#best").text(e),e<D&&(localStorage.setItem("score",D),o()("#best").text(D))}function n(){_>500&&(j=500,J=20,C=100),_<500&&(o()("h1").css("font-size",.15*_+"px"),o()(".record").css("font-size","20px")),o()("header").css("width",j),o()(".grid-container").css("width",j-2*J),o()(".grid-container").css("height",j-2*J),o()(".grid-container").css("padding",J),o()(".grid-container").css("border-radius",.02*j),o()(".grid-cell").css("width",C),o()(".grid-cell").css("height",C),o()(".grid-cell").css("border-radius",.02*C)}function i(){for(var e=0;e<4;e++){M[e]=[],z[e]=[];for(var t=0;t<4;t++)M[e][t]=0,z[e][t]=!1}if(D=0,localStorage.getItem("state33")){D=localStorage.getItem("localScore")||0,D=parseInt(D);for(var e=0;e<4;e++)for(var t=0;t<4;t++)M[e][t]=parseInt(localStorage.getItem("state"+e+t))}c(),o()("#score").text(D)}function c(){o()(".number-cell").remove();for(var e=0;e<4;e++)for(var t=0;t<4;t++){o()(".grid-container").append('<div class="number-cell" id="number-cell-'+e+"-"+t+'"></div>');var r=o()("#number-cell-"+e+"-"+t);0==M[e][t]?(r.css("background-color","transparent"),r.css("top",u(e,t)),r.css("left",f(e,t))):(r.css("top",u(e,t)),r.css("left",f(e,t)),r.css("background-color",d(M[e][t])),r.css("color",l(M[e][t])),r.text(M[e][t]),s(r,M[e][t])),z[e][t]=!1}o()(".number-cell").css({width:C,height:C,"line-height":C+"px"})}function s(e,t){t<100?e.css("font-size",.6*C+"px"):t<1e3?e.css("font-size",.5*C+"px"):e.css("font-size",.4*C+"px")}function u(e,t){return J+e*(J+C)}function f(e,t){return J+t*(J+C)}function d(e){switch(e){case 2:return"#eee4da";case 4:return"#ede0c8";case 8:return"#f2b179";case 16:return"#f59563";case 32:return"#f67c5f";case 64:return"#f65e3b";case 128:return"#edcf72";case 256:return"#edcc61";case 512:return"#9c0";case 1024:return"#33b5e5";case 2048:return"#09c";case 4096:return"#a6c";case 8192:return"#93c"}return"#000"}function l(e){return e<=4?"#776e65":"#fff"}function v(){if(h(M))return!1;for(var e=parseInt(4*Math.random()),t=parseInt(4*Math.random());0!=M[e][t];)e=parseInt(4*Math.random()),t=parseInt(4*Math.random());var r=Math.random()>.5?2:4;M[e][t]=r,b(e,t,r),m()}function b(e,t,r){var n=o()("#number-cell-"+e+"-"+t);n.css("background-color",d(r)),n.css("color",l(r)),n.text(r),s(n,r),n.animate({width:C,height:C},50)}function h(e){for(var t=0;t<4;t++)for(var r=0;r<4;r++)if(0==e[t][r])return!1;return!0}function m(){for(var e=0;e<4;e++)for(var t=0;t<4;t++)localStorage.setItem("state"+e+t,M[e][t]);localStorage.setItem("localScore",D)}function g(){if(!r.i(a.a)(M))return!1;for(var e=0;e<4;e++)for(var t=1;t<4;t++)if(0!=M[e][t])for(var n=0;n<t;n++){if(0==M[e][n]&&r.i(a.b)(e,n,t,M)){x(e,t,e,n),M[e][n]=M[e][t],M[e][t]=0;break}if(M[e][n]==M[e][t]&&r.i(a.b)(e,n,t,M)&&!z[e][n]){x(e,t,e,n),M[e][n]+=M[e][t],M[e][t]=0,D+=M[e][n],S(D),z[e][n]=!0;break}}return setTimeout(c.bind(this),200),!0}function p(){if(!r.i(a.c)(M))return!1;for(var e=0;e<4;e++)for(var t=2;t>=0;t--)if(0!=M[e][t])for(var n=3;n>t;n--){if(0==M[e][n]&&r.i(a.b)(e,t,n,M)){x(e,t,e,n),M[e][n]=M[e][t],M[e][t]=0;break}if(M[e][n]==M[e][t]&&r.i(a.b)(e,t,n,M)&&!z[e][n]){x(e,t,e,n),M[e][n]+=M[e][t],M[e][t]=0,D+=M[e][n],S(D),z[e][n]=!0;break}}return setTimeout(c.bind(this),200),!0}function T(){if(!r.i(a.d)(M))return!1;for(var e=0;e<4;e++)for(var t=1;t<4;t++)if(0!=M[t][e])for(var n=0;n<t;n++){if(0==M[n][e]&&r.i(a.e)(e,n,t,M)){x(t,e,n,e),M[n][e]=M[t][e],M[t][e]=0;break}if(M[n][e]==M[t][e]&&r.i(a.e)(e,n,t,M)&&!z[n][e]){x(t,e,n,e),M[n][e]+=M[t][e],M[t][e]=0,D+=M[n][e],S(D),z[n][e]=!0;break}}return setTimeout(c.bind(this),200),!0}function k(){if(!r.i(a.f)(M))return!1;for(var e=0;e<4;e++)for(var t=2;t>=0;t--)if(0!=M[t][e])for(var n=3;n>t;n--){if(0==M[n][e]&&r.i(a.e)(e,t,n,M)){x(t,e,n,e),M[n][e]=M[t][e],M[t][e]=0;break}if(M[n][e]==M[t][e]&&r.i(a.e)(e,t,n,M)&&!z[n][e]){x(t,e,n,e),M[n][e]+=M[t][e],M[t][e]=0,D+=M[n][e],S(D),z[n][e]=!0;break}}return setTimeout(c.bind(this),200),!0}function I(){h(M)&&r.i(a.g)(M)&&w(),y=!1}function w(){o()(".end").show()}function x(e,t,r,n){var i=o()("#number-cell-"+e+"-"+t);i.animate({top:u(r,n),left:f(r,n)},200)}function S(e){setTimeout(function(){},300),o()("#score").text(e)}var M=[],z=[],D=0,y=!1,E=0,L=0,X=0,Y=0,_=window.screen.availWidth,j=.92*_,C=.18*_,J=.04*_;n(),e(),o()(".newgamebutton").click(function(){for(var t=0;t<4;t++)for(var r=0;r<4;r++)localStorage.removeItem("state"+t+r);return e()}),o()(".end").click(function(){for(var t=0;t<4;t++)for(var r=0;r<4;r++)localStorage.removeItem("state"+t+r);return o()(".end").hide(),e()}),o()(document).keydown(function(e){switch(e.keyCode){case 37:if(e.preventDefault(),y)return;g()&&(y=!0,setTimeout(v.bind(this),210),setTimeout(I.bind(this),300));break;case 38:if(e.preventDefault(),y)return;T()&&(y=!0,setTimeout(v.bind(this),210),setTimeout(I.bind(this),300));break;case 39:if(e.preventDefault(),y)return;p()&&(y=!0,setTimeout(v.bind(this),210),setTimeout(I.bind(this),300));break;case 40:if(e.preventDefault(),y)return;k()&&(y=!0,setTimeout(v.bind(this),210),setTimeout(I.bind(this),300))}}),document.addEventListener("touchstart",function(e){E=e.touches[0].pageX,L=e.touches[0].pageY}),document.addEventListener("touchmove",function(e){e.preventDefault()}),document.addEventListener("touchend",function(e){X=e.changedTouches[0].pageX,Y=e.changedTouches[0].pageY;var t=X-E,r=Y-L;Math.abs(t)<.1*_&&Math.abs(r)<.1*_||(Math.abs(t)>=Math.abs(r)?t>0?p()&&(setTimeout(v.bind(this),210),setTimeout(I.bind(this),300)):g()&&(setTimeout(v.bind(this),210),setTimeout(I.bind(this),300)):r>0?k()&&(setTimeout(v.bind(this),210),setTimeout(I.bind(this),300)):T()&&(setTimeout(v.bind(this),210),setTimeout(I.bind(this),300)))})}()},function(e,t){},function(e,t,r){"use strict";function n(e){for(var t=0;t<4;t++)for(var r=1;r<4;r++)if(0!=e[t][r]&&(0==e[t][r-1]||e[t][r-1]==e[t][r]))return!0;return!1}function i(e){for(var t=0;t<4;t++)for(var r=2;r>=0;r--)if(0!=e[t][r]&&(0==e[t][r+1]||e[t][r+1]==e[t][r]))return!0;return!1}function o(e){for(var t=0;t<4;t++)for(var r=1;r<4;r++)if(0!=e[r][t]&&(0==e[r-1][t]||e[r-1][t]==e[r][t]))return!0;return!1}function a(e){for(var t=0;t<4;t++)for(var r=2;r>=0;r--)if(0!=e[r][t]&&(0==e[r+1][t]||e[r+1][t]==e[r][t]))return!0;return!1}function c(e,t,r,n){for(var i=t+1;i<r;i++)if(0!=n[e][i])return!1;return!0}function s(e,t,r,n){for(var i=t+1;i<r;i++)if(0!=n[i][e])return!1;return!0}function u(e){return!(n(e)||i(e)||o(e)||a(e))}t.a=n,t.c=i,t.d=o,t.f=a,t.b=c,t.e=s,t.g=u},function(e,t,r){e.exports=r(1)}],[4]);