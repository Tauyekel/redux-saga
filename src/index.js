import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import axios from 'axios'

import App from './components/App'
import reducers from './reducers'
import rootSagas from './sagas'

import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://rem-rest-api.herokuapp.com/api'


const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSagas)

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
)
