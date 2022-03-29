import { connect, ConnectedProps } from 'react-redux';
import { AnyAction, Dispatch } from "redux";
import Game from '../components/Game';

import { Store } from '../store';
import { getCountriesData, updateApiCall } from '../store/game/actions';
import { CountriesDataType } from '../store/game/types';

const mapStateToProps = (state: Store) => ({
  apiCall: state.game.apiCall,
  countries: state.game.data.countries,
  isLoading: state.game.loading
});

// TO DO : essayer d importer le type GameActions au lieu de AnyAction
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  getCountriesData: (url: string, options: any, dataType: CountriesDataType) => {
    dispatch(getCountriesData(url, options, dataType));
  },
  updateApiCall: (url: string, options: any, dataType: CountriesDataType) => {
    dispatch(updateApiCall(url, options, dataType));
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type Props = PropsFromRedux;
export default connector(Game);