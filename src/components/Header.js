import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SideBar from './SideBar';

const Header = () => {
  // 사이드바 버튼의 클릭을 감지하기 위한 State 값
  const [btnClicked, setBtnClicked] = useState(false);

  // 버튼이 클릭되면 btnClicked의 값을 토글
  const btnClickedHandler = () => {
    setBtnClicked(!btnClicked);
  };

  return (
    <Wrapper>
      <LogoArea>
        <Link to="/">
          <img src="/logo.png" alt="#" />
        </Link>
      </LogoArea>
      <SideBtnWrapper>
        <SideBtn href="#!" onClick={btnClickedHandler}>
          <i className="fa-solid fa-bars fa-2x"></i>
        </SideBtn>
      </SideBtnWrapper>
      <SideBar clicked={btnClicked} fx={setBtnClicked} />
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid var(--color-dark-white);
`;

const LogoArea = styled.div`
  display: flex;
  width: 10rem;
  vertical-align: middle;
`;

const SideBtnWrapper = styled.div``;

const SideBtn = styled.a``;

export default Header;
