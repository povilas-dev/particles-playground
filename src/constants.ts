import {StartPositionType} from './interfaces';

export const DEFAULT_PARTICLE_RADIUS = 2;
export const DEFAULT_START_POSITION: StartPositionType = 'random';
export const DEFAULT_MOVEMENT_FUNCTION_KEY = 'DEV_EXAMPLE';
export const DEFAULT_DARK_THEME_COLOR = '#FFFFFF';
export const DEFAULT_LIGHT_THEME_COLOR = '#213547';
export const DEFAULT_PARTICLES_TEXT = 'WIX 🤠';

export const COPY_AI_PROMPT_TEXT = 'Copy AI prompt';
export const AI_PROMPT_TOOLTIP_TEXT =
  'Copy an AI friendly prompt to your clipboard and run it on a LLM to receive an AI generated movement function.';
export const COPIED_TEXT = 'Copied!';
export const COPY_ERROR_TEXT = 'Copy error, try again';

export const COPY_SHAREABLE_LINK_TEXT = 'Copy shareable link';
export const GENERATING_LINK_TEXT = 'Generating link...';

export const SNIPPET_QUERY_PARAM = 'snippet';

export const DEV_EXAMPLE_CODE = `// This function will be called twice for each particle, because all particles reach the target in two frames.
return (particle, animationStartTime, currentTime, canvasDimensions) => {
    if (particle.x === 0 && particle.y === 0) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    } else {
        particle.x = 0
        particle.y = 0
    }
}`;

export const EXAMPLE_CODE = `/**
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
 * @param {Object} canvasDimensions - The dimensions of the canvas.
 * @param {number} canvasDimensions.width - Width of the canvas where particles are being rendered.
 * @param {number} canvasDimensions.height - Height of the canvas where particles are being rendered.
 * @returns {Function} A function to be called on each animation frame to update the particle's position.
 */
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
}`;

export const EXAMPLE_AI_PROMPT = `Write another function using the contract like this one with interesting animation:
${EXAMPLE_CODE}`;
