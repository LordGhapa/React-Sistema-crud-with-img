/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styled';
import LoadingImg from '../../img/loading.gif';

export default function Loading({ isLoading }) {
  if (!isLoading) return <></>;
  return (
    <Container>
      <div>
        <img src={LoadingImg} alt='images da foto' />
      </div>
    </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};
Loading.prototype = {
  isLoading: PropTypes.bool,
};
