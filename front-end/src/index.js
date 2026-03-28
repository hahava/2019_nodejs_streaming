import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element (#root) not found');
}

ReactDOM.render(<App />, rootElement);
