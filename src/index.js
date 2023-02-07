import ReactDOM from 'react-dom'
import React, { Suspense, useRef } from 'react'
import './styles.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <>
  <BrowserRouter>
  <App/>
  </BrowserRouter>
  </>,
  document.getElementById('root')
)
