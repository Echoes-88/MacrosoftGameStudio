import axios from 'axios';
import { Middleware } from 'redux';
import { GameActionTypes } from '../store/game/types';
import { loading } from '../store/app/actions';
import { updateCountriesData } from '../store/game/actions';
import { RootState } from '../store';

const gameMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  switch (action.type) {
    case GameActionTypes.GET_COUNTRIES_DATA : {

      store.dispatch(loading(true));

      axios.get(action.url, action.options)
        .then((response) => {
          store.dispatch(updateCountriesData(response.data.data, action.dataType));
          store.dispatch(loading(false));
        })
        .catch((error) => console.log(error))
        .finally();
      break;
    }
    default:
      next(action);
  }
};

export default gameMiddleware;
