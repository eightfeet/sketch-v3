import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './compontents/App'
import qs from 'query-string';
import { getUserInfo } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
const { member_id, token } = qs.parse(window.location.search);

if (member_id && token) {
  getUserInfo({
    member_id: member_id as string,
    token: token as string
  })
}