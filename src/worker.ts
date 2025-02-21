import {Particle, StartPositionType, Action} from './interfaces';
import {getStartCoordinatesConfig, getValidImageBlocks} from './utils';

let workerParticles: Particle[] = [];
let imageBitmap: ImageBitmap;

let animationFrameId: number;

let frameCanvas: OffscreenCanvas;
let frameContext: OffscreenCanvasRenderingContext2D;

let mainCanvas: OffscreenCanvas;
let mainContext: ImageBitmapRenderingContext;

let particleRadius: number;

let validBlocks: Uint8Array<ArrayBuffer>;
let blockHeight: number;
let blockWidth: number;

let startPosition: StartPositionType;

let customMovementFunction: (
  particle: Particle,
  animationStartTime: number,
  requestAnimationFrameTime: number
) => void;

// TODO:
// const workerState: {
//   workerParticles: Particle[];
//   imageBitmap: ImageBitmap | null;
//   animationFrameId: number;
//   frameCanvas: OffscreenCanvas | null;
//   frameContext: OffscreenCanvasRenderingContext2D | null;
//   mainCanvas: OffscreenCanvas | null;
//   mainContext: ImageBitmapRenderingContext | null;
//   particleRadius: number;
//   validBlocks: Uint8Array<ArrayBuffer> | null;
//   blockHeight: number;
//   blockWidth: number;
//   startPosition: StartPositionType;
//   movementFunctionCode: string;
//   selectedMovementFunction: string;
// } = {
//   workerParticles: [],
//   imageBitmap: null,
//   animationFrameId: 0,
//   frameCanvas: null,
//   frameContext: null,
//   mainCanvas: null,
//   mainContext: null,
//   particleRadius: DEFAULT_PARTICLE_RADIUS,
//   validBlocks: null,
//   blockHeight: 0,
//   blockWidth: 0,
//   startPosition: DEFAULT_START_POSITION,
//   selectedMovementFunction: DEFAULT_MOVEMENT_FUNCTION_KEY,
//   movementFunctionCode:
//     getPredefinedMovementOptions()[DEFAULT_MOVEMENT_FUNCTION_KEY],
// };

let startCoordinatesConfig: ReturnType<typeof getStartCoordinatesConfig>;

const initializeCanvas = async (canvas: OffscreenCanvas) => {
  mainCanvas = canvas;
  mainContext = mainCanvas.getContext(
    'bitmaprenderer'
  ) as ImageBitmapRenderingContext;

  frameCanvas = new OffscreenCanvas(mainCanvas.width, mainCanvas.height);
  frameContext = frameCanvas.getContext('2d', {
    willReadFrequently: true,
  })! as OffscreenCanvasRenderingContext2D;
};

const initialize = async (data: any) => {
  const {
    imageBitmap: _imageBitmap,
    canvas,
    dimensions,
    particleRadius: _particleRadius,
  } = data;
  imageBitmap = _imageBitmap;
  particleRadius = _particleRadius;
  startPosition = data.startPosition;
  initializeCanvas(canvas);
  frameContext.drawImage(imageBitmap, 0, 0);
  const {
    validBlocks: _validBlocks,
    blockHeight: _blockHeight,
    blockWidth: _blockWidth,
  } = getValidImageBlocks(
    frameContext.getImageData(0, 0, mainCanvas.width, mainCanvas.height),
    particleRadius
  );

  validBlocks = _validBlocks;
  blockHeight = _blockHeight;
  blockWidth = _blockWidth;
  startCoordinatesConfig = getStartCoordinatesConfig({dimensions});

  workerParticles = generateParticles({
    validBlocks,
    radius: particleRadius,
    blockHeight,
    blockWidth,
    startPosition,
  });
};

const renderParticles = (
  animationStartTime: number,
  requestAnimationFrameTime: number
) => {
  let particlesReachedTarget = true;
  frameContext.clearRect(0, 0, frameCanvas.width, frameCanvas.height);

  workerParticles.forEach((particle) => {
    // Update particles position by calling your movement function here:
    customMovementFunction(
      particle,
      animationStartTime,
      requestAnimationFrameTime
    );

    // Draw particle on frame context
    frameContext.drawImage(
      imageBitmap,
      particle.targetX,
      particle.targetY,
      particleRadius,
      particleRadius,
      Math.floor(particle.x),
      Math.floor(particle.y),
      particleRadius,
      particleRadius
    );

    if (particle.x !== particle.targetX || particle.y !== particle.targetY) {
      particlesReachedTarget = false;
    }
  });

  const frameBitmap = frameCanvas.transferToImageBitmap();
  mainContext.transferFromImageBitmap(frameBitmap);

  if (particlesReachedTarget) {
    self.postMessage({type: 'particlesReachedTarget'});

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  } else {
    animationFrameId = requestAnimationFrame((requestAnimationFrameTime) =>
      renderParticles(animationStartTime, requestAnimationFrameTime)
    );
  }
};

self.onmessage = (event) => {
  // TODO: move to reducer.ts, create a state
  // TODO: do type magic
  const reducerConfig: Record<Action, (data: any, ...rest: any[]) => void> = {
    [Action.INITIALIZE]: (data: any) => {
      initialize(data);
      self.postMessage({type: 'initialized'});
    },
    [Action.PLAY]: (data: any) => {
      customMovementFunction = new Function(data.code)();
      const startTime = performance.now();
      renderParticles(startTime, startTime);
    },
    [Action.RESET]: () => {
      workerParticles.forEach((particle) => {
        const initialCoordinates =
          startCoordinatesConfig[startPosition as StartPositionType]();
        particle.initialX = initialCoordinates.x;
        particle.initialY = initialCoordinates.y;
        particle.x = initialCoordinates.x;
        particle.y = initialCoordinates.y;
      });

      frameContext.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
      const frameBitmap = frameCanvas.transferToImageBitmap();
      mainContext.transferFromImageBitmap(frameBitmap);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    },
    [Action.RESIZE_PARTICLE_RADIUS]: (data: any) => {
      particleRadius = data.particleRadius;
      frameContext.drawImage(imageBitmap, 0, 0);
      const {
        validBlocks: _validBlocks,
        blockHeight: _blockHeight,
        blockWidth: _blockWidth,
      } = getValidImageBlocks(
        frameContext.getImageData(0, 0, mainCanvas.width, mainCanvas.height),
        particleRadius
      );

      validBlocks = _validBlocks;
      blockHeight = _blockHeight;
      blockWidth = _blockWidth;

      workerParticles = generateParticles({
        validBlocks,
        radius: particleRadius,
        blockHeight,
        blockWidth,
        startPosition,
      });
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        const startTime = performance.now();
        renderParticles(startTime, startTime);
      }
    },
    [Action.UPDATE_START_POSITION]: (data: any) => {
      // TODO: fix start position for easing ??
      startPosition = data.startPosition;

      if (workerParticles.length) {
        workerParticles.forEach((particle) => {
          const initialCoordinates =
            startCoordinatesConfig[data.startPosition as StartPositionType]();
          particle.initialX = initialCoordinates.x;
          particle.initialY = initialCoordinates.y;
          particle.x = initialCoordinates.x;
          particle.y = initialCoordinates.y;
        });

        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          const startTime = performance.now();
          renderParticles(startTime, startTime);
        }
      } else {
        console.error(
          'updateStartPosition failed, particles were not initialized',
          {
            workerParticles,
          }
        );
      }
    },
  };

  const {data, type} = event.data;
  reducerConfig[type as Action](data);
};

const generateParticles = ({
  validBlocks,
  radius,
  blockHeight,
  blockWidth,
  startPosition,
}: {
  validBlocks: Uint8Array<ArrayBuffer>;
  radius: number;
  blockHeight: number;
  blockWidth: number;
  startPosition: StartPositionType;
}) => {
  const particles: Array<Particle> = [];

  for (let blockY = 0; blockY < blockHeight; blockY++) {
    for (let blockX = 0; blockX < blockWidth; blockX++) {
      const index = blockY * blockWidth + blockX;
      if (validBlocks[index]) {
        const x = blockX * radius;
        const y = blockY * radius;

        const {x: initialX, y: initialY} =
          startCoordinatesConfig[startPosition as StartPositionType]();
        particles.push({
          targetX: x,
          targetY: y,
          x: initialX,
          y: initialY,
          initialX,
          initialY,
        });
      }
    }
  }

  console.log('Particles amount: ', particles.length);
  return particles;
};
