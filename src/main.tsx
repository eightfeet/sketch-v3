import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './compontents/App'
import { Howl } from "howler";

// import loadScript from './core/loadScript';
window.warnPlayer = new Howl({
  src: `./warning.mp3`,
});

export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Main>
    <App />
  </Main>
  // </React.StrictMode>,
)
// const { member_id, token } = qs.parse(window.location.search);

// if (member_id && token) {
//   loading.show()
//   getUserInfo({
//     member_id: member_id as string,
//     token: token as string
//   }).then(() => loading.hide()).catch(() => loading.hide())
// }

// loadScript("https://unpkg.com/vconsole@latest/dist/vconsole.min.js").then(() => {
//   new (window as any).VConsole();
// })