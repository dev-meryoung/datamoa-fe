import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import MainSlide from '../components/main/MainSlide';
import MainInfo from '../components/main/MainInfo';
import { Helmet } from 'react-helmet';
import { useState } from 'react';

const DataMoa = () => {
  const [infoView, setInfoView] = useState(false);

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/x-icon" href="./main_favicon.ico" />
        <title>데이터모아</title>
      </Helmet>
      <Layout setInfoView={setInfoView}>
        <Wrapper>
          <Content>{infoView ? <MainInfo /> : <MainSlide />}</Content>
        </Wrapper>
      </Layout>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background-color: var(--color-back-grey);

  @media (max-width: 768px) {
    height: calc(100vh - 11rem);
  }

  @media (min-width: 768px) {
    height: calc(100vh - 11rem);
  }
`;

const Content = styled.main`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 600px) {
    width: 90%;
  }

  @media (min-width: 600px) and (max-width: 768px) {
    width: 80%;
  }

  @media (min-width: 768px) {
    width: 85%;
  }
`;

export default DataMoa;
