(function(){"use strict";const w="random",P="DEV_EXAMPLE",O="WIX 🤠",_=`// This function will be called twice for each particle, because all particles reach the target in two frames.
return (particle, animationStartTime, currentTime) => {
    if (particle.x === 0 && particle.y === 0) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    } else {
        particle.x = 0
        particle.y = 0
    }
}`,y=`/**
 * Define an animation function for moving a particle towards its target coordinates.
 *
 * @param {Object} particle - The particle object to be animated.
 * @param {number} particle.x - The current x-coordinate of the particle.
 * @param {number} particle.y - The current y-coordinate of the particle.
 * @param {number} particle.initialX - The initial x-coordinate for the particle.
 * @param {number} particle.initialY - The initial y-coordinate for the particle.
 * @param {number} particle.targetX - The target x-coordinate for the particle.
 * @param {number} particle.targetY - The target y-coordinate for the particle.
 * @param {number} animationStartTime - The timestamp when the animation started.
 * @param {number} currentTime - The current timestamp of the animation frame.
 * @returns {Function} A function to be called on each animation frame to update the particle's position.
 */
return (particle, animationStartTime, currentTime) => {
    /**
    * Write your movement animation code here to incrementally update particle position.
    * The particle is mutable here so you can add whatever properties you need to achieve your animation.
    */

    // Helper function for getting new position value.
    const getUpdatedPosition = (currentPosition, targetPosition, delta) => {
        const distance = Math.abs(currentPosition - targetPosition)
        if (distance <= delta) {
            return targetPosition
        } else {
            return currentPosition < targetPosition ? currentPosition + delta : currentPosition - delta
        }
    }

    // Elapsed time since the start of the animation.
    const totalElapsedTime = currentTime - animationStartTime

    const initialDelta = 1
    // After 1 second, the particles will move twice as fast.
    const delta = totalElapsedTime < 1000 ? initialDelta : initialDelta * 2

    // To keep the example simple, particle coordinates are updated by delta until target coordinates are reached.
    particle.x = getUpdatedPosition(particle.x, particle.targetX, delta)
    particle.y = getUpdatedPosition(particle.y, particle.targetY, delta)
}`;var l=(e=>(e.INITIALIZE="INITIALIZE",e.PLAY="PLAY",e.RESET="RESET",e.RESIZE_PARTICLE_RADIUS="RESIZE_PARTICLE_RADIUS",e.UPDATE_START_POSITION="UPDATE_START_POSITION",e.UPDATE_SELECTED_MOVEMENT_FUNCTION="UPDATE_SELECTED_MOVEMENT_FUNCTION",e.UPDATE_BITMAP="UPDATE_BITMAP",e.UPDATE_TEXT="UPDATE_TEXT",e))(l||{}),h=(e=>(e.INITIALIZED="INITIALIZED",e.UPDATE_APP_PROPS="UPDATE_APP_PROPS",e))(h||{});const A=[{name:"linear",definition:"const linear = (t) => t;",comment:`/**
    * Linear easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"sineIn",definition:"const sineIn = (t) => 1 - Math.cos((t * Math.PI) / 2);",comment:`/**
    * Sine-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"sineOut",definition:"const sineOut = (t) => Math.sin((t * Math.PI) / 2);",comment:`/**
    * Sine-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"sineInOut",definition:"const sineInOut = (t) => -(Math.cos(Math.PI * t) - 1) / 2;",comment:`/**
    * Sine-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quadIn",definition:"const quadIn = (t) => t ** 2;",comment:`/**
    * Quadratic-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quadOut",definition:"const quadOut = (t) => 1 - (1 - t) ** 2;",comment:`/**
    * Quadratic-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quadInOut",definition:"const quadInOut = (t) => t < 0.5 ? 2 * t ** 2 : 1 - (-2 * t + 2) ** 2 / 2;",comment:`/**
    * Quadratic-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"cubicIn",definition:"const cubicIn = t => t ** 3;",comment:`/**
    * Cubic-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"cubicOut",definition:"const cubicOut = t => 1 - (1 - t) ** 3;",comment:`/**
    * Cubic-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"cubicInOut",definition:"const cubicInOut = t => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);",comment:`/**
    * Cubic-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quartIn",definition:"const quartIn = t => t ** 4;",comment:`/**
    * Quartic-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quartOut",definition:"const quartOut = t => 1 - (1 - t) ** 4;",comment:`/**
    * Quartic-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quartInOut",definition:"const quartInOut = t => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2);",comment:`/**
    * Quartic-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quintIn",definition:"const quintIn = t => t ** 5;",comment:`/**
    * Quintic-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quintOut",definition:"const quintOut = t => 1 - (1 - t) ** 5;",comment:`/**
    * Quintic-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quintInOut",definition:"const quintInOut = t => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2);",comment:`/**
    * Quintic-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"expoIn",definition:"const expoIn = t => (t === 0 ? 0 : 2 ** (10 * t - 10));",comment:`/**
    * Exponential-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"expoOut",definition:"const expoOut = t => (t === 1 ? 1 : 1 - 2 ** (-10 * t));",comment:`/**
    * Exponential-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"expoInOut",definition:`const expoInOut = t =>
  t === 0
    ? 0
    : t === 1
    ? 1
    : t < 0.5
    ? 2 ** (20 * t - 10) / 2
    : (2 - 2 ** (-20 * t + 10)) / 2;`,comment:`/**
    * Exponential-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"circIn",definition:"const circIn = t => 1 - Math.sqrt(1 - t ** 2);",comment:`/**
    * Circular-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"circOut",definition:"const circOut = t => Math.sqrt(1 - (t - 1) ** 2);",comment:`/**
    * Circular-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"circInOut",definition:`const circInOut = t =>
  t < 0.5
    ? (1 - Math.sqrt(1 - 4 * t ** 2)) / 2
    : (Math.sqrt(-(2 * t - 3) * (2 * t - 1)) + 1) / 2;`,comment:`/**
    * Circular-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"backIn",definition:"const backIn = t => 2.70158 * t ** 3 - 1.70158 * t ** 2;",comment:`/**
    * Back-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"backOut",definition:"const backOut = t => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;",comment:`/**
    * Back-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"backInOut",definition:`const backInOut = (t, k = 1.70158 * 1.525) =>
      t < 0.5
        ? ((2 * t) ** 2 * ((k + 1) * 2 * t - k)) / 2
        : ((2 * t - 2) ** 2 * ((k + 1) * (t * 2 - 2) + k) + 2) / 2;`,comment:`/**
    * Back-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @param k - The back factor (optional, default is 1.70158 * 1.525).
    * @returns The eased value.
    */`},{name:"elasticIn",definition:` const elasticIn = (x) => {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4)}`,comment:""},{name:"elasticOut",definition:`const elasticOut = (x) =>{
    const c4 = (2 * Math.PI) / 3;

    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }`,comment:""},{name:"elasticInOut",definition:`const elasticInOut = (x) => {
    const c5 = (2 * Math.PI) / 4.5;

    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
    }`,comment:""}],D=`return (particle, animationStartTime, currentTime) => {
    const targetCoordinates = { x: particle.targetX, y: particle.targetY };

    if (!particle.t) {
        particle.t = 0;
        particle.controlX =
            (particle.x + targetCoordinates.x) / 2 + (Math.random() - 0.5) * 100;
        particle.controlY =
            (particle.y + targetCoordinates.y) / 2 + (Math.random() - 0.5) * 100;
    }

    if (particle.t < 1) {
        particle.t += 0.01;
        const t = particle.t;
        const startX = particle.initialX || particle.x;
        const startY = particle.initialY || particle.y;

        particle.x =
            Math.pow(1 - t, 2) * startX +
            2 * (1 - t) * t * particle.controlX +
            Math.pow(t, 2) * targetCoordinates.x;
        particle.y =
            Math.pow(1 - t, 2) * startY +
            2 * (1 - t) * t * particle.controlY +
            Math.pow(t, 2) * targetCoordinates.y;
    } else {
        particle.x = targetCoordinates.x;
        particle.y = targetCoordinates.y;
        particle.t = 0;
    }
};`,R=()=>Object.assign({},{[P]:{code:y},DEV_TWO_FRAMES:{code:_},bezier:{code:D}},...A.map(({name:e,comment:n,definition:c})=>({[e]:{code:`return (particle, animationStartTime, currentTime) => {
    const animationDuration = 2000;
    // This is obviously inefficient because the same constant will be recalculated for every particle, but this is a playground and its not that expensive.
    ${n}
    ${c}
    const lerp = (start, end, t) => start + t * (end - start);

    const totalElapsedTime = currentTime - animationStartTime;
    const progress = Math.min(totalElapsedTime / animationDuration, 1);
    const easedProgress = ${e}(progress);

    particle.x = lerp(particle.initialX, particle.targetX, easedProgress);
    particle.y = lerp(particle.initialY, particle.targetY, easedProgress);

    if (
        Math.abs(particle.x - particle.targetX) < 1 &&
        Math.abs(particle.y - particle.targetY) < 1
    ) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    }
};`}}))),v=(e,n)=>{const{width:r,height:a,data:i}=e,o=Math.ceil(r/n),s=Math.ceil(a/n),m=new Uint8Array(Math.ceil(r/n)*Math.ceil(a/n));let f=0;for(let p=0;p<a;p+=n)for(let u=0;u<r;u+=n){let d=!1;for(let b=0;b<n&&!d;b++)for(let x=0;x<n&&!d;x++){const k=u+x,M=p+b;if(k<r&&M<a){const U=(M*r+k)*4;i[U+3]>10&&(d=!0)}}m[f++]=d?1:0}return{validBlocks:m,blockWidth:o,blockHeight:s}},E=({dimensions:{width:e,height:n}})=>({top:()=>({x:Math.random()*e,y:0}),center:()=>({x:Math.round(e/2),y:Math.round(n/2)}),bottom:()=>({x:Math.random()*e,y:n}),random:()=>({x:Math.random()*e,y:Math.random()*n}),left:()=>({x:0,y:Math.random()*n}),right:()=>({x:e,y:Math.random()*n}),"top-left":()=>({x:Math.random()*(e/5),y:Math.random()*(n/5)}),"top-right":()=>({x:e,y:Math.random()*(n/5)}),"bottom-left":()=>({x:Math.random()*(e/5),y:n-Math.random()*(n/5)}),"bottom-right":()=>({x:e-Math.random()*(e/5),y:n-Math.random()*(n/5)})});let C;const t={workerParticles:[],imageBitmap:null,animationFrameId:0,frameCanvas:null,frameContext:null,mainCanvas:null,mainContext:null,validBlocks:null,blockHeight:0,blockWidth:0,appProps:{particleRadius:2,startPosition:w,selectedMovementFunction:P,movementFunctionCode:R()[P].code,text:O}};let T;const B=async e=>{t.mainCanvas=e,t.mainContext=t.mainCanvas.getContext("bitmaprenderer"),t.frameCanvas=new OffscreenCanvas(t.mainCanvas.width,t.mainCanvas.height),t.frameContext=t.frameCanvas.getContext("2d",{willReadFrequently:!0})},F=async e=>{const{imageBitmap:n,canvas:c,dimensions:r,particleRadius:a,movementFunctionCode:i,selectedMovementFunction:o,startPosition:s,text:m}=e;t.imageBitmap=n,i&&o&&a&&s&&m&&(t.appProps.movementFunctionCode=i,t.appProps.selectedMovementFunction=o,t.appProps.particleRadius=a,t.appProps.startPosition=s,t.appProps.text=m),B(c),t.frameContext.drawImage(t.imageBitmap,0,0);const{validBlocks:f,blockHeight:p,blockWidth:u}=v(t.frameContext.getImageData(0,0,t.mainCanvas.width,t.mainCanvas.height),t.appProps.particleRadius);t.validBlocks=f,t.blockHeight=p,t.blockWidth=u,T=E({dimensions:r}),t.workerParticles=I({validBlocks:t.validBlocks,radius:t.appProps.particleRadius,blockHeight:t.blockHeight,blockWidth:t.blockWidth,startPosition:t.appProps.startPosition})},g=(e,n)=>{let c=!0;t.frameContext.clearRect(0,0,t.frameCanvas.width,t.frameCanvas.height),t.workerParticles.forEach(a=>{C(a,e,n),t.frameContext.drawImage(t.imageBitmap,a.targetX,a.targetY,t.appProps.particleRadius,t.appProps.particleRadius,Math.floor(a.x),Math.floor(a.y),t.appProps.particleRadius,t.appProps.particleRadius),(a.x!==a.targetX||a.y!==a.targetY)&&(c=!1)});const r=t.frameCanvas.transferToImageBitmap();t.mainContext.transferFromImageBitmap(r),c?t.animationFrameId&&cancelAnimationFrame(t.animationFrameId):t.animationFrameId=requestAnimationFrame(a=>g(e,a))},S=()=>{C=new Function(t.appProps.movementFunctionCode)();const e=performance.now();g(e,e)};self.onmessage=e=>{const n={[l.INITIALIZE]:a=>{F(a),self.postMessage({type:h.INITIALIZED,data:t.appProps})},[l.PLAY]:()=>{S()},[l.RESET]:()=>{t.workerParticles=t.workerParticles.map(i=>{const o=T[t.appProps.startPosition]();return{x:o.x,y:o.y,initialX:o.x,initialY:o.y,targetX:i.targetX,targetY:i.targetY}}),t.frameContext.clearRect(0,0,t.frameCanvas.width,t.frameCanvas.height);const a=t.frameCanvas.transferToImageBitmap();t.mainContext.transferFromImageBitmap(a),t.animationFrameId&&cancelAnimationFrame(t.animationFrameId)},[l.RESIZE_PARTICLE_RADIUS]:a=>{t.appProps.particleRadius=a.particleRadius,t.frameContext.drawImage(t.imageBitmap,0,0);const{validBlocks:i,blockHeight:o,blockWidth:s}=v(t.frameContext.getImageData(0,0,t.mainCanvas.width,t.mainCanvas.height),t.appProps.particleRadius);if(t.validBlocks=i,t.blockHeight=o,t.blockWidth=s,t.workerParticles=I({validBlocks:t.validBlocks,radius:t.appProps.particleRadius,blockHeight:t.blockHeight,blockWidth:t.blockWidth,startPosition:t.appProps.startPosition}),self.postMessage({type:h.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId){cancelAnimationFrame(t.animationFrameId);const m=performance.now();g(m,m)}},[l.UPDATE_START_POSITION]:a=>{if(t.appProps.startPosition=a.startPosition,t.workerParticles.length){if(t.workerParticles.forEach(i=>{const o=T[t.appProps.startPosition]();i.initialX=o.x,i.initialY=o.y,i.x=o.x,i.y=o.y}),self.postMessage({type:h.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId){cancelAnimationFrame(t.animationFrameId);const i=performance.now();g(i,i)}}else console.error("updateStartPosition failed, particles were not initialized",{workerParticles:t.workerParticles})},[l.UPDATE_SELECTED_MOVEMENT_FUNCTION]:a=>{const{key:i,movementFunctionCode:o}=a??{};i&&(t.appProps.selectedMovementFunction=i),o&&(t.appProps.movementFunctionCode=o),self.postMessage({type:h.UPDATE_APP_PROPS,data:t.appProps})},[l.UPDATE_TEXT]:a=>{t.appProps.text=a.text,self.postMessage({type:h.UPDATE_APP_PROPS,data:t.appProps})},[l.UPDATE_BITMAP]:a=>{if(t.imageBitmap=a,t.frameCanvas&&t.mainCanvas){t.frameCanvas.width=t.imageBitmap.width,t.frameCanvas.height=t.imageBitmap.height,t.mainCanvas.width=t.imageBitmap.width,t.mainCanvas.height=t.imageBitmap.height,t.frameContext.drawImage(t.imageBitmap,0,0);const{validBlocks:i,blockHeight:o,blockWidth:s}=v(t.frameContext.getImageData(0,0,t.mainCanvas.width,t.mainCanvas.height),t.appProps.particleRadius);t.validBlocks=i,t.blockHeight=o,t.blockWidth=s,T=E({dimensions:{width:t.mainCanvas.width,height:t.mainCanvas.height}}),t.workerParticles=I({validBlocks:t.validBlocks,radius:t.appProps.particleRadius,blockHeight:t.blockHeight,blockWidth:t.blockWidth,startPosition:t.appProps.startPosition})}}},{data:c,type:r}=e.data;n[r](c)};const I=({validBlocks:e,radius:n,blockHeight:c,blockWidth:r,startPosition:a})=>{const i=[];for(let o=0;o<c;o++)for(let s=0;s<r;s++){const m=o*r+s;if(e[m]){const f=s*n,p=o*n,{x:u,y:d}=T[a]();i.push({targetX:f,targetY:p,x:u,y:d,initialX:u,initialY:d})}}return console.log("Particles amount: ",i.length),i}})();
