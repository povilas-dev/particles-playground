import {Coordinates, Dimensions, StartPositionType} from './interfaces';

export const getValidImageBlocks = (
  imageData: ImageData,
  particleSize: number
) => {
  const OPACITY_THRESHOLD = 10;
  const {width, height, data} = imageData;
  const blockWidth = Math.ceil(width / particleSize);
  const blockHeight = Math.ceil(height / particleSize);
  const validBlocks = new Uint8Array(
    Math.ceil(width / particleSize) * Math.ceil(height / particleSize)
  );

  let index = 0;

  for (let y = 0; y < height; y += particleSize) {
    for (let x = 0; x < width; x += particleSize) {
      let isValid = false;
      for (let dy = 0; dy < particleSize && !isValid; dy++) {
        for (let dx = 0; dx < particleSize && !isValid; dx++) {
          const srcX = x + dx;
          const srcY = y + dy;
          if (srcX < width && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            if (data[srcIndex + 3] > OPACITY_THRESHOLD) {
              isValid = true;
            }
          }
        }
      }
      validBlocks[index++] = isValid ? 1 : 0;
    }
  }
  return {validBlocks, blockWidth, blockHeight};
};

export const lerp = (start: number, end: number, t: number) =>
  start + t * (end - start);

export const calculateDistance = (point1: Coordinates, point2: Coordinates) => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const getRandomInt = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
};

export const getStartCoordinatesConfig = ({
  dimensions: {width, height},
}: {
  dimensions: Dimensions;
}): Record<StartPositionType, () => Coordinates> => {
  const config: Record<StartPositionType, () => Coordinates> = {
    top: () => ({
      x: Math.random() * width,
      y: 0,
    }),
    center: () => ({
      x: Math.round(width / 2),
      y: Math.round(height / 2),
    }),
    bottom: () => ({
      x: Math.random() * width,
      y: height,
    }),
    random: () => ({
      x: Math.random() * width,
      y: Math.random() * height,
    }),
    left: () => ({
      x: 0,
      y: Math.random() * height,
    }),
    right: () => ({
      x: width,
      y: Math.random() * height,
    }),
    'top-left': () => ({
      x: Math.random() * (width / 5),
      y: Math.random() * (height / 5),
    }),
    'top-right': () => ({x: width, y: Math.random() * (height / 5)}),
    'bottom-left': () => ({
      x: Math.random() * (width / 5),
      y: height - Math.random() * (height / 5),
    }),
    'bottom-right': () => ({
      x: width - Math.random() * (width / 5),
      y: height - Math.random() * (height / 5),
    }),
  };
  return config;
};
