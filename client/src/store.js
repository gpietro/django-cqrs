import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
// import rootReducer from './modules'
import documentReducer from './modules/documents/reducer'
import ReconnectingWebSocket from 'reconnecting-websocket'
import {load} from './modules/documents/actions'
import types from './modules/documents/types'

const socket = new ReconnectingWebSocket('ws://localhost:8000/');
socket.debug = true;
socket.timeoutInterval = 5400;

socket.onclose = () => console.log('closed ws connection')

socket.onmessage = ({data}) => {
  let {type, payload: {documents}} = JSON.parse(data)
  if( type == types.LOAD) {
    store.dispatch(load(documents.reduce((prev, next) => {prev[next.id] = next; return prev}, {}))) 
  }  
}

const actionsToExclude = [types.LOAD]
const command = store => next => action => {
  if( action.type === types.LOAD ) {
    localStorage.setItem('channelId', action.channelId)
  }
  if( !actionsToExclude.includes(action.type) && !action.done && socket.readyState) {
    socket.send(JSON.stringify(action))
  }
  return next(action) 
}

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  command,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  documentReducer,
  initialState,
  composedEnhancers
)

export default store