import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';

import MainMenuListData from './MainMenuListData';

const MainSideBar = (props) => {
  const sideBarClicked = props.clicked;
  const sideBarClickedHandler = props.fx;

  // 사이드바를 닫기 위한 State 값
  const [closeSideBar, setCloseSideBar] = useState('none');

  // 사이드바의 X모양 버튼이나 배경이 클릭 시 동작 함수
  const closeSideBarHandler = () => {
    setCloseSideBar('none');
    sideBarClickedHandler();
  };

  // sideBarClicked 값의 변화를 감지해 변화가 생길 때마다 SideBar의 display 값 변화 및 배경 고정
  useEffect(() => {
    if (sideBarClicked) {
      setCloseSideBar('flex');
      document.body.classList.add('freeze');
    } else {
      setCloseSideBar('none');
      document.body.classList.remove('freeze');
    }
  }, [sideBarClicked]);

  return (
    <>
      <SideBarBackground onClick={closeSideBarHandler} display={closeSideBar} />
      <SideBarMenu display={closeSideBar}>
        <SideBarBtnWrapper>
          <SideXBtn
            className="fa-solid fa-xmark fa-3x"
            onClick={closeSideBarHandler}
          />
        </SideBarBtnWrapper>
        <SideBarMenuWrapper>
          <SideBarMenuList>
            <MainMenuListData
              setInfoView={props.setInfoView}
              closeSideBarHandler={closeSideBarHandler}
            />
          </SideBarMenuList>
        </SideBarMenuWrapper>
      </SideBarMenu>
    </>
  );
};

// Styled-components
const animation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const SideBarBackground = styled.div`
  display: ${(props) => props.display || 'flex'};
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${animation} 500ms ease;
  z-index: 5;
`;

const SideBarMenu = styled.div`
  display: ${(props) => props.display || 'flex'};
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  background-color: var(--color-white);
  border-left: 5rem solid var(--color-main-blue);
  z-index: 10;
  animation: ${animation} 500ms ease;

  @media (max-width: 768px) {
    width: 17rem;
  }

  @media (min-width: 768px) {
    width: 20rem;
  }
`;

const SideBarBtnWrapper = styled.div`
  position: relative;
  top: 1rem;
  left: -3.6rem;
`;

const SideXBtn = styled.i`
  color: var(--color-white);
  transition: all 300ms ease;
  &:hover {
    color: var(--color-black);
  }
`;

const SideBarMenuWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    margin-top: 1.5rem;
    margin-left: 2rem;
  }

  @media (min-width: 768px) {
    margin-top: 3rem;
    margin-left: 3rem;
  }
`;

const SideBarMenuList = styled.ul``;

export default MainSideBar;
