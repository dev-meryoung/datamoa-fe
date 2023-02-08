import styled from 'styled-components';
import Layout from '../components/layout/Layout';

const Witt = () => {
  return (
    <Layout>
      <Wrapper>
        <Content>
          <h1>위트</h1>
          <h1>위트</h1>
          <h1>위트</h1>
          <h1>위트</h1>
          <h1>위트</h1>
        </Content>
      </Wrapper>
    </Layout>
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

export default Witt;
