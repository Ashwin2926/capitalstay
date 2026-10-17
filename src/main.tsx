import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
)

const container = document.getElementById('root')!

// Production pages arrive prerendered (scripts/prerender.mjs); the dev server serves an empty root
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
