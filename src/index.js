import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/index';
import { DevTool } from './assets/testdata';
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { modulesInit } from './modules'
import store from './store'

modulesInit(store)

export const storeContext = createContext()
const Root = () => (
  <Provider store={store}>
    <App />
    <DevTool />
  </Provider>
)
ReactDOM.render(<Root />,document.getElementById('root'))

const resizeWindow = () => {
  let width = document.body.offsetWidth
  return () => {
    if (width !== document.body.offsetWidth){
      width = document.body.offsetWidth
      return width
    }
  }
}
const width = resizeWindow()
const getWidth = () => {
  const currentWidth = width()
  if (currentWidth) {
    console.log(currentWidth)
    document.getElementsByTagName('html')[0].style.setProperty('font-size', `${currentWidth*100/360}%`)
  }
}
window.onresize = getWidth
window.onload = getWidth
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
