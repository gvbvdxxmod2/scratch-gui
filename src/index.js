import GUI from './containers/gui.jsx';
import AppStateHOC from './lib/app-state-hoc.jsx';
import GuiReducer, {guiInitialState, guiMiddleware, initEmbedded, initFullScreen, initPlayer} from './reducers/gui';
import LocalesReducer, {localesInitialState, initLocale} from './reducers/locales';
import {ScratchPaintReducer} from 'scratch-paint';
import {setFullScreen, setPlayer} from './reducers/mode';
import {remixProject} from './reducers/project-state';
import {setAppElement} from 'react-modal';

//Debug handling
window.addEventListener('error', (event) => {
  // Check if it's a resource loading error (like a failed <img> or <script>)
  if (event.target && (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT')) {
    console.error('Resource failed to load:', event.target);
    return;
  }

  // Extract the full stack trace if available
  const errorObj = event.error;
  const stackTrace = errorObj && errorObj.stack ? errorObj.stack : null;

  const errorData = {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: stackTrace
  };

  // Log the complete error object with stack trace to console
  console.error('Captured JS Error:', errorData);

  // Example alert incorporating the stack trace (or first few lines)
  window.alert(`Uncaught JS Error: ${event.message}\n\nStack Trace:\n${stackTrace || 'No stack available'}`);
}, true);

const guiReducers = {
    locales: LocalesReducer,
    scratchGui: GuiReducer,
    scratchPaint: ScratchPaintReducer
};

export {
    GUI as default,
    AppStateHOC,
    setAppElement,
    guiReducers,
    guiInitialState,
    guiMiddleware,
    initEmbedded,
    initPlayer,
    initFullScreen,
    initLocale,
    localesInitialState,
    remixProject,
    setFullScreen,
    setPlayer
};
