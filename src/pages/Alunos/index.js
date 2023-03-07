import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';
import defaultImg from '../../img/default-user.png';
import Loading from '../../components/Loading';
import history from '../../services/history';

export default function Aluno() {
  const [isLoading, setIsLoading] = useState(false);
  const [alunos, setAlunos] = useState([]);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    e.currentTarget.style.display = 'none';
    e.currentTarget.nextSibling.style.display = 'block';
  };
  // eslint-disable-next-line consistent-return
  const handleDelete = async (e, id, index) => {
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);

      const newAlunos = [...alunos];
      newAlunos.splice(index, 1);
      setAlunos(newAlunos);
      toast.success('alunos excluído ', id);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = err?.response?.status ?? 0;
      const errors = [err?.response?.data?.errors] ?? ['Erro Inesperado'];
      if (status === 401) {
        toast.info('Você precisa fazer login.');
        return history.push('/login');
      }
      errors.map((erro) => toast.error(`ERROR:${status} ${erro}`));
      return history.push('/');
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>
      <NovoAluno to="/aluno/">Novo aluno</NovoAluno>
      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              <img crossOrigin='' src={aluno.Fotos[0]?.url ?? defaultImg} alt='images da foto' />
            </ProfilePicture>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
            <FaExclamation
              size={16}
              display='none'
              cursor='pointer'
              onClick={(e) => {
                handleDelete(e, aluno.id, index);
              }}
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
