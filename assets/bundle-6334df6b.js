import{r as reactExports,m as mergeProps,c as classNames,G as useConfig,W as useLockScroll,X as useUnmountedRef,u as useSpring,Y as withStopPropagation,w as withNativeProps,R as React,M as Mask,a as animated,J as ShouldRender,U as renderToContainer,g as getDefaultExportFromCjs}from"./index-dc8a7631.js";import{T as defaultPopupBaseProps,a as useIsomorphicLayoutEffect,u as useDrag,U as useInnerVisible,w as CloseOutline}from"./useDocumentTitle-f2a4c298.js";const popup="";function PlayOutline(e){return reactExports.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},e,{style:Object.assign({verticalAlign:"-0.125em"},e.style),className:["antd-mobile-icon",e.className].filter(Boolean).join(" ")}),reactExports.createElement("g",{id:"PlayOutline-PlayOutline",stroke:"none",strokeWidth:1,fill:"none",fillRule:"evenodd"},reactExports.createElement("g",{id:"PlayOutline-编组"},reactExports.createElement("rect",{id:"PlayOutline-矩形",fill:"#FFFFFF",opacity:0,x:0,y:0,width:48,height:48}),reactExports.createElement("path",{d:"M13.7542635,5 L13.7542635,5 C14.4346997,5 15.1023464,5.17879782 15.6858218,5.51730753 L42.1766882,20.8867866 L42.1766884,20.8867867 C43.954638,21.9182878 44.5311886,24.1481853 43.4644541,25.8674033 C43.1473985,26.3783891 42.7051305,26.8060484 42.1766884,27.1126297 L15.6858221,42.4821088 L15.6858224,42.4821086 C13.9078904,43.5136394 11.6018067,42.9561767 10.5350149,41.2369758 C10.1849222,40.6727702 10,40.0271653 10,39.3691893 L10,8.63023111 L10,8.63023166 C10,6.62531187 11.6808306,5 13.7542421,5 L13.7542635,5 Z M13.7542635,7.72267123 L13.7542635,7.72267123 C13.2784351,7.72267123 12.8779439,8.06709552 12.8222725,8.52404271 L12.8157026,8.63022688 L12.8157026,39.369185 L12.8157026,39.3692026 C12.8157026,39.8704336 13.2355864,40.2770731 13.7539409,40.2770731 C13.8870633,40.2770731 14.0186722,40.249778 14.1400304,40.1968699 L14.236702,40.1478619 L40.7284922,24.7774894 L40.7284923,24.7774894 C41.1728598,24.5194214 41.3167368,23.9618834 41.0498545,23.5321949 C40.9896328,23.4352363 40.9111988,23.3500171 40.8185937,23.2809268 L40.7284918,23.2219354 L14.2366576,7.85156296 L14.2366576,7.85156295 C14.0908783,7.76717376 13.9241432,7.72267123 13.7542388,7.72267123 L13.7542635,7.72267123 Z",id:"PlayOutline-形状",fill:"currentColor",fillRule:"nonzero"}))))}const classPrefix="adm-popup",defaultProps=Object.assign(Object.assign({},defaultPopupBaseProps),{closeOnSwipe:!1,position:"bottom"}),Popup=e=>{const t=mergeProps(defaultProps,e),o=classNames(`${classPrefix}-body`,t.bodyClassName,`${classPrefix}-body-position-${t.position}`),{locale:r}=useConfig(),[a,n]=reactExports.useState(t.visible),i=reactExports.useRef(null);useLockScroll(i,t.disableBodyScroll&&a?"strict":!1),useIsomorphicLayoutEffect(()=>{t.visible&&n(!0)},[t.visible]);const u=useUnmountedRef(),{percent:p}=useSpring({percent:t.visible?0:100,config:{precision:.1,mass:.4,tension:300,friction:30},onRest:()=>{var s,l;u.current||(n(t.visible),t.visible?(s=t.afterShow)===null||s===void 0||s.call(t):(l=t.afterClose)===null||l===void 0||l.call(t))}}),d=useDrag(({swipe:[,s]})=>{var l;t.closeOnSwipe&&(s===1&&t.position==="bottom"||s===-1&&t.position==="top")&&((l=t.onClose)===null||l===void 0||l.call(t))},{axis:"y",enabled:["top","bottom"].includes(t.position)}),f=useInnerVisible(a&&t.visible),_=withStopPropagation(t.stopPropagation,withNativeProps(t,React.createElement("div",Object.assign({className:classPrefix,onClick:t.onClick,style:{display:a?void 0:"none",touchAction:["top","bottom"].includes(t.position)?"none":"auto"}},d()),t.mask&&React.createElement(Mask,{visible:f,forceRender:t.forceRender,destroyOnClose:t.destroyOnClose,onMaskClick:s=>{var l,c;(l=t.onMaskClick)===null||l===void 0||l.call(t,s),t.closeOnMaskClick&&((c=t.onClose)===null||c===void 0||c.call(t))},className:t.maskClassName,style:t.maskStyle,disableBodyScroll:!1,stopPropagation:t.stopPropagation}),React.createElement(animated.div,{className:o,style:Object.assign(Object.assign({},t.bodyStyle),{transform:p.to(s=>t.position==="bottom"?`translate(0, ${s}%)`:t.position==="top"?`translate(0, -${s}%)`:t.position==="left"?`translate(-${s}%, 0)`:t.position==="right"?`translate(${s}%, 0)`:"none")}),ref:i},t.showCloseButton&&React.createElement("a",{className:classNames(`${classPrefix}-close-icon`,"adm-plain-anchor"),onClick:()=>{var s;(s=t.onClose)===null||s===void 0||s.call(t)},role:"button","aria-label":r.common.close},React.createElement(CloseOutline,null)),t.children))));return React.createElement(ShouldRender,{active:a,forceRender:t.forceRender,destroyOnClose:t.destroyOnClose},renderToContainer(t.getContainer,_))};var propTypes={exports:{}},ReactPropTypesSecret_1,hasRequiredReactPropTypesSecret;function requireReactPropTypesSecret(){if(hasRequiredReactPropTypesSecret)return ReactPropTypesSecret_1;hasRequiredReactPropTypesSecret=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return ReactPropTypesSecret_1=e,ReactPropTypesSecret_1}var factoryWithThrowingShims,hasRequiredFactoryWithThrowingShims;function requireFactoryWithThrowingShims(){if(hasRequiredFactoryWithThrowingShims)return factoryWithThrowingShims;hasRequiredFactoryWithThrowingShims=1;var e=requireReactPropTypesSecret();function t(){}function o(){}return o.resetWarningCache=t,factoryWithThrowingShims=function(){function r(i,u,p,d,f,_){if(_!==e){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}r.isRequired=r;function a(){return r}var n={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:a,element:r,elementType:r,instanceOf:a,node:r,objectOf:a,oneOf:a,oneOfType:a,shape:a,exact:a,checkPropTypes:o,resetWarningCache:t};return n.PropTypes=n,n},factoryWithThrowingShims}var hasRequiredPropTypes;function requirePropTypes(){return hasRequiredPropTypes||(hasRequiredPropTypes=1,propTypes.exports=requireFactoryWithThrowingShims()()),propTypes.exports}var bundle=function(e){var t={};function o(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=e,o.c=t,o.d=function(r,a,n){o.o(r,a)||Object.defineProperty(r,a,{enumerable:!0,get:n})},o.r=function(r){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},o.t=function(r,a){if(1&a&&(r=o(r)),8&a||4&a&&typeof r=="object"&&r&&r.__esModule)return r;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&a&&typeof r!="string")for(var i in r)o.d(n,i,(function(u){return r[u]}).bind(null,i));return n},o.n=function(r){var a=r&&r.__esModule?function(){return r.default}:function(){return r};return o.d(a,"a",a),a},o.o=function(r,a){return Object.prototype.hasOwnProperty.call(r,a)},o.p="",o(o.s=2)}([function(e,t){e.exports=requirePropTypes()},function(e,t){e.exports=reactExports},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),(function(module){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__),enterModule;function _typeof(e){return(_typeof=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e}).apply(this,arguments)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}function _inherits(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(o,r){return o.__proto__=r,o})(e,t)}function _createSuper(e){return function(){var t,o=_getPrototypeOf(e);if(_isNativeReflectConstruct()){var r=_getPrototypeOf(this).constructor;t=Reflect.construct(o,arguments,r)}else t=o.apply(this,arguments);return _possibleConstructorReturn(this,t)}}function _possibleConstructorReturn(e,t){return!t||_typeof(t)!=="object"&&typeof t!="function"?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(e)}function _defineProperty(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}enterModule=typeof reactHotLoaderGlobal<"u"?reactHotLoaderGlobal.enterModule:void 0,enterModule&&enterModule(module),typeof reactHotLoaderGlobal<"u"&&reactHotLoaderGlobal.default.signature;var ReactAudioPlayer=function(_Component){_inherits(ReactAudioPlayer,_Component);var _super=_createSuper(ReactAudioPlayer);function ReactAudioPlayer(){var e;_classCallCheck(this,ReactAudioPlayer);for(var t=arguments.length,o=new Array(t),r=0;r<t;r++)o[r]=arguments[r];return _defineProperty(_assertThisInitialized(e=_super.call.apply(_super,[this].concat(o))),"audioEl",react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef()),_defineProperty(_assertThisInitialized(e),"listenTracker",void 0),_defineProperty(_assertThisInitialized(e),"onError",function(a){var n,i;return(n=(i=e.props).onError)===null||n===void 0?void 0:n.call(i,a)}),_defineProperty(_assertThisInitialized(e),"onCanPlay",function(a){var n,i;return(n=(i=e.props).onCanPlay)===null||n===void 0?void 0:n.call(i,a)}),_defineProperty(_assertThisInitialized(e),"onCanPlayThrough",function(a){var n,i;return(n=(i=e.props).onCanPlayThrough)===null||n===void 0?void 0:n.call(i,a)}),_defineProperty(_assertThisInitialized(e),"onPlay",function(a){var n,i;e.setListenTrack(),(n=(i=e.props).onPlay)===null||n===void 0||n.call(i,a)}),_defineProperty(_assertThisInitialized(e),"onAbort",function(a){var n,i;e.clearListenTrack(),(n=(i=e.props).onAbort)===null||n===void 0||n.call(i,a)}),_defineProperty(_assertThisInitialized(e),"onEnded",function(a){var n,i;e.clearListenTrack(),(n=(i=e.props).onEnded)===null||n===void 0||n.call(i,a)}),_defineProperty(_assertThisInitialized(e),"onPause",function(a){var n,i;e.clearListenTrack(),(n=(i=e.props).onPause)===null||n===void 0||n.call(i,a)}),_defineProperty(_assertThisInitialized(e),"onSeeked",function(a){var n,i;(n=(i=e.props).onSeeked)===null||n===void 0||n.call(i,a)}),_defineProperty(_assertThisInitialized(e),"onLoadedMetadata",function(a){var n,i;(n=(i=e.props).onLoadedMetadata)===null||n===void 0||n.call(i,a)}),_defineProperty(_assertThisInitialized(e),"onVolumeChanged",function(a){var n,i;(n=(i=e.props).onVolumeChanged)===null||n===void 0||n.call(i,a)}),e}return _createClass(ReactAudioPlayer,[{key:"componentDidMount",value:function(){var e=this.audioEl.current;e&&(this.updateVolume(this.props.volume),e.addEventListener("error",this.onError),e.addEventListener("canplay",this.onCanPlay),e.addEventListener("canplaythrough",this.onCanPlayThrough),e.addEventListener("play",this.onPlay),e.addEventListener("abort",this.onAbort),e.addEventListener("ended",this.onEnded),e.addEventListener("pause",this.onPause),e.addEventListener("seeked",this.onSeeked),e.addEventListener("loadedmetadata",this.onLoadedMetadata),e.addEventListener("volumechange",this.onVolumeChanged))}},{key:"componentWillUnmount",value:function(){var e=this.audioEl.current;e&&(e.removeEventListener("error",this.onError),e.removeEventListener("canplay",this.onCanPlay),e.removeEventListener("canplaythrough",this.onCanPlayThrough),e.removeEventListener("play",this.onPlay),e.removeEventListener("abort",this.onAbort),e.removeEventListener("ended",this.onEnded),e.removeEventListener("pause",this.onPause),e.removeEventListener("seeked",this.onSeeked),e.removeEventListener("loadedmetadata",this.onLoadedMetadata),e.removeEventListener("volumechange",this.onVolumeChanged))}},{key:"componentDidUpdate",value:function(e){this.updateVolume(this.props.volume)}},{key:"setListenTrack",value:function(){var e=this;if(!this.listenTracker){var t=this.props.listenInterval;this.listenTracker=window.setInterval(function(){var o,r;e.audioEl.current&&((o=(r=e.props).onListen)===null||o===void 0||o.call(r,e.audioEl.current.currentTime))},t)}}},{key:"updateVolume",value:function(e){var t=this.audioEl.current;t!==null&&typeof e=="number"&&e!==(t==null?void 0:t.volume)&&(t.volume=e)}},{key:"clearListenTrack",value:function(){this.listenTracker&&(clearInterval(this.listenTracker),delete this.listenTracker)}},{key:"render",value:function(){var e=this.props.children||react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p",null,"Your browser does not support the ",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code",null,"audio")," element."),t=this.props.controls!==!1,o=this.props.title?this.props.title:this.props.src,r={};return this.props.controlsList&&(r.controlsList=this.props.controlsList),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("audio",_extends({autoPlay:this.props.autoPlay,className:"react-audio-player ".concat(this.props.className),controls:t,crossOrigin:this.props.crossOrigin,id:this.props.id,loop:this.props.loop,muted:this.props.muted,preload:this.props.preload,ref:this.audioEl,src:this.props.src,style:this.props.style,title:o},r),e)}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),ReactAudioPlayer}(react__WEBPACK_IMPORTED_MODULE_0__.Component);_defineProperty(ReactAudioPlayer,"propTypes",void 0),_defineProperty(ReactAudioPlayer,"defaultProps",void 0),ReactAudioPlayer.defaultProps={autoPlay:!1,children:null,className:"",controls:!1,controlsList:"",id:"",listenInterval:1e4,loop:!1,muted:!1,onAbort:function(){},onCanPlay:function(){},onCanPlayThrough:function(){},onEnded:function(){},onError:function(){},onListen:function(){},onPause:function(){},onPlay:function(){},onSeeked:function(){},onVolumeChanged:function(){},onLoadedMetadata:function(){},preload:"metadata",style:{},title:"",volume:1},ReactAudioPlayer.propTypes={autoPlay:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,children:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element,className:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,controls:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,controlsList:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,crossOrigin:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,id:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,listenInterval:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,loop:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,muted:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,onAbort:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,onCanPlay:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,onCanPlayThrough:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,onEnded:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,onError:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,onListen:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,onLoadedMetadata:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,onPause:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,onPlay:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,onSeeked:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,onVolumeChanged:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,preload:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(["","none","metadata","auto"]),src:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,style:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string),title:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,volume:prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number};var _default=ReactAudioPlayer,reactHotLoader,leaveModule;__webpack_exports__.default=_default,reactHotLoader=typeof reactHotLoaderGlobal<"u"?reactHotLoaderGlobal.default:void 0,reactHotLoader&&(reactHotLoader.register(ReactAudioPlayer,"ReactAudioPlayer","/home/justin/Projects/react-audio-player/src/index.tsx"),reactHotLoader.register(_default,"default","/home/justin/Projects/react-audio-player/src/index.tsx")),leaveModule=typeof reactHotLoaderGlobal<"u"?reactHotLoaderGlobal.leaveModule:void 0,leaveModule&&leaveModule(module)}).call(this,__webpack_require__(3)(module))},function(e,t){e.exports=function(o){if(!o.webpackPolyfill){var r=Object.create(o);r.children||(r.children=[]),Object.defineProperty(r,"loaded",{enumerable:!0,get:function(){return r.l}}),Object.defineProperty(r,"id",{enumerable:!0,get:function(){return r.i}}),Object.defineProperty(r,"exports",{enumerable:!0}),r.webpackPolyfill=1}return r}}]);const ReactAudioPlayer=getDefaultExportFromCjs(bundle);export{Popup as P,ReactAudioPlayer as R,PlayOutline as a};
