import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { Helmet } from 'react-helmet';
import NaverMap from '../components/common/NaverMap';
import MapInfoList from '../components/common/MapInfoList';

const Toilet = () => {
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
              <NaverMap />
            </MapWrapper>
            <InfoWrapper>
              <MapInfoList />
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
  height: 28rem;
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
