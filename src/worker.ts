import {
  DEFAULT_MOVEMENT_FUNCTION_KEY,
  DEFAULT_PARTICLE_RADIUS,
  DEFAULT_PARTICLES_TEXT,
  DEFAULT_START_POSITION,
} from './constants';
import {
  Particle,
  StartPositionType,
  Action,
  WorkerAction,
  AppProps,
  Dimensions,
} from './interfaces';
import {getPredefinedMovementOptions} from './movement';
import {getStartCoordinatesConfig, getValidImageBlocks} from './utils';

let customMovementFunction: (
  particle: Particle,
  animationStartTime: number,
  requestAnimationFrameTime: number,
  canvasDimensions: Dimensions
) => void;

const workerState: {
  // Internal worker state
  workerParticles: Particle[];
  imageBitmap: ImageBitmap | null;
  animationFrameId: number;
  frameCanvas: OffscreenCanvas | null;
  frameContext: OffscreenCanvasRenderingContext2D | null;
  mainCanvas: OffscreenCanvas | null;
  mainContext: ImageBitmapRenderingContext | null;
  validBlocks: Uint8Array<ArrayBuffer> | null;
  blockHeight: number;
  blockWidth: number;
  // Main thread facing props
  appProps: AppProps;
} = {
  workerParticles: [],
  imageBitmap: null,
  animationFrameId: 0,
  frameCanvas: null,
  frameContext: null,
  mainCanvas: null,
  mainContext: null,
  validBlocks: null,
  blockHeight: 0,
  blockWidth: 0,
  appProps: {
    particleRadius: DEFAULT_PARTICLE_RADIUS,
    startPosition: DEFAULT_START_POSITION,
    selectedMovementFunction: DEFAULT_MOVEMENT_FUNCTION_KEY,
    movementFunctionCode:
      getPredefinedMovementOptions()[DEFAULT_MOVEMENT_FUNCTION_KEY].code,
    text: DEFAULT_PARTICLES_TEXT,
  },
};

let startCoordinatesConfig: ReturnType<typeof getStartCoordinatesConfig>;

const initializeCanvas = async (canvas: OffscreenCanvas) => {
  workerState.mainCanvas = canvas;
  workerState.mainContext = workerState.mainCanvas.getContext(
    'bitmaprenderer'
  ) as ImageBitmapRenderingContext;

  workerState.frameCanvas = new OffscreenCanvas(
    workerState.mainCanvas.width,
    workerState.mainCanvas.height
  );
  workerState.frameContext = workerState.frameCanvas.getContext('2d', {
    willReadFrequently: true,
  })! as OffscreenCanvasRenderingContext2D;
};

const initialize = async (data: any) => {
  const {
    imageBitmap: _imageBitmap,
    canvas,
    dimensions,
    particleRadius,
    movementFunctionCode,
    selectedMovementFunction,
    startPosition,
    text,
  } = data;
  workerState.imageBitmap = _imageBitmap;

  if (
    movementFunctionCode &&
    selectedMovementFunction &&
    particleRadius &&
    startPosition &&
    text
  ) {
    workerState.appProps.movementFunctionCode = movementFunctionCode;
    workerState.appProps.selectedMovementFunction = selectedMovementFunction;
    workerState.appProps.particleRadius = particleRadius;
    workerState.appProps.startPosition = startPosition;
    workerState.appProps.text = text;
  }

  initializeCanvas(canvas);
  workerState.frameContext!.drawImage(workerState.imageBitmap!, 0, 0);
  const {
    validBlocks: _validBlocks,
    blockHeight: _blockHeight,
    blockWidth: _blockWidth,
  } = getValidImageBlocks(
    workerState.frameContext!.getImageData(
      0,
      0,
      workerState.mainCanvas!.width,
      workerState.mainCanvas!.height
    ),
    workerState.appProps.particleRadius
  );

  workerState.validBlocks = _validBlocks;
  workerState.blockHeight = _blockHeight;
  workerState.blockWidth = _blockWidth;
  startCoordinatesConfig = getStartCoordinatesConfig({dimensions});

  workerState.workerParticles = generateParticles({
    validBlocks: workerState.validBlocks,
    radius: workerState.appProps.particleRadius,
    blockHeight: workerState.blockHeight,
    blockWidth: workerState.blockWidth,
    startPosition: workerState.appProps.startPosition,
  });
};

const renderParticles = (
  animationStartTime: number,
  requestAnimationFrameTime: number
) => {
  let particlesReachedTarget = true;
  workerState.frameContext!.clearRect(
    0,
    0,
    workerState.frameCanvas!.width,
    workerState.frameCanvas!.height
  );

  workerState.workerParticles.forEach((particle) => {
    // Update particles position by calling your movement function here:
    customMovementFunction(
      particle,
      animationStartTime,
      requestAnimationFrameTime,
      {
        width: workerState.mainCanvas!.width,
        height: workerState.mainCanvas!.height,
      }
    );

    // Draw particle on frame context
    workerState.frameContext!.drawImage(
      workerState.imageBitmap!,
      particle.targetX,
      particle.targetY,
      workerState.appProps.particleRadius,
      workerState.appProps.particleRadius,
      Math.floor(particle.x),
      Math.floor(particle.y),
      workerState.appProps.particleRadius,
      workerState.appProps.particleRadius
    );

    if (particle.x !== particle.targetX || particle.y !== particle.targetY) {
      particlesReachedTarget = false;
    }
  });

  const frameBitmap = workerState.frameCanvas!.transferToImageBitmap();
  workerState.mainContext!.transferFromImageBitmap(frameBitmap);

  if (particlesReachedTarget) {
    if (workerState.animationFrameId) {
      cancelAnimationFrame(workerState.animationFrameId);
    }
  } else {
    workerState.animationFrameId = requestAnimationFrame(
      (requestAnimationFrameTime) =>
        renderParticles(animationStartTime, requestAnimationFrameTime)
    );
  }
};

const play = () => {
  customMovementFunction = new Function(
    workerState.appProps.movementFunctionCode
  )();
  const startTime = performance.now();
  renderParticles(startTime, startTime);
};

self.onmessage = (event) => {
  // TODO: move to reducer.ts, create a state
  // TODO: do type magic
  const reducerConfig: Record<Action, (data: any, ...rest: any[]) => void> = {
    [Action.INITIALIZE]: (data: any) => {
      initialize(data);
      self.postMessage({
        type: WorkerAction.INITIALIZED,
        data: workerState.appProps,
      });
    },
    [Action.PLAY]: () => {
      play();
    },
    [Action.RESET]: () => {
      workerState.workerParticles = workerState.workerParticles.map(
        (particle) => {
          const initialCoordinates =
            startCoordinatesConfig[
              workerState.appProps.startPosition as StartPositionType
            ]();
          return {
            x: initialCoordinates.x,
            y: initialCoordinates.y,
            initialX: initialCoordinates.x,
            initialY: initialCoordinates.y,
            targetX: particle.targetX,
            targetY: particle.targetY,
          };
        }
      );

      workerState.frameContext!.clearRect(
        0,
        0,
        workerState.frameCanvas!.width,
        workerState.frameCanvas!.height
      );
      const frameBitmap = workerState.frameCanvas!.transferToImageBitmap();
      workerState.mainContext!.transferFromImageBitmap(frameBitmap);

      if (workerState.animationFrameId) {
        cancelAnimationFrame(workerState.animationFrameId);
      }
    },
    [Action.RESIZE_PARTICLE_RADIUS]: (data: any) => {
      workerState.appProps.particleRadius = data.particleRadius;
      workerState.frameContext!.drawImage(workerState.imageBitmap!, 0, 0);
      const {
        validBlocks: _validBlocks,
        blockHeight: _blockHeight,
        blockWidth: _blockWidth,
      } = getValidImageBlocks(
        workerState.frameContext!.getImageData(
          0,
          0,
          workerState.mainCanvas!.width,
          workerState.mainCanvas!.height
        ),
        workerState.appProps.particleRadius
      );

      workerState.validBlocks = _validBlocks;
      workerState.blockHeight = _blockHeight;
      workerState.blockWidth = _blockWidth;

      workerState.workerParticles = generateParticles({
        validBlocks: workerState.validBlocks,
        radius: workerState.appProps.particleRadius,
        blockHeight: workerState.blockHeight,
        blockWidth: workerState.blockWidth,
        startPosition: workerState.appProps.startPosition,
      });

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });

      if (workerState.animationFrameId) {
        cancelAnimationFrame(workerState.animationFrameId);
        const startTime = performance.now();
        renderParticles(startTime, startTime);
      }
    },
    [Action.UPDATE_START_POSITION]: (data: any) => {
      // TODO: fix start position for easing ??
      workerState.appProps.startPosition = data.startPosition;

      if (workerState.workerParticles.length) {
        workerState.workerParticles.forEach((particle) => {
          const initialCoordinates =
            startCoordinatesConfig[workerState.appProps.startPosition]();
          particle.initialX = initialCoordinates.x;
          particle.initialY = initialCoordinates.y;
          particle.x = initialCoordinates.x;
          particle.y = initialCoordinates.y;
        });

        self.postMessage({
          type: WorkerAction.UPDATE_APP_PROPS,
          data: workerState.appProps,
        });

        if (workerState.animationFrameId) {
          cancelAnimationFrame(workerState.animationFrameId);
          const startTime = performance.now();
          renderParticles(startTime, startTime);
        }
      } else {
        console.error(
          'updateStartPosition failed, particles were not initialized',
          {
            workerParticles: workerState.workerParticles,
          }
        );
      }
    },
    [Action.UPDATE_SELECTED_MOVEMENT_FUNCTION]: (data: any) => {
      const {key, movementFunctionCode} = data ?? {};
      if (key) {
        workerState.appProps.selectedMovementFunction = key;
      }
      if (movementFunctionCode !== undefined || movementFunctionCode !== null) {
        workerState.appProps.movementFunctionCode = movementFunctionCode;
      }

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });
    },
    [Action.UPDATE_TEXT]: (data: any) => {
      workerState.appProps.text = data.text;

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });
    },
    [Action.UPDATE_BITMAP]: (data: any) => {
      workerState.imageBitmap = data;
      if (workerState.frameCanvas && workerState.mainCanvas) {
        workerState.frameCanvas.width = workerState.imageBitmap!.width;
        workerState.frameCanvas.height = workerState.imageBitmap!.height;
        workerState.mainCanvas.width = workerState.imageBitmap!.width;
        workerState.mainCanvas.height = workerState.imageBitmap!.height;

        // TODO: duplication here, remove it later
        workerState.frameContext!.drawImage(workerState.imageBitmap!, 0, 0);
        const {
          validBlocks: _validBlocks,
          blockHeight: _blockHeight,
          blockWidth: _blockWidth,
        } = getValidImageBlocks(
          workerState.frameContext!.getImageData(
            0,
            0,
            workerState.mainCanvas!.width,
            workerState.mainCanvas!.height
          ),
          workerState.appProps.particleRadius
        );

        workerState.validBlocks = _validBlocks;
        workerState.blockHeight = _blockHeight;
        workerState.blockWidth = _blockWidth;
        startCoordinatesConfig = getStartCoordinatesConfig({
          dimensions: {
            width: workerState.mainCanvas.width,
            height: workerState.mainCanvas.height,
          },
        });

        workerState.workerParticles = generateParticles({
          validBlocks: workerState.validBlocks,
          radius: workerState.appProps.particleRadius,
          blockHeight: workerState.blockHeight,
          blockWidth: workerState.blockWidth,
          startPosition: workerState.appProps.startPosition,
        });
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
