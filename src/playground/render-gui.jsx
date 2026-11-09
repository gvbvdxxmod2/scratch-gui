import React from 'react';
import GUI from '../containers/gui.jsx';


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

const searchParams = new URLSearchParams(location.search);
const cloudHost = searchParams.get('cloud_host') || 'wss://clouddata.turbowarp.org';

const RenderGUI = props => (
    <GUI
        cloudHost={cloudHost}
        canUseCloud
        hasCloudPermission
        canSave={false}
        basePath={process.env.ROOT}
        canEditTitle
        enableCommunity
        {...props}
    />
);

export default RenderGUI;
