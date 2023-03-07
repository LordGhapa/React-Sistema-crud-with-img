/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
  const dispatch = useDispatch();
  const id = match?.params?.id ?? '';
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(data?.Fotos[0]?.url ?? '');
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        toast.error('erro ao obter imagem');
        history.push('/');
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleChange = async (e) => {
    const newFoto = e.target.files[0];
    const fotoUrl = URL.createObjectURL(newFoto);
    setFoto(fotoUrl);
    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', newFoto);

    try {
      setIsLoading(true);
      await axios.post('/fotos/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Imagem Salva com Sucesso!');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error('Erro Ao Enviar Imagem');
      const status = err?.response?.status ?? 0;
      if (status === 401) {
        dispatch(actions.loginFailure());
        toast.info('Você precisa fazer login.');
        return history.push('/login');
      }
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>
      <Form>
        <label htmlFor='foto'>
          {foto ? <img crossOrigin='' src={foto} alt='foto' /> : 'Selecionar'}
          <input type='file' id='foto' onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
