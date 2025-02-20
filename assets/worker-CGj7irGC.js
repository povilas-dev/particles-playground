(function(){"use strict";const H=(a,t)=>{const{width:o,height:n,data:i}=a,d=Math.ceil(o/t),f=Math.ceil(n/t),P=new Uint8Array(Math.ceil(o/t)*Math.ceil(n/t));let v=0;for(let x=0;x<n;x+=t)for(let k=0;k<o;k+=t){let h=!1;for(let R=0;R<t&&!h;R++)for(let F=0;F<t&&!h;F++){const T=k+F,Y=x+R;if(T<o&&Y<n){const E=(Y*o+T)*4;i[E+3]>10&&(h=!0)}}P[v++]=h?1:0}return{validBlocks:P,blockWidth:d,blockHeight:f}},w=({dimensions:{width:a,height:t}})=>({top:()=>({x:Math.random()*a,y:0}),center:()=>({x:Math.round(a/2),y:Math.round(t/2)}),bottom:()=>({x:Math.random()*a,y:t}),random:()=>({x:Math.random()*a,y:Math.random()*t}),left:()=>({x:0,y:Math.random()*t}),right:()=>({x:a,y:Math.random()*t}),"top-left":()=>({x:Math.random()*(a/5),y:Math.random()*(t/5)}),"top-right":()=>({x:a,y:Math.random()*(t/5)}),"bottom-left":()=>({x:Math.random()*(a/5),y:t-Math.random()*(t/5)}),"bottom-right":()=>({x:a-Math.random()*(a/5),y:t-Math.random()*(t/5)})});let g=[],u,r,c,l,m,p,s,b,M,B,y,_,C;const W=async a=>{m=a,p=m.getContext("bitmaprenderer"),c=new OffscreenCanvas(m.width,m.height),l=c.getContext("2d",{willReadFrequently:!0})},X=async a=>{const{imageBitmap:t,canvas:e,dimensions:o,particleRadius:n}=a;u=t,s=n,y=a.startPosition,W(e),l.drawImage(u,0,0);const{validBlocks:i,blockHeight:d,blockWidth:f}=H(l.getImageData(0,0,m.width,m.height),s);b=i,M=d,B=f,C=w({dimensions:o}),g=A({validBlocks:b,radius:s,blockHeight:M,blockWidth:B,startPosition:y})},I=()=>{let a=!0;l.clearRect(0,0,c.width,c.height),g.forEach(e=>{_(e),l.drawImage(u,e.targetX,e.targetY,s,s,Math.floor(e.x),Math.floor(e.y),s,s),(e.x!==e.targetX||e.y!==e.targetY)&&(a=!1)});const t=c.transferToImageBitmap();p.transferFromImageBitmap(t),a?(self.postMessage({type:"particlesReachedTarget"}),r&&cancelAnimationFrame(r)):r=requestAnimationFrame(I)};self.onmessage=a=>{const{data:t,type:e}=a.data;switch(e){case"initialize":{X(t),self.postMessage({type:"initialized"});break}case"resizeParticleRadius":{s=t.particleRadius,l.drawImage(u,0,0);const{validBlocks:o,blockHeight:n,blockWidth:i}=H(l.getImageData(0,0,m.width,m.height),s);b=o,M=n,B=i,g=A({validBlocks:b,radius:s,blockHeight:M,blockWidth:B,startPosition:y}),r&&(cancelAnimationFrame(r),I());break}case"play":{_=new Function(t.code)(),I();break}case"updateStartPosition":{y=t.startPosition,g.length?(g.forEach(o=>{const n=C[t.startPosition]();o.x=n.x,o.y=n.y}),r&&(cancelAnimationFrame(r),I())):console.error("updateStartPosition failed, particles were not initialized",{workerParticles:g});break}case"reset":{g.forEach(n=>{const i=C[y]();n.x=i.x,n.y=i.y}),l.clearRect(0,0,c.width,c.height);const o=c.transferToImageBitmap();p.transferFromImageBitmap(o),r&&cancelAnimationFrame(r);break}}};const A=({validBlocks:a,radius:t,blockHeight:e,blockWidth:o,startPosition:n})=>{const i=[];for(let d=0;d<e;d++)for(let f=0;f<o;f++){const P=d*o+f;if(a[P]){const v=f*t,x=d*t,{x:k,y:h}=C[n]();i.push({targetX:v,targetY:x,x:k,y:h,initialX:k,initialY:h})}}return console.log("Particles amount: ",i.length),i}})();
