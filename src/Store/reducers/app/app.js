import * as TYPES from '../../actions/types';
import { stringVariables as stringVariablesEn } from '../../../StorageVariables/languages/en';
import { stringVariables as stringVariablesDa } from '../../../StorageVariables/languages/da';
import { Constants } from '../../../Configurations/Constants';
const browserLanguage = window.navigator.language;
const defaultLang = browserLanguage === 'da-DK' ? 'da' : Constants.defaultLang;
const initialState = {
  userLanguageData: {
    language: defaultLang,
    translations: defaultLang === 'en' ? stringVariablesEn : stringVariablesDa,
  },
  version: Constants.appVersion,
};
const app = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.USER_LANGUAGE_DATA: {
      return {
        ...state,
        userLanguageData: action.data,
      };
    }
    case TYPES.VERSION: {
      return {
        ...state,
        version: action.data,
      };
    }
    case TYPES.RESET: {
      return {
        ...initialState,
        version: state.version,
        userLanguageData: { ...state.userLanguageData },
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default app;
