!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=10)}({10:function(e,t,n){"use strict";n.r(t);const i={version:"1.2.0",init(e=document.body){for(const t of e.querySelectorAll(".swiffy-slider"))this.initSlider(t)},initSlider(e){for(const t of e.querySelectorAll(".slider-nav")){const n=t.classList.contains("slider-nav-next");t.addEventListener("click",(()=>this.slide(e,n)),{passive:!0})}for(const t of e.querySelectorAll(".slider-indicators"))t.addEventListener("click",(()=>this.slideToByIndicator())),this.onSlideEnd(e,(()=>this.handleIndicators(e)),60);if(e.classList.contains("slider-nav-autoplay")){const t=e.getAttribute("data-slider-nav-autoplay-interval")?e.getAttribute("data-slider-nav-autoplay-interval"):2500;this.autoPlay(e,t,e.classList.contains("slider-nav-autopause"))}if(e.classList.contains("slider-nav-animation")){const t=e.getAttribute("data-slider-nav-animation-threshold")?e.getAttribute("data-slider-nav-animation-threshold"):.3;this.setVisibleSlides(e,t)}},setVisibleSlides(e,t=.3){const n=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting?e.target.parentElement.classList.add("slide-visible"):e.target.parentElement.classList.remove("slide-visible")}))}),{root:e.querySelector(".slider-container"),threshold:t});for(const t of e.querySelectorAll(".slider-container>*>*"))n.observe(t)},slide(e,t=!0){const n=e.querySelector(".slider-container"),i=e.classList.contains("slider-nav-page"),r=e.classList.contains("slider-nav-noloop"),o=e.classList.contains("slider-nav-nodelay"),s=n.children,l=parseInt(window.getComputedStyle(n).columnGap),a=s[0].offsetWidth+l;let c=t?n.scrollLeft+a:n.scrollLeft-a;if(i&&(c=t?n.scrollLeft+n.offsetWidth:n.scrollLeft-n.offsetWidth),n.scrollLeft+n.offsetWidth>n.scrollWidth-(l/2+1)&&t){if(r)return;c=0}n.scroll({left:c,behavior:o?"auto":"smooth"})},slideToByIndicator(){const e=window.event.target,t=Array.from(e.parentElement.children).indexOf(e),n=e.parentElement.children.length,i=e.closest(".swiffy-slider"),r=i.querySelector(".slider-container").children.length/n*t;this.slideTo(i,r)},slideTo(e,t){const n=e.querySelector(".slider-container"),i=parseInt(window.getComputedStyle(n).columnGap),r=n.children[0].offsetWidth+i,o=e.classList.contains("slider-nav-nodelay");n.scroll({left:r*t,behavior:o?"auto":"smooth"})},onSlideEnd(e,t,n=125){let i;e.querySelector(".slider-container").addEventListener("scroll",(function(){window.clearTimeout(i),i=setTimeout(t,n)}),{capture:!1,passive:!0})},autoPlay(e,t,n){t=t<750?750:t;let i=setInterval((()=>this.slide(e)),t);const r=()=>this.autoPlay(e,t,n);return n&&(["mouseover","touchstart"].forEach((function(t){e.addEventListener(t,(function(){window.clearTimeout(i)}),{once:!0,passive:!0})})),e.addEventListener("mouseout",(function(){r()}),{once:!0,passive:!0})),i},handleIndicators(e){const t=e.querySelector(".slider-container"),n=t.scrollWidth-t.offsetWidth,i=t.scrollLeft/n;for(const t of e.querySelectorAll(".slider-indicators")){const e=t.children,n=Math.round((e.length-1)*i);for(const t of e)t.removeAttribute("class");e[n].classList.add("active")}}};window.swiffyslider=i}});