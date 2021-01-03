import React, { Suspense, StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './assets/style.css'

const Loading = () => <>Loading...</>

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('app')
)

reportWebVitals(console.log)
