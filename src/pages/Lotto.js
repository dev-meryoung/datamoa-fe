import styled from 'styled-components';
import Layout from '../components/layout/Layout';

const Lotto = () => {
  return (
    <Layout>
      <Wrapper>
        <Content>
          <h1>복권방 위치 찾기</h1>
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

export default Lotto;
