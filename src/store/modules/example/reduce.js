import * as types from '../types';

const initialState = {
  botaoClikado: false,
};

// eslint-disable-next-line default-param-last
export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLIKADO_SUCCESS: {
      console.log('Successfully');
      const newState = { ...state };
      newState.botaoClikado = !newState.botaoClikado;
      return newState;
    }
    case types.BOTAO_CLIKADO_REQUEST: {
      console.log('req iniciada');
      return state;
    }
    case types.BOTAO_CLIKADO_FAILURE: {
      console.log('erro na req');
      return state;
    }
    default: {
      return state;
    }
  }
}
