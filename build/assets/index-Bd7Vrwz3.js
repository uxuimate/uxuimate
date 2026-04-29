import{r as v,W as B,c as R,O as F,d as U,P as C,M as P,g as T,j as e,V as I,C as N,R as M,a as W,l as D,S as O,N as L,F as H,B as V,A as X}from"./index-cMuZXDCu.js";import{C as A,a as k}from"./booking-CNmORu08.js";import{t as f}from"./layout-Cqz-gem_.js";import{S as G}from"./ServicesUxTheorySection-BNcDb_I9.js";import{M as $}from"./MobileSliderHint-aP2L0OHw.js";import{u as Y}from"./useReveal-C62dEbL8.js";import{O as z}from"./OurProcessSection-rTQdn2It.js";import"./design-thinking-fYj5jvn3.js";const K=[{q:"How long does a typical project take?",a:"Depends on scope. A landing page takes 1-2 weeks. A full website 3-6 weeks. A SaaS product or complete brand system can take 2-4 months. We give you a clear timeline before we start."},{q:"Do you handle both design and development?",a:"Yes. We work end-to-end - UX research, UI design, branding, and full web development. One team, one handoff, no gaps."},{q:"Can you help with logo, typography, and brand identity alongside the website?",a:"Absolutely. Most of our clients come to us needing both. We build the visual identity first - logo, colour palette, typography system - then design the website on top of it so everything is consistent."},{q:"Do you work with international clients?",a:"Yes. We have studios in Newcastle UK and Sofia Bulgaria and work with clients across Europe, the Middle East, and beyond. Everything runs remotely with no drop in quality."},{q:"What if I already have a brand but just need a website?",a:"No problem. We work with existing brand guidelines and build around them. If we spot inconsistencies we'll flag them, but we never redesign what you haven't asked us to."},{q:"How much does a project cost?",a:"Projects typically start from £1,500 for a landing page and go up to £15,000+ for full brand and web builds. We give a fixed quote before starting so there are no surprises."},{q:"Do you provide support after launch?",a:"Yes. We offer ongoing support, updates, and retainer arrangements. Most clients stay with us after launch for continuous improvements."},{q:"Do you accept crypto or XRP?",a:"We can discuss payment options during onboarding, including select cryptocurrency arrangements where it makes sense for both sides."}],Q=`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`,J=`
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
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

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = mat2(1.62, 1.12, -1.12, 1.62) * p + uTime * 0.05;
      amplitude *= 0.52;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 ratio = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (uv - 0.5) * ratio;

    float loopTime = mod(uTime, 12.0);
    float angle = loopTime * 0.18;
    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

    vec2 q = rotation * p;
    float fieldA = fbm(q * 2.4 + vec2(loopTime * 0.09, sin(loopTime * 0.22)));
    float fieldB = fbm(q * 4.2 - vec2(cos(loopTime * 0.18), loopTime * 0.07));
    float flow = smoothstep(0.18, 0.92, fieldA + fieldB * 0.48);

    float ribbon = sin((q.x + fieldA * 0.85) * 8.0 + loopTime * 0.7) * 0.5 + 0.5;
    ribbon = smoothstep(0.46, 0.92, ribbon) * flow;

    vec3 black = vec3(0.015, 0.014, 0.018);
    vec3 red = vec3(0.91, 0.10, 0.35);
    vec3 blue = vec3(0.02, 0.55, 0.78);
    vec3 color = mix(black, red, flow * 0.72);
    color = mix(color, blue, fieldB * 0.18);
    color += red * ribbon * 0.34;

    float vignette = smoothstep(0.96, 0.14, length(p));
    float alpha = (0.42 + flow * 0.48 + ribbon * 0.32) * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`,Z=`
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
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

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = mat2(1.62, 1.12, -1.12, 1.62) * p + uTime * 0.05;
      amplitude *= 0.52;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 ratio = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (uv - 0.5) * ratio;

    float loopTime = mod(uTime, 12.0);
    float angle = loopTime * 0.18;
    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

    vec2 q = rotation * p;
    float fieldA = fbm(q * 2.4 + vec2(loopTime * 0.09, sin(loopTime * 0.22)));
    float fieldB = fbm(q * 4.2 - vec2(cos(loopTime * 0.18), loopTime * 0.07));
    float flow = smoothstep(0.18, 0.92, fieldA + fieldB * 0.48);

    float ribbon = sin((q.x + fieldA * 0.85) * 8.0 + loopTime * 0.7) * 0.5 + 0.5;
    ribbon = smoothstep(0.46, 0.92, ribbon) * flow;

    vec3 black = vec3(0.015, 0.012, 0.022);
    vec3 purple = vec3(0.58, 0.34, 0.99);
    vec3 cyan = vec3(0.12, 0.45, 0.95);
    vec3 color = mix(black, purple, flow * 0.72);
    color = mix(color, cyan, fieldB * 0.12);
    color += purple * ribbon * 0.32;

    float vignette = smoothstep(0.96, 0.14, length(p));
    float alpha = (0.42 + flow * 0.48 + ribbon * 0.32) * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`,ee=`
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
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

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = mat2(1.62, 1.12, -1.12, 1.62) * p + uTime * 0.05;
      amplitude *= 0.52;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 ratio = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (uv - 0.5) * ratio;

    float loopTime = mod(uTime, 12.0);
    float angle = loopTime * 0.16;
    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

    vec2 q = rotation * p;
    float fieldA = fbm(q * 2.4 + vec2(loopTime * 0.09, sin(loopTime * 0.22)));
    float fieldB = fbm(q * 4.2 - vec2(cos(loopTime * 0.18), loopTime * 0.07));
    float flow = smoothstep(0.18, 0.92, fieldA + fieldB * 0.48);

    float ribbon = sin((q.x + fieldA * 0.85) * 8.0 + loopTime * 0.7) * 0.5 + 0.5;
    ribbon = smoothstep(0.46, 0.92, ribbon) * flow;

    vec3 black = vec3(0.059, 0.051, 0.035);
    vec3 gold = vec3(0.573, 0.408, 0.039);
    vec3 champagne = vec3(0.941, 0.816, 0.502);
    vec3 color = mix(black, gold, flow * 0.74);
    color = mix(color, champagne, fieldB * 0.14);
    color += gold * ribbon * 0.34;

    float vignette = smoothstep(0.96, 0.14, length(p));
    float alpha = (0.42 + flow * 0.48 + ribbon * 0.32) * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`,se=`
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
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

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = mat2(1.62, 1.12, -1.12, 1.62) * p + uTime * 0.05;
      amplitude *= 0.52;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 ratio = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (uv - 0.5) * ratio;

    float loopTime = mod(uTime, 12.0);
    float angle = loopTime * 0.17;
    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

    vec2 q = rotation * p;
    float fieldA = fbm(q * 2.4 + vec2(loopTime * 0.09, sin(loopTime * 0.22)));
    float fieldB = fbm(q * 4.2 - vec2(cos(loopTime * 0.18), loopTime * 0.07));
    float flow = smoothstep(0.18, 0.92, fieldA + fieldB * 0.48);

    float ribbon = sin((q.x + fieldA * 0.85) * 8.0 + loopTime * 0.7) * 0.5 + 0.5;
    ribbon = smoothstep(0.46, 0.92, ribbon) * flow;

    vec3 slate = vec3(0.02, 0.04, 0.08);
    vec3 blue = vec3(0.231, 0.510, 0.965);
    vec3 cyan = vec3(0.15, 0.75, 0.92);
    vec3 color = mix(slate, blue, flow * 0.72);
    color = mix(color, cyan, fieldB * 0.14);
    color += blue * ribbon * 0.32;

    float vignette = smoothstep(0.96, 0.14, length(p));
    float alpha = (0.42 + flow * 0.48 + ribbon * 0.32) * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`,oe=s=>s==="development"?Z:s==="branding"?ee:s==="mobile"?se:J,te=({variant:s="default"})=>{const c=v.useRef(null);return v.useEffect(()=>{const o=c.current;if(!o||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const a=oe(s),i=new B({alpha:!0,antialias:!1,powerPreference:"high-performance"}),u=new R,r=new F(-1,1,1,-1,0,1),n={uTime:{value:0},uResolution:{value:new I(1,1)}},t=new U({transparent:!0,depthWrite:!1,fragmentShader:a,uniforms:n,vertexShader:Q}),m=new C(2,2),b=new P(m,t),g=performance.now();u.add(b),o.appendChild(i.domElement);const h=()=>{const x=o.clientWidth||1,S=o.clientHeight||1,q=window.innerWidth>1600?1.25:Math.min(window.devicePixelRatio||1,1.5);i.setPixelRatio(q),i.setSize(x,S,!1),n.uResolution.value.set(x,S)};let d=!0,l=document.visibilityState!=="hidden";const y=new IntersectionObserver(([x])=>{d=x.isIntersecting},{root:null,rootMargin:"80px 0px",threshold:0});y.observe(o);const w=()=>{l=document.visibilityState!=="hidden"};document.addEventListener("visibilitychange",w);const p=()=>{!d||!l||(n.uTime.value=(performance.now()-g)/1e3,i.render(u,r))};return h(),requestAnimationFrame(()=>h()),T.ticker.add(p),window.addEventListener("resize",h),()=>{document.removeEventListener("visibilitychange",w),y.disconnect(),T.ticker.remove(p),window.removeEventListener("resize",h),m.dispose(),t.dispose(),i.dispose(),i.domElement.remove()}},[s]),e.jsx("div",{className:"services-fluid-bg",ref:c,"aria-hidden":"true"})},ae=[{name:"STARTER",price:"Price from £2000",lead:"For teams who need a solid foundation.",items:["Stakeholder interview - 1 session","Information architecture & user flow","5 designed screens","Clickable prototype","1 revision round","Files ready for your developer"],cta:"Start your project"},{name:"GROWTH",badge:"Most Popular",price:"Price from £4000",lead:"For teams ready to design, test, and launch.",items:["User & stakeholder interviews - up to 3 sessions","Information architecture & user flow","15 designed screens","Clickable prototype","Redesign based on real feedback","3 revision rounds","Files ready for your developer"],cta:"Start your project",featured:!0},{name:"ENTERPRISE",price:"Price from Custom",lead:"For teams who need the full picture.",items:["User & stakeholder interviews - up to 6 sessions","Full information architecture & user flows","Up to 40 designed screens","Advanced prototype for stakeholder sign-off","Full redesign cycles based on research","Up to 6 revision rounds","Dedicated design team","Priority turnaround"],cta:"Let's talk"}],ie=[{name:"Starter",price:"Price from £2,000",lead:"For small businesses & landing pages",items:["Landing page or business website","Up to 5 pages","Contact form & basic integrations","Mobile friendly & fast loading","Handed over ready to use"],cta:"Discuss Scope"},{name:"Growth",badge:"Most Popular",price:"Price from £4,000",lead:"For growing businesses & online stores",items:["Full business website or ecommerce store","Up to 10 pages","Product catalogue & payment setup","Booking systems or lead capture","Blog or content management","4 weeks of post-launch support"],cta:"Start Your Build",featured:!0},{name:"Enterprise",price:"Price from Custom",lead:"For larger businesses & custom builds",items:["Everything in Growth","Custom web applications","Third-party integrations & APIs","Dedicated lead developer","Ongoing maintenance & updates"],cta:"Let's Talk"}],re={eyebrow:"What you actually get",title:"Deliverables by engagement tier",lede:'Three clear stacks - from research-only to full product UI. Every item is something you can hand to a stakeholder or a developer, not a vague "strategy deck" with no next step.'},ne={eyebrow:"What you actually get",title:"Engagement by build depth",lede:"Three clear ways to work with us on web: from a sharp first release to a platform your team can extend for years. No mystery scope - you always know what ships."},le=[{name:"Basic",price:"Price from £1,200",lead:"For new businesses & startups",items:["Logo design - 3 concepts","Colour palette","Typography selection","2 revision rounds","All files ready to use"],cta:"Discuss scope"},{name:"Pro",badge:"Most Popular",price:"Price from £2,500",lead:"For businesses ready to look the part",items:["Logo design - 3 concepts","Full colour & typography system","Brand guidelines document","Social media kit","Marketing asset templates","3 revision rounds"],cta:"Start your brand",featured:!0},{name:"Enterprise",price:"Price from £4,500",lead:"For businesses that need the full picture",items:["Everything in Pro","Full visual identity system","Website-ready brand assets","Icon set & illustration style","Brand launch support","Unlimited revisions"],cta:"Let's talk"}],ce={eyebrow:"What you actually get",title:"Branding packages",lede:"Three clear tiers - from a focused logo system to a full identity you can ship everywhere without guesswork."},de=[{name:"Starter",price:"Price from £2,500",lead:"For early-stage startups & MVPs",items:["User & stakeholder interview - 1 session","User flow & information architecture","Up to 8 designed screens","Clickable prototype","1 revision round","Files ready for your developer"],cta:"Start your project"},{name:"Growth",badge:"Most Popular",price:"Price from £5,500",lead:"For funded teams ready to launch",items:["User & stakeholder interviews - up to 3 sessions","Full user flow & information architecture","Up to 20 designed screens","Clickable prototype","Redesign based on real feedback","3 revision rounds","Files ready for your developer"],cta:"Start your project",featured:!0},{name:"Enterprise",price:"Price from Custom",lead:"For scaling products & larger teams",items:["User & stakeholder interviews - up to 6 sessions","Full information architecture & user flows","Up to 40 designed screens","Advanced prototype for stakeholder sign-off","Full redesign cycles based on research","Up to 6 revision rounds","Dedicated design team","Priority turnaround"],cta:"Let's talk"}],ue={eyebrow:"What you actually get",title:"Mobile & SaaS packages",lede:"Three clear tiers - from a focused MVP to full product design your developers can ship without guesswork."},me="Send your brief",ve=({serviceMode:s="default"})=>{const c=v.useRef(null),o=s==="development",a=s==="branding",i=s==="mobile",u=i?de:a?le:o?ie:ae,r=i?ue:a?ce:o?ne:re,n=i?"services-deliverables-heading-mobile":a?"services-deliverables-heading-brand":o?"services-deliverables-heading-dev":"services-deliverables-heading";return v.useEffect(()=>{const t=c.current;if(!t||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const b=T.context(()=>{const g=t.querySelectorAll(".services-deliverables__reveal");T.from(g,{opacity:0,y:40,duration:.75,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:t,start:"top 82%",toggleActions:"play none none reverse"}})},t);return()=>b.revert()},[s]),e.jsx("section",{ref:c,className:"services-deliverables",id:"services-deliverables","aria-labelledby":n,children:e.jsxs(N,{className:"services-deliverables__container",children:[e.jsxs("header",{className:"services-deliverables__header services-deliverables__reveal",children:[e.jsx("p",{className:"services-deliverables__eyebrow",children:r.eyebrow}),e.jsx("h2",{className:"services-deliverables__title",id:n,children:r.title}),e.jsx("p",{className:"services-deliverables__lede",children:r.lede})]}),e.jsx(M,{className:"services-deliverables__row services-deliverables__row--fan services-deliverables__row--three g-0 mobile-card-slider",children:u.map(t=>e.jsx(W,{md:4,xs:12,className:"services-deliverables__reveal services-deliverables__col mobile-card-slide",children:e.jsxs("article",{className:"services-deliverables__card"+(t.featured?" services-deliverables__card--featured":""),children:[e.jsxs("div",{className:"services-deliverables__card-head",children:[e.jsx("h3",{className:"services-deliverables__name",children:t.name}),t.badge?e.jsx("p",{className:"services-deliverables__ribbon","aria-label":t.badge,children:t.badge}):null]}),e.jsx("p",{className:"services-deliverables__price",children:t.price}),e.jsx("p",{className:"services-deliverables__lead",children:t.lead}),e.jsx("ul",{className:"services-deliverables__list",role:"list",children:t.items.map(m=>e.jsx("li",{className:"services-deliverables__item",children:m},m))}),e.jsx("a",{className:"btn btn-transparent-white btn-rounded btn-large services-deliverables__btn",href:A,children:me})]})},t.name))}),e.jsx($,{dotCount:u.length})]})},i?"deliverables-mobile":a?"deliverables-brand":o?"deliverables-dev":"deliverables-ux")},pe={quote:e.jsx(e.Fragment,{children:"Working with UX UI Mate completely changed how we think about our product. They didn't just design screens - they challenged our assumptions, talked to our users, and delivered something we couldn't have built without them."}),name:"Sarah Mitchell",role:"Founder, Launchpad App"},he={quote:e.jsx(e.Fragment,{children:"They didn't just build what we asked for - they made it better. We finally have a website we're proud to send clients to."}),name:"James Harrison",role:"Founder, Bridgepoint Studio"},fe={quote:e.jsx(e.Fragment,{children:"We'd been putting off sorting our brand for two years. UX UI Mate turned it around in three weeks - and we finally look like the company we actually are."}),name:"Oliver Pemberton",role:"Co-founder, Canvass Studio"},be={quote:e.jsx(e.Fragment,{children:"We came with a rough idea and left with a product our investors actually got excited about. The research phase alone changed how we thought about our own users."}),name:"Tom Ashworth",role:"CPO, Stackly"},_=({mode:s="ux"})=>{const c=s==="mobile"?be:s==="branding"?fe:s==="development"?he:pe,o=s==="mobile"?"services-testimonial-heading-mobile":s==="branding"?"services-testimonial-heading-brand":s==="development"?"services-testimonial-heading-dev":"services-testimonial-heading";return e.jsx("section",{className:"services-testimonial","aria-labelledby":o,children:e.jsxs("div",{className:"services-testimonial__inner",children:[e.jsx("p",{className:"services-testimonial__mark","aria-hidden":"true",children:"“"}),e.jsx("blockquote",{className:"services-testimonial__quote",id:o,children:e.jsx("p",{children:c.quote})}),e.jsx("div",{className:"services-testimonial__rule",role:"presentation"}),e.jsx("p",{className:"services-testimonial__name",children:c.name}),e.jsx("p",{className:"services-testimonial__role",children:c.role})]})})},j=[{id:"services-hero",label:"Hero"},{id:"services-ux-theory",label:"What UX is"},{id:"services-deliverables",label:"Tiers"},{id:"services-our-process",label:"Our process"}],ge=()=>{const[s,c]=v.useState(j[0].id);return v.useEffect(()=>{let o=0;const a=()=>{o||(o=requestAnimationFrame(()=>{o=0;const i=window.scrollY+window.innerHeight*.4,u=j.reduce((r,n)=>{const t=document.getElementById(n.id);return t&&t.getBoundingClientRect().top+window.scrollY<=i?n.id:r},j[0].id);c(r=>r===u?r:u)}))};return a(),window.addEventListener("scroll",a,{passive:!0}),window.addEventListener("resize",a),()=>{cancelAnimationFrame(o),window.removeEventListener("scroll",a),window.removeEventListener("resize",a)}},[]),e.jsx("nav",{className:"services-section-dots","aria-label":"On this page",children:e.jsx("ul",{className:"services-section-dots__list",children:j.map(o=>{const a=o.id===s;return e.jsx("li",{className:"services-section-dots__item",children:e.jsx("button",{type:"button",className:"services-section-dots__btn"+(a?" is-active":""),"aria-label":`Scroll to: ${o.label}`,"aria-current":a?"true":void 0,onClick:()=>{D(o.id)}})},o.id)})})})},ye="/assets/our-process-bg-C4gjm_Cw.jpg",we="/assets/our-process-webdev-CbBiN4WR.jpg",xe="/assets/our-process-branding-B-PE1b33.jpg",_e="/assets/our-process-mobile-aENGuMBa.jpg",E=[{number:"01",name:"UX/UI Design",headline:"Product Experience & Interface",text:"Most products lose people in the first 30 seconds. Ours don't. We go deep into how your users think, move, and decide - then design every screen around that."},{number:"02",name:"Development",headline:"We Build It. You Own It.",text:"From landing pages to full web products - clean code, on time, ready to grow."},{number:"03",name:"Branding",headline:"You know your brand isn't quite right. We fix that.",text:"A visual identity built for the web - so your brand looks as good on a screen as it does in your head."},{number:"04",name:"Mobile & SaaS",headline:"From zero to app store. We design mobile and SaaS products.",text:"For startups and product teams who need more than pretty screens - they need something people actually use."}],Be=()=>{Y();const[s,c]=v.useState(0),[o,a]=v.useState(0),i=v.useId(),u=E[s],r=s===1,n=s===2,t=s===3,m=t?"mobile":r?"development":n?"branding":"default",b=t?"services-page--mobile":r?"services-page--development":n?"services-page--branding":"services-page--ux",g=t?"mobile":r?"development":n?"branding":"default",h=t?_e:r?we:n?xe:ye;return v.useEffect(()=>{const d=window.jQuery||window.$;return d?d(".main-page-section").show():document.querySelectorAll(".main-page-section").forEach(l=>{l.style.display="block"}),f("data-spy","scroll","body"),f("data-target",".navbar","body"),f("data-offset","90","body"),()=>{f("data-spy","scroll","body",!0),f("data-target",".navbar","body",!0),f("data-offset","90","body",!0)}},[]),e.jsxs(e.Fragment,{children:[e.jsx(O,{title:"Services - UX/UI, Branding, Web Development",description:"Explore UX UI MATE services: UX/UI design, web development, branding, and mobile/SaaS product design for businesses in Newcastle, the UK, Europe and Bulgaria.",path:"/services",image:"/img/icons/logo-footer.png"}),e.jsx(L,{accentTheme:m}),e.jsxs("div",{className:b,children:[e.jsxs("div",{className:"main-page-section services-carousel-page",children:[e.jsx(te,{variant:g}),e.jsx("div",{className:"services-hero",id:"services-hero",children:e.jsx("div",{className:"item item--fluid-surface services-hero__panel",id:"services-hero-panel",role:"tabpanel","aria-labelledby":`service-tab-${u.number}`,children:e.jsxs("div",{className:"services-hero__inner",children:[e.jsx("h1",{className:"services-hero__headline",children:u.headline}),e.jsx("p",{className:"services-hero__body",children:u.text}),e.jsxs("div",{className:"services-hero__ctas",children:[e.jsx("a",{className:"btn btn-white btn-rounded btn-large",href:A,children:"Send your brief"}),e.jsx("a",{className:"btn btn-transparent-white btn-rounded btn-large",href:k,children:"Book 30-min call"})]})]},s)})}),e.jsx("nav",{className:"service-picker",role:"tablist","aria-label":"Services",children:E.map((d,l)=>e.jsx("button",{className:"service-picker__tab"+(s===l?" is-active":""),type:"button",role:"tab",id:`service-tab-${d.number}`,"aria-selected":s===l,"aria-controls":"services-hero-panel",onClick:()=>{c(l)},children:e.jsx("span",{className:"service-picker__text",children:d.name})},d.number))})]}),e.jsx(G,{serviceMode:m}),e.jsx(ve,{serviceMode:m}),s===0?e.jsx(_,{mode:"ux"}):null,s===1?e.jsx(_,{mode:"development"}):null,s===2?e.jsx(_,{mode:"branding"}):null,s===3?e.jsx(_,{mode:"mobile"}):null,e.jsx(z,{id:"services-our-process",backgroundImage:h,bookCallHref:k}),e.jsx("section",{className:"contact-faq","aria-labelledby":"services-faq-heading",children:e.jsxs(N,{className:"contact-faq__container",children:[e.jsx("h2",{id:"services-faq-heading",className:"contact-faq__heading reveal-up",children:"Common questions"}),e.jsx("div",{className:"contact-faq__list",children:K.map((d,l)=>{const y=`${i}-panel-${l}`,w=`${i}-btn-${l}`,p=o===l;return e.jsxs("div",{className:"contact-faq__item reveal-up","data-delay":String(l*.05),children:[e.jsxs("button",{id:w,type:"button",className:"contact-faq__trigger","aria-expanded":p,"aria-controls":y,onClick:()=>a(p?-1:l),children:[e.jsx("span",{children:d.q}),e.jsx("span",{className:"contact-faq__icon","aria-hidden":"true",children:p?"−":"+"})]}),e.jsx("div",{id:y,role:"region","aria-labelledby":w,className:"contact-faq__panel",hidden:!p,children:e.jsx("p",{children:d.a})})]},d.q)})})]})}),e.jsx(H,{accentTheme:m}),e.jsx(V,{}),e.jsx(ge,{}),e.jsx(X,{})]})]})};export{Be as default};
