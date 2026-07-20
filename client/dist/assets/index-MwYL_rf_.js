(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const lc="166",Uu=0,Hc=1,Nu=2,Eh=1,hc=2,Hn=3,ai=0,Xe=1,rn=2,ri=0,ds=1,Vc=2,Gc=3,Wc=4,Ou=5,Ei=100,Fu=101,zu=102,Bu=103,ku=104,Hu=200,Vu=201,Gu=202,Wu=203,Ma=204,Sa=205,Xu=206,qu=207,Yu=208,$u=209,Ku=210,Ju=211,Zu=212,ju=213,Qu=214,td=0,ed=1,nd=2,jr=3,id=4,sd=5,rd=6,od=7,uc=0,ad=1,cd=2,oi=0,ld=1,hd=2,ud=3,dc=4,dd=5,fd=6,pd=7,wh=300,ms=301,gs=302,ba=303,Ea=304,ho=306,Ys=1e3,Ti=1001,wa=1002,Ze=1003,md=1004,ir=1005,_n=1006,Eo=1007,Ai=1008,Yn=1009,Th=1010,Ah=1011,$s=1012,fc=1013,Li=1014,Pn=1015,Qs=1016,pc=1017,mc=1018,_s=1020,Rh=35902,Ch=1021,Ph=1022,Mn=1023,Lh=1024,Dh=1025,fs=1026,vs=1027,gc=1028,_c=1029,Ih=1030,vc=1031,xc=1033,kr=33776,Hr=33777,Vr=33778,Gr=33779,Ta=35840,Aa=35841,Ra=35842,Ca=35843,Pa=36196,La=37492,Da=37496,Ia=37808,Ua=37809,Na=37810,Oa=37811,Fa=37812,za=37813,Ba=37814,ka=37815,Ha=37816,Va=37817,Ga=37818,Wa=37819,Xa=37820,qa=37821,Wr=36492,Ya=36494,$a=36495,Uh=36283,Ka=36284,Ja=36285,Za=36286,gd=3200,_d=3201,yc=0,vd=1,si="",$e="srgb",ci="srgb-linear",Mc="display-p3",uo="display-p3-linear",Qr="linear",de="srgb",to="rec709",eo="p3",Bi=7680,Xc=519,xd=512,yd=513,Md=514,Nh=515,Sd=516,bd=517,Ed=518,wd=519,ja=35044,qc="300 es",Wn=2e3,no=2001;class Ms{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Yc=1234567;const Hs=Math.PI/180,Ks=180/Math.PI;function Ln(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]).toLowerCase()}function Ie(i,t,e){return Math.max(t,Math.min(e,i))}function Sc(i,t){return(i%t+t)%t}function Td(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Ad(i,t,e){return i!==t?(e-i)/(t-i):0}function Vs(i,t,e){return(1-e)*i+e*t}function Rd(i,t,e,n){return Vs(i,t,1-Math.exp(-e*n))}function Cd(i,t=1){return t-Math.abs(Sc(i,t*2)-t)}function Pd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Ld(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Dd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Id(i,t){return i+Math.random()*(t-i)}function Ud(i){return i*(.5-Math.random())}function Nd(i){i!==void 0&&(Yc=i);let t=Yc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Od(i){return i*Hs}function Fd(i){return i*Ks}function zd(i){return(i&i-1)===0&&i!==0}function Bd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function kd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Hd(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function vn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ae(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const $c={DEG2RAD:Hs,RAD2DEG:Ks,generateUUID:Ln,clamp:Ie,euclideanModulo:Sc,mapLinear:Td,inverseLerp:Ad,lerp:Vs,damp:Rd,pingpong:Cd,smoothstep:Pd,smootherstep:Ld,randInt:Dd,randFloat:Id,randFloatSpread:Ud,seededRandom:Nd,degToRad:Od,radToDeg:Fd,isPowerOfTwo:zd,ceilPowerOfTwo:Bd,floorPowerOfTwo:kd,setQuaternionFromProperEuler:Hd,normalize:ae,denormalize:vn};class dt{constructor(t=0,e=0){dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xt{constructor(t,e,n,s,r,o,a,c,l){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],y=s[1],v=s[4],S=s[7],F=s[2],w=s[5],A=s[8];return r[0]=o*_+a*y+c*F,r[3]=o*m+a*v+c*w,r[6]=o*p+a*S+c*A,r[1]=l*_+h*y+u*F,r[4]=l*m+h*v+u*w,r[7]=l*p+h*S+u*A,r[2]=d*_+f*y+g*F,r[5]=d*m+f*v+g*w,r[8]=d*p+f*S+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=d*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(wo.makeScale(t,e)),this}rotate(t){return this.premultiply(wo.makeRotation(-t)),this}translate(t,e){return this.premultiply(wo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const wo=new Xt;function Oh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function io(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Vd(){const i=io("canvas");return i.style.display="block",i}const Kc={};function bc(i){i in Kc||(Kc[i]=!0,console.warn(i))}function Gd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Jc=new Xt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Zc=new Xt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),sr={[ci]:{transfer:Qr,primaries:to,toReference:i=>i,fromReference:i=>i},[$e]:{transfer:de,primaries:to,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[uo]:{transfer:Qr,primaries:eo,toReference:i=>i.applyMatrix3(Zc),fromReference:i=>i.applyMatrix3(Jc)},[Mc]:{transfer:de,primaries:eo,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Zc),fromReference:i=>i.applyMatrix3(Jc).convertLinearToSRGB()}},Wd=new Set([ci,uo]),ce={enabled:!0,_workingColorSpace:ci,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Wd.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=sr[t].toReference,s=sr[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return sr[i].primaries},getTransfer:function(i){return i===si?Qr:sr[i].transfer}};function ps(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function To(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ki;class Xd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ki===void 0&&(ki=io("canvas")),ki.width=t.width,ki.height=t.height;const n=ki.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ki}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=io("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ps(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ps(e[n]/255)*255):e[n]=ps(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let qd=0;class Fh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=Ln(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ao(s[o].image)):r.push(Ao(s[o]))}else r=Ao(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ao(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Yd=0;class He extends Ms{constructor(t=He.DEFAULT_IMAGE,e=He.DEFAULT_MAPPING,n=Ti,s=Ti,r=_n,o=Ai,a=Mn,c=Yn,l=He.DEFAULT_ANISOTROPY,h=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=Ln(),this.name="",this.source=new Fh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new dt(0,0),this.repeat=new dt(1,1),this.center=new dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ys:t.x=t.x-Math.floor(t.x);break;case Ti:t.x=t.x<0?0:1;break;case wa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ys:t.y=t.y-Math.floor(t.y);break;case Ti:t.y=t.y<0?0:1;break;case wa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=wh;He.DEFAULT_ANISOTROPY=1;class fe{constructor(t=0,e=0,n=0,s=1){fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,S=(f+1)/2,F=(p+1)/2,w=(h+d)/4,A=(u+_)/4,I=(g+m)/4;return v>S&&v>F?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=w/n,r=A/n):S>F?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=w/s,r=I/s):F<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(F),n=A/r,s=I/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $d extends Ms{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new He(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Fh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Di extends $d{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class zh extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Kd extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ui{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-a;const p=c*d+l*f+h*g+u*_,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const F=Math.sqrt(v),w=Math.atan2(F,p*y);m=Math.sin(m*w)/F,a=Math.sin(a*w)/F}const S=a*y;if(c=c*m+d*S,l=l*m+f*S,h=h*m+g*S,u=u*m+_*S,m===1-a){const F=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=F,l*=F,h*=F,u*=F}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-a*f,t[e+2]=l*g+h*f+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ie(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(jc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(jc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ro.copy(this).projectOnVector(t),this.sub(Ro)}reflect(t){return this.sub(Ro.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ro=new C,jc=new Ui;class Ni{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(pn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(pn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,pn):pn.fromBufferAttribute(r,o),pn.applyMatrix4(t.matrixWorld),this.expandByPoint(pn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),rr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rr.copy(n.boundingBox)),rr.applyMatrix4(t.matrixWorld),this.union(rr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,pn),pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Rs),or.subVectors(this.max,Rs),Hi.subVectors(t.a,Rs),Vi.subVectors(t.b,Rs),Gi.subVectors(t.c,Rs),Jn.subVectors(Vi,Hi),Zn.subVectors(Gi,Vi),ui.subVectors(Hi,Gi);let e=[0,-Jn.z,Jn.y,0,-Zn.z,Zn.y,0,-ui.z,ui.y,Jn.z,0,-Jn.x,Zn.z,0,-Zn.x,ui.z,0,-ui.x,-Jn.y,Jn.x,0,-Zn.y,Zn.x,0,-ui.y,ui.x,0];return!Co(e,Hi,Vi,Gi,or)||(e=[1,0,0,0,1,0,0,0,1],!Co(e,Hi,Vi,Gi,or))?!1:(ar.crossVectors(Jn,Zn),e=[ar.x,ar.y,ar.z],Co(e,Hi,Vi,Gi,or))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,pn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(pn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(On),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const On=[new C,new C,new C,new C,new C,new C,new C,new C],pn=new C,rr=new Ni,Hi=new C,Vi=new C,Gi=new C,Jn=new C,Zn=new C,ui=new C,Rs=new C,or=new C,ar=new C,di=new C;function Co(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){di.fromArray(i,r);const a=s.x*Math.abs(di.x)+s.y*Math.abs(di.y)+s.z*Math.abs(di.z),c=t.dot(di),l=e.dot(di),h=n.dot(di);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Jd=new Ni,Cs=new C,Po=new C;class Ss{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Jd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Cs.subVectors(t,this.center);const e=Cs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Cs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Po.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Cs.copy(t.center).add(Po)),this.expandByPoint(Cs.copy(t.center).sub(Po))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Fn=new C,Lo=new C,cr=new C,jn=new C,Do=new C,lr=new C,Io=new C;class Bh{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Fn.copy(this.origin).addScaledVector(this.direction,e),Fn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Lo.copy(t).add(e).multiplyScalar(.5),cr.copy(e).sub(t).normalize(),jn.copy(this.origin).sub(Lo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(cr),a=jn.dot(this.direction),c=-jn.dot(cr),l=jn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Lo).addScaledVector(cr,d),f}intersectSphere(t,e){Fn.subVectors(t.center,this.origin);const n=Fn.dot(this.direction),s=Fn.dot(Fn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Fn)!==null}intersectTriangle(t,e,n,s,r){Do.subVectors(e,t),lr.subVectors(n,t),Io.crossVectors(Do,lr);let o=this.direction.dot(Io),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;jn.subVectors(this.origin,t);const c=a*this.direction.dot(lr.crossVectors(jn,lr));if(c<0)return null;const l=a*this.direction.dot(Do.cross(jn));if(l<0||c+l>o)return null;const h=-a*jn.dot(Io);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class le{constructor(t,e,n,s,r,o,a,c,l,h,u,d,f,g,_,m){le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,_,m)}set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new le().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Wi.setFromMatrixColumn(t,0).length(),r=1/Wi.setFromMatrixColumn(t,1).length(),o=1/Wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d+_*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=_+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d-_*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Zd,t,jd)}lookAt(t,e,n){const s=this.elements;return nn.subVectors(t,e),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),Qn.crossVectors(n,nn),Qn.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),Qn.crossVectors(n,nn)),Qn.normalize(),hr.crossVectors(nn,Qn),s[0]=Qn.x,s[4]=hr.x,s[8]=nn.x,s[1]=Qn.y,s[5]=hr.y,s[9]=nn.y,s[2]=Qn.z,s[6]=hr.z,s[10]=nn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],y=n[3],v=n[7],S=n[11],F=n[15],w=s[0],A=s[4],I=s[8],b=s[12],x=s[1],D=s[5],U=s[9],N=s[13],X=s[2],K=s[6],q=s[10],Q=s[14],Y=s[3],V=s[7],Z=s[11],rt=s[15];return r[0]=o*w+a*x+c*X+l*Y,r[4]=o*A+a*D+c*K+l*V,r[8]=o*I+a*U+c*q+l*Z,r[12]=o*b+a*N+c*Q+l*rt,r[1]=h*w+u*x+d*X+f*Y,r[5]=h*A+u*D+d*K+f*V,r[9]=h*I+u*U+d*q+f*Z,r[13]=h*b+u*N+d*Q+f*rt,r[2]=g*w+_*x+m*X+p*Y,r[6]=g*A+_*D+m*K+p*V,r[10]=g*I+_*U+m*q+p*Z,r[14]=g*b+_*N+m*Q+p*rt,r[3]=y*w+v*x+S*X+F*Y,r[7]=y*A+v*D+S*K+F*V,r[11]=y*I+v*U+S*q+F*Z,r[15]=y*b+v*N+S*Q+F*rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+_*(+e*c*f-e*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+m*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*d+s*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],y=u*m*l-_*d*l+_*c*f-a*m*f-u*c*p+a*d*p,v=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,S=h*_*l-g*u*l+g*a*f-o*_*f-h*a*p+o*u*p,F=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,w=e*y+n*v+s*S+r*F;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return t[0]=y*A,t[1]=(_*d*r-u*m*r-_*s*f+n*m*f+u*s*p-n*d*p)*A,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*A,t[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*A,t[4]=v*A,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*A,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*A,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*f+e*c*f)*A,t[8]=S*A,t[9]=(g*u*r-h*_*r-g*n*f+e*_*f+h*n*p-e*u*p)*A,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*A,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*A,t[12]=F*A,t[13]=(h*_*s-g*u*s+g*n*d-e*_*d-h*n*m+e*u*m)*A,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*d+e*a*d)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,_=o*h,m=o*u,p=a*u,y=c*l,v=c*h,S=c*u,F=n.x,w=n.y,A=n.z;return s[0]=(1-(_+p))*F,s[1]=(f+S)*F,s[2]=(g-v)*F,s[3]=0,s[4]=(f-S)*w,s[5]=(1-(d+p))*w,s[6]=(m+y)*w,s[7]=0,s[8]=(g+v)*A,s[9]=(m-y)*A,s[10]=(1-(d+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Wi.set(s[0],s[1],s[2]).length();const o=Wi.set(s[4],s[5],s[6]).length(),a=Wi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],mn.copy(this);const l=1/r,h=1/o,u=1/a;return mn.elements[0]*=l,mn.elements[1]*=l,mn.elements[2]*=l,mn.elements[4]*=h,mn.elements[5]*=h,mn.elements[6]*=h,mn.elements[8]*=u,mn.elements[9]*=u,mn.elements[10]*=u,e.setFromRotationMatrix(mn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Wn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(a===Wn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===no)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Wn){const c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*l,f=(n+s)*h;let g,_;if(a===Wn)g=(o+r)*u,_=-2*u;else if(a===no)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Wi=new C,mn=new le,Zd=new C(0,0,0),jd=new C(1,1,1),Qn=new C,hr=new C,nn=new C,Qc=new le,tl=new Ui;class bn{constructor(t=0,e=0,n=0,s=bn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ie(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ie(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Qc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Qc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return tl.setFromEuler(this),this.setFromQuaternion(tl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bn.DEFAULT_ORDER="XYZ";class kh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Qd=0;const el=new C,Xi=new Ui,zn=new le,ur=new C,Ps=new C,tf=new C,ef=new Ui,nl=new C(1,0,0),il=new C(0,1,0),sl=new C(0,0,1),rl={type:"added"},nf={type:"removed"},qi={type:"childadded",child:null},Uo={type:"childremoved",child:null};class pe extends Ms{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=Ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pe.DEFAULT_UP.clone();const t=new C,e=new bn,n=new Ui,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new le},normalMatrix:{value:new Xt}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Xi.setFromAxisAngle(t,e),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(t,e){return Xi.setFromAxisAngle(t,e),this.quaternion.premultiply(Xi),this}rotateX(t){return this.rotateOnAxis(nl,t)}rotateY(t){return this.rotateOnAxis(il,t)}rotateZ(t){return this.rotateOnAxis(sl,t)}translateOnAxis(t,e){return el.copy(t).applyQuaternion(this.quaternion),this.position.add(el.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(nl,t)}translateY(t){return this.translateOnAxis(il,t)}translateZ(t){return this.translateOnAxis(sl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ur.copy(t):ur.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(Ps,ur,this.up):zn.lookAt(ur,Ps,this.up),this.quaternion.setFromRotationMatrix(zn),s&&(zn.extractRotation(s.matrixWorld),Xi.setFromRotationMatrix(zn),this.quaternion.premultiply(Xi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(rl),qi.child=t,this.dispatchEvent(qi),qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(nf),Uo.child=t,this.dispatchEvent(Uo),Uo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),zn.multiply(t.parent.matrixWorld)),t.applyMatrix4(zn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(rl),qi.child=t,this.dispatchEvent(qi),qi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,t,tf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,ef,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}pe.DEFAULT_UP=new C(0,1,0);pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const gn=new C,Bn=new C,No=new C,kn=new C,Yi=new C,$i=new C,ol=new C,Oo=new C,Fo=new C,zo=new C;class xn{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),gn.subVectors(t,e),s.cross(gn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){gn.subVectors(s,e),Bn.subVectors(n,e),No.subVectors(t,e);const o=gn.dot(gn),a=gn.dot(Bn),c=gn.dot(No),l=Bn.dot(Bn),h=Bn.dot(No),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,kn.x),c.addScaledVector(o,kn.y),c.addScaledVector(a,kn.z),c)}static isFrontFacing(t,e,n,s){return gn.subVectors(n,e),Bn.subVectors(t,e),gn.cross(Bn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return gn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),gn.cross(Bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return xn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return xn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Yi.subVectors(s,n),$i.subVectors(r,n),Oo.subVectors(t,n);const c=Yi.dot(Oo),l=$i.dot(Oo);if(c<=0&&l<=0)return e.copy(n);Fo.subVectors(t,s);const h=Yi.dot(Fo),u=$i.dot(Fo);if(h>=0&&u<=h)return e.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Yi,o);zo.subVectors(t,r);const f=Yi.dot(zo),g=$i.dot(zo);if(g>=0&&f<=g)return e.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector($i,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return ol.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(ol,a);const p=1/(m+_+d);return o=_*p,a=d*p,e.copy(n).addScaledVector(Yi,o).addScaledVector($i,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},dr={h:0,s:0,l:0};function Bo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class At{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ce.workingColorSpace){if(t=Sc(t,1),e=Ie(e,0,1),n=Ie(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Bo(o,r,t+1/3),this.g=Bo(o,r,t),this.b=Bo(o,r,t-1/3)}return ce.toWorkingColorSpace(this,s),this}setStyle(t,e=$e){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){const n=Hh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ps(t.r),this.g=ps(t.g),this.b=ps(t.b),this}copyLinearToSRGB(t){return this.r=To(t.r),this.g=To(t.g),this.b=To(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return ce.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Ie(Fe.r*255,0,255))*65536+Math.round(Ie(Fe.g*255,0,255))*256+Math.round(Ie(Fe.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.fromWorkingColorSpace(Fe.copy(this),e);const n=Fe.r,s=Fe.g,r=Fe.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=$e){ce.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,n=Fe.g,s=Fe.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ti),this.setHSL(ti.h+t,ti.s+e,ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ti),t.getHSL(dr);const n=Vs(ti.h,dr.h,e),s=Vs(ti.s,dr.s,e),r=Vs(ti.l,dr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new At;At.NAMES=Hh;let sf=0;class li extends Ms{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=Ln(),this.name="",this.type="Material",this.blending=ds,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ma,this.blendDst=Sa,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new At(0,0,0),this.blendAlpha=0,this.depthFunc=jr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ds&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ma&&(n.blendSrc=this.blendSrc),this.blendDst!==Sa&&(n.blendDst=this.blendDst),this.blendEquation!==Ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==jr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}}class Ce extends li{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new At(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new C,fr=new dt;class an{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ja,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return bc("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)fr.fromBufferAttribute(this,e),fr.applyMatrix3(t),this.setXY(e,fr.x,fr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array),r=ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ja&&(t.usage=this.usage),t}}class Vh extends an{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Gh extends an{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Qt extends an{constructor(t,e,n){super(new Float32Array(t),e,n)}}let rf=0;const ln=new le,ko=new pe,Ki=new C,sn=new Ni,Ls=new Ni,De=new C;class Ue extends Ms{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=Ln(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Oh(t)?Gh:Vh)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ln.makeRotationFromQuaternion(t),this.applyMatrix4(ln),this}rotateX(t){return ln.makeRotationX(t),this.applyMatrix4(ln),this}rotateY(t){return ln.makeRotationY(t),this.applyMatrix4(ln),this}rotateZ(t){return ln.makeRotationZ(t),this.applyMatrix4(ln),this}translate(t,e,n){return ln.makeTranslation(t,e,n),this.applyMatrix4(ln),this}scale(t,e,n){return ln.makeScale(t,e,n),this.applyMatrix4(ln),this}lookAt(t){return ko.lookAt(t),ko.updateMatrix(),this.applyMatrix4(ko.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ki).negate(),this.translate(Ki.x,Ki.y,Ki.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Qt(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ni);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ss);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(sn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ls.setFromBufferAttribute(a),this.morphTargetsRelative?(De.addVectors(sn.min,Ls.min),sn.expandByPoint(De),De.addVectors(sn.max,Ls.max),sn.expandByPoint(De)):(sn.expandByPoint(Ls.min),sn.expandByPoint(Ls.max))}sn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)De.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(De));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)De.fromBufferAttribute(a,l),c&&(Ki.fromBufferAttribute(t,l),De.add(Ki)),s=Math.max(s,n.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new C,c[I]=new C;const l=new C,h=new C,u=new C,d=new dt,f=new dt,g=new dt,_=new C,m=new C;function p(I,b,x){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,x),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(D),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),a[I].add(_),a[b].add(_),a[x].add(_),c[I].add(m),c[b].add(m),c[x].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let I=0,b=y.length;I<b;++I){const x=y[I],D=x.start,U=x.count;for(let N=D,X=D+U;N<X;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const v=new C,S=new C,F=new C,w=new C;function A(I){F.fromBufferAttribute(s,I),w.copy(F);const b=a[I];v.copy(b),v.sub(F.multiplyScalar(F.dot(b))).normalize(),S.crossVectors(w,b);const D=S.dot(c[I])<0?-1:1;o.setXYZW(I,v.x,v.y,v.z,D)}for(let I=0,b=y.length;I<b;++I){const x=y[I],D=x.start,U=x.count;for(let N=D,X=D+U;N<X;N+=3)A(t.getX(N+0)),A(t.getX(N+1)),A(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new an(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new C,r=new C,o=new C,a=new C,c=new C,l=new C,h=new C,u=new C;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new an(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ue,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const al=new le,fi=new Bh,pr=new Ss,cl=new C,Ji=new C,Zi=new C,ji=new C,Ho=new C,mr=new C,gr=new dt,_r=new dt,vr=new dt,ll=new C,hl=new C,ul=new C,xr=new C,yr=new C;class yt extends pe{constructor(t=new Ue,e=new Ce){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){mr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Ho.fromBufferAttribute(u,t),o?mr.addScaledVector(Ho,h):mr.addScaledVector(Ho.sub(e),h))}e.add(mr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(r),fi.copy(t.ray).recast(t.near),!(pr.containsPoint(fi.origin)===!1&&(fi.intersectSphere(pr,cl)===null||fi.origin.distanceToSquared(cl)>(t.far-t.near)**2))&&(al.copy(r).invert(),fi.copy(t.ray).applyMatrix4(al),!(n.boundingBox!==null&&fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,fi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,F=v;S<F;S+=3){const w=a.getX(S),A=a.getX(S+1),I=a.getX(S+2);s=Mr(this,p,t,n,l,h,u,w,A,I),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const y=a.getX(m),v=a.getX(m+1),S=a.getX(m+2);s=Mr(this,o,t,n,l,h,u,y,v,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,F=v;S<F;S+=3){const w=S,A=S+1,I=S+2;s=Mr(this,p,t,n,l,h,u,w,A,I),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const y=m,v=m+1,S=m+2;s=Mr(this,o,t,n,l,h,u,y,v,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function of(i,t,e,n,s,r,o,a){let c;if(t.side===Xe?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===ai,a),c===null)return null;yr.copy(a),yr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(yr);return l<e.near||l>e.far?null:{distance:l,point:yr.clone(),object:i}}function Mr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Ji),i.getVertexPosition(c,Zi),i.getVertexPosition(l,ji);const h=of(i,t,e,n,Ji,Zi,ji,xr);if(h){s&&(gr.fromBufferAttribute(s,a),_r.fromBufferAttribute(s,c),vr.fromBufferAttribute(s,l),h.uv=xn.getInterpolation(xr,Ji,Zi,ji,gr,_r,vr,new dt)),r&&(gr.fromBufferAttribute(r,a),_r.fromBufferAttribute(r,c),vr.fromBufferAttribute(r,l),h.uv1=xn.getInterpolation(xr,Ji,Zi,ji,gr,_r,vr,new dt)),o&&(ll.fromBufferAttribute(o,a),hl.fromBufferAttribute(o,c),ul.fromBufferAttribute(o,l),h.normal=xn.getInterpolation(xr,Ji,Zi,ji,ll,hl,ul,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new C,materialIndex:0};xn.getNormal(Ji,Zi,ji,u.normal),h.face=u}return h}class Re extends Ue{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Qt(l,3)),this.setAttribute("normal",new Qt(h,3)),this.setAttribute("uv",new Qt(u,2));function g(_,m,p,y,v,S,F,w,A,I,b){const x=S/A,D=F/I,U=S/2,N=F/2,X=w/2,K=A+1,q=I+1;let Q=0,Y=0;const V=new C;for(let Z=0;Z<q;Z++){const rt=Z*D-N;for(let wt=0;wt<K;wt++){const Nt=wt*x-U;V[_]=Nt*y,V[m]=rt*v,V[p]=X,l.push(V.x,V.y,V.z),V[_]=0,V[m]=0,V[p]=w>0?1:-1,h.push(V.x,V.y,V.z),u.push(wt/A),u.push(1-Z/I),Q+=1}}for(let Z=0;Z<I;Z++)for(let rt=0;rt<A;rt++){const wt=d+rt+K*Z,Nt=d+rt+K*(Z+1),$=d+(rt+1)+K*(Z+1),at=d+(rt+1)+K*Z;c.push(wt,Nt,at),c.push(Nt,$,at),Y+=6}a.addGroup(f,Y,b),f+=Y,d+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Re(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function xs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ge(i){const t={};for(let e=0;e<i.length;e++){const n=xs(i[e]);for(const s in n)t[s]=n[s]}return t}function af(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Wh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}const cf={clone:xs,merge:Ge};var lf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class In extends li{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lf,this.fragmentShader=hf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=xs(t.uniforms),this.uniformsGroups=af(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Xh extends pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=Wn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ei=new C,dl=new dt,fl=new dt;class Je extends Xh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ks*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Hs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ks*2*Math.atan(Math.tan(Hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ei.x,ei.y).multiplyScalar(-t/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ei.x,ei.y).multiplyScalar(-t/ei.z)}getViewSize(t,e){return this.getViewBounds(t,dl,fl),e.subVectors(fl,dl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Hs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Qi=-90,ts=1;class uf extends pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Je(Qi,ts,t,e);s.layers=this.layers,this.add(s);const r=new Je(Qi,ts,t,e);r.layers=this.layers,this.add(r);const o=new Je(Qi,ts,t,e);o.layers=this.layers,this.add(o);const a=new Je(Qi,ts,t,e);a.layers=this.layers,this.add(a);const c=new Je(Qi,ts,t,e);c.layers=this.layers,this.add(c);const l=new Je(Qi,ts,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===no)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class qh extends He{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:ms,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class df extends Di{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new qh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:_n}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Re(5,5,5),r=new In({name:"CubemapFromEquirect",uniforms:xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xe,blending:ri});r.uniforms.tEquirect.value=e;const o=new yt(s,r),a=e.minFilter;return e.minFilter===Ai&&(e.minFilter=_n),new uf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Vo=new C,ff=new C,pf=new Xt;class Si{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Vo.subVectors(n,e).cross(ff.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Vo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||pf.getNormalMatrix(t),s=this.coplanarPoint(Vo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new Ss,Sr=new C;class Ec{constructor(t=new Si,e=new Si,n=new Si,s=new Si,r=new Si,o=new Si){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Wn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],y=s[13],v=s[14],S=s[15];if(n[0].setComponents(c-r,d-l,m-f,S-p).normalize(),n[1].setComponents(c+r,d+l,m+f,S+p).normalize(),n[2].setComponents(c+o,d+h,m+g,S+y).normalize(),n[3].setComponents(c-o,d-h,m-g,S-y).normalize(),n[4].setComponents(c-a,d-u,m-_,S-v).normalize(),e===Wn)n[5].setComponents(c+a,d+u,m+_,S+v).normalize();else if(e===no)n[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(t){return pi.center.set(0,0,0),pi.radius=.7071067811865476,pi.applyMatrix4(t.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Sr.x=s.normal.x>0?t.max.x:t.min.x,Sr.y=s.normal.y>0?t.max.y:t.min.y,Sr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Sr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function mf(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c._updateRange,d=c.updateRanges;if(i.bindBuffer(l,a),u.count===-1&&d.length===0&&i.bufferSubData(l,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){const _=d[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}u.count!==-1&&(i.bufferSubData(l,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class An extends Ue{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const y=p*d-o;for(let v=0;v<l;v++){const S=v*u-r;g.push(S,-y,0),_.push(0,0,1),m.push(v/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<a;y++){const v=y+l*p,S=y+l*(p+1),F=y+1+l*(p+1),w=y+1+l*p;f.push(v,S,w),f.push(S,F,w)}this.setIndex(f),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new An(t.width,t.height,t.widthSegments,t.heightSegments)}}var gf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_f=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,bf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ef=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,wf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Af=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Cf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Uf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Nf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Of=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ff=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Bf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,kf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Hf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Vf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yf=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,$f=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Kf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Jf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Zf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Qf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ep=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,np=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ip=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,sp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,op=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ap=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,lp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,up=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,pp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,mp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_p=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ep=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,wp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ap=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Dp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ip=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Up=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Np=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Op=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Bp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Xp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$p=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,jp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Qp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,tm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,em=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,im=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,rm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,om=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,am=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,lm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,hm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ym=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Sm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,bm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Em=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Pm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Im=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Um=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Om=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Fm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,km=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Wm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ym=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$m=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:gf,alphahash_pars_fragment:_f,alphamap_fragment:vf,alphamap_pars_fragment:xf,alphatest_fragment:yf,alphatest_pars_fragment:Mf,aomap_fragment:Sf,aomap_pars_fragment:bf,batching_pars_vertex:Ef,batching_vertex:wf,begin_vertex:Tf,beginnormal_vertex:Af,bsdfs:Rf,iridescence_fragment:Cf,bumpmap_pars_fragment:Pf,clipping_planes_fragment:Lf,clipping_planes_pars_fragment:Df,clipping_planes_pars_vertex:If,clipping_planes_vertex:Uf,color_fragment:Nf,color_pars_fragment:Of,color_pars_vertex:Ff,color_vertex:zf,common:Bf,cube_uv_reflection_fragment:kf,defaultnormal_vertex:Hf,displacementmap_pars_vertex:Vf,displacementmap_vertex:Gf,emissivemap_fragment:Wf,emissivemap_pars_fragment:Xf,colorspace_fragment:qf,colorspace_pars_fragment:Yf,envmap_fragment:$f,envmap_common_pars_fragment:Kf,envmap_pars_fragment:Jf,envmap_pars_vertex:Zf,envmap_physical_pars_fragment:cp,envmap_vertex:jf,fog_vertex:Qf,fog_pars_vertex:tp,fog_fragment:ep,fog_pars_fragment:np,gradientmap_pars_fragment:ip,lightmap_pars_fragment:sp,lights_lambert_fragment:rp,lights_lambert_pars_fragment:op,lights_pars_begin:ap,lights_toon_fragment:lp,lights_toon_pars_fragment:hp,lights_phong_fragment:up,lights_phong_pars_fragment:dp,lights_physical_fragment:fp,lights_physical_pars_fragment:pp,lights_fragment_begin:mp,lights_fragment_maps:gp,lights_fragment_end:_p,logdepthbuf_fragment:vp,logdepthbuf_pars_fragment:xp,logdepthbuf_pars_vertex:yp,logdepthbuf_vertex:Mp,map_fragment:Sp,map_pars_fragment:bp,map_particle_fragment:Ep,map_particle_pars_fragment:wp,metalnessmap_fragment:Tp,metalnessmap_pars_fragment:Ap,morphinstance_vertex:Rp,morphcolor_vertex:Cp,morphnormal_vertex:Pp,morphtarget_pars_vertex:Lp,morphtarget_vertex:Dp,normal_fragment_begin:Ip,normal_fragment_maps:Up,normal_pars_fragment:Np,normal_pars_vertex:Op,normal_vertex:Fp,normalmap_pars_fragment:zp,clearcoat_normal_fragment_begin:Bp,clearcoat_normal_fragment_maps:kp,clearcoat_pars_fragment:Hp,iridescence_pars_fragment:Vp,opaque_fragment:Gp,packing:Wp,premultiplied_alpha_fragment:Xp,project_vertex:qp,dithering_fragment:Yp,dithering_pars_fragment:$p,roughnessmap_fragment:Kp,roughnessmap_pars_fragment:Jp,shadowmap_pars_fragment:Zp,shadowmap_pars_vertex:jp,shadowmap_vertex:Qp,shadowmask_pars_fragment:tm,skinbase_vertex:em,skinning_pars_vertex:nm,skinning_vertex:im,skinnormal_vertex:sm,specularmap_fragment:rm,specularmap_pars_fragment:om,tonemapping_fragment:am,tonemapping_pars_fragment:cm,transmission_fragment:lm,transmission_pars_fragment:hm,uv_pars_fragment:um,uv_pars_vertex:dm,uv_vertex:fm,worldpos_vertex:pm,background_vert:mm,background_frag:gm,backgroundCube_vert:_m,backgroundCube_frag:vm,cube_vert:xm,cube_frag:ym,depth_vert:Mm,depth_frag:Sm,distanceRGBA_vert:bm,distanceRGBA_frag:Em,equirect_vert:wm,equirect_frag:Tm,linedashed_vert:Am,linedashed_frag:Rm,meshbasic_vert:Cm,meshbasic_frag:Pm,meshlambert_vert:Lm,meshlambert_frag:Dm,meshmatcap_vert:Im,meshmatcap_frag:Um,meshnormal_vert:Nm,meshnormal_frag:Om,meshphong_vert:Fm,meshphong_frag:zm,meshphysical_vert:Bm,meshphysical_frag:km,meshtoon_vert:Hm,meshtoon_frag:Vm,points_vert:Gm,points_frag:Wm,shadow_vert:Xm,shadow_frag:qm,sprite_vert:Ym,sprite_frag:$m},mt={common:{diffuse:{value:new At(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new At(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new At(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new At(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},Tn={basic:{uniforms:Ge([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:Ge([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new At(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Ge([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new At(0)},specular:{value:new At(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Ge([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new At(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Ge([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new At(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Ge([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Ge([mt.points,mt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Ge([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:Ge([mt.common,mt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Ge([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:Ge([mt.sprite,mt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:Ge([mt.common,mt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:Ge([mt.lights,mt.fog,{color:{value:new At(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};Tn.physical={uniforms:Ge([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new At(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new At(0)},specularColor:{value:new At(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const br={r:0,b:0,g:0},mi=new bn,Km=new le;function Jm(i,t,e,n,s,r,o){const a=new At(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function _(y){let v=!1;const S=g(y);S===null?p(a,c):S&&S.isColor&&(p(S,1),v=!0);const F=i.xr.getEnvironmentBlendMode();F==="additive"?n.buffers.color.setClear(0,0,0,1,o):F==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,v){const S=g(v);S&&(S.isCubeTexture||S.mapping===ho)?(h===void 0&&(h=new yt(new Re(1,1,1),new In({name:"BackgroundCubeMaterial",uniforms:xs(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(F,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),mi.copy(v.backgroundRotation),mi.x*=-1,mi.y*=-1,mi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Km.makeRotationFromEuler(mi)),h.material.toneMapped=ce.getTransfer(S.colorSpace)!==de,(u!==S||d!==S.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new yt(new An(2,2),new In({name:"BackgroundMaterial",uniforms:xs(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=ce.getTransfer(S.colorSpace)!==de,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,f=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,v){y.getRGB(br,Wh(i)),n.buffers.color.setClear(br.r,br.g,br.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:_,addToRenderList:m}}function Zm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(x,D,U,N,X){let K=!1;const q=u(N,U,D);r!==q&&(r=q,l(r.object)),K=f(x,N,U,X),K&&g(x,N,U,X),X!==null&&t.update(X,i.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,S(x,D,U,N),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function u(x,D,U){const N=U.wireframe===!0;let X=n[x.id];X===void 0&&(X={},n[x.id]=X);let K=X[D.id];K===void 0&&(K={},X[D.id]=K);let q=K[N];return q===void 0&&(q=d(c()),K[N]=q),q}function d(x){const D=[],U=[],N=[];for(let X=0;X<e;X++)D[X]=0,U[X]=0,N[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:N,object:x,attributes:{},index:null}}function f(x,D,U,N){const X=r.attributes,K=D.attributes;let q=0;const Q=U.getAttributes();for(const Y in Q)if(Q[Y].location>=0){const Z=X[Y];let rt=K[Y];if(rt===void 0&&(Y==="instanceMatrix"&&x.instanceMatrix&&(rt=x.instanceMatrix),Y==="instanceColor"&&x.instanceColor&&(rt=x.instanceColor)),Z===void 0||Z.attribute!==rt||rt&&Z.data!==rt.data)return!0;q++}return r.attributesNum!==q||r.index!==N}function g(x,D,U,N){const X={},K=D.attributes;let q=0;const Q=U.getAttributes();for(const Y in Q)if(Q[Y].location>=0){let Z=K[Y];Z===void 0&&(Y==="instanceMatrix"&&x.instanceMatrix&&(Z=x.instanceMatrix),Y==="instanceColor"&&x.instanceColor&&(Z=x.instanceColor));const rt={};rt.attribute=Z,Z&&Z.data&&(rt.data=Z.data),X[Y]=rt,q++}r.attributes=X,r.attributesNum=q,r.index=N}function _(){const x=r.newAttributes;for(let D=0,U=x.length;D<U;D++)x[D]=0}function m(x){p(x,0)}function p(x,D){const U=r.newAttributes,N=r.enabledAttributes,X=r.attributeDivisors;U[x]=1,N[x]===0&&(i.enableVertexAttribArray(x),N[x]=1),X[x]!==D&&(i.vertexAttribDivisor(x,D),X[x]=D)}function y(){const x=r.newAttributes,D=r.enabledAttributes;for(let U=0,N=D.length;U<N;U++)D[U]!==x[U]&&(i.disableVertexAttribArray(U),D[U]=0)}function v(x,D,U,N,X,K,q){q===!0?i.vertexAttribIPointer(x,D,U,X,K):i.vertexAttribPointer(x,D,U,N,X,K)}function S(x,D,U,N){_();const X=N.attributes,K=U.getAttributes(),q=D.defaultAttributeValues;for(const Q in K){const Y=K[Q];if(Y.location>=0){let V=X[Q];if(V===void 0&&(Q==="instanceMatrix"&&x.instanceMatrix&&(V=x.instanceMatrix),Q==="instanceColor"&&x.instanceColor&&(V=x.instanceColor)),V!==void 0){const Z=V.normalized,rt=V.itemSize,wt=t.get(V);if(wt===void 0)continue;const Nt=wt.buffer,$=wt.type,at=wt.bytesPerElement,it=$===i.INT||$===i.UNSIGNED_INT||V.gpuType===fc;if(V.isInterleavedBufferAttribute){const nt=V.data,Ot=nt.stride,Vt=V.offset;if(nt.isInstancedInterleavedBuffer){for(let qt=0;qt<Y.locationSize;qt++)p(Y.location+qt,nt.meshPerAttribute);x.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let qt=0;qt<Y.locationSize;qt++)m(Y.location+qt);i.bindBuffer(i.ARRAY_BUFFER,Nt);for(let qt=0;qt<Y.locationSize;qt++)v(Y.location+qt,rt/Y.locationSize,$,Z,Ot*at,(Vt+rt/Y.locationSize*qt)*at,it)}else{if(V.isInstancedBufferAttribute){for(let nt=0;nt<Y.locationSize;nt++)p(Y.location+nt,V.meshPerAttribute);x.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let nt=0;nt<Y.locationSize;nt++)m(Y.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Nt);for(let nt=0;nt<Y.locationSize;nt++)v(Y.location+nt,rt/Y.locationSize,$,Z,rt*at,rt/Y.locationSize*nt*at,it)}}else if(q!==void 0){const Z=q[Q];if(Z!==void 0)switch(Z.length){case 2:i.vertexAttrib2fv(Y.location,Z);break;case 3:i.vertexAttrib3fv(Y.location,Z);break;case 4:i.vertexAttrib4fv(Y.location,Z);break;default:i.vertexAttrib1fv(Y.location,Z)}}}}y()}function F(){I();for(const x in n){const D=n[x];for(const U in D){const N=D[U];for(const X in N)h(N[X].object),delete N[X];delete D[U]}delete n[x]}}function w(x){if(n[x.id]===void 0)return;const D=n[x.id];for(const U in D){const N=D[U];for(const X in N)h(N[X].object),delete N[X];delete D[U]}delete n[x.id]}function A(x){for(const D in n){const U=n[D];if(U[x.id]===void 0)continue;const N=U[x.id];for(const X in N)h(N[X].object),delete N[X];delete U[x.id]}}function I(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:b,dispose:F,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function jm(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)e.update(g,n,d[_])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Qm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Mn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const A=w===Qs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Yn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Pn&&!A)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,F=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:p,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:S,maxSamples:F}}function t0(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Si,a=new Xt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const y=r?0:n,v=y*4;let S=p.clippingState||null;c.value=S,S=h(g,d,v,f);for(let F=0;F!==v;++F)S[F]=e[F];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,S=f;v!==_;++v,S+=4)o.copy(u[v]).applyMatrix4(y,a),o.normal.toArray(m,S),m[S+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function e0(i){let t=new WeakMap;function e(o,a){return a===ba?o.mapping=ms:a===Ea&&(o.mapping=gs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ba||a===Ea)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new df(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class $h extends Xh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ls=4,pl=[.125,.215,.35,.446,.526,.582],wi=20,Go=new $h,ml=new At;let Wo=null,Xo=0,qo=0,Yo=!1;const bi=(1+Math.sqrt(5))/2,es=1/bi,gl=[new C(-bi,es,0),new C(bi,es,0),new C(-es,0,bi),new C(es,0,bi),new C(0,bi,-es),new C(0,bi,es),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class _l{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Wo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),qo=this._renderer.getActiveMipmapLevel(),Yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Wo,Xo,qo),this._renderer.xr.enabled=Yo,t.scissorTest=!1,Er(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ms||t.mapping===gs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Wo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),qo=this._renderer.getActiveMipmapLevel(),Yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Qs,format:Mn,colorSpace:ci,depthBuffer:!1},s=vl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=n0(r)),this._blurMaterial=i0(r,t,e)}return s}_compileMaterial(t){const e=new yt(this._lodPlanes[0],t);this._renderer.compile(e,Go)}_sceneToCubeUV(t,e,n,s){const a=new Je(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(ml),h.toneMapping=oi,h.autoClear=!1;const f=new Ce({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),g=new yt(new Re,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(ml),_=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):y===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const v=this._cubeSize;Er(s,y*v,p>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ms||t.mapping===gs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new yt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Er(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Go)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=gl[(s-r-1)%gl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new yt(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*wi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):wi;m>wi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${wi}`);const p=[];let y=0;for(let A=0;A<wi;++A){const I=A/_,b=Math.exp(-I*I/2);p.push(b),A===0?y+=b:A<m&&(y+=2*b)}for(let A=0;A<p.length;A++)p[A]=p[A]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const S=this._sizeLods[s],F=3*S*(s>v-ls?s-v+ls:0),w=4*(this._cubeSize-S);Er(e,F,w,3*S,2*S),c.setRenderTarget(e),c.render(u,Go)}}function n0(i){const t=[],e=[],n=[];let s=i;const r=i-ls+1+pl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-ls?c=pl[o-i+ls-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,y=new Float32Array(_*g*f),v=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,I=w>2?0:-1,b=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];y.set(b,_*g*w),v.set(d,m*g*w);const x=[w,w,w,w,w,w];S.set(x,p*g*w)}const F=new Ue;F.setAttribute("position",new an(y,_)),F.setAttribute("uv",new an(v,m)),F.setAttribute("faceIndex",new an(S,p)),t.push(F),s>ls&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function vl(i,t,e){const n=new Di(i,t,e);return n.texture.mapping=ho,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Er(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function i0(i,t,e){const n=new Float32Array(wi),s=new C(0,1,0);return new In({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function xl(){return new In({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function yl(){return new In({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function wc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function s0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===ba||c===Ea,h=c===ms||c===gs;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new _l(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new _l(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function r0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&bc("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function o0(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let v=0,S=y.length;v<S;v+=3){const F=y[v+0],w=y[v+1],A=y[v+2];d.push(F,w,w,A,A,F)}}else if(g!==void 0){const y=g.array;_=g.version;for(let v=0,S=y.length/3-1;v<S;v+=3){const F=v+0,w=v+1,A=v+2;d.push(F,w,w,A,A,F)}}else return;const m=new(Oh(d)?Gh:Vh)(d,1);m.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function a0(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y];for(let y=0;y<_.length;y++)e.update(p,n,_[y])}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function c0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function l0(i,t,e){const n=new WeakMap,s=new fe;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let x=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var f=x;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let S=0;g===!0&&(S=1),_===!0&&(S=2),m===!0&&(S=3);let F=a.attributes.position.count*S,w=1;F>t.maxTextureSize&&(w=Math.ceil(F/t.maxTextureSize),F=t.maxTextureSize);const A=new Float32Array(F*w*4*u),I=new zh(A,F,w,u);I.type=Pn,I.needsUpdate=!0;const b=S*4;for(let D=0;D<u;D++){const U=p[D],N=y[D],X=v[D],K=F*w*4*D;for(let q=0;q<U.count;q++){const Q=q*b;g===!0&&(s.fromBufferAttribute(U,q),A[K+Q+0]=s.x,A[K+Q+1]=s.y,A[K+Q+2]=s.z,A[K+Q+3]=0),_===!0&&(s.fromBufferAttribute(N,q),A[K+Q+4]=s.x,A[K+Q+5]=s.y,A[K+Q+6]=s.z,A[K+Q+7]=0),m===!0&&(s.fromBufferAttribute(X,q),A[K+Q+8]=s.x,A[K+Q+9]=s.y,A[K+Q+10]=s.z,A[K+Q+11]=X.itemSize===4?s.w:1)}}d={count:u,texture:I,size:new dt(F,w)},n.set(a,d),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function h0(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class Kh extends He{constructor(t,e,n,s,r,o,a,c,l,h=fs){if(h!==fs&&h!==vs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===fs&&(n=Li),n===void 0&&h===vs&&(n=_s),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ze,this.minFilter=c!==void 0?c:Ze,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Jh=new He,Ml=new Kh(1,1),Zh=new zh,jh=new Kd,Qh=new qh,Sl=[],bl=[],El=new Float32Array(16),wl=new Float32Array(9),Tl=new Float32Array(4);function bs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Sl[s];if(r===void 0&&(r=new Float32Array(s),Sl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Pe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function fo(i,t){let e=bl[t];e===void 0&&(e=new Int32Array(t),bl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function u0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function d0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;i.uniform2fv(this.addr,t),Le(e,t)}}function f0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;i.uniform3fv(this.addr,t),Le(e,t)}}function p0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;i.uniform4fv(this.addr,t),Le(e,t)}}function m0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;Tl.set(n),i.uniformMatrix2fv(this.addr,!1,Tl),Le(e,n)}}function g0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;wl.set(n),i.uniformMatrix3fv(this.addr,!1,wl),Le(e,n)}}function _0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;El.set(n),i.uniformMatrix4fv(this.addr,!1,El),Le(e,n)}}function v0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function x0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;i.uniform2iv(this.addr,t),Le(e,t)}}function y0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;i.uniform3iv(this.addr,t),Le(e,t)}}function M0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;i.uniform4iv(this.addr,t),Le(e,t)}}function S0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function b0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;i.uniform2uiv(this.addr,t),Le(e,t)}}function E0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;i.uniform3uiv(this.addr,t),Le(e,t)}}function w0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;i.uniform4uiv(this.addr,t),Le(e,t)}}function T0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ml.compareFunction=Nh,r=Ml):r=Jh,e.setTexture2D(t||r,s)}function A0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||jh,s)}function R0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Qh,s)}function C0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Zh,s)}function P0(i){switch(i){case 5126:return u0;case 35664:return d0;case 35665:return f0;case 35666:return p0;case 35674:return m0;case 35675:return g0;case 35676:return _0;case 5124:case 35670:return v0;case 35667:case 35671:return x0;case 35668:case 35672:return y0;case 35669:case 35673:return M0;case 5125:return S0;case 36294:return b0;case 36295:return E0;case 36296:return w0;case 35678:case 36198:case 36298:case 36306:case 35682:return T0;case 35679:case 36299:case 36307:return A0;case 35680:case 36300:case 36308:case 36293:return R0;case 36289:case 36303:case 36311:case 36292:return C0}}function L0(i,t){i.uniform1fv(this.addr,t)}function D0(i,t){const e=bs(t,this.size,2);i.uniform2fv(this.addr,e)}function I0(i,t){const e=bs(t,this.size,3);i.uniform3fv(this.addr,e)}function U0(i,t){const e=bs(t,this.size,4);i.uniform4fv(this.addr,e)}function N0(i,t){const e=bs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function O0(i,t){const e=bs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function F0(i,t){const e=bs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function z0(i,t){i.uniform1iv(this.addr,t)}function B0(i,t){i.uniform2iv(this.addr,t)}function k0(i,t){i.uniform3iv(this.addr,t)}function H0(i,t){i.uniform4iv(this.addr,t)}function V0(i,t){i.uniform1uiv(this.addr,t)}function G0(i,t){i.uniform2uiv(this.addr,t)}function W0(i,t){i.uniform3uiv(this.addr,t)}function X0(i,t){i.uniform4uiv(this.addr,t)}function q0(i,t,e){const n=this.cache,s=t.length,r=fo(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Jh,r[o])}function Y0(i,t,e){const n=this.cache,s=t.length,r=fo(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||jh,r[o])}function $0(i,t,e){const n=this.cache,s=t.length,r=fo(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Qh,r[o])}function K0(i,t,e){const n=this.cache,s=t.length,r=fo(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Zh,r[o])}function J0(i){switch(i){case 5126:return L0;case 35664:return D0;case 35665:return I0;case 35666:return U0;case 35674:return N0;case 35675:return O0;case 35676:return F0;case 5124:case 35670:return z0;case 35667:case 35671:return B0;case 35668:case 35672:return k0;case 35669:case 35673:return H0;case 5125:return V0;case 36294:return G0;case 36295:return W0;case 36296:return X0;case 35678:case 36198:case 36298:case 36306:case 35682:return q0;case 35679:case 36299:case 36307:return Y0;case 35680:case 36300:case 36308:case 36293:return $0;case 36289:case 36303:case 36311:case 36292:return K0}}class Z0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=P0(e.type)}}class j0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=J0(e.type)}}class Q0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const $o=/(\w+)(\])?(\[|\.)?/g;function Al(i,t){i.seq.push(t),i.map[t.id]=t}function tg(i,t,e){const n=i.name,s=n.length;for($o.lastIndex=0;;){const r=$o.exec(n),o=$o.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Al(e,l===void 0?new Z0(a,i,t):new j0(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Q0(a),Al(e,u)),e=u}}}class Xr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);tg(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Rl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const eg=37297;let ng=0;function ig(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function sg(i){const t=ce.getPrimaries(ce.workingColorSpace),e=ce.getPrimaries(i);let n;switch(t===e?n="":t===eo&&e===to?n="LinearDisplayP3ToLinearSRGB":t===to&&e===eo&&(n="LinearSRGBToLinearDisplayP3"),i){case ci:case uo:return[n,"LinearTransferOETF"];case $e:case Mc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Cl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+ig(i.getShaderSource(t),o)}else return s}function rg(i,t){const e=sg(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function og(i,t){let e;switch(t){case ld:e="Linear";break;case hd:e="Reinhard";break;case ud:e="OptimizedCineon";break;case dc:e="ACESFilmic";break;case fd:e="AgX";break;case pd:e="Neutral";break;case dd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function ag(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ks).join(`
`)}function cg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function lg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ks(i){return i!==""}function Pl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ll(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const hg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qa(i){return i.replace(hg,dg)}const ug=new Map;function dg(i,t){let e=Wt[t];if(e===void 0){const n=ug.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Qa(e)}const fg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dl(i){return i.replace(fg,pg)}function pg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Il(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function mg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Eh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===hc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Hn&&(t="SHADOWMAP_TYPE_VSM"),t}function gg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ms:case gs:t="ENVMAP_TYPE_CUBE";break;case ho:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _g(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case gs:t="ENVMAP_MODE_REFRACTION";break}return t}function vg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case uc:t="ENVMAP_BLENDING_MULTIPLY";break;case ad:t="ENVMAP_BLENDING_MIX";break;case cd:t="ENVMAP_BLENDING_ADD";break}return t}function xg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function yg(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=mg(e),l=gg(e),h=_g(e),u=vg(e),d=xg(e),f=ag(e),g=cg(r),_=s.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ks).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ks).join(`
`),p.length>0&&(p+=`
`)):(m=[Il(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ks).join(`
`),p=[Il(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==oi?"#define TONE_MAPPING":"",e.toneMapping!==oi?Wt.tonemapping_pars_fragment:"",e.toneMapping!==oi?og("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,rg("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ks).join(`
`)),o=Qa(o),o=Pl(o,e),o=Ll(o,e),a=Qa(a),a=Pl(a,e),a=Ll(a,e),o=Dl(o),a=Dl(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===qc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===qc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=y+m+o,S=y+p+a,F=Rl(s,s.VERTEX_SHADER,v),w=Rl(s,s.FRAGMENT_SHADER,S);s.attachShader(_,F),s.attachShader(_,w),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(D){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(_).trim(),N=s.getShaderInfoLog(F).trim(),X=s.getShaderInfoLog(w).trim();let K=!0,q=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,F,w);else{const Q=Cl(s,F,"vertex"),Y=Cl(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+U+`
`+Q+`
`+Y)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(N===""||X==="")&&(q=!1);q&&(D.diagnostics={runnable:K,programLog:U,vertexShader:{log:N,prefix:m},fragmentShader:{log:X,prefix:p}})}s.deleteShader(F),s.deleteShader(w),I=new Xr(s,_),b=lg(s,_)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,eg)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ng++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=F,this.fragmentShader=w,this}let Mg=0;class Sg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new bg(t),e.set(t,n)),n}}class bg{constructor(t){this.id=Mg++,this.code=t,this.usedTimes=0}}function Eg(i,t,e,n,s,r,o){const a=new kh,c=new Sg,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,x,D,U,N){const X=U.fog,K=N.geometry,q=b.isMeshStandardMaterial?U.environment:null,Q=(b.isMeshStandardMaterial?e:t).get(b.envMap||q),Y=Q&&Q.mapping===ho?Q.image.height:null,V=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const Z=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,rt=Z!==void 0?Z.length:0;let wt=0;K.morphAttributes.position!==void 0&&(wt=1),K.morphAttributes.normal!==void 0&&(wt=2),K.morphAttributes.color!==void 0&&(wt=3);let Nt,$,at,it;if(V){const j=Tn[V];Nt=j.vertexShader,$=j.fragmentShader}else Nt=b.vertexShader,$=b.fragmentShader,c.update(b),at=c.getVertexShaderID(b),it=c.getFragmentShaderID(b);const nt=i.getRenderTarget(),Ot=N.isInstancedMesh===!0,Vt=N.isBatchedMesh===!0,qt=!!b.map,me=!!b.matcap,L=!!Q,ye=!!b.aoMap,te=!!b.lightMap,ee=!!b.bumpMap,Ct=!!b.normalMap,_e=!!b.displacementMap,It=!!b.emissiveMap,kt=!!b.metalnessMap,R=!!b.roughnessMap,M=b.anisotropy>0,G=b.clearcoat>0,st=b.dispersion>0,ot=b.iridescence>0,et=b.sheen>0,Rt=b.transmission>0,pt=M&&!!b.anisotropyMap,St=G&&!!b.clearcoatMap,Ht=G&&!!b.clearcoatNormalMap,ct=G&&!!b.clearcoatRoughnessMap,xt=ot&&!!b.iridescenceMap,Yt=ot&&!!b.iridescenceThicknessMap,vt=et&&!!b.sheenColorMap,gt=et&&!!b.sheenRoughnessMap,Ft=!!b.specularMap,Bt=!!b.specularColorMap,ne=!!b.specularIntensityMap,O=Rt&&!!b.transmissionMap,lt=Rt&&!!b.thicknessMap,T=!!b.gradientMap,P=!!b.alphaMap,k=b.alphaTest>0,J=!!b.alphaHash,tt=!!b.extensions;let _t=oi;b.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(_t=i.toneMapping);const bt={shaderID:V,shaderType:b.type,shaderName:b.name,vertexShader:Nt,fragmentShader:$,defines:b.defines,customVertexShaderID:at,customFragmentShaderID:it,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Vt,batchingColor:Vt&&N._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&N.instanceColor!==null,instancingMorph:Ot&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:ci,alphaToCoverage:!!b.alphaToCoverage,map:qt,matcap:me,envMap:L,envMapMode:L&&Q.mapping,envMapCubeUVHeight:Y,aoMap:ye,lightMap:te,bumpMap:ee,normalMap:Ct,displacementMap:d&&_e,emissiveMap:It,normalMapObjectSpace:Ct&&b.normalMapType===vd,normalMapTangentSpace:Ct&&b.normalMapType===yc,metalnessMap:kt,roughnessMap:R,anisotropy:M,anisotropyMap:pt,clearcoat:G,clearcoatMap:St,clearcoatNormalMap:Ht,clearcoatRoughnessMap:ct,dispersion:st,iridescence:ot,iridescenceMap:xt,iridescenceThicknessMap:Yt,sheen:et,sheenColorMap:vt,sheenRoughnessMap:gt,specularMap:Ft,specularColorMap:Bt,specularIntensityMap:ne,transmission:Rt,transmissionMap:O,thicknessMap:lt,gradientMap:T,opaque:b.transparent===!1&&b.blending===ds&&b.alphaToCoverage===!1,alphaMap:P,alphaTest:k,alphaHash:J,combine:b.combine,mapUv:qt&&_(b.map.channel),aoMapUv:ye&&_(b.aoMap.channel),lightMapUv:te&&_(b.lightMap.channel),bumpMapUv:ee&&_(b.bumpMap.channel),normalMapUv:Ct&&_(b.normalMap.channel),displacementMapUv:_e&&_(b.displacementMap.channel),emissiveMapUv:It&&_(b.emissiveMap.channel),metalnessMapUv:kt&&_(b.metalnessMap.channel),roughnessMapUv:R&&_(b.roughnessMap.channel),anisotropyMapUv:pt&&_(b.anisotropyMap.channel),clearcoatMapUv:St&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Ht&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Yt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:gt&&_(b.sheenRoughnessMap.channel),specularMapUv:Ft&&_(b.specularMap.channel),specularColorMapUv:Bt&&_(b.specularColorMap.channel),specularIntensityMapUv:ne&&_(b.specularIntensityMap.channel),transmissionMapUv:O&&_(b.transmissionMap.channel),thicknessMapUv:lt&&_(b.thicknessMap.channel),alphaMapUv:P&&_(b.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Ct||M),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!K.attributes.uv&&(qt||P),fog:!!X,useFog:b.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:N.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:rt,morphTextureStride:wt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:_t,decodeVideoTexture:qt&&b.map.isVideoTexture===!0&&ce.getTransfer(b.map.colorSpace)===de,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===rn,flipSided:b.side===Xe,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:tt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(tt&&b.extensions.multiDraw===!0||Vt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return bt.vertexUv1s=l.has(1),bt.vertexUv2s=l.has(2),bt.vertexUv3s=l.has(3),l.clear(),bt}function p(b){const x=[];if(b.shaderID?x.push(b.shaderID):(x.push(b.customVertexShaderID),x.push(b.customFragmentShaderID)),b.defines!==void 0)for(const D in b.defines)x.push(D),x.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(y(x,b),v(x,b),x.push(i.outputColorSpace)),x.push(b.customProgramCacheKey),x.join()}function y(b,x){b.push(x.precision),b.push(x.outputColorSpace),b.push(x.envMapMode),b.push(x.envMapCubeUVHeight),b.push(x.mapUv),b.push(x.alphaMapUv),b.push(x.lightMapUv),b.push(x.aoMapUv),b.push(x.bumpMapUv),b.push(x.normalMapUv),b.push(x.displacementMapUv),b.push(x.emissiveMapUv),b.push(x.metalnessMapUv),b.push(x.roughnessMapUv),b.push(x.anisotropyMapUv),b.push(x.clearcoatMapUv),b.push(x.clearcoatNormalMapUv),b.push(x.clearcoatRoughnessMapUv),b.push(x.iridescenceMapUv),b.push(x.iridescenceThicknessMapUv),b.push(x.sheenColorMapUv),b.push(x.sheenRoughnessMapUv),b.push(x.specularMapUv),b.push(x.specularColorMapUv),b.push(x.specularIntensityMapUv),b.push(x.transmissionMapUv),b.push(x.thicknessMapUv),b.push(x.combine),b.push(x.fogExp2),b.push(x.sizeAttenuation),b.push(x.morphTargetsCount),b.push(x.morphAttributeCount),b.push(x.numDirLights),b.push(x.numPointLights),b.push(x.numSpotLights),b.push(x.numSpotLightMaps),b.push(x.numHemiLights),b.push(x.numRectAreaLights),b.push(x.numDirLightShadows),b.push(x.numPointLightShadows),b.push(x.numSpotLightShadows),b.push(x.numSpotLightShadowsWithMaps),b.push(x.numLightProbes),b.push(x.shadowMapType),b.push(x.toneMapping),b.push(x.numClippingPlanes),b.push(x.numClipIntersection),b.push(x.depthPacking)}function v(b,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.skinning&&a.enable(4),x.morphTargets&&a.enable(5),x.morphNormals&&a.enable(6),x.morphColors&&a.enable(7),x.premultipliedAlpha&&a.enable(8),x.shadowMapEnabled&&a.enable(9),x.doubleSided&&a.enable(10),x.flipSided&&a.enable(11),x.useDepthPacking&&a.enable(12),x.dithering&&a.enable(13),x.transmission&&a.enable(14),x.sheen&&a.enable(15),x.opaque&&a.enable(16),x.pointsUvs&&a.enable(17),x.decodeVideoTexture&&a.enable(18),x.alphaToCoverage&&a.enable(19),b.push(a.mask)}function S(b){const x=g[b.type];let D;if(x){const U=Tn[x];D=cf.clone(U.uniforms)}else D=b.uniforms;return D}function F(b,x){let D;for(let U=0,N=h.length;U<N;U++){const X=h[U];if(X.cacheKey===x){D=X,++D.usedTimes;break}}return D===void 0&&(D=new yg(i,x,b,r),h.push(D)),D}function w(b){if(--b.usedTimes===0){const x=h.indexOf(b);h[x]=h[h.length-1],h.pop(),b.destroy()}}function A(b){c.remove(b)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:F,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:I}}function wg(){let i=new WeakMap;function t(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function e(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function Tg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Ul(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Nl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||Tg),n.length>1&&n.sort(d||Ul),s.length>1&&s.sort(d||Ul)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Ag(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Nl,i.set(n,[o])):s>=r.length?(o=new Nl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Rg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new At};break;case"SpotLight":e={position:new C,direction:new C,color:new At,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new At,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new At,groundColor:new At};break;case"RectAreaLight":e={color:new At,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function Cg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Pg=0;function Lg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Dg(i){const t=new Rg,e=Cg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);const s=new C,r=new le,o=new le;function a(l){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,y=0,v=0,S=0,F=0,w=0,A=0;l.sort(Lg);for(let b=0,x=l.length;b<x;b++){const D=l[b],U=D.color,N=D.intensity,X=D.distance,K=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=U.r*N,u+=U.g*N,d+=U.b*N;else if(D.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(D.sh.coefficients[q],N);A++}else if(D.isDirectionalLight){const q=t.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Q=D.shadow,Y=e.get(D);Y.shadowIntensity=Q.intensity,Y.shadowBias=Q.bias,Y.shadowNormalBias=Q.normalBias,Y.shadowRadius=Q.radius,Y.shadowMapSize=Q.mapSize,n.directionalShadow[f]=Y,n.directionalShadowMap[f]=K,n.directionalShadowMatrix[f]=D.shadow.matrix,y++}n.directional[f]=q,f++}else if(D.isSpotLight){const q=t.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(U).multiplyScalar(N),q.distance=X,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,n.spot[_]=q;const Q=D.shadow;if(D.map&&(n.spotLightMap[F]=D.map,F++,Q.updateMatrices(D),D.castShadow&&w++),n.spotLightMatrix[_]=Q.matrix,D.castShadow){const Y=e.get(D);Y.shadowIntensity=Q.intensity,Y.shadowBias=Q.bias,Y.shadowNormalBias=Q.normalBias,Y.shadowRadius=Q.radius,Y.shadowMapSize=Q.mapSize,n.spotShadow[_]=Y,n.spotShadowMap[_]=K,S++}_++}else if(D.isRectAreaLight){const q=t.get(D);q.color.copy(U).multiplyScalar(N),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=q,m++}else if(D.isPointLight){const q=t.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),q.distance=D.distance,q.decay=D.decay,D.castShadow){const Q=D.shadow,Y=e.get(D);Y.shadowIntensity=Q.intensity,Y.shadowBias=Q.bias,Y.shadowNormalBias=Q.normalBias,Y.shadowRadius=Q.radius,Y.shadowMapSize=Q.mapSize,Y.shadowCameraNear=Q.camera.near,Y.shadowCameraFar=Q.camera.far,n.pointShadow[g]=Y,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=D.shadow.matrix,v++}n.point[g]=q,g++}else if(D.isHemisphereLight){const q=t.get(D);q.skyColor.copy(D.color).multiplyScalar(N),q.groundColor.copy(D.groundColor).multiplyScalar(N),n.hemi[p]=q,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==y||I.numPointShadows!==v||I.numSpotShadows!==S||I.numSpotMaps!==F||I.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=S+F-w,n.spotLightMap.length=F,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,I.directionalLength=f,I.pointLength=g,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=y,I.numPointShadows=v,I.numSpotShadows=S,I.numSpotMaps=F,I.numLightProbes=A,n.version=Pg++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const v=l[p];if(v.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),u++}else if(v.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),f++}else if(v.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function Ol(i){const t=new Dg(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Ig(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Ol(i),t.set(s,[a])):r>=o.length?(a=new Ol(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Ug extends li{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ng extends li{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Og=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zg(i,t,e){let n=new Ec;const s=new dt,r=new dt,o=new fe,a=new Ug({depthPacking:_d}),c=new Ng,l={},h=e.maxTextureSize,u={[ai]:Xe,[Xe]:ai,[rn]:rn},d=new In({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:Og,fragmentShader:Fg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ue;g.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new yt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Eh;let p=this.type;this.render=function(w,A,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const b=i.getRenderTarget(),x=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),U=i.state;U.setBlending(ri),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const N=p!==Hn&&this.type===Hn,X=p===Hn&&this.type!==Hn;for(let K=0,q=w.length;K<q;K++){const Q=w[K],Y=Q.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const V=Y.getFrameExtents();if(s.multiply(V),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/V.x),s.x=r.x*V.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/V.y),s.y=r.y*V.y,Y.mapSize.y=r.y)),Y.map===null||N===!0||X===!0){const rt=this.type!==Hn?{minFilter:Ze,magFilter:Ze}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Di(s.x,s.y,rt),Y.map.texture.name=Q.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const Z=Y.getViewportCount();for(let rt=0;rt<Z;rt++){const wt=Y.getViewport(rt);o.set(r.x*wt.x,r.y*wt.y,r.x*wt.z,r.y*wt.w),U.viewport(o),Y.updateMatrices(Q,rt),n=Y.getFrustum(),S(A,I,Y.camera,Q,this.type)}Y.isPointLightShadow!==!0&&this.type===Hn&&y(Y,I),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,x,D)};function y(w,A){const I=t.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Di(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,I,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,I,f,_,null)}function v(w,A,I,b){let x=null;const D=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)x=D;else if(x=I.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const U=x.uuid,N=A.uuid;let X=l[U];X===void 0&&(X={},l[U]=X);let K=X[N];K===void 0&&(K=x.clone(),X[N]=K,A.addEventListener("dispose",F)),x=K}if(x.visible=A.visible,x.wireframe=A.wireframe,b===Hn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:u[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,I.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const U=i.properties.get(x);U.light=I}return x}function S(w,A,I,b,x){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===Hn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);const N=t.update(w),X=w.material;if(Array.isArray(X)){const K=N.groups;for(let q=0,Q=K.length;q<Q;q++){const Y=K[q],V=X[Y.materialIndex];if(V&&V.visible){const Z=v(w,V,b,x);w.onBeforeShadow(i,w,A,I,N,Z,Y),i.renderBufferDirect(I,null,N,Z,w,Y),w.onAfterShadow(i,w,A,I,N,Z,Y)}}}else if(X.visible){const K=v(w,X,b,x);w.onBeforeShadow(i,w,A,I,N,K,null),i.renderBufferDirect(I,null,N,K,w,null),w.onAfterShadow(i,w,A,I,N,K,null)}}const U=w.children;for(let N=0,X=U.length;N<X;N++)S(U[N],A,I,b,x)}function F(w){w.target.removeEventListener("dispose",F);for(const I in l){const b=l[I],x=w.target.uuid;x in b&&(b[x].dispose(),delete b[x])}}}function Bg(i){function t(){let O=!1;const lt=new fe;let T=null;const P=new fe(0,0,0,0);return{setMask:function(k){T!==k&&!O&&(i.colorMask(k,k,k,k),T=k)},setLocked:function(k){O=k},setClear:function(k,J,tt,_t,bt){bt===!0&&(k*=_t,J*=_t,tt*=_t),lt.set(k,J,tt,_t),P.equals(lt)===!1&&(i.clearColor(k,J,tt,_t),P.copy(lt))},reset:function(){O=!1,T=null,P.set(-1,0,0,0)}}}function e(){let O=!1,lt=null,T=null,P=null;return{setTest:function(k){k?it(i.DEPTH_TEST):nt(i.DEPTH_TEST)},setMask:function(k){lt!==k&&!O&&(i.depthMask(k),lt=k)},setFunc:function(k){if(T!==k){switch(k){case td:i.depthFunc(i.NEVER);break;case ed:i.depthFunc(i.ALWAYS);break;case nd:i.depthFunc(i.LESS);break;case jr:i.depthFunc(i.LEQUAL);break;case id:i.depthFunc(i.EQUAL);break;case sd:i.depthFunc(i.GEQUAL);break;case rd:i.depthFunc(i.GREATER);break;case od:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}T=k}},setLocked:function(k){O=k},setClear:function(k){P!==k&&(i.clearDepth(k),P=k)},reset:function(){O=!1,lt=null,T=null,P=null}}}function n(){let O=!1,lt=null,T=null,P=null,k=null,J=null,tt=null,_t=null,bt=null;return{setTest:function(j){O||(j?it(i.STENCIL_TEST):nt(i.STENCIL_TEST))},setMask:function(j){lt!==j&&!O&&(i.stencilMask(j),lt=j)},setFunc:function(j,ft,Lt){(T!==j||P!==ft||k!==Lt)&&(i.stencilFunc(j,ft,Lt),T=j,P=ft,k=Lt)},setOp:function(j,ft,Lt){(J!==j||tt!==ft||_t!==Lt)&&(i.stencilOp(j,ft,Lt),J=j,tt=ft,_t=Lt)},setLocked:function(j){O=j},setClear:function(j){bt!==j&&(i.clearStencil(j),bt=j)},reset:function(){O=!1,lt=null,T=null,P=null,k=null,J=null,tt=null,_t=null,bt=null}}}const s=new t,r=new e,o=new n,a=new WeakMap,c=new WeakMap;let l={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,y=null,v=null,S=null,F=null,w=new At(0,0,0),A=0,I=!1,b=null,x=null,D=null,U=null,N=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,q=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(Q)[1]),K=q>=1):Q.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),K=q>=2);let Y=null,V={};const Z=i.getParameter(i.SCISSOR_BOX),rt=i.getParameter(i.VIEWPORT),wt=new fe().fromArray(Z),Nt=new fe().fromArray(rt);function $(O,lt,T,P){const k=new Uint8Array(4),J=i.createTexture();i.bindTexture(O,J),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let tt=0;tt<T;tt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,P,0,i.RGBA,i.UNSIGNED_BYTE,k):i.texImage2D(lt+tt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,k);return J}const at={};at[i.TEXTURE_2D]=$(i.TEXTURE_2D,i.TEXTURE_2D,1),at[i.TEXTURE_CUBE_MAP]=$(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[i.TEXTURE_2D_ARRAY]=$(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),at[i.TEXTURE_3D]=$(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),it(i.DEPTH_TEST),r.setFunc(jr),ee(!1),Ct(Hc),it(i.CULL_FACE),ye(ri);function it(O){l[O]!==!0&&(i.enable(O),l[O]=!0)}function nt(O){l[O]!==!1&&(i.disable(O),l[O]=!1)}function Ot(O,lt){return h[O]!==lt?(i.bindFramebuffer(O,lt),h[O]=lt,O===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=lt),O===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function Vt(O,lt){let T=d,P=!1;if(O){T=u.get(lt),T===void 0&&(T=[],u.set(lt,T));const k=O.textures;if(T.length!==k.length||T[0]!==i.COLOR_ATTACHMENT0){for(let J=0,tt=k.length;J<tt;J++)T[J]=i.COLOR_ATTACHMENT0+J;T.length=k.length,P=!0}}else T[0]!==i.BACK&&(T[0]=i.BACK,P=!0);P&&i.drawBuffers(T)}function qt(O){return f!==O?(i.useProgram(O),f=O,!0):!1}const me={[Ei]:i.FUNC_ADD,[Fu]:i.FUNC_SUBTRACT,[zu]:i.FUNC_REVERSE_SUBTRACT};me[Bu]=i.MIN,me[ku]=i.MAX;const L={[Hu]:i.ZERO,[Vu]:i.ONE,[Gu]:i.SRC_COLOR,[Ma]:i.SRC_ALPHA,[Ku]:i.SRC_ALPHA_SATURATE,[Yu]:i.DST_COLOR,[Xu]:i.DST_ALPHA,[Wu]:i.ONE_MINUS_SRC_COLOR,[Sa]:i.ONE_MINUS_SRC_ALPHA,[$u]:i.ONE_MINUS_DST_COLOR,[qu]:i.ONE_MINUS_DST_ALPHA,[Ju]:i.CONSTANT_COLOR,[Zu]:i.ONE_MINUS_CONSTANT_COLOR,[ju]:i.CONSTANT_ALPHA,[Qu]:i.ONE_MINUS_CONSTANT_ALPHA};function ye(O,lt,T,P,k,J,tt,_t,bt,j){if(O===ri){g===!0&&(nt(i.BLEND),g=!1);return}if(g===!1&&(it(i.BLEND),g=!0),O!==Ou){if(O!==_||j!==I){if((m!==Ei||v!==Ei)&&(i.blendEquation(i.FUNC_ADD),m=Ei,v=Ei),j)switch(O){case ds:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vc:i.blendFunc(i.ONE,i.ONE);break;case Gc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ds:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Gc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}p=null,y=null,S=null,F=null,w.set(0,0,0),A=0,_=O,I=j}return}k=k||lt,J=J||T,tt=tt||P,(lt!==m||k!==v)&&(i.blendEquationSeparate(me[lt],me[k]),m=lt,v=k),(T!==p||P!==y||J!==S||tt!==F)&&(i.blendFuncSeparate(L[T],L[P],L[J],L[tt]),p=T,y=P,S=J,F=tt),(_t.equals(w)===!1||bt!==A)&&(i.blendColor(_t.r,_t.g,_t.b,bt),w.copy(_t),A=bt),_=O,I=!1}function te(O,lt){O.side===rn?nt(i.CULL_FACE):it(i.CULL_FACE);let T=O.side===Xe;lt&&(T=!T),ee(T),O.blending===ds&&O.transparent===!1?ye(ri):ye(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),r.setFunc(O.depthFunc),r.setTest(O.depthTest),r.setMask(O.depthWrite),s.setMask(O.colorWrite);const P=O.stencilWrite;o.setTest(P),P&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),It(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?it(i.SAMPLE_ALPHA_TO_COVERAGE):nt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ee(O){b!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),b=O)}function Ct(O){O!==Uu?(it(i.CULL_FACE),O!==x&&(O===Hc?i.cullFace(i.BACK):O===Nu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):nt(i.CULL_FACE),x=O}function _e(O){O!==D&&(K&&i.lineWidth(O),D=O)}function It(O,lt,T){O?(it(i.POLYGON_OFFSET_FILL),(U!==lt||N!==T)&&(i.polygonOffset(lt,T),U=lt,N=T)):nt(i.POLYGON_OFFSET_FILL)}function kt(O){O?it(i.SCISSOR_TEST):nt(i.SCISSOR_TEST)}function R(O){O===void 0&&(O=i.TEXTURE0+X-1),Y!==O&&(i.activeTexture(O),Y=O)}function M(O,lt,T){T===void 0&&(Y===null?T=i.TEXTURE0+X-1:T=Y);let P=V[T];P===void 0&&(P={type:void 0,texture:void 0},V[T]=P),(P.type!==O||P.texture!==lt)&&(Y!==T&&(i.activeTexture(T),Y=T),i.bindTexture(O,lt||at[O]),P.type=O,P.texture=lt)}function G(){const O=V[Y];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function st(){try{i.compressedTexImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ot(){try{i.compressedTexImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function et(){try{i.texSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Rt(){try{i.texSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function pt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function St(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ht(){try{i.texStorage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ct(){try{i.texStorage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function xt(){try{i.texImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Yt(){try{i.texImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function vt(O){wt.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),wt.copy(O))}function gt(O){Nt.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Nt.copy(O))}function Ft(O,lt){let T=c.get(lt);T===void 0&&(T=new WeakMap,c.set(lt,T));let P=T.get(O);P===void 0&&(P=i.getUniformBlockIndex(lt,O.name),T.set(O,P))}function Bt(O,lt){const P=c.get(lt).get(O);a.get(lt)!==P&&(i.uniformBlockBinding(lt,P,O.__bindingPointIndex),a.set(lt,P))}function ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},Y=null,V={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,y=null,v=null,S=null,F=null,w=new At(0,0,0),A=0,I=!1,b=null,x=null,D=null,U=null,N=null,wt.set(0,0,i.canvas.width,i.canvas.height),Nt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:it,disable:nt,bindFramebuffer:Ot,drawBuffers:Vt,useProgram:qt,setBlending:ye,setMaterial:te,setFlipSided:ee,setCullFace:Ct,setLineWidth:_e,setPolygonOffset:It,setScissorTest:kt,activeTexture:R,bindTexture:M,unbindTexture:G,compressedTexImage2D:st,compressedTexImage3D:ot,texImage2D:xt,texImage3D:Yt,updateUBOMapping:Ft,uniformBlockBinding:Bt,texStorage2D:Ht,texStorage3D:ct,texSubImage2D:et,texSubImage3D:Rt,compressedTexSubImage2D:pt,compressedTexSubImage3D:St,scissor:vt,viewport:gt,reset:ne}}function Fl(i,t,e,n){const s=kg(n);switch(e){case Ch:return i*t;case Lh:return i*t;case Dh:return i*t*2;case gc:return i*t/s.components*s.byteLength;case _c:return i*t/s.components*s.byteLength;case Ih:return i*t*2/s.components*s.byteLength;case vc:return i*t*2/s.components*s.byteLength;case Ph:return i*t*3/s.components*s.byteLength;case Mn:return i*t*4/s.components*s.byteLength;case xc:return i*t*4/s.components*s.byteLength;case kr:case Hr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Vr:case Gr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Aa:case Ca:return Math.max(i,16)*Math.max(t,8)/4;case Ta:case Ra:return Math.max(i,8)*Math.max(t,8)/2;case Pa:case La:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Na:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Oa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case za:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ba:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ka:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Va:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Xa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case qa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Wr:case Ya:case $a:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Uh:case Ka:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ja:case Za:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function kg(i){switch(i){case Yn:case Th:return{byteLength:1,components:1};case $s:case Ah:case Qs:return{byteLength:2,components:1};case pc:case mc:return{byteLength:2,components:4};case Li:case fc:case Pn:return{byteLength:4,components:1};case Rh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Hg(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new dt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,M){return f?new OffscreenCanvas(R,M):io("canvas")}function _(R,M,G){let st=1;const ot=kt(R);if((ot.width>G||ot.height>G)&&(st=G/Math.max(ot.width,ot.height)),st<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const et=Math.floor(st*ot.width),Rt=Math.floor(st*ot.height);u===void 0&&(u=g(et,Rt));const pt=M?g(et,Rt):u;return pt.width=et,pt.height=Rt,pt.getContext("2d").drawImage(R,0,0,et,Rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ot.width+"x"+ot.height+") to ("+et+"x"+Rt+")."),pt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ot.width+"x"+ot.height+")."),R;return R}function m(R){return R.generateMipmaps&&R.minFilter!==Ze&&R.minFilter!==_n}function p(R){i.generateMipmap(R)}function y(R,M,G,st,ot=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let et=M;if(M===i.RED&&(G===i.FLOAT&&(et=i.R32F),G===i.HALF_FLOAT&&(et=i.R16F),G===i.UNSIGNED_BYTE&&(et=i.R8)),M===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(et=i.R8UI),G===i.UNSIGNED_SHORT&&(et=i.R16UI),G===i.UNSIGNED_INT&&(et=i.R32UI),G===i.BYTE&&(et=i.R8I),G===i.SHORT&&(et=i.R16I),G===i.INT&&(et=i.R32I)),M===i.RG&&(G===i.FLOAT&&(et=i.RG32F),G===i.HALF_FLOAT&&(et=i.RG16F),G===i.UNSIGNED_BYTE&&(et=i.RG8)),M===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(et=i.RG8UI),G===i.UNSIGNED_SHORT&&(et=i.RG16UI),G===i.UNSIGNED_INT&&(et=i.RG32UI),G===i.BYTE&&(et=i.RG8I),G===i.SHORT&&(et=i.RG16I),G===i.INT&&(et=i.RG32I)),M===i.RGB&&G===i.UNSIGNED_INT_5_9_9_9_REV&&(et=i.RGB9_E5),M===i.RGBA){const Rt=ot?Qr:ce.getTransfer(st);G===i.FLOAT&&(et=i.RGBA32F),G===i.HALF_FLOAT&&(et=i.RGBA16F),G===i.UNSIGNED_BYTE&&(et=Rt===de?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(et=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(et=i.RGB5_A1)}return(et===i.R16F||et===i.R32F||et===i.RG16F||et===i.RG32F||et===i.RGBA16F||et===i.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function v(R,M){let G;return R?M===null||M===Li||M===_s?G=i.DEPTH24_STENCIL8:M===Pn?G=i.DEPTH32F_STENCIL8:M===$s&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Li||M===_s?G=i.DEPTH_COMPONENT24:M===Pn?G=i.DEPTH_COMPONENT32F:M===$s&&(G=i.DEPTH_COMPONENT16),G}function S(R,M){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ze&&R.minFilter!==_n?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function F(R){const M=R.target;M.removeEventListener("dispose",F),A(M),M.isVideoTexture&&h.delete(M)}function w(R){const M=R.target;M.removeEventListener("dispose",w),b(M)}function A(R){const M=n.get(R);if(M.__webglInit===void 0)return;const G=R.source,st=d.get(G);if(st){const ot=st[M.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&I(R),Object.keys(st).length===0&&d.delete(G)}n.remove(R)}function I(R){const M=n.get(R);i.deleteTexture(M.__webglTexture);const G=R.source,st=d.get(G);delete st[M.__cacheKey],o.memory.textures--}function b(R){const M=n.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(M.__webglFramebuffer[st]))for(let ot=0;ot<M.__webglFramebuffer[st].length;ot++)i.deleteFramebuffer(M.__webglFramebuffer[st][ot]);else i.deleteFramebuffer(M.__webglFramebuffer[st]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[st])}else{if(Array.isArray(M.__webglFramebuffer))for(let st=0;st<M.__webglFramebuffer.length;st++)i.deleteFramebuffer(M.__webglFramebuffer[st]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let st=0;st<M.__webglColorRenderbuffer.length;st++)M.__webglColorRenderbuffer[st]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[st]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const G=R.textures;for(let st=0,ot=G.length;st<ot;st++){const et=n.get(G[st]);et.__webglTexture&&(i.deleteTexture(et.__webglTexture),o.memory.textures--),n.remove(G[st])}n.remove(R)}let x=0;function D(){x=0}function U(){const R=x;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),x+=1,R}function N(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function X(R,M){const G=n.get(R);if(R.isVideoTexture&&_e(R),R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){const st=R.image;if(st===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Nt(G,R,M);return}}e.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+M)}function K(R,M){const G=n.get(R);if(R.version>0&&G.__version!==R.version){Nt(G,R,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+M)}function q(R,M){const G=n.get(R);if(R.version>0&&G.__version!==R.version){Nt(G,R,M);return}e.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+M)}function Q(R,M){const G=n.get(R);if(R.version>0&&G.__version!==R.version){$(G,R,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+M)}const Y={[Ys]:i.REPEAT,[Ti]:i.CLAMP_TO_EDGE,[wa]:i.MIRRORED_REPEAT},V={[Ze]:i.NEAREST,[md]:i.NEAREST_MIPMAP_NEAREST,[ir]:i.NEAREST_MIPMAP_LINEAR,[_n]:i.LINEAR,[Eo]:i.LINEAR_MIPMAP_NEAREST,[Ai]:i.LINEAR_MIPMAP_LINEAR},Z={[xd]:i.NEVER,[wd]:i.ALWAYS,[yd]:i.LESS,[Nh]:i.LEQUAL,[Md]:i.EQUAL,[Ed]:i.GEQUAL,[Sd]:i.GREATER,[bd]:i.NOTEQUAL};function rt(R,M){if(M.type===Pn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===_n||M.magFilter===Eo||M.magFilter===ir||M.magFilter===Ai||M.minFilter===_n||M.minFilter===Eo||M.minFilter===ir||M.minFilter===Ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Y[M.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Y[M.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Y[M.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,V[M.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,V[M.minFilter]),M.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Z[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ze||M.minFilter!==ir&&M.minFilter!==Ai||M.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function wt(R,M){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",F));const st=M.source;let ot=d.get(st);ot===void 0&&(ot={},d.set(st,ot));const et=N(M);if(et!==R.__cacheKey){ot[et]===void 0&&(ot[et]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,G=!0),ot[et].usedTimes++;const Rt=ot[R.__cacheKey];Rt!==void 0&&(ot[R.__cacheKey].usedTimes--,Rt.usedTimes===0&&I(M)),R.__cacheKey=et,R.__webglTexture=ot[et].texture}return G}function Nt(R,M,G){let st=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(st=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(st=i.TEXTURE_3D);const ot=wt(R,M),et=M.source;e.bindTexture(st,R.__webglTexture,i.TEXTURE0+G);const Rt=n.get(et);if(et.version!==Rt.__version||ot===!0){e.activeTexture(i.TEXTURE0+G);const pt=ce.getPrimaries(ce.workingColorSpace),St=M.colorSpace===si?null:ce.getPrimaries(M.colorSpace),Ht=M.colorSpace===si||pt===St?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ht);let ct=_(M.image,!1,s.maxTextureSize);ct=It(M,ct);const xt=r.convert(M.format,M.colorSpace),Yt=r.convert(M.type);let vt=y(M.internalFormat,xt,Yt,M.colorSpace,M.isVideoTexture);rt(st,M);let gt;const Ft=M.mipmaps,Bt=M.isVideoTexture!==!0,ne=Rt.__version===void 0||ot===!0,O=et.dataReady,lt=S(M,ct);if(M.isDepthTexture)vt=v(M.format===vs,M.type),ne&&(Bt?e.texStorage2D(i.TEXTURE_2D,1,vt,ct.width,ct.height):e.texImage2D(i.TEXTURE_2D,0,vt,ct.width,ct.height,0,xt,Yt,null));else if(M.isDataTexture)if(Ft.length>0){Bt&&ne&&e.texStorage2D(i.TEXTURE_2D,lt,vt,Ft[0].width,Ft[0].height);for(let T=0,P=Ft.length;T<P;T++)gt=Ft[T],Bt?O&&e.texSubImage2D(i.TEXTURE_2D,T,0,0,gt.width,gt.height,xt,Yt,gt.data):e.texImage2D(i.TEXTURE_2D,T,vt,gt.width,gt.height,0,xt,Yt,gt.data);M.generateMipmaps=!1}else Bt?(ne&&e.texStorage2D(i.TEXTURE_2D,lt,vt,ct.width,ct.height),O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ct.width,ct.height,xt,Yt,ct.data)):e.texImage2D(i.TEXTURE_2D,0,vt,ct.width,ct.height,0,xt,Yt,ct.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Bt&&ne&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,vt,Ft[0].width,Ft[0].height,ct.depth);for(let T=0,P=Ft.length;T<P;T++)if(gt=Ft[T],M.format!==Mn)if(xt!==null)if(Bt){if(O)if(M.layerUpdates.size>0){const k=Fl(gt.width,gt.height,M.format,M.type);for(const J of M.layerUpdates){const tt=gt.data.subarray(J*k/gt.data.BYTES_PER_ELEMENT,(J+1)*k/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,T,0,0,J,gt.width,gt.height,1,xt,tt,0,0)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,T,0,0,0,gt.width,gt.height,ct.depth,xt,gt.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,T,vt,gt.width,gt.height,ct.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?O&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,T,0,0,0,gt.width,gt.height,ct.depth,xt,Yt,gt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,T,vt,gt.width,gt.height,ct.depth,0,xt,Yt,gt.data)}else{Bt&&ne&&e.texStorage2D(i.TEXTURE_2D,lt,vt,Ft[0].width,Ft[0].height);for(let T=0,P=Ft.length;T<P;T++)gt=Ft[T],M.format!==Mn?xt!==null?Bt?O&&e.compressedTexSubImage2D(i.TEXTURE_2D,T,0,0,gt.width,gt.height,xt,gt.data):e.compressedTexImage2D(i.TEXTURE_2D,T,vt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?O&&e.texSubImage2D(i.TEXTURE_2D,T,0,0,gt.width,gt.height,xt,Yt,gt.data):e.texImage2D(i.TEXTURE_2D,T,vt,gt.width,gt.height,0,xt,Yt,gt.data)}else if(M.isDataArrayTexture)if(Bt){if(ne&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,vt,ct.width,ct.height,ct.depth),O)if(M.layerUpdates.size>0){const T=Fl(ct.width,ct.height,M.format,M.type);for(const P of M.layerUpdates){const k=ct.data.subarray(P*T/ct.data.BYTES_PER_ELEMENT,(P+1)*T/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,P,ct.width,ct.height,1,xt,Yt,k)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,xt,Yt,ct.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,vt,ct.width,ct.height,ct.depth,0,xt,Yt,ct.data);else if(M.isData3DTexture)Bt?(ne&&e.texStorage3D(i.TEXTURE_3D,lt,vt,ct.width,ct.height,ct.depth),O&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,xt,Yt,ct.data)):e.texImage3D(i.TEXTURE_3D,0,vt,ct.width,ct.height,ct.depth,0,xt,Yt,ct.data);else if(M.isFramebufferTexture){if(ne)if(Bt)e.texStorage2D(i.TEXTURE_2D,lt,vt,ct.width,ct.height);else{let T=ct.width,P=ct.height;for(let k=0;k<lt;k++)e.texImage2D(i.TEXTURE_2D,k,vt,T,P,0,xt,Yt,null),T>>=1,P>>=1}}else if(Ft.length>0){if(Bt&&ne){const T=kt(Ft[0]);e.texStorage2D(i.TEXTURE_2D,lt,vt,T.width,T.height)}for(let T=0,P=Ft.length;T<P;T++)gt=Ft[T],Bt?O&&e.texSubImage2D(i.TEXTURE_2D,T,0,0,xt,Yt,gt):e.texImage2D(i.TEXTURE_2D,T,vt,xt,Yt,gt);M.generateMipmaps=!1}else if(Bt){if(ne){const T=kt(ct);e.texStorage2D(i.TEXTURE_2D,lt,vt,T.width,T.height)}O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,xt,Yt,ct)}else e.texImage2D(i.TEXTURE_2D,0,vt,xt,Yt,ct);m(M)&&p(st),Rt.__version=et.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function $(R,M,G){if(M.image.length!==6)return;const st=wt(R,M),ot=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+G);const et=n.get(ot);if(ot.version!==et.__version||st===!0){e.activeTexture(i.TEXTURE0+G);const Rt=ce.getPrimaries(ce.workingColorSpace),pt=M.colorSpace===si?null:ce.getPrimaries(M.colorSpace),St=M.colorSpace===si||Rt===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const Ht=M.isCompressedTexture||M.image[0].isCompressedTexture,ct=M.image[0]&&M.image[0].isDataTexture,xt=[];for(let P=0;P<6;P++)!Ht&&!ct?xt[P]=_(M.image[P],!0,s.maxCubemapSize):xt[P]=ct?M.image[P].image:M.image[P],xt[P]=It(M,xt[P]);const Yt=xt[0],vt=r.convert(M.format,M.colorSpace),gt=r.convert(M.type),Ft=y(M.internalFormat,vt,gt,M.colorSpace),Bt=M.isVideoTexture!==!0,ne=et.__version===void 0||st===!0,O=ot.dataReady;let lt=S(M,Yt);rt(i.TEXTURE_CUBE_MAP,M);let T;if(Ht){Bt&&ne&&e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Ft,Yt.width,Yt.height);for(let P=0;P<6;P++){T=xt[P].mipmaps;for(let k=0;k<T.length;k++){const J=T[k];M.format!==Mn?vt!==null?Bt?O&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,k,0,0,J.width,J.height,vt,J.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,k,Ft,J.width,J.height,0,J.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,k,0,0,J.width,J.height,vt,gt,J.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,k,Ft,J.width,J.height,0,vt,gt,J.data)}}}else{if(T=M.mipmaps,Bt&&ne){T.length>0&&lt++;const P=kt(xt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Ft,P.width,P.height)}for(let P=0;P<6;P++)if(ct){Bt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0,0,0,xt[P].width,xt[P].height,vt,gt,xt[P].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0,Ft,xt[P].width,xt[P].height,0,vt,gt,xt[P].data);for(let k=0;k<T.length;k++){const tt=T[k].image[P].image;Bt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,k+1,0,0,tt.width,tt.height,vt,gt,tt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,k+1,Ft,tt.width,tt.height,0,vt,gt,tt.data)}}else{Bt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0,0,0,vt,gt,xt[P]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0,Ft,vt,gt,xt[P]);for(let k=0;k<T.length;k++){const J=T[k];Bt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,k+1,0,0,vt,gt,J.image[P]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,k+1,Ft,vt,gt,J.image[P])}}}m(M)&&p(i.TEXTURE_CUBE_MAP),et.__version=ot.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function at(R,M,G,st,ot,et){const Rt=r.convert(G.format,G.colorSpace),pt=r.convert(G.type),St=y(G.internalFormat,Rt,pt,G.colorSpace);if(!n.get(M).__hasExternalTextures){const ct=Math.max(1,M.width>>et),xt=Math.max(1,M.height>>et);ot===i.TEXTURE_3D||ot===i.TEXTURE_2D_ARRAY?e.texImage3D(ot,et,St,ct,xt,M.depth,0,Rt,pt,null):e.texImage2D(ot,et,St,ct,xt,0,Rt,pt,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),Ct(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,st,ot,n.get(G).__webglTexture,0,ee(M)):(ot===i.TEXTURE_2D||ot>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,st,ot,n.get(G).__webglTexture,et),e.bindFramebuffer(i.FRAMEBUFFER,null)}function it(R,M,G){if(i.bindRenderbuffer(i.RENDERBUFFER,R),M.depthBuffer){const st=M.depthTexture,ot=st&&st.isDepthTexture?st.type:null,et=v(M.stencilBuffer,ot),Rt=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=ee(M);Ct(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,et,M.width,M.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,et,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,et,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Rt,i.RENDERBUFFER,R)}else{const st=M.textures;for(let ot=0;ot<st.length;ot++){const et=st[ot],Rt=r.convert(et.format,et.colorSpace),pt=r.convert(et.type),St=y(et.internalFormat,Rt,pt,et.colorSpace),Ht=ee(M);G&&Ct(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht,St,M.width,M.height):Ct(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ht,St,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,St,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function nt(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),X(M.depthTexture,0);const st=n.get(M.depthTexture).__webglTexture,ot=ee(M);if(M.depthTexture.format===fs)Ct(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0);else if(M.depthTexture.format===vs)Ct(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function Ot(R){const M=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");nt(M.__webglFramebuffer,R)}else if(G){M.__webglDepthbuffer=[];for(let st=0;st<6;st++)e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[st]),M.__webglDepthbuffer[st]=i.createRenderbuffer(),it(M.__webglDepthbuffer[st],R,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),it(M.__webglDepthbuffer,R,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Vt(R,M,G){const st=n.get(R);M!==void 0&&at(st.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Ot(R)}function qt(R){const M=R.texture,G=n.get(R),st=n.get(M);R.addEventListener("dispose",w);const ot=R.textures,et=R.isWebGLCubeRenderTarget===!0,Rt=ot.length>1;if(Rt||(st.__webglTexture===void 0&&(st.__webglTexture=i.createTexture()),st.__version=M.version,o.memory.textures++),et){G.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[pt]=[];for(let St=0;St<M.mipmaps.length;St++)G.__webglFramebuffer[pt][St]=i.createFramebuffer()}else G.__webglFramebuffer[pt]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let pt=0;pt<M.mipmaps.length;pt++)G.__webglFramebuffer[pt]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(Rt)for(let pt=0,St=ot.length;pt<St;pt++){const Ht=n.get(ot[pt]);Ht.__webglTexture===void 0&&(Ht.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Ct(R)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let pt=0;pt<ot.length;pt++){const St=ot[pt];G.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[pt]);const Ht=r.convert(St.format,St.colorSpace),ct=r.convert(St.type),xt=y(St.internalFormat,Ht,ct,St.colorSpace,R.isXRRenderTarget===!0),Yt=ee(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Yt,xt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,G.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),it(G.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(et){e.bindTexture(i.TEXTURE_CUBE_MAP,st.__webglTexture),rt(i.TEXTURE_CUBE_MAP,M);for(let pt=0;pt<6;pt++)if(M.mipmaps&&M.mipmaps.length>0)for(let St=0;St<M.mipmaps.length;St++)at(G.__webglFramebuffer[pt][St],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,St);else at(G.__webglFramebuffer[pt],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(M)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Rt){for(let pt=0,St=ot.length;pt<St;pt++){const Ht=ot[pt],ct=n.get(Ht);e.bindTexture(i.TEXTURE_2D,ct.__webglTexture),rt(i.TEXTURE_2D,Ht),at(G.__webglFramebuffer,R,Ht,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,0),m(Ht)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let pt=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(pt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,st.__webglTexture),rt(pt,M),M.mipmaps&&M.mipmaps.length>0)for(let St=0;St<M.mipmaps.length;St++)at(G.__webglFramebuffer[St],R,M,i.COLOR_ATTACHMENT0,pt,St);else at(G.__webglFramebuffer,R,M,i.COLOR_ATTACHMENT0,pt,0);m(M)&&p(pt),e.unbindTexture()}R.depthBuffer&&Ot(R)}function me(R){const M=R.textures;for(let G=0,st=M.length;G<st;G++){const ot=M[G];if(m(ot)){const et=R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Rt=n.get(ot).__webglTexture;e.bindTexture(et,Rt),p(et),e.unbindTexture()}}}const L=[],ye=[];function te(R){if(R.samples>0){if(Ct(R)===!1){const M=R.textures,G=R.width,st=R.height;let ot=i.COLOR_BUFFER_BIT;const et=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Rt=n.get(R),pt=M.length>1;if(pt)for(let St=0;St<M.length;St++)e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let St=0;St<M.length;St++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ot|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ot|=i.STENCIL_BUFFER_BIT)),pt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[St]);const Ht=n.get(M[St]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ht,0)}i.blitFramebuffer(0,0,G,st,0,0,G,st,ot,i.NEAREST),c===!0&&(L.length=0,ye.length=0,L.push(i.COLOR_ATTACHMENT0+St),R.depthBuffer&&R.resolveDepthBuffer===!1&&(L.push(et),ye.push(et),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ye)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,L))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let St=0;St<M.length;St++){e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[St]);const Ht=n.get(M[St]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,Ht,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const M=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function ee(R){return Math.min(s.maxSamples,R.samples)}function Ct(R){const M=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function _e(R){const M=o.render.frame;h.get(R)!==M&&(h.set(R,M),R.update())}function It(R,M){const G=R.colorSpace,st=R.format,ot=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==ci&&G!==si&&(ce.getTransfer(G)===de?(st!==Mn||ot!==Yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),M}function kt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=U,this.resetTextureUnits=D,this.setTexture2D=X,this.setTexture2DArray=K,this.setTexture3D=q,this.setTextureCube=Q,this.rebindTextures=Vt,this.setupRenderTarget=qt,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=te,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=at,this.useMultisampledRTT=Ct}function Vg(i,t){function e(n,s=si){let r;const o=ce.getTransfer(s);if(n===Yn)return i.UNSIGNED_BYTE;if(n===pc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===mc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Rh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Th)return i.BYTE;if(n===Ah)return i.SHORT;if(n===$s)return i.UNSIGNED_SHORT;if(n===fc)return i.INT;if(n===Li)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===Qs)return i.HALF_FLOAT;if(n===Ch)return i.ALPHA;if(n===Ph)return i.RGB;if(n===Mn)return i.RGBA;if(n===Lh)return i.LUMINANCE;if(n===Dh)return i.LUMINANCE_ALPHA;if(n===fs)return i.DEPTH_COMPONENT;if(n===vs)return i.DEPTH_STENCIL;if(n===gc)return i.RED;if(n===_c)return i.RED_INTEGER;if(n===Ih)return i.RG;if(n===vc)return i.RG_INTEGER;if(n===xc)return i.RGBA_INTEGER;if(n===kr||n===Hr||n===Vr||n===Gr)if(o===de)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===kr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===kr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Gr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ta||n===Aa||n===Ra||n===Ca)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ta)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Aa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ra)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ca)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Pa||n===La||n===Da)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Pa||n===La)return o===de?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Da)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ia||n===Ua||n===Na||n===Oa||n===Fa||n===za||n===Ba||n===ka||n===Ha||n===Va||n===Ga||n===Wa||n===Xa||n===qa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ia)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ua)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Na)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Oa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===za)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ba)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ka)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ha)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Va)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ga)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Wa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Xa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===qa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Wr||n===Ya||n===$a)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Wr)return o===de?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ya)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$a)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Uh||n===Ka||n===Ja||n===Za)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Wr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ka)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ja)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Za)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_s?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Gg extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class jt extends pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wg={type:"move"};class Ko{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Wg)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new jt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Xg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Yg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new He,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new In({vertexShader:Xg,fragmentShader:qg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new yt(new An(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $g extends Ms{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=new Yg,m=e.getContextAttributes();let p=null,y=null;const v=[],S=[],F=new dt;let w=null;const A=new Je;A.layers.enable(1),A.viewport=new fe;const I=new Je;I.layers.enable(2),I.viewport=new fe;const b=[A,I],x=new Gg;x.layers.enable(1),x.layers.enable(2);let D=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let at=v[$];return at===void 0&&(at=new Ko,v[$]=at),at.getTargetRaySpace()},this.getControllerGrip=function($){let at=v[$];return at===void 0&&(at=new Ko,v[$]=at),at.getGripSpace()},this.getHand=function($){let at=v[$];return at===void 0&&(at=new Ko,v[$]=at),at.getHandSpace()};function N($){const at=S.indexOf($.inputSource);if(at===-1)return;const it=v[at];it!==void 0&&(it.update($.inputSource,$.frame,l||o),it.dispatchEvent({type:$.type,data:$.inputSource}))}function X(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",K);for(let $=0;$<v.length;$++){const at=S[$];at!==null&&(S[$]=null,v[$].disconnect(at))}D=null,U=null,_.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,y=null,Nt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(F.width,F.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",X),s.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(F),s.renderState.layers===void 0){const at={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,at),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Di(f.framebufferWidth,f.framebufferHeight,{format:Mn,type:Yn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let at=null,it=null,nt=null;m.depth&&(nt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=m.stencil?vs:fs,it=m.stencil?_s:Li);const Ot={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Ot),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new Di(d.textureWidth,d.textureHeight,{format:Mn,type:Yn,depthTexture:new Kh(d.textureWidth,d.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Nt.setContext(s),Nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function K($){for(let at=0;at<$.removed.length;at++){const it=$.removed[at],nt=S.indexOf(it);nt>=0&&(S[nt]=null,v[nt].disconnect(it))}for(let at=0;at<$.added.length;at++){const it=$.added[at];let nt=S.indexOf(it);if(nt===-1){for(let Vt=0;Vt<v.length;Vt++)if(Vt>=S.length){S.push(it),nt=Vt;break}else if(S[Vt]===null){S[Vt]=it,nt=Vt;break}if(nt===-1)break}const Ot=v[nt];Ot&&Ot.connect(it)}}const q=new C,Q=new C;function Y($,at,it){q.setFromMatrixPosition(at.matrixWorld),Q.setFromMatrixPosition(it.matrixWorld);const nt=q.distanceTo(Q),Ot=at.projectionMatrix.elements,Vt=it.projectionMatrix.elements,qt=Ot[14]/(Ot[10]-1),me=Ot[14]/(Ot[10]+1),L=(Ot[9]+1)/Ot[5],ye=(Ot[9]-1)/Ot[5],te=(Ot[8]-1)/Ot[0],ee=(Vt[8]+1)/Vt[0],Ct=qt*te,_e=qt*ee,It=nt/(-te+ee),kt=It*-te;at.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(kt),$.translateZ(It),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert();const R=qt+It,M=me+It,G=Ct-kt,st=_e+(nt-kt),ot=L*me/M*R,et=ye*me/M*R;$.projectionMatrix.makePerspective(G,st,ot,et,R,M),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}function V($,at){at===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(at.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;_.texture!==null&&($.near=_.depthNear,$.far=_.depthFar),x.near=I.near=A.near=$.near,x.far=I.far=A.far=$.far,(D!==x.near||U!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),D=x.near,U=x.far,A.near=D,A.far=U,I.near=D,I.far=U,A.updateProjectionMatrix(),I.updateProjectionMatrix(),$.updateProjectionMatrix());const at=$.parent,it=x.cameras;V(x,at);for(let nt=0;nt<it.length;nt++)V(it[nt],at);it.length===2?Y(x,A,I):x.projectionMatrix.copy(A.projectionMatrix),Z($,x,at)};function Z($,at,it){it===null?$.matrix.copy(at.matrixWorld):($.matrix.copy(it.matrixWorld),$.matrix.invert(),$.matrix.multiply(at.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(at.projectionMatrix),$.projectionMatrixInverse.copy(at.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ks*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function($){c=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let rt=null;function wt($,at){if(h=at.getViewerPose(l||o),g=at,h!==null){const it=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let nt=!1;it.length!==x.cameras.length&&(x.cameras.length=0,nt=!0);for(let Vt=0;Vt<it.length;Vt++){const qt=it[Vt];let me=null;if(f!==null)me=f.getViewport(qt);else{const ye=u.getViewSubImage(d,qt);me=ye.viewport,Vt===0&&(t.setRenderTargetTextures(y,ye.colorTexture,d.ignoreDepthValues?void 0:ye.depthStencilTexture),t.setRenderTarget(y))}let L=b[Vt];L===void 0&&(L=new Je,L.layers.enable(Vt),L.viewport=new fe,b[Vt]=L),L.matrix.fromArray(qt.transform.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale),L.projectionMatrix.fromArray(qt.projectionMatrix),L.projectionMatrixInverse.copy(L.projectionMatrix).invert(),L.viewport.set(me.x,me.y,me.width,me.height),Vt===0&&(x.matrix.copy(L.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),nt===!0&&x.cameras.push(L)}const Ot=s.enabledFeatures;if(Ot&&Ot.includes("depth-sensing")){const Vt=u.getDepthInformation(it[0]);Vt&&Vt.isValid&&Vt.texture&&_.init(t,Vt,s.renderState)}}for(let it=0;it<v.length;it++){const nt=S[it],Ot=v[it];nt!==null&&Ot!==void 0&&Ot.update(nt,at,l||o)}rt&&rt($,at),at.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:at}),g=null}const Nt=new Yh;Nt.setAnimationLoop(wt),this.setAnimationLoop=function($){rt=$},this.dispose=function(){}}}const gi=new bn,Kg=new le;function Jg(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Wh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,v,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,y,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Xe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Xe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),v=y.envMap,S=y.envMapRotation;v&&(m.envMap.value=v,gi.copy(S),gi.x*=-1,gi.y*=-1,gi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),m.envMapRotation.value.setFromMatrix4(Kg.makeRotationFromEuler(gi)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Zg(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,v){const S=v.program;n.uniformBlockBinding(y,S)}function l(y,v){let S=s[y.id];S===void 0&&(g(y),S=h(y),s[y.id]=S,y.addEventListener("dispose",m));const F=v.program;n.updateUBOMapping(y,F);const w=t.render.frame;r[y.id]!==w&&(d(y),r[y.id]=w)}function h(y){const v=u();y.__bindingPointIndex=v;const S=i.createBuffer(),F=y.__size,w=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,F,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,S),S}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const v=s[y.id],S=y.uniforms,F=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let w=0,A=S.length;w<A;w++){const I=Array.isArray(S[w])?S[w]:[S[w]];for(let b=0,x=I.length;b<x;b++){const D=I[b];if(f(D,w,b,F)===!0){const U=D.__offset,N=Array.isArray(D.value)?D.value:[D.value];let X=0;for(let K=0;K<N.length;K++){const q=N[K],Q=_(q);typeof q=="number"||typeof q=="boolean"?(D.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,U+X,D.__data)):q.isMatrix3?(D.__data[0]=q.elements[0],D.__data[1]=q.elements[1],D.__data[2]=q.elements[2],D.__data[3]=0,D.__data[4]=q.elements[3],D.__data[5]=q.elements[4],D.__data[6]=q.elements[5],D.__data[7]=0,D.__data[8]=q.elements[6],D.__data[9]=q.elements[7],D.__data[10]=q.elements[8],D.__data[11]=0):(q.toArray(D.__data,X),X+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,v,S,F){const w=y.value,A=v+"_"+S;if(F[A]===void 0)return typeof w=="number"||typeof w=="boolean"?F[A]=w:F[A]=w.clone(),!0;{const I=F[A];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return F[A]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function g(y){const v=y.uniforms;let S=0;const F=16;for(let A=0,I=v.length;A<I;A++){const b=Array.isArray(v[A])?v[A]:[v[A]];for(let x=0,D=b.length;x<D;x++){const U=b[x],N=Array.isArray(U.value)?U.value:[U.value];for(let X=0,K=N.length;X<K;X++){const q=N[X],Q=_(q),Y=S%F;Y!==0&&F-Y<Q.boundary&&(S+=F-Y),U.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=S,S+=Q.storage}}}const w=S%F;return w>0&&(S+=F-w),y.__size=S,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class tu{constructor(t={}){const{canvas:e=Vd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=$e,this.toneMapping=oi,this.toneMappingExposure=1;const v=this;let S=!1,F=0,w=0,A=null,I=-1,b=null;const x=new fe,D=new fe;let U=null;const N=new At(0);let X=0,K=e.width,q=e.height,Q=1,Y=null,V=null;const Z=new fe(0,0,K,q),rt=new fe(0,0,K,q);let wt=!1;const Nt=new Ec;let $=!1,at=!1;const it=new le,nt=new C,Ot=new fe,Vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qt=!1;function me(){return A===null?Q:1}let L=n;function ye(E,z){return e.getContext(E,z)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${lc}`),e.addEventListener("webglcontextlost",T,!1),e.addEventListener("webglcontextrestored",P,!1),e.addEventListener("webglcontextcreationerror",k,!1),L===null){const z="webgl2";if(L=ye(z,E),L===null)throw ye(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let te,ee,Ct,_e,It,kt,R,M,G,st,ot,et,Rt,pt,St,Ht,ct,xt,Yt,vt,gt,Ft,Bt,ne;function O(){te=new r0(L),te.init(),Ft=new Vg(L,te),ee=new Qm(L,te,t,Ft),Ct=new Bg(L),_e=new c0(L),It=new wg,kt=new Hg(L,te,Ct,It,ee,Ft,_e),R=new e0(v),M=new s0(v),G=new mf(L),Bt=new Zm(L,G),st=new o0(L,G,_e,Bt),ot=new h0(L,st,G,_e),Yt=new l0(L,ee,kt),Ht=new t0(It),et=new Eg(v,R,M,te,ee,Bt,Ht),Rt=new Jg(v,It),pt=new Ag,St=new Ig(te),xt=new Jm(v,R,M,Ct,ot,d,c),ct=new zg(v,ot,ee),ne=new Zg(L,_e,ee,Ct),vt=new jm(L,te,_e),gt=new a0(L,te,_e),_e.programs=et.programs,v.capabilities=ee,v.extensions=te,v.properties=It,v.renderLists=pt,v.shadowMap=ct,v.state=Ct,v.info=_e}O();const lt=new $g(v,L);this.xr=lt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const E=te.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=te.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(E){E!==void 0&&(Q=E,this.setSize(K,q,!1))},this.getSize=function(E){return E.set(K,q)},this.setSize=function(E,z,H=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=E,q=z,e.width=Math.floor(E*Q),e.height=Math.floor(z*Q),H===!0&&(e.style.width=E+"px",e.style.height=z+"px"),this.setViewport(0,0,E,z)},this.getDrawingBufferSize=function(E){return E.set(K*Q,q*Q).floor()},this.setDrawingBufferSize=function(E,z,H){K=E,q=z,Q=H,e.width=Math.floor(E*H),e.height=Math.floor(z*H),this.setViewport(0,0,E,z)},this.getCurrentViewport=function(E){return E.copy(x)},this.getViewport=function(E){return E.copy(Z)},this.setViewport=function(E,z,H,W){E.isVector4?Z.set(E.x,E.y,E.z,E.w):Z.set(E,z,H,W),Ct.viewport(x.copy(Z).multiplyScalar(Q).round())},this.getScissor=function(E){return E.copy(rt)},this.setScissor=function(E,z,H,W){E.isVector4?rt.set(E.x,E.y,E.z,E.w):rt.set(E,z,H,W),Ct.scissor(D.copy(rt).multiplyScalar(Q).round())},this.getScissorTest=function(){return wt},this.setScissorTest=function(E){Ct.setScissorTest(wt=E)},this.setOpaqueSort=function(E){Y=E},this.setTransparentSort=function(E){V=E},this.getClearColor=function(E){return E.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor.apply(xt,arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha.apply(xt,arguments)},this.clear=function(E=!0,z=!0,H=!0){let W=0;if(E){let B=!1;if(A!==null){const ut=A.texture.format;B=ut===xc||ut===vc||ut===_c}if(B){const ut=A.texture.type,Mt=ut===Yn||ut===Li||ut===$s||ut===_s||ut===pc||ut===mc,Et=xt.getClearColor(),Tt=xt.getClearAlpha(),Ut=Et.r,zt=Et.g,Dt=Et.b;Mt?(f[0]=Ut,f[1]=zt,f[2]=Dt,f[3]=Tt,L.clearBufferuiv(L.COLOR,0,f)):(g[0]=Ut,g[1]=zt,g[2]=Dt,g[3]=Tt,L.clearBufferiv(L.COLOR,0,g))}else W|=L.COLOR_BUFFER_BIT}z&&(W|=L.DEPTH_BUFFER_BIT),H&&(W|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",T,!1),e.removeEventListener("webglcontextrestored",P,!1),e.removeEventListener("webglcontextcreationerror",k,!1),pt.dispose(),St.dispose(),It.dispose(),R.dispose(),M.dispose(),ot.dispose(),Bt.dispose(),ne.dispose(),et.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",Lt),lt.removeEventListener("sessionend",ue),Kt.stop()};function T(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const E=_e.autoReset,z=ct.enabled,H=ct.autoUpdate,W=ct.needsUpdate,B=ct.type;O(),_e.autoReset=E,ct.enabled=z,ct.autoUpdate=H,ct.needsUpdate=W,ct.type=B}function k(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function J(E){const z=E.target;z.removeEventListener("dispose",J),tt(z)}function tt(E){_t(E),It.remove(E)}function _t(E){const z=It.get(E).programs;z!==void 0&&(z.forEach(function(H){et.releaseProgram(H)}),E.isShaderMaterial&&et.releaseShaderCache(E))}this.renderBufferDirect=function(E,z,H,W,B,ut){z===null&&(z=Vt);const Mt=B.isMesh&&B.matrixWorld.determinant()<0,Et=Pu(E,z,H,W,B);Ct.setMaterial(W,Mt);let Tt=H.index,Ut=1;if(W.wireframe===!0){if(Tt=st.getWireframeAttribute(H),Tt===void 0)return;Ut=2}const zt=H.drawRange,Dt=H.attributes.position;let ie=zt.start*Ut,Me=(zt.start+zt.count)*Ut;ut!==null&&(ie=Math.max(ie,ut.start*Ut),Me=Math.min(Me,(ut.start+ut.count)*Ut)),Tt!==null?(ie=Math.max(ie,0),Me=Math.min(Me,Tt.count)):Dt!=null&&(ie=Math.max(ie,0),Me=Math.min(Me,Dt.count));const Se=Me-ie;if(Se<0||Se===1/0)return;Bt.setup(B,W,Et,H,Tt);let tn,se=vt;if(Tt!==null&&(tn=G.get(Tt),se=gt,se.setIndex(tn)),B.isMesh)W.wireframe===!0?(Ct.setLineWidth(W.wireframeLinewidth*me()),se.setMode(L.LINES)):se.setMode(L.TRIANGLES);else if(B.isLine){let Pt=W.linewidth;Pt===void 0&&(Pt=1),Ct.setLineWidth(Pt*me()),B.isLineSegments?se.setMode(L.LINES):B.isLineLoop?se.setMode(L.LINE_LOOP):se.setMode(L.LINE_STRIP)}else B.isPoints?se.setMode(L.POINTS):B.isSprite&&se.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)se.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))se.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Pt=B._multiDrawStarts,Ne=B._multiDrawCounts,re=B._multiDrawCount,fn=Tt?G.get(Tt).bytesPerElement:1,zi=It.get(W).currentProgram.getUniforms();for(let en=0;en<re;en++)zi.setValue(L,"_gl_DrawID",en),se.render(Pt[en]/fn,Ne[en])}else if(B.isInstancedMesh)se.renderInstances(ie,Se,B.count);else if(H.isInstancedBufferGeometry){const Pt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Ne=Math.min(H.instanceCount,Pt);se.renderInstances(ie,Se,Ne)}else se.render(ie,Se)};function bt(E,z,H){E.transparent===!0&&E.side===rn&&E.forceSinglePass===!1?(E.side=Xe,E.needsUpdate=!0,hi(E,z,H),E.side=ai,E.needsUpdate=!0,hi(E,z,H),E.side=rn):hi(E,z,H)}this.compile=function(E,z,H=null){H===null&&(H=E),m=St.get(H),m.init(z),y.push(m),H.traverseVisible(function(B){B.isLight&&B.layers.test(z.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),E!==H&&E.traverseVisible(function(B){B.isLight&&B.layers.test(z.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights();const W=new Set;return E.traverse(function(B){const ut=B.material;if(ut)if(Array.isArray(ut))for(let Mt=0;Mt<ut.length;Mt++){const Et=ut[Mt];bt(Et,H,B),W.add(Et)}else bt(ut,H,B),W.add(ut)}),y.pop(),m=null,W},this.compileAsync=function(E,z,H=null){const W=this.compile(E,z,H);return new Promise(B=>{function ut(){if(W.forEach(function(Mt){It.get(Mt).currentProgram.isReady()&&W.delete(Mt)}),W.size===0){B(E);return}setTimeout(ut,10)}te.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let j=null;function ft(E){j&&j(E)}function Lt(){Kt.stop()}function ue(){Kt.start()}const Kt=new Yh;Kt.setAnimationLoop(ft),typeof self<"u"&&Kt.setContext(self),this.setAnimationLoop=function(E){j=E,lt.setAnimationLoop(E),E===null?Kt.stop():Kt.start()},lt.addEventListener("sessionstart",Lt),lt.addEventListener("sessionend",ue),this.render=function(E,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(z),z=lt.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,z,A),m=St.get(E,y.length),m.init(z),y.push(m),it.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Nt.setFromProjectionMatrix(it),at=this.localClippingEnabled,$=Ht.init(this.clippingPlanes,at),_=pt.get(E,p.length),_.init(),p.push(_),lt.enabled===!0&&lt.isPresenting===!0){const ut=v.xr.getDepthSensingMesh();ut!==null&&oe(ut,z,-1/0,v.sortObjects)}oe(E,z,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(Y,V),qt=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,qt&&xt.addToRenderList(_,E),this.info.render.frame++,$===!0&&Ht.beginShadows();const H=m.state.shadowsArray;ct.render(H,E,z),$===!0&&Ht.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=_.opaque,B=_.transmissive;if(m.setupLights(),z.isArrayCamera){const ut=z.cameras;if(B.length>0)for(let Mt=0,Et=ut.length;Mt<Et;Mt++){const Tt=ut[Mt];ws(W,B,E,Tt)}qt&&xt.render(E);for(let Mt=0,Et=ut.length;Mt<Et;Mt++){const Tt=ut[Mt];Qe(_,E,Tt,Tt.viewport)}}else B.length>0&&ws(W,B,E,z),qt&&xt.render(E),Qe(_,E,z);A!==null&&(kt.updateMultisampleRenderTarget(A),kt.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(v,E,z),Bt.resetDefaultState(),I=-1,b=null,y.pop(),y.length>0?(m=y[y.length-1],$===!0&&Ht.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function oe(E,z,H,W){if(E.visible===!1)return;if(E.layers.test(z.layers)){if(E.isGroup)H=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(z);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Nt.intersectsSprite(E)){W&&Ot.setFromMatrixPosition(E.matrixWorld).applyMatrix4(it);const Mt=ot.update(E),Et=E.material;Et.visible&&_.push(E,Mt,Et,H,Ot.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Nt.intersectsObject(E))){const Mt=ot.update(E),Et=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ot.copy(E.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),Ot.copy(Mt.boundingSphere.center)),Ot.applyMatrix4(E.matrixWorld).applyMatrix4(it)),Array.isArray(Et)){const Tt=Mt.groups;for(let Ut=0,zt=Tt.length;Ut<zt;Ut++){const Dt=Tt[Ut],ie=Et[Dt.materialIndex];ie&&ie.visible&&_.push(E,Mt,ie,H,Ot.z,Dt)}}else Et.visible&&_.push(E,Mt,Et,H,Ot.z,null)}}const ut=E.children;for(let Mt=0,Et=ut.length;Mt<Et;Mt++)oe(ut[Mt],z,H,W)}function Qe(E,z,H,W){const B=E.opaque,ut=E.transmissive,Mt=E.transparent;m.setupLightsView(H),$===!0&&Ht.setGlobalState(v.clippingPlanes,H),W&&Ct.viewport(x.copy(W)),B.length>0&&Nn(B,z,H),ut.length>0&&Nn(ut,z,H),Mt.length>0&&Nn(Mt,z,H),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function ws(E,z,H,W){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[W.id]===void 0&&(m.state.transmissionRenderTarget[W.id]=new Di(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?Qs:Yn,minFilter:Ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ce.workingColorSpace}));const ut=m.state.transmissionRenderTarget[W.id],Mt=W.viewport||x;ut.setSize(Mt.z,Mt.w);const Et=v.getRenderTarget();v.setRenderTarget(ut),v.getClearColor(N),X=v.getClearAlpha(),X<1&&v.setClearColor(16777215,.5),qt?xt.render(H):v.clear();const Tt=v.toneMapping;v.toneMapping=oi;const Ut=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),m.setupLightsView(W),$===!0&&Ht.setGlobalState(v.clippingPlanes,W),Nn(E,H,W),kt.updateMultisampleRenderTarget(ut),kt.updateRenderTargetMipmap(ut),te.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let Dt=0,ie=z.length;Dt<ie;Dt++){const Me=z[Dt],Se=Me.object,tn=Me.geometry,se=Me.material,Pt=Me.group;if(se.side===rn&&Se.layers.test(W.layers)){const Ne=se.side;se.side=Xe,se.needsUpdate=!0,Ts(Se,H,W,tn,se,Pt),se.side=Ne,se.needsUpdate=!0,zt=!0}}zt===!0&&(kt.updateMultisampleRenderTarget(ut),kt.updateRenderTargetMipmap(ut))}v.setRenderTarget(Et),v.setClearColor(N,X),Ut!==void 0&&(W.viewport=Ut),v.toneMapping=Tt}function Nn(E,z,H){const W=z.isScene===!0?z.overrideMaterial:null;for(let B=0,ut=E.length;B<ut;B++){const Mt=E[B],Et=Mt.object,Tt=Mt.geometry,Ut=W===null?Mt.material:W,zt=Mt.group;Et.layers.test(H.layers)&&Ts(Et,z,H,Tt,Ut,zt)}}function Ts(E,z,H,W,B,ut){E.onBeforeRender(v,z,H,W,B,ut),E.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),B.transparent===!0&&B.side===rn&&B.forceSinglePass===!1?(B.side=Xe,B.needsUpdate=!0,v.renderBufferDirect(H,z,W,B,E,ut),B.side=ai,B.needsUpdate=!0,v.renderBufferDirect(H,z,W,B,E,ut),B.side=rn):v.renderBufferDirect(H,z,W,B,E,ut),E.onAfterRender(v,z,H,W,B,ut)}function hi(E,z,H){z.isScene!==!0&&(z=Vt);const W=It.get(E),B=m.state.lights,ut=m.state.shadowsArray,Mt=B.state.version,Et=et.getParameters(E,B.state,ut,z,H),Tt=et.getProgramCacheKey(Et);let Ut=W.programs;W.environment=E.isMeshStandardMaterial?z.environment:null,W.fog=z.fog,W.envMap=(E.isMeshStandardMaterial?M:R).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?z.environmentRotation:E.envMapRotation,Ut===void 0&&(E.addEventListener("dispose",J),Ut=new Map,W.programs=Ut);let zt=Ut.get(Tt);if(zt!==void 0){if(W.currentProgram===zt&&W.lightsStateVersion===Mt)return As(E,Et),zt}else Et.uniforms=et.getUniforms(E),E.onBeforeCompile(Et,v),zt=et.acquireProgram(Et,Tt),Ut.set(Tt,zt),W.uniforms=Et.uniforms;const Dt=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Dt.clippingPlanes=Ht.uniform),As(E,Et),W.needsLights=Du(E),W.lightsStateVersion=Mt,W.needsLights&&(Dt.ambientLightColor.value=B.state.ambient,Dt.lightProbe.value=B.state.probe,Dt.directionalLights.value=B.state.directional,Dt.directionalLightShadows.value=B.state.directionalShadow,Dt.spotLights.value=B.state.spot,Dt.spotLightShadows.value=B.state.spotShadow,Dt.rectAreaLights.value=B.state.rectArea,Dt.ltc_1.value=B.state.rectAreaLTC1,Dt.ltc_2.value=B.state.rectAreaLTC2,Dt.pointLights.value=B.state.point,Dt.pointLightShadows.value=B.state.pointShadow,Dt.hemisphereLights.value=B.state.hemi,Dt.directionalShadowMap.value=B.state.directionalShadowMap,Dt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Dt.spotShadowMap.value=B.state.spotShadowMap,Dt.spotLightMatrix.value=B.state.spotLightMatrix,Dt.spotLightMap.value=B.state.spotLightMap,Dt.pointShadowMap.value=B.state.pointShadowMap,Dt.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=zt,W.uniformsList=null,zt}function Fi(E){if(E.uniformsList===null){const z=E.currentProgram.getUniforms();E.uniformsList=Xr.seqWithValue(z.seq,E.uniforms)}return E.uniformsList}function As(E,z){const H=It.get(E);H.outputColorSpace=z.outputColorSpace,H.batching=z.batching,H.batchingColor=z.batchingColor,H.instancing=z.instancing,H.instancingColor=z.instancingColor,H.instancingMorph=z.instancingMorph,H.skinning=z.skinning,H.morphTargets=z.morphTargets,H.morphNormals=z.morphNormals,H.morphColors=z.morphColors,H.morphTargetsCount=z.morphTargetsCount,H.numClippingPlanes=z.numClippingPlanes,H.numIntersection=z.numClipIntersection,H.vertexAlphas=z.vertexAlphas,H.vertexTangents=z.vertexTangents,H.toneMapping=z.toneMapping}function Pu(E,z,H,W,B){z.isScene!==!0&&(z=Vt),kt.resetTextureUnits();const ut=z.fog,Mt=W.isMeshStandardMaterial?z.environment:null,Et=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ci,Tt=(W.isMeshStandardMaterial?M:R).get(W.envMap||Mt),Ut=W.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,zt=!!H.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Dt=!!H.morphAttributes.position,ie=!!H.morphAttributes.normal,Me=!!H.morphAttributes.color;let Se=oi;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Se=v.toneMapping);const tn=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,se=tn!==void 0?tn.length:0,Pt=It.get(W),Ne=m.state.lights;if($===!0&&(at===!0||E!==b)){const cn=E===b&&W.id===I;Ht.setState(W,E,cn)}let re=!1;W.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==Ne.state.version||Pt.outputColorSpace!==Et||B.isBatchedMesh&&Pt.batching===!1||!B.isBatchedMesh&&Pt.batching===!0||B.isBatchedMesh&&Pt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Pt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Pt.instancing===!1||!B.isInstancedMesh&&Pt.instancing===!0||B.isSkinnedMesh&&Pt.skinning===!1||!B.isSkinnedMesh&&Pt.skinning===!0||B.isInstancedMesh&&Pt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Pt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Pt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Pt.instancingMorph===!1&&B.morphTexture!==null||Pt.envMap!==Tt||W.fog===!0&&Pt.fog!==ut||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==Ht.numPlanes||Pt.numIntersection!==Ht.numIntersection)||Pt.vertexAlphas!==Ut||Pt.vertexTangents!==zt||Pt.morphTargets!==Dt||Pt.morphNormals!==ie||Pt.morphColors!==Me||Pt.toneMapping!==Se||Pt.morphTargetsCount!==se)&&(re=!0):(re=!0,Pt.__version=W.version);let fn=Pt.currentProgram;re===!0&&(fn=hi(W,z,B));let zi=!1,en=!1,Mo=!1;const be=fn.getUniforms(),Kn=Pt.uniforms;if(Ct.useProgram(fn.program)&&(zi=!0,en=!0,Mo=!0),W.id!==I&&(I=W.id,en=!0),zi||b!==E){be.setValue(L,"projectionMatrix",E.projectionMatrix),be.setValue(L,"viewMatrix",E.matrixWorldInverse);const cn=be.map.cameraPosition;cn!==void 0&&cn.setValue(L,nt.setFromMatrixPosition(E.matrixWorld)),ee.logarithmicDepthBuffer&&be.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&be.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,en=!0,Mo=!0)}if(B.isSkinnedMesh){be.setOptional(L,B,"bindMatrix"),be.setOptional(L,B,"bindMatrixInverse");const cn=B.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),be.setValue(L,"boneTexture",cn.boneTexture,kt))}B.isBatchedMesh&&(be.setOptional(L,B,"batchingTexture"),be.setValue(L,"batchingTexture",B._matricesTexture,kt),be.setOptional(L,B,"batchingIdTexture"),be.setValue(L,"batchingIdTexture",B._indirectTexture,kt),be.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&be.setValue(L,"batchingColorTexture",B._colorsTexture,kt));const So=H.morphAttributes;if((So.position!==void 0||So.normal!==void 0||So.color!==void 0)&&Yt.update(B,H,fn),(en||Pt.receiveShadow!==B.receiveShadow)&&(Pt.receiveShadow=B.receiveShadow,be.setValue(L,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Kn.envMap.value=Tt,Kn.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&z.environment!==null&&(Kn.envMapIntensity.value=z.environmentIntensity),en&&(be.setValue(L,"toneMappingExposure",v.toneMappingExposure),Pt.needsLights&&Lu(Kn,Mo),ut&&W.fog===!0&&Rt.refreshFogUniforms(Kn,ut),Rt.refreshMaterialUniforms(Kn,W,Q,q,m.state.transmissionRenderTarget[E.id]),Xr.upload(L,Fi(Pt),Kn,kt)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Xr.upload(L,Fi(Pt),Kn,kt),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&be.setValue(L,"center",B.center),be.setValue(L,"modelViewMatrix",B.modelViewMatrix),be.setValue(L,"normalMatrix",B.normalMatrix),be.setValue(L,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const cn=W.uniformsGroups;for(let bo=0,Iu=cn.length;bo<Iu;bo++){const kc=cn[bo];ne.update(kc,fn),ne.bind(kc,fn)}}return fn}function Lu(E,z){E.ambientLightColor.needsUpdate=z,E.lightProbe.needsUpdate=z,E.directionalLights.needsUpdate=z,E.directionalLightShadows.needsUpdate=z,E.pointLights.needsUpdate=z,E.pointLightShadows.needsUpdate=z,E.spotLights.needsUpdate=z,E.spotLightShadows.needsUpdate=z,E.rectAreaLights.needsUpdate=z,E.hemisphereLights.needsUpdate=z}function Du(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,z,H){It.get(E.texture).__webglTexture=z,It.get(E.depthTexture).__webglTexture=H;const W=It.get(E);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=H===void 0,W.__autoAllocateDepthBuffer||te.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,z){const H=It.get(E);H.__webglFramebuffer=z,H.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(E,z=0,H=0){A=E,F=z,w=H;let W=!0,B=null,ut=!1,Mt=!1;if(E){const Tt=It.get(E);Tt.__useDefaultFramebuffer!==void 0?(Ct.bindFramebuffer(L.FRAMEBUFFER,null),W=!1):Tt.__webglFramebuffer===void 0?kt.setupRenderTarget(E):Tt.__hasExternalTextures&&kt.rebindTextures(E,It.get(E.texture).__webglTexture,It.get(E.depthTexture).__webglTexture);const Ut=E.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(Mt=!0);const zt=It.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(zt[z])?B=zt[z][H]:B=zt[z],ut=!0):E.samples>0&&kt.useMultisampledRTT(E)===!1?B=It.get(E).__webglMultisampledFramebuffer:Array.isArray(zt)?B=zt[H]:B=zt,x.copy(E.viewport),D.copy(E.scissor),U=E.scissorTest}else x.copy(Z).multiplyScalar(Q).floor(),D.copy(rt).multiplyScalar(Q).floor(),U=wt;if(Ct.bindFramebuffer(L.FRAMEBUFFER,B)&&W&&Ct.drawBuffers(E,B),Ct.viewport(x),Ct.scissor(D),Ct.setScissorTest(U),ut){const Tt=It.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+z,Tt.__webglTexture,H)}else if(Mt){const Tt=It.get(E.texture),Ut=z||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Tt.__webglTexture,H||0,Ut)}I=-1},this.readRenderTargetPixels=function(E,z,H,W,B,ut,Mt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=It.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Mt!==void 0&&(Et=Et[Mt]),Et){Ct.bindFramebuffer(L.FRAMEBUFFER,Et);try{const Tt=E.texture,Ut=Tt.format,zt=Tt.type;if(!ee.textureFormatReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ee.textureTypeReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=E.width-W&&H>=0&&H<=E.height-B&&L.readPixels(z,H,W,B,Ft.convert(Ut),Ft.convert(zt),ut)}finally{const Tt=A!==null?It.get(A).__webglFramebuffer:null;Ct.bindFramebuffer(L.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(E,z,H,W,B,ut,Mt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=It.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Mt!==void 0&&(Et=Et[Mt]),Et){Ct.bindFramebuffer(L.FRAMEBUFFER,Et);try{const Tt=E.texture,Ut=Tt.format,zt=Tt.type;if(!ee.textureFormatReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ee.textureTypeReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=E.width-W&&H>=0&&H<=E.height-B){const Dt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Dt),L.bufferData(L.PIXEL_PACK_BUFFER,ut.byteLength,L.STREAM_READ),L.readPixels(z,H,W,B,Ft.convert(Ut),Ft.convert(zt),0),L.flush();const ie=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);await Gd(L,ie,4);try{L.bindBuffer(L.PIXEL_PACK_BUFFER,Dt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ut)}finally{L.deleteBuffer(Dt),L.deleteSync(ie)}return ut}}finally{const Tt=A!==null?It.get(A).__webglFramebuffer:null;Ct.bindFramebuffer(L.FRAMEBUFFER,Tt)}}},this.copyFramebufferToTexture=function(E,z=null,H=0){E.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,E=arguments[1]);const W=Math.pow(2,-H),B=Math.floor(E.image.width*W),ut=Math.floor(E.image.height*W),Mt=z!==null?z.x:0,Et=z!==null?z.y:0;kt.setTexture2D(E,0),L.copyTexSubImage2D(L.TEXTURE_2D,H,0,0,Mt,Et,B,ut),Ct.unbindTexture()},this.copyTextureToTexture=function(E,z,H=null,W=null,B=0){E.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,E=arguments[1],z=arguments[2],B=arguments[3]||0,H=null);let ut,Mt,Et,Tt,Ut,zt;H!==null?(ut=H.max.x-H.min.x,Mt=H.max.y-H.min.y,Et=H.min.x,Tt=H.min.y):(ut=E.image.width,Mt=E.image.height,Et=0,Tt=0),W!==null?(Ut=W.x,zt=W.y):(Ut=0,zt=0);const Dt=Ft.convert(z.format),ie=Ft.convert(z.type);kt.setTexture2D(z,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,z.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,z.unpackAlignment);const Me=L.getParameter(L.UNPACK_ROW_LENGTH),Se=L.getParameter(L.UNPACK_IMAGE_HEIGHT),tn=L.getParameter(L.UNPACK_SKIP_PIXELS),se=L.getParameter(L.UNPACK_SKIP_ROWS),Pt=L.getParameter(L.UNPACK_SKIP_IMAGES),Ne=E.isCompressedTexture?E.mipmaps[B]:E.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,Ne.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ne.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Et),L.pixelStorei(L.UNPACK_SKIP_ROWS,Tt),E.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,B,Ut,zt,ut,Mt,Dt,ie,Ne.data):E.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,B,Ut,zt,Ne.width,Ne.height,Dt,Ne.data):L.texSubImage2D(L.TEXTURE_2D,B,Ut,zt,ut,Mt,Dt,ie,Ne),L.pixelStorei(L.UNPACK_ROW_LENGTH,Me),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Se),L.pixelStorei(L.UNPACK_SKIP_PIXELS,tn),L.pixelStorei(L.UNPACK_SKIP_ROWS,se),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Pt),B===0&&z.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),Ct.unbindTexture()},this.copyTextureToTexture3D=function(E,z,H=null,W=null,B=0){E.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,W=arguments[1]||null,E=arguments[2],z=arguments[3],B=arguments[4]||0);let ut,Mt,Et,Tt,Ut,zt,Dt,ie,Me;const Se=E.isCompressedTexture?E.mipmaps[B]:E.image;H!==null?(ut=H.max.x-H.min.x,Mt=H.max.y-H.min.y,Et=H.max.z-H.min.z,Tt=H.min.x,Ut=H.min.y,zt=H.min.z):(ut=Se.width,Mt=Se.height,Et=Se.depth,Tt=0,Ut=0,zt=0),W!==null?(Dt=W.x,ie=W.y,Me=W.z):(Dt=0,ie=0,Me=0);const tn=Ft.convert(z.format),se=Ft.convert(z.type);let Pt;if(z.isData3DTexture)kt.setTexture3D(z,0),Pt=L.TEXTURE_3D;else if(z.isDataArrayTexture||z.isCompressedArrayTexture)kt.setTexture2DArray(z,0),Pt=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,z.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,z.unpackAlignment);const Ne=L.getParameter(L.UNPACK_ROW_LENGTH),re=L.getParameter(L.UNPACK_IMAGE_HEIGHT),fn=L.getParameter(L.UNPACK_SKIP_PIXELS),zi=L.getParameter(L.UNPACK_SKIP_ROWS),en=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Se.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Se.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Tt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ut),L.pixelStorei(L.UNPACK_SKIP_IMAGES,zt),E.isDataTexture||E.isData3DTexture?L.texSubImage3D(Pt,B,Dt,ie,Me,ut,Mt,Et,tn,se,Se.data):z.isCompressedArrayTexture?L.compressedTexSubImage3D(Pt,B,Dt,ie,Me,ut,Mt,Et,tn,Se.data):L.texSubImage3D(Pt,B,Dt,ie,Me,ut,Mt,Et,tn,se,Se),L.pixelStorei(L.UNPACK_ROW_LENGTH,Ne),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,re),L.pixelStorei(L.UNPACK_SKIP_PIXELS,fn),L.pixelStorei(L.UNPACK_SKIP_ROWS,zi),L.pixelStorei(L.UNPACK_SKIP_IMAGES,en),B===0&&z.generateMipmaps&&L.generateMipmap(Pt),Ct.unbindTexture()},this.initRenderTarget=function(E){It.get(E).__webglFramebuffer===void 0&&kt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?kt.setTextureCube(E,0):E.isData3DTexture?kt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?kt.setTexture2DArray(E,0):kt.setTexture2D(E,0),Ct.unbindTexture()},this.resetState=function(){F=0,w=0,A=null,Ct.reset(),Bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Mc?"display-p3":"srgb",e.unpackColorSpace=ce.workingColorSpace===uo?"display-p3":"srgb"}}class Tc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new At(t),this.near=e,this.far=n}clone(){return new Tc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class eu extends pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class jg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ja,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Ln()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return bc("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ve=new C;class so{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=vn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=vn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=vn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=vn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array),r=ae(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new an(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new so(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Gs extends li{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new At(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ns;const Ds=new C,is=new C,ss=new C,rs=new dt,Is=new dt,nu=new le,wr=new C,Us=new C,Tr=new C,zl=new dt,Jo=new dt,Bl=new dt;class qr extends pe{constructor(t=new Gs){if(super(),this.isSprite=!0,this.type="Sprite",ns===void 0){ns=new Ue;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new jg(e,5);ns.setIndex([0,1,2,0,2,3]),ns.setAttribute("position",new so(n,3,0,!1)),ns.setAttribute("uv",new so(n,2,3,!1))}this.geometry=ns,this.material=t,this.center=new dt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),is.setFromMatrixScale(this.matrixWorld),nu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ss.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&is.multiplyScalar(-ss.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Ar(wr.set(-.5,-.5,0),ss,o,is,s,r),Ar(Us.set(.5,-.5,0),ss,o,is,s,r),Ar(Tr.set(.5,.5,0),ss,o,is,s,r),zl.set(0,0),Jo.set(1,0),Bl.set(1,1);let a=t.ray.intersectTriangle(wr,Us,Tr,!1,Ds);if(a===null&&(Ar(Us.set(-.5,.5,0),ss,o,is,s,r),Jo.set(0,1),a=t.ray.intersectTriangle(wr,Tr,Us,!1,Ds),a===null))return;const c=t.ray.origin.distanceTo(Ds);c<t.near||c>t.far||e.push({distance:c,point:Ds.clone(),uv:xn.getInterpolation(Ds,wr,Us,Tr,zl,Jo,Bl,new dt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Ar(i,t,e,n,s,r){rs.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Is.x=r*rs.x-s*rs.y,Is.y=s*rs.x+r*rs.y):Is.copy(rs),i.copy(t),i.x+=Is.x,i.y+=Is.y,i.applyMatrix4(nu)}class Qg extends He{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Ze,h=Ze,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class kl extends an{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const os=new le,Hl=new le,Rr=[],Vl=new Ni,t_=new le,Ns=new yt,Os=new Ss;class wn extends yt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new kl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,t_)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ni),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,os),Vl.copy(t.boundingBox).applyMatrix4(os),this.boundingBox.union(Vl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ss),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,os),Os.copy(t.boundingSphere).applyMatrix4(os),this.boundingSphere.union(Os)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ns.geometry=this.geometry,Ns.material=this.material,Ns.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Os.copy(this.boundingSphere),Os.applyMatrix4(n),t.ray.intersectsSphere(Os)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,os),Hl.multiplyMatrices(n,os),Ns.matrixWorld=Hl,Ns.raycast(t,Rr);for(let o=0,a=Rr.length;o<a;o++){const c=Rr[o];c.instanceId=r,c.object=this,e.push(c)}Rr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new kl(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qg(new Float32Array(s*this.count),s,this.count,gc,Pn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class iu extends li{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new At(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Gl=new le,tc=new Bh,Cr=new Ss,Pr=new C;class e_ extends pe{constructor(t=new Ue,e=new iu){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(s),Cr.radius+=r,t.ray.intersectsSphere(Cr)===!1)return;Gl.copy(s).invert(),tc.copy(t.ray).applyMatrix4(Gl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const m=l.getX(g);Pr.fromBufferAttribute(u,m),Wl(Pr,m,c,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)Pr.fromBufferAttribute(u,g),Wl(Pr,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Wl(i,t,e,n,s,r,o){const a=tc.distanceSqToPoint(i);if(a<e){const c=new C;tc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,object:o})}}class Oi extends He{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Un{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new dt:new C);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new C,s=[],r=[],o=[],a=new C,c=new le;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new C)}r[0]=new C,o[0]=new C;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ie(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ie(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ac extends Un{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new dt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class n_ extends Ac{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Rc(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Lr=new C,Zo=new Rc,jo=new Rc,Qo=new Rc;class i_ extends Un{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new C){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Lr.subVectors(s[0],s[1]).add(s[0]),l=Lr);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Lr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Lr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Zo.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),jo.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),Qo.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Zo.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),jo.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Qo.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Zo.calc(c),jo.calc(c),Qo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new C().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Xl(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function s_(i,t){const e=1-i;return e*e*t}function r_(i,t){return 2*(1-i)*i*t}function o_(i,t){return i*i*t}function Ws(i,t,e,n){return s_(i,t)+r_(i,e)+o_(i,n)}function a_(i,t){const e=1-i;return e*e*e*t}function c_(i,t){const e=1-i;return 3*e*e*i*t}function l_(i,t){return 3*(1-i)*i*i*t}function h_(i,t){return i*i*i*t}function Xs(i,t,e,n,s){return a_(i,t)+c_(i,e)+l_(i,n)+h_(i,s)}class su extends Un{constructor(t=new dt,e=new dt,n=new dt,s=new dt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new dt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Xs(t,s.x,r.x,o.x,a.x),Xs(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class u_ extends Un{constructor(t=new C,e=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Xs(t,s.x,r.x,o.x,a.x),Xs(t,s.y,r.y,o.y,a.y),Xs(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ru extends Un{constructor(t=new dt,e=new dt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new dt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new dt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class d_ extends Un{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ou extends Un{constructor(t=new dt,e=new dt,n=new dt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new dt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Ws(t,s.x,r.x,o.x),Ws(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class f_ extends Un{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Ws(t,s.x,r.x,o.x),Ws(t,s.y,r.y,o.y),Ws(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class au extends Un{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new dt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Xl(a,c.x,l.x,h.x,u.x),Xl(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new dt().fromArray(s))}return this}}var ql=Object.freeze({__proto__:null,ArcCurve:n_,CatmullRomCurve3:i_,CubicBezierCurve:su,CubicBezierCurve3:u_,EllipseCurve:Ac,LineCurve:ru,LineCurve3:d_,QuadraticBezierCurve:ou,QuadraticBezierCurve3:f_,SplineCurve:au});class p_ extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ql[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new ql[s.type]().fromJSON(s))}return this}}class ec extends p_{constructor(t){super(),this.type="Path",this.currentPoint=new dt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new ru(this.currentPoint.clone(),new dt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new ou(this.currentPoint.clone(),new dt(t,e),new dt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new su(this.currentPoint.clone(),new dt(t,e),new dt(n,s),new dt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new au(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new Ac(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Cc extends Ue{constructor(t=[new dt(0,-.5),new dt(.5,0),new dt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ie(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],h=1/e,u=new C,d=new dt,f=new C,g=new C,_=new C;let m=0,p=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let y=0;y<=e;y++){const v=n+y*h*s,S=Math.sin(v),F=Math.cos(v);for(let w=0;w<=t.length-1;w++){u.x=t[w].x*S,u.y=t[w].y,u.z=t[w].x*F,o.push(u.x,u.y,u.z),d.x=y/e,d.y=w/(t.length-1),a.push(d.x,d.y);const A=c[3*w+0]*S,I=c[3*w+1],b=c[3*w+0]*F;l.push(A,I,b)}}for(let y=0;y<e;y++)for(let v=0;v<t.length-1;v++){const S=v+y*t.length,F=S,w=S+t.length,A=S+t.length+1,I=S+1;r.push(F,w,I),r.push(A,I,w)}this.setIndex(r),this.setAttribute("position",new Qt(o,3)),this.setAttribute("uv",new Qt(a,2)),this.setAttribute("normal",new Qt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cc(t.points,t.segments,t.phiStart,t.phiLength)}}class Pc extends Cc{constructor(t=1,e=1,n=4,s=8){const r=new ec;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new Pc(t.radius,t.length,t.capSegments,t.radialSegments)}}class po extends Ue{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new C,h=new dt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Qt(o,3)),this.setAttribute("normal",new Qt(a,3)),this.setAttribute("uv",new Qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new po(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Be extends Ue{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;y(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Qt(u,3)),this.setAttribute("normal",new Qt(d,3)),this.setAttribute("uv",new Qt(f,2));function y(){const S=new C,F=new C;let w=0;const A=(e-t)/n;for(let I=0;I<=r;I++){const b=[],x=I/r,D=x*(e-t)+t;for(let U=0;U<=s;U++){const N=U/s,X=N*c+a,K=Math.sin(X),q=Math.cos(X);F.x=D*K,F.y=-x*n+m,F.z=D*q,u.push(F.x,F.y,F.z),S.set(K,A,q).normalize(),d.push(S.x,S.y,S.z),f.push(N,1-x),b.push(g++)}_.push(b)}for(let I=0;I<s;I++)for(let b=0;b<r;b++){const x=_[b][I],D=_[b+1][I],U=_[b+1][I+1],N=_[b][I+1];h.push(x,D,N),h.push(D,U,N),w+=6}l.addGroup(p,w,0),p+=w}function v(S){const F=g,w=new dt,A=new C;let I=0;const b=S===!0?t:e,x=S===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,m*x,0),d.push(0,x,0),f.push(.5,.5),g++;const D=g;for(let U=0;U<=s;U++){const X=U/s*c+a,K=Math.cos(X),q=Math.sin(X);A.x=b*q,A.y=m*x,A.z=b*K,u.push(A.x,A.y,A.z),d.push(0,x,0),w.x=K*.5+.5,w.y=q*.5*x+.5,f.push(w.x,w.y),g++}for(let U=0;U<s;U++){const N=F+U,X=D+U;S===!0?h.push(X,X+1,N):h.push(X+1,X,N),I+=3}l.addGroup(p,I,S===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Be(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Rn extends Be{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Rn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class tr extends Ue{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new Qt(r,3)),this.setAttribute("normal",new Qt(r.slice(),3)),this.setAttribute("uv",new Qt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const v=new C,S=new C,F=new C;for(let w=0;w<e.length;w+=3)f(e[w+0],v),f(e[w+1],S),f(e[w+2],F),c(v,S,F,y)}function c(y,v,S,F){const w=F+1,A=[];for(let I=0;I<=w;I++){A[I]=[];const b=y.clone().lerp(S,I/w),x=v.clone().lerp(S,I/w),D=w-I;for(let U=0;U<=D;U++)U===0&&I===w?A[I][U]=b:A[I][U]=b.clone().lerp(x,U/D)}for(let I=0;I<w;I++)for(let b=0;b<2*(w-I)-1;b++){const x=Math.floor(b/2);b%2===0?(d(A[I][x+1]),d(A[I+1][x]),d(A[I][x])):(d(A[I][x+1]),d(A[I+1][x+1]),d(A[I+1][x]))}}function l(y){const v=new C;for(let S=0;S<r.length;S+=3)v.x=r[S+0],v.y=r[S+1],v.z=r[S+2],v.normalize().multiplyScalar(y),r[S+0]=v.x,r[S+1]=v.y,r[S+2]=v.z}function h(){const y=new C;for(let v=0;v<r.length;v+=3){y.x=r[v+0],y.y=r[v+1],y.z=r[v+2];const S=m(y)/2/Math.PI+.5,F=p(y)/Math.PI+.5;o.push(S,1-F)}g(),u()}function u(){for(let y=0;y<o.length;y+=6){const v=o[y+0],S=o[y+2],F=o[y+4],w=Math.max(v,S,F),A=Math.min(v,S,F);w>.9&&A<.1&&(v<.2&&(o[y+0]+=1),S<.2&&(o[y+2]+=1),F<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,v){const S=y*3;v.x=t[S+0],v.y=t[S+1],v.z=t[S+2]}function g(){const y=new C,v=new C,S=new C,F=new C,w=new dt,A=new dt,I=new dt;for(let b=0,x=0;b<r.length;b+=9,x+=6){y.set(r[b+0],r[b+1],r[b+2]),v.set(r[b+3],r[b+4],r[b+5]),S.set(r[b+6],r[b+7],r[b+8]),w.set(o[x+0],o[x+1]),A.set(o[x+2],o[x+3]),I.set(o[x+4],o[x+5]),F.copy(y).add(v).add(S).divideScalar(3);const D=m(F);_(w,x+0,y,D),_(A,x+2,v,D),_(I,x+4,S,D)}}function _(y,v,S,F){F<0&&y.x===1&&(o[v]=y.x-1),S.x===0&&S.z===0&&(o[v]=F/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tr(t.vertices,t.indices,t.radius,t.details)}}class ro extends tr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ro(t.radius,t.detail)}}class cu extends ec{constructor(t){super(t),this.uuid=Ln(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new ec().fromJSON(s))}return this}}const m_={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=lu(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=y_(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return Js(r,o,e,a,c,f,0),o}};function lu(i,t,e,n,s){let r,o;if(s===L_(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Yl(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Yl(r,i[r],i[r+1],o);return o&&mo(o,o.next)&&(js(o),o=o.next),o}function Ii(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(mo(e,e.next)||xe(e.prev,e,e.next)===0)){if(js(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Js(i,t,e,n,s,r,o){if(!i)return;!o&&r&&w_(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?__(i,n,s,r):g_(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),js(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=v_(Ii(i),t,e),Js(i,t,e,n,s,r,2)):o===2&&x_(i,t,e,n,s,r):Js(Ii(i),t,e,n,s,r,1);break}}}function g_(i){const t=i.prev,e=i,n=i.next;if(xe(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&hs(s,a,r,c,o,l,g.x,g.y)&&xe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function __(i,t,e,n){const s=i.prev,r=i,o=i.next;if(xe(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=nc(f,g,t,e,n),y=nc(_,m,t,e,n);let v=i.prevZ,S=i.nextZ;for(;v&&v.z>=p&&S&&S.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&hs(a,h,c,u,l,d,v.x,v.y)&&xe(v.prev,v,v.next)>=0||(v=v.prevZ,S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&hs(a,h,c,u,l,d,S.x,S.y)&&xe(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&hs(a,h,c,u,l,d,v.x,v.y)&&xe(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;S&&S.z<=y;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&hs(a,h,c,u,l,d,S.x,S.y)&&xe(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function v_(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!mo(s,r)&&hu(s,n,n.next,r)&&Zs(s,r)&&Zs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),js(n),js(n.next),n=i=r),n=n.next}while(n!==i);return Ii(n)}function x_(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&R_(o,a)){let c=uu(o,a);o=Ii(o,o.next),c=Ii(c,c.next),Js(o,t,e,n,s,r,0),Js(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function y_(i,t,e,n){const s=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=lu(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(A_(l));for(s.sort(M_),r=0;r<s.length;r++)e=S_(s[r],e);return e}function M_(i,t){return i.x-t.x}function S_(i,t){const e=b_(i,t);if(!e)return t;const n=uu(e,i);return Ii(n,n.next),Ii(e,e.next)}function b_(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&hs(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Zs(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&E_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function E_(i,t){return xe(i.prev,i,t.prev)<0&&xe(t.next,i,i.next)<0}function w_(i,t,e,n){let s=i;do s.z===0&&(s.z=nc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,T_(s)}function T_(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function nc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function A_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function hs(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function R_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!C_(i,t)&&(Zs(i,t)&&Zs(t,i)&&P_(i,t)&&(xe(i.prev,i,t.prev)||xe(i,t.prev,t))||mo(i,t)&&xe(i.prev,i,i.next)>0&&xe(t.prev,t,t.next)>0)}function xe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function mo(i,t){return i.x===t.x&&i.y===t.y}function hu(i,t,e,n){const s=Ir(xe(i,t,e)),r=Ir(xe(i,t,n)),o=Ir(xe(e,n,i)),a=Ir(xe(e,n,t));return!!(s!==r&&o!==a||s===0&&Dr(i,e,t)||r===0&&Dr(i,n,t)||o===0&&Dr(e,i,n)||a===0&&Dr(e,t,n))}function Dr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ir(i){return i>0?1:i<0?-1:0}function C_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&hu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Zs(i,t){return xe(i.prev,i,i.next)<0?xe(i,t,i.next)>=0&&xe(i,i.prev,t)>=0:xe(i,t,i.prev)<0||xe(i,i.next,t)<0}function P_(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function uu(i,t){const e=new ic(i.i,i.x,i.y),n=new ic(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Yl(i,t,e,n){const s=new ic(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function js(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ic(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function L_(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class qs{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return qs.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];$l(t),Kl(n,t);let o=t.length;e.forEach($l);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Kl(n,e[c]);const a=m_.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function $l(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Kl(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Lc extends tr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Lc(t.radius,t.detail)}}class go extends tr{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new go(t.radius,t.detail)}}class Dc extends Ue{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/s,f=new C,g=new dt;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const y=p+m,v=y,S=y+n+1,F=y+n+2,w=y+1;a.push(v,S,w),a.push(S,F,w)}}this.setIndex(a),this.setAttribute("position",new Qt(c,3)),this.setAttribute("normal",new Qt(l,3)),this.setAttribute("uv",new Qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dc(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ic extends Ue{constructor(t=new cu([new dt(0,.5),new dt(-.5,-.5),new dt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Qt(s,3)),this.setAttribute("normal",new Qt(r,3)),this.setAttribute("uv",new Qt(o,2));function l(h){const u=s.length/3,d=h.extractPoints(e);let f=d.shape;const g=d.holes;qs.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const y=g[m];qs.isClockWise(y)===!0&&(g[m]=y.reverse())}const _=qs.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const y=g[m];f=f.concat(y)}for(let m=0,p=f.length;m<p;m++){const y=f[m];s.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let m=0,p=_.length;m<p;m++){const y=_[m],v=y[0]+u,S=y[1]+u,F=y[2]+u;n.push(v,S,F),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return D_(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new Ic(n,t.curveSegments)}}function D_(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class on extends Ue{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new C,d=new C,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const y=[],v=p/n;let S=0;p===0&&o===0?S=.5/e:p===n&&c===Math.PI&&(S=-.5/e);for(let F=0;F<=e;F++){const w=F/e;u.x=-t*Math.cos(s+w*r)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(s+w*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(w+S,1-v),y.push(l++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const v=h[p][y+1],S=h[p][y],F=h[p+1][y],w=h[p+1][y+1];(p!==0||o>0)&&f.push(v,S,w),(p!==n-1||c<Math.PI)&&f.push(S,F,w)}this.setIndex(f),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new on(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class qn extends Ue{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const _=g/s*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,y=(s+1)*f+g;o.push(_,m,y),o.push(m,p,y)}this.setIndex(o),this.setAttribute("position",new Qt(a,3)),this.setAttribute("normal",new Qt(c,3)),this.setAttribute("uv",new Qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class he extends li{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new At(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new At(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yc,this.normalScale=new dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ta extends li{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new At(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new At(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yc,this.normalScale=new dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Uc extends pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new At(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class du extends Uc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new At(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ea=new le,Jl=new C,Zl=new C;class fu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new dt(512,512),this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ec,this._frameExtents=new dt(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Jl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Jl),Zl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Zl),e.updateMatrixWorld(),ea.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ea),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ea)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const jl=new le,Fs=new C,na=new C;class I_ extends fu{constructor(){super(new Je(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new dt(4,2),this._viewportCount=6,this._viewports=[new fe(2,1,1,1),new fe(0,1,1,1),new fe(3,1,1,1),new fe(1,1,1,1),new fe(3,0,1,1),new fe(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Fs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Fs),na.copy(n.position),na.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(na),n.updateMatrixWorld(),s.makeTranslation(-Fs.x,-Fs.y,-Fs.z),jl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jl)}}class U_ extends Uc{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new I_}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class N_ extends fu{constructor(){super(new $h(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yr extends Uc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.shadow=new N_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}let Ur;class O_{static getContext(){return Ur===void 0&&(Ur=new(window.AudioContext||window.webkitAudioContext)),Ur}static setContext(t){Ur=t}}class F_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ql(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Ql();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Ql(){return(typeof performance>"u"?Date:performance).now()}const _i=new C,th=new Ui,z_=new C,vi=new C;class B_ extends pe{constructor(){super(),this.type="AudioListener",this.context=O_.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new F_}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t);const e=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(_i,th,z_),vi.set(0,0,-1).applyQuaternion(th),e.positionX){const s=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(_i.x,s),e.positionY.linearRampToValueAtTime(_i.y,s),e.positionZ.linearRampToValueAtTime(_i.z,s),e.forwardX.linearRampToValueAtTime(vi.x,s),e.forwardY.linearRampToValueAtTime(vi.y,s),e.forwardZ.linearRampToValueAtTime(vi.z,s),e.upX.linearRampToValueAtTime(n.x,s),e.upY.linearRampToValueAtTime(n.y,s),e.upZ.linearRampToValueAtTime(n.z,s)}else e.setPosition(_i.x,_i.y,_i.z),e.setOrientation(vi.x,vi.y,vi.z,n.x,n.y,n.z)}}class pu extends pe{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+t;const e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),this._connected===!0?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){return this.detune=t,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=t,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=t,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}}const xi=new C,eh=new Ui,k_=new C,yi=new C;class H_ extends pu{constructor(t){super(t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(xi,eh,k_),yi.set(0,0,1).applyQuaternion(eh);const e=this.panner;if(e.positionX){const n=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(xi.x,n),e.positionY.linearRampToValueAtTime(xi.y,n),e.positionZ.linearRampToValueAtTime(xi.z,n),e.orientationX.linearRampToValueAtTime(yi.x,n),e.orientationY.linearRampToValueAtTime(yi.y,n),e.orientationZ.linearRampToValueAtTime(yi.z,n)}else e.setPosition(xi.x,xi.y,xi.z),e.setOrientation(yi.x,yi.y,yi.z)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lc);const V_=30,G_=150,Ke=220,Ri=Ke/2-2,mu=4.2,W_=7.5,X_=2.6,q_=7.5,Y_=-22,$_=11,K_=14,J_=2.6,Z_=2.2,nh=.28,j_=4e3,Q_=48e4,zs={MIN:-50,MAX:50,GOOD_BOY:10,MENACE:-10},En={JOIN:"join",INPUT:"in",BARK:"bark",BITE:"bite",EMOTE:"emote",GRAB:"grab",DROP:"drop",THROW:"throw",CHAT:"chat",SNIFF:"sniff"},ni={WELCOME:"welcome",STATE:"state",JOIN:"join",LEAVE:"leave",EVENT:"ev",SCORE:"score",LEADERBOARD:"lb",PARK:"park"},Te={BARK:"bark",YELP:"yelp",BITE:"bite",HOWL:"howl",GROUP_HOWL:"grouphowl",PICKUP:"pickup",THROW:"throw",PET:"pet",FEED:"feed",SCARE:"scare",CHAT:"chat",CHASE:"chase",TREASURE:"treasure",ECHO:"echo",TRICK:"trick",SNIFF:"sniff",DISCOVERY:"discovery",GREET:"greet",PARK_COMPLETE:"parkcomplete"},sc=[{id:"husky",name:"Husky",premium:!1,speed:1.08,scale:1.05,primary:"#8a93a3",secondary:"#f2f4f7",pattern:"mask",build:{bodyLen:1.15,bodyH:.62,legLen:.55,headR:.3,snoutLen:.28,ear:"pointy",tail:"curled",fur:"fluffy"}},{id:"shiba",name:"Shiba Inu",premium:!1,speed:1.05,scale:.9,primary:"#d98e4a",secondary:"#f7ead9",pattern:"socks",build:{bodyLen:.95,bodyH:.55,legLen:.48,headR:.3,snoutLen:.24,ear:"pointy",tail:"curled",fur:"short"}},{id:"golden",name:"Golden Retriever",premium:!1,speed:1,scale:1.1,primary:"#d9a45b",secondary:"#f2d8a7",pattern:"none",build:{bodyLen:1.25,bodyH:.65,legLen:.55,headR:.32,snoutLen:.3,ear:"floppy",tail:"flag",fur:"fluffy"}},{id:"corgi",name:"Corgi",premium:!1,speed:.92,scale:.8,primary:"#d98e4a",secondary:"#ffffff",pattern:"socks",build:{bodyLen:1.15,bodyH:.5,legLen:.25,headR:.32,snoutLen:.24,ear:"pointy",tail:"bob",fur:"short"}},{id:"dachshund",name:"Dachshund",premium:!1,speed:.9,scale:.75,primary:"#7a4a2b",secondary:"#c98d5e",pattern:"none",build:{bodyLen:1.45,bodyH:.42,legLen:.22,headR:.28,snoutLen:.34,ear:"floppy",tail:"straight",fur:"short"}},{id:"collie",name:"Border Collie",premium:!1,speed:1.15,scale:1,primary:"#2b2b30",secondary:"#ffffff",pattern:"mask",build:{bodyLen:1.15,bodyH:.6,legLen:.55,headR:.3,snoutLen:.28,ear:"floppy",tail:"flag",fur:"fluffy"}},{id:"doberman",name:"Doberman",premium:!0,speed:1.18,scale:1.15,primary:"#26262b",secondary:"#b0713c",pattern:"mask",build:{bodyLen:1.3,bodyH:.7,legLen:.65,headR:.28,snoutLen:.34,ear:"pointy",tail:"straight",fur:"short"}},{id:"poodle",name:"Poodle",premium:!0,speed:1,scale:.95,primary:"#e8e2da",secondary:"#ffffff",pattern:"none",build:{bodyLen:1,bodyH:.6,legLen:.55,headR:.3,snoutLen:.22,ear:"floppy",tail:"bob",fur:"curly"}},{id:"pug",name:"Pug",premium:!0,speed:.88,scale:.7,primary:"#d9c2a0",secondary:"#3a3230",pattern:"mask",build:{bodyLen:.85,bodyH:.5,legLen:.3,headR:.36,snoutLen:.1,ear:"button",tail:"curled",fur:"short"}},{id:"mutt",name:"Mutt (random)",premium:!1,speed:1,scale:1,primary:"#a0855b",secondary:"#e5d8c3",pattern:"spots",build:{bodyLen:1.1,bodyH:.58,legLen:.45,headR:.31,snoutLen:.27,ear:"floppy",tail:"straight",fur:"short"}}],oo=Object.fromEntries(sc.map(i=>[i.id,i])),$r=["none","mask","socks","spots","saddle"],ia=["none","bandana","hat","glasses"];function Ci(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return()=>(t=Math.imul(t^t>>>15,2246822507),t=Math.imul(t^t>>>13,3266489909),t^=t>>>16,(t>>>0)/4294967296)}const ih=["#a0855b","#6b5b4a","#c9a96e","#8a8a8a","#b0713c","#4a4038","#e0d5c0"],tv=["pointy","floppy","button"],ev=["curled","straight","bob","flag"],nv=["short","fluffy"];function iv(i){const t=Ci(i||"mutt"),e=r=>r[Math.floor(t()*r.length)],n=e(ih),s=e(ih);return{...oo.mutt,primary:n,secondary:s,pattern:e($r),speed:.95+t()*.2,scale:.8+t()*.4,build:{bodyLen:.9+t()*.5,bodyH:.45+t()*.25,legLen:.25+t()*.35,headR:.26+t()*.1,snoutLen:.15+t()*.2,ear:e(tv),tail:e(ev),fur:e(nv)}}}function sv(i){return i.breed==="mutt"?iv(i.name||"mutt"):oo[i.breed]||oo.shiba}function sh(){return{breed:"shiba",primary:"#d98e4a",secondary:"#f7ead9",pattern:"socks",size:1,collar:"#d23b3b",accessory:"none",name:""}}const yn=-.55,ys=60,rv=90,ov=-2.4,Jt={x:0,z:0,r:4.5,depth:-.75};function Pi(i,t,e){const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)}function av(i,t){return Math.sin(i*.045+1.3)*Math.cos(t*.052-.7)*.85+Math.sin(i*.11+t*.093+2.2)*.4+Math.cos(i*.021-t*.033+4.1)*.55}function cv(i,t){let e=1;for(const[o,a,c]of dv){const l=Math.hypot(i-o,t-a);e=Math.min(e,Pi(c,c+9,l))}const n=Math.max(Math.abs(i-We.x)-We.w/2,0),s=Math.max(Math.abs(t-We.z)-We.d/2,0);e=Math.min(e,Pi(0,9,Math.hypot(n,s))),e*=1-Pi(ys-14,ys-2,i);const r=Math.max(Math.abs(i),Math.abs(t));return e*=1-Pi(92,101,r),e}const rc=[[-5,-75,30,7],[-15,72,26,4.6]];function lv(i,t){let e=0;for(const[s,r,o,a]of rc){const c=Math.hypot(i-s,t-r);if(c>=o)continue;const l=Math.cos(c/o*Math.PI)*.5+.5;e+=a*l*l}e*=1-Pi(ys-14,ys-2,i);const n=Math.max(Math.abs(i),Math.abs(t));return e*=1-Pi(94,103,n),e}const hn={x:rc[0][0],z:rc[0][1]},gu=Array.from({length:5},(i,t)=>{const e=t/5*Math.PI*2+.4;return{x:hn.x+Math.cos(e)*4.6,z:hn.z+Math.sin(e)*4.6,a:e,h:1.1+t%3*.35}});function Zt(i,t){if(i>ys)return Pi(ys,rv,i)*ov;const e=i-Jt.x,n=t-Jt.z;if(e*e+n*n<Jt.r*Jt.r)return Jt.depth;let s=av(i,t)*.75*cv(i,t)+lv(i,t);return s<-.35&&(s=-.35),s}function hv(i,t){const n=Zt(i,t);return Math.hypot(Zt(i+.6,t)-n,Zt(i,t+.6)-n)/.6}function _u(i,t){return Zt(i,t)<yn-.2}const er=[{id:0,x:-40,z:-40},{id:1,x:-40,z:40},{id:2,x:30,z:-50},{id:3,x:20,z:45}],Es=[{id:0,x:-15,z:-20},{id:1,x:25,z:15}],We={x:-55,z:0,w:50,d:60},ao={z1:-4,z2:4},co={x:0,z:12},uv=[[{x:-15,z:-20},{x:-30,z:5},{x:-10,z:30},{x:10,z:10}],[{x:25,z:15},{x:40,z:-10},{x:15,z:-30},{x:0,z:-10}],[{x:-40,z:-40},{x:-60,z:-10},{x:-40,z:40},{x:-20,z:0}],[{x:20,z:45},{x:45,z:40},{x:50,z:10},{x:30,z:-20}],[{x:-5,z:50},{x:-30,z:60},{x:-50,z:30},{x:-20,z:25}],[{x:10,z:-50},{x:-20,z:-55},{x:-45,z:-30},{x:-10,z:-25}],[{x:55,z:-30},{x:55,z:30},{x:35,z:50},{x:45,z:0}],[{x:-60,z:50},{x:-65,z:-40},{x:-30,z:-60},{x:-15,z:40}]],dv=[[Jt.x,Jt.z,11],[co.x,co.z,8],...er.map(i=>[i.x,i.z,8]),...Es.map(i=>[i.x,i.z,7])],vu=[];for(const i of uv)for(let t=0;t<i.length;t++){const e=i[t],n=i[(t+1)%i.length];vu.push([e.x,e.z,n.x,n.z])}function Nc(i,t){let e=1/0;for(const[n,s,r,o]of vu){const a=r-n,c=o-s,l=a*a+c*c||1,h=Math.min(1,Math.max(0,((i-n)*a+(t-s)*c)/l)),u=i-(n+a*h),d=t-(s+c*h),f=u*u+d*d;f<e&&(e=f)}return Math.sqrt(e)}const rh=108,Oc=(()=>{const i=Ci("pawverse-trees"),t=[];for(;t.length<56;){const e=(i()*2-1)*(rh-6),n=(i()*2-1)*(rh-6),s=2.2+i()*2.2,r=2+Math.floor(i()*2),a=i()<.17,c=i();e>48||e*e+n*n<140||er.some(l=>(e-l.x)**2+(n-l.z)**2<45)||Es.some(l=>(e-l.x)**2+(n-l.z)**2<45)||Nc(e,n)<2.6||Math.hypot(e-co.x,n-co.z)<6||t.push({x:e,z:n,h:s,layers:r,cherry:a,seed:c})}return t})(),xu=[{x:9,z:-6.5,ry:-2.2},{x:-9.5,z:5,ry:1.2},{x:6,z:11,ry:2.6},{x:24,z:-22,ry:-.6},{x:-24,z:26,ry:.8}],Gn={x:-68,z:-20,ry:.95},yu=[{id:0,x:-18,z:12},{id:1,x:14,z:-14},{id:2,x:36,z:28},{id:3,x:-34,z:-18},{id:4,x:-52,z:44},{id:5,x:44,z:-32},{id:6,x:-68,z:14},{id:7,x:4,z:36},{id:8,x:-8,z:-38},{id:9,x:55,z:12}],fv=[...Oc.map(i=>({x:i.x,z:i.z,r:.42,h:1/0})),...xu.map(i=>({x:i.x,z:i.z,r:.95,h:.75})),...Es.map(i=>({x:i.x,z:i.z,r:1.55,h:1/0})),{x:Gn.x,z:Gn.z,r:1.25,h:1/0},{x:Jt.x,z:Jt.z,r:.85,h:1/0},...gu.map(i=>({x:i.x,z:i.z,r:.5,h:1/0}))],pv=(()=>{const i=We,t=i.w/2,e=i.d/2;return[{x1:i.x-t,z1:i.z-e,x2:i.x+t,z2:i.z-e},{x1:i.x-t,z1:i.z+e,x2:i.x+t,z2:i.z+e},{x1:i.x-t,z1:i.z-e,x2:i.x-t,z2:i.z+e},{x1:i.x+t,z1:i.z-e,x2:i.x+t,z2:i.z+ao.z1},{x1:i.x+t,z1:i.z+ao.z2,x2:i.x+t,z2:i.z+e}]})(),mv=.95,gv=.28,us=8,Kr=new Map;for(const i of fv){const t=Math.floor((i.x-i.r-1)/us),e=Math.floor((i.x+i.r+1)/us),n=Math.floor((i.z-i.r-1)/us),s=Math.floor((i.z+i.r+1)/us);for(let r=t;r<=e;r++)for(let o=n;o<=s;o++){const a=r*1e3+o;Kr.has(a)||Kr.set(a,[]),Kr.get(a).push(i)}}function _v(i,t=.35){let e=!1;const n=i.y??0;for(let s=0;s<2;s++){const r=Kr.get(Math.floor(i.x/us)*1e3+Math.floor(i.z/us));if(r)for(const o of r){if(n>o.h)continue;const a=i.x-o.x,c=i.z-o.z,l=o.r+t,h=a*a+c*c;if(h>=l*l)continue;const u=Math.sqrt(h)||1e-5;i.x=o.x+a/u*l,i.z=o.z+c/u*l,e=!0}if(n<=mv)for(const o of pv){const a=o.x2-o.x1,c=o.z2-o.z1,l=a*a+c*c||1,h=Math.min(1,Math.max(0,((i.x-o.x1)*a+(i.z-o.z1)*c)/l)),u=o.x1+a*h,d=o.z1+c*h,f=i.x-u,g=i.z-d,_=gv+t,m=f*f+g*g;if(m>=_*_)continue;const p=Math.sqrt(m)||1e-5;i.x=u+f/p*_,i.z=d+g/p*_,e=!0}}return e}function oh(i=0,t=12){return{x:i,y:0,z:t,vx:0,vy:0,vz:0,yaw:0,grounded:!0,swimming:!1}}function ah(i,t,e,n=1){i.yaw=t.yaw;const s=(t.r?1:0)-(t.l?1:0),r=(t.b?1:0)-(t.f?1:0);let o=0,a=0;if(s!==0||r!==0){const g=Math.sin(t.yaw),_=Math.cos(t.yaw);o=s*_-r*g,a=s*g+r*_;const m=Math.hypot(o,a);o/=m,a/=m}const c=Zt(i.x,i.z);i.swimming=c<yn-.2;const l=(i.swimming?X_:t.sprint?W_:mu)*n,h=o*l,u=a*l,f=Math.min(1,(o===0&&a===0?K_:$_)*e);if(i.vx+=(h-i.vx)*f,i.vz+=(u-i.vz)*f,h===0&&u===0&&Math.hypot(i.vx,i.vz)<.05&&(i.vx=0,i.vz=0),i.swimming)i.vy=0,i.y=yn-.15,i.grounded=!1;else{i.grounded&&t.jump&&(i.vy=q_,i.grounded=!1),i.vy+=Y_*e,i.y+=i.vy*e;const g=Zt(i.x,i.z);i.grounded&&g>=yn-.2&&i.y-g<=.45?(i.y=g,i.vy=0):(g>=yn-.2&&i.y<=g||i.y<g)&&(i.y=g,i.vy=0,i.grounded=!0)}i.x+=i.vx*e,i.z+=i.vz*e,i.x=Math.max(-Ri,Math.min(Ri,i.x)),i.z=Math.max(-Ri,Math.min(Ri,i.z)),_v(i,.35)}function vv(i,t){if(t&&t!=="none")return t;if(i.swimming)return"swim";if(!i.grounded)return"air";const e=Math.hypot(i.vx,i.vz);return e>mu*1.1?"sprint":e>.2?"run":"idle"}const ch=["#e5533f","#3f8fe5","#46c46a","#e5b53f"],xv=new At("#58a14c"),yv=new At("#6fb75a"),Mv=new At("#7cc065"),Sv=new At("#e6ca8d"),bv=new At("#b8a06a"),Ev=new At("#7a8a5f"),wv=new At("#cfb98a"),Tv=new At("#c7c0ae"),Av=new At("#8d8d90"),Mu="#d4e7f2",Rv=new C(-.55,.62,.35).normalize();function Mi(i,t,e){const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)}function Nr(i,t){return!(i>50||Math.hypot(i-Jt.x,t-Jt.z)<Jt.r+2.5||Math.hypot(i-Jt.x,t-Jt.z)<11||er.some(e=>Math.hypot(i-e.x,t-e.z)<4.5)||Es.some(e=>Math.hypot(i-e.x,t-e.z)<4)||Nc(i,t)<3)}function Cv(){const i=document.createElement("canvas");i.width=i.height=256;const t=i.getContext("2d");t.fillStyle="#f4f6ef",t.fillRect(0,0,256,256);const e=Ci("grass-tex");for(let s=0;s<60;s++)t.fillStyle=`rgba(${120+e()*60|0},${140+e()*50|0},${90+e()*40|0},0.05)`,t.beginPath(),t.arc(e()*256,e()*256,14+e()*30,0,7),t.fill();for(let s=0;s<4200;s++)t.fillStyle=`rgba(${70+e()*90|0},${95+e()*90|0},${55+e()*60|0},${.05+e()*.09})`,t.fillRect(e()*256,e()*256,1.5,1.5);t.strokeStyle="rgba(80,110,60,0.16)",t.lineWidth=1;for(let s=0;s<700;s++){const r=e()*256,o=e()*256;t.beginPath(),t.moveTo(r,o),t.lineTo(r+(e()-.5)*2,o-2-e()*2.5),t.stroke()}const n=new Oi(i);return n.wrapS=n.wrapT=Ys,n.repeat.set(64,64),n.colorSpace=$e,n}function Pv(){const i=document.createElement("canvas");i.width=64,i.height=64;const t=i.getContext("2d");t.clearRect(0,0,64,64);const e=t.createLinearGradient(0,0,64,0);e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.35,"rgba(255,255,255,0.9)"),e.addColorStop(.65,"rgba(255,255,255,0.5)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const n=new Oi(i);return n.wrapS=n.wrapT=Ys,n.repeat.set(3,40),n}function lh(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,4,64,64,64);return e.addColorStop(0,"rgba(255,246,220,1)"),e.addColorStop(.25,"rgba(255,238,190,0.55)"),e.addColorStop(1,"rgba(255,238,190,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),new Oi(i)}function Lv(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,20,64,64,62);e.addColorStop(0,"rgba(238,242,250,1)"),e.addColorStop(.55,"rgba(220,228,244,0.95)"),e.addColorStop(.8,"rgba(190,205,235,0.35)"),e.addColorStop(1,"rgba(190,205,235,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),t.fillStyle="rgba(165,180,215,0.5)";for(const[n,s,r]of[[48,52,7],[74,44,5],[62,76,8],[84,68,4],[42,74,4]])t.beginPath(),t.arc(n,s,r,0,7),t.fill();return new Oi(i)}function Dv(i){const t=document.createElement("canvas");t.width=256,t.height=96;const e=t.getContext("2d");e.fillStyle="#8a6a48",e.fillRect(0,0,256,96),e.strokeStyle="#6a4a30",e.lineWidth=8,e.strokeRect(4,4,248,88),e.fillStyle="#fff4e0",e.font='700 38px "Avenir Next", system-ui, sans-serif',e.textAlign="center",e.textBaseline="middle",e.fillText(i,128,52);const n=new Oi(t);return n.colorSpace=$e,n}const sa={day:{zen:"#3f9be0",hor:"#d8ecf7",sun:"#fff3d0",fog:"#d4e7f2",deep:"#2a7cc2",shal:"#63c7e8"},dusk:{zen:"#51518f",hor:"#ff9e6b",sun:"#ffc27a",fog:"#e0a988",deep:"#3a5a92",shal:"#c97a5e"},night:{zen:"#0a0f2c",hor:"#1a2848",sun:"#bcd0ff",fog:"#101a2e",deep:"#0d2a4a",shal:"#1c4a6e"}};function Iv(i){const t=new In({side:Xe,depthWrite:!1,fog:!1,uniforms:{uZenith:{value:new At("#3f9be0")},uHorizon:{value:new At("#d8ecf7")},uSunDir:{value:i},uSunColor:{value:new At("#fff3d0")}},vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = position;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_Position.z = gl_Position.w; // pin to the far plane
      }`,fragmentShader:`
      uniform vec3 uZenith, uHorizon, uSunColor;
      uniform vec3 uSunDir;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float h = max(d.y, 0.0);
        vec3 col = mix(uHorizon, uZenith, pow(h, 0.55));
        float s = max(dot(d, normalize(uSunDir)), 0.0);
        col += uSunColor * (pow(s, 600.0) * 1.6 + pow(s, 24.0) * 0.22);
        col = mix(col, uSunColor * 0.92, pow(s, 3.0) * (1.0 - h) * 0.12);
        gl_FragColor = vec4(col, 1.0);
      }`}),e=new yt(new on(320,32,16),t);return e.frustumCulled=!1,e.renderOrder=-10,e}function Uv(i){return new In({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uDeep:{value:new At("#2a7cc2")},uShallow:{value:new At("#63c7e8")},uSunDir:{value:i},uFogColor:{value:new At(Mu)},uFogNear:{value:70},uFogFar:{value:230},uAlpha:{value:.78}},vertexShader:`
      uniform float uTime;
      varying vec3 vWorld;
      varying vec3 vNormalW;
      float wave(vec2 p) {
        return sin(p.x * 0.35 + uTime * 1.1) * 0.055
             + sin(p.y * 0.42 - uTime * 0.9) * 0.045
             + sin((p.x + p.y) * 0.18 + uTime * 0.6) * 0.06;
      }
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        float w = wave(wp.xz);
        wp.y += w;
        float e = 0.6;
        float wx = wave(wp.xz + vec2(e, 0.0)) - w;
        float wz = wave(wp.xz + vec2(0.0, e)) - w;
        vNormalW = normalize(vec3(-wx / e, 1.0, -wz / e));
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,fragmentShader:`
      uniform vec3 uDeep, uShallow, uSunDir, uFogColor;
      uniform float uFogNear, uFogFar, uTime, uAlpha;
      varying vec3 vWorld;
      varying vec3 vNormalW;
      void main() {
        vec3 V = normalize(cameraPosition - vWorld);
        vec3 N = normalize(vNormalW);
        float fres = pow(1.0 - max(dot(N, V), 0.0), 2.0);
        vec3 col = mix(uDeep, uShallow, fres * 0.85 + 0.12);
        vec3 R = reflect(-normalize(uSunDir), N);
        float spec = pow(max(dot(R, V), 0.0), 90.0);
        col += vec3(1.0, 0.95, 0.8) * spec * 0.9;
        float sp = sin(vWorld.x * 3.1 + uTime * 2.0) * sin(vWorld.z * 2.7 - uTime * 1.7);
        col += vec3(0.06) * smoothstep(0.75, 1.0, sp);
        float dist = distance(cameraPosition, vWorld);
        col = mix(col, uFogColor, smoothstep(uFogNear, uFogFar, dist));
        gl_FragColor = vec4(col, uAlpha + fres * 0.15);
      }`})}function Nv(i){i.fog=new Tc(Mu,70,230);const t=Rv.clone(),e=Iv(t),n=e.material;i.add(e);const s=new qr(new Gs({map:lh(),transparent:!0,depthWrite:!1,fog:!1,toneMapped:!1}));s.scale.setScalar(150),s.position.copy(t).multiplyScalar(290),i.add(s);const r=new du("#cfe8ff","#4a6b3f",.85);i.add(r);const o=new Yr("#ffedcc",2);o.position.copy(t).multiplyScalar(140),o.castShadow=!0,o.shadow.mapSize.set(2048,2048);const a=o.shadow.camera;a.left=-95,a.right=95,a.top=95,a.bottom=-95,a.far=320,o.shadow.bias=-4e-4,o.shadow.normalBias=.6,i.add(o);const c=150,l=new An(Ke,Ke,c,c);l.rotateX(-Math.PI/2);const h=l.attributes.position,u=new Float32Array(h.count*3),d=Ci("pawverse-terrain"),f=new At;for(let T=0;T<h.count;T++){const P=h.getX(T),k=h.getZ(T),J=Zt(P,k);if(h.setY(T,J),J<yn-.05)f.copy(bv).lerp(Ev,Mi(-.6,-2.2,J));else{if(f.copy(xv).lerp(yv,d()),f.lerp(Mv,Math.min(.6,Math.max(0,J*.55))),P<56){const _t=Math.hypot(P-Jt.x,k-Jt.z);f.lerp(Tv,1-Mi(6.8,9.5,_t)),f.lerp(wv,(1-Mi(1.9,3.3,Nc(P,k)))*.9)}const tt=hv(P,k);f.lerp(Av,Mi(.34,.62,tt)*.75),f.lerp(Sv,Mi(50,58,P))}u[T*3]=f.r,u[T*3+1]=f.g,u[T*3+2]=f.b}l.setAttribute("color",new an(u,3)),l.computeVertexNormals();const g=new yt(l,new ta({vertexColors:!0,map:Cv()}));g.receiveShadow=!0,i.add(g);const _=Uv(t),m=new yt(new An(Ke-96,Ke,48,48),_);m.rotation.x=-Math.PI/2,m.position.set(Ke/2-(Ke-96)/2,yn,0),i.add(m);const p=new yt(new po(Jt.r-.3,24),_);p.rotation.x=-Math.PI/2,p.position.set(Jt.x,yn+.18,Jt.z),i.add(p);const y=Pv(),v=new yt(new An(4.5,Ke),new Ce({color:"#eaf8ff",alphaMap:y,transparent:!0,opacity:.45,depthWrite:!1}));v.rotation.x=-Math.PI/2,v.position.set(68.7,yn+.04,0),i.add(v);const S=new he({color:"#b9bcc5",flatShading:!0,roughness:.9}),F=new yt(new qn(Jt.r,.45,6,24),S);F.rotation.x=Math.PI/2,F.position.set(Jt.x,.25,Jt.z),F.castShadow=!0,i.add(F);const w=new yt(new Be(.45,.7,1.6,8),S);w.position.set(Jt.x,.4,Jt.z),w.castShadow=!0,i.add(w);const A=new yt(new Be(1.1,.7,.35,10),S);A.position.set(Jt.x,1.3,Jt.z),A.castShadow=!0,i.add(A);const I=new on(.06,4,3),b=new Ce({color:"#cfeeff",transparent:!0,opacity:.85}),x=new wn(I,b,40);x.position.set(Jt.x,0,Jt.z),i.add(x);const D=Array.from({length:40},(T,P)=>({a:P/40*Math.PI*2,sp:.7+P%5*.12,off:P*.13})),U=new he({color:"#6a4a30",flatShading:!0,roughness:1}),N=["#3f7d3a","#4c8f3f","#5f9c46","#37703f","#c87fa0","#e0a0b8"].map(T=>new he({color:T,flatShading:!0,roughness:1})),X=[];for(const T of Oc){const{x:P,z:k,h:J,layers:tt,cherry:_t,seed:bt}=T,j=Zt(P,k),ft=new jt;ft.position.set(P,j,k);const Lt=new yt(new Be(.18,.28,J,6),U);Lt.position.y=J/2,Lt.castShadow=!0,ft.add(Lt);const ue=N[_t?4+Math.floor(bt*2):Math.floor(bt*4)];for(let Kt=0;Kt<tt;Kt++){const oe=(1.6-Kt*.4)*(.8+(bt*7.13+Kt*.37)%1*.5),Qe=new yt(new Rn(oe,1.6,7),ue);Qe.position.y=J+Kt*1,Qe.castShadow=!0,ft.add(Qe)}i.add(ft),X.push({g:ft,phase:bt*Math.PI*2})}const K=new he({color:"#8a6a48",flatShading:!0,roughness:1}),q=new Re(.14,1,.14),Q=[],Y=(T,P,k,J)=>{const tt=Math.hypot(k-T,J-P);for(let _t=0;_t<=tt;_t+=4){const bt=_t/tt;Q.push([T+(k-T)*bt,P+(J-P)*bt])}for(const _t of[.45,.85]){const bt=new yt(new Re(.08,.1,tt),K);bt.position.set((T+k)/2,_t,(P+J)/2),bt.rotation.y=Math.atan2(k-T,J-P),i.add(bt)}},V=Ri+1;Y(-V,-V,V,-V),Y(V,-V,V,V),Y(V,V,-V,V),Y(-V,V,-V,-V);const Z=We,rt=Z.w/2,wt=Z.d/2;Y(Z.x-rt,Z.z-wt,Z.x+rt,Z.z-wt),Y(Z.x-rt,Z.z+wt,Z.x+rt,Z.z+wt),Y(Z.x-rt,Z.z-wt,Z.x-rt,Z.z+wt),Y(Z.x+rt,Z.z-wt,Z.x+rt,Z.z+ao.z1),Y(Z.x+rt,Z.z+ao.z2,Z.x+rt,Z.z+wt);const Nt=new wn(q,K,Q.length),$=new le;Q.forEach(([T,P],k)=>{$.setPosition(T,.5+Zt(T,P),P),Nt.setMatrixAt(k,$)}),Nt.castShadow=!0,i.add(Nt);for(const T of er){const P=new yt(new Be(2.2,2.4,.12,16),new he({color:ch[T.id%ch.length],flatShading:!0,roughness:.8}));P.position.set(T.x,Zt(T.x,T.z)+.06,T.z),P.receiveShadow=!0,i.add(P)}for(const T of Es){const P=new jt,k=new yt(new Re(2.4,1,1.2),new he({color:"#9c6b43",flatShading:!0,roughness:1}));k.position.y=.5,k.castShadow=!0,P.add(k);for(const _t of[-1,1]){const bt=new yt(new Be(.06,.06,2.3,6),K);bt.position.set(_t*1.1,1.15,.5),P.add(bt)}const J=new yt(new Re(2.8,.1,1.7),new he({color:"#d9534f",flatShading:!0,roughness:1}));J.position.set(0,2.35,.25),J.rotation.x=-.15,J.castShadow=!0,P.add(J);const tt=new yt(new Pc(.12,.5,3,6),new he({color:"#f5efdf",flatShading:!0}));tt.rotation.z=Math.PI/2,tt.position.set(0,1.25,.62),P.add(tt),P.position.set(T.x,Zt(T.x,T.z),T.z),i.add(P)}const at=(T,P,k)=>{const J=new jt,tt=K;for(const j of[-.75,.75]){const ft=new yt(new Re(.12,.45,.5),tt);ft.position.set(j,.22,0),J.add(ft)}const _t=new yt(new Re(1.8,.07,.5),tt);_t.position.y=.46,_t.castShadow=!0,J.add(_t);const bt=new yt(new Re(1.8,.4,.06),tt);bt.position.set(0,.78,-.24),bt.rotation.x=-.15,bt.castShadow=!0,J.add(bt),J.position.set(T,Zt(T,P),P),J.rotation.y=k,i.add(J)};for(const T of xu)at(T.x,T.z,T.ry);{const T=new jt,P=new yt(new qn(.55,.06,6,18),new he({color:"#d9534f",flatShading:!0,roughness:.8}));P.position.y=.85,P.castShadow=!0,T.add(P);for(const Kt of[-.8,.8]){const oe=new yt(new Be(.05,.05,1.5,6),K);oe.position.set(Kt,.75,0),oe.castShadow=!0,T.add(oe)}T.position.set(-45,Zt(-45,-10),-10),T.rotation.y=.4,i.add(T);const k=new he({color:"#3f8fe5",flatShading:!0,roughness:.9}),J=new jt;for(const Kt of[-1,1]){const oe=new yt(new Re(1.6,.09,2.3),k);oe.position.set(0,.62,Kt*.98),oe.rotation.x=Kt*.62,oe.castShadow=!0,J.add(oe)}J.position.set(-62,Zt(-62,8),8),J.rotation.y=-.3,i.add(J);const tt=new jt;for(let Kt=0;Kt<6;Kt++){const oe=new yt(new Be(.045,.045,1.1,6),new he({color:Kt%2?"#e5b53f":"#3f8fe5",flatShading:!0,roughness:.8}));oe.position.set(Kt*.85,.55,0),oe.castShadow=!0,tt.add(oe)}tt.position.set(-50,Zt(-50,16),16),tt.rotation.y=1.1,i.add(tt);const _t=new jt,bt=new yt(new Re(1.7,1.15,1.5),new he({color:"#b0713c",flatShading:!0,roughness:1}));bt.position.y=.58,bt.castShadow=!0,_t.add(bt);const j=new yt(new Rn(1.45,.8,4),new he({color:"#8a3d33",flatShading:!0,roughness:1}));j.position.y=1.55,j.rotation.y=Math.PI/4,j.castShadow=!0,_t.add(j);const ft=new yt(new Re(.55,.7,.06),new he({color:"#2a1f18",roughness:1}));ft.position.set(0,.36,.76),_t.add(ft),_t.position.set(Gn.x,Zt(Gn.x,Gn.z),Gn.z),_t.rotation.y=Gn.ry,i.add(_t);const Lt=new jt;for(const Kt of[-1,1]){const oe=new yt(new Be(.06,.06,2,6),K);oe.position.set(Kt*1.05,1,0),oe.castShadow=!0,Lt.add(oe)}const ue=new yt(new Re(2.4,.85,.08),new he({map:Dv("🐾 PAW PARK"),roughness:1}));ue.position.y=1.75,ue.castShadow=!0,Lt.add(ue),Lt.position.set(Z.x+rt+1.2,Zt(Z.x+rt+1.2,-7),-7),Lt.rotation.y=Math.PI/2,i.add(Lt)}const it=new pe,nt=Ci("pawverse-scatter"),Ot=(T,P,k)=>{let J=0,tt=0;for(;J<P&&tt++<P*40;){const _t=(nt()*2-1)*(Ri-3),bt=(nt()*2-1)*(Ri-3);k(_t,bt,J)&&(T.setMatrixAt(J,it.matrix),T.setColorAt&&T.userData.colors&&T.setColorAt(J,T.userData.colors[Math.floor(nt()*T.userData.colors.length)]),J++)}T.count=J,T.instanceMatrix.needsUpdate=!0,T.instanceColor&&(T.instanceColor.needsUpdate=!0),i.add(T)};{const T=new wn(new Rn(.055,.24,4),new ta({flatShading:!0}),550);T.userData.colors=["#69b457","#5da24e","#7cc065","#4c8f3f"].map(P=>new At(P)),Ot(T,550,(P,k)=>Nr(P,k)?(it.position.set(P,Zt(P,k)+.1,k),it.rotation.set(0,nt()*Math.PI,0),it.scale.setScalar(.7+nt()*.9),it.updateMatrix(),!0):!1)}{const T=new wn(new Rn(.075,.17,5),new ta({flatShading:!0}),240);T.userData.colors=["#ff8fb3","#ffd166","#f5f5f5","#c9a6ff","#ff9c6b"].map(P=>new At(P)),Ot(T,240,(P,k)=>Nr(P,k)?(it.position.set(P,Zt(P,k)+.14,k),it.rotation.set(0,nt()*Math.PI,0),it.scale.setScalar(.8+nt()*.7),it.updateMatrix(),!0):!1)}{const T=new wn(new ro(.3,0),new he({flatShading:!0,roughness:1}),48);T.castShadow=!0,T.userData.colors=["#9a9aa2","#8a8a92","#aaa89e","#7d7d85"].map(P=>new At(P)),Ot(T,48,(P,k)=>!(P>52&&P<78)&&!Nr(P,k)?!1:(it.position.set(P,Zt(P,k)+.08,k),it.rotation.set(nt()*3,nt()*3,nt()*3),it.scale.set(.6+nt()*1.8,.5+nt()*.9,.6+nt()*1.8),it.updateMatrix(),!0))}{const T=new wn(new Lc(.55,0),new he({flatShading:!0,roughness:1}),52);T.castShadow=!0,T.userData.colors=["#3f7d3a","#4c8f3f","#37703f","#2f6b33"].map(P=>new At(P)),Ot(T,52,(P,k)=>!(Math.max(Math.abs(P),Math.abs(k))>78)&&!Nr(P,k)||P>48||Math.hypot(P-Jt.x,k-Jt.z)<12?!1:(it.position.set(P,Zt(P,k)+.3,k),it.rotation.set(0,nt()*Math.PI,0),it.scale.set(.8+nt()*1.1,.55+nt()*.5,.8+nt()*1.1),it.updateMatrix(),!0))}const Vt=new he({color:"#7a5a3c",flatShading:!0,roughness:1}),qt=new he({color:"#5c452f",flatShading:!0,roughness:1}),me=new Ce({color:"#ffe28a",transparent:!0,depthWrite:!1}),L=new Map;for(const T of yu){const P=Zt(T.x,T.z),k=new yt(new on(.75,8,5),Vt);k.scale.set(1,.36,1),k.position.set(T.x,P+.02,T.z),k.castShadow=!0,i.add(k);for(let tt=0;tt<3;tt++){const _t=new yt(new ro(.09,0),Vt),bt=tt/3*Math.PI*2+T.id;_t.position.set(T.x+Math.cos(bt)*1,P+.05,T.z+Math.sin(bt)*1),i.add(_t)}const J=new yt(new go(.13,0),me);J.position.set(T.x,P+1,T.z),i.add(J),L.set(T.id,{mound:k,spark:J,baseY:P})}function ye(T){for(const[P,k]of L){const J=T.get(P)!==0;k.spark.visible=J,k.mound.material=J?Vt:qt,k.mound.scale.y=J?.36:.14}}{const T=new he({color:"#7d7f8a",flatShading:!0,roughness:1}),P=Zt(hn.x,hn.z),k=new yt(new Be(2.6,3.2,.34,9),T);k.position.set(hn.x,P+.17,hn.z),k.castShadow=!0,k.receiveShadow=!0,i.add(k);for(const _t of gu){const bt=new yt(new Re(.5,_t.h,.4),T);bt.position.set(_t.x,Zt(_t.x,_t.z)+_t.h/2-.05,_t.z),bt.rotation.y=_t.a,bt.castShadow=!0,i.add(bt)}const J=new he({color:"#3c3f4c",emissive:"#8fb8ff",emissiveIntensity:0}),tt=new yt(new qn(.55,.1,6,20,Math.PI*1.25),J);tt.rotation.set(-Math.PI/2,0,.6),tt.position.set(hn.x,P+.72,hn.z),i.add(tt);var te=J}const ee=new Ue;{const T=Ci("pawverse-stars"),P=[];for(let k=0;k<420;k++){const J=T()*Math.PI*2,tt=Math.asin(T()*.95+.05);P.push(300*Math.cos(tt)*Math.cos(J),300*Math.sin(tt),300*Math.cos(tt)*Math.sin(J))}ee.setAttribute("position",new Qt(P,3))}const Ct=new iu({color:"#cfe0ff",size:1.7,sizeAttenuation:!1,transparent:!0,opacity:0,fog:!1,depthWrite:!1}),_e=new e_(ee,Ct);_e.frustumCulled=!1,i.add(_e);const It=new qr(new Gs({map:Lv(),transparent:!0,depthWrite:!1,fog:!1,toneMapped:!1,opacity:0}));It.scale.setScalar(34),i.add(It);const kt=[];{const T=new he({color:"#2e3440",flatShading:!0,roughness:.8}),P=new he({color:"#ffe8c0",emissive:"#ffc98a",emissiveIntensity:0}),k=[[10,4],[-10,-4],[4,-10],[-4,10],[-29,-7],[-15,-17],[25,12]];for(const[J,tt]of k){const _t=Zt(J,tt),bt=new yt(new Be(.07,.09,2.7,6),T);bt.position.set(J,_t+1.35,tt),bt.castShadow=!0,i.add(bt);const j=new yt(new on(.17,8,6),P);j.position.set(J,_t+2.75,tt),i.add(j);const ft=new qr(new Gs({map:lh(),color:"#ffcf96",transparent:!0,depthWrite:!1,opacity:0}));ft.scale.setScalar(3.2),ft.position.copy(j.position),i.add(ft);const Lt=new U_("#ffc98a",0,15,2);Lt.position.set(J,_t+2.6,tt),Lt.visible=!1,i.add(Lt),kt.push({bulbMat:P,halo:ft,light:Lt})}}const R=36,M=new Ce({color:"#d9ffa0",transparent:!0,opacity:0,depthWrite:!1,fog:!1}),G=new wn(new on(.05,4,3),M,R);G.frustumCulled=!1;const st=[];for(let T=0;T<R;T++)st.push({x:(nt()*2-1)*70,z:(nt()*2-1)*70,ph:nt()*20,sp:.4+nt()*.5});i.add(G);const ot=new Ce({color:"#ffffff",transparent:!0,opacity:.85,fog:!1}),et=[],Rt=Ci("pawverse-clouds");for(let T=0;T<12;T++){const P=new jt;for(let k=0;k<4+Math.floor(Rt()*3);k++){const J=new yt(new on(3+Rt()*4.5,7,5),ot);J.scale.y=.5,J.position.set((k-2)*4.2,Rt()*1.6,Rt()*3.5),P.add(J)}P.position.set((Rt()*2-1)*170,46+Rt()*20,(Rt()*2-1)*170),i.add(P),et.push(P)}const pt=[],St=["#ffb3d1","#ffe08a","#c9a6ff","#9ad1ff","#ffc29a"];for(let T=0;T<7;T++){const P=new jt,k=new Ce({color:St[T%St.length],side:rn}),J=[];for(const _t of[-1,1]){const bt=new jt,j=new yt(new An(.16,.12),k);j.position.x=_t*.09,j.rotation.x=-Math.PI/2,bt.add(j),P.add(bt),J.push(bt)}const tt={x:(nt()*2-1)*60,z:(nt()*2-1)*60};i.add(P),pt.push({g:P,wings:J,anchor:tt,phase:nt()*20,speed:.5+nt()*.5})}const Ht=[];for(let T=0;T<3;T++){const P=new jt,k=new Ce({color:"#3a4a5a"}),J=new yt(new Rn(.09,.42,5),k);J.rotation.x=Math.PI/2,P.add(J);const tt=[];for(const _t of[-1,1]){const bt=new yt(new Re(.55,.02,.16),k);bt.position.x=_t*.3,P.add(bt),tt.push(bt)}i.add(P),Ht.push({g:P,wings:tt,cx:(nt()*2-1)*60,cz:(nt()*2-1)*60,r:22+nt()*20,h:20+nt()*12,speed:(.12+nt()*.08)*(T%2?1:-1),phase:nt()*9})}const ct=64,xt=new wn(new An(.1,.1),new Ce({color:"#ffeef4",transparent:!0,opacity:.75,side:rn,depthWrite:!1}),ct);xt.frustumCulled=!1;const Yt=[];for(let T=0;T<ct;T++)Yt.push({x:(nt()*2-1)*100,y:.4+nt()*3.2,z:(nt()*2-1)*100,ph:nt()*9,spin:nt()*2+.5});i.add(xt);let vt=0;const gt=[],Ft=new At,Bt=new At,ne=(T,P,k)=>(Ft.set(sa.day[T]).lerp(Bt.set(sa.dusk[T]),P),Ft.lerp(Bt.set(sa.night[T]),k));function O(T,P=.18){vt+=T;for(let j=gt.length-1;j>=0;j--)gt[j].age+=T,gt[j].age>2.2&&gt.splice(j,1);const k=P*Math.PI*2,J=Math.sin(k),tt=Mi(.06,-.14,J),_t=(1-tt)*Mi(.45,.1,Math.abs(J));t.set(Math.cos(k),Math.max(J,.02)*.95+.03,.35).normalize(),tt<.5?(o.position.copy(t).multiplyScalar(140),o.color.set("#ffedcc").lerp(Bt.set("#ff9e5e"),_t),o.intensity=.15+(1-tt)*1.85*(.35+.65*Math.max(0,J))):(o.position.set(-t.x*120,80,-20),o.color.set("#9ab8ff"),o.intensity=.35),r.intensity=.22+(1-tt)*.65,r.color.set("#cfe8ff").lerp(Bt.set("#2a3a5e"),tt),n.uniforms.uZenith.value.copy(ne("zen",_t,tt)),n.uniforms.uHorizon.value.copy(ne("hor",_t,tt)),n.uniforms.uSunColor.value.copy(ne("sun",_t,tt)),i.fog.color.copy(ne("fog",_t,tt)),_.uniforms.uFogColor.value.copy(i.fog.color),_.uniforms.uDeep.value.copy(ne("deep",_t,tt)),_.uniforms.uShallow.value.copy(ne("shal",_t,tt)),s.position.copy(t).multiplyScalar(290),s.material.opacity=Math.max(0,1-tt*1.6),It.position.set(-t.x*280,Math.max(.12,-J*.9+.15)*280*.5+40,-90),It.material.opacity=tt,Ct.opacity=tt*.9,ot.color.set("#ffffff").lerp(Bt.set("#27314e"),tt),v.material.color.set("#eaf8ff").lerp(Bt.set("#5a7a9e"),tt);for(const j of kt)j.bulbMat.emissiveIntensity=tt*1.6,j.halo.material.opacity=tt*.75,j.light.visible=tt>.05,j.light.intensity=tt*14;if(te.emissiveIntensity=tt*(1.1+Math.sin(vt*1.8)*.35),M.opacity=tt*.95,tt>.02){for(let j=0;j<R;j++){const ft=st[j],Lt=vt*ft.sp+ft.ph,ue=ft.x+Math.sin(Lt*.7)*4+Math.sin(Lt*1.9)*1.2,Kt=ft.z+Math.cos(Lt*.5)*4+Math.cos(Lt*2.3)*1.2;it.position.set(ue,Zt(ue,Kt)+.7+Math.sin(Lt*1.3)*.4,Kt),it.rotation.set(0,0,0),it.scale.setScalar(.7+Math.sin(Lt*6)*.45),it.updateMatrix(),G.setMatrixAt(j,it.matrix)}G.instanceMatrix.needsUpdate=!0}G.visible=tt>.02;for(const j of pt)j.g.visible=tt<.5;for(const j of Ht)j.g.visible=tt<.5;_.uniforms.uTime.value=vt,y.offset.y=vt*.025%1,v.material.opacity=.36+Math.sin(vt*.8)*.1,v.position.y=yn+.04+Math.sin(vt*.9)*.035;for(let j=0;j<D.length;j++){const ft=D[j],Lt=(vt*ft.sp+ft.off)%1,ue=Lt*1.6;it.position.set(Math.cos(ft.a)*ue,1.55+Lt*2.2-Lt*Lt*4.4,Math.sin(ft.a)*ue),it.rotation.set(0,0,0),it.scale.setScalar(1),it.updateMatrix(),x.setMatrixAt(j,it.matrix)}x.instanceMatrix.needsUpdate=!0;for(const j of et)j.position.x+=T*.7,j.position.x>200&&(j.position.x=-200);const bt=.65+Math.sin(vt*.11)*.25+Math.sin(vt*.037)*.2;for(const{g:j,phase:ft}of X)j.rotation.z=Math.sin(vt*.7+ft)*.018*bt,j.rotation.x=Math.cos(vt*.55+ft)*.011*bt;for(const j of pt){const ft=vt*j.speed+j.phase;let Lt=j.anchor.x+Math.sin(ft*.9)*5+Math.sin(ft*2.3)*1.2,ue=j.anchor.z+Math.cos(ft*.7)*5+Math.cos(ft*1.9)*1.2;for(const Nn of gt){const Ts=Lt-Nn.x,hi=ue-Nn.z,Fi=Math.hypot(Ts,hi)||1,As=Math.max(0,1-Fi/Nn.strength)*(1-Nn.age/2.2);Lt+=Ts/Fi*As*5,ue+=hi/Fi*As*5}const Kt=Zt(Lt,ue)+1+Math.sin(ft*1.7)*.45,oe=Lt-j.g.position.x,Qe=ue-j.g.position.z;Math.abs(oe)+Math.abs(Qe)>1e-4&&(j.g.rotation.y=Math.atan2(oe,Qe)),j.g.position.set(Lt,Kt,ue);const ws=Math.sin(vt*14+j.phase)*.75;j.wings[0].rotation.z=ws,j.wings[1].rotation.z=-ws}for(const j of Ht){const ft=vt*j.speed+j.phase,Lt=j.cx+Math.cos(ft)*j.r,ue=j.cz+Math.sin(ft)*j.r;j.g.position.set(Lt,j.h+Math.sin(vt*.8+j.phase)*1.6,ue),j.g.rotation.y=Math.atan2(-Math.sin(ft)*Math.sign(j.speed),Math.cos(ft)*Math.sign(j.speed))+(j.speed>0?0:Math.PI);const Kt=Math.sin(vt*9+j.phase)*.5;j.wings[0].rotation.z=Kt,j.wings[1].rotation.z=-Kt}for(let j=0;j<ct;j++){const ft=Yt[j];ft.x+=T*(.55+Math.sin(vt*.4+ft.ph)*.3),ft.z+=T*Math.cos(vt*.3+ft.ph)*.35,ft.y+=T*Math.sin(vt*.9+ft.ph)*.22;for(const Lt of gt){const ue=ft.x-Lt.x,Kt=ft.z-Lt.z,oe=Math.hypot(ue,Kt)||1,Qe=Math.max(0,1-oe/Lt.strength)*(1-Lt.age/2.2);ft.x+=ue/oe*Qe*T*5,ft.z+=Kt/oe*Qe*T*5,ft.y+=Qe*T*2}ft.x>105&&(ft.x=-105),ft.z>105?ft.z=-105:ft.z<-105&&(ft.z=105),ft.y<.25?ft.y=3.4:ft.y>3.8&&(ft.y=.3),it.position.set(ft.x,ft.y,ft.z),it.rotation.set(vt*ft.spin,ft.ph,vt*ft.spin*.7),it.scale.setScalar(1),it.updateMatrix(),xt.setMatrixAt(j,it.matrix)}xt.instanceMatrix.needsUpdate=!0;for(const j of L.values())j.spark.visible&&(j.spark.position.y=j.baseY+.95+Math.sin(vt*2.1+j.baseY)*.12,j.spark.rotation.y=vt*2.4,j.spark.material.opacity=.65+Math.sin(vt*3.7)*.3);return tt}function lt(T,P=8){!Array.isArray(T)||T.length<3||(gt.push({x:T[0],z:T[2],strength:P,age:0}),gt.length>12&&gt.shift())}return{update:O,updateDigs:ye,react:lt}}const ra=new Map,Ov=new Ce({color:"#172013",transparent:!0,opacity:.24,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1});function Vn(i){return ra.has(i)||ra.set(i,new he({color:i,flatShading:!0,roughness:.9})),ra.get(i)}function hh(i,t){const e=parseInt(i.slice(1),16),n=a=>Math.min(255,Math.max(0,Math.round(a*t))),s=n(e>>16),r=n(e>>8&255),o=n(e&255);return`#${(s<<16|r<<8|o).toString(16).padStart(6,"0")}`}function Ae(i,t,e,n){const s=new yt(new Re(i,t,e),Vn(n));return s.castShadow=!0,s}function we(i,t,e=7,n=5){const s=new yt(new on(i,e,n),Vn(t));return s.castShadow=!0,s}function Fc(i){const t=sv(i),e=t.build,n=i.primary||t.primary,s=i.secondary||t.secondary,r=new jt,o=new yt(new po(.72,20),Ov);o.rotation.x=-Math.PI/2,o.position.y=.018,o.scale.set(.72,1.05,1);const a=new jt;r.add(a);const c=e.legLen+e.bodyH/2;a.position.y=c;const l=Ae(e.bodyH*.95,e.bodyH,e.bodyLen,n);a.add(l);for(const U of[-1,1]){const N=we(e.bodyH*.52,n,7,5);N.scale.set(.95,.98,1),N.position.set(0,0,U*(e.bodyLen/2-e.bodyH*.3)),a.add(N)}const h=we(e.bodyH*.5,hh(s,.96),7,5);if(h.scale.set(.82,.5,e.bodyLen/(e.bodyH*1.05)),h.position.y=-e.bodyH*.32,a.add(h),e.fur==="fluffy"){const U=Ae(e.bodyH*1.1,e.bodyH*.9,e.bodyLen*.4,n);U.position.set(0,.02,e.bodyLen*.28),a.add(U)}if(e.fur==="curly")for(let U=0;U<5;U++){const N=we(e.bodyH*.32,n);N.position.set((U%2?1:-1)*.12,e.bodyH*.42,(U/4-.5)*e.bodyLen*.85),a.add(N)}if(i.pattern!=="none"){const U=Ae(e.bodyH*.7,e.bodyH*.6,.1,s);U.position.set(0,-e.bodyH*.15,e.bodyLen/2-.02),a.add(U)}if(i.pattern==="saddle"){const U=Ae(e.bodyH*1.02,e.bodyH*.45,e.bodyLen*.55,s);U.position.set(0,e.bodyH*.32,-e.bodyLen*.12),a.add(U)}if(i.pattern==="spots"){const U=[[.4,.25,.2],[-.42,.1,-.25],[.38,-.05,-.35],[-.35,.3,.32]];for(const[N,X,K]of U){const q=we(e.bodyH*.22,s,6,4);q.scale.set(1,1,1.4),q.position.set(N*e.bodyH*.55,X*e.bodyH,K*e.bodyLen),a.add(q)}}const u=new jt;u.position.set(0,e.bodyH*.42,e.bodyLen/2+.02),a.add(u);const d=i.pattern==="mask"?s:n,f=we(e.headR,n,8,6);if(f.position.set(0,e.headR*.55,e.headR*.4),u.add(f),i.pattern==="mask"){const U=we(e.headR*.88,d,8,6);U.position.set(0,e.headR*.38,e.headR*.62),u.add(U)}const g=Ae(e.headR*.75,e.headR*.6,e.snoutLen+.08,i.pattern==="none"?n:s);g.position.set(0,e.headR*.3,e.headR+e.snoutLen/2),u.add(g);const _=Ae(.07,.06,.06,"#1c1a1a");_.position.set(0,e.headR*.42,e.headR+e.snoutLen+.05),u.add(_);for(const U of[-1,1]){const N=we(e.headR*.34,n,6,4);N.position.set(U*e.headR*.42,e.headR*.3,e.headR*.72),u.add(N)}const m=[];for(const U of[-1,1]){const N=we(.045,"#141414",5,4);N.position.set(U*e.headR*.5,e.headR*.75,e.headR*.75);const X=new yt(new on(.014,4,3),new Ce({color:"#ffffff"}));X.position.set(.014,.016,.034),N.add(X),u.add(N),m.push(N)}const p=Ae(e.headR*.3,.03,.2,"#e87a8a");p.position.set(0,e.headR*.08,e.headR+e.snoutLen*.6),p.userData.restZ=p.position.z,p.visible=!1,u.add(p);const y=[];for(const U of[-1,1]){let N;e.ear==="pointy"?(N=new yt(new Rn(e.headR*.35,e.headR*.95,4),Vn(n)),N.position.set(U*e.headR*.55,e.headR*1.35,0)):e.ear==="floppy"?(N=Ae(e.headR*.42,e.headR*.85,.09,n),N.position.set(U*e.headR*.75,e.headR*.85,0),N.rotation.z=U*.55):(N=we(e.headR*.3,n,5,4),N.position.set(U*e.headR*.6,e.headR*1.15,0)),N.castShadow=!0,N.userData.restRotation=N.rotation.clone(),u.add(N),y.push(N)}if(i.accessory==="hat"){const U=new yt(new Be(e.headR*.95,e.headR*.95,.04,8),Vn("#c8342f"));U.position.set(0,e.headR*1.28,e.headR*.3);const N=new yt(new Be(e.headR*.55,e.headR*.6,e.headR*.5,8),Vn("#c8342f"));N.position.set(0,e.headR*1.5,e.headR*.3),u.add(U,N)}if(i.accessory==="glasses"){for(const N of[-1,1]){const X=Ae(e.headR*.42,e.headR*.34,.05,"#15181f");X.position.set(N*e.headR*.42,e.headR*.75,e.headR*.85),u.add(X)}const U=Ae(e.headR*.3,.04,.04,"#15181f");U.position.set(0,e.headR*.78,e.headR*.85),u.add(U)}if(i.accessory==="bandana"){const U=new yt(new Rn(e.headR*.8,e.headR*.9,4),Vn("#2f6fc8"));U.rotation.x=Math.PI,U.position.set(0,-e.headR*.15,e.headR*.35),u.add(U)}if(i.collar){const U=new yt(new qn(e.headR*.72,.05,5,10),Vn(i.collar));U.rotation.x=Math.PI/2-.35,U.position.set(0,-e.headR*.05,.02),u.add(U)}const v=[],S=Math.min(.16,e.bodyH*.3),F=e.bodyH*.42-S/2,w=e.bodyLen/2-S*.9,A=i.pattern==="socks"?s:n;for(const[U,N]of[[-1,1],[1,1],[-1,-1],[1,-1]]){const X=new jt;X.position.set(U*F,-e.bodyH/2+.05,N*w);const K=Ae(S,e.legLen*.65,S,n);K.position.y=-e.legLen*.32;const q=Ae(S*.85,e.legLen*.45,S*.85,A);q.position.y=-e.legLen*.82;const Q=Ae(S*1.05,S*.55,S*1.35,hh(A,.82));Q.position.set(0,-e.legLen*1.02,S*.18),X.add(K,q,Q),a.add(X),v.push(X)}const I=new jt;I.position.set(0,e.bodyH*.35,-e.bodyLen/2),a.add(I);let b;e.tail==="curled"?(b=new yt(new qn(.16,.055,5,8,Math.PI*1.4),Vn(n)),b.rotation.y=Math.PI/2,b.position.set(0,.14,-.05)):e.tail==="bob"?(b=we(.09,n,5,4),b.position.set(0,.05,-.05)):e.tail==="flag"?(b=Ae(.09,.3,.14,s),b.rotation.x=-.9,b.position.set(0,.12,-.14)):(b=Ae(.07,.07,.38,n),b.rotation.x=-.5,b.position.set(0,.08,-.16)),b.castShadow=!0,I.add(b);const x=new jt;x.position.set(0,e.headR*.2,e.headR+e.snoutLen+.12),u.add(x);const D=t.scale*(i.size||1);return r.scale.setScalar(D),{group:r,parts:{body:a,headPivot:u,legs:v,tailPivot:I,hipY:c,eyes:m,tongue:p,ears:y},mouth:x,contactShadow:o,breed:t}}const uh=["#c8574f","#4f7fc8","#57a06a","#c8a24f","#8a5fc8","#4fb8c8","#c86fa8","#7a8a99"],dh=["#3a4152","#5a4a3a","#2e3e35","#4a3a5a"],fh=["#e8b48c","#c88f62","#8a5f3f","#f0c8a0"];function Fv(i=0){const t=uh[i%uh.length],e=dh[i%dh.length],n=fh[i%fh.length],s=new jt,r=new jt;r.position.y=.86,s.add(r);const o=Ae(.42,.62,.24,t);o.position.y=.31,r.add(o);const a=we(.16,n,7,5);a.position.y=.75,r.add(a);const c=we(.165,i%3===0?"#3a2c1e":i%3===1?"#1d1d22":"#7a6a4a",7,5);c.scale.set(1,.72,1),c.position.set(0,.83,-.03),r.add(c);const l=[],h=[];for(const u of[-1,1]){const d=new jt;d.position.set(u*.27,.58,0);const f=Ae(.11,.5,.11,t);f.position.y=-.25;const g=we(.06,n,5,4);g.position.y=-.52,d.add(f,g),r.add(d),l.push(d);const _=new jt;_.position.set(u*.12,0,0);const m=Ae(.14,.86,.14,e);m.position.y=-.43,_.add(m),r.add(_),h.push(_)}return{group:s,parts:{torso:r,arms:l,legs:h}}}const ph=["#a4623a","#8a5230","#b87a4a","#6e4a34"];function zv(i=0){const t=ph[i%ph.length],e="#e8d5b8",n=new jt,s=new jt;s.position.y=.16,n.add(s);const r=we(.14,t,7,5);r.scale.set(.85,.9,1.25),s.add(r);const o=we(.09,e,6,4);o.position.set(0,-.02,.08),s.add(o);const a=new jt;a.position.set(0,.1,.14),s.add(a);const c=we(.095,t,7,5);c.position.set(0,.03,.03),a.add(c);const l=we(.045,e,5,4);l.position.set(0,0,.12),a.add(l);const h=we(.018,"#2a1c14",4,3);h.position.set(0,.005,.155),a.add(h);for(const f of[-1,1]){const g=new yt(new Rn(.03,.07,4),Vn(t));g.position.set(f*.055,.12,0),a.add(g);const _=we(.016,"#141414",4,3);_.position.set(f*.06,.05,.1),a.add(_)}const u=new jt;u.position.set(0,.04,-.15),s.add(u),[[0,0,-.06],[0,.06,-.12],[0,.16,-.14],[0,.26,-.1],[0,.32,-.02]].forEach(([f,g,_],m)=>{const p=we(.05+Math.sin(m/4*Math.PI)*.035,t,6,4);p.position.set(f,g,_),u.add(p)});for(const[f,g]of[[-1,1],[1,1],[-1,-1],[1,-1]]){const _=Ae(.035,.09,.035,t);_.position.set(f*.07,-.13,g*.09),s.add(_)}return{group:n,parts:{body:s,headPivot:a,tailPivot:u}}}function _o(i,{font:t="600 26px system-ui",pad:e=10,bg:n="rgba(16,19,26,0.72)",fg:s="#fff"}={}){const r=document.createElement("canvas"),o=r.getContext("2d");o.font=t;const a=Math.ceil(o.measureText(i).width)+e*2,c=40+e;r.width=a,r.height=c,o.font=t,o.fillStyle=n,Bv(o,0,0,a,c,12),o.fill(),o.fillStyle=s,o.textAlign="center",o.textBaseline="middle",o.fillText(i,a/2,c/2+1);const l=new Oi(r);l.colorSpace=$e;const h=new qr(new Gs({map:l,depthTest:!1,transparent:!0})),u=.008;return h.scale.set(a*u,c*u,1),h.renderOrder=10,h}function Bv(i,t,e,n,s,r){i.beginPath(),i.moveTo(t+r,e),i.arcTo(t+n,e,t+n,e+s,r),i.arcTo(t+n,e+s,t,e+s,r),i.arcTo(t,e+s,t,e,r),i.arcTo(t,e,t+n,e,r),i.closePath()}function zc(i,t,e,n=0,s=0){const r=i.parts;i.phase=(i.phase||0)+e*(4+n*2.2);const o=i.phase;r.body.position.y=r.hipY,r.body.rotation.set(0,0,0),r.headPivot.rotation.set(0,0,0);for(const c of r.legs)c.rotation.set(0,0,0);r.tailPivot.rotation.set(0,0,0),r.body.scale.set(1,1,1);for(const c of r.ears||[])c.rotation.copy(c.userData.restRotation);r.tongue&&(r.tongue.position.z=r.tongue.userData.restZ);const a=(c,l)=>{r.tailPivot.rotation.y=Math.sin(o*c)*l};switch(t){case"run":{const c=Math.sin(o*2.2);r.legs[0].rotation.x=c*.65,r.legs[3].rotation.x=c*.65,r.legs[1].rotation.x=-c*.65,r.legs[2].rotation.x=-c*.65,r.body.position.y=r.hipY+Math.abs(Math.sin(o*2.2))*.06,a(3,.25);break}case"sprint":{const c=Math.sin(o*2.6);r.legs[0].rotation.x=c*1.05,r.legs[1].rotation.x=c*1.05,r.legs[2].rotation.x=-c*1.05,r.legs[3].rotation.x=-c*1.05,r.body.rotation.x=-c*.13,r.body.position.y=r.hipY+Math.max(0,Math.sin(o*2.6+.7))*.13,r.headPivot.rotation.x=c*.08,a(2.6,.2),r.tailPivot.rotation.x=-.25+c*.15;break}case"air":r.legs[0].rotation.x=.9,r.legs[1].rotation.x=.9,r.legs[2].rotation.x=-.9,r.legs[3].rotation.x=-.9,r.body.rotation.x=-.15,r.tailPivot.rotation.x=.4;break;case"swim":{const c=Math.sin(o*3.4);r.body.rotation.x=.12,r.headPivot.rotation.x=-.35,r.legs[0].rotation.x=c*.5,r.legs[1].rotation.x=-c*.5,r.legs[2].rotation.x=-c*.5,r.legs[3].rotation.x=c*.5,r.body.position.y=r.hipY+Math.sin(o*1.1)*.03;break}case"sit":r.body.rotation.x=-.5,r.body.position.y=r.hipY*.72,r.legs[2].rotation.x=1.5,r.legs[3].rotation.x=1.5,r.legs[0].rotation.x=.5,r.legs[1].rotation.x=.5,r.headPivot.rotation.x=.12,a(6,.18);break;case"lay":r.body.position.y=r.hipY*.45;for(const c of r.legs)c.rotation.x=1.5;r.headPivot.rotation.x=.22;break;case"wag":r.body.position.y=r.hipY+Math.sin(o*.8)*.015,a(14,.55),r.body.rotation.z=Math.sin(o*14)*.03;break;case"roll":r.body.rotation.z=o*4,r.body.position.y=r.hipY*.8;for(const c of r.legs)c.rotation.x=.6;break;case"dig":{const c=Math.sin(o*7);r.body.rotation.x=.22,r.headPivot.rotation.x=.55,r.legs[0].rotation.x=.7+c*.7,r.legs[1].rotation.x=.7-c*.7,a(10,.3);break}case"howl":r.body.rotation.x=-.28,r.body.position.y=r.hipY*.85,r.headPivot.rotation.x=-.85,r.legs[2].rotation.x=1.1,r.legs[3].rotation.x=1.1;break;default:r.body.position.y=r.hipY+Math.sin(o*.8)*.015,a(2.2,.12),r.headPivot.rotation.y=Math.sin(o*.35)*.15}(t==="run"||t==="sprint"||t==="air"||t==="idle")&&(r.body.rotation.z+=s),(t==="idle"||t==="run"||t==="sprint")&&(r.headPivot.rotation.y+=i.lookYaw||0,r.headPivot.rotation.x+=i.lookPitch||0);for(let c=0;c<(r.ears||[]).length;c++){const l=r.ears[c],h=c===0?-1:1;l.rotation.x+=Math.sin(o*1.7+c)*.045-Math.min(.22,n*.02),l.rotation.z+=h*Math.sin(o*2.1+c*.7)*.035}if(i.squash>0){i.squash=Math.max(0,i.squash-e*3.2);const c=Math.sin(i.squash/.3*Math.PI)*.22;r.body.scale.set(1+c*.6,1-c,1+c*.4),r.body.position.y-=r.hipY*c*.35}if(r.eyes){const c=o%3.7>3.55?.12:1;for(const l of r.eyes)l.scale.y=c}if(r.tongue){const c=t==="sprint"||t==="wag"||t==="sit";r.tongue.visible=c,c&&(r.tongue.position.z=r.tongue.userData.restZ+Math.sin(o*8)*.008)}}function kv(i,t,e){const n=i.parts;i.phase=(i.phase||0)+e;const s=i.phase;n.torso.rotation.set(0,0,0),n.torso.position.y=.86;for(const r of n.arms)r.rotation.set(0,0,0);for(const r of n.legs)r.rotation.set(0,0,0);switch(t){case"walk":{const r=Math.sin(s*6);n.legs[0].rotation.x=r*.5,n.legs[1].rotation.x=-r*.5,n.arms[0].rotation.x=-r*.35,n.arms[1].rotation.x=r*.35;break}case"pet":n.torso.rotation.x=.55,n.arms[0].rotation.x=-1.1+Math.sin(s*6)*.18,n.arms[1].rotation.x=-.3;break;case"wave":n.arms[0].rotation.z=-2.4,n.arms[0].rotation.x=Math.sin(s*9)*.35,n.torso.rotation.z=.08;break;case"flinch":n.arms[0].rotation.x=-2.6,n.arms[1].rotation.x=-2.6,n.torso.position.y=.86+Math.abs(Math.sin(s*18))*.08,n.torso.rotation.x=-.12;break;case"flee":{const r=Math.sin(s*11);n.legs[0].rotation.x=r*.9,n.legs[1].rotation.x=-r*.9,n.arms[0].rotation.x=-2.4,n.arms[1].rotation.x=-2.4,n.torso.rotation.x=.18;break}default:n.torso.position.y=.86+Math.sin(s*1.4)*.012,n.arms[0].rotation.z=Math.sin(s*1.4)*.05,n.arms[1].rotation.z=-Math.sin(s*1.4)*.05}}function Hv(i,t,e){const n=i.parts;i.phase=(i.phase||0)+e;const s=i.phase;switch(n.body.position.y=.16,n.body.rotation.set(0,0,0),n.headPivot.rotation.set(0,0,0),n.tailPivot.rotation.set(0,0,0),t){case"alert":n.body.rotation.x=-1.15,n.body.position.y=.24,n.headPivot.rotation.x=1,n.tailPivot.rotation.x=.5+Math.sin(s*18)*.1;break;case"flee":{const r=Math.abs(Math.sin(s*11));n.body.position.y=.16+r*.16,n.body.rotation.x=Math.sin(s*11)*.35,n.tailPivot.rotation.x=-.35+Math.sin(s*11)*.25;break}default:{const r=Math.max(0,Math.sin(s*6));n.body.position.y=.16+r*.05,n.headPivot.rotation.x=.35+Math.sin(s*2.2)*.25,n.tailPivot.rotation.x=Math.sin(s*3.1)*.14,n.tailPivot.rotation.y=Math.sin(s*1.7)*.1}}}class Vv{constructor(t){this.scene=t,this.live=[]}add(t,e,n){this.scene.add(t),this.live.push({obj:t,ttl:e,age:0,tick:n})}ring(t,e="#ffd166",n=6,s=.7){const r=new Dc(.9,1,32),o=new Ce({color:e,transparent:!0,side:rn,depthWrite:!1}),a=new yt(r,o);a.rotation.x=-Math.PI/2,a.position.set(t[0],t[1]+.25,t[2]),this.add(a,s,(c,l,h)=>{const u=1+h*n;c.obj.scale.set(u,u,1),c.obj.material.opacity=1-h})}burst(t,{color:e="#ffffff",n=10,speed:s=3,up:r=3,size:o=.09,ttl:a=.6,gravity:c=-9}={}){const l=new on(o,4,3),h=new Ce({color:e,transparent:!0}),u=new wn(l,h,n),d=[];for(let g=0;g<n;g++){const _=Math.random()*Math.PI*2,m=s*(.4+Math.random()*.6);d.push({x:t[0],y:t[1]+.3,z:t[2],vx:Math.cos(_)*m,vy:r*(.5+Math.random()),vz:Math.sin(_)*m})}const f=new pe;this.add(u,a,(g,_,m)=>{for(let p=0;p<n;p++){const y=d[p];y.vy+=c*_,y.x+=y.vx*_,y.y+=y.vy*_,y.z+=y.vz*_,f.position.set(y.x,Math.max(.05,y.y),y.z),f.scale.setScalar(1-m*.7),f.updateMatrix(),u.setMatrixAt(p,f.matrix)}u.instanceMatrix.needsUpdate=!0,h.opacity=1-m*m})}hearts(t,e=4){for(let n=0;n<e;n++){const s=qv();s.position.set(t[0]+(Math.random()-.5),t[1]+.8,t[2]+(Math.random()-.5));const r=(Math.random()-.5)*.6;this.add(s,1.4+Math.random()*.4,(o,a,c)=>{o.obj.position.y+=a*1.1,o.obj.position.x+=r*a,o.obj.rotation.y+=a*3,o.obj.material.opacity=1-c*c})}}update(t,e){var n,s;for(let r=this.live.length-1;r>=0;r--){const o=this.live[r];o.age+=t;const a=Math.min(1,o.age/o.ttl);o.tick(o,t,a),o.age>=o.ttl&&(this.scene.remove(o.obj),(n=o.obj.geometry)==null||n.dispose(),(s=o.obj.material)==null||s.dispose(),this.live.splice(r,1))}}}const Bs=96,Gv=7;class Wv{constructor(t){this.mesh=new wn(new An(.22,.28),new Ce({map:Xv(),transparent:!0,depthWrite:!1,color:"#3a3026",opacity:.55}),Bs),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1,t.add(this.mesh),this.slots=new Array(Bs).fill(null),this.next=0,this.dummy=new pe,this.dummy.position.set(0,-50,0),this.dummy.updateMatrix();for(let e=0;e<Bs;e++)this.mesh.setMatrixAt(e,this.dummy.matrix)}stamp(t,e,n,s,r){const o=this.next;this.next=(this.next+1)%Bs,this.slots[o]={age:0,i:o};const a=this.dummy;a.position.set(t+Math.cos(s)*r*.14,e+.02,n-Math.sin(s)*r*.14),a.rotation.set(-Math.PI/2,0,-s),a.scale.setScalar(1),a.updateMatrix(),this.mesh.setMatrixAt(o,a.matrix),this.mesh.instanceMatrix.needsUpdate=!0}update(t){let e=!1;for(let n=0;n<Bs;n++){const s=this.slots[n];s&&(s.age+=t,s.age>=Gv&&(this.slots[n]=null,this.dummy.position.set(0,-50,0),this.dummy.scale.setScalar(.001),this.dummy.updateMatrix(),this.mesh.setMatrixAt(n,this.dummy.matrix),e=!0))}e&&(this.mesh.instanceMatrix.needsUpdate=!0)}}function Xv(){const i=document.createElement("canvas");i.width=i.height=64;const t=i.getContext("2d");t.fillStyle="#fff";const e=(s,r,o,a)=>{t.beginPath(),t.ellipse(s,r,o,a,0,0,7),t.fill()};return e(32,42,13,11),e(14,24,6,8),e(28,16,6,8),e(42,17,6,8),e(52,27,5,7),new Oi(i)}function qv(){const i=new cu;i.moveTo(0,-.12),i.bezierCurveTo(-.22,.08,-.1,.22,0,.1),i.bezierCurveTo(.1,.22,.22,.08,0,-.12);const t=new Ic(i),e=new Ce({color:"#ff6b8a",transparent:!0,side:rn,depthWrite:!1});return new yt(t,e)}const mh=22050;async function $n(i,t){const e=new OfflineAudioContext(1,Math.ceil(i*mh),mh);return t(e),e.startRendering()}function vo(i,t){const e=i.createBuffer(1,Math.ceil(t*i.sampleRate),i.sampleRate),n=e.getChannelData(0);for(let s=0;s<n.length;s++)n[s]=Math.random()*2-1;return e}function dn(i,t,e){const n=i.createGain();n.gain.setValueAtTime(e[0][1],e[0][0]);for(const[s,r]of e.slice(1))n.gain.exponentialRampToValueAtTime(Math.max(1e-4,r),s);return t.connect(n),n.connect(i.destination),n}const Yv=()=>$n(.3,i=>{const t=i.createOscillator();t.type="sine",t.frequency.setValueAtTime(150,0),t.frequency.exponentialRampToValueAtTime(65,.18),dn(i,t,[[0,1e-4],[.012,.75],[.2,1e-4]]);const e=i.createOscillator();e.type="sawtooth",e.frequency.setValueAtTime(410,0),e.frequency.exponentialRampToValueAtTime(240,.06),e.frequency.exponentialRampToValueAtTime(120,.22);const n=i.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(950,0),n.frequency.exponentialRampToValueAtTime(480,.16),n.Q.value=2.2,e.connect(n),dn(i,n,[[0,1e-4],[.018,1],[.12,.5],[.26,1e-4]]);const s=i.createBufferSource();s.buffer=vo(i,.14);const r=i.createBiquadFilter();r.type="bandpass",r.frequency.value=1400,r.Q.value=.9,s.connect(r),dn(i,r,[[0,1e-4],[.008,.4],[.11,1e-4]]),t.start(),e.start(),s.start()}),$v=()=>$n(.16,i=>{const t=i.createOscillator();t.type="sine",t.frequency.setValueAtTime(110,0),t.frequency.exponentialRampToValueAtTime(45,.13),dn(i,t,[[0,1e-4],[.008,.6],[.14,1e-4]]);const e=i.createBufferSource();e.buffer=vo(i,.05);const n=i.createBiquadFilter();n.type="lowpass",n.frequency.value=700,e.connect(n),dn(i,n,[[0,1e-4],[.006,.25],[.045,1e-4]]),t.start(),e.start()}),Kv=()=>$n(.3,i=>{const t=i.createOscillator();t.type="triangle",t.frequency.setValueAtTime(700,0),t.frequency.exponentialRampToValueAtTime(1400,.08),t.frequency.exponentialRampToValueAtTime(500,.26),dn(i,t,[[0,1e-4],[.02,.7],[.28,1e-4]]),t.start()}),Jv=()=>$n(1.8,i=>{const t=i.createOscillator();t.type="sine",t.frequency.setValueAtTime(320,0),t.frequency.exponentialRampToValueAtTime(520,.5),t.frequency.setValueAtTime(520,1),t.frequency.exponentialRampToValueAtTime(300,1.7);const e=i.createOscillator();e.frequency.value=5.5;const n=i.createGain();n.gain.value=14,e.connect(n),n.connect(t.frequency),dn(i,t,[[0,1e-4],[.15,.55],[1.3,.4],[1.75,1e-4]]),t.start(),e.start()}),Zv=()=>$n(.5,i=>{const t=i.createBufferSource();t.buffer=vo(i,.5);const e=i.createBiquadFilter();e.type="lowpass",e.frequency.setValueAtTime(2400,0),e.frequency.exponentialRampToValueAtTime(300,.45),t.connect(e),dn(i,e,[[0,1e-4],[.02,.8],[.45,1e-4]]),t.start()}),jv=()=>$n(.12,i=>{const t=i.createOscillator();t.type="square",t.frequency.setValueAtTime(500,0),t.frequency.exponentialRampToValueAtTime(900,.08),dn(i,t,[[0,1e-4],[.01,.4],[.1,1e-4]]),t.start()}),Qv=()=>$n(.35,i=>{const t=i.createBufferSource();t.buffer=vo(i,.35);const e=i.createBiquadFilter();e.type="bandpass",e.Q.value=2,e.frequency.setValueAtTime(400,0),e.frequency.exponentialRampToValueAtTime(1800,.3),t.connect(e),dn(i,e,[[0,1e-4],[.05,.5],[.32,1e-4]]),t.start()}),tx=()=>$n(.7,i=>{for(const[t,e]of[[660,0],[880,.12],[1100,.24]]){const n=i.createOscillator();n.type="sine",n.frequency.value=t,dn(i,n,[[e,1e-4],[e+.02,.3],[e+.4,1e-4]]),n.start(e)}}),ex=()=>$n(.4,i=>{const t=i.createOscillator();t.type="sawtooth",t.frequency.setValueAtTime(90,0);const e=i.createOscillator();e.frequency.value=22;const n=i.createGain();n.gain.value=30,e.connect(n),n.connect(t.frequency),dn(i,t,[[0,1e-4],[.03,.5],[.38,1e-4]]),t.start(),e.start()});class nx{constructor(t){this.listener=new B_,t.add(this.listener),this.buffers={},this.ready=!1,this.scene=null,this._ambient=!1}async init(t){var u,d;if(this.ready)return;this.scene=t,(d=(u=this.listener.context).resume)==null||d.call(u);const[e,n,s,r,o,a,c,l,h]=await Promise.all([Yv(),Kv(),Jv(),Zv(),jv(),Qv(),tx(),ex(),$v()]);this.buffers={bark:e,yelp:n,howl:s,splash:r,pop:o,whoosh:a,chime:c,growl:l,thud:h},this.ready=!0,this.nightK=0,this.startAmbient()}toggleMute(){return this.muted=!this.muted,this.listener.setMasterVolume(this.muted?0:1),this.muted}play(t,e=null,n=1,s=1){if(!this.ready||!this.buffers[t])return;if(!e){const a=new pu(this.listener);a.setBuffer(this.buffers[t]),a.setVolume(n),a.setPlaybackRate(s),a.play();return}const r=new pe;r.position.set(e[0],e[1]+.5,e[2]);const o=new H_(this.listener);o.setBuffer(this.buffers[t]),o.setRefDistance(6),o.setMaxDistance(60),o.setVolume(n),o.setPlaybackRate(s),r.add(o),this.scene.add(r),o.play(),o.source.onended=()=>this.scene.remove(r)}startAmbient(){if(this._ambient)return;this._ambient=!0;const t=this.listener.context,e=t.createBufferSource(),n=t.createBuffer(1,t.sampleRate*2,t.sampleRate),s=n.getChannelData(0);let r=0;for(let c=0;c<s.length;c++)r=(r+(Math.random()*2-1)*.04)*.98,s[c]=r*6;e.buffer=n,e.loop=!0;const o=t.createBiquadFilter();o.type="lowpass",o.frequency.value=420,this.seaGain=t.createGain(),this.seaGain.gain.value=.02,e.connect(o),o.connect(this.seaGain),this.seaGain.connect(this.listener.getInput()),e.start();const a=()=>{if(!this._ambient)return;const c=t.currentTime+.05,l=t.createOscillator();l.type="sine";const h=t.createGain();if(h.gain.value=0,l.connect(h),h.connect(this.listener.getInput()),this.nightK>.5){const u=3800+Math.random()*900,d=6+Math.floor(Math.random()*5);for(let f=0;f<d;f++){const g=c+f*.055;l.frequency.setValueAtTime(u,g),h.gain.setValueAtTime(0,g),h.gain.linearRampToValueAtTime(.022,g+.012),h.gain.linearRampToValueAtTime(0,g+.045)}l.start(c),l.stop(c+d*.055+.1),setTimeout(a,900+Math.random()*2200)}else{const u=2200+Math.random()*1600,d=2+Math.floor(Math.random()*3);for(let f=0;f<d;f++){const g=c+f*.14;l.frequency.setValueAtTime(u,g),l.frequency.exponentialRampToValueAtTime(u*(1.2+Math.random()*.3),g+.07),h.gain.setValueAtTime(0,g),h.gain.linearRampToValueAtTime(.05,g+.02),h.gain.linearRampToValueAtTime(0,g+.11)}l.start(c),l.stop(c+d*.14+.1),setTimeout(a,2500+Math.random()*5e3)}};a()}setNight(t){this.nightK=t}setSeaProximity(t){if(!this.seaGain)return;const e=Math.min(1,Math.max(0,(t-10)/70));this.seaGain.gain.value=.015+e*.12}}const ix=1e4,sx=3e3,rx=1e4;function ox(i,t=Math.random()){const e=Math.min(15e3,1e3*2**Math.min(i,4));return Math.round(e*(.8+t*.4))}const ax=4,cx=90;function lx(){return`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`}class hx{constructor(){this.ws=null,this.id=null,this.connected=!1,this.connection=null,this.shouldReconnect=!1,this.reconnectAttempt=0,this.reconnectTimer=null,this.connectTimer=null,this.watchdogTimer=null,this.lastMessageAt=0,this.seq=0,this.pending=[],this.move=oh(),this.smooth={x:0,y:0,z:0},this.speedMul=1,this.myBall=null,this.myAnim="idle",this.myEmote="none",this.dogs=new Map,this.balls=new Map,this.npcs=new Map,this.squirrels=new Map,this.digs=new Map,this.parkEvent=null,this.listeners=new Map}on(t,e){this.listeners.has(t)||this.listeners.set(t,new Set),this.listeners.get(t).add(e)}emit(t,e){var n;(n=this.listeners.get(t))==null||n.forEach(s=>s(e))}connect(t,e,n=[]){this.connection={name:t,customization:e,discoveries:n},this.shouldReconnect=!0,this.openSocket()}openSocket(){var e,n;if(!this.shouldReconnect||!this.connection||((e=this.ws)==null?void 0:e.readyState)===WebSocket.OPEN||((n=this.ws)==null?void 0:n.readyState)===WebSocket.CONNECTING)return;clearTimeout(this.reconnectTimer);const t=new WebSocket(lx());this.ws=t,this.connectTimer=setTimeout(()=>{this.ws===t&&t.readyState===WebSocket.CONNECTING&&t.close()},rx),t.onopen=()=>{if(this.ws!==t)return;clearTimeout(this.connectTimer),this.connectTimer=null,this.lastMessageAt=Date.now(),this.startWatchdog(t);const{name:s,customization:r,discoveries:o}=this.connection;t.send(JSON.stringify({t:En.JOIN,name:s,dog:r,discoveries:o}))},t.onmessage=s=>{if(this.ws!==t)return;clearTimeout(this.connectTimer),this.connectTimer=null,this.lastMessageAt=Date.now();let r;try{r=JSON.parse(s.data)}catch{return}this.onMessage(r)},t.onclose=()=>{this.ws===t&&(clearTimeout(this.connectTimer),this.connectTimer=null,this.stopWatchdog(),this.ws=null,this.connected=!1,this.emit("disconnect"),this.scheduleReconnect())},t.onerror=()=>{}}scheduleReconnect(){if(!this.shouldReconnect||this.reconnectTimer)return;const t=ox(this.reconnectAttempt++);this.emit("reconnecting",{attempt:this.reconnectAttempt,delay:t}),this.reconnectTimer=setTimeout(()=>{this.reconnectTimer=null,this.openSocket()},t)}startWatchdog(t){this.stopWatchdog(),this.watchdogTimer=setInterval(()=>{this.ws!==t||t.readyState!==WebSocket.OPEN||Date.now()-this.lastMessageAt>ix&&t.close(4e3,"stale connection")},sx)}stopWatchdog(){clearInterval(this.watchdogTimer),this.watchdogTimer=null}send(t){var e;((e=this.ws)==null?void 0:e.readyState)===1&&this.ws.send(JSON.stringify(t))}onMessage(t){var e;switch(t.t){case ni.WELCOME:{this.resetSession(),this.id=t.id,this.connected=!0,this.reconnectAttempt=0;const[n,s,r]=t.you.p;this.move=oh(n,r),this.move.y=s;for(const o of t.dogs)this.upsertDog(o);for(const o of t.balls)this.upsertBall(o);for(const o of t.npcs)this.upsertNpc(o);for(const o of t.sq||[])this.upsertSquirrel(o);for(const o of t.digs||[])this.digs.set(o.id,o.b);this.parkEvent=((e=t.settings)==null?void 0:e.parkEvent)||null,this.emit("welcome",t);break}case ni.STATE:this.onState(t);break;case ni.JOIN:this.upsertDog(t.dog),this.emit("dogjoin",t.dog);break;case ni.LEAVE:this.dogs.delete(t.id),this.emit("dogleave",t.id);break;case ni.EVENT:this.emit("event",t);break;case ni.SCORE:this.emit("score",t);break;case ni.LEADERBOARD:this.emit("leaderboard",t);break;case ni.PARK:this.parkEvent=t.event,this.emit("park",t.event);break}}resetSession(){this.seq=0,this.pending=[],this.myBall=null,this.myAnim="idle",this.myEmote="none",this.smooth={x:0,y:0,z:0},this.dogs.clear(),this.balls.clear(),this.npcs.clear(),this.squirrels.clear(),this.digs.clear()}onState(t){const e=performance.now(),n=new Set,s=new Set;for(const o of t.dogs){if(o.id===this.id){this.reconcile(o,t.ack),this.myBall=o.ball;continue}n.add(o.id),this.upsertDog(o,e)}for(const o of t.balls)s.add(o.id),this.upsertBall(o,e);for(const o of t.npcs)this.upsertNpc(o,e);const r=new Set;for(const o of t.sq||[])r.add(o.id),this.upsertSquirrel(o,e);for(const o of t.digs||[])this.digs.set(o.id,o.b);for(const o of this.dogs.keys())n.has(o)||this.dogs.delete(o);for(const o of this.balls.keys())s.has(o)||this.balls.delete(o);for(const o of this.squirrels.keys())r.has(o)||this.squirrels.delete(o);this.emit("state",t)}upsertDog(t,e=performance.now()){let n=this.dogs.get(t.id);n||(n={info:{n:t.n,c:t.c},buf:[],ball:null,chat:null},this.dogs.set(t.id,n)),n.info.n=t.n,n.info.c=t.c,n.ball=t.ball,n.chat=t.chat,n.buf.push({t:e,p:t.p,ry:t.ry,v:t.v,anim:t.anim}),n.buf.length>30&&n.buf.splice(0,n.buf.length-30)}upsertBall(t,e=performance.now()){this.balls.set(t.id,{t:e,p:t.p,v:t.v,holder:t.holder,spawner:t.spawner})}upsertNpc(t,e=performance.now()){let n=this.npcs.get(t.id);n||(n={buf:[],st:t.st},this.npcs.set(t.id,n)),n.st=t.st,n.buf.push({t:e,p:t.p,ry:t.ry}),n.buf.length>30&&n.buf.splice(0,n.buf.length-30)}upsertSquirrel(t,e=performance.now()){let n=this.squirrels.get(t.id);n||(n={buf:[],st:t.st},this.squirrels.set(t.id,n)),n.st=t.st,n.buf.push({t:e,p:t.p,ry:t.ry}),n.buf.length>30&&n.buf.splice(0,n.buf.length-30)}applyInput(t,e){const n={...t,seq:++this.seq,dt:e};ah(this.move,n,e,this.speedMul),this.pending.push(n),this.pending.length>cx&&this.pending.shift(),this.send({t:En.INPUT,...n})}reconcile(t,e){this.myAnim=t.anim;const n={x:this.move.x,y:this.move.y,z:this.move.z},[s,r,o]=t.p,[a,c,l]=t.v,h=this.move;h.x=s,h.y=r,h.z=o,h.vx=a,h.vy=c,h.vz=l,h.yaw=t.ry,h.swimming=_u(s,o),h.grounded=!h.swimming&&Math.abs(r-Zt(s,o))<.02&&Math.abs(c)<.01,h.swimming&&(h.y=yn-.15),this.pending=this.pending.filter(g=>g.seq>e);for(const g of this.pending)ah(h,g,g.dt,this.speedMul);const u=n.x-h.x,d=n.y-h.y,f=n.z-h.z;Math.hypot(u,d,f)<ax?(this.smooth.x+=u,this.smooth.y+=d,this.smooth.z+=f):this.smooth.x=this.smooth.y=this.smooth.z=0}renderPos(t){const e=Math.pow(.001,t);return this.smooth.x*=e,this.smooth.y*=e,this.smooth.z*=e,{x:this.move.x+this.smooth.x,y:this.move.y+this.smooth.y,z:this.move.z+this.smooth.z}}sample(t,e=performance.now()){if(!t.length)return null;const n=e-G_;if(n<=t[0].t)return t[0];for(let s=t.length-1;s>=0;s--)if(t[s].t<=n){const r=t[s],o=t[s+1];if(!o)return r;const a=Math.min(1,(n-r.t)/Math.max(1,o.t-r.t));return{p:[oa(r.p[0],o.p[0],a),oa(r.p[1],o.p[1],a),oa(r.p[2],o.p[2],a)],ry:ux(r.ry,o.ry,a),v:o.v||r.v,anim:o.anim??r.anim}}return t[t.length-1]}bark(){this.send({t:En.BARK})}bite(t){this.send({t:En.BITE,target:t})}emote(t){this.myEmote=t,this.send({t:En.EMOTE,emote:t})}grab(t){this.send({t:En.GRAB,ball:t})}drop(){this.send({t:En.DROP})}throw(t,e){this.send({t:En.THROW,dir:t,power:e})}chat(t){this.send({t:En.CHAT,text:t})}sniff(){this.send({t:En.SNIFF})}}function oa(i,t,e){return i+(t-i)*e}function ux(i,t,e){let n=t-i;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return i+n*e}const gh={KeyC:"sit",KeyX:"lay",KeyV:"wag",KeyR:"roll",KeyG:"dig",KeyH:"howl"};class dx{constructor(t,e){this.canvas=t,this.actions=e,this.keys=new Set,this.yaw=0,this.pitch=-.35,this.enabled=!0,this.charging=!1,this.chargeStart=0,t.addEventListener("click",()=>{this.enabled&&document.pointerLockElement!==t&&t.requestPointerLock()}),document.addEventListener("mousemove",n=>{document.pointerLockElement===t&&(this.yaw+=n.movementX*.0026,this.pitch=Math.max(-1.2,Math.min(.5,this.pitch-n.movementY*.0022)))}),document.addEventListener("mousedown",n=>{document.pointerLockElement!==t||n.button!==0||this.startCharge()}),document.addEventListener("mouseup",n=>{n.button===0&&this.releaseCharge()}),document.addEventListener("keydown",n=>{var s,r,o,a,c,l;if(this.enabled){if(n.code==="Enter"){n.preventDefault(),this.actions.chatOpen();return}if(this.keys.add(n.code),!n.repeat)switch(n.code){case"KeyB":this.actions.bark();break;case"KeyF":this.actions.bite();break;case"KeyE":this.actions.grabDrop();break;case"KeyQ":this.startCharge();break;case"KeyM":(r=(s=this.actions).mute)==null||r.call(s);break;case"KeyN":(a=(o=this.actions).sniff)==null||a.call(o);break;case"KeyJ":(l=(c=this.actions).journal)==null||l.call(c);break;default:gh[n.code]&&this.actions.emote(gh[n.code])}}}),document.addEventListener("keyup",n=>{this.keys.delete(n.code),n.code==="KeyQ"&&this.releaseCharge()}),window.addEventListener("blur",()=>this.keys.clear())}startCharge(){this.charging||(this.charging=!0,this.chargeStart=performance.now(),this.actions.throwStart())}releaseCharge(){this.charging&&(this.charging=!1,this.actions.throwRelease(this.chargePower()))}chargePower(){return Math.min(1,(performance.now()-this.chargeStart)/1100)}sample(){const t=this.keys,e=n=>this.enabled&&t.has(n);return{f:e("KeyW")||e("ArrowUp"),b:e("KeyS")||e("ArrowDown"),l:e("KeyA")||e("ArrowLeft"),r:e("KeyD")||e("ArrowRight"),sprint:e("ShiftLeft")||e("ShiftRight"),jump:e("Space"),yaw:this.yaw}}}const $t=i=>document.getElementById(i),as=[{id:"bark",label:"Bark hello",ev:(i,t)=>i.kind==="bark"&&i.id===t},{id:"fetch",label:"Pick up a ball",ev:(i,t)=>i.kind==="pickup"&&i.dog===t},{id:"catch",label:"Catch a ball mid-air",ev:(i,t)=>i.kind==="pickup"&&i.dog===t&&i.caught},{id:"pet",label:"Get petted by a human",ev:(i,t)=>i.kind==="pet"&&i.dog===t},{id:"swim",label:"Go for a swim",local:"swim"},{id:"howl",label:"Howl with a friend",ev:(i,t)=>{var e;return i.kind==="grouphowl"&&((e=i.ids)==null?void 0:e.includes(t))}},{id:"chase",label:"Chase a squirrel",ev:(i,t)=>i.kind==="chase"&&i.dog===t},{id:"dig",label:"Dig up a treasure",ev:(i,t)=>i.kind==="treasure"&&i.dog===t},{id:"echo",label:"Howl from Howl Rock",ev:(i,t)=>i.kind==="echo"&&i.id===t},{id:"trick",label:"Put on a trick show",ev:(i,t)=>i.kind==="trick"&&i.dog===t}],_h="pawverse.goals",vh="pawverse.journal.v1";class fx{constructor({onChatSend:t,onEmote:e,onBark:n,onSniff:s}){var r;this.el={hud:$t("hud"),zoomies:$t("s-zoomies"),treats:$t("s-treats"),happy:$t("happy-fill"),repDot:$t("rep-dot"),repLabel:$t("rep-label"),power:$t("power-wrap"),powerFill:$t("power-fill"),toasts:$t("toasts"),chatWrap:$t("chat-wrap"),chatInput:$t("chat-input"),clickToPlay:$t("click-to-play"),conn:$t("conn-status"),minimap:$t("minimap"),lbRows:$t("lb-rows"),lbRank:$t("lb-rank"),objList:$t("obj-list"),objHead:$t("obj-head"),objCount:$t("obj-count"),ufName:$t("uf-name"),ufPortrait:$t("uf-portrait"),chatLog:$t("chat-log"),needPlay:$t("need-play"),needSocial:$t("need-social"),needExplore:$t("need-explore"),mood:$t("mood-label"),park:$t("park-event"),parkName:$t("park-name"),parkProgress:$t("park-progress"),parkTime:$t("park-time"),journal:$t("journal"),journalLevel:$t("journal-level"),journalXp:$t("journal-xp"),journalDiscoveries:$t("journal-discoveries"),journalEvents:$t("journal-events")},this.lastZoomies=0,this.chatOpen=!1,this.mapCtx=this.el.minimap.getContext("2d"),this.mapBase=null,this.lastMapDraw=0,this.lastLivingSecond=-1,this.connectionHideTimer=null,this.parkEvent=null,this.journal=this.loadJournal(),this.el.chatInput.addEventListener("keydown",o=>{if(o.stopPropagation(),o.code==="Enter"){const a=this.el.chatInput.value.trim();a&&t(a),this.closeChat()}else o.code==="Escape"&&this.closeChat()});for(const o of document.querySelectorAll(".emote-btn"))o.addEventListener("click",()=>{o.dataset.emote?e(o.dataset.emote):o.dataset.action==="bark"?n():o.dataset.action==="sniff"&&s(),o.blur()});try{const o=JSON.parse(localStorage.getItem(_h)||"[]"),a=new Set(as.map(c=>c.id));this.goals=new Set(Array.isArray(o)?o.filter(c=>a.has(c)).slice(0,as.length):[])}catch{this.goals=new Set}this.el.objHead.addEventListener("click",()=>this.el.objList.classList.toggle("hidden")),this.renderObjectives(),this.renderJournal(),(r=$t("help-btn"))==null||r.addEventListener("click",o=>{o.stopPropagation(),$t("hint-panel").classList.toggle("open")})}loadJournal(){try{const t=JSON.parse(localStorage.getItem(vh)||"{}"),e=Number(t.xp);return{xp:Number.isFinite(e)?Math.min(1e6,Math.max(0,e)):0,discoveries:Array.isArray(t.discoveries)?t.discoveries.filter(n=>n&&typeof n.id=="string"&&typeof n.label=="string").slice(0,100):[],events:Array.isArray(t.events)?t.events.filter(Number.isFinite).slice(0,100):[]}}catch{return{xp:0,discoveries:[],events:[]}}}saveJournal(){try{localStorage.setItem(vh,JSON.stringify(this.journal))}catch{}}getDiscoveryIds(){return this.journal.discoveries.map(t=>t.id)}setIdentity(t,e){this.el.ufName.textContent=t,this.el.ufPortrait.style.borderColor=e,this.el.ufPortrait.style.boxShadow=`0 0 16px ${e}66, inset 0 0 12px rgba(0,0,0,0.6)`}addChatLine(t,e,n=!1){const s=document.createElement("div");s.className=`chat-line${n?" me":""}`;const r=document.createElement("b");for(r.textContent=`${t}: `,s.appendChild(r),s.appendChild(document.createTextNode(e)),this.el.chatLog.appendChild(s);this.el.chatLog.children.length>8;)this.el.chatLog.firstChild.remove();setTimeout(()=>{s.style.opacity="0"},12e3),setTimeout(()=>s.remove(),14e3)}show(){this.el.hud.style.display="block"}setConnection(t){clearTimeout(this.connectionHideTimer),this.el.conn.textContent=t,this.el.conn.classList.toggle("bad",t!=="online"),t==="online"?this.connectionHideTimer=setTimeout(()=>{this.el.conn.style.display="none"},1500):this.el.conn.style.display="block"}setScore({zoomies:t,happiness:e,treats:n,rep:s,needs:r}){t>this.lastZoomies&&this.toast(`+${t-this.lastZoomies} Zoomies ⚡`,"good"),this.lastZoomies=t,this.el.zoomies.textContent=t,this.el.treats.textContent=n,this.el.happy.style.width=`${e}%`;const o=(s-zs.MIN)/(zs.MAX-zs.MIN);this.el.repDot.style.left=`${(o*100).toFixed(1)}%`,this.el.repLabel.textContent=s>=zs.GOOD_BOY?"😇 Good Boy":s<=zs.MENACE?"😈 Menace":"Neutral",r&&this.setNeeds(r)}setNeeds(t){this.el.needPlay.style.width=`${t.play}%`,this.el.needSocial.style.width=`${t.social}%`,this.el.needExplore.style.width=`${t.explore}%`;const e=Object.entries(t).sort((s,r)=>r[1]-s[1])[0],n={play:"Playful",social:"Pack-minded",explore:"Curious"};this.el.mood.textContent=e[1]>=70?n[e[0]]:"Content"}toast(t,e=""){const n=document.createElement("div");n.className=`toast ${e}`,n.textContent=t,this.el.toasts.appendChild(n),setTimeout(()=>n.remove(),2400)}setPower(t){if(t===null){this.el.power.style.display="none";return}this.el.power.style.display="block",this.el.powerFill.style.width=`${(t*100).toFixed(0)}%`}openChat(){var t;this.chatOpen=!0,this.el.chatWrap.style.display="block",(t=document.exitPointerLock)==null||t.call(document),this.el.chatInput.value="",this.el.chatInput.focus()}closeChat(){this.chatOpen=!1,this.el.chatWrap.style.display="none",this.el.chatInput.blur()}setPointerHint(t){this.el.clickToPlay.style.display=t?"flex":"none"}setLeaderboard(t,e){this.el.lbRows.innerHTML="";const n=localStorage.getItem("pawverse.name")||"";t.forEach((s,r)=>{const o=document.createElement("div");o.className=`lb-row${s.n===n&&e===r+1?" me":""}`,o.innerHTML=`<span class="n">${r+1}. ${px(s.n)}</span><span class="z">${s.z}</span>`,this.el.lbRows.appendChild(o)}),this.el.lbRank.textContent=e>5?`you: #${e}`:""}renderObjectives(){this.el.objList.innerHTML="";for(const t of as){const e=this.goals.has(t.id),n=document.createElement("div");n.className=`obj${e?" done":""}`,n.innerHTML=`<span class="tick">${e?"✓":""}</span>${t.label}`,this.el.objList.appendChild(n)}this.el.objCount.textContent=`${this.goals.size}/${as.length}`}completeGoal(t){if(!this.goals.has(t.id)){this.goals.add(t.id);try{localStorage.setItem(_h,JSON.stringify([...this.goals]))}catch{}this.journal.xp+=10,this.saveJournal(),this.toast(`📋 Goal complete: ${t.label}!`,"good"),this.renderObjectives(),this.renderJournal()}}recordDiscovery(t){this.journal.discoveries.some(e=>e.id===t.spot)||(this.journal.discoveries.push({id:t.spot,label:t.label,kind:t.discoveryKind}),this.journal.xp+=25,this.saveJournal(),this.renderJournal(),this.toast(`Discovered: ${t.label}`,"good"))}recordParkCompletion(t,e){!e||this.journal.events.includes(t.id)||(this.journal.events.push(t.id),this.journal.xp+=40,this.saveJournal(),this.renderJournal())}renderJournal(){const t=Math.floor(this.journal.xp/100)+1;this.el.journalLevel.textContent=`Trailblazer ${t}`,this.el.journalXp.textContent=`${this.journal.xp%100}/100 XP`,this.el.journalDiscoveries.textContent=`${this.journal.discoveries.length} scents found`,this.el.journalEvents.textContent=`${this.journal.events.length} park events completed`}toggleJournal(){this.el.journal.classList.toggle("open")}setParkEvent(t){this.parkEvent=t,this.lastLivingSecond=-1,this.el.park.style.display=t?"block":"none",t&&(this.el.parkName.textContent=t.complete?`${t.label} complete`:t.label,this.el.parkProgress.style.width=`${Math.min(100,t.progress/t.target*100)}%`)}updateLiving(t=Date.now()){if(!this.parkEvent)return;const e=Math.max(0,Math.ceil((this.parkEvent.endsAt-t)/1e3));e!==this.lastLivingSecond&&(this.lastLivingSecond=e,this.el.parkTime.textContent=this.parkEvent.complete?"New event soon":`${this.parkEvent.progress}/${this.parkEvent.target} · ${this.parkEvent.participants}/${this.parkEvent.requiredParticipants} pack · ${e}s`)}trackEvent(t,e){for(const n of as)n.ev&&n.ev(t,e)&&this.completeGoal(n)}trackLocal(t){for(const e of as)e.local===t&&this.completeGoal(e)}buildMapBase(){const t=this.el.minimap.width,e=document.createElement("canvas");e.width=e.height=t;const n=e.getContext("2d"),s=t/Ke,r=(l,h)=>[t/2+l*s,t/2+h*s];n.fillStyle="#27431f",n.fillRect(0,0,t,t),n.fillStyle="#b9a06455",n.fillRect(...r(52,-Ke/2),(Ke/2-52)*s,t),n.fillStyle="#2e6a94",n.fillRect(...r(66,-Ke/2),(Ke/2-66)*s,t),n.strokeStyle="#8a6a4877",n.lineWidth=1,n.strokeRect(...r(We.x-We.w/2,We.z-We.d/2),We.w*s,We.d*s),n.fillStyle="#39632f";for(const l of Oc){const[h,u]=r(l.x,l.z);n.fillRect(h-1.2,u-1.2,2.4,2.4)}const[o,a]=r(Jt.x,Jt.z);n.fillStyle="#4d9fd4",n.beginPath(),n.arc(o,a,Jt.r*s+1,0,7),n.fill();const c=["#e5533f","#3f8fe5","#46c46a","#e5b53f"];for(const l of er){const[h,u]=r(l.x,l.z);n.fillStyle=c[l.id%4],n.beginPath(),n.arc(h,u,2.4,0,7),n.fill()}n.fillStyle="#c8874f";for(const l of Es){const[h,u]=r(l.x,l.z);n.fillRect(h-2,u-2,4,4)}n.fillStyle="#8a6a3f";for(const l of yu){const[h,u]=r(l.x,l.z);n.beginPath(),n.arc(h,u,1.4,0,7),n.fill()}this.mapBase=e}drawMinimap(t,e){const n=performance.now();if(n-this.lastMapDraw<66)return;this.lastMapDraw=n,this.mapBase||this.buildMapBase();const s=this.mapCtx,r=this.el.minimap.width,o=r/Ke;s.clearRect(0,0,r,r),s.save(),s.beginPath(),s.arc(r/2,r/2,r/2,0,7),s.clip(),s.drawImage(this.mapBase,0,0),s.fillStyle="#ffd166";for(const l of t.dogs.values()){const h=l.buf[l.buf.length-1];h&&(s.beginPath(),s.arc(r/2+h.p[0]*o,r/2+h.p[2]*o,2.2,0,7),s.fill())}s.fillStyle="#c9925f";for(const l of t.squirrels.values()){const h=l.buf[l.buf.length-1];h&&s.fillRect(r/2+h.p[0]*o-1,r/2+h.p[2]*o-1,2,2)}const a=r/2+e.x*o,c=r/2+e.z*o;s.save(),s.translate(a,c),s.rotate(t.move.yaw),s.fillStyle="#6ee7a0",s.beginPath(),s.moveTo(0,-5),s.lineTo(3.4,4),s.lineTo(0,2.2),s.lineTo(-3.4,4),s.closePath(),s.fill(),s.restore(),s.restore()}}function px(i){return String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const mx="modulepreload",gx=function(i){return"/"+i},xh={},_x=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(e.map(c=>{if(c=gx(c),c in xh)return;xh[c]=!0;const l=c.endsWith(".css"),h=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":mx,l||(u.as="script"),u.crossOrigin="",u.href=c,a&&u.setAttribute("nonce",a),document.head.appendChild(u),l)return new Promise((d,f)=>{u.addEventListener("load",d),u.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},vx="devnet",Su="https://api.devnet.solana.com",xx="";let aa=null;async function yx(){return aa||(aa=await _x(()=>import("./index.browser.esm-CvvBSAX1.js"),[])),aa}function Mx(){var i,t,e;return(t=(i=window.phantom)==null?void 0:i.solana)!=null&&t.isPhantom?window.phantom.solana:(e=window.backpack)!=null&&e.isBackpack?window.backpack:window.solana?window.solana:null}const ke={provider:null,address:null,premium:!1};async function Sx(){const i=Mx();if(!i)throw new Error("No Solana wallet found — install Phantom or Backpack to use wallet identity.");const t=await i.connect(),e=((t==null?void 0:t.publicKey)??i.publicKey).toString();return ke.provider=i,ke.address=e,ke.premium=await bx(),ke}async function bx(i){return!0}async function Ex(i){return i?[{name:"Genesis Pup #001 (demo)",mock:!0,customization:{breed:"husky",primary:"#3d4a63",secondary:"#e8ecf5",pattern:"mask",size:1.15,collar:"#ffd166",accessory:"bandana"}},{name:"Beach Zoomer #042 (demo)",mock:!0,customization:{breed:"corgi",primary:"#e0a03f",secondary:"#ffffff",pattern:"socks",size:.85,collar:"#3f8fe5",accessory:"glasses"}}]:[]}async function wx(i,t){if(!ke.provider||!ke.address)throw new Error("Connect a wallet first.");const{Connection:e,PublicKey:n,Transaction:s,TransactionInstruction:r}=await yx(),o=new e(Su,"confirmed"),a=new n(ke.address),c=new n("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),l=JSON.stringify({app:"PAWVERSE",kind:"dog",name:t,dog:i}),h=new s().add(new r({keys:[{pubkey:a,isSigner:!0,isWritable:!1}],programId:c,data:new TextEncoder().encode(l)}));h.feePayer=a,h.recentBlockhash=(await o.getLatestBlockhash()).blockhash;const{signature:u}=await ke.provider.signAndSendTransaction(h);return u}const ca={NETWORK:vx,RPC:Su,PREMIUM_MINT:xx},ze=i=>document.getElementById(i),Or="pawverse.dog",cs=["#f5f0e6","#e8d5b8","#d9a45b","#d98e4a","#b0713c","#8a5a32","#6b4a2e","#4a3a2c","#2b2b30","#8a93a3","#c9c2b8","#a0855b"],la=["#d23b3b","#3f8fe5","#46c46a","#e5b53f","#9945ff","#ff6b9a","#26262b"],Tx={none:{icon:"✖️",label:"none"},bandana:{icon:"🧣",label:"bandana"},hat:{icon:"🎩",label:"hat"},glasses:{icon:"🕶",label:"sunglasses"}},Ax={none:"plain",mask:"mask",socks:"socks",spots:"spots",saddle:"saddle"},yh=["Biscuit","Mochi","Zoomie","Pretzel","Waffles","Nova","Turbo","Pickles","Miso","Comet","Noodle","Pepper","Blue","Sunny","Ziggy","Clover"];function Rx({onPlay:i}){const t={custom:Y(null),name:localStorage.getItem("pawverse.name")||"",pose:"idle"};let e=!0;const n=ze("preview"),s=new tu({canvas:n,antialias:!0,alpha:!0});s.setSize(innerWidth,innerHeight,!1),s.setPixelRatio(Math.min(devicePixelRatio,2)),s.toneMapping=dc,s.shadowMap.enabled=!0,s.shadowMap.type=hc;const r=new eu;r.add(new du("#cfe8ff","#3a4a60",1.1));const o=new Yr("#fff2d8",2.2);o.position.set(2.5,4.5,3),o.castShadow=!0,o.shadow.mapSize.set(1024,1024),r.add(o);const a=new Yr("#7ea6ff",1.7);a.position.set(-2,2.5,-3),r.add(a);const c=new Yr("#ffd9b0",.8);c.position.set(-1.5,1.2,4),r.add(c);const l=new Je(30,innerWidth/innerHeight,.1,50);l.position.set(0,1.7,6.1),l.lookAt(0,.62,0);const h=new yt(new Be(1.5,1.7,.22,40),new he({color:"#222b40",roughness:.5,metalness:.3}));h.position.y=-.11,h.receiveShadow=!0,r.add(h);const u=new yt(new qn(1.6,.03,8,48),new Ce({color:"#ffb347"}));u.rotation.x=Math.PI/2,u.position.y=.01,r.add(u);let d=null,f=.6,g=.35;function _(){d&&r.remove(d.group),d=Fc({...t.custom,name:t.name||"preview"}),d.group.traverse(V=>{V.isMesh&&(V.castShadow=!0)}),r.add(d.group)}let m=!1,p=0;n.addEventListener("pointerdown",V=>{m=!0,p=V.clientX}),addEventListener("pointerup",()=>{m=!1}),addEventListener("pointermove",V=>{m&&(f+=(V.clientX-p)*.012,p=V.clientX,g=0)}),addEventListener("resize",()=>{s.setSize(innerWidth,innerHeight,!1),l.aspect=innerWidth/innerHeight,l.updateProjectionMatrix()});const y={run:5.5};let v=performance.now();(function V(){requestAnimationFrame(V);const Z=performance.now(),rt=Math.min(.05,(Z-v)/1e3);v=Z,d&&(g+=(.35-g)*Math.min(1,rt*.4),f+=g*rt,d.group.rotation.y=f,zc(d,t.pose,rt,y[t.pose]||0)),s.render(r,l)})();for(const V of document.querySelectorAll(".pose-btn"))V.addEventListener("click",()=>{document.querySelectorAll(".pose-btn").forEach(Z=>Z.classList.remove("sel")),V.classList.add("sel"),t.pose=V.dataset.pose});const S=ze("breed-grid");function F(){S.innerHTML="";for(const V of sc){const Z=V.premium&&!e,rt=document.createElement("button");rt.className=`breed${t.custom.breed===V.id?" sel":""}${Z?" locked":""}`;const wt=Math.round((V.speed-.85)/.35*100),Nt=Math.round((V.scale-.65)/.55*100);rt.innerHTML=`
        <div class="b-top">
          <span class="b-dot" style="background:${V.primary}"></span>
          <span class="b-name">${V.name}</span>
          <span class="b-gem">${V.premium?Z?"🔒":"💎":""}</span>
        </div>
        <div class="b-stat"><span>speed</span><span class="b-bar"><i style="width:${Mh(wt)}%"></i></span></div>
        <div class="b-stat"><span>size</span><span class="b-bar"><i style="width:${Mh(Nt)}%"></i></span></div>`,rt.onclick=()=>{if(Z){X(`💎 ${V.name} is premium — hold the configured token to unlock it (see the Wallet tab).`);return}t.custom.breed=V.id,t.custom.primary=V.primary,t.custom.secondary=V.secondary,t.custom.pattern=V.pattern,q(),Q()},S.appendChild(rt)}}function w(V,Z,rt,wt){const Nt=ze(V);Nt.innerHTML="";for(const at of wt){const it=document.createElement("button");it.className=`swatch${Z()===at?" sel":""}`,it.style.background=at,it.title=at,it.onclick=()=>{rt(at),q(),Q()},Nt.appendChild(it)}const $=document.createElement("input");$.type="color",$.value=Z()||"#d98e4a",$.title="custom color",$.oninput=()=>{rt($.value),_(),Q()},Nt.appendChild($)}function A(){w("pal-primary",()=>t.custom.primary,Z=>{t.custom.primary=Z},cs),w("pal-secondary",()=>t.custom.secondary,Z=>{t.custom.secondary=Z},cs);const V=ze("pattern-row");V.innerHTML="";for(const Z of $r){const rt=document.createElement("button");rt.className=`chip${t.custom.pattern===Z?" sel":""}`,rt.textContent=Ax[Z],rt.onclick=()=>{t.custom.pattern=Z,q(),Q()},V.appendChild(rt)}}function I(){const V=ze("collar-row");V.innerHTML="";const Z=document.createElement("button");Z.className=`chip${t.custom.collar===null?" sel":""}`,Z.textContent="no collar",Z.onclick=()=>{t.custom.collar=null,q(),Q()},V.appendChild(Z);for(const wt of la){const Nt=document.createElement("button");Nt.className=`swatch${t.custom.collar===wt?" sel":""}`,Nt.style.background=wt,Nt.onclick=()=>{t.custom.collar=wt,q(),Q()},V.appendChild(Nt)}const rt=ze("acc-row");rt.innerHTML="";for(const wt of ia){const Nt=Tx[wt],$=document.createElement("button");$.className=`chip${t.custom.accessory===wt?" sel":""}`,$.textContent=`${Nt.icon} ${Nt.label}`,$.onclick=()=>{t.custom.accessory=wt,q(),Q()},rt.appendChild($)}}const b=ze("size"),x=ze("size-val"),D=ze("dogname");b.oninput=()=>{t.custom.size=Number(b.value),x.textContent=`${t.custom.size.toFixed(2)}×`,_(),Q()},D.oninput=()=>{t.name=D.value,localStorage.setItem("pawverse.name",t.name),t.custom.breed==="mutt"&&_()},ze("randomize").onclick=()=>{const V=sc.filter(rt=>!rt.premium||e),Z=V[Math.floor(Math.random()*V.length)];t.custom={breed:Z.id,primary:cs[Math.floor(Math.random()*cs.length)],secondary:cs[Math.floor(Math.random()*cs.length)],pattern:$r[Math.floor(Math.random()*$r.length)],size:Math.round((.7+Math.random()*.7)*20)/20,collar:Math.random()<.8?la[Math.floor(Math.random()*la.length)]:null,accessory:ia[Math.floor(Math.random()*ia.length)],name:t.name},t.name||(t.name=yh[Math.floor(Math.random()*yh.length)],localStorage.setItem("pawverse.name",t.name)),q(),Q()};const U=ze("wallet-btn"),N=ze("mint-btn");function X(V){ze("wallet-status").innerHTML=V}U.onclick=async()=>{U.disabled=!0,X("connecting…");try{await Sx(),e=!ca.PREMIUM_MINT||ke.premium;const V=`${ke.address.slice(0,4)}…${ke.address.slice(-4)}`;U.textContent=`◎ ${V}`,X(`connected on <b>${ca.NETWORK}</b> — dog identity tied to ${V}`+(ca.PREMIUM_MINT?ke.premium?" · <b>premium unlocked 💎</b>":" · premium token not held":" · <b>all breeds unlocked</b> (no premium mint configured)")),N.style.display="inline-block";const Z=Y(ke.address);Z&&(t.custom=Z),q(),K(await Ex(ke.address))}catch(V){X(`⚠ ${V.message}`)}U.disabled=!1},N.onclick=async()=>{N.disabled=!0,N.textContent="⛏ waiting for wallet…";try{const V=await wx(t.custom,t.name||"Dog");X(`minted (stub memo tx): <b>${V.slice(0,10)}…</b>`)}catch(V){X(`⚠ mint: ${V.message}`)}N.disabled=!1,N.textContent="⛏ mint this dog (devnet stub)"};function K(V){const Z=ze("nft-skins");if(Z.innerHTML="",!V.length){Z.innerHTML='<span style="font-size:12px;color:var(--dim)">no dog NFTs in this wallet</span>';return}for(const rt of V){const wt=document.createElement("button");wt.className="chip",wt.textContent=`🖼 ${rt.name}`,wt.onclick=()=>{t.custom={...t.custom,...rt.customization},q(),Q()},Z.appendChild(wt)}}function q(){F(),A(),I(),b.value=t.custom.size,x.textContent=`${Number(t.custom.size).toFixed(2)}×`,D.value=t.name,_()}function Q(){const V=JSON.stringify(t.custom);localStorage.setItem(Or,V),ke.address&&localStorage.setItem(`${Or}.${ke.address}`,V)}function Y(V){try{const Z=localStorage.getItem(V?`${Or}.${V}`:Or);if(Z)return{...sh(),...JSON.parse(Z)}}catch{}return V?null:sh()}ze("play").onclick=()=>{const V=oo[t.custom.breed];V!=null&&V.premium&&!e&&(t.custom.breed="shiba"),Q(),ze("lobby").style.display="none",i(t.name.trim()||"Dog",{...t.custom})},q()}function Mh(i){return Math.min(100,Math.max(8,i))}const Cx=[{id:"fountain",label:"Fountain Wishes",kind:"landmark",x:Jt.x,z:Jt.z},{id:"howl-rock",label:"Ancient Howl Rock",kind:"landmark",x:hn.x,z:hn.z},{id:"yard-gate",label:"Paw Park Gate",kind:"place",x:We.x+We.w/2,z:We.z},{id:"dog-house",label:"Cozy Dog House",kind:"place",x:Gn.x,z:Gn.z},{id:"sea-shells",label:"Salty Seashells",kind:"nature",x:66,z:23},{id:"old-oak",label:"The Old Oak",kind:"nature",x:18,z:-42},{id:"sunset-view",label:"Sunset Lookout",kind:"vista",x:hn.x,z:hn.z+9},{id:"north-meadow",label:"North Meadow Breeze",kind:"vista",x:-15,z:70}],ha=36,Px={landmark:"#ffd166",nature:"#7be8a8",place:"#9ad1ff",vista:"#c9a6ff"};class Lx{constructor(t,e){this.effects=e,this.activeUntil=0,this.discovered=new Set,this.markers=Cx.map(n=>this.createMarker(t,n)),this.trail=this.createTrail(t)}createMarker(t,e){const n=new jt,s=Px[e.kind]||"#ffffff",r=new Ce({color:s,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),o=new yt(new qn(.48,.045,6,24),r);o.rotation.x=Math.PI/2;const a=new yt(new go(.12,0),r);return a.position.y=.8,n.add(o,a),n.position.set(e.x,Zt(e.x,e.z)+.12,e.z),n.visible=!1,t.add(n),{spot:e,group:n,material:r,mote:a}}createTrail(t){const e=new Ce({color:"#b9f6d0",transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),n=Array.from({length:7},()=>{const s=new yt(new on(.055,5,4),e);return s.visible=!1,t.add(s),s});return{material:e,points:n}}sniff(t){this.activeUntil=performance.now()+5e3,this.effects.ring([t.x,t.y,t.z],"#b9f6d0",12,1.2)}setDiscovered(t){this.discovered=new Set(t)}discover(t,e){this.discovered.add(t),this.effects.burst(e,{color:"#ffe28a",n:24,speed:3,up:5,size:.075,ttl:1})}update(t,e=performance.now()){const n=e<this.activeUntil;let s=null,r=ha;for(let o=0;o<this.markers.length;o++){const a=this.markers[o],c=Math.hypot(t.x-a.spot.x,t.z-a.spot.z),l=n&&!this.discovered.has(a.spot.id)&&c<ha;if(a.group.visible=l,!l)continue;const h=1-c/ha;a.material.opacity=.25+h*.7,a.group.rotation.y=e*.001+o,a.mote.position.y=.75+Math.sin(e*.003+o)*.16,c<r&&(s=a,r=c)}this.updateTrail(n?s:null,t,e)}updateTrail(t,e,n){this.trail.material.opacity=t?.65:0;for(let s=0;s<this.trail.points.length;s++){const r=this.trail.points[s];if(r.visible=!!t,!t)continue;const o=(s+1)/(this.trail.points.length+1),a=$c.lerp(e.x,t.spot.x,o),c=$c.lerp(e.z,t.spot.z,o);r.position.set(a,Zt(a,c)+.16+Math.sin(n*.004+s)*.05,c),r.scale.setScalar(.75+Math.sin(n*.006+s)*.2)}}}const je=new tu({antialias:!0});je.setSize(innerWidth,innerHeight);je.setPixelRatio(Math.min(devicePixelRatio,2));je.outputColorSpace=$e;je.shadowMap.enabled=!0;je.shadowMap.type=hc;je.toneMapping=dc;je.toneMappingExposure=1.12;document.body.appendChild(je.domElement);const qe=new eu,Cn=new Je(62,innerWidth/innerHeight,.1,400);addEventListener("resize",()=>{Cn.aspect=innerWidth/innerHeight,Cn.updateProjectionMatrix(),je.setSize(innerWidth,innerHeight)});const Ye=Nv(qe),ge=new Vv(qe),xo=new Lx(qe,ge),oc=new Wv(qe),ve=new nx(Cn),ht=new hx;let ac=null,bu=0;function Dx(){return ac===null?.18:((Date.now()+bu-ac)/Q_+.15)%1}let nr=!1,un=null,Dn=null,ii=Math.PI,ua=0,da="idle",fa=0,pa=1,ma=0,ga=0;function Jr(i=1){return 1.5-.5*i}function _a(i){var t;return i===ht.id?(Dn==null?void 0:Dn.size)??1:Xn.get(i)?((t=ht.dogs.get(i))==null?void 0:t.info.c.size)??1:1}const Xn=new Map,Fr=new Map,Sh=new Map,zr=new Map,Br=new C,Gt=new fx({onChatSend:i=>ht.chat(i),onEmote:i=>ht.emote(i),onBark:()=>ht.bark(),onSniff:()=>Eu()});function Eu(){if(!nr||!ht.connected)return;const i={x:ht.move.x,y:ht.move.y,z:ht.move.z};xo.sniff(i),ht.sniff()}let Zr=!1;const Sn=new dx(je.domElement,{bark:()=>ht.bark(),bite:()=>{const i=Ix(J_);i!==null&&ht.bite(i)},grabDrop:()=>{if(ht.myBall!==null){ht.drop();return}const i=Ux(Z_);i!==null&&ht.grab(i)},emote:i=>ht.emote(i),mute:()=>{const i=ve.toggleMute();Gt.toast(i?"🔇 sound muted (M)":"🔊 sound on")},sniff:()=>Eu(),journal:()=>Gt.toggleJournal(),chatOpen:()=>{nr&&(Sn.enabled=!1,Gt.openChat())},throwStart:()=>{Zr=ht.myBall!==null},throwRelease:i=>{if(Gt.setPower(null),!Zr||ht.myBall===null)return;Zr=!1;const t=Math.min(.9,Math.max(.12,.45+Sn.pitch));ht.throw([Math.sin(Sn.yaw),t,-Math.cos(Sn.yaw)],i)}});document.getElementById("chat-input").addEventListener("blur",()=>{Sn.enabled=!0,Gt.closeChat()});document.addEventListener("pointerlockchange",()=>{nr&&Gt.setPointerHint(document.pointerLockElement!==je.domElement&&!Gt.chatOpen)});document.getElementById("click-to-play").addEventListener("click",()=>{je.domElement.requestPointerLock()});function Ix(i){let t=null,e=i*i;for(const[n,s]of Xn){const r=s.view.group.position,o=(r.x-ht.move.x)**2+(r.z-ht.move.z)**2;o<e&&(e=o,t=n)}return t}function Ux(i){let t=null,e=i*i;for(const[n,s]of ht.balls){if(s.holder!==null)continue;const r=(s.p[0]-ht.move.x)**2+(s.p[2]-ht.move.z)**2;r<e&&(e=r,t=n)}return t}ht.on("welcome",i=>{var t,e;Gt.setConnection("online"),(t=i.settings)!=null&&t.epoch&&(ac=i.settings.epoch,bu=i.settings.now-Date.now()),Gt.setParkEvent(((e=i.settings)==null?void 0:e.parkEvent)||null)});ht.on("disconnect",()=>Gt.setConnection("connection lost"));ht.on("reconnecting",({attempt:i,delay:t})=>{Gt.setConnection(`reconnecting ${i} · ${Math.ceil(t/1e3)}s`)});ht.on("score",i=>Gt.setScore(i));ht.on("park",i=>Gt.setParkEvent(i));ht.on("event",i=>{var e,n,s,r,o,a,c,l;const t=i.p||[0,0,0];switch(i.kind){case Te.BARK:ge.ring(t,"#ffd166",6),(e=Ye.react)==null||e.call(Ye,t,7),ve.play("bark",t,1,Jr(_a(i.id)));break;case Te.HOWL:ge.ring(t,"#9ecbff",10,1.4),ve.play("howl",t,1,Jr(_a(i.id)));break;case Te.ECHO:ge.ring(t,"#c9d9ff",30,3),ge.ring(t,"#8fb8ff",20,2.4),ve.play("howl",null,.7,Jr(_a(i.id))*.92),Gt.toast(i.id===ht.id?"🌕 YOUR HOWL ECHOES ACROSS THE PARK! +5":"🌕 a howl echoes from Howl Rock…",i.id===ht.id?"good":"");break;case Te.TRICK:{ge.burst(t,{color:"#ffd166",n:16,speed:3,up:4.5,size:.07,ttl:.8}),ge.hearts(t,3),ve.play("chime",t),i.dog===ht.id&&Gt.toast("🎪 TRICK SHOW! The human loved it! +5 ⚡ +1 🦴","good");break}case Te.GROUP_HOWL:ge.ring(t,"#c9a6ff",16,2),(n=i.ids)!=null&&n.includes(ht.id)&&Gt.toast("🌕 GROUP HOWL! +10 Zoomies","good");break;case Te.YELP:ve.play("yelp",t,.8);break;case Te.BITE:ge.burst(t,{color:"#ffe0a3",n:12,speed:2.5,up:3.5,size:.07}),ve.play("growl",t,.9),i.to===ht.id&&Gt.toast("🐶 play-bitten!");break;case Te.PICKUP:ve.play("pop",t??null),i.dog===ht.id&&i.caught&&Gt.toast("✨ MID-AIR CATCH! +5","good");break;case Te.THROW:ve.play("whoosh",null,.7);break;case Te.PET:{const h=i.dog===ht.id?[ht.move.x,ht.move.y,ht.move.z]:(s=Xn.get(i.dog))==null?void 0:s.view.group.position.toArray();h&&ge.hearts(h),i.dog===ht.id&&ve.play("chime");break}case Te.FEED:i.dog===ht.id&&Gt.toast("🦴 treat! +happiness","good");break;case Te.SCARE:ge.burst(t,{color:"#ffffff",n:5,speed:1.5,up:2.5,size:.06,ttl:.4}),(r=Ye.react)==null||r.call(Ye,t,10);break;case Te.SNIFF:i.dog!==ht.id&&ge.ring(t,"#b9f6d0",7,1);break;case Te.DISCOVERY:xo.discover(i.spot,t),Gt.recordDiscovery(i),ve.play("chime",t);break;case Te.GREET:ge.hearts(t,2),i.dog===ht.id&&Gt.toast("A familiar park friend waves hello","good");break;case Te.PARK_COMPLETE:{const h=(o=i.ids)==null?void 0:o.includes(ht.id);Gt.recordParkCompletion(i.event,h),Gt.setParkEvent(i.event);const u=h?[ht.move.x,ht.move.y,ht.move.z]:t;ge.burst(u,{color:"#7be8a8",n:28,speed:4,up:6,size:.08,ttl:1.1}),Gt.toast(h?"Community goal complete: +20 Zoomies":"The park completed a community goal","good"),ve.play("chime");break}case Te.CHAT:{Nx(i.id,i.text);const h=i.id===ht.id,u=h?(Dn==null?void 0:Dn.name)||"You":((a=ht.dogs.get(i.id))==null?void 0:a.info.n)||"Dog";Gt.addChatLine(u,i.text,h);break}case Te.CHASE:ge.burst(t,{color:"#c9a06a",n:14,speed:3,up:4,size:.07}),ve.play("pop",t,.9),i.dog===ht.id&&Gt.toast("🐿️ SQUIRREL CHASED! +8","good"),(c=Ye.react)==null||c.call(Ye,t,12);break;case Te.TREASURE:{ge.burst(t,{color:"#ffe28a",n:20,speed:3.5,up:5,size:.08,ttl:.9}),ge.burst(t,{color:"#7a5a3c",n:10,speed:2,up:3,size:.09}),ve.play("chime",t);const h={bone:"🦴 a bone!",stick:"🪵 a great stick!",shiny:"✨ something SHINY!"}[i.loot]||i.loot;i.dog===ht.id&&Gt.toast(`Dug up ${h} +${i.zoomies}`,"good");const u=_o(h,{bg:"rgba(255,226,138,0.92)",fg:"#3a2c10"});u.position.set(t[0],t[1]+1.1,t[2]),ge.add(u,1.6,(d,f,g)=>{d.obj.position.y+=f*.8,d.obj.material.opacity=1-g*g});break}}(l=Gt.trackEvent)==null||l.call(Gt,i,ht.id)});ht.on("leaderboard",i=>Gt.setLeaderboard(i.top,i.rank));function Nx(i,t){const e=i===ht.id?Bc:Xn.get(i);e&&(e.bubble&&e.bubbleHolder.remove(e.bubble),e.bubble=_o(`💬 ${t}`,{bg:"rgba(255,255,255,0.92)",fg:"#1a1f2e"}),e.bubble.position.y=.55,e.bubbleHolder.add(e.bubble),e.bubbleUntil=performance.now()+j_)}const Bc={bubble:null,bubbleHolder:null,bubbleUntil:0};function wu(i,t){i.bubble&&t>i.bubbleUntil&&(i.bubbleHolder.remove(i.bubble),i.bubble=null)}function Ox(i,t){for(const[e,n]of ht.dogs){let s=Xn.get(e);if(!s){const h=Fc(n.info.c),u=new jt;u.position.y=1.55*(n.info.c.size||1);const d=_o(n.info.n||"Dog");u.add(d),h.group.add(u),qe.add(h.group,h.contactShadow),s={view:h,tag:d,bubbleHolder:u,bubble:null,bubbleUntil:0,facing:Math.PI,lastAnim:"idle"},Xn.set(e,s)}const r=ht.sample(n.buf,i);if(!r)continue;s.view.group.position.set(r.p[0],r.p[1],r.p[2]),Cu(s.view,r.p[0],r.p[1],r.p[2]);const o=r.v?Math.hypot(r.v[0],r.v[2]):0,a=o>.5?Math.atan2(r.v[0],r.v[2]):Math.PI-r.ry,c=s.facing;s.facing=Ru(s.facing,a,Math.min(1,t*10)),s.view.group.rotation.y=s.facing;const l=t>0?yo(s.facing-c)/t:0;s.lean=s.lean||0,s.lean+=(lo(-l*.055*Math.min(1,o/5),-.3,.3)-s.lean)*Math.min(1,t*8),zc(s.view,r.anim,t,o,s.lean),r.anim==="swim"&&s.lastAnim!=="swim"&&(ge.burst(r.p,{color:"#bfe8ff",n:10,speed:2,up:2.5,size:.06}),ve.play("splash",r.p,.7)),s.lastAnim==="air"&&r.anim!=="air"&&r.anim!=="swim"&&(s.view.squash=.3,ge.burst(r.p,{color:"#c9b58a",n:6,speed:1.5,up:1.4,size:.055,ttl:.4}),ve.play("thud",r.p,.5)),s.lastAnim=r.anim,o>1.6&&(s.printClock=(s.printClock??0)-o*t,s.printClock<=0&&(s.printClock=.62,s.printSide=-(s.printSide||1),oc.stamp(r.p[0],r.p[1],r.p[2],s.facing,s.printSide))),wu(s,i)}for(const[e,n]of Xn)ht.dogs.has(e)||(qe.remove(n.view.group),qe.remove(n.view.contactShadow),Xn.delete(e))}function Fx(i){var t;for(const[e,n]of ht.balls){let s=Fr.get(e);if(s||(s=new yt(new on(nh,10,8),new he({color:"#cbe54b",flatShading:!0,roughness:.7})),s.castShadow=!0,qe.add(s),Fr.set(e,s)),n.holder!==null){const o=n.holder===ht.id?un:(t=Xn.get(n.holder))==null?void 0:t.view;if(o){o.group.updateMatrixWorld(),o.mouth.getWorldPosition(Br),s.position.copy(Br);continue}}const r=(performance.now()-n.t)/1e3;Br.set(n.p[0]+n.v[0]*r,Math.max(Zt(n.p[0],n.p[2])+nh*.8,n.p[1]+n.v[1]*r),n.p[2]+n.v[2]*r),s.position.lerp(Br,Math.min(1,i*14))}for(const[e,n]of Fr)ht.balls.has(e)||(qe.remove(n),Fr.delete(e))}function zx(i,t){for(const[e,n]of ht.squirrels){let s=zr.get(e);s||(s=zv(e),qe.add(s.group),zr.set(e,s));const r=ht.sample(n.buf,i);r&&(s.group.position.set(r.p[0],r.p[1],r.p[2]),s.group.rotation.y=r.ry,Hv(s,n.st,t))}for(const[e,n]of zr)ht.squirrels.has(e)||(qe.remove(n.group),zr.delete(e))}function Bx(i,t){for(const[e,n]of ht.npcs){let s=Sh.get(e);s||(s=Fv(e),qe.add(s.group),Sh.set(e,s));const r=ht.sample(n.buf,i);r&&(s.group.position.set(r.p[0],r.p[1],r.p[2]),s.group.rotation.y=r.ry,kv(s,n.st,t))}}const va=1/V_;let xa=0;function kx(i){for(xa+=i;xa>=va;){xa-=va;const t=Sn.sample();(t.f||t.b||t.l||t.r)&&(ht.myEmote="none"),ht.applyInput(t,va)}}const Hx=62;let ya=0;function Vx(i,t=.016){const n=-Sn.pitch,s=6.2*Math.cos(n),r=i.x-Math.sin(Sn.yaw)*s,o=i.z+Math.cos(Sn.yaw)*s;let a=i.y+1.2+6.2*Math.sin(n);a=Math.max(Zt(r,o)+.4,a),Cn.position.set(r,a,o),Cn.lookAt(i.x,i.y+.9,i.z);const c=Math.hypot(ht.move.vx,ht.move.vz),l=Math.min(1,Math.max(0,(c-4.5)/3.5));ya+=(l-ya)*Math.min(1,t*6);const h=Hx+ya*8;Math.abs(Cn.fov-h)>.05&&(Cn.fov=h,Cn.updateProjectionMatrix())}let bh=performance.now(),Tu=0,Au=0;function Gx(){Tu=requestAnimationFrame(cc),Au=setTimeout(cc,120)}function cc(){var n,s,r,o;cancelAnimationFrame(Tu),clearTimeout(Au);const i=performance.now(),t=Math.min(.1,(i-bh)/1e3);bh=i;const e=Ye.update(t,Dx());if((n=ve.setNight)==null||n.call(ve,e),ge.update(t,Cn),oc.update(t),nr&&ht.connected){kx(t);const a=ht.renderPos(t),c=vv(ht.move,ht.myEmote);un.group.position.set(a.x,a.y,a.z),Cu(un,a.x,a.y,a.z);const l=Math.hypot(ht.move.vx,ht.move.vz),h=l>.5?Math.atan2(ht.move.vx,ht.move.vz):ii,u=ii;ii=Ru(ii,h,Math.min(1,t*10)),un.group.rotation.y=ii,Wx(un,a,ii,t);const d=t>0?yo(ii-u)/t:0;ua+=(lo(-d*.055*Math.min(1,l/5),-.3,.3)-ua)*Math.min(1,t*8),zc(un,c,t,l,ua),c==="swim"&&da!=="swim"&&(ge.burst([a.x,a.y,a.z],{color:"#bfe8ff",n:12,speed:2.5,up:3,size:.07}),ve.play("splash",null,.8)),da==="air"&&c!=="air"&&c!=="swim"&&(un.squash=.3,ge.burst([a.x,a.y,a.z],{color:"#c9b58a",n:8,speed:1.8,up:1.6,size:.06,ttl:.45}),ve.play("thud",null,.7,Jr((Dn==null?void 0:Dn.size)??1)*.9)),da=c,ht.move.grounded&&l>1.6&&(fa-=l*t,fa<=0&&(fa=.62,pa=-pa,oc.stamp(a.x,a.y,a.z,ii,pa))),c==="swim"&&(ma-=t,ma<=0&&(ma=.45,ge.ring([a.x,a.y,a.z],"#d9f4ff",1.8,.75))),ga-=t,l>6&&ga<=0&&(ga=.8,(s=Ye.react)==null||s.call(Ye,[a.x,a.y,a.z],4.5)),wu(Bc,i),Sn.charging&&Zr&&Gt.setPower(Sn.chargePower()),Ox(i,t),Fx(t),Bx(i,t),zx(i,t),Ye.updateDigs(ht.digs),xo.update(a,i),Gt.updateLiving(Date.now()),Vx(a,t),ve.setSeaProximity(a.x),(r=Gt.drawMinimap)==null||r.call(Gt,ht,a),c==="swim"&&((o=Gt.trackLocal)==null||o.call(Gt,"swim"))}je.render(qe,Cn),Gx()}cc();Rx({onPlay(i,t){nr=!0,Dn={...t,name:i},Gt.show(),Gt.setIdentity(i||"Dog",t.primary||"#e9c67a"),ve.init(qe),un=Fc({...t,name:i}),qe.add(un.group,un.contactShadow),ht.speedMul=un.breed.speed;const e=new jt;e.position.y=1.55*(t.size||1),e.add(_o(i||"Dog",{bg:"rgba(110,231,160,0.85)",fg:"#0c2214"})),un.group.add(e),Bc.bubbleHolder=e;const n=Gt.getDiscoveryIds();xo.setDiscovered(n),ht.connect(i,t,n),je.domElement.requestPointerLock()}});function Ru(i,t,e){return i+yo(t-i)*e}function yo(i){for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;return i}function lo(i,t,e){return Math.min(e,Math.max(t,i))}function Wx(i,t,e,n){let s=null,r=12*12;const o=(l,h,u)=>{const d=(l-t.x)**2+(u-t.z)**2;d>=r||(r=d,s={x:l,y:h,z:u})};for(const l of ht.squirrels.values()){const h=l.buf[l.buf.length-1];h&&o(h.p[0],h.p[1],h.p[2])}for(const l of ht.dogs.values()){const h=l.buf[l.buf.length-1];h&&o(h.p[0],h.p[1]+.6,h.p[2])}const a=s?lo(yo(Math.atan2(s.x-t.x,s.z-t.z)-e),-.65,.65):0,c=s?lo(-Math.atan2(s.y-t.y-.5,Math.sqrt(r))*.35,-.2,.2):0;i.lookYaw=(i.lookYaw||0)+(a-(i.lookYaw||0))*Math.min(1,n*4),i.lookPitch=(i.lookPitch||0)+(c-(i.lookPitch||0))*Math.min(1,n*4)}function Cu(i,t,e,n){const s=i.contactShadow;if(!s)return;s.visible=!_u(t,n);const r=Zt(t,n),o=1-Math.min(.75,Math.max(0,e-r)*.18);s.position.set(t,r+.018,n),s.scale.set(.72*o,1.05*o,1)}
//# sourceMappingURL=index-MwYL_rf_.js.map
