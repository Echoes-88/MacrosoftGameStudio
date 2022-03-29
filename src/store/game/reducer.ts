import { Reducer } from "redux";
import { ApiCall } from "../app/types";

import { CountriesDataType, GameActions, GameActionTypes, gameState } from "./types";

export const initialState: gameState = {
  data: {
    countries: [],
    badAnswersCount: 0, 
    goodAnswersCount: 0,
    flag: ""
  },
  apiCall: {
    url: "https://countriesnow.space/api/v0.1/countries/capital",
    options: {},
    dataType: CountriesDataType.COUNTRIES
  },
  errors: undefined,
  loading: false
};

const game: Reducer<gameState, GameActions> = (state = initialState, action) => {
  switch (action.type) {
    case GameActionTypes.UPDATE_ANSWER_COUNTER: {
      return { 
        ...state,
        data: {
          ...state.data,
          ...(action.countActionType === "INC" ? { goodAnswersCount: state.data.goodAnswersCount++} : {badAnswersCount: state.data.badAnswersCount++})
        }
        
      };
    }
    case ApiCall.LOADING: {
      return { 
        ...state, 
        loading: action.status
      };
    }
    case GameActionTypes.UPDATE_COUNTRIES_DATA: {
      return { 
        ...state, 
        data: {
          ...state.data,
          ...(action.dataType === CountriesDataType.COUNTRIES ? { countries: [...action.data]} : {flag: action.data})
        }
      };
    }
    case GameActionTypes.UPDATE_API_CALL: {
      return { 
        ...state, 
        apiCall: {
          ...state.apiCall,
          options: action.options,
          url: action.url,
          dataType: action.dataType
        }
      };
    }
    default: {
      return state;
    } 
  }
};

export { game };