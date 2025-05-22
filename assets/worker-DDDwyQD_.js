(function(){"use strict";const B="random",M="DEV_EXAMPLE",U="WIX 🤠",S="#ffffff",F=["#ff0000","#00ff00","#0000ff"],L={fontFamily:"Arial",fontSize:90,italic:!0,weight:400,letterSpacing:0},N=`// This function will be called twice for each particle, because all particles reach the target in two frames.
return (particle, animationStartTime, currentTime, canvasDimensions) => {
    if (particle.x === 0 && particle.y === 0) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    } else {
        particle.x = 0
        particle.y = 0
    }
}`,g=`/**
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
 * @param {number} animationDuration - The duration of the animation.
 * @returns {Function} A function to be called on each animation frame to update the particle's position.
 */
`,X=`${g}
return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`;var l=(a=>(a.INITIALIZE="INITIALIZE",a.PLAY="PLAY",a.RESET="RESET",a.RESIZE_PARTICLE_RADIUS="RESIZE_PARTICLE_RADIUS",a.UPDATE_START_POSITION="UPDATE_START_POSITION",a.UPDATE_SELECTED_MOVEMENT_FUNCTION="UPDATE_SELECTED_MOVEMENT_FUNCTION",a.UPDATE_BITMAP="UPDATE_BITMAP",a.UPDATE_TEXT="UPDATE_TEXT",a.UPDATE_FONT="UPDATE_FONT",a.UPDATE_PARTICLE_COLORS="UPDATE_PARTICLE_COLORS",a.UPDATE_ANIMATION_DURATION="UPDATE_ANIMATION_DURATION",a.UPDATE_ENABLE_BUBBLES="UPDATE_ENABLE_BUBBLES",a))(l||{}),m=(a=>(a.INITIALIZED="INITIALIZED",a.UPDATE_APP_PROPS="UPDATE_APP_PROPS",a))(m||{});const Y=[{name:"linear",definition:"const linear = (t) => t;",comment:`/**
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
    }`,comment:""}],q=`return (particle, animationStartTime, currentTime) => {
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
};`,H=`return (particle, animationStartTime, currentTime, canvasDimensions) => {
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
}`,W=()=>Object.assign({},{[M]:{code:`${g}${X}`},DEV_TWO_FRAMES:{code:`${g}${N}`},bezier:{code:`${g}${q}`},pulseColorCycle:{code:`${g}${H}`}},...Y.map(({name:a,comment:n,definition:s})=>({[a]:{code:`${g}return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    // This is obviously inefficient because the same constant will be recalculated for every particle, but this is a playground and its not that expensive.
    ${n}
    ${s}
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
};`}}))),C=(a,n)=>{const{width:i,height:r,data:t}=a,o=Math.ceil(i/n),c=Math.ceil(r/n),d=new Uint8Array(Math.ceil(i/n)*Math.ceil(r/n));let f=0;for(let p=0;p<r;p+=n)for(let h=0;h<i;h+=n){let u=!1;for(let P=0;P<n&&!u;P++)for(let T=0;T<n&&!u;T++){const x=h+T,b=p+P;if(x<i&&b<r){const R=(b*i+x)*4;t[R+3]>10&&(u=!0)}}d[f++]=u?1:0}return{validBlocks:d,blockWidth:o,blockHeight:c}},A=(a,n,s)=>a+s*(n-a),y=a=>{a=a.replace(/^#/,"");const n=parseInt(a,16),s=n>>16&255,i=n>>8&255,r=n&255;return{r:s,g:i,b:r}},$=(a,n,s)=>"#"+((1<<24)+(a<<16)+(n<<8)+s).toString(16).slice(1),O=(a,n)=>{if(!(a!=null&&a.length))return"#ffffff";if(a.length===1)return a[0];const i=Math.max(0,Math.min(1,n))*(a.length-1),r=Math.floor(i);if(r===a.length-1)return a[a.length-1];const t=i-r,o=y(a[r]),c=y(a[r+1]),d=Math.round(A(o.r,c.r,t)),f=Math.round(A(o.g,c.g,t)),p=Math.round(A(o.b,c.b,t));return $(d,f,p)},D=({dimensions:{width:a,height:n}})=>({top:()=>({x:Math.random()*a,y:0}),center:()=>({x:Math.round(a/2),y:Math.round(n/2)}),bottom:()=>({x:Math.random()*a,y:n}),random:()=>({x:Math.random()*a,y:Math.random()*n}),left:()=>({x:0,y:Math.random()*n}),right:()=>({x:a,y:Math.random()*n}),"top-left":()=>({x:Math.random()*(a/5),y:Math.random()*(n/5)}),"top-right":()=>({x:a,y:Math.random()*(n/5)}),"bottom-left":()=>({x:Math.random()*(a/5),y:n-Math.random()*(n/5)}),"bottom-right":()=>({x:a-Math.random()*(a/5),y:n-Math.random()*(n/5)})});let k;const w={particleRadius:5,startPosition:B,selectedMovementFunction:M,movementFunctionCode:W()[M].code,text:U,font:L,particleColors:F,animationDuration:2e3,enableBubbles:!1},e={workerParticles:[],bubbleParticles:[],imageBitmap:null,animationFrameId:0,frameCanvas:null,frameContext:null,mainCanvas:null,mainContext:null,validBlocks:null,blockHeight:0,blockWidth:0,appProps:w,revealProgress:0};let v;const j=async a=>{e.mainCanvas=a,e.mainContext=e.mainCanvas.getContext("bitmaprenderer"),e.frameCanvas=new OffscreenCanvas(e.mainCanvas.width,e.mainCanvas.height),e.frameContext=e.frameCanvas.getContext("2d",{willReadFrequently:!0})},Q=a=>{const{imageBitmap:n,canvas:s,dimensions:i,appProps:r}=a;e.imageBitmap=n,Object.keys(r).length&&(e.appProps={...w,...r}),j(s),e.frameContext.drawImage(e.imageBitmap,0,0);const{validBlocks:t,blockHeight:o,blockWidth:c}=C(e.frameContext.getImageData(0,0,e.mainCanvas.width,e.mainCanvas.height),e.appProps.particleRadius);e.validBlocks=t,e.blockHeight=o,e.blockWidth=c,v=D({dimensions:i}),e.workerParticles=_({validBlocks:e.validBlocks,radius:e.appProps.particleRadius,blockHeight:e.blockHeight,blockWidth:e.blockWidth,startPosition:e.appProps.startPosition})},V=(a,n,s,i=5)=>{const r=[];for(let t=0;t<i;t++){const o=Math.random()*Math.PI*2,c=.5+Math.random()*2;r.push({x:a,y:n,dx:Math.cos(o)*c,dy:Math.sin(o)*c-1,radius:2+Math.random()*5,color:s,opacity:.7+Math.random()*.3,life:0,maxLife:50+Math.random()*100})}return r},_=({validBlocks:a,radius:n,blockHeight:s,blockWidth:i,startPosition:r})=>{const t=[];for(let o=0;o<s;o++)for(let c=0;c<i;c++){const d=o*i+c;if(a[d]){const f=c*n,p=o*n,{x:h,y:u}=v[r]();t.push({targetX:f,targetY:p,x:h,y:u,initialX:h,initialY:u,scale:1,opacity:1,color:S,revealProgress:0,revealThreshold:.7+Math.random()*.25,reachedTarget:!1,emittedBubbles:!1})}}return t},I=(a,n)=>{let s=!0;e.frameContext.clearRect(0,0,e.frameCanvas.width,e.frameCanvas.height);const i=n-a;e.revealProgress=Math.min(1,i/e.appProps.animationDuration);for(let t=e.bubbleParticles.length-1;t>=0;t--){const o=e.bubbleParticles[t];o.x+=o.dx,o.y+=o.dy,o.dx+=(Math.random()-.5)*.1,o.dy-=.02,o.life++;const c=o.life/o.maxLife,d=o.opacity*(1-c);e.frameContext.beginPath(),e.frameContext.arc(Math.floor(o.x),Math.floor(o.y),o.radius,0,Math.PI*2),e.frameContext.fillStyle=O(e.appProps.particleColors,c),e.frameContext.globalAlpha=d,e.frameContext.fill(),o.life>=o.maxLife&&e.bubbleParticles.splice(t,1)}e.frameContext.globalAlpha=1,e.workerParticles.forEach((t,o)=>{var f;if(o/e.workerParticles.length<=e.revealProgress){k(t,a,n,{width:e.mainCanvas.width,height:e.mainCanvas.height},e.appProps.animationDuration);const p=t.targetX-t.initialX,h=t.targetY-t.initialY,u=Math.sqrt(p*p+h*h),P=t.targetX-t.x,T=t.targetY-t.y,x=Math.sqrt(P*P+T*T),b=u>0?1-x/u:1;if(t.revealThreshold===void 0&&(t.revealThreshold=.7+Math.random()*.25),t.revealProgress=b>=t.revealThreshold?Math.min(1,(b-t.revealThreshold)/(1-t.revealThreshold)*3):0,((f=e.appProps.particleColors)==null?void 0:f.length)>0&&(e.appProps.particleColors.length===1?t.color=e.appProps.particleColors[0]:t.color=O(e.appProps.particleColors,b)),Math.abs(t.x-t.targetX)<.5&&Math.abs(t.y-t.targetY)<.5&&!t.emittedBubbles&&e.appProps.enableBubbles){t.emittedBubbles=!0;const E=V(t.x,t.y,t.color,2+Math.floor(Math.random()*3));e.bubbleParticles.push(...E)}if(t.revealProgress>=1)e.frameContext.drawImage(e.imageBitmap,t.targetX,t.targetY,e.appProps.particleRadius,e.appProps.particleRadius,Math.floor(t.x),Math.floor(t.y),e.appProps.particleRadius,e.appProps.particleRadius);else{const E=Math.floor(e.appProps.particleRadius*(t.scale||1));t.revealProgress>0&&(e.frameContext.globalAlpha=t.revealProgress*(t.opacity||1),e.frameContext.drawImage(e.imageBitmap,t.targetX,t.targetY,e.appProps.particleRadius,e.appProps.particleRadius,Math.floor(t.x),Math.floor(t.y),e.appProps.particleRadius,e.appProps.particleRadius),e.frameContext.globalAlpha=1),e.frameContext.beginPath(),e.frameContext.arc(Math.floor(t.x)+E/2,Math.floor(t.y)+E/2,E/2,0,Math.PI*2),e.frameContext.fillStyle=t.color,t.opacity!==void 0?e.frameContext.globalAlpha=(1-t.revealProgress)*t.opacity:e.frameContext.globalAlpha=1-t.revealProgress,e.frameContext.fill(),e.frameContext.globalAlpha=1}(t.x!==t.targetX||t.y!==t.targetY)&&(s=!1)}else s=!1});const r=e.frameCanvas.transferToImageBitmap();e.mainContext.transferFromImageBitmap(r),!s||e.bubbleParticles.length>0?e.animationFrameId=requestAnimationFrame(t=>I(a,t)):e.animationFrameId&&(cancelAnimationFrame(e.animationFrameId),e.frameContext.drawImage(e.imageBitmap,0,0),e.bubbleParticles=[])},Z=()=>{k=new Function(e.appProps.movementFunctionCode)();const a=performance.now();e.revealProgress=0,e.bubbleParticles=[],e.workerParticles.forEach(n=>{n.emittedBubbles=!1}),I(a,a)};self.onmessage=a=>{const{payload:n,type:s}=a.data;switch(s){case l.INITIALIZE:{Q(n),self.postMessage({type:m.INITIALIZED,data:e.appProps});break}case l.PLAY:{e.animationFrameId&&cancelAnimationFrame(e.animationFrameId),e.bubbleParticles=[],Z();break}case l.RESET:{e.animationFrameId&&cancelAnimationFrame(e.animationFrameId),e.workerParticles=e.workerParticles.map(r=>{const t=v[e.appProps.startPosition]();return{x:t.x,y:t.y,initialX:t.x,initialY:t.y,targetX:r.targetX,targetY:r.targetY,scale:1,opacity:1,color:r.color,revealProgress:0,revealThreshold:r.revealThreshold}}),e.frameContext.clearRect(0,0,e.frameCanvas.width,e.frameCanvas.height);const i=e.frameCanvas.transferToImageBitmap();e.mainContext.transferFromImageBitmap(i),e.animationFrameId&&cancelAnimationFrame(e.animationFrameId);break}case l.RESIZE_PARTICLE_RADIUS:{e.appProps.particleRadius=n,e.frameContext.drawImage(e.imageBitmap,0,0);const{validBlocks:i,blockHeight:r,blockWidth:t}=C(e.frameContext.getImageData(0,0,e.mainCanvas.width,e.mainCanvas.height),e.appProps.particleRadius);if(e.validBlocks=i,e.blockHeight=r,e.blockWidth=t,e.workerParticles=_({validBlocks:e.validBlocks,radius:e.appProps.particleRadius,blockHeight:e.blockHeight,blockWidth:e.blockWidth,startPosition:e.appProps.startPosition}),self.postMessage({type:m.UPDATE_APP_PROPS,data:e.appProps}),e.animationFrameId){cancelAnimationFrame(e.animationFrameId);const o=performance.now();I(o,o)}break}case l.UPDATE_START_POSITION:{if(e.appProps.startPosition=n,e.workerParticles.length){if(e.workerParticles.forEach(i=>{const r=v[e.appProps.startPosition]();i.initialX=r.x,i.initialY=r.y,i.x=r.x,i.y=r.y}),self.postMessage({type:m.UPDATE_APP_PROPS,data:e.appProps}),e.animationFrameId){cancelAnimationFrame(e.animationFrameId);const i=performance.now();I(i,i)}}else console.error("updateStartPosition failed, particles were not initialized",{workerParticles:e.workerParticles});break}case l.UPDATE_SELECTED_MOVEMENT_FUNCTION:{const{key:i,movementFunctionCode:r}=n??{};i&&(e.appProps.selectedMovementFunction=i),r!=null&&(e.appProps.movementFunctionCode=r),self.postMessage({type:m.UPDATE_APP_PROPS,data:e.appProps});break}case l.UPDATE_TEXT:{e.appProps.text=n,self.postMessage({type:m.UPDATE_APP_PROPS,data:e.appProps});break}case l.UPDATE_FONT:{e.appProps.font=n,self.postMessage({type:m.UPDATE_APP_PROPS,data:e.appProps});break}case l.UPDATE_PARTICLE_COLORS:{if(e.appProps.particleColors=n,n.length>0,self.postMessage({type:m.UPDATE_APP_PROPS,data:e.appProps}),e.animationFrameId){cancelAnimationFrame(e.animationFrameId);const i=performance.now();I(i,i)}break}case l.UPDATE_BITMAP:{if(e.imageBitmap=n,e.frameCanvas&&e.mainCanvas){e.frameCanvas.width=e.imageBitmap.width,e.frameCanvas.height=e.imageBitmap.height,e.mainCanvas.width=e.imageBitmap.width,e.mainCanvas.height=e.imageBitmap.height,e.frameContext.drawImage(e.imageBitmap,0,0);const{validBlocks:i,blockHeight:r,blockWidth:t}=C(e.frameContext.getImageData(0,0,e.mainCanvas.width,e.mainCanvas.height),e.appProps.particleRadius);e.validBlocks=i,e.blockHeight=r,e.blockWidth=t,v=D({dimensions:{width:e.mainCanvas.width,height:e.mainCanvas.height}}),e.workerParticles=_({validBlocks:e.validBlocks,radius:e.appProps.particleRadius,blockHeight:e.blockHeight,blockWidth:e.blockWidth,startPosition:e.appProps.startPosition})}break}case l.UPDATE_ANIMATION_DURATION:{e.appProps.animationDuration=n,self.postMessage({type:m.UPDATE_APP_PROPS,data:e.appProps}),e.animationFrameId&&(e.bubbleParticles=[]);break}case l.UPDATE_ENABLE_BUBBLES:{e.appProps.enableBubbles=n,self.postMessage({type:m.UPDATE_APP_PROPS,data:e.appProps});break}}}})();
