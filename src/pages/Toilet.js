import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { Helmet } from 'react-helmet';
import KakaoMap from '../utils/KakaoMap';

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
            <KakaoMap />
          </Content>
        </Wrapper>
      </Layout>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Content = styled.main``;

export default Toilet;
