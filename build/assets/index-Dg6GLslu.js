import{r as s,V as v,W,c as B,O,d as H,M as q,P as F,g as C,j as e,f as _,b as D,e as G,S as Y,N as V,C as g,F as X,B as $,A as z}from"./index-cMuZXDCu.js";import{t as u}from"./layout-Cqz-gem_.js";import{u as K}from"./useReveal-C62dEbL8.js";import{c as J}from"./contact-section-bg-DjLV8cGl.js";import{H as Q}from"./HeroRotatingTypewriter-CFNy4YF7.js";import{b as Z}from"./booking-CNmORu08.js";import{M as ee}from"./MobileSliderHint-aP2L0OHw.js";const te=new _(.72,.62,.44),ae=new _(.55,.42,.38),oe=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`,ne=`
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uMistPrimary;
  uniform vec3 uMistSecondary;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbmTime(vec2 p, float tm) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = mat2(1.55, 1.08, -1.08, 1.55) * p + tm * 0.028;
      a *= 0.52;
    }
    return v;
  }

  vec3 fluidColor(vec2 uv, float t) {
    float asp = uResolution.x / max(uResolution.y, 1.0);
    vec2 ratio = vec2(asp, 1.0);
    vec2 p = (uv - 0.5) * ratio;
    p += (uMouse - 0.5) * 0.042;

    float lt = mod(t, 22.0);
    float ang = lt * 0.075;
    mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
    vec2 q = rot * p;

    float fa = fbmTime(q * 1.72 + vec2(lt * 0.045, sin(lt * 0.12)), t);
    float fb = fbmTime(q * 2.95 - vec2(cos(lt * 0.1), lt * 0.04), t);
    float fc = fbmTime(q * 0.65 + vec2(sin(lt * 0.07), lt * 0.03), t * 0.85);
    float flow = smoothstep(0.12, 0.82, fa * 0.58 + fb * 0.32 + fc * 0.18);
    float mistLayer = smoothstep(0.2, 0.95, fa * 0.45 + fb * 0.55);

    float silk = sin((q.y + fa) * 5.2 + lt * 0.35) * 0.5 + 0.5;
    silk = smoothstep(0.28, 0.9, silk) * flow * 0.62;

    vec3 voidCol = vec3(0.014, 0.015, 0.022);
    vec3 deep = vec3(0.048, 0.05, 0.062);
    vec3 lift = vec3(0.11, 0.105, 0.128);
    vec3 mistHaze = vec3(0.14, 0.13, 0.16);

    vec3 ice = vec3(0.45, 0.48, 0.55);

    vec3 col = mix(voidCol, deep, flow * 0.92);
    col = mix(col, lift, fb * 0.26);
    col = mix(col, mistHaze, mistLayer * 0.38);
    col = mix(col, ice * 0.42, (1.0 - flow) * 0.14);
    col = mix(col, uMistSecondary, silk * 0.28);
    col = mix(col, uMistPrimary, silk * 0.48 + flow * 0.065);
    col += uMistPrimary * silk * 0.11;
    col += (uMistPrimary * 0.35 + uMistSecondary * 0.65) * (mistLayer * 0.22);

    float vign = smoothstep(1.18, 0.28, length(p));
    col *= 0.9 + 0.14 * vign;
    col = pow(col, vec3(0.96));
    return col;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime;
    vec3 col = fluidColor(uv, t);

    float gr = hash(uv * uResolution * 0.35 + t * 40.0);
    col += (gr - 0.5) * 0.012;

    gl_FragColor = vec4(col, 1.0);
  }
`,ce=({mistPrimary:r=te,mistSecondary:n=ae,className:c=""})=>{const d=s.useRef(null),t=s.useRef(new v(.5,.5)),a=s.useRef(new v(.5,.5));return s.useEffect(()=>{const i=d.current;if(!i||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const o=new W({alpha:!1,antialias:!1,powerPreference:"high-performance"});o.setClearColor(197642,1);const l=new B,L=new O(-1,1,1,-1,0,1),h={uTime:{value:0},uResolution:{value:new v(1,1)},uMouse:{value:t.current.clone()},uMistPrimary:{value:r.clone()},uMistSecondary:{value:n.clone()}},x=new H({depthWrite:!1,fragmentShader:ne,uniforms:h,vertexShader:oe}),y=new q(new F(2,2),x);l.add(y);const I=performance.now();i.appendChild(o.domElement);const p=()=>{const m=i.clientWidth||1,E=i.clientHeight||1,U=window.innerWidth>1600?1.25:Math.min(window.devicePixelRatio||1,1.5);o.setPixelRatio(U),o.setSize(m,E,!0),h.uResolution.value.set(m,E)},w=m=>{a.current.set(m.clientX/window.innerWidth,1-m.clientY/window.innerHeight)};let j=!0,N=document.visibilityState!=="hidden";const T=new IntersectionObserver(([m])=>{j=m.isIntersecting},{root:null,rootMargin:"64px 0px",threshold:0});T.observe(i);const k=()=>{N=document.visibilityState!=="hidden"};document.addEventListener("visibilitychange",k);const S=()=>{!j||!N||(h.uMouse.value.lerp(a.current,.045),h.uTime.value=(performance.now()-I)/1e3,o.render(l,L))};return p(),requestAnimationFrame(p),window.addEventListener("resize",p),window.addEventListener("pointermove",w,{passive:!0}),C.ticker.add(S),()=>{document.removeEventListener("visibilitychange",k),T.disconnect(),C.ticker.remove(S),window.removeEventListener("resize",p),window.removeEventListener("pointermove",w),y.geometry.dispose(),x.dispose(),o.dispose(),o.domElement.remove()}},[r,n]),e.jsx("div",{className:`works-hero__webgl${c?` ${c}`:""}`,ref:d,"aria-hidden":"true"})},M="https://assets.calendly.com/assets/external/widget.js",se=({className:r=""})=>{const n=s.useRef(null);return s.useEffect(()=>{if(!n.current)return;const c=()=>{const o=n.current,l=o==null?void 0:o.querySelector(".calendly-inline-widget");l&&(l.style.setProperty("background-color","transparent","important"),l.style.setProperty("background-image","none","important"),o&&o.style.setProperty("background","transparent","important"))},d=()=>{typeof window.Calendly>"u"||!n.current||(n.current.innerHTML="",window.Calendly.initInlineWidget({url:Z,parentElement:n.current}),c(),requestAnimationFrame(c),window.setTimeout(c,200),window.setTimeout(c,900))},t=document.querySelector(`script[src="${M}"]`);if(t){const o=()=>{typeof window.Calendly<"u"&&d()};return window.Calendly?o():t.addEventListener("load",o),()=>{t.removeEventListener("load",o),n.current&&(n.current.innerHTML="")}}const a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=M;const i=()=>{typeof window.Calendly<"u"&&d()};return a.onload=i,document.body.appendChild(a),()=>{a.onload=null,n.current&&(n.current.innerHTML="")}},[]),e.jsx("div",{ref:n,className:r,"aria-label":"Book a 30-minute call"})},f="uxuimate@gmail.com",re=`mailto:${f}`,b="+44 7384 303 337",ie="https://wa.me/447384303337",le=["project","idea","brand"],de=new _(.42,.64,.52),me=new _(.2,.36,.3),P=[{num:"01",title:"Submit your brief.",body:"Tell us what you're building and your budget."},{num:"02",title:"We review and reach out.",body:"Expect a response within 24 hours."},{num:"03",title:"Free discovery call.",body:"We align on scope, timeline, and next steps."}],ue=[{id:"website",label:"Website"},{id:"app",label:"App"},{id:"saas",label:"SaaS Platform"},{id:"branding",label:"Branding"},{id:"ux-ui-redesign",label:"UX/UI Redesign"},{id:"ecommerce",label:"E-commerce"}],he=1e3,A=2e4,pe=500;function R(r){const n=Number(r);return n>=A?"£20,000+":`£${n.toLocaleString("en-GB")}`}const we=()=>{const[r,n]=s.useState(5e3),c=D();K(),s.useLayoutEffect(()=>{if(c.hash!=="#book-a-call"&&c.hash!=="#contact")return;const t=c.hash==="#book-a-call"?"book-a-call":"contact",a=()=>{var l;(l=document.getElementById(t))==null||l.scrollIntoView({behavior:"smooth",block:"start"})};a();const i=window.setTimeout(a,120),o=window.setTimeout(a,400);return()=>{window.clearTimeout(i),window.clearTimeout(o)}},[c.pathname,c.hash]),s.useEffect(()=>{const t=requestAnimationFrame(()=>{G.refresh()});return()=>cancelAnimationFrame(t)},[]),s.useEffect(()=>{const t=window.jQuery||window.$;return t?t(".main-page-section").show():document.querySelectorAll(".main-page-section").forEach(a=>{a.style.display="block"}),u("data-spy","scroll","body"),u("data-target",".navbar","body"),u("data-offset","90","body"),()=>{u("data-spy","scroll","body",!0),u("data-target",".navbar","body",!0),u("data-offset","90","body",!0)}},[]);const d={"@context":"https://schema.org","@type":"ProfessionalService",name:"UX UI MATE",url:"https://uxuimate.com/contact",email:f,telephone:b,areaServed:["Newcastle","United Kingdom","Bulgaria","Europe"],contactPoint:[{"@type":"ContactPoint",contactType:"customer support",email:f,telephone:b,areaServed:"GB"}]};return e.jsxs("div",{className:"main-page-section contact-page",children:[e.jsx(Y,{title:"Contact UX UI MATE",description:"Contact UX UI MATE in Newcastle, UK for UX/UI design, web development, branding and product design support across the UK, Europe and Bulgaria.",path:"/contact",image:"/img/icons/logo-footer.png",jsonLd:d}),e.jsx(V,{}),e.jsxs("section",{className:"works-hero contact-page__hero-shell",id:"contact-hero","aria-labelledby":"contact-hero-heading",children:[e.jsx(ce,{mistPrimary:de,mistSecondary:me}),e.jsx("div",{className:"works-hero__grain","aria-hidden":"true"}),e.jsx("div",{className:"works-hero__bloom","aria-hidden":"true"}),e.jsx("div",{className:"works-hero__vignette","aria-hidden":"true"}),e.jsxs("div",{className:"works-hero__content",children:[e.jsx("h1",{id:"contact-hero-heading",className:"works-hero__title-block contact-page__hero-heading reveal-up",children:e.jsxs("span",{className:"works-hero__title-line contact-page__headline-line",children:["Let's talk about your"," ",e.jsx(Q,{words:le,className:"contact-page__rotating-word"})]})}),e.jsx("p",{className:"works-hero__lede reveal-up","data-delay":"0.06",style:{maxWidth:"560px"},children:"We reply within 24 hours - no commitment, just clarity."}),e.jsxs("div",{className:"contact-page__hero-ctas reveal-up","data-delay":"0.1",children:[e.jsx("a",{className:"btn btn-white btn-rounded btn-large contact-page__hero-cta contact-page__hero-cta--solid",href:"#contact",children:"Send your brief →"}),e.jsx("a",{className:"btn btn-transparent-white btn-rounded btn-large contact-page__hero-cta contact-page__hero-cta--outline",href:"#book-a-call",children:"Book a 30-min call"})]})]})]}),e.jsxs("section",{className:"contact-next","aria-labelledby":"contact-next-heading",children:[e.jsx("h2",{id:"contact-next-heading",className:"visually-hidden",children:"What happens next"}),e.jsxs(g,{fluid:!0,className:"contact-next__container",children:[e.jsx("div",{className:"contact-next__row mobile-card-slider",children:P.map((t,a)=>e.jsxs(s.Fragment,{children:[a>0?e.jsx("div",{className:"contact-next__rule","aria-hidden":"true"}):null,e.jsxs("div",{className:"contact-next__cell reveal-up mobile-card-slide","data-delay":String(a*.06),children:[e.jsx("span",{className:"contact-next__num",children:t.num}),e.jsx("h3",{className:"contact-next__step-title",children:t.title}),e.jsx("p",{className:"contact-next__step-body",children:t.body})]})]},t.num))}),e.jsx(ee,{dotCount:P.length})]})]}),e.jsx("section",{className:"contact-bar","aria-label":"Contact details",children:e.jsx(g,{fluid:!0,className:"contact-bar__container",children:e.jsxs("div",{className:"contact-bar__grid",children:[e.jsxs("div",{className:"contact-bar__cell reveal-up",children:[e.jsx("span",{className:"contact-bar__label",children:"Email"}),e.jsx("p",{className:"contact-bar__value",children:e.jsx("a",{href:re,children:f})})]}),e.jsxs("div",{className:"contact-bar__cell reveal-up","data-delay":"0.05",children:[e.jsx("span",{className:"contact-bar__label",children:"WhatsApp & mobile"}),e.jsx("p",{className:"contact-bar__value",children:e.jsx("a",{href:ie,target:"_blank",rel:"noreferrer",children:b})})]}),e.jsxs("div",{className:"contact-bar__cell reveal-up","data-delay":"0.1",children:[e.jsx("span",{className:"contact-bar__label",children:"Offices"}),e.jsxs("p",{className:"contact-bar__value contact-bar__value--stack",children:[e.jsx("span",{children:"Newcastle, UK · GMT"}),e.jsx("span",{children:"Sofia, Bulgaria · GMT+2"})]})]})]})})}),e.jsx("section",{className:"contact-page-form-section",id:"contact","aria-labelledby":"contact-form-section-heading",style:{backgroundImage:`url(${J})`},children:e.jsxs(g,{fluid:!0,className:"contact-form-wide",children:[e.jsxs("header",{className:"contact-page__block-intro reveal-up",children:[e.jsx("h2",{id:"contact-form-section-heading",className:"contact-page__block-title",children:"Send us your brief."}),e.jsx("p",{className:"contact-page__block-lede",children:"We'll come back with a clear next step within 24 hours."})]}),e.jsxs("form",{className:"innovative-contact-form contact-form contact-form--extended",id:"contact-form-data","data-validate-message":"true",children:[e.jsx("div",{className:"px-0 mb-3",id:"result"}),e.jsxs("div",{className:"contact-form-wide__fields",children:[e.jsxs("div",{className:"contact-form__group contact-form__group--details",role:"group","aria-labelledby":"contact-details-label",children:[e.jsx("h2",{id:"contact-details-label",className:"contact-form__section-label",children:"Your details"}),e.jsxs("div",{className:"contact-form__details-row",children:[e.jsx("div",{className:"form-group contact-form__field contact-form__field--full-width",children:e.jsx("input",{className:"form-control",type:"text",placeholder:"Name",required:!0,id:"first_name",name:"firstName",autoComplete:"name"})}),e.jsx("div",{className:"form-group contact-form__field",children:e.jsx("input",{className:"form-control",type:"email",placeholder:"Email",required:!0,id:"email",name:"userEmail",autoComplete:"email"})}),e.jsx("div",{className:"form-group contact-form__field",children:e.jsx("input",{className:"form-control",type:"tel",placeholder:"Phone",required:!0,id:"phone",name:"userPhone",autoComplete:"tel"})})]})]}),e.jsxs("div",{className:"contact-form__group contact-form__group--project",role:"group","aria-labelledby":"contact-project-heading",children:[e.jsx("h2",{id:"contact-project-heading",className:"contact-form__section-label",children:"Your project"}),e.jsxs("fieldset",{className:"contact-fieldset contact-fieldset--in-group",children:[e.jsx("legend",{className:"visually-hidden",children:"Project type (select any that apply)"}),e.jsx("div",{className:"contact-check-grid",children:ue.map(({id:t,label:a})=>e.jsxs("label",{className:"contact-check",children:[e.jsx("input",{type:"checkbox",name:"projectType[]",value:a}),e.jsx("span",{children:a})]},t))})]})]}),e.jsxs("div",{className:"contact-form__group contact-form__group--budget",role:"group","aria-labelledby":"contact-budget-label",children:[e.jsx("h2",{id:"contact-budget-label",className:"contact-form__section-label",children:"Your budget"}),e.jsxs("div",{className:"contact-budget contact-budget--in-group",children:[e.jsxs("div",{className:"contact-budget__row",children:[e.jsx("span",{className:"contact-budget__tick",children:"£1k"}),e.jsx("input",{id:"contact-budget-range",name:"budget",type:"range",min:he,max:A,step:pe,value:r,onChange:t=>n(Number(t.target.value)),"aria-valuetext":R(r)}),e.jsx("span",{className:"contact-budget__tick",children:"£20k+"})]}),e.jsx("output",{className:"contact-budget__output",htmlFor:"contact-budget-range",children:R(r)})]})]}),e.jsxs("div",{className:"contact-form__group contact-form__group--message",role:"group","aria-labelledby":"contact-message-label",children:[e.jsx("h2",{id:"contact-message-label",className:"contact-form__section-label",children:"Your message"}),e.jsx("div",{className:"form-group contact-form__field contact-form__field--flush",children:e.jsx("textarea",{className:"form-control",placeholder:"Tell us what you're building and what help you need.",id:"message",name:"userMessage",rows:6,required:!0,defaultValue:""})})]})]}),e.jsx("div",{className:"contact-form__submit-wrap",children:e.jsx("button",{type:"button",className:"btn btn-transparent-white btn-rounded btn-large contact_btn contact-form__submit",children:"Send your brief →"})})]})]})}),e.jsxs("section",{className:"contact-calendly",id:"book-a-call","aria-labelledby":"contact-calendly-section-heading",children:[e.jsxs("header",{className:"contact-page__block-intro contact-calendly__intro reveal-up",children:[e.jsx("h2",{id:"contact-calendly-section-heading",className:"contact-page__block-title",children:"Book a free 30-minute call."}),e.jsx("p",{className:"contact-page__block-lede",children:"Pick a time that works for you - no commitment, just clarity."})]}),e.jsx("div",{className:"contact-calendly__embed-wrap reveal-up",children:e.jsx(se,{className:"contact-calendly__embed"})})]}),e.jsx(X,{}),e.jsx($,{}),e.jsx(z,{})]})};export{we as default};
