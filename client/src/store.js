import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
// import ReconnectingWebSocket from 'reconnecting-websocket'

const custom = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  custom,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

// const socket = new ReconnectingWebSocket(`ws://${window.location.host}/`, null, {
//     debug: true,
//     reconnectInterval: 3000
// });

//socket.onclose = () => alert('closed ws connection')

// socket.onmessage = ({data}) => {
//     console.log(JSON.parse(data))
//     // based on data type, load store
// }

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store