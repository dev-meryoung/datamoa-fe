import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { Helmet } from 'react-helmet';

const DataMoa = () => {
  return (
    <>
      <Helmet>
        <link rel="icon" type="image/x-icon" href="./main_favicon.ico" />
        <title>데이터모아</title>
      </Helmet>
      <Layout>
        <Wrapper>
          <Content>
            <h1>메인페이지</h1>
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

export default DataMoa;
