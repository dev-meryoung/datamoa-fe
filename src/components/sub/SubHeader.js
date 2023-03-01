// import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import toilet_logo from '../../assets/imgs/toilet_logo.png';

const SubHeader = (props) => {
  // 현재 접속한 URL의 경로명 확인
  const nowPathname = window.location.pathname;

  // 로고 이미지를 클릭했을 때 페이지를 새로고침
  const logoClickHandler = () => {
    window.location.reload();
  };

  const pickLogoImg = () => {
    if (nowPathname === '/toilet') {
      return (
        <Link to="/toilet" onClick={logoClickHandler}>
          <img src={toilet_logo} alt="logo" />
        </Link>
      );
    }
  };

  return (
    <Wrapper>
      <LogoArea>{pickLogoImg()}</LogoArea>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-dark-white);
  border-radius: 0.5rem;
`;

const LogoArea = styled.div`
  display: flex;
  width: 15rem;
  vertical-align: middle;
`;

export default SubHeader;
