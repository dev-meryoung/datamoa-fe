import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { Helmet } from 'react-helmet';
import NaverMap from '../components/common/NaverMap';
import MapInfoList from '../components/common/MapInfoList';
import { useState } from 'react';

const Toilet = () => {
  // 검색 목록의 특정 위치에 해당하는 좌표를 관리하기 위한 state 값
  const [centerCoord, setCenterCoord] = useState('');

  // 지도 위의 마커와 목록의 리스트를 1:1 매칭하기 위한 axios 통신 데이터 저장 state 값
  const [markerData, setMarkerData] = useState({});

  // 화장실 목록에서 현재 클릭된 대상을 관리하기 위한 state 값
  const [clicked, setClicked] = useState('');

  // 클릭된 대상을 관리하기 위한 핸들러
  const clickHandler = (id) => {
    setClicked(id);
  };

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/x-icon" href="./toilet_favicon.ico" />
        <title>화장실 위치찾기</title>
      </Helmet>
      <Layout>
        <Wrapper>
          <Content>
            <MapWrapper>
              <NaverMap
                centerCoord={centerCoord}
                setMarkerData={setMarkerData}
                markerData={markerData}
                clickHandler={clickHandler}
                setClicked={setClicked}
                clicked={clicked}
              />
            </MapWrapper>
            <InfoWrapper>
              <MapInfoList
                setCenterCoord={setCenterCoord}
                markerData={markerData}
                clickHandler={clickHandler}
                clicked={clicked}
              />
            </InfoWrapper>
          </Content>
        </Wrapper>
      </Layout>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 1rem 0rem;
`;

const Content = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
`;

const MapWrapper = styled.div`
  width: 70%;
  height: 100%;
  border: 1px solid var(--color-dark-white);
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-sizing: border-box;
  margin-right: 1rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;
  height: 100%;
  border: 1px solid var(--color-dark-white);
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-sizing: border-box;
`;

export default Toilet;
