import React from 'react';
// eslint-disable-next-line object-curly-newline
import { FaHome, FaSignInAlt, FaUserAlt, FaCircle, FaPowerOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

import { Nav } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
    console.log('Logged out');
  };
  return (
    <Nav>
      <Link title='Pagina Inicial' to='/'>
        <FaHome size={30} />
      </Link>
      <Link title='Criar Usuário' to='/register'>
        <FaUserAlt size={24} />
      </Link>

      {isLoggedIn ? (
        <Link title='Fazer Logout' to='/login' onClick={handleLogout}>
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link title='Fazer Login' to='/login'>
          <FaSignInAlt size={24} />
        </Link>
      )}
      {isLoggedIn && <FaCircle title='Usuário esta Logado' size={12} color='#c4f7a1' />}
    </Nav>
  );
}
