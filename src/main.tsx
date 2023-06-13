import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

// import "@unocss/reset/tailwind.css";
import 'dayjs/locale/zh-cn'
import './index.css'
// import 'uno.css'
import 'virtual:uno.css'
import 'antd/dist/reset.css'

dayjs.locale('zh-cn')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
