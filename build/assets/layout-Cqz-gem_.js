const i=(t,n,m="html",r)=>{if(document.body){const e=document.getElementsByTagName(m.toString())[0],o=e.getAttribute(t);if(r&&o){e.removeAttribute(t);return}o||e.setAttribute(t,n)}};export{i as t};
