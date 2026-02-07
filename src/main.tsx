 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <HelmetProvider>
       <App />
      </HelmetProvider>
     
    </BrowserRouter>
  </React.StrictMode>,
)
  