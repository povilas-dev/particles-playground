(function(){"use strict";const S="random",b="DEV_EXAMPLE",B="WIX 🤠",R="#ffffff",F=["#ff0000","#00ff00","#0000ff"],X={fontFamily:"Arial",fontSize:90,italic:!0,weight:400,letterSpacing:0},U=`// This function will be called twice for each particle, because all particles reach the target in two frames.
return (particle, animationStartTime, currentTime, canvasDimensions) => {
    if (particle.x === 0 && particle.y === 0) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    } else {
        particle.x = 0
        particle.y = 0
    }
}`,f=`/**
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
`,Y=`${f}
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
}`,C=1300;var u=(e=>(e.INITIALIZE="INITIALIZE",e.PLAY="PLAY",e.RESET="RESET",e.RESIZE_PARTICLE_RADIUS="RESIZE_PARTICLE_RADIUS",e.UPDATE_START_POSITION="UPDATE_START_POSITION",e.UPDATE_SELECTED_MOVEMENT_FUNCTION="UPDATE_SELECTED_MOVEMENT_FUNCTION",e.UPDATE_BITMAP="UPDATE_BITMAP",e.UPDATE_TEXT="UPDATE_TEXT",e.UPDATE_FONT="UPDATE_FONT",e.UPDATE_PARTICLE_COLORS="UPDATE_PARTICLE_COLORS",e.UPDATE_ANIMATION_DURATION="UPDATE_ANIMATION_DURATION",e.UPDATE_ENABLE_BUBBLES="UPDATE_ENABLE_BUBBLES",e))(u||{}),d=(e=>(e.INITIALIZED="INITIALIZED",e.UPDATE_APP_PROPS="UPDATE_APP_PROPS",e))(d||{});const L=[{name:"linear",definition:"const linear = (t) => t;",comment:`/**
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
}`,W=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    const progress = Math.min((currentTime - animationStartTime) / animationDuration, 1);

    // Initialize properties if not set
    if (!particle.hasInit) {
        particle.hasInit = true;
        particle.originalScale = particle.scale;
        particle.timeDialation = 0.3 + Math.random() * 1.4; // How fast/slow time moves for this particle
        particle.temporalPhase = Math.random() * Math.PI * 2; // Phase in time wave
        particle.chronoField = Math.random() * 0.8; // Strength of temporal field
        particle.timeReversal = Math.random() > 0.8; // 20% chance of time reversal
        particle.quantumFluctuation = Math.random() * 0.5; // Quantum time uncertainty
        particle.lastPosition = {x: particle.initialX, y: particle.initialY};
        particle.timeEcho = []; // Trail of previous positions
        particle.maxEchos = 5 + Math.floor(Math.random() * 5);
    }

    // Apply time dilation to progress
    let temporalProgress = progress;
    if (particle.timeReversal && progress > 0.3 && progress < 0.8) {
        // Time reversal in middle section, but still progress overall
        const reversalStrength = Math.sin((progress - 0.3) / 0.5 * Math.PI);
        const baseProgress = Math.pow(progress, 1 / particle.timeDialation);
        temporalProgress = baseProgress * (1 - reversalStrength * 0.6);
    } else {
        temporalProgress = Math.pow(progress, 1 / particle.timeDialation);
    }

    // Add temporal fluctuations
    const timeWave = Math.sin(progress * Math.PI * 4 + particle.temporalPhase);
    const fluctuation = timeWave * particle.quantumFluctuation * 0.2;
    temporalProgress = Math.max(0, Math.min(1, temporalProgress + fluctuation));

    if (progress >= 1) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        particle.scale = particle.originalScale;
        particle.opacity = 1;
    } else {
        // Calculate position based on temporal progress
        let timeX = particle.initialX + (particle.targetX - particle.initialX) * temporalProgress;
        let timeY = particle.initialY + (particle.targetY - particle.initialY) * temporalProgress;

        // Add chronofield distortion - space-time curvature
        const fieldStrength = particle.chronoField * (1 - Math.abs(progress - 0.5) * 2);
        const distortionAngle = progress * Math.PI * 6 + particle.temporalPhase;
        const distortion = Math.sin(distortionAngle) * fieldStrength * 15;

        timeX += distortion;
        timeY += Math.cos(distortionAngle) * distortion * 0.7;

        // Store position in time echo trail
        if (particle.timeEcho.length >= particle.maxEchos) {
            particle.timeEcho.shift(); // Remove oldest echo
        }
        particle.timeEcho.push({x: particle.x || timeX, y: particle.y || timeY, opacity: 1});

        particle.x = timeX;
        particle.y = timeY;

        // Temporal scaling - particles stretch through time
        const timeStretch = 1 + Math.abs(timeWave) * particle.chronoField * 0.5;
        const dialationScale = 1 + (particle.timeDialation - 1) * 0.3 * (1 - progress);
        particle.scale = particle.originalScale * timeStretch * dialationScale;

        // Opacity flickers due to temporal uncertainty
        const uncertainty = Math.sin(progress * Math.PI * 12) * particle.quantumFluctuation;
        particle.opacity = 0.6 + 0.4 * temporalProgress + uncertainty * 0.2;

        // Time reversal creates ghostly effect during reversal phase
        if (particle.timeReversal && progress > 0.3 && progress < 0.8) {
            const reversalStrength = Math.sin((progress - 0.3) / 0.5 * Math.PI);
            particle.opacity *= (1 - reversalStrength * 0.3); // More transparent during reversal
        }
    }

    // Color represents temporal state
    let hue, saturation, lightness;

    if (particle.timeReversal && progress > 0.3 && progress < 0.8) {
        // Time reversal - purple/violet spectrum during reversal phase
        const reversalStrength = Math.sin((progress - 0.3) / 0.5 * Math.PI);
        hue = 280 + temporalProgress * 40;
        saturation = 70 + particle.chronoField * 30 + reversalStrength * 20;
        lightness = 30 + temporalProgress * 50;
    } else if (particle.timeDialation > 1) {
        // Fast time - blue spectrum (blue shift)
        hue = 240 - temporalProgress * 60; // Blue to cyan
        saturation = 80 + particle.timeDialation * 20;
        lightness = 40 + temporalProgress * 40;
    } else {
        // Slow time - red spectrum (red shift)
        hue = 0 + temporalProgress * 60; // Red to yellow
        saturation = 70 + (1 - particle.timeDialation) * 30;
        lightness = 35 + temporalProgress * 45;
    }

    // Add temporal shimmer
    const shimmer = Math.sin(progress * Math.PI * 8 + particle.temporalPhase) * 15;
    lightness = Math.max(0, Math.min(100, lightness + shimmer * particle.chronoField));

    particle.color = \`hsl(\${hue}, \${saturation}%, \${lightness}%)\`;
}`,H=()=>Object.assign({},{[b]:{code:`${f}${Y}`},DEV_TWO_FRAMES:{code:`${f}${U}`},bezier:{code:`${f}${N}`},pulseColorCycle:{code:`${f}${q}`},timeDistortion:{code:`${f}${W}`}},...L.map(({name:e,comment:a,definition:l})=>({[e]:{code:`${f}return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    // This is obviously inefficient because the same constant will be recalculated for every particle, but this is a playground and its not that expensive.
    ${a}
    ${l}
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
};`}}))),v=(e,a)=>{const{width:n,height:r,data:o}=e,c=Math.ceil(n/a),m=Math.ceil(r/a),i=new Uint8Array(Math.ceil(n/a)*Math.ceil(r/a));let s=0;for(let p=0;p<r;p+=a)for(let h=0;h<n;h+=a){let g=!1;for(let A=0;A<a&&!g;A++)for(let x=0;x<a&&!g;x++){const k=h+x,w=p+A;if(k<n&&w<r){const J=(w*n+k)*4;o[J+3]>10&&(g=!0)}}i[s++]=g?1:0}return{validBlocks:i,blockWidth:c,blockHeight:m}},M=(e,a,l)=>e+l*(a-e),y=e=>{e=e.replace(/^#/,"");const a=parseInt(e,16),l=a>>16&255,n=a>>8&255,r=a&255;return{r:l,g:n,b:r}},$=(e,a,l)=>"#"+((1<<24)+(e<<16)+(a<<8)+l).toString(16).slice(1),I=(e,a)=>{if(!(e!=null&&e.length))return"#ffffff";if(e.length===1)return e[0];const n=Math.max(0,Math.min(1,a))*(e.length-1),r=Math.floor(n);if(r===e.length-1)return e[e.length-1];const o=n-r,c=y(e[r]),m=y(e[r+1]),i=Math.round(M(c.r,m.r,o)),s=Math.round(M(c.g,m.g,o)),p=Math.round(M(c.b,m.b,o));return $(i,s,p)},_=({dimensions:{width:e,height:a}})=>({top:()=>({x:Math.random()*e,y:0}),center:()=>({x:Math.round(e/2),y:Math.round(a/2)}),bottom:()=>({x:Math.random()*e,y:a}),random:()=>({x:Math.random()*e,y:Math.random()*a}),left:()=>({x:0,y:Math.random()*a}),right:()=>({x:e,y:Math.random()*a}),"top-left":()=>({x:Math.random()*(e/5),y:Math.random()*(a/5)}),"top-right":()=>({x:e,y:Math.random()*(a/5)}),"bottom-left":()=>({x:Math.random()*(e/5),y:a-Math.random()*(a/5)}),"bottom-right":()=>({x:e-Math.random()*(e/5),y:a-Math.random()*(a/5)})});let D;const O={particleRadius:5,startPosition:S,selectedMovementFunction:b,movementFunctionCode:H()[b].code,text:B,font:X,particleColors:F,animationDuration:3e3,enableBubbles:!1},t={workerParticles:[],bubbleParticles:[],imageBitmap:null,animationFrameId:0,frameCanvas:null,frameContext:null,mainCanvas:null,mainContext:null,validBlocks:null,blockHeight:0,blockWidth:0,appProps:O,revealProgress:0};let P;const j=async e=>{t.mainCanvas=e,t.mainContext=t.mainCanvas.getContext("bitmaprenderer"),t.frameCanvas=new OffscreenCanvas(t.mainCanvas.width,t.mainCanvas.height),t.frameContext=t.frameCanvas.getContext("2d",{willReadFrequently:!0})},Q=e=>{const{imageBitmap:a,canvas:l,dimensions:n,appProps:r}=e;t.imageBitmap=a,Object.keys(r).length&&(t.appProps={...O,...r}),j(l),t.frameContext.drawImage(t.imageBitmap,0,0);const{validBlocks:o,blockHeight:c,blockWidth:m}=v(t.frameContext.getImageData(0,0,t.mainCanvas.width,t.mainCanvas.height),t.appProps.particleRadius);t.validBlocks=o,t.blockHeight=c,t.blockWidth=m,P=_({dimensions:n}),t.workerParticles=E({validBlocks:t.validBlocks,radius:t.appProps.particleRadius,blockHeight:t.blockHeight,blockWidth:t.blockWidth,startPosition:t.appProps.startPosition})},V=(e,a,l,n,r=5)=>{const o=[];for(let c=0;c<r;c++){const m=Math.random()*Math.PI*2,i=.5+Math.random()*2;o.push({x:e,y:a,dx:Math.cos(m)*i,dy:Math.sin(m)*i-1,radius:2+Math.random()*5,color:l,opacity:.7+Math.random()*.3,createdAt:n,lifetime:C})}return o},E=({validBlocks:e,radius:a,blockHeight:l,blockWidth:n,startPosition:r})=>{const o=[];for(let c=0;c<l;c++)for(let m=0;m<n;m++){const i=c*n+m;if(e[i]){const s=m*a,p=c*a,{x:h,y:g}=P[r]();o.push({targetX:s,targetY:p,x:h,y:g,initialX:h,initialY:g,scale:1,opacity:1,color:R,revealProgress:0,revealThreshold:.97+Math.random()*.02,reachedTarget:!1,emittedBubbles:!1})}}return o},Z=(e,a)=>{if(a>(e.revealThreshold||.99))return 1;if(a>.85&&Math.sqrt(Math.pow(e.x-e.targetX,2)+Math.pow(e.y-e.targetY,2))<=5){const r=(e.revealThreshold||.99)-.02,o=Math.max(0,(a-r)/.02);return Math.min(1,o)}return 0},T=(e,a)=>{let l=!0;t.frameContext.clearRect(0,0,t.frameCanvas.width,t.frameCanvas.height);const n=a-e;t.revealProgress=Math.min(1,n/t.appProps.animationDuration);for(let i=t.bubbleParticles.length-1;i>=0;i--){const s=t.bubbleParticles[i];s.x+=s.dx,s.y+=s.dy,s.dx+=(Math.random()-.5)*.1,s.dy-=.02;const p=a-s.createdAt,h=Math.min(1,p/s.lifetime),g=s.opacity*(1-h);t.frameContext.beginPath(),t.frameContext.arc(Math.floor(s.x),Math.floor(s.y),s.radius,0,Math.PI*2),t.frameContext.fillStyle=I(t.appProps.particleColors,h),t.frameContext.globalAlpha=g,t.frameContext.fill(),p>=s.lifetime&&t.bubbleParticles.splice(i,1)}t.frameContext.globalAlpha=1,t.workerParticles.forEach(i=>{D(i,e,a,{width:t.mainCanvas.width,height:t.mainCanvas.height},t.appProps.animationDuration);const s=Z(i,t.revealProgress);if(s>0&&s<1){const p=Math.floor(t.appProps.particleRadius*(i.scale||1));t.frameContext.globalAlpha=(i.opacity||1)*(1-s),t.frameContext.beginPath(),t.frameContext.arc(Math.floor(i.x)+p/2,Math.floor(i.y)+p/2,p/2,0,2*Math.PI),t.frameContext.fillStyle=t.appProps.particleColors.length?I(t.appProps.particleColors,t.revealProgress):i.color,t.frameContext.fill(),t.frameContext.globalAlpha=s,t.frameContext.drawImage(t.imageBitmap,i.targetX,i.targetY,t.appProps.particleRadius,t.appProps.particleRadius,Math.floor(i.x),Math.floor(i.y),t.appProps.particleRadius,t.appProps.particleRadius)}else if(s>=1)t.frameContext.globalAlpha=1,t.frameContext.drawImage(t.imageBitmap,i.targetX,i.targetY,t.appProps.particleRadius,t.appProps.particleRadius,Math.floor(i.x),Math.floor(i.y),t.appProps.particleRadius,t.appProps.particleRadius);else{const p=Math.floor(t.appProps.particleRadius*(i.scale||1));t.frameContext.globalAlpha=i.opacity||1,t.frameContext.beginPath(),t.frameContext.arc(Math.floor(i.x)+p/2,Math.floor(i.y)+p/2,p/2,0,2*Math.PI),t.frameContext.fillStyle=t.appProps.particleColors.length?I(t.appProps.particleColors,t.revealProgress):i.color,t.frameContext.fill()}if(!i.emittedBubbles&&t.appProps.enableBubbles&&i.x===i.targetX&&i.y===i.targetY){i.emittedBubbles=!0;const p=V(i.x,i.y,i.color,a,2+Math.floor(Math.random()*3));t.bubbleParticles.push(...p)}(i.x!==i.targetX||i.y!==i.targetY||t.revealProgress<.99)&&(l=!1)});const r=t.frameCanvas.transferToImageBitmap();t.mainContext.transferFromImageBitmap(r);const o=l&&t.revealProgress>=1,c=t.appProps.animationDuration+(t.appProps.enableBubbles?C:0);o&&n>=c?t.animationFrameId&&(cancelAnimationFrame(t.animationFrameId),t.bubbleParticles=[],t.frameContext.drawImage(t.imageBitmap,0,0)):t.animationFrameId=requestAnimationFrame(i=>T(e,i))},z=()=>{D=new Function(t.appProps.movementFunctionCode)();const e=performance.now();t.revealProgress=0,t.bubbleParticles=[],t.workerParticles.forEach(a=>{a.emittedBubbles=!1}),T(e,e)};self.onmessage=e=>{const{payload:a,type:l}=e.data;switch(l){case u.INITIALIZE:{Q(a),self.postMessage({type:d.INITIALIZED,data:t.appProps});break}case u.PLAY:{t.animationFrameId&&cancelAnimationFrame(t.animationFrameId),t.bubbleParticles=[],z();break}case u.RESET:{t.animationFrameId&&cancelAnimationFrame(t.animationFrameId),t.workerParticles=t.workerParticles.map(r=>{const o=P[t.appProps.startPosition]();return{x:o.x,y:o.y,initialX:o.x,initialY:o.y,targetX:r.targetX,targetY:r.targetY,scale:1,opacity:1,color:r.color,revealProgress:0,revealThreshold:r.revealThreshold}}),t.frameContext.clearRect(0,0,t.frameCanvas.width,t.frameCanvas.height);const n=t.frameCanvas.transferToImageBitmap();t.mainContext.transferFromImageBitmap(n),t.animationFrameId&&cancelAnimationFrame(t.animationFrameId);break}case u.RESIZE_PARTICLE_RADIUS:{t.appProps.particleRadius=a,t.frameContext.drawImage(t.imageBitmap,0,0);const{validBlocks:n,blockHeight:r,blockWidth:o}=v(t.frameContext.getImageData(0,0,t.mainCanvas.width,t.mainCanvas.height),t.appProps.particleRadius);if(t.validBlocks=n,t.blockHeight=r,t.blockWidth=o,t.workerParticles=E({validBlocks:t.validBlocks,radius:t.appProps.particleRadius,blockHeight:t.blockHeight,blockWidth:t.blockWidth,startPosition:t.appProps.startPosition}),self.postMessage({type:d.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId){cancelAnimationFrame(t.animationFrameId);const c=performance.now();T(c,c)}break}case u.UPDATE_START_POSITION:{if(t.appProps.startPosition=a,t.workerParticles.length){if(t.workerParticles.forEach(n=>{const r=P[t.appProps.startPosition]();n.initialX=r.x,n.initialY=r.y,n.x=r.x,n.y=r.y}),self.postMessage({type:d.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId){cancelAnimationFrame(t.animationFrameId);const n=performance.now();T(n,n)}}else console.error("updateStartPosition failed, particles were not initialized",{workerParticles:t.workerParticles});break}case u.UPDATE_SELECTED_MOVEMENT_FUNCTION:{const{key:n,movementFunctionCode:r}=a??{};n&&(t.appProps.selectedMovementFunction=n),r!=null&&(t.appProps.movementFunctionCode=r),self.postMessage({type:d.UPDATE_APP_PROPS,data:t.appProps});break}case u.UPDATE_TEXT:{t.appProps.text=a,self.postMessage({type:d.UPDATE_APP_PROPS,data:t.appProps});break}case u.UPDATE_FONT:{t.appProps.font=a,self.postMessage({type:d.UPDATE_APP_PROPS,data:t.appProps});break}case u.UPDATE_PARTICLE_COLORS:{if(t.appProps.particleColors=a,a.length>0,self.postMessage({type:d.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId){cancelAnimationFrame(t.animationFrameId);const n=performance.now();T(n,n)}break}case u.UPDATE_BITMAP:{if(t.imageBitmap=a,t.frameCanvas&&t.mainCanvas){t.frameCanvas.width=t.imageBitmap.width,t.frameCanvas.height=t.imageBitmap.height,t.mainCanvas.width=t.imageBitmap.width,t.mainCanvas.height=t.imageBitmap.height,t.frameContext.drawImage(t.imageBitmap,0,0);const{validBlocks:n,blockHeight:r,blockWidth:o}=v(t.frameContext.getImageData(0,0,t.mainCanvas.width,t.mainCanvas.height),t.appProps.particleRadius);t.validBlocks=n,t.blockHeight=r,t.blockWidth=o,P=_({dimensions:{width:t.mainCanvas.width,height:t.mainCanvas.height}}),t.workerParticles=E({validBlocks:t.validBlocks,radius:t.appProps.particleRadius,blockHeight:t.blockHeight,blockWidth:t.blockWidth,startPosition:t.appProps.startPosition})}break}case u.UPDATE_ANIMATION_DURATION:{t.appProps.animationDuration=a,self.postMessage({type:d.UPDATE_APP_PROPS,data:t.appProps}),t.animationFrameId&&(t.bubbleParticles=[]);break}case u.UPDATE_ENABLE_BUBBLES:{t.appProps.enableBubbles=a,self.postMessage({type:d.UPDATE_APP_PROPS,data:t.appProps});break}}}})();
