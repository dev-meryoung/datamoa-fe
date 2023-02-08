import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SideBar = (props) => {
  // 사이드바를 닫기 위한 State 값
  const [closeSideBar, setCloseSideBar] = useState('none');

  // 사이드바의 X모양 버튼이 클릭되면 SideBar의 display는 'none', 헤더의 btnClicked는 false
  const btnClickedHandler = () => {
    setCloseSideBar('none');
    props.fx(false);
  };

  // btnClicked 값의 변화를 감지해 변화가 생길 때마다 SideBar의 display 값 변화
  useEffect(() => {
    if (props.clicked) {
      setCloseSideBar('flex');
      document.body.classList.add('freeze');
    } else {
      setCloseSideBar('none');
      document.body.classList.remove('freeze');
    }
  }, [props.clicked]);

  return (
    <>
      <SideBarBackground onClick={btnClickedHandler} display={closeSideBar} />
      <SideMenu display={closeSideBar}>
        <SideBtnWrapper>
          <SideBtn href="#!" onClick={btnClickedHandler}>
            <i className="fa-solid fa-xmark fa-3x"></i>
          </SideBtn>
        </SideBtnWrapper>
        <SideMenuList>
          <ul>
            <h2>위치 찾기</h2>
            <li>
              ─ <Link to="/toilet">화장실 찾기</Link>
            </li>
            <li>
              ─ <Link to="/">복권방 찾기</Link>
            </li>
          </ul>
        </SideMenuList>
      </SideMenu>
    </>
  );
};

const SideBarBackground = styled.div`
  display: ${(props) => props.display || 'flex'};
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const SideMenu = styled.div`
  display: ${(props) => props.display || 'flex'};
  position: fixed;
  width: 20%;
  height: 100%;
  top: 0;
  right: 0;
  background-color: white;
  border-left: 5rem solid var(--color-main-blue);
  z-index: 1;
`;

const SideBtnWrapper = styled.div`
  position: relative;
  top: 1rem;
  left: -3.5rem;
`;

const SideBtn = styled.a`
  color: white;
  transition: all 300ms ease;
  &:hover {
    color: black;
  }
`;

const SideMenuList = styled.div`
  display: flex;
  margin-top: 3rem;
  margin-left: 1rem;
`;

export default SideBar;
