import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const SideBar = (props) => {
  const sideBarClicked = props.clicked;
  const sideBarClickedHandler = props.fx;

  // 사이드바 메뉴를 구성하기 위한 데이터
  const sideBarMenuData = props.sideBarMenuData;

  // 사이드바 메뉴를 렌더링하기 위한 함수
  const sideBarMenuListRender = () => {
    // 사이드바 메뉴의 페이지 타이틀 값을 렌더링하는 함수
    const sideBarMenuTitle = (data) => {
      // 타이틀 값을 담기 위한 빈 배열 생성
      const sideBarMenuTitle = [];

      // for문을 이용해 pageTitle의 개수만큼 반복해 렌더링 후 빈 배열에 추가
      for (let i = 0; i < data.pageTitle.length; i++) {
        sideBarMenuTitle.push(
          <SideBarMenuTitle>
            ─ <Link to={data.pageUrl[i]}>{data.pageTitle[i]}</Link>
          </SideBarMenuTitle>
        );
      }

      // 타이틀 값이 담긴 배열을 리턴
      return sideBarMenuTitle;
    };

    // 최종 사이드바 메뉴 리스트를 렌더링해 리턴
    const sideBarMenuList = sideBarMenuData.map((data) => {
      return (
        <>
          <SideBarMenuCategory>{data.categoryTitle}</SideBarMenuCategory>
          {sideBarMenuTitle(data)}
        </>
      );
    });

    return sideBarMenuList;
  };

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
          <SideBarMenuList>{sideBarMenuListRender()}</SideBarMenuList>
        </SideBarMenuWrapper>
      </SideBarMenu>
    </>
  );
};

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
`;

const SideBarMenu = styled.div`
  display: ${(props) => props.display || 'flex'};
  position: fixed;
  width: 30%;
  height: 100%;
  top: 0;
  right: 0;
  background-color: white;
  border-left: 5rem solid var(--color-main-blue);
  z-index: 1;
  animation: ${animation} 500ms ease;
`;

const SideBarBtnWrapper = styled.div`
  position: relative;
  top: 1rem;
  left: -3.5rem;
`;

const SideXBtn = styled.i`
  color: white;
  transition: all 300ms ease;
  &:hover {
    color: black;
  }
`;

const SideBarMenuWrapper = styled.div`
  display: flex;
  margin-top: 3rem;
  margin-left: 3rem;
`;

const SideBarMenuList = styled.ul``;

const SideBarMenuCategory = styled.h2`
  margin-top: 3rem;
  margin-bottom: 0;
`;
const SideBarMenuTitle = styled.li``;

export default SideBar;
