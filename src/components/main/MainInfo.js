import styled, { keyframes } from 'styled-components';
import mainInfoImg from '../../assets/imgs/main_info.png';
import mainInfoSeroImg from '../../assets/imgs/main_info_sero.png';

const MainInfo = () => {
  return (
    <Wrapper>
      <ImgWrapper>
        <InfoImg />
      </ImgWrapper>
    </Wrapper>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ImgWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${fadeIn} 500ms ease-in-out forwards;
`;

const InfoImg = styled.img`
  @media (max-width: 768px) {
    content: url(${mainInfoSeroImg});
  }

  @media (min-width: 768px) {
    content: url(${mainInfoImg});
  }
`;

export default MainInfo;
