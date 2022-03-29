import { loading } from '../app/types';

export interface Game {
  countries: Country[];
  badAnswersCount: number; 
  goodAnswersCount: number;
  flag: String;
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
  name: string,
  capital: string,
  iso2: string,
}

// Actions

export enum GameActionTypes {
  UPDATE_ANSWER_COUNTER = 'UPDATE_ANSWER_COUNTER',
  GET_COUNTRIES_DATA = 'GET_COUNTRIES_DATA',
  UPDATE_COUNTRIES_DATA = 'UPDATE_COUNTRIES_DATA',
  GET_FLAG = 'GET_FLAG',
  UPDATE_FLAG = "UPDATE_FLAG",
  UPDATE_API_CALL = "UPDATE_API_CALL"
}

export enum CounterActionTypes {
  INC = 'INC',
  DEC = 'DEC',
}

export enum CountriesDataType {
  COUNTRIES = 'COUNTRIES',
  FLAG = 'FLAG',
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

export type GameActions = UpdateAnswerCounter | updateCountriesData | updateApiCall | loading;