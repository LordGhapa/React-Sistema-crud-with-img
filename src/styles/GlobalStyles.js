import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  list-style: none;

}

html,body,#root{
height: 100%;
}
body{
  font-family: sans-serif;
  background-color: ${colors.primaryDarkColor};
  color: ${colors.primaryColor};
}
button{
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius:4px;
  font-weight: 700;
  transition: all 300ms;
  &:hover{
  filter:  brightness(85%);

  }
};
a{
  text-decoration: none;
  color: ${colors.primaryColor};
}

/* body .Toastify .Toastify__toast-container .Toastify__toast--success {
  background-color: ${colors.successColor};
  color: white;
}
body .Toastify .Toastify__toast-container .Toastify__toast--error {
  background-color: ${colors.errorColor};
  color: white; */

`;
export const Container = styled.section`
  max-width: 480px;
  background-color: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
