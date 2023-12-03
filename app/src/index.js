import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // 引入 Navigate
import reportWebVitals from './reportWebVitals';
import App from './menutop';
import LogPage from './LogPage';

const Root = () => (
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* 默认重定向到 /login */}
        <Route path="/login" element={<LogPage />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </React.StrictMode>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
reportWebVitals();
