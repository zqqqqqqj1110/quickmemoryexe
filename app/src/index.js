import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './menutop';
import LogPage from './LogPage';
import { FileProvider } from './FileContext';

// 将 FileProvider 包裹在最外层
const Root = () => (
  <FileProvider>
    <Router>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LogPage />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </React.StrictMode>
    </Router>
  </FileProvider>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
reportWebVitals();
