import styled from 'styled-components';
import MainHeader from '../main/MainHeader';
import MainFooter from '../main/MainFooter';
import SubHeader from '../sub/SubHeader';
import SubFooter from '../sub/SubFooter';

const Layout = ({ children }) => {
  // 현재 접속한 URL의 경로명 확인
  const nowPathname = window.location.pathname;
  console.log(nowPathname);

  return (
    <Wrapper>
      {nowPathname === '/' ? <MainHeader /> : <SubHeader />}
      {children}
      {nowPathname === '/' ? <MainFooter /> : <SubFooter />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100vh - 11rem);
  margin: 0rem 2rem 0rem 2rem;
`;

export default Layout;
