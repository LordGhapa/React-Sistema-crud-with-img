/* eslint-disable-next-line */
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));
    toast.success('Login feito com sucesso!');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    history.push(payload.prevPath);
  } catch (error) {
    toast.error('Usuário ou senha inválidos.');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = payload?.auth?.token;
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

/* eslint-disable  */
function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
      toast.success('Alterado com sucesso!');
      history.push('/login');
    } else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      toast.success('Criado com sucesso!');
      history.push('/login');
    }
  } catch (e) {
    const errors = e?.response?.data?.errors ?? ['Erro inesperado'];
    const status = e?.response?.status ?? 0;

    if (status === 401) {
      toast.info('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    errors.map((err) => toast.error(`ERROR:${status} ${err}`));
    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
