import { useState } from 'react';
import styled from 'styled-components';

import logo from '../../assets/imgs/main_logo.png';

import useEscKeyClose from '../../utils/useEscKeyClose';

import MainSideBar from './MainSideBar';

const MainHeader = (props) => {
  // 사이드바 버튼의 클릭을 감지하기 위한 State 값
  const [sideBarClicked, setSideBarClicked] = useState(false);

  useEscKeyClose(setSideBarClicked);

  // 사이드바 버튼이 클릭되면 sideBarClicked의 값을 토글
  const sideBarClickedHandler = () => {
    setSideBarClicked(!sideBarClicked);
  };

  return (
    <Wrapper>
      <LogoArea>
        <a href="https://datamoa.kr/">
          <img src={logo} alt="logo" />
        </a>
      </LogoArea>
      <>
        <SideBtnWrapper>
          <SideBtn
            className="fa-solid fa-bars fa-2x"
            onClick={sideBarClickedHandler}
          />
        </SideBtnWrapper>
        <MainSideBar
          clicked={sideBarClicked}
          fx={sideBarClickedHandler}
          sideBarMenuData={props.sideBarMenuData}
          setInfoView={props.setInfoView}
        />
      </>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  height: 5rem;
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

const SideBtn = styled.i``;

export default MainHeader;
