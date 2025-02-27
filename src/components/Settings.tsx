import {useCallback, useContext} from 'react';
import {StartPosition} from './StartPosition';
import {Action} from '../interfaces';
import {AppContext} from '../contexts/AppContext';
import {WorkerContext} from '../contexts/WorkerContext';
import {FunctionSelectorModal} from './FunctionSelectorModal/FunctionSelectorModal';
import {editor} from 'monaco-editor';

export const Settings = ({
  editorRef,
}: {
  editorRef: React.RefObject<editor.IStandaloneCodeEditor | null>;
}) => {
  const worker = useContext(WorkerContext);
  const appProps = useContext(AppContext);

  const handleResizeParticleRadius = useCallback(
    (radius: number) => {
      if (worker)
        worker.postMessage({
          type: Action.RESIZE_PARTICLE_RADIUS,
          data: {particleRadius: radius},
        });
    },
    [worker]
  );

  const handleTextChange = useCallback(
    (value: string) => {
      if (worker)
        worker.postMessage({
          type: Action.UPDATE_TEXT,
          data: {text: value ?? ''},
        });
    },
    [worker]
  );

  if (!appProps) {
    return;
  }

  return (
    <div className="card">
      <span className="cardTitle">Settings</span>
      <div
        style={{
          display: 'flex',
          alignItems: 'start',
          gap: '4px',
          flexDirection: 'column',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
          Particle radius:
          <input
            className="userInput"
            style={{maxWidth: '60px'}}
            value={appProps.particleRadius}
            type="number"
            onChange={(e) => {
              const numberValue = Number(e.target.value);
              if (!Number.isNaN(numberValue) && numberValue > 0) {
                handleResizeParticleRadius(numberValue);
              }
            }}
          />
        </div>
        <StartPosition />
        <div className="card">
          <span className="innerTitle">Predefined movement functions</span>
          <FunctionSelectorModal
            onSelect={() => {
              if (editorRef.current) {
                editorRef.current
                  .getAction('editor.action.formatDocument')
                  ?.run();
              }
            }}
          />
        </div>
        <div className="card">
          <span className="innerTitle">Text</span>
          <input
            className="userInput"
            value={appProps.text}
            onChange={(e) => {
              handleTextChange(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
