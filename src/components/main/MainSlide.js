import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import toiletSlideImg from '../../assets/imgs/toilet_slide.png';
import toiletSlideSeroImg from '../../assets/imgs/toilet_slide_sero.png';
import totoSlideImg from '../../assets/imgs/toto_slide.png';
import totoSlideSeroImg from '../../assets/imgs/toto_slide_sero.png';
import { useState } from 'react';

const MainSlide = () => {
  // 슬라이드가 순서대로 동작하도록 관리하는 state 값
  const [view, setView] = useState(true);

  // 다음 슬라이드로 넘기기 위한 버튼 핸들러
  const prevAndNextBtnHandler = () => {
    setView(!view);
  };

  return (
    <Slide>
      <PrevBtn
        className="fas fa-angle-left fa-3x"
        onClick={prevAndNextBtnHandler}
      />
      <NextBtn
        className="fas fa-angle-right fa-3x"
        onClick={prevAndNextBtnHandler}
      />
      <FirstCell view={view}>
        <CellImgWrapper>
          <Link to={'/toilet'}>
            <CellFirstImg />
          </Link>
        </CellImgWrapper>
      </FirstCell>
      <SecondCell view={view}>
        <CellImgWrapper>
          <Link to={'/toto'}>
            <CellSecondImg />
          </Link>
        </CellImgWrapper>
      </SecondCell>
    </Slide>
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

const Slide = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const PrevBtn = styled.i`
  display: flex;
  position: absolute;
  width: 2rem;
  height: 2rem;
  border: none;
  z-index: 1;
  top: 50%;
  left: 0;
`;

const NextBtn = styled.i`
  display: flex;
  position: absolute;
  width: 2rem;
  height: 2rem;
  border: none;
  z-index: 1;
  top: 50%;
  right: 0;
`;

const FirstCell = styled.div`
  display: ${({ view }) => (view ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${fadeIn} 500ms ease-in-out forwards;
`;

const SecondCell = styled.div`
  display: ${({ view }) => (!view ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${fadeIn} 500ms ease-in-out forwards;
`;

const CellImgWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CellFirstImg = styled.img`
  @media (max-width: 768px) {
    content: url(${toiletSlideSeroImg});
  }

  @media (min-width: 768px) {
    content: url(${toiletSlideImg});
  }
`;

const CellSecondImg = styled.img`
  @media (max-width: 768px) {
    content: url(${totoSlideSeroImg});
  }

  @media (min-width: 768px) {
    content: url(${totoSlideImg});
  }
`;

export default MainSlide;
