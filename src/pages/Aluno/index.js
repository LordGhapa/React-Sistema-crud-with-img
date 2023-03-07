/* eslint-disable operator-linebreak */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { Container } from '../../styles/GlobalStyles';
// eslint-disable-next-line import/named
import { Form, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import defaultImg from '../../img/default-user.png';

export default function Alunos({ match }) {
  const dispatch = useDispatch();
  const id = match.params?.id ?? 0;
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    // eslint-disable-next-line consistent-return
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const fotoUrl = data?.Fotos?.[0]?.url ?? defaultImg;
        setFoto(fotoUrl);
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const errors = err?.response?.data?.errors ?? ['Erro inesperado'];
        const status = err?.response?.status ?? 0;

        errors.map((erro) => toast.error(`ERROR:${status} ${erro}`));
        return history.push('/');
      }
    }
    getData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setNome(nome.trim());
    setSobrenome(sobrenome.trim());

    let formErros = false;
    if (nome.length < 3 || nome.length >= 255) {
      formErros = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErros = true;
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErros = true;
      toast.error(' E-mail Inválido');
    }
    if (!isInt(String(idade))) {
      formErros = true;
      toast.error('Idade Inválida');
    }
    if (!isFloat(String(peso))) {
      formErros = true;
      toast.error('Peso Inválido');
    }
    if (!isFloat(String(altura))) {
      formErros = true;
      toast.error('Altura Inválido');
    }

    // eslint-disable-next-line no-useless-return
    if (formErros) return;
    try {
      setIsLoading(true);
      // eslint-disable-next-line no-unreachable
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) Editado(a) com Sucesso!');
        setIsLoading(false);
        history.push('/');
      } else {
        await axios.post('/alunos/', {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) Criado(a) com Sucesso!');
        setIsLoading(false);
        history.push('/');
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      const errors = err?.response?.data?.errors ?? ['Erro inesperado'];

      const data = err?.response?.data ?? {};
      const status = err?.response?.status ?? 0;

      if (errors.length > 0) {
        errors.map((erro) => toast.error(`ERROR:${status} ${erro}`));
      }
      if (status === 401) {
        dispatch(actions.loginFailure());
      }
      history.push('/');
    }
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar Aluno' : 'Novo Aluno'}</Title>
      {(id && (
        <ProfilePicture>
          <img crossOrigin='' src={foto} alt='images da foto' />
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )) ||
        ''}
      <Form onSubmit={handleSubmit}>
        <input
          type='text'
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder='Nome'
        />
        <input
          type='text'
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder='Sobrenome'
        />
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='number'
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder='Idade'
        />
        <input
          type='number'
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder='Peso'
        />
        <input
          type='number'
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder='Altura'
        />
        <button type='submit'>Enviar</button>
      </Form>
    </Container>
  );
}

Alunos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
