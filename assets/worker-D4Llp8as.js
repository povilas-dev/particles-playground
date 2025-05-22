(function(){"use strict";const w="random",I="DEV_EXAMPLE",D="WIX 🤠",M="#ffffff",R=["#ff0000","#00ff00","#0000ff"],F={fontFamily:"Arial",fontSize:90,italic:!0,weight:400,letterSpacing:0},S=`// This function will be called twice for each particle, because all particles reach the target in two frames.
return (particle, animationStartTime, currentTime, canvasDimensions) => {
    if (particle.x === 0 && particle.y === 0) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    } else {
        particle.x = 0
        particle.y = 0
    }
}`,T=`/**
 * Define an animation function for moving a particle towards its target coordinates.
 *
 * @param {Object} particle - The particle object to be animated.
 * @param {number} particle.x - The current x-coordinate of the particle.
 * @param {number} particle.y - The current y-coordinate of the particle.
 * @param {number} particle.initialX - The initial x-coordinate for the particle.
 * @param {number} particle.initialY - The initial y-coordinate for the particle.
 * @param {number} particle.targetX - The target x-coordinate for the particle.
 * @param {number} particle.targetY - The target y-coordinate for the particle.
 * @param {number} particle.scale - The scale of the particle.
 * @param {number} particle.opacity - The opacity of the particle.
 * @param {string} particle.color - The color of the particle.
 * @param {number} animationStartTime - The timestamp when the animation started.
 * @param {number} currentTime - The current timestamp of the animation frame.
 * @param {Object} canvasDimensions - The dimensions of the canvas.
 * @param {number} canvasDimensions.width - Width of the canvas where particles are being rendered.
 * @param {number} canvasDimensions.height - Height of the canvas where particles are being rendered.
 * @returns {Function} A function to be called on each animation frame to update the particle's position.
 */
`,U=`${T}
return (particle, animationStartTime, currentTime, canvasDimensions) => {
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
}`;var l=(a=>(a.INITIALIZE="INITIALIZE",a.PLAY="PLAY",a.RESET="RESET",a.RESIZE_PARTICLE_RADIUS="RESIZE_PARTICLE_RADIUS",a.UPDATE_START_POSITION="UPDATE_START_POSITION",a.UPDATE_SELECTED_MOVEMENT_FUNCTION="UPDATE_SELECTED_MOVEMENT_FUNCTION",a.UPDATE_BITMAP="UPDATE_BITMAP",a.UPDATE_TEXT="UPDATE_TEXT",a.UPDATE_FONT="UPDATE_FONT",a.UPDATE_PARTICLE_COLORS="UPDATE_PARTICLE_COLORS",a))(l||{}),h=(a=>(a.INITIALIZED="INITIALIZED",a.UPDATE_APP_PROPS="UPDATE_APP_PROPS",a))(h||{});const B=[{name:"linear",definition:"const linear = (t) => t;",comment:`/**
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
    }`,comment:""}],L=`return (particle, animationStartTime, currentTime) => {
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
};`,X=`return (particle, animationStartTime, currentTime, canvasDimensions) => {
    const animationDuration = 3000; // 3 seconds
    const progress = Math.min((currentTime - animationStartTime) / animationDuration, 1);

    // Initialize properties if not set
    if (!particle.hasInit) {
        particle.hasInit = true;
        particle.originalScale = particle.scale;
        particle.hueOffset = Math.random() * 360; // Random starting hue
        particle.pulseFrequency = 3 + Math.random() * 2; // Individual pulse frequency
    }

    if (progress >= 1) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    } else {
        // Direct path with slight delay at beginning
        const adjustedProgress = Math.pow(progress, 0.7);
        particle.x = particle.initialX + (particle.targetX - particle.initialX) * adjustedProgress;
        particle.y = particle.initialY + (particle.targetY - particle.initialY) * adjustedProgress;
    }

    // Dramatic scale pulsation - goes from very small to very large
    const pulseWave = Math.sin(progress * Math.PI * particle.pulseFrequency);

    // Scale gets extremely large at pulse peaks
    if (pulseWave > 0) {
        // Exponential scale increase on positive pulses
        particle.scale = particle.originalScale * (1 + Math.pow(pulseWave, 2) * 15);
    } else {
        // Become very small on negative pulses
        particle.scale = particle.originalScale * 0.2;
    }

    // End at normal scale
    if (progress > 0.9) {
        const finalAdjustment = (progress - 0.9) / 0.1;
        particle.scale = particle.scale * (1 - finalAdjustment) + particle.originalScale * finalAdjustment;
    }

    // Rapid color cycling through entire spectrum
    const hue = (particle.hueOffset + progress * 720) % 360; // 2 complete color cycles
    const saturation = 100; // Full saturation
    const lightness = 50 + 30 * pulseWave; // Brightness changes with pulse

    particle.color = \`hsl(\${hue}, \${saturation}%, \${lightness}%)\`;

    // Opacity pulses oppositely to scale
    particle.opacity = 0.4 + 0.6 * (1 - Math.abs(pulseWave));
}`,Y=()=>Object.assign({},{[I]:{code:`${T}${U}`},DEV_TWO_FRAMES:{code:`${T}${S}`},bezier:{code:`${T}${L}`},pulseColorCycle:{code:`${T}${X}`}},...B.map(({name:a,comment:n,definition:o})=>({[a]:{code:`${T}return (particle, animationStartTime, currentTime, canvasDimensions) => {
    const animationDuration = 2000;
    // This is obviously inefficient because the same constant will be recalculated for every particle, but this is a playground and its not that expensive.
    ${n}
    ${o}
    const lerp = (start, end, t) => start + t * (end - start);

    const totalElapsedTime = currentTime - animationStartTime;
    const progress = Math.min(totalElapsedTime / animationDuration, 1);
    const easedProgress = ${a}(progress);

    particle.x = lerp(particle.initialX, particle.targetX, easedProgress);
    particle.y = lerp(particle.initialY, particle.targetY, easedProgress);

    if (
        Math.abs(particle.x - particle.targetX) < 1 &&
        Math.abs(particle.y - particle.targetY) < 1
    ) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    }
};`}}))),b=(a,n)=>{const{width:i,height:e,data:r}=a,s=Math.ceil(i/n),c=Math.ceil(e/n),u=new Uint8Array(Math.ceil(i/n)*Math.ceil(e/n));let g=0;for(let d=0;d<e;d+=n)for(let m=0;m<i;m+=n){let p=!1;for(let f=0;f<n&&!p;f++)for(let E=0;E<n&&!p;E++){const O=m+E,_=d+f;if(O<i&&_<e){const j=(_*i+O)*4;r[j+3]>10&&(p=!0)}}u[g++]=p?1:0}return{validBlocks:u,blockWidth:s,blockHeight:c}},C=(a,n,o)=>a+o*(n-a),y=a=>{a=a.replace(/^#/,"");const n=parseInt(a,16),o=n>>16&255,i=n>>8&255,e=n&255;return{r:o,g:i,b:e}},q=(a,n,o)=>"#"+((1<<24)+(a<<16)+(n<<8)+o).toString(16).slice(1),N=(a,n)=>{if(!a.length)return"#ffffff";if(a.length===1)return a[0];const i=Math.max(0,Math.min(1,n))*(a.length-1),e=Math.floor(i);if(e===a.length-1)return a[a.length-1];const r=i-e,s=y(a[e]),c=y(a[e+1]),u=Math.round(C(s.r,c.r,r)),g=Math.round(C(s.g,c.g,r)),d=Math.round(C(s.b,c.b,r));return q(u,g,d)},k=({dimensions:{width:a,height:n}})=>({top:()=>({x:Math.random()*a,y:0}),center:()=>({x:Math.round(a/2),y:Math.round(n/2)}),bottom:()=>({x:Math.random()*a,y:n}),random:()=>({x:Math.random()*a,y:Math.random()*n}),left:()=>({x:0,y:Math.random()*n}),right:()=>({x:a,y:Math.random()*n}),"top-left":()=>({x:Math.random()*(a/5),y:Math.random()*(n/5)}),"top-right":()=>({x:a,y:Math.random()*(n/5)}),"bottom-left":()=>({x:Math.random()*(a/5),y:n-Math.random()*(n/5)}),"bottom-right":()=>({x:a-Math.random()*(a/5),y:n-Math.random()*(n/5)})});let A;const t={workerParticles:[],imageBitmap:null,animationFrameId:0,frameCanvas:null,frameContext:null,mainCanvas:null,mainContext:null,validBlocks:null,blockHeight:0,blockWidth:0,appProps:{particleRadius:2,startPosition:w,selectedMovementFunction:I,movementFunctionCode:Y()[I].code,text:D,font:F,particleColor:M,particleColors:R}};let P;const H=async a=>{t.mainCanvas=a,t.mainContext=t.mainCanvas.getContext("bitmaprenderer"),t.frameCanvas=new OffscreenCanvas(t.mainCanvas.width,t.mainCanvas.height),t.frameContext=t.frameCanvas.getContext("2d",{willReadFrequently:!0})},W=a=>{const{imageBitmap:n,canvas:o,dimensions:i,appProps:e}=a;t.imageBitmap=n,Object.keys(e).length&&(t.appProps={...e}),H(o),t.frameContext.drawImage(t.imageBitmap,0,0);const{validBlocks:r,blockHeight:s,blockWidth:c}=b(t.frameContext.getImageData(0,0,t.mainCanvas.width,t.mainCanvas.height),t.appProps.particleRadius);t.validBlocks=r,t.blockHeight=s,t.blockWidth=c,P=k({dimensions:i}),t.workerParticles=x({validBlocks:t.validBlocks,radius:t.appProps.particleRadius,blockHeight:t.blockHeight,blockWidth:t.blockWidth,startPosition:t.appProps.startPosition})},v=(a,n)=>{let o=!0;t.frameContext.clearRect(0,0,t.frameCanvas.width,t.frameCanvas.height),t.workerParticles.forEach(e=>{var p;A(e,a,n,{width:t.mainCanvas.width,height:t.mainCanvas.height});const r=e.targetX-e.initialX,s=e.targetY-e.initialY,c=Math.sqrt(r*r+s*s),u=e.targetX-e.x,g=e.targetY-e.y,d=Math.sqrt(u*u+g*g),m=c>0?1-d/c:1;if(e.revealThreshold===void 0&&(e.revealThreshold=.7+Math.random()*.25),e.revealProgress=m>=e.revealThreshold?Math.min(1,(m-e.revealThreshold)/(1-e.revealThreshold)*3):0,((p=t.appProps.particleColors)==null?void 0:p.length)>0&&(t.appProps.particleColors.length===1?e.color=t.appProps.particleColors[0]:e.color=N(t.appProps.particleColors,m)),e.revealProgress>=1)t.frameContext.drawImage(t.imageBitmap,e.targetX,e.targetY,t.appProps.particleRadius,t.appProps.particleRadius,Math.floor(e.x),Math.floor(e.y),t.appProps.particleRadius,t.appProps.particleRadius);else{const f=Math.floor(t.appProps.particleRadius*(e.scale||1));e.revealProgress>0&&(t.frameContext.globalAlpha=e.revealProgress*(e.opacity||1),t.frameContext.drawImage(t.imageBitmap,e.targetX,e.targetY,t.appProps.particleRadius,t.appProps.particleRadius,Math.floor(e.x),Math.floor(e.y),t.appProps.particleRadius,t.appProps.particleRadius),t.frameContext.globalAlpha=1),t.frameContext.beginPath(),t.frameContext.arc(Math.floor(e.x)+f/2,Math.floor(e.y)+f/2,f/2,0,Math.PI*2),t.frameContext.fillStyle=e.color,e.opacity!==void 0?t.frameContext.globalAlpha=(1-e.revealProgress)*e.opacity:t.frameContext.globalAlpha=1-e.revealProgress,t.frameContext.fill(),t.frameContext.globalAlpha=1}(e.x!==e.targetX||e.y!==e.targetY)&&(o=!1)});const i=t.frameCanvas.transferToImageBitmap();t.mainContext.transferFromImageBitmap(i),o?t.animationFrameId&&cancelAnimationFrame(t.animationFrameId):t.animationFrameId=requestAnimationFrame(e=>v(a,e))},$=()=>{A=new Function(t.appProps.movementFunctionCode)();const a=performance.now();v(a,a)};self.onmessage=a=>{const{payload:n,type:o}=a.data;switch(o){case l.INITIALIZE:{W(n),self.postMessage({type:h.INITIALIZED,data:t.appProps});break}case l.PLAY:{t.animationFrameId&&cancelAnimationFrame(t.animationFrameId),$();break}case l.RESET:{t.animationFrameId&&cancelAnimationFrame(t.animationFrameId),t.workerParticles=t.workerParticles.map(e=>{const r=P[t.appProps.startPosition]();return{x:r.x,y:r.y,initialX:r.x,initialY:r.y,targetX:e.targetX,targetY:e.targetY,scale:1,opacity:1,color:e.color,revealProgress:0,revealThreshold:e.revealThreshold}}),t.frameContext.clearRect(0,0,t.frameCanvas.width,t.frameCanvas.height);const i=t.frameCanvas.transferToImageBitmap();t.mainContext.transferFromImageBitmap(i),t.animationFrameId&&cancelAnimationFrame(t.animationFrameId);break}case l.RESIZE_PARTICLE_RADIUS:{t.appProps.particleRadius=n,t.frameContext.drawImage(t.imageBitmap,0,0);const{validBlocks:i,blockHeight:e,blockWidth:r}=b(t.frameContext.getImageData(0,0,t.mainCanvas.width,t.mainCanvas.height),t.appProps.particleRadius);if(t.validBlocks=i,t.blockHeight=e,t.blockWidth=r,t.workerParticles=x({validBlocks:t.validBlocks,radius:t.appProps.particleRadius,blockHeight:t.blockHeight,blockWidth:t.blockWidth,startPosition:t.appProps.startPosition}),console.log("workerState.workerParticles",t.workerParticles),self.postMessage({type:h.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId){cancelAnimationFrame(t.animationFrameId);const s=performance.now();v(s,s)}break}case l.UPDATE_START_POSITION:{if(t.appProps.startPosition=n,t.workerParticles.length){if(t.workerParticles.forEach(i=>{const e=P[t.appProps.startPosition]();i.initialX=e.x,i.initialY=e.y,i.x=e.x,i.y=e.y}),self.postMessage({type:h.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId){cancelAnimationFrame(t.animationFrameId);const i=performance.now();v(i,i)}}else console.error("updateStartPosition failed, particles were not initialized",{workerParticles:t.workerParticles});break}case l.UPDATE_SELECTED_MOVEMENT_FUNCTION:{const{key:i,movementFunctionCode:e}=n??{};i&&(t.appProps.selectedMovementFunction=i),e!=null&&(t.appProps.movementFunctionCode=e),self.postMessage({type:h.UPDATE_APP_PROPS,data:t.appProps});break}case l.UPDATE_TEXT:{t.appProps.text=n,self.postMessage({type:h.UPDATE_APP_PROPS,data:t.appProps});break}case l.UPDATE_FONT:{t.appProps.font=n,self.postMessage({type:h.UPDATE_APP_PROPS,data:t.appProps});break}case l.UPDATE_PARTICLE_COLORS:{if(t.appProps.particleColors=n,n.length>0&&(t.appProps.particleColor=n[0]),self.postMessage({type:h.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId){cancelAnimationFrame(t.animationFrameId);const i=performance.now();v(i,i)}break}case l.UPDATE_BITMAP:{if(t.imageBitmap=n,t.frameCanvas&&t.mainCanvas){t.frameCanvas.width=t.imageBitmap.width,t.frameCanvas.height=t.imageBitmap.height,t.mainCanvas.width=t.imageBitmap.width,t.mainCanvas.height=t.imageBitmap.height,t.frameContext.drawImage(t.imageBitmap,0,0);const{validBlocks:i,blockHeight:e,blockWidth:r}=b(t.frameContext.getImageData(0,0,t.mainCanvas.width,t.mainCanvas.height),t.appProps.particleRadius);t.validBlocks=i,t.blockHeight=e,t.blockWidth=r,P=k({dimensions:{width:t.mainCanvas.width,height:t.mainCanvas.height}}),t.workerParticles=x({validBlocks:t.validBlocks,radius:t.appProps.particleRadius,blockHeight:t.blockHeight,blockWidth:t.blockWidth,startPosition:t.appProps.startPosition})}break}}};const x=({validBlocks:a,radius:n,blockHeight:o,blockWidth:i,startPosition:e})=>{const r=[];for(let s=0;s<o;s++)for(let c=0;c<i;c++){const u=s*i+c;if(a[u]){const g=c*n,d=s*n,{x:m,y:p}=P[e]();r.push({targetX:g,targetY:d,x:m,y:p,initialX:m,initialY:p,scale:1,opacity:1,color:M,revealProgress:0,revealThreshold:.7+Math.random()*.25})}}return console.log("Particles amount: ",r.length),r}})();
