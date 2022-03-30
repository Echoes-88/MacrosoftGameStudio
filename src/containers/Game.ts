import { connect, ConnectedProps } from 'react-redux';
import { AnyAction, Dispatch } from "redux";
import Game from '../components/Game';

import { Store } from '../store';
import { getCountriesData, updateApiCall, setCountryToGuess, updateAnswerCounter } from '../store/game/actions';
import { CounterActionTypes, CountriesDataType, Country } from '../store/game/types';

const mapStateToProps = (state: Store) => ({
  apiCall: state.game.apiCall,
  countries: state.game.data.countries,
  goodAnswersCount: state.game.data.goodAnswersCount,
  badAnswersCount: state.game.data.badAnswersCount,
  countryToGuess: state.game.data.countryToGuess,
  isLoading: state.game.loading
});


const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  getCountriesData: (url: string, options: any, dataType: CountriesDataType) => {
    dispatch(getCountriesData(url, options, dataType));
  },
  updateApiCall: (url: string, options: any, dataType: CountriesDataType) => {
    dispatch(updateApiCall(url, options, dataType));
  },
  setCountryToGuess: (country: Country) => {
    dispatch(setCountryToGuess(country));
  },
  updateAnswerCounter: (countActionType: CounterActionTypes) => {
    dispatch(updateAnswerCounter(countActionType));
  },
  // other way to do it, just for the exercise
  // setCountryToGuess: (country: Country) => {
  //   dispatch({
  //     type: 'SET_COUNTRY_TO_GUESS',
  //     country
  //   });
  // }
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type Props = PropsFromRedux;
export default connector(Game);