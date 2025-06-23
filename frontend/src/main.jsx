import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import './index.css'
import App from './App'
import { ThemeProvider } from './ThemeContext'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ThemeProvider>
    <RouterProvider router={App} />
  </ThemeProvider>
  // </StrictMode>,
)
