import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './assets/icons/remixicon.css'
import './assets/less/yoda-theme.less'

import App from './App'

ReactDOM.render(
    <Suspense fallback="loading">
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Suspense>,
    document.getElementById('root')
)
