(function(){"use strict";const B="random",b="DEV_EXAMPLE",R="WIX 🤠",U="#ffffff",S=["#ff0000","#00ff00","#0000ff"],X={fontFamily:"Arial",fontSize:90,italic:!0,weight:400,letterSpacing:0},F=`// This function will be called twice for each particle, because all particles reach the target in two frames.
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
`,L=`${g}
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
}`,C=1300;var p=(e=>(e.INITIALIZE="INITIALIZE",e.PLAY="PLAY",e.RESET="RESET",e.RESIZE_PARTICLE_RADIUS="RESIZE_PARTICLE_RADIUS",e.UPDATE_START_POSITION="UPDATE_START_POSITION",e.UPDATE_SELECTED_MOVEMENT_FUNCTION="UPDATE_SELECTED_MOVEMENT_FUNCTION",e.UPDATE_BITMAP="UPDATE_BITMAP",e.UPDATE_TEXT="UPDATE_TEXT",e.UPDATE_FONT="UPDATE_FONT",e.UPDATE_PARTICLE_COLORS="UPDATE_PARTICLE_COLORS",e.UPDATE_ANIMATION_DURATION="UPDATE_ANIMATION_DURATION",e.UPDATE_ENABLE_BUBBLES="UPDATE_ENABLE_BUBBLES",e))(p||{}),u=(e=>(e.INITIALIZED="INITIALIZED",e.UPDATE_APP_PROPS="UPDATE_APP_PROPS",e))(u||{});const Y=[{name:"linear",definition:"const linear = (t) => t;",comment:`/**
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
    }`,comment:""}],N=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    const totalElapsedTime = currentTime - animationStartTime;
    const progress = Math.min(totalElapsedTime / animationDuration, 1);

    // Cubic ease-in-out for smooth animation timing
    const t = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    // Initialize control points if not already set
    if (!particle.controlPoint1X) {
        const deltaX = particle.targetX - particle.initialX;
        const deltaY = particle.targetY - particle.initialY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Create control points for a natural curved path
        const midX = (particle.initialX + particle.targetX) / 2;
        const midY = (particle.initialY + particle.targetY) / 2;

        // Offset control points perpendicular to the direct path
        const perpX = -deltaY / distance;
        const perpY = deltaX / distance;

        // Control points create an arc - adjust curvature based on distance
        const curvature = Math.min(distance * 0.3, 150);

        particle.controlPoint1X = particle.initialX + deltaX * 0.3 + perpX * curvature;
        particle.controlPoint1Y = particle.initialY + deltaY * 0.3 + perpY * curvature;

        particle.controlPoint2X = particle.targetX - deltaX * 0.3 + perpX * curvature * 0.5;
        particle.controlPoint2Y = particle.targetY - deltaY * 0.3 + perpY * curvature * 0.5;
    }

    // Cubic Bézier curve calculation: B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃
    const oneMinusT = 1 - t;
    const oneMinusT2 = oneMinusT * oneMinusT;
    const oneMinusT3 = oneMinusT2 * oneMinusT;
    const t2 = t * t;
    const t3 = t2 * t;

    particle.x = oneMinusT3 * particle.initialX +
                 3 * oneMinusT2 * t * particle.controlPoint1X +
                 3 * oneMinusT * t2 * particle.controlPoint2X +
                 t3 * particle.targetX;

    particle.y = oneMinusT3 * particle.initialY +
                 3 * oneMinusT2 * t * particle.controlPoint1Y +
                 3 * oneMinusT * t2 * particle.controlPoint2Y +
                 t3 * particle.targetY;

    // Optional: Add rotation based on movement direction for enhanced visual effect
    if (progress > 0) {
        // Calculate tangent vector for rotation
        const tangentX = 3 * oneMinusT2 * (particle.controlPoint1X - particle.initialX) +
                        6 * oneMinusT * t * (particle.controlPoint2X - particle.controlPoint1X) +
                        3 * t2 * (particle.targetX - particle.controlPoint2X);

        const tangentY = 3 * oneMinusT2 * (particle.controlPoint1Y - particle.initialY) +
                        6 * oneMinusT * t * (particle.controlPoint2Y - particle.controlPoint1Y) +
                        3 * t2 * (particle.targetY - particle.controlPoint2Y);

        particle.rotation = Math.atan2(tangentY, tangentX);
    }

    // Scale effect - starts small, grows, then shrinks slightly at the end
    particle.scale = 0.5 + 0.7 * Math.sin(progress * Math.PI);

    // Opacity fades in and stays visible
    particle.opacity = Math.min(1, progress * 3);
};
`,q=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`,H=()=>Object.assign({},{[b]:{code:`${g}${L}`},DEV_TWO_FRAMES:{code:`${g}${F}`},bezier:{code:`${g}${N}`},pulseColorCycle:{code:`${g}${q}`}},...Y.map(({name:e,comment:a,definition:c})=>({[e]:{code:`${g}return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    // This is obviously inefficient because the same constant will be recalculated for every particle, but this is a playground and its not that expensive.
    ${a}
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
};`}}))),v=(e,a)=>{const{width:i,height:r,data:s}=e,l=Math.ceil(i/a),m=Math.ceil(r/a),n=new Uint8Array(Math.ceil(i/a)*Math.ceil(r/a));let o=0;for(let d=0;d<r;d+=a)for(let h=0;h<i;h+=a){let f=!1;for(let M=0;M<a&&!f;M++)for(let A=0;A<a&&!f;A++){const k=h+A,w=d+M;if(k<i&&w<r){const z=(w*i+k)*4;s[z+3]>10&&(f=!0)}}n[o++]=f?1:0}return{validBlocks:n,blockWidth:l,blockHeight:m}},I=(e,a,c)=>e+c*(a-e),x=e=>{e=e.replace(/^#/,"");const a=parseInt(e,16),c=a>>16&255,i=a>>8&255,r=a&255;return{r:c,g:i,b:r}},W=(e,a,c)=>"#"+((1<<24)+(e<<16)+(a<<8)+c).toString(16).slice(1),_=(e,a)=>{if(!(e!=null&&e.length))return"#ffffff";if(e.length===1)return e[0];const i=Math.max(0,Math.min(1,a))*(e.length-1),r=Math.floor(i);if(r===e.length-1)return e[e.length-1];const s=i-r,l=x(e[r]),m=x(e[r+1]),n=Math.round(I(l.r,m.r,s)),o=Math.round(I(l.g,m.g,s)),d=Math.round(I(l.b,m.b,s));return W(n,o,d)},O=({dimensions:{width:e,height:a}})=>({top:()=>({x:Math.random()*e,y:0}),center:()=>({x:Math.round(e/2),y:Math.round(a/2)}),bottom:()=>({x:Math.random()*e,y:a}),random:()=>({x:Math.random()*e,y:Math.random()*a}),left:()=>({x:0,y:Math.random()*a}),right:()=>({x:e,y:Math.random()*a}),"top-left":()=>({x:Math.random()*(e/5),y:Math.random()*(a/5)}),"top-right":()=>({x:e,y:Math.random()*(a/5)}),"bottom-left":()=>({x:Math.random()*(e/5),y:a-Math.random()*(a/5)}),"bottom-right":()=>({x:e-Math.random()*(e/5),y:a-Math.random()*(a/5)})});let y;const D={particleRadius:5,startPosition:B,selectedMovementFunction:b,movementFunctionCode:H()[b].code,text:R,font:X,particleColors:S,animationDuration:3e3,enableBubbles:!1},t={workerParticles:[],bubbleParticles:[],imageBitmap:null,animationFrameId:0,frameCanvas:null,frameContext:null,mainCanvas:null,mainContext:null,validBlocks:null,blockHeight:0,blockWidth:0,appProps:D,revealProgress:0};let T;const $=async e=>{t.mainCanvas=e,t.mainContext=t.mainCanvas.getContext("bitmaprenderer"),t.frameCanvas=new OffscreenCanvas(t.mainCanvas.width,t.mainCanvas.height),t.frameContext=t.frameCanvas.getContext("2d",{willReadFrequently:!0})},j=e=>{const{imageBitmap:a,canvas:c,dimensions:i,appProps:r}=e;t.imageBitmap=a,Object.keys(r).length&&(t.appProps={...D,...r}),$(c),t.frameContext.drawImage(t.imageBitmap,0,0);const{validBlocks:s,blockHeight:l,blockWidth:m}=v(t.frameContext.getImageData(0,0,t.mainCanvas.width,t.mainCanvas.height),t.appProps.particleRadius);t.validBlocks=s,t.blockHeight=l,t.blockWidth=m,T=O({dimensions:i}),t.workerParticles=E({validBlocks:t.validBlocks,radius:t.appProps.particleRadius,blockHeight:t.blockHeight,blockWidth:t.blockWidth,startPosition:t.appProps.startPosition})},Q=(e,a,c,i,r=5)=>{const s=[];for(let l=0;l<r;l++){const m=Math.random()*Math.PI*2,n=.5+Math.random()*2;s.push({x:e,y:a,dx:Math.cos(m)*n,dy:Math.sin(m)*n-1,radius:2+Math.random()*5,color:c,opacity:.7+Math.random()*.3,createdAt:i,lifetime:C})}return s},E=({validBlocks:e,radius:a,blockHeight:c,blockWidth:i,startPosition:r})=>{const s=[];for(let l=0;l<c;l++)for(let m=0;m<i;m++){const n=l*i+m;if(e[n]){const o=m*a,d=l*a,{x:h,y:f}=T[r]();s.push({targetX:o,targetY:d,x:h,y:f,initialX:h,initialY:f,scale:1,opacity:1,color:U,revealProgress:0,revealThreshold:.97+Math.random()*.02,reachedTarget:!1,emittedBubbles:!1})}}return s},V=(e,a)=>a>(e.revealThreshold||.99)||a>.85&&Math.sqrt(Math.pow(e.x-e.targetX,2)+Math.pow(e.y-e.targetY,2))<=5,P=(e,a)=>{let c=!0;t.frameContext.clearRect(0,0,t.frameCanvas.width,t.frameCanvas.height);const i=a-e;t.revealProgress=Math.min(1,i/t.appProps.animationDuration);for(let n=t.bubbleParticles.length-1;n>=0;n--){const o=t.bubbleParticles[n];o.x+=o.dx,o.y+=o.dy,o.dx+=(Math.random()-.5)*.1,o.dy-=.02;const d=a-o.createdAt,h=Math.min(1,d/o.lifetime),f=o.opacity*(1-h);t.frameContext.beginPath(),t.frameContext.arc(Math.floor(o.x),Math.floor(o.y),o.radius,0,Math.PI*2),t.frameContext.fillStyle=_(t.appProps.particleColors,h),t.frameContext.globalAlpha=f,t.frameContext.fill(),d>=o.lifetime&&t.bubbleParticles.splice(n,1)}t.frameContext.globalAlpha=1,t.workerParticles.forEach(n=>{if(y(n,e,a,{width:t.mainCanvas.width,height:t.mainCanvas.height},t.appProps.animationDuration),V(n,t.revealProgress))t.frameContext.globalAlpha=1,t.frameContext.drawImage(t.imageBitmap,n.targetX,n.targetY,t.appProps.particleRadius,t.appProps.particleRadius,Math.floor(n.x),Math.floor(n.y),t.appProps.particleRadius,t.appProps.particleRadius);else{const o=Math.floor(t.appProps.particleRadius*(n.scale||1));t.frameContext.globalAlpha=n.opacity||1,t.frameContext.beginPath(),t.frameContext.arc(Math.floor(n.x)+o/2,Math.floor(n.y)+o/2,o/2,0,2*Math.PI),t.frameContext.fillStyle=t.appProps.particleColors.length?_(t.appProps.particleColors,t.revealProgress):n.color,t.frameContext.fill()}if(!n.emittedBubbles&&t.appProps.enableBubbles&&n.x===n.targetX&&n.y===n.targetY){n.emittedBubbles=!0;const o=Q(n.x,n.y,n.color,a,2+Math.floor(Math.random()*3));t.bubbleParticles.push(...o)}(n.x!==n.targetX||n.y!==n.targetY||t.revealProgress<.99)&&(c=!1)});const r=t.frameCanvas.transferToImageBitmap();t.mainContext.transferFromImageBitmap(r);const s=c&&t.revealProgress>=1,l=t.appProps.animationDuration+(t.appProps.enableBubbles?C:0);s&&i>=l?t.animationFrameId&&(cancelAnimationFrame(t.animationFrameId),t.bubbleParticles=[],t.frameContext.drawImage(t.imageBitmap,0,0)):t.animationFrameId=requestAnimationFrame(n=>P(e,n))},Z=()=>{y=new Function(t.appProps.movementFunctionCode)();const e=performance.now();t.revealProgress=0,t.bubbleParticles=[],t.workerParticles.forEach(a=>{a.emittedBubbles=!1}),P(e,e)};self.onmessage=e=>{const{payload:a,type:c}=e.data;switch(c){case p.INITIALIZE:{j(a),self.postMessage({type:u.INITIALIZED,data:t.appProps});break}case p.PLAY:{t.animationFrameId&&cancelAnimationFrame(t.animationFrameId),t.bubbleParticles=[],Z();break}case p.RESET:{t.animationFrameId&&cancelAnimationFrame(t.animationFrameId),t.workerParticles=t.workerParticles.map(r=>{const s=T[t.appProps.startPosition]();return{x:s.x,y:s.y,initialX:s.x,initialY:s.y,targetX:r.targetX,targetY:r.targetY,scale:1,opacity:1,color:r.color,revealProgress:0,revealThreshold:r.revealThreshold}}),t.frameContext.clearRect(0,0,t.frameCanvas.width,t.frameCanvas.height);const i=t.frameCanvas.transferToImageBitmap();t.mainContext.transferFromImageBitmap(i),t.animationFrameId&&cancelAnimationFrame(t.animationFrameId);break}case p.RESIZE_PARTICLE_RADIUS:{t.appProps.particleRadius=a,t.frameContext.drawImage(t.imageBitmap,0,0);const{validBlocks:i,blockHeight:r,blockWidth:s}=v(t.frameContext.getImageData(0,0,t.mainCanvas.width,t.mainCanvas.height),t.appProps.particleRadius);if(t.validBlocks=i,t.blockHeight=r,t.blockWidth=s,t.workerParticles=E({validBlocks:t.validBlocks,radius:t.appProps.particleRadius,blockHeight:t.blockHeight,blockWidth:t.blockWidth,startPosition:t.appProps.startPosition}),self.postMessage({type:u.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId){cancelAnimationFrame(t.animationFrameId);const l=performance.now();P(l,l)}break}case p.UPDATE_START_POSITION:{if(t.appProps.startPosition=a,t.workerParticles.length){if(t.workerParticles.forEach(i=>{const r=T[t.appProps.startPosition]();i.initialX=r.x,i.initialY=r.y,i.x=r.x,i.y=r.y}),self.postMessage({type:u.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId){cancelAnimationFrame(t.animationFrameId);const i=performance.now();P(i,i)}}else console.error("updateStartPosition failed, particles were not initialized",{workerParticles:t.workerParticles});break}case p.UPDATE_SELECTED_MOVEMENT_FUNCTION:{const{key:i,movementFunctionCode:r}=a??{};i&&(t.appProps.selectedMovementFunction=i),r!=null&&(t.appProps.movementFunctionCode=r),self.postMessage({type:u.UPDATE_APP_PROPS,data:t.appProps});break}case p.UPDATE_TEXT:{t.appProps.text=a,self.postMessage({type:u.UPDATE_APP_PROPS,data:t.appProps});break}case p.UPDATE_FONT:{t.appProps.font=a,self.postMessage({type:u.UPDATE_APP_PROPS,data:t.appProps});break}case p.UPDATE_PARTICLE_COLORS:{if(t.appProps.particleColors=a,a.length>0,self.postMessage({type:u.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId){cancelAnimationFrame(t.animationFrameId);const i=performance.now();P(i,i)}break}case p.UPDATE_BITMAP:{if(t.imageBitmap=a,t.frameCanvas&&t.mainCanvas){t.frameCanvas.width=t.imageBitmap.width,t.frameCanvas.height=t.imageBitmap.height,t.mainCanvas.width=t.imageBitmap.width,t.mainCanvas.height=t.imageBitmap.height,t.frameContext.drawImage(t.imageBitmap,0,0);const{validBlocks:i,blockHeight:r,blockWidth:s}=v(t.frameContext.getImageData(0,0,t.mainCanvas.width,t.mainCanvas.height),t.appProps.particleRadius);t.validBlocks=i,t.blockHeight=r,t.blockWidth=s,T=O({dimensions:{width:t.mainCanvas.width,height:t.mainCanvas.height}}),t.workerParticles=E({validBlocks:t.validBlocks,radius:t.appProps.particleRadius,blockHeight:t.blockHeight,blockWidth:t.blockWidth,startPosition:t.appProps.startPosition})}break}case p.UPDATE_ANIMATION_DURATION:{t.appProps.animationDuration=a,self.postMessage({type:u.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId&&(t.bubbleParticles=[]);break}case p.UPDATE_ENABLE_BUBBLES:{t.appProps.enableBubbles=a,self.postMessage({type:u.UPDATE_APP_PROPS,data:t.appProps});break}}}})();
