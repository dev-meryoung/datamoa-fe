import styled from 'styled-components';
import { cloneElement } from 'react';
import MainHeader from '../main/MainHeader';
import MainFooter from '../main/MainFooter';

const Layout = (props) => {
  // 현재 접속한 url의 경로명 확인
  const nowPathname = window.location.pathname;
  console.log(nowPathname);

  const { children, data } = props;

  return (
    <Wrapper>
      {nowPathname === '/' ? (
        <MainHeader sideBarMenuData={props.sideBarMenuData} />
      ) : (
        ''
      )}
      {cloneElement(children, data)}
      {nowPathname === '/' ? <MainFooter /> : ''}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

export default Layout;
