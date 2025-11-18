import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- IMPORTANTE
import App from './App';
import './index.css'; // <-- Tu CSS global

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* "Envolvemos" la App con el BrowserRouter */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);