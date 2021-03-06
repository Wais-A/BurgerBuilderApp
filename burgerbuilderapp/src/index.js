import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import burgerBuilder from './Store/reducers/BurgerBuilder'
import thunk from 'redux-thunk';
import orderReducer from './Store/reducers/order'
import authReducer from './Store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilder,
	order: orderReducer,
	auth: authReducer
});

const store = createStore( rootReducer, composeEnhancers(
	applyMiddleware(thunk)
));
const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
