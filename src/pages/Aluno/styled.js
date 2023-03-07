import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  input {
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 0 10px;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 10px;

  img {
    background-color: gray;
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    position: absolute;
    bottom: 0;
    background-color: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    color: white;
    border-radius: 50%;
  }
`;
