import { loading } from '../app/types';

export interface Game {
  countries: Country[],
  countryToGuess: Country,
  badAnswersCount: number, 
  goodAnswersCount: number
}

export interface ApiCall {
  url: string,
  options: any,
  dataType: CountriesDataType
}

export interface gameState {
  readonly loading: boolean;
  readonly data: Game;
  readonly errors?: string;
  readonly apiCall: ApiCall;
}

export type Country = {
  name: string | undefined,
  capital: string | undefined,
  iso2: string | undefined,
  flag: string | undefined
}

// Actions

export enum GameActionTypes {
  UPDATE_ANSWER_COUNTER = 'UPDATE_ANSWER_COUNTER',
  GET_COUNTRIES_DATA = 'GET_COUNTRIES_DATA',
  UPDATE_COUNTRIES_DATA = 'UPDATE_COUNTRIES_DATA',
  SET_COUNTRY_TO_GUESS = 'SET_COUNTRY_TO_GUESS',
  GET_FLAG = 'GET_FLAG',
  UPDATE_FLAG = "UPDATE_FLAG",
  UPDATE_API_CALL = "UPDATE_API_CALL",
  UPDATE_SCORE = "UPDATE_SCORE"
}

export enum CounterActionTypes {
  INC = 'INC',
  DEC = 'DEC',
}

export enum CountriesDataType {
  COUNTRIES = 'COUNTRIES',
  FLAG = 'FLAG',
}

export enum InfoText {
  WIN = 'Gagné !',
  LOOSE = 'Perdu'
}

interface UpdateAnswerCounter {
  type: GameActionTypes.UPDATE_ANSWER_COUNTER;
  countActionType: string
}

interface updateCountriesData {
  type: GameActionTypes.UPDATE_COUNTRIES_DATA;
  data: any;
  dataType: CountriesDataType;
}

interface updateApiCall {
  type: GameActionTypes.UPDATE_API_CALL;
  url: string;
  options: any;
  dataType: CountriesDataType;
}

interface setCountryToGuess {
  type: GameActionTypes.SET_COUNTRY_TO_GUESS;
  country: Country;
}

export type GameActions = UpdateAnswerCounter | updateCountriesData | updateApiCall | setCountryToGuess | loading;