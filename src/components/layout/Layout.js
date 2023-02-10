import styled from 'styled-components';
import MainHeader from '../main/MainHeader';
import MainFooter from '../main/MainFooter';

const Layout = ({ children }) => {
  // 현재 접속한 url의 경로명 확인
  const nowPathname = window.location.pathname;
  console.log(nowPathname);

  return (
    <Wrapper>
      {nowPathname === '/' ? <MainHeader /> : ''}
      {children}
      {nowPathname === '/' ? <MainFooter /> : ''}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

export default Layout;
