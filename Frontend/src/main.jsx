import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AnnualBudgetProvider } from './context/AnnualBudgetContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AnnualBudgetProvider>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </AnnualBudgetProvider>
)
