import React from 'react';
import { H1 } from './styled';

import { Container } from '../../styles/GlobalStyles';

export default function Page404() {
  return (
    <Container>
      <H1>
        Página não encontrada <br />
        ERRO 404{' '}
      </H1>
    </Container>
  );
}
