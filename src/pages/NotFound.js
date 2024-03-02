import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import mainLogo from '../assets/imgs/main_logo.png';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <link rel="icon" type="image/x-icon" href="./main_favicon.ico" />
        <title>데이터모아</title>
      </Helmet>
      <NotFoundWrapper>
        <LogoWrapper>
          <LogoImg src={mainLogo} />
        </LogoWrapper>
        <MessageWrapper>
          <h1>404 ERROR</h1>
          <h2>원하시는 페이지를 찾을 수 없습니다.</h2>
          <p>입력하신 주소가 잘못 입력되었거나,</p>
          <p>변경 혹은 삭제되어 해당 페이지를 사용하실 수 없습니다.</p>
          <p>입력하신 페이지의 주소가 정확한지 다시 한번 확인해주세요.</p>
        </MessageWrapper>
        <Link to="/">
          <HomeBtn>데이터모아 홈으로</HomeBtn>
        </Link>
      </NotFoundWrapper>
    </>
  );
};

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  align-items: center;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  padding-bottom: 1rem;
`;

const LogoImg = styled.img`
  width: 15rem;
`;

const MessageWrapper = styled.div`
  text-align: start;
  margin-bottom: 2rem;
`;

const HomeBtn = styled.button`
  width: 10rem;
  height: 2.5rem;
  font-weight: bold;
`;

export default NotFound;
