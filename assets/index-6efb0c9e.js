var R=Object.defineProperty;var _=(n,o,e)=>o in n?R(n,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[o]=e;var m=(n,o,e)=>(_(n,typeof o!="symbol"?o+"":o,e),e);import{r as i,m as g,u as I,w as F,R as r,a as E,G as M,c as C,M as T,T as K,L as j}from"./index-dc8a7631.js";import{f as D,j as B,a as H,v as V,C as A,b as W,w as z,A as U,x as q}from"./useDocumentTitle-f2a4c298.js";function G(n){return i.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},n,{style:Object.assign({verticalAlign:"-0.125em"},n.style),className:["antd-mobile-icon",n.className].filter(Boolean).join(" ")}),i.createElement("g",{id:"CheckOutline-CheckOutline",stroke:"none",strokeWidth:1,fill:"none",fillRule:"evenodd"},i.createElement("g",{id:"CheckOutline-编组"},i.createElement("rect",{id:"CheckOutline-矩形",fill:"#FFFFFF",opacity:0,x:0,y:0,width:48,height:48}),i.createElement("path",{d:"M44.309608,12.6841286 L21.2180499,35.5661955 L21.2180499,35.5661955 C20.6343343,36.1446015 19.6879443,36.1446015 19.1042286,35.5661955 C19.0538201,35.5162456 19.0077648,35.4636155 18.9660627,35.4087682 C18.9113105,35.368106 18.8584669,35.3226694 18.808302,35.2729607 L3.6903839,20.2920499 C3.53346476,20.1365529 3.53231192,19.8832895 3.68780898,19.7263704 C3.7629255,19.6505669 3.86521855,19.6079227 3.97193622,19.6079227 L7.06238923,19.6079227 C7.16784214,19.6079227 7.26902895,19.6495648 7.34393561,19.7237896 L20.160443,32.4236157 L20.160443,32.4236157 L40.656066,12.115858 C40.7309719,12.0416387 40.8321549,12 40.9376034,12 L44.0280571,12 C44.248971,12 44.4280571,12.1790861 44.4280571,12.4 C44.4280571,12.5067183 44.3854124,12.609012 44.309608,12.6841286 Z",id:"CheckOutline-路径",fill:"currentColor",fillRule:"nonzero"}))))}let X=!1;const x=new Set;function $(){return X}function Z(n){return x.add(n),()=>{x.delete(n)}}function J(){return D.useSyncExternalStore(Z,$,$)}const w="adm-spin-loading",Q={default:"var(--adm-color-weak)",primary:"var(--adm-color-primary)",white:"var(--adm-color-white)"},Y={color:"default"},ee=15*3.14159265358979*2,te=i.memo(n=>{var o;const e=g(Y,n),u=J(),{percent:s}=I({cancel:u,loop:{reverse:!0},from:{percent:80},to:{percent:30},config:{duration:1200}});return F(e,r.createElement(E.div,{className:w,style:{"--color":(o=Q[e.color])!==null&&o!==void 0?o:e.color,"--percent":s}},r.createElement("svg",{className:`${w}-svg`,viewBox:"0 0 32 32"},r.createElement(E.circle,{className:`${w}-fill`,fill:"transparent",strokeWidth:"2",strokeDasharray:ee,strokeDashoffset:s,strokeLinecap:"square",r:15,cx:16,cy:16}))))});const v="adm-input",ne={defaultValue:"",onlyShowClearWhenFocus:!0},fe=i.forwardRef((n,o)=>{const e=g(ne,n),[u,s]=B(e),[h,p]=i.useState(!1),f=i.useRef(!1),d=i.useRef(null),{locale:L}=M();i.useImperativeHandle(o,()=>({clear:()=>{s("")},focus:()=>{var t;(t=d.current)===null||t===void 0||t.focus()},blur:()=>{var t;(t=d.current)===null||t===void 0||t.blur()},get nativeElement(){return d.current}}));const O=t=>{var a;e.onEnterPress&&(t.code==="Enter"||t.keyCode===13)&&e.onEnterPress(t),(a=e.onKeyDown)===null||a===void 0||a.call(e,t)};H(()=>{var t;if(e.enterKeyHint)return(t=d.current)===null||t===void 0||t.setAttribute("enterkeyhint",e.enterKeyHint),()=>{var a;(a=d.current)===null||a===void 0||a.removeAttribute("enterkeyhint")}},[e.enterKeyHint]);function P(){let t=u;if(e.type==="number"){const a=t&&W(parseFloat(t),e.min,e.max).toString();Number(t)!==Number(a)&&(t=a)}t!==u&&s(t)}const S=(()=>!e.clearable||!u||e.readOnly?!1:e.onlyShowClearWhenFocus?h:!0)();return F(e,r.createElement("div",{className:C(`${v}`,e.disabled&&`${v}-disabled`)},r.createElement("input",{ref:d,className:`${v}-element`,value:u,onChange:t=>{s(t.target.value)},onFocus:t=>{var a;p(!0),(a=e.onFocus)===null||a===void 0||a.call(e,t)},onBlur:t=>{var a;p(!1),P(),(a=e.onBlur)===null||a===void 0||a.call(e,t)},id:e.id,placeholder:e.placeholder,disabled:e.disabled,readOnly:e.readOnly,maxLength:e.maxLength,minLength:e.minLength,max:e.max,min:e.min,autoComplete:e.autoComplete,autoFocus:e.autoFocus,pattern:e.pattern,inputMode:e.inputMode,type:e.type,name:e.name,autoCapitalize:e.autoCapitalize,autoCorrect:e.autoCorrect,onKeyDown:O,onKeyUp:e.onKeyUp,onCompositionStart:t=>{var a;f.current=!0,(a=e.onCompositionStart)===null||a===void 0||a.call(e,t)},onCompositionEnd:t=>{var a;f.current=!1,(a=e.onCompositionEnd)===null||a===void 0||a.call(e,t)},onClick:e.onClick,step:e.step,role:e.role,"aria-valuenow":e["aria-valuenow"],"aria-valuemax":e["aria-valuemax"],"aria-valuemin":e["aria-valuemin"],"aria-label":e["aria-label"]}),S&&r.createElement("div",{className:`${v}-clear`,onMouseDown:t=>{t.preventDefault()},onClick:()=>{var t,a;s(""),(t=e.onClear)===null||t===void 0||t.call(e),V()&&f.current&&(f.current=!1,(a=d.current)===null||a===void 0||a.blur())},"aria-label":L.Input.clear},r.createElement(A,null))))});const l="adm-toast",oe={maskClickable:!0,stopPropagation:["click"]},ae=n=>{const o=g(oe,n),{maskClickable:e,content:u,icon:s,position:h}=o,p=i.useMemo(()=>{if(s==null)return null;switch(s){case"success":return r.createElement(G,{className:`${l}-icon-success`});case"fail":return r.createElement(z,{className:`${l}-icon-fail`});case"loading":return r.createElement(te,{color:"white",className:`${l}-loading`});default:return s}},[s]),f=i.useMemo(()=>{switch(h){case"top":return"20%";case"bottom":return"80%";default:return"50%"}},[h]);return r.createElement(T,{visible:o.visible,destroyOnClose:!0,opacity:0,disableBodyScroll:!e,getContainer:o.getContainer,afterClose:o.afterClose,style:Object.assign({pointerEvents:e?"none":"auto"},o.maskStyle),className:C(`${l}-mask`,o.maskClassName),stopPropagation:o.stopPropagation},r.createElement("div",{className:C(`${l}-wrap`)},r.createElement("div",{style:{top:f},className:C(`${l}-main`,s?`${l}-main-icon`:`${l}-main-text`)},p&&r.createElement("div",{className:`${l}-icon`},p),r.createElement(U,null,u))))};let c=null,b=null;const y={duration:2e3,position:"center",maskClickable:!0},re=n=>r.createElement(ae,Object.assign({},n));function se(n){const o=g(y,typeof n=="string"?{content:n}:n),e=r.createElement(re,Object.assign({},o,{onClose:()=>{c=null}}));return c?c.replace(e):c=q(e),b&&window.clearTimeout(b),o.duration!==0&&(b=window.setTimeout(()=>{N()},o.duration)),c}function N(){c==null||c.close(),c=null}function ie(n){n.duration!==void 0&&(y.duration=n.duration),n.position!==void 0&&(y.position=n.position),n.maskClickable!==void 0&&(y.maskClickable=n.maskClickable)}const le={show:se,clear:N,config:ie},pe=le;function k(n,o){return e=>{try{n()}catch{}if(o)throw e;return e}}class ce{constructor(){m(this,"refCount",0);m(this,"container");m(this,"root");m(this,"show",()=>{this.refCount+=1,this.refCount===1&&this.create()});m(this,"hide",()=>{this.refCount-=1,this.refCount===0?this.destroy():this.refCount<0&&(console.warn(`Instance refCount: ${this.refCount}`),this.refCount=0)});m(this,"using",o=>Promise.resolve().then(k(this.show)).then(o).then(k(this.hide),k(this.hide,!0)))}reset(){this.refCount=0,this.destroy()}create(){this.container||(this.container=document.createElement("div"),K.createRoot(this.container).render(r.createElement(j)),document.body.appendChild(this.container))}destroy(){var o;this.container&&((o=this.root)==null||o.unmount(),document.body.removeChild(this.container),this.container=void 0)}}const he=new ce;export{fe as I,pe as T,he as l};
