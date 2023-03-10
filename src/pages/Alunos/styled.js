import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  margin-top: 30px;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }
  span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 150px;
  }

  div + div {
    border-top: 1px solid black;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;
export const NovoAluno = styled(Link)`
  display: inline-block;
  margin: 20px 0 10px 0;
`;
