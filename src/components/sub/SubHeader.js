// import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import toiletLogo from '../../assets/imgs/toilet_logo.png';
import totoLogo from '../../assets/imgs/toto_logo.png';

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
          <img src={toiletLogo} alt="logo" />
        </Link>
      );
    } else if (nowPathname === '/toto') {
      return (
        <Link to="/toto" onClick={logoClickHandler}>
          <img src={totoLogo} alt="logo" />
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
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-dark-white);
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    height: 2rem;
  }

  @media (min-width: 768px) {
    height: 4rem;
  }
`;

const LogoArea = styled.div`
  display: flex;
  vertical-align: middle;

  @media (max-width: 768px) {
    width: 10rem;
  }

  @media (min-width: 768px) {
    width: 15rem;
  }
`;

export default SubHeader;
