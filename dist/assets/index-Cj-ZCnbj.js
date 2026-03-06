(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&r(p)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();(function(){window.dataLayer=window.dataLayer||[];function s(){dataLayer.push(arguments)}s("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",wait_for_update:500});const d="G-7EJYRWMP87",o="arss_cookie_consent";if(!document.querySelector(`script[src*="${d}"]`)){var r=document.createElement("script");r.async=!0,r.src=`https://www.googletagmanager.com/gtag/js?id=${d}`,r.onerror=function(){},document.head.appendChild(r),s("js",new Date),s("config",d)}function n(){try{s("consent","update",{ad_storage:"granted",ad_user_data:"granted",ad_personalization:"granted",analytics_storage:"granted"})}catch{}localStorage.setItem(o,"granted"),console.log("Consent granted.")}const i=localStorage.getItem(o);i==="granted"?n():i==="denied"?console.log("Cookies denied by user preference."):window.addEventListener("DOMContentLoaded",p);function p(){const u=document.createElement("div");u.id="cookie-consent-banner",u.className="cookie-banner",u.innerHTML=`
            <div class="cookie-content">
                <div class="cookie-text">
                    <h3>Ali dovolite piškotke?</h3>
                    <p>Za izboljšanje vaše uporabniške izkušnje in analizo prometa uporabljamo piškotke. 
                    Ali se strinjate z uporabo Google Analytics piškotkov?</p>
                </div>
                <div class="cookie-buttons">
                    <button id="btn-deny" class="cookie-btn-deny">Zavrni</button>
                    <button id="btn-accept" class="cookie-btn-accept">Dovoli</button>
                </div>
            </div>
        `,document.body.appendChild(u),document.getElementById("btn-accept").addEventListener("click",()=>{n(),g()}),document.getElementById("btn-deny").addEventListener("click",()=>{localStorage.setItem(o,"denied"),g()});function g(){u.classList.add("hide"),setTimeout(()=>{u.remove()},500)}setTimeout(()=>{u.classList.add("show")},100)}})();const b="GA_MEASUREMENT_ID";window.dataLayer=window.dataLayer||[];function v(){dataLayer.push(arguments)}v("js",new Date);v("config",b,{anonymize_ip:!0,cookie_flags:"SameSite=None;Secure"});function h(s,d={}){v("event",s,d)}function L(s){v("config",b,{page_path:s})}window.trackEvent=h;window.trackPageView=L;document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("meter-image");if(s){const o=document.querySelector('label[for="meter-image"]');if(o){const r=o.textContent;s.addEventListener("change",n=>{if(n.target.files&&n.target.files.length>0){const i=n.target.files[0].name.replace(/</g,"&lt;").replace(/>/g,"&gt;");o.textContent=`✅ Datoteka izbrana: ${i}`,o.style.color="#10b981"}else o.textContent=r,o.style.color=""})}}document.querySelectorAll(".contact-form").forEach(o=>{o.addEventListener("submit",function(){const r=o.querySelector('button[type="submit"]');r&&(r.disabled=!0,r.textContent="Pošiljam...")})})});document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector(".mobile-menu-btn"),d=document.querySelector(".nav-links");s&&s.addEventListener("click",()=>{d.classList.toggle("active"),s.classList.toggle("active")});const o=document.querySelectorAll(".dropdown");let r=null;o.forEach(e=>{const t=e.querySelector(".nav-link"),c=e.querySelector(".dropdown-content"),l=c?c.querySelectorAll("a"):[];t&&c&&(t.setAttribute("role","button"),t.setAttribute("aria-expanded","false"),t.setAttribute("aria-haspopup","true"),t.setAttribute("tabindex","0"),l.forEach(a=>{a.setAttribute("tabindex","0")}),e.addEventListener("mouseenter",()=>{clearTimeout(r),window.innerWidth>768&&(e.classList.add("active"),t.setAttribute("aria-expanded","true"))}),e.addEventListener("mouseleave",()=>{window.innerWidth>768&&(r=setTimeout(()=>{e.classList.remove("active"),t.setAttribute("aria-expanded","false")},150))}),t.addEventListener("click",a=>{if(window.innerWidth<=768){a.preventDefault(),e.classList.toggle("active");const f=e.classList.contains("active");t.setAttribute("aria-expanded",f?"true":"false")}}),document.addEventListener("keydown",a=>{a.key==="Escape"&&e.classList.contains("active")&&(e.classList.remove("active"),t.setAttribute("aria-expanded","false"),t.focus())}),t.addEventListener("keydown",a=>{if(a.key==="ArrowDown"&&e.classList.contains("active")&&l.length>0&&(a.preventDefault(),l[0].focus()),(a.key===" "||a.key==="Enter")&&window.innerWidth<=768){a.preventDefault(),e.classList.toggle("active");const f=e.classList.contains("active");t.setAttribute("aria-expanded",f?"true":"false")}}),l.forEach((a,f)=>{a.addEventListener("keydown",m=>{if(m.key==="ArrowDown"){m.preventDefault();const y=l[f+1];y&&y.focus()}else m.key==="ArrowUp"?(m.preventDefault(),f===0?t.focus():l[f-1].focus()):m.key==="Escape"&&(m.preventDefault(),e.classList.remove("active"),t.setAttribute("aria-expanded","false"),t.focus())})}))}),document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const c=this.getAttribute("href"),l=document.querySelector(c);l&&(d.classList.remove("active"),l.scrollIntoView({behavior:"smooth",block:"start"}))})});const n={threshold:.15,rootMargin:"0px 0px -50px 0px"},i=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("fade-in-visible"),i.unobserve(t.target))})},n);document.querySelectorAll(".glass-card, .section-title, .hero-content, .timeline-item, .pricing-card").forEach((e,t)=>{e.classList.add("fade-in-element"),e.style.transitionDelay=`${t*.1}s`,i.observe(e)});function p(e){const t=e.currentTarget,c=document.createElement("span"),l=Math.max(t.clientWidth,t.clientHeight),a=l/2,f=t.getBoundingClientRect();c.style.width=c.style.height=`${l}px`,c.style.left=`${e.clientX-f.left-a}px`,c.style.top=`${e.clientY-f.top-a}px`,c.classList.add("ripple");const m=t.querySelector(".ripple");m&&m.remove(),t.appendChild(c)}document.querySelectorAll(".btn-primary, .btn-secondary").forEach(e=>{e.addEventListener("click",p)}),document.querySelectorAll(".pricing-card").forEach(e=>{e.addEventListener("mouseenter",function(){this.style.transform="translateY(-12px)"}),e.addEventListener("mouseleave",function(){this.classList.contains("popular")?this.style.transform="scale(1.05)":this.style.transform="translateY(0)"})}),document.querySelectorAll(".solutions-table tbody tr").forEach(e=>{e.addEventListener("mouseenter",function(){this.style.transform="scale(1.02)",this.style.transition="transform 0.2s ease, background-color 0.2s ease"}),e.addEventListener("mouseleave",function(){this.style.transform="scale(1)"})}),document.querySelectorAll(".form-group input, .form-group textarea").forEach(e=>{e.addEventListener("focus",function(){this.parentElement.classList.add("focused")}),e.addEventListener("blur",function(){this.value||this.parentElement.classList.remove("focused")})});const u=document.createElement("style");u.textContent=`
    .fade-in-element {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                  transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .fade-in-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }

    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .fade-in-element {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      
      .ripple {
        display: none;
      }
    }
  `,document.head.appendChild(u);const g=document.querySelectorAll(".faq-item");g.forEach(e=>{const t=e.querySelector(".faq-question"),c=e.querySelector(".faq-answer");t.addEventListener("click",()=>{const l=e.classList.contains("active");g.forEach(a=>{a!==e&&(a.classList.remove("active"),a.querySelector(".faq-answer").style.maxHeight=null)}),l?(e.classList.remove("active"),c.style.maxHeight=null):(e.classList.add("active"),c.style.maxHeight=c.scrollHeight+"px")})})});
