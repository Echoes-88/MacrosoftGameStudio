import { GameActionTypes, CounterActionTypes, CountriesDataType, Country } from './types';



// Actions

export const updateAnswerCounter = (countActionType: CounterActionTypes) => ({
  type: GameActionTypes.UPDATE_ANSWER_COUNTER,
  countActionType,
});

export const getCountriesData = (url: string, options: any, dataType: CountriesDataType) => ({
  type: GameActionTypes.GET_COUNTRIES_DATA,
  url,
  options,
  dataType
});

export const updateCountriesData = (data: any, dataType: CountriesDataType) => ({
  type: GameActionTypes.UPDATE_COUNTRIES_DATA,
  data,
  dataType
});

export const updateApiCall = (url: string, options: any, dataType: CountriesDataType) => ({
  type: GameActionTypes.UPDATE_API_CALL,
  url,
  options,
  dataType
});

export const setCountryToGuess = (country: Country) => ({
  type: GameActionTypes.SET_COUNTRY_TO_GUESS,
  country
});

