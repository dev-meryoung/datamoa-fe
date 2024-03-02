import styled, { css, keyframes } from 'styled-components';
import Layout from '../components/layout/Layout';
import NaverMap from '../components/common/NaverMap';
import MapInfoList from '../components/common/MapInfoList';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import arrowUp from '../assets/imgs/arrow_up.png';
import arrowDown from '../assets/imgs/arrow_down.png';

const Toto = () => {
  // 해당 페이지의 높이를 반응형 웹에 맞춰 구현하기 위한 vh 계산 로직
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // 새롭게 사이즈가 변경되었을 때도 다시 해당 로직을 반복 실행
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  // 사용자의 현 위치 좌표를 저장하기 위한 state 값
  const [userCoord, setUserCoord] = useState({ lat: 37.5006, lng: 126.8677 });

  // 검색 목록의 특정 위치에 해당하는 좌표를 관리하기 위한 state 값
  const [centerCoord, setCenterCoord] = useState('');

  // 지도 위의 마커와 목록의 리스트를 1:1 매칭하기 위한 axios 통신 데이터 저장 state 값
  const [markerData, setMarkerData] = useState('');

  // 복권방 목록에서 현재 클릭된 대상을 관리하기 위한 state 값
  const [clicked, setClicked] = useState('');

  // 모바일 화면에서 목록 보기 버튼의 클릭 여부를 관리하기 위한 state 값
  const [viewInfo, setViewInfo] = useState(true);

  // 클릭된 대상을 관리하기 위한 핸들러
  const clickHandler = (id) => {
    setClicked(id);
  };

  // 목록 보기 버튼이 클릭되었을 때 실행할 핸들러
  const infoOpenBtnClickHandler = () => {
    setViewInfo(!viewInfo);
  };

  // 검색 동작이 일어났을 때 실행할 핸들러
  const enterTextHandler = () => {
    setViewInfo(true);
  };

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/x-icon" href="./toto_favicon.ico" />
        <title>복권방 위치찾기</title>
      </Helmet>
      <Layout>
        <Wrapper>
          <Content>
            <MapWrapper>
              <NaverMap
                userCoord={userCoord}
                setUserCoord={setUserCoord}
                centerCoord={centerCoord}
                setMarkerData={setMarkerData}
                markerData={markerData}
                clickHandler={clickHandler}
                setClicked={setClicked}
                clicked={clicked}
              />
            </MapWrapper>
            <InfoWrapper visible={viewInfo}>
              <InfoOpenBtnWrapper onClick={infoOpenBtnClickHandler}>
                <InfoOpenBtn backgroundImage={viewInfo ? arrowUp : arrowDown} />
              </InfoOpenBtnWrapper>
              <MapInfoList
                userCoord={userCoord}
                setCenterCoord={setCenterCoord}
                markerData={markerData}
                clickHandler={clickHandler}
                clicked={clicked}
                enterTextHandler={enterTextHandler}
              />
            </InfoWrapper>
          </Content>
        </Wrapper>
      </Layout>
    </>
  );
};

const listUp = keyframes`
  from {
    height: 35%;
  }
  to {
    height: calc(100% - 1.5rem);
  }
`;

const listDown = keyframes`
  from {
    height: calc(100% - 1.5rem);
  }
  to {
    height: 35%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    height: calc(100vh - 6.3rem);
    margin: 0.5rem 0rem;
  }

  @media (min-width: 768px) {
    height: 100%;
    margin: 1rem 0rem;
  }
`;

const Content = styled.main`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const MapWrapper = styled.div`
  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: 65%;
    border: 1px solid var(--color-dark-white);
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-sizing: border-box;
  }

  @media (min-width: 768px) {
    flex-grow: 1;
    min-width: 25rem;
    min-height: 25rem;
    height: 100%;
    border: 1px solid var(--color-dark-white);
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-sizing: border-box;
    margin-right: 1rem;
  }
`;

const InfoOpenBtnWrapper = styled.div`
  width: 3rem;
  height: 1.5rem;
  border: 1px solid var(--color-dark-white);
  border-bottom: 0px;
  border-radius: 0.5rem;
  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%) translateY(-100%);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
const InfoOpenBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  background-image: url(${(props) => props.backgroundImage});
  background-position: center;
  background-size: cover;
  border: 0px;

  &:hover {
    border: 0px;
  }
`;

const InfoWrapper = styled.div`
  @media (max-width: 768px) {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    bottom: 0;
    width: 100%;
    border: 1px solid var(--color-dark-white);
    border-radius: 0.5rem;
    background-color: var(--color-white);
    padding: 0.5rem;
    box-sizing: border-box;

    ${({ visible }) =>
      !visible
        ? css`
            animation: ${listUp} 500ms ease-in-out forwards;
          `
        : css`
            animation: ${listDown} 500ms ease-in-out forwards;
          `}
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 30rem;
    flex-shrink: 0;
    height: 100%;
    border: 1px solid var(--color-dark-white);
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-sizing: border-box;
  }
`;

export default Toto;
