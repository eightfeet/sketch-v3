import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './compontents/App'
import qs from 'query-string';
import { getUserInfo } from './store';
import loading from './compontents/Loading';
// import loadScript from './core/loadScript';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
const { member_id, token } = qs.parse(window.location.search);

if (member_id && token) {
  loading.show()
  getUserInfo({
    member_id: member_id as string,
    token: token as string
  }).then(() => loading.hide()).catch(() => loading.hide())
}

// loadScript("https://unpkg.com/vconsole@latest/dist/vconsole.min.js").then(() => {
//   new (window as any).VConsole();
// })