import { applyMiddleware, compose, createStore } from 'redux'
// import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';
import gameMiddleware from '../middlewares/game';
import {game} from './game/reducer';
import { gameState } from './game/types';

export interface Store {
  game: gameState;
}

// export type RootState = ReturnType<typeof store.getState>

const preloadedState = {};

const middlewares: any = [gameMiddleware]

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancers = composeEnhancers(
applyMiddleware(
  ...middlewares),
);

const rootReducer = combineReducers({
game,
});

const store = createStore(rootReducer, preloadedState, enhancers)

export type RootState = ReturnType<typeof store.getState>

export default store;


// export default function configureStore(preloadedState?: any) {



//   const middlewares: any = [gameMiddleware]

//   const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const enhancers = composeEnhancers(
//   applyMiddleware(
//     ...middlewares),
// );

// const rootReducer = combineReducers({
//   gameReducer,
// });

//   const store = createStore(rootReducer, preloadedState, enhancers)

//   return store
// }