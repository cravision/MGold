/*!
* chartjs-plugin-annotation v1.3.0
* https://www.chartjs.org/chartjs-plugin-annotation/index
 * (c) 2022 chartjs-plugin-annotation Contributors
 * Released under the MIT License
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("chart.js"),require("chart.js/helpers")):"function"==typeof define&&define.amd?define(["chart.js","chart.js/helpers"],e):(t="undefined"!=typeof globalThis?globalThis:t||self)["chartjs-plugin-annotation"]=e(t.Chart,t.Chart.helpers)}(this,(function(t,e){"use strict";const o=["click","dblclick"],n=["enter","leave"],i=o.concat(n);function r(t,e,o){if(t.listened)switch(e.type){case"mousemove":case"mouseout":!function(t,e){if(!t.moveListened)return;let o;"mousemove"===e.type&&(o=a(t.elements,e));const n=t.hovered;t.hovered=o,function(t,e,o){const{previous:n,element:i}=e;n&&n!==i&&s(n.options.leave||t.listeners.leave,n,o);i&&i!==n&&s(i.options.enter||t.listeners.enter,i,o)}(t,{previous:n,element:o},e)}(t,e);break;case"click":!function(t,e,o){const n=t.listeners,i=a(t.elements,e);if(i){const t=i.options,r=t.dblclick||n.dblclick,a=t.click||n.click;i.clickTimeout?(clearTimeout(i.clickTimeout),delete i.clickTimeout,s(r,i,e)):r?i.clickTimeout=setTimeout((()=>{delete i.clickTimeout,s(a,i,e)}),o.dblClickSpeed):s(a,i,e)}}(t,e,o)}}function s(t,o,n){e.callback(t,[o.$context,n])}function a(t,o){let n=Number.POSITIVE_INFINITY;return t.filter((t=>t.options.display&&t.inRange(o.x,o.y))).reduce(((t,i)=>{const r=i.getCenterPoint(),s=e.distanceBetweenPoints(o,r);return s<n?(t=[i],n=s):s===n&&t.push(i),t}),[]).sort(((t,e)=>t._index-e._index)).slice(0,1)[0]}function d(t,o,n){const i=function(t,o){const n=t.axis,i=t.id,r=n+"ScaleID",s={min:e.valueOrDefault(t.min,Number.NEGATIVE_INFINITY),max:e.valueOrDefault(t.max,Number.POSITIVE_INFINITY)};for(const e of o)e.scaleID===i?c(e,t,["value","endValue"],s):e[r]===i&&c(e,t,[n+"Min",n+"Max",n+"Value"],s);return s}(o,n);let r=l(o,i,"min","suggestedMin");r=l(o,i,"max","suggestedMax")||r,r&&"function"==typeof o.handleTickRangeOptions&&o.handleTickRangeOptions()}function l(t,o,n,i){if(e.isFinite(o[n])&&!function(t,o,n){return e.defined(t[o])||e.defined(t[n])}(t.options,n,i)){const e=t[n]!==o[n];return t[n]=o[n],e}}function h(t,e){for(const o of["scaleID","xScaleID","yScaleID"])t[o]&&!e[t[o]]&&console.warn(`No scale found with id '${t[o]}' for annotation '${t.id}'`)}function c(t,o,n,i){for(const r of n){const n=t[r];if(e.defined(n)){const t=o.parse(n);i.min=Math.min(i.min,t),i.max=Math.max(i.max,t)}}}const u=(t,e,o)=>Math.min(o,Math.max(e,t));function f(t,e,o){for(const n of Object.keys(t))t[n]=u(t[n],e,o);return t}function b(t,e,{x:o,y:n,width:i,height:r},s){const a=s/2||0;return t>=o-a&&t<=o+i+a&&e>=n-a&&e<=n+r+a}function x(t,e){const{x:o,y:n}=t.getProps(["x","y"],e);return{x:o,y:n}}const y=(t,e)=>e>t||t.length>e.length&&t.substr(0,e.length)===e;const p=t=>"string"==typeof t&&t.endsWith("%"),g=t=>u(parseFloat(t)/100,0,1);function w(t,e){return"start"===e?0:"end"===e?t:p(e)?g(e)*t:t/2}function m(t,e){return"number"==typeof e?e:p(e)?g(e)*t:t}function v(t){return e.isObject(t)?{x:e.valueOrDefault(t.x,"center"),y:e.valueOrDefault(t.y,"center")}:{x:t=e.valueOrDefault(t,"center"),y:t}}function M(t){return t&&(e.defined(t.xValue)||e.defined(t.yValue))}const S=new Map;function C(t){return t instanceof Image||t instanceof HTMLCanvasElement}function D(t,e){if(e&&e.borderWidth)return t.lineCap=e.borderCapStyle,t.setLineDash(e.borderDash),t.lineDashOffset=e.borderDashOffset,t.lineJoin=e.borderJoinStyle,t.lineWidth=e.borderWidth,t.strokeStyle=e.borderColor,!0}function P(t,e){t.shadowColor=e.backgroundShadowColor,t.shadowBlur=e.shadowBlur,t.shadowOffsetX=e.shadowOffsetX,t.shadowOffsetY=e.shadowOffsetY}function k(t,o){const n=o.content;if(C(n))return{width:m(n.width,o.width),height:m(n.height,o.height)};const i=e.toFont(o.font),r=e.isArray(n)?n:[n],s=r.join()+i.string+(t._measureText?"-spriting":"");if(!S.has(s)){t.save(),t.font=i.string;const e=r.length;let o=0;for(let n=0;n<e;n++){const e=r[n];o=Math.max(o,t.measureText(e).width)}t.restore();const n=e*i.lineHeight;S.set(s,{width:o,height:n})}return S.get(s)}function O(t,o,n){const{x:i,y:r,width:s,height:a}=o;t.save(),P(t,n);const d=D(t,n);t.fillStyle=n.backgroundColor,t.beginPath(),e.addRoundedRectPath(t,{x:i,y:r,w:s,h:a,radius:f(e.toTRBLCorners(e.valueOrDefault(n.cornerRadius,n.borderRadius)),0,Math.min(s,a)/2)}),t.closePath(),t.fill(),d&&(t.shadowColor=n.borderShadowColor,t.stroke()),t.restore()}function j(t,o,n){const i=n.content;if(C(i))return void t.drawImage(i,o.x,o.y,o.width,o.height);const r=e.isArray(i)?i:[i],s=e.toFont(n.font),a=s.lineHeight,d=function(t,e){const{x:o,width:n}=t,i=e.textAlign;return"center"===i?o+n/2:"end"===i||"right"===i?o+n:o}(o,n),l=o.y+a/2;t.font=s.string,t.textBaseline="middle",t.textAlign=n.textAlign,t.fillStyle=n.color,r.forEach(((e,o)=>t.fillText(e,d,l+o*a)))}function A(t){const{x:e,y:o,width:n,height:i}=t;return{x:e+n/2,y:o+i/2}}function I(t,o,n){return o="number"==typeof o?o:t.parse(o),e.isFinite(o)?t.getPixelForValue(o):n}function W(t,e){if(t){const o=I(t,e.min,e.start),n=I(t,e.max,e.end);return{start:Math.min(o,n),end:Math.max(o,n)}}return{start:e.start,end:e.end}}function T(t,e){const{chartArea:o,scales:n}=t,i=n[e.xScaleID],r=n[e.yScaleID];let s=o.width/2,a=o.height/2;return i&&(s=I(i,e.xValue,s)),r&&(a=I(r,e.yValue,a)),{x:s,y:a}}function R(t,e){const o=t.scales[e.xScaleID],n=t.scales[e.yScaleID];let{top:i,left:r,bottom:s,right:a}=t.chartArea;if(!o&&!n)return{};const d=W(o,{min:e.xMin,max:e.xMax,start:r,end:a});r=d.start,a=d.end;const l=W(n,{min:e.yMin,max:e.yMax,start:i,end:s});return i=l.start,s=l.end,{x:r,y:i,x2:a,y2:s,width:a-r,height:s-i}}function E(t,e){if(!M(e)){const o=R(t,e),n=A(o);let i=e.radius;return i&&!isNaN(i)||(i=Math.min(o.width,o.height)/2,e.radius=i),{x:n.x+e.xAdjust,y:n.y+e.yAdjust,width:2*i,height:2*i}}return function(t,e){const o=T(t,e);return{x:o.x+e.xAdjust,y:o.y+e.yAdjust,width:2*e.radius,height:2*e.radius}}(t,e)}class Y extends t.Element{inRange(t,e,o){return b(t,e,this.getProps(["x","y","width","height"],o),this.options.borderWidth)}getCenterPoint(t){return A(this.getProps(["x","y","width","height"],t))}draw(t){t.save(),O(t,this,this.options),t.restore()}drawLabel(t){const{x:o,y:n,width:i,height:r,options:s}=this,{label:a,borderWidth:d}=s,l=d/2,h=v(a.position),c=e.toPadding(a.padding),u=k(t,a),f={x:X(this,u,h,c),y:V(this,u,h,c),width:u.width,height:u.height};t.save(),t.beginPath(),t.rect(o+l+c.left,n+l+c.top,i-d-c.width,r-d-c.height),t.clip(),j(t,f,a),t.restore()}resolveElementProperties(t,e){return R(t,e)}}function X(t,e,o,n){const{x:i,x2:r,width:s,options:a}=t,{xAdjust:d,borderWidth:l}=a.label;return H({start:i,end:r,size:s},{position:o.x,padding:{start:n.left,end:n.right},adjust:d,borderWidth:l,size:e.width})}function V(t,e,o,n){const{y:i,y2:r,height:s,options:a}=t,{yAdjust:d,borderWidth:l}=a.label;return H({start:i,end:r,size:s},{position:o.y,padding:{start:n.top,end:n.bottom},adjust:d,borderWidth:l,size:e.height})}function H(t,e){const{start:o,end:n}=t,{position:i,padding:{start:r,end:s},adjust:a,borderWidth:d}=e;return o+d/2+a+r+w(n-d-o-r-s-e.size,i)}Y.id="boxAnnotation",Y.defaults={adjustScaleRange:!0,backgroundShadowColor:"transparent",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderRadius:0,borderShadowColor:"transparent",borderWidth:1,cornerRadius:void 0,display:!0,label:{borderWidth:void 0,color:"black",content:null,drawTime:void 0,enabled:!1,font:{family:void 0,lineHeight:void 0,size:void 0,style:void 0,weight:"bold"},height:void 0,padding:6,position:"center",textAlign:"start",xAdjust:0,yAdjust:0,width:void 0},shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,xMax:void 0,xMin:void 0,xScaleID:"x",yMax:void 0,yMin:void 0,yScaleID:"y"},Y.defaultRoutes={borderColor:"color",backgroundColor:"color"},Y.descriptors={label:{_fallback:!0}};const N=(t,e,o)=>({x:t.x+o*(e.x-t.x),y:t.y+o*(e.y-t.y)}),_=(t,e,o)=>N(e,o,Math.abs((t-e.y)/(o.y-e.y))).x,z=(t,e,o)=>N(e,o,Math.abs((t-e.x)/(o.x-e.x))).y,L=t=>t*t,B=.001;function $({x:t,y:e,x2:o,y2:n},{top:i,right:r,bottom:s,left:a}){return!(t<a&&o<a||t>r&&o>r||e<i&&n<i||e>s&&n>s)}function F({x:t,y:e},o,{top:n,right:i,bottom:r,left:s}){return t<s&&(e=z(s,{x:t,y:e},o),t=s),t>i&&(e=z(i,{x:t,y:e},o),t=i),e<n&&(t=_(n,{x:t,y:e},o),e=n),e>r&&(t=_(r,{x:t,y:e},o),e=r),{x:t,y:e}}class J extends t.Element{intersects(t,e,o=.001,n){const{x:i,y:r,x2:s,y2:a}=this.getProps(["x","y","x2","y2"],n),d=s-i,l=a-r,h=L(d)+L(l),c=0===h?-1:((t-i)*d+(e-r)*l)/h;let u,f;return c<0?(u=i,f=r):c>1?(u=s,f=a):(u=i+c*d,f=r+c*l),L(t-u)+L(e-f)<=o}labelIsVisible(t,e){const o=this.options.label;return!(!o||!o.enabled)&&(!e||$(this.getProps(["x","y","x2","y2"],t),e))}isOnLabel(t,e,o){if(!this.labelIsVisible(o))return!1;const{labelX:n,labelY:i,labelWidth:r,labelHeight:s,labelRotation:a}=this.getProps(["labelX","labelY","labelWidth","labelHeight","labelRotation"],o),{x:d,y:l}=function(t,e,o){const n=Math.cos(o),i=Math.sin(o),r=e.x,s=e.y;return{x:r+n*(t.x-r)-i*(t.y-s),y:s+i*(t.x-r)+n*(t.y-s)}}({x:t,y:e},{x:n,y:i},-a),h=this.options.label.borderWidth/2||0,c=r/2+h,u=s/2+h;return d>=n-c-B&&d<=n+c+B&&l>=i-u-B&&l<=i+u+B}inRange(t,e,o){const n=L(this.options.borderWidth/2);return this.intersects(t,e,n,o)||this.isOnLabel(t,e,o)}getCenterPoint(){return{x:(this.x2+this.x)/2,y:(this.y2+this.y)/2}}draw(t){const{x:e,y:o,x2:n,y2:i,options:r}=this;if(t.save(),!D(t,r))return t.restore();P(t,r);const s=Math.atan2(i-o,n-e),a=Math.sqrt(Math.pow(n-e,2)+Math.pow(i-o,2)),{startOpts:d,endOpts:l,startAdjust:h,endAdjust:c}=function(t){const e=t.options,o=e.arrowHeads&&e.arrowHeads.start,n=e.arrowHeads&&e.arrowHeads.end;return{startOpts:o,endOpts:n,startAdjust:K(t,o),endAdjust:K(t,n)}}(this);t.translate(e,o),t.rotate(s),t.beginPath(),t.moveTo(0+h,0),t.lineTo(a-c,0),t.shadowColor=r.borderShadowColor,t.stroke(),Q(t,0,h,d),Q(t,a,-c,l),t.restore()}drawLabel(t,e){if(!this.labelIsVisible(!1,e))return;const{labelX:o,labelY:n,labelWidth:i,labelHeight:r,labelRotation:s,labelPadding:a,labelTextSize:d,options:{label:l}}=this;t.save(),t.translate(o,n),t.rotate(s);O(t,{x:-i/2,y:-r/2,width:i,height:r},l);j(t,{x:-i/2+a.left+l.borderWidth/2,y:-r/2+a.top+l.borderWidth/2,width:d.width,height:d.height},l),t.restore()}resolveElementProperties(t,o){const n=t.scales[o.scaleID];let i,r,{top:s,left:a,bottom:d,right:l}=t.chartArea;if(n)i=I(n,o.value,NaN),r=I(n,o.endValue,i),n.isHorizontal()?(a=i,l=r):(s=i,d=r);else{const e=t.scales[o.xScaleID],n=t.scales[o.yScaleID];e&&(a=I(e,o.xMin,a),l=I(e,o.xMax,l)),n&&(s=I(n,o.yMin,s),d=I(n,o.yMax,d))}const h=$({x:a,y:s,x2:l,y2:d},t.chartArea)?function(t,e,o){const{x:n,y:i}=F(t,e,o),{x:r,y:s}=F(e,t,o);return{x:n,y:i,x2:r,y2:s,width:Math.abs(r-n),height:Math.abs(s-i)}}({x:a,y:s},{x:l,y:d},t.chartArea):{x:a,y:s,x2:l,y2:d,width:Math.abs(l-a),height:Math.abs(d-s)},c=o.label;return c&&c.content?function(t,o,n){const{padding:i,xPadding:r,yPadding:s,borderWidth:a}=n,d=function(t,o,n){let i=t;(o||n)&&(i={x:o||6,y:n||6});return e.toPadding(i)}(i,r,s),l=k(o.ctx,n),h=l.width+d.width+a,c=l.height+d.height+a,u=function(t,o,n,i){const{width:r,height:s,padding:a}=n,{xAdjust:d,yAdjust:l}=o,h={x:t.x,y:t.y},c={x:t.x2,y:t.y2},u="auto"===o.rotation?function(t){const{x:o,y:n,x2:i,y2:r}=t,s=Math.atan2(r-n,i-o);return s>e.PI/2?s-e.PI:s<e.PI/-2?s+e.PI:s}(t):e.toRadians(o.rotation),f=function(t,e,o){const n=Math.cos(o),i=Math.sin(o);return{w:Math.abs(t*n)+Math.abs(e*i),h:Math.abs(t*i)+Math.abs(e*n)}}(r,s,u),b=function(t,e,o,n){let i;const r=function(t,e){const{x:o,x2:n,y:i,y2:r}=t,s=Math.min(i,r)-e.top,a=Math.min(o,n)-e.left,d=e.bottom-Math.max(i,r),l=e.right-Math.max(o,n);return{x:Math.min(a,l),y:Math.min(s,d),dx:a<=l?1:-1,dy:s<=d?1:-1}}(t,n);i="start"===e.position?U({w:t.x2-t.x,h:t.y2-t.y},o,e,r):"end"===e.position?1-U({w:t.x-t.x2,h:t.y-t.y2},o,e,r):w(1,e.position);return i}(t,o,{labelSize:f,padding:a},i),x=N(h,c,b),y={size:f.w,min:i.left,max:i.right,padding:a.left},p={size:f.h,min:i.top,max:i.bottom,padding:a.top};return{x:G(x.x,y)+d,y:G(x.y,p)+l,width:r,height:s,rotation:u}}(t,n,{width:h,height:c,padding:d},o.chartArea);return t.labelX=u.x,t.labelY=u.y,t.labelWidth=u.width,t.labelHeight=u.height,t.labelRotation=u.rotation,t.labelPadding=d,t.labelTextSize=l,t}(h,t,c):h}}J.id="lineAnnotation";const q={backgroundColor:void 0,backgroundShadowColor:void 0,borderColor:void 0,borderDash:void 0,borderDashOffset:void 0,borderShadowColor:void 0,borderWidth:void 0,enabled:void 0,fill:void 0,length:void 0,shadowBlur:void 0,shadowOffsetX:void 0,shadowOffsetY:void 0,width:void 0};function U(t,e,o,n){const{labelSize:i,padding:r}=e,s=t.w*n.dx,a=t.h*n.dy,d=s>0&&(i.w/2+r.left-n.x)/s,l=a>0&&(i.h/2+r.top-n.y)/a;return u(Math.max(d,l),0,.25)}function G(t,e){const{size:o,min:n,max:i,padding:r}=e,s=o/2;return o>i-n?(i+n)/2:(n>=t-r-s&&(t=n+r+s),i<=t+r+s&&(t=i-r-s),t)}function K(t,e){if(!e||!e.enabled)return 0;const{length:o,width:n}=e,i=t.options.borderWidth/2,r={x:o,y:n+i},s={x:0,y:i};return Math.abs(_(0,r,s))}function Q(t,e,o,n){if(!n||!n.enabled)return;const{length:i,width:r,fill:s,backgroundColor:a,borderColor:d}=n,l=Math.abs(e-i)+o;t.beginPath(),P(t,n),D(t,n),t.moveTo(l,-r),t.lineTo(e+o,0),t.lineTo(l,r),!0===s?(t.fillStyle=a||d,t.closePath(),t.fill(),t.shadowColor="transparent"):t.shadowColor=n.borderShadowColor,t.stroke()}J.defaults={adjustScaleRange:!0,arrowHeads:{enabled:!1,end:Object.assign({},q),fill:!1,length:12,start:Object.assign({},q),width:6},borderDash:[],borderDashOffset:0,borderShadowColor:"transparent",borderWidth:2,display:!0,endValue:void 0,label:{backgroundColor:"rgba(0,0,0,0.8)",backgroundShadowColor:"transparent",borderCapStyle:"butt",borderColor:"black",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderRadius:6,borderShadowColor:"transparent",borderWidth:0,color:"#fff",content:null,cornerRadius:void 0,drawTime:void 0,enabled:!1,font:{family:void 0,lineHeight:void 0,size:void 0,style:void 0,weight:"bold"},height:void 0,padding:6,position:"center",rotation:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,textAlign:"center",width:void 0,xAdjust:0,xPadding:void 0,yAdjust:0,yPadding:void 0},scaleID:void 0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,value:void 0,xMax:void 0,xMin:void 0,xScaleID:"x",yMax:void 0,yMin:void 0,yScaleID:"y"},J.descriptors={arrowHeads:{start:{_fallback:!0},end:{_fallback:!0},_fallback:!0}},J.defaultRoutes={borderColor:"color"};class Z extends t.Element{inRange(t,o,n){return function(t,o,n,i){const{width:r,height:s}=o,a=o.getCenterPoint(!0),d=r/2,l=s/2;if(d<=0||l<=0)return!1;const h=e.toRadians(n||0),c=i/2||0,u=Math.cos(h),f=Math.sin(h),b=Math.pow(u*(t.x-a.x)+f*(t.y-a.y),2),x=Math.pow(f*(t.x-a.x)-u*(t.y-a.y),2);return b/Math.pow(d+c,2)+x/Math.pow(l+c,2)<=1.0001}({x:t,y:o},this.getProps(["width","height"],n),this.options.rotation,this.options.borderWidth)}getCenterPoint(t){return A(this.getProps(["x","y","width","height"],t))}draw(t){const{width:o,height:n,options:i}=this,r=this.getCenterPoint();t.save(),t.translate(r.x,r.y),i.rotation&&t.rotate(e.toRadians(i.rotation)),P(t,this.options),t.beginPath(),t.fillStyle=i.backgroundColor;const s=D(t,i);t.ellipse(0,0,n/2,o/2,e.PI/2,0,2*e.PI),t.fill(),s&&(t.shadowColor=i.borderShadowColor,t.stroke()),t.restore()}resolveElementProperties(t,e){return R(t,e)}}Z.id="ellipseAnnotation",Z.defaults={adjustScaleRange:!0,backgroundShadowColor:"transparent",borderDash:[],borderDashOffset:0,borderShadowColor:"transparent",borderWidth:1,display:!0,rotation:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,xMax:void 0,xMin:void 0,xScaleID:"x",yMax:void 0,yMin:void 0,yScaleID:"y"},Z.defaultRoutes={borderColor:"color",backgroundColor:"color"};class tt extends t.Element{inRange(t,e,o){return b(t,e,this.getProps(["x","y","width","height"],o),this.options.borderWidth)}getCenterPoint(t){return A(this.getProps(["x","y","width","height"],t))}draw(t){if(!this.options.content)return;const{labelX:e,labelY:o,labelWidth:n,labelHeight:i,options:r}=this;!function(t,e){const{pointX:o,pointY:n,calloutPosition:i,options:r}=e;if(!i)return;const s=r.callout;t.save(),t.beginPath();if(!D(t,s))return t.restore();const{separatorStart:a,separatorEnd:d}=function(t,e){const{x:o,y:n,width:i,height:r}=t,s=function(t,e){const{width:o,height:n,options:i}=t,r=i.callout.margin+i.borderWidth/2;if("right"===e)return o+r;if("bottom"===e)return n+r;return-r}(t,e);let a,d;"left"===e||"right"===e?(a={x:o+s,y:n},d={x:a.x,y:a.y+r}):(a={x:o,y:n+s},d={x:a.x+i,y:a.y});return{separatorStart:a,separatorEnd:d}}(e,i),{sideStart:l,sideEnd:h}=function(t,e,o){const{y:n,width:i,height:r,options:s}=t,a=s.callout.start,d=function(t,e){const o=e.side;if("left"===t||"top"===t)return-o;return o}(e,s.callout);let l,h;"left"===e||"right"===e?(l={x:o.x,y:n+m(r,a)},h={x:l.x+d,y:l.y}):(l={x:o.x+m(i,a),y:o.y},h={x:l.x,y:l.y+d});return{sideStart:l,sideEnd:h}}(e,i,a);(s.margin>0||0===r.borderWidth)&&(t.moveTo(a.x,a.y),t.lineTo(d.x,d.y));t.moveTo(l.x,l.y),t.lineTo(h.x,h.y),t.lineTo(o,n),t.stroke(),t.restore()}(t,this),this.boxVisible&&O(t,this,r),j(t,{x:e,y:o,width:n,height:i},r)}resolveElementProperties(t,o){const n=M(o)?T(t,o):A(R(t,o)),i=e.toPadding(o.padding),r=k(t.ctx,o),s=function(t,e,o,n){const i=e.width+n.width+o.borderWidth,r=e.height+n.height+o.borderWidth,s=v(o.position);return{x:et(t.x,i,o.xAdjust,s.x),y:et(t.y,r,o.yAdjust,s.y),width:i,height:r}}(n,r,o,i),a=e.color(o.backgroundColor),d={boxVisible:o.borderWidth>0||a&&a.valid&&a.rgb.a>0,pointX:n.x,pointY:n.y,...s,labelX:s.x+i.left+o.borderWidth/2,labelY:s.y+i.top+o.borderWidth/2,labelWidth:r.width,labelHeight:r.height};return d.calloutPosition=o.callout.enabled&&function(t,e){const o=e.position;if("left"===o||"right"===o||"top"===o||"bottom"===o)return o;return function(t,e){const{x:o,y:n,width:i,height:r,pointX:s,pointY:a}=t,{margin:d,side:l}=e,h=d+l;if(s<o-h)return"left";if(s>o+i+h)return"right";if(a<n-h)return"top";if(a>n+r+h)return"bottom"}(t,e)}(d,o.callout),d}}function et(t,e,o=0,n){return t-w(e,n)+o}tt.id="labelAnnotation",tt.defaults={adjustScaleRange:!0,backgroundColor:"transparent",backgroundShadowColor:"transparent",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderRadius:0,borderShadowColor:"transparent",borderWidth:0,callout:{borderCapStyle:"butt",borderColor:void 0,borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:1,enabled:!1,margin:5,position:"auto",side:5,start:"50%"},color:"black",content:null,display:!0,font:{family:void 0,lineHeight:void 0,size:void 0,style:void 0,weight:void 0},height:void 0,padding:6,position:"center",shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,textAlign:"center",width:void 0,xAdjust:0,xMax:void 0,xMin:void 0,xScaleID:"x",xValue:void 0,yAdjust:0,yMax:void 0,yMin:void 0,yScaleID:"y",yValue:void 0},tt.defaultRoutes={borderColor:"color"};class ot extends t.Element{inRange(t,e,o){const{width:n}=this.getProps(["width"],o);return function(t,e,o,n){if(!t||!e||o<=0)return!1;const i=n/2||0;return Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)<=Math.pow(o+i,2)}({x:t,y:e},this.getCenterPoint(o),n/2,this.options.borderWidth)}getCenterPoint(t){return x(this,t)}draw(t){const o=this.options,n=o.borderWidth;if(o.radius<.1)return;t.save(),t.fillStyle=o.backgroundColor,P(t,o);const i=D(t,o);o.borderWidth=0,e.drawPoint(t,o,this.x,this.y),i&&!C(o.pointStyle)&&(t.shadowColor=o.borderShadowColor,t.stroke()),t.restore(),o.borderWidth=n}resolveElementProperties(t,e){return E(t,e)}}ot.id="pointAnnotation",ot.defaults={adjustScaleRange:!0,backgroundShadowColor:"transparent",borderDash:[],borderDashOffset:0,borderShadowColor:"transparent",borderWidth:1,display:!0,pointStyle:"circle",radius:10,rotation:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,xAdjust:0,xMax:void 0,xMin:void 0,xScaleID:"x",xValue:void 0,yAdjust:0,yMax:void 0,yMin:void 0,yScaleID:"y",yValue:void 0},ot.defaultRoutes={borderColor:"color",backgroundColor:"color"};class nt extends t.Element{inRange(t,e,o){return this.options.radius>=.1&&this.elements.length>1&&function(t,e,o,n){let i=!1,r=t[t.length-1].getProps(["bX","bY"],n);for(const s of t){const t=s.getProps(["bX","bY"],n);t.bY>o!=r.bY>o&&e<(r.bX-t.bX)*(o-t.bY)/(r.bY-t.bY)+t.bX&&(i=!i),r=t}return i}(this.elements,t,e,o)}getCenterPoint(t){return x(this,t)}draw(t){const{elements:e,options:o}=this;t.save(),t.beginPath(),t.fillStyle=o.backgroundColor,P(t,o);const n=D(t,o);let i=!0;for(const o of e)i?(t.moveTo(o.x,o.y),i=!1):t.lineTo(o.x,o.y);t.closePath(),t.fill(),n&&(t.shadowColor=o.borderShadowColor,t.stroke()),t.restore()}resolveElementProperties(t,o){const{x:n,y:i,width:r,height:s}=E(t,o),{sides:a,radius:d,rotation:l,borderWidth:h}=o,c=h/2,u=[],f=2*e.PI/a;let b=l*e.RAD_PER_DEG;for(let t=0;t<a;t++,b+=f){const t=Math.sin(b),e=Math.cos(b);u.push({type:"point",optionScope:"point",properties:{x:n+t*d,y:i-e*d,bX:n+t*(d+c),bY:i-e*(d+c)}})}return{x:n,y:i,width:r,height:s,elements:u,initProperties:{x:n,y:i}}}}nt.id="polygonAnnotation",nt.defaults={adjustScaleRange:!0,backgroundShadowColor:"transparent",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderShadowColor:"transparent",borderWidth:1,display:!0,point:{radius:0},radius:10,rotation:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,sides:3,xAdjust:0,xMax:void 0,xMin:void 0,xScaleID:"x",xValue:void 0,yAdjust:0,yMax:void 0,yMin:void 0,yScaleID:"y",yValue:void 0},nt.defaultRoutes={borderColor:"color",backgroundColor:"color"};const it={box:Y,ellipse:Z,label:tt,line:J,point:ot,polygon:nt};Object.keys(it).forEach((e=>{t.defaults.describe(`elements.${it[e].id}`,{_fallback:"plugins.annotation"})}));const rt=new Map;var st={id:"annotation",version:"1.3.0",afterRegister(){t.Chart.register(it),function(t,e,o,n=!0){const i=o.split(".");let r=0;for(const s of e.split(".")){const a=i[r++];if(parseInt(s,10)<parseInt(a,10))break;if(y(a,s)){if(n)throw new Error(`${t} v${o} is not supported. v${e} or newer is required.`);return!1}}return!0}("chart.js","3.7",t.Chart.version,!1)||(console.warn("chartjs-plugin-annotation has known issues with chart.js versions prior to 3.7, please consider upgrading."),t.Chart.defaults.set("elements.lineAnnotation",{callout:{},font:{},padding:6}))},afterUnregister(){t.Chart.unregister(it)},beforeInit(t){rt.set(t,{annotations:[],elements:[],visibleElements:[],listeners:{},listened:!1,moveListened:!1})},beforeUpdate(t,o,n){const i=rt.get(t).annotations=[];let r=n.annotations;e.isObject(r)?Object.keys(r).forEach((t=>{const o=r[t];e.isObject(o)&&(o.id=t,i.push(o))})):e.isArray(r)&&i.push(...r),function(t,e){for(const o of t)h(o,e)}(i,t.scales)},afterDataLimits(t,e){const o=rt.get(t);d(0,e.scale,o.annotations.filter((t=>t.display&&t.adjustScaleRange)))},afterUpdate(r,s,a){const d=rt.get(r);!function(t,r,s){r.listened=!1,r.moveListened=!1,i.forEach((t=>{"function"==typeof s[t]?(r.listened=!0,r.listeners[t]=s[t]):e.defined(r.listeners[t])&&delete r.listeners[t]})),n.forEach((t=>{"function"==typeof s[t]&&(r.moveListened=!0)})),r.listened&&r.moveListened||r.annotations.forEach((t=>{r.listened||o.forEach((e=>{"function"==typeof t[e]&&(r.listened=!0)})),r.moveListened||n.forEach((e=>{"function"==typeof t[e]&&(r.listened=!0,r.moveListened=!0)}))}))}(0,d,a),function(o,n,i,r){const s=function(e,o,n){if("reset"===n||"none"===n||"resize"===n)return at;return new t.Animations(e,o)}(o,i.animations,r),a=n.annotations,d=function(t,e){const o=e.length,n=t.length;if(n<o){const e=o-n;t.splice(n,0,...new Array(e))}else n>o&&t.splice(o,n-o);return t}(n.elements,a);for(let t=0;t<a.length;t++){const n=a[t],i=ht(d,t,n.type),r=n.setContext(ft(o,i,n)),l=i.resolveElementProperties(o,r);l.skip=isNaN(l.x)||isNaN(l.y),"elements"in l&&(lt(i,l,r,s),delete l.elements),e.defined(i.x)||Object.assign(i,l),l.options=ct(r),s.update(i,l)}}(r,d,a,s.mode),d.visibleElements=d.elements.filter((t=>!t.skip&&t.options.display))},beforeDatasetsDraw(t,e,o){bt(t,"beforeDatasetsDraw",o.clip)},afterDatasetsDraw(t,e,o){bt(t,"afterDatasetsDraw",o.clip)},beforeDraw(t,e,o){bt(t,"beforeDraw",o.clip)},afterDraw(t,e,o){bt(t,"afterDraw",o.clip)},beforeEvent(t,e,o){r(rt.get(t),e.event,o)},destroy(t){rt.delete(t)},_getState:t=>rt.get(t),defaults:{animations:{numbers:{properties:["x","y","x2","y2","width","height","pointX","pointY","labelX","labelY","labelWidth","labelHeight","radius"],type:"number"}},clip:!0,dblClickSpeed:350,drawTime:"afterDatasetsDraw",label:{drawTime:null}},descriptors:{_indexable:!1,_scriptable:t=>!i.includes(t),annotations:{_allKeys:!1,_fallback:(t,e)=>`elements.${it[dt(e.type)].id}`}},additionalOptionScopes:[""]};const at={update:Object.assign};function dt(t="line"){return it[t]?t:(console.warn(`Unknown annotation type: '${t}', defaulting to 'line'`),"line")}function lt(t,{elements:e,initProperties:o},n,i){const r=t.elements||(t.elements=[]);r.length=e.length;for(let t=0;t<e.length;t++){const s=e[t],a=s.properties,d=ht(r,t,s.type,o),l=n[s.optionScope].override(s);a.options=ct(l),i.update(d,a)}}function ht(t,o,n,i){const r=it[dt(n)];let s=t[o];return s&&s instanceof r||(s=t[o]=new r,e.isObject(i)&&Object.assign(s,i)),s}function ct(t){const e=it[dt(t.type)],o={};o.id=t.id,o.type=t.type,o.drawTime=t.drawTime,Object.assign(o,ut(t,e.defaults),ut(t,e.defaultRoutes));for(const e of i)o[e]=t[e];return o}function ut(t,o){const n={};for(const i of Object.keys(o)){const r=o[i],s=t[i];n[i]=e.isObject(r)?ut(s,r):s}return n}function ft(t,e,o){return e.$context||(e.$context=Object.assign(Object.create(t.getContext()),{element:e,id:o.id,type:"annotation"}))}function bt(t,o,n){const{ctx:i,chartArea:r}=t,{visibleElements:s}=rt.get(t);n&&e.clipArea(i,r),xt(i,s,o),function(t,o,n){for(const i of o)e.isArray(i.elements)&&xt(t,i.elements,n)}(i,s,o),n&&e.unclipArea(i),s.forEach((t=>{if(!("drawLabel"in t))return;const e=t.options.label;e&&e.enabled&&e.content&&(e.drawTime||t.options.drawTime)===o&&t.drawLabel(i,r)}))}function xt(t,e,o){for(const n of e)n.options.drawTime===o&&n.draw(t)}return t.Chart.register(st),st}));