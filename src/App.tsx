import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './App.css';
import {getPredefinedMovementOptions} from './movement';
import Editor from '@monaco-editor/react';
import {EXAMPLE_CODE} from './constants';
import {editor} from 'monaco-editor';

function App() {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<OffscreenCanvas | null>(null);
  const offscreenContextRef = useRef<OffscreenCanvasRenderingContext2D | null>(
    null
  );
  const imageBitmap = useRef<ImageBitmap | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const canvasInitialized = useRef<boolean>(false);
  const particlesReachedTarget = useRef<boolean>(false);
  const [isImageReady, setIsImageReady] = useState(false);
  const [code, setCode] = useState<string>(EXAMPLE_CODE);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [particleRadius, setParticleRadius] = useState<number>(2);
  const [selectedMovementFunction, setSelectedMovementFunction] = useState<
    string | null
  >(null);

  useEffect(() => {
    // Create the Web Worker
    workerRef.current = new Worker(new URL('./worker', import.meta.url), {
      type: 'module',
    });

    workerRef.current.addEventListener('message', ({data}) => {
      if (data.type === 'particlesReachedTarget') {
        particlesReachedTarget.current = true;
      }

      if (data.type === 'initialized') {
        canvasInitialized.current = true;
      }
    });

    return () => {
      // Terminate the worker when the component unmounts
      workerRef.current?.terminate();
      canvasInitialized.current = false;
    };
  }, []);

  const predefinedMovementOptions = useMemo(
    () => getPredefinedMovementOptions(),
    []
  );

  const movementOptionKeys = useMemo(() => {
    return Object.keys(predefinedMovementOptions);
  }, [predefinedMovementOptions]);

  useEffect(() => {
    offscreenCanvasRef.current = new OffscreenCanvas(300, 150);
    offscreenContextRef.current = offscreenCanvasRef.current.getContext('2d', {
      willReadFrequently: true,
    });
  }, []);

  const play = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }

    workerRef.current?.postMessage({
      type: 'play',
      data: {movement: selectedMovementFunction, code, particleRadius},
    });
  }, [selectedMovementFunction, code, particleRadius]);

  const resizeParticleRadius = useCallback((radius: number) => {
    workerRef.current?.postMessage({
      type: 'resizeParticleRadius',
      data: {particleRadius: Number(radius)},
    });
  }, []);

  const reset = useCallback(() => {
    workerRef.current?.postMessage({type: 'reset'});
    particlesReachedTarget.current = false;
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    setSelectedMovementFunction(null);
    if (value) {
      setCode(value);
    } else {
      setCode('');
    }
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    const canvas = canvasRef.current;

    if (!canvas || !imageBitmap.current) {
      console.error('Animation components not fully initialized');
      return;
    }
    if (!canvasInitialized.current) {
      const transferrableCanvas = canvas.transferControlToOffscreen();
      workerRef.current?.postMessage(
        {
          type: 'initialize',
          data: {
            canvas: transferrableCanvas,
            dimensions: {width: canvas.width, height: canvas.height},
            imageBitmap: imageBitmap.current,
            particleRadius,
          },
        },
        [transferrableCanvas, imageBitmap.current!]
      );
      imageBitmap.current.close();
    }
  };

  const handlePredefinedMovementClick = (option: string) => {
    setSelectedMovementFunction(option);
    setCode(predefinedMovementOptions[option]);
  };

  const handleResetCode = () => {
    setSelectedMovementFunction(null);
    setCode(EXAMPLE_CODE);
  };

  return (
    <div style={{display: 'flex', gap: '24px', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h1>Particles playground v0.0</h1>
        {/* We need an image source for creating ImageBitmap, this hidden image is for that. */}
        <img
          style={{display: 'none'}}
          ref={imageRef}
          crossOrigin="anonymous"
          src={
            'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg'
          }
          className="logo"
          alt="Vite logo"
          height="100px"
          width="100px"
          onLoad={() => {
            setTimeout(() => {
              offscreenContextRef.current!.drawImage(
                imageRef.current!,
                0,
                0,
                imageRef.current!.width,
                imageRef.current!.height
              );

              createImageBitmap(
                offscreenContextRef.current!.getImageData(
                  0,
                  0,
                  imageRef.current!.width,
                  imageRef.current!.height
                )
              ).then((bitmap) => {
                imageBitmap.current = bitmap;
                setIsImageReady(true);
              });
            }, 100);
          }}
        />
        <canvas
          ref={canvasRef}
          width={300}
          height={150}
          style={{width: '300px', height: '150px'}}
        />
        <div>
          <button disabled={!isImageReady} onClick={play}>
            Play animation
          </button>
          <button onClick={reset}>Reset particles</button>
        </div>
        <div>
          Particle radius:
          <input
            value={particleRadius}
            type="number"
            onChange={(e) => {
              const numberValue = Number(e.target.value);
              if (!Number.isNaN(numberValue) && numberValue > 0) {
                setParticleRadius(e.target.value as unknown as number);
                resizeParticleRadius(e.target.value as unknown as number);
              }
            }}
          />
        </div>
        <div>
          <div>
            Predefined movement functions:
            {movementOptionKeys.map((option) => (
              <button
                className={
                  selectedMovementFunction === option ? 'selected' : undefined
                }
                key={option}
                onClick={() => handlePredefinedMovementClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Editor
          onMount={handleEditorDidMount}
          height="40vh"
          width={'80vw'}
          defaultLanguage="javascript"
          value={code}
          onChange={handleEditorChange}
        />
        <button disabled={code === EXAMPLE_CODE} onClick={handleResetCode}>
          Reset code to example
        </button>
      </div>
    </div>
  );
}

export default App;
