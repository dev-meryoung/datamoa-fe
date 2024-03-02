import styled from 'styled-components';
import MainHeader from '../main/MainHeader';
import MainFooter from '../main/MainFooter';
import SubHeader from '../sub/SubHeader';
import SubFooter from '../sub/SubFooter';

const Layout = (props) => {
  // 현재 접속한 URL의 경로명 확인
  const nowPathname = window.location.pathname;

  return (
    <Wrapper>
      {nowPathname === '/' ? (
        <MainHeader setInfoView={props.setInfoView} />
      ) : (
        <SubHeader />
      )}
      {props.children}
      {nowPathname === '/' ? <MainFooter /> : <SubFooter />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100vh - 11rem);
`;

export default Layout;
